import { GoogleGenerativeAI, EnhancedGenerateContentResponse } from "@google/generative-ai";
import { GoogleAIFileManager, FileState } from "@google/generative-ai/server";
import fs from "fs";
import path from "path";
import { config } from "dotenv";

config({ path: ".env.local" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY!);

// Single model instance — system instruction is passed per-call in generateContent
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Logs token usage and finish reason after each generation call so we can tell
// whether truncation is a token-cap issue or a response-parsing issue.
function logResponseStats(label: string, response: EnhancedGenerateContentResponse, text: string): void {
  const tokens = response.usageMetadata?.candidatesTokenCount ?? "unknown";
  const finishReason = response.candidates?.[0]?.finishReason ?? "unknown";
  const truncationWarning = finishReason === "MAX_TOKENS" ? "  ⚠ TRUNCATED — hit token cap" : "";
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

// Uploads a video file to the Gemini Files API and polls until it is ready.
// Returns the file URI and mimeType needed to reference it in generation calls.
async function uploadVideo(videoPath: string): Promise<{ uri: string; mimeType: string }> {
  const fileSizeMB = Math.round(fs.statSync(videoPath).size / 1024 / 1024);
  console.log(`Uploading video (${fileSizeMB}MB) to Gemini Files API...`);

  const uploadResult = await fileManager.uploadFile(videoPath, {
    mimeType: "video/mp4",
    displayName: path.basename(videoPath),
  });

  let file = uploadResult.file;
  console.log(`Upload complete. Waiting for processing...`);

  // Poll every 3 seconds until the file leaves PROCESSING state
  while (file.state === FileState.PROCESSING) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    file = await fileManager.getFile(file.name);
    process.stdout.write(".");
  }
  process.stdout.write("\n");

  if (file.state === FileState.FAILED) {
    const reason = file.error?.message || "unknown error";
    throw new Error(`Gemini video processing failed: ${reason}`);
  }

  console.log(`Video ready.\n`);
  return { uri: file.uri, mimeType: "video/mp4" };
}

async function analyseRiding(
  videoRef: { uri: string; mimeType: string },
  kbContent: string
): Promise<string> {
  // Reusable part referencing the already-uploaded video file
  const videoPart = { fileData: { mimeType: videoRef.mimeType, fileUri: videoRef.uri } };

  // Step 1: Visual observation — no KB, describe only what is literally seen
  console.log("Step 1: Visual observation (no KB)...\n");

  const visualResponse = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          videoPart,
          {
            text: "Describe what you literally observe happening in this motorcycle riding video, chronologically.",
          },
        ],
      },
    ],
    systemInstruction:
      "You are analyzing a video of off-road motorcycle riding. Describe ONLY what you observe — do not coach, do not judge, do not say what is correct or incorrect. Be extremely specific and literal about:\n- Rider body position throughout the clip (sitting on seat vs standing on foot pegs — watch carefully for whether their weight is on the seat or whether there is a gap between rider and seat)\n- Rider posture changes over time (leaning forward, upright, leaning back)\n- Head position and where the rider appears to be looking\n- Bike angle and lean throughout\n- Terrain type and conditions\n- Line the rider takes\n- Any visible obstacles\n- Speed changes (accelerating, decelerating, stopped)\n- Whether the rider completes the section successfully or stops/bails/falls\n- Any moments where feet come off the pegs or touch the ground\nDo NOT use phrases like 'good technique' or 'correct position'. Just describe what you literally see happening chronologically through the clip.",
    generationConfig: { maxOutputTokens: 2000 },
  });

  const visualObs = visualResponse.response.text();
  logResponseStats("Step 1 visual", visualResponse.response, visualObs);
  console.log("Visual observation complete.\n");
  console.log("\n--- RAW VISUAL OBSERVATION ---");
  console.log(visualObs);
  console.log("--- END RAW VISUAL ---\n");

  // Step 2: Audio observation — no KB, describe only what is literally heard
  console.log("Step 2: Audio observation (no KB)...\n");

  const audioResponse = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          videoPart,
          {
            text: "Describe what you literally hear in this motorcycle riding video, chronologically.",
          },
        ],
      },
    ],
    systemInstruction:
      "You are analyzing the audio from an off-road motorcycle riding clip. Describe ONLY what you hear chronologically — do not coach or judge. Be specific about:\n- Engine RPM patterns (high, low, steady, fluctuating)\n- Throttle application (smooth, jerky, sudden bursts, constant)\n- Any clutch sounds\n- Impact or obstacle sounds\n- Braking sounds\n- Terrain interaction sounds (gravel, mud, rocks)\n- Any moments of wheel spin (high RPM without forward motion sound)\n- Whether the engine stalls or the rider stops\n- Any voices or conversation\nJust describe the sounds chronologically through the clip.",
    generationConfig: { maxOutputTokens: 2000 },
  });

  const audioObs = audioResponse.response.text();
  logResponseStats("Step 2 audio", audioResponse.response, audioObs);
  console.log("Audio observation complete.\n");
  console.log("\n--- RAW AUDIO OBSERVATION ---");
  console.log(audioObs);
  console.log("--- END RAW AUDIO ---\n");

  // Step 3: Scenario classification — text only, no video or KB needed
  console.log("Step 3: Scenario classification...\n");

  const classResponse = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          {
            text: "VISUAL OBSERVATIONS:\n" + visualObs + "\n\nAUDIO OBSERVATIONS:\n" + audioObs,
          },
        ],
      },
    ],
    systemInstruction:
      "Based on these observations from a motorcycle riding clip, classify what type of riding scenario this is. Pick the primary category:\n- Hill climb\n- Descent\n- Corner/turn\n- Obstacle crossing (log, rock, step)\n- Flat terrain riding\n- Technical slow-speed section\n- Jump or drop\n- Other (describe)\n\nAlso note: the terrain surface (loose/hard-pack/mud/rocks/roots), the approximate difficulty, and whether the rider appeared to succeed or struggle.\n\nRespond in this format:\nSCENARIO: [category]\nSURFACE: [type]\nDIFFICULTY: [easy/moderate/hard]\nOUTCOME: [clean/struggled/failed]\nSUMMARY: [one sentence description]",
    generationConfig: { maxOutputTokens: 500 },
  });

  const scenarioClass = classResponse.response.text();
  logResponseStats("Step 3 classification", classResponse.response, scenarioClass);
  console.log("Scenario classification complete.\n");
  console.log(scenarioClass + "\n");

  // Step 4: Coaching — KB introduced here for the first time, text only
  console.log("Step 4: Coaching (with knowledge base)...\n");

  const coachResponse = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          {
            text:
              "VISUAL OBSERVATIONS:\n" +
              visualObs +
              "\n\nAUDIO OBSERVATIONS:\n" +
              audioObs +
              "\n\nSCENARIO:\n" +
              scenarioClass +
              "\n\nUsing the knowledge base, compare what was observed against correct technique for this scenario. Provide feedback in this format:\n\n## What I Saw\nDescribe the scenario in 2-3 sentences. Be specific about terrain type, what the rider was attempting, and the conditions.\n\n## What You Did Well\n1-2 specific things the rider did correctly, referencing technique from the knowledge base. If nothing was done well, be honest and say so — do not invent positives.\n\n## What Needs Work\n2-3 specific technique issues, each with:\n- What I observed (from the visual/audio observations — quote them)\n- Why it matters (from the knowledge base)\n- What correct technique looks like (from the knowledge base)\n\n## Your Coaching Plan\n2-3 specific drills that directly address the issues observed. Include the drill name, brief setup, and what to focus on.\n\n## Confidence Note\nRate confidence (high/medium/low) and explain what additional info would help.",
          },
        ],
      },
    ],
    systemInstruction:
      "You are an expert enduro riding coach providing personalised feedback after watching a rider's attempt. You have a comprehensive knowledge base of riding technique — use it to give specific, informed feedback.\n\nIMPORTANT: The observations below are objective descriptions of what was seen and heard. Trust them completely. Do not reinterpret or soften what was observed. If the observations say the rider was sitting, they were sitting — do not say they were standing.\n\nKNOWLEDGE BASE:\n" +
      kbContent,
    generationConfig: { maxOutputTokens: 5000 },
  });

  const coachingOutput = coachResponse.response.text();
  logResponseStats("Step 4 coaching", coachResponse.response, coachingOutput);
  return coachingOutput;
}

async function main() {
  const videoPath = process.argv[2];
  if (!videoPath) { console.error("Usage: npx tsx scripts/test-coaching-gemini.ts path/to/video.mp4"); process.exit(1); }
  if (!fs.existsSync(videoPath)) { console.error("File not found: " + videoPath); process.exit(1); }
  if (!process.env.GEMINI_API_KEY) { console.error("GEMINI_API_KEY not found in .env.local"); process.exit(1); }

  console.log("=== RideMind - Gemini Coaching Test ===\n");
  console.log("Video: " + videoPath + "\n");

  console.log("Loading knowledge base...\n");
  const kbContent = loadKnowledgeBase();

  console.log("\nUploading video to Gemini Files API...\n");
  let videoRef: { uri: string; mimeType: string };
  try {
    videoRef = await uploadVideo(videoPath);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Video upload failed: " + message);
    console.error("If the file is not an MP4, or exceeds Gemini size limits, try a shorter clip.");
    process.exit(1);
  }

  console.log("Starting analysis pipeline...\n");
  const feedback = await analyseRiding(videoRef, kbContent);

  console.log("=== COACHING FEEDBACK ===\n");
  console.log(feedback);
  console.log("\n=== END ===\n");

  // Save output with timestamp so results can be compared against the GPT-4o version
  const timestamp = new Date()
    .toISOString()
    .replace(/:/g, "-")
    .replace(/\..+/, "");
  const outputPath = path.join("scripts", `coaching-output-gemini-${timestamp}.txt`);
  const outputContent = [
    `RideMind - Gemini Coaching Output`,
    `Generated: ${new Date().toISOString()}`,
    `Video: ${videoPath}`,
    ``,
    feedback,
  ].join("\n");
  fs.writeFileSync(outputPath, outputContent, "utf-8");
  console.log(`Output saved to: ${outputPath}\n`);
}

main().catch((err) => { console.error("Error:", err.message); process.exit(1); });
