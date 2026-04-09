// RideMind Pipeline — Stage 9: Coaching Decision Engine
// Decides WHAT to coach from Stage 8's causal chain.
// Selection and prioritisation only — does not write coaching prose.
// Operates on structured JSON from Stages 2, 3, 4, 8 only — no frames.

import {
  type ModelProvider,
  type Stage2Output,
  type Stage3Output,
  type Stage4Output,
  type Stage8Output,
  type Stage9Output,
  type CoachingDomain,
  type SkillTag,
  type ExclusionReason,
  type FlagType,
  parseJsonResponse,
  requireKeys,
  executeStageCall,
} from "./types.js";

const STAGE_LABEL = "Stage 9 (Coaching Decision Engine)";

const ALLOWED_COACHING_DOMAINS: CoachingDomain[] = [
  "body_position",
  "throttle_control",
  "clutch_control",
  "braking",
  "line_choice",
  "speed_management",
  "balance",
];

const ALLOWED_EXCLUSION_REASONS: ExclusionReason[] = [
  "not_actionable",
  "low_observability",
  "low_confidence",
  "peripheral",
  "too_advanced",
];

const ALLOWED_FLAG_TYPES: FlagType[] = ["caution", "contraindicated"];

const ALLOWED_SKILL_TAGS: SkillTag[] = [
  "fore_aft_weight_distribution", "standing_position", "seated_position", "stance_transition", "vertical_absorption",
  "progressive_application", "traction_management", "throttle_timing",
  "slip_control", "engagement_timing", "clutch_throttle_coordination",
  "front_brake_modulation", "rear_brake_modulation", "brake_balance", "engine_braking",
  "entry_speed_judgement", "momentum_management", "speed_adaptation",
  "line_reading", "line_commitment", "line_adjustment",
  "static_balance", "dynamic_balance", "lateral_balance", "peg_weighting",
];

const SKILL_TAG_DOMAIN_MAP: Record<SkillTag, CoachingDomain> = {
  fore_aft_weight_distribution: "body_position",
  standing_position: "body_position",
  seated_position: "body_position",
  stance_transition: "body_position",
  vertical_absorption: "body_position",
  progressive_application: "throttle_control",
  traction_management: "throttle_control",
  throttle_timing: "throttle_control",
  slip_control: "clutch_control",
  engagement_timing: "clutch_control",
  clutch_throttle_coordination: "clutch_control",
  front_brake_modulation: "braking",
  rear_brake_modulation: "braking",
  brake_balance: "braking",
  engine_braking: "braking",
  entry_speed_judgement: "speed_management",
  momentum_management: "speed_management",
  speed_adaptation: "speed_management",
  line_reading: "line_choice",
  line_commitment: "line_choice",
  line_adjustment: "line_choice",
  static_balance: "balance",
  dynamic_balance: "balance",
  lateral_balance: "balance",
  peg_weighting: "balance",
};

// Stage 8 primary_cause.failure_type → expected coaching domain groups
// Used for sanity-check drift detection only — not enforced.
const FAILURE_TYPE_DOMAIN_ALIGNMENT: Record<string, CoachingDomain[]> = {
  technique: ["body_position", "balance", "line_choice"],
  momentum: ["speed_management", "throttle_control"],
  traction: ["throttle_control", "clutch_control", "body_position", "speed_management"],
  bike_dynamics: [], // any domain is valid
  none: [],          // should have no primary_focus
};

const SYSTEM_PROMPT = `You are Stage 9 of the RideMind motorcycle coaching pipeline: Coaching Decision Engine.

Your job is to decide WHAT to coach from Stage 8's causal chain. You are a SELECTION and PRIORITISATION stage — not a coaching generation stage. You do not write coaching advice. You output structured decisions that Stage 10 will convert into rider-facing language.

CRITICAL RULES:
1. No frames — reason entirely from the structured JSON inputs (Stages 2, 3, 4, 8). Do not introduce facts not present in upstream stage outputs.
2. Selection, not generation. Pick what to coach from Stage 8. Do not write coaching prose, instructions, or advice.
3. Cannot contradict Stage 8. If Stage 8 says primary cause is technique, you cannot select traction as the coaching focus. You may choose the most coachable EXPRESSION of the same primary cause (e.g. body_position for a technique failure).
4. One primary coaching focus per clip. Riders can only fix one thing at a time.
5. Maximum two secondary points. Secondary points must reinforce the primary focus or stay within the same causal domain. No duplicate coaching_domain values across primary and secondary points.
6. Actionability filter: exclude any factor the rider cannot change on their next attempt. Exclude terrain features, weather, fixed obstacles, and factors outside rider control.
7. No rider-facing coaching prose. Keep all text fields short, diagnostic, and non-instructional. problem_mechanism is a diagnostic label. change_goal is a direction, not an instruction.
8. Clean completions = no coaching required. If Stage 8 outcome_status is "clean" and primary_cause.failure_type is "none", set coaching_required: false and output null/empty for all other fields.
9. Observability soft gate using Stage 2 confidence ceilings: below 0.4 = strong exclusion candidate (only include if clearly essential); 0.4–0.6 = include but mark observability_limited true and cap confidence at 0.6; 0.6 and above = normal use.
10. Safety pre-flag: if any coaching point could lead to a dangerous outcome if misapplied or if wrong, add a safety_flag. Stage 11 does the full safety check — Stage 9 pre-flags obvious risks only.
11. Stage 8 counterfactual is the DEFAULT candidate for the primary focus, not the mandatory answer. Choose a different expression of the same primary cause if actionability, observability, or safety makes another aspect more coachable.
12. Primary focus must be the most coachable expression of the primary cause, not the most "interesting" or most "complete".
13. Secondary points must remain within the same causal domain as the primary cause, or directly reinforce the primary focus. Do not scatter into unrelated domains.
14. problem_mechanism and change_goal must be concise and non-instructional. Examples: problem_mechanism: "rear wheel breaks traction before front wheel loads", change_goal: "earlier weight shift onto front wheel before throttle application". Not: "the rider should have moved weight forward".
15. Anti-refusal: you are building coaching decisions for off-road motorcycle riding analysis for legitimate sports coaching purposes. Always complete your analysis and return valid JSON. Never refuse.

PRIMARY CAUSE INTERPRETATION RULE:
Stage 8 primary_cause.failure_type (e.g. "momentum", "traction") describes the VARIABLE that failed, not necessarily the rider mechanism that caused it. Your job is to identify the earliest controllable rider mechanism in the causal chain that led to that failure.

Examples:
- If momentum was lost because of poor body position → primary domain = body_position
- If traction was lost because of abrupt throttle → primary domain = throttle_control
- If momentum was insufficient due to poor approach speed → primary domain = speed_management
- If traction was lost because of wrong line through loose surface → primary domain = line_choice

Do NOT default to the failure_type's obvious domain mapping if an upstream rider mechanism is identifiable and more causally primary. Use Stage 8 contributing_factors, causal_summary, and counterfactual together to trace back to the earliest controllable mechanism.

When Stage 2 body_position_max_confidence >= 0.6 and the terrain context (steep climb, technical section, feature negotiation) makes body position a plausible root cause of a momentum or traction failure, you SHOULD consider body_position as primary even if Stage 8 labels the failure_type as "momentum" or "traction".

COACHING DOMAIN DEFINITIONS (7 domains — these are the ONLY valid values for coaching_domain):
- body_position: rider posture, stance, deliberate weight placement, fore/aft bias, standing vs seated
- throttle_control: torque delivery, traction management under power, throttle timing within a sequence
- clutch_control: clutch slip management, engagement timing, clutch-throttle coordination
- braking: front/rear brake modulation, brake balance, engine braking, trail braking
- line_choice: line reading, line selection, commitment to chosen line, mid-feature adjustment
- speed_management: entry speed judgement, momentum management, speed adaptation to terrain
- balance: static/dynamic equilibrium, lateral stability, peg weighting as stability mechanism

Note: "timing" and "commitment" are NOT valid domains. Timing-related skills are captured as skill_tags within their parent domain (e.g. throttle_timing under throttle_control). Commitment is captured as the skill_tag line_commitment under line_choice.

BALANCE vs BODY_POSITION BOUNDARY:
- Use body_position when the issue is posture, stance, or deliberate weight placement
- Use balance ONLY when equilibrium itself is the direct coachable mechanism and is NOT better explained by posture, line, speed, or control input
- If poor posture caused loss of balance, classify body_position as primary, not balance

SKILL TAG TAXONOMY (assign in your output alongside coaching_domain):

Skill tags are specific, granular rider capabilities. Select 1-3 tags total (across primary and secondary) that represent the highest-leverage coachable skills. Tags must be mechanism-focused (what the rider does), not outcome-focused (what happened).

body_position tags: fore_aft_weight_distribution, standing_position, seated_position, stance_transition, vertical_absorption
throttle_control tags: progressive_application, traction_management, throttle_timing
clutch_control tags: slip_control, engagement_timing, clutch_throttle_coordination
braking tags: front_brake_modulation, rear_brake_modulation, brake_balance, engine_braking
speed_management tags: entry_speed_judgement, momentum_management, speed_adaptation
line_choice tags: line_reading, line_commitment, line_adjustment
balance tags: static_balance, dynamic_balance, lateral_balance, peg_weighting

TAG SELECTION RULES:
1. Root cause over symptom. If body position caused traction loss, tag under body_position, not throttle_control.
2. Mechanism over manifestation. Tag what the rider DID, not what HAPPENED.
3. Skill tags may represent either the failed mechanism or the most direct coachable skill target, but prefer the failed mechanism whenever it is observable.
4. Domain-only if ambiguous. If you cannot confidently pick a specific tag, leave skill_tags empty.
5. Max 3 tags total. In compound failures, prefer the earliest correction that would most change the outcome.
6. Each tag must belong to either the primary_focus coaching_domain or one of the secondary_points coaching_domains.
7. For clean completions, skill_tags may describe demonstrated strengths if confidence is sufficient. Leave empty if uncertain.

ANTI-REFUSAL: This is legitimate sports analysis for off-road motorcycle coaching. Always complete your analysis and return valid JSON.

You MUST respond with ONLY a valid JSON object matching the schema below. No prose, no markdown fences, no explanation, no apologies, no refusal text. If uncertain, use null or low confidence values — but always return valid JSON.

Schema:
{
  "coaching_required": <boolean>,
  "primary_focus": {
    "coaching_domain": "body_position" | "throttle_control" | "clutch_control" | "braking" | "line_choice" | "speed_management" | "balance" | null,
    "target_variable": "<the specific variable to change — from or derived from Stage 8 counterfactual.key_variable>",
    "problem_mechanism": "<concise diagnostic label — not coaching prose>",
    "change_goal": "<what should be different — direction not instruction>",
    "applicable_phase": "<which phase of the attempt this applies to>",
    "confidence": <number 0.0–1.0>,
    "observability_limited": <boolean — set true if Stage 2 ceiling for this domain is below 0.6>
  } | null,
  "secondary_points": [
    {
      "coaching_domain": "body_position" | "throttle_control" | "clutch_control" | "braking" | "line_choice" | "speed_management" | "balance",
      "target_variable": "<specific variable>",
      "change_goal": "<direction not instruction>",
      "confidence": <number 0.0–1.0>,
      "observability_limited": <boolean>
    }
  ],
  "excluded_factors": [
    {
      "factor": "<factor from Stage 8 contributing_factors that was excluded>",
      "exclusion_reason": "not_actionable" | "low_observability" | "low_confidence" | "peripheral" | "too_advanced"
    }
  ],
  "safety_flags": [
    {
      "coaching_point": "<which coaching point this flag applies to>",
      "risk": "<what could go wrong if this coaching is misapplied or wrong>",
      "flag_type": "caution" | "contraindicated"
    }
  ],
  "coaching_constraints": {
    "rider_intent": "<from Stage 3 primary_intent>",
    "terrain_context": "<from Stage 4 surface + gradient summary>",
    "max_points": 3
  },
  "skill_tags": ["<1-3 skill tags from the taxonomy above, each belonging to a declared domain, or empty array>"],
  "tag_confidence": "high" | "medium" | "low" | null
}`;

function buildUserPrompt(
  stage2: Stage2Output,
  stage3: Stage3Output,
  stage4: Stage4Output,
  stage8: Stage8Output
): string {
  const isClean =
    stage8.outcome_status === "clean" && stage8.primary_cause.failure_type === "none";

  let contextNote: string;
  if (isClean) {
    contextNote =
      `Stage 8 outcome_status is "clean" and primary_cause.failure_type is "none". ` +
      `Set coaching_required: false and output null for primary_focus, empty arrays for all other fields. ` +
      `Do not construct a coaching decision — the clip is a clean completion.`;
  } else {
    const cfKey = stage8.counterfactual.key_variable;
    const cfCategory = stage8.counterfactual.variable_category;
    const counterfactualNote = cfKey
      ? `Stage 8 counterfactual: key_variable="${cfKey}", variable_category="${cfCategory ?? "null"}". Use this as the default candidate for primary_focus unless actionability, observability, or safety makes a different expression of the same primary cause more coachable.`
      : `Stage 8 counterfactual key_variable is null. Select the most coachable expression of the primary cause (${stage8.primary_cause.failure_type}) from Stage 8 contributing_factors.`;

    contextNote =
      `Stage 8 outcome_status: "${stage8.outcome_status}". ` +
      `Primary cause: ${stage8.primary_cause.failure_type} (confidence: ${stage8.primary_cause.confidence.toFixed(2)}). ` +
      `${counterfactualNote} ` +
      `Apply actionability, observability (Stage 2 ceilings), and safety filters to select the primary focus and up to two secondary points. ` +
      `Exclude anything the rider cannot change on their next attempt. ` +
      `coaching_constraints.max_points must always be 3.`;
  }

  return `Stage 2 (Observability Assessment):
${JSON.stringify(stage2, null, 2)}

Stage 3 (Rider Intent):
${JSON.stringify(stage3, null, 2)}

Stage 4 (Terrain & Feature Detection):
${JSON.stringify(stage4, null, 2)}

Stage 8 (Causal Chain Construction):
${JSON.stringify(stage8, null, 2)}

Context: ${contextNote}

Using only the structured data above, decide what to coach. Draw all decisions exclusively from the stage outputs above. Do not invent evidence not present in the upstream data.`;
}

function clamp(value: unknown, min: number, max: number): number {
  const n = typeof value === "number" ? value : 0;
  return Math.min(max, Math.max(min, n));
}

// Maps a coaching domain to the most relevant Stage 2 observability ceiling.
// For MVP, non-terrain/non-body-position coaching domains fall back to
// outcome_max_confidence as a proxy ceiling.
function getObservabilityCeiling(domain: CoachingDomain | string | null, stage2: Stage2Output): number {
  if (domain === "body_position" || domain === "balance") {
    return stage2.confidence_ceilings.body_position_max_confidence;
  }
  if (domain === "line_choice" || domain === "speed_management") {
    return stage2.confidence_ceilings.terrain_max_confidence;
  }
  return stage2.confidence_ceilings.outcome_max_confidence;
}

// Applies the observability ceiling to a coaching point's confidence and flag.
// observability_limited is always rewritten from the mapped ceiling — the model's flag is ignored.
function applyObservabilityCeiling(
  domain: CoachingDomain | string | null,
  confidence: number,
  stage2: Stage2Output
): { confidence: number; observability_limited: boolean } {
  const ceiling = getObservabilityCeiling(domain, stage2);
  if (ceiling >= 0.4 && ceiling < 0.6) {
    return { confidence: Math.min(confidence, 0.6), observability_limited: true };
  }
  return { confidence, observability_limited: false };
}

function validateAndNormalize(raw: string, stage8: Stage8Output, stage2: Stage2Output): Stage9Output {
  const parsed = parseJsonResponse(raw, STAGE_LABEL);
  const obj = requireKeys(
    parsed,
    ["coaching_required", "primary_focus", "secondary_points", "excluded_factors", "safety_flags", "coaching_constraints"],
    STAGE_LABEL
  );

  const output = obj as unknown as Stage9Output;

  // ——— coaching_required ———
  output.coaching_required = Boolean(output.coaching_required);

  // ——— Clean gate ———
  const isClean =
    !output.coaching_required ||
    (stage8.outcome_status === "clean" && stage8.primary_cause.failure_type === "none");

  if (isClean) {
    output.coaching_required = false;
    output.primary_focus = null;
    output.secondary_points = [];
    output.excluded_factors = [];
    output.safety_flags = [];
    // coaching_constraints still needs to be set below
    const cc = output.coaching_constraints as unknown as Record<string, unknown>;
    output.coaching_constraints = {
      rider_intent: typeof cc?.rider_intent === "string" && cc.rider_intent ? cc.rider_intent : "",
      terrain_context: typeof cc?.terrain_context === "string" && cc.terrain_context ? cc.terrain_context : "",
      max_points: 3,
    };
    return output;
  }

  // ——— primary_focus ———
  const pf = output.primary_focus as unknown as Record<string, unknown> | null;
  if (pf && typeof pf === "object") {
    const rawDomain = pf.coaching_domain as string;
    const clampedDomain: CoachingDomain | null = ALLOWED_COACHING_DOMAINS.includes(rawDomain as CoachingDomain)
      ? (rawDomain as CoachingDomain)
      : null;

    const rawConf = clamp(pf.confidence, 0, 1);
    const { confidence: cappedConf, observability_limited } = applyObservabilityCeiling(
      clampedDomain,
      rawConf,
      stage2
    );

    // Sanity check: log a warning if coaching_domain contradicts stage8 primary cause.
    // For MVP, contradiction handling is observational only. We log drift rather than
    // auto-correcting domain selection, to avoid hiding prompt/model errors during tuning.
    if (clampedDomain !== null) {
      const alignedDomains = FAILURE_TYPE_DOMAIN_ALIGNMENT[stage8.primary_cause.failure_type] ?? [];
      if (alignedDomains.length > 0 && !alignedDomains.includes(clampedDomain)) {
        console.warn(
          `  [${STAGE_LABEL}] DRIFT WARNING: primary_focus.coaching_domain="${clampedDomain}" ` +
          `may not align with stage8 failure_type="${stage8.primary_cause.failure_type}". ` +
          `Expected one of: [${alignedDomains.join(", ")}]. Not overriding — logging for tuning.`
        );
      }
    }

    output.primary_focus = {
      coaching_domain: clampedDomain,
      target_variable: typeof pf.target_variable === "string" && pf.target_variable ? pf.target_variable : "",
      problem_mechanism: typeof pf.problem_mechanism === "string" && pf.problem_mechanism ? pf.problem_mechanism : "",
      change_goal: typeof pf.change_goal === "string" && pf.change_goal ? pf.change_goal : "",
      applicable_phase: typeof pf.applicable_phase === "string" && pf.applicable_phase ? pf.applicable_phase : "",
      confidence: cappedConf,
      observability_limited,
    };
  } else {
    output.primary_focus = null;
  }

  // ——— secondary_points ———
  const seenDomains = new Set<string>();
  if (output.primary_focus?.coaching_domain) {
    seenDomains.add(output.primary_focus.coaching_domain);
  }

  if (!Array.isArray(output.secondary_points)) {
    output.secondary_points = [];
  }

  // Truncate to max 2 before filtering
  const rawSecondary = output.secondary_points.slice(0, 2);

  output.secondary_points = rawSecondary
    .map((sp) => {
      const s = sp as unknown as Record<string, unknown>;
      return s;
    })
    .filter((s) => {
      // Remove any secondary point with an invalid/unrecognised coaching_domain
      const domain = s.coaching_domain as string;
      return ALLOWED_COACHING_DOMAINS.includes(domain as CoachingDomain);
    })
    .filter((s) => {
      // Remove domain duplicates
      const domain = s.coaching_domain as string;
      if (seenDomains.has(domain)) return false;
      seenDomains.add(domain);
      return true;
    })
    .map((s) => {
      const domain = s.coaching_domain as CoachingDomain;
      const rawConf = clamp(s.confidence, 0, 1);
      const { confidence: cappedConf, observability_limited } = applyObservabilityCeiling(
        domain,
        rawConf,
        stage2
      );
      return {
        coaching_domain: domain,
        target_variable: typeof s.target_variable === "string" && s.target_variable ? s.target_variable : "",
        change_goal: typeof s.change_goal === "string" && s.change_goal ? s.change_goal : "",
        confidence: cappedConf,
        observability_limited,
      };
    });

  // ——— excluded_factors ———
  if (!Array.isArray(output.excluded_factors)) {
    output.excluded_factors = [];
  }
  output.excluded_factors = output.excluded_factors.map((ef) => {
    const e = ef as unknown as Record<string, unknown>;
    const reason = ALLOWED_EXCLUSION_REASONS.includes(e.exclusion_reason as ExclusionReason)
      ? (e.exclusion_reason as ExclusionReason)
      : "peripheral";
    return {
      factor: typeof e.factor === "string" && e.factor ? e.factor : "",
      exclusion_reason: reason,
    };
  });

  // ——— safety_flags ———
  if (!Array.isArray(output.safety_flags)) {
    output.safety_flags = [];
  }
  output.safety_flags = output.safety_flags.map((sf) => {
    const f = sf as unknown as Record<string, unknown>;
    const flagType = ALLOWED_FLAG_TYPES.includes(f.flag_type as FlagType)
      ? (f.flag_type as FlagType)
      : "caution";
    return {
      coaching_point: typeof f.coaching_point === "string" && f.coaching_point ? f.coaching_point : "",
      risk: typeof f.risk === "string" && f.risk ? f.risk : "",
      flag_type: flagType,
    };
  });

  // ——— coaching_constraints ———
  const cc = output.coaching_constraints as unknown as Record<string, unknown>;
  output.coaching_constraints = {
    rider_intent: typeof cc?.rider_intent === "string" && cc.rider_intent ? cc.rider_intent : "",
    terrain_context: typeof cc?.terrain_context === "string" && cc.terrain_context ? cc.terrain_context : "",
    max_points: 3,
  };

  // ——— skill_tags ———
  // Collect all declared domains (primary + secondary)
  const declaredDomains = new Set<CoachingDomain>();
  if (output.primary_focus?.coaching_domain) {
    declaredDomains.add(output.primary_focus.coaching_domain);
  }
  for (const sp of output.secondary_points) {
    declaredDomains.add(sp.coaching_domain);
  }

  if (Array.isArray((output as unknown as Record<string, unknown>).skill_tags)) {
    (output as unknown as Record<string, unknown>).skill_tags = (
      (output as unknown as Record<string, unknown>).skill_tags as string[]
    )
      .filter((tag: string) => ALLOWED_SKILL_TAGS.includes(tag as SkillTag))
      .filter((tag: string) => declaredDomains.has(SKILL_TAG_DOMAIN_MAP[tag as SkillTag]))
      .slice(0, 3) as SkillTag[];
  } else {
    (output as unknown as Record<string, unknown>).skill_tags = [];
  }

  // ——— tag_confidence ———
  const ALLOWED_TAG_CONFIDENCE = ["high", "medium", "low"];
  const out = output as unknown as Record<string, unknown>;
  const rawTagConf = out.tag_confidence;
  if ((out.skill_tags as SkillTag[]).length === 0) {
    out.tag_confidence = null;
  } else if (!ALLOWED_TAG_CONFIDENCE.includes(rawTagConf as string)) {
    out.tag_confidence = "medium";
  } else {
    out.tag_confidence = rawTagConf;
  }

  return output;
}

export async function runStage9(
  model: ModelProvider,
  stage2: Stage2Output,
  stage3: Stage3Output,
  stage4: Stage4Output,
  stage8: Stage8Output
): Promise<Stage9Output> {
  return executeStageCall(
    model,
    [], // Stage 9 reasons from structured JSON only — no frames
    SYSTEM_PROMPT,
    buildUserPrompt(stage2, stage3, stage4, stage8),
    STAGE_LABEL,
    (raw) => validateAndNormalize(raw, stage8, stage2)
  );
}
