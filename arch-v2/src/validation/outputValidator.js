// ARCH-V2.1 Output Validator (tightened)

function validate(output) {
  const errors = [];

  if (!output) {
    return { valid: false, errors: ["Output is null or undefined"] };
  }

  const perception = output.perception || {};
  const pass2 = output.pass2 || {};

  // ─────────────────────────────────────────────
  // Amendment 1 — ClaimType validation
  // ─────────────────────────────────────────────
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

  // Flexible lookup (to be wired properly later)
  const claimTypes =
    pass2.claim_types ||
    pass2.coaching_strategy?.claim_types ||
    [];

  if (Array.isArray(claimTypes)) {
    claimTypes.forEach((type) => {
      if (disallowedClaimTypes.has(type)) {
        errors.push(`Disallowed claim type used: ${type}`);
      }
      if (!allowedClaimTypes.has(type)) {
        errors.push(`Unknown claim type: ${type}`);
      }
    });
  }

  // ─────────────────────────────────────────────
  // Amendment 4 — issue_priority.importance
  // ─────────────────────────────────────────────
  const issuePriority = pass2.coaching_strategy?.issue_priority;

  if (Array.isArray(issuePriority)) {
    const seen = new Set();

    issuePriority.forEach((item, index) => {
      const val = item.importance;

      if (!Number.isInteger(val) || val < 1 || val > 3) {
        errors.push(`Invalid importance value at index ${index}: ${val}`);
      }

      if (seen.has(val)) {
        errors.push(`Duplicate importance value: ${val}`);
      }

      seen.add(val);

      if (val !== index + 1) {
        errors.push(
          `Importance mismatch at index ${index}: expected ${index + 1}, got ${val}`
        );
      }
    });

    if (!seen.has(1)) {
      errors.push("At least one issue must have importance = 1");
    }
  }

  // ─────────────────────────────────────────────
  // Amendment 5 — Event timestamps
  // ─────────────────────────────────────────────
  const events = perception.events;

  if (Array.isArray(events)) {
    for (let i = 0; i < events.length; i++) {
      const e = events[i];

      const start = e.start_time_seconds;
      const end = e.end_time_seconds;

      if (typeof start !== "number" || start < 0) {
        errors.push(`Invalid start_time_seconds at event ${i}`);
      }

      if (typeof end !== "number" || end <= start) {
        errors.push(`Invalid end_time_seconds at event ${i}`);
      }

      if (i > 0) {
        const prev = events[i - 1];

        if (start < prev.start_time_seconds) {
          errors.push(`Events not ordered by start_time_seconds at index ${i}`);
        }

        if (start < prev.end_time_seconds) {
          errors.push(`Event overlap between ${i - 1} and ${i}`);
        }

        const sameType =
          e.event_type === prev.event_type &&
          e.phase === prev.phase;

        const gap = start - prev.end_time_seconds;

        if (sameType && gap < 0.5) {
          errors.push(
            `Merge violation: consecutive ${e.event_type}/${e.phase} events with gap < 0.5s at index ${i}`
          );
        }
      }
    }
  }

  // ─────────────────────────────────────────────
  // Amendment 6 — coaching_required === false
  // ─────────────────────────────────────────────
  const coachingRequired = pass2.coaching_strategy?.coaching_required;
  const coachingOutput = pass2.coaching_output || {};

  if (coachingRequired === false) {
    // Required fields
    if (!coachingOutput.title || typeof coachingOutput.title !== "string") {
      errors.push("title is required when coaching_required is false");
    }

    if (!coachingOutput.closing || typeof coachingOutput.closing !== "string") {
      errors.push("closing is required when coaching_required is false");
    }

    // drills must be empty
    if (
      Array.isArray(coachingOutput.drills_and_practice) &&
      coachingOutput.drills_and_practice.length > 0
    ) {
      errors.push("drills_and_practice must be empty when coaching_required is false");
    }

    // why_it_went_wrong must be null or undefined
    if (
      coachingOutput.why_it_went_wrong !== undefined &&
      coachingOutput.why_it_went_wrong !== null
    ) {
      errors.push("why_it_went_wrong must be null/omitted when coaching_required is false");
    }

    // what_to_do_differently must be null or undefined
    if (
      coachingOutput.what_to_do_differently !== undefined &&
      coachingOutput.what_to_do_differently !== null
    ) {
      errors.push("what_to_do_differently must be null/omitted when coaching_required is false");
    }

    // Non-corrective closing check (basic deterministic guard)
    const closing = (coachingOutput.closing || "").toLowerCase();

    const correctiveKeywords = [
      "improve",
      "fix",
      "avoid",
      "instead",
      "should",
      "need to",
      "try to",
      "next time",
      "work on"
    ];

    correctiveKeywords.forEach((word) => {
      if (closing.includes(word)) {
        errors.push(
          `closing contains corrective language ("${word}") when coaching_required is false`
        );
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

module.exports = { validate };
