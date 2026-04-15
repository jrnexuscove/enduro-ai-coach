// RideMind Pipeline — Runner
// Chains Stage 0 (Observability Gate) + Stages 1–11 sequentially.
// Stage 0 defines the trust envelope; Stages 1–4 operate within it.

import path from "path";
import os from "os";
import crypto from "crypto";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
import {
  type ModelProvider,
  type PipelineResult,
  type GatedPipelineResult,
  type Stage0Output,
  type Stage7Output,
} from "./types.js";
import { ClaudeProvider } from "./model-provider";
import { extractFrames } from "./frame-extractor";
import { runStage0 } from "./stage0-gate";
import { runStage1 } from "./stage1-camera";
import { runStage2 } from "./stage2-observability";
import { runStage3 } from "./stage3-intent";
import { runStage4 } from "./stage4-terrain-feature";
import { runStage5 } from "./stage5-event-sequencing";
import { runStage6 } from "./stage6-failure-type";
import { runStage7 } from "./stage7-crash-type";
import { runStage8 } from "./stage8-causal-chain";
import { runStage9 } from "./stage9-coaching-decision";
import { runStage10 } from "./stage10-coaching-generation";
import { runStage11 } from "./stage11-safety-validation";

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
 * Runs the full pipeline: Stage 0 gate + Stages 1–11.
 *
 * Returns GatedPipelineResult (stage0 only) when Stage 0 rejects the clip.
 * Returns PipelineResult (stage0 + stages 1–11) when Stage 0 passes or degrades.
 *
 * Trust envelope enforcement (field-aware):
 * - Stage 1: confidence capped via applyS0Cap
 * - Stage 2: overall_confidence capped via applyS0Cap
 * - Stage 3: confidence capped via applyS0Cap
 * - Stage 4: surface.confidence + each features_detected[].confidence capped via applyS0Cap
 * - Stage 10: stage0 passed in — buildCoachingSpecificityConstraint injects the specificity
 *   constraint into the Stage 10 user prompt.
 *
 * Stage 7 skip rule (S7-FIX 36b1274):
 * Stage 7 runs when any of the following are true:
 *   - stage6.failure_occurred (Stage 6 CRASH OVERRIDE forces true on any crash/fall/impact)
 *   - stage5.outcome.result is "crash", "bail", or "stuck"
 *   - any segment has balance_state "fallen" or "losing_balance"
 * When skipped, stage7 is null — stage8, stage10, and stage11 accept Stage7Output | null.
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

  // Stage 5 — Event Sequencing
  console.log("[Stage 5] Event Sequencing...");
  console.time("stage5");
  const stage5 = await runStage5(model, frames, stage1, stage2, stage3, stage4);
  console.timeEnd("stage5");
  console.log(`  → outcome: ${stage5.outcome.result} (confidence: ${stage5.outcome.confidence.toFixed(2)})`);
  console.log(`  → segments: ${stage5.segments.length}, critical moment: segment ${stage5.critical_moment.segment_id}\n`);

  // Stage 6 — Failure Type Classification
  console.log("[Stage 6] Failure Type Classification...");
  console.time("stage6");
  const stage6 = await runStage6(model, stage1, stage2, stage3, stage4, stage5);
  console.timeEnd("stage6");
  console.log(`  → failure_occurred: ${stage6.failure_occurred}`);
  console.log(`  → failure_type: ${stage6.failure_type} (confidence: ${stage6.confidence.toFixed(2)})\n`);

  // Stage 7 — Crash Type Classification (conditional)
  // Run when Stage 6 or Stage 5 signals a physical incident:
  //   stage6.failure_occurred — Stage 6 CRASH OVERRIDE forces this true on any crash/fall/impact
  //   stage5.outcome.result "crash" | "bail" | "stuck" — broadened trigger (S7-FIX 36b1274)
  //   segment balance_state "fallen" | "losing_balance" — broadened trigger (S7-FIX 36b1274)
  const shouldRunStage7 =
    stage6.failure_occurred ||
    stage5.outcome.result === "crash" ||
    stage5.outcome.result === "bail" ||
    stage5.outcome.result === "stuck" ||
    stage5.segments.some(
      (s) =>
        s.rider_state.balance_state === "fallen" ||
        s.rider_state.balance_state === "losing_balance"
    );

  let stage7: Stage7Output | null = null;
  if (shouldRunStage7) {
    console.log("[Stage 7] Crash Type Classification...");
    console.time("stage7");
    stage7 = await runStage7(model, stage1, stage2, stage3, stage4, stage5, stage6);
    console.timeEnd("stage7");
    console.log(`  → crash_occurred: ${stage7.crash_occurred}`);
    console.log(`  → crash_type: ${stage7.crash_type} (severity: ${stage7.severity_estimate})\n`);
  } else {
    console.log("[Stage 7] Skipped — no crash/bail/fall indicators in Stage 5/6 outputs.\n");
  }

  // Stage 8 — Causal Chain Construction
  // stage7 may be null — runStage8 accepts Stage7Output | null
  console.log("[Stage 8] Causal Chain Construction...");
  console.time("stage8");
  const stage8 = await runStage8(model, stage1, stage2, stage3, stage4, stage5, stage6, stage7);
  console.timeEnd("stage8");
  console.log(`  → primary_cause: ${stage8.primary_cause.failure_type} (confidence: ${stage8.primary_cause.confidence.toFixed(2)})`);
  console.log(`  → outcome_status: ${stage8.outcome_status}\n`);

  // Stage 9 — Coaching Decision Engine
  console.log("[Stage 9] Coaching Decision Engine...");
  console.time("stage9");
  const stage9 = await runStage9(model, stage2, stage3, stage4, stage8);
  console.timeEnd("stage9");
  console.log(`  → coaching_required: ${stage9.coaching_required}`);
  if (stage9.primary_focus) {
    console.log(`  → primary_focus: ${stage9.primary_focus.coaching_domain} (confidence: ${stage9.primary_focus.confidence.toFixed(2)})\n`);
  } else {
    console.log(`  → primary_focus: null\n`);
  }

  // Stage 10 — Coaching Generation
  // stage0 passed in to inject coaching specificity constraint via buildCoachingSpecificityConstraint
  // stage7 may be null — runStage10 accepts Stage7Output | null
  console.log("[Stage 10] Coaching Generation...");
  console.time("stage10");
  const stage10 = await runStage10(
    model, stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage0
  );
  console.timeEnd("stage10");
  console.log(`  → coaching_required: ${stage10.coaching_required}`);
  if (stage10.primary_focus) {
    console.log(`  → primary_focus: "${stage10.primary_focus.title}"\n`);
  } else {
    console.log(`  → primary_focus: null\n`);
  }

  // Stage 11 — Safety Validation
  // stage7 may be null — runStage11 accepts Stage7Output | null
  console.log("[Stage 11] Safety Validation...");
  console.time("stage11");
  const stage11 = await runStage11(model, stage2, stage6, stage7, stage8, stage9, stage10);
  console.timeEnd("stage11");
  console.log(`  → safe: ${stage11.safe}`);
  console.log(`  → flags: speed_risk=${stage11.flags.speed_risk}, contradiction=${stage11.flags.contradiction}, severity_mismatch=${stage11.flags.severity_mismatch}, observability_overreach=${stage11.flags.observability_overreach}\n`);

  console.log("[Pipeline] Complete.\n");

  return {
    stage0,
    stage1,
    stage2,
    stage3,
    stage4,
    stage5,
    stage6,
    stage7: stage7 ?? undefined,  // PipelineResult.stage7 is Stage7Output | undefined
    stage8,
    stage9,
    stage10,
    stage11,
  };
}

// ————————————————————————————————————————————
// High-level entry point (for API route)
// ————————————————————————————————————————————

/**
 * Accepts raw video bytes from an upload, writes them to a temp file,
 * instantiates ClaudeProvider, and runs the full pipeline.
 *
 * The temp file is deleted after the pipeline completes (or throws).
 *
 * @param videoBytes  - Raw video file buffer from the upload
 * @param riderNote   - Optional rider context note (reserved for Stage 10 — not yet wired)
 * @param originalFilename - Original filename; used to preserve the file extension for ffmpeg
 */
export async function runFullPipeline(
  videoBytes: Buffer,
  riderNote?: string,
  originalFilename?: string
): Promise<GatedPipelineResult | PipelineResult> {
  const ext = originalFilename ? path.extname(originalFilename) || ".mp4" : ".mp4";
  const tempPath = path.join(os.tmpdir(), `ridemind-${crypto.randomUUID()}${ext}`);

  await fs.promises.writeFile(tempPath, videoBytes);

  try {
    const provider = new ClaudeProvider();
    return await runPipeline(tempPath, provider);
  } finally {
    await fs.promises.unlink(tempPath).catch(() => {});
  }
}
