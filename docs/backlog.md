# RideMind — Backlog

**Last updated:** 2026-04-15 (UI-WIRE-1 complete; UI-TEST-1 partial 3/8 clips; Stage 9 fix committed; KB-WIRE-1 + S1-S4-PARALLEL added as next P0)
**Current phase:** Phase 3 — Reasoning Pipeline + KB Build
**Master plan:** `docs/ridemind-phase3-master-plan-v1.md`

---

## Approval Gates

| Gate | Status | Blocks |
|------|--------|--------|
| Gate 1 — Pipeline stages approved | **PASSED** (2026-04-01) | — |
| Gate 2 — KB entry schemas approved | **PASSED** (2026-04-01) | — |
| Gate 3 — Pipeline v1 implemented | **PASSED (2026-04-09)** — All 11 stages implemented and validated. S11-FIX validated (4/4 synthetic fixtures, 2/2 unit tests). T1 full 8-clip retest COMPLETE (2026-04-10) — S11 8/8 safe. | Phase 3 retest |

---

## P0 — Must Do First

| ID | Category | Task | Status | Blocked By |
|----|----------|------|--------|------------|
| FKB-0 | KB | Update Feature KB schema in docs/kb-schemas-v1.md — add body section structure (severity_definition block, technique-by-severity sections, Pipeline ID + Observability Notes per section) | COMPLETE | — |
| FKB-2 | KB | Generate first 2 Feature KB entries (Jump + Off-camber) for schema validation | COMPLETE | — |
| FKB-3 | KB | Dual review (Claude + ChatGPT); batch remaining 6 Feature KB entries (entries 9–14) | COMPLETE | — |
| T5 | Testing | Define Phase 3 scoring framework (finalised 12 metrics) | Not started | — |
| T6 | Testing | Create ground truth document for all 8 Phase 2 clips | Not started | — |
| S6-PATCH | Pipeline | Stage 6 prompt patch — four rules: (1) outcome gate, (2) evidence requirement, (3) crash override, (4) momentum demotion. | **COMMITTED (36b1274, 2026-04-10)** | — |
| S7-RECALL | Pipeline | Stage 7 crash recall fix — trigger broadened to include bail/stuck/tip_over outcomes and fallen/losing_balance segment states. | **COMMITTED (36b1274, 2026-04-10)** | S6-PATCH ✓ |
| S6-REG | Pipeline | Regression test S6 patch on Long Hill, Nick Crash, Colin Hill, Steep Hill Bail. | **COMPLETE (2026-04-10) — 1/4 pass** (after S6 Rules 9-12). Long Hill PASS (outcome gate held). Nick Crash FAIL (S3+S5 missed crash). Colin Hill FAIL (bail misread as stall → S6 momentum logically correct on bad input). Steep Hill Bail FAIL (line_choice plausible but expectation gap). Root finding: S6 Rules 9-12 working correctly — failures are S5 perception errors. | S6-PATCH ✓ |
| S5S6-REG2 | Pipeline | Regression after S5/S6 outcome semantics redesign (completed/stall/bail/crash/stuck/unknown; progress_assessment; control_assessment). | **COMPLETE (2026-04-10) — 1/4 pass.** Long Hill **PASS** (S5=completed, outcome gate held). Nick Crash **FAIL** (perception limit — models cannot see crash-after-jumps from still frames). Colin Hill **FAIL** (S3→S5 stall bias — dismount misread as stall, making S6 momentum correct on bad input). Steep Hill Bail **mixed** (crash correctly detected; S6 taxonomy gap — technique vs unknown across runs). **Conclusion: S5/S6 prompt iteration PAUSED — diminishing returns at prompt layer. Bottleneck is model perception, not reasoning logic.** | S6-REG ✓ |
| VISION-LAYER-1 | Pipeline | Vision Layer MVP spec — Stage 0 observability gating; Claude Sonnet as default perception model; route A (Claude only) vs route B (Gemini audio-check on uncertain outcomes); filming guidance requirement | **COMPLETE (2026-04-15)** — spec locked at `docs/vision-layer-spec-v1.md`; cross-reviewed (ChatGPT); Stage 0 trust envelope defined; `claude-sonnet-4-6` model ID locked (Sonnet 4 retires 2026-06-15) | PVE-GATE ✓ |
| UI-WIRE-1 | UI | Wire real pipeline into UI API route — set USE_MOCK = false, connect `runFullPipeline` + `formatResult` in `app/api/analyze/route.ts`; use `claude-sonnet-4-6` as perception model | **COMPLETE (2026-04-15)** — ClaudeProvider added; runFullPipeline wired Stages 0–11; 5 build fixes (Turbopack import resolution, serverExternalPackages, nodejs runtime, JPEG magic bytes, model ID). Key files: `pipeline/model-provider.ts`, `pipeline/runner.ts`, `app/api/analyze/route.ts`, `next.config.ts` | VISION-LAYER-1 ✓ |
| S9-FIX | Pipeline | Stage 9 normalizer + prompt fix — `isClean` three-condition AND gate; Rule 8 replaced to allow coaching on clean-with-instability clips | **COMPLETE (96b3846, 2026-04-15)** — normalizer bug fixed; Rule 8 replaced; user prompt context updated; tsc clean | UI-WIRE-1 ✓ |
| UI-TEST-1 | UI | Run all 8 known test clips through the UI and evaluate coaching output as a rider | **PARTIAL (3/8 clips, 2026-04-15)** — Mark Crash (coaching produced, 9.3 min), Long Hill (no coaching on clean clip — fixed by S9-FIX), Colin Hill (post-fix produces coaching). 5 clips remain. Scoring sheet v2 committed (`19f717e`). Known issues: latency 7–9 min, KB not connected, POV clean clips produce no coaching, Stage 0 may over-degrade on 3rd-person, Stage 3 ~1m30s. | UI-WIRE-1, S9-FIX |
| KB-WIRE-1 | Pipeline | Wire KB retrieval into Stage 10 placeholder — map Stage 4 terrain/feature output to KB entries; assemble compact context pack; inject into Stage 10 prompt; re-run 8 clips and measure coaching quality delta | Not started — **next P0 after UI-TEST-1 complete** | UI-TEST-1 |
| S1-S4-PARALLEL | Pipeline | Parallelise Stages 1–4 with Promise.all — no contract changes needed; each stage is independent given the same frame input; expected to cut 2–3 min from total latency | Not started | UI-TEST-1 |

---

## Perception Viability Experiment (P0) — COMPLETE

**Goal:** Determine whether any current model can reliably perceive riding events before investing further in pipeline prompt engineering.

| ID | Task | Status | Notes |
|----|------|--------|-------|
| PVE-1 | Build perception test script — standalone harness, 3 models, no pipeline, `perception_v1` prompt | **COMPLETE (2026-04-12)** | `scripts/perception-test.ts` |
| PVE-2 | Run full 8-clip × 3-model frame suite + 8-clip Gemini video track | **COMPLETE (2026-04-12)** | 32 runs total. Results in `results/perception-test/` |
| PVE-3 | Score all 32 runs against ground truth | **COMPLETE (2026-04-12)** | `results/perception-test/pve-scores-v1.md` |
| PVE-GATE | Decision gate: architecture call based on results | **COMPLETE (2026-04-12)** | Claude Sonnet primary. GPT-4o excluded. Gemini video = audio-check only. |

**Decision gate outcome:**
- Claude Sonnet = primary perception model for MVP (69.8%, safest ambiguity handling)
- GPT-4o excluded — 45.8%, confident hallucination is a pipeline-poisoning risk
- Gemini video NOT a replacement for frames — net delta −1 (wins some POV clips, loses on others); narrow role as audio-check on uncertain-outcome clips
- Footage type dominates: POV ~8.1/12, distant 3rd-person ~3.5/12 — structural constraint, not a model problem
- Colin Hill bail is structurally invisible (4/12 across three Gemini configs) — camera geometry problem; do not attempt to fix with prompting

---

## P1 — Core Build

### Architecture

| ID | Task | Status | Blocked By |
|----|------|--------|------------|
| COACHING-FW-V2 | Design coaching framework v2 — three-part structure (Situation → Breakdown → Correction); KB as deterministic retrieval not LLM re-derivation; target architecture: Perceive → KB lookup → Reason → Coach. Do NOT start until KB-WIRE-1 proves the hypothesis — if KB retrieval does not materially improve coaching quality, a framework redesign would be premature. | Not started | KB-WIRE-1 |
| STAGE0-TUNE | Stage 0 threshold tuning — Colin Hill 3rd-person gets `degrade` despite 0.97 camera confidence; investigate whether degrade threshold is too aggressive for usable 3rd-person clips | Not started | UI-TEST-1 |
| S3-LATENCY | Stage 3 latency investigation — ~1m30s for intent detection alone; investigate whether prompt complexity, frame count, or model choice can be reduced without quality loss | Not started | UI-TEST-1 |
| COACH-1 | Define RideMind coaching persona and philosophy — Three Pillars framework (Balance, Body Position, Power Delivery & Collection) as foundational coaching model. Principles: fundamentals mastered on flat ground before terrain; pillars are interconnected; "deliver and collect" — speed of transition between max and min power is the skill. Shapes coaching tone, skill prioritisation, drill sequencing, progression logic, and Stage 10 framing. Voice rules embedded directly in Stage 10 prompt for v1. Standalone persona doc deferred until voice consistency tuning across full product. | **DEFERRED (post-MVP)** | — |
| SKILL-1 | Design skill tag taxonomy: map failure types to skill tags (e.g. balance_low_speed, momentum_control, line_commitment). Taxonomy lives in types.ts SkillTag enum for v1. Standalone reference doc may be useful later but not blocking. | **DEFERRED (post-MVP)** | — |
| A2 | Design database schema for all KBs | Not started | Gate 1 |
| A3 | Create mermaid diagram of pipeline flow | Not started | Gate 1 |
| A5 | Design observability confidence scoring system | Not started | Gate 1 |
| A6 | Define coaching tone mapping rules (outcome → tone) | Not started | Gate 1 |
| S11-CON | Add Stage 11 contract to docs/pipeline-contracts-v1.md — validator-only architecture, four checks, hard fail conditions, no coaching rewriting | **COMPLETE (2026-04-10)** — contract fully replaced; Appendices A/B/C updated; Gates 2+3 marked PASSED | — |

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

### Pipeline — Rider Context Threading

### RIDER-NOTE-1 — Wire riderNote into Stage 3 and Stage 10

**Status:** Not started
**Priority:** P1 (post UI-TEST-1)
**Blocked by:** UI-TEST-1 completion

**Goal:** Thread the user's rider note from the upload form into the pipeline stages that benefit from rider context.

**Scope:**
- Stage 3 (rider intent): inject riderNote into the user prompt so intent detection accounts for what the rider says they were attempting
- Stage 10 (coaching generation): inject riderNote so coaching tone and framing reflect rider self-reported confidence and context
- runner.ts: pass riderNote through to both stages

**Not in scope:**
- Changing the upload form or API route (riderNote is already captured and passed to runFullPipeline)
- Other stages (S1, S2, S4–S9, S11 do not need rider note)

**Acceptance criteria:**
- Stage 3 output reflects rider-stated intent when provided
- Stage 10 coaching adapts to rider-stated confidence/context when provided
- Pipeline still works correctly when riderNote is empty/undefined
- Re-run at least 2 clips with and without riderNote to measure delta

### Testing & Evaluation

| ID | Task | Status | Blocked By |
|----|------|--------|------------|
| T1 | Re-run all 8 Phase 2 clips through new pipeline | **COMPLETE (2026-04-10)** — 32.9 min. S11 8/8 safe. Findings: S6 defaults to momentum 5/8 clips (false positive Long Hill, false negative Nick Crash); S7 trigger too narrow (missed crash on Jimbo+Nick); Steep Hill Bail = reference clip (full correct chain). | Gate 3 |
| T2 | Score Phase 3 results against Phase 2 baselines | Not started | T1 |
| T3 | Write Phase 3 evaluation report | Not started | T2 |
| S11-FIX | Create synthetic Stage 11 fail fixture — test speed_risk, contradiction, and observability_overreach fail paths | **COMPLETE (2026-04-10)** — 4/4 synthetic fixtures pass; 2/2 unit tests pass; S11 locked | — |

---

## P2 — Important but Not Blocking

### UI / Product (near-term)

| ID | Task | Status | Blocked By |
|----|------|--------|------------|
| UPLOAD-GUIDE-1 | Add filming guidance to upload screen — "POV or close-range footage gives best results"; backed by PVE data (POV avg 8.1/12 vs distant 3rd-person 3.5/12 across all models) | Not started | UI-WIRE-1 |
| UI-MOBILE | Fix mobile access — determine correct WiFi IP, check Windows Firewall for port 3000 | Not started | — |
| UI-CONF | Replace confidence % with plain English (high/moderate/limited) per ui-standards.md | Not started | UI-TEST-1 |
| UI-ERROR | Error and fallback UX — intelligent failure messages when analysis fails or confidence is low | Not started | UI-WIRE-1 |
| UI-DEBUG | Internal debug mode — developer toggle to inspect stage outputs without exposing to users | Not started | UI-WIRE-1 |
| UI-FEEDBACK | Feedback capture — clip id, result shown, processing time, user rating, correction input | Not started | UI-TEST-1 |
| DOC-PRINCIPLES | Product principles doc — trust, clarity, safety, uncertainty, scope | Not started | — |
| DOC-MVP | v1 acceptance criteria — what counts as done for MVP | Not started | — |
| DOC-ERROR | Error philosophy doc — how system behaves when unsure or failing | Not started | — |
| DOC-INSTRUMENT | Instrumentation plan — usage and quality signals to capture | Not started | — |

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
| GEMINI-AUDIO-1 | Gemini audio-check track design — when and how to trigger secondary Gemini video call for uncertain outcome classification; define trigger conditions and output contract | Not started | VISION-LAYER-1 |
| SDK-MIGRATE-1 | Google SDK migration from `@google/generative-ai` to `@google/genai` (flagged in landscape review 2026-04-12) | Not started | — |
| GPT54-EVAL | GPT-5.4 evaluation for reasoning stages S5–S9 — landscape review flagged improved structured output; test on 3 clips before committing | Not started | — |
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

### Visual / Future Product (post coaching quality proven)

| ID | Task | Status | Notes |
|----|------|--------|-------|
| UI-VIS-1 | Visual coaching result screen — video playback with timestamp markers at failure/technique moments | Not started | Core product experience; gated on coaching quality |
| UI-VIS-2 | Visual body position guidance — correct vs incorrect position diagrams/animations | Not started | Post UI-VIS-1 |
| UI-PROFILE-1 | Rider/bike profile system — onboarding flow: height, weight, discipline, bike details, mods | Not started | Connects to Machine KB |
| UI-DISC | Riding discipline selection — enduro, trials, motocross, adventure | Not started | Part of UI-PROFILE-1 |
| UI-BIKE | Bike profile input (brand, model, year, mods) — connects to Machine KB | Not started | Part of UI-PROFILE-1 |
| UI-AVATAR | Rider avatar generation from uploaded photo | Not started | Part of onboarding |
| UI-DASH | Post-coaching dashboard — training tips, gym exercises, relevant YouTube technique videos | Not started | Post coaching quality proven |
| UI-ONBOARD | Onboarding animation/welcome flow | Not started | Post-MVP |
| UI-VOICE | Coaching content style guide — voice, length, structure, consistency across clips | Not started | Before scale |

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
| FC-2 | Long-term architecture exploration: deterministic CV layer (YOLO / motion tracking / pose estimation) for factual perception + LLM for reasoning and coaching | Not started | Motivated by S5/S6 regression findings — LLM vision is non-deterministic on ambiguous clips. CV gives deterministic bounding boxes, speed estimation, and rider pose; LLM reasons over that structured input. Likely required for production reliability. |
| FC-3 | Video-native model evaluation: test models with native video input (vs. extracted frames) for event detection and timing accuracy | Not started | Current approach: 16 still frames → narrative. Video-native models may perceive motion, timing, and body dynamics more reliably. Evaluate when available. |
| FC-4 | Sensor data as future input: IMU/GPS data from ride computers (RideLinc, TwoNav etc.) as structured factual input to supplement or replace LLM perception | Not started | IMU gives ground truth speed, lean angle, and g-force at crash moment. Would eliminate perception uncertainty for kinematic events. Long-term roadmap item. |

### Long-term Architecture Exploration

| ID | Task | Status | Notes |
|----|------|--------|-------|
| LTA-1 | Deterministic CV layer (YOLO / motion tracking / pose estimation) for factual perception + LLM for reasoning and coaching | Not started | Motivated by S5/S6 regression — LLM vision is non-deterministic on ambiguous clips. See also FC-2. |
| LTA-2 | Video-native model evaluation — test models with native video input vs. extracted frames for event detection and timing | Not started | Current approach (16 still frames → narrative) may be a structural ceiling. See also FC-3. |
| LTA-3 | Sensor data as future perception input — IMU/GPS data (RideLinc, TwoNav) as structured factual input to supplement or replace LLM perception | Not started | IMU gives ground truth speed, lean angle, g-force at crash moment. Long-term roadmap. See also FC-4. |

### Technology Landscape

| ID | Task | Status | Notes |
|----|------|--------|-------|
| LANDSCAPE-REV | Monthly technology landscape review — scan models, CV tools, and video AI against RideMind requirements | **RECURRING** — next due 2026-05-12 | First review at `docs/landscape-review.md` (2026-04-12) |
| TWLABS-BENCH | TwelveLabs Pegasus 1.2 benchmark — run 3 PVE clips through video-native pipeline; compare event detection vs frame-based approach | Not started | Low priority; gated on production stability |
| YOLO26-POC | YOLO26 pose estimation PoC — validate body position detection on 1–2 clips; inform long-term CV layer architecture | Not started | Low priority; see FC-2/LTA-1 |

---

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
| UI-WIRE-1 | Wire real pipeline into UI API route — ClaudeProvider, runFullPipeline Stages 0–11, USE_MOCK false, 5 build fixes | 2026-04-15 |
| S9-FIX | Stage 9 normalizer isClean three-condition gate + Rule 8 replaced (clean-with-instability now coachable) | 2026-04-15 |
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
| S11-FIX | Synthetic Stage 11 fail fixture — 4/4 fixtures pass (speed_risk, contradiction, observability_overreach); 2/2 unit tests pass; FAIL-path validated; S11 locked | 2026-04-10 |
| S11-CON | Stage 11 contract added to docs/pipeline-contracts-v1.md — validator-only architecture, four checks, hard fail conditions; Appendices A/B/C updated; Gates 2+3 marked PASSED | 2026-04-10 |
| T1 | Full 8-clip retest through complete pipeline (Stages 1–11) — 32.9 min; S11 8/8 safe; findings: S6 momentum default 5/8, S7 trigger too narrow; Steep Hill Bail = reference clip | 2026-04-10 |
| S6-PATCH | S6 Rules 9-12 committed (36b1274) — outcome gate, evidence requirement, crash override, momentum demotion | 2026-04-10 |
| S7-RECALL | S7 trigger broadened (36b1274) — bail/stuck/tip_over outcomes and fallen/losing_balance states added | 2026-04-10 |
| S3-ANTI | S3 anti-refusal block committed (36b1274) — crash/incident legitimacy framing added | 2026-04-10 |
| UI-M1 | UI v1 Milestone 1 (mock data) — page.tsx state machine, API route, 4 components, lib/types.ts, lib/format-result.ts, docs/ui-standards.md; running at localhost:3000 | 2026-04-10 |
| VISION-LAYER-1 | Vision Layer MVP spec locked — Stage 0 observability gate, trust envelope, route A/B, filming guidance, `claude-sonnet-4-6` model lock. Spec at `docs/vision-layer-spec-v1.md` | 2026-04-15 |

---

## Unit Economics & Cost Tracking

- OpenAI API cost for Phase 3 testing (Mar 26–Apr 10): $19.56 / 494 requests / 7.17M input tokens
- Estimated cost per full clip analysis: ~$0.40–0.50 (11 stages, mix of vision + text calls)
- Multi-model architecture should reduce cost further — expensive vision models only for perception stages (S1–S4), cheap text models for reasoning stages (S5–S11)
- Key cost levers: frame sampling rate, frame resolution, model selection per stage, KB retrieval payload size, retry logic
- Unit economics modelling needed before pricing model is committed — track cost per analysis as pipeline evolves
- OpenAI billing is periodic threshold-based, not per-request — bank charges appear in batches

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
