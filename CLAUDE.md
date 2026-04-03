# CLAUDE.md — RideMind Project Context

**Last updated:** 2026-04-02

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
- **OPEN DECISION — Dynamics KB structure:** New domain folder (6 new files) vs upgrade existing Domain 02/03 entries with pipeline frontmatter (26 upgraded files). Must resolve before generation begins.
- **Feature KB entry list — LOCKED** — 14 entries, organised by geometry (not discipline). Discipline extremes handled by severity tiers within entries.
- **Feature KB schema validated** — FEATURE-01 (jump, single-event) and FEATURE-02 (off-camber, continuous) committed. Schema v1.2 holding. Next: FKB-3 — dual review FEATURE-01 and FEATURE-02, then batch generate remaining 12 Feature KB entries.

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
- Bike Dynamics KB (2T/4T, traction, throttle, clutch, crash physics)

### Approval Gates

| Gate | Status | Blocks |
|------|--------|--------|
| Gate 1 — Pipeline stages approved | **PASSED** (2026-04-01) | — |
| Gate 2 — KB entry schemas approved | **PASSED** (2026-04-01) | — |
| Gate 3 — Pipeline v1 implemented | NOT PASSED | Phase 3 retest |

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

## Project Structure

```
app/                    # Next.js app (App Router, not src/app/)
docs/                   # All planning, architecture, and strategy docs (flat structure)
knowledge-base/
  domain-01-*/          # Existing technique KB (15 domains, 154+ topics)
  ...
  domain-17-terrain/    # Terrain KB — COMPLETE (10 entries: TERRAIN-01 to TERRAIN-10)
  features/             # NEW — Terrain Feature KB (to be created)
  bike-dynamics/        # NEW — Bike Dynamics KB (to be created)
scripts/
  test-coaching-kb.ts   # GPT-4o test runner (Phase 1/2)
  test-coaching-claude.ts # Claude test runner (Phase 2)
  test-coaching-gemini.ts # Gemini test runner (Phase 2)
  phase2-batch-runner.ts  # Batch runner for Phase 2
  phase2-results/       # Phase 2 raw outputs
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
- `docs/kb-schemas-v1.md` — Entry templates for Terrain KB, Feature KB, and Bike Dynamics KB (Gate 2 output)
- `docs/phase2-final-report.md` — Phase 2 evaluation report with settled scores (all 8 clips, 3 models)
- `docs/phase2-evaluation-framework.md` — Scoring rubric
- `docs/backlog.md` — Current task backlog with gates
- `docs/architecture-principles.md` — System design principles
- `docs/mvp-scope.md` — MVP definition
- `docs/product-vision.md` — Long-term vision

## Working With Jake

- Non-professional developer, intermediate rider
- Beginner-friendly instructions, exact file paths, copy-paste-ready
- Label commands: "Paste into Claude Code:" or "Paste into regular PowerShell terminal:"
- Windows + PowerShell — do NOT chain commands with `&`
- npm is the package manager
- Prefer select-all-and-paste over file downloads
- Quality over token efficiency — the knowledge base IS the product
- Never silently reduce quality

## Critical Principles

1. **Coaching accuracy is the product.** Correct > impressive. Never hallucinate or overclaim.
2. **Observation before coaching.** If the observation is wrong, the coaching is invalid.
3. **Architecture over models.** Structured reasoning improves output regardless of which model fills each role.
4. **Coaching safety is a constraint, not a preference.** Advice that would reproduce a crash must be blocked.
5. **Gate discipline.** No work proceeds past an approval gate until it is explicitly approved.
