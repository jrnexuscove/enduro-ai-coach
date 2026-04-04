// RideMind Pipeline — Frame Extractor
// Adapts the ffmpeg pattern from scripts/test-coaching-kb.ts.
// Returns Buffer[] instead of file paths; cleans up temp dir in a finally block.

import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static";
import ffprobeStatic from "ffprobe-static";
import fs from "fs";
import path from "path";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(ffmpeg as any).setFfmpegPath(ffmpegStatic as string);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(ffmpeg as any).setFfprobePath((ffprobeStatic as any).path);

const TEMP_DIR = path.join("pipeline", "temp-frames");

/**
 * Extracts evenly-spaced frames from a video file and returns them as JPEG Buffers.
 * Temp files are always cleaned up, even on partial failure.
 */
export async function extractFrames(
  videoPath: string,
  frameCount: number = 16
): Promise<Buffer[]> {
  if (fs.existsSync(TEMP_DIR)) {
    fs.rmSync(TEMP_DIR, { recursive: true });
  }
  fs.mkdirSync(TEMP_DIR, { recursive: true });

  try {
    // Get video duration
    const duration = await new Promise<number>((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (ffmpeg as any).ffprobe(videoPath, (err: Error | null, metadata: any) => {
        if (err) reject(err);
        else resolve(metadata.format.duration ?? 0);
      });
    });
    console.log(`[Frame Extractor] Duration: ${duration.toFixed(1)}s`);

    // Calculate evenly-spaced timestamps (avoid first and last frame)
    const timestamps: number[] = [];
    for (let i = 0; i < frameCount; i++) {
      timestamps.push((duration / (frameCount + 1)) * (i + 1));
    }

    // Extract each frame to disk
    const framePaths: string[] = [];
    for (let i = 0; i < timestamps.length; i++) {
      const outputPath = path.join(TEMP_DIR, `frame-${i}.jpg`);
      framePaths.push(outputPath);

      await new Promise<void>((resolve, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (ffmpeg as any)(videoPath)
          .seekInput(timestamps[i])
          .frames(1)
          .output(outputPath)
          .size("1920x?")
          .on("end", () => resolve())
          .on("error", (err: Error) => reject(err))
          .run();
      });

      console.log(
        `[Frame Extractor] Frame ${i + 1}/${frameCount} at ${timestamps[i].toFixed(1)}s`
      );
    }

    // Read all frames into Buffers
    const buffers = framePaths.map((fp) => fs.readFileSync(fp));
    console.log(`[Frame Extractor] Extracted ${buffers.length} frames`);
    return buffers;
  } finally {
    // Always clean up temp files, even on failure
    if (fs.existsSync(TEMP_DIR)) {
      fs.rmSync(TEMP_DIR, { recursive: true });
    }
  }
}
