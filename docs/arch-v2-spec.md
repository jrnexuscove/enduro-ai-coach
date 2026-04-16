# ARCH-V2 — RideMind Perception and Coaching Architecture

**Status:** v1.1.1 LOCKED — parent spec for ARCH-V2 implementation
**Owner:** Jake (Nexus Cove)

| Version | Date | Notes |
|---|---|---|
| 1.0 | 2026-04-16 | Initial draft — two-pass architecture, all 7 amendments folded |
| 1.1 | 2026-04-16 | Schema versioning contract (§7.5); empty-ContextPack handling fixed (§11); wording fixes per ChatGPT review |
| 1.1.1 | 2026-04-16 | Amendment 2 format rules (§5) and Pass 2 usage constraint (§6.1) folded in from ARCH-V2-AMENDMENTS_1.md. No design change. |

---

## 1. Status

ARCH-V2 is the production architecture for RideMind's analysis pipeline. It replaces the S0–S11 11-stage debug pipeline as the product delivery path. S0–S11 is retained as evaluation and regression infrastructure — not deleted, still runnable.

This document is the parent spec. Child specs cover schema and implementation detail:

- `docs/pass1-schema-v1.md` (TBD — **blocks Pass 1 implementation**)
- `docs/pass2-prompt-v1.md` (TBD — **blocks Pass 2 implementation**)

**Build status:**

| Component | Status |
|---|---|
| `lib/retrieval/` | COMPLETE |
| `lib/validation/outputValidator.ts` | COMPLETE |
| `lib/safety/enduroSafetyRules.ts` | COMPLETE |
| `lib/benchmark/benchmarkHarness.ts` | COMPLETE |
| Pass 1 implementation | NOT BUILT — blocked on PASS1-SCHEMA |
| Pass 2 implementation | NOT BUILT — blocked on PASS2-PROMPT |
| `docs/arch-v2-spec.md` | v1.1 LOCKED |

---

## 2. Architecture Overview

Three-layer system: LLM perception → deterministic KB lookup → LLM coaching synthesis.

```
Video Clip
    │
    ▼
Frame Extraction (16 frames)
    │
    ▼
┌──────────────────────────────────────────────────────────┐
│  PASS 1 — Perception  (perception slot)                  │
│  Model: claude-sonnet-4-6                                │
│  Target: 30–45 sec                                       │
│  Replaces: S0–S4 (camera, observability, intent,         │
│            terrain/features, key events, instability)    │
└───────────────────────────┬──────────────────────────────┘
                            │  PerceptionOutput
                            ▼
┌──────────────────────────────────────────────────────────┐
│  KB RETRIEVAL — Deterministic context pack               │
│  No LLM call — buildContextPack(perceptionOutput)        │
│  Target: <1 sec                                          │
│  Source: Canonical KB only (terrain / features / dyn.)   │
└───────────────────────────┬──────────────────────────────┘
                            │  ContextPack
                            ▼
┌──────────────────────────────────────────────────────────┐
│  PASS 2 — Coaching Synthesis                             │
│  Model: claude-sonnet-4-6                                │
│  Inputs: PerceptionOutput + ContextPack + rider_note     │
│  Target: 15–30 sec                                       │
└───────────────────────────┬──────────────────────────────┘
                            │  Pass2Output
                            ▼
┌──────────────────────────────────────────────────────────┐
│  SAFETY — Rules-based validation                         │
│  No LLM call — evaluateSafety(contextPack, output)       │
│  Target: <1 sec                                          │
└───────────────────────────┬──────────────────────────────┘
                            │  SafetyResult
                            ▼
                      PipelineOutput
```

**Total target latency:** under 90 seconds per clip.

The "(perception slot)" label on Pass 1 reflects an architectural seam: the Pass 1 LLM call is the current MVP implementation, but the output contract (`PerceptionOutput`) is model-agnostic. A future deterministic CV layer (YOLO / motion tracking) could occupy this slot without changing the downstream architecture.

---

## 3. Design Rationale

### Why consolidate S0–S4 into Pass 1

S0–S4 are five sequential LLM calls covering camera perspective, observability, intent, terrain, and features. Each call added latency, and the outputs fed into each other sequentially — no parallelisation benefit. Consolidating into a single Pass 1 call:
- Eliminates 4 round trips (~120 sec saved at ~30 sec each)
- Forces all perception outputs into one coherent structured schema
- Reduces prompt and model coordination overhead
- Target: 30–45 sec vs ~150 sec sequential

### Why deterministic KB retrieval

Pass 1 output is highly structured: terrain type enum, feature type enums with severity tiers, failure signal types with confidence values. These map directly to KB entries via a lookup table. Semantic similarity search (embeddings) adds latency, non-determinism, and infrastructure overhead for no quality benefit when the lookup keys are already structured enums. See [kb-architecture.md](kb-architecture.md).

### Why rules-based safety

Safety rules in enduro riding are domain-specific and enumerable (11 rules). The safety layer evaluates claim types, advice patterns, and feature/outcome context deterministically. No LLM call means no token cost and no hallucination risk in the safety layer itself.

### Why two model calls

Two calls is the architectural minimum:
1. Pass 1 needs vision capability (images in, structured JSON out)
2. Pass 2 needs language reasoning (structured data in, coaching prose out)

These cannot be combined because Pass 2 inputs include KB data that does not exist until retrieval runs after Pass 1 completes.

---

## 4. Pass 1 — Perception

### Purpose

Single vision call that replaces S0–S4. Takes extracted frames, produces a structured `PerceptionOutput` covering all facts downstream stages need.

### What it assesses

- Camera perspective and observability (trust envelope enforcement)
- Surface type, gradient, conditions
- Features detected with severity tiers and confidence
- Rider intent and section objective
- Key events with temporal grounding (start/end timestamps — Amendment 5)
- Visible instability signals
- Outcome: `completed | stall | bail | crash | stuck | unknown`
- Confidence assessments per element

### Trust envelope

Pass 1 subsumes the Stage 0 observability gate logic (see `docs/vision-layer-spec-v1.md`). The trust envelope assessment is part of the single Pass 1 call:

- `usability_gate: fail` → Pass 1 returns `usability_gate_fail` error; no coaching generated
- `usability_gate: degrade` → Pass 1 sets confidence ceilings enforced in Pass 2 prompt
- Confidence ceilings propagate into Pass 2 prompt constraints (coaching specificity gating)

**Degrade invariants:** when `usability_gate === "degrade"`, `max_observation_confidence` ≤ 0.5 and `max_coaching_specificity !== "full"`.

### Output schema

**Full schema defined in child spec PASS1-SCHEMA.** Blocking dependency for Pass 1 implementation, Pass 2 design, `fromStage4()` adapter removal, and full ARCH-V2 benchmark runs.

Minimum required fields (invariant across schema versions):

| Field | Type | Notes |
|---|---|---|
| `schema_version` | string | §7.5 — "MAJOR.MINOR" |
| `usability_gate` | enum | pass / fail / degrade |
| `failure_mode` | enum \| null | Stage0FailureMode or null |
| `camera_perspective` | enum | pov / third_person_close / third_person_distant |
| `observability_level` | enum | clear / partial / minimal / none |
| `confidence_ceilings` | object | max_observation_confidence, max_coaching_specificity |
| `terrain` | object | surface_type, gradient, condition |
| `features_detected[]` | array | feature_type, severity, confidence per entry |
| `failure_signals[]` | array | type, confidence per entry |
| `outcome` | enum | completed / stall / bail / crash / stuck / unknown |
| `instability_signals[]` | array | observable instability indicators |
| `key_events[]` | array | event_type, phase, start_time_seconds, end_time_seconds |
| `rider_objective` | string | what the rider was attempting |

### Model

`claude-sonnet-4-6`. All pipeline code must use this model ID explicitly. Sonnet 4 (`claude-sonnet-4-20250514`) is deprecated and retires 2026-06-15.

### Current adapter

Until PASS1-SCHEMA lands, retrieval is fed via the `fromStage4()` adapter in `lib/retrieval/types.ts`, which maps Stage 4 output (+ optional Stage 5/6 signals) to `PerceptionInput`. This adapter is the swap point — replace its body when Pass 1 output is available. Retrieval logic upstream of the adapter is unchanged.

---

## 5. KB Retrieval

### Purpose

Maps structured `PerceptionOutput` to a `ContextPack` — the KB data that Pass 2 uses for coaching synthesis. No LLM call. No raw markdown at runtime.

### Architecture

**Input:** `PerceptionInput` (from Pass 1 output via `fromStage4()` adapter until PASS1-SCHEMA lands)

**Output:** `ContextPack`

```typescript
interface ContextPack {
  terrain:  TerrainArtifact | null;   // One terrain entry for the surface type
  features: FeatureArtifact[];         // One per detected feature, severity-tier-matched
  dynamics: DynamicsArtifact[];        // 0–3 entries, Amendment 3 ranked
}
```

**Source:** Canonical KB only. Research Corpus and Proposal Layer are not consumed at runtime. See [kb-architecture.md](kb-architecture.md) for the four-layer KB model.

### Artifact types

**TerrainArtifact** — surface-level facts: traction range, failure types, gradient contexts, common misclassifications, technique reference (≤500 chars — Amendment 2).

**FeatureArtifact** — per-feature facts at matched severity tier: feature class, severity description, failure types, crash types, technique reference (≤500 chars — Amendment 2).

**DynamicsArtifact** — bike dynamics entry: technique reference (≤500 chars — Amendment 2), `match_reason` explaining why this entry was selected for this input.

### technique_reference format rules (Amendment 2)

All `technique_reference` fields across artifact types must conform to:

```
technique_reference:
  max_length: 500 characters
  format: single paragraph, no line breaks
  must_not_contain: multiple examples, step-by-step instructions, or sub-headings
  purpose: natural language support for structured fields — not a reasoning input
```

KB build agents MUST validate `technique_reference` length on write. Any entry exceeding 500 characters MUST be truncated or rewritten before merge. See §14.2 for sweep status.

### Dynamics retrieval ranking (Amendment 3)

Four-criteria ranking, applied deterministically:

1. **Signal confidence** — primary (highest-confidence) failure signal defines the candidate pool. No candidates → empty dynamics set returned. No fallback to generic matches.
2. **Signal frequency** — co-occurring signals boost entries they also match (within the pool only)
3. **Terrain context** — surface / gradient / feature context boosts matching pool entries
4. **Outcome alignment** — failure outcomes apply a small universal boost to all pool entries

Maximum 3 dynamics artifacts returned. Tie on all four criteria: return both (up to the cap).

### KB gaps

Current `lib/retrieval/index.ts` documents gaps in the `FAILURE_TO_DYNAMICS` map:
- `line_choice` — no dynamics mapping (tactical, not mechanical)
- `decision` — no dynamics mapping (cognitive domain)
- `mechanical` — no dynamics mapping (maintenance domain)
- `fitness` — no dynamics mapping (physiological domain)

Gaps are logged at retrieval time for observability. No fallback entries are added.

### Latency

KB retrieval targets <1 sec. In practice it is negligible relative to model calls in current architecture. Context pack assembly latency could only become a concern at 10–100× KB growth beyond current scale.

### Implementation files

| File | Contents |
|---|---|
| `lib/retrieval/index.ts` | `buildContextPack()`, `getTerrainContext()`, `getFeatureContext()`, `getDynamicsContext()` |
| `lib/retrieval/types.ts` | `ContextPack`, artifact interfaces, `PerceptionInput`, `fromStage4()` |
| `lib/retrieval/loader.ts` | KB loading — parses markdown files into structured entries at startup |
| `lib/retrieval/parser.ts` | KB entry parsing — extracts structured fields from markdown frontmatter |

---

## 6. Pass 2 — Coaching Synthesis

### 6.1 Inputs

- `PerceptionOutput` — structured perception facts from Pass 1
- `ContextPack` — terrain, features, dynamics artifacts from KB retrieval
- `rider_note` (optional) — freeform rider context ("first time on this hill", "new tyres")

**KB input constraint (Amendment 2):** Pass 2 MUST NOT reason from `technique_reference` fields in the ContextPack — they are context only. Coaching reasoning must be grounded in the structured fields defined in §4 (perception) and §5 (context pack). The `technique_reference` string provides natural language support; it is not a reasoning source.

### 6.2 Output schema

From `lib/pass2/prompt.md` (schema stub):

```json
{
  "schema_version": "string",
  "coaching_required": "boolean",
  "title": "string",
  "issue_priority": [
    { "issue": "string", "importance": 1 }
  ],
  "what_you_were_trying_to_do": "string",
  "what_actually_happened": "string",
  "why_it_went_wrong": "string | null",
  "what_to_do_differently": "string | null",
  "drills_and_practice": [
    {
      "drill_name": "string",
      "instructions": "string",
      "purpose": "string"
    }
  ],
  "closing": "string"
}
```

`schema_version` is required on every Pass 2 output — see §7.5.

### 6.3 Coaching framework

Three-part structure: **Situation → Breakdown → Correction**

**Situation** (`what_you_were_trying_to_do`): what the rider was attempting, terrain context, relevant KB constraints. Sets up the coaching without judgement.

**Breakdown** (`what_actually_happened` + `why_it_went_wrong`): what was observed, and the causal explanation connecting observed signal → mechanism → outcome. Must reference at least one instability signal detected in Pass 1 or a KB failure pattern match (Amendment 7).

**Correction** (`what_to_do_differently` + `drills_and_practice`): specific, actionable change. Default output is a single drill. Multi-drill requires structured justification — see §6.6.

### 6.4 Model

`claude-sonnet-4-6`. Target: 15–30 seconds.

### 6.5 Failure modes

The following failure modes are partially evidenced from golden-path review notes (§6.8).

| Failure mode | Description | Mitigation |
|---|---|---|
| Multi-drill drift | Pass 2 generates 2–3 drills when one would suffice; dilutes coaching focus | Pass 2 must justify multi-drill output through structured reasoning; default behaviour is single-drill output |
| Generic coaching without KB grounding | Advice re-derives KB facts (weight forward on climb, stand on pegs) without referencing KB entry | Coaching output must include at least one KB signal reference (Amendment 7) |
| Causal chain gap | `what_actually_happened` describes the outcome without tracing the cause | `why_it_went_wrong` must connect observed signal → mechanism → outcome (Amendment 7) |
| Observability overclaim | Coaching references technique details not visible in the clip | Pass 1 confidence ceilings must gate coaching specificity; coaching specificity constraints enforced in Pass 2 prompt |
| coaching_required false mismatch | Clean-but-coachable clips return no coaching | `coaching_required: false` requires all three conditions — see §6.7 |

### 6.6 Drills policy

- **Default:** one drill per coaching output
- **Multi-drill:** allowed only when Pass 2 output includes explicit structured reasoning connecting each drill to a distinct failure mechanism
- Validator rejects drills when `coaching_required === false` (Amendment 6)
- Drill instructions must not reference technique details not observable from the clip

### 6.7 coaching_required = false rules (Amendment 6)

Three conditions required for `coaching_required = false` (ALL must hold):

1. `outcome.section_completion` is `full` or `substantial`
2. `failure_type` is `none`
3. Model assesses no meaningful coaching opportunity (no instability signals, no near-miss, standard terrain with no difficulty markers)

Field rules when `coaching_required === false`:

| Field | Rule |
|---|---|
| `title` | Required |
| `what_you_were_trying_to_do` | Optional — may be omitted |
| `what_actually_happened` | Required, ≤2 sentences — describes what was observed, not what went wrong |
| `why_it_went_wrong` | null or omitted |
| `what_to_do_differently` | null or omitted |
| `drills_and_practice` | Must be `[]` |
| `closing` | Required — affirmative and non-corrective |

Must NOT contain corrective language in any field. Corrective keywords checked by validator: "improve", "fix", "avoid", "instead", "should", "need to", "try to", "next time", "work on".

### 6.8 Golden-path review notes

Reference observations from benchmark fixture validation, used to inform the failure mode table in §6.5. Fixtures are synthetic for MVP; real-clip validation pending BENCHMARK-ARCH-V2.

**Fixture: muddy steep climb with rut (MOCK-01)**
- Momentum signal correctly retrieved DYNAMICS-09 + DYNAMICS-04 via Amendment 3 ranking
- Coaching referenced KB momentum constraint — no re-derivation of KB facts
- Single drill generated — no multi-drill drift observed
- Causal chain present: "rear wheel spin caused by abrupt throttle application mid-rut, which broke traction and stalled momentum"

**Fixture: clean POV completion (MOCK-02)**
- `coaching_required` correctly set to false
- `closing` affirmative, no corrective language
- `drills_and_practice: []` — correct
- No KB failure pattern surfaced — correct for clean clip

**Fixture: crash on drop feature (MOCK-03)**
- Safety rule `drop_or_jump_more_speed_after_crash` evaluated — no blocked patterns in output
- Coaching referenced `FeatureArtifact` for drop feature
- Causal chain: "weight shift rearward pre-landing caused front wheel to compress abruptly on impact"

---

## 7. Safety Layer

### Purpose

Rules-based coaching safety evaluation. No LLM call. Deterministic pattern matching against coaching advice text combined with contextual signals from the ContextPack and PerceptionOutput.

### 7.1 Safety rules

Implemented in `lib/safety/enduroSafetyRules.ts`. 11 rules:

| Rule | Trigger | Blocked advice patterns |
|---|---|---|
| `traction_loss_aggressive_throttle` | Rear wheel spin signal or low traction estimate | aggressive throttle, more throttle, pin it, snap the throttle |
| `stepup_or_drop_passive_body_position` | Step-up or drop feature detected | stay passive, sit back and let it happen, stay seated |
| `rock_or_roots_crash_assume_grip` | Rock or roots terrain + crash outcome | trust the grip, grip was available, lean on the grip |
| `rear_wheel_spin_throttle_without_traction` | Rear wheel spin signal | add more throttle, open the throttle earlier, carry more throttle through it |
| `steep_descent_speed_or_momentum_carry` | Steep or very steep descent gradient | carry more speed, take more speed in, attack it faster |
| `front_end_unloading_more_rear_bias` | Front end light or weight shift rear signal | get further back, lean back more, lighten the front more |
| `line_deviation_commit_blindly` | Line deviation or front wheel deflection signal | commit harder to the same line, ignore the line change and commit |
| `stall_or_drive_interruption_more_speed_only` | Stall risk / drive interruption signal, or stall / stuck outcome | just carry more speed, all you needed was more speed |
| `crash_after_low_grip_commit_harder` | Crash + low-grip context | commit harder, send it more, be more aggressive, trust it and commit |
| `drop_or_jump_more_speed_after_crash` | Drop or jump feature + crash outcome | take more speed into it, hit it faster, carry more pace off the lip |
| `clutch_technique_without_observation` | Clutch advice in output but no `clutch_usage` claim type or signal | slip the clutch, feather the clutch, use more clutch, dump the clutch |

### 7.2 Claim type enforcement (Amendment 1)

**Allowed claim types:**
`terrain`, `momentum`, `body_position`, `visible_corrections`, `instability_signals`, `line_choice`, `throttle_pattern`, `clutch_usage`, `braking_pattern`, `outcome`

**Disallowed claim types:**
`exact_body_angles`, `lever_usage`, `finger_position`, `precise_throttle_percentage`, `gear_selection`, `suspension_behaviour`, `tyre_pressure_effects`

Pass 2 must only produce claims matching the allowed set. Both the safety layer and validator reject disallowed claim types. New claim types require explicit addition to this enum — not inferred at runtime.

### 7.3 Safety result

```typescript
interface SafetyResult {
  safe: boolean;
  violations: string[];  // Empty when safe === true
}
```

`safe === false` blocks coaching delivery to the user. Violations are logged for observability.

---

## 7.5 Schema Versioning

### Purpose

Ensure validators, fixtures, and benchmark tooling reference compatible schema versions. Prevent silent mismatches from silently accepting stale or structurally incompatible output.

### Schema version fields

Each producing stage carries a `schema_version` field once that stage is implemented:

| Output object | Field | Set by |
|---|---|---|
| `PerceptionOutput` | `schema_version` | Pass 1 implementation |
| `Pass2Output` | `schema_version` | Pass 2 implementation |
| `PipelineOutput` envelope | `perception_schema_version`, `pass2_schema_version` | Pipeline runner |

Format: `"MAJOR.MINOR"` (e.g. `"1.0"`, `"1.3"`, `"2.0"`).

### Validator policy

| Condition | Validator behaviour |
|---|---|
| Major version matches | Proceed normally |
| Minor version differs (e.g. validator expects 1.0, receives 1.2) | Accept — additive minor versions are backwards-compatible |
| Major version differs (e.g. validator expects 1.x, receives 2.0) | Reject — error code `schema_version_mismatch` |
| `schema_version` field absent | Reject — error code `schema_version_missing` |

### Fixture versioning

Benchmark fixtures (`{name}.json`, `{name}.context.json`) must include the `schema_version` field matching the output they represent. When a major version bump occurs:
- Old fixtures must be migrated or removed before the next benchmark run
- New fixtures must be generated against the new schema
- Benchmark runs that mix schema versions produce a validation error, not silent comparison

### Trace reproducibility

`PipelineOutput` MAY include an optional `kb_snapshot` field:

```typescript
interface KbSnapshot {
  kb_commit: string;        // Git commit SHA of the knowledge-base/ directory
  kb_date: string;          // ISO date of the KB snapshot
  terrain_count: number;    // Number of terrain entries loaded
  feature_count: number;    // Number of feature entries loaded
}
```

`kb_snapshot` is optional for MVP but enables deterministic replay: given the same clip and same KB state, the same analysis should be reproducible. This is the foundation for regression testing against coaching quality changes caused by KB updates.

---

## 8. Validator Architecture

### 8.1 Two-slot architecture

The validator (`lib/validation/outputValidator.ts`) evaluates a two-slot `PipelineOutput`:

```typescript
interface PipelineOutput {
  perception?: PerceptionOutput;
  pass2?: Pass2Output;
}
```

**Perception slot:** validates event ordering, timestamp constraints, merge rule compliance (Amendment 5).

**Pass2 slot:** validates claim types (Amendment 1), `issue_priority` ordering and uniqueness (Amendment 4), `coaching_required = false` output rules (Amendment 6).

The validator runs once on the assembled `PipelineOutput` — not as separate per-stage checks.

### 8.2 Hard fail vs warning

| Error type | Behaviour |
|---|---|
| Disallowed claim type | Hard fail — `valid: false` |
| Unknown claim type | Hard fail — `valid: false` |
| Duplicate importance values | Hard fail — `valid: false` |
| Importance out of range (not 1–3) | Hard fail — `valid: false` |
| Importance array order mismatch | Hard fail — `valid: false` |
| No issue with importance = 1 | Hard fail — `valid: false` |
| Event timestamp invalid | Hard fail — `valid: false` |
| Event overlap | Hard fail — `valid: false` |
| Event merge violation (gap < 0.5s, same type+phase) | Hard fail — `valid: false` |
| Drills present when `coaching_required = false` | Hard fail — `valid: false` |
| Corrective language in closing when `coaching_required = false` | Hard fail — `valid: false` |
| `schema_version_mismatch` (major version conflict) | Hard fail — `valid: false`, error code `schema_version_mismatch` |
| `schema_version_missing` | Hard fail — `valid: false`, error code `schema_version_missing` |
| `technique_reference_truncated: true` | Non-conformant but tolerated; logged via observability |

### 8.3 Amendment enforcement matrix

| Amendment | Enforced by | Status |
|---|---|---|
| 1 — ClaimType closed set | `outputValidator.ts` + `enduroSafetyRules.ts` | ENFORCED |
| 2 — `technique_reference` ≤500 chars | `parser.ts` (truncation on load) | ENFORCED (truncation; KB sweep pending — see §14.2) |
| 3 — Dynamics ranking rules | `retrieval/index.ts` `getDynamicsContext()` | ENFORCED |
| 4 — `issue_priority.importance` constraints | `outputValidator.ts` | ENFORCED |
| 5 — Event timestamps + merge rule | `outputValidator.ts` | ENFORCED |
| 6 — `coaching_required = false` output rules | `outputValidator.ts` | ENFORCED |
| 7 — Coaching quality minimum bar | `benchmarkHarness.ts` (review scoring) | ENFORCED IN BENCHMARK |

---

## 9. Pipeline Envelope

### 9.1 PipelineOutput shape

```typescript
interface PipelineOutput {
  // Schema versioning — §7.5
  perception_schema_version: string;
  pass2_schema_version: string;
  kb_snapshot?: KbSnapshot;           // Optional — trace reproducibility

  // Pipeline result
  status: "complete" | "gated" | "failed";
  perception: PerceptionOutput | null;
  context_pack: ContextPack | null;
  pass2: Pass2Output | null;
  safety: SafetyResult | null;

  // Failure path — required when status !== "complete"
  failure?: PipelineFailure;

  // Observability
  latency_ms: {
    pass1: number;
    kb_retrieval: number;
    pass2: number;
    safety: number;
    total: number;
  };
}
```

### 9.2 Structured failure types

When `status !== "complete"`, the `failure` field is populated:

```typescript
interface PipelineFailure {
  error_code: PipelineErrorCode;
  message: string;              // Human-readable internal description
  user_guidance?: string;       // For surfacing to the rider
  filming_tips?: string[];      // For upload screen (when usability is the cause)
}

type PipelineErrorCode =
  | "analysis_unavailable_low_context"  // Empty ContextPack — see §11
  | "usability_gate_fail"               // Pass 1 hard-gated the clip
  | "validator_hard_fail"               // Validator rejected output
  | "safety_violation"                  // Safety layer blocked coaching
  | "schema_version_mismatch"           // §7.5 — major version conflict
  | "schema_version_missing"            // §7.5 — schema_version field absent
  | "pass1_error"                       // Pass 1 model call failed
  | "pass2_error"                       // Pass 2 model call failed
  | "unknown_error";                    // Unexpected failure
```

---

## 10. Observability Contract

All stage boundaries must emit structured logs:

| Event | Required log fields |
|---|---|
| Pass 1 complete | `usability_gate`, `failure_mode`, `latency_ms` |
| KB retrieval complete | `terrain_found` (bool), `feature_count`, `dynamics_count`, any GAP messages, `latency_ms` |
| Pass 2 complete | `coaching_required`, `claim_types[]`, `latency_ms` |
| Safety evaluation | `safe`, `violations[]` (if any), `latency_ms` |
| Validator run | `valid`, `errors[]` (if any) |
| KB gap | Logged by `getDynamicsContext()` when primary failure signal has no dynamics mapping |
| Truncation | Logged when `technique_reference_truncated: true` on any KB artifact |

Observability requirements are additive — must not be removed when stages are refactored. Truncation events are logged, not silently discarded.

---

## 11. Empty ContextPack Handling

### Definition

A completely empty `ContextPack` is produced when Pass 1 perception output contains no information mappable to KB entries:
- `terrain === null` — surface type not in KB or not detectable
- `features === []` — no features detected, or detected features not in KB
- `dynamics === []` — no failure signals present, or primary signal has no dynamics mapping

### Action

An empty `ContextPack` returns an `analysis_unavailable_low_context` structured failure (error code — see §9.2). It does **not** return `coaching_required: false`.

**Rationale:** `coaching_required: false` signals that the clip was processed successfully and no coaching is warranted — a positive outcome. An empty ContextPack is a data-quality failure: the pipeline cannot produce meaningful coaching because it could not extract or map the perceptual inputs. These are different states and must not be conflated.

### Partial context threshold table

The pipeline proceeds with partial context wherever meaningful coaching is possible. Only complete emptiness triggers the structured failure.

| ContextPack state | `terrain` | `features[]` | `dynamics[]` | Pipeline action |
|---|---|---|---|---|
| Full context | non-null | ≥1 | ≥1 | Pass 2 proceeds normally |
| No dynamics | non-null | ≥1 | empty | Pass 2 proceeds — dynamics gap logged |
| Features only (no terrain) | null | ≥1 | any | Pass 2 proceeds — no terrain context available |
| Terrain only (no features) | non-null | empty | any | Pass 2 proceeds — no feature context available |
| Terrain + dynamics, no features | non-null | empty | ≥1 | Pass 2 proceeds |
| Completely empty | null | empty | empty | Returns `analysis_unavailable_low_context` |

When Pass 2 proceeds with partial context, it must not hallucinate missing KB data. Absent fields (null terrain, empty features, empty dynamics) are passed as-is — the Pass 2 prompt must handle partial input gracefully and constrain claims to what is available.

---

## 12. Output Schema Overview

### Required fields — PipelineOutput envelope

| Field | Type | Required | Notes |
|---|---|---|---|
| `perception_schema_version` | string | Yes | Major.minor format — §7.5 |
| `pass2_schema_version` | string | Yes | Major.minor format — §7.5 |
| `kb_snapshot` | KbSnapshot | Optional | Trace reproducibility — §7.5 |
| `status` | string | Yes | complete / gated / failed |
| `perception` | PerceptionOutput | Yes | null when status = gated / failed |
| `context_pack` | ContextPack | Yes | null when status = gated / failed |
| `pass2` | Pass2Output | Yes | null when status = gated / failed |
| `safety` | SafetyResult | Yes | null when status = failed |
| `failure` | PipelineFailure | Conditional | Required when status ≠ complete |
| `latency_ms` | object | Yes | Per-stage breakdown + total |

### Required fields — PerceptionOutput

Minimum required fields documented in §4. Full schema deferred to PASS1-SCHEMA child spec.

### Required fields — Pass2Output

| Field | Required | Notes |
|---|---|---|
| `schema_version` | Yes | §7.5 |
| `coaching_required` | Yes | — |
| `title` | Yes | — |
| `issue_priority` | Conditional | Required when `coaching_required = true`; must start at importance = 1, unique values 1–3 |
| `what_you_were_trying_to_do` | Conditional | Required when `coaching_required = true`; optional when false |
| `what_actually_happened` | Yes | ≤2 sentences when `coaching_required = false` |
| `why_it_went_wrong` | Conditional | Required when `coaching_required = true`; null or omitted when false |
| `what_to_do_differently` | Conditional | Required when `coaching_required = true`; null or omitted when false |
| `drills_and_practice` | Yes | `[]` when `coaching_required = false` |
| `closing` | Yes | Affirmative and non-corrective when `coaching_required = false` |

---

## 13. KB Contract

### Four-layer model

Documented in [kb-architecture.md](kb-architecture.md). Summary:

1. **Canonical KB** (`knowledge-base/`) — authored, reviewed, trusted markdown. Source of truth. Only written via the Proposal Layer.
2. **Research Corpus** — externally sourced material, Track 2 research agent. Not product truth. Not runtime-consumed.
3. **Proposal Layer** — human-gated promotion from Research Corpus to Canonical KB. No automatic promotion.
4. **Runtime Retrieval Pack** — `buildContextPack()` output. Reads Canonical KB only.

### What Pass 2 receives

Pass 2 receives the structured `ContextPack` only — not raw markdown. All prose is pre-extracted and capped at 500 characters per field (Amendment 2). Pass 2 does not read KB files directly.

### topic_id uniqueness

`topic_id` values are globally unique across all KB domains. `TERRAIN-01`, `FEATURE-07`, `DYNAMICS-04`, `MACHINE-01` all occupy the same namespace. No two KB entries — across terrain, features, dynamics, or machine domains — may share a `topic_id`. Retrieval functions reference entries by `topic_id`; non-unique IDs would cause silent incorrect lookups without error.

### Compression discipline

KB entries follow the compression discipline from `docs/feature-kb-consistency-spec-v1.md` (Section 16). Machine KB entries follow cause→effect writing standard. No coaching advice, pipeline logic, or improvement language in KB entries — factual mechanical descriptions only.

---

## 14. Amendment Status

All 7 amendments from `docs/archive/ARCH-V2-AMENDMENTS_1.md` are folded into this spec. These amendments must not be maintained as a sidecar — this spec is the canonical contract.

| # | Amendment | Status | Notes |
|---|---|---|---|
| 1 | ClaimType — closed set | ENFORCED | `outputValidator.ts` + `enduroSafetyRules.ts` |
| 2 | `technique_reference` ≤500 chars | ENFORCED (partial) | Truncation at parse time; KB entry sweep not yet done — see §14.2 |
| 3 | Dynamics retrieval ranking | ENFORCED | `getDynamicsContext()` in `lib/retrieval/index.ts` |
| 4 | `issue_priority.importance` constraints | ENFORCED | `outputValidator.ts` |
| 5 | Event timestamps + merge rule | ENFORCED | `outputValidator.ts`; Pass 1 prompt must enforce on output |
| 6 | `coaching_required = false` output rules | ENFORCED | `outputValidator.ts` |
| 7 | Coaching quality minimum bar | BENCHMARK ONLY | `benchmarkHarness.ts` review scoring — see §14.3 |

### 14.1 Amendment 1 — topic_id note

The ClaimType enum (Amendment 1) governs coaching output claim types, not KB identifiers. For completeness: `topic_id` identifiers used across KB artifacts are globally unique across all KB domains. `TERRAIN-*`, `FEATURE-*`, `DYNAMICS-*`, and `MACHINE-*` IDs all share one namespace and must not collide.

### 14.2 Amendment 2 — sweep status

The `technique_reference` truncation rule is enforced at parse time: any field exceeding 500 characters is truncated and `technique_reference_truncated: true` is set. The KB sweep — rewriting existing entries to be naturally ≤500 chars — has not been done. Truncation is the runtime safety net; the sweep is a quality improvement task. Track as: AMEND-2-SWEEP.

### 14.3 Amendment 7 — enforcement level

Amendment 7 (coaching quality minimum bar) is enforced in the benchmark harness, not in the runtime validator. This classification is non-conformant but tolerated; logged via observability. Rationale: quality checks involving causal-chain presence and signal-reference detection require semantic judgement — appropriate for benchmark review, brittle as automated runtime enforcement.

If coaching quality gates prove insufficient in benchmark runs, escalation options: (1) structural heuristics (require non-null values on specific fields), or (2) a lightweight LLM quality check post-Pass-2. Neither is in scope for v1.

---

## 15. Cost Model

### Per-clip breakdown

| Stage | Call type | Target latency | Cost |
|---|---|---|---|
| Pass 1 | Vision LLM (16 frames) | 30–45 sec | Image tokens + prompt + completion |
| KB retrieval | Disk read + JS computation | <1 sec | Negligible relative to model calls in current architecture |
| Pass 2 | Text LLM | 15–30 sec | Context pack + PerceptionOutput + completion |
| Safety | Deterministic JS | <1 sec | Negligible relative to model calls in current architecture |

**Total target:** under 90 seconds per clip. Typical estimate: 45–75 seconds.

### Token estimate (rough order of magnitude)

| Stage | Input tokens | Output tokens |
|---|---|---|
| Pass 1 | ~2000 (system prompt + 16 frames + metadata) | ~700 (PerceptionOutput) |
| Pass 2 | ~2750 (system prompt + PerceptionOutput + ContextPack + rider_note) | ~500 (coaching output) |
| **Total** | **~4750** | **~1200** |

### vs S0–S11 baseline

S0–S11 makes 11 sequential LLM calls, each with its own system prompt and accumulated context. Estimated token cost: 3–5× higher per clip. Estimated latency: 7–9 min vs ARCH-V2 target of 45–90 sec.

---

## 16. Open Questions — Child Specs

The following are explicitly deferred. They block specific implementation work as noted.

| Open question | Child spec | Blocks |
|---|---|---|
| Pass 1 full output schema — field set, enum values, confidence schema | PASS1-SCHEMA | Pass 1 implementation, Pass 2 design, `fromStage4()` adapter removal, full benchmark |
| Pass 2 prompt — system prompt, KB integration instruction, Situation/Breakdown/Correction framing | PASS2-PROMPT | Pass 2 implementation |
| Amendment 2 KB sweep — rewrite all `technique_reference` fields to natural ≤500 chars | AMEND-2-SWEEP | KB quality improvement (not runtime-blocking) |
| Amendments 2, 3, 7 — enforce / defer / drop for any unresolved enforcement gaps | AMEND-2-3-7-RESOLVE | ARCH-V2.1 final lock |
| Full 8-clip benchmark — ARCH-V2 vs S0–S11 quality and latency comparison | BENCHMARK-ARCH-V2 | Coaching quality validation |

---

*This spec is the single source of truth for ARCH-V2 architecture. Implementation files in `lib/retrieval/`, `lib/validation/`, `lib/safety/`, and `lib/benchmark/` are the canonical implementation. Where spec and implementation diverge, raise the discrepancy and resolve before the next implementation pass.*
