# RideMind Vision Layer — MVP Spec v1

> **Status:** LOCKED
> **Created:** 2026-04-15
> **Reviewed by:** ChatGPT (cross-review, 7 fixes + 2 nits applied)
> **Unblocks:** UI-WIRE-1 (wire real pipeline into UI)
> **Related docs:**
> - `docs/pipeline-contracts-v1.md` — stage contracts (Stages 1–11)
> - `docs/ridemind-phase3-master-plan-v1.md` — phase plan and sequencing

---

## Overview

The Vision Layer is the entry point of the RideMind reasoning pipeline. It controls what reaches the reasoning stages and defines the trust envelope for all downstream analysis.

Three responsibilities:

1. **Stage 0 — Observability Gate:** hard-gate unusable clips before burning tokens on 11 reasoning stages. Define observability constraints that downstream stages must obey.
2. **Perception Routing:** define which model(s) handle visual analysis, with an extensible architecture for future multi-track disambiguation.
3. **Upload Filming Guidance:** surface empirical guidance to users before and after upload to improve input quality at source.

---

## 1. Stage 0 — Observability Gate

### Purpose

Assess whether submitted footage is usable before the reasoning pipeline runs. Stage 0 is not a quality score — it is a **contract setter**. It determines:

- Whether the clip should enter the pipeline at all (hard gate)
- What is observable vs not observable (observability map)
- Hard ceilings on downstream confidence (trust envelope)

### Relationship to Stage 2

Stage 0 and Stage 2 (Observability Assessment) serve different functions:

| Concern | Stage 0 | Stage 2 |
|---|---|---|
| Question | "Should we run the pipeline?" | "Given we're running, what can we trust?" |
| Gate type | Hard gate — unusable clips stop here | Soft degradation — confidence ceilings |
| Token cost | One model call | Part of full pipeline |
| Runs when | Always, before everything | Only if Stage 0 passes |
| Output scope | Clip-level usability + failure mode | Frame-level quality + element-level visibility |

Stage 0 catches clips that would waste 11 stage calls. Stage 2 fine-tunes confidence for clips that pass.

### Input

```typescript
interface Stage0Input {
  frames: Buffer[];              // Extracted video frames (same extraction as pipeline)
  metadata: {
    filename: string;
    duration_seconds: number;
    resolution: { width: number; height: number };
    fps: number;
    file_size_bytes: number;
  };
}
```

### Output Schema

```typescript
interface Stage0Output {
  stage: "observability_gate";
  
  // Gate decision
  gate: "pass" | "fail" | "degrade";
  
  // Failure classification (populated when gate != "pass")
  failure_mode: Stage0FailureMode | null;
  
  // Observability map (populated when gate != "fail")
  observability: {
    primary_subject_detected: "rider" | "bike" | "both" | "none";
    rider_visibility: "clear" | "partial" | "minimal" | "none";
    terrain_visibility: "clear" | "partial" | "minimal" | "none";
    outcome_observability: "clear" | "partial" | "ambiguous" | "not_visible";
    motion_quality: "stable" | "moderate_shake" | "severe_shake" | "unusable";
    frame_usability_ratio: number;  // 0.0–1.0, proportion of frames with usable content
  } | null;
  
  // Trust envelope (populated when gate != "fail")
  confidence_ceilings: {
    max_observation_confidence: number;  // 0.0–1.0, hard cap for all downstream stages
    max_coaching_specificity: "full" | "general" | "cautious_only";
  } | null;
  
  // User-facing guidance (always populated)
  user_guidance: {
    message: string;           // Human-readable explanation
    filming_tips: string[];    // Specific improvement suggestions
    retry_recommended: boolean;
  };
  
  // Analytics (lightweight — enables future dashboards without refactoring)
  metrics: {
    failure_mode: Stage0FailureMode | null;
    gate: "pass" | "fail" | "degrade";
    frame_usability_ratio: number;
    outcome_observability: "clear" | "partial" | "ambiguous" | "not_visible";
  };
  
  debug: {
    reasoning: string;
    confidence_factors: string[];
  };
}
```

### Trust Envelope Enforcement

Stage 0 defines confidence ceilings — but without enforcement they are advisory only. The following rules are **mandatory** and must be applied in `runner.ts`:

**Confidence capping (all stages):**

```typescript
// Applied in runner.ts after every stage output
function enforceStage0Ceiling(stageOutput: any, stage0: Stage0Output): void {
  if (stage0.confidence_ceilings && typeof stageOutput.confidence === 'number') {
    stageOutput.confidence = Math.min(
      stageOutput.confidence,
      stage0.confidence_ceilings.max_observation_confidence
    );
  }
}
```

**Coaching specificity constraint (Stage 10):**

```typescript
// Applied before Stage 10 runs
if (stage0.confidence_ceilings?.max_coaching_specificity === "cautious_only") {
  // Stage 10 prompt must:
  // - NOT recommend increased speed or commitment
  // - NOT give aggressive technique changes
  // - Prefix coaching with observability caveat
  // - Use hedged language ("it appears", "if visible correctly")
}

if (stage0.confidence_ceilings?.max_coaching_specificity === "general") {
  // Stage 10 prompt must:
  // - NOT reference fine detail (hand position, lever fingers, exact body angles)
  // - Keep advice to broad principles, not micro-corrections
}
```

**Pipeline hard stop (gate = fail):**

```typescript
if (stage0.gate === "fail") {
  // Skip ALL stages (1–11)
  // Skip frame reprocessing
  // Return Stage0Output only with user_guidance
  // No partial pipeline execution
  return { stage0: stage0Result, gated: true };
}
```

### Failure Modes

```typescript
type Stage0FailureMode = 
  | "unusable_no_content"       // Black frames, corrupted, static image, test pattern
  | "unusable_no_riding"        // Content visible but no motorcycle/riding activity detected
  | "unusable_distance"         // Rider too small/far to extract any useful observation
  | "unusable_obstruction"      // Lens blocked, severe fog/rain, sustained obstruction
  | "unusable_motion"           // Shake/blur so severe that no frames are interpretable
  | "degraded_low_visibility"   // Usable but visibility significantly impaired (darkness, weather, distance)
  | "degraded_short_duration"   // Less than ~2 seconds of riding — insufficient for sequence analysis
  | "degraded_low_resolution";  // Resolution too low for fine detail (body position, controls)
```

### Gate Logic

| Failure mode | Gate decision | Pipeline action |
|---|---|---|
| `unusable_*` | `fail` | Pipeline does not run. Return failure response with filming guidance. |
| `degraded_*` | `degrade` | Pipeline runs with constrained trust envelope (see degrade constraints below). |
| None | `pass` | Pipeline runs normally. Trust envelope reflects actual observability. |

**Degrade constraints (invariants):**

When `gate === "degrade"`, the following must always hold:
- `max_observation_confidence` ≤ 0.5
- `max_coaching_specificity` !== `"full"`

**Failure mode → specificity mapping:**

| Failure mode | `max_coaching_specificity` |
|---|---|
| `degraded_low_visibility` | `"general"` |
| `degraded_short_duration` | `"cautious_only"` |
| `degraded_low_resolution` | `"general"` |

### Thresholds (MVP defaults — tunable)

These are starting points. Adjust based on T1 retest and real-world submissions.

- **Riding activity:** If `primary_subject_detected` is `"none"` across usable frames → `unusable_no_riding`
- **Rider visibility:** If `rider_visibility` is `"none"` across all frames → `unusable_distance`
- **Frame usability:** If `frame_usability_ratio` < 0.2 → `unusable_motion` or `unusable_obstruction`
- **Duration:** If `duration_seconds` < 2.0 → `degraded_short_duration`
- **Degraded ceiling:** When gate is `"degrade"`, `max_observation_confidence` is capped at 0.5

### Implementation (MVP)

Stage 0 is implemented as a single `claude-sonnet-4-6` call using the existing `ModelProvider` interface.

```typescript
// Stage 0 uses claude-sonnet-4-6 via the same ModelProvider pattern as Stages 1–11
const stage0Result = await modelProvider.analyzeFrames(
  stage0SystemPrompt,
  stage0UserPrompt,
  frames
);
```

The prompt instructs Claude to:
1. Scan frames for riding activity (motorcycle, rider, trail/terrain) — classify `primary_subject_detected`
2. Assess overall visibility conditions and outcome observability
3. Classify any failure mode from the defined set
4. Output the gate decision with observability map and trust envelope
5. Generate user-facing guidance

**Stage 0 does NOT:**
- Identify specific terrain features (that's Stage 4)
- Assess camera perspective in detail (that's Stage 1)
- Set element-level confidence ceilings (that's Stage 2)

Stage 0 is a coarse, fast assessment. It answers: "Is there something here worth analysing?"

### Integration Point

```
Video Upload
    │
    ▼
Frame Extraction (existing)
    │
    ▼
┌─────────────────────────────┐
│ Stage 0 — Observability Gate│  ◄── NEW
└──────────────┬──────────────┘
               │
        ┌──────┴──────┐
        │             │
     gate=fail    gate=pass/degrade
        │             │
        ▼             ▼
  Return early    ┌─────────────────────────────┐
  + guidance      │ Stage 1 — Camera Perspective │
                  └──────────────┬──────────────┘
                                 ▼
                          Stages 2–11 ...
```

### File Location

```
pipeline/
  stage0-gate.ts          — Stage 0 implementation
  types.ts                — Add Stage0Input, Stage0Output, Stage0FailureMode
```

---

## 2. Perception Routing

### MVP Architecture (Route A — Claude Only)

For MVP, all visual perception runs through `claude-sonnet-4-6`. This is the locked decision from PVE (2026-04-12), updated for model deprecation (Sonnet 4 retires June 15, 2026):

- Claude Sonnet: 69.8% overall accuracy in PVE (tested on Sonnet 4; Sonnet 4.6 is a capability upgrade — validated via UI-TEST-1, not separate PVE re-run)
- Single-model path eliminates orchestration complexity for MVP

```
Route A (MVP):
  All frames → claude-sonnet-4-6 → Stages 0–11

No routing logic needed. Claude is the only perception model.
```

### Future Architecture (Route B — Outcome Disambiguation)

Route B is designed here but **not built for MVP**. It addresses a specific gap: uncertain outcomes where audio or a secondary vision pass could resolve ambiguity.

**Trigger conditions** (when Route B would activate):
- Stage 5 (Event Sequencing) classifies outcome as `"unknown"` or outcome confidence < 0.4
- Stage 0 `outcome_observability` is `"ambiguous"` or `"not_visible"`
- Stage 0 gate was `"degrade"` with `degraded_low_visibility` or `degraded_short_duration`
- Crash indicators are ambiguous (sounds suggest impact but visual is unclear)

**Input contract:**
```typescript
interface RouteBInput {
  video_path: string;               // Original video file (for audio extraction / full video API)
  stage0_output: Stage0Output;
  stage5_output: Stage5Output;      // Event sequencing with uncertain outcome
  frames: Buffer[];                 // Same frames used in Route A
  trigger_reason: string;           // Why Route B was activated
}
```

**Output contract:**
```typescript
interface RouteBOutput {
  outcome_revision: {
    revised_outcome: string;        // Updated outcome classification
    confidence: number;
    evidence: string[];             // What audio/visual evidence changed the assessment
  } | null;                         // null = Route B couldn't disambiguate either
  audio_observations: {
    engine_state: string;           // e.g. "running", "stalled", "revving"
    impact_sounds: boolean;
    rider_vocalisation: boolean;
    environmental: string[];
  };
  model_used: string;               // e.g. "gemini-2.5-flash-video"
  debug: {
    reasoning: string;
    confidence_factors: string[];
  };
}
```

**Integration hook:**
```
Stages 1–5 complete
    │
    ▼
Outcome uncertain? ──No──→ Continue to Stages 6–11
    │
   Yes
    │
    ▼
Route B (Gemini video + audio)
    │
    ▼
Merge revised outcome into Stage 5 output
    │
    ▼
Continue to Stages 6–11
```

**What this is NOT:**
- Not a full second perception pass
- Not a replacement for Route A
- Not a quality improvement layer (if Route A perception is fine, Route B never fires)

Route B is a targeted disambiguation tool for the specific failure mode where the outcome is unclear.

---

## 3. Upload Filming Guidance

### Rationale

PVE data shows footage type dominates model performance:
- POV clips: ~8.1/12 average across all models
- Distant 3rd-person: ~3.5/12 average

This is a structural constraint, not a model problem. User filming quality is a direct product lever.

### Guidance Content

**Pre-upload (shown on upload screen):**

> **For best coaching results:**
> - **Mount your camera on your helmet or chest** — POV footage gives the most accurate analysis
> - **If filming from the side, stay close** — within 10 metres of the rider
> - **Film the full attempt** — from approach to outcome, including any crashes or stops
> - **Avoid distant tripod shots** — our AI can't see body position or bike response from far away

**Post-failure (shown when Stage 0 gates a clip):**

Dynamic messaging based on `failure_mode`:

| Failure mode | User message |
|---|---|
| `unusable_no_content` | "We couldn't detect any video content. Please check the file and try again." |
| `unusable_no_riding` | "We detected video but couldn't find motorcycle riding activity. Make sure the clip shows riding, not setup or rest time." |
| `unusable_distance` | "The rider is too far from the camera for us to analyse. Try filming from closer range (within 10m) or use a helmet/chest mount." |
| `unusable_obstruction` | "The camera view is mostly blocked. Check for lens obstructions, heavy rain, or fog." |
| `unusable_motion` | "The footage is too shaky for analysis. Try a more stable mount or reduce camera vibration." |
| `degraded_low_visibility` | "Visibility is limited in this clip. We'll do our best, but coaching may be less specific than usual. For better results, try filming in clearer conditions or from closer range." |
| `degraded_short_duration` | "This clip is very short. We need at least a few seconds of riding to analyse your technique. Try filming a longer section." |
| `degraded_low_resolution` | "Video resolution is low, which limits how much detail we can see. Higher resolution footage (720p+) gives better coaching." |

### Implementation

Guidance is a UI concern, not a pipeline concern. The pipeline provides the `user_guidance` field in Stage 0 output; the UI renders it.

- Pre-upload guidance: static content on the upload page
- Post-failure guidance: driven by Stage 0 `failure_mode` + `user_guidance` fields
- No adaptive/learned guidance for MVP — static content is sufficient

---

## Implementation Checklist

### Files to Create
- [ ] `pipeline/stage0-gate.ts` — Stage 0 implementation
- [ ] Update `pipeline/types.ts` — add Stage0 types

### Files to Modify
- [ ] `pipeline/runner.ts` — insert Stage 0 before Stage 1, gate on result
- [ ] `docs/pipeline-contracts-v1.md` — add Stage 0 contract section
- [ ] Upload page component — add pre-upload filming guidance
- [ ] Results/error component — add failure mode messaging

### Files to Update (docs)
- [ ] `CLAUDE.md` — record Vision Layer decision
- [ ] `backlog.md` — close VISION-LAYER-1, update UI-WIRE-1 with Stage 0 dependency
- [ ] `docs/ridemind-phase3-master-plan-v1.md` — reference this spec

---

## Design Decisions Record

| Decision | Choice | Reasoning |
|---|---|---|
| Model version | `claude-sonnet-4-6` | Sonnet 4 (`claude-sonnet-4-20250514`) deprecated, retires June 15 2026. Sonnet 4.6 is the active replacement. PVE validated on Sonnet 4 (69.8%); Sonnet 4.6 is a capability upgrade, validated via UI-TEST-1. |
| Stage 0 implementation | `claude-sonnet-4-6` model call (not heuristic pre-check) | Avoids second system to maintain. Model can assess its own observation confidence. Heuristic pre-filter can be added later without breaking anything. |
| Stage 0 as explicit stage | Separate from Stage 1/2, own contract | Keeps gating responsibility isolated. Can evolve independently (swap in CV checks, metadata filters). Clean separation: Stage 0 = "run pipeline?", Stage 2 = "what can we trust?" |
| Route A only for MVP | `claude-sonnet-4-6` single-model path | PVE-validated. Eliminates orchestration complexity. Route B interface defined for future extension. |
| Route B scope | Outcome disambiguation only (not full re-perception) | Targeted at the specific failure mode (uncertain outcomes). Audio is the first tool, not the only tool. |
| Filming guidance | Static content for MVP | Sufficient for launch. Adaptive guidance is a future optimisation, not MVP-blocking. |
| Failure modes | 8 structured types (5 unusable + 3 degraded) | Drives specific UI messaging, retry guidance, and future analytics. Binary pass/fail is not actionable. |
| Gate decisions | Three-way (pass/fail/degrade) | "Degrade" path lets marginal clips through with constrained trust — better UX than hard rejection for borderline footage. |
| Trust envelope enforcement | Mandatory capping in `runner.ts`, not advisory | Without enforcement, downstream stages will drift and overclaim. Stage 0 must have teeth. |
| Analytics metrics | Included in Stage 0 output from day one | Adding later requires refactoring every call site. Adding now is free and enables future dashboards. |
