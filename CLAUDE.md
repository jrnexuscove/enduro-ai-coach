# CLAUDE.md — RideMind Project Context

**Last updated:** 2026-04-15 (VISION-LAYER-1 complete; Stage 0 gate + trust envelope implemented; claude-sonnet-4-6 locked as perception model; UI-WIRE-1 next)

## What is RideMind?

RideMind (ridemind.ai) is an AI-powered off-road motorcycle coaching platform. It analyses ride footage and provides structured, actionable coaching feedback. Built by Jake under Nexus Cove.

RideMind is a **physics-aware, terrain-aware, machine-aware riding intelligence system** — not a generic video analysis tool.

## Current Phase: Phase 3 — Reasoning Pipeline + KB Build

### Where We Are

- Phase 2 multi-model testing is **complete** (8 clips × 3 models, fully scored)
- Phase 2 evaluation report is **complete**
- Colin Hill Phase 2 cross-check is **DONE** — all 8 clips scored and verified against raw model outputs
- Phase 3 master plan is **complete** and saved at `docs/ridemind-phase3-master-plan-v1.md`
- **Gate 1 PASSED (2026-04-01)** — 11-stage pipeline approved with reconciliations. Contracts at `docs/pipeline-contracts-v1.md`
- **Gate 2 PASSED (2026-04-01)** — KB schemas approved with cleanup corrections. Schemas at `docs/kb-schemas-v1.md`
- **Terrain KB (Domain 17) — COMPLETE** — 10 entries generated and committed (TERRAIN-01 mud through TERRAIN-10 mixed). Dual-reviewed on rock, grass, clay, and mixed entries. All entries status: draft (not yet validated against pipeline runs).
- **Dynamics KB structure — LOCKED (Option A):** Extend existing Domain 02/03 entries with pipeline frontmatter. No separate domain folder.
- **Feature KB entry list — LOCKED** — 14 entries, organised by geometry (not discipline). Discipline extremes handled by severity tiers within entries.
- **Feature KB — COMPLETE** — All 14 entries committed: FEATURE-01 (jump) through FEATURE-14 (elevated beam). FEATURE-01–08 compression-passed (16% avg reduction, ea68258); FEATURE-09–14 generated at correct density (183–194 lines each). All 14 entries in `knowledge-base/features/`.
- **Feature KB compression pass — COMPLETE** — All 8 original entries compressed (16% avg reduction). Consistency spec updated: Section 16 (Compression Discipline) and check 11 (redundant content check) added (b894958). Compression discipline applies to future entries only — no re-compression of already-compressed entries.
- **MACHINE-01 — COMPLETE** — GasGas EC300 TPI 2023 at `knowledge-base/domain-16-machines/gasgas-ec300-tpi-2023--jake.md`. Fully rewritten to Schema 4 (v1.3), PDS corrected to linkage throughout, committed (0655cc9).
- **MACHINE-02 — COMPLETE** — GasGas EC300 TBI 2024 stock profile at `knowledge-base/domain-16-machines/gasgas-ec300-tbi-2024.md`. Stock-only (`mod_layer: false`), written to Schema 4. This is the Gate 3 test bike — all current test clips use the TBI model. Committed (ca20c46).
- **Pipeline v1 — Stages 1–11 FULLY IMPLEMENTED AND VALIDATED (2026-04-09)** — All 11 stages built and tested. Stages 1–4 run on all 8 Phase 2 clips (initial run: 5 pass, 2 partial, 1 fail; Stage 1 validated 8/8). Stages 5–9 validated across three discriminator clips: Mark Crash (body_position primary, fore_aft_weight_distribution tag, 0.90 confidence — correct), Colin Hill (speed_management primary — correct graceful degradation under weak body position perception), Clutch Scream (did not hallucinate clutch_control; observability_limited: true — correct). Key finding: architecture reasons correctly from upstream evidence. Remaining quality gaps are perception problems (body position detection, clutch/audio sensing), not reasoning problems. Pipeline code at `pipeline/`. Key implementation details per stage:
  - **Stage 3:** `event_detected` field (crash/stall/bail/near_miss/tip_over/mechanical + confidence + description); fallback shape and type clamping; anti-refusal applied.
  - **Stage 4:** Consequence-based severity definitions; jump geometry rules; switchback constraint (switchback→gradient.camber not features_detected); gradient calibration; anti-refusal applied.
  - **Stage 5:** Chronological phase segmentation; sequence-not-causality enforcement (event timeline, not causal chain); airborne failure-point rule; audio markers per segment; critical_moment identification. **Outcome values redesigned:** `completed | stall | bail | crash | stuck | unknown` (removed `clean` and `partial_completion`). `progress_assessment` added: `section_completion` field (full/substantial/partial/minimal/unknown) as a separate dimension from outcome result.
  - **Stage 6:** Symptom vs root cause separation enforced; failure hierarchy rule (bike dynamics > technique > momentum > traction); airborne failure rule (technique over terrain when failure is mid-air); contributing factors with primary/contributing/possible roles. **`control_assessment` added:** state (`in_control` / `recovering_control` / `out_of_control`), confidence, evidence[], `completion_safety_flag` — captures rider control state independent of failure classification. Added to `requireKeys` with defensive fallback in normalizer.
  - **Stage 7:** Conditional crash-only activation; mechanism-based crash types (otb/lowside/highside/tip_over/stall_drop/slide/ejection); crash_type clamped to allowed values; not_applicable_reason enforced for non-crash clips. Known variance: otb vs ejection on Mark Crash across runs (PT-7).
  - **Stage 8:** Causal chain construction from Stage 6 failure classification and Stage 5 event sequence.
  - **Stage 9:** Selection/prioritisation — one primary coaching focus, max two secondary points; observability soft gate, actionability filter, safety pre-flagging; excluded factors logged with reasons; domain-contradiction sanity check (warning only for MVP). Primary Cause Interpretation Rule: traces to earliest controllable rider mechanism in the causal chain (e.g. body_position for momentum failure caused by poor posture), not the failure_type's obvious domain mapping.
  - **Reliability hardening:** 2-retry loop with escalating repair prompts; JSON extraction from mixed responses (direct parse → strip fences → brace extraction); refusal detection; deterministic timestamps. GPT-4o intermittent refusal is a known model behaviour issue — handled by retry logic. Anti-refusal instruction applied across all stages.
  - **Stage 10:** Coaching generation — `rider_facing_summary` (direct, actionable) + `technical_coach_note` (mechanism explanation); observability-gated confidence; drift check against Stage 9 primary category; business rule validation. Voice rules embedded in prompt (not standalone COACH-1 doc for v1). Three-clip validated.
  - **Stage 11:** Validator-only — checks coaching output against failure diagnosis, crash type, and causal chain. Does not rewrite or regenerate. Hard fail conditions: `contradiction` or `speed_risk` force `safe: false`; `severity_mismatch` forces `safe: false` when Stage 7 severity is `serious`. Business rules: flags require supporting issues; `confidence_adjustment` without flags is invalid. FAIL-path validated via S11-FIX synthetic fixtures (4/4 pass). S11 locked — no changes unless new failure modes emerge.
  - **Future priority:** Multi-model perception layer — audio/dynamics sensing for clutch detection, Gemini integration for body position confidence, signal fusion into Stages 5/6. Colin Hill re-validation after this is available.
- **T1 — Full 8-clip retest COMPLETE (2026-04-10).** All 8 Phase 2 clips run through complete pipeline (32.9 min). S11 8/8 safe. Per-clip results: Colin Hill (S6=momentum/wrong, S7=skipped, safe), Clutch Scream (S6=momentum/wrong, S7=yes/minor, safe+overreach), Fall Bulgario (S6=momentum/partial, S7=missed fall, safe), Jimbo Crash (S6=line_choice/correct, S7=missed crash, safe), Long Hill (S6=momentum/false positive, S7=skipped, safe), Nick Crash (S6=none/false negative, S7=skipped, safe+overreach), Steep Hill Bail (S6=technique/correct, S7=yes/minor, safe — reference clip), Mark Crash (S6=technique/correct, S7=yes/moderate, safe). Primary finding: S6 defaults to momentum on 5/8 clips — root cause logic not triggering correctly. S7 trigger too narrow — missed crashes on Jimbo Crash and Nick Crash.
- **S6/S7 fixes COMMITTED (36b1274, 2026-04-10):** S6 Rules 9-12 added (outcome gate, evidence requirement, crash override, momentum demotion). S3 anti-refusal block added (crash/incident legitimacy framing). S7 trigger broadened to include bail/stuck/tip_over outcomes and fallen/losing_balance segment states. Regression test results (after S5/S6 outcome redesign, c075e85): Long Hill **PASS** (S5=completed, outcome gate held); Nick Crash **FAIL** (perception limit — models cannot reliably detect crash after jumps from still frames); Colin Hill **FAIL** (S3→S5 stall bias — dismount misread as stall, making S6 momentum logically correct on bad upstream input); Steep Hill Bail **mixed** (crash correctly detected, but S6 taxonomy gap — technique vs unknown depending on run). **S5/S6 prompt iteration paused — diminishing returns reached at the prompt layer.**
- **S5/S6 consistency fixes COMMITTED (c075e85, 2026-04-10):** Stale `clean` and `partial_completion` references removed from stage8-causal-chain.ts and pipeline-contracts-v1.md. `control_assessment` added to S6 `requireKeys` with defensive fallback. S11 fixture objects updated to include `control_assessment`. Typo `s6PassDesc` → `passDesc` in regression script. `tsc --noEmit` clean — 0 errors.
- **Architectural insight (2026-04-10):** The pipeline reasoning layer (S1–S11) is solid — causal chain construction, coaching generation, and safety validation transfer correctly to any perception input. The bottleneck is perception reliability, not reasoning logic. LLM vision from 16 still frames is inherently non-deterministic on ambiguous clips. Long-term architecture likely needs a deterministic CV layer (YOLO / motion tracking) for factual perception + LLM for reasoning and coaching. The next investment is measuring the current model perception ceiling before committing further to prompt engineering.
- **UI v1 Milestone 1 COMPLETE (4855734, 2026-04-10)** — Single-page state machine (idle→ready→processing→result→error) running at localhost:3000 with mock data. Files: `app/page.tsx`, `app/api/analyze/route.ts` (USE_MOCK flag), `components/upload-dropzone.tsx`, `components/processing-state.tsx`, `components/result-summary.tsx`, `components/coaching-card.tsx`, `lib/types.ts`, `lib/format-result.ts`, `docs/ui-standards.md`. Current UI is a **test harness** — sufficient for pipeline dev and coaching quality validation. The real product requires video replay, failure markers, and visual body position guidance.
- **Option B confirmed:** UI first, KB retrieval after. Build the product loop before wiring KB into Stage 10. KB retrieval becomes a quality upgrade behind a working interface.
- **Mobile-first, desktop-compatible:** Riders primarily use RideMind on phone after rides. Design for 375px first. Documented in `docs/ui-standards.md`.
- **Three-layer separation:** pipeline output (raw/internal) → `lib/format-result.ts` (formatter) → UI components (presentation only). Pipeline changes must not break UI.
- **Perception Viability Experiment — COMPLETE (2026-04-12).** 32-run experiment across 8 clips: 24 frame-based runs (8 clips × 3 models) + 8 Gemini video runs. Decision gate passed. Final scores: Claude Sonnet 69.8% (67/96) | Gemini 2.5 Flash frames 66.7% (64/96) | Gemini video 65.6% (63/96) | GPT-4o 45.8% (44/96). Script at `scripts/perception-test.ts`. Results at `results/perception-test/`. Scores at `results/perception-test/pve-scores-v1.md`.
- **Perception architecture — LOCKED:** Claude Sonnet is the primary perception model for MVP. Safest ambiguity handling, least likely to inject false facts into the reasoning pipeline. GPT-4o excluded from primary perception path — confident hallucination on ambiguous clips is a pipeline-poisoning risk. Gemini video is NOT a replacement for frames (net delta −1 across 8 clips); has a narrow role as optional audio-check on clips where outcome classification is uncertain.
- **Footage type insight:** POV clips average ~8.1/12, distant 3rd-person ~3.5/12 across all models and configurations. This is a structural constraint, not a model problem. Camera geometry dominates model choice. Colin Hill bail is structurally invisible — 4/12 across three different Gemini configurations (frames pre-fix, frames post-fix, video). Stop trying to fix Colin Hill with prompting; it is a camera geometry problem.
- **Gemini thinkingBudget:** Gemini 2.5 Flash thinking should be disabled for structured observation tasks. `thinkingBudget: 0` is the correct setting — thinking tokens consume output budget without improving structured output.
- **Monthly landscape review — ESTABLISHED.** First review complete 2026-04-12 at `docs/landscape-review.md`. Scanned: GPT-5.4, Gemini 2.5/3.1, TwelveLabs Pegasus 1.2, YOLO26, Qwen3-VL. Next review due 2026-05-12.
- **User filming guidance is a product requirement.** "POV or close-range preferred" belongs on the upload screen, backed by empirical PVE data (POV avg 8.1/12 vs distant 3rd-person 3.5/12 across all models).
- **VISION-LAYER-1 — COMPLETE (2026-04-15).** Vision Layer MVP spec written, cross-reviewed (ChatGPT, 7 fixes + 2 nits applied), locked. Stage 0 added as explicit pipeline stage with trust envelope enforcement — hard-gates unusable clips before burning tokens on 11 reasoning stages. Observability map and downstream confidence ceilings defined. Route A (Claude only) vs Route B (Gemini audio-check on uncertain outcomes) specified. Filming guidance requirement formalised. Spec at `docs/vision-layer-spec-v1.md`.
- **Perception model — LOCKED to `claude-sonnet-4-6`.** Sonnet 4 is deprecated and retires 2026-06-15. All new pipeline code must use `claude-sonnet-4-6` model ID explicitly.
- **Next action:** UI-WIRE-1 — wire real pipeline into UI API route (`app/api/analyze/route.ts`); set `USE_MOCK = false`; connect `runFullPipeline` + `formatResult`; use `claude-sonnet-4-6` as perception model.
- **Domain 16 architecture — LOCKED:** Stock bike data only. Rider modifications belong on the user profile layer. For MVP, both in one file with clear separation. **Schema 4 added to `docs/kb-schemas-v1.md` (v1.3, 2026-04-03).** File naming locked: stock = `[mfr]-[model]-[year].md`, rider-layer = `[mfr]-[model]-[year]--[rider].md`. Machine KB entries are factual reference only — no coaching, no pipeline logic, no rider psychology, no improvement language.

### Perception Viability Experiment — COMPLETE (2026-04-12)

- **Status:** COMPLETE — decision gate passed
- **Spec:** `docs/perception-test-spec-v1.md`
- **Ground truth:** `results/perception-test/ground-truth/` — 8 files covering all Phase 2 clips
- **Script:** `scripts/perception-test.ts` — standalone harness, isolated from pipeline
- **Scope executed:** 8 clips × 3 models (frame-based) + 8 clips × Gemini video track = 32 runs total
- **Prompt version:** `perception_v1` — structured headings, no pipeline/KB/coaching, anti-hallucination instruction, explicit "Unclear or not visible" section
- **Scoring:** 6 criteria — rider objective, outcome, event sequence, terrain/features, visibility handling, hallucination — each 0/1/2 with evidence note

**Final results (four-track comparison):**

| Clip | Camera | GPT-4o | Gemini frames | Claude | Gemini video | Video delta |
|------|--------|--------|---------------|--------|--------------|-------------|
| Colin Hill | 3rd-person, mid | 2 | 4 | 7 | 4 | = |
| Nick Crash | 3rd-person, distant | 2 | 4 | 4 | 7 | +3 |
| Steep Hill Bail | POV | 10 | 11 | 11 | 7 | −4 |
| Clutch Scream Hill | POV | 5 | 10 | 10 | 8 | −2 |
| Jimbo Crash | POV | 5 | 8 | 7 | 8 | = |
| Mark Crash | 3rd-person, close | 9 | 9 | 11 | 8 | −1 |
| Fall Bulgario | POV | 4 | 8 | 9 | 10 | +2 |
| Long Hill | POV | 7 | 10 | 8 | 11 | +1 |
| **Total** | | **44/96 (45.8%)** | **64/96 (66.7%)** | **67/96 (69.8%)** | **63/96 (65.6%)** | **−1** |

**Decision gate outcome:** Claude Sonnet primary perception model. Gemini video not a replacement for frames. GPT-4o excluded from primary path. Details captured in "Where We Are" bullets above.

### Key Phase 2 Findings

1. No single model is production-ready. Gemini strongest on observation (~65%) but 63% reliability. GPT-4o mid-tier (~42%) with visual refusals. Claude weakest quality (~34%) but 100% reliability.
2. Architecture matters more than model choice — 10 systematic failures exist above the model layer.
3. Critical gaps: no terrain feature detection, no crash type classification, no failure causation reasoning, no event sequencing, fabricated certainty under low observability.

### What We're Building

An 11-stage reasoning pipeline (contracts at `docs/pipeline-contracts-v1.md`):
1. Camera Perspective Detection
2. Observability Assessment
3. Rider Intent / Attempt Detection
4. Terrain & Feature Detection
5. Event Sequencing
6. Failure Type Classification
7. Crash Type Classification
8. Causal Chain Construction
9. Decision Engine / Coaching Strategy Mapping
10. Coaching Generation
11. Coaching Safety Validation

Plus three new knowledge bases:
- Terrain KB (surfaces, gradients, conditions)
- Terrain Feature KB — 14 entries locked, geometry-first: jump/launch, drop, steps/ledges, horizontal obstacles, roots crossings, rock garden, rut, berm/banked turn, off-camber/side slope, switchback, water crossing, gully/ditch/washout, whoops/rhythm sections, elevated beam/plank
- Bike Dynamics KB — **Option A locked:** extend existing Domain 02/03 entries with pipeline frontmatter (26 files upgraded), not a separate domain folder

### Approval Gates

| Gate | Status | Blocks |
|------|--------|--------|
| Gate 1 — Pipeline stages approved | **PASSED** (2026-04-01) | — |
| Gate 2 — KB entry schemas approved | **PASSED** (2026-04-01) | — |
| Gate 3 — Pipeline v1 implemented | **PASSED (2026-04-09)** — All 11 stages implemented and validated. S11-FIX validated (4/4 synthetic fixtures, 2/2 unit tests). S11-CON contract updated (2026-04-10). T1 full 8-clip retest COMPLETE (2026-04-10) — S11 8/8 safe. Primary findings: S6 defaults to momentum on 5/8 clips (false positive on Long Hill, false negative on Nick Crash); S7 trigger too narrow (missed crash on Jimbo Crash and Nick Crash). | Phase 3 retest |

## Architectural Decisions (Phase 3)

### Three-System Architecture

RideMind is three architecturally separate systems that must not bleed into each other:

- **Reality Analysis System:** Terrain KB + Feature KB + Pipeline stages 1–9. Answers "what is this rider dealing with?"
- **Coaching System:** Technique KB + failure-to-correction logic + Stage 10 coaching output. Answers "what should the rider do differently?"
- **Training System (future):** Drill KB + drill evaluation + progression tracking. Answers "how do we fix this over time?"

Feature KB must not contain drill content. Terrain KB must not leak into coaching. Architecture decisions now must not block the future Training System. The drill feedback loop (analyse → prescribe → practise → re-analyse) is the product moat — not a nice-to-have.

### Skill Tags — Intermediate Mapping Layer

Skill tags link failure classification to coaching output. Every failure type maps to one or more skill tags (e.g. `balance_low_speed`, `momentum_control`, `clutch_throttle_coordination`, `line_commitment`, `body_position_climb`). Later they connect failure diagnosis to drill recommendations, enabling the closed coaching loop. The taxonomy must be designed before Stage 10 (Coaching Generation) is built.

### Coaching Philosophy

RideMind's coaching persona is informed by the Three Pillars framework (Balance, Body Position, Power Delivery & Collection) from established elite enduro coaching methodology. All riding can be decomposed into these three pillars. Fundamentals are mastered on flat ground first, then applied to terrain. The pillars are interconnected — improving one improves the others. The "deliver and collect" principle applies specifically to Power Delivery: the speed of transition between maximum and minimum power is the skill, not just smooth throttle.

This framework will shape: coaching tone, skill prioritisation, skill tag taxonomy, drill sequencing, and progression logic for Stage 10 coaching output. Full coaching persona document (COACH-1) must be created before Stage 10 (Coaching Generation) is implemented.

### Feature KB Design Constraints

- **Geometry-first, not discipline-first.** The pipeline detects shapes, not sports. Discipline extremes are handled by severity tiers within each entry (minor = trail, moderate = enduro, significant = hard enduro, major = trials/extreme).
- **Training drills are NOT feature types.** Cone exercises, pallet practice, and figure-8s are handled via upload UX (rider flags the session as drill practice) and a future drill evaluation system.
- **Single-event vs continuous/section features.** Single-event features (jump, drop, log, step) behave differently from continuous/section features (off-camber, switchback, rock garden, whoops, beam). This distinction affects retrieval, severity assessment, and coaching timing.

### Domain 16 — Machine Profiles

- **Stock bike data only.** Rider modifications (suspension setup, power mods, gearing) belong on the user profile layer, not in the KB.
- **MVP architecture:** Stock data and rider modification placeholders in one file with clear section separation. The user profile layer is not yet built.
- **Schema 4 — locked.** Machine KB schema added to `docs/kb-schemas-v1.md` (v1.3, 2026-04-03). File naming: stock = `[mfr]-[model]-[year].md`, rider-layer = `[mfr]-[model]-[year]--[rider].md`.
- **Factual reference only.** Machine KB entries contain factual mechanical behaviour descriptions only — no coaching advice, no pipeline logic, no rider psychology, no improvement language. Every sentence must be a mechanical cause→effect statement.
- **Compression discipline applies.** Domain 16 entries follow the same cause→effect writing standard as Feature KB entries (Section 16 of consistency spec).

### Stage 11 — Validator-Only Architecture

- **Validator-only for v1.** Stage 11 checks coaching output but does not rewrite or regenerate it. No `corrected_coaching` field in the schema.
- **Single responsibility:** Stage 10 owns coaching generation. Stage 11 owns validation only.
- **Hard fail conditions:** `contradiction: true` or `speed_risk: true` always force `safe: false`. `severity_mismatch: true` forces `safe: false` only when Stage 7 severity is `serious` (v1 known gap: Stage 7 not currently passed into Stage 11 business rules — severity_mismatch enforcement is weaker than prompt logic).
- **Business rules:** Flags must have supporting issues. `confidence_adjustment` without flags is invalid. Flags without `confidence_adjustment` is accepted.
- **FAIL-path validated (S11-FIX, 2026-04-10).** Synthetic fixtures: 4/4 pass (speed_risk, contradiction, observability_overreach fail paths). S11 is locked — no changes unless new failure modes emerge.
- **T1 full 8-clip retest complete (2026-04-10).** S11 8/8 safe. Overreach flagged on Clutch Scream and Nick Crash (correct behaviour).
- **Future correction path (v2):** Stage 11 failure reasons fed back to Stage 10 for one retry (max 1, then hard fail). Stage 7 severity wired into Stage 11 business rules for stricter `severity_mismatch` enforcement.

## Project Structure

```
app/                    # Next.js app (App Router, not src/app/)
  api/analyze/          # POST handler — pipeline entry point (USE_MOCK flag)
  page.tsx              # Single-page state machine: idle→ready→processing→result→error
  layout.tsx            # Root layout
components/             # UI components (presentation only — no pipeline logic)
  upload-dropzone.tsx   # Drag/drop with file validation, 500MB cap
  processing-state.tsx  # Spinner with cycling stage labels
  result-summary.tsx    # 4-chip grid: intent, terrain, failure, confidence
  coaching-card.tsx     # Orange left-border coaching output card
lib/                    # Shared utilities
  types.ts              # AnalysisResult type (UI contract)
  format-result.ts      # Pipeline output → UI output mapper
docs/                   # All planning, architecture, and strategy docs (flat structure)
  ui-standards.md       # Mobile-first design rules, v1 scope boundaries
knowledge-base/
  domain-01-*/          # Existing technique KB (15 domains, 154+ topics)
  ...
  domain-16-machines/   # Machine Profiles KB — 2 entries committed: gasgas-ec300-tpi-2023--jake.md (MACHINE-01), gasgas-ec300-tbi-2024.md (MACHINE-02)
  domain-17-terrain/    # Terrain KB — COMPLETE (10 entries: TERRAIN-01 to TERRAIN-10)
  features/             # Terrain Feature KB — COMPLETE, 14 entries (FEATURE-01 to FEATURE-14)
  pipeline/             # Pipeline v1 — Stages 1–11 implemented and validated (model-agnostic, GPT-4o provider)
scripts/
  test-coaching-kb.ts   # GPT-4o test runner (Phase 1/2)
  test-coaching-claude.ts # Claude test runner (Phase 2)
  test-coaching-gemini.ts # Gemini test runner (Phase 2)
  phase2-batch-runner.ts  # Batch runner for Phase 2
  t1-batch-runner.ts    # T1 full 8-clip batch runner
  perception-test.ts    # PVE standalone harness — 3-model frame + Gemini video track
  phase2-results/       # Phase 2 raw outputs
  t1-results.json       # T1 full retest results
results/
  perception-test/      # PVE results — 32 JSON files + pve-scores-v1.md + ground-truth/
```

## Tech Stack

- **Framework:** Next.js + TypeScript + Tailwind CSS + App Router
- **Models:** GPT-4o, Claude, Gemini 2.5 Flash
- **Media:** ffmpeg-static, ffprobe-static, fluent-ffmpeg
- **Audio:** gpt-4o-audio-preview
- **Runtime:** Node.js, npm
- **Dev environment:** VS Code, Claude Code, Windows/PowerShell

## Key Files

- `docs/ridemind-phase3-master-plan-v1.md` — Source of truth for Phase 3
- `docs/pipeline-contracts-v1.md` — Stage contracts for the 11-stage reasoning pipeline (Gate 1 output)
- `docs/kb-schemas-v1.md` — Entry templates for Terrain KB, Feature KB, Bike Dynamics KB, and Machine KB (Gate 2 output; v1.3 — Schema 4 added 2026-04-03)
- `docs/feature-kb-consistency-spec-v1.md` — Cross-feature consistency rules for Feature KB (Section 16: Compression Discipline; 11-check pre-commit audit)
- `docs/phase2-final-report.md` — Phase 2 evaluation report with settled scores (all 8 clips, 3 models)
- `docs/phase2-evaluation-framework.md` — Scoring rubric
- `docs/backlog.md` — Current task backlog with gates
- `docs/ui-standards.md` — Mobile-first design rules, v1 scope boundaries
- `docs/landscape-review.md` — Monthly technology landscape review (first: 2026-04-12)
- `docs/architecture-principles.md` — System design principles
- `docs/mvp-scope.md` — MVP definition
- `docs/product-vision.md` — Long-term vision
- `lib/types.ts` — AnalysisResult UI contract (pipeline output → UI boundary)
- `lib/format-result.ts` — Pipeline output → UI output mapper

## Working With Jake

- Non-professional developer, intermediate rider
- Beginner-friendly instructions, exact file paths, copy-paste-ready
- Label commands: "Paste into Claude Code:" or "Paste into regular PowerShell terminal:"
- Windows + PowerShell — do NOT chain commands with `&`
- npm is the package manager
- Prefer select-all-and-paste over file downloads
- Quality over token efficiency — the knowledge base IS the product
- Never silently reduce quality
- No line count targets in KB entries — quality, relevance, and mechanical accuracy over arbitrary length ranges

## Critical Principles

1. **Coaching accuracy is the product.** Correct > impressive. Never hallucinate or overclaim.
2. **Observation before coaching.** If the observation is wrong, the coaching is invalid.
3. **Architecture over models.** Structured reasoning improves output regardless of which model fills each role.
4. **Coaching safety is a constraint, not a preference.** Advice that would reproduce a crash must be blocked.
5. **Gate discipline.** No work proceeds past an approval gate until it is explicitly approved.

## Memory Protocol

- Call mempalace_status on session start
- Use mempalace_search before answering questions about past work
- Use mempalace_add_drawer and mempalace_kg_add when making decisions
- Write a diary entry with mempalace_diary_write at end of sessions

## Installed Tools

### MemPalace MCP
Memory and session continuity. Call `mempalace_status` on startup and `mempalace_diary_write` on session close, per `scripts/session-start.md` and `scripts/session-close.md`.

### Context7 MCP
Always use for library and framework documentation lookups instead of relying on training data. Use for Next.js, TypeScript, and any npm packages. Call `resolve-library-id` then `query-docs` before referencing any external API.

### TypeScript LSP
Use for jump-to-definition, find-references, and type checking across the pipeline. Prefer LSP queries over grep when navigating types and interfaces.

### UI/UX Pro Max
Activate for all frontend and UI work. Run `--design-system` before building any new page or component. Persist the design system to `design-system/MASTER.md`.

## Tool Usage Rules

Before writing any code that uses an external library or framework API, check Context7 for current documentation. Before building any UI component or page, activate the UI/UX Pro Max skill.
