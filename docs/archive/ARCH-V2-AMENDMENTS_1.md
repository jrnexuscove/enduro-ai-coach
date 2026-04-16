# ARCH-V2.1 — Amendments

**Status:** Pre-lock fixes — schema-reconciled
**Source:** Final pre-lock review + schema consistency pass
**Date:** April 2026

These amendments must be applied to ARCH-V2 before the spec is considered locked. Each addresses a precision gap that would cause implementation drift or non-deterministic behaviour.

---

## Amendment 1: ClaimType Enum — Closed Set

**Problem:** `allowed_claim_types` and `disallowed_claim_types` are referenced by Pass 2 and the safety layer but no full enum exists. Without a closed set, enforcement is interpretive rather than deterministic.

**Rule:** The following enum is the exhaustive set. Any claim type not listed here is invalid.

```
ClaimType (allowed):
  terrain
  momentum
  body_position
  visible_corrections
  instability_signals
  line_choice
  throttle_pattern
  clutch_usage
  braking_pattern
  outcome

ClaimType (disallowed):
  exact_body_angles
  lever_usage
  finger_position
  precise_throttle_percentage
  gear_selection
  suspension_behaviour
  tyre_pressure_effects
```

**Enforcement:**
- Pass 2 MUST only produce claims matching the allowed set.
- The safety layer MUST reject any output containing a disallowed claim type.
- If a new claim type is needed, it must be added to this enum explicitly — not inferred at runtime.

---

## Amendment 2: technique_reference — Size Constraint

**Problem:** `technique_reference` is the only uncontrolled prose field in the KB artifact schema. Without a hard constraint, KB entries will vary wildly in size, bloating prompts and causing Pass 2 to over-rely on prose instead of structured fields.

**Rule:**

```
technique_reference:
  max_length: 500 characters
  format: single paragraph, no line breaks
  must_not_contain: multiple examples, step-by-step instructions, or sub-headings
  purpose: natural language support for structured fields — not a reasoning input
```

**Enforcement:**
- KB build agents MUST validate `technique_reference` length on write.
- Any entry exceeding 500 characters MUST be truncated or rewritten before merge.
- Pass 2 prompt MUST NOT instruct the model to reason from `technique_reference` — it is context only.

---

## Amendment 3: Dynamics Retrieval — Explicit Ranking Rules

**Problem:** Dynamics retrieval currently specifies "0–3 dynamics artifacts based on signal cluster mapping + terrain context" but does not define selection priority. Two implementations could return different KB packs for the same input.

**Rule:** Dynamics artifacts MUST be selected and ranked using the following priority order:

```
Dynamics ranking (highest priority first):
  1. Signal confidence — artifacts matching the highest-confidence detected signals rank first
  2. Signal frequency — artifacts matching clusters with multiple co-occurring signals rank above single-signal matches
  3. Terrain context match — artifacts whose terrain tag matches the detected terrain rank above generic matches (e.g. climb + momentum signals > flat + momentum signals)
  4. Outcome alignment — artifacts tagged with failure outcomes rank above neutral-outcome artifacts when failure signals are detected
```

**Enforcement:**
- The retrieval function MUST apply this ranking deterministically.
- If two artifacts tie on all four criteria, return both (up to the max of 3).
- If no artifacts meet criteria 1, return an empty dynamics set — do not fall back to generic matches.

---

## Amendment 4: issue_priority.importance — Hard Constraints

**Problem:** `importance` is defined as `"number — 1 = highest"` with no upper bound, no uniqueness constraint, and no ordering rule. This will produce inconsistent priority values across clips.

**Rule:**

```
issue_priority.importance:
  type: integer
  range: 1–3 (inclusive)
  uniqueness: values MUST be unique within a single analysis output
  ordering: array order MUST match importance value (index 0 = importance 1)
  required: at least 1 issue must be assigned importance 1
```

**Enforcement:**
- Pass 2 output validator MUST reject any output where importance values are duplicated, out of range, or do not match array order.
- If fewer than 3 issues are identified, importance values MUST still start at 1 and increment sequentially.

---

## Amendment 5: Event Segmentation — Timestamps and Merge Rule

**Problem:** The schema allows multiple events with the same `event_type` in the same phase, but referencing them downstream (instability signals, critical moment reasoning) becomes ambiguous when two identical event types sit adjacent. Additionally, events currently carry no temporal grounding, which limits debugging, validation, and merge logic.

**Schema addition:** Each event MUST now include temporal fields:

```
event (additional required fields):
  start_time_seconds: number — seconds from clip start (e.g. 1.2)
  end_time_seconds: number — seconds from clip start (e.g. 3.8)

Constraints:
  - start_time_seconds MUST be ≥ 0
  - end_time_seconds MUST be > start_time_seconds
  - events MUST be ordered by start_time_seconds (ascending)
  - no two events may have overlapping time ranges
```

**Merge rule:**

```
Event segmentation merge rule:
  If two consecutive events share the same event_type AND the same phase:
    - They MUST be merged into a single event UNLESS there is a minimum 0.5s
      gap between the end_time_seconds of the first and the start_time_seconds
      of the second
    - The merged event inherits the earliest start_time_seconds and latest
      end_time_seconds
    - Observations from both are combined into the merged event's observation list
```

**Enforcement:**
- Pass 1 output validator MUST check for consecutive same-type events and apply the merge rule.
- Events separated by < 0.5s with the same type and phase MUST be merged before Pass 2 receives the event list.
- Pass 1 output validator MUST reject any event where `start_time_seconds` or `end_time_seconds` is missing or where events are not in ascending time order.

---

## Amendment 6: coaching_required = false — Output Rules

**Problem:** When `coaching_required` is `false`, the downstream behaviour for `coaching_output` fields is undefined. Without explicit rules, "no issue" clips may still generate full corrective coaching output.

**Rule:** Uses the existing `coaching_output` schema shape — no new fields introduced.

```
When coaching_required === false:
  coaching_output field rules:
    - title: string (required)
    - what_you_were_trying_to_do: string or null (optional — may be omitted)
    - what_actually_happened: string (required), ≤ 2 sentences
        — describes what was observed, not what went wrong
    - why_it_went_wrong: null or omitted
    - what_to_do_differently: null or omitted
    - drills_and_practice: must be [] (empty array)
    - closing: string (required), affirmative and non-corrective
        — e.g. "Solid execution through this section. Keep doing what you're doing."

  coaching_output MUST NOT contain:
    - any corrective language in any field
    - any "areas for improvement" framing
    - any drill recommendations
    - any references to failure patterns or KB failure matches
```

**Enforcement:**
- Output validator MUST check: if `coaching_required === false` and `drills_and_practice.length > 0`, reject.
- If `coaching_required === false` and `why_it_went_wrong` is present and non-null, reject.
- If `coaching_required === false` and `what_to_do_differently` is present and non-null, reject.

---

## Amendment 7: Coaching Quality — Minimum Bar

**Problem:** The benchmark criterion "coaching quality ≥ S0–S11 baseline" is subjective and unmeasurable. Every other benchmark target is concrete.

**Rule:** Coaching output (when `coaching_required === true`) MUST meet the following minimum bar:

```
Coaching quality minimum requirements:
  1. Must reference at least ONE of:
     - a specific instability signal detected in Pass 1
     - a KB failure pattern matched during retrieval
  2. Must include a causal explanation:
     - not just "X happened" (description)
     - but "X happened because Y, which caused Z" (causal chain)
  3. Causal explanation must connect:
     - observed signal → mechanism → outcome
     (e.g. "rear wheel spin on the climb was caused by abrupt throttle
      application mid-rut, which broke traction and stalled momentum")
```

**Enforcement:**
- Benchmark validation MUST check for the presence of at least one signal/pattern reference.
- Benchmark validation MUST check that the coaching text contains causal connectors (not just sequential description).
- A coaching output that only describes what happened without explaining why MUST be scored as a benchmark failure.

---

## Implementation Notes

**Order of application:** These amendments can be applied independently, but amendments 1 and 4 should be applied first as they affect output validation logic that other amendments depend on. Amendment 5 adds new required fields (`start_time_seconds`, `end_time_seconds`) to the event schema — this must be reflected in the Pass 1 prompt and output contract before any validation runs.

**Validator implications:** Amendments 1, 4, 5, and 6 all require output validation rules. These should be implemented as a single validation pass that runs against every Pass 1 and Pass 2 output before it is accepted.

**KB build impact:** Amendment 2 requires a sweep of all existing `technique_reference` fields. Any entries exceeding 500 characters must be rewritten. This should be done as a dedicated KB cleanup task, not inline during analysis runs.

**Spec status after amendments:** Once all 7 amendments are merged into the main spec text (not kept as a sidecar), ARCH-V2.1 is locked. These amendments must become part of the canonical contract.
