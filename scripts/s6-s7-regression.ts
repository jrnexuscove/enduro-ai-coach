// RideMind — S6/S7 Regression Test
// Usage: npx tsx scripts/s6-s7-regression.ts
//
// Runs 4 specific clips through Stages 1–7 to verify the S6 momentum-demotion
// and S7 trigger-broadening fixes committed in 36b1274.
//
// S7 trigger uses the broadened logic from pipeline/run-test.ts:
//   - Stage 5 outcome: crash | bail | stuck
//   - Stage 3 event: crash | tip_over | bail
//   - Any segment balance_state: fallen | losing_balance
//
// Pass/fail expectations:
//   Long Hill       — S6 must NOT classify momentum as primary (clean completion)
//   Nick Crash      — S6 must detect a failure (failure_occurred = true)
//   Colin Hill      — S6 must NOT default to momentum (bail/dismount scenario)
//   Steep Hill Bail — S6 must remain technique (reference clip, correct pre-fix)

import fs from "fs";
import path from "path";
import { config } from "dotenv";
import {
  type Stage5Output,
  type Stage6Output,
  type Stage7Output,
} from "../pipeline/types.js";
import { GPT4oProvider } from "../pipeline/model-provider.js";
import { extractFrames } from "../pipeline/frame-extractor.js";
import { runStage1 } from "../pipeline/stage1-camera.js";
import { runStage2 } from "../pipeline/stage2-observability.js";
import { runStage3 } from "../pipeline/stage3-intent.js";
import { runStage4 } from "../pipeline/stage4-terrain-feature.js";
import { runStage5 } from "../pipeline/stage5-event-sequencing.js";
import { runStage6 } from "../pipeline/stage6-failure-type.js";
import { runStage7 } from "../pipeline/stage7-crash-type.js";

config({ path: ".env.local" });

// ---------------------------------------------------------------------------
// Clip definitions + expectations
// ---------------------------------------------------------------------------

interface ClipExpectation {
  id: string;
  label: string;
  path: string;
  camera: string;
  groundTruth: string;
  // Expectation predicate — returns true if the clip passes
  clipPass: (s5: Stage5Output, s6: Stage6Output) => boolean;
  passDesc: string; // Human-readable description of what we expect
  s7ExpectRun: boolean; // Whether S7 is expected to be triggered
}

const clips: ClipExpectation[] = [
  {
    id: "long-hill",
    label: "Long Hill",
    path: String.raw`C:\Users\rigge\OneDrive\Videos\Enduro ai coach test clips\long hill.mp4`,
    camera: "POV",
    groundTruth: "Clean completion — must NOT report false failures",
    clipPass: (s5, s6) => s5.outcome.result === "completed" && s6.failure_occurred === false,
    passDesc: "S5 outcome=completed AND S6 failure_occurred=false",
    s7ExpectRun: false,
  },
  {
    id: "nick-crash",
    label: "Nick Crash",
    path: String.raw`C:\Users\rigge\OneDrive\Videos\Enduro ai coach test clips\nick crash.mp4`,
    camera: "3rd-person",
    groundTruth: "Crash after jumps",
    clipPass: (s5, s6) => s5.outcome.result === "crash" && s6.failure_occurred === true,
    passDesc: "S5 outcome=crash AND S6 failure_occurred=true",
    s7ExpectRun: true,
  },
  {
    id: "colin-hill",
    label: "Colin Hill",
    path: String.raw`C:\Users\rigge\OneDrive\Videos\Enduro ai coach test clips\colin hill.mp4`,
    camera: "3rd-person",
    groundTruth: "Bail midway — seated entire time",
    clipPass: (s5, s6) => s5.outcome.result !== "stall" && s6.failure_type !== "momentum",
    passDesc: "S5 outcome!=stall AND S6 failure_type!=momentum",
    s7ExpectRun: true,
  },
  {
    id: "steep-hill-bail",
    label: "Steep Hill Bail",
    path: String.raw`C:\Users\rigge\OneDrive\Videos\Enduro ai coach test clips\steep hill bail in trees.mp4`,
    camera: "POV",
    groundTruth: "Runs out of room, drops bike (reference clip — was correct pre-fix)",
    clipPass: (s5, s6) =>
      (s5.outcome.result === "crash" || s5.outcome.result === "bail") &&
      (s6.failure_type === "line_choice" || s6.failure_type === "technique"),
    passDesc: "S5 outcome=crash|bail AND S6 failure_type=line_choice|technique",
    s7ExpectRun: true,
  },
];

// ---------------------------------------------------------------------------
// Per-clip result
// ---------------------------------------------------------------------------

interface ClipResult {
  clip: ClipExpectation;
  status: "pass" | "fail" | "error";
  error?: string;
  stage5_outcome: string;
  stage5_progress: string;
  stage3_event: string;
  stage6: Stage6Output | null;
  stage7: Stage7Output | null;
  stage7_triggered: boolean;
  clip_pass: boolean;
  elapsed_ms: number;
}

// ---------------------------------------------------------------------------
// S7 trigger — broadened logic (matches pipeline/run-test.ts)
// ---------------------------------------------------------------------------

function isCrashSignalled(
  stage3: Awaited<ReturnType<typeof runStage3>>,
  stage5: Awaited<ReturnType<typeof runStage5>>
): boolean {
  const CRASH_OUTCOMES = ["crash", "bail", "stuck"];
  const CRASH_EVENTS = ["crash", "tip_over", "bail"];
  return (
    CRASH_OUTCOMES.includes(stage5.outcome.result) ||
    CRASH_EVENTS.includes(stage3.event_detected.type) ||
    stage5.segments.some(
      (s) =>
        s.rider_state.balance_state === "fallen" ||
        s.rider_state.balance_state === "losing_balance"
    )
  );
}

// ---------------------------------------------------------------------------
// Run a single clip through Stages 1–7
// ---------------------------------------------------------------------------

async function runClip(
  clip: ClipExpectation,
  model: InstanceType<typeof GPT4oProvider>,
  index: number,
  total: number
): Promise<ClipResult> {
  const startTime = Date.now();
  const prefix = `[${index + 1}/${total}] ${clip.label}`;

  console.log(`\n${"=".repeat(72)}`);
  console.log(`${prefix}`);
  console.log(`  Camera:       ${clip.camera}`);
  console.log(`  Ground truth: ${clip.groundTruth}`);
  console.log(`  Expecting:    ${clip.passDesc}`);
  console.log(`${"=".repeat(72)}\n`);

  try {
    // Frame extraction
    process.stdout.write(`  [frames] extracting...`);
    const frames = await extractFrames(clip.path, 16);
    process.stdout.write(` done (${frames.length} frames)\n`);

    // Stage 1
    process.stdout.write(`  [S1] camera perspective...`);
    const stage1 = await runStage1(model, frames);
    process.stdout.write(` ${stage1.perspective} (${stage1.confidence.toFixed(2)})\n`);

    // Stage 2
    process.stdout.write(`  [S2] observability...`);
    const stage2 = await runStage2(model, frames, stage1);
    process.stdout.write(` overall=${stage2.overall_confidence.toFixed(2)}, body_ceil=${stage2.confidence_ceilings.body_position_max_confidence.toFixed(2)}\n`);

    // Stage 3
    process.stdout.write(`  [S3] intent...`);
    const stage3 = await runStage3(model, frames, stage1, stage2);
    process.stdout.write(` ${stage3.intent_category} (${stage3.confidence.toFixed(2)}) | event: ${stage3.event_detected.type} (${stage3.event_detected.confidence.toFixed(2)})\n`);

    // Stage 4
    process.stdout.write(`  [S4] terrain/features...`);
    const stage4 = await runStage4(model, frames, stage1, stage2, stage3);
    process.stdout.write(` ${stage4.surface.primary_type}/${stage4.surface.condition}, ${stage4.gradient.overall}, features: ${stage4.features_detected.length}\n`);

    // Stage 5
    process.stdout.write(`  [S5] event sequencing...`);
    const stage5 = await runStage5(model, frames, stage1, stage2, stage3, stage4);
    process.stdout.write(` outcome: ${stage5.outcome.result} (${stage5.outcome.confidence.toFixed(2)}), segments: ${stage5.segments.length}\n`);

    // Log S5 full outcome + progress_assessment
    const balanceStates = stage5.segments.map((s) => s.rider_state.balance_state);
    console.log(`  [S5] balance states: [${balanceStates.join(", ")}]`);
    console.log(`\n  --- S5 OUTCOME + PROGRESS ---`);
    console.log(`  outcome.result:       ${stage5.outcome.result}`);
    console.log(`  outcome.confidence:   ${stage5.outcome.confidence.toFixed(2)}`);
    console.log(`  outcome.evidence:     ${(stage5.outcome.outcome_evidence ?? []).join(" | ") || "none"}`);
    console.log(`  progress.completion:  ${stage5.progress_assessment.section_completion}`);
    console.log(`  progress.confidence:  ${stage5.progress_assessment.confidence.toFixed(2)}`);
    console.log(`  progress.evidence:    ${(stage5.progress_assessment.evidence ?? []).join(" | ") || "none"}`);

    // Stage 6
    process.stdout.write(`  [S6] failure type...`);
    const stage6 = await runStage6(model, stage1, stage2, stage3, stage4, stage5);
    process.stdout.write(` ${stage6.failure_type} (${stage6.confidence.toFixed(2)}), failure_occurred: ${stage6.failure_occurred}\n`);

    // Stage 7 — broadened trigger
    const crashSignalled = isCrashSignalled(stage3, stage5);
    let stage7: Stage7Output | null = null;

    console.log(`  [S7] trigger check: outcome=${stage5.outcome.result}, event=${stage3.event_detected.type}, crashSignalled=${crashSignalled}`);

    if (crashSignalled) {
      process.stdout.write(`  [S7] crash type...`);
      stage7 = await runStage7(model, stage1, stage2, stage3, stage4, stage5, stage6);
      process.stdout.write(` crash_occurred=${stage7.crash_occurred}, type=${stage7.crash_type ?? "null"}, severity=${stage7.severity_estimate} (${stage7.confidence.toFixed(2)})\n`);
    } else {
      console.log(`  [S7] skipped — no crash/bail/incident signal`);
    }

    // Full S6 output
    console.log(`\n  --- S6 FULL OUTPUT ---`);
    console.log(`  failure_occurred:     ${stage6.failure_occurred}`);
    console.log(`  failure_type:         ${stage6.failure_type}`);
    console.log(`  confidence:           ${stage6.confidence.toFixed(2)}`);
    console.log(`  failure_description:  ${stage6.failure_description ?? "null"}`);
    console.log(`  root_cause:           ${stage6.symptoms_vs_root.likely_root_cause ?? "null"}`);
    console.log(`  root_cause_conf:      ${stage6.symptoms_vs_root.root_cause_confidence != null ? stage6.symptoms_vs_root.root_cause_confidence.toFixed(2) : "null"}`);
    console.log(`  symptoms:`);
    (stage6.symptoms_vs_root.observed_symptoms ?? []).forEach((s) =>
      console.log(`    - ${s}`)
    );
    console.log(`  contributing_factors:`);
    if ((stage6.contributing_factors ?? []).length === 0) {
      console.log(`    none`);
    } else {
      stage6.contributing_factors.forEach((f) =>
        console.log(`    [${f.role}] ${f.factor}`)
      );
    }
    if (!stage6.failure_occurred && stage6.no_failure_note) {
      console.log(`  no_failure_note:      ${stage6.no_failure_note}`);
    }
    console.log(`  engine_behaviour:     ${stage6.audio_failure_cues?.engine_behaviour ?? "null"}`);
    console.log(`  impact_correlation:   ${stage6.audio_failure_cues?.impact_correlation ?? "null"}`);
    console.log(`  control_state:        ${stage6.control_assessment.state}`);
    console.log(`  control_confidence:   ${stage6.control_assessment.confidence.toFixed(2)}`);
    console.log(`  control_evidence:     ${(stage6.control_assessment.evidence ?? []).join(" | ") || "none"}`);
    console.log(`  completion_safe_flag: ${stage6.control_assessment.completion_safety_flag}`);
    console.log(`  debug.reasoning:      ${stage6.debug.reasoning.slice(0, 200)}${stage6.debug.reasoning.length > 200 ? "..." : ""}`);
    console.log(`  debug.alternatives:   ${(stage6.debug.alternatives_considered ?? []).join(" | ") || "none"}`);

    // Full S7 output (if ran)
    if (stage7) {
      console.log(`\n  --- S7 FULL OUTPUT ---`);
      console.log(`  crash_occurred:       ${stage7.crash_occurred}`);
      console.log(`  crash_type:           ${stage7.crash_type ?? "null"}`);
      console.log(`  crash_mechanism:      ${stage7.crash_mechanism ?? "null"}`);
      console.log(`  severity_estimate:    ${stage7.severity_estimate}`);
      console.log(`  crash_phase:          ${stage7.crash_phase ?? "null"}`);
      console.log(`  confidence:           ${stage7.confidence.toFixed(2)}`);
      console.log(`  rider_separation:     ${stage7.body_dynamics.rider_separation ?? "null"}`);
      console.log(`  direction_of_fall:    ${stage7.body_dynamics.direction_of_fall ?? "null"}`);
      console.log(`  bike_behaviour:       ${stage7.body_dynamics.bike_behaviour ?? "null"}`);
      console.log(`  impact_detected:      ${stage7.audio_crash_evidence.impact_detected}`);
      console.log(`  impact_description:   ${stage7.audio_crash_evidence.impact_description ?? "null"}`);
      console.log(`  not_applicable:       ${stage7.not_applicable_reason ?? "null"}`);
      console.log(`  debug.reasoning:      ${stage7.debug.reasoning.slice(0, 200)}${stage7.debug.reasoning.length > 200 ? "..." : ""}`);
    } else {
      console.log(`\n  --- S7 FULL OUTPUT ---`);
      console.log(`  [not run — no crash signal]`);
    }

    // Pass/fail — combined S5 + S6 predicate
    const clipPassResult = clip.clipPass(stage5, stage6);
    console.log(`\n  --- PASS/FAIL ---`);
    console.log(`  Expectation:    ${clip.passDesc}`);
    console.log(`  S5 actual:      outcome=${stage5.outcome.result}, progress=${stage5.progress_assessment.section_completion}`);
    console.log(`  S6 actual:      failure_occurred=${stage6.failure_occurred}, failure_type=${stage6.failure_type}`);
    console.log(`  Result:         ${clipPassResult ? "PASS ✓" : "FAIL ✗"}`);
    if (clip.s7ExpectRun) {
      console.log(`  S7 triggered:   ${crashSignalled ? "yes (expected)" : "NO — EXPECTED TO RUN"}`);
    } else {
      console.log(`  S7 triggered:   ${crashSignalled ? "yes (unexpected trigger)" : "no (expected)"}`);
    }

    const elapsed = Date.now() - startTime;

    return {
      clip,
      status: clipPassResult ? "pass" : "fail",
      stage5_outcome: stage5.outcome.result,
      stage5_progress: stage5.progress_assessment.section_completion,
      stage3_event: stage3.event_detected.type,
      stage6,
      stage7,
      stage7_triggered: crashSignalled,
      clip_pass: clipPassResult,
      elapsed_ms: elapsed,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`  [ERROR] ${message}`);
    return {
      clip,
      status: "error",
      error: message,
      stage5_outcome: "—",
      stage5_progress: "—",
      stage3_event: "—",
      stage6: null,
      stage7: null,
      stage7_triggered: false,
      clip_pass: false,
      elapsed_ms: Date.now() - startTime,
    };
  }
}

// ---------------------------------------------------------------------------
// Regression summary table
// ---------------------------------------------------------------------------

function printSummary(results: ClipResult[]): void {
  console.log(`\n${"=".repeat(72)}`);
  console.log(`S6/S7 REGRESSION SUMMARY`);
  console.log(`${"=".repeat(72)}`);

  const col1 = 20;
  const col2 = 12;
  const col3 = 12;
  const col4 = 14;
  const col5 = 8;
  const col6 = 8;
  const col7 = 8;

  const header =
    `${"Clip".padEnd(col1)} ${"S5 Outcome".padEnd(col2)} ${"S5 Progress".padEnd(col3)} ${"S6 Type".padEnd(col4)} ${"S6 Fail?".padEnd(col5)} ${"S7 Ran".padEnd(col6)} ${"Result".padEnd(col7)}`;
  console.log(header);
  console.log("-".repeat(header.length));

  for (const r of results) {
    if (r.status === "error") {
      console.log(`${r.clip.label.padEnd(col1)} ERROR: ${r.error?.slice(0, 50)}`);
      continue;
    }

    const s5out = (r.stage5_outcome ?? "—").padEnd(col2);
    const s5prog = (r.stage5_progress ?? "—").padEnd(col3);
    const s6type = (r.stage6?.failure_type ?? "—").padEnd(col4);
    const s6fail = (r.stage6?.failure_occurred ? "true" : "false").padEnd(col5);
    const s7ran = (r.stage7_triggered ? "yes" : "no").padEnd(col6);
    const result = r.clip_pass ? "PASS ✓" : "FAIL ✗";

    console.log(`${r.clip.label.padEnd(col1)} ${s5out} ${s5prog} ${s6type} ${s6fail} ${s7ran} ${result}`);
  }

  const passed = results.filter((r) => r.status === "pass").length;
  const failed = results.filter((r) => r.status === "fail").length;
  const errors = results.filter((r) => r.status === "error").length;
  const totalElapsed = results.reduce((acc, r) => acc + r.elapsed_ms, 0);

  console.log(`\n  PASSED: ${passed}/${results.length}`);
  console.log(`  FAILED: ${failed}/${results.length}`);
  if (errors > 0) console.log(`  ERRORS: ${errors}/${results.length}`);
  console.log(`  Total elapsed: ${(totalElapsed / 1000 / 60).toFixed(1)} min`);

  if (failed > 0) {
    console.log(`\n  FAILED CLIPS:`);
    results
      .filter((r) => r.status === "fail")
      .forEach((r) => {
        console.log(`    ${r.clip.label}: expected ${r.clip.passDesc}`);
        console.log(`      S5 got: outcome=${r.stage5_outcome}, progress=${r.stage5_progress}`);
        console.log(`      S6 got: failure_occurred=${r.stage6?.failure_occurred}, failure_type=${r.stage6?.failure_type}`);
      });
  }

  console.log(`${"=".repeat(72)}\n`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY not found in .env.local");
    process.exit(1);
  }

  const missing = clips.filter((c) => !fs.existsSync(c.path));
  if (missing.length > 0) {
    console.error(`Missing video files:`);
    missing.forEach((c) => console.error(`  ${c.id}: ${c.path}`));
    process.exit(1);
  }

  const model = new GPT4oProvider();

  console.log(`\n${"=".repeat(72)}`);
  console.log(`RIDEMIND — S6/S7 REGRESSION TEST`);
  console.log(`Verifying fix commit: 36b1274`);
  console.log(`  S6 Rules 9-12: outcome gate, evidence req, crash override, momentum demotion`);
  console.log(`  S7 Trigger: broadened to bail/stuck/tip_over + fallen/losing_balance`);
  console.log(`Model: ${model.name} | Frames per clip: 16 | Clips: ${clips.length}`);
  console.log(`${"=".repeat(72)}\n`);

  const results: ClipResult[] = [];

  for (let i = 0; i < clips.length; i++) {
    const result = await runClip(clips[i], model, i, clips.length);
    results.push(result);
  }

  printSummary(results);

  // Save results
  const outPath = path.join("scripts", "s6-s7-regression-results.json");
  const jsonOut = results.map((r) => ({
    id: r.clip.id,
    label: r.clip.label,
    status: r.status,
    error: r.error ?? null,
    stage5_outcome: r.stage5_outcome,
    stage5_progress: r.stage5_progress,
    stage3_event: r.stage3_event,
    stage7_triggered: r.stage7_triggered,
    s6: r.stage6
      ? {
          failure_occurred: r.stage6.failure_occurred,
          failure_type: r.stage6.failure_type,
          confidence: r.stage6.confidence,
          failure_description: r.stage6.failure_description,
          likely_root_cause: r.stage6.symptoms_vs_root.likely_root_cause,
          root_cause_confidence: r.stage6.symptoms_vs_root.root_cause_confidence,
          contributing_factors: r.stage6.contributing_factors,
          no_failure_note: r.stage6.no_failure_note,
          control_assessment: r.stage6.control_assessment,
        }
      : null,
    s7: r.stage7
      ? {
          crash_occurred: r.stage7.crash_occurred,
          crash_type: r.stage7.crash_type,
          crash_mechanism: r.stage7.crash_mechanism,
          severity_estimate: r.stage7.severity_estimate,
          confidence: r.stage7.confidence,
        }
      : null,
    elapsed_ms: r.elapsed_ms,
  }));
  fs.writeFileSync(outPath, JSON.stringify(jsonOut, null, 2));
  console.log(`Results saved to ${outPath}\n`);
}

main().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err);
  console.error("Regression error:", message);
  process.exit(1);
});
