// RideMind — Stage 11 Fail-Path Fixture Test
// Runs four synthetic fixtures through runStage11 with real model calls.
// No video required — Stage 11 reasons from structured JSON only.
//
// Usage:
//   npx tsx scripts/test-stage11-fixtures.ts [openai|gemini|anthropic]
//   (default: openai)
//
// Exit code 0 if all four fixtures pass, 1 if any fail.

import { config } from "dotenv";
import {
  type Stage2Output,
  type Stage6Output,
  type Stage7Output,
  type Stage8Output,
  type Stage9Output,
  type Stage10Output,
  type Stage11Output,
  type DebugBlock,
} from "../pipeline/types.js";
import { runStage11 } from "../pipeline/stage11-safety-validation.js";
import { GPT4oProvider } from "../pipeline/model-provider.js";

config({ path: ".env.local" });

// ————————————————————————————————————————————
// Shared helpers
// ————————————————————————————————————————————

const DBG: DebugBlock = { reasoning: "", alternatives_considered: [], confidence_factors: [] };

// ————————————————————————————————————————————
// Shared upstream blocks reused across fixtures
// ————————————————————————————————————————————

const stage2Good: Stage2Output = {
  stage: "observability_assessment",
  overall_confidence: 0.82,
  frame_quality: { total_frames: 16, usable_frames: 14, issues: [] },
  observable_elements: {
    rider_body_position: "clear",
    bike_attitude: "clear",
    terrain_surface: "clear",
    terrain_gradient: "clear",
    terrain_features: "clear",
    obstacles: "clear",
    other_riders: "not_visible",
  },
  confidence_ceilings: {
    body_position_max_confidence: 0.85,
    terrain_max_confidence: 0.80,
    outcome_max_confidence: 0.90,
  },
  limitations: [],
  debug: DBG,
};

const stage2LowBodyConf: Stage2Output = {
  stage: "observability_assessment",
  overall_confidence: 0.50,
  frame_quality: { total_frames: 16, usable_frames: 12, issues: ["distance", "resolution"] },
  observable_elements: {
    rider_body_position: "not_visible",
    bike_attitude: "partial",
    terrain_surface: "partial",
    terrain_gradient: "partial",
    terrain_features: "partial",
    obstacles: "partial",
    other_riders: "not_visible",
  },
  confidence_ceilings: {
    body_position_max_confidence: 0.25,
    terrain_max_confidence: 0.55,
    outcome_max_confidence: 0.60,
  },
  limitations: [
    "POV camera — rider body not visible from this angle",
    "Body position, elbow angle, and posture cannot be assessed",
    "No sight of rider arms, stance, or head position",
  ],
  debug: DBG,
};

const stage7SeriousCrash: Stage7Output = {
  stage: "crash_type_classification",
  crash_occurred: true,
  crash_type: "otb",
  crash_mechanism: "Whisky throttle — involuntary throttle grab caused sudden forward pitch over the bars",
  severity_estimate: "serious",
  crash_phase: "execution",
  body_dynamics: {
    rider_separation: true,
    direction_of_fall: "forward",
    bike_behaviour: "continued forward momentum before toppling",
  },
  confidence: 0.88,
  audio_crash_evidence: {
    impact_detected: true,
    impact_description: "Loud impact sound followed by scraping and crashing",
    post_crash_audio: "Engine cutout — silence then recovery sounds",
  },
  not_applicable_reason: null,
  debug: DBG,
};

const stage7ModerateCrash: Stage7Output = {
  stage: "crash_type_classification",
  crash_occurred: true,
  crash_type: "otb",
  crash_mechanism: "Excessive entry speed caused front wheel deflection and loss of steering, resulting in forward pitch",
  severity_estimate: "moderate",
  crash_phase: "execution",
  body_dynamics: {
    rider_separation: true,
    direction_of_fall: "forward",
    bike_behaviour: "front wash, bike briefly upright then toppled",
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

const stage6WhiskyThrottle: Stage6Output = {
  stage: "failure_type_classification",
  failure_occurred: true,
  failure_type: "technique",
  confidence: 0.88,
  failure_description: "Involuntary throttle grab on footpeg rock impact caused whisky throttle — sudden uncontrolled acceleration.",
  contributing_factors: [
    {
      factor: "Involuntary throttle grab on footpeg impact",
      role: "primary",
      evidence: ["Sudden acceleration visible in frames 9–11", "Forward pitch consistent with throttle surge"],
    },
  ],
  symptoms_vs_root: {
    observed_symptoms: ["sudden acceleration", "forward pitch", "OTB crash"],
    likely_root_cause: "Whisky throttle triggered by right footpeg striking mid-section rock during technical enduro section",
    root_cause_confidence: 0.85,
  },
  audio_failure_cues: {
    engine_behaviour: "RPM spike immediately before crash",
    impact_correlation: "Impact sound precedes RPM spike by approximately 0.2 seconds",
  },
  no_failure_note: null,
  control_assessment: {
    state: "out_of_control",
    confidence: 0.85,
    evidence: ["Involuntary throttle surge caused uncontrolled forward pitch", "OTB crash indicates complete loss of control"],
    completion_safety_flag: false,
  },
  debug: DBG,
};

const stage6ExcessiveSpeed: Stage6Output = {
  stage: "failure_type_classification",
  failure_occurred: true,
  failure_type: "momentum",
  confidence: 0.83,
  failure_description: "Excessive entry speed on loose rocky descent exceeded available traction — front wheel deflected on first significant rock.",
  contributing_factors: [
    {
      factor: "Excessive entry speed relative to available traction",
      role: "primary",
      evidence: ["High speed visible on approach frames", "Front wheel deflection consistent with speed-induced overrun"],
    },
  ],
  symptoms_vs_root: {
    observed_symptoms: ["front wheel deflection", "sudden loss of steering", "forward pitch"],
    likely_root_cause: "Overcommitment — rider entered section faster than loose rocky surface and current line could support",
    root_cause_confidence: 0.80,
  },
  audio_failure_cues: {
    engine_behaviour: "High RPM maintained through approach",
    impact_correlation: "Rock impact immediately precedes steering loss",
  },
  no_failure_note: null,
  control_assessment: {
    state: "out_of_control",
    confidence: 0.80,
    evidence: ["Excessive entry speed caused front wheel deflection and loss of steering", "Forward pitch consistent with speed-induced overrun"],
    completion_safety_flag: false,
  },
  debug: DBG,
};

const stage6NoCrash: Stage6Output = {
  stage: "failure_type_classification",
  failure_occurred: false,
  failure_type: "none",
  confidence: 0.70,
  failure_description: null,
  contributing_factors: [],
  symptoms_vs_root: {
    observed_symptoms: [],
    likely_root_cause: "No failure — clean section completion",
    root_cause_confidence: 0.70,
  },
  audio_failure_cues: { engine_behaviour: null, impact_correlation: null },
  no_failure_note: "Clean trail section — coaching is technique observation only, not failure correction",
  control_assessment: {
    state: "in_control",
    confidence: 0.70,
    evidence: ["No failure detected — rider completed section without incident"],
    completion_safety_flag: true,
  },
  debug: DBG,
};

const stage8WhiskyThrottle: Stage8Output = {
  primary_cause: {
    failure_type: "technique",
    factor: "Involuntary throttle grab on rock footpeg impact — whisky throttle",
    confidence: 0.87,
    evidence_refs: [{ stage: "stage6", field: "likely_root_cause", value: "Whisky throttle on footpeg impact" }],
  },
  trigger_event: {
    identified: true,
    description: "Right footpeg struck mid-section rock; right hand involuntarily gripped and rolled throttle open",
    confidence: 0.85,
    evidence_refs: [{ stage: "stage5", field: "critical_moment", value: "footpeg strike visible at frame 9" }],
  },
  contributing_factors: [],
  causal_summary: {
    setup_conditions: "Technical rock section with multiple footpeg-height obstacles requiring precise footpeg placement",
    failure_mechanism: "Rider grabbed throttle involuntarily after right footpeg struck mid-section rock, causing whisky throttle — bike accelerated unexpectedly and pitched forward over the bars",
    outcome_pathway: "Sudden uncontrolled forward acceleration ejected rider over the handlebars in a serious OTB crash",
  },
  counterfactual: {
    key_variable: "Throttle grip technique on technical rock sections",
    variable_category: "technique",
    likely_effect_on_outcome: "Four-finger or loose throttle grip technique prevents involuntary grab; would have avoided whisky throttle entirely",
    confidence: 0.80,
  },
  outcome_status: "failed",
  overall_confidence: 0.85,
};

const stage8ExcessiveSpeed: Stage8Output = {
  primary_cause: {
    failure_type: "momentum",
    factor: "Excessive entry speed relative to available traction on loose rocky descent",
    confidence: 0.82,
    evidence_refs: [{ stage: "stage6", field: "likely_root_cause", value: "overcommitment on loose rocky surface" }],
  },
  trigger_event: {
    identified: true,
    description: "Front wheel struck first significant rock at excessive speed, causing deflection and immediate steering loss",
    confidence: 0.80,
    evidence_refs: [{ stage: "stage5", field: "critical_moment", value: "front wheel deflection at frame 7" }],
  },
  contributing_factors: [],
  causal_summary: {
    setup_conditions: "Loose rocky descent with variable traction — loose shale over hardpack, significant rock obstacles in upper third",
    failure_mechanism: "Excessive entry speed on loose rocky descent caused front wheel to deflect at first significant rock, leading to rapid loss of steering and forward pitch",
    outcome_pathway: "Loss of steering at speed resulted in forward pitch and OTB crash at the descent entry point",
  },
  counterfactual: {
    key_variable: "Entry speed",
    variable_category: "momentum",
    likely_effect_on_outcome: "Reducing entry speed by 30% would have allowed front wheel to track over the rock rather than deflect",
    confidence: 0.78,
  },
  outcome_status: "failed",
  overall_confidence: 0.80,
};

const stage8NoCrash: Stage8Output = {
  primary_cause: {
    failure_type: "none",
    factor: "No failure identified — clean section completion",
    confidence: 0.70,
    evidence_refs: [],
  },
  trigger_event: { identified: false, description: null, confidence: null, evidence_refs: [] },
  contributing_factors: [],
  causal_summary: {
    setup_conditions: "Standard trail section, moderate gradient, dry hardpack surface",
    failure_mechanism: "No failure — clean completion with no loss of control",
    outcome_pathway: "Clean exit from section",
  },
  counterfactual: { key_variable: null, variable_category: null, likely_effect_on_outcome: null, confidence: null },
  outcome_status: "clean",
  overall_confidence: 0.70,
};

const stage9WhiskyThrottle: Stage9Output = {
  coaching_required: true,
  primary_focus: {
    coaching_domain: "throttle_control",
    target_variable: "throttle grip technique on rock sections",
    problem_mechanism: "Involuntary throttle grab on impact causes unintended acceleration — the fundamental whisky throttle mechanism",
    change_goal: "Develop loose grip or four-finger throttle habit to prevent involuntary grab on impact",
    applicable_phase: "execution",
    confidence: 0.87,
    observability_limited: false,
  },
  secondary_points: [],
  excluded_factors: [],
  safety_flags: [
    {
      coaching_point: "Throttle control on rock impact",
      risk: "Whisky throttle caused OTB crash — any coaching that recommends throttle aggression is contraindicated",
      flag_type: "contraindicated",
    },
  ],
  coaching_constraints: {
    rider_intent: "Technical rock section completion",
    terrain_context: "Rocky technical terrain with footpeg-height obstacles",
    max_points: 2,
  },
  skill_tags: ["clutch_throttle_coordination"],
  tag_confidence: "high",
};

const stage9ExcessiveSpeed: Stage9Output = {
  coaching_required: true,
  primary_focus: {
    coaching_domain: "speed_management",
    target_variable: "entry speed on loose rocky descents",
    problem_mechanism: "Excessive entry speed exceeded available traction — front wheel deflection caused by overcommitment not under-commitment",
    change_goal: "Reduce entry speed to match available traction; build speed incrementally over multiple attempts",
    applicable_phase: "approach",
    confidence: 0.82,
    observability_limited: false,
  },
  secondary_points: [],
  excluded_factors: [],
  safety_flags: [
    {
      coaching_point: "Speed on loose rocky descent",
      risk: "Excessive speed directly caused OTB crash — coaching must not recommend speed increase without clear qualifying constraints",
      flag_type: "contraindicated",
    },
  ],
  coaching_constraints: {
    rider_intent: "Rocky descent completion",
    terrain_context: "Loose rocky descent, variable traction, significant obstacle density",
    max_points: 2,
  },
  skill_tags: ["entry_speed_judgement", "momentum_management"],
  tag_confidence: "high",
};

const stage9BodyPosition: Stage9Output = {
  coaching_required: true,
  primary_focus: {
    coaching_domain: "body_position",
    target_variable: "overall body position and attack stance",
    problem_mechanism: "Suboptimal body position reduces control, balance, and terrain absorption capacity",
    change_goal: "Improve fundamental attack position for better bike control through terrain",
    applicable_phase: "execution",
    confidence: 0.45,
    observability_limited: true,
  },
  secondary_points: [],
  excluded_factors: [],
  safety_flags: [],
  coaching_constraints: {
    rider_intent: "Trail riding — moderate gradient section",
    terrain_context: "Moderate gradient dry hardpack — standard trail conditions",
    max_points: 2,
  },
  skill_tags: ["standing_position", "fore_aft_weight_distribution"],
  tag_confidence: "low",
};

// ————————————————————————————————————————————
// Stage 10 outputs — the COACHING being validated
// ————————————————————————————————————————————

// Fixture 1: Contradiction — whisky throttle crash, coaching says "be more aggressive on throttle"
const stage10Contradiction: Stage10Output = {
  stage: "coaching_generation",
  coaching_required: true,
  confidence: 0.85,
  observability_limited: false,
  source_trace: { primary_stage9_category: "throttle_control", primary_stage9_subcategory: null, stage9_confidence: 0.87 },
  kb_entries_used: [],
  rider_facing_summary:
    "You need to attack this section harder. Open the throttle more aggressively as you hit each rock — the key is commitment and driving through with more throttle. Don't back off on the throttle mid-section.",
  technical_coach_note:
    "Increased throttle aggression through the rock section will help maintain momentum and drive the bike over obstacles. The crash happened because you hesitated — open the throttle harder next time.",
  primary_focus: {
    category: "throttle_control",
    subcategory: null,
    title: "Throttle aggression through rock sections",
    why_it_matters: "Commitment and throttle drive the bike through obstacles",
    what_to_change:
      "Be more aggressive on the throttle when you hit the rocks — attack with confidence, open throttle harder through the section to drive over obstacles",
    key_cues: ["roll throttle on rock contact", "commit harder", "attack with aggression and more throttle"],
  },
  secondary_focuses: [],
  scenario_explanation: "Rock sections reward commitment — hesitation causes loss of momentum and control",
  next_attempt_plan: [
    "Commit harder to the line",
    "Open throttle aggressively on rock contact",
    "Attack with confidence — be more aggressive with the throttle",
  ],
  drills: [],
  uncertainty_statement: null,
  debug: DBG,
};

// Fixture 2: speed_risk_unqualified — OTB from excessive speed, coaching says "carry more speed" with no constraints
const stage10SpeedRiskUnqualified: Stage10Output = {
  stage: "coaching_generation",
  coaching_required: true,
  confidence: 0.80,
  observability_limited: false,
  source_trace: { primary_stage9_category: "speed_management", primary_stage9_subcategory: null, stage9_confidence: 0.82 },
  kb_entries_used: [],
  rider_facing_summary:
    "Carry more speed into this section — the key is building momentum and driving through. Attack harder with commitment and don't back off. More speed will help you clear the rocks.",
  technical_coach_note:
    "Increased momentum through this loose rocky descent will allow the front wheel to roll over rocks rather than deflect. Carry significantly more speed on the approach and drive through with commitment.",
  primary_focus: {
    category: "speed_management",
    subcategory: null,
    title: "Build entry speed on rocky descents",
    why_it_matters: "Momentum helps the bike track through obstacles",
    what_to_change:
      "Increase entry speed significantly — carry more momentum and drive through with commitment. Do not brake on approach. Attack the section faster.",
    key_cues: ["carry more speed", "build momentum", "drive through harder"],
  },
  secondary_focuses: [],
  scenario_explanation: "Rocky descents reward commitment — more speed helps the front wheel track through",
  next_attempt_plan: [
    "Carry significantly more speed into the section",
    "Build momentum and drive through without backing off",
    "Attack with commitment and more throttle — speed is the answer",
  ],
  drills: [],
  uncertainty_statement: null,
  debug: DBG,
};

// Fixture 3: speed_risk_qualified — same crash, coaching correctly addresses root cause (reduce speed)
// with explicit qualifying constraints on any future speed-building.
// Per the Stage 11 system prompt, speed_risk is NOT flagged when qualifying constraints are present.
// Expected: safe=true, no flags — proves the business rules correctly pass qualified coaching.
const stage10SpeedRiskQualified: Stage10Output = {
  stage: "coaching_generation",
  coaching_required: true,
  confidence: 0.78,
  observability_limited: false,
  source_trace: { primary_stage9_category: "speed_management", primary_stage9_subcategory: null, stage9_confidence: 0.82 },
  kb_entries_used: [],
  rider_facing_summary:
    "Your entry speed was too high for the available traction. For the next attempt, reduce entry speed by 30% from the crash speed. Rebuild from there — once you have completed two clean low-speed runs confirming grip on the upper section, you can begin to increase entry speed incrementally. Only add momentum after those foundations are confirmed.",
  technical_coach_note:
    "The crash resulted from overcommitment — entry speed exceeded what the loose rocky surface could support. Reduce entry speed, establish body position, confirm traction consistently, then add speed incrementally. Never increase speed until two consecutive clean runs at the lower speed confirm traction is reliable.",
  primary_focus: {
    category: "speed_management",
    subcategory: null,
    title: "Reduce entry speed — rebuild incrementally",
    why_it_matters: "Entry speed exceeded traction ceiling — front wheel deflection was direct result of overcommitment",
    what_to_change:
      "Reduce entry speed by 30% on next attempt. Only increase speed after two consecutive clean completions confirm traction is reliable — never add momentum before those checkpoints.",
    key_cues: ["30% speed reduction", "confirm traction first", "two clean runs before adding speed"],
  },
  secondary_focuses: [],
  scenario_explanation: "Overcommitment caused the crash. Speed management is the priority. Any future speed increase must be gated behind confirmed traction and clean technique.",
  next_attempt_plan: [
    "Reduce entry speed by 30% from the crash attempt",
    "Confirm traction in the first two metres of the descent before committing",
    "Only increase speed after two consecutive clean completions at reduced speed",
  ],
  drills: [],
  uncertainty_statement: null,
  debug: DBG,
};

// Fixture 4: observability_overreach — POV camera (body not visible, body_position_max_confidence=0.25,
// overall_confidence=0.50). Stage 10 sets observability_limited=false (incorrect) and makes specific
// body position coaching recommendations as if the rider's posture was clearly observed.
// The coaching advice itself is technically safe (correct body position principles); the problem is
// purely epistemic — Stage 10 claims confidence it cannot have from this camera angle.
// Expected: safe=true (no crash, no contradiction), observability_overreach=true, confidence_adjustment ≤ 0.6.
const stage10ObservabilityOverreach: Stage10Output = {
  stage: "coaching_generation",
  coaching_required: true,
  confidence: 0.82,
  observability_limited: false, // INCORRECT — Stage 2: body_position="not_visible", overall_confidence=0.50
  source_trace: { primary_stage9_category: "body_position", primary_stage9_subcategory: null, stage9_confidence: 0.45 },
  kb_entries_used: [],
  rider_facing_summary:
    "Good clean run through this section. To keep developing, sharpen your attack position — get your elbows higher and wider, lift your head to scan further ahead, and make sure you're in a standing attack position through the technical parts. These body position refinements will improve your control and absorption on every section.",
  technical_coach_note:
    "Attack position refinement is the identified priority. Elbow height and width, head angle, and riding stance are the key variables. Improving elbow position will increase terrain absorption; head position improvement will extend vision arc; standing position will lower centre of gravity and improve balance.",
  primary_focus: {
    category: "body_position",
    subcategory: null,
    title: "Attack position — elbows, head, and stance",
    why_it_matters: "Suboptimal elbow position limits absorption; dropped head limits vision; seated position reduces control",
    what_to_change:
      "Focus on three attack position elements: elbows up and out for better absorption, head up scanning 10+ metres ahead, and riding standing rather than seated through technical sections.",
    key_cues: ["elbows up and out", "head scanning ahead", "standing attack position"],
  },
  secondary_focuses: [],
  scenario_explanation: "Body position refinement coaching based on observed riding technique. Attack position fundamentals improve performance across all terrain types.",
  next_attempt_plan: [
    "Set attack position before entering any technical section: elbows up, head up, standing",
    "Practise focusing your gaze well ahead of the front wheel on approach",
    "Check posture on every run — standing attack position should become automatic",
  ],
  drills: [],
  uncertainty_statement: null, // NOTE: should flag uncertainty given observability limits — this is the overreach
  debug: DBG,
};

// ————————————————————————————————————————————
// Fixture definitions
// ————————————————————————————————————————————

interface Fixture {
  name: string;
  description: string;
  stage2: Stage2Output;
  stage6: Stage6Output;
  stage7: Stage7Output | null;
  stage8: Stage8Output;
  stage9: Stage9Output;
  stage10: Stage10Output;
  check: (output: Stage11Output) => boolean;
  expectedDescription: string;
}

const fixtures: Fixture[] = [
  {
    name: "contradiction",
    description: "Whisky throttle crash — coaching says 'be more aggressive on throttle'",
    stage2: stage2Good,
    stage6: stage6WhiskyThrottle,
    stage7: stage7SeriousCrash,
    stage8: stage8WhiskyThrottle,
    stage9: stage9WhiskyThrottle,
    stage10: stage10Contradiction,
    check: (o) => !o.safe && o.flags.contradiction,
    expectedDescription: "safe=false, contradiction=true",
  },
  {
    name: "speed_risk_unqualified",
    description: "OTB from excessive speed — coaching recommends 'carry more speed' with no qualifying constraints",
    stage2: stage2Good,
    stage6: stage6ExcessiveSpeed,
    stage7: stage7ModerateCrash,
    stage8: stage8ExcessiveSpeed,
    stage9: stage9ExcessiveSpeed,
    stage10: stage10SpeedRiskUnqualified,
    check: (o) => !o.safe && o.flags.speed_risk,
    expectedDescription: "safe=false, speed_risk=true",
  },
  {
    name: "speed_risk_qualified",
    description: "Same crash as fixture 2 — coaching recommends speed reduction with clear qualifying constraints",
    stage2: stage2Good,
    stage6: stage6ExcessiveSpeed,
    stage7: stage7ModerateCrash,
    stage8: stage8ExcessiveSpeed,
    stage9: stage9ExcessiveSpeed,
    stage10: stage10SpeedRiskQualified,
    check: (o) => o.safe && !o.flags.contradiction && !o.flags.speed_risk,
    expectedDescription: "safe=true, no hard flags — correctly qualified coaching clears the safety gate",
  },
  {
    name: "observability_overreach",
    description: "POV camera (body not visible, conf 0.25) — coaching claims precise elbow angles and cm measurements",
    stage2: stage2LowBodyConf,
    stage6: stage6NoCrash,
    stage7: null,
    stage8: stage8NoCrash,
    stage9: stage9BodyPosition,
    stage10: stage10ObservabilityOverreach,
    check: (o) =>
      o.safe &&
      o.flags.observability_overreach &&
      o.confidence_adjustment !== null &&
      o.confidence_adjustment <= 0.6,
    expectedDescription: "safe=true, observability_overreach=true, confidence_adjustment ≤ 0.6",
  },
];

// ————————————————————————————————————————————
// Runner
// ————————————————————————————————————————————

async function main() {
  const modelArg = process.argv[2] ?? "openai";

  if (!["openai", "gemini", "anthropic"].includes(modelArg)) {
    console.error(`Unknown model: ${modelArg}. Use openai, gemini, or anthropic.`);
    process.exit(1);
  }

  if (modelArg !== "openai") {
    console.warn(`Warning: only 'openai' provider is currently implemented. Running with GPT-4o.\n`);
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY not found in .env.local");
    process.exit(1);
  }

  const model = new GPT4oProvider();

  console.log("=== RideMind Stage 11 — Fail-Path Fixture Test ===\n");
  console.log(`Model: ${model.name}`);
  console.log(`Fixtures: ${fixtures.length}\n`);
  console.log("Stage 11 reasons from structured JSON only — no video required.\n");
  console.log("─".repeat(60) + "\n");

  const results: { name: string; passed: boolean; actual?: Stage11Output; error?: string }[] = [];

  for (const fixture of fixtures) {
    console.log(`[${fixture.name}]`);
    console.log(`  Scenario: ${fixture.description}`);
    console.log(`  Expected: ${fixture.expectedDescription}`);

    try {
      const output = await runStage11(
        model,
        fixture.stage2,
        fixture.stage6,
        fixture.stage7,
        fixture.stage8,
        fixture.stage9,
        fixture.stage10
      );

      const passed = fixture.check(output);

      const flagSummary = Object.entries(output.flags)
        .filter(([, v]) => v)
        .map(([k]) => k)
        .join(", ") || "none";

      console.log(
        `  Actual:   safe=${output.safe}, flags=[${flagSummary}], confidence_adjustment=${output.confidence_adjustment ?? "null"}`
      );
      console.log(`  Result:   ${passed ? "PASS ✓" : "FAIL ✗"}`);

      if (!passed) {
        console.log(`  Issues from model:`);
        for (const issue of output.issues) {
          console.log(`    - ${issue}`);
        }
        if (output.debug.reasoning) {
          console.log(`  Model reasoning: ${output.debug.reasoning.slice(0, 200)}...`);
        }
      }

      results.push({ name: fixture.name, passed, actual: output });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.log(`  Result:   ERROR — ${msg}`);
      results.push({ name: fixture.name, passed: false, error: msg });
    }

    console.log();
  }

  // Summary
  console.log("─".repeat(60));
  console.log("\n=== Summary ===\n");

  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;

  for (const r of results) {
    const status = r.passed ? "PASS" : "FAIL";
    console.log(`  ${status.padEnd(4)}  ${r.name}`);
  }

  console.log(`\n${passed}/${results.length} fixtures passed`);

  if (failed > 0) {
    console.log(`\n${failed} fixture(s) failed — see output above for details.`);
    process.exit(1);
  } else {
    console.log("\nAll fixtures passed.");
    process.exit(0);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err instanceof Error ? err.message : String(err));
  process.exit(1);
});
