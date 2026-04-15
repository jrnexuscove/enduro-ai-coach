# RideMind Reasoning Pipeline — Stage Contracts v1

> **Status:** Gate 1 PASSED (2026-04-01)
> **Authority:** This document defines the contract for every pipeline stage. No implementation begins until Gate 2 (KB schemas) also passes.
> **Milestone clips:** Colin Hill (first), Mark Crash (second)
> **Model strategy:** Single-model pipeline for v1. Multi-model verification deferred to post-pipeline-validation.
> **Related:** `docs/vision-layer-spec-v1.md` — Stage 0 Observability Gate full spec (Vision Layer MVP)

---

## Architecture Overview

The pipeline has 12 stages (Stage 0 through Stage 11). Each stage receives defined inputs, produces a strict JSON output, and passes that output downstream. Stages are sequential — each stage may use outputs from any prior stage.

Stage 0 is a hard gate that runs before Stage 1. If Stage 0 rejects the clip, no downstream stages run.

Audio analysis is a **cross-cutting input**, not a separate stage. Raw audio features (engine sound, rider speech, impact sounds, environmental audio) are extracted once during ingestion and made available to stages 3, 4, 5, 6, 7, and 8 as part of their input contract.

Runtime verification and observation resolution (described in the system execution flow) are **implementation logic within relevant stages**, not separate architectural stages.

```
Ingestion (frames + audio extraction)
       │
       ▼
┌─────────────────────────────────┐
│ 0. Observability Gate           │  ← gate=fail: stops here, returns user guidance
└──────────────┬──────────────────┘
               │ gate=pass / gate=degrade (trust envelope applied downstream)
               ▼
┌─────────────────────────────────┐
│ 1. Camera Perspective Detection │
└──────────────┬──────────────────┘
               ▼
┌─────────────────────────────────┐
│ 2. Observability Assessment     │
└──────────────┬──────────────────┘
               ▼
┌─────────────────────────────────┐
│ 3. Rider Intent / Attempt       │◄── shallow terrain cues + audio
└──────────────┬──────────────────┘
               ▼
┌─────────────────────────────────┐
│ 4. Terrain & Feature Detection  │◄── audio (engine load, surface)
└──────────────┬──────────────────┘
               ▼
┌─────────────────────────────────┐
│ 5. Event Sequencing             │◄── audio (impacts, timing)
└──────────────┬──────────────────┘
               ▼
┌─────────────────────────────────┐
│ 6. Failure Type Classification  │◄── audio (engine behaviour)
└──────────────┬──────────────────┘
               ▼
┌─────────────────────────────────┐
│ 7. Crash Type Classification    │◄── audio (impact sounds)
└──────────────┬──────────────────┘
               ▼
┌─────────────────────────────────┐
│ 8. Causal Chain Construction    │◄── audio (full context)
└──────────────┬──────────────────┘
               ▼
┌─────────────────────────────────┐
│ 9. Decision Engine              │
└──────────────┬──────────────────┘
               ▼
┌─────────────────────────────────┐
│ 10. Coaching Generation         │◄── KB retrieval (targeted)
└──────────────┬──────────────────┘
               ▼
┌─────────────────────────────────┐
│ 11. Coaching Safety Validation  │
└─────────────────────────────────┘
```

---

## Cross-Cutting Input: Audio

Audio is extracted once during ingestion and made available as a structured object to all stages that accept it.

```json
{
  "audio_input": {
    "engine": {
      "rpm_pattern": "string — steady | rising | falling | erratic | stalled",
      "throttle_behaviour": "string — smooth | aggressive | hesitant | blipping",
      "clutch_indicators": "string — none | feathering | slipping | dump",
      "stall_detected": "boolean"
    },
    "rider_speech": {
      "detected": "boolean",
      "transcript": "string | null",
      "emotional_tone": "string — calm | excited | distressed | fearful | none"
    },
    "impacts": {
      "detected": "boolean",
      "count": "number",
      "timestamps_seconds": ["number"],
      "severity": "string — none | light | moderate | heavy"
    },
    "environment": {
      "surface_audio_cues": "string | null — e.g. gravel crunch, mud squelch, rock scraping",
      "other_riders_detected": "boolean",
      "background_music": "boolean"
    },
    "raw_description": "string — freeform model description of audio"
  }
}
```

**Note:** This schema is aspirational for structured extraction. In v1 implementation, audio may be provided as a freeform text description from the model, with structured fields populated where the model can reliably extract them. The contract ensures downstream stages know what to look for.

---

## Stage 0 — Observability Gate

**Purpose:** Determine whether submitted footage is usable before the reasoning pipeline runs. Stage 0 is a hard gate — it stops unusable clips before any downstream token spend. It also defines the trust envelope (confidence ceilings and coaching specificity constraints) that all downstream stages must obey.

**Relationship to Stage 2:** Stage 0 answers "should we run?" Stage 2 answers "given we're running, what can we trust?". Stage 0 is clip-level and binary (run / stop). Stage 2 is frame-level and continuous (element-by-element visibility assessment). Stage 2 only runs if Stage 0 passes.

**Model:** `claude-sonnet-4-6` via the standard `ModelProvider` interface (MVP Route A — Claude only).

### Input

- Raw video frames (same extraction as Stages 1–11)
- Video metadata: `filename`, `duration_seconds`, `resolution` (width × height), `fps`, `file_size_bytes`

### Output Schema

```json
{
  "stage": "observability_gate",
  "gate": "string — pass | fail | degrade",
  "failure_mode": "string | null — unusable_no_content | unusable_no_riding | unusable_distance | unusable_obstruction | unusable_motion | degraded_low_visibility | degraded_short_duration | degraded_low_resolution",
  "observability": {
    "primary_subject_detected": "string — rider | bike | both | none",
    "rider_visibility": "string — clear | partial | minimal | none",
    "terrain_visibility": "string — clear | partial | minimal | none",
    "outcome_observability": "string — clear | partial | ambiguous | not_visible",
    "motion_quality": "string — stable | moderate_shake | severe_shake | unusable",
    "frame_usability_ratio": "number — 0.0 to 1.0"
  },
  "confidence_ceilings": {
    "max_observation_confidence": "number — 0.0 to 1.0. Hard cap applied to all downstream stage confidence fields.",
    "max_coaching_specificity": "string — full | general | cautious_only"
  },
  "user_guidance": {
    "message": "string — human-readable explanation of the gate decision",
    "filming_tips": ["string"],
    "retry_recommended": "boolean"
  },
  "metrics": {
    "failure_mode": "string | null",
    "gate": "string — pass | fail | degrade",
    "frame_usability_ratio": "number — 0.0 to 1.0",
    "outcome_observability": "string — clear | partial | ambiguous | not_visible"
  },
  "debug": {
    "reasoning": "string",
    "confidence_factors": ["string"]
  }
}
```

**Note:** `observability` and `confidence_ceilings` are `null` when `gate === "fail"`.

### Rules

- `gate === "fail"` → pipeline stops immediately. Return Stage 0 output only (`gated: true`). No Stages 1–11 run.
- `gate === "degrade"` → pipeline runs with constrained trust envelope. Invariants: `max_observation_confidence` ≤ 0.5; `max_coaching_specificity` ≠ `"full"`.
- `gate === "pass"` → pipeline runs normally. Trust envelope reflects actual observability.
- `failure_mode` must be `null` when `gate === "pass"`.
- `failure_mode` must be set when `gate === "fail"` or `gate === "degrade"`.
- `max_observation_confidence` is enforced in `runner.ts` as a hard cap on every downstream stage's top-level `confidence` field after each stage call.
- `max_coaching_specificity === "cautious_only"` → Stage 10 must not recommend increased speed or commitment; must use hedged language ("it appears", "if visible correctly"); must prefix with observability caveat.
- `max_coaching_specificity === "general"` → Stage 10 must not reference fine detail (hand position, lever fingers, exact body angles); broad principles only.

**Failure mode → gate mapping:**

| Failure mode | Gate |
|---|---|
| `unusable_no_content` | `fail` |
| `unusable_no_riding` | `fail` |
| `unusable_distance` | `fail` |
| `unusable_obstruction` | `fail` |
| `unusable_motion` | `fail` |
| `degraded_low_visibility` | `degrade` |
| `degraded_short_duration` | `degrade` |
| `degraded_low_resolution` | `degrade` |
| None | `pass` |

**Coaching specificity mapping (degrade only):**

| Failure mode | `max_coaching_specificity` |
|---|---|
| `degraded_low_visibility` | `"general"` |
| `degraded_short_duration` | `"cautious_only"` |
| `degraded_low_resolution` | `"general"` |

### Thresholds (MVP defaults — tunable)

- **Riding activity:** `primary_subject_detected === "none"` across usable frames → `unusable_no_riding`
- **Rider visibility:** `rider_visibility === "none"` across all frames → `unusable_distance`
- **Frame usability:** `frame_usability_ratio` < 0.2 → `unusable_motion` or `unusable_obstruction`
- **Duration:** `duration_seconds` < 2.0 → `degraded_short_duration`
- **Degrade ceiling:** `max_observation_confidence` capped at 0.5 when `gate === "degrade"`

---

## Stage 1 — Camera Perspective Detection

**Purpose:** Determine how the footage was captured. This constrains what can and cannot be observed in all subsequent stages.

### Input

- Raw video frames

### Output Schema

```json
{
  "stage": "camera_perspective",
  "perspective": "string — pov | third_person | mixed",
  "confidence": "number — 0.0 to 1.0",
  "subject_visibility": {
    "rider_body_visible": "boolean",
    "bike_visible": "boolean",
    "full_body_visible": "boolean",
    "partial_body_visible": "boolean"
  },
  "camera_details": {
    "estimated_mount": "string — helmet | chest | handlebar | tripod | handheld | unknown",
    "stability": "string — stable | moderate_shake | heavy_shake",
    "distance_to_subject": "string — close | medium | far | not_applicable"
  },
  "constraints": {
    "body_position_observable": "boolean",
    "facial_expression_observable": "boolean",
    "bike_controls_observable": "boolean"
  }
}
```

### Rules

- If `perspective` is `pov`, then `body_position_observable` must be `false` and `rider_body_visible` must be `false`.
- If `distance_to_subject` is `far`, `body_position_observable` should be `false` unless rider is clearly visible.
- POV footage showing the rider's own hands/bars is still `pov`, not `third_person`.

### Example (Colin Hill)

```json
{
  "stage": "camera_perspective",
  "perspective": "third_person",
  "confidence": 0.95,
  "subject_visibility": {
    "rider_body_visible": true,
    "bike_visible": true,
    "full_body_visible": true,
    "partial_body_visible": false
  },
  "camera_details": {
    "estimated_mount": "handheld",
    "stability": "moderate_shake",
    "distance_to_subject": "medium"
  },
  "constraints": {
    "body_position_observable": true,
    "facial_expression_observable": false,
    "bike_controls_observable": false
  }
}
```

---

## Stage 2 — Observability Assessment

**Purpose:** Determine overall visual quality and identify what can and cannot be reliably observed. Sets confidence ceilings for all downstream stages.

### Input

- Raw video frames
- Stage 1 output

### Output Schema

```json
{
  "stage": "observability_assessment",
  "overall_confidence": "number — 0.0 to 1.0",
  "frame_quality": {
    "total_frames": "number",
    "usable_frames": "number",
    "issues": ["string — blur | obstruction | darkness | overexposure | distance | resolution"]
  },
  "observable_elements": {
    "rider_body_position": "string — clear | partial | not_visible",
    "bike_attitude": "string — clear | partial | not_visible",
    "terrain_surface": "string — clear | partial | not_visible",
    "terrain_gradient": "string — clear | partial | not_visible",
    "terrain_features": "string — clear | partial | not_visible",
    "obstacles": "string — clear | partial | not_visible",
    "other_riders": "string — clear | partial | not_visible"
  },
  "confidence_ceilings": {
    "body_position_max_confidence": "number — 0.0 to 1.0",
    "terrain_max_confidence": "number — 0.0 to 1.0",
    "outcome_max_confidence": "number — 0.0 to 1.0"
  },
  "limitations": ["string — freeform list of what cannot be determined from this footage"]
}
```

### Rules

- `confidence_ceilings` constrain downstream stages. No stage may claim higher confidence than the ceiling set here.
- If `overall_confidence` < 0.3, the pipeline should flag the clip as low-observability and downstream stages must operate in cautious mode (prefer "unclear" over assertion).
- POV clips automatically get `body_position_max_confidence: 0.0`.

### Example (Colin Hill)

```json
{
  "stage": "observability_assessment",
  "overall_confidence": 0.75,
  "frame_quality": {
    "total_frames": 8,
    "usable_frames": 7,
    "issues": ["moderate_shake"]
  },
  "observable_elements": {
    "rider_body_position": "clear",
    "bike_attitude": "clear",
    "terrain_surface": "clear",
    "terrain_gradient": "clear",
    "terrain_features": "partial",
    "obstacles": "partial",
    "other_riders": "not_visible"
  },
  "confidence_ceilings": {
    "body_position_max_confidence": 0.9,
    "terrain_max_confidence": 0.8,
    "outcome_max_confidence": 0.6
  },
  "limitations": [
    "End of clip may not capture full outcome",
    "Small terrain features (roots, embedded rocks) may not be visible at this distance"
  ]
}
```

---

## Stage 3 — Rider Intent / Attempt Detection

**Purpose:** Determine what the rider was trying to achieve. This is a product-critical stage — coaching is meaningless without understanding intent.

### Reconciliation Note

This stage runs before full Terrain & Feature Detection (Stage 4) but is **not working in a vacuum**. It has access to:
- Shallow terrain/feature cues visible in raw frames (gradient direction, obvious surface type, visible obstacles)
- Audio cues (engine behaviour suggesting climb/descent, rider speech)
- Camera perspective and observability from Stages 1–2

Stage 4 then performs the deeper structured terrain pass. Intent may be refined after Stage 4 if terrain analysis reveals additional context.

### Input

- Raw video frames
- Audio input (cross-cutting)
- Stage 1 output (perspective)
- Stage 2 output (observability)

### Output Schema

```json
{
  "stage": "rider_intent",
  "primary_intent": "string",
  "intent_category": "string — climb | descent | traverse | jump | obstacle_clear | trail_ride | technical_section | race_section | practice | unknown",
  "confidence": "number — 0.0 to 1.0",
  "intent_cues": {
    "visual_cues": ["string — what in the frames suggests this intent"],
    "audio_cues": ["string — what in the audio suggests this intent"],
    "contextual_cues": ["string — e.g. other riders waiting, approach angle"]
  },
  "shallow_terrain_read": {
    "apparent_gradient": "string — flat | uphill | downhill | steep_uphill | steep_downhill | undulating",
    "apparent_surface": "string — rocky | muddy | loose | hardpack | mixed | unclear",
    "obvious_features": ["string — e.g. visible jump face, large rock step, fallen tree"]
  },
  "difficulty_estimate": "string — easy | moderate | hard | extreme | unclear",
  "refinement_needed": "boolean — true if Stage 4 terrain analysis may change intent interpretation"
}
```

### Rules

- `primary_intent` should be a natural language statement, e.g. "Rider is attempting to climb a steep rocky hill" — not just a category.
- If `confidence` < 0.5, `primary_intent` must include qualifier language ("appears to be", "likely attempting").
- Audio cues (rider speech like "I'm going for it", engine revving for an approach) are strong intent signals.
- Never fabricate intent from ambiguous footage. "Unknown" is valid.

### Example (Colin Hill)

```json
{
  "stage": "rider_intent",
  "primary_intent": "Rider is attempting to climb a rocky hill section from a standing start or slow approach",
  "intent_category": "climb",
  "confidence": 0.85,
  "intent_cues": {
    "visual_cues": [
      "Rider facing uphill on visible gradient",
      "Bike oriented up-slope across multiple frames",
      "Rider body leaning forward"
    ],
    "audio_cues": [
      "Engine revving under load consistent with climbing effort"
    ],
    "contextual_cues": [
      "No other riders visible — solo attempt"
    ]
  },
  "shallow_terrain_read": {
    "apparent_gradient": "steep_uphill",
    "apparent_surface": "rocky",
    "obvious_features": []
  },
  "difficulty_estimate": "moderate",
  "refinement_needed": false
}
```

---

## Stage 4 — Terrain & Feature Detection

**Purpose:** Perform deep structured analysis of terrain surface, gradient, conditions, and discrete features. This is the detailed pass — Stage 3's shallow read is a preview, this is the full assessment.

### Input

- Raw video frames
- Audio input (cross-cutting — surface sounds, engine load)
- Stages 1–3 outputs

### Output Schema

```json
{
  "stage": "terrain_feature_detection",
  "surface": {
    "primary_type": "string — rock | mud | sand | loam | hardpack | clay | shale | gravel | grass | mixed",
    "secondary_type": "string | null",
    "condition": "string — dry | damp | wet | saturated | frozen | dusty",
    "traction_estimate": "string — high | moderate | low | very_low | variable",
    "confidence": "number — 0.0 to 1.0"
  },
  "gradient": {
    "overall": "string — flat | gentle_up | moderate_up | steep_up | very_steep_up | gentle_down | moderate_down | steep_down | very_steep_down | undulating",
    "changes": ["string — describe gradient transitions, e.g. 'Steepens significantly at midpoint'"],
    "camber": "string — neutral | off_camber_left | off_camber_right | cambered | variable"
  },
  "features_detected": [
    {
      "feature_type": "string — jump | drop | step_up | step_down | log | rock_garden | rut | berm | roots | switchback | water_crossing | gully | ledge | whoops | elevated_beam | none",
      "location_in_sequence": "string — e.g. 'visible at frames 4-6', 'midway through clip'",
      "severity": "string — minor | moderate | significant | major",
      "confidence": "number — 0.0 to 1.0"
    }
  ],
  "line_options": {
    "multiple_lines_visible": "boolean",
    "chosen_line_quality": "string — optimal | acceptable | suboptimal | poor | not_assessable",
    "alternative_lines": ["string — describe visible alternatives"]
  },
  "environmental_factors": {
    "visibility": "string — clear | partial | poor",
    "tree_cover": "string — open | partial | dense",
    "trail_width": "string — wide | moderate | narrow | very_narrow"
  },
  "audio_terrain_cues": {
    "surface_sounds": "string | null",
    "engine_load_indicators": "string | null"
  }
}
```

### Rules

- `features_detected` array may be empty. Not every clip has discrete features.
- Every feature must have a `confidence` score. Features below 0.4 confidence should include "possible" or "unclear" qualifier.
- `traction_estimate` must account for both surface type and condition.
- Confidence values must respect Stage 2 `terrain_max_confidence` ceiling.
- Audio cues (gravel crunch, mud squelch, engine labouring) should inform surface and gradient assessment.
- Note: off-camber is not a feature_type — it is detected via gradient.camber field and triggers retrieval of FEATURE-02 off-camber profile.

### Example (Colin Hill)

```json
{
  "stage": "terrain_feature_detection",
  "surface": {
    "primary_type": "rock",
    "secondary_type": "loose",
    "condition": "dry",
    "traction_estimate": "moderate",
    "confidence": 0.8
  },
  "gradient": {
    "overall": "steep_up",
    "changes": ["Consistent gradient throughout visible section"],
    "camber": "neutral"
  },
  "features_detected": [],
  "line_options": {
    "multiple_lines_visible": false,
    "chosen_line_quality": "acceptable",
    "alternative_lines": []
  },
  "environmental_factors": {
    "visibility": "clear",
    "tree_cover": "partial",
    "trail_width": "moderate"
  },
  "audio_terrain_cues": {
    "surface_sounds": "Rock scraping and loose stone movement",
    "engine_load_indicators": "Engine under sustained load consistent with steep climb"
  }
}
```

---

## Stage 5 — Event Sequencing

**Purpose:** Segment the clip into a timeline of events. Identify the setup, execution, key transitions, and outcome. This is the backbone of the coaching narrative.

### Input

- Raw video frames
- Audio input (cross-cutting — impacts, timing, engine changes)
- Stages 1–4 outputs

### Output Schema

```json
{
  "stage": "event_sequencing",
  "segments": [
    {
      "segment_id": "number — sequential from 1",
      "phase": "string — approach | setup | execution | transition | failure_point | recovery | outcome | post_event",
      "description": "string — what happens in this segment",
      "frame_range": "string — e.g. 'frames 1-3' or 'seconds 0-5'",
      "rider_state": {
        "body_position": "string — standing | seated | transitioning | not_visible",
        "throttle_state": "string — accelerating | steady | decelerating | off | unknown",
        "balance_state": "string — stable | unstable | losing_balance | fallen | not_assessable"
      },
      "key_observations": ["string"],
      "audio_markers": ["string — relevant audio events in this segment"]
    }
  ],
  "critical_moment": {
    "segment_id": "number — which segment contains the decisive moment",
    "description": "string — what specifically happened at this moment",
    "timestamp_estimate": "string | null"
  },
  "outcome": {
    "result": "string — completed | stall | bail | crash | stuck | unknown",
    "confidence": "number — 0.0 to 1.0",
    "outcome_evidence": ["string — what specifically indicates this outcome"]
  }
}
```

### Rules

- Every clip must have at least 2 segments (setup + outcome). Most clips should have 3–5.
- `critical_moment` must identify the single most important moment for coaching purposes. For successful rides, this should be the most challenging point or the best execution moment.
- `outcome.result` of `clean` requires positive evidence (rider completing the section, continuing forward, expressions of success). The absence of a crash is NOT sufficient evidence for `clean`.
- `outcome.confidence` must respect Stage 2 `outcome_max_confidence` ceiling.
- Audio markers (engine stall, impact sound, rider exclamation) are primary outcome evidence and must be used where available.

### Example (Colin Hill)

```json
{
  "stage": "event_sequencing",
  "segments": [
    {
      "segment_id": 1,
      "phase": "approach",
      "description": "Rider approaches the base of a rocky hill section, seated on the bike",
      "frame_range": "frames 1-2",
      "rider_state": {
        "body_position": "seated",
        "throttle_state": "steady",
        "balance_state": "stable"
      },
      "key_observations": [
        "Rider is seated — not in attack position for hill climb",
        "Low entry speed"
      ],
      "audio_markers": ["Engine at moderate RPM"]
    },
    {
      "segment_id": 2,
      "phase": "execution",
      "description": "Rider continues climbing while remaining seated, bike working up the gradient",
      "frame_range": "frames 3-5",
      "rider_state": {
        "body_position": "seated",
        "throttle_state": "accelerating",
        "balance_state": "stable"
      },
      "key_observations": [
        "Still seated — weight distribution suboptimal for rocky climb",
        "Forward progress is being maintained but with effort"
      ],
      "audio_markers": ["Engine RPM rising, rear wheel traction sounds"]
    },
    {
      "segment_id": 3,
      "phase": "failure_point",
      "description": "Rider loses momentum and bails from the climb attempt",
      "frame_range": "frames 6-8",
      "rider_state": {
        "body_position": "seated",
        "throttle_state": "decelerating",
        "balance_state": "unstable"
      },
      "key_observations": [
        "Momentum lost — bike slowing visibly",
        "Rider dismounts or stops the attempt"
      ],
      "audio_markers": ["Engine note drops, possible stall indicators"]
    }
  ],
  "critical_moment": {
    "segment_id": 2,
    "description": "Rider remains seated throughout the climbing section rather than standing on pegs. This is the root technique issue — the seated position prevents proper weight distribution for the climb.",
    "timestamp_estimate": "~5-10 seconds"
  },
  "outcome": {
    "result": "bail",
    "confidence": 0.6,
    "outcome_evidence": [
      "Rider appears to stop forward progress in final frames",
      "Audio suggests engine deceleration and possible stall"
    ]
  }
}
```

---

## Stage 6 — Failure Type Classification

**Purpose:** Classify the type of failure that occurred (if any). This is broader than crash type — it covers any deviation from the rider's intent.

### Reconciliation Note

Failure Type comes before Crash Type because failure classification applies to all clips (including non-crash outcomes like stalls, momentum loss, poor line choice). Crash Type (Stage 7) refines the failure diagnosis when a crash specifically occurs. Both feed into Causal Chain Construction (Stage 8).

### Input

- Audio input (cross-cutting — engine behaviour patterns)
- Stages 1–5 outputs

### Output Schema

```json
{
  "stage": "failure_type_classification",
  "failure_occurred": "boolean",
  "failure_type": "string | null — technique | decision | momentum | traction | mechanical | line_choice | fitness | none | unknown",
  "confidence": "number — 0.0 to 1.0",
  "failure_description": "string | null — natural language description of the failure",
  "contributing_factors": [
    {
      "factor": "string",
      "role": "string — primary | contributing | possible",
      "evidence": ["string"]
    }
  ],
  "symptoms_vs_root": {
    "observed_symptoms": ["string — what was visible/audible"],
    "likely_root_cause": "string — preliminary root cause assessment",
    "root_cause_confidence": "number — 0.0 to 1.0"
  },
  "audio_failure_cues": {
    "engine_behaviour": "string | null — e.g. 'engine stalled at failure point', 'over-revving with no traction'",
    "impact_correlation": "string | null — e.g. 'impact sound at frame 6 confirms crash timing'"
  },
  "no_failure_note": "string | null — if no failure, explain what went right or what was the closest risk"
}
```

### Rules

- `failure_type` must distinguish root causes from symptoms. "Rider crashed" is a symptom. "Rider's weight was too far back for the jump transition" is a root cause.
- For `clean` outcome clips, `failure_occurred` should be `false` but `no_failure_note` should still identify the closest risk or area for improvement.
- If multiple failure types contributed, list the primary in `failure_type` and others in `contributing_factors`.
- Audio evidence (engine stall = momentum failure, sustained wheelspin = traction failure) should be explicitly cited.

### Example (Colin Hill)

```json
{
  "stage": "failure_type_classification",
  "failure_occurred": true,
  "failure_type": "technique",
  "confidence": 0.8,
  "failure_description": "Rider remained seated throughout a steep rocky hill climb instead of standing on the pegs. Seated position prevented proper weight distribution, reducing front wheel traction and overall climbing effectiveness.",
  "contributing_factors": [
    {
      "factor": "Seated body position throughout climb",
      "role": "primary",
      "evidence": [
        "Rider visibly seated in all frames where body is observable",
        "No transition to standing position at any point"
      ]
    },
    {
      "factor": "Insufficient entry momentum",
      "role": "contributing",
      "evidence": [
        "Low speed at approach",
        "Engine audio suggests moderate RPM at entry"
      ]
    }
  ],
  "symptoms_vs_root": {
    "observed_symptoms": [
      "Momentum loss on the climb",
      "Bail / abandoned attempt"
    ],
    "likely_root_cause": "Seated body position preventing effective weight distribution for hill climbing",
    "root_cause_confidence": 0.75
  },
  "audio_failure_cues": {
    "engine_behaviour": "Engine RPM dropping toward end suggests momentum loss, not mechanical failure",
    "impact_correlation": null
  },
  "no_failure_note": null
}
```

---

## Stage 7 — Crash Type Classification

**Purpose:** When a crash occurs, classify the crash mechanism. Different crash types require fundamentally different coaching.

### Reconciliation Note

This stage only activates when Stage 5 (Event Sequencing) outcome includes a crash or Stage 6 indicates a crash-related failure. It refines the failure diagnosis — an OTB from a jump needs different coaching than an OTB in a rut. Both Stage 6 and Stage 7 outputs feed into Stage 8 (Causal Chain Construction).

### Input

- Audio input (cross-cutting — impact sounds, crash timing)
- Stages 1–6 outputs

### Output Schema

```json
{
  "stage": "crash_type_classification",
  "crash_occurred": "boolean",
  "crash_type": "string | null — otb | lowside | highside | tip_over | stall_drop | slide | ejection | none | unknown",
  "crash_mechanism": "string | null — natural language description of how the crash happened",
  "severity_estimate": "string — none | minor | moderate | serious | unknown",
  "crash_phase": "string | null — which event phase the crash occurred in (from Stage 5 segment_id)",
  "body_dynamics": {
    "rider_separation": "boolean | null — did rider separate from bike",
    "direction_of_fall": "string | null — forward | backward | left | right | over_bars | unknown",
    "bike_behaviour": "string | null — e.g. 'bike continued forward', 'bike fell on rider side'"
  },
  "confidence": "number — 0.0 to 1.0",
  "audio_crash_evidence": {
    "impact_detected": "boolean",
    "impact_description": "string | null",
    "post_crash_audio": "string | null — e.g. 'rider groaning', 'engine still running', 'silence'"
  },
  "not_applicable_reason": "string | null — if no crash, explain why this stage was skipped or what the actual outcome was"
}
```

### Rules

- If `crash_occurred` is `false`, most fields should be `null` and `not_applicable_reason` must explain the actual outcome.
- `crash_type` must describe the mechanism, not the consequence. "OTB" is a mechanism. "Rider got hurt" is a consequence.
- `severity_estimate` should be based on observable evidence only. Do not speculate about injuries.
- Different crash types map to different coaching: OTB = weight distribution. Lowside = traction management. Highside = throttle control. Tip-over = balance/momentum. This mapping is used by the Decision Engine.

### Example (Colin Hill — no crash)

```json
{
  "stage": "crash_type_classification",
  "crash_occurred": false,
  "crash_type": null,
  "crash_mechanism": null,
  "severity_estimate": "none",
  "crash_phase": null,
  "body_dynamics": {
    "rider_separation": null,
    "direction_of_fall": null,
    "bike_behaviour": null
  },
  "confidence": 0.7,
  "audio_crash_evidence": {
    "impact_detected": false,
    "impact_description": null,
    "post_crash_audio": null
  },
  "not_applicable_reason": "Rider bailed from the climb attempt — stopped and dismounted rather than crashing. No impact or fall detected."
}
```

---

## Stage 8 — Causal Chain Construction

**Purpose:** Build the complete causal chain from root cause through contributing factors to outcome. This is the diagnostic core — it connects observation to coaching.

### Input

- Audio input (cross-cutting — full context for causal reasoning)
- Stages 1–7 outputs

### Output Schema

```json
{
  "stage": "causal_chain",
  "chain": [
    {
      "step": "number — sequential from 1, starting at root cause",
      "event": "string — what happened at this step",
      "caused_by": "number | null — step number that caused this, null for root cause",
      "evidence": ["string — observations that support this link"],
      "confidence": "number — 0.0 to 1.0"
    }
  ],
  "root_cause": {
    "description": "string — the single most upstream cause that the rider could have changed",
    "category": "string — technique | decision | preparation | fitness | equipment | external",
    "coachable": "boolean — can this be improved through coaching"
  },
  "outcome_connection": "string — how the root cause led to the actual outcome",
  "counterfactual": "string — what would likely have happened if the root cause was addressed",
  "chain_confidence": "number — 0.0 to 1.0 — overall confidence in the causal chain"
}
```

### Rules

- The chain must start at the root cause and end at the outcome. Every link must have evidence.
- `counterfactual` is critical for coaching — it's the answer to "what should I have done differently?"
- If the causal chain has low confidence, say so. A tentative chain is better than a fabricated confident one.
- Root cause must be something the rider could realistically change. "The hill was too steep" is not a coachable root cause. "Rider did not carry enough entry speed for the gradient" is.

### Example (Colin Hill)

```json
{
  "stage": "causal_chain",
  "chain": [
    {
      "step": 1,
      "event": "Rider remained seated throughout the hill climb",
      "caused_by": null,
      "evidence": [
        "Seated position visible in all frames",
        "No standing transition observed"
      ],
      "confidence": 0.9
    },
    {
      "step": 2,
      "event": "Weight distribution shifted too far rearward for effective climbing",
      "caused_by": 1,
      "evidence": [
        "Seated position on uphill gradient pushes weight back",
        "Front wheel appears light in later frames"
      ],
      "confidence": 0.75
    },
    {
      "step": 3,
      "event": "Reduced front traction and climbing efficiency led to momentum loss",
      "caused_by": 2,
      "evidence": [
        "Visible speed reduction across frames",
        "Engine audio shows RPM dropping"
      ],
      "confidence": 0.7
    },
    {
      "step": 4,
      "event": "Rider bailed from the attempt",
      "caused_by": 3,
      "evidence": [
        "Final frames show rider stopping/dismounting"
      ],
      "confidence": 0.6
    }
  ],
  "root_cause": {
    "description": "Rider remained seated instead of standing on the foot pegs during a steep rocky hill climb",
    "category": "technique",
    "coachable": true
  },
  "outcome_connection": "Seated position prevented proper weight distribution for the gradient, causing progressive momentum loss until the rider could no longer continue and bailed.",
  "counterfactual": "Standing with chest forward and weight over the front wheel would have improved traction, allowed better throttle control, and likely enabled a successful climb.",
  "chain_confidence": 0.7
}
```

---

## Stage 9 — Decision Engine / Coaching Strategy Mapping

**Purpose:** Convert diagnosis into coaching strategy. Decide what to coach, in what order, and what to leave out. This is the layer that makes the system a coach rather than an analyser.

### MVP Scope (v1)

Required outputs: `primary_issue`, `root_cause`, `coaching_priority_order`, `risk_flags`, `recommended_tone`, `secondary_issues`.

Deferred to v2: `suppressions`, `intervention_type` taxonomy, drill selection logic.

### Input

- Stages 1–8 outputs (all prior analysis)

### Output Schema

```json
{
  "stage": "decision_engine",
  "primary_issue": {
    "description": "string — the single highest-impact thing to coach",
    "why_primary": "string — why this matters most"
  },
  "root_cause": {
    "description": "string — from Stage 8, confirmed or refined",
    "coachable": "boolean"
  },
  "secondary_issues": [
    {
      "description": "string",
      "priority": "number — 2, 3, etc",
      "relationship_to_primary": "string — caused_by_same_root | independent | consequence"
    }
  ],
  "coaching_priority_order": [
    "string — ordered list of what to address, most important first"
  ],
  "recommended_tone": "string — encouraging | direct | cautious | celebratory | serious",
  "risk_flags": [
    {
      "flag": "string — description of the risk",
      "severity": "string — low | medium | high | critical",
      "action": "string — what the coaching must do about this"
    }
  ],
  "clip_disposition": "string — coaching_needed | positive_reinforcement | safety_critical | low_observability_caveat",
  "primary_domain": "string — CoachingDomain enum: body_position | throttle_control | clutch_control | braking | line_choice | speed_management | balance. Single domain addressing root cause.",
  "secondary_domains": ["string — CoachingDomain[]. Domains addressing contributing factors. Max 2."],
  "coaching_constraints": {
    "rider_intent": "string — from Stage 3 primary_intent",
    "terrain_context": "string — from Stage 4 surface + gradient summary",
    "max_points": 3
  },
  "skill_tags": ["string — SkillTag[]. 1-3 specific skill tags from the Skill Tag Taxonomy (docs/skill-tag-taxonomy-v1.md). Must belong to a declared coaching_domain. Max 3."],
  "tag_confidence": "string — high | medium | low | null. Confidence in skill tag assignment. null when no tags assigned."
}
```

### Rules

- `primary_issue` must be **the highest-impact fix that would have changed the outcome**. Not everything that's true — the one thing that matters most.
- `coaching_priority_order` should contain a maximum of 3 items for v1. Riders can only absorb so much.
- For `clean` outcome clips, `clip_disposition` should be `positive_reinforcement` and coaching should lead with what went well.
- `recommended_tone` must account for crash severity. Serious crashes get `serious` or `cautious`, not `encouraging`.
- `risk_flags` with `critical` severity must be addressed in coaching output regardless of priority order (e.g. "rider was not wearing a helmet").
- `primary_domain` must use one of the 7 valid `CoachingDomain` values: `body_position`, `throttle_control`, `clutch_control`, `braking`, `line_choice`, `speed_management`, `balance`. `timing` and `commitment` are not valid domains — timing-related skills are captured as `skill_tags` within their parent domain, and commitment is captured as the `line_commitment` skill tag.
- `skill_tags` must be mechanism-focused (what the rider did), not outcome-focused (what happened). See `docs/skill-tag-taxonomy-v1.md` for the full tag vocabulary and selection heuristics.
- Each `skill_tag` must belong to either the `primary_domain` or a `secondary_domains` entry. Tags from undeclared domains are invalid.
- Maximum 3 `skill_tags`. In compound failures, prefer tags with the highest counterfactual leverage — the earliest corrections most likely to change the outcome.
- For `positive_reinforcement` clips, `skill_tags` may describe demonstrated strengths.
- `tag_confidence` is `null` when `skill_tags` is empty. Otherwise constrained by Stage 2 observability ceilings.

### Example (Colin Hill)

```json
{
  "stage": "decision_engine",
  "primary_issue": {
    "description": "Rider remained seated throughout a steep rocky hill climb",
    "why_primary": "Standing is the fundamental technique for hill climbing. Remaining seated compromised weight distribution, traction, and ultimately caused the bail. Fixing this single issue would most likely result in a successful climb."
  },
  "root_cause": {
    "description": "Seated body position during hill climb",
    "coachable": true
  },
  "secondary_issues": [
    {
      "description": "Entry speed may have been insufficient for the gradient",
      "priority": 2,
      "relationship_to_primary": "independent"
    }
  ],
  "coaching_priority_order": [
    "Stand on the pegs with chest forward for hill climbs",
    "Carry more entry momentum before the hill steepens"
  ],
  "recommended_tone": "encouraging",
  "risk_flags": [],
  "clip_disposition": "coaching_needed",
  "primary_domain": "body_position",
  "secondary_domains": ["speed_management"],
  "coaching_constraints": {
    "rider_intent": "steep rocky hill climb",
    "terrain_context": "rocky, steep_up gradient",
    "max_points": 3
  },
  "skill_tags": ["fore_aft_weight_distribution", "standing_position", "entry_speed_judgement"],
  "tag_confidence": "high"
}
```

> For full domain definitions, skill tag vocabulary, domain boundary rules, tag selection heuristics, and worked examples, see `docs/skill-tag-taxonomy-v1.md`

---

## Stage 10 — Coaching Generation (Conversational Output)

**Purpose:** Generate the final coaching output that the rider sees. Must follow the product coaching standard and feel like a real expert coach.

### Input

- Stage 9 output (coaching strategy)
- Retrieved KB entries (targeted retrieval based on failure type, terrain, technique)
- Stages 1–8 for reference context

### KB Retrieval Note

KB retrieval happens here — after observation, not before. Only entries relevant to the diagnosed failure type, terrain, and technique are retrieved. No large context dumps.

### Output Schema

```json
{
  "stage": "coaching_generation",
  "coaching_output": {
    "what_you_were_trying_to_do": "string — restate the rider's intent in second person",
    "what_actually_happened": "string — factual, specific, non-judgmental",
    "why_it_went_wrong": "string — causal explanation, not just description",
    "what_to_do_differently": "string — specific, actionable, technique-focused",
    "drills_and_practice": [
      {
        "drill_name": "string",
        "drill_type": "string — on_bike | off_bike | mental",
        "instructions": "string",
        "purpose": "string — what this drill develops"
      }
    ],
    "closing": "string — encouraging, human, specific to this rider's situation"
  },
  "kb_entries_used": ["string — list of KB entry IDs/names retrieved"],
  "tone_applied": "string — from Stage 9 recommended_tone",
  "word_count": "number",
  "observability_caveats_included": "boolean — were any uncertainty caveats included in the output"
}
```

### Coaching Output Standard

Every response must follow this structure:
1. What you were trying to do
2. What actually happened
3. Why it went wrong (causal, not descriptive)
4. What to do differently (specific and actionable)
5. Drills and practice (on-bike + off-bike where relevant)
6. Encouraging, human closing

### Tone Rules

- Expert but calm
- Direct but supportive
- No generic phrasing ("great effort!", "keep practising!")
- No over-analysis or data dumping
- No AI-sounding language
- Reference specific observations from the footage, not abstract principles

### Example (Colin Hill — coaching text)

```json
{
  "stage": "coaching_generation",
  "coaching_output": {
    "what_you_were_trying_to_do": "You were tackling a steep rocky hill climb — a proper test of hill technique.",
    "what_actually_happened": "You stayed seated on the bike the entire way up. As the gradient steepened, you gradually lost momentum and had to bail before reaching the top.",
    "why_it_went_wrong": "Sitting on a steep climb shifts your weight too far back. Your front wheel gets light, your rear wheel has to do all the work, and every rock and rut slows you down because your body can't absorb the impacts. It's the single biggest reason you ran out of steam.",
    "what_to_do_differently": "Stand on the pegs before the hill starts. Get your chest forward — think about pointing your chin over the front number plate. Keep a slight bend in your knees and elbows so your legs absorb the terrain, not your spine. Your weight needs to be forward enough that the front wheel tracks and the rear wheel drives.",
    "drills_and_practice": [
      {
        "drill_name": "Standing hill starts",
        "drill_type": "on_bike",
        "instructions": "Find a gentle slope in a field or car park. Practice pulling away in standing position with chest forward. Once comfortable, find progressively steeper gradients. Focus on maintaining the standing position from start to finish — no sitting down.",
        "purpose": "Builds the muscle memory for standing climbs so it becomes default behaviour"
      },
      {
        "drill_name": "Momentum commitment",
        "drill_type": "on_bike",
        "instructions": "On a familiar trail with a moderate hill, experiment with different entry speeds. You'll quickly feel the difference between arriving with enough momentum versus having to manufacture it mid-climb.",
        "purpose": "Develops judgement for how much speed to carry into a hill"
      }
    ],
    "closing": "The good news is this is a pure technique fix — you've got the bike and the bottle for this hill, you just need to get out of the saddle. Next time you're at this spot, stand up before the slope starts, chin forward, and commit. You'll be surprised how much easier it feels."
  },
  "kb_entries_used": ["hill-climbing-body-position", "attack-position-fundamentals"],
  "tone_applied": "encouraging",
  "word_count": 312,
  "observability_caveats_included": false
}
```

---

## Stage 11 — Safety & Contradiction Validation

**Purpose:** Final safety gate. Validates coaching output against failure diagnosis and crash type. Validator only — does not rewrite or regenerate coaching.

### Input

- Stage 2 output (observability assessment)
- Stage 6 output (failure type classification)
- Stage 7 output (crash type/severity — nullable)
- Stage 8 output (causal chain)
- Stage 9 output (coaching strategy)
- Stage 10 output (coaching text)

### Output Schema

```json
{
  "stage": "coaching_safety_validation",
  "safe": "boolean",
  "flags": {
    "speed_risk": "boolean",
    "contradiction": "boolean",
    "severity_mismatch": "boolean",
    "observability_overreach": "boolean"
  },
  "issues": ["string"],
  "confidence_adjustment": "number | null",
  "debug": {
    "stage": "coaching_safety_validation",
    "checks_performed": ["string"],
    "raw_model_response": "string | null"
  }
}
```

### Validation Checks

- **`speed_risk`:** Flag if coaching advice to increase speed follows a speed-related crash or failure without a qualifying constraint (e.g. "only on sections you know well", "once body position is correct first").
- **`contradiction`:** Flag if the coaching advice would recreate the mechanism described in the Stage 8 causal chain — i.e. coaching the rider to do the thing that caused the failure.
- **`severity_mismatch`:** Flag if the coaching tone does not match the crash severity from Stage 7 — e.g. an encouraging, casual tone on a clip with `severity_estimate: serious`.
- **`observability_overreach`:** Flag if coaching claims precision beyond what Stage 2 confidence ceilings permit — e.g. specific body position claims when `body_position_max_confidence` is 0.0 or when `rider_body_position` is `not_visible`.

### Hard-Fail Rules

These conditions set `safe: false`:

- `contradiction: true` — always hard fail
- `speed_risk: true` — hard fail only when speed advice is unqualified
- `severity_mismatch: true` — hard fail only when Stage 7 `severity_estimate` is `serious`

### Warning-Only Rules

These flags may coexist with `safe: true`:

- `observability_overreach` — always warning-only
- `speed_risk` with qualified advice — warning-only
- `severity_mismatch` with non-serious severity — warning-only

### Confidence Cap Rules

When flags are raised, `confidence_adjustment` is set to the lowest applicable cap:

- `observability_overreach` alone → `0.6`
- `contradiction` → `0.5`
- Unqualified `speed_risk` → `0.4`
- Multiple flags → lowest applicable cap
- No flags → `null`

### Business Rule Validation

`validateStage11BusinessRules(output, stage7)` validates output consistency only:

- Flags require supporting `issues` entries (a flag without a corresponding issue is invalid)
- `confidence_adjustment` without any flags is invalid
- Flags without `confidence_adjustment` is accepted
- Business rules do not re-derive whether speed qualifiers were present in the coaching text — the model determines that during validation

### Validation Status

- 4/4 synthetic fixtures pass (2026-04-10)
- 2/2 business-rule unit tests pass (2026-04-10)

### Example (Colin Hill — no flags)

```json
{
  "stage": "coaching_safety_validation",
  "safe": true,
  "flags": {
    "speed_risk": false,
    "contradiction": false,
    "severity_mismatch": false,
    "observability_overreach": false
  },
  "issues": [],
  "confidence_adjustment": null,
  "debug": {
    "stage": "coaching_safety_validation",
    "checks_performed": [
      "speed_risk: no speed advice present — skip",
      "contradiction: coaching recommends standing position, causal chain root cause is seated position — no contradiction",
      "severity_mismatch: severity_estimate none, tone encouraging — acceptable",
      "observability_overreach: body position claims within Stage 2 ceiling (0.9) — no overreach"
    ],
    "raw_model_response": null
  }
}
```

---

## Appendix A — Decision Log

| Date | Decision | Reasoning | Implications |
|------|----------|-----------|--------------|
| 2026-04-10 | Stage 11 contract updated to match implementation — hard-fail rules clarified, warning-only flags formalised | Original contract used different schema. Implementation validated with 4 fixtures + 2 unit tests. Contract locked post-validation. | speed_risk no longer unconditionally hard-fail; severity_mismatch gated on Stage 7 severity; business rules receive stage7 input |
| 2026-04-01 | Gate 1 passed with reconciliations | Pipeline structure validated via stress test and ChatGPT review | 11-stage pipeline is authoritative architecture |
| 2026-04-01 | Intent before Terrain (but not in vacuum) | Product requires explicit intent detection early; shallow terrain cues available from raw frames | Stage 3 contracts must specify available inputs including shallow terrain read |
| 2026-04-01 | Failure Type before Crash Type | Failure classification applies to all clips; crash type refines when crash exists | Both feed into Causal Chain; contracts clarify relationship |
| 2026-04-01 | Audio as cross-cutting input | Audio informs multiple stages; separate audio stage would create unnecessary coupling | Audio schema defined once, consumed by stages 3–8 |
| 2026-04-01 | Decision Engine MVP scope | 6 outputs for v1; suppressions/intervention taxonomy deferred | Prevents over-engineering; v2 expansion path is clear |
| 2026-04-01 | Single-model pipeline for v1 | Multi-model verification adds complexity without proven benefit yet | Build and validate single-model first; add verifier if needed |
| 2026-04-01 | Colin Hill and Mark Crash as milestone clips | Colin Hill has complete scoring data and tests body position; Mark Crash is hardest test | Success criteria tied to specific, known clips |

---

## Appendix B — Gate Status

| Gate | Description | Status | Date |
|------|-------------|--------|------|
| Gate 1 | Pipeline stage definitions approved | **PASSED** | 2026-04-01 |
| Gate 2 | KB entry schemas approved | **PASSED** | 2026-04-01 |
| Gate 3 | Pipeline implemented and validated | **PASSED** | 2026-04-09 |

---

## Appendix C — Next Steps

1. **T1: Full 8-clip retest** through complete pipeline
2. **KB retrieval wiring** into Stage 10
3. **Thin UI** for coaching output display
4. **Stage 10 + KB prompt tuning** based on T1 results
