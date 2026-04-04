# Session Handoff — 2026-04-04 (Extended Session)

## What Was Accomplished This Session

### Feature KB — Complete (14 entries)
- FEATURE-01 through FEATURE-08: compression pass applied (455-536 lines — over target of 300-450 but structurally intact, all pass integrity checks)
- FEATURE-09 through FEATURE-14: generated fresh at correct density (183-194 lines each), all ChatGPT reviewed, all corrections applied
- Full list: Jump, Off-camber, Drop, Steps/Ledges, Log, Rock Garden, Rut, Berm, Roots, Switchback, Water Crossing, Gully, Whoops, Elevated Beam
- All committed to knowledge-base/features/

### Machine KB — Domain 16 Started
- MACHINE-01 drafted: GasGas EC300 TPI 2023 stock profile + Jake's rider mod profile
- File at knowledge-base/domain-16-machines/gasgas-ec300-tpi-jake.md
- Architecture decision locked: Domain 16 = stock bike data only, rider mods live on user profile layer
- Still needs cause-effect compression pass (~20% per ChatGPT feedback)
- Stock gearing confirmed, exact tooth count (13/50) needs verification

### Dynamics KB — Decision Locked
- Option A: extend existing Domain 02/03 entries with pipeline frontmatter (no new domain)
- Not started yet — deferred until pipeline shows what it needs

### Pipeline v1 — Stages 1-4 IMPLEMENTED AND TESTED
- 9 files created in pipeline/ folder
- Architecture: prompt-based stages, model-agnostic interface, GPT-4o provider
- Includes: JSON extraction, required-key validation, one retry on parse failure, confidence clamping, inter-stage context passing, debug blocks
- Committed as working code

### Pipeline Contracts Updated
- Added whoops and elevated_beam to feature_type enum
- Added off-camber retrieval note (uses gradient.camber, not feature_type)

## Pipeline Test Results — All 8 Phase 2 Clips

### Scorecard

| Clip | Camera | Intent | Key Feature | Severity | Result |
|---|---|---|---|---|---|
| Colin Hill | ✅ third_person | ✅ climb | ✅ rock_garden (significant) | OK | **Pass** |
| Mark Crash | ✅ third_person | ✅ jump | ✅ jump (moderate) | Too low | **Pass** |
| Nick Crash | ✅ third_person | ⚠️ descent | ⚠️ drop (0.40) | — | **Partial** |
| Clutch Scream Hill | ✅ mixed | ✅ climb | ✅ rut, log, rock_garden | — | **Pass** |
| Fall Bulgario | ✅ mixed | ✅ climb | ✅ rut, roots | — | **Pass** |
| Jimbo Crash | ✅ pov | ⚠️ traverse | ❌ none detected | — | **Fail** |
| Long Hill | ✅ pov | ✅ climb | ✅ rut, roots | — | **Pass** |
| Steep Hill Bail | ✅ mixed | ✅ climb | ✅ rut | — | **Pass** |

**Result: 5 pass, 2 partial, 1 fail**

### What the Pipeline Does Well
- Stage 1 (Camera): 8/8 correct — this stage is done
- Stage 3 (Intent): strong on climbs, weak on crash/event clips
- Stage 4 (Features): detects features Phase 2 missed entirely (rock_garden on Colin Hill, jump on Mark Crash)
- Observability ceilings are working — low-confidence clips get low ceilings, not hallucinated certainty
- POV body_position_max_confidence correctly forced to 0.0

### Three Patterns to Fix (Next Session)

**Pattern 1: Severity is consistently soft**
Mark Crash jump rated "moderate" when it produces a crash. The prompt needs consequence-awareness: "Severity reflects commitment, consequence, speed sensitivity, and recovery margin — not just the visual size of the feature."

**Pattern 2: Crash clips confuse intent**
Nick crash and jimbo crash defaulted to generic activity descriptions instead of flagging the crash event. Stage 3 needs an "event/incident observed" flag so crashes don't get reduced to pre-crash activity only.

**Pattern 3: Off-camber may be over-detected**
Flagged on Colin Hill, Clutch Scream Hill, Jimbo Crash, Steep Hill Bail, Mark Crash, Fall Bulgario. Frequency suggests possible over-detection. Verify against actual clips.

### Known Issues
- Nick crash: GPT-4o initially refused at Stage 3 ("I'm sorry, but I can't determine...") — worked on retry. Anti-refusal prompt instruction needed across all stages.
- Jimbo crash: hit 429 rate limit (30k TPM) — inter-stage delay added to fix this.
- Fall Bulgario filename was wrong in batch script (missing "muddy hill 1")
- Steep Hill Bail filename was wrong (missing "in trees")
- FEATURE-01 through FEATURE-08 are 455-536 lines vs FEATURE-09-14 at 183-194 lines — inconsistency exists but doesn't block pipeline

## Decisions Made This Session

1. **Domain 16 = stock bike data only.** Rider mods on user profile layer.
2. **Bike profile scope:** only engine performance, gearing, suspension, tyres/mousse.
3. **Dynamics KB Option A locked:** extend Domain 02/03, no new domain.
4. **Feature KB compression target:** 300-450 lines (not fully achieved on FEATURE-01-08).
5. **Machine KB target:** 150-250 lines.
6. **Pipeline model:** GPT-4o for validation, model-agnostic interface for future swap.
7. **feature_class: single_event for switchback** — pushed back on ChatGPT's suggestion to make it continuous or add third class.

## Repo State

All work committed. Key recent commits:
- Feature KB compression pass (FEATURE-01-08)
- FEATURE-09 through FEATURE-14 (new entries)
- MACHINE-01 + Domain 16 folder
- Pipeline contracts enum update (whoops, elevated_beam)
- Pipeline v1 implementation (stages 1-4)

CLAUDE.md and backlog.md should be updated to reflect pipeline implementation complete and test results.

## What To Do Next Session

1. **Update CLAUDE.md and backlog.md** with pipeline implementation status and test results
2. **Two targeted prompt fixes:**
   - Stage 4 severity: add consequence/commitment awareness
   - Stage 3: add event/incident detection flag
3. **Add anti-refusal instruction** to all four stage prompts
4. **Re-run the two weakest clips** (nick crash, jimbo crash) after prompt fixes to verify improvement
5. **Then: build Stages 5-7** (Event Sequencing, Failure Type Classification, Crash Type Classification)

## File Locations

- Pipeline code: pipeline/
- Pipeline contracts: docs/pipeline-contracts-v1.md
- Feature KB: knowledge-base/features/
- Machine KB: knowledge-base/domain-16-machines/
- Terrain KB: knowledge-base/domain-17-terrain/
- Test clips: C:\Users\rigge\OneDrive\Videos\Enduro ai coach test clips\

### Exact test clip filenames
- colin hill.mp4
- Mark crash.mp4
- nick crash.mp4
- clutch scream hill.mp4
- Fall bulgario muddy hill 1.mp4
- jimbo crash.mp4
- long hill.mp4
- steep hill bail in trees.mp4
