// RideMind T1 — Full 8-clip batch retest through complete 11-stage pipeline
// Usage: npx tsx scripts/t1-batch-runner.ts
//
// Runs all 8 Phase 2 clips through the full pipeline sequentially.
// Prints a condensed per-clip summary as each clip completes.

import fs from "fs";
import path from "path";
import { config } from "dotenv";
import { type Stage7Output } from "../pipeline/types.js";
import { GPT4oProvider } from "../pipeline/model-provider.js";
import { extractFrames } from "../pipeline/frame-extractor.js";
import { runStage1 } from "../pipeline/stage1-camera.js";
import { runStage2 } from "../pipeline/stage2-observability.js";
import { runStage3 } from "../pipeline/stage3-intent.js";
import { runStage4 } from "../pipeline/stage4-terrain-feature.js";
import { runStage5 } from "../pipeline/stage5-event-sequencing.js";
import { runStage6 } from "../pipeline/stage6-failure-type.js";
import { runStage7 } from "../pipeline/stage7-crash-type.js";
import { runStage8 } from "../pipeline/stage8-causal-chain.js";
import { runStage9 } from "../pipeline/stage9-coaching-decision.js";
import { runStage10, validateStage10BusinessRules } from "../pipeline/stage10-coaching-generation.js";
import { runStage11 } from "../pipeline/stage11-safety-validation.js";

config({ path: ".env.local" });

// ---------------------------------------------------------------------------
// Clip definitions — all 8 Phase 2 test clips
// ---------------------------------------------------------------------------
const clips = [
  {
    id: "colin-hill",
    label: "Colin Hill",
    path: String.raw`C:\Users\rigge\OneDrive\Videos\Enduro ai coach test clips\colin hill.mp4`,
    camera: "3rd-person",
    groundTruth: "Bail midway — seated entire time",
  },
  {
    id: "clutch-scream-hill",
    label: "Clutch Scream Hill",
    path: String.raw`C:\Users\rigge\OneDrive\Videos\Enduro ai coach test clips\clutch scream hill.mp4`,
    camera: "POV",
    groundTruth: "Wrong turn, hits tree, falls",
  },
  {
    id: "fall-bulgario",
    label: "Fall Bulgario",
    path: String.raw`C:\Users\rigge\OneDrive\Videos\Enduro ai coach test clips\Fall bulgario muddy hill 1.mp4`,
    camera: "POV",
    groundTruth: "Falls near top, momentum loss",
  },
  {
    id: "jimbo-crash",
    label: "Jimbo Crash",
    path: String.raw`C:\Users\rigge\OneDrive\Videos\Enduro ai coach test clips\jimbo crash.mp4`,
    camera: "POV",
    groundTruth: "Hits tree, headlight impact",
  },
  {
    id: "long-hill",
    label: "Long Hill",
    path: String.raw`C:\Users\rigge\OneDrive\Videos\Enduro ai coach test clips\long hill.mp4`,
    camera: "POV",
    groundTruth: "Clean completion — must NOT report false failures",
  },
  {
    id: "nick-crash",
    label: "Nick Crash",
    path: String.raw`C:\Users\rigge\OneDrive\Videos\Enduro ai coach test clips\nick crash.mp4`,
    camera: "3rd-person",
    groundTruth: "Crash after jumps",
  },
  {
    id: "steep-hill-bail",
    label: "Steep Hill Bail",
    path: String.raw`C:\Users\rigge\OneDrive\Videos\Enduro ai coach test clips\steep hill bail in trees.mp4`,
    camera: "POV",
    groundTruth: "Runs out of room, drops bike",
  },
  {
    id: "mark-crash",
    label: "Mark Crash",
    path: String.raw`C:\Users\rigge\OneDrive\Videos\Enduro ai coach test clips\Mark crash.mp4`,
    camera: "3rd-person",
    groundTruth: "Over-handlebars crash",
  },
];

// ---------------------------------------------------------------------------
// Per-clip result type
// ---------------------------------------------------------------------------
interface ClipResult {
  id: string;
  label: string;
  camera: string;
  groundTruth: string;
  status: "pass" | "fail" | "error";
  error?: string;
  stage6_failure_type: string | null;
  stage6_confidence: number;
  stage7_ran: boolean;
  stage7_crash_occurred: boolean | null;
  stage7_severity: string | null;
  stage8_root_cause: string;
  stage10_primary_focus: string;
  stage10_confidence: number;
  stage10_business_rules: string[];
  stage11_safe: boolean;
  stage11_flags: string[];
  stage11_confidence_adjustment: number | null;
  stage11_issues: string[];
  elapsed_ms: number;
}

// ---------------------------------------------------------------------------
// Run a single clip through the full pipeline
// ---------------------------------------------------------------------------
async function runClip(
  clip: (typeof clips)[number],
  model: InstanceType<typeof GPT4oProvider>,
  clipIndex: number,
  totalClips: number
): Promise<ClipResult> {
  const startTime = Date.now();
  const prefix = `[${clipIndex + 1}/${totalClips}] ${clip.label}`;

  console.log(`\n${"=".repeat(70)}`);
  console.log(`${prefix} — camera: ${clip.camera}`);
  console.log(`  Ground truth: ${clip.groundTruth}`);
  console.log(`${"=".repeat(70)}\n`);

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
    process.stdout.write(` ${stage3.intent_category} (${stage3.confidence.toFixed(2)}) | event: ${stage3.event_detected.type}\n`);

    // Stage 4
    process.stdout.write(`  [S4] terrain/features...`);
    const stage4 = await runStage4(model, frames, stage1, stage2, stage3);
    process.stdout.write(` ${stage4.surface.primary_type}/${stage4.surface.condition}, ${stage4.gradient.overall}, features: ${stage4.features_detected.length}\n`);

    // Stage 5
    process.stdout.write(`  [S5] event sequencing...`);
    const stage5 = await runStage5(model, frames, stage1, stage2, stage3, stage4);
    process.stdout.write(` outcome: ${stage5.outcome.result} (${stage5.outcome.confidence.toFixed(2)}), segments: ${stage5.segments.length}\n`);

    // Stage 6
    process.stdout.write(`  [S6] failure type...`);
    const stage6 = await runStage6(model, stage1, stage2, stage3, stage4, stage5);
    process.stdout.write(` ${stage6.failure_type ?? "none"} (${stage6.confidence.toFixed(2)})\n`);

    // Stage 7 — conditional
    const crashSignalled =
      stage5.outcome.result === "crash" || stage3.event_detected.type === "crash";
    let stage7: Stage7Output | null = null;

    if (crashSignalled) {
      process.stdout.write(`  [S7] crash type...`);
      stage7 = await runStage7(model, stage1, stage2, stage3, stage4, stage5, stage6);
      process.stdout.write(` ${stage7.crash_type ?? "unknown"}, severity: ${stage7.severity_estimate} (${stage7.confidence.toFixed(2)})\n`);
    } else {
      console.log(`  [S7] skipped — no crash in S3/S5`);
    }

    // Stage 8
    process.stdout.write(`  [S8] causal chain...`);
    const stage8 = await runStage8(model, stage1, stage2, stage3, stage4, stage5, stage6, stage7);
    process.stdout.write(` ${stage8.outcome_status}, conf: ${stage8.overall_confidence.toFixed(2)}\n`);

    // Stage 9
    process.stdout.write(`  [S9] coaching strategy...`);
    const stage9 = await runStage9(model, stage2, stage3, stage4, stage8);
    const s9domain = stage9.primary_focus?.coaching_domain ?? "none";
    process.stdout.write(` domain: ${s9domain}\n`);

    // Stage 10
    process.stdout.write(`  [S10] coaching generation...`);
    const stage10 = await runStage10(model, stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9);
    const s10BusinessErrors = validateStage10BusinessRules(stage10);
    process.stdout.write(` conf: ${stage10.confidence.toFixed(2)}\n`);

    // Stage 11
    process.stdout.write(`  [S11] safety validation...`);
    const stage11 = await runStage11(model, stage2, stage6, stage7, stage8, stage9, stage10);
    process.stdout.write(` safe: ${stage11.safe}\n`);

    const elapsed = Date.now() - startTime;

    // Build condensed result
    const raisedFlags = Object.entries(stage11.flags)
      .filter(([, v]) => v)
      .map(([k]) => k);

    const s10Title = stage10.primary_focus
      ? `${stage10.primary_focus.category} — ${stage10.primary_focus.title.slice(0, 70)}`
      : "none";

    const s8RootCause = (
      stage8.primary_cause.factor ||
      stage8.causal_summary.failure_mechanism ||
      "unknown"
    ).slice(0, 100);

    return {
      id: clip.id,
      label: clip.label,
      camera: clip.camera,
      groundTruth: clip.groundTruth,
      status: stage11.safe ? "pass" : "fail",
      stage6_failure_type: stage6.failure_type,
      stage6_confidence: stage6.confidence,
      stage7_ran: crashSignalled,
      stage7_crash_occurred: stage7?.crash_occurred ?? null,
      stage7_severity: stage7?.severity_estimate ?? null,
      stage8_root_cause: s8RootCause,
      stage10_primary_focus: s10Title,
      stage10_confidence: stage10.confidence,
      stage10_business_rules: s10BusinessErrors,
      stage11_safe: stage11.safe,
      stage11_flags: raisedFlags,
      stage11_confidence_adjustment: stage11.confidence_adjustment,
      stage11_issues: stage11.issues,
      elapsed_ms: elapsed,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`  [ERROR] ${message}`);
    return {
      id: clip.id,
      label: clip.label,
      camera: clip.camera,
      groundTruth: clip.groundTruth,
      status: "error",
      error: message,
      stage6_failure_type: null,
      stage6_confidence: 0,
      stage7_ran: false,
      stage7_crash_occurred: null,
      stage7_severity: null,
      stage8_root_cause: "—",
      stage10_primary_focus: "—",
      stage10_confidence: 0,
      stage10_business_rules: [],
      stage11_safe: false,
      stage11_flags: [],
      stage11_confidence_adjustment: null,
      stage11_issues: [],
      elapsed_ms: Date.now() - startTime,
    };
  }
}

// ---------------------------------------------------------------------------
// Print condensed clip summary
// ---------------------------------------------------------------------------
function printClipSummary(r: ClipResult): void {
  const bar = "-".repeat(70);
  const safeMark = r.status === "error" ? "ERROR" : r.stage11_safe ? "SAFE  " : "UNSAFE";
  const elapsed = (r.elapsed_ms / 1000).toFixed(0) + "s";

  console.log(`\n${bar}`);
  console.log(`CLIP RESULT: ${r.label} [${safeMark}] — ${elapsed}`);
  console.log(`  Camera:       ${r.camera}`);
  console.log(`  Ground truth: ${r.groundTruth}`);

  if (r.status === "error") {
    console.log(`  ERROR: ${r.error}`);
    console.log(bar);
    return;
  }

  // Stage 6
  const s6conf = r.stage6_confidence.toFixed(2);
  console.log(`  S6  failure_type:       ${r.stage6_failure_type ?? "none"} (${s6conf})`);

  // Stage 7
  if (r.stage7_ran) {
    const crash = r.stage7_crash_occurred ? "yes" : "no";
    console.log(`  S7  crash_occurred:     ${crash} | severity: ${r.stage7_severity ?? "n/a"}`);
  } else {
    console.log(`  S7  crash_occurred:     skipped (no crash signalled)`);
  }

  // Stage 8
  console.log(`  S8  root_cause:         ${r.stage8_root_cause}`);

  // Stage 10
  const s10conf = r.stage10_confidence.toFixed(2);
  console.log(`  S10 primary_focus:      ${r.stage10_primary_focus} (conf: ${s10conf})`);
  if (r.stage10_business_rules.length > 0) {
    console.log(`  S10 business_rule_warn: ${r.stage10_business_rules.join("; ")}`);
  }

  // Stage 11
  const flags = r.stage11_flags.length > 0 ? r.stage11_flags.join(", ") : "none";
  const adj = r.stage11_confidence_adjustment !== null
    ? r.stage11_confidence_adjustment.toFixed(2)
    : "null";
  console.log(`  S11 safe:               ${r.stage11_safe} | flags: [${flags}] | conf_adj: ${adj}`);
  if (r.stage11_issues.length > 0) {
    r.stage11_issues.forEach((iss) => {
      console.log(`      issue: ${iss.slice(0, 100)}`);
    });
  }

  console.log(bar);
}

// ---------------------------------------------------------------------------
// Final batch summary table
// ---------------------------------------------------------------------------
function printBatchSummary(results: ClipResult[]): void {
  console.log(`\n${"=".repeat(70)}`);
  console.log(`T1 BATCH SUMMARY — ${results.length} clips`);
  console.log(`${"=".repeat(70)}`);

  const header = `${"Clip".padEnd(22)} ${"S6 Failure".padEnd(14)} ${"S7 Crash/Sev".padEnd(16)} ${"S11 Safe".padEnd(8)} ${"Flags".padEnd(30)} ${"Adj"}`;
  console.log(header);
  console.log("-".repeat(header.length));

  for (const r of results) {
    if (r.status === "error") {
      console.log(`${r.label.padEnd(22)} ERROR: ${r.error?.slice(0, 60)}`);
      continue;
    }

    const s6 = (r.stage6_failure_type ?? "none").padEnd(14);
    const s7crash = r.stage7_ran
      ? `${r.stage7_crash_occurred ? "yes" : "no"}/${r.stage7_severity ?? "?"}`.padEnd(16)
      : "skipped".padEnd(16);
    const safe = (r.stage11_safe ? "SAFE" : "UNSAFE").padEnd(8);
    const flags = (r.stage11_flags.join(",") || "—").padEnd(30);
    const adj = r.stage11_confidence_adjustment !== null
      ? r.stage11_confidence_adjustment.toFixed(2)
      : "null";

    console.log(`${r.label.padEnd(22)} ${s6} ${s7crash} ${safe} ${flags} ${adj}`);
  }

  const passed = results.filter((r) => r.status === "pass").length;
  const failed = results.filter((r) => r.status === "fail").length;
  const errors = results.filter((r) => r.status === "error").length;
  const totalElapsed = results.reduce((acc, r) => acc + r.elapsed_ms, 0);

  console.log(`\n  SAFE:   ${passed}/${results.length}`);
  console.log(`  UNSAFE: ${failed}/${results.length}`);
  if (errors > 0) console.log(`  ERRORS: ${errors}/${results.length}`);
  console.log(`  Total elapsed: ${(totalElapsed / 1000 / 60).toFixed(1)} min`);
  console.log(`${"=".repeat(70)}\n`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main(): Promise<void> {
  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY not found in .env.local");
    process.exit(1);
  }

  // Validate all clip paths exist before starting
  const missing = clips.filter((c) => !fs.existsSync(c.path));
  if (missing.length > 0) {
    console.error(`Missing video files:`);
    missing.forEach((c) => console.error(`  ${c.id}: ${c.path}`));
    process.exit(1);
  }

  const model = new GPT4oProvider();
  const startTime = Date.now();

  console.log(`\n${"=".repeat(70)}`);
  console.log(`RIDEMIND T1 — FULL 8-CLIP PIPELINE RETEST`);
  console.log(`Model: ${model.name} | Frames per clip: 16 | Clips: ${clips.length}`);
  console.log(`${"=".repeat(70)}\n`);

  const results: ClipResult[] = [];

  for (let i = 0; i < clips.length; i++) {
    const result = await runClip(clips[i], model, i, clips.length);
    printClipSummary(result);
    results.push(result);
  }

  printBatchSummary(results);

  // Save full results to file
  const outPath = path.join("scripts", "t1-results.json");
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(`Full results saved to ${outPath}\n`);

  const totalElapsed = (Date.now() - startTime) / 1000 / 60;
  console.log(`T1 complete in ${totalElapsed.toFixed(1)} min\n`);
}

main().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err);
  console.error("T1 batch error:", message);
  process.exit(1);
});
