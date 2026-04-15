// RideMind Pipeline — Runner
// Chains Stage 0 (Observability Gate) + Stages 1–4 sequentially.
// Stage 0 defines the trust envelope; Stages 1–4 operate within it.

import path from "path";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
import {
  type ModelProvider,
  type PipelineResult,
  type GatedPipelineResult,
  type Stage0Output,
} from "./types.js";
import { extractFrames } from "./frame-extractor.js";
import { runStage0 } from "./stage0-gate.js";
import { runStage1 } from "./stage1-camera.js";
import { runStage2 } from "./stage2-observability.js";
import { runStage3 } from "./stage3-intent.js";
import { runStage4 } from "./stage4-terrain-feature.js";

// ————————————————————————————————————————————
// Trust envelope enforcement
// ————————————————————————————————————————————

/**
 * Clamps a single confidence value to the Stage 0 max_observation_confidence ceiling.
 * Call this explicitly per field — enforcement is field-aware, not generic.
 */
function applyS0Cap(value: number, stage0: Stage0Output): number {
  if (!stage0.confidence_ceilings) return value;
  return Math.min(value, stage0.confidence_ceilings.max_observation_confidence);
}

// ————————————————————————————————————————————
// Video metadata probe
// ————————————————————————————————————————————

interface VideoMetadata {
  filename: string;
  duration_seconds: number;
  resolution: { width: number; height: number };
  fps: number;
  file_size_bytes: number;
}

/**
 * Probes video metadata using ffprobe (already configured via frame-extractor.ts import).
 * Called after frame extraction so ffprobe paths are guaranteed to be set.
 */
function probeVideoMetadata(videoPath: string): Promise<VideoMetadata> {
  const filename = path.basename(videoPath);
  const file_size_bytes = fs.statSync(videoPath).size;

  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ffmpeg as any).ffprobe(videoPath, (err: Error | null, metadata: any) => {
      if (err) {
        reject(err);
        return;
      }
      const duration_seconds: number = metadata.format?.duration ?? 0;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const videoStream = metadata.streams?.find((s: any) => s.codec_type === "video");
      const width: number = videoStream?.width ?? 0;
      const height: number = videoStream?.height ?? 0;
      // r_frame_rate is a fraction string like "30000/1001" or a plain integer string
      let fps = 0;
      if (videoStream?.r_frame_rate) {
        const parts = String(videoStream.r_frame_rate).split("/");
        fps =
          parts.length === 2
            ? parseFloat(parts[0]) / parseFloat(parts[1])
            : parseFloat(videoStream.r_frame_rate);
      }
      resolve({ filename, duration_seconds, resolution: { width, height }, fps, file_size_bytes });
    });
  });
}

// ————————————————————————————————————————————
// Pipeline entry point
// ————————————————————————————————————————————

/**
 * Runs the full pipeline: Stage 0 gate + Stages 1–4 perception.
 *
 * Returns GatedPipelineResult (stage0 only) when Stage 0 rejects the clip.
 * Returns PipelineResult (stage0 + stages 1–4) when Stage 0 passes or degrades.
 *
 * Trust envelope enforcement (field-aware):
 * - Stage 1: confidence capped via applyS0Cap
 * - Stage 2: overall_confidence capped via applyS0Cap
 * - Stage 3: confidence capped via applyS0Cap
 * - Stage 4: surface.confidence + each features_detected[].confidence capped via applyS0Cap
 * - Stage 10: pass stage0 to runStage10 — buildCoachingSpecificityConstraint injects
 *   the specificity constraint into the Stage 10 user prompt.
 */
export async function runPipeline(
  videoPath: string,
  model: ModelProvider,
  frameCount: number = 16
): Promise<GatedPipelineResult | PipelineResult> {
  console.log(`\n[Pipeline] Starting — model: ${model.name}, frames: ${frameCount}`);
  console.log(`[Pipeline] Video: ${videoPath}\n`);

  // Frame extraction
  console.log("[Pipeline] Extracting frames...");
  console.time("frame-extraction");
  const frames = await extractFrames(videoPath, frameCount);
  console.timeEnd("frame-extraction");
  console.log();

  // Video metadata (for Stage 0 — ffprobe paths set by frame-extractor.ts import)
  console.log("[Pipeline] Probing video metadata...");
  const metadata = await probeVideoMetadata(videoPath);
  console.log(`  → duration: ${metadata.duration_seconds.toFixed(1)}s, ${metadata.resolution.width}x${metadata.resolution.height}, ${metadata.fps.toFixed(1)}fps\n`);

  // Stage 0 — Observability Gate
  console.log("[Stage 0] Observability Gate...");
  console.time("stage0");
  const stage0 = await runStage0(model, { frames, metadata });
  console.timeEnd("stage0");
  console.log(`  → gate: ${stage0.gate}${stage0.failure_mode ? ` (${stage0.failure_mode})` : ""}`);
  if (stage0.confidence_ceilings) {
    console.log(`  → max_observation_confidence: ${stage0.confidence_ceilings.max_observation_confidence.toFixed(2)}`);
    console.log(`  → max_coaching_specificity: ${stage0.confidence_ceilings.max_coaching_specificity}`);
  }
  console.log();

  // Hard stop — gate=fail: skip all downstream stages
  if (stage0.gate === "fail") {
    console.log(`[Pipeline] GATED — Stage 0 rejected clip: ${stage0.failure_mode}`);
    console.log(`[Pipeline] User guidance: ${stage0.user_guidance.message}\n`);
    return { stage0, gated: true };
  }

  // Stage 1 — Camera Perspective Detection
  console.log("[Stage 1] Camera Perspective Detection...");
  console.time("stage1");
  const stage1 = await runStage1(model, frames);
  // S0 ceiling: stage1.confidence is the stage's overall reliability claim.
  stage1.confidence = applyS0Cap(stage1.confidence, stage0);
  console.timeEnd("stage1");
  console.log(`  → perspective: ${stage1.perspective} (confidence: ${stage1.confidence.toFixed(2)})\n`);

  // Stage 2 — Observability Assessment
  // Stage 2 exposes overall_confidence (not confidence) — capped explicitly here.
  // Stage 2's confidence_ceilings sub-fields (body_position_max_confidence, terrain_max_confidence,
  // outcome_max_confidence) are element-level constraints set by Stage 2's own analysis.
  // They are NOT overwritten by the Stage 0 ceiling — Stage 0 is clip-level, Stage 2 is
  // element-level. The Stage 0 ceiling applies to Stage 2's overall reliability claim only.
  console.log("[Stage 2] Observability Assessment...");
  console.time("stage2");
  const stage2 = await runStage2(model, frames, stage1);
  stage2.overall_confidence = applyS0Cap(stage2.overall_confidence, stage0);
  console.timeEnd("stage2");
  console.log(`  → overall confidence: ${stage2.overall_confidence.toFixed(2)}`);
  console.log(`  → terrain ceiling: ${stage2.confidence_ceilings.terrain_max_confidence.toFixed(2)}`);
  console.log(`  → body position ceiling: ${stage2.confidence_ceilings.body_position_max_confidence.toFixed(2)}\n`);

  // Stage 3 — Rider Intent Detection
  console.log("[Stage 3] Rider Intent Detection...");
  console.time("stage3");
  const stage3 = await runStage3(model, frames, stage1, stage2);
  // S0 ceiling: stage3.confidence is the stage's top-level reliability claim.
  stage3.confidence = applyS0Cap(stage3.confidence, stage0);
  console.timeEnd("stage3");
  console.log(`  → intent: ${stage3.intent_category} (confidence: ${stage3.confidence.toFixed(2)})`);
  console.log(`  → "${stage3.primary_intent}"\n`);

  // Stage 4 — Terrain & Feature Detection
  // Stage 4 has no top-level confidence field. Two nested confidence fields are capped:
  //   surface.confidence — perception claim about surface classification; capped.
  //   features_detected[].confidence — perception claim per detected feature; capped.
  // gradient and line_options have no confidence fields and are not affected.
  console.log("[Stage 4] Terrain & Feature Detection...");
  console.time("stage4");
  const stage4 = await runStage4(model, frames, stage1, stage2, stage3);
  stage4.surface.confidence = applyS0Cap(stage4.surface.confidence, stage0);
  for (const feature of stage4.features_detected) {
    feature.confidence = applyS0Cap(feature.confidence, stage0);
  }
  console.timeEnd("stage4");
  console.log(`  → surface: ${stage4.surface.primary_type} / ${stage4.surface.condition} (traction: ${stage4.surface.traction_estimate})`);
  console.log(`  → gradient: ${stage4.gradient.overall} / camber: ${stage4.gradient.camber}`);
  console.log(`  → features detected: ${stage4.features_detected.length}\n`);

  // Stage 10 coaching specificity constraint — wired via runStage10's stage0 parameter.
  // When Stages 5–11 are added to this runner, call:
  //   runStage10(model, stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage0)
  // runStage10 passes stage0 to buildCoachingSpecificityConstraint (stage0-gate.ts) and injects
  // the constraint block into the user prompt before the evidence pack.

  console.log("[Pipeline] Complete.\n");

  return { stage0, stage1, stage2, stage3, stage4 };
}
