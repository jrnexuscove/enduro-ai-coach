// RideMind Pipeline — Stage 2: Observability Assessment
// Sets confidence ceilings that constrain every downstream stage.

import {
  type ModelProvider,
  type Stage1Output,
  type Stage2Output,
  parseJsonResponse,
  requireKeys,
  executeStageCall,
} from "./types.js";

const STAGE_LABEL = "Stage 2 (Observability)";

const SYSTEM_PROMPT = `You are Stage 2 of the RideMind motorcycle coaching pipeline: Observability Assessment.

Your job is to determine what CAN and CANNOT be reliably observed in this footage. The confidence ceilings you set here constrain every downstream stage — no stage may claim higher confidence than the ceiling you establish.

CRITICAL RULES:
- Be honest about what you cannot see. Preferring "partial" or "not_visible" over "clear" when in doubt is correct behaviour.
- If overall_confidence < 0.3, downstream stages must operate in cautious mode.
- POV footage: body_position_max_confidence MUST be 0.0 (no rider body to observe).
- Your confidence_ceilings represent the MAXIMUM any downstream stage may claim, not a target.

FRAME QUALITY ISSUES to look for:
- blur: motion blur or out-of-focus frames
- obstruction: objects blocking the view (branches, other riders, etc.)
- darkness: underexposed or night footage
- overexposure: blown-out highlights obscuring detail
- distance: subject too far away to assess detail
- resolution: low resolution limiting detail

Respond with ONLY a valid JSON object matching this exact schema. No prose, no markdown fences, no explanation outside the JSON.

Schema:
{
  "stage": "observability_assessment",
  "overall_confidence": <number 0.0 to 1.0>,
  "frame_quality": {
    "total_frames": <number>,
    "usable_frames": <number>,
    "issues": [<"blur" | "obstruction" | "darkness" | "overexposure" | "distance" | "resolution">]
  },
  "observable_elements": {
    "rider_body_position": "clear" | "partial" | "not_visible",
    "bike_attitude": "clear" | "partial" | "not_visible",
    "terrain_surface": "clear" | "partial" | "not_visible",
    "terrain_gradient": "clear" | "partial" | "not_visible",
    "terrain_features": "clear" | "partial" | "not_visible",
    "obstacles": "clear" | "partial" | "not_visible",
    "other_riders": "clear" | "partial" | "not_visible"
  },
  "confidence_ceilings": {
    "body_position_max_confidence": <number 0.0 to 1.0>,
    "terrain_max_confidence": <number 0.0 to 1.0>,
    "outcome_max_confidence": <number 0.0 to 1.0>
  },
  "limitations": ["<specific thing that cannot be determined from this footage>"],
  "debug": {
    "reasoning": "<explain how you assessed observability>",
    "alternatives_considered": ["<alternative ceiling values you considered>"],
    "confidence_factors": ["<what increased confidence>", "<what reduced confidence>"]
  }
}`;

function buildUserPrompt(stage1: Stage1Output, frameCount: number): string {
  return `Stage 1 determined the following about this footage:
${JSON.stringify(stage1, null, 2)}

Now assess what can and cannot be observed in these ${frameCount} frames.

Given the camera perspective (${stage1.perspective}) and what Stage 1 found about visibility, evaluate:
1. How many frames are usable? What quality issues are present?
2. What can be clearly seen vs. partially seen vs. not seen at all?
3. What are the confidence ceilings — what is the maximum confidence any downstream stage should claim?
4. What specific limitations exist in this footage?

${stage1.perspective === "pov" ? "IMPORTANT: This is POV footage. body_position_max_confidence MUST be 0.0 — the rider body is not visible." : ""}`;
}

function validateAndNormalize(raw: string, stage1: Stage1Output): Stage2Output {
  const parsed = parseJsonResponse(raw, STAGE_LABEL);
  const obj = requireKeys(parsed, ["overall_confidence", "confidence_ceilings", "frame_quality", "observable_elements", "limitations"], STAGE_LABEL);

  const output = obj as unknown as Stage2Output;

  // Hard business rule: POV clips cannot have body position confidence > 0
  if (stage1.perspective === "pov") {
    output.confidence_ceilings.body_position_max_confidence = 0.0;
  }

  return output;
}

export async function runStage2(
  model: ModelProvider,
  frames: Buffer[],
  stage1: Stage1Output
): Promise<Stage2Output> {
  return executeStageCall(
    model,
    frames,
    SYSTEM_PROMPT,
    buildUserPrompt(stage1, frames.length),
    STAGE_LABEL,
    (raw) => validateAndNormalize(raw, stage1)
  );
}
