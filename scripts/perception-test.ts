// RideMind — Perception Viability Experiment
//
// Tests whether current vision models can reliably perceive riding events
// from still frames before investing further in pipeline reasoning.
//
// Usage:
//   npx tsx scripts/perception-test.ts
//   npx tsx scripts/perception-test.ts --model=gpt-4o
//   npx tsx scripts/perception-test.ts --clip=nick-crash,colin-hill
//   npx tsx scripts/perception-test.ts --gemini-video
//   npx tsx scripts/perception-test.ts --model=gemini-2.5-flash --gemini-video
//
// Config:
//   clips:           nick-crash, colin-hill, steep-hill-bail
//   models:          gpt-4o, gemini-2.5-flash, claude-sonnet
//   frames_per_clip: 16
//   temperature:     0
//   output_dir:      results/perception-test/
//   frames_dir:      {os.tmpdir()}/perception-test-frames/{clip}/

import fs from "fs";
import path from "path";
import os from "os";
import { config } from "dotenv";
import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static";
import ffprobeStatic from "ffprobe-static";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager, FileState } from "@google/generative-ai/server";

config({ path: ".env.local" });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(ffmpeg as any).setFfmpegPath(ffmpegStatic as string);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(ffmpeg as any).setFfprobePath((ffprobeStatic as any).path);

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const FRAMES_PER_CLIP = 16;
const OUTPUT_DIR = "results/perception-test";
const FRAMES_DIR = path.join(os.tmpdir(), "perception-test-frames");
const GEMINI_UPLOAD_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes
const GEMINI_INLINE_THRESHOLD_BYTES = 10 * 1024 * 1024; // 10 MB

const PROMPT_VERSION = "perception_v1";
const PROMPT_TEXT = `You are viewing sequential still frames extracted at even intervals from a single off-road motorcycle clip.

Describe only what is visually observable in the frames. Do not infer intent, cause, skill level, or coaching advice.

If something is unclear, occluded, or not visible, state that explicitly.

Return your answer under these exact headings:

1. Rider objective & context
2. Rider
3. Terrain & environment
4. Events
5. Outcome
6. Unclear or not visible`;

// ---------------------------------------------------------------------------
// Clip definitions
// ---------------------------------------------------------------------------

interface ClipDef {
  id: string;
  label: string;
  path: string;
}

const ALL_CLIPS: ClipDef[] = [
  {
    id: "nick-crash",
    label: "Nick Crash",
    path: String.raw`C:\Users\rigge\OneDrive\Videos\Enduro ai coach test clips\nick crash.mp4`,
  },
  {
    id: "colin-hill",
    label: "Colin Hill",
    path: String.raw`C:\Users\rigge\OneDrive\Videos\Enduro ai coach test clips\colin hill.mp4`,
  },
  {
    id: "steep-hill-bail",
    label: "Steep Hill Bail",
    path: String.raw`C:\Users\rigge\OneDrive\Videos\Enduro ai coach test clips\steep hill bail in trees.mp4`,
  },
];

// ---------------------------------------------------------------------------
// Model definitions
// ---------------------------------------------------------------------------

type ModelProvider = "openai" | "gemini" | "anthropic";

interface ModelDef {
  key: string;
  id: string;
  label: string;
  provider: ModelProvider;
}

const ALL_MODELS: ModelDef[] = [
  { key: "gpt-4o",           id: "gpt-4o",            label: "GPT-4o",            provider: "openai"    },
  { key: "gemini-2.5-flash", id: "gemini-2.5-flash",  label: "Gemini 2.5 Flash",  provider: "gemini"    },
  { key: "claude-sonnet",    id: "claude-sonnet-4-6", label: "Claude Sonnet 4.6", provider: "anthropic" },
];

// ---------------------------------------------------------------------------
// Output types
// ---------------------------------------------------------------------------

interface ParsedResponse {
  rider_objective_context: string;
  rider: string;
  terrain_environment: string;
  events: string;
  outcome: string;
  unclear_not_visible: string;
}

interface PerceptionResult {
  clip: string;
  model: string;
  model_id: string;
  frames_extracted: number;
  frame_dimensions: string;
  prompt_version: string;
  response_raw: string;
  response_parsed: ParsedResponse;
  duration_ms: number;
  token_usage: { input: number; output: number };
  timestamp: string;
  error?: string;
}

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------

interface ParsedArgs {
  modelFilter: string[] | null;
  clipFilter: string[] | null;
  geminiVideo: boolean;
}

function parseArgs(): ParsedArgs {
  const args = process.argv.slice(2);
  const validModelKeys = ALL_MODELS.map((m) => m.key);
  const validClipIds = ALL_CLIPS.map((c) => c.id);

  let modelFilter: string[] | null = null;
  let clipFilter: string[] | null = null;
  let geminiVideo = false;

  for (const arg of args) {
    if (arg.startsWith("--model=")) {
      const values = arg.replace("--model=", "").split(",");
      const invalid = values.filter((v) => !validModelKeys.includes(v));
      if (invalid.length > 0) {
        console.error(`Unknown model(s): ${invalid.join(", ")}. Valid: ${validModelKeys.join(", ")}`);
        process.exit(1);
      }
      modelFilter = values;
    } else if (arg.startsWith("--clip=")) {
      const values = arg.replace("--clip=", "").split(",");
      const invalid = values.filter((v) => !validClipIds.includes(v));
      if (invalid.length > 0) {
        console.error(`Unknown clip(s): ${invalid.join(", ")}. Valid: ${validClipIds.join(", ")}`);
        process.exit(1);
      }
      clipFilter = values;
    } else if (arg === "--gemini-video") {
      geminiVideo = true;
    } else {
      console.error(`Unknown argument: ${arg}`);
      process.exit(1);
    }
  }

  return { modelFilter, clipFilter, geminiVideo };
}

// ---------------------------------------------------------------------------
// Environment validation
// ---------------------------------------------------------------------------

function checkEnv(modelFilter: string[] | null, geminiVideo: boolean): void {
  const useGPT    = modelFilter === null || modelFilter.includes("gpt-4o");
  const useGemini = modelFilter === null || modelFilter.includes("gemini-2.5-flash");
  const useClaude = modelFilter === null || modelFilter.includes("claude-sonnet");

  // GEMINI_API_KEY is needed if Gemini model is selected OR if --gemini-video is set
  const needGeminiKey = useGemini || geminiVideo;

  const missing: string[] = [];
  if (useGPT    && !process.env.OPENAI_API_KEY)     missing.push("OPENAI_API_KEY");
  if (needGeminiKey && !process.env.GEMINI_API_KEY) missing.push("GEMINI_API_KEY");
  if (useClaude && !process.env.ANTHROPIC_API_KEY)  missing.push("ANTHROPIC_API_KEY");

  if (missing.length > 0) {
    console.error(`Missing environment variables in .env.local: ${missing.join(", ")}`);
    process.exit(1);
  }
}

// ---------------------------------------------------------------------------
// Frame extraction
// ---------------------------------------------------------------------------

interface FrameExtractionResult {
  paths: string[];
  dimensions: string;
}

async function extractFrames(clip: ClipDef): Promise<FrameExtractionResult> {
  const clipFramesDir = path.join(FRAMES_DIR, clip.id);

  // Reuse cached frames if a full set is already present
  if (fs.existsSync(clipFramesDir)) {
    const existing = fs
      .readdirSync(clipFramesDir)
      .filter((f) => f.endsWith(".jpg"))
      .sort()
      .map((f) => path.join(clipFramesDir, f));

    if (existing.length === FRAMES_PER_CLIP) {
      console.log(`  [frames] reusing ${existing.length} cached frames`);
      const dims = await getFrameDimensions(existing[0]);
      return { paths: existing, dimensions: dims };
    }
  }

  fs.mkdirSync(clipFramesDir, { recursive: true });

  // Get video duration
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const duration = await new Promise<number>((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ffmpeg as any).ffprobe(clip.path, (err: Error | null, metadata: any) => {
      if (err) reject(err);
      else resolve(metadata.format.duration ?? 0);
    });
  });
  console.log(`  [frames] duration: ${duration.toFixed(1)}s`);

  // Evenly-spaced timestamps — avoid first and last frame
  const timestamps: number[] = [];
  for (let i = 0; i < FRAMES_PER_CLIP; i++) {
    timestamps.push((duration / (FRAMES_PER_CLIP + 1)) * (i + 1));
  }

  const framePaths: string[] = [];
  for (let i = 0; i < timestamps.length; i++) {
    const outputPath = path.join(clipFramesDir, `frame-${String(i).padStart(2, "0")}.jpg`);
    framePaths.push(outputPath);

    await new Promise<void>((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (ffmpeg as any)(clip.path)
        .seekInput(timestamps[i])
        .frames(1)
        .output(outputPath)
        .size("1920x?")
        .on("end", () => resolve())
        .on("error", (err: Error) => reject(err))
        .run();
    });

    process.stdout.write(`\r  [frames] ${i + 1}/${FRAMES_PER_CLIP} extracted`);
  }
  process.stdout.write("\n");

  const dims = await getFrameDimensions(framePaths[0]);
  return { paths: framePaths, dimensions: dims };
}

async function getFrameDimensions(framePath: string): Promise<string> {
  return new Promise<string>((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ffmpeg as any).ffprobe(framePath, (err: Error | null, metadata: any) => {
      if (err || !metadata?.streams?.[0]) {
        resolve("unknown");
        return;
      }
      const s = metadata.streams[0];
      resolve(`${s.width ?? "?"}x${s.height ?? "?"}`);
    });
  });
}

// ---------------------------------------------------------------------------
// Response parser — extracts numbered headings 1–6 from raw text
// ---------------------------------------------------------------------------

function parseResponse(raw: string): ParsedResponse {
  const headings: Array<{ field: keyof ParsedResponse; pattern: RegExp }> = [
    { field: "rider_objective_context", pattern: /1\.\s*Rider objective[^:\n]*/i },
    { field: "rider",                   pattern: /2\.\s*Rider(?!\s+objective)[^:\n]*/i },
    { field: "terrain_environment",     pattern: /3\.\s*Terrain[^:\n]*/i },
    { field: "events",                  pattern: /4\.\s*Events[^:\n]*/i },
    { field: "outcome",                 pattern: /5\.\s*Outcome[^:\n]*/i },
    { field: "unclear_not_visible",     pattern: /6\.\s*Unclear[^:\n]*/i },
  ];

  const result: ParsedResponse = {
    rider_objective_context: "",
    rider: "",
    terrain_environment: "",
    events: "",
    outcome: "",
    unclear_not_visible: "",
  };

  for (let i = 0; i < headings.length; i++) {
    const { field, pattern } = headings[i];
    const startMatch = pattern.exec(raw);
    if (!startMatch) continue;

    const contentStart = startMatch.index + startMatch[0].length;

    // Content ends at the next numbered heading or end of string
    let contentEnd = raw.length;
    if (i + 1 < headings.length) {
      const nextMatch = headings[i + 1].pattern.exec(raw);
      if (nextMatch) contentEnd = nextMatch.index;
    }

    result[field] = raw.slice(contentStart, contentEnd).replace(/^[\s:]+/, "").trimEnd();
  }

  return result;
}

// ---------------------------------------------------------------------------
// GPT-4o call — frames as base64 image_url parts
// ---------------------------------------------------------------------------

interface ModelCallResult {
  raw: string;
  input: number;
  output: number;
}

async function callGPT4o(openai: OpenAI, framePaths: string[]): Promise<ModelCallResult> {
  const imageContents = framePaths.map((fp) => ({
    type: "image_url" as const,
    image_url: {
      url: `data:image/jpeg;base64,${fs.readFileSync(fp).toString("base64")}`,
      detail: "high" as const,
    },
  }));

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0,
    max_tokens: 1500,
    messages: [
      {
        role: "user",
        content: [{ type: "text", text: PROMPT_TEXT }, ...imageContents],
      },
    ],
  });

  return {
    raw:    response.choices[0]?.message.content ?? "",
    input:  response.usage?.prompt_tokens ?? 0,
    output: response.usage?.completion_tokens ?? 0,
  };
}

// ---------------------------------------------------------------------------
// Gemini call — frames track (inline base64 images)
// ---------------------------------------------------------------------------

async function callGeminiFrames(
  genAI: GoogleGenerativeAI,
  framePaths: string[]
): Promise<ModelCallResult> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const frameParts = framePaths.map((fp) => ({
    inlineData: {
      mimeType: "image/jpeg" as const,
      data: fs.readFileSync(fp).toString("base64"),
    },
  }));

  const response = await model.generateContent({
    contents: [
      {
        role: "user",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        parts: [{ text: PROMPT_TEXT }, ...(frameParts as any[])],
      },
    ],
    generationConfig: { temperature: 0, maxOutputTokens: 2000 },
  });

  return {
    raw:    response.response.text(),
    input:  response.response.usageMetadata?.promptTokenCount ?? 0,
    output: response.response.usageMetadata?.candidatesTokenCount ?? 0,
  };
}

// ---------------------------------------------------------------------------
// Gemini call — video track (Gemini Files API for large files)
//
// For files ≥ 10MB: upload via Files API, poll until ACTIVE, pass fileData.
// For files < 10MB: use inline base64 (fallback path).
// Polling timeout: 5 minutes.
// ---------------------------------------------------------------------------

async function callGeminiVideo(
  genAI: GoogleGenerativeAI,
  fileManager: GoogleAIFileManager,
  videoPath: string
): Promise<ModelCallResult> {
  const fileSizeBytes = fs.statSync(videoPath).size;
  const fileSizeMB = (fileSizeBytes / 1024 / 1024).toFixed(1);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let videoPart: any;

  if (fileSizeBytes < GEMINI_INLINE_THRESHOLD_BYTES) {
    // Small file — inline base64 (no upload needed)
    console.log(`  [gemini-video] ${fileSizeMB}MB — using inline base64`);
    videoPart = {
      inlineData: {
        mimeType: "video/mp4",
        data: fs.readFileSync(videoPath).toString("base64"),
      },
    };
  } else {
    // Large file — upload via Files API
    console.log(`  [gemini-video] uploading ${fileSizeMB}MB to Files API...`);

    const uploadResult = await fileManager.uploadFile(videoPath, {
      mimeType: "video/mp4",
      displayName: path.basename(videoPath),
    });

    let file = uploadResult.file;
    const deadline = Date.now() + GEMINI_UPLOAD_TIMEOUT_MS;

    process.stdout.write(`  [gemini-video] processing`);

    while (file.state === FileState.PROCESSING) {
      if (Date.now() > deadline) {
        throw new Error(`Gemini Files API processing timed out after 5 minutes`);
      }
      await new Promise((resolve) => setTimeout(resolve, 3000));
      file = await fileManager.getFile(file.name);
      process.stdout.write(".");
    }
    process.stdout.write("\n");

    if (file.state === FileState.FAILED) {
      const reason = file.error?.message ?? "unknown error";
      throw new Error(`Gemini video processing failed: ${reason}`);
    }

    console.log(`  [gemini-video] ready — ${file.uri}`);
    videoPart = { fileData: { mimeType: "video/mp4", fileUri: file.uri } };
  }

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const response = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: PROMPT_TEXT }, videoPart],
      },
    ],
    generationConfig: { temperature: 0, maxOutputTokens: 2000 },
  });

  return {
    raw:    response.response.text(),
    input:  response.response.usageMetadata?.promptTokenCount ?? 0,
    output: response.response.usageMetadata?.candidatesTokenCount ?? 0,
  };
}

// ---------------------------------------------------------------------------
// Claude call — frames as base64 image blocks
// ---------------------------------------------------------------------------

async function callClaude(anthropic: Anthropic, framePaths: string[]): Promise<ModelCallResult> {
  const imageBlocks: Anthropic.ImageBlockParam[] = framePaths.map((fp) => ({
    type: "image",
    source: {
      type: "base64",
      media_type: "image/jpeg",
      data: fs.readFileSync(fp).toString("base64"),
    },
  }));

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1500,
    messages: [
      {
        role: "user",
        content: [{ type: "text", text: PROMPT_TEXT }, ...imageBlocks],
      },
    ],
  });

  const raw = response.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");

  return {
    raw,
    input:  response.usage.input_tokens,
    output: response.usage.output_tokens,
  };
}

// ---------------------------------------------------------------------------
// Single run — one clip × one model
// ---------------------------------------------------------------------------

async function runPerception(
  clip: ClipDef,
  model: ModelDef,
  framePaths: string[],
  frameDimensions: string,
  geminiVideo: boolean,
  openai: OpenAI,
  genAI: GoogleGenerativeAI,
  fileManager: GoogleAIFileManager,
  anthropic: Anthropic
): Promise<PerceptionResult> {
  const startTime = Date.now();
  console.log(`  >> ${clip.id} × ${model.key}`);

  const emptyParsed: ParsedResponse = {
    rider_objective_context: "",
    rider: "",
    terrain_environment: "",
    events: "",
    outcome: "",
    unclear_not_visible: "",
  };

  try {
    let result: ModelCallResult;

    if (model.provider === "openai") {
      result = await callGPT4o(openai, framePaths);
    } else if (model.provider === "gemini") {
      result = geminiVideo
        ? await callGeminiVideo(genAI, fileManager, clip.path)
        : await callGeminiFrames(genAI, framePaths);
    } else {
      result = await callClaude(anthropic, framePaths);
    }

    const duration_ms = Date.now() - startTime;
    console.log(`     done — ${duration_ms}ms, tokens: ${result.input}in/${result.output}out`);

    return {
      clip:             clip.id,
      model:            model.key,
      model_id:         model.id,
      frames_extracted: geminiVideo && model.provider === "gemini" ? 0 : framePaths.length,
      frame_dimensions: frameDimensions,
      prompt_version:   PROMPT_VERSION,
      response_raw:     result.raw,
      response_parsed:  parseResponse(result.raw),
      duration_ms,
      token_usage:      { input: result.input, output: result.output },
      timestamp:        new Date().toISOString(),
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`     FAILED — ${message}`);

    return {
      clip:             clip.id,
      model:            model.key,
      model_id:         model.id,
      frames_extracted: framePaths.length,
      frame_dimensions: frameDimensions,
      prompt_version:   PROMPT_VERSION,
      response_raw:     "",
      response_parsed:  emptyParsed,
      duration_ms:      Date.now() - startTime,
      token_usage:      { input: 0, output: 0 },
      timestamp:        new Date().toISOString(),
      error:            message,
    };
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const { modelFilter, clipFilter, geminiVideo } = parseArgs();
  checkEnv(modelFilter, geminiVideo);

  const clips  = clipFilter  ? ALL_CLIPS.filter((c) => clipFilter.includes(c.id))  : [...ALL_CLIPS];
  const models = modelFilter ? ALL_MODELS.filter((m) => modelFilter.includes(m.key)) : [...ALL_MODELS];
  const totalRuns = clips.length * models.length;

  console.log(`\n${"=".repeat(70)}`);
  console.log(`RIDEMIND — PERCEPTION VIABILITY EXPERIMENT`);
  console.log(`Clips:          ${clips.map((c) => c.id).join(", ")}`);
  console.log(`Models:         ${models.map((m) => m.key).join(", ")}`);
  console.log(`Frames/clip:    ${FRAMES_PER_CLIP}`);
  console.log(`Gemini video:   ${geminiVideo}`);
  console.log(`Runs:           ${totalRuns}`);
  console.log(`Output:         ${OUTPUT_DIR}/`);
  console.log(`${"=".repeat(70)}\n`);

  // Validate all clip paths exist before starting
  const missing = clips.filter((c) => !fs.existsSync(c.path));
  if (missing.length > 0) {
    console.error(`Missing video files:`);
    missing.forEach((c) => console.error(`  ${c.id}: ${c.path}`));
    process.exit(1);
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Initialise API clients
  const openai      = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const genAI       = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY!);
  const anthropic   = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const allResults: PerceptionResult[] = [];
  let runIndex = 0;

  for (const clip of clips) {
    console.log(`\n${"─".repeat(70)}`);
    console.log(`CLIP: ${clip.label} (${clip.id})`);
    console.log(`${"─".repeat(70)}`);

    // Extract frames once per clip, reused across all models
    console.log(`  [frames] extracting...`);
    const { paths: framePaths, dimensions: frameDimensions } = await extractFrames(clip);
    console.log(`  [frames] ${framePaths.length} frames @ ${frameDimensions}\n`);

    for (const model of models) {
      runIndex++;
      process.stdout.write(`[${runIndex}/${totalRuns}] `);

      const result = await runPerception(
        clip, model, framePaths, frameDimensions, geminiVideo,
        openai, genAI, fileManager, anthropic
      );

      // Append _video suffix when Gemini is run in video mode to distinguish from frames run
      const videoSuffix = geminiVideo && model.provider === "gemini" ? "_video" : "";
      const outFile = path.join(OUTPUT_DIR, `${clip.id}_${model.key}${videoSuffix}.json`);
      fs.writeFileSync(outFile, JSON.stringify(result, null, 2));
      console.log(`     saved → ${outFile}`);

      allResults.push(result);
    }
  }

  // Final summary
  const failed = allResults.filter((r) => r.error);

  console.log(`\n${"=".repeat(70)}`);
  console.log(`COMPLETE — ${allResults.length - failed.length}/${totalRuns} succeeded`);

  if (failed.length > 0) {
    console.log(`\nFAILURES (${failed.length}):`);
    failed.forEach((r) => console.log(`  ${r.clip} × ${r.model}: ${r.error}`));
  }

  console.log(`\nResults in: ${OUTPUT_DIR}/`);
  console.log(`${"=".repeat(70)}\n`);
}

main().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err);
  console.error("Perception test error:", message);
  process.exit(1);
});
