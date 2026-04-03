# RideMind — Backlog

**Last updated:** 2026-04-03
**Current phase:** Phase 3 — Reasoning Pipeline + KB Build
**Master plan:** `docs/ridemind-phase3-master-plan-v1.md`

---

## Approval Gates

| Gate | Status | Blocks |
|------|--------|--------|
| Gate 1 — Pipeline stages approved | **PASSED** (2026-04-01) | — |
| Gate 2 — KB entry schemas approved | **PASSED** (2026-04-01) | — |
| Gate 3 — Pipeline v1 implemented | **NOT PASSED** | Phase 3 retest |

---

## P0 — Must Do First

| ID | Category | Task | Status | Blocked By |
|----|----------|------|--------|------------|
| FKB-0 | KB | Update Feature KB schema in docs/kb-schemas-v1.md — add body section structure (severity_definition block, technique-by-severity sections, Pipeline ID + Observability Notes per section) | COMPLETE | — |
| FKB-2 | KB | Generate first 2 Feature KB entries (Jump + Off-camber) for schema validation | COMPLETE | — |
| FKB-3 | KB | Dual review (Claude + ChatGPT); batch remaining 6 Feature KB entries (entries 9–14) | Not started | — |
| T5 | Testing | Define Phase 3 scoring framework (finalised 12 metrics) | Not started | — |
| T6 | Testing | Create ground truth document for all 8 Phase 2 clips | Not started | — |

---

## P1 — Core Build

### Architecture

| ID | Task | Status | Blocked By |
|----|------|--------|------------|
| COACH-1 | Define RideMind coaching persona and philosophy — Three Pillars framework (Balance, Body Position, Power Delivery & Collection) as foundational coaching model. Principles: fundamentals mastered on flat ground before terrain; pillars are interconnected; "deliver and collect" — speed of transition between max and min power is the skill. Shapes coaching tone, skill prioritisation, drill sequencing, progression logic, and Stage 10 framing. Must be complete before Stage 10 is built. | Not started | — |
| SKILL-1 | Design skill tag taxonomy: map failure types to skill tags (e.g. balance_low_speed, momentum_control, line_commitment). Must be complete before Stage 10 is built. | Not started | COACH-1 |
| A2 | Design database schema for all KBs | Not started | Gate 1 |
| A3 | Create mermaid diagram of pipeline flow | Not started | Gate 1 |
| A5 | Design observability confidence scoring system | Not started | Gate 1 |
| A6 | Define coaching tone mapping rules (outcome → tone) | Not started | Gate 1 |

### Knowledge Base — Wave 1 (Core Files)

| ID | Task | Status | Blocked By |
|----|------|--------|------------|
| K2 | Write Terrain Feature KB — 8–10 entries | Not started | FKB-1 |
| DYN-D | Resolve Dynamics KB structure decision: new domain folder (6 files) vs upgrade Domain 02/03 (26 files) — **Option A locked** | COMPLETE | — |
| K0b | Generate dynamics-01_weight-distribution KB entry | Not started | DYN-D |
| K0d | Generate dynamics-02_throttle-management KB entry | Not started | DYN-D |
| K3 | Write Bike Dynamics KB — remaining entries | Not started | DYN-D, K0b, K0d |
| K5 | Review/QA pass on all new KB files | Not started | K2, K3 |
| K6 | Internet-source validation for physics claims | Not started | K3 |

### Pipeline / Engineering — Stages 1–4 (Build First)

| ID | Task | Status | Blocked By |
|----|------|--------|------------|
| E1 | Implement Stage 1: Camera Perspective Detection | Not started | — |
| E2 | Implement Stage 2: Observability Assessment | Not started | — |
| E3 | Implement Stage 3: Rider Intent / Attempt Detection | Not started | — |
| E4 | Implement Stage 4: Terrain & Feature Detection | Not started | K0a–K0d |
| E10 | Build KB loader / query function | Not started | K0a–K0d |

### Pipeline / Engineering — Stages 5–11 (After Early Validation)

| ID | Task | Status | Blocked By |
|----|------|--------|------------|
| E5 | Implement Stage 5: Event Sequencing | Not started | E1–E4 |
| E6 | Implement Stage 6: Failure Type Classification | Not started | E1–E4 |
| E7 | Implement Stage 7: Crash Type Classification | Not started | E1–E4 |
| E8 | Implement Stage 8: Causal Chain Construction | Not started | E1–E4 |
| E9 | Implement Stage 9: Decision Engine / Coaching Strategy Mapping | Not started | E1–E4 |
| E11 | Implement Stage 10: Coaching Generation (refactor existing) | Not started | E1–E4 |
| E12 | Implement Stage 11: Coaching Safety Validation | Not started | E1–E4 |
| E13 | Wire pipeline into existing test runner CLI | Not started | E1–E12 |

### Testing & Evaluation

| ID | Task | Status | Blocked By |
|----|------|--------|------------|
| T1 | Re-run all 8 Phase 2 clips through new pipeline | Not started | Gate 3 |
| T2 | Score Phase 3 results against Phase 2 baselines | Not started | T1 |
| T3 | Write Phase 3 evaluation report | Not started | T2 |

---

## P2 — Important but Not Blocking

### Early Validation

| ID | Task | Status | Blocked By |
|----|------|--------|------------|
| V1 | Early validation: run stages 1–4 on Colin Hill | Not started | E1–E4 |
| V2 | Early validation: run stages 1–4 on Mark Crash | Not started | E1–E4 |
| V3 | Document validation gaps before building stages 5–11 | Not started | V1, V2 |

### Knowledge Base — Wave 2 (Expansion)

| ID | Task | Status | Blocked By |
|----|------|--------|------------|
| K7 | Write remaining Terrain KB files (15–20 total) | Not started | K1 |
| K8 | Write remaining Feature KB files (20–25 total) | Not started | K2 |
| K9 | Write remaining Dynamics KB files (15–20 total) | Not started | K3 |
| K10 | Migrate existing technique KB (154+ files) to database | Not started | A2 |
| K11 | Migrate new KBs to database | Not started | A2, K1–K3 |

### Domain 16 — Machine Characteristics & Bike Profiles

| ID | Task | Status | Blocked By |
|----|------|--------|------------|
| D16-1 | Design Domain 16 schema — **Architecture locked:** stock bike data only; rider mods on user profile layer; MVP = one file with clear separation. Formal schema not yet in `docs/kb-schemas-v1.md`. | Not started | — |
| D16-2 | Generate Domain 16 entries — **MACHINE-01 (GasGas EC300 TPI 2023) drafted** at `knowledge-base/domain-16-machines/gasgas-ec300-tpi-jake.md`, uncommitted | In progress | D16-1 |
| D16-3 | MACHINE-01 rewrite pass: apply cause→effect discipline + ChatGPT review, then commit | Not started | — |

> Domain 16 is a different KB type from terrain/features/dynamics — structured bike data, not coaching content. Architecture locked (2026-04-03): stock data only; rider mods on user profile layer. No formal schema in `docs/kb-schemas-v1.md` yet.

### Engineering — Reliability

| ID | Task | Status | Blocked By |
|----|------|--------|------------|
| E12 | Increase Gemini token budget for classification steps | Not started | — |
| E13 | Add retry logic for Gemini upload failures | Not started | — |
| E14 | Investigate GPT-4o visual refusal causes | Not started | — |

### Testing — Expansion

| ID | Task | Status | Blocked By |
|----|------|--------|------------|
| T4 | Expand test corpus to 20+ clips | Not started | T3 |
| A4 | Decide model assignment per pipeline stage | Not started | T2 |

---

## P3 — Non-Blocking Improvements

### Post-MVP: Drill & Training System

| ID | Task | Status | Notes |
|----|------|--------|-------|
| DRILL-1 | Drill KB system design: define drill entry schema, link to skill tags, define evaluation criteria | Not started | Post-MVP |
| DRILL-2 | Drill evaluation pipeline: analyse drill execution videos against skill tag success criteria | Not started | Post-MVP |
| DRILL-3 | Training mode in upload UX: rider flags upload as practice/drill session vs trail riding | Not started | Post-MVP |
| DRILL-4 | Progression tracking system: track skill tag improvement over time across sessions | Not started | Post-MVP |

### Non-Blocking Cleanup (do anytime)

| ID | Task | Status | Notes |
|----|------|--------|-------|
| NB-1 | Formalise Stage 11 safety constraint pattern in `docs/pipeline-contracts-v1.md` | Not started | Pattern used by clay and roots KB entries; needs formal definition in contracts |
| NB-2 | Standardise failure chain naming convention across all KB entries | Not started | Inconsistent naming found during terrain KB review |
| NB-3 | Promote "hidden hazard" to a formally defined reusable pattern in `docs/kb-schemas-v1.md` | Not started | Currently appears informally in grass, sand, clay, mixed entries |
| NB-4 | Fix tags format in TERRAIN-01 and TERRAIN-02 (comma-separated string → YAML list) | Not started | Schema v1.1 requires YAML list format; these two entries predate the rule |
| NB-5 | Confirm rock garden clarification line was added to TERRAIN-03 | Not started | Flagged during terrain KB review |

---

## Completed

| ID | Task | Completed |
|----|------|-----------|
| FKB-1 | Finalise Feature KB entry list — 14 entries locked, geometry-first | 2026-04-02 |
| FKB-B | Generate FEATURE-03 (drop) through FEATURE-08 (berm) — 6 entries committed | 2026-04-03 |
| FKB-C | Feature KB compression pass — all 8 entries compressed (16% avg reduction, ea68258) | 2026-04-03 |
| FKB-S | Consistency spec: Section 16 (Compression Discipline) and check 11 (redundant content check) added (b894958) | 2026-04-03 |
| K1 | Write Terrain KB — 10 core surface files (Domain 17, TERRAIN-01 to TERRAIN-10) | 2026-04-02 |
| K0a | Generate terrain-01_rock KB entry (included in K1) | 2026-04-02 |
| K4 | Define KB entry schemas for all 3 new KBs (Gate 2) | 2026-04-01 |
| A1 | Define pipeline stage JSON contracts (Gate 1) | 2026-04-01 |
| K12 | Cross-check Colin Hill Phase 2 scores from local saved data | 2026-04-01 |
| — | Phase 2 multi-model testing (24/24 runs) | 2026-03-31 |
| — | Phase 2 scoring (8/8 clips, 3 models) | 2026-04-01 |
| — | Phase 2 evaluation report | 2026-04-01 |
| — | Phase 3 master plan | 2026-04-01 |
| — | Knowledge base domains 1–15 (154+ technique files) | Previously |

---

## Domain 18: Rider Skills & Technique Execution

- **Status:** Not started � schema design required
- **Blocked by:** Terrain and Feature KB generation complete
- **Priority:** Required before real user testing
- **Description:** New KB domain covering deliberate skill practice clips (not trail scenarios). Handles uploads where riders are practicing specific techniques rather than riding terrain. Pipeline routes to this KB via Stage 3 (Rider Intent) when the clip is identified as skill practice rather than trail riding.
- **Initial entries (6-8 planned):**
  1. Wheelies (power wheelie, clutch-up, balance point, loop-out/drop-down failures)
  2. Clutch Control Drills (clutch-up lifts, slipping, feathering, friction zone)
  3. Bunny Hops / Bike Lifts (front lift, rear lift, full bunny hop, timing)
  4. Standing Balance / Slow Speed Control (static balance, track stands, slow manoeuvring)
  5. Precision Placement (hopping onto objects, pallet exercises, log rides, beam riding)
  6. Jumping Technique (body position, throttle at lip, air awareness, landing execution)
- **Architecture note:** Requires own schema � structurally different from terrain and feature KBs. Cross-references Domain 02 (control inputs) and Domain 03 (bike dynamics) for mechanics, but this domain covers execution, common errors, and coaching cues for deliberate practice.
