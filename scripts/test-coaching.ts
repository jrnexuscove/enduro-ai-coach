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

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const FRAME_COUNT = 8;

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
        .size("720x?")
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

async function analyseRiding(framePaths: string[], audioPath: string): Promise<string> {
  console.log("\nSending frames to OpenAI for visual analysis...\n");

  // Step 1: Analyze visuals
  const imageMessages = framePaths.map((fp) => ({
    type: "image_url" as const,
    image_url: { url: "data:image/jpeg;base64," + fileToBase64(fp), detail: "low" as const },
  }));

  const visualResponse = await openai.chat.completions.create({
    model: "gpt-4o",
    max_tokens: 800,
    messages: [
      {
        role: "system",
        content: "You are an expert off-road motorcycle / enduro riding coach analyzing video frames. Focus on visual technique - body position, line choice, balance, posture, head position, bike handling, terrain interaction.",
      },
      {
        role: "user",
        content: [
          { type: "text", text: "Analyze these 8 frames from an enduro riding clip. Focus on visual riding technique." },
          ...imageMessages,
        ],
      },
    ],
  });

  console.log("Visual analysis complete. Analyzing audio...\n");

  // Step 2: Analyze audio
  const audioBase64 = fileToBase64(audioPath);
  const audioResponse = await openai.chat.completions.create({
    model: "gpt-4o-audio-preview",
    max_tokens: 800,
    messages: [
      {
        role: "system",
        content: "You are an expert off-road motorcycle / enduro riding coach analyzing engine audio. Focus on throttle application, RPM management, clutch engagement, impact sounds, braking sounds, and terrain interaction audio cues.",
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Analyze the audio from this enduro riding clip. Focus on engine sound, throttle application, clutch work, and any impact or terrain sounds.",
          },
          {
            type: "input_audio",
            input_audio: { data: audioBase64, format: "wav" },
          },
        ],
      },
    ],
  });

  console.log("Audio analysis complete. Combining insights...\n");

  // Step 3: Combine both analyses
  const combinedResponse = await openai.chat.completions.create({
    model: "gpt-4o",
    max_tokens: 1500,
    messages: [
      {
        role: "system",
        content: "You are an expert enduro riding coach. Combine visual and audio analysis into structured coaching feedback.\n\nRespond in this exact format:\n\n## Scenario\nBriefly describe what appears to be happening.\n\n## Visual Observations\nSummary of visual technique observations.\n\n## Audio Observations\nSummary of audio/engine sound observations.\n\n## What May Need Improvement\nIdentify 2-3 specific improvements based on both visual and audio analysis.\n\n## What To Try Next Time\nGive 2-3 practical, actionable tips.\n\n## Confidence Note\nRate confidence (high/medium/low) and explain what would help.",
      },
      {
        role: "user",
        content: `Here are two analyses of the same enduro riding clip. Combine them into structured coaching feedback.

VISUAL ANALYSIS:
${visualResponse.choices[0].message.content}

AUDIO ANALYSIS:
${audioResponse.choices[0].message.content}`,
      },
    ],
  });

  return combinedResponse.choices[0].message.content || "No response received";
}

async function main() {
  const videoPath = process.argv[2];
  if (!videoPath) { console.error("Usage: npx tsx scripts/test-coaching.ts path/to/video.mp4"); process.exit(1); }
  if (!fs.existsSync(videoPath)) { console.error("File not found: " + videoPath); process.exit(1); }
  if (!process.env.OPENAI_API_KEY) { console.error("OPENAI_API_KEY not found in .env.local"); process.exit(1); }

  console.log("=== RideMind - Coaching Validation Test (Visual + Audio) ===\n");
  console.log("Video: " + videoPath + "\n");

  console.log("Step 1: Extracting frames from video...\n");
  const framePaths = await extractFrames(videoPath);

  console.log("\nStep 2: Extracting audio from video...\n");
  const audioPath = await extractAudio(videoPath);

  console.log("\nStep 3: Analysing riding technique (visual + audio)...\n");
  const feedback = await analyseRiding(framePaths, audioPath);

  console.log("=== COACHING FEEDBACK ===\n");
  console.log(feedback);
  console.log("\n=== END ===\n");

  const tempDir = path.join("scripts", "temp-frames");
  if (fs.existsSync(tempDir)) { fs.rmSync(tempDir, { recursive: true }); }
}

main().catch((err) => { console.error("Error:", err.message); process.exit(1); });