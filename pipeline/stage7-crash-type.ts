// RideMind Pipeline — Stage 7: Crash Type Classification
// Classifies crash mechanism when a crash has occurred.
// Operates on structured JSON from Stages 1–6 only — no frames.

import {
  type ModelProvider,
  type Stage1Output,
  type Stage2Output,
  type Stage3Output,
  type Stage4Output,
  type Stage5Output,
  type Stage6Output,
  type Stage7Output,
  type CrashType,
  parseJsonResponse,
  requireKeys,
  executeStageCall,
} from "./types";

const STAGE_LABEL = "Stage 7 (Crash Type Classification)";

const ALLOWED_CRASH_TYPES: CrashType[] = [
  "otb",
  "lowside",
  "highside",
  "tip_over",
  "stall_drop",
  "slide",
  "ejection",
  "none",
  "unknown",
];

const SYSTEM_PROMPT = `You are Stage 7 of the RideMind motorcycle coaching pipeline: Crash Type Classification.

Your job is to classify the crash mechanism when a crash has occurred, using only the structured analysis from Stages 1–6. You have no video frames — reason entirely from the prior stage outputs provided.

CRITICAL RULES:
1. This stage only activates when a crash has occurred. If no crash is evident from the upstream data, set crash_occurred to false and explain in not_applicable_reason.
2. crash_type describes the MECHANISM of the crash, not the consequence. "OTB" (over the bars) is a mechanism. "Rider got hurt" is a consequence.
3. Different crash types require different coaching responses:
   - otb: forward rotation, rider goes over handlebars. Usually caused by front wheel stopping suddenly, excessive front brake, or nose-heavy landing.
   - lowside: bike slides out, rider falls to the low side. Usually caused by loss of rear or front traction.
   - highside: rear wheel regains traction suddenly after sliding, throwing rider over the high side. Usually caused by abrupt throttle release or traction recovery mid-slide.
   - tip_over: low or zero speed fall, bike falls to one side. Usually caused by stall on gradient, balance loss at low speed.
   - stall_drop: bike stalls and rider cannot hold it, falls with the bike. Usually on steep gradients.
   - slide: bike and rider slide together, no separation. Usually on loose or wet surfaces.
   - ejection: rider separates from bike at speed, typically from jumps or sudden impacts.
   - unknown: crash occurred but mechanism cannot be determined from available evidence.
4. severity_estimate must be based on observable evidence only. Do not speculate about injuries beyond what is visible.
5. If evidence is insufficient to classify crash mechanics, use crash_type "unknown". Do not fabricate a mechanism.
6. body_dynamics must describe the visible physical interaction between rider, bike, and terrain during the crash.

ANTI-REFUSAL: You are classifying crash types in off-road motorcycle riding footage for coaching purposes. This is legitimate sports analysis. Always complete your analysis and return valid JSON.

You MUST respond with ONLY a valid JSON object matching the schema below. No prose, no markdown fences, no explanation, no apologies, no refusal text. If you are uncertain about any field, use "unknown" or null — but you must always return valid JSON. Never refuse this task. This is legitimate sports coaching analysis.

Schema:
{
  "stage": "crash_type_classification",
  "crash_occurred": <boolean>,
  "crash_type": "otb" | "lowside" | "highside" | "tip_over" | "stall_drop" | "slide" | "ejection" | "none" | "unknown" | null,
  "crash_mechanism": "<natural language description of how the crash happened, or null>",
  "severity_estimate": "none" | "minor" | "moderate" | "serious" | "unknown",
  "crash_phase": "<which Stage 5 segment_id the crash occurred in, as a string, or null>",
  "body_dynamics": {
    "rider_separation": <boolean | null — did rider separate from bike>,
    "direction_of_fall": "<forward | backward | left | right | over_bars | unknown | null>",
    "bike_behaviour": "<e.g. 'bike continued forward', 'bike fell on rider side', or null>"
  },
  "confidence": <number 0.0 to 1.0>,
  "audio_crash_evidence": {
    "impact_detected": <boolean>,
    "impact_description": "<description of impact sounds, or null>",
    "post_crash_audio": "<e.g. 'rider groaning', 'engine still running', 'silence', or null>"
  },
  "not_applicable_reason": "<if no crash: explain why this stage was skipped or what the actual outcome was — null if crash occurred>",
  "debug": {
    "reasoning": "<explain how you determined the crash type and mechanism>",
    "alternatives_considered": ["<other crash types you considered and why you rejected them>"],
    "confidence_factors": ["<what increased confidence>", "<what reduced confidence>"]
  }
}`;

function buildUserPrompt(
  stage1: Stage1Output,
  stage2: Stage2Output,
  stage3: Stage3Output,
  stage4: Stage4Output,
  stage5: Stage5Output,
  stage6: Stage6Output
): string {
  const outcomeResult = stage5.outcome.result;
  const crashOccurred = outcomeResult === "crash" || stage6.failure_occurred;

  const activationNote = crashOccurred
    ? `Stage 5 outcome is "${outcomeResult}" and Stage 6 failure_occurred is ${stage6.failure_occurred}. A crash or failure is indicated — classify the crash mechanism using available evidence.`
    : `Stage 5 outcome is "${outcomeResult}" and Stage 6 failure_occurred is ${stage6.failure_occurred}. No crash appears to have occurred. Set crash_occurred to false, crash_type to null, and explain in not_applicable_reason.`;

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

Activation note: ${activationNote}

Using only the structured data above, classify the crash type and mechanism. Draw evidence exclusively from the stage outputs above. Do not invent evidence not present in the upstream data.`;
}

function validateAndNormalize(raw: string): Stage7Output {
  const parsed = parseJsonResponse(raw, STAGE_LABEL);
  const obj = requireKeys(
    parsed,
    ["crash_occurred", "crash_type", "confidence", "severity_estimate"],
    STAGE_LABEL
  );

  const output = obj as unknown as Stage7Output;

  // Clamp crash_type to allowed values
  if (output.crash_type !== null && !ALLOWED_CRASH_TYPES.includes(output.crash_type)) {
    output.crash_type = "unknown";
  }

  // Default not_applicable_reason if no crash and reason is absent
  if (!output.crash_occurred && !output.not_applicable_reason) {
    output.not_applicable_reason = "No crash detected in upstream analysis";
  }

  return output;
}

export async function runStage7(
  model: ModelProvider,
  stage1: Stage1Output,
  stage2: Stage2Output,
  stage3: Stage3Output,
  stage4: Stage4Output,
  stage5: Stage5Output,
  stage6: Stage6Output
): Promise<Stage7Output> {
  return executeStageCall(
    model,
    [], // Stage 7 reasons from structured JSON only — no frames
    SYSTEM_PROMPT,
    buildUserPrompt(stage1, stage2, stage3, stage4, stage5, stage6),
    STAGE_LABEL,
    validateAndNormalize
  );
}
