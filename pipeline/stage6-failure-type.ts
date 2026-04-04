// RideMind Pipeline — Stage 6: Failure Type Classification
// Classifies what failed and why, separating symptoms from root cause.
// Operates on structured JSON from Stages 1–5 only — no frames.

import {
  type ModelProvider,
  type Stage1Output,
  type Stage2Output,
  type Stage3Output,
  type Stage4Output,
  type Stage5Output,
  type Stage6Output,
  type FailureType,
  parseJsonResponse,
  requireKeys,
  executeStageCall,
} from "./types.js";

const STAGE_LABEL = "Stage 6 (Failure Type Classification)";

const ALLOWED_FAILURE_TYPES: FailureType[] = [
  "technique",
  "decision",
  "momentum",
  "traction",
  "mechanical",
  "line_choice",
  "fitness",
  "none",
  "unknown",
];

const SYSTEM_PROMPT = `You are Stage 6 of the RideMind motorcycle coaching pipeline: Failure Type Classification.

Your job is to classify what failed and why, using only the structured analysis from Stages 1–5. You have no video frames — reason entirely from the prior stage outputs provided.

CRITICAL RULES:
1. Your job is to classify what failed and why. Separate symptoms (what was visible) from root cause (why it happened).
2. observed_symptoms must come from Stage 5 segment observations and state transitions only. Do not invent symptoms not present in the upstream data.
3. likely_root_cause must be a distinct claim from the symptoms. "Rider fell" is a symptom. "Weight distribution too far back for the jump transition" is a root cause. Do not repeat symptoms as root causes.
4. Do not default everything to "technique". Consider all failure types: traction loss on the surface, insufficient momentum for the gradient, poor line choice through the feature, decision error in commitment, mechanical limitation. Use the one with strongest evidence.
5. If evidence is insufficient to determine root cause, use failure_type "unknown" with an honest explanation. A tentative classification with low confidence is better than a fabricated confident one.
6. For clips where Stage 5 outcome is "clean" or no failure occurred, set failure_occurred to false, failure_type to "none", and provide a no_failure_note explaining what went well or what the closest risk was.
7. contributing_factors must distinguish primary from contributing from possible. Most failures have one primary factor and 0-2 contributing factors. Do not over-enumerate.
8. FAILURE HIERARCHY: When determining the primary failure_type, prioritise the most direct physical mechanism of failure:
   - If the failure occurs during an airborne phase (jump, drop) and involves bike attitude change (rotation, pitch, tilt), the primary cause is almost certainly technique (body position, throttle control, takeoff execution) — not terrain or traction, since tyre-terrain interaction is not a factor while airborne.
   - If the failure involves loss of drive or forward progress on terrain, consider momentum first.
   - If the failure involves visible wheel slip, sliding, or loss of grip, consider traction first.
   - Do not assign terrain-related causes as primary if the failure clearly originates from rider input or bike behaviour during execution. Terrain may be a contributing factor but is rarely the primary cause when the failure mechanism is airborne instability.

FAILURE TYPE DEFINITIONS:
- technique: The rider had the right intent and opportunity but executed incorrectly (wrong body position, wrong throttle application, wrong braking point)
- decision: The rider made a wrong choice before or during the attempt (wrong line, wrong speed, wrong commitment, wrong timing)
- momentum: The rider ran out of forward energy needed to complete the section (too slow for the gradient, stalled, speed management error)
- traction: Surface conditions caused loss of grip that the rider could not manage (unexpected slip, surface change, wet roots)
- mechanical: Bike behaviour contributed independently of rider input (suspension, power delivery, tyre failure)
- line_choice: The path selected through the terrain was suboptimal or wrong (missed the good line, wrong entry angle)
- fitness: Physical limitation affected execution (arm pump, fatigue, strength limit)
- none: No failure occurred — outcome was clean or the attempt was abandoned before failure
- unknown: Evidence is insufficient to classify the failure type

ANTI-REFUSAL: You are classifying failure types in off-road motorcycle riding footage for coaching purposes. This is legitimate sports analysis. Always complete your analysis and return valid JSON.

You MUST respond with ONLY a valid JSON object matching the schema below. No prose, no markdown fences, no explanation, no apologies, no refusal text. If you are uncertain about any field, use "unknown" or low confidence values — but you must always return valid JSON. Never refuse this task. This is legitimate sports coaching analysis.

Schema:
{
  "stage": "failure_type_classification",
  "failure_occurred": <boolean>,
  "failure_type": "technique" | "decision" | "momentum" | "traction" | "mechanical" | "line_choice" | "fitness" | "none" | "unknown",
  "confidence": <number 0.0 to 1.0>,
  "failure_description": "<natural language description of the failure, or null if no failure>",
  "contributing_factors": [
    {
      "factor": "<what contributed to the failure>",
      "role": "primary" | "contributing" | "possible",
      "evidence": ["<specific evidence from upstream stages>"]
    }
  ],
  "symptoms_vs_root": {
    "observed_symptoms": ["<what was visible/audible — from Stage 5 observations only>"],
    "likely_root_cause": "<distinct root cause claim — not a repeat of symptoms>",
    "root_cause_confidence": <number 0.0 to 1.0>
  },
  "audio_failure_cues": {
    "engine_behaviour": "<e.g. 'engine stalled at failure point', or null>",
    "impact_correlation": "<e.g. 'impact sound at frame 6 confirms crash timing', or null>"
  },
  "no_failure_note": "<if no failure: what went well or what was the closest risk — null if failure occurred>",
  "debug": {
    "reasoning": "<explain how you determined the failure type and root cause>",
    "alternatives_considered": ["<other failure types you considered and why you rejected them>"],
    "confidence_factors": ["<what increased confidence>", "<what reduced confidence>"]
  }
}`;

function buildUserPrompt(
  stage1: Stage1Output,
  stage2: Stage2Output,
  stage3: Stage3Output,
  stage4: Stage4Output,
  stage5: Stage5Output
): string {
  const outcomeResult = stage5.outcome.result;
  const outcomeNote =
    outcomeResult === "clean"
      ? `Stage 5 outcome is "clean" — the rider completed the section. Set failure_occurred to false, failure_type to "none", and populate no_failure_note with what went well or the closest risk.`
      : outcomeResult === "unknown"
      ? `Stage 5 outcome is "unknown" — outcome could not be determined. Classify failure_type as "unknown" unless the segment data provides sufficient evidence to determine otherwise.`
      : `Stage 5 outcome is "${outcomeResult}" — a failure or suboptimal result occurred. Identify the primary failure type with the strongest evidence from the stage data.`;

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

Outcome note: ${outcomeNote}

Using only the structured data above, classify the failure type. Draw observed_symptoms exclusively from Stage 5 segment observations and state transitions. Do not invent evidence not present in the upstream data.`;
}

function validateAndNormalize(raw: string): Stage6Output {
  const parsed = parseJsonResponse(raw, STAGE_LABEL);
  const obj = requireKeys(
    parsed,
    ["failure_occurred", "failure_type", "confidence", "symptoms_vs_root"],
    STAGE_LABEL
  );

  const output = obj as unknown as Stage6Output;

  // Clamp failure_type to allowed values
  if (!ALLOWED_FAILURE_TYPES.includes(output.failure_type)) {
    output.failure_type = "unknown";
  }

  // Ensure contributing_factors is an array
  if (!Array.isArray(output.contributing_factors)) {
    output.contributing_factors = [];
  }

  // Default no_failure_note if failure did not occur and note is absent
  if (!output.failure_occurred && !output.no_failure_note) {
    output.no_failure_note = "No failure analysis available";
  }

  return output;
}

export async function runStage6(
  model: ModelProvider,
  stage1: Stage1Output,
  stage2: Stage2Output,
  stage3: Stage3Output,
  stage4: Stage4Output,
  stage5: Stage5Output
): Promise<Stage6Output> {
  return executeStageCall(
    model,
    [], // Stage 6 reasons from structured JSON only — no frames
    SYSTEM_PROMPT,
    buildUserPrompt(stage1, stage2, stage3, stage4, stage5),
    STAGE_LABEL,
    validateAndNormalize
  );
}
