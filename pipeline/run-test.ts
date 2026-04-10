// RideMind Pipeline — Test Runner
// Usage: npx tsx pipeline/run-test.ts "path/to/video.mp4"
//
// Runs the full Stages 1–11 pipeline on a video file and prints:
//   1. Progress indicators per stage
//   2. Full PipelineResult as formatted JSON
//   3. Short human-readable summary

import fs from "fs";
import { config } from "dotenv";
import { type Stage7Output } from "./types.js";
import { runStage9 } from "./stage9-coaching-decision.js";
import { runStage10, validateStage10BusinessRules } from "./stage10-coaching-generation.js";
import { runStage11 } from "./stage11-safety-validation.js";
import { GPT4oProvider } from "./model-provider.js";
import { extractFrames } from "./frame-extractor.js";
import { runStage1 } from "./stage1-camera.js";
import { runStage2 } from "./stage2-observability.js";
import { runStage3 } from "./stage3-intent.js";
import { runStage4 } from "./stage4-terrain-feature.js";
import { runStage5 } from "./stage5-event-sequencing.js";
import { runStage6 } from "./stage6-failure-type.js";
import { runStage7 } from "./stage7-crash-type.js";
import { runStage8 } from "./stage8-causal-chain.js";

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

  console.log("=== RideMind Pipeline v1 — Stages 1–11 ===\n");

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

  // Stage 7 — Crash Type Classification (conditional)
  const CRASH_OUTCOMES: string[] = ["crash", "bail", "stuck"];
  const CRASH_EVENTS: string[] = ["crash", "tip_over", "bail"];
  const crashSignalled =
    CRASH_OUTCOMES.includes(stage5.outcome.result) ||
    CRASH_EVENTS.includes(stage3.event_detected.type) ||
    stage5.segments.some(s => s.rider_state.balance_state === "fallen" || s.rider_state.balance_state === "losing_balance");
  let stage7: Stage7Output | null = null;

  if (crashSignalled) {
    console.log("[Stage 7] Crash Type Classification...");
    console.time("stage7");
    stage7 = await runStage7(model, stage1, stage2, stage3, stage4, stage5, stage6);
    console.timeEnd("stage7");
    console.log(`  → crash_occurred: ${stage7.crash_occurred}`);
    console.log(`  → crash_type: ${stage7.crash_type} (confidence: ${stage7.confidence.toFixed(2)})\n`);
  } else {
    console.log("[Stage 7] Skipped — no crash/bail/incident signal in Stage 3 or Stage 5\n");
  }

  // Stage 8 — Causal Chain Construction (unconditional — runs on all clips)
  console.log("[Stage 8] Causal Chain Construction...");
  console.time("stage8");
  const stage8 = await runStage8(model, stage1, stage2, stage3, stage4, stage5, stage6, stage7);
  console.timeEnd("stage8");
  console.log(`  → outcome_status: ${stage8.outcome_status}`);
  console.log(`  → primary_cause: ${stage8.primary_cause.failure_type} — ${(stage8.primary_cause.factor || "none").slice(0, 80)}`);
  console.log(`  → overall_confidence: ${stage8.overall_confidence.toFixed(2)}\n`);

  // Stage 9 — Coaching Decision Engine (unconditional — runs on all clips)
  console.log("[Stage 9] Coaching Decision Engine...");
  console.time("stage9");
  const stage9 = await runStage9(model, stage2, stage3, stage4, stage8);
  console.timeEnd("stage9");
  console.log(`  → coaching_required: ${stage9.coaching_required}`);
  if (stage9.primary_focus) {
    console.log(`  → primary_focus: ${stage9.primary_focus.coaching_domain} — ${stage9.primary_focus.target_variable}`);
  } else {
    console.log(`  → primary_focus: none`);
  }
  const progressTags = stage9.skill_tags && stage9.skill_tags.length > 0 ? stage9.skill_tags.join(", ") : "none";
  console.log(`  → skill_tags: [${progressTags}] | confidence: ${stage9.tag_confidence ?? "null"}`);
  console.log();

  // Stage 10 — Coaching Generation (unconditional — runs on all clips)
  let stage10BusinessErrors: string[] = [];

  console.log("[Stage 10] Coaching Generation...");
  console.time("stage10");
  const stage10 = await runStage10(model, stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9);
  console.timeEnd("stage10");

  // Business rule validation
  stage10BusinessErrors = validateStage10BusinessRules(stage10);
  if (stage10BusinessErrors.length > 0) {
    console.warn(`  [Stage 10] Business rule violations (${stage10BusinessErrors.length}):`);
    stage10BusinessErrors.forEach((e) => console.warn(`    - ${e}`));
  }

  // Stage 9 drift check
  if (stage10.primary_focus && stage10.primary_focus.category !== stage10.source_trace.primary_stage9_category) {
    console.warn(
      `  [Stage 10] DRIFT WARNING: primary category "${stage10.primary_focus.category}" does not match Stage 9 "${stage10.source_trace.primary_stage9_category}"`
    );
  }

  console.log(`  → coaching_required: ${stage10.coaching_required}`);
  console.log(`  → confidence: ${stage10.confidence.toFixed(2)}`);
  if (stage10.primary_focus) {
    const s10Title = stage10.primary_focus.title.length > 80
      ? stage10.primary_focus.title.slice(0, 77) + "..."
      : stage10.primary_focus.title;
    console.log(`  → primary_focus: ${stage10.primary_focus.category} — ${s10Title}`);
  } else {
    console.log(`  → primary_focus: none`);
  }
  console.log();

  // Stage 11 — Safety & Contradiction Validation (unconditional — runs on all clips)
  console.log("[Stage 11] Safety & Contradiction Validation...");
  console.time("stage11");
  const stage11 = await runStage11(model, stage2, stage6, stage7, stage8, stage9, stage10);
  console.timeEnd("stage11");

  console.log(`  → safe: ${stage11.safe}`);
  if ((stage11.issues?.length ?? 0) > 0) {
    console.log(`  → issues (${stage11.issues.length}):`);
    stage11.issues?.forEach((issue) => {
      const short = issue.length > 100 ? issue.slice(0, 97) + "..." : issue;
      console.log(`    - ${short}`);
    });
  }
  if (stage11.confidence_adjustment !== null) {
    console.log(`  → confidence_adjustment: ${stage11.confidence_adjustment.toFixed(2)}`);
  }
  console.log();

  if (!stage11.safe) {
    console.warn("[Pipeline] SAFETY GATE FAILED — Stage 11 blocked output.");
    console.warn("[Pipeline] Flags:", JSON.stringify(stage11.flags));
    console.warn("[Pipeline] Issues:");
    stage11.issues?.forEach((issue) => console.warn(`  - ${issue}`));
    console.log();
  }

  if (stage11.safe) {
    console.log("[Pipeline] Complete.\n");
  } else {
    console.log("[Pipeline] Complete — output blocked by Stage 11 safety gate.\n");
  }

  // Full result JSON
  const result = { stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11 };
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

  console.log("STAGE 7 — Crash Type Classification");
  if (stage7) {
    console.log(`  Crash occurred:  ${stage7.crash_occurred}`);
    console.log(`  Crash type:      ${stage7.crash_type ?? "n/a"}`);
    console.log(`  Mechanism:       ${stage7.crash_mechanism ?? "n/a"}`);
    console.log(`  Severity:        ${stage7.severity_estimate}`);
    console.log(`  Confidence:      ${stage7.confidence.toFixed(2)}`);
    console.log(`  Direction:       ${stage7.body_dynamics.direction_of_fall ?? "n/a"}`);
    if (stage7.audio_crash_evidence.impact_detected) {
      console.log(`  Impact audio:    ${stage7.audio_crash_evidence.impact_description ?? "detected"}`);
    }
  } else {
    console.log("  Skipped — no crash detected in Stage 3 or Stage 5");
  }
  console.log();

  console.log("STAGE 8 — Causal Chain Construction");
  console.log(`  Outcome status:    ${stage8.outcome_status}`);
  console.log(`  Overall conf:      ${stage8.overall_confidence.toFixed(2)}`);
  console.log(`  Primary cause:     ${stage8.primary_cause.failure_type} (confidence: ${stage8.primary_cause.confidence.toFixed(2)})`);
  const factorStr = stage8.primary_cause.factor || "none";
  const factorShort = factorStr.length > 100 ? factorStr.slice(0, 97) + "..." : factorStr;
  console.log(`  Factor:            ${factorShort}`);
  console.log(`  Trigger identified: ${stage8.trigger_event.identified}`);
  if (stage8.trigger_event.identified && stage8.trigger_event.description) {
    const trigStr = stage8.trigger_event.description || "";
    const trigDesc = trigStr.length > 100 ? trigStr.slice(0, 97) + "..." : trigStr;
    console.log(`  Trigger desc:      ${trigDesc}`);
  }
  console.log(`  Contributing factors (${stage8.contributing_factors.length}):`);
  if (stage8.contributing_factors.length === 0) {
    console.log("    none");
  } else {
    const top = stage8.contributing_factors[0];
    console.log(`    Top: [${top.causal_role}] ${(top.factor || "").slice(0, 80)}`);
  }
  const setupStr = stage8.causal_summary.setup_conditions || "";
  const mechStr = stage8.causal_summary.failure_mechanism || "";
  const pathStr = stage8.causal_summary.outcome_pathway || "";
  console.log(`  Setup conditions:  ${setupStr.slice(0, 100)}`);
  console.log(`  Failure mechanism: ${mechStr.slice(0, 100)}`);
  console.log(`  Outcome pathway:   ${pathStr.slice(0, 100)}`);
  if (stage8.counterfactual.key_variable) {
    console.log(`  Counterfactual:    [${stage8.counterfactual.variable_category}] ${(stage8.counterfactual.key_variable || "").slice(0, 80)}`);
  } else {
    console.log(`  Counterfactual:    none identified`);
  }
  console.log();

  console.log("STAGE 9 — Coaching Decision Engine");
  console.log(`  Coaching required: ${stage9.coaching_required ? "yes" : "no"}`);
  if (stage9.coaching_required && stage9.primary_focus) {
    const pfDomain = stage9.primary_focus.coaching_domain ?? "null";
    const pfTarget = stage9.primary_focus.target_variable || "(none)";
    const pfGoal = stage9.primary_focus.change_goal || "(none)";
    const pfGoalShort = pfGoal.length > 80 ? pfGoal.slice(0, 77) + "..." : pfGoal;
    console.log(`  Primary focus:     ${pfDomain} | ${pfTarget} | ${pfGoalShort}`);
    console.log(`  Primary conf:      ${stage9.primary_focus.confidence.toFixed(2)}${stage9.primary_focus.observability_limited ? " (obs. limited)" : ""}`);
    console.log(`  Applicable phase:  ${stage9.primary_focus.applicable_phase || "(none)"}`);
  } else {
    console.log(`  Primary focus:     none`);
  }
  const secDomains = (stage9.secondary_points ?? []).map((s) => s.coaching_domain).join(", ") || "none";
  console.log(`  Secondary points:  ${stage9.secondary_points?.length ?? 0} — [${secDomains}]`);
  console.log(`  Excluded factors:  ${stage9.excluded_factors?.length ?? 0}`);
  if ((stage9.safety_flags?.length ?? 0) === 0) {
    console.log(`  Safety flags:      0`);
  } else {
    console.log(`  Safety flags:      ${stage9.safety_flags.length}`);
    stage9.safety_flags?.forEach((sf) => {
      const riskShort = sf.risk.length > 80 ? sf.risk.slice(0, 77) + "..." : sf.risk;
      console.log(`    [${sf.flag_type}] ${sf.coaching_point}: ${riskShort}`);
    });
  }
  const summaryTags = stage9.skill_tags && stage9.skill_tags.length > 0 ? stage9.skill_tags.join(", ") : "none";
  console.log(`  Skill tags:        [${summaryTags}]`);
  console.log(`  Tag confidence:    ${stage9.tag_confidence ?? "null"}`);
  const intentShort = (stage9.coaching_constraints.rider_intent || "").slice(0, 60);
  const terrainShort = (stage9.coaching_constraints.terrain_context || "").slice(0, 60);
  console.log(`  Constraints:       intent=${intentShort} | terrain=${terrainShort}`);
  console.log();

  console.log("STAGE 10 — Coaching Generation");
  console.log(`  Coaching required: ${stage10.coaching_required ? "yes" : "no"}`);
  console.log(`  Confidence:        ${stage10.confidence.toFixed(2)}`);
  console.log(`  Observability ltd: ${stage10.observability_limited ? "yes" : "no"}`);
  if (stage10.coaching_required && stage10.primary_focus) {
    const s10TitleFull = stage10.primary_focus.title.length > 80
      ? stage10.primary_focus.title.slice(0, 77) + "..."
      : stage10.primary_focus.title;
    console.log(`  Primary focus:     ${stage10.primary_focus.category} — ${s10TitleFull}`);
    console.log(`  Drills:            ${stage10.drills?.length ?? 0}`);
    console.log(`  Uncertainty stmt:  ${stage10.uncertainty_statement ? "present" : "none"}`);
  } else {
    console.log(`  Primary focus:     none`);
  }
  if (stage10BusinessErrors.length > 0) {
    console.log(`  Business rule warnings (${stage10BusinessErrors.length}):`);
    stage10BusinessErrors.forEach((e) => console.log(`    - ${e}`));
  } else {
    console.log(`  Business rules:    all passed`);
  }
  if (stage10.primary_focus && stage10.primary_focus.category !== stage10.source_trace.primary_stage9_category) {
    console.log(`  Drift warning:     category "${stage10.primary_focus.category}" != Stage 9 "${stage10.source_trace.primary_stage9_category}"`);
  } else {
    console.log(`  Drift check:       passed`);
  }
  console.log();

  console.log("STAGE 11 — Safety & Contradiction Validation");
  console.log(`  Safe:              ${stage11.safe ? "PASS" : "FAIL"}`);
  console.log(`  Flags:`);
  console.log(`    speed_risk:          ${stage11.flags.speed_risk}`);
  console.log(`    contradiction:       ${stage11.flags.contradiction}`);
  console.log(`    severity_mismatch:   ${stage11.flags.severity_mismatch}`);
  console.log(`    observability_overreach: ${stage11.flags.observability_overreach}`);
  if ((stage11.issues?.length ?? 0) === 0) {
    console.log(`  Issues:            none`);
  } else {
    console.log(`  Issues (${stage11.issues.length}):`);
    stage11.issues?.forEach((issue) => {
      const issueShort = issue.length > 120 ? issue.slice(0, 117) + "..." : issue;
      console.log(`    - ${issueShort}`);
    });
  }
  if (stage11.confidence_adjustment !== null) {
    console.log(`  Confidence adj:    cap at ${stage11.confidence_adjustment.toFixed(2)}`);
  } else {
    console.log(`  Confidence adj:    none`);
  }
  if (!stage11.safe) {
    console.log(`  *** PIPELINE OUTPUT BLOCKED — coaching failed safety validation ***`);
  }
  console.log();

  console.log("=== END ===\n");
}

main().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err);
  console.error("Pipeline error:", message);
  process.exit(1);
});
