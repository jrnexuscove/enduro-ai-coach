// RideMind Pipeline — Test Runner
// Usage: npx tsx pipeline/run-test.ts "path/to/video.mp4"
//
// Runs the full Stages 1–6 pipeline on a video file and prints:
//   1. Progress indicators per stage
//   2. Full PipelineResult as formatted JSON
//   3. Short human-readable summary

import fs from "fs";
import { config } from "dotenv";
import { GPT4oProvider } from "./model-provider.js";
import { extractFrames } from "./frame-extractor.js";
import { runStage1 } from "./stage1-camera.js";
import { runStage2 } from "./stage2-observability.js";
import { runStage3 } from "./stage3-intent.js";
import { runStage4 } from "./stage4-terrain-feature.js";
import { runStage5 } from "./stage5-event-sequencing.js";
import { runStage6 } from "./stage6-failure-type.js";

config({ path: ".env.local" });

async function main() {
  const videoPath = process.argv[2];

  if (!videoPath) {
    console.error("Usage: npx tsx pipeline/run-test.ts \"path/to/video.mp4\"");
    process.exit(1);
  }

  if (!fs.existsSync(videoPath)) {
    console.error(`File not found: ${videoPath}`);
    process.exit(1);
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY not found in .env.local");
    process.exit(1);
  }

  console.log("=== RideMind Pipeline v1 — Stages 1–6 ===\n");

  const model = new GPT4oProvider();
  const frameCount = 16;

  console.log(`[Pipeline] Starting — model: ${model.name}, frames: ${frameCount}`);
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

  // Stage 5 — Event Sequencing
  console.log("[Stage 5] Event Sequencing...");
  console.time("stage5");
  const stage5 = await runStage5(model, frames, stage1, stage2, stage3, stage4);
  console.timeEnd("stage5");
  console.log(`  → segments: ${stage5.segments.length}`);
  console.log(`  → critical moment: segment ${stage5.critical_moment.segment_id}`);
  console.log(`  → outcome: ${stage5.outcome.result}\n`);

  // Stage 6 — Failure Type Classification
  console.log("[Stage 6] Failure Type Classification...");
  console.time("stage6");
  const stage6 = await runStage6(model, stage1, stage2, stage3, stage4, stage5);
  console.timeEnd("stage6");
  console.log(`  → failure_occurred: ${stage6.failure_occurred}`);
  console.log(`  → failure_type: ${stage6.failure_type} (confidence: ${stage6.confidence.toFixed(2)})`);
  const rootCauseShort = stage6.symptoms_vs_root.likely_root_cause.length > 100
    ? stage6.symptoms_vs_root.likely_root_cause.slice(0, 97) + "..."
    : stage6.symptoms_vs_root.likely_root_cause;
  console.log(`  → likely_root_cause: ${rootCauseShort}\n`);

  console.log("[Pipeline] Complete.\n");

  // Full result JSON
  const result = { stage1, stage2, stage3, stage4, stage5, stage6 };
  console.log("=== FULL PIPELINE RESULT ===\n");
  console.log(JSON.stringify(result, null, 2));

  // Summary
  console.log("\n=== SUMMARY ===\n");

  console.log("STAGE 1 — Camera Perspective");
  console.log(`  Perspective:     ${stage1.perspective}`);
  console.log(`  Confidence:      ${stage1.confidence.toFixed(2)}`);
  console.log(`  Mount:           ${stage1.camera_details.estimated_mount}`);
  console.log(`  Stability:       ${stage1.camera_details.stability}`);
  console.log(`  Body visible:    ${stage1.subject_visibility.rider_body_visible}`);
  console.log();

  console.log("STAGE 2 — Observability");
  console.log(`  Overall:         ${stage2.overall_confidence.toFixed(2)}`);
  console.log(`  Terrain ceiling: ${stage2.confidence_ceilings.terrain_max_confidence.toFixed(2)}`);
  console.log(`  Body ceiling:    ${stage2.confidence_ceilings.body_position_max_confidence.toFixed(2)}`);
  console.log(`  Outcome ceiling: ${stage2.confidence_ceilings.outcome_max_confidence.toFixed(2)}`);
  if (stage2.limitations.length > 0) {
    console.log(`  Limitations:`);
    stage2.limitations.forEach((l) => console.log(`    - ${l}`));
  }
  console.log();

  console.log("STAGE 3 — Rider Intent");
  console.log(`  Category:        ${stage3.intent_category}`);
  console.log(`  Confidence:      ${stage3.confidence.toFixed(2)}`);
  console.log(`  Intent:          ${stage3.primary_intent}`);
  console.log(`  Gradient:        ${stage3.shallow_terrain_read.apparent_gradient}`);
  console.log(`  Surface:         ${stage3.shallow_terrain_read.apparent_surface}`);
  console.log(`  Difficulty:      ${stage3.difficulty_estimate}`);
  console.log();

  console.log("STAGE 4 — Terrain & Features");
  console.log(`  Surface:         ${stage4.surface.primary_type}${stage4.surface.secondary_type ? " / " + stage4.surface.secondary_type : ""}`);
  console.log(`  Condition:       ${stage4.surface.condition}`);
  console.log(`  Traction:        ${stage4.surface.traction_estimate} (confidence: ${stage4.surface.confidence.toFixed(2)})`);
  console.log(`  Gradient:        ${stage4.gradient.overall}`);
  console.log(`  Camber:          ${stage4.gradient.camber}`);
  console.log(`  Trail width:     ${stage4.environmental_factors.trail_width}`);
  console.log(`  Features (${stage4.features_detected.length}):`);
  if (stage4.features_detected.length === 0) {
    console.log("    none detected");
  } else {
    stage4.features_detected.forEach((f) => {
      console.log(
        `    - ${f.feature_type} | ${f.severity} | confidence: ${f.confidence.toFixed(2)} | ${f.location_in_sequence}`
      );
    });
  }
  console.log();

  console.log("STAGE 5 — Event Sequencing");
  console.log(`  Outcome:         ${stage5.outcome.result} (confidence: ${stage5.outcome.confidence.toFixed(2)})`);
  const criticalDesc = stage5.critical_moment.description.length > 100
    ? stage5.critical_moment.description.slice(0, 97) + "..."
    : stage5.critical_moment.description;
  console.log(`  Critical moment: ${criticalDesc}`);
  console.log(`  Segments (${stage5.segments.length}):`);
  stage5.segments.forEach((s) => {
    console.log(`    ${s.segment_id}. [${s.phase}] ${s.frame_range}`);
  });
  console.log();

  console.log("STAGE 6 — Failure Type Classification");
  console.log(`  Failure occurred: ${stage6.failure_occurred}`);
  console.log(`  Failure type:     ${stage6.failure_type} (confidence: ${stage6.confidence.toFixed(2)})`);
  const rootCauseSummary = stage6.symptoms_vs_root.likely_root_cause.length > 100
    ? stage6.symptoms_vs_root.likely_root_cause.slice(0, 97) + "..."
    : stage6.symptoms_vs_root.likely_root_cause;
  console.log(`  Root cause:       ${rootCauseSummary}`);
  console.log(`  Factors (${stage6.contributing_factors.length}):`);
  if (stage6.contributing_factors.length === 0) {
    console.log("    none");
  } else {
    stage6.contributing_factors.forEach((f) => {
      console.log(`    - [${f.role}] ${f.factor}`);
    });
  }
  if (!stage6.failure_occurred && stage6.no_failure_note) {
    console.log(`  No-failure note:  ${stage6.no_failure_note}`);
  }
  console.log();

  console.log("=== END ===\n");
}

main().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err);
  console.error("Pipeline error:", message);
  process.exit(1);
});
