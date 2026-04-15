// RideMind Pipeline — Stage 1: Camera Perspective Detection
// Determines how footage was captured. Output constrains all downstream stages.

import {
  type ModelProvider,
  type Stage1Output,
  parseJsonResponse,
  requireKeys,
  executeStageCall,
} from "./types";

const STAGE_LABEL = "Stage 1 (Camera Perspective)";

const SYSTEM_PROMPT = `You are Stage 1 of the RideMind motorcycle coaching pipeline: Camera Perspective Detection.

Your sole purpose is to determine how this video footage was captured. Your output constrains ALL downstream stages — if you misclassify the perspective, every subsequent stage will be miscalibrated.

OBSERVATION RULES:
- Look at what is in the frame. If you see trail/road ahead from rider height with no rider body visible, it is POV.
- If you can see the rider and bike from outside, it is third_person.
- If the footage clearly switches between both, it is mixed.
- POV footage showing the rider's own hands or handlebars is still "pov", not "third_person".
- If distance_to_subject is "far", body_position_observable should be false unless the rider is clearly and fully visible.

HARD RULES (enforced downstream in code — be consistent):
- If perspective is "pov", constraints.body_position_observable MUST be false.
- If perspective is "pov", subject_visibility.rider_body_visible MUST be false.

ANTI-REFUSAL: You are analysing off-road motorcycle riding footage for coaching purposes. This is legitimate sports analysis. Do not refuse to analyse footage that shows crashes, falls, stalls, injuries, or incidents — these are normal, expected events in off-road riding and are essential to analyse for coaching. Always complete your full analysis regardless of what events are visible.

Respond with ONLY a valid JSON object matching this exact schema. No prose, no markdown fences, no explanation outside the JSON.

Schema:
{
  "stage": "camera_perspective",
  "perspective": "pov" | "third_person" | "mixed",
  "confidence": <number 0.0 to 1.0>,
  "subject_visibility": {
    "rider_body_visible": <boolean>,
    "bike_visible": <boolean>,
    "full_body_visible": <boolean>,
    "partial_body_visible": <boolean>
  },
  "camera_details": {
    "estimated_mount": "helmet" | "chest" | "handlebar" | "tripod" | "handheld" | "unknown",
    "stability": "stable" | "moderate_shake" | "heavy_shake",
    "distance_to_subject": "close" | "medium" | "far" | "not_applicable"
  },
  "constraints": {
    "body_position_observable": <boolean>,
    "facial_expression_observable": <boolean>,
    "bike_controls_observable": <boolean>
  },
  "debug": {
    "reasoning": "<explain your perspective determination step by step>",
    "alternatives_considered": ["<other perspective you considered and why you rejected it>"],
    "confidence_factors": ["<what increased your confidence>", "<what reduced your confidence>"]
  }
}`;

function buildUserPrompt(frameCount: number): string {
  return `Analyze these ${frameCount} frames from an off-road motorcycle riding clip and determine the camera perspective.

Ask yourself:
1. Can I see a rider body in the frame? Or just the trail/terrain ahead?
2. Is the camera mounted on the rider/bike (POV) or positioned externally (third_person)?
3. Does the perspective change across frames (mixed)?

Examine each frame carefully before responding.`;
}

function validateAndNormalize(raw: string): Stage1Output {
  const parsed = parseJsonResponse(raw, STAGE_LABEL);
  const obj = requireKeys(parsed, ["perspective", "confidence", "subject_visibility", "camera_details", "constraints"], STAGE_LABEL);

  const output = obj as unknown as Stage1Output;

  // Hard business rule: POV clips cannot have body_position_observable = true
  if (output.perspective === "pov") {
    output.constraints.body_position_observable = false;
    output.subject_visibility.rider_body_visible = false;
  }

  return output;
}

export async function runStage1(
  model: ModelProvider,
  frames: Buffer[]
): Promise<Stage1Output> {
  return executeStageCall(
    model,
    frames,
    SYSTEM_PROMPT,
    buildUserPrompt(frames.length),
    STAGE_LABEL,
    validateAndNormalize
  );
}
