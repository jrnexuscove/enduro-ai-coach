// RideMind — Stage 11 Business Rules Unit Test
// Pure code-level test — no model calls, no API keys needed.
// Tests validateStage11BusinessRules for the speed_risk warning-only edge case
// and the contradiction hard-fail inverse case.
//
// Usage:
//   npx tsx scripts/test-stage11-business-rules.ts
//
// Exit code 0 if all tests pass, 1 if any fail.

import {
  type Stage11Output,
  type Stage7Output,
  type DebugBlock,
} from "../pipeline/types.js";
import { validateStage11BusinessRules } from "../pipeline/stage11-safety-validation.js";

const DBG: DebugBlock = { reasoning: "", alternatives_considered: [], confidence_factors: [] };

// ————————————————————————————————————————————
// Shared stage7 fixture — moderate crash, crash_occurred=true
// ————————————————————————————————————————————

const stage7Moderate: Stage7Output = {
  stage: "crash_type_classification",
  crash_occurred: true,
  crash_type: "otb",
  crash_mechanism: "Excessive entry speed caused front wheel deflection and loss of steering",
  severity_estimate: "moderate",
  crash_phase: "execution",
  body_dynamics: {
    rider_separation: true,
    direction_of_fall: "forward",
    bike_behaviour: "front wash, bike toppled",
  },
  confidence: 0.82,
  audio_crash_evidence: {
    impact_detected: true,
    impact_description: "Rock impact and scraping sounds",
    post_crash_audio: "Engine cutout",
  },
  not_applicable_reason: null,
  debug: DBG,
};

// ————————————————————————————————————————————
// Helper
// ————————————————————————————————————————————

function makeOutput(flags: Stage11Output["flags"], safe: boolean): Stage11Output {
  return {
    stage: "safety_validation",
    safe,
    flags,
    issues: ["Speed advice present — qualifying constraints noted but flagged for review"],
    confidence_adjustment: 0.4,
    debug: DBG,
  };
}

// ————————————————————————————————————————————
// Test cases
// ————————————————————————————————————————————

interface TestCase {
  name: string;
  description: string;
  output: Stage11Output;
  stage7: Stage7Output | null;
  expectErrors: boolean;
}

const tests: TestCase[] = [
  {
    name: "speed_risk_warning_only",
    description:
      "safe=true, speed_risk=true, all other flags false — qualifying constraints present; " +
      "speed_risk is warning-only when safe=true (severity=moderate, not hard-fail threshold)",
    output: makeOutput(
      { speed_risk: true, contradiction: false, severity_mismatch: false, observability_overreach: false },
      true
    ),
    stage7: stage7Moderate,
    expectErrors: false,
  },
  {
    name: "contradiction_hard_fail",
    description:
      "safe=true, contradiction=true — contradiction is always a hard fail; " +
      "safe=true with contradiction is always an invalid combination",
    output: makeOutput(
      { speed_risk: false, contradiction: true, severity_mismatch: false, observability_overreach: false },
      true
    ),
    stage7: stage7Moderate,
    expectErrors: true,
  },
];

// ————————————————————————————————————————————
// Runner
// ————————————————————————————————————————————

console.log("=== RideMind Stage 11 — Business Rules Unit Test ===\n");
console.log("No model calls. No API keys needed.\n");
console.log("─".repeat(60) + "\n");

let allPassed = true;

for (const test of tests) {
  const errors = validateStage11BusinessRules(test.output, test.stage7);
  const hasErrors = errors.length > 0;
  const passed = test.expectErrors ? hasErrors : !hasErrors;

  console.log(`[${test.name}]`);
  console.log(`  ${test.description}`);
  console.log(`  Expected: ${test.expectErrors ? "errors (business rule violation)" : "empty array (no violations)"}`);
  if (hasErrors) {
    console.log(`  Got:      ${errors.length} error(s):`);
    for (const e of errors) {
      console.log(`    - ${e}`);
    }
  } else {
    console.log(`  Got:      empty array`);
  }
  console.log(`  Result:   ${passed ? "PASS" : "FAIL"}`);
  console.log();

  if (!passed) allPassed = false;
}

console.log("─".repeat(60));
console.log(`\n${allPassed ? "All tests passed." : "One or more tests FAILED — see output above."}`);
process.exit(allPassed ? 0 : 1);
