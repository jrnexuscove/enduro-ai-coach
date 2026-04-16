# RideMind — Road Map

**Status:** FIRST DRAFT — for Claude (chat) review and refinement
**Author:** Claude Code, session-close capture
**Date:** 2026-04-16
**Owner:** Jake (Rigomi Limited)

> **Note:** This is a first-pass road map drafted at session close. It should be reviewed by Claude (chat) at the start of the next session and refined before any phase work begins. Phase durations are estimates only — they reflect working sessions, not calendar weeks.

---

## Road Map Overview

```
Phase A — Foundation        Lovable + pipeline API + one clip end-to-end
Phase B — Validation        8-clip benchmark passing in Lovable
Phase C — Novel Clips       15-20 new clips, failure cataloguing
Phase D — First Users       5 riders using the product
Phase E — Iterate           Prompt + KB improvements from rider feedback
Phase F — Scale Prep        Rate limits, Stripe, public onboarding
Phase G — Moat Building     CV layer, IMU hardware, physical location
```

**Current position:** Between Phase 3 (pipeline build) and Phase A (Lovable foundation). Phase A is blocked on PASS1-IMPL and PASS2-IMPL.

---

## Phase A — Foundation

**Goal:** Lovable project running with ARCH-V2 pipeline connected end-to-end. One real clip producing real coaching output, accessible from a public URL.

### What this phase delivers

- A Lovable app with RideMind branding and upload flow
- ARCH-V2 pipeline (Pass 1 + Pass 2 + safety) deployed as a callable API
- Lovable → API → coaching result working end-to-end for at least one clip
- Coach Voice Seed v1 landed on disk (`docs/coach-voice-seed-v1.md`)
- PASS1-SCHEMA, PASS1-IMPL, PASS2-PROMPT, PASS2-IMPL all complete

### Exit criteria

- [ ] Lovable app accessible at a public URL
- [ ] User can upload a video clip via the Lovable UI
- [ ] ARCH-V2 pipeline processes the clip and returns coaching output
- [ ] Coaching output is displayed in the Lovable UI
- [ ] At least one benchmark clip produces output that Jake judges to be valid coaching

### Dependencies

- PASS1-SCHEMA (not started — P0 blocker)
- PASS1-IMPL (not started — blocked on PASS1-SCHEMA)
- PASS2-PROMPT (not started — blocked on PASS1-SCHEMA)
- PASS2-IMPL (not started — blocked on PASS2-PROMPT)
- Coach Voice Seed v1 (held in chat — lands next session)
- Lovable handover brief (to be produced by Claude chat next session)

### Estimated duration

4–6 working sessions (pipeline implementation is the long pole; Lovable setup is fast once the brief is written).

### What happens at the boundary

Before Phase B begins, Claude (chat) produces a Phase A review. Jake approves the boundary.

---

## Phase B — Validation

**Goal:** All 8 benchmark clips passing through Lovable → pipeline at acceptable coaching quality. ARCH-V2 benchmark baseline formally established.

### What this phase delivers

- All 8 benchmark clips run through the live Lovable + pipeline system
- Benchmark scores recorded against ARCH-V2 criteria
- Any pipeline failures from the live run diagnosed and fixed
- Formal ARCH-V2 baseline established (comparable to S0–S11 baseline)

### Exit criteria

- [ ] All 8 benchmark clips run end-to-end through Lovable → pipeline
- [ ] Benchmark scores recorded
- [ ] Any failures from live run investigated and resolved or explicitly deferred
- [ ] Jake judges that coaching output is meaningfully better than S0–S11 baseline on at least 6/8 clips
- [ ] Processing time is under 90 seconds per clip on average

### Dependencies

- Phase A complete
- BENCHMARK-ARCH-V2 task (S0–S11 baseline must be established for comparison)
- Ground truth documents for all 8 clips (T6 in backlog)

### Estimated duration

2–3 working sessions.

### What happens at the boundary

Before Phase C begins, Claude (chat) produces a Phase B review. Jake approves the boundary.

---

## Phase C — Novel Clip Testing

**Goal:** 15–20 new clips (not the original 8 benchmark clips) tested through the pipeline. Failure types catalogued. Coaching quality gaps identified and prioritised.

### What this phase delivers

- 15–20 new clips collected from Jake's riding and/or willing riders
- All new clips run through Lovable → pipeline
- Catalogue of failure types: what the pipeline gets wrong and why
- Prioritised list of KB and prompt improvements to address gaps
- Initial improvements implemented and re-tested

### Exit criteria

- [ ] At least 15 new clips collected (different riders, terrain, conditions)
- [ ] All 15+ clips run through the pipeline
- [ ] Failure catalogue documented (minimum: what type of failure, root cause, frequency)
- [ ] Top 3 improvement priorities identified by Claude chat
- [ ] At least top 1 improvement implemented and validated

### Dependencies

- Phase B complete
- Jake to source new ride clips
- Track 2 research agent may surface KB gaps that support this phase (if RESEARCH-AGENT-IMPL-1 is built by then)

### Estimated duration

3–5 working sessions (clip collection is the long pole; depends on Jake's availability to ride and film).

### What happens at the boundary

Before Phase D begins, Claude (chat) produces a Phase C review. Jake approves the boundary. Gate criterion: coaching quality must be good enough that real riders will not be frustrated or misled.

---

## Phase D — First Users

**Goal:** 5 real riders using RideMind. Feedback loop established. First external signal on coaching quality.

### What this phase delivers

- 5 riders identified and onboarded (Jake's network — enduro/trail riders)
- Simple onboarding flow in Lovable (what RideMind is, how to upload, what to expect)
- Structured feedback capture (not just "did you like it" — what was right, what was wrong, what was missing)
- Feedback from all 5 riders collected and synthesised

### Exit criteria

- [ ] 5 riders have used the product at least once
- [ ] At least 3 riders have provided structured feedback
- [ ] Feedback synthesised into actionable improvement list
- [ ] No safety failures (coaching advice that could cause harm) in any rider's output

### Dependencies

- Phase C complete
- Lovable onboarding flow implemented
- Feedback capture mechanism implemented

### Estimated duration

2–3 working sessions for setup; 2–4 weeks for rider feedback to accumulate (depends on how often riders use it).

### What happens at the boundary

Before Phase E begins, Claude (chat) produces a Phase D review. Jake approves the boundary. This is a significant gate — Phase E is iteration based on real user feedback, which is qualitatively different from synthetic validation.

---

## Phase E — Iterate

**Goal:** Prompt and KB improvements driven by rider feedback. Coaching quality measurably improved over Phase D baseline. Product is demonstrably useful to real riders.

### What this phase delivers

- Phase D feedback synthesised into prioritised improvement backlog
- Top improvements implemented (prompts, KB entries, retrieval logic)
- Original 5 riders re-tested: has quality improved?
- Second round of new riders if needed (up to 10 total)
- Stable coaching quality across a range of riding scenarios

### Exit criteria

- [ ] Top 3 improvements from Phase D feedback implemented and validated
- [ ] Original riders report improved output (qualitative signal)
- [ ] No systematic failure modes remaining in coached output
- [ ] Jake is confident the product delivers genuine value to riders

### Dependencies

- Phase D complete and feedback collected
- May require new KB domains (Domain 18 Rider Skills, additional Feature KB entries) if gaps are found in Phase C/D

### Estimated duration

3–6 working sessions (iteration cycles depend on feedback quality and gap complexity).

### What happens at the boundary

Before Phase F begins, Claude (chat) produces a Phase E review and zoom-out. This is the point where Jake must decide: is the coaching quality good enough to invest in scale infrastructure? Phase F is a significant effort; it should only begin if Phase E demonstrated real value.

---

## Phase F — Scale Prep

**Goal:** Rate limiting, Stripe integration, public onboarding. RideMind is ready for public release beyond the initial 5 riders.

### What this phase delivers

- Rate limiting on the pipeline API (prevent abuse, manage API cost)
- Stripe integration in Lovable (basic subscription or pay-per-analysis model)
- Public onboarding flow (sign-up, explanation, first upload)
- Unit economics tracked and within target (cost per analysis)
- Public URL promoted (ridemind.ai domain, if not already configured)

### Exit criteria

- [ ] Rate limiting implemented and tested
- [ ] Payment flow working end-to-end (Stripe test mode)
- [ ] Public onboarding flow complete
- [ ] Cost per analysis tracked and within unit economics target
- [ ] Jake comfortable with the public-facing product

### Dependencies

- Phase E complete
- Stripe account set up
- ridemind.ai domain configured (if not already)
- Privacy policy and terms of service (legal minimum for public product)

### Estimated duration

3–5 working sessions (primarily Lovable UI work; some pipeline API hardening).

### What happens at the boundary

Phase G is long-term moat building. Claude (chat) produces a zoom-out at the Phase F/G boundary. At this point, RideMind has a working product with paying users. Phase G is strategic investment in defensibility, not survival.

---

## Phase G — Moat Building

**Goal:** Computer vision layer, IMU hardware integration, physical location coaching. The product moat that makes RideMind hard to replicate.

### What this phase delivers

The moat is: **RideMind understands physics that general AI cannot.** Phase G builds the infrastructure to deepen that moat:

1. **CV layer** — deterministic computer vision (YOLO or equivalent) for rider pose estimation, speed estimation, and terrain geometry. Replaces LLM perception for factual observables. LLM focuses on reasoning and coaching.
2. **IMU hardware integration** — RideLinc, TwoNav, or similar device data as structured pipeline input. IMU gives ground truth: speed at failure, lean angle, g-force at impact. Eliminates perception uncertainty for kinematic events.
3. **Physical location coaching** — identify where riders are riding (GPS coordinates → known trail databases), attach location-specific terrain context to coaching output. "You're riding at [location] — this section has [known hazard] which is why [technique] matters here."

### Exit criteria (indicative — to be refined before Phase G begins)

- [ ] CV PoC: rider pose estimated from video with measurably higher consistency than LLM perception
- [ ] IMU integration: at least one ride with IMU data processed through pipeline
- [ ] Location coaching: at least one location-specific coaching output generated correctly
- [ ] Drill feedback loop: analyse → prescribe → practise → re-analyse working end-to-end

### Dependencies

- Phase F complete (product is public and working)
- Hardware availability (IMU device compatible with pipeline)
- Location data source identified
- Significant engineering investment — this is a multi-month workstream

### Estimated duration

Indefinite — this is an ongoing strategic investment, not a time-boxed deliverable. Individual sub-items may take 5–15+ working sessions each.

---

## Assumptions and Risks

### Key assumptions

1. **ARCH-V2 pipeline produces coaching quality that riders find valuable.** If Phase C/D reveals that LLM perception is fundamentally insufficient (not fixable with prompts or KB), Phase G (CV layer) may need to be pulled forward.
2. **Lovable's platform is sufficient for RideMind's needs.** If Lovable has hard constraints on video file size, fetch timeouts, or API integration patterns that cannot be worked around, the hosting approach may need to change.
3. **Coaching quality is the bottleneck, not distribution.** If riders find the pipeline output useful but distribution is the problem (they don't know RideMind exists), Phase F may need marketing investment, not product investment.
4. **Jake can source 15+ new clips for Phase C.** If clip availability is limited, Phase C may take longer or produce weaker signal.

### Key risks

- **Pipeline API timeout:** ARCH-V2 targets under 90 seconds. Lovable may have shorter fetch timeouts. May require async job queue pattern.
- **Cost per analysis:** At current API rates, cost per analysis is ~$0.40–0.50. At scale this must be within a pricing model that works for riders. Unit economics must be modelled before Phase F pricing is committed.
- **Coaching safety:** Any advice that reproduces a crash is a serious harm. Safety validation (Stage 11) is in place, but no system is perfect. Phase D first-user testing is a critical safety gate.
- **KB coverage gaps:** If Phase C reveals terrain or failure types not covered by the KB, significant KB work may be needed before Phase D. Do not skip Phase C.

---

## Questions for Claude (Chat) to Address

> The following are open questions from the first-draft author (Claude Code). These should be reviewed and answered by Claude (chat) at the start of the next session before any Phase A work begins.

1. **Phase A duration estimate:** Is 4–6 sessions realistic for PASS1-SCHEMA + PASS1-IMPL + PASS2-PROMPT + PASS2-IMPL + Lovable setup + end-to-end test? Or is PASS1-SCHEMA alone a multi-session effort?
2. **Lovable handover brief format:** What does a good Lovable brief look like? Should it specify component structure, or just user flows and data contracts?
3. **Pipeline API design:** How should Pass 1 + Pass 2 + safety be exposed as an API? Synchronous (with timeout risk) or async job queue? What's the recommended pattern for Phase A?
4. **Coach Voice Seed v1:** The v0.2 is held in chat. What are the 9 review items that were addressed? Is there anything in v0.2 that should be flagged before it lands on disk?
5. **Phase C clip sourcing:** Should Phase C clips be Jake's own riding only, or should Jake recruit other riders at this stage? What type of clips would most stress-test the pipeline?
6. **Road map phase ordering:** Is Phase C (novel clips) correctly placed before Phase D (first users)? Or should some Phase D onboarding work run in parallel with Phase C testing?

---

## Related

- `docs/backlog.md` — Lovable Migration phase tasks
- `docs/workflow.md` — team roles and session rituals
- `docs/arch-v2-spec.md` — pipeline architecture being deployed in Phase A
- `docs/adr-lovable-migration.md` — Lovable migration decision
- `docs/adr-cloud-hosting.md` — hosting gap context
