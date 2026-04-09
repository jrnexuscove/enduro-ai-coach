# RideMind — Phase 3 Master Plan

**Status:** Active
**Created:** 2026-04-01
**Owner:** Jake (Nexus Cove)
**Purpose:** Single source of truth for the next phase of RideMind development

---

## 1. Phase 2 — Key Findings (Condensed)

Phase 2 tested GPT-4o, Claude, and Gemini 2.5 Flash across 8 real riding clips. The findings below are the ones that drive architecture decisions.

1. **No model is production-ready alone.** Gemini was strongest on observation (~65% avg) but failed to run 3/8 times. GPT-4o was mid-tier (~42%) with unpredictable visual refusals. Claude ran every time but produced the weakest output (~34%) and the most dangerous failure modes.

2. **Architecture matters more than model choice.** The 10 systematic failures we found exist above the model layer. Better models won't fix them — structured reasoning will.

3. **No model can detect terrain features.** Jumps, drops, and discrete features were invisible across all clips. This is the single biggest gap. When the system misses the critical feature, everything downstream collapses.

4. **No model can classify crash types.** OTB, lowside, highside, and traction loss were never distinguished. On Mark Crash, one model prescribed coaching that would reproduce the crash.

5. **No model reasons about failure causation.** Models describe symptoms ("lost momentum") rather than causes ("insufficient entry speed for this gradient"). Coaching without causal reasoning is commentary, not coaching.

6. **Models fabricate certainty when they can't see.** When the rider is distant, low-res, or in POV, models invent confident claims about body position, terrain, and scenario rather than expressing uncertainty.

7. **No model sequences events.** Every clip is treated as one monolithic moment. Multi-feature sequences (clean jump → failed second jump) are compressed into single generic labels.

8. **No model reasons about line choice or route viability.** Whether the rider should be on that line at all is a question the system cannot currently ask.

9. **No model understands airborne state.** Takeoff, mid-air attitude, yaw/pitch/roll, and landing alignment don't exist as concepts in any model's reasoning.

10. **Coaching safety is not guaranteed.** Without structured reasoning, the system can produce advice that is not just wrong but actively dangerous. This must be treated as a constraint, not a quality preference.

---

## 2. RideMind System Vision (Clarified)

### What RideMind Is

RideMind is a physics-aware, terrain-aware, machine-aware riding intelligence system. It analyses off-road motorcycle footage and produces structured, actionable coaching that accounts for terrain type, terrain features, surface conditions, machine behaviour, rider intent, and failure causation. It is not a generic video analysis tool that happens to look at motorcycles.

The core product promise is: **accurate observation → correct diagnosis → actionable coaching → safe advice.** Every stage depends on the one before it. If the observation is wrong, the diagnosis is invalid. If the diagnosis is wrong, the coaching is dangerous.

### What Makes It Different

Current AI systems treat riding footage as a generic vision task: describe what you see, then generate advice. RideMind treats it as a domain-specific reasoning task. The system knows what mud does to traction. It knows what a jump demands of body position. It knows that a 2-stroke on leaves behaves differently from a 4-stroke on rock. It knows that an OTB requires completely different coaching from a lowside. This domain knowledge is not optional decoration — it is the product.

### Why Architecture Matters More Than Model Choice

Phase 2 proved that swapping models changes scores by 10–30%, but adding the right reasoning step (terrain features, failure types, event sequencing) would change scores by 50–100%. The models are the engines. The reasoning pipeline is the vehicle. You can't win a race with a better engine in a broken car.

### Three-System Architecture

RideMind is three architecturally separate systems:

- **Reality Analysis System:** Terrain KB + Feature KB + Pipeline stages 1–9. Answers "what is this rider dealing with?"
- **Coaching System:** Technique KB + failure-to-correction logic + Stage 10 coaching output. Answers "what should the rider do differently?"
- **Training System (future):** Drill KB + drill evaluation + progression tracking. Answers "how do we fix this over time?"

These systems must remain architecturally separate. Feature KB must not contain drill content. Terrain KB must not leak into coaching. Architecture decisions now must not block the future Training System. The closed feedback loop — pipeline analyses riding → coaching prescribes drills → rider practises → pipeline evaluates drill execution — is the product moat. It is not a nice-to-have. Every design choice in Phase 3 must leave this future system buildable.

---

## 3. RideMind Reasoning Pipeline v1 (Core Design)

The pipeline processes a single video clip through 11 ordered stages. Each stage produces structured output that feeds forward. No stage is optional in v1; later optimisation may allow skipping stages when confidence is high.

**Audio note:** Audio is a cross-cutting input available to stages 3–8, not a separate stage. Stages that benefit from audio (engine tone, impact sounds, rider speech) draw from it as needed.

**Multi-model note:** Phase 3 v1 is single-model. Multi-model verification is explicitly deferred to post-pipeline-validation. The pipeline architecture is designed to support it in a future version, but it is not part of the Gate 3 target.

**Milestone validation clips:** Colin Hill (first validation target — clearest ground truth for terrain and failure type), Mark Crash (second — tests crash type classification and safety validation).

For detailed stage contracts and JSON schemas, see `docs/pipeline-contracts-v1.md`.

---

### Stage 1: Camera Perspective Detection

**Purpose:** Determine how the footage was captured so the system knows what it can and cannot observe.

**Input:** Raw video frames (first 3–5 frames).

**Output:** Structured classification:
- `perspective`: POV | 3rd-person-close | 3rd-person-distant
- `subject_visible`: true | false
- `subject_size`: large | medium | small | tiny
- `other_riders_visible`: true | false
- `camera_movement`: static | handheld | helmet-mounted

**Depends on:** No knowledge base. Prompt-driven classification from visual input.

**Why it matters:** POV footage means no body position analysis is possible. Distant 3rd-person means body position confidence must be low. Other riders in frame must not be confused with the subject. Every downstream stage needs this context.

---

### Stage 2: Observability Assessment

**Purpose:** Assess how much the system can actually see and set confidence ceilings for downstream claims.

**Input:** Camera perspective output + raw frames.

**Output:** Structured assessment:
- `rider_detail_level`: high | medium | low | none
- `terrain_visibility`: clear | partial | obscured
- `motion_clarity`: high | moderate | low
- `lighting_conditions`: good | mixed | poor
- `resolution_quality`: high | medium | low
- `max_body_position_confidence`: 0.0–1.0
- `max_terrain_confidence`: 0.0–1.0

**Depends on:** Camera perspective output from Stage 1.

**Why it matters:** This is the guard against fabricated certainty. If `rider_detail_level` is "low" and `max_body_position_confidence` is 0.3, the system must not make confident posture claims downstream. This stage doesn't analyse content — it assesses how much content is analysable.

---

### Stage 3: Rider Intent / Attempt Detection

**Purpose:** Determine what the rider was trying to do, and how committed they were to it. Intent distinguishes "failed attempt at a jump" from "chose not to jump" — a critical distinction for coaching.

**Input:** Raw frames + audio observation + shallow terrain cues from Stage 2 output + camera perspective from Stage 1.

**Note:** This stage runs before full terrain detection (Stage 4) but has access to shallow terrain cues — it is not working in a vacuum.

**Output:** Structured intent assessment:
- `attempted_feature`: what the rider was attempting (jump | climb | descent | berm | corner | straight | unknown)
- `commitment_level`: full | partial | aborted | unclear
- `intent_confidence`: 0.0–1.0
- `abort_point`: if aborted, at what point (approach | entry | mid-execution | none)
- `rider_experience_signals`: signals suggesting skill level (body position confidence, line choice, speed management)

**Depends on:** Camera perspective (Stage 1), Observability output (Stage 2). No KB dependency — prompt-driven reasoning from visual and audio cues.

**Why it matters:** Without intent detection, the system cannot distinguish a rider who was attempting a feature from one who wasn't. Coaching a deliberate attempt differently from a surprise encounter changes everything downstream.

---

### Stage 4: Terrain & Feature Detection

**Purpose:** Identify what the ground is made of, what features are present, and what those features demand from the rider.

**Input:** Raw frames + audio observation + intent output (Stage 3) + Terrain KB + Terrain Feature KB.

**Output:** Structured terrain map:
- `surface_type`: [mud, rock, shale, leaves, roots, sand, hardpack, mixed]
- `surface_condition`: [wet, dry, loose, compact, slippery]
- `gradient`: [flat, uphill-gentle, uphill-steep, downhill-gentle, downhill-steep, off-camber]
- `features_detected`: array of:
  - `feature_type`: jump | drop | berm | rut | ledge | log | rock-garden | step-up | step-down | camber-change
  - `criticality`: critical | structural | surface
  - `timestamp_approx`: seconds into clip
  - `demands`: what this feature requires (e.g., "weight forward, attack position, controlled throttle")

**Depends on:** Terrain KB (surface behaviour, gradient effects), Terrain Feature KB (feature identification and demands).

**Why it matters:** This is where domain knowledge enters the pipeline. A jump at the bottom of a descent changes everything about how the preceding section should be ridden. Without this stage, the system is blind to the most important elements in the scene.

---

### Stage 5: Event Sequencing

**Purpose:** Break the clip into a chronological sequence of discrete events rather than treating it as one moment.

**Input:** Visual observation + audio observation + terrain features (Stage 4) + rider intent (Stage 3).

**Output:** Ordered event timeline:
- Array of events, each containing:
  - `phase_number`: 1, 2, 3...
  - `timestamp_range`: start–end seconds
  - `description`: what happens in this phase
  - `terrain_context`: surface + features active
  - `rider_state`: approaching | executing | recovering | stopped
  - `outcome`: clean | struggling | failed | crashed

**Depends on:** Terrain feature output (features define phase boundaries), audio cues (engine changes, impacts, speech mark transitions).

**Why it matters:** Nick Crash proved it. The coaching-relevant failure was on the second jump, not the first. Without event sequencing, that distinction is lost entirely.

---

### Stage 6: Failure Type Classification

**Purpose:** Identify what category of failure occurred (if any) and connect it to its root cause.

**Input:** Event sequence (Stage 5) + terrain context (Stage 4) + rider intent (Stage 3).

**Output:** Failure classification:
- `failure_detected`: true | false
- `failure_type`: momentum | decision | technique | traction | line-choice | mechanical | none
- `failure_phase`: which event phase the failure occurred in
- `root_cause`: specific causal statement (e.g., "insufficient entry speed for gradient and surface conditions")
- `contributing_factors`: array of secondary causes

**Depends on:** Terrain KB (what surfaces/gradients demand), Bike Dynamics KB (what throttle/clutch/traction behaviours indicate), Terrain Feature KB (what features demand).

**Why it matters:** "You lost momentum" is not coaching. "You didn't carry enough entry speed because the muddy surface at this gradient requires X approach speed to maintain traction" is coaching. This stage creates that distinction.

---

### Stage 7: Crash Type Classification

**Purpose:** If a crash occurred, identify the specific crash mechanism.

**Input:** Event sequence (crash phase) + visual observation + audio observation + failure type (Stage 6).

**Output:** Crash classification:
- `crash_detected`: true | false
- `crash_type`: OTB | lowside | highside | traction-loss | stall-tip | obstacle-impact | none
- `crash_mechanism`: specific description of what physically happened
- `body_position_at_crash`: what the rider's position was (with confidence from Stage 2)
- `severity_indicators`: impact force cues, rider sounds, post-crash state

**Depends on:** Bike Dynamics KB (how different crash types manifest physically), event sequence (what preceded the crash).

**Note:** Stage 6 (Failure Type) runs before Stage 7 (Crash Type). Failure type is broader — it applies to non-crash failures too. Crash type refines the classification when a crash exists.

**Why it matters:** An OTB from a jump requires completely different coaching from a lowside in a corner. Mark Crash proved that wrong crash classification leads to dangerous coaching.

---

### Stage 8: Causal Chain Construction

**Purpose:** Build the complete cause-and-effect chain from setup to outcome.

**Input:** All previous stage outputs (1–7).

**Output:** Structured causal chain:
- `setup`: what conditions existed before the critical moment
- `trigger`: what specific action or event initiated the failure
- `mechanism`: how the failure progressed physically
- `outcome`: what happened as a result
- `what_correct_looks_like`: what the rider should have done differently, grounded in physics and technique

**Depends on:** All three KBs. This is where terrain knowledge, feature knowledge, and bike dynamics converge.

**Why it matters:** This is the reasoning step that transforms observation into diagnosis. Without it, coaching is disconnected from causation.

---

### Stage 9: Decision Engine / Coaching Strategy Mapping

**Purpose:** Translate the causal chain and failure diagnosis into a structured coaching strategy — before any coaching language is generated.

**Input:** Causal chain (Stage 8) + all failure/crash classifications + observability confidence levels.

**Output (v1 — 6 fields):**
- `primary_issue`: the single most important thing to address (from causal chain)
- `root_cause`: the underlying cause of the primary issue (from Stage 8)
- `coaching_priority_order`: ordered array of issues from most to least critical
- `risk_flags`: any coaching points that carry safety implications
- `recommended_tone`: reinforcement-first | analysis-first | correction-focused (driven by outcome and rider commitment level)
- `secondary_issues`: additional issues to address, ordered

**Deferred to v2:** Coaching suppressions (blocking certain advice based on crash type), intervention taxonomy (drill types, difficulty grading), multi-session progression tracking.

**Why it matters:** Without a strategy step, coaching generation mixes observation, diagnosis, and advice in an unstructured way. This stage separates "what to say" from "how to say it", producing a clear brief for Stage 10.

---

### Stage 10: Coaching Generation

**Purpose:** Produce actionable coaching feedback grounded in the causal chain and coaching strategy.

**Input:** Decision Engine output (Stage 9) + causal chain + event sequence + observability confidence levels.

**Output:** Structured coaching:
- `tone`: reinforcement-first | analysis-first | correction-focused (driven by Stage 9 strategy)
- `what_happened`: scenario description grounded in observations
- `what_went_well`: specific positive observations (with confidence)
- `what_needs_work`: array of coaching points, each containing:
  - `observation`: what was seen/heard
  - `why_it_matters`: connected to physics/terrain/machine behaviour
  - `correct_technique`: specific, actionable fix
  - `confidence`: how certain the system is about this point
- `drills`: specific practice exercises
- `coaching_confidence`: overall confidence in this output

**Depends on:** All previous stages. Existing technique KB (15 domains, 154+ topics) provides the coaching language and drill structures.

**Why it matters:** This is what the user sees. Everything before this stage exists to make this output accurate, actionable, and safe.

---

### Stage 11: Coaching Safety Validation

**Purpose:** Check that the coaching output does not contradict the failure diagnosis or recommend actions that would reproduce or worsen the observed failure.

**Input:** Coaching output (Stage 10) + failure classification + crash type + causal chain + risk_flags from Stage 9.

**Output:** Safety check result:
- `safe`: true | false
- `conflicts_detected`: array of specific conflicts (e.g., "coaching recommends weight back, but failure was caused by weight too far back")
- `revised_coaching`: corrected version if conflicts found
- `blocked_points`: any coaching points removed for safety

**Depends on:** Failure type and crash type classifications, causal chain, risk_flags from Decision Engine.

**Why it matters:** Mark Crash. Gemini told the rider to get their weight further back. The rider crashed because their weight was already too far back. That coaching would reproduce the crash. This stage exists to prevent that from ever reaching the user.

---

## 4. Knowledge Base Strategy

Three new knowledge bases are required alongside the existing technique KB (15 domains, 154+ topics). All KBs will be built as structured markdown files initially, then migrated to a queryable database alongside the existing KB.

### A. Terrain Knowledge Base

**What it contains:** Surface types, their physical properties, and how they affect riding.

**How the pipeline uses it:** Stage 3 (Terrain Detection) queries this KB to understand what a detected surface means for traction, braking, and momentum. Stage 5 (Failure Type) queries it to determine whether a failure was surface-driven. Stage 8 (Coaching) queries it for surface-specific technique advice.

**Example entry:**

```markdown
# Surface: Wet Leaves on Hardpack

## Properties
- Traction coefficient: Very low (0.2–0.3 equivalent)
- Predictability: Low — traction can disappear without warning
- Gradient sensitivity: High — off-camber + wet leaves is near-zero grip
- Visual deceptiveness: High — looks like solid ground, behaves like ice

## Riding Implications
- Braking: Front brake input must be extremely gentle; rear brake preferred
- Throttle: Smooth, constant, low RPM; any sudden input breaks traction
- Body position: Weight centred, avoid sudden weight transfers
- Cornering: Very wide radius required; avoid lean angle
- Climbing: Requires higher entry momentum than dry equivalent
- Descending: Engine braking primary; brake inputs minimal

## Failure Modes on This Surface
- Traction loss: Most common; rear wheel slides without warning
- Front wash: Front wheel slides on off-camber sections
- Momentum stall: Rear wheel spins, forward progress stops on climbs

## Diagnostic Cues
- Visual: Leaf-covered ground, wet sheen, dark soil visible between leaves
- Audio: No tyre bite sound; quiet tyre interaction = low traction
- Engine: High RPM with low forward speed = wheelspin on leaves
```

**Scope:** 15–20 primary surface types, each with wet/dry variants and gradient modifiers. Approximately 30–40 files.

---

### B. Terrain Feature Knowledge Base

**What it contains:** Discrete, identifiable terrain features that demand specific rider responses.

**Architecture principle:** Feature KB is organised by geometry, not discipline. The pipeline detects shapes — a jump is a jump whether it's on an MX track or in hard enduro. Discipline-specific extremes are handled through severity tiers within each entry: minor = trail, moderate = enduro, significant = hard enduro, major = trials/extreme. Training drills (cone exercises, balance drills, pallet practice) are NOT feature types — they are handled via upload UX.

**Feature type distinction:** Single-event features (jump, drop, log, step) involve a discrete moment of execution and behave differently from continuous/section features (off-camber, switchback, rock garden, whoops, beam) that affect an extended section. This distinction affects retrieval logic, severity assessment, and coaching timing.

**Locked entry list (14 entries):**
1. Jump / Launch Features (tabletop, double, triple, kicker)
2. Drop Features
3. Steps / Ledges (step-up + step-down combined — includes pallets, boulders, vertical faces)
4. Horizontal Obstacles (logs, pipes, tyres, low rigid obstacles)
5. Roots / Root Crossings (discrete crossings — lightweight entry; surface networks covered in TERRAIN-07)
6. Rock Garden (dual-retrieval with TERRAIN-03)
7. Rut (geometry focus — surface behaviour covered in Terrain KB)
8. Berm / Banked Turn
9. Off-camber / Side Slope (distinct from berm — one of the most common UK enduro failure geometries)
10. Switchback
11. Water Crossing (severity range: puddle to deep ford; bog holes as extreme variant)
12. Gully / Ditch / Washout (void/channel geometry — distinct from steps/ledges)
13. Whoops / Rhythm Sections (repeated features, frequency-dependent; includes corrugations)
14. Elevated Beam / Plank (narrow elevated riding, balance-dominant)

**How the pipeline uses it:** Stage 3 (Feature Detection) queries this KB to identify features in the scene and understand what they demand. Stage 4 (Event Sequencing) uses detected features as phase boundaries. Stage 7 (Causal Chain) uses feature demands to assess whether the rider met them.

**Example entry:**

```markdown
# Feature: Tabletop Jump

## Identification
- Visual: Flat-topped ramp with takeoff face, level top section, landing ramp
- Typical height: 0.5m–2m
- Typical length: 3m–10m
- Often found: MX tracks, enduro courses, trail parks

## What This Feature Demands
- Approach: Standing attack position, weight centred, controlled speed
- Takeoff: Weight slightly forward, neutral throttle, compress suspension
- Airborne: Neutral body position, bike level, no throttle input
- Landing: Weight centred to slightly rear, knees bent, absorb with legs
- Minimum speed: Must clear the flat top; under-jumping a tabletop means landing on the flat surface (harsh)

## Common Failure Modes
- Weight too far back on takeoff: Bike nose rises, rider goes OTB on landing
- Weight too far forward on takeoff: Front wheel dips, nose-dive landing
- Insufficient speed: Landing on flat top instead of downslope (impact)
- Throttle on takeoff: Rear wheel spins, bike pitches nose-up
- Panic brake in air: Front dips violently

## Coaching Notes
- Tabletops are forgiving compared to doubles (no gap to clear)
- Key skill is consistent approach speed, not maximum speed
- Riders who are nervous tend to chop throttle at the lip — this causes nose-up pitch

## Criticality Level
- Critical: Changes everything about how the preceding and following sections must be ridden
```

**Scope:** 20–25 feature types across enduro, motocross, trials, and trail contexts. Each with identification cues, demands, failure modes, and coaching notes. Approximately 20–25 files.

---

### C. Bike / Machine Dynamics Knowledge Base

**What it contains:** How motorcycles behave physically, how different engine types affect riding, and how controls (throttle, clutch, brakes) interact with terrain and features.

**How the pipeline uses it:** Stage 5 (Failure Type) queries this to determine whether a failure is machine-related or rider-related. Stage 6 (Crash Type) queries this to understand crash physics. Stage 7 (Causal Chain) uses it to connect rider inputs to machine responses. Stage 8 (Coaching) uses it for machine-specific technique advice.

**Example entry:**

```markdown
# Concept: Rear Wheel Traction Management

## Physics
- Rear tyre delivers drive force to ground via contact patch
- Traction = friction coefficient × normal force on rear tyre
- Throttle increases drive force; if drive force > traction, wheel spins
- Weight distribution affects normal force: forward weight = less rear traction
- Surface type determines friction coefficient (rock > mud > wet leaves)

## 2-Stroke vs 4-Stroke Behaviour
- 2T: Power delivery is sharper, more binary; easier to break traction suddenly
- 4T: Power delivery is smoother, more progressive; traction breaks more gradually
- 2T: Requires more clutch modulation to manage power delivery
- 4T: Throttle alone can often manage traction; clutch used for specific situations

## Diagnostic Cues (from video/audio)
- Productive slip: Slight roost, steady engine note, forward progress maintained
- Free spin: Heavy roost, high RPM, forward speed drops — drive force exceeds traction
- Bog: Engine RPM drops under load — insufficient throttle for conditions
- Clutch slip: Engine RPM fluctuates without matching wheel speed — clutch partially engaged

## Terrain Interaction
- Hard surface: High traction ceiling; throttle can be aggressive
- Loose surface: Low traction ceiling; throttle must be progressive
- Mud: Very low ceiling; momentum > throttle power
- Rocks: Variable — high on flat rock, low on loose rock

## Common Failures
- Over-throttle on loose surface: Free spin, momentum loss, stall on hills
- Under-throttle on steep climb: Bog, momentum loss, rollback
- Sudden throttle off on climb: Rear tyre locks briefly, bike slows sharply
- Clutch dump on 2T: Sudden traction break, potential highside or wheelspin
```

**Scope:** 15–20 concept files covering throttle, clutch, braking, suspension, engine types, traction, jump physics, crash physics, and machine-specific behaviours. Approximately 15–20 files.

---

### D. Skill Tag Layer

**What it is:** An intermediate mapping layer between failure classification (Stage 6) and coaching output (Stage 10). Every failure type maps to one or more skill tags (e.g. `balance_low_speed`, `momentum_control`, `clutch_throttle_coordination`, `line_commitment`, `body_position_climb`).

**Why it matters:** Skill tags connect failure diagnosis to drill recommendations, enabling the closed coaching loop: analyse → prescribe → practise → re-analyse. Without skill tags, coaching outputs are one-off text responses with no structured link to practice. With skill tags, the system can track which skills a rider is weak on, prescribe the right drills, and measure improvement over time.

**When to build it:** The skill tag taxonomy must be designed before Stage 10 (Coaching Generation) is implemented, so that coaching outputs include skill tags from day one. The taxonomy is not a separate KB — it is a structured mapping table (a design artefact) that lives in `docs/`.

**What it is not:** The Drill KB (which maps skill tags to specific drills) is a separate future system. Design the skill tag taxonomy now; build the Drill KB post-MVP.

---

### KB Build Standards

All three new KBs follow the same quality standards as the existing technique KB:

- Structured markdown with consistent section schema
- 200–270 lines per file
- Written from authoritative sources, not rider opinion
- Cross-referenced where concepts overlap between KBs
- Designed to be queryable: each file has metadata (tags, categories, related files) that the database can index

**Total new KB scope:** ~65–85 new files across three domains.

---

## 5. Build Strategy (Order of Work)

### Approval Gates

No work proceeds past a gate until it is explicitly approved.

| Gate | Status | What Must Be Approved | Blocks |
|------|--------|----------------------|--------|
| **Gate 1 — Pipeline Approved** | **PASSED** (2026-04-01) | Stage names, order, purpose, outputs, dependencies | All KB generation, all engineering |
| **Gate 2 — KB Schema Approved** | **PASSED** (2026-04-01) | Entry template structure for each KB domain | Batch KB generation |
| **Gate 3 — Pipeline v1 Implemented** | **PASSED (2026-04-09)** — All 11 stages implemented and validated. Stages 1–9 validated on three discriminator clips (Mark Crash, Colin Hill, Clutch Scream). Stages 10–11 implemented and three-clip validated. FAIL-path not yet live-tested on Stage 11. Full 8-clip retest pending. | All 11 stages wired and producing structured output | Phase 3 retest |

### Phase 3A: Foundation (Weeks 1–2)

**Goal:** Lock the pipeline skeleton and start KB builds in parallel.

1. **Define pipeline data contracts** — Write the exact JSON schema for each stage's input/output. No code yet. Just the contracts. This ensures every stage knows what it receives and what it must produce. **→ Gate 1 checkpoint.**

2. **Begin Terrain KB build** — *(Requires Gate 1 passed.)* Start with the 10 most common surfaces from the Phase 2 test clips: mud, rock/shale, leaves, roots, hardpack, loose dirt, mixed forest floor, wet variants. Write these as structured markdown files following the schema above.

3. **Begin Terrain Feature KB build** — *(Requires Gate 1 passed.)* Start with the features that Phase 2 exposed as gaps: jumps (tabletop, double, step-up), drops, ruts, off-camber sections, dead-end routes. Write 8–10 files.

4. **Begin Bike Dynamics KB build** — *(Requires Gate 1 passed.)* Start with: rear wheel traction, throttle management, clutch management, 2T vs 4T differences, jump physics, crash physics (OTB, lowside, highside). Write 6–8 files.

**→ Gate 2 checkpoint: KB entry templates approved before batch generation.**

### Phase 3B: Pipeline Build (Weeks 2–3)

**Goal:** Implement the reasoning pipeline stages as callable functions.

5. **Build Stage 1 + 2** (Camera Perspective + Observability) — These are the simplest stages. Prompt-driven, no KB dependency. Implement as functions that take frames and return structured JSON.

6. **Build Stage 3** (Terrain & Feature Detection) — This is the first stage that queries KBs. Implement KB loading and retrieval. The model receives frames + relevant KB entries and produces structured terrain output.

7. **Build Stages 4–7** (Event Sequencing → Causal Chain) — These are the core reasoning stages. Each takes the previous stage's output plus relevant KB entries. Implement as a chain where each stage's output feeds the next.

8. **Build Stages 8–9** (Coaching + Safety) — Coaching generation uses the existing technique KB plus all previous stage outputs. Safety validation cross-checks coaching against failure/crash classification.

### Phase 3C: Integration & Validation (Weeks 3–4)

**Goal:** Wire the pipeline into the test runner and validate against the same 8 clips.

**→ Gate 3 checkpoint: All 11 stages must be implemented and producing structured output before retest begins.**

9. **Integrate pipeline into test runner** — Replace the current 4-step pipeline (visual → audio → classify → coach) with the 11-stage pipeline. Keep the same CLI interface.

10. **Re-run all 8 Phase 2 clips** — Same clips, same ground truth, same scoring framework (use the expanded 12-metric version from late Phase 2). Score against the same rubric.

11. **Score and compare** — Measure improvement against Phase 2 baselines. Document which gaps closed and which remain.

12. **Write Phase 3 evaluation report** — Architecture recommendation for Phase 4 based on results.

### Phase 3D: Database Migration (Parallel Track)

**Goal:** Move all KBs (existing + new) into a queryable database.

13. **Design database schema** — Tables for techniques, terrain, features, bike dynamics. Foreign keys linking related concepts across KBs.

14. **Build migration scripts** — Parse markdown files into structured database entries.

15. **Build query layer** — Functions that retrieve relevant KB entries for a given terrain type, feature type, or failure mode. This replaces the current "load 4 files and hope" approach.


---

## 6. Current Execution State

All three gates are passed. Gate 3 (Pipeline v1 Implemented) passed 2026-04-09 — all 11 stages built, implemented, and validated across three discriminator clips. Full 8-clip retest is the next milestone.

### Completed: Terrain KB (Domain 17)

All 10 Terrain KB entries have been generated and committed to `knowledge-base/domain-17-terrain/`:
- TERRAIN-01 mud through TERRAIN-10 mixed
- Schema v1.1 used throughout (11-section body, 3-block frontmatter, 5 mandatory sections)
- Quality validated via dual review (Claude + ChatGPT) on rock, grass, clay, and mixed entries
- All entries status: draft — not yet validated against pipeline runs

### Completed: Feature KB (Domain — 14 Entries)

All 14 Feature KB entries generated, compressed, and committed (FEATURE-01 through FEATURE-14). Full compression pass done (16% avg reduction). Consistency spec committed at `docs/feature-kb-consistency-spec-v1.md`.

### Completed: Machine KB — Domain 16 (Schema + First Two Entries)

Schema 4 (Machine KB) added to `docs/kb-schemas-v1.md` (v1.3, 2026-04-03). Two-block frontmatter, 8-section body. File naming locked: stock = `[mfr]-[model]-[year].md`, rider-layer = `[mfr]-[model]-[year]--[rider].md`. Entries are factual mechanical reference only — no coaching, no pipeline logic.

- **MACHINE-01:** GasGas EC300 TPI 2023 — `knowledge-base/domain-16-machines/gasgas-ec300-tpi-2023--jake.md`. Includes rider modification layer (MVP only). **Note: temporary test infrastructure — to be replaced when Machine KB scaling begins.**
- **MACHINE-02:** GasGas EC300 TBI 2024 — `knowledge-base/domain-16-machines/gasgas-ec300-tbi-2024.md`. Stock-only (`mod_layer: false`). This is the Gate 3 test bike — all current test clips use the TBI model.

Open verification items: rear shock models on both machines, stock gearing tooth counts, DDS clutch designation on MACHINE-02. MACHINE-01 also needs cause-effect compression pass.

### Resolved: Dynamics KB Structure — Option A Locked

**Decision (2026-04-01):** Option A — extend existing Domain 02/03 entries with pipeline frontmatter (`pipeline_contract`, `retrieval_triggers`, `causal_patterns`). No new domain folder. Work not yet started.

### Completed: Pipeline Stages 1–8 (Built, Tested, Validated)

All 8 stages implemented as TypeScript functions with structured JSON output, wired into `pipeline/run-test.ts`.

**Stage 1 — Camera Perspective Detection:** Prompt-driven, no KB. 8/8 clips correct in Phase 2 retesting.

**Stage 2 — Observability Assessment:** Prompt-driven. Sets confidence ceilings for downstream claims (body_position_max_confidence, terrain_max_confidence, outcome_max_confidence).

**Stage 3 — Rider Intent / Attempt Detection:** Includes `event_detected` field (crash/stall/bail/near_miss/tip_over/mechanical) with fallback shape and type clamping. Anti-refusal instruction added.

**Stage 4 — Terrain & Feature Detection:** Consequence-based severity definitions, jump geometry rules, switchback constraints, gradient calibration. Rock garden detected on Colin Hill, jump detected on Mark Crash — features all Phase 2 models missed.

**Stage 5 — Event Sequencing:** Chronological phase segmentation. Sequence-not-causality enforcement (no coaching language, no root cause diagnosis). Airborne failure-point rule places failure at earliest visible breakdown, not at landing. Deterministic timestamps (computed in code, not model-authored).

**Stage 6 — Failure Type Classification:** Symptom vs root cause separation. Failure hierarchy rule: bike dynamics > technique > momentum > traction. Airborne failure rule prevents terrain overweighting when failure occurs mid-air. Reasons from structured JSON only (no frames).

**Stage 7 — Crash Type Classification:** Conditional — only runs when crash detected (Stage 5 outcome = "crash" OR Stage 3 event_detected.type = "crash"). Classifies crash mechanism (otb/lowside/highside/tip_over/stall_drop/slide/ejection). Reasons from structured JSON only (no frames).

**Stage 8 — Causal Chain Construction:** Explanation stage anchored to Stage 6 classification. Cannot overturn Stage 6 or introduce new observations. Stage 6 → Stage 8 failure_type mapping enforced in code (not just prompt). 3-part causal summary (setup_conditions / failure_mechanism / outcome_pathway). Counterfactual targets the primary cause as a diagnostic variable (not coaching language). Evidence refs trace back to specific upstream fields. Stage 7 boundary enforced: outcome_pathway cannot name crash mechanisms when Stage 7 is null.

**Reliability hardening (all stages):** 2 retries with strict repair prompt on final attempt. JSON extraction from mixed responses (finds first/last braces). Refusal detection (skips parse, goes straight to retry). Anti-refusal instruction across all stage prompts. GPT-4o intermittent refusal is a known model behaviour issue, handled by retry logic.

**Validation results:**
- Mark Crash: Stage 6 = technique (airborne instability), Stage 7 = otb (confidence 0.90), Stage 8 = technique primary cause with jump geometry as enabling condition, counterfactual targets body_position
- Colin Hill: Stage 6 = momentum, Stage 7 = skipped (correct), Stage 8 = momentum primary cause with terrain as enabling condition, no crash mechanism in outcome_pathway
- 5/8 Phase 2 clips pass clean through Stages 1–4; 2 partial, 1 fail (prompt tuning items, not architecture issues)

### Complete: Pipeline Stages 9–11

Stage 9 validated on three discriminator clips: Mark Crash (body_position primary, fore_aft_weight_distribution tag, 0.90 confidence), Colin Hill (speed_management primary — correct graceful degradation), Clutch Scream (no hallucination, observability_limited true). Primary Cause Interpretation Rule live.

Stage 10 implemented: `rider_facing_summary` + `technical_coach_note` voice rules embedded in prompt. Observability-gated confidence, drift check against Stage 9, business rule validation. Three-clip validated.

Stage 11 implemented: validator-only architecture. Does not rewrite coaching — checks output against failure diagnosis, crash type, and causal chain. Hard fail conditions: `contradiction` or `speed_risk` force `safe: false`; `severity_mismatch` forces `safe: false` when Stage 7 severity is `serious`. FAIL-path not yet live-tested (Stage 10 prompt controls have produced safe outputs; synthetic fail fixture needed before production reliance on Stage 11).

### Not Yet Started: Dynamics KB (Option A), Skill Tag Taxonomy

- Dynamics KB (extend Domain 02/03 with pipeline frontmatter) — work not started
- Skill tag taxonomy — taxonomy lives in types.ts SkillTag enum for v1; standalone reference doc deferred post-MVP

---

## 7. Backlog (Structured)

### Architecture

| ID | Task | Priority | Status |
|----|------|----------|--------|
| A1 | Define pipeline stage JSON contracts | P0 | **COMPLETE** — `docs/pipeline-contracts-v1.md` |
| A2 | Design database schema for all KBs | P1 | Not started |
| A3 | Create mermaid diagram of pipeline flow | P1 | Not started |
| A4 | Decide model assignment per pipeline stage | P2 | Blocked (needs full pipeline testing) |
| A5 | Design observability confidence scoring system | P1 | **COMPLETE** — implemented in Stage 2 |
| A6 | Define coaching tone mapping rules (outcome → tone) | P2 | Not started |

### Knowledge Base

| ID | Task | Priority | Status |
|----|------|----------|--------|
| K1 | Write Terrain KB — 10 core surface files | P1 | **COMPLETE** (2026-04-02) |
| K2 | Write Terrain Feature KB — 14 entries | P1 | **COMPLETE** — all 14 committed, compression pass done |
| K3 | Write Bike Dynamics KB — extend Domain 02/03 (Option A, 26 files) | P1 | Not started |
| K4 | Define KB file schema (metadata, tags, cross-refs) | P0 | **COMPLETE** (2026-04-01) |
| K5 | Review/QA pass on all new KB files | P1 | Blocked (needs K3) |
| K6 | Internet-source validation for physics claims | P1 | Blocked (needs K3) |
| K7 | Write remaining Terrain KB files (15–20 total) | P2 | Blocked (needs K1) |
| K8 | Write remaining Feature KB files (20–25 total) | P2 | **Blocked** — 14/14 core entries done; expansion deferred |
| K9 | Write remaining Dynamics KB files (15–20 total) | P2 | Blocked (needs K3) |
| K10 | Migrate existing technique KB (154+ files) to database | P2 | Not started |
| K11 | Migrate new KBs to database | P2 | Blocked (needs A2, K1–K3) |
| K12 | Cross-check Colin Hill Phase 2 scores | P0 | **COMPLETE** (2026-04-01) |
| K13 | Machine KB verification: rear shock models, stock gearing, DDS clutch | P2 | Not started |
| K14 | MACHINE-01 cause-effect compression pass | P2 | Not started |

### Pipeline / Engineering

| ID | Task | Priority | Status |
|----|------|----------|--------|
| E1 | Implement Stage 1: Camera Perspective Detection | P1 | **COMPLETE** — 8/8 correct |
| E2 | Implement Stage 2: Observability Assessment | P1 | **COMPLETE** |
| E3 | Implement Stage 3: Rider Intent / Attempt Detection | P1 | **COMPLETE** — includes event_detected field |
| E4 | Implement Stage 4: Terrain & Feature Detection | P1 | **COMPLETE** — severity calibrated, jump/rock garden detection working |
| E5 | Implement Stage 5: Event Sequencing | P1 | **COMPLETE** — airborne failure-point rule, deterministic timestamps |
| E6 | Implement Stage 6: Failure Type Classification | P1 | **COMPLETE** — failure hierarchy, airborne failure rule |
| E7 | Implement Stage 7: Crash Type Classification | P1 | **COMPLETE** — conditional, both paths validated |
| E-WIRE7 | Wire Stage 7 into runner and test | P1 | **COMPLETE** — Mark Crash (otb ✓), Colin Hill (skipped ✓) |
| E8 | Implement Stage 8: Causal Chain Construction | P1 | **COMPLETE** — code-enforced Stage 6 mapping, both paths validated |
| E9 | Implement Stage 9: Coaching Decision Engine | P1 | **COMPLETE** — validated on three discriminator clips: Mark Crash (body_position primary, 0.90 confidence), Colin Hill (speed_management primary, graceful degradation), Clutch Scream (no hallucination, observability_limited true) |
| E10 | Implement Stage 10: Coaching Generation | P1 | **COMPLETE** — coaching generation with voice rules embedded in prompt; three-clip validated (Colin Hill, Mark Crash, Clutch Scream) |
| E11 | Implement Stage 11: Coaching Safety Validation | P1 | **COMPLETE** — validator-only architecture; hard fail on contradiction/speed_risk; three-clip validated |
| E-RELIA | Reliability hardening (all stages) | P1 | **COMPLETE** — retries, JSON extraction, refusal detection |
| E-ANTI | Anti-refusal instructions (all stages) | P1 | **COMPLETE** |
| E12 | Build KB loader / query function | P1 | Not started |
| E13 | Wire pipeline into existing test runner CLI | P1 | **COMPLETE** — `pipeline/run-test.ts` runs all stages |
| E14 | Increase Gemini token budget for classification steps | P2 | Not started |
| E15 | Add retry logic for Gemini upload failures | P2 | Not started |
| E16 | Investigate GPT-4o visual refusal causes | P2 | Deferred — handled by retry logic for now |

### Prompt Tuning

| ID | Task | Priority | Status |
|----|------|----------|--------|
| PT1 | Stage 3 event detection on Nick Crash (inconsistent) | P2 | Not started |
| PT2 | Stage 4 severity run-to-run variance on Mark Crash | P2 | Not started |
| PT3 | Stage 5 Colin Hill outcome variance (stall/stuck/crash) | P2 | Not started |
| PT4 | Stage 5 balance_state vocabulary gap (dismounted ≠ fallen) | P3 | Not started |
| PT5 | Stage 8 counterfactual variable_category coarseness | P3 | Not started |
| PT6 | Investigate denser frame sampling for short/compact clips | P2 | Not started |

### Testing & Evaluation

| ID | Task | Priority | Status |
|----|------|----------|--------|
| T1 | Re-run all 8 Phase 2 clips through full pipeline | P1 | Not started — pipeline complete; full 8-clip retest is next validation milestone |
| T2 | Score Phase 3 results against Phase 2 baselines | P1 | Blocked (needs T1) |
| T3 | Write Phase 3 evaluation report | P1 | Blocked (needs T2) |
| T4 | Expand test corpus to 20+ clips | P2 | Not started |
| T5 | Define Phase 3 scoring framework (finalised 12 metrics) | P0 | Not started |
| T6 | Create ground truth document for all 8 clips | P0 | Not started |

### Pre-requisites for Remaining Stages

| ID | Task | Priority | Status |
|----|------|----------|--------|
| P1 | Design skill tag taxonomy (mapping table in docs/) | P1 | **DEFERRED (post-MVP)** — taxonomy in types.ts SkillTag enum for v1 |
| P2 | Write coaching persona document (Three Pillars framework) | P1 | **DEFERRED (post-MVP)** — voice rules embedded in Stage 10 prompt for v1 |
| P3 | Pipeline speed optimisation (parallel stages, model-per-stage) | P2 | Not started — post Gate 3 |

---

## Document Control

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-04-01 | Initial Phase 3 Master Plan |
| 1.1 | 2026-04-01 | Added approval gates (Gate 1, 2, 3). Cross-checked with independent reviewer. |
| 1.2 | 2026-04-01 | Updated to 11-stage pipeline: added Stage 3 (Rider Intent) and Stage 9 (Decision Engine). Added audio cross-cutting note, multi-model deferral note, Decision Engine v1 outputs, milestone clips. Gate 1 + Gate 2 PASSED. References to pipeline-contracts-v1.md and kb-schemas-v1.md. Execution plan updated to reflect current state. |
| 1.3 | 2026-04-02 | Terrain KB complete (10 entries, Domain 17). Feature KB is now P0. Dynamics KB open decision documented (new files vs upgrade existing Domain 02/03). Section 6 execution steps updated to reflect current position. |
| 1.4 | 2026-04-02 | Feature KB entry list locked (14 entries, geometry-first). Three-system architecture added to Section 2. Section 4.B updated with 14-entry list, architecture constraints, single-event vs section distinction. Section 4.D added (Skill Tag Layer). Section 6 execution steps updated: schema update is Step 1, skill tag taxonomy added as Step 5, validation moved to Step 7. |
| 1.5 | 2026-04-09 | Major update: Section 6 and 7 rewritten to reflect current state. Feature KB complete (14/14). Pipeline Stages 1–8 built, tested, validated. Stage 9 built (not yet tested). Prompt tuning backlog added. Pre-requisites for remaining stages added. Backlog items updated with completion status. |
| 1.6 | 2026-04-09 | Session 2 update: All 11 pipeline stages complete. Stage 9 validated (three discriminator clips). Stage 10 implemented (coaching generation, voice rules in prompt). Stage 11 implemented (validator-only, hard fail conditions). COACH-1/SKILL-1 deferred to post-MVP. T1 unblocked. Section 6 status and backlog updated. |
