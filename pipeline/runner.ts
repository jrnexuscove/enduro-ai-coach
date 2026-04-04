// RideMind Pipeline — Runner
// Chains Stages 1–4 sequentially, passing outputs downstream.

import { type ModelProvider, type PipelineResult } from "./types.js";
import { extractFrames } from "./frame-extractor.js";
import { runStage1 } from "./stage1-camera.js";
import { runStage2 } from "./stage2-observability.js";
import { runStage3 } from "./stage3-intent.js";
import { runStage4 } from "./stage4-terrain-feature.js";

/**
 * Runs the full Stages 1–4 perception pipeline on a video file.
 * Stages execute sequentially; each stage receives all prior outputs.
 */
export async function runPipeline(
  videoPath: string,
  model: ModelProvider,
  frameCount: number = 16
): Promise<PipelineResult> {
  console.log(`\n[Pipeline] Starting — model: ${model.name}, frames: ${frameCount}`);
  console.log(`[Pipeline] Video: ${videoPath}\n`);

  // Frame extraction
  console.log("[Pipeline] Extracting frames...");
  console.time("frame-extraction");
  const frames = await extractFrames(videoPath, frameCount);
  console.timeEnd("frame-extraction");
  console.log();

  // Stage 1 — Camera Perspective Detection
  console.log("[Stage 1] Camera Perspective Detection...");
  console.time("stage1");
  const stage1 = await runStage1(model, frames);
  console.timeEnd("stage1");
  console.log(`  → perspective: ${stage1.perspective} (confidence: ${stage1.confidence.toFixed(2)})\n`);

  // Stage 2 — Observability Assessment
  console.log("[Stage 2] Observability Assessment...");
  console.time("stage2");
  const stage2 = await runStage2(model, frames, stage1);
  console.timeEnd("stage2");
  console.log(`  → overall confidence: ${stage2.overall_confidence.toFixed(2)}`);
  console.log(`  → terrain ceiling: ${stage2.confidence_ceilings.terrain_max_confidence.toFixed(2)}`);
  console.log(`  → body position ceiling: ${stage2.confidence_ceilings.body_position_max_confidence.toFixed(2)}\n`);

  // Stage 3 — Rider Intent Detection
  console.log("[Stage 3] Rider Intent Detection...");
  console.time("stage3");
  const stage3 = await runStage3(model, frames, stage1, stage2);
  console.timeEnd("stage3");
  console.log(`  → intent: ${stage3.intent_category} (confidence: ${stage3.confidence.toFixed(2)})`);
  console.log(`  → "${stage3.primary_intent}"\n`);

  // Stage 4 — Terrain & Feature Detection
  console.log("[Stage 4] Terrain & Feature Detection...");
  console.time("stage4");
  const stage4 = await runStage4(model, frames, stage1, stage2, stage3);
  console.timeEnd("stage4");
  console.log(`  → surface: ${stage4.surface.primary_type} / ${stage4.surface.condition} (traction: ${stage4.surface.traction_estimate})`);
  console.log(`  → gradient: ${stage4.gradient.overall} / camber: ${stage4.gradient.camber}`);
  console.log(`  → features detected: ${stage4.features_detected.length}\n`);

  console.log("[Pipeline] Complete.\n");

  return { stage1, stage2, stage3, stage4 };
}
