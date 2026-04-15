// RideMind Pipeline — Stage 0: Observability Gate
// Hard gate: determines whether a clip is usable before burning tokens on 11 reasoning stages.
// Uses claude-sonnet-4-6 via the standard ModelProvider interface (MVP path: Route A only).

import {
  type ModelProvider,
  type Stage0Input,
  type Stage0Output,
  type Stage0FailureMode,
  parseJsonResponse,
  requireKeys,
  executeStageCall,
} from "./types";

// ————————————————————————————————————————————
// Prompts
// ————————————————————————————————————————————

const SYSTEM_PROMPT = `You are a video clip usability assessor for an AI motorcycle coaching platform called RideMind.

Your job is to determine whether a submitted video clip is usable for coaching analysis before any processing begins. You are NOT performing coaching, terrain analysis, technique assessment, or camera perspective analysis. Your only question is: "Is there enough here to analyse?"

You assess clips coarsely and quickly. You look for:
- Whether a motorcycle and rider are visible at all
- Whether the primary subject is motorcycle riding activity
- Whether visibility conditions allow any meaningful observation
- Whether footage quality meets the minimum bar for downstream analysis

You do NOT:
- Identify specific terrain features
- Assess camera perspective or mount type in detail
- Evaluate riding technique or quality
- Reference skill tags, failure types, or coaching domains

Be conservative with fail decisions. If a clip is borderline usable, classify it as degraded rather than failing it. Degraded clips still get analysed with constrained trust. Only fail clips that would produce zero useful analysis.

You MUST respond with ONLY a valid JSON object. No text before or after. No markdown. No explanations.`;

function buildUserPrompt(meta: Stage0Input["metadata"]): string {
  return `Assess this video clip for observability gate classification.

Video metadata:
- Filename: ${meta.filename}
- Duration: ${meta.duration_seconds.toFixed(1)}s
- Resolution: ${meta.resolution.width}x${meta.resolution.height}
- FPS: ${meta.fps.toFixed(1)}
- File size: ${(meta.file_size_bytes / 1024 / 1024).toFixed(1)} MB

Review all provided frames carefully.

Return a JSON object matching this exact schema:

{
  "stage": "observability_gate",
  "gate": "pass" | "fail" | "degrade",
  "failure_mode": null | "unusable_no_content" | "unusable_no_riding" | "unusable_distance" | "unusable_obstruction" | "unusable_motion" | "degraded_low_visibility" | "degraded_short_duration" | "degraded_low_resolution",
  "observability": null | {
    "primary_subject_detected": "rider" | "bike" | "both" | "none",
    "rider_visibility": "clear" | "partial" | "minimal" | "none",
    "terrain_visibility": "clear" | "partial" | "minimal" | "none",
    "outcome_observability": "clear" | "partial" | "ambiguous" | "not_visible",
    "motion_quality": "stable" | "moderate_shake" | "severe_shake" | "unusable",
    "frame_usability_ratio": <number 0.0-1.0>
  },
  "confidence_ceilings": null | {
    "max_observation_confidence": <number 0.0-1.0>,
    "max_coaching_specificity": "full" | "general" | "cautious_only"
  },
  "user_guidance": {
    "message": "<human-readable explanation of the gate decision>",
    "filming_tips": ["<specific improvement suggestion>", ...],
    "retry_recommended": <boolean>
  },
  "metrics": {
    "failure_mode": null | "<same value as failure_mode>",
    "gate": "<same value as gate>",
    "frame_usability_ratio": <number 0.0-1.0>,
    "outcome_observability": "clear" | "partial" | "ambiguous" | "not_visible"
  },
  "debug": {
    "reasoning": "<your reasoning for the gate decision>",
    "confidence_factors": ["<factor>", ...]
  }
}

GATE DECISION RULES:
- gate="fail": Only when the clip is fundamentally unusable — no content, no riding activity visible, rider completely invisible, motion completely uninterpretable, or camera view completely blocked.
- gate="degrade": When the clip has significant quality issues but still shows riding activity. REQUIRED: max_observation_confidence <= 0.5 AND max_coaching_specificity must NOT be "full".
- gate="pass": Clip shows clear riding activity with acceptable visibility. max_coaching_specificity="full" only when visibility is genuinely good.

FAILURE MODE RULES:
- "unusable_no_content": Black frames, corrupted video, static image, test pattern — no video content at all.
- "unusable_no_riding": Video content visible but no motorcycle or rider detected anywhere.
- "unusable_distance": Rider or bike visible but so far away that no observation is extractable.
- "unusable_obstruction": Camera view mostly blocked throughout — lens cover, severe sustained fog/rain, or persistent object blocking the frame.
- "unusable_motion": Shake or blur so severe that no individual frame is interpretable.
- "degraded_low_visibility": Usable but darkness, weather, or distance significantly impairs visibility.
- "degraded_short_duration": Less than ~2 seconds of riding — insufficient for sequence analysis. Check metadata duration. This is the correct mode if duration_seconds < 2.0.
- "degraded_low_resolution": Resolution so low that fine detail (body position, controls) is not discernible.

FIELD RULES:
- When gate="fail": set observability=null AND confidence_ceilings=null.
- When gate="pass" or gate="degrade": populate both observability and confidence_ceilings.
- failure_mode must be null when gate="pass".
- failure_mode must be set when gate="fail" or gate="degrade".

COACHING SPECIFICITY MAPPING (for degrade cases):
- degraded_low_visibility → max_coaching_specificity="general"
- degraded_short_duration → max_coaching_specificity="cautious_only"
- degraded_low_resolution → max_coaching_specificity="general"

Return ONLY the JSON object.`;
}

// ————————————————————————————————————————————
// Validation & normalisation
// ————————————————————————————————————————————

const VALID_GATES = new Set(["pass", "fail", "degrade"]);
const VALID_FAILURE_MODES = new Set<string>([
  "unusable_no_content",
  "unusable_no_riding",
  "unusable_distance",
  "unusable_obstruction",
  "unusable_motion",
  "degraded_low_visibility",
  "degraded_short_duration",
  "degraded_low_resolution",
]);
const VALID_SPECIFICITY = new Set(["full", "general", "cautious_only"]);

function normalizeStage0(raw: string): Stage0Output {
  const parsed = parseJsonResponse(raw, "Stage0");
  const obj = requireKeys(
    parsed,
    ["stage", "gate", "user_guidance", "metrics", "debug"],
    "Stage0"
  );

  // Clamp and validate gate
  const gate = String(obj["gate"] ?? "fail");
  if (!VALID_GATES.has(gate)) {
    throw new Error(`Stage0: invalid gate value "${gate}"`);
  }

  // Validate failure_mode
  const rawFailureMode = obj["failure_mode"];
  const failure_mode: Stage0FailureMode | null =
    rawFailureMode === null || rawFailureMode === undefined
      ? null
      : VALID_FAILURE_MODES.has(String(rawFailureMode))
        ? (rawFailureMode as Stage0FailureMode)
        : null;

  // For gate=fail, force null on downstream fields
  if (gate === "fail") {
    const user_guidance = (obj["user_guidance"] ?? {}) as Stage0Output["user_guidance"];
    const metrics = (obj["metrics"] ?? {}) as Record<string, unknown>;
    const debug = (obj["debug"] ?? {}) as Stage0Output["debug"];

    return {
      stage: "observability_gate",
      gate: "fail",
      failure_mode,
      observability: null,
      confidence_ceilings: null,
      user_guidance: {
        message: String(user_guidance?.message ?? "This clip cannot be analysed."),
        filming_tips: Array.isArray(user_guidance?.filming_tips) ? user_guidance.filming_tips : [],
        retry_recommended: Boolean(user_guidance?.retry_recommended ?? true),
      },
      metrics: {
        failure_mode,
        gate: "fail",
        frame_usability_ratio: Number(metrics["frame_usability_ratio"] ?? 0),
        outcome_observability: (metrics["outcome_observability"] as Stage0Output["metrics"]["outcome_observability"]) ?? "not_visible",
      },
      debug: {
        reasoning: String(debug?.reasoning ?? ""),
        confidence_factors: Array.isArray(debug?.confidence_factors) ? debug.confidence_factors : [],
      },
    };
  }

  // For gate=pass/degrade: parse observability and confidence_ceilings
  const rawObs = (obj["observability"] ?? null) as Record<string, unknown> | null;
  type ObsMap = NonNullable<Stage0Output["observability"]>;
  const observability: Stage0Output["observability"] = rawObs
    ? {
        primary_subject_detected: (rawObs["primary_subject_detected"] as ObsMap["primary_subject_detected"]) ?? "none",
        rider_visibility: (rawObs["rider_visibility"] as ObsMap["rider_visibility"]) ?? "none",
        terrain_visibility: (rawObs["terrain_visibility"] as ObsMap["terrain_visibility"]) ?? "none",
        outcome_observability: (rawObs["outcome_observability"] as ObsMap["outcome_observability"]) ?? "not_visible",
        motion_quality: (rawObs["motion_quality"] as ObsMap["motion_quality"]) ?? "stable",
        frame_usability_ratio: Math.min(1, Math.max(0, Number(rawObs["frame_usability_ratio"] ?? 0.5))),
      }
    : null;

  const rawCeil = (obj["confidence_ceilings"] ?? null) as Record<string, unknown> | null;
  let ceilings: Stage0Output["confidence_ceilings"] = rawCeil
    ? {
        max_observation_confidence: Math.min(1, Math.max(0, Number(rawCeil["max_observation_confidence"] ?? 0.5))),
        max_coaching_specificity: VALID_SPECIFICITY.has(String(rawCeil["max_coaching_specificity"]))
          ? (rawCeil["max_coaching_specificity"] as "full" | "general" | "cautious_only")
          : "general",
      }
    : null;

  // Enforce degrade invariants: max_observation_confidence <= 0.5, specificity != "full"
  if (gate === "degrade" && ceilings) {
    ceilings.max_observation_confidence = Math.min(ceilings.max_observation_confidence, 0.5);
    if (ceilings.max_coaching_specificity === "full") {
      ceilings.max_coaching_specificity = "general";
    }
  }

  const user_guidance = (obj["user_guidance"] ?? {}) as Stage0Output["user_guidance"];
  const metrics = (obj["metrics"] ?? {}) as Record<string, unknown>;
  const debug = (obj["debug"] ?? {}) as Stage0Output["debug"];

  const frameUsabilityRatio = observability?.frame_usability_ratio ?? Number(metrics["frame_usability_ratio"] ?? 0.5);

  return {
    stage: "observability_gate",
    gate: gate as "pass" | "degrade",
    failure_mode,
    observability,
    confidence_ceilings: ceilings,
    user_guidance: {
      message: String(user_guidance?.message ?? ""),
      filming_tips: Array.isArray(user_guidance?.filming_tips) ? user_guidance.filming_tips : [],
      retry_recommended: Boolean(user_guidance?.retry_recommended ?? false),
    },
    metrics: {
      failure_mode,
      gate: gate as "pass" | "degrade",
      frame_usability_ratio: frameUsabilityRatio,
      outcome_observability: (observability?.outcome_observability ?? metrics["outcome_observability"] as Stage0Output["metrics"]["outcome_observability"]) ?? "ambiguous",
    },
    debug: {
      reasoning: String(debug?.reasoning ?? ""),
      confidence_factors: Array.isArray(debug?.confidence_factors) ? debug.confidence_factors : [],
    },
  };
}

// ————————————————————————————————————————————
// Stage 10 coaching specificity constraint
// ————————————————————————————————————————————

/**
 * Returns a constraint instruction block to inject into the Stage 10 user prompt,
 * based on the Stage 0 max_coaching_specificity value.
 *
 * Returns null when gate=pass with max_coaching_specificity="full" (no constraint needed).
 *
 * Import this in stage10-coaching-generation.ts and inject into buildUserPrompt.
 */
export function buildCoachingSpecificityConstraint(
  stage0: Stage0Output | undefined
): string | null {
  const specificity = stage0?.confidence_ceilings?.max_coaching_specificity;

  if (!specificity || specificity === "full") return null;

  if (specificity === "cautious_only") {
    return `STAGE 0 COACHING CONSTRAINT — max_coaching_specificity=cautious_only
Clip visibility is significantly limited. You MUST apply ALL of the following:
- Do NOT recommend increased speed or commitment levels under any framing
- Do NOT suggest aggressive technique changes
- Begin rider_facing_summary and technical_coach_note with an observability caveat
  (e.g. "Based on what I can see in this clip..." or "From the available footage...")
- Use hedged language throughout all text fields: "it appears", "if this is correct",
  "from what is visible", "likely" — do not assert faults as confirmed facts
- uncertainty_statement is REQUIRED regardless of the observability_limited flag
- Reduce coaching confidence proportionally to observability quality`;
  }

  // specificity === "general"
  return `STAGE 0 COACHING CONSTRAINT — max_coaching_specificity=general
Clip quality limits fine-detail observation. You MUST apply ALL of the following:
- Do NOT reference specific body position detail: hand position, lever fingers, elbow angle,
  knee position, exact foot placement, or any named joint/limb micro-fault
- Do NOT make micro-correction suggestions
- Keep all coaching at broad mechanism and principle level
- Use principle-level wording: "weight distribution", "body position timing",
  "throttle management", "balance over the footpegs" — not "your outside elbow dropped"
- Fine-detail drills (e.g. specific hand/finger exercises) are not appropriate here`;
}

// ————————————————————————————————————————————
// Entry point
// ————————————————————————————————————————————

/**
 * Runs Stage 0 — Observability Gate.
 * Uses the standard ModelProvider interface (claude-sonnet-4-6 for MVP Route A).
 * Returns Stage0Output with gate="pass", "fail", or "degrade".
 */
export async function runStage0(
  model: ModelProvider,
  input: Stage0Input
): Promise<Stage0Output> {
  return executeStageCall(
    model,
    input.frames,
    SYSTEM_PROMPT,
    buildUserPrompt(input.metadata),
    "Stage0",
    normalizeStage0
  );
}
