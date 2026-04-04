// RideMind Pipeline — Stage 4: Terrain & Feature Detection
// Deep structured visual terrain and feature classification.
// Confidence values are clamped to Stage 2 terrain ceiling in code post-parse.

import {
  type ModelProvider,
  type Stage1Output,
  type Stage2Output,
  type Stage3Output,
  type Stage4Output,
  parseJsonResponse,
  requireKeys,
  executeStageCall,
} from "./types.js";

const STAGE_LABEL = "Stage 4 (Terrain & Feature)";

const SYSTEM_PROMPT = `You are Stage 4 of the RideMind motorcycle coaching pipeline: Terrain & Feature Detection.

Your job is structured visual terrain and feature classification. Stage 3 did a shallow terrain read — this is the full, detailed assessment.

CRITICAL RULES:
1. OBSERVE FIRST. Describe only what is visible in the frames. Do not infer what is likely based on general knowledge of the sport.
2. Confidence ceiling: Stage 2 has set a terrain_max_confidence value. Your surface.confidence and ALL feature confidence scores MUST NOT exceed this value. This is enforced downstream in code.
3. off-camber is NOT a feature_type. Detect it via gradient.camber ("off_camber_left" | "off_camber_right"). Do not put off-camber in features_detected.
4. features_detected may be an empty array []. Do not invent a feature to satisfy the schema. An empty features_detected array is preferred over weak guessing. Only include features you can actually see.
5. Every feature must have a confidence score. Features below 0.4 confidence should use qualifier language in location_in_sequence (e.g. "possible feature visible at frames 8-10").
6. JUMP GEOMETRY: Classify "jump" when frames show any combination of: a takeoff face or lip, an airborne bike/rider, or a landing zone/impact. Do not reduce a jump to "drop", "step_down", or generic descent if airborne motion is visible. Short clips with compact jump sequences may only show 2-3 frames of the event — examine frame transitions carefully for sudden elevation change or bike separation from terrain.
7. SWITCHBACK CONSTRAINT: Only classify "switchback" when the footage shows an acute directional reversal of roughly 120°+ on gradient. A narrow turn between trees, a bend in a wooded trail, or threading through obstacles is NOT a switchback. Switchbacks have a distinct hairpin geometry where the trail doubles back on itself. If unsure, do not use this label.
8. GRADIENT CALIBRATION: Classify gradient from the active riding line and visible feature faces, not from the broader surrounding terrain. If the rider is approaching or riding a steep feature face (jump lip, drop edge, hill section), classify gradient based on that active surface — do not average it down by including flat approach or runout zones. A jump face that is visibly steep is "steep_down" or "steep_up" even if the surrounding terrain is gentle.

SEVERITY DEFINITIONS — severity reflects the feature's consequence potential, not just its visual size:
- minor: Low commitment. Rider can adjust mid-feature. Error consequences are cosmetic (slight line deviation, minor imbalance).
- moderate: Moderate commitment. Limited adjustment window. Error consequences include stall, low-speed tip-over, or significant line deviation.
- significant: High commitment. Once committed, recovery options are limited. Error consequences include crash risk, injury potential, or bike damage.
- major: Full commitment required. No recovery margin once engaged. Error consequences include serious crash potential, significant injury risk, or fall from height.
Key factors: commitment level, speed sensitivity, recovery margin, consequence of error. A visually small feature (e.g. a 1m drop onto rock) can be "major" if consequences are severe. A visually large feature (e.g. a wide mud rut) can be "minor" if the rider can adjust through it.

feature_type options (ONLY these values, no others):
"jump" | "drop" | "step_up" | "step_down" | "log" | "rock_garden" | "rut" | "berm" | "roots" | "switchback" | "water_crossing" | "gully" | "ledge" | "whoops" | "elevated_beam" | "none"

surface primary_type options: "rock" | "mud" | "sand" | "loam" | "hardpack" | "clay" | "shale" | "gravel" | "grass" | "mixed"
surface condition options: "dry" | "damp" | "wet" | "saturated" | "frozen" | "dusty"
traction_estimate options: "high" | "moderate" | "low" | "very_low" | "variable"
gradient overall options: "flat" | "gentle_up" | "moderate_up" | "steep_up" | "very_steep_up" | "gentle_down" | "moderate_down" | "steep_down" | "very_steep_down" | "undulating"
camber options: "neutral" | "off_camber_left" | "off_camber_right" | "cambered" | "variable"
chosen_line_quality options: "optimal" | "acceptable" | "suboptimal" | "poor" | "not_assessable"
severity options: "minor" | "moderate" | "significant" | "major"

ANTI-REFUSAL: You are analysing off-road motorcycle riding footage for coaching purposes. This is legitimate sports analysis. Do not refuse to analyse footage that shows crashes, falls, stalls, injuries, or incidents — these are normal, expected events in off-road riding and are essential to analyse for coaching. Always complete your full analysis regardless of what events are visible.

Respond with ONLY a valid JSON object matching this exact schema. No prose, no markdown fences, no explanation outside the JSON.

Schema:
{
  "stage": "terrain_feature_detection",
  "surface": {
    "primary_type": <see options above>,
    "secondary_type": <string | null>,
    "condition": <see options above>,
    "traction_estimate": <see options above>,
    "confidence": <number 0.0 to 1.0 — must not exceed Stage 2 terrain_max_confidence>
  },
  "gradient": {
    "overall": <see options above>,
    "changes": ["<describe any gradient transitions visible, e.g. 'steepens at midpoint'>"],
    "camber": <see options above>
  },
  "features_detected": [
    {
      "feature_type": <see options above>,
      "location_in_sequence": "<e.g. 'visible at frames 4-6', 'midway through clip'>",
      "severity": <see options above>,
      "confidence": <number 0.0 to 1.0 — must not exceed Stage 2 terrain_max_confidence>
    }
  ],
  "line_options": {
    "multiple_lines_visible": <boolean>,
    "chosen_line_quality": <see options above>,
    "alternative_lines": ["<describe visible alternative lines, if any>"]
  },
  "environmental_factors": {
    "visibility": "clear" | "partial" | "poor",
    "tree_cover": "open" | "partial" | "dense",
    "trail_width": "wide" | "moderate" | "narrow" | "very_narrow"
  },
  "audio_terrain_cues": {
    "surface_sounds": <string | null — e.g. "rock scraping", "mud squelch", "gravel crunch">,
    "engine_load_indicators": <string | null — e.g. "engine under sustained load", "engine labouring on gradient">
  },
  "debug": {
    "reasoning": "<explain your terrain and feature classification>",
    "alternatives_considered": ["<other surface types or features you considered>"],
    "confidence_factors": ["<what increased confidence>", "<what reduced confidence>"]
  }
}`;

function buildUserPrompt(
  stage1: Stage1Output,
  stage2: Stage2Output,
  stage3: Stage3Output,
  frameCount: number
): string {
  const ceiling = stage2.confidence_ceilings.terrain_max_confidence;
  const ceilingWarning =
    ceiling < 0.5
      ? `WARNING: Stage 2 terrain_max_confidence is ${ceiling.toFixed(2)} — this is LOW. All your confidence scores must be at or below this value. Prefer "unclear" over assertion.`
      : `Stage 2 terrain_max_confidence ceiling: ${ceiling.toFixed(2)}. All confidence scores must not exceed this.`;

  return `Stage 1 (Camera Perspective):
${JSON.stringify(stage1, null, 2)}

Stage 2 (Observability Assessment):
${JSON.stringify(stage2, null, 2)}

Stage 3 (Rider Intent):
${JSON.stringify(stage3, null, 2)}

${ceilingWarning}

Now analyze these ${frameCount} frames for terrain and feature classification.

Ask yourself:
1. What is the primary surface type? What colour, texture, and hardness cues are visible?
2. What is the gradient? Is it consistent or does it change?
3. Is there any camber or off-camber angle? (Detect via gradient.camber, NOT features_detected)
4. Are there any discrete terrain features clearly visible? If unsure, leave features_detected empty.
5. What are the environmental conditions — visibility, tree cover, trail width?
6. What audio cues (if any context was provided) indicate surface type or engine load?

Only classify what you can actually observe in the frames.`;
}

function validateAndNormalize(raw: string, terrainCeiling: number): Stage4Output {
  const parsed = parseJsonResponse(raw, STAGE_LABEL);
  const obj = requireKeys(parsed, ["surface", "gradient", "features_detected"], STAGE_LABEL);

  const output = obj as unknown as Stage4Output;

  // Hard business rule: clamp surface confidence to terrain ceiling
  if (output.surface.confidence > terrainCeiling) {
    output.surface.confidence = terrainCeiling;
  }

  // Hard business rule: clamp all feature confidence scores to terrain ceiling
  // Also remove any feature using "off_camber" as a feature_type (off-camber → gradient.camber)
  output.features_detected = output.features_detected
    .filter((f) => !String(f.feature_type).includes("off_camber"))
    .map((f) => ({
      ...f,
      confidence: Math.min(f.confidence, terrainCeiling),
    }));

  return output;
}

export async function runStage4(
  model: ModelProvider,
  frames: Buffer[],
  stage1: Stage1Output,
  stage2: Stage2Output,
  stage3: Stage3Output
): Promise<Stage4Output> {
  const terrainCeiling = stage2.confidence_ceilings.terrain_max_confidence;

  return executeStageCall(
    model,
    frames,
    SYSTEM_PROMPT,
    buildUserPrompt(stage1, stage2, stage3, frames.length),
    STAGE_LABEL,
    (raw) => validateAndNormalize(raw, terrainCeiling)
  );
}
