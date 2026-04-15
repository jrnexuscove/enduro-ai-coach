// scripts/run-benchmark.ts
//
// Run the benchmark harness against all golden-path fixtures.
// Usage: npx tsx scripts/run-benchmark.ts

import * as path from "node:path";
import { runBenchmark } from "../lib/benchmark/benchmarkHarness";

const goldenDir = path.resolve(__dirname, "../lib/pass2/golden-paths");

let result;
try {
  result = runBenchmark(goldenDir);
} catch (err) {
  console.error("Benchmark failed to run:", err instanceof Error ? err.message : String(err));
  process.exit(1);
}

const { summary, results } = result;

// --- Summary ---
console.log("\n=== Benchmark Summary ===");
console.log(`Total clips : ${summary.total_clips}`);
console.log(`Passed      : ${summary.total_pass}`);
console.log(`Failed      : ${summary.total_fail}`);

// --- Per-clip results ---
console.log("\n=== Per-clip Results ===");
for (const clip of results) {
  const status = clip.overall.pass ? "PASS" : "FAIL";
  const validatorStatus = clip.validator.pass ? "ok" : "FAIL";
  const safetyStatus = clip.safety.pass ? "ok" : "FAIL";
  console.log(`\n[${status}] ${clip.clip_name}`);
  console.log(`  Validator : ${validatorStatus}`);
  console.log(`  Safety    : ${safetyStatus}`);
  if (clip.review_notes) {
    const firstLine = clip.review_notes.split("\n").find((l) => l.trim().length > 0) ?? "";
    console.log(`  Review    : ${firstLine.trim()}`);
  }
}

// --- Failures detail ---
const failureEntries = Object.entries(summary.failures_by_clip);
if (failureEntries.length > 0) {
  console.log("\n=== Failures Detail ===");
  for (const [clipName, failures] of failureEntries) {
    console.log(`\n${clipName}:`);
    for (const f of failures) {
      console.log(`  - ${f}`);
    }
  }
} else {
  console.log("\nAll clips passed.");
}

process.exit(summary.total_fail > 0 ? 1 : 0);
