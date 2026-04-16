# CLAUDE.md — RideMind Project Context

**Last updated:** 2026-04-16 (session 2 — workflow redefinition, Lovable migration decision, expanded Claude role, repo migration to RigomiLtd/RideMind)

## What is RideMind?

RideMind (ridemind.ai) is an AI-powered off-road motorcycle coaching platform. It analyses ride footage and provides structured, actionable coaching feedback. Built by Jake under Rigomi Limited.

RideMind is a **physics-aware, terrain-aware, machine-aware riding intelligence system** — not a generic video analysis tool.

## Current Phase: Phase 3 — Reasoning Pipeline + KB Build

### Active State

**Phase 3 — Reasoning Pipeline + KB Build.** Product path is ARCH-V2 (Pass 1 Perception → KB Retrieval → Pass 2 Coaching). S0–S11 is benchmark/debug infrastructure only.

**Locked since last session (2026-04-16):**
- ARCH-V2 spec v1.1 LOCKED at `docs/arch-v2-spec.md` (commit b94719c). All 7 amendments folded.
- Four-layer KB architecture decided — Canonical KB / Research Corpus / Proposal Layer / Runtime Pack. ADR at `docs/kb-architecture.md`.
- Perception model locked to `claude-sonnet-4-6` for all new pipeline code.
- **Lovable adopted as production platform** — Next.js local dev becomes pipeline/AI dev environment only. See `docs/adr-lovable-migration.md`.
- **Claude role expanded** — Claude (chat) now holds CTO, PM, Program Manager, and product trajectory functions in addition to architecture review. See `docs/adr-claude-role.md`.
- **Repo migrated to RigomiLtd/RideMind** — active development now at https://github.com/RigomiLtd/RideMind (private). Old repo at https://github.com/jrnexuscove/enduro-ai-coach archived as provenance record. See `docs/adr-repo-migration.md`.

**P0:** PASS1-SCHEMA — design Pass 1 output schema; replaces `fromStage4()` adapter; blocks Pass 1 impl, Pass 2 design, full ARCH-V2 benchmark. See `docs/arch-v2-spec.md`.
**P1:** PASS1-IMPL — single combined vision call replacing S0–S4, target 30–45 sec. Blocked on PASS1-SCHEMA.
**P1:** LOVABLE-PHASE-A — Lovable project setup, ARCH-V2 pipeline ported, one clip end-to-end. See `docs/roadmap.md`.
**Pending:** Coach Voice Seed v0.2 held in chat — lands next session as `docs/coach-voice-seed-v1.md`. Gates all Track 2 ingest.
**Session close:** 2026-04-16

### Perception Viability Experiment — COMPLETE (2026-04-12)

**Decision:** Claude Sonnet is the primary perception model (69.8% across 8 clips); GPT-4o excluded from primary path; Gemini video is not a frames replacement.
Full results and per-clip scores: `results/perception-test/pve-scores-v1.md`.

### Architecture & Gates

ARCH-V2 is the current product path — see `docs/arch-v2-spec.md`. S0–S11 is benchmark/debug infrastructure, not the product. Gates 1–3 all passed; open gates tracked in `docs/backlog.md`.

---

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

- **Stock bike data only.** Rider modifications belong on the user profile layer, not in the KB.
- **MVP architecture:** Stock data and rider modification placeholders in one file with clear section separation. User profile layer not yet built.
- **Schema 4 — locked.** File naming: stock = `[mfr]-[model]-[year].md`, rider-layer = `[mfr]-[model]-[year]--[rider].md`. Schema at `docs/kb-schemas-v1.md`.
- **Factual reference only.** No coaching advice, pipeline logic, rider psychology, or improvement language. Every sentence must be a mechanical cause→effect statement.
- **Compression discipline applies.** Domain 16 entries follow the same cause→effect writing standard as Feature KB entries (Section 16 of consistency spec).

### Stage 11 — Validator-Only Architecture

- **Validator-only for v1.** Stage 11 checks coaching output but does not rewrite or regenerate it. No `corrected_coaching` field in the schema.
- **Single responsibility:** Stage 10 owns coaching generation. Stage 11 owns validation only.
- **Hard fail conditions:** `contradiction: true` or `speed_risk: true` always force `safe: false`. `severity_mismatch: true` forces `safe: false` only when Stage 7 severity is `serious` (v1 known gap: Stage 7 not currently passed into Stage 11 business rules — severity_mismatch enforcement is weaker than prompt logic).
- **Business rules:** Flags must have supporting issues. `confidence_adjustment` without flags is invalid. Flags without `confidence_adjustment` is accepted.
- **Future correction path (v2):** Stage 11 failure reasons fed back to Stage 10 for one retry (max 1, then hard fail). Stage 7 severity wired into Stage 11 business rules for stricter `severity_mismatch` enforcement.

---

## Project Structure

> **Note:** This local Next.js app is the **AI pipeline development environment only** — not the production product. Production UI is Lovable (see `docs/adr-lovable-migration.md`). Active repo: https://github.com/RigomiLtd/RideMind

```
app/                    # Next.js app (App Router, not src/app/) — pipeline dev env only
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
  workflow.md           # Team roles, decision matrix, session rituals, golden rules
  roadmap.md            # Phase A–G road map (first draft)
  adr-cloud-hosting.md  # ADR: cloud hosting gap in original plan
  adr-lovable-migration.md  # ADR: Lovable as production platform
  adr-claude-role.md    # ADR: expanded Claude role
  adr-team-workflow.md  # ADR: formal workflow and team role structure
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

---

## Tech Stack

- **AI pipeline dev environment:** Next.js + TypeScript + Tailwind CSS + App Router (local, Windows)
- **Production platform:** Lovable (AI-native web app builder — see `docs/adr-lovable-migration.md`)
- **Models:** Claude Sonnet 4.6 (primary perception + coaching), GPT-4o (legacy eval only), Gemini 2.5 Flash (audio-check track)
- **Media:** ffmpeg-static, ffprobe-static, fluent-ffmpeg
- **Audio:** gpt-4o-audio-preview
- **Runtime:** Node.js, npm
- **Dev environment:** VS Code, Claude Code, Windows/PowerShell

---

## Key Files

- `docs/arch-v2-spec.md` — ARCH-V2 parent spec v1.1 LOCKED
- `docs/workflow.md` — Team roles, decision matrix, session rituals, golden rules
- `docs/roadmap.md` — Phase A–G road map
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
- `docs/kb-architecture.md` — Four-layer KB ADR
- `docs/adr-cloud-hosting.md` — ADR: cloud hosting gap
- `docs/adr-lovable-migration.md` — ADR: Lovable migration
- `docs/adr-claude-role.md` — ADR: expanded Claude role
- `docs/adr-team-workflow.md` — ADR: team workflow
- `lib/types.ts` — AnalysisResult UI contract (pipeline output → UI boundary)
- `lib/format-result.ts` — Pipeline output → UI output mapper

---

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

---

## Team, Roles, and Workflow

Full detail in `docs/workflow.md`. Summary below.

### Who Does What

| Role | Participant | Primary Function |
|------|-------------|-----------------|
| Product owner / delivery lead | Jake | Final decision on all locks. Approves before irreversible changes. Routes work between participants. |
| CTO / architect | Claude (chat) | Architecture decisions, spec authoring, prompt design, KB design, coaching quality. |
| PM / program manager | Claude (chat) | Phase planning, priority calls, gate decisions, trajectory custody, session look-aheads. |
| Product thinking | Claude (chat) | Product direction, framing, user experience reasoning, scope negotiation. |
| Primary implementer | Claude Code (Window 1) | Executes reviewed specs. File ops, git, verification. |
| Parallel implementer | Claude Code (Window 2) | Independent tasks only. Collision check before fire. |
| Draft generator | ChatGPT | Code modules, test outputs, candidate prompts. Output is not final — always routed to Claude chat. |
| Production platform | Lovable | UI build, deployment, hosting, public-facing product. |
| Product AI | Product AI (future) | User-facing AI features once pipeline is stable. |
| Validation harness | Automated | Validates pipeline outputs against benchmark clips. Replaces manual review for pipeline validation. |

### Decision Matrix — Who Jake Goes To For What

| Question type | Go to |
|---------------|-------|
| Architecture decision | Claude (chat) |
| Spec authoring (pipeline, KB, prompts) | Claude (chat) |
| Priority / phase planning | Claude (chat) |
| Code review before implementation | Claude (chat) |
| Implementation / file changes | Claude Code |
| Lovable UI build | Lovable (with Claude chat spec first) |
| First-draft code modules | ChatGPT → Claude chat for review |
| Coaching content / KB entries | Claude (chat) |
| Session look-ahead | Claude (chat) |
| Final lock decisions | Jake |

### Session Rituals

- **Start-of-session look-ahead:** At the start of each working session, Claude (chat) reviews the backlog and current phase, surfaces the highest-leverage tasks, and flags any blockers. Jake does not need to re-read all docs; Claude holds trajectory.
- **End-of-session look-ahead:** At the end of each session, Claude (chat) summarises what was completed, what is now unblocked, and what the first tasks should be next session. Claude Code executes the session-close doc captures.
- **Phase boundary reviews:** Before beginning a new phase (e.g., Phase A → Phase B), Claude (chat) produces a full phase review: what was achieved, what gaps remain, whether the exit criteria were genuinely met, and what the next phase needs.
- **4–6 week zoom-outs:** Periodically (roughly every 4–6 weeks of active work), Claude (chat) produces a zoom-out: are we on the right trajectory, are there assumptions that should be challenged, what does the road map look like from here?

### Workflow Rules

1. No participant bypasses review. Claude Code does not implement un-reviewed code.
2. Claude chat does not commit. ChatGPT output does not enter the repo directly.
3. The harness validates; it does not decide. Gate decisions belong to Jake.
4. All non-trivial code and all architectural changes are reviewed in Claude chat before Claude Code implements.
5. Collision check before firing Claude Code Window 2 on any task.

---

## Critical Principles

1. **Coaching accuracy is the product.** Correct > impressive. Never hallucinate or overclaim.
2. **Observation before coaching.** If the observation is wrong, the coaching is invalid.
3. **Architecture over models.** Structured reasoning improves output regardless of which model fills each role.
4. **Coaching safety is a constraint, not a preference.** Advice that would reproduce a crash must be blocked.
5. **Gate discipline.** No work proceeds past an approval gate until it is explicitly approved.
6. **Claude holds the trajectory.** Jake should not need to re-read all docs at the start of each session. Claude (chat) surfaces what matters.

---

## Memory Protocol

- Call mempalace_status on session start
- Use mempalace_search before answering questions about past work
- Use mempalace_add_drawer and mempalace_kg_add when making decisions
- Write a diary entry with mempalace_diary_write at end of sessions

---

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
