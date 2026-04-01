# CLAUDE.md — RideMind Project Context

**Last updated:** 2026-04-01

## What is RideMind?

RideMind (ridemind.ai) is an AI-powered off-road motorcycle coaching platform. It analyses ride footage and provides structured, actionable coaching feedback. Built by Jake under Nexus Cove.

RideMind is a **physics-aware, terrain-aware, machine-aware riding intelligence system** — not a generic video analysis tool.

## Current Phase: Phase 3 — Reasoning Pipeline + KB Build

### Where We Are

- Phase 2 multi-model testing is **complete** (8 clips × 3 models, fully scored)
- Phase 2 evaluation report is **complete**
- Phase 3 master plan is **complete** and saved at `docs/ridemind-phase3-master-plan-v1.md`
- **Gate 1 (pipeline approval) has NOT been passed yet** — no KB generation or engineering should begin until it is

### Key Phase 2 Findings

1. No single model is production-ready. Gemini strongest on observation (~65%) but 63% reliability. GPT-4o mid-tier (~42%) with visual refusals. Claude weakest quality (~34%) but 100% reliability.
2. Architecture matters more than model choice — 10 systematic failures exist above the model layer.
3. Critical gaps: no terrain feature detection, no crash type classification, no failure causation reasoning, no event sequencing, fabricated certainty under low observability.

### What We're Building

A 9-stage reasoning pipeline:
1. Camera Perspective Detection
2. Observability Assessment
3. Terrain & Feature Detection
4. Event Sequencing
5. Failure Type Classification
6. Crash Type Classification
7. Causal Chain Construction
8. Coaching Generation
9. Coaching Safety Validation

Plus three new knowledge bases:
- Terrain KB (surfaces, gradients, conditions)
- Terrain Feature KB (jumps, drops, berms, ruts, ledges)
- Bike Dynamics KB (2T/4T, traction, throttle, clutch, crash physics)

### Approval Gates

| Gate | Status | Blocks |
|------|--------|--------|
| Gate 1 — Pipeline stages approved | NOT PASSED | All KB generation, all engineering |
| Gate 2 — KB entry schemas approved | NOT PASSED | Batch KB generation |
| Gate 3 — Pipeline v1 implemented | NOT PASSED | Phase 3 retest |

## Project Structure

```
app/                    # Next.js app (App Router, not src/app/)
docs/                   # All planning, architecture, and strategy docs (flat structure)
knowledge-base/
  domain-01-*/          # Existing technique KB (15 domains, 154+ topics)
  ...
  terrain/              # NEW — Terrain KB (to be created)
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
