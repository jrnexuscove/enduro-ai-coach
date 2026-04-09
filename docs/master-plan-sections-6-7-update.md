# Master Plan Update — Sections 6, 7, and Document Control

Replace the existing Section 6, Section 7, and Document Control in `docs/ridemind-phase3-master-plan-v1.md` with the content below.

---

## 6. Current Execution State

Gates 1 and 2 are both passed. Gate 3 (Pipeline v1 Implemented) is in progress — 9 of 11 stages built, 8 validated.

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

### In Progress: Pipeline Stage 9 (Coaching Decision Engine)

Stage 9 built, not yet tested. Selection and prioritisation stage — decides what to coach from Stage 8's causal chain. Outputs structured coaching decisions (domain, variable, goal, confidence) for Stage 10. One primary focus, max two secondary points, actionability filter, observability soft gate, safety pre-flagging. Excluded factors logged with reasons.

### Not Yet Started: Pipeline Stages 10–11

- **Stage 10 — Coaching Generation:** Produces rider-facing coaching text from Stage 9 decisions. Depends on coaching persona document and skill tag taxonomy (neither built yet).
- **Stage 11 — Coaching Safety Validation:** Cross-checks coaching output against failure diagnosis and crash type. Prevents contradictory or dangerous advice.

### Not Yet Started: Dynamics KB (Option A), Skill Tag Taxonomy

- Dynamics KB (extend Domain 02/03 with pipeline frontmatter) — work not started
- Skill tag taxonomy — design document not started; required before Stage 10 implementation

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
| E9 | Implement Stage 9: Coaching Decision Engine | P1 | **BUILT** — not yet tested |
| E10 | Implement Stage 10: Coaching Generation | P1 | Not started — blocked on coaching persona + skill tag taxonomy |
| E11 | Implement Stage 11: Coaching Safety Validation | P1 | Not started |
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
| T1 | Re-run all 8 Phase 2 clips through full pipeline | P1 | Blocked (needs E9–E11) |
| T2 | Score Phase 3 results against Phase 2 baselines | P1 | Blocked (needs T1) |
| T3 | Write Phase 3 evaluation report | P1 | Blocked (needs T2) |
| T4 | Expand test corpus to 20+ clips | P2 | Not started |
| T5 | Define Phase 3 scoring framework (finalised 12 metrics) | P0 | Not started |
| T6 | Create ground truth document for all 8 clips | P0 | Not started |

### Pre-requisites for Remaining Stages

| ID | Task | Priority | Status |
|----|------|----------|--------|
| P1 | Design skill tag taxonomy (mapping table in docs/) | P1 | Not started — required before Stage 10 |
| P2 | Write coaching persona document (Three Pillars framework) | P1 | Not started — required before Stage 10 |
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
