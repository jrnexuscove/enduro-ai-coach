# Session Handoff — 2026-04-04 (Session 2)

## What Was Accomplished This Session

### Three Prompt Tuning Passes on Stages 1-4

**Pass 1 — Event Detection + Severity + Anti-refusal:**
- Stage 3: Added `event_detected` field (crash/stall/bail/near_miss/tip_over/mechanical) with fallback shape and type clamping. Crash clips now flag incidents instead of silently reducing to pre-crash intent.
- Stage 4: Added consequence-based severity definitions (commitment/recovery margin, not visual size). Mark crash jump severity moved from "moderate" to "major".
- Anti-refusal instruction added to all four stage prompts.

**Pass 2 — Jump Geometry + Switchback + Gradient:**
- Stage 4: Jump geometry rule (detect from takeoff face, airborne bike, landing zone — don't reduce to generic descent). Switchback constraint (only classify on acute 120°+ directional reversal, not narrow wooded turns). Gradient calibration (classify from active riding line, not broader surrounding terrain).
- Nick crash: jump now detected (was missing entirely). Jimbo crash: switchback false positive eliminated. Mark crash: gradient moved from gentle_down to steep_down.

**Pass 3 — Failure Hierarchy (Stage 6):**
- When failure occurs during airborne phase, technique is primary over terrain/traction (tyre-terrain interaction irrelevant while airborne).
- Mark crash correctly reclassified from momentum to technique.

### Retesting — Two Rounds Across 4 Clips

Round 1 (nick crash, jimbo crash, Mark crash, colin hill): Validated event detection and severity fixes.
Round 2 (same 4 clips): Validated jump geometry, switchback constraint, and gradient calibration. All fixes confirmed without regression on colin hill.

### Stage 5 — Event Sequencing (Built, Tested, Validated)

- Segments clips into chronological phases (approach/setup/execution/transition/failure_point/recovery/outcome/post_event)
- Enforces sequence-not-causality: no coaching language, no root-cause diagnosis in segment descriptions
- Airborne failure-point rule: places failure at earliest visible breakdown (not at landing)
- Observability-aware rider state: prefer "unknown" over guessing when controls not visible
- Deterministic timestamp handling: null in model output, computed in code later
- Mark crash failure point correctly moved from landing (frames 10-11) to airborne phase (frames 8-9)
- Colin hill produces clean stall/stuck timeline without inventing crash mechanics

### Reliability Hardening (All Stages)

- 2 retries with strict repair prompt on final attempt
- JSON extraction from mixed responses (finds first/last braces, parses substring)
- Refusal detection: checks for known refusal phrases, skips parse, goes straight to retry
- Model-authored timestamps removed from Stage 5

### Stage 6 — Failure Type Classification (Built, Tested, Validated)

- Classifies what failed and why from structured JSON only (no frames needed)
- Enforces symptom vs root cause separation (symptoms from Stage 5, root cause is new inference)
- Failure hierarchy rule: bike dynamics > technique > momentum > traction
- Airborne failure rule: technique over terrain when failure occurs mid-air
- Mark crash: technique (airborne instability, body position/throttle during flight) — not momentum or traction
- Colin hill: traction (low traction on steep rocky surface, suboptimal line contributing)

### Stage 7 — Crash Type Classification (Built, Not Yet Tested)

- Classifies crash mechanism: otb/lowside/highside/tip_over/stall_drop/slide/ejection
- Conditional: only runs when crash detected in Stage 5 outcome or Stage 3 event_detected
- Built to same pattern as all other stages (no frames, JSON reasoning only)
- Needs wiring into runner and testing on Mark crash + Colin hill

## Decisions Made This Session

1. **Anti-refusal is a model behaviour problem, not a prompt problem.** GPT-4o's safety filters trigger non-deterministically on crash footage. Solved with retry logic and refusal detection rather than more prompt text.
2. **Failure hierarchy rule.** When failure occurs during airborne phase, technique is primary over terrain/traction (tyre-terrain interaction irrelevant while airborne).
3. **Timestamps removed from model responsibility.** Frame indices + clip duration = deterministic calculation in code, not LLM guesswork.
4. **Stages 6 and 7 receive no frames.** They reason from structured JSON only, saving tokens and forcing reasoning from classified data.
5. **Stage 7 is conditional.** Only runs if Stage 5 outcome = "crash" or Stage 3 event_detected.type = "crash".
6. **Consequence-based severity definitions.** Severity reflects commitment level, recovery margin, and consequence of error — not visual size of the feature.
7. **Switchback constraint.** Only classify switchback on acute 120°+ directional reversal on gradient. Narrow wooded turns are not switchbacks.

## Repo State

All work committed across multiple commits:
- `feat: Stage 3 event detection, Stage 4 severity/geometry, anti-refusal`
- `feat: Stage 4 jump geometry, switchback constraint, gradient calibration`
- `feat(pipeline): Stage 5 event sequencing + reliability hardening` (41312b0)
- `feat(pipeline): Stage 6 failure type classification + failure hierarchy`
- Stage 7 built but not yet committed with runner wiring

CLAUDE.md and backlog.md need updating (CC prompt provided in session).

## What To Do Next Session

1. **Wire Stage 7 into runner and test** on Mark crash (expected: otb or ejection) and Colin hill (expected: crash_occurred false or tip_over)
2. **Commit Stage 7 results**
3. **Build Stage 8 (Causal Chain Construction)** — the diagnostic core that connects root cause through contributing factors to outcome
4. **After Stage 8:** Build Stages 9-11 (Decision Engine, Coaching Generation, Safety Validation)
5. **After full pipeline:** Re-run all 8 Phase 2 clips through complete pipeline as Phase 3 validation
6. **Update CLAUDE.md and backlog.md** with pipeline implementation status

## Known Issues / Watch Items

- GPT-4o intermittent refusals on crash footage — handled by retry logic, not eliminated
- Colin hill Stage 5 outcome varies between runs (stall/stuck/crash) — GPT-4o non-determinism on edge cases
- Stage 4 severity/gradient shows run-to-run variance on Mark crash (significant↔moderate, steep_down↔moderate_down)
- No audio extraction implemented yet — all audio fields are null/placeholder
- Stage 3 event_detected on Nick crash is inconsistent (sometimes none despite visible crash)
- FEATURE-01 through FEATURE-08 are 455-536 lines vs FEATURE-09-14 at 183-194 lines — inconsistency exists but doesn't block pipeline

## File Locations

- Pipeline code: pipeline/
- Pipeline contracts: docs/pipeline-contracts-v1.md
- Feature KB: knowledge-base/features/
- Machine KB: knowledge-base/domain-16-machines/
- Terrain KB: knowledge-base/domain-17-terrain/
- Test clips: C:\Users\rigge\OneDrive\Videos\Enduro ai coach test clips\

### Pipeline Files
- pipeline/stage1-camera.ts
- pipeline/stage2-observability.ts
- pipeline/stage3-intent.ts
- pipeline/stage4-terrain-feature.ts
- pipeline/stage5-event-sequencing.ts
- pipeline/stage6-failure-type.ts
- pipeline/stage7-crash-type.ts
- pipeline/types.ts
- pipeline/run-test.ts

### Exact Test Clip Filenames
- colin hill.mp4
- Mark crash.mp4
- nick crash.mp4
- clutch scream hill.mp4
- Fall bulgario muddy hill 1.mp4
- jimbo crash.mp4
- long hill.mp4
- steep hill bail in trees.mp4

---

## Project Overview — Where RideMind Is Now

### In Plain Terms

RideMind can now watch a riding clip, understand what it's looking at (camera angle, terrain, features), figure out what the rider was trying to do, break the attempt into a timeline of what happened, and then diagnose what went wrong and why. It does this through a 7-stage reasoning pipeline that builds understanding incrementally — each stage adds a layer of intelligence on top of the previous ones.

### What's Working

The first 6 stages are validated and producing genuinely useful output. The system correctly identifies that Mark's crash was a technique failure during the airborne phase of a jump (not a traction or speed problem), and that Colin's stall was a traction problem on steep rock. These are the kinds of diagnoses that require real riding understanding, not just video description.

Key architectural wins proven this session:
- Features that Phase 2 models missed entirely (rock gardens, jumps) are now being detected through structured perception
- Failure timing that was placed too late (at landing instead of in-air) has been corrected through targeted prompt rules
- Causal reasoning now correctly separates symptoms from root causes and prioritises the right failure mechanism

### What's Not Built Yet

The pipeline currently stops at diagnosis. It can tell you what went wrong, but it can't yet:
- Build the full causal chain connecting root cause to outcome (Stage 8)
- Decide what to coach and in what order (Stage 9)
- Generate the actual coaching text the rider sees (Stage 10)
- Safety-check that coaching before delivery (Stage 11)

Those four stages turn the analysis into a product.

### What's Coming Soon

Stage 7 (crash classification) is built and ready to test — one session to validate. After that, Stages 8-11 complete the pipeline. Once the full 11-stage pipeline works end-to-end, the plan is to re-run all 8 Phase 2 test clips through it as Phase 3 validation — comparing structured pipeline coaching against the flat-prompt coaching from Phase 2.

### The Bigger Picture

The pipeline architecture is proving the core thesis: systematic, staged reasoning produces better perception and diagnosis than asking a model to do everything at once. This is the architecture-over-model-choice principle in action. The system is getting smarter through structure, not model upgrades — and every improvement is targeted, testable, and doesn't regress other clips.
