# RideMind KB Entry Schemas — v1.1

> **Status:** Gate 2 PASSED (2026-04-01) — v1.1 schema governance update 2026-04-02
> **Authority:** These templates define the entry format for all three new knowledge bases. No batch KB generation begins until this document is approved.
> **Applies to:** Terrain KB, Terrain Feature KB, Bike Dynamics KB
> **Pipeline reference:** `docs/pipeline-contracts-v1.md` — all enum values are taken from that document

### Changelog

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2026-04-01 | Initial schema — Gate 2 PASSED |
| v1.1 | 2026-04-02 | Locked 11-section body structure with 5 mandatory / 6 flexible sections. Formally defined stage4_surface_condition. Permanently removed surface_variants. Added Observability Notes structure guidance. Added tags formatting rule. |

---

## Shared Frontmatter Structure

All new entries use a **three-block frontmatter** inside a single `---` boundary.

```
Block 1 — pipeline_contract   Hard machine fields: kb_type + pipeline enum mapping
Block 2 — retrieval_triggers  Tiered retrieval: PRIMARY / SECONDARY / CONTEXTUAL
Block 3 — content_metadata    Descriptive fields + scope + status + misclassifications
```

**Retrieval tier definitions:**
- **PRIMARY** — exact pipeline enum match; top-ranked retrieval candidate whenever this value fires
- **SECONDARY** — highly likely relevant; retrieve when primary match fires or no closer match exists
- **CONTEXTUAL** — useful background; retrieve when no higher-tier match is available

**Body section inheritance:**
- **Terrain KB** uses a dedicated 11-section structure with 5 mandatory and 6 default sections (see Schema 1 — Section Structure below).
- **Terrain Feature KB** and **Bike Dynamics KB** follow the existing 9-section KB format with two modifications:
  - Section 2 and Section 3 are renamed per KB type (detailed below)
  - Section 4 (Diagnostic Cues) gains a **Pipeline Identification** subsection containing an **Observability Notes** prose block

**Tags formatting rule:**  
Tags must use YAML list format: `tags: [mud, traction, ruts]` — not comma-separated string format. Existing entries will be cleaned up in a future pass.

---

## Schema 1 — Terrain KB

**Purpose:** Surface physics and pipeline identification for a given surface type. Does NOT duplicate riding technique (already in domain-05 and domain-06).

**Covers:** All Stage 4 `surface.primary_type` values: `rock | mud | sand | loam | hardpack | clay | shale | gravel | grass | mixed`  
**First wave:** 10 entries  
**Folder:** `knowledge-base/terrain/`  
**File naming:** `terrain-[N]_[surface-type]-profile.md`  
**Topic ID pattern:** `TERRAIN-[N]`

### Frontmatter Template

```yaml
---
# ── BLOCK 1: Pipeline Contract ──────────────────────────────────────────────
pipeline_contract:
  kb_type: terrain
  pipeline_enum_value: [rock]         # Exact Stage 4 surface.primary_type value — list

# ── BLOCK 2: Retrieval Triggers ─────────────────────────────────────────────
retrieval_triggers:
  PRIMARY:                            # top-ranked retrieval candidate when this surface fires
    stage4_surface_type: [rock]
  SECONDARY:                          # Highly likely relevant — retrieve if primary fires
    stage6_failure_types: [technique, momentum, traction]
    stage4_gradient: [moderate_up, steep_up, very_steep_up, steep_down, very_steep_down]
    stage4_surface_condition: [dry, damp, wet]
  CONTEXTUAL:                         # Background context — retrieve if no closer match
    stage3_intent_category: [climb, descent, obstacle_clear]

# ── BLOCK 3: Content Metadata ────────────────────────────────────────────────
content_metadata:
  topic_id: TERRAIN-01
  title: Rock — Terrain Profile
  domain: Terrain KB
  domain_id: terrain
  scope: "Surface physics and pipeline identification for rocky terrain. Does NOT cover
    riding technique on rocks (see domain-05) or drill design for rock sections."
  status: draft                       # Changes to 'validated' after review pass
  surface_type: rock
  terrain_states:                        # surface_variants was removed in v1.1 — terrain_states is the canonical list of distinct surface conditions for each terrain type
    - loose_rock
    - embedded_rock
    - rock_slab
    - shale_fragment
    - mixed_rock_mud
  conditions_covered: [dry, damp, wet]   # Stage 4 surface.condition values
  traction_range:                     # Expected traction per condition — Stage 4 enum values
    dry: moderate
    damp: moderate
    wet: low
  gradient_contexts: [moderate_up, steep_up, very_steep_up, steep_down, very_steep_down]
  failure_types_associated: [technique, momentum, traction]   # Stage 6 enum values
  common_misclassifications:
    - shale                           # Shale is distinct — lower lateral traction
    - gravel                          # Gravel is loose aggregate; rock is solid or embedded
    - hardpack                        # Rocky hardpack may appear similar at low resolution
  common_mixed_contexts:
    - "rock with mud pockets — traction switches mid-section"
    - "loose rock over hardpack base — false traction reading"
    - "rock face transitioning to shale — traction drops sharply"
  difficulty_range: [beginner, intermediate, advanced]
  related_topics: [TERRAIN-07, FEATURE-03, DYNAMICS-02]
  prerequisites: [BIOMECH-01]
  tags: [rock, rocky, loose, embedded, traction, hill-climb, descent]
  version: 1.0
  last_updated: 2026-04-01
---
```

### stage4_surface_condition — Definition

`stage4_surface_condition` = coarse environmental/condition signals detectable independently of terrain classification, used to guide retrieval before full terrain-state reasoning. Examples: mud uses `[wet, saturated, frozen]`; hard pack uses `[dry, dusty, damp]`. This is **NOT** a mirror of `terrain_states` and is **NOT** exhaustive. It is used for early-stage retrieval weighting only.

This field appears in `retrieval_triggers.SECONDARY` and may also appear in `content_metadata.conditions_covered` where the full condition set needs to be documented.

---

### Section Structure

Terrain KB entries use an 11-section body structure. **5 sections are mandatory** and must appear in every entry. **6 sections are default** — included by default but can be renamed, merged, or replaced with terrain-specific equivalents where the content genuinely does not apply.

---

**MANDATORY sections** *(every terrain entry must include all five)*

**Section 1 — Surface Physics**
- Physical properties: hardness, deformability, stability, particle size and behaviour
- How traction is generated on this surface (friction, mechanical interlock, penetration)
- Break-away characteristics — progressive vs abrupt
- Why these physics make certain failure types more likely here

**Section 2 — Terrain States**
- Each state from the `terrain_states` frontmatter field, with full description
- Visual identification per state (colour, texture, surface condition indicators)
- Traction and behaviour differences between states
- How states transition into each other (progressive degradation or seasonal change)

**Section 3 — Bike Behaviour**
- Traction delivery mechanism for this surface
- Break-away characteristics for front and rear wheels
- Braking performance and calibration points
- Suspension behaviour: how terrain features transfer to chassis

**Section 4 — Technique Implications**
- Key technique adaptations for this surface
- Common technique errors and their mechanical consequences on this surface
- Line selection principles specific to this surface type

**Section 9 — Interaction Patterns & Failure Triggers** *(MANDATORY)*
- Named failure chains — each with: trigger → mechanism → outcome
- Must include the following subsections:

  **### Pipeline Identification Notes**
  - What the pipeline should look for to classify this surface type
  - Observable indicators: visual, audio, motion cues
  - Enum values that fire on this surface and their observable preconditions

  **### Observability Notes**
  Three-part structure (mandatory):
  1. What is reliably observable from footage (directly confirmable)
  2. What is inferable with caveats (can be estimated but not confirmed)
  3. What cannot be determined from footage (pipeline must flag as unknown)

---

**DEFAULT sections** *(include by default; rename, merge, or replace with terrain-specific equivalents where the content genuinely does not apply)*

**Section 5 — Gradient Interaction**
- How this surface behaves on uphills and downhills
- Gradient-specific failure triggers
- Speed management on gradient

**Section 6 — Rut Behaviour** *(e.g. renamed to "Line Dynamics" for rock; omitted for surfaces where ruts are not meaningful)*
- How ruts form and behave on this surface
- Rut depth and wall compliance differences from other surface types
- Technique adjustments for rut riding on this surface

**Section 7 — Conditions Impact**
- How dry, damp, wet, dusty, frozen conditions change surface behaviour
- Non-linear transitions (e.g. clay going from improved-grip-damp to low-grip-saturated)
- Seasonal and time-of-day variation

**Section 8 — Entry / Exit Transitions**
- How tyre contamination affects grip when transitioning to/from this surface
- Critical transition pairs (e.g. mud → hardpack, hardpack → mud)
- Pipeline trigger: surface transition as a distinct coaching scenario

**Section 10 — False Signals / Illusions**
- Surface appearance vs actual traction properties
- Common rider misreads and the mechanism behind them
- Why prior experience on similar surfaces creates calibration errors

**Section 11 — Terrain Demands / Constraints**
- Minimum technique required for safe riding on this surface
- Tyre and equipment relevance
- Out-of-scope references (what to point to, not duplicate)

---

## Schema 2 — Terrain Feature KB

**Purpose:** Feature identification, severity classification, and technique requirements for discrete terrain features. Does NOT cover foundational body position or general surface technique.

**Covers:** All Stage 4 `features_detected[].feature_type` values: `jump | drop | step_up | step_down | log | rock_garden | rut | berm | roots | switchback | water_crossing | gully | ledge`  
**First wave:** 8 entries  
**Folder:** `knowledge-base/features/`  
**File naming:** `feature-[N]_[feature-type]-profile.md`  
**Topic ID pattern:** `FEATURE-[N]`

### Frontmatter Template

```yaml
---
# ── BLOCK 1: Pipeline Contract ──────────────────────────────────────────────
pipeline_contract:
  kb_type: terrain_feature
  pipeline_enum_value: [jump]         # Exact Stage 4 features_detected[].feature_type value — list

# ── BLOCK 2: Retrieval Triggers ─────────────────────────────────────────────
retrieval_triggers:
  PRIMARY:                            # top-ranked retrieval candidate when this feature fires
    stage4_feature_type: [jump]
  SECONDARY:                          # Crash or failure involving this feature
    stage6_failure_types: [technique, decision, momentum]
    stage7_crash_types: [otb, ejection]
  CONTEXTUAL:                         # General context signals
    stage3_intent_category: [jump, trail_ride, race_section]
    stage5_outcome: [crash, bail]     # Stage 5 outcome.result values

# ── BLOCK 3: Content Metadata ────────────────────────────────────────────────
content_metadata:
  topic_id: FEATURE-01
  title: Jump — Feature Profile
  domain: Terrain Feature KB
  domain_id: features
  scope: "Feature identification, severity classification, and technique requirements
    for jumps. Does NOT cover standing/seated fundamentals (see BIOMECH-01) or general
    throttle control (see CONTROL-01)."
  status: draft
  feature_type: jump
  severity_definition:              # Mandatory — one line per level: size, commitment, consequence, speed sensitivity
    minor: "Natural roll or small compression under 0.5m; no commitment required; low speed sensitivity; consequence limited to awkward but safe landing"
    moderate: "Defined face 0.5–1.5m; moderate commitment required; speed-sensitive takeoff; poor technique produces uncontrolled airtime"
    significant: "Jump over 1.5m or high-consequence natural feature; full commitment required; high speed sensitivity; incorrect technique risks OTB or ejection"
    major: "Large constructed or natural jump requiring pre-planned approach, dedicated line, and advanced skill; error consequence is serious injury"
  severity_covered: [minor, moderate, significant, major]   # Stage 4 severity values
  crash_types_associated: [otb, ejection]                   # Stage 7 crash_type values
  failure_types_associated: [technique, decision, momentum] # Stage 6 failure_type values
  common_misclassifications:
    - step_up                         # step_up has a defined vertical face; jump has a ramp/compression
    - drop                            # drop is purely downward; jump has airtime trajectory
    - "undulating terrain — gentle rollers are not jumps"
  typical_body_position: standing
  difficulty_range: [intermediate, advanced]
  related_topics: [BIOMECH-01, DYNAMICS-01, FEATURE-02, FEATURE-07]
  prerequisites: [BIOMECH-01, CONTROL-01]
  tags: jump, tabletop, double, kicker, air, landing, otb, commitment
  version: 1.0
  last_updated: 2026-04-01
---
```

### Section Structure

**Section 2 — Feature Identification & Physical Properties** *(replaces Core Principles)*
- What defines this feature type vs similar features
- Anatomy: approach, face/lip, airtime, landing, exit
- How severity gradations manifest physically (minor → major)
- Common surface/terrain contexts where this feature appears

**Section 3 — Technique by Severity** *(replaces Technique Breakdown by Level)*
- Minor: required technique, what errors look like, consequence
- Moderate: escalated requirements, commitment threshold
- Significant/Major: full commitment requirements, coaching gate (do not coach this until foundational skills confirmed)

**Section 4 — Diagnostic Cues** *(standard structure + new subsection)*
- Visual Cues — Correct Identification / Misidentification risks
- Audio Cues — engine load on compression, impact on landing
- **Pipeline Identification Cues** *(new)*
  - What the model looks for to detect this feature in footage
  - Approach indicators (visible compression, face shape, approach angle)
  - Audio markers (engine note change on face, impact sound on landing)
  - Post-feature indicators (if feature is missed and only landing/aftermath is visible)
  - **Observability Notes** *(prose block)*: Describe what can be confirmed vs only inferred. Example: *"Jump face is usually identifiable when rider approaches from the correct angle. Airtime is clearly observable in 3rd-person. Landing success vs failure is observable. Jump height is only inferable. Whether the rider saw the jump in time is not observable."*

**Sections 5–9** — standard format

---

## Schema 3 — Bike Dynamics KB

**Purpose:** Physics of bike behaviour in response to rider inputs and terrain. Provides the causal reasoning layer for Stage 8 chain construction and Stage 10 counterfactual coaching. Does NOT duplicate standing/seated technique or input control technique.

**Covers:** weight distribution, throttle management, clutch control, traction physics, momentum management, engine braking, suspension loading, braking dynamics  
**First wave:** 6 entries  
**Folder:** `knowledge-base/bike-dynamics/`  
**File naming:** `dynamics-[N]_[concept].md`  
**Topic ID pattern:** `DYNAMICS-[N]`

### Frontmatter Template

```yaml
---
# ── BLOCK 1: Pipeline Contract ──────────────────────────────────────────────
pipeline_contract:
  kb_type: bike_dynamics
  pipeline_enum_value: [weight]       # dynamics_category value — list

# ── BLOCK 2: Retrieval Triggers ─────────────────────────────────────────────
retrieval_triggers:
  PRIMARY:                            # top-ranked retrieval candidate when this failure/root cause fires
    stage6_failure_types: [technique, momentum, traction]
    stage8_root_cause_categories: [technique, preparation]   # Stage 8 root_cause.category values
  SECONDARY:                          # Crash types this dynamic underpins
    stage7_crash_types: [otb, highside, lowside]
    stage4_gradient: [steep_up, very_steep_up, steep_down, very_steep_down]
  CONTEXTUAL:                         # General scenario context
    stage3_intent_category: [climb, descent, jump]

# ── BLOCK 3: Content Metadata ────────────────────────────────────────────────
content_metadata:
  topic_id: DYNAMICS-01
  title: Weight Distribution — Dynamics Profile
  domain: Bike Dynamics KB
  domain_id: bike-dynamics
  scope: "Physics of fore-aft weight distribution and its effect on wheel traction and
    bike control. Does NOT cover standing vs seated technique (see BIOMECH-01),
    specific terrain riding drills (see domain-05/06), or throttle input mechanics
    (see DYNAMICS-02)."
  status: draft
  dynamics_category: weight
  failure_types_underpinned: [technique, momentum, traction]   # Stage 6 failure_type values
  crash_types_underpinned: [otb, highside, lowside, tip_over]  # Stage 7 crash_type values
  causal_chain_roles: [root_cause, contributing_factor, mechanism]
  root_cause_categories: [technique, preparation]              # Stage 8 root_cause.category values
  common_misclassifications:
    - "traction_failure — when weight is the real cause, traction loss is the symptom"
    - "momentum_failure — forward momentum loss may originate from front wheel unloading, not throttle"
  causal_patterns:
    - trigger: "Rider remains seated on steep uphill gradient"
      mechanism: "Centre of mass shifts rearward; front wheel load decreases under climb gradient"
      immediate_effect: "Front wheel loses traction and wanders; rear wheel bears full weight under acceleration load"
      likely_consequences: [momentum_loss, bail, front_wheel_washout]
      corrective_counterfactual: "Standing with chest forward shifts CoM forward onto the front wheel, enabling traction on both wheels and improving climbing efficiency"
    - trigger: "Rider leans excessively forward on steep descent"
      mechanism: "Centre of mass shifts too far forward; front wheel overloaded; rear wheel lightens"
      immediate_effect: "Front wheel bites hard; rear wheel skips; front brake becomes hypersensitive"
      likely_consequences: [otb, front_wheel_dig, loss_of_line]
      corrective_counterfactual: "Rearward body position on descent loads the rear wheel, balances braking between axles, and reduces endo risk"
    - trigger: "Rider is seated on a jump face"
      mechanism: "CoM low and rearward at takeoff; front wheel rises disproportionately; rear-heavy airtime posture"
      immediate_effect: "Bike pitches nose-up in air; landing is rear-wheel-first or flat with excessive rear loading"
      likely_consequences: [otb_on_landing, hard_rear_landing, ejection]
      corrective_counterfactual: "Standing with neutral weight at takeoff allows balanced airtime posture and controlled landing weight distribution"
  bike_type_relevance: both           # 2T | 4T | both
  difficulty_range: [beginner, intermediate, advanced]
  related_topics: [BIOMECH-01, BIOMECH-02, DYNAMICS-02, DYNAMICS-03]
  prerequisites: [BIOMECH-01]
  tags: weight, fore-aft, CoM, front-wheel, rear-wheel, traction, balance, hill, descent, jump
  version: 1.0
  last_updated: 2026-04-01
---
```

### Section Structure

**Section 2 — Physics Explanation** *(replaces Core Principles — most important new section)*
- Plain-language physics: how this dynamic works
- The input → bike response relationship
- Why gradient, speed, and surface amplify or reduce this effect
- Written for Stage 8 to reference directly in causal chain steps

**Section 3 — Input → Response Mapping** *(replaces Technique Breakdown by Level)*
- Specific rider actions and their direct mechanical effects
- Maps to Stage 5 `rider_state` fields (`body_position`, `throttle_state`, `balance_state`)
- Written as causal pairs: "When rider does X → bike responds with Y → outcome Z"
- Covers the full range of this dynamic (not just error states)

**Section 4 — Diagnostic Cues** *(standard structure + new subsections)*
- Visual Cues — what the camera can show about this dynamic
- Audio Cues — engine and surface sounds that indicate this dynamic
- **Pipeline Identification Cues** *(new)*
  - Observable indicators of this dynamic in footage
  - What rider/bike geometry cues indicate this dynamic is active
  - **Observability Notes** *(prose block)*: Describe what is directly observable vs only inferable. Example: *"Weight distribution itself is not directly observable — it is inferred from rider body position relative to the seat and pegs. In 3rd-person footage, chest position relative to handlebars is a reliable proxy. In POV footage, weight distribution is not observable. Outcomes of incorrect weight distribution (front wheel wandering, rear wheel spinning) are often visible before the cause is."*
- **Causal Chain Patterns** *(new prose block)*
  - Narrative version of the `causal_patterns` frontmatter, expanded with evidence cues
  - Counterfactual patterns: what should have happened at each chain link

**Sections 5–9** — standard format (Coaching Language, Drills, Cross-References, Terrain & Context Variations, Expert Insights)

---

## Schema Change Summary vs Existing KB Format

| Addition | Terrain KB | Feature KB | Dynamics KB | Notes |
|----------|-----------|-----------|------------|-------|
| Three-block frontmatter | ✓ | ✓ | ✓ | All new entries |
| `kb_type` | terrain | terrain_feature | bike_dynamics | Machine filter field |
| `pipeline_enum_value` | surface_type | feature_type | dynamics_category | Hard pipeline match — list |
| Tiered retrieval_triggers | P/S/C | P/S/C | P/S/C | All trigger fields are lists |
| `scope` field | ✓ | ✓ | ✓ | Prevents overlap with existing KB |
| `status: draft` | ✓ | ✓ | ✓ | All new entries start as draft |
| `common_misclassifications` | ✓ | ✓ | ✓ | Pipeline disambiguation |
| `terrain_states` | ✓ | — | — | Canonical list of distinct surface conditions per terrain type (replaces `surface_variants` — permanently removed v1.1) |
| `common_mixed_contexts` | ✓ | — | — | Mixed surface coaching triggers |
| `severity_definition` block | — | ✓ | — | Mandatory; 4 lines, consistent across all feature entries |
| `typical_body_position` | — | ✓ | — | (not metadata — informational only) |
| `causal_patterns` list | — | — | ✓ | trigger/mechanism/immediate_effect/likely_consequences/corrective_counterfactual |
| Section 2 renamed | Surface Physics & Traction | Feature ID & Properties | Physics Explanation | |
| Section 3 renamed | Condition & Gradient Variations | Technique by Severity | Input → Response Mapping | |
| Section 4 Pipeline ID subsection | ✓ + Observability Notes | ✓ + Observability Notes | ✓ + Observability Notes + Causal Chain Patterns | |

---

## Files to Generate (Post-Gate 2)

```
knowledge-base/terrain/
  terrain-01_rock-profile.md
  terrain-02_mud-profile.md
  terrain-03_sand-profile.md
  terrain-04_loam-profile.md
  terrain-05_hardpack-profile.md
  terrain-06_clay-profile.md
  terrain-07_shale-profile.md
  terrain-08_gravel-profile.md
  terrain-09_grass-profile.md
  terrain-10_mixed-profile.md

knowledge-base/features/
  feature-01_jump-profile.md
  feature-02_drop-profile.md
  feature-03_rock-garden-profile.md
  feature-04_rut-profile.md
  feature-05_berm-profile.md
  feature-06_roots-profile.md
  feature-07_step-up-profile.md
  feature-08_ledge-profile.md

knowledge-base/bike-dynamics/
  dynamics-01_weight-distribution.md
  dynamics-02_throttle-management.md
  dynamics-03_clutch-control.md
  dynamics-04_traction-physics.md
  dynamics-05_momentum-management.md
  dynamics-06_engine-braking.md
```

**Priority first 4** (validate against Colin Hill and Mark Crash before generating remainder):
1. `terrain-01_rock-profile.md`
2. `dynamics-01_weight-distribution.md`
3. `feature-01_jump-profile.md`
4. `dynamics-02_throttle-management.md`

---

## Verification (Post-Generation)

1. **Terrain retrieval:** Stage 4 output `surface.primary_type: rock` → PRIMARY `stage4_surface_type: [rock]` → resolves to `terrain-01_rock-profile.md` ✓
2. **Feature retrieval:** Stage 7 output `crash_type: otb` → SECONDARY `stage7_crash_types: [otb, ejection]` on `feature-01_jump-profile.md` → entry returned ✓
3. **Dynamics retrieval (Colin Hill):** Stage 8 root cause `category: technique` → PRIMARY `stage8_root_cause_categories: [technique, preparation]` → `dynamics-01_weight-distribution.md` returned → `causal_patterns[0]` provides mechanism and counterfactual for chain step 2 ✓
4. **Stage 10 end-to-end (Colin Hill):** Stage 10 retrieves `terrain-01` (rock + steep_up) + `dynamics-01` (technique + weight) → coaching references specific physics → improvement over Phase 2 baseline ✓
5. **Stage 10 end-to-end (Mark Crash):** Stage 10 retrieves `feature-01` (jump + otb) + `dynamics-01` (weight + otb) → coaching addresses jump weight distribution failure → safety check (Stage 11) passes ✓
