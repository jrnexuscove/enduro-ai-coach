// RideMind Pipeline — Test Runner
// Usage: npx tsx pipeline/run-test.ts "path/to/video.mp4"
//
// Runs the full Stages 1–4 pipeline on a video file and prints:
//   1. Progress indicators per stage (emitted by runner.ts)
//   2. Full PipelineResult as formatted JSON
//   3. Short human-readable summary

import fs from "fs";
import { config } from "dotenv";
import { GPT4oProvider } from "./model-provider.js";
import { runPipeline } from "./runner.js";

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

  console.log("=== RideMind Pipeline v1 — Stages 1–4 ===\n");

  const model = new GPT4oProvider();
  const result = await runPipeline(videoPath, model);

  // Full result JSON
  console.log("=== FULL PIPELINE RESULT ===\n");
  console.log(JSON.stringify(result, null, 2));

  // Summary
  const { stage1, stage2, stage3, stage4 } = result;

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
  console.log("=== END ===\n");
}

main().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err);
  console.error("Pipeline error:", message);
  process.exit(1);
});
