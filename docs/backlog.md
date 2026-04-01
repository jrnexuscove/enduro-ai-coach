# RideMind — Backlog

**Last updated:** 2026-04-01
**Current phase:** Phase 3 — Reasoning Pipeline + KB Build
**Master plan:** `docs/ridemind-phase3-master-plan-v1.md`

---

## Approval Gates

| Gate | Status | Blocks |
|------|--------|--------|
| Gate 1 — Pipeline stages approved | **NOT PASSED** | All KB generation, all engineering |
| Gate 2 — KB entry schemas approved | **NOT PASSED** | Batch KB generation |
| Gate 3 — Pipeline v1 implemented | **NOT PASSED** | Phase 3 retest |

---

## P0 — Must Do First

| ID | Category | Task | Status | Blocked By |
|----|----------|------|--------|------------|
| A1 | Architecture | Define pipeline stage JSON contracts | Not started | — |
| K4 | Knowledge Base | Define KB file schema (metadata, tags, cross-refs) for all 3 new KBs | Not started | — |
| K12 | Knowledge Base | Cross-check Colin Hill Phase 2 scores from local saved data | Not started | — |
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

### Pipeline / Engineering

| ID | Task | Status | Blocked By |
|----|------|--------|------------|
| E1 | Implement Stage 1: Camera Perspective Detection | Not started | Gate 1 |
| E2 | Implement Stage 2: Observability Assessment | Not started | Gate 1 |
| E3 | Implement Stage 3: Terrain & Feature Detection | Not started | Gate 1, K1, K2 |
| E4 | Implement Stage 4: Event Sequencing | Not started | Gate 1 |
| E5 | Implement Stage 5: Failure Type Classification | Not started | Gate 1 |
| E6 | Implement Stage 6: Crash Type Classification | Not started | Gate 1 |
| E7 | Implement Stage 7: Causal Chain Construction | Not started | Gate 1 |
| E8 | Implement Stage 8: Coaching Generation (refactor existing) | Not started | Gate 1 |
| E9 | Implement Stage 9: Coaching Safety Validation | Not started | Gate 1 |
| E10 | Build KB loader / query function | Not started | Gate 1 |
| E11 | Wire pipeline into existing test runner CLI | Not started | E1–E10 |

### Testing & Evaluation

| ID | Task | Status | Blocked By |
|----|------|--------|------------|
| T1 | Re-run all 8 Phase 2 clips through new pipeline | Not started | Gate 3 |
| T2 | Score Phase 3 results against Phase 2 baselines | Not started | T1 |
| T3 | Write Phase 3 evaluation report | Not started | T2 |

---

## P2 — Important but Not Blocking

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
| — | Phase 2 multi-model testing (24/24 runs) | 2026-03-31 |
| — | Phase 2 scoring (8/8 clips, 3 models) | 2026-04-01 |
| — | Phase 2 evaluation report | 2026-04-01 |
| — | Phase 3 master plan | 2026-04-01 |
| — | Knowledge base domains 1–15 (154+ technique files) | Previously |
