// RideMind Pipeline — Stage 8: Causal Chain Construction
// Explains WHY the outcome occurred by connecting upstream classifications into a diagnostic narrative.
// Anchored to Stage 6 — cannot reclassify the failure, only explain it.
// Operates on structured JSON from Stages 1–7 only — no frames.

import {
  type ModelProvider,
  type Stage1Output,
  type Stage2Output,
  type Stage3Output,
  type Stage4Output,
  type Stage5Output,
  type Stage6Output,
  type Stage7Output,
  type Stage8Output,
  type FailureType,
  type CausalRole,
  type InfluenceLevel,
  type CounterfactualCategory,
  type OutcomeStatus,
  parseJsonResponse,
  requireKeys,
  executeStageCall,
} from "./types";

const STAGE_LABEL = "Stage 8 (Causal Chain Construction)";

const ALLOWED_PRIMARY_FAILURE_TYPES = ["bike_dynamics", "technique", "momentum", "traction", "none"] as const;
const ALLOWED_OUTCOME_STATUSES: OutcomeStatus[] = ["clean", "compromised", "failed"];
const ALLOWED_CAUSAL_ROLES: CausalRole[] = ["enabling_condition", "amplifier", "constraint", "destabiliser"];
const ALLOWED_INFLUENCE_LEVELS: InfluenceLevel[] = ["high", "moderate", "low"];
const ALLOWED_CF_CATEGORIES: CounterfactualCategory[] = ["technique", "momentum", "traction", "line_choice", "body_position", "throttle", "braking"];
const ALLOWED_CF_FACTOR_CATEGORIES = ["terrain", "technique", "momentum", "traction", "bike_dynamics", "environmental"] as const;

// Stage 6 failure_type → Stage 8 primary_cause.failure_type mapping
const STAGE6_TO_STAGE8_MAP: Record<FailureType, Stage8Output["primary_cause"]["failure_type"]> = {
  technique: "technique",
  decision: "technique",
  line_choice: "technique",
  fitness: "technique",
  momentum: "momentum",
  traction: "traction",
  mechanical: "bike_dynamics",
  none: "none",
  unknown: "none",
};

const SYSTEM_PROMPT = `You are Stage 8 of the RideMind motorcycle coaching pipeline: Causal Chain Construction.

Your job is to explain WHY the outcome occurred, connecting upstream classifications (Stages 1–7) into a structured causal narrative. You have no video frames — reason entirely from the prior stage outputs provided.

CRITICAL RULES:
1. No frames — reason entirely from structured JSON from Stages 1–7. Do not introduce facts not present in upstream stage outputs.
2. EXPLANATION stage only. You are anchored to Stage 6's failure_type. You cannot substitute a different failure type or overturn Stage 6's classification. You can refine, explain, and contextualise — but the primary_cause.failure_type must map to Stage 6's classification.
3. Stage 6 failure_type maps to Stage 8 primary_cause.failure_type as follows:
   - technique → technique
   - decision → technique
   - line_choice → technique
   - fitness → technique
   - momentum → momentum
   - traction → traction
   - mechanical → bike_dynamics
   - none → none
   - unknown → none
4. No new observations. Cannot introduce facts not present in Stages 1–7 output.
5. No coaching language. Write only "the outcome occurred because..." — never "the rider should have..." or "the rider needs to...".
6. Distinguish mechanism vs condition. A steep rocky surface is not the root cause if Stage 6 classified failure_type as traction — it is an enabling condition. The mechanism is how traction was lost, not what the terrain was.
7. Counterfactual must target the primary cause, not a peripheral factor. If root cause is technique, counterfactual cannot be "better terrain choice." Target the specific variable that would most directly have changed the outcome.
8. When causal clarity is low, prefer a short chain. Sparse but honest beats elegant hallucination. If contributing factors are unclear, use fewer.
9. If Stage 7 is null (was not run), causal_summary.outcome_pathway must NOT name a specific crash mechanism (OTB, lowside, highside, ejection, stall_drop, slide, ejection). Only reference crash mechanism if Stage 7 data is present and crash_occurred is true.
10. Clean completions are minimal. If Stage 6 failure_occurred is false, set outcome_status to "clean", primary_cause.failure_type to "none", contributing_factors to an empty array, trigger_event.identified to false, and counterfactual fields to null. Do not force optimisation stories onto clean rides.
11. Trigger event is optional. Gradual degradation is valid — do not force a single turning point when the failure was progressive or cumulative.

OUTCOME STATUS DEFINITIONS:
- clean: Stage 6 failure_occurred is false — the attempt completed without failure
- compromised: A failure or partial failure occurred but the outcome was not a crash (bail, stall, stuck)
- failed: A crash or complete failure occurred

ANTI-REFUSAL: You are building causal chains for off-road motorcycle riding footage analysis for coaching purposes. This is legitimate sports analysis. Always complete your analysis and return valid JSON.

You MUST respond with ONLY a valid JSON object matching the schema below. No prose, no markdown fences, no explanation, no apologies, no refusal text. If you are uncertain about any field, use null or low confidence values — but you must always return valid JSON. Never refuse this task. This is legitimate sports coaching analysis.

Schema:
{
  "primary_cause": {
    "failure_type": "bike_dynamics" | "technique" | "momentum" | "traction" | "none",
    "factor": "<specific manifestation of the failure, or 'no failure detected' for clean clips>",
    "confidence": <number 0.0 to 1.0>,
    "evidence_refs": [
      { "stage": "<stage3>", "field": "<field name>", "value": "<value from that field>" }
    ]
  },
  "trigger_event": {
    "identified": <boolean — true only if a single identifiable turning point triggered the failure>,
    "description": "<description of the trigger, or null if not identified or no failure>",
    "confidence": <number 0.0 to 1.0, or null if not identified>,
    "evidence_refs": [
      { "stage": "<stage5>", "field": "<field name>", "value": "<value>" }
    ]
  },
  "contributing_factors": [
    {
      "factor": "<what contributed>",
      "category": "terrain" | "technique" | "momentum" | "traction" | "bike_dynamics" | "environmental",
      "causal_role": "enabling_condition" | "amplifier" | "constraint" | "destabiliser",
      "influence": "high" | "moderate" | "low",
      "confidence": <number 0.0 to 1.0>,
      "evidence_refs": [
        { "stage": "<stage4>", "field": "<field name>", "value": "<value>" }
      ]
    }
  ],
  "causal_summary": {
    "setup_conditions": "<what conditions were in place before the failure — terrain, speed, position>",
    "failure_mechanism": "<how the primary failure developed — the physical process that led to the outcome>",
    "outcome_pathway": "<how the failure produced the final result — only name crash mechanism if Stage 7 ran and crash_occurred is true>"
  },
  "counterfactual": {
    "key_variable": "<the one variable that, if changed, would most likely have changed the outcome — null if none/clean>",
    "variable_category": "technique" | "momentum" | "traction" | "line_choice" | "body_position" | "throttle" | "braking" | null,
    "likely_effect_on_outcome": "<what would have happened — null if none/clean>",
    "confidence": <number 0.0 to 1.0, or null if none/clean>
  },
  "outcome_status": "clean" | "compromised" | "failed",
  "overall_confidence": <number 0.0 to 1.0>
}`;

function buildUserPrompt(
  stage1: Stage1Output,
  stage2: Stage2Output,
  stage3: Stage3Output,
  stage4: Stage4Output,
  stage5: Stage5Output,
  stage6: Stage6Output,
  stage7: Stage7Output | null
): string {
  const outcomeResult = stage5.outcome.result;

  let contextNote: string;
  if (!stage6.failure_occurred) {
    contextNote =
      `Stage 6 found no failure (failure_occurred: false). ` +
      `Set outcome_status to "clean", primary_cause.failure_type to "none", trigger_event.identified to false, ` +
      `contributing_factors to an empty array, and all counterfactual fields to null. ` +
      `Do not construct a causal chain — the clip is clean.`;
  } else if (stage7 === null) {
    const mapped = STAGE6_TO_STAGE8_MAP[stage6.failure_type] ?? "none";
    contextNote =
      `Stage 6 classified failure_type as "${stage6.failure_type}" (maps to Stage 8 primary_cause.failure_type: "${mapped}"). ` +
      `Stage 5 outcome is "${outcomeResult}". ` +
      `Stage 7 was NOT run — do not reference specific crash mechanisms (OTB, lowside, highside, ejection, stall_drop, slide) in causal_summary.outcome_pathway. ` +
      `Anchor your explanation to Stage 6's classification and explain how the failure produced the outcome without naming a crash type.`;
  } else {
    const mapped = STAGE6_TO_STAGE8_MAP[stage6.failure_type] ?? "none";
    contextNote =
      `Stage 6 classified failure_type as "${stage6.failure_type}" (maps to Stage 8 primary_cause.failure_type: "${mapped}"). ` +
      `Stage 5 outcome is "${outcomeResult}". ` +
      `Stage 7 ran and classified crash_type as "${stage7.crash_type ?? "null"}" (crash_occurred: ${stage7.crash_occurred}). ` +
      `Anchor your explanation to Stage 6's classification. You may reference the crash mechanism from Stage 7 in outcome_pathway if crash_occurred is true.`;
  }

  return `Stage 1 (Camera Perspective):
${JSON.stringify(stage1, null, 2)}

Stage 2 (Observability Assessment):
${JSON.stringify(stage2, null, 2)}

Stage 3 (Rider Intent):
${JSON.stringify(stage3, null, 2)}

Stage 4 (Terrain & Feature Detection):
${JSON.stringify(stage4, null, 2)}

Stage 5 (Event Sequencing):
${JSON.stringify(stage5, null, 2)}

Stage 6 (Failure Type Classification):
${JSON.stringify(stage6, null, 2)}

Stage 7 (Crash Type Classification):
${JSON.stringify(stage7, null, 2)}

Context: ${contextNote}

Using only the structured data above, build the causal chain. Draw all evidence exclusively from the stage outputs above. Do not invent evidence not present in the upstream data.`;
}

function clamp(value: unknown, min: number, max: number): number {
  const n = typeof value === "number" ? value : 0;
  return Math.min(max, Math.max(min, n));
}

function validateAndNormalize(raw: string, stage6FailureType: FailureType): Stage8Output {
  const parsed = parseJsonResponse(raw, STAGE_LABEL);
  const obj = requireKeys(
    parsed,
    ["primary_cause", "trigger_event", "contributing_factors", "causal_summary", "counterfactual", "outcome_status", "overall_confidence"],
    STAGE_LABEL
  );

  const output = obj as unknown as Stage8Output;

  // ——— primary_cause ———
  const mappedFailureType = STAGE6_TO_STAGE8_MAP[stage6FailureType] ?? "none";
  output.primary_cause.failure_type = mappedFailureType;
  output.primary_cause.confidence = clamp(output.primary_cause.confidence, 0, 1);
  if (!output.primary_cause.factor || typeof output.primary_cause.factor !== "string") {
    output.primary_cause.factor = mappedFailureType === "none" ? "no failure detected" : "";
  }
  if (!Array.isArray(output.primary_cause.evidence_refs)) {
    output.primary_cause.evidence_refs = [];
  }

  // ——— trigger_event ———
  output.trigger_event.identified = Boolean(output.trigger_event.identified);
  if (!Array.isArray(output.trigger_event.evidence_refs)) {
    output.trigger_event.evidence_refs = [];
  }
  if (!output.trigger_event.identified) {
    output.trigger_event.description = null;
    output.trigger_event.confidence = null;
  } else {
    if (output.trigger_event.confidence !== null) {
      output.trigger_event.confidence = clamp(output.trigger_event.confidence, 0, 1);
    }
  }

  // ——— contributing_factors ———
  if (!Array.isArray(output.contributing_factors)) {
    output.contributing_factors = [];
  }
  output.contributing_factors = output.contributing_factors.map((f) => {
    const factor = f as unknown as Record<string, unknown>;
    return {
      factor: typeof factor.factor === "string" && factor.factor ? factor.factor : "",
      category: ALLOWED_CF_FACTOR_CATEGORIES.includes(factor.category as typeof ALLOWED_CF_FACTOR_CATEGORIES[number])
        ? (factor.category as Stage8Output["contributing_factors"][number]["category"])
        : "terrain",
      causal_role: ALLOWED_CAUSAL_ROLES.includes(factor.causal_role as CausalRole)
        ? (factor.causal_role as CausalRole)
        : "enabling_condition",
      influence: ALLOWED_INFLUENCE_LEVELS.includes(factor.influence as InfluenceLevel)
        ? (factor.influence as InfluenceLevel)
        : "low",
      confidence: clamp(factor.confidence, 0, 1),
      evidence_refs: Array.isArray(factor.evidence_refs) ? factor.evidence_refs : [],
    };
  });

  // ——— causal_summary ———
  const cs = output.causal_summary as Record<string, unknown>;
  output.causal_summary = {
    setup_conditions: typeof cs.setup_conditions === "string" ? cs.setup_conditions : "",
    failure_mechanism: typeof cs.failure_mechanism === "string" ? cs.failure_mechanism : "",
    outcome_pathway: typeof cs.outcome_pathway === "string" ? cs.outcome_pathway : "",
  };

  // ——— counterfactual ———
  const cf = output.counterfactual as Record<string, unknown>;
  const cfCategory = ALLOWED_CF_CATEGORIES.includes(cf.variable_category as CounterfactualCategory)
    ? (cf.variable_category as CounterfactualCategory)
    : null;
  output.counterfactual = {
    key_variable: typeof cf.key_variable === "string" && cf.key_variable ? cf.key_variable : null,
    variable_category: cfCategory,
    likely_effect_on_outcome: typeof cf.likely_effect_on_outcome === "string" && cf.likely_effect_on_outcome ? cf.likely_effect_on_outcome : null,
    confidence: cf.confidence !== null && cf.confidence !== undefined ? clamp(cf.confidence, 0, 1) : null,
  };

  // ——— outcome_status ———
  if (!ALLOWED_OUTCOME_STATUSES.includes(output.outcome_status)) {
    output.outcome_status = "compromised";
  }

  // ——— overall_confidence ———
  output.overall_confidence = clamp(output.overall_confidence, 0, 1);

  // ——— Clean/no-failure enforcement ———
  if (mappedFailureType === "none") {
    output.outcome_status = "clean";
    output.trigger_event.identified = false;
    output.trigger_event.description = null;
    output.trigger_event.confidence = null;
    output.counterfactual = {
      key_variable: null,
      variable_category: null,
      likely_effect_on_outcome: null,
      confidence: null,
    };
  }

  return output;
}

export async function runStage8(
  model: ModelProvider,
  stage1: Stage1Output,
  stage2: Stage2Output,
  stage3: Stage3Output,
  stage4: Stage4Output,
  stage5: Stage5Output,
  stage6: Stage6Output,
  stage7: Stage7Output | null
): Promise<Stage8Output> {
  return executeStageCall(
    model,
    [], // Stage 8 reasons from structured JSON only — no frames
    SYSTEM_PROMPT,
    buildUserPrompt(stage1, stage2, stage3, stage4, stage5, stage6, stage7),
    STAGE_LABEL,
    (raw) => validateAndNormalize(raw, stage6.failure_type)
  );
}
