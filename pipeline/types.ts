// RideMind Pipeline — Shared Types
// Enum values verified directly against docs/pipeline-contracts-v1.md

// ————————————————————————————————————————————
// Shared
// ————————————————————————————————————————————

export interface DebugBlock {
  reasoning: string;
  alternatives_considered: string[];
  confidence_factors: string[];
}

// ————————————————————————————————————————————
// ModelProvider interface (used by all stages)
// ————————————————————————————————————————————

export interface ModelProvider {
  name: string;
  analyzeFrames(systemPrompt: string, userPrompt: string, frames: Buffer[]): Promise<string>;
}

// ————————————————————————————————————————————
// Stage 1 — Camera Perspective Detection
// ————————————————————————————————————————————

export interface Stage1Output {
  stage: "camera_perspective";
  perspective: "pov" | "third_person" | "mixed";
  confidence: number;
  subject_visibility: {
    rider_body_visible: boolean;
    bike_visible: boolean;
    full_body_visible: boolean;
    partial_body_visible: boolean;
  };
  camera_details: {
    estimated_mount: "helmet" | "chest" | "handlebar" | "tripod" | "handheld" | "unknown";
    stability: "stable" | "moderate_shake" | "heavy_shake";
    distance_to_subject: "close" | "medium" | "far" | "not_applicable";
  };
  constraints: {
    body_position_observable: boolean;
    facial_expression_observable: boolean;
    bike_controls_observable: boolean;
  };
  debug: DebugBlock;
}

// ————————————————————————————————————————————
// Stage 2 — Observability Assessment
// ————————————————————————————————————————————

export type FrameIssue = "blur" | "obstruction" | "darkness" | "overexposure" | "distance" | "resolution";
export type ObservabilityLevel = "clear" | "partial" | "not_visible";

export interface Stage2Output {
  stage: "observability_assessment";
  overall_confidence: number;
  frame_quality: {
    total_frames: number;
    usable_frames: number;
    issues: FrameIssue[];
  };
  observable_elements: {
    rider_body_position: ObservabilityLevel;
    bike_attitude: ObservabilityLevel;
    terrain_surface: ObservabilityLevel;
    terrain_gradient: ObservabilityLevel;
    terrain_features: ObservabilityLevel;
    obstacles: ObservabilityLevel;
    other_riders: ObservabilityLevel;
  };
  confidence_ceilings: {
    body_position_max_confidence: number;
    terrain_max_confidence: number;
    outcome_max_confidence: number;
  };
  limitations: string[];
  debug: DebugBlock;
}

// ————————————————————————————————————————————
// Stage 3 — Rider Intent / Attempt Detection
// ————————————————————————————————————————————

export type IntentCategory =
  | "climb"
  | "descent"
  | "traverse"
  | "jump"
  | "obstacle_clear"
  | "trail_ride"
  | "technical_section"
  | "race_section"
  | "practice"
  | "unknown";

export type ApparentGradient =
  | "flat"
  | "uphill"
  | "downhill"
  | "steep_uphill"
  | "steep_downhill"
  | "undulating";

export type ApparentSurface = "rocky" | "muddy" | "loose" | "hardpack" | "mixed" | "unclear";

export type DifficultyEstimate = "easy" | "moderate" | "hard" | "extreme" | "unclear";

export interface Stage3Output {
  stage: "rider_intent";
  primary_intent: string;
  intent_category: IntentCategory;
  confidence: number;
  intent_cues: {
    visual_cues: string[];
    audio_cues: string[];
    contextual_cues: string[];
  };
  shallow_terrain_read: {
    apparent_gradient: ApparentGradient;
    apparent_surface: ApparentSurface;
    obvious_features: string[];
  };
  difficulty_estimate: DifficultyEstimate;
  refinement_needed: boolean;
  event_detected: {
    type: "none" | "crash" | "stall" | "tip_over" | "near_miss" | "bail" | "mechanical";
    confidence: number;
    description: string | null;
  };
  debug: DebugBlock;
}

// ————————————————————————————————————————————
// Stage 4 — Terrain & Feature Detection
// ————————————————————————————————————————————

export type FeatureType =
  | "jump"
  | "drop"
  | "step_up"
  | "step_down"
  | "log"
  | "rock_garden"
  | "rut"
  | "berm"
  | "roots"
  | "switchback"
  | "water_crossing"
  | "gully"
  | "ledge"
  | "whoops"
  | "elevated_beam"
  | "none";

export type FeatureSeverity = "minor" | "moderate" | "significant" | "major";

export interface FeatureDetected {
  feature_type: FeatureType;
  location_in_sequence: string;
  severity: FeatureSeverity;
  confidence: number;
}

export type SurfacePrimaryType =
  | "rock"
  | "mud"
  | "sand"
  | "loam"
  | "hardpack"
  | "clay"
  | "shale"
  | "gravel"
  | "grass"
  | "mixed";

export type SurfaceCondition = "dry" | "damp" | "wet" | "saturated" | "frozen" | "dusty";

export type TractionEstimate = "high" | "moderate" | "low" | "very_low" | "variable";

export type GradientOverall =
  | "flat"
  | "gentle_up"
  | "moderate_up"
  | "steep_up"
  | "very_steep_up"
  | "gentle_down"
  | "moderate_down"
  | "steep_down"
  | "very_steep_down"
  | "undulating";

export type CamberType =
  | "neutral"
  | "off_camber_left"
  | "off_camber_right"
  | "cambered"
  | "variable";

export type LineQuality = "optimal" | "acceptable" | "suboptimal" | "poor" | "not_assessable";

export interface Stage4Output {
  stage: "terrain_feature_detection";
  surface: {
    primary_type: SurfacePrimaryType;
    secondary_type: string | null;
    condition: SurfaceCondition;
    traction_estimate: TractionEstimate;
    confidence: number;
  };
  gradient: {
    overall: GradientOverall;
    changes: string[];
    camber: CamberType;
  };
  features_detected: FeatureDetected[];
  line_options: {
    multiple_lines_visible: boolean;
    chosen_line_quality: LineQuality;
    alternative_lines: string[];
  };
  environmental_factors: {
    visibility: "clear" | "partial" | "poor";
    tree_cover: "open" | "partial" | "dense";
    trail_width: "wide" | "moderate" | "narrow" | "very_narrow";
  };
  audio_terrain_cues: {
    surface_sounds: string | null;
    engine_load_indicators: string | null;
  };
  debug: DebugBlock;
}

// ————————————————————————————————————————————
// Pipeline Result
// ————————————————————————————————————————————

export interface PipelineResult {
  stage1: Stage1Output;
  stage2: Stage2Output;
  stage3: Stage3Output;
  stage4: Stage4Output;
}

// ————————————————————————————————————————————
// Utilities
// ————————————————————————————————————————————

/**
 * Parses a JSON response from the model, handling markdown code fences.
 * Waterfall: direct parse → strip fences → extract braces → throw with context.
 */
export function parseJsonResponse(raw: string, stageLabel: string): unknown {
  // Attempt 1: direct parse
  try {
    return JSON.parse(raw);
  } catch (_) {}

  // Attempt 2: strip markdown fences
  const stripped = raw
    .replace(/^```(?:json)?\s*/m, "")
    .replace(/\s*```\s*$/m, "")
    .trim();
  try {
    return JSON.parse(stripped);
  } catch (_) {}

  // Attempt 3: extract from first { to last }
  const firstBrace = raw.indexOf("{");
  const lastBrace = raw.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    try {
      return JSON.parse(raw.slice(firstBrace, lastBrace + 1));
    } catch (_) {}
  }

  throw new Error(
    `${stageLabel}: JSON parse failed. Raw response (first 500 chars): ${raw.slice(0, 500)}`
  );
}

/**
 * Verifies that required top-level keys are present in a parsed object.
 * Throws a clear error if any key is missing.
 */
export function requireKeys(
  obj: unknown,
  keys: string[],
  stageLabel: string
): Record<string, unknown> {
  if (typeof obj !== "object" || obj === null) {
    throw new Error(`${stageLabel}: response is not a JSON object`);
  }
  const record = obj as Record<string, unknown>;
  for (const key of keys) {
    if (!(key in record)) {
      throw new Error(`${stageLabel}: missing required field '${key}'`);
    }
  }
  return record;
}

/**
 * Executes a stage call with one retry on parse or validation failure.
 * On first failure, prepends a schema-reminder to the user prompt before retrying.
 */
export async function executeStageCall<T>(
  model: ModelProvider,
  frames: Buffer[],
  systemPrompt: string,
  userPrompt: string,
  stageLabel: string,
  validateAndNormalize: (raw: string) => T
): Promise<T> {
  const retryPrefix =
    "Your previous response was not valid JSON matching the required schema. " +
    "Return ONLY a valid JSON object with no prose or markdown.\n\n";

  let lastError: unknown;

  for (let attempt = 0; attempt < 2; attempt++) {
    const effectivePrompt = attempt === 0 ? userPrompt : retryPrefix + userPrompt;
    try {
      const raw = await model.analyzeFrames(systemPrompt, effectivePrompt, frames);
      return validateAndNormalize(raw);
    } catch (err) {
      lastError = err;
      if (attempt === 0) {
        console.log(`  [${stageLabel}] Response invalid, retrying once...`);
      }
    }
  }

  throw lastError;
}
