# RideMind Skill Tag Taxonomy v1

> **Status:** v1.1 — post red-team tightening pass
> **Created:** 2026-04-09
> **Purpose:** Controlled vocabulary of rider skills for Stage 9 tagging, Stage 10 coaching generation, rider progression tracking, and future drill mapping.
> **Consumed by:** Stage 9 (Decision Engine), Stage 10 (Coaching Generation), future Rider Profile system
> **Design principle:** Functional domains aligned to pipeline behaviour, not coaching philosophy. Three Pillars (Balance, Body Position, Power Delivery & Collection) inform the coaching *persona* (Stage 10 tone/framing), not taxonomy structure.

---

## 1. Architecture Context

### Where the taxonomy sits

```
Stage 8 (Causal Chain)
        │
        ▼
┌──────────────────────────────┐
│ Stage 9 — Decision Engine    │ ← assigns primary_domain, secondary_domains, skill_tags (max 3)
│          (CLASSIFICATION)    │
└──────────────┬───────────────┘
               │
               │  skill_tags[] are the contract interface
               │
               ▼
┌──────────────────────────────┐
│ Stage 10 — Coaching Gen      │ ← expands skill_tags into coaching prose, drills, progression advice
│          (EXPRESSION)        │
└──────────────────────────────┘
```

### Separation of concerns

| Layer | Purpose | Lives in |
|---|---|---|
| Taxonomy | What the rider is doing (skill classification) | This document |
| Pipeline | What happened and why (analysis) | Pipeline contracts |
| Persona | How we communicate it (coaching voice) | Coaching persona doc (P2, future) |

These three layers must not bleed into each other. Taxonomy contains no coaching language, no pipeline logic, no persona framing.

---

## 2. Domain Definitions

Domains are the top-level coaching categories. They are **enum values** — no synonyms, no aliases, no informal variants.

Every skill tag belongs to exactly one domain. Every Stage 9 `primary_domain` value must be one of these.

### Domain enum (7 values)

```typescript
type CoachingDomain =
  | "body_position"
  | "throttle_control"
  | "clutch_control"
  | "braking"
  | "speed_management"
  | "line_choice"
  | "balance";
```

### Domain definitions

**`body_position`** — Rider posture, stance, and deliberate weight placement on the motorcycle. Covers standing vs seated, fore/aft bias, vertical separation from the bike, and transitions between positions.

**`throttle_control`** — Torque delivery to the rear wheel through throttle input. Covers application profile (progressive vs aggressive), traction management under power, and timing of throttle inputs within a riding sequence.

**`clutch_control`** — Clutch engagement, slip management, and coordination with throttle. Critical for 2-stroke and technical low-speed riding. Covers slip control, engagement timing, and combined clutch-throttle input.

**`braking`** — Deceleration through front brake, rear brake, and engine braking. Covers modulation of each input independently, front/rear balance, and use of engine compression for speed control.

**`speed_management`** — Global energy management — how fast the rider enters features, carries momentum through sections, and adapts speed to changing terrain. This is a *directly coachable execution skill* governing energy and momentum management, not merely a planning abstraction.

**`line_choice`** — Spatial decision-making — reading available lines, selecting one, committing to it, and adjusting if needed. This is a *directly coachable and observable execution skill*, not a cognitive abstraction.

**`balance`** — Static and dynamic equilibrium on the motorcycle. Covers low-speed stability, lateral balance (off-camber, ruts), and deliberate peg weighting for directional control. Note: balance overlaps conceptually with body_position. The distinction is that body_position concerns *posture/stance* while balance concerns *equilibrium/stability*. If the rider's stance is correct but they're falling over, that's balance. If they're stable but poorly positioned, that's body_position.

### Domain stability rules

- Domains are treated as enums. Adding a new domain requires a contract amendment to this document, Stage 9, and Stage 10.
- No synonyms are permitted. `speed_control` is not valid; `speed_management` is. `weight_distribution` is not valid; `body_position` is.
- If a coaching point spans two domains, Stage 9 assigns the *root cause* domain as primary and the other as secondary. The taxonomy does not support multi-domain tags.

### Domain boundary rules: `balance` vs `body_position`

This is the highest-risk overlap in the taxonomy. These rules govern classification at runtime:

- Use `body_position` when the issue is posture, stance, or deliberate weight placement — the rider's *chosen position* on the bike.
- Use `balance` only when equilibrium/stability itself is the most direct coachable mechanism, and the instability is not better explained by posture, line, speed, or control input.
- If poor posture clearly caused the instability, classify `body_position` as primary, not `balance`. Loss of balance is frequently a *downstream expression* of another failure — bad fore/aft loading, poor line choice, abrupt throttle/clutch input. In those cases, the upstream mechanism is primary.
- `balance` must not become a catch-all for messy crashes. If the causal chain points to a more specific mechanism, use that mechanism's domain.

---

## 3. Skill Tags by Domain

Skill tags are the specific, granular rider capabilities tracked over time. Each tag is:

- **Single-responsibility** — one skill per tag
- **Non-overlapping** — no two tags describe the same capability
- **Mechanism-focused** — describes what the rider *does*, not the outcome
- **Context-agnostic** — applies across terrain types and features
- **Observable or inferable** — can be assessed from video analysis

### `body_position` (5 tags)

| Tag | Definition |
|---|---|
| `fore_aft_weight_distribution` | Rider's forward/rearward weight bias relative to the bike's centre. Too far back = front wheel light. Too far forward = rear wheel unloaded. |
| `standing_position` | Quality and appropriateness of the rider's standing attack position during the relevant phase — knee bend, elbow bend, chest position, head position. |
| `seated_position` | Quality and appropriateness of seated posture when seated riding is the correct technique choice (e.g. sand whoops, certain descents). Distinct from "rider was seated when they should have been standing" — that is `standing_position` deficit. |
| `stance_transition` | The act of moving between standing and seated, or shifting position mid-feature. Timing, smoothness, and appropriateness of the transition. |
| `vertical_absorption` | Using legs as suspension — absorbing terrain impacts through knee/hip flexion rather than rigid body. Separation between rider mass and bike. |

### `throttle_control` (3 tags)

| Tag | Definition |
|---|---|
| `progressive_application` | Smooth, measured throttle opening that builds torque without breaking traction. Opposite of snap-open or dump. |
| `traction_management` | Modulating throttle to maintain or deliberately control rear wheel grip. Includes both grip preservation and intentional slip (e.g. steering with rear). |
| `throttle_timing` | When throttle is applied or released within a riding sequence — e.g. applying power before the bike is upright, cutting throttle too early in a climb. |

### `clutch_control` (3 tags)

| Tag | Definition |
|---|---|
| `slip_control` | Feathering or sustaining clutch slip to modulate power delivery. Micro-slip for technical sections, sustained slip for hill climbs. |
| `engagement_timing` | When the clutch is engaged or released relative to the riding phase — early release, late release, dump vs progressive. |
| `clutch_throttle_coordination` | Combined management of clutch and throttle as a single input system. Critical for 2-stroke power delivery and low-speed technical riding. |

### `braking` (4 tags)

| Tag | Definition |
|---|---|
| `front_brake_modulation` | Progressive application and release of front brake. Threshold braking, trail braking, panic grab avoidance. |
| `rear_brake_modulation` | Control of rear brake — drag braking for descents, lock/release control, speed scrubbing. |
| `brake_balance` | Ratio and coordination of front/rear brake inputs for the given situation. |
| `engine_braking` | Using engine compression for deceleration — gear selection for descent control, throttle-off deceleration management. |

### `speed_management` (3 tags)

| Tag | Definition |
|---|---|
| `entry_speed_judgement` | Reading the required approach speed for a feature or section. Arriving too fast or too slow. |
| `momentum_management` | Carrying, preserving, or rebuilding speed through a section. Includes the decision of when to maintain vs sacrifice momentum. |
| `speed_adaptation` | Adjusting speed in response to changing terrain, gradient, or obstacles mid-section. |

### `line_choice` (3 tags)

| Tag | Definition |
|---|---|
| `line_reading` | Identifying available lines through a section — seeing options, assessing difficulty, choosing based on capability. |
| `line_commitment` | Committing to the chosen line — not second-guessing, not stalling at the decision point, executing the chosen path. |
| `line_adjustment` | Mid-feature corrections — adapting line when conditions change or the initial choice proves wrong. Controlled vs panic adjustment. |

### `balance` (4 tags)

| Tag | Definition |
|---|---|
| `static_balance` | Equilibrium at standstill or very low speed — trials-style balance, hill-stop stability. |
| `dynamic_balance` | Maintaining whole-bike/rider stability during movement when no more specific positional, directional, or control-input mechanism dominates the failure. Use only when equilibrium itself is the coachable issue, not as a catch-all for any moving crash. |
| `lateral_balance` | Side-to-side stability — particularly relevant for off-camber terrain, ruts, and cambered corners. |
| `peg_weighting` | Deliberate side-to-side or fore-aft load transfer through the footpegs specifically as a stability control mechanism, when peg input is more central to the failure/fix than upper-body posture. Inside/outside weighting, rear peg loading. |

### Skill tag summary

| Domain | Tag count | Tags |
|---|---|---|
| body_position | 5 | fore_aft_weight_distribution, standing_position, seated_position, stance_transition, vertical_absorption |
| throttle_control | 3 | progressive_application, traction_management, throttle_timing |
| clutch_control | 3 | slip_control, engagement_timing, clutch_throttle_coordination |
| braking | 4 | front_brake_modulation, rear_brake_modulation, brake_balance, engine_braking |
| speed_management | 3 | entry_speed_judgement, momentum_management, speed_adaptation |
| line_choice | 3 | line_reading, line_commitment, line_adjustment |
| balance | 4 | static_balance, dynamic_balance, lateral_balance, peg_weighting |
| **Total** | **25** | |

### Skill tag rules

- Tags are assigned by Stage 9 only. Stage 10 reads them but does not add, remove, or reclassify.
- A tag describes a *mechanism* (what the rider does), never an *outcome* (what happened as a result). `fore_aft_weight_distribution` is valid. `avoid_loop_out` is not.
- Adding a new tag requires updating this document and the Stage 9 prompt. New tags must pass the single-responsibility, non-overlapping, mechanism-focused, context-agnostic, and observable tests.

---

## 4. Stage 9 Contract Amendment

### New fields (added to existing Stage 9 output)

```json
{
  "primary_domain": "body_position",
  "secondary_domains": ["speed_management"],
  "skill_tags": ["fore_aft_weight_distribution", "standing_position"],
  "tag_confidence": "high"
}
```

### Field definitions

**`primary_domain`** — `CoachingDomain` enum. The single domain that addresses the root cause of the primary issue. Required.

**`secondary_domains`** — `CoachingDomain[]`. Domains that address contributing factors or secondary issues. May be empty. Max 2.

**`skill_tags`** — `string[]`. Specific skill tags from this taxonomy that Stage 9 identifies as relevant to the coaching decision. Max 3. These represent the *most coaching-relevant skills*, not an exhaustive list.

**`tag_confidence`** — `"high" | "medium" | "low"`. Overall confidence in the skill tag assignment. Constrained by Stage 2 observability ceilings.

### Relationship to existing Stage 9 fields

These new fields supplement, not replace, the existing Stage 9 output. The mapping:

- `primary_issue` → describes the problem in prose → `primary_domain` classifies it
- `secondary_issues` → describe contributing factors → `secondary_domains` classify them
- `coaching_priority_order` → prose ordering → `skill_tags` give it structured hooks
- `root_cause` → causal explanation → `primary_domain` + `skill_tags` classify the root cause mechanism

### Stage 9 prompt integration

The Stage 9 system prompt must include the full domain enum and skill tag list from this document. The prompt must instruct the model to:

1. Select `primary_domain` based on the root cause, not the most visible symptom
2. Select `skill_tags` based on mechanism, not outcome
3. Respect the max 3 tag limit — force compression
4. Not assign tags below the observability confidence ceiling from Stage 2

---

## 5. Tag Selection Heuristics (Stage 9 Prompt Rules)

These rules govern how the model selects domains and skill tags. They must be embedded in the Stage 9 system prompt.

### Selection priority

1. **Root cause over symptom.** If the rider crashed because they were seated (body_position) which caused loss of traction (throttle_control), the primary domain is `body_position`, not `throttle_control`. The traction loss was a *consequence*, not the cause.

2. **Mechanism over manifestation.** Tag what the rider *did wrong*, not what *happened*. The rider's weight was too far back (`fore_aft_weight_distribution`), not "the front wheel lifted" (that's a consequence).

3. **Higher-level domain if ambiguous.** If Stage 9 cannot confidently distinguish between two skill tags within a domain, assign the domain only and leave skill_tags empty or assign only the confident ones. Do not guess.

4. **Respect observability ceiling.** If Stage 2 flagged low confidence on body position observation (e.g. distant camera, poor visibility), Stage 9 must not assign body_position skill tags with high confidence. `tag_confidence` must reflect the weakest link in the observation chain.

5. **Max 3 tags forces compression.** The limit is intentional. If Stage 9 identifies 5 relevant skills, it must select the 3 that would have the highest coaching impact. This mirrors real coaching: you fix the biggest thing first.

6. **Counterfactual leverage in compound failures.** When more than 3 tags are plausible (cascading failures are common in real riding), prefer the tags that would most change the outcome if corrected earliest in the sequence. Select one root-cause tag and up to two highest-leverage contributing tags, rather than three tags from the same late-stage manifestation. Do not use all 3 tags within one domain unless the failure really was that tightly localised.

7. **Tags may represent either the failed mechanism or the most direct coachable skill target**, but the primary tag should reflect the failed mechanism whenever it is observable. Avoid letting tags drift toward "the fix" rather than "the problem."

### Clean clip semantics

For `positive_reinforcement` clips (no failure detected), `primary_domain` refers to the most salient demonstrated strength rather than a correction domain. `skill_tags` describe what was done *well*. This semantic switch is governed by `clip_disposition`:

- `clip_disposition = coaching_needed | safety_critical` → `primary_domain` = primary correction domain
- `clip_disposition = positive_reinforcement` → `primary_domain` = primary demonstrated strength domain

Future refinement (v1.2+): consider adding `domain_role: "correction" | "reinforcement"` to remove this implicit semantic switch.

### Anti-patterns (do not do)

- Do not assign `line_reading` when the failure was speed, not line. Wrong speed on the right line ≠ wrong line.
- Do not assign `momentum_management` for every stall. Some stalls are clutch failures (`engagement_timing`), not speed failures.
- Do not assign `dynamic_balance` as a catch-all for any crash. Most crashes have a more specific root cause upstream.
- Do not assign tags that duplicate the domain. If `primary_domain` is `clutch_control` and the only relevant skill is general clutch use, it's acceptable to leave `skill_tags` empty rather than assigning a vague tag.

---

## 6. Worked Examples

### 6.1 Colin Hill (seated rider, hill climb bail)

**Stage 8 causal chain:** Rider remained seated throughout steep rocky hill climb → weight too far rear → front wheel light, poor traction → lost momentum → bail.

**Stage 9 output (with taxonomy):**

```json
{
  "stage": "decision_engine",
  "primary_issue": {
    "description": "Rider remained seated throughout a steep rocky hill climb",
    "why_primary": "Standing is the fundamental technique for hill climbing. Remaining seated compromised weight distribution, traction, and ultimately caused the bail."
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
  "skill_tags": ["fore_aft_weight_distribution", "standing_position", "entry_speed_judgement"],
  "tag_confidence": "high"
}
```

**Why these tags (highest-leverage selection):**
- `fore_aft_weight_distribution` — root cause: weight too far rear (seated = rearward bias on a climb). Correcting this earliest in the sequence would most likely change the outcome.
- `standing_position` — the direct coachable skill target: rider needs to stand, and standing position quality matters. This is the highest-leverage fix.
- `entry_speed_judgement` — secondary: arrived with insufficient momentum for the gradient. Independent of body position — would help even if posture was correct.
- NOT `momentum_management` — the rider didn't lose momentum through poor mid-section technique; they arrived with too little. Entry speed is the more precise tag.
- NOT `traction_management` — traction loss was a consequence of weight distribution, not a throttle input failure. Tagging it would tag the symptom, not the cause.

### 6.2 Mark Crash (4s descent, OTB crash)

**Stage 8 causal chain:** Rider descending steep terrain → weight too far rearward for the gradient → front wheel unloaded → lost front-end control → OTB ejection.

**Stage 9 output (with taxonomy):**

```json
{
  "stage": "decision_engine",
  "primary_issue": {
    "description": "Rider's weight was too far back during steep descent, unloading the front wheel",
    "why_primary": "On steep descents, weight must shift forward to maintain front wheel traction and steering control. Excessive rearward bias caused front-end washout and OTB ejection."
  },
  "root_cause": {
    "description": "Rearward weight bias during steep descent",
    "coachable": true
  },
  "secondary_issues": [],
  "coaching_priority_order": [
    "Shift weight forward on steep descents — hips over the tank, one finger on front brake"
  ],
  "recommended_tone": "serious",
  "risk_flags": [
    {
      "flag": "OTB crash with potential injury",
      "severity": "high",
      "action": "Coaching must not recommend further rearward weight shift"
    }
  ],
  "clip_disposition": "safety_critical",

  "primary_domain": "body_position",
  "secondary_domains": [],
  "skill_tags": ["fore_aft_weight_distribution", "vertical_absorption"],
  "tag_confidence": "high"
}
```

**Why these tags (highest-leverage selection):**
- `fore_aft_weight_distribution` — root cause: weight too far rear for the gradient. This is the earliest correctable point in the causal chain — fixing weight bias alone would most likely prevent the crash.
- `vertical_absorption` — contributing factor: rigid body meant terrain impacts transferred directly to bike, reducing front wheel contact. Second-highest leverage — even with correct weight bias, poor absorption would degrade control.
- NOT `front_brake_modulation` — while front brake technique matters on descents, the causal chain doesn't indicate braking was the failure mechanism. Adding it would tag a late-stage symptom, not an upstream cause.
- NOT `dynamic_balance` — the rider lost stability, but the instability was clearly caused by rearward weight bias. `body_position` is primary per boundary rules; `balance` would be a catch-all here.
- Only 2 tags, not 3 — compression is correct here. There's one clear root cause with one contributing mechanism. Padding to 3 would dilute.

### 6.3 Clutch Scream Hill (POV, clutch abuse, tree crash)

**Stage 8 causal chain:** Rider climbing technical hill → excessive clutch slip (audible screaming clutch) → power delivery erratic → loss of drive → stall/crash into tree.

**Stage 9 output (with taxonomy):**

```json
{
  "stage": "decision_engine",
  "primary_issue": {
    "description": "Excessive clutch slip causing erratic power delivery on technical hill climb",
    "why_primary": "Sustained heavy clutch slip overheated the clutch and made power delivery unpredictable. The rider needed controlled slip, not sustained abuse."
  },
  "root_cause": {
    "description": "Poor clutch slip management under load",
    "coachable": true
  },
  "secondary_issues": [
    {
      "description": "Possible throttle over-application requiring excessive clutch compensation",
      "priority": 2,
      "relationship_to_primary": "caused_by_same_root"
    }
  ],
  "coaching_priority_order": [
    "Controlled clutch slip — short, deliberate slips rather than sustained dragging",
    "Match throttle to clutch — less throttle means less clutch work needed"
  ],
  "recommended_tone": "direct",
  "risk_flags": [],
  "clip_disposition": "coaching_needed",

  "primary_domain": "clutch_control",
  "secondary_domains": ["throttle_control"],
  "skill_tags": ["slip_control", "clutch_throttle_coordination"],
  "tag_confidence": "medium"
}
```

**Why these tags:**
- `slip_control` — root cause: sustained heavy slip instead of controlled micro-slips
- `clutch_throttle_coordination` — contributing: throttle and clutch not working as a coordinated system
- NOT `engagement_timing` — the issue wasn't *when* the clutch engaged, but *how much* slip was sustained. Timing was not the failure mechanism.
- `tag_confidence: medium` — POV clip, clutch behaviour inferred primarily from audio, body position not visible.

### 6.4 Long Hill (clean completion — positive reinforcement)

**Stage 8 causal chain:** Rider completed technical hill climb successfully. No failure detected.

**Stage 9 output (with taxonomy):**

```json
{
  "stage": "decision_engine",
  "primary_issue": {
    "description": "No primary issue — clean completion of technical hill climb",
    "why_primary": "Rider demonstrated competent technique throughout the section"
  },
  "root_cause": {
    "description": "N/A — no failure",
    "coachable": false
  },
  "secondary_issues": [],
  "coaching_priority_order": [],
  "recommended_tone": "celebratory",
  "risk_flags": [],
  "clip_disposition": "positive_reinforcement",

  "primary_domain": "body_position",
  "secondary_domains": ["throttle_control", "speed_management"],
  "skill_tags": ["standing_position", "progressive_application", "momentum_management"],
  "tag_confidence": "medium"
}
```

**Why these tags:**
- Same taxonomy works for positive feedback — tags describe what was done *well*, not just what went wrong
- `primary_domain` reflects the most notable demonstrated skill, not a failure
- Tags enable positive tracking: rider profile shows `standing_position` as a strength, not just a deficit
- `tag_confidence: medium` — clean clips are harder to tag confidently because there's no failure to anchor the analysis

---

## 7. Future Expansion Hooks

These are **not in scope for v1** but the taxonomy is designed to accommodate them without structural changes.

### Subskill layer (v2+)

If Stage 10 outputs reveal that skill tags aren't granular enough, a subskill layer can be added below tags. Example: `fore_aft_weight_distribution` → `forward_bias`, `rearward_bias`. This would NOT change domains or the Stage 9 contract — subskills would be resolved at Stage 10.

### Vision & Perception domain (v2+)

If future analysis capabilities (eye tracking, helmet cam gaze inference, reaction time measurement) make vision observable, a `vision` domain can be added with tags like `terrain_reading`, `obstacle_anticipation`, `visual_focus_distance`. Currently not observable from video alone.

### Timing & Coordination domain (v2+)

If cross-domain timing patterns emerge as a distinct coaching need (e.g. "your throttle timing is fine but your body position transition is late"), a `timing` domain may be warranted. Currently embedded as `throttle_timing`, `engagement_timing` within existing domains.

### Drill mapping (post-MVP)

Each skill tag will eventually map to a Drill KB entry. The tag structure is designed for 1:many mapping — one skill tag can have multiple drills of different types (on_bike, off_bike, mental). The Drill KB schema is not defined yet.

### Rider profiling

Skill tags enable automated rider profiling: track which tags appear as deficits vs strengths across multiple clips. The taxonomy's stability rules (no synonyms, no overlap) are critical for this — inconsistent tagging breaks profiling.

---

## 8. Changelog

| Version | Date | Changes |
|---|---|---|
| v1.0 | 2026-04-09 | Initial taxonomy. 7 domains, 25 skill tags. Stage 9 contract amendment. Tag selection heuristics. 4 worked examples. |
| v1.1 | 2026-04-09 | Post red-team tightening. Added: balance vs body_position boundary rules, compound-failure counterfactual leverage heuristic, clean-clip semantic switch definition. Tightened: dynamic_balance, peg_weighting, standing_position, seated_position definitions. Added tag role note (mechanism vs fix target). |
