// enduroSafetyRules.js

function evaluateSafety(contextPack, coachingOutput) {
  const violations = [];

  const allowedClaimTypes = new Set([
    "terrain",
    "momentum",
    "body_position",
    "visible_corrections",
    "instability_signals",
    "line_choice",
    "throttle_pattern",
    "clutch_usage",
    "braking_pattern",
    "outcome"
  ]);

  const disallowedClaimTypes = new Set([
    "exact_body_angles",
    "lever_usage",
    "finger_position",
    "precise_throttle_percentage",
    "gear_selection",
    "suspension_behaviour",
    "tyre_pressure_effects"
  ]);

  const perception = contextPack?.perception_summary || {};
  const terrain = contextPack?.terrain || {};
  const features = Array.isArray(contextPack?.features) ? contextPack.features : [];

  const instabilitySignals = Array.isArray(perception.instability_signals)
    ? perception.instability_signals.map((x) =>
        typeof x === "string" ? x : x?.signal
      ).filter(Boolean)
    : [];

  const claimTypes =
    coachingOutput?.claim_types ||
    coachingOutput?.claims ||
    [];

  const adviceText = buildAdviceText(coachingOutput);
  const lowerAdvice = adviceText.toLowerCase();

  // ─────────────────────────────────────────────
  // 1. Claim blocking
  // ─────────────────────────────────────────────
  if (Array.isArray(claimTypes)) {
    claimTypes.forEach((type) => {
      if (disallowedClaimTypes.has(type)) {
        violations.push(`Disallowed claim type used: ${type}`);
      } else if (!allowedClaimTypes.has(type)) {
        violations.push(`Unknown claim type used: ${type}`);
      }
    });
  }

  // ─────────────────────────────────────────────
  // 2. Context-sensitive advice blocking
  // ─────────────────────────────────────────────
  const rules = [
    {
      name: "traction_loss_aggressive_throttle",
      condition: () =>
        hasAnySignal(instabilitySignals, ["rear_wheel_spin", "loss_of_drive"]) ||
        hasTractionEstimate(perception, ["low", "very_low", "variable"]),
      blockedAdvicePatterns: [
        "aggressive throttle",
        "more throttle",
        "pin it",
        "give it more gas",
        "harder on the throttle",
        "snap the throttle",
        "crack it open"
      ],
      reason: "Low-traction or wheelspin contexts must not be coached with aggressive throttle advice."
    },
    {
      name: "stepup_or_drop_passive_body_position",
      condition: () =>
        hasFeature(features, ["step_up", "drop"]),
      blockedAdvicePatterns: [
        "stay passive",
        "sit back and let it happen",
        "stay seated",
        "remain seated",
        "do not move your body",
        "keep your body neutral and passive"
      ],
      reason: "Step-up and drop features require active body positioning, not passive posture."
    },
    {
      name: "rock_or_roots_crash_assume_grip",
      condition: () =>
        hasTerrainType(perception, terrain, ["rock", "roots"]) &&
        hasOutcome(perception, ["crash"]),
      blockedAdvicePatterns: [
        "trust the grip",
        "there was plenty of grip",
        "the tyre would hold",
        "just lean on the grip",
        "grip was available",
        "you could rely on traction there"
      ],
      reason: "On rock or roots after a crash, coaching must not assume reliable grip was available."
    },
    {
      name: "rear_wheel_spin_throttle_without_traction",
      condition: () =>
        hasAnySignal(instabilitySignals, ["rear_wheel_spin"]),
      blockedAdvicePatterns: [
        "add more throttle",
        "open the throttle earlier",
        "accelerate harder",
        "more drive from the throttle",
        "carry more throttle through it"
      ],
      reason: "Rear wheel spin requires traction-first coaching, not throttle escalation without grip management."
    },
    {
      name: "steep_descent_speed_or_momentum_carry",
      condition: () =>
        hasGradient(perception, terrain, ["steep_down", "very_steep_down"]),
      blockedAdvicePatterns: [
        "carry more speed",
        "take more speed in",
        "use more momentum",
        "commit with more speed",
        "attack it faster",
        "keep the speed up"
      ],
      reason: "On steep descents, encouraging more speed or momentum carry is unsafe."
    },
    {
      name: "front_end_unloading_more_rear_bias",
      condition: () =>
        hasAnySignal(instabilitySignals, ["front_end_light", "weight_shift_rear"]),
      blockedAdvicePatterns: [
        "get further back",
        "lean back more",
        "move your weight further rearward",
        "sit further over the rear",
        "lighten the front more"
      ],
      reason: "When the front is already unloading, more rear bias increases instability."
    },
    {
      name: "line_deviation_commit_blindly",
      condition: () =>
        hasAnySignal(instabilitySignals, ["line_deviation", "front_wheel_deflection"]),
      blockedAdvicePatterns: [
        "commit harder to the same line",
        "force the line more aggressively",
        "stay on that exact line no matter what",
        "push through the deflection",
        "ignore the line change and commit"
      ],
      reason: "Line deviation and deflection require line correction, not blind commitment to the failing line."
    },
    {
      name: "stall_or_drive_interruption_more_speed_only",
      condition: () =>
        hasAnySignal(instabilitySignals, ["stall_risk", "drive_interruption"]) ||
        hasOutcome(perception, ["stall", "stuck"]),
      blockedAdvicePatterns: [
        "just carry more speed",
        "all you needed was more speed",
        "hit it faster",
        "just go faster next time"
      ],
      reason: "Stall and drive interruption problems must not be reduced to speed-only advice."
    },
    {
      name: "crash_after_low_grip_commit_harder",
      condition: () =>
        hasOutcome(perception, ["crash"]) &&
        isLowGripContext(perception, terrain, instabilitySignals),
      blockedAdvicePatterns: [
        "commit harder",
        "you just needed more commitment",
        "send it more",
        "be more aggressive",
        "trust it and commit"
      ],
      reason: "In a crash with low-grip indicators, generic commitment advice is dangerous."
    },
    {
      name: "drop_or_jump_more_speed_after_crash",
      condition: () =>
        hasFeature(features, ["drop", "jump"]) &&
        hasOutcome(perception, ["crash"]),
      blockedAdvicePatterns: [
        "take more speed into it",
        "hit it faster",
        "carry more pace off the lip",
        "you needed more speed",
        "commit with more speed"
      ],
      reason: "After a crash on a jump or drop, recommending more speed without qualification is unsafe."
    },
    {
      name: "clutch_technique_without_observation",
      condition: () =>
        containsAnyPattern(lowerAdvice, [
          "slip the clutch",
          "feather the clutch",
          "clutch control was wrong",
          "use more clutch",
          "dump the clutch"
        ]) &&
        !hasClaimType(claimTypes, "clutch_usage") &&
        !hasAnySignal(instabilitySignals, ["clutch_usage"]),
      blockedAdvicePatterns: [
        "slip the clutch",
        "feather the clutch",
        "clutch control was wrong",
        "use more clutch",
        "dump the clutch"
      ],
      reason: "Clutch technique advice must not be given when clutch usage was not observable."
    }
  ];

  rules.forEach((rule) => {
    if (!rule.condition()) return;

    rule.blockedAdvicePatterns.forEach((pattern) => {
      if (lowerAdvice.includes(pattern.toLowerCase())) {
        violations.push(
          `[${rule.name}] ${rule.reason} Blocked pattern: "${pattern}"`
        );
      }
    });
  });

  return {
    safe: violations.length === 0,
    violations
  };
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function buildAdviceText(coachingOutput) {
  if (!coachingOutput || typeof coachingOutput !== "object") return "";

  const parts = [];

  if (typeof coachingOutput.what_you_were_trying_to_do === "string") {
    parts.push(coachingOutput.what_you_were_trying_to_do);
  }
  if (typeof coachingOutput.what_actually_happened === "string") {
    parts.push(coachingOutput.what_actually_happened);
  }
  if (typeof coachingOutput.why_it_went_wrong === "string") {
    parts.push(coachingOutput.why_it_went_wrong);
  }
  if (typeof coachingOutput.what_to_do_differently === "string") {
    parts.push(coachingOutput.what_to_do_differently);
  }
  if (typeof coachingOutput.closing === "string") {
    parts.push(coachingOutput.closing);
  }

  if (Array.isArray(coachingOutput.drills_and_practice)) {
    coachingOutput.drills_and_practice.forEach((drill) => {
      if (drill && typeof drill === "object") {
        if (typeof drill.drill_name === "string") parts.push(drill.drill_name);
        if (typeof drill.instructions === "string") parts.push(drill.instructions);
        if (typeof drill.purpose === "string") parts.push(drill.purpose);
      }
    });
  }

  return parts.join(" ");
}

function hasOutcome(perception, outcomes) {
  const outcome = perception?.outcome || perception?.result || null;
  return outcomes.includes(outcome);
}

function hasFeature(features, featureTypes) {
  return features.some((f) => featureTypes.includes(f?.feature_type));
}

function hasTerrainType(perception, terrain, types) {
  const surfaceType = perception?.surface_type || terrain?.surface_type || null;
  const featureTypes = Array.isArray(perception?.features) ? perception.features : [];

  if (types.includes(surfaceType)) return true;
  if (types.includes("roots") && featureTypes.includes("roots")) return true;

  return false;
}

function hasGradient(perception, terrain, gradients) {
  const gradient = perception?.gradient || terrain?.matched_gradient || null;
  return gradients.includes(gradient);
}

function hasAnySignal(instabilitySignals, requiredSignals) {
  return requiredSignals.some((signal) => instabilitySignals.includes(signal));
}

function hasTractionEstimate(perception, values) {
  return values.includes(perception?.traction_estimate);
}

function hasClaimType(claimTypes, claimType) {
  return Array.isArray(claimTypes) && claimTypes.includes(claimType);
}

function containsAnyPattern(text, patterns) {
  return patterns.some((pattern) => text.includes(pattern.toLowerCase()));
}

function isLowGripContext(perception, terrain, instabilitySignals) {
  const traction = perception?.traction_estimate || null;
  const surfaceType = perception?.surface_type || terrain?.surface_type || null;
  const surfaceCondition = perception?.surface_condition || terrain?.matched_condition || null;

  if (traction === "low" || traction === "very_low" || traction === "variable") {
    return true;
  }

  if (hasAnySignal(instabilitySignals, ["rear_wheel_spin", "loss_of_drive"])) {
    return true;
  }

  if (
    (surfaceType === "rock" || surfaceType === "roots" || surfaceType === "clay") &&
    (surfaceCondition === "wet" || surfaceCondition === "damp" || surfaceCondition === "saturated")
  ) {
    return true;
  }

  return false;
}

module.exports = {
  evaluateSafety
};
