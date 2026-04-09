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
// Stage 5 — Event Sequencing
// ————————————————————————————————————————————

export type SegmentPhase =
  | "approach"
  | "setup"
  | "execution"
  | "transition"
  | "failure_point"
  | "recovery"
  | "outcome"
  | "post_event";

export type BodyPosition = "standing" | "seated" | "transitioning" | "not_visible";
export type ThrottleState = "accelerating" | "steady" | "decelerating" | "off" | "unknown";
export type BalanceState = "stable" | "unstable" | "losing_balance" | "fallen" | "not_assessable";
export type OutcomeResult = "clean" | "stall" | "bail" | "crash" | "stuck" | "partial_completion" | "unknown";

export interface EventSegment {
  segment_id: number;
  phase: SegmentPhase;
  description: string;
  frame_range: string;
  rider_state: {
    body_position: BodyPosition;
    throttle_state: ThrottleState;
    balance_state: BalanceState;
  };
  key_observations: string[];
  audio_markers: string[];
}

export interface Stage5Output {
  stage: "event_sequencing";
  segments: EventSegment[];
  critical_moment: {
    segment_id: number;
    description: string;
    timestamp_estimate: string | null;
  };
  outcome: {
    result: OutcomeResult;
    confidence: number;
    outcome_evidence: string[];
  };
  debug: DebugBlock;
}

// ————————————————————————————————————————————
// Stage 6 — Failure Type Classification
// ————————————————————————————————————————————

export type FailureType =
  | "technique"
  | "decision"
  | "momentum"
  | "traction"
  | "mechanical"
  | "line_choice"
  | "fitness"
  | "none"
  | "unknown";

export type ContributingRole = "primary" | "contributing" | "possible";

export interface ContributingFactor {
  factor: string;
  role: ContributingRole;
  evidence: string[];
}

export interface Stage6Output {
  stage: "failure_type_classification";
  failure_occurred: boolean;
  failure_type: FailureType;
  confidence: number;
  failure_description: string | null;
  contributing_factors: ContributingFactor[];
  symptoms_vs_root: {
    observed_symptoms: string[];
    likely_root_cause: string;
    root_cause_confidence: number;
  };
  audio_failure_cues: {
    engine_behaviour: string | null;
    impact_correlation: string | null;
  };
  no_failure_note: string | null;
  debug: DebugBlock;
}

// ————————————————————————————————————————————
// Stage 7 — Crash Type Classification
// ————————————————————————————————————————————

export type CrashType =
  | "otb"
  | "lowside"
  | "highside"
  | "tip_over"
  | "stall_drop"
  | "slide"
  | "ejection"
  | "none"
  | "unknown";

export type SeverityEstimate = "none" | "minor" | "moderate" | "serious" | "unknown";

export interface Stage7Output {
  stage: "crash_type_classification";
  crash_occurred: boolean;
  crash_type: CrashType | null;
  crash_mechanism: string | null;
  severity_estimate: SeverityEstimate;
  crash_phase: string | null;
  body_dynamics: {
    rider_separation: boolean | null;
    direction_of_fall: string | null;
    bike_behaviour: string | null;
  };
  confidence: number;
  audio_crash_evidence: {
    impact_detected: boolean;
    impact_description: string | null;
    post_crash_audio: string | null;
  };
  not_applicable_reason: string | null;
  debug: DebugBlock;
}

// ————————————————————————————————————————————
// Stage 8 — Causal Chain Construction
// ————————————————————————————————————————————

export type CausalRole = "enabling_condition" | "amplifier" | "constraint" | "destabiliser";
export type InfluenceLevel = "high" | "moderate" | "low";
export type OutcomeStatus = "clean" | "compromised" | "failed";
export type CounterfactualCategory =
  | "technique"
  | "momentum"
  | "traction"
  | "line_choice"
  | "body_position"
  | "throttle"
  | "braking";

export interface EvidenceRef {
  stage: string;  // "stage3", "stage5", etc.
  field: string;
  value: string;
}

export interface Stage8ContributingFactor {
  factor: string;
  category: "terrain" | "technique" | "momentum" | "traction" | "bike_dynamics" | "environmental";
  causal_role: CausalRole;
  influence: InfluenceLevel;
  confidence: number;
  evidence_refs: EvidenceRef[];
}

export interface Stage8Output {
  primary_cause: {
    failure_type: "bike_dynamics" | "technique" | "momentum" | "traction" | "none";
    factor: string;
    confidence: number;
    evidence_refs: EvidenceRef[];
  };
  trigger_event: {
    identified: boolean;
    description: string | null;
    confidence: number | null;
    evidence_refs: EvidenceRef[];
  };
  contributing_factors: Stage8ContributingFactor[];
  causal_summary: {
    setup_conditions: string;
    failure_mechanism: string;
    outcome_pathway: string;
  };
  counterfactual: {
    key_variable: string | null;
    variable_category: CounterfactualCategory | null;
    likely_effect_on_outcome: string | null;
    confidence: number | null;
  };
  outcome_status: OutcomeStatus;
  overall_confidence: number;
}

// ————————————————————————————————————————————
// Stage 9 — Coaching Decision Engine
// ————————————————————————————————————————————

export type CoachingDomain =
  | "body_position"
  | "throttle_control"
  | "clutch_control"
  | "braking"
  | "line_choice"
  | "speed_management"
  | "balance";

export type SkillTag =
  | "fore_aft_weight_distribution" | "standing_position" | "seated_position" | "stance_transition" | "vertical_absorption"
  | "progressive_application" | "traction_management" | "throttle_timing"
  | "slip_control" | "engagement_timing" | "clutch_throttle_coordination"
  | "front_brake_modulation" | "rear_brake_modulation" | "brake_balance" | "engine_braking"
  | "entry_speed_judgement" | "momentum_management" | "speed_adaptation"
  | "line_reading" | "line_commitment" | "line_adjustment"
  | "static_balance" | "dynamic_balance" | "lateral_balance" | "peg_weighting";

export type ExclusionReason =
  | "not_actionable"
  | "low_observability"
  | "low_confidence"
  | "peripheral"
  | "too_advanced";

export type FlagType = "caution" | "contraindicated";

export interface Stage9Output {
  coaching_required: boolean;
  primary_focus: {
    coaching_domain: CoachingDomain | null;
    target_variable: string;
    problem_mechanism: string;
    change_goal: string;
    applicable_phase: string;
    confidence: number;
    observability_limited: boolean;
  } | null;
  secondary_points: Array<{
    coaching_domain: CoachingDomain;
    target_variable: string;
    change_goal: string;
    confidence: number;
    observability_limited: boolean;
  }>;
  excluded_factors: Array<{
    factor: string;
    exclusion_reason: ExclusionReason;
  }>;
  safety_flags: Array<{
    coaching_point: string;
    risk: string;
    flag_type: FlagType;
  }>;
  coaching_constraints: {
    rider_intent: string;
    terrain_context: string;
    max_points: number;
  };
  skill_tags: SkillTag[];
  tag_confidence: "high" | "medium" | "low" | null;
}

// ————————————————————————————————————————————
// Stage 10 — Coaching Generation
// ————————————————————————————————————————————

export type CoachingCategory =
  | "speed_management"
  | "body_position"
  | "line_choice"
  | "braking_control"
  | "clutch_control"
  | "traction_management"
  | "vision_timing"
  | "commitment_decision"
  | "bike_balance"
  | "other";

export interface Stage10Output {
  stage: "coaching_generation";
  coaching_required: boolean;
  confidence: number;
  observability_limited: boolean;

  source_trace: {
    primary_stage9_category: string;
    primary_stage9_subcategory: string | null;
    stage9_confidence: number;
  };

  kb_entries_used: string[];

  rider_facing_summary: string | null;
  technical_coach_note: string | null;

  primary_focus: {
    category: string;
    subcategory: string | null;
    title: string;
    why_it_matters: string;
    what_to_change: string;
    key_cues: string[];
  } | null;

  secondary_focuses: Array<{
    category: string;
    subcategory: string | null;
    title: string;
    why_it_matters: string;
    what_to_change: string | null;
  }>;

  scenario_explanation: string | null;
  next_attempt_plan: string[];

  drills: Array<{
    name: string;
    purpose: string;
    how_to_do_it: string;
    progression: string | null;
  }>;

  uncertainty_statement: string | null;
  debug: DebugBlock;
}

// ————————————————————————————————————————————
// Stage 11 — Safety & Contradiction Validation
// ————————————————————————————————————————————

export interface Stage11Output {
  stage: "safety_validation";
  safe: boolean;
  flags: {
    speed_risk: boolean;
    contradiction: boolean;
    severity_mismatch: boolean;
    observability_overreach: boolean;
  };
  issues: string[];
  confidence_adjustment: number | null;
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
  stage5?: Stage5Output;
  stage6?: Stage6Output;
  stage7?: Stage7Output;
  stage8?: Stage8Output;
  stage9?: Stage9Output;
  stage10?: Stage10Output;
  stage11?: Stage11Output;
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
 * Executes a stage call with two retries on parse, validation, or refusal failure.
 * First retry prepends a schema-reminder; second retry prepends a stronger JSON-only demand.
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
  const secondRetryPrefix =
    "Your previous response was not valid JSON. You MUST respond with ONLY a valid JSON object. " +
    "No text before or after. No apologies. No explanations. Just the JSON object matching the schema.\n\n";

  const refusalPhrases = [
    "I can't assist",
    "I'm unable to",
    "I cannot help",
    "I'm sorry, but I can't",
    "I can't help with",
  ];

  let lastError: unknown;

  for (let attempt = 0; attempt < 3; attempt++) {
    let effectivePrompt = userPrompt;
    if (attempt === 1) effectivePrompt = retryPrefix + userPrompt;
    if (attempt === 2) effectivePrompt = secondRetryPrefix + userPrompt;
    try {
      const raw = await model.analyzeFrames(systemPrompt, effectivePrompt, frames);
      if (refusalPhrases.some((phrase) => raw.includes(phrase))) {
        console.warn(`  [${stageLabel}] Refusal detected, retrying...`);
        throw new Error(`${stageLabel}: Model refused to respond`);
      }
      return validateAndNormalize(raw);
    } catch (err) {
      lastError = err;
      if (attempt === 0) {
        console.log(`  [${stageLabel}] Response invalid, retrying once...`);
      } else if (attempt === 1) {
        console.log(`  [${stageLabel}] Response invalid again, retrying (attempt 3)...`);
      }
    }
  }

  throw lastError;
}
