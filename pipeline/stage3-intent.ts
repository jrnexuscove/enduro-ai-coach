// RideMind Pipeline — Stage 3: Rider Intent / Attempt Detection
// Determines what the rider was trying to achieve. Product-critical stage —
// coaching is meaningless without understanding intent.

import {
  type ModelProvider,
  type Stage1Output,
  type Stage2Output,
  type Stage3Output,
  parseJsonResponse,
  requireKeys,
  executeStageCall,
} from "./types.js";

const STAGE_LABEL = "Stage 3 (Rider Intent)";

const SYSTEM_PROMPT = `You are Stage 3 of the RideMind motorcycle coaching pipeline: Rider Intent / Attempt Detection.

Your job is to determine what the rider was attempting to do. This is product-critical — coaching feedback is meaningless without correctly understanding the rider's intent.

This stage runs before full terrain analysis, but you have access to:
- Shallow terrain cues visible in the frames (gradient direction, obvious surface type, visible obstacles)
- Camera perspective and observability constraints from Stages 1 and 2

RULES:
- Degrade your confidence proportionally to Stage 2 observability limitations. If observability is low, your confidence must be lower.
- Never fabricate intent from ambiguous footage. "unknown" is a valid and correct classification.
- primary_intent must be a natural language statement (e.g. "Rider is attempting to climb a rocky hill"). Not just a category.
- If confidence < 0.5, primary_intent must include qualifier language ("appears to be attempting", "likely attempting").
- Audio cues are listed in the context if available — engine revving for an approach, rider speech, etc.

intent_category options: "climb" | "descent" | "traverse" | "jump" | "obstacle_clear" | "trail_ride" | "technical_section" | "race_section" | "practice" | "unknown"
apparent_gradient options: "flat" | "uphill" | "downhill" | "steep_uphill" | "steep_downhill" | "undulating"
apparent_surface options: "rocky" | "muddy" | "loose" | "hardpack" | "mixed" | "unclear"
difficulty_estimate options: "easy" | "moderate" | "hard" | "extreme" | "unclear"

Respond with ONLY a valid JSON object matching this exact schema. No prose, no markdown fences, no explanation outside the JSON.

Schema:
{
  "stage": "rider_intent",
  "primary_intent": "<natural language statement of what the rider is attempting>",
  "intent_category": <see options above>,
  "confidence": <number 0.0 to 1.0>,
  "intent_cues": {
    "visual_cues": ["<what in the frames suggests this intent>"],
    "audio_cues": ["<what in the audio suggests this intent, or 'none available'>"],
    "contextual_cues": ["<e.g. other riders waiting, approach angle, trail direction>"]
  },
  "shallow_terrain_read": {
    "apparent_gradient": <see options above>,
    "apparent_surface": <see options above>,
    "obvious_features": ["<e.g. visible jump face, large rock step, fallen log>"]
  },
  "difficulty_estimate": <see options above>,
  "refinement_needed": <boolean — true if Stage 4 terrain analysis may change this intent interpretation>,
  "debug": {
    "reasoning": "<explain how you determined intent from the available cues>",
    "alternatives_considered": ["<other intent categories you considered and why rejected>"],
    "confidence_factors": ["<what increased confidence>", "<what reduced confidence>"]
  }
}`;

function buildUserPrompt(
  stage1: Stage1Output,
  stage2: Stage2Output,
  frameCount: number
): string {
  const observabilityNote =
    stage2.overall_confidence < 0.5
      ? `NOTE: Stage 2 rated overall observability at ${stage2.overall_confidence.toFixed(2)} — this is LOW. Your confidence must reflect this limitation.`
      : `Stage 2 rated overall observability at ${stage2.overall_confidence.toFixed(2)}.`;

  return `Stage 1 (Camera Perspective):
${JSON.stringify(stage1, null, 2)}

Stage 2 (Observability Assessment):
${JSON.stringify(stage2, null, 2)}

${observabilityNote}

Now analyze these ${frameCount} frames and determine what the rider was attempting.

Ask yourself:
1. What direction is the rider heading? Uphill, downhill, flat?
2. What is the apparent terrain type and condition?
3. Are there any obvious features visible (jump, hill, obstacle)?
4. Does the rider's approach angle and speed suggest a specific intent?
5. Is the intent clear or ambiguous?

Base your assessment only on what you can actually observe, constrained by the Stage 2 observability report.`;
}

function validateAndNormalize(raw: string): Stage3Output {
  const parsed = parseJsonResponse(raw, STAGE_LABEL);
  requireKeys(parsed, ["intent_category", "confidence", "primary_intent", "shallow_terrain_read"], STAGE_LABEL);
  return parsed as unknown as Stage3Output;
}

export async function runStage3(
  model: ModelProvider,
  frames: Buffer[],
  stage1: Stage1Output,
  stage2: Stage2Output
): Promise<Stage3Output> {
  return executeStageCall(
    model,
    frames,
    SYSTEM_PROMPT,
    buildUserPrompt(stage1, stage2, frames.length),
    STAGE_LABEL,
    validateAndNormalize
  );
}
