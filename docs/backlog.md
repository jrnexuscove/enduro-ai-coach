# RideMind — Backlog

**Last updated:** 2026-04-09 (Stages 1–11 pipeline fully implemented and validated)
**Current phase:** Phase 3 — Reasoning Pipeline + KB Build
**Master plan:** `docs/ridemind-phase3-master-plan-v1.md`

---

## Approval Gates

| Gate | Status | Blocks |
|------|--------|--------|
| Gate 1 — Pipeline stages approved | **PASSED** (2026-04-01) | — |
| Gate 2 — KB entry schemas approved | **PASSED** (2026-04-01) | — |
| Gate 3 — Pipeline v1 implemented | **PASSED (2026-04-09)** — All 11 stages implemented and validated. Stages 1–9 validated on three discriminator clips (Mark Crash, Colin Hill, Clutch Scream). Stages 10–11 implemented and three-clip validated. FAIL-path not yet live-tested on Stage 11. Full 8-clip retest pending. | Phase 3 retest |

---

## P0 — Must Do First

| ID | Category | Task | Status | Blocked By |
|----|----------|------|--------|------------|
| FKB-0 | KB | Update Feature KB schema in docs/kb-schemas-v1.md — add body section structure (severity_definition block, technique-by-severity sections, Pipeline ID + Observability Notes per section) | COMPLETE | — |
| FKB-2 | KB | Generate first 2 Feature KB entries (Jump + Off-camber) for schema validation | COMPLETE | — |
| FKB-3 | KB | Dual review (Claude + ChatGPT); batch remaining 6 Feature KB entries (entries 9–14) | COMPLETE | — |
| T5 | Testing | Define Phase 3 scoring framework (finalised 12 metrics) | Not started | — |
| T6 | Testing | Create ground truth document for all 8 Phase 2 clips | Not started | — |

---

## P1 — Core Build

### Architecture

| ID | Task | Status | Blocked By |
|----|------|--------|------------|
| COACH-1 | Define RideMind coaching persona and philosophy — Three Pillars framework (Balance, Body Position, Power Delivery & Collection) as foundational coaching model. Principles: fundamentals mastered on flat ground before terrain; pillars are interconnected; "deliver and collect" — speed of transition between max and min power is the skill. Shapes coaching tone, skill prioritisation, drill sequencing, progression logic, and Stage 10 framing. Voice rules embedded directly in Stage 10 prompt for v1. Standalone persona doc deferred until voice consistency tuning across full product. | **DEFERRED (post-MVP)** | — |
| SKILL-1 | Design skill tag taxonomy: map failure types to skill tags (e.g. balance_low_speed, momentum_control, line_commitment). Taxonomy lives in types.ts SkillTag enum for v1. Standalone reference doc may be useful later but not blocking. | **DEFERRED (post-MVP)** | — |
| A2 | Design database schema for all KBs | Not started | Gate 1 |
| A3 | Create mermaid diagram of pipeline flow | Not started | Gate 1 |
| A5 | Design observability confidence scoring system | Not started | Gate 1 |
| A6 | Define coaching tone mapping rules (outcome → tone) | Not started | Gate 1 |
| S11-CON | Add Stage 11 contract to docs/pipeline-contracts-v1.md — validator-only architecture, four checks, hard fail conditions, no coaching rewriting | Not started | — |

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
| E1 | Implement Stage 1: Camera Perspective Detection | **COMPLETE** — 8/8 validated | — |
| E2 | Implement Stage 2: Observability Assessment | **COMPLETE** | — |
| E3 | Implement Stage 3: Rider Intent / Attempt Detection | **COMPLETE** — event_detected field added (crash/stall/bail/near_miss/tip_over/mechanical), anti-refusal applied | — |
| E4 | Implement Stage 4: Terrain & Feature Detection | **COMPLETE** — consequence-based severity, jump geometry, switchback constraint, gradient calibration, anti-refusal applied | — |
| E10 | Build KB loader / query function | **COMPLETE** | — |

### Pipeline — Prompt Tuning

| ID | Task | Status | Blocked By |
|----|------|--------|------------|
| PROMPT-1 | Stage 4 severity calibration — consequence-based severity definitions added to prompt | **DONE** | — |
| PROMPT-2 | Stage 3 event/incident flag — event_detected field added (type, confidence, description) | **DONE** | — |
| PROMPT-3 | Anti-refusal instruction — applied across all 4 stage prompts | **DONE** | — |
| PROMPT-4 | Re-run 4 clips after prompt fixes — 3/4 pass; Nick crash partial (jump detected, event_detected inconsistent — low observability + model variance) | **DONE** | PROMPT-1, PROMPT-2, PROMPT-3 |
| PROMPT-5 | Failure hierarchy rule — added to Stage 6 SYSTEM_PROMPT as Rule 8: airborne failures classify as technique (not terrain/traction); priority ordering for momentum vs traction vs line_choice | **DONE** | E6 |
| PT-7 | Stage 7 crash_type run-to-run variance — otb vs ejection inconsistency on Mark Crash across pipeline runs; investigate prompt anchoring or confidence-weighted selection | Not started | E-WIRE7 ✓ |

### Pipeline / Engineering — Stages 5–11 (After Early Validation)

| ID | Task | Status | Blocked By |
|----|------|--------|------------|
| E5–7 | **Build Stages 5–7: Event Sequencing, Failure Type Classification, Crash Type Classification** | **COMPLETE** | PROMPT-1–4 ✓ |
| E-RELIA | Reliability hardening: 2-retry loop with escalating repair prompts; JSON extraction from mixed responses (direct → strip fences → brace extract); refusal detection; deterministic timestamps | **COMPLETE** | — |
| E5 | Implement Stage 5: Event Sequencing | **COMPLETE** — chronological phase segmentation, sequence-not-causality enforcement, airborne failure-point rule, audio markers per segment, critical_moment | — |
| E6 | Implement Stage 6: Failure Type Classification | **COMPLETE** — symptom vs root cause separation, failure hierarchy rule (Rule 8), airborne failure rule, contributing factors with primary/contributing/possible roles | — |
| E7 | Implement Stage 7: Crash Type Classification | **COMPLETE** — conditional crash-only activation, mechanism-based types (otb/lowside/highside/tip_over/stall_drop/slide/ejection), crash_type clamping | — |
| E-WIRE7 | Wire Stage 7 into run-test.ts; test on Mark Crash (crash_occurred true) and Colin Hill (crash_occurred false, Stage 7 skipped correctly) | **COMPLETE** | E7 ✓ |
| E8 | Implement Stage 8: Causal Chain Construction | **COMPLETE** | E-WIRE7 ✓ |
| E9 | Implement Stage 9: Decision Engine / Coaching Strategy Mapping | **COMPLETE** — one primary, max two secondary; observability soft gate, actionability filter, safety pre-flagging; Primary Cause Interpretation Rule (trace to earliest controllable mechanism); validated on three discriminator clips: Mark Crash (body_position primary, fore_aft_weight_distribution tag, 0.90 confidence), Colin Hill (speed_management primary — correct graceful degradation), Clutch Scream (no hallucination, observability_limited true) | E8 ✓ |
| E11 | Implement Stage 10: Coaching Generation (refactor existing) | **COMPLETE** — voice rules embedded in prompt; three-clip validated | — |
| E12 | Implement Stage 11: Coaching Safety Validation | **COMPLETE** — validator-only; hard fail on contradiction/speed_risk; three-clip validated | — |
| E13 | Wire full pipeline (Stages 1–11) into test runner CLI | **COMPLETE** — all stages wired in pipeline/run-test.ts | — |
| PERC-1 | Multi-model perception layer design — audio/dynamics sensing for clutch detection (gpt-4o-audio-preview or dedicated audio stage), Gemini integration for body position confidence, signal fusion into Stages 5/6; eliminates remaining perception gaps identified in three-clip discriminator test | Not started | Gate 3 ✓ |

### Testing & Evaluation

| ID | Task | Status | Blocked By |
|----|------|--------|------------|
| T1 | Re-run all 8 Phase 2 clips through new pipeline | **Stages 1–9 validated on Mark Crash and Colin Hill** — Full 8-clip retest after Stage 11 complete. | Gate 3 |
| T2 | Score Phase 3 results against Phase 2 baselines | Not started | T1 |
| T3 | Write Phase 3 evaluation report | Not started | T2 |
| S11-FIX | Create synthetic Stage 11 fail fixture — test speed_risk, contradiction, and observability_overreach fail paths; FAIL-path not yet proven in live testing | Not started | — |

---

## P2 — Important but Not Blocking

### Early Validation

| ID | Task | Status | Blocked By |
|----|------|--------|------------|
| V1 | Early validation: run stages 1–4 on Colin Hill | **COMPLETE** — Pass | E1–E4 |
| V2 | Early validation: run stages 1–4 on Mark Crash | **COMPLETE** — Pass (severity soft) | E1–E4 |
| V3 | Document validation gaps before building stages 5–11 | **COMPLETE** — 3 patterns documented in session handoff (2026-04-04) | V1, V2 |

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
| D16-1 | Schema 4 (Machine KB) added to `docs/kb-schemas-v1.md` (v1.3) — two-block frontmatter, 8-section body, file naming convention locked | COMPLETE | — |
| D16-2 | MACHINE-01 (GasGas EC300 TPI 2023) — committed at `knowledge-base/domain-16-machines/gasgas-ec300-tpi-2023--jake.md` (0655cc9) | COMPLETE | — |
| D16-3 | MACHINE-01 rewritten to Schema 4 — PDS corrected to linkage (6 locations), cause→effect discipline applied throughout | COMPLETE | — |
| D16-4 | MACHINE-02 (GasGas EC300 TBI 2024) — stock-only profile, `mod_layer: false`. Gate 3 test bike; all current test clips use TBI model. Committed (ca20c46) | COMPLETE | — |

> Domain 16 is a different KB type from terrain/features/dynamics — factual machine behaviour data only. Architecture locked: stock data only; rider mods on user profile layer. Schema 4 in `docs/kb-schemas-v1.md` (v1.3). **Note: MACHINE-01 (with modification layer) is MVP/test infrastructure — to be replaced when full Machine KB scaling begins.**

### Engineering — Reliability

| ID | Task | Status | Blocked By |
|----|------|--------|------------|
| E12 | Increase Gemini token budget for classification steps | Not started | — |
| E13 | Add retry logic for Gemini upload failures | Not started | — |
| E14 | Investigate GPT-4o visual refusal causes | **PARTIAL** — confirmed as known intermittent model behaviour; 2-retry loop with repair prompts added as mitigation. Root cause not fully investigated. | — |
| V4 | Resolve Colin Hill outcome variance: stall vs stuck vs crash classification inconsistency across pipeline runs | Not started | E-WIRE7 |
| V5 | Colin Hill re-validation after multi-model perception layer — body position detection and clutch/audio sensing expected to improve primary cause accuracy on ambiguous clips | Not started | PERC-1 |
| AUDIO-1 | Audio extraction implementation: extract engine RPM pattern, rider speech, impact sounds as structured input for pipeline stages 3–8 | Not started | — |
| S11-V2A | Wire Stage 7 severity into Stage 11 business rules — stricter severity_mismatch enforcement (v2; currently Stage 7 not passed into Stage 11) | Not started | — |
| S11-V2B | Stage 11 retry loop: feed failure reasons back to Stage 10, max 1 retry then hard fail (v2 correction path) | Not started | — |

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

### Engineering — Future Considerations

| ID | Task | Status | Notes |
|----|------|--------|-------|
| FC-1 | Investigate denser frame sampling for short/compact event clips | Not started | Evidence from Nick crash retest: jump visible but event_detected inconsistent — may be a frame coverage issue for compact single-event features. Test with 2× frame density before attributing to model variance alone. |

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
| FKB-3 | FEATURE-09 (roots) through FEATURE-14 (elevated beam) — 6 entries generated, ChatGPT-reviewed, committed | 2026-04-04 |
| E1–E4 | Pipeline v1 Stages 1–4 implemented and tested — all 8 Phase 2 clips run (5 pass, 2 partial, 1 fail; Stage 1 validated 8/8) | 2026-04-04 |
| PROMPT-1–4 | Pipeline prompt tuning — Stage 3 event_detected, Stage 4 severity/geometry, anti-refusal across all stages. Retest: 3/4 pass (2068821) | 2026-04-04 |
| E-WIRE7 | Stage 7 wired into runner — Mark Crash: crash_occurred true; Colin Hill: crash_occurred false, Stage 7 skipped correctly | 2026-04-09 |
| E8 | Stage 8: Causal Chain Construction — implemented and validated | 2026-04-09 |
| E9 | Stage 9: Decision Engine — three-clip discriminator test passed: Mark Crash (body_position primary, fore_aft_weight_distribution tag, 0.90 confidence), Colin Hill (speed_management primary — graceful degradation), Clutch Scream (no hallucination, observability_limited true) | 2026-04-09 |
| PCIR | Primary Cause Interpretation Rule — trace to earliest controllable rider mechanism rather than failure_type's obvious domain mapping; patched into Stage 9 SYSTEM_PROMPT | 2026-04-09 |
| E5 | Stage 5: Event Sequencing — chronological phase segmentation, sequence-not-causality enforcement, airborne failure-point rule | 2026-04-04 |
| E6 | Stage 6: Failure Type Classification — symptom vs root cause separation, failure hierarchy rule, airborne failure rule, contributing factor roles | 2026-04-04 |
| E7 | Stage 7: Crash Type Classification — conditional crash-only activation, mechanism-based classification (otb/lowside/highside/tip_over/stall_drop/slide/ejection) | 2026-04-04 |
| E-RELIA | Reliability hardening — 2-retry loop, JSON extraction waterfall, refusal detection (6ef6ada) | 2026-04-04 |
| PROMPT-5 | Failure hierarchy rule added to Stage 6 SYSTEM_PROMPT (Rule 8): airborne → technique; momentum/traction/line_choice priority ordering | 2026-04-04 |
| FKB-C | Feature KB compression pass — all 8 entries compressed (16% avg reduction, ea68258) | 2026-04-03 |
| FKB-S | Consistency spec: Section 16 (Compression Discipline) and check 11 (redundant content check) added (b894958) | 2026-04-03 |
| D16-1 | Schema 4 (Machine KB) added to `docs/kb-schemas-v1.md` (v1.3) — two-block frontmatter, 8-section body, file naming convention locked | 2026-04-03 |
| D16-2 | MACHINE-01 committed: `gasgas-ec300-tpi-2023--jake.md` (0655cc9) | 2026-04-03 |
| D16-3 | MACHINE-01 rewritten to Schema 4 — PDS corrected to linkage, cause→effect discipline applied | 2026-04-03 |
| D16-4 | MACHINE-02 committed: `gasgas-ec300-tbi-2024.md`, stock-only Gate 3 test bike profile (ca20c46) | 2026-04-03 |
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
| E11 | Stage 10: Coaching Generation — voice rules embedded in prompt, observability-gated confidence, drift check, business rule validation; three-clip validated | 2026-04-09 |
| E12 | Stage 11: Coaching Safety Validation — validator-only architecture, hard fail on contradiction/speed_risk, three-clip validated | 2026-04-09 |
| E13 | Wire full pipeline (Stages 1–11) into test runner CLI — all stages wired in pipeline/run-test.ts | 2026-04-09 |

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
