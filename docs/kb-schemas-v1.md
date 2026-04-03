# RideMind KB Entry Schemas — v1.2

> **Status:** Gate 2 PASSED (2026-04-01) — v1.3 schema update 2026-04-03 (Domain 16 Machine KB schema added)
> **Authority:** These templates define the entry format for all new knowledge bases. No batch KB generation begins until this document is approved.
> **Applies to:** Terrain KB, Terrain Feature KB, Bike Dynamics KB, Machine KB
> **Pipeline reference:** `docs/pipeline-contracts-v1.md` — all enum values are taken from that document

### Changelog

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2026-04-01 | Initial schema — Gate 2 PASSED |
| v1.1 | 2026-04-02 | Locked 11-section body structure with 5 mandatory / 6 flexible sections. Formally defined stage4_surface_condition. Permanently removed surface_variants. Added Observability Notes structure guidance. Added tags formatting rule. |
| v1.2 | 2026-04-02 | Feature KB 11-section body structure with mandatory/default split, adaptation rules, edge case guidance, feature_class frontmatter field, Commitment & Reversibility Profile sub-block, coaching gates, and skill tag future-proofing hook. |
| v1.3 | 2026-04-03 | Domain 16 Machine KB schema added. Two-block frontmatter, 8-section body structure, explicit writing rules (no coaching, no pipeline logic, no rider psychology, no improvement language, cause→effect only), inclusion/exclusion guidance, file naming convention with double-dash rider-layer separation. |

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
- **Terrain Feature KB** uses a dedicated 11-section structure with 5 mandatory and 6 default sections, matching Terrain KB rigour (see Schema 2 — Section Structure below).
- **Bike Dynamics KB** follows the existing 9-section KB format with two modifications:
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

> **Reference implementation:** `knowledge-base/domain-17-terrain/` — all 10 first-wave entries complete (TERRAIN-01 mud through TERRAIN-10 mixed), built to this schema. Use these files as the quality benchmark when reviewing Feature KB and Bike Dynamics KB entries.

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
  feature_class: single_event         # single_event | continuous

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

> **Design context:** Features may be **single-event** (jump, drop, log, step, water crossing) or **continuous/section-based** (off-camber, switchback, rock garden, whoops, beam). The `feature_class` field in `pipeline_contract` captures this distinction. Both types use the same 11-section structure — emphasis shifts between sections depending on feature class (see adaptation rules below).

Feature KB entries use an 11-section body structure. **5 sections are mandatory** and must appear in every entry. **6 sections are default** — included by default but can be renamed, merged, or omitted where content genuinely does not apply.

---

**MANDATORY sections** *(every feature entry must include all five)*

**Section 1 — Feature Geometry & Physics**
- Structural definition: what makes this a distinct feature type, its geometry, and the physical zones — approach zone, execution zone, exit zone (single-event) or entry / extent / exit (continuous features)
- Force vectors acting on rider and bike during execution: what physical forces this geometry generates
- Why this geometry creates a distinct riding problem that surface technique alone cannot solve
- **Mandatory sub-block — Commitment & Reversibility Profile:**
  - Point of no return: where the rider's decision becomes irreversible
  - Recovery window: how long or far after commitment the rider can still influence the outcome
  - Bailout options: what exits exist before the commitment point
- For continuous features: the spatial behaviour model — how the feature changes through its length

**Section 2 — Feature Forms & Variants**
- Distinct sub-types this feature takes in the real world (equivalent function to Terrain States in the Terrain KB)
- Per variant: visual identification criteria, size/shape indicators, typical contexts where each appears
- How severity gradations manifest physically (minor → major) — by consequence, reversibility, and commitment, not just size, matching the frontmatter `severity_definition`
- Pipeline relevance: visual indicators that distinguish this variant from adjacent misclassification candidates
- Rule: each variant must produce at least one distinct failure pattern not shared by other variants in the same entry

**Section 3 — Bike Behaviour**
- Physics-level bike response to this feature type
- Tyre and suspension dynamics specific to this feature
- Front vs rear wheel behaviour differences on this feature
- How severity amplifies the bike's mechanical response
- Control input consequences: what throttle, brake, and steer inputs produce at the physics level on this feature
- **Constraint:** describes mechanical response only. No coaching language, rider intent, or corrective advice. Coaching content belongs in Section 4.
- Written at a level Stage 8 (Causal Chain Construction) can reference directly

**Section 4 — Technique by Severity**
- Organised by the 4 severity tiers defined in frontmatter `severity_definition`: minor / moderate / significant / major
- Per tier: required body position, control input timing and sequencing, commitment threshold, common technique errors, mechanical consequence of those errors
- Coaching gate note per tier: what prerequisite skills must exist before coaching up to this tier
- May reference underlying skill categories (e.g. `balance_low_speed`, `clutch_throttle_coordination`) for future Skill Tag and Drill system integration
- For significant/major tiers where foundational skills are not confirmed: explicit "coaching gate — do not prescribe this tier without [prerequisite] confirmed" note required
- For continuous features: entry technique / sustained technique / exit technique structure within each tier

**Section 5 — Interaction Patterns & Failure Triggers**
- Named failure chains — each with: trigger → mechanism → outcome
- Must be keyed to Stage 6 failure types: `technique | decision | momentum | traction | line_choice`
- Must include the following mandatory subsections:

  **### Pipeline Identification Notes**
  - Visual indicators for Stage 4 `feature_type` detection
  - Approach indicators (shape visible on approach), execution indicators (in-feature cues), post-event indicators (aftermath observable when approach was not captured)
  - Audio markers where relevant (engine note change on compression, impact sound on landing)
  - Severity indicators: what distinguishes minor from significant in footage
  - Edge cases where Stage 4 classification confidence should be flagged low

  **### Observability Notes** *(3-part mandatory structure)*
  1. What is reliably confirmable from footage (directly observable)
  2. What is inferable with caveats (can be estimated but not confirmed)
  3. What cannot be determined from footage (pipeline must flag as unknown)

---

**DEFAULT sections** *(include by default; rename, merge, or omit where content genuinely does not apply — see adaptation rules below)*

**Section 6 — Approach & Setup Requirements**
- What the rider must do before the feature's execution zone begins: approach speed selection, line onto the feature, body position setup point, gear/clutch/brake prep
- Commitment threshold: the point at which the approach becomes locked in
- Common approach errors and their downstream consequences (before the feature, not during)
- May rename to "Entry Discipline" for continuous features
- **Merge restriction:** for timing-dependent features (jump, drop, step, log, water crossing), this section must remain separate and must not merge with Section 4

**Section 7 — Terrain & Condition Interaction**
- How surface type changes this feature's difficulty and technique requirements
- **Not a duplication of Terrain KB content** — flags which Terrain KB entries should be co-retrieved and documents the interaction effect at feature level (e.g. "Jump landing on mud = grip loss problem on run-out, not takeoff problem — retrieve TERRAIN-01")
- Key terrain-surface interaction pairs for this feature, with brief behavioural note per pair
- Condition modifiers (dry/wet/frozen) and how they shift severity classification at the feature level
- May compress or omit for features where terrain interaction is minimal (e.g. elevated beam on hard substrate)
- Higher priority for continuous features (rock garden, whoops, off-camber) where surface conditions affect technique throughout the section

**Section 8 — Exit, Landing & Recovery**
- What happens after the execution phase
- Single-event: landing dynamics, run-out requirements, recovery window after landing
- Continuous: section exit technique, speed management into the exit, recovery from within-section errors
- Consequence of lost recovery window — what happens after the point of no return
- Rename to reflect feature type: "Run-Out & Recovery" (jump), "Section Exit" (rock garden, whoops), "Recovery Window" (drop)
- **Merge restriction:** for timing-dependent features (jump, drop, step, log, water crossing), this section must remain separate and must not merge with Section 4

**Section 9 — False Reads & Misidentification**
- What the feature looks like vs what it is: rider misread scenarios and their mechanisms
- Camera/footage misclassification risks (expanding the frontmatter `common_misclassifications` in narrative form)
- How conditions create visual ambiguity (e.g. wet rock garden that looks like a rut, berm that reads as off-camber)
- Why prior experience on similar features creates calibration errors
- Pipeline note: these scenarios directly inform when Stage 4 classification confidence should be reduced

**Section 10 — Coaching Gates & Prerequisites**
- Minimum prerequisite skills for each severity tier, with references to BIOMECH / CONTROL entries
- Progression model: skill sequence for building safely from minor to major
- "Do not coach up" thresholds: when Stage 9 (Decision Engine) should decline to recommend the next severity tier
- Feeds Stage 9 coaching strategy mapping and Stage 11 safety validation
- Future-proofing: each severity tier's skill prerequisites may be tagged with skill category labels (e.g. `balance_low_speed`, `clutch_throttle_coordination`) to prepare for the Skill Tag and Drill KB integration
- For features with limited realistic severity range (beam, roots), the out-of-scope tiers compress to stubs with explicit coaching gate notes

**Section 11 — Feature Demands / Constraints**
- Minimum technique required for safe execution — references only, not duplication
- Equipment considerations relevant to this feature (tyre type, suspension setup, bike geometry)
- Out-of-scope content with explicit pointers to where those topics live

### Section Boundary Rules

**Section 4 / Section 10 boundary:**
Section 4 defines technique requirements, observable errors, and severity-tier coaching gates specific to the feature. Section 10 defines progression gating, prerequisite mapping, and "do not coach up" constraints for Stage 9 decision logic. Section 4 should not become a drill curriculum; Section 10 should not restate execution technique.

**Severity definition rule:**
Severity must be defined primarily by observable feature geometry, commitment profile, and consequence geometry. Rider skill requirement is secondary commentary and must not be the primary basis for tier assignment.

### Retrieval Mapping Note

Some Feature KB entries map primarily to Stage 4 geometry or state fields rather than stage4_feature_type. Off-camber (FEATURE-02) is retrieved primarily through stage4_camber: [off_camber_left, off_camber_right] because off-camber is a cross-cutting terrain geometry condition that can co-exist with other feature types. The pipeline_enum_value field in these entries maps to the relevant Stage 4 field, which may not be feature_type.

---

### Adaptation Rules

The following rules govern how default sections may be adapted. Apply consistently across all 14 feature entries.

- **Rename rule:** Default sections may be renamed to reflect the feature type. Document the rename in the section heading: `## 6. Entry Discipline (adapted from Approach & Setup)`. Same pattern as Terrain KB rock entry renaming Section 6 to "Rock Line Navigation".
- **Merge rule:** Sections 6+4 or 8+4 may merge for simple minor-severity features where approach or exit content is thin. Document with a one-line note at the top of the merged section. Merge is **not permitted** for timing-dependent features: jump, drop, step, log, water crossing.
- **Omission rule:** A default section may be omitted if the content genuinely does not exist for this feature type. Document with a one-line omission note in the entry header.
- **Emphasis by feature class:** Sections 6 and 8 are higher priority for single-event features (discrete commitment and recovery moments). Section 7 is higher priority for continuous features (surface conditions affect technique throughout the section). Same structure, different emphasis.

---

### Author Guidance — Edge Cases

These edge cases require special handling during entry generation. They are guidance notes, not schema constraints.

1. **Rut / Terrain KB overlap:** Feature KB covers geometry — rut depth, entry/exit dynamics, line lock-in, wall compliance. Terrain KB covers surface physics. Scope boundary must be stated explicitly in the `scope` frontmatter field and in Section 7. Do not duplicate mud or clay physics in the rut feature entry.

2. **Rock Garden / Terrain KB overlap:** Feature KB covers sequential obstacle navigation (geometry, line selection, momentum management through discrete obstacles). TERRAIN-03 covers surface physics. Dual-retrieval is expected and correct. Scope boundary must be explicit in both entries' `scope` fields and `related_topics`.

3. **Whoops severity:** Whoops severity is strongly speed-dependent — the same whoops at 15mph vs 40mph require fundamentally different technique and produce different failure modes. Define severity by the gap between the rider's current capability and the feature's speed requirement, not by whoops size alone. The `severity_definition` frontmatter for this entry requires more nuanced language than other entries.

4. **Berm — assistance vs hazard:** Berm is the only planned feature where the terrain structure provides active assistance rather than presenting a hazard. Failure modes are leaving the berm and under-committing, not surviving it. Section 3 (Bike Behaviour) inverts the typical pattern — centripetal force is beneficial. Section 4 emphasises using the berm. This is a tonal difference, not a schema problem.

5. **Elevated beam scope:** This entry covers natural and competition obstacles (log crossings, natural elevated beams in extreme enduro) only. It explicitly excludes drill-practice setups (workshop beams, pallet stacks), which are handled by the future Training System via drill KB and upload UX flagging. State this boundary in the `scope` frontmatter field. Section 10 must be conservative — do not coach up without confirmed balance and precision placement prerequisites.

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

## Schema 4 — Machine KB

**Purpose:** Factual identity, build configuration, and riding-relevant behaviour characteristics for a specific motorcycle model. Provides the machine-layer reference for Stage 8 (Causal Chain Construction). Does NOT contain coaching advice, diagnostic conclusions, or pipeline logic.

**Covers:** Stock bike data and (for MVP) rider modification deltas. In production, stock data only; rider modifications belong on the user profile layer.  
**Folder:** `knowledge-base/domain-16-machines/`  
**File naming:**
- Stock profiles: `[manufacturer]-[model-slug]-[year].md` (e.g. `gasgas-ec300-tpi-2023.md`)
- Rider-layer profiles (MVP only): `[manufacturer]-[model-slug]-[year]--[rider-slug].md` (e.g. `gasgas-ec300-tpi-2023--jake.md`)
- Double-dash separates stock machine identity from rider-layer context.  
**Topic ID pattern:** `MACHINE-[N]`

### Frontmatter Template

```yaml
---
# ── BLOCK 1: Pipeline Contract ──────────────────────────────────────────────
pipeline_contract:
  kb_type: machine_profile
  manufacturer: GasGas                          # Manufacturer name
  model: EC300 TPI                              # Model name and variant
  year: 2023                                    # Model year
  platform_family: KTM Group TPI 300 Two-Stroke # Shared platform name, if applicable
  mod_layer: true                               # true if this file contains a rider modification layer

# ── BLOCK 2: Content Metadata ────────────────────────────────────────────────
content_metadata:
  topic_id: MACHINE-01
  title: "GasGas EC300 TPI 2023"
  domain: 16
  status: draft                        # draft | validated
  version: 1.0
  last_updated: 2026-04-03
  # Optional fields — include only if populated:
  engine_type: 2T                      # 2T | 4T
  fuel_system_type: TPI                # TPI | carb | TBI | EFI
  suspension_architecture: PDS         # PDS | linkage | other
  # If suspension_architecture is 'other', the body text must describe the architecture.
  # stock_gearing belongs in Section 2 (body), not frontmatter.
---
```

### Section Structure

Machine KB entries use an 8-section body structure.

---

**Section 1 — Identity & Platform**
- Manufacturer, model, year
- Platform family name and shared models
- May note shared platform context briefly (e.g. shared engine internals, architecturally significant differences between models in the same family)
- All actual behaviour description belongs in Sections 3–5, not Section 1

**Section 2 — Stock Build Configuration**
- Engine architecture (displacement, cycle, induction type, fueling system type)
- Fueling system (manufacturer, injection type, generation if relevant)
- Clutch (type, actuation)
- Gearbox and final drive (ratios or gearing — exact or confirmed assumed, with open items noted)
- Suspension architecture and stock units (front and rear)
- Brakes (manufacturer, actuation)
- Chassis / frame only if directly tied to a stated ride characteristic
- Stock wheel / tyre setup only if behaviourally relevant

**Section 3 — Engine & Drivetrain Behaviour**

Factual description of:
- Torque delivery shape — where in the rev range torque builds and how it progresses
- Throttle response character — how power responds to throttle input across the opening range
- Low-RPM behaviour — minimum RPM at which the engine delivers usable torque
- Stall resistance — tendency to stall under load at low RPM
- Engine braking level — deceleration force produced at the rear wheel on throttle close
- Rev character / power spread — how power is distributed through the usable RPM range
- Flywheel / rotational inertia effects — pulse smoothing at the wheel, resistance to stall under brief load spikes, rev response delay on snap-open inputs
- Clutch dependency — the extent to which clutch modulation is required for torque regulation at low speed and stall prevention

**Section 4 — Suspension & Chassis Behaviour**

Factual description of:
- Front compliance, support, and deflection behaviour — single and repeated inputs
- Rear behaviour under drive load — how the chassis responds to throttle application
- Rear behaviour under braking load — how the chassis responds to brake application
- Rear behaviour on repeated impacts — damping consistency through impact sequences
- Rear behaviour under weight transfer — chassis response to load shifts
- Chassis stability and agility characteristics

**Section 5 — Brake & Control Character**

Factual description of:
- Front brake engagement character — how braking force builds from initial contact to peak
- Front brake modulation window — range over which modulation is available
- Rear brake engagement character and modulation window
- Clutch engagement character — how drive connects as lever is released
- Any control trait that affects input timing or feel

**Section 6 — Stock Behaviour Summary**
- Concise factual synthesis of how the stock bike behaves off-road as a whole
- No coaching, no interpretation, no recommendations
- 3–6 sentences maximum

**Section 7 — Modification Layer**
- Clearly separated from stock content with a section break and architecture note
- Architecture note at top: state whether this section is MVP-only and where modifications will live in production
- For each modification:
  - **Component changed** — part or system being modified
  - **Stock baseline** — what the stock component produces
  - **Modified setup** — what replaces or changes it
  - **Behavioural delta** — factual description of the change in machine behaviour, including:
    - The condition where the change is observed (e.g. low-speed load, soft terrain, repeated impacts, hard braking, acceleration load)
    - The direction of change (e.g. increased, reduced, more consistent, less abrupt)
  - **Scope / interaction notes** — where this change interacts with other systems or has behavioural limits
- Delta-from-stock only. No restatement of the full machine profile.

**Section 8 — Open Items / Verification Notes**
- List any unconfirmed specifications, assumed values, or content pending verification
- Use checkbox format: `- [ ] item`

---

### Writing Rules

1. Every sentence must be factual about the machine or the behaviour its components produce.
2. Every included fact must affect riding-relevant machine behaviour. If it does not, cut it.
3. Describe how build creates behaviour. Do not just list parts.
4. The entry must stand alone. Comparison to other platforms may appear only where technically necessary, and any such comparison is supplementary — the entry's behaviour description must be complete without it. No section defines behaviour mainly by comparison to carb, TBI, Brembo, linkage, or other platforms.
5. The mods section must be delta-from-stock only. No restatement of the full machine profile.
6. Avoid absolutes unless truly defensible.
7. No coaching advice. No "the rider should". No diagnostic conclusions. No pipeline logic.
8. Do not describe rider behaviour, intent, or psychology. Only describe machine behaviour and mechanical effects. Avoid phrasing like "this encourages", "riders tend to", or "this leads riders to".
9. Do not describe outcomes in terms of ease, difficulty, or improvement language such as "easier", "harder", "improves control", or "helps with". Describe only the mechanical change in behaviour.

### Inclusion / Exclusion

**Include:** Behaviourally relevant machine facts that affect how the bike responds to rider inputs and terrain.

**Exclude:** Spec-sheet filler, cosmetic details, generic marketing language, and any fact that does not affect ride behaviour.

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
| Section 2 renamed | Surface Physics & Traction | Feature Forms & Variants (v1.2) | Physics Explanation | Feature KB v1.2: sections 1–11 replace the prior 9-section structure |
| Section 3 renamed | Condition & Gradient Variations | Bike Behaviour (v1.2) | Input → Response Mapping | Feature KB v1.2: Section 3 is bike physics only; Technique by Severity is Section 4 |
| Section 4 Pipeline ID subsection | ✓ + Observability Notes | ✓ Section 5 + Observability Notes (v1.2) | ✓ + Observability Notes + Causal Chain Patterns | Feature KB v1.2: Pipeline ID + Observability Notes are mandatory subsections of Section 5 |
| `feature_class` field | — | ✓ | — | `single_event \| continuous` — in `pipeline_contract` block |
| 11-section body structure | Already ✓ (v1.1) | ✓ v1.2 (5 mandatory / 6 default) | — | Feature KB now matches Terrain KB rigour; full section list and rules in Schema 2 |

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
