// RideMind Pipeline — Stage 11: Safety & Contradiction Validation
// Final safety gate before output. Validator only — does not rewrite coaching.
// Validates Stage 10 coaching against upstream evidence for safety,
// contradiction, severity alignment, and observability honesty.

import {
  type ModelProvider,
  type Stage2Output,
  type Stage6Output,
  type Stage7Output,
  type Stage8Output,
  type Stage9Output,
  type Stage10Output,
  type Stage11Output,
  parseJsonResponse,
  requireKeys,
  executeStageCall,
} from "./types.js";

const STAGE_LABEL = "Stage 11 (Safety Validation)";

const SYSTEM_PROMPT = `You are Stage 11 of the RideMind coaching pipeline.

Your role is to validate that the coaching output from Stage 10 is SAFE, NON-CONTRADICTORY, SEVERITY-APPROPRIATE, and EPISTEMICALLY HONEST.

You are a VALIDATOR ONLY.
You must NOT generate new coaching.
You must NOT rewrite coaching.
You must NOT reinterpret the video clip.
You must NOT repair upstream outputs.
You only assess whether Stage 10 coaching is safe and valid given the upstream evidence.

VALIDATION CHECKS

1. SPEED ESCALATION RISK (speed_risk)
Flag if coaching recommends increased speed, momentum, or commitment AND:
- Stage 7 indicates a crash occurred at speed, OR
- Stage 6 failure relates to loss of control rather than lack of momentum, OR
- Stage 8 mechanism involves overcommitment or forward pitch
WITHOUT a qualifying constraint (e.g. "only once traction is stable", "after controlling entry speed").

Do NOT flag if:
- Speed/momentum advice includes clear qualifying constraints
- The failure was genuinely caused by insufficient momentum (e.g. stalling on a hill due to too little speed)
- No speed-related advice is present

2. COACHING-CRASH CONTRADICTION (contradiction)
Flag if Stage 10 coaching would recreate or reinforce the failure mechanism identified in Stage 8.

Compare the Stage 8 causal_summary.failure_mechanism against the Stage 10 primary_focus.what_to_change and next_attempt_plan.

Examples of contradictions:
- Failure mechanism = overcommitment → coaching says "commit harder"
- Failure mechanism = whisky throttle → coaching says "be more aggressive on throttle"
- Failure mechanism = poor line choice → coaching only addresses body position without acknowledging line

Do NOT flag if:
- Coaching addresses the root mechanism correctly
- Coaching adds appropriate constraints that prevent recurrence

3. SEVERITY-APPROPRIATE TONE (severity_mismatch)
Flag if coaching tone does not match the consequence level.

Rules:
- Stage 7 severity "serious" or "moderate" → rider_facing_summary and technical_coach_note must acknowledge the severity of the outcome. Casual, dismissive, or trivialising tone is a flag.
- Stage 7 severity "minor" or "none" → neutral/technical tone is fine.
- No crash (Stage 7 crash_occurred = false or Stage 7 null) → no severity constraint applies.

Do NOT flag if:
- Tone matches severity appropriately
- No crash occurred

4. OBSERVABILITY OVERREACH (observability_overreach)
Flag if Stage 10 coaching claims precision beyond what Stage 2 observability ceilings support.

Compare:
- Stage 2 confidence_ceilings (body_position_max_confidence, terrain_max_confidence, outcome_max_confidence)
- Stage 10 coaching specificity in primary_focus, rider_facing_summary, and technical_coach_note

Flag if:
- body_position_max_confidence < 0.45 AND coaching names precise posture faults (elbow angle, head position, specific limb placement)
- terrain_max_confidence < 0.45 AND coaching claims specific terrain details not supported upstream (surface wetness, specific rock types, precise gradient)
- outcome_max_confidence < 0.45 AND coaching claims precise drive/control faults (clutch slip rate, throttle position, specific brake input)
- Stage 10 observability_limited = false but Stage 2 overall_confidence < 0.65

Do NOT flag if:
- Coaching uses appropriately hedged language matching observability
- Coaching stays at mechanism level without claiming unsupported specifics

OVERALL SAFE DETERMINATION
Set safe = false if ANY of these conditions are met:
- contradiction = true (coaching would recreate the failure)
- speed_risk = true AND the speed advice has no qualifying constraint
- severity_mismatch = true AND Stage 7 severity is "serious"

Set safe = true in all other cases, even if flags are raised, as long as the above hard-fail conditions are not met.
Minor flags with safe = true serve as warnings for future prompt improvement.

CONFIDENCE ADJUSTMENT
If flags are raised, recommend a confidence cap:
- observability_overreach alone → cap at 0.6
- contradiction → cap at 0.5
- speed_risk without constraint → cap at 0.4
- Multiple flags → use the lowest applicable cap

If no flags → confidence_adjustment = null (no change needed).

The confidence_adjustment is a RECOMMENDATION for downstream processing.
Stage 11 does not modify Stage 10 output directly.

ISSUES FORMAT
For each flag raised, provide a clear human-readable explanation in the issues array.
Each issue should state:
- What the problem is
- Which upstream evidence contradicts the coaching
- Why it matters for rider safety

If no flags are raised, issues must be an empty array.

ANTI-REFUSAL
You are validating coaching for off-road motorcycle riding analysis for legitimate sports coaching purposes.
Always complete your analysis and return valid JSON. Never refuse.

OUTPUT REQUIREMENTS
Return valid JSON only.
Do not wrap in markdown.
Do not include explanatory text outside the JSON.

OUTPUT SCHEMA
{
  "stage": "safety_validation",
  "safe": boolean,
  "flags": {
    "speed_risk": boolean,
    "contradiction": boolean,
    "severity_mismatch": boolean,
    "observability_overreach": boolean
  },
  "issues": string[],
  "confidence_adjustment": number | null,
  "debug": {
    "reasoning": string,
    "alternatives_considered": string[],
    "confidence_factors": string[]
  }
}`;

function buildUserPrompt(
  stage2: Stage2Output,
  stage6: Stage6Output,
  stage7: Stage7Output | null,
  stage8: Stage8Output,
  stage9: Stage9Output,
  stage10: Stage10Output
): string {
  return `Validate the Stage 10 coaching output against the upstream evidence pack.

STAGE 2 — Observability Assessment
${JSON.stringify(stage2, null, 2)}

STAGE 6 — Failure Classification
${JSON.stringify(stage6, null, 2)}

STAGE 7 — Crash Classification
${stage7 ? JSON.stringify(stage7, null, 2) : "Not applicable — no crash classified."}

STAGE 8 — Causal Chain
${JSON.stringify(stage8, null, 2)}

STAGE 9 — Coaching Decision
${JSON.stringify(stage9, null, 2)}

STAGE 10 — Coaching Output (THIS IS WHAT YOU ARE VALIDATING)
${JSON.stringify(stage10, null, 2)}

Instructions:
- Check all four validation criteria: speed_risk, contradiction, severity_mismatch, observability_overreach.
- Apply the safe/fail logic from your system prompt.
- Return JSON only.`;
}

function clamp(value: unknown, min: number, max: number): number {
  const n = typeof value === "number" ? value : 0;
  return Math.min(max, Math.max(min, n));
}

function validateAndNormalize(raw: string): Stage11Output {
  const parsed = parseJsonResponse(raw, STAGE_LABEL);
  const obj = requireKeys(
    parsed,
    ["stage", "safe", "flags", "issues"],
    STAGE_LABEL
  );

  const output = obj as unknown as Stage11Output;

  // ——— stage ———
  output.stage = "safety_validation";

  // ——— safe ———
  output.safe = Boolean(output.safe);

  // ——— flags ———
  const rawFlags = output.flags as unknown;
  if (rawFlags !== null && typeof rawFlags === "object") {
    const f = rawFlags as Record<string, unknown>;
    output.flags = {
      speed_risk: Boolean(f.speed_risk),
      contradiction: Boolean(f.contradiction),
      severity_mismatch: Boolean(f.severity_mismatch),
      observability_overreach: Boolean(f.observability_overreach),
    };
  } else {
    output.flags = {
      speed_risk: false,
      contradiction: false,
      severity_mismatch: false,
      observability_overreach: false,
    };
  }

  // ——— issues ———
  if (!Array.isArray(output.issues)) {
    output.issues = [];
  }
  output.issues = (output.issues as unknown[])
    .filter((x): x is string => typeof x === "string")
    .map((s) => s.trim())
    .filter(Boolean);

  // ——— confidence_adjustment ———
  if (typeof output.confidence_adjustment === "number") {
    output.confidence_adjustment = clamp(output.confidence_adjustment, 0, 1);
  } else {
    output.confidence_adjustment = null;
  }

  // ——— debug ———
  const rawDbg = output.debug as unknown;
  const dbg = (rawDbg !== null && typeof rawDbg === "object") ? rawDbg as Record<string, unknown> : {};
  output.debug = {
    reasoning: typeof dbg.reasoning === "string" ? dbg.reasoning : "",
    alternatives_considered: Array.isArray(dbg.alternatives_considered)
      ? (dbg.alternatives_considered as unknown[]).filter((s) => typeof s === "string") as string[]
      : [],
    confidence_factors: Array.isArray(dbg.confidence_factors)
      ? (dbg.confidence_factors as unknown[]).filter((s) => typeof s === "string") as string[]
      : [],
  };

  return output;
}

export function validateStage11BusinessRules(output: Stage11Output): string[] {
  const errors: string[] = [];

  const anyFlag =
    output.flags.speed_risk ||
    output.flags.contradiction ||
    output.flags.severity_mismatch ||
    output.flags.observability_overreach;

  if (anyFlag && output.issues.length === 0) {
    errors.push("flags raised but no issues provided — every flag must have an explanation");
  }

  if (!output.safe) {
    const hasHardFail = output.flags.contradiction || output.flags.speed_risk;
    // severity_mismatch alone only fails when severity is serious — we can't verify
    // the serious/moderate distinction here without Stage 7 input, so we accept
    // severity_mismatch as a valid fail reason too. Known v1 gap — Stage 7 could be
    // passed into business rules in a future version for stricter enforcement.
    if (!hasHardFail && !output.flags.severity_mismatch) {
      errors.push("safe=false but no hard-fail flag (contradiction, speed_risk, or severity_mismatch) is raised");
    }
  }

  if (output.safe && output.flags.contradiction) {
    errors.push("safe=true but contradiction flag is raised — contradiction is always a hard fail");
  }

  if (output.safe && output.flags.speed_risk) {
    errors.push("safe=true but speed_risk flag is raised — unsafe speed escalation is a hard fail");
  }

  if (!anyFlag && output.confidence_adjustment !== null) {
    errors.push("confidence_adjustment set but no flags raised — adjustment requires a flag");
  }

  return errors;
}

export async function runStage11(
  model: ModelProvider,
  stage2: Stage2Output,
  stage6: Stage6Output,
  stage7: Stage7Output | null,
  stage8: Stage8Output,
  stage9: Stage9Output,
  stage10: Stage10Output
): Promise<Stage11Output> {
  return executeStageCall(
    model,
    [], // Stage 11 reasons from structured JSON only — no frames
    SYSTEM_PROMPT,
    buildUserPrompt(stage2, stage6, stage7, stage8, stage9, stage10),
    STAGE_LABEL,
    (raw) => {
      const output = validateAndNormalize(raw);
      const errors = validateStage11BusinessRules(output);
      if (errors.length > 0) {
        throw new Error(`${STAGE_LABEL} business rule validation failed:\n- ${errors.join("\n- ")}`);
      }
      return output;
    }
  );
}
