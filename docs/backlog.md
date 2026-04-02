# RideMind — Backlog

**Last updated:** 2026-04-01
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
| K0a | KB | Generate terrain-01_rock KB entry | Not started | — |
| K0b | KB | Generate dynamics-01_weight-distribution KB entry | Not started | — |
| K0c | KB | Generate feature-01_jump KB entry | Not started | — |
| K0d | KB | Generate dynamics-02_throttle-management KB entry | Not started | — |
| T5 | Testing | Define Phase 3 scoring framework (finalised 12 metrics) | Not started | — |
| T6 | Testing | Create ground truth document for all 8 Phase 2 clips | Not started | — |

---

## P1 — Core Build

### Architecture

| ID | Task | Status | Blocked By |
|----|------|--------|------------|
| A2 | Design database schema for all KBs | Not started | Gate 1 |
| A3 | Create mermaid diagram of pipeline flow | Not started | Gate 1 |
| A5 | Design observability confidence scoring system | Not started | Gate 1 |
| A6 | Define coaching tone mapping rules (outcome → tone) | Not started | Gate 1 |

### Knowledge Base — Wave 1 (Core Files)

| ID | Task | Status | Blocked By |
|----|------|--------|------------|
| K1 | Write Terrain KB — 10 core surface files | Not started | Gate 1, Gate 2 |
| K2 | Write Terrain Feature KB — 8 core feature files | Not started | Gate 1, Gate 2 |
| K3 | Write Bike Dynamics KB — 6 core concept files | Not started | Gate 1, Gate 2 |
| K5 | Review/QA pass on all new KB files | Not started | K1, K2, K3 |
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

## Completed

| ID | Task | Completed |
|----|------|-----------|
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
