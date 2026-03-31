import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static";
import ffprobeStatic from "ffprobe-static";
import fs from "fs";
import path from "path";
import { config } from "dotenv";

config({ path: ".env.local" });
ffmpeg.setFfmpegPath(ffmpegStatic as string);
ffmpeg.setFfprobePath(ffprobeStatic.path);

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const FRAME_COUNT = 16;

// Logs token usage and stop reason after each Claude generation call.
function logClaudeStats(label: string, response: Anthropic.Message, text: string): void {
  const tokens = response.usage.output_tokens;
  const stopReason = response.stop_reason ?? "unknown";
  const truncationWarning = stopReason === "max_tokens" ? "  ⚠ TRUNCATED — hit token cap" : "";
  console.log(`[${label}] ${text.length} chars, ${tokens} output tokens, stop: ${stopReason}${truncationWarning}`);
}

// Logs token usage and finish reason after each OpenAI generation call.
function logOpenAIStats(label: string, response: OpenAI.Chat.ChatCompletion, text: string): void {
  const tokens = response.usage?.completion_tokens ?? "unknown";
  const finishReason = response.choices[0]?.finish_reason ?? "unknown";
  const truncationWarning = finishReason === "length" ? "  ⚠ TRUNCATED — hit token cap" : "";
  console.log(`[${label}] ${text.length} chars, ${tokens} output tokens, finish: ${finishReason}${truncationWarning}`);
}

// Loads selected knowledge base markdown files into a single combined string.
// Each file is prefixed with its path so the model can see what domain it came from.
// Returns an empty string if the knowledge-base directory doesn't exist.
// (Copied from test-coaching-kb.ts — keep in sync if either changes)
function loadKnowledgeBase(): string {
  const kbRoot = "knowledge-base";
  const MAX_CHARS = 20000;

  function extractSections(content: string): string {
    const KEEP = ["OVERVIEW", "DIAGNOSTIC CUES", "COACHING CUES", "COMMON ERRORS", "ERROR PATTERNS"];
    const parts = content.split(/(?=\n## )/);
    const kept: string[] = [];

    for (const part of parts) {
      const headingMatch = part.match(/^\n## ([^\n]+)/);
      if (!headingMatch) {
        const titleMatch = part.match(/^# .+/m);
        if (titleMatch) kept.push(titleMatch[0]);
      } else {
        const heading = headingMatch[1].toUpperCase();
        if (KEEP.some((kw) => heading.includes(kw))) {
          kept.push(part);
        }
      }
    }

    return kept.join("\n");
  }

  function loadFromDir(subDir: string, keywords?: string[]): string[] {
    const dirPath = path.join(kbRoot, subDir);
    if (!fs.existsSync(dirPath)) return [];

    let files: string[];
    try {
      files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".md"));
    } catch {
      return [];
    }

    if (keywords && keywords.length > 0) {
      files = files.filter((f) =>
        keywords.some((kw) => f.toLowerCase().includes(kw.toLowerCase()))
      );
    }

    const results: string[] = [];
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      try {
        const raw = fs.readFileSync(filePath, "utf-8");
        const extracted = extractSections(raw);
        results.push(`\n--- ${subDir}/${file} ---\n${extracted}`);
      } catch {
        // skip unreadable files silently
      }
    }
    return results;
  }

  const allExtracts: string[] = [
    ...loadFromDir("06-hill-technical-terrain"),
    ...loadFromDir("01-rider-biomechanics", ["standing", "position"]),
    ...loadFromDir("08-error-patterns-diagnostics", ["body", "position"]),
    ...loadFromDir("02-bike-control-inputs", ["throttle", "clutch"]),
  ];

  const keptExtracts: string[] = [];
  let totalChars = 0;
  let droppedChars = 0;

  for (const extract of allExtracts) {
    if (totalChars + extract.length <= MAX_CHARS) {
      keptExtracts.push(extract);
      totalChars += extract.length;
    } else {
      droppedChars += extract.length;
    }
  }

  if (droppedChars > 0) {
    console.log(
      `Knowledge base trimmed: ${Math.round(droppedChars / 1000)}k characters dropped to stay under ${MAX_CHARS / 1000}k cap`
    );
  }

  const combined = keptExtracts.join("\n");
  console.log(
    `Knowledge base loaded: ${keptExtracts.length}/${allExtracts.length} files, ${Math.round(combined.length / 1000)}k characters`
  );
  return combined;
}

async function extractFrames(videoPath: string): Promise<string[]> {
  const tempDir = path.join("scripts", "temp-frames");
  if (fs.existsSync(tempDir)) { fs.rmSync(tempDir, { recursive: true }); }
  fs.mkdirSync(tempDir, { recursive: true });

  const duration = await new Promise<number>((resolve, reject) => {
    ffmpeg.ffprobe(videoPath, (err, metadata) => {
      if (err) reject(err);
      else resolve(metadata.format.duration || 0);
    });
  });
  console.log("Video duration: " + duration.toFixed(1) + " seconds");

  const timestamps: number[] = [];
  for (let i = 0; i < FRAME_COUNT; i++) {
    timestamps.push((duration / (FRAME_COUNT + 1)) * (i + 1));
  }

  const framePaths: string[] = [];
  for (let i = 0; i < timestamps.length; i++) {
    const outputPath = path.join(tempDir, "frame-" + i + ".jpg");
    framePaths.push(outputPath);
    await new Promise<void>((resolve, reject) => {
      ffmpeg(videoPath)
        .seekInput(timestamps[i])
        .frames(1)
        .output(outputPath)
        .size("1920x?")
        .on("end", () => resolve())
        .on("error", (err) => reject(err))
        .run();
    });
    console.log("Extracted frame " + (i + 1) + "/" + FRAME_COUNT + " at " + timestamps[i].toFixed(1) + "s");
  }
  return framePaths;
}

async function extractAudio(videoPath: string): Promise<string> {
  const tempDir = path.join("scripts", "temp-frames");
  if (!fs.existsSync(tempDir)) { fs.mkdirSync(tempDir, { recursive: true }); }

  const audioPath = path.join(tempDir, "audio.wav");

  await new Promise<void>((resolve, reject) => {
    ffmpeg(videoPath)
      .noVideo()
      .audioCodec("pcm_s16le")
      .audioFrequency(16000)
      .audioChannels(1)
      .output(audioPath)
      .on("end", () => resolve())
      .on("error", (err) => reject(err))
      .run();
  });

  console.log("Audio extracted successfully");
  return audioPath;
}

function fileToBase64(filePath: string): string {
  return fs.readFileSync(filePath).toString("base64");
}

// Extracts the text content from a Claude response (content is an array of blocks).
function extractClaudeText(response: Anthropic.Message): string {
  return response.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");
}

async function analyseRiding(
  framePaths: string[],
  audioPath: string,
  kbContent: string
): Promise<string> {

  // Step 1: Visual observation — Claude with 16 frames, no KB, pure literal description
  console.log("Step 1: Visual observation (no KB)...\n");

  const imageBlocks: Anthropic.ImageBlockParam[] = framePaths.map((fp) => ({
    type: "image",
    source: {
      type: "base64",
      media_type: "image/jpeg",
      data: fileToBase64(fp),
    },
  }));

  const visualResponse = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2000,
    system:
      "You are analyzing video frames of off-road motorcycle riding. Describe ONLY what you observe — do not coach, do not judge, do not say what is correct or incorrect. Be extremely specific and literal about:\n- Rider body position in each frame (sitting, standing, crouching — describe exactly what you see)\n- Rider posture (leaning forward, upright, leaning back, arms bent or straight)\n- Head position and where the rider appears to be looking\n- Bike angle and lean\n- Terrain type and conditions visible\n- Line the rider is taking\n- Any visible obstacles\n- Speed impression (fast, moderate, slow, stopped)\nDo NOT use phrases like 'good technique' or 'correct position'. Just describe what you literally see in each frame, frame by frame.",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Describe what you literally observe in each of these 16 frames from a motorcycle riding clip. Go frame by frame. For EVERY frame, explicitly state whether the rider is SITTING on the seat or STANDING on the foot pegs — look carefully at whether their body weight is on the seat or whether there is a visible gap between the rider and the seat. Also note if their feet are on the pegs, off the pegs, or on the ground.",
          },
          ...imageBlocks,
        ],
      },
    ],
  });

  const visualObs = extractClaudeText(visualResponse);
  logClaudeStats("Step 1 visual", visualResponse, visualObs);
  console.log("Visual observation complete.\n");
  console.log("\n--- RAW VISUAL OBSERVATION ---");
  console.log(visualObs);
  console.log("--- END RAW VISUAL ---\n");

  // Step 2: Audio observation — GPT-4o audio-preview (Claude does not support audio input)
  console.log("Step 2: Audio observation (no KB, GPT-4o audio)...\n");

  const audioBase64 = fileToBase64(audioPath);
  const audioResponse = await openai.chat.completions.create({
    model: "gpt-4o-audio-preview",
    max_tokens: 1000,
    messages: [
      {
        role: "system",
        content:
          "You are analyzing audio from an off-road motorcycle riding clip. Describe ONLY what you hear — do not coach or judge. Be specific about:\n- Engine RPM patterns (high, low, steady, fluctuating)\n- Throttle application (smooth, jerky, sudden bursts, constant)\n- Any clutch sounds\n- Impact or obstacle sounds\n- Braking sounds\n- Terrain interaction sounds (gravel, mud, rocks)\n- Any moments of wheel spin (high RPM without apparent forward motion)\nJust describe the sounds chronologically through the clip.",
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Describe what you literally hear in this off-road motorcycle riding clip, chronologically.",
          },
          {
            type: "input_audio",
            input_audio: { data: audioBase64, format: "wav" },
          },
        ],
      },
    ],
  });

  const audioObs = audioResponse.choices[0].message.content || "";
  logOpenAIStats("Step 2 audio", audioResponse, audioObs);
  console.log("Audio observation complete.\n");
  console.log("\n--- RAW AUDIO OBSERVATION ---");
  console.log(audioObs);
  console.log("--- END RAW AUDIO ---\n");

  // Step 3: Scenario classification — Claude, text only, no KB
  console.log("Step 3: Scenario classification...\n");

  const classResponse = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 300,
    system:
      "Based on these observations from a motorcycle riding clip, classify what type of riding scenario this is. Pick the primary category:\n- Hill climb\n- Descent\n- Corner/turn\n- Obstacle crossing (log, rock, step)\n- Flat terrain riding\n- Technical slow-speed section\n- Jump or drop\n- Other (describe)\n\nAlso note: the terrain surface (loose/hard-pack/mud/rocks/roots), the approximate difficulty, and whether the rider appeared to succeed or struggle.\n\nRespond in this format:\nSCENARIO: [category]\nSURFACE: [type]\nDIFFICULTY: [easy/moderate/hard]\nOUTCOME: [clean/struggled/failed]\nSUMMARY: [one sentence description]",
    messages: [
      {
        role: "user",
        content: "VISUAL OBSERVATIONS:\n" + visualObs + "\n\nAUDIO OBSERVATIONS:\n" + audioObs,
      },
    ],
  });

  const scenarioClass = extractClaudeText(classResponse);
  logClaudeStats("Step 3 classification", classResponse, scenarioClass);
  console.log("Scenario classification complete.\n");
  console.log(scenarioClass + "\n");

  // Step 4: Coaching — KB introduced here for the first time, Claude text only
  console.log("Step 4: Coaching (with knowledge base)...\n");

  const coachResponse = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 3000,
    system:
      "You are an expert enduro riding coach providing personalised feedback after watching a rider's attempt. You have a comprehensive knowledge base of riding technique — use it to give specific, informed feedback.\n\nIMPORTANT: The observations below are objective descriptions of what was seen and heard. Trust them completely. Do not reinterpret or soften what was observed. If the observations say the rider was sitting, they were sitting — do not say they were standing.\n\nKNOWLEDGE BASE:\n" +
      kbContent,
    messages: [
      {
        role: "user",
        content:
          "VISUAL OBSERVATIONS:\n" +
          visualObs +
          "\n\nAUDIO OBSERVATIONS:\n" +
          audioObs +
          "\n\nSCENARIO:\n" +
          scenarioClass +
          "\n\nUsing the knowledge base, compare what was observed against correct technique for this scenario. Provide feedback in this format:\n\n## What I Saw\nDescribe the scenario in 2-3 sentences. Be specific about terrain type, what the rider was attempting, and the conditions.\n\n## What You Did Well\n1-2 specific things the rider did correctly, referencing technique from the knowledge base. If nothing was done well, be honest and say so — do not invent positives.\n\n## What Needs Work\n2-3 specific technique issues, each with:\n- What I observed (from the visual/audio observations — quote them)\n- Why it matters (from the knowledge base)\n- What correct technique looks like (from the knowledge base)\n\n## Your Coaching Plan\n2-3 specific drills that directly address the issues observed. Include the drill name, brief setup, and what to focus on.\n\n## Confidence Note\nRate confidence (high/medium/low) and explain what additional info would help.",
      },
    ],
  });

  const coachingOutput = extractClaudeText(coachResponse);
  logClaudeStats("Step 4 coaching", coachResponse, coachingOutput);
  return coachingOutput;
}

async function main() {
  const videoPath = process.argv[2];
  if (!videoPath) { console.error("Usage: npx tsx scripts/test-coaching-claude.ts path/to/video.mp4"); process.exit(1); }
  if (!fs.existsSync(videoPath)) { console.error("File not found: " + videoPath); process.exit(1); }
  if (!process.env.ANTHROPIC_API_KEY) { console.error("ANTHROPIC_API_KEY not found in .env.local"); process.exit(1); }
  if (!process.env.OPENAI_API_KEY) { console.error("OPENAI_API_KEY not found in .env.local (needed for audio step)"); process.exit(1); }

  console.log("=== RideMind - Claude Coaching Test ===\n");
  console.log("Video: " + videoPath + "\n");

  console.log("Loading knowledge base...\n");
  const kbContent = loadKnowledgeBase();

  console.log("\nExtracting frames from video...\n");
  const framePaths = await extractFrames(videoPath);

  console.log("\nExtracting audio from video...\n");
  const audioPath = await extractAudio(videoPath);

  console.log("\nStarting analysis pipeline...\n");
  const feedback = await analyseRiding(framePaths, audioPath, kbContent);

  console.log("=== COACHING FEEDBACK ===\n");
  console.log(feedback);
  console.log("\n=== END ===\n");

  // Save output with timestamp so results can be compared against GPT-4o and Gemini versions
  const timestamp = new Date()
    .toISOString()
    .replace(/:/g, "-")
    .replace(/\..+/, "");
  const outputPath = path.join("scripts", `coaching-output-claude-${timestamp}.txt`);
  const outputContent = [
    `RideMind - Claude Coaching Output`,
    `Generated: ${new Date().toISOString()}`,
    `Video: ${videoPath}`,
    ``,
    feedback,
  ].join("\n");
  fs.writeFileSync(outputPath, outputContent, "utf-8");
  console.log(`Output saved to: ${outputPath}\n`);

  const tempDir = path.join("scripts", "temp-frames");
  if (fs.existsSync(tempDir)) { fs.rmSync(tempDir, { recursive: true }); }
}

main().catch((err) => { console.error("Error:", err.message); process.exit(1); });
