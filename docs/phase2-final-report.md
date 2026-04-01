# RideMind Phase 2 — Final Multi-Model Evaluation Report

## Executive Summary

Phase 2 tested three AI models (GPT-4o, Claude, Gemini 2.5 Flash) across 8 real riding clips covering hill climbs, jumps, descents, crashes, and a successful ride. The testing revealed that **no single model is production-ready**, but each has distinct strengths that map to different pipeline roles. More importantly, the testing exposed fundamental **architecture gaps** that no model combination alone can solve.

**Key verdict:** The path forward is not "pick the best model" — it's "build the right reasoning pipeline and assign each model to the role it does best."

---

## Section 1: Test Matrix & Validated Scoreboard

### Test Clips

| # | Clip | Camera | Scenario | Outcome | Key Test |
|---|------|--------|----------|---------|----------|
| 1 | Colin Hill | 3rd person | Hill climb, rocky | Seated, bail | Body position detection |
| 2 | Clutch Scream Hill | POV | Hill climb, trees | Clutch abuse, tree crash | Decision failure detection |
| 3 | Fall Bulgario | POV | Muddy hill climb | Momentum loss, stuck | Momentum/crash detection |
| 4 | Long Hill | POV | Hill climb, forest | Clean completion | False-failure test |
| 5 | Jimbo Crash | POV (low-res) | Descent, off-camber | Tree impact, traction loss | Low-res traction failure |
| 6 | Mark Crash | 3rd person (4s) | Shale descent + jump | OTB, serious injury | Jump detection, crash type |
| 7 | Nick Crash | 3rd person (distant) | Jumps, open hillside | Crash after 2nd jump | Distant rider visibility |
| 8 | Steep Hill Bail | POV | Steep hill climb, forest | Runs out of room, drops bike | Line choice failure |

### Confidence Note on Scores

The scoring framework evolved during Phase 2. Early clips used fewer metrics; later clips expanded to 12 dimensions. Denominators vary across clips. Scores for clips 2–8 are grounded in the review sessions and cross-checked with an independent assessor. Colin Hill scores verified via cross-check against raw model outputs (2026-04-01).

### Scores by Clip

#### Clip 1 — Colin Hill (3rd person)

Scores verified via cross-check against raw model outputs (2026-04-01).

| Metric | Claude | GPT-4o | Gemini |
|--------|--------|--------|--------|
| Audio | 3 | 3 | 0 |
| Scenario | 4 | 5 | 0 |
| Outcome | 2 | 2 | 0 |
| Terrain & Line | 3 | 3 | 0 |
| Body Position | 5 | 2 | 0 |
| Coaching | 3 | 3 | 0 |
| **Total** | **20/30 (67%)** | **18/30 (60%)** | **0/30 (0%) — hallucinated** |

Key finding: Claude got body position perfect (5/5) — only time across all clips. GPT-4o best scenario classification. Gemini hallucinated an entirely different scene (described a downhill descent with slides and leg extensions). All three missed the bail — shared outcome detection bias.

#### Clip 2 — Clutch Scream Hill (POV)

| | Claude | GPT-4o | Gemini |
|---|--------|--------|--------|
| **Total** | **14/40 (35%)** | **21/40 (53%)** | **28.5/40 (71%)** |

Key finding: Gemini dominated on observation and coaching relevance. Claude and GPT-4o both misidentified the riding partner visible in early frames as the subject rider. Decision failure (choosing wrong line leading to tree crash) was invisible to all models.

#### Clip 3 — Fall Bulgario (POV)

| | Claude | GPT-4o | Gemini |
|---|--------|--------|--------|
| **Total** | **19/50 (38%)** | **18/50 (36%)** | **DNF** |

Key finding: GPT-4o's first total visual refusal. Gemini DNF from upload failure. Claude narrowly best by default. Momentum failure (insufficient entry speed) was not identified as root cause by any model. Claude's outcome detection ("lost momentum, came to a stop") was accidentally close to reality despite wrong scenario framing.

#### Clip 4 — Long Hill (POV, false-failure test)

| | Claude | GPT-4o | Gemini |
|---|--------|--------|--------|
| **Total** | **17/40 (43%)** | **28/40 (70%)** | **28/40 (70%)** |

Key finding: **All three passed the false-failure test** — nobody fabricated a crash. GPT-4o and Gemini tied numerically. GPT-4o had its best scenario classification (5/5) and slightly better balanced coaching. Gemini was stronger on observation and speech transcription (captured rider excitement: "Woohoo!"). Claude classified the scenario as "flat terrain" despite clear uphill footage — its worst misclassification. All models defaulted to criticism on a successful, fun ride rather than calibrating tone to the outcome.

#### Clip 5 — Jimbo Crash (POV, low-res)

| | Claude | GPT-4o | Gemini |
|---|--------|--------|--------|
| **Total** | **13/40 (33%)** | **12/40 (30%)** | **29/40 (73%)** |

Key finding: GPT-4o visual failure for 2nd consecutive clip — confirmed pattern. Gemini outstanding on observation (timestamped, precise impact detection, caught swearing on impact) but got crash mechanism wrong (vision failure vs actual traction failure on off-camber leaves). **Traction-as-cause was invisible to all models** — physics reasoning gap. Claude classified as "obstacle crossing" for the third POV clip running — systematic bias.

#### Clip 6 — Mark Crash (3rd person, 4.6s)

| | Claude | GPT-4o | Gemini |
|---|--------|--------|--------|
| **Total** | **16/40 (40%)** | **10/40 (25%)** | **24/40 (60%)** |

Key finding: **The most dangerous clip for coaching safety.** No model identified the jump at the bottom of the shale descent. No model identified OTB as the crash type. Gemini's coaching prescribed getting weight further back — the exact opposite of the correct fix, which would **reproduce the crash**. GPT-4o's 3rd visual refusal, possibly content-policy triggered by serious injury. Background music invisible to all models.

#### Clip 7 — Nick Crash (3rd person, distant)

| | Claude | GPT-4o | Gemini |
|---|--------|--------|--------|
| **Total** | **14/60 (23%)** | **23/60 (38%)** | **DNF** |

Key finding: GPT-4o's audio rescued it — identified "jump or drop" from sound alone despite zero visual data. Claude fabricated flat trail riding and confident seated body position from a distant jump sequence — "low observability triggered fabricated certainty." Gemini DNF (quota exceeded). Audio insight: when visual signal collapses, audio can preserve event class better than frame-based vision, but cannot reconstruct the full causal chain.

#### Clip 8 — Steep Hill Bail (POV)

| | Claude | GPT-4o | Gemini |
|---|--------|--------|--------|
| **Total** | **13/55 (24%)** | **DNF** | **33/55 (60%)** |

Key finding: Claude interpreted POV footage as a "riderless motorcycle" — fundamental inability to recognise first-person camera perspective. Gemini strong overall but framed the failure as technique (throttle/body position) rather than **line choice**, which was the actual root cause: the rider committed to a dead-end route with no viable exit. GPT-4o DNF (audio file error). **No model detected line choice failure** — this is a higher-order coaching concept entirely missing from the pipeline.

### Cross-Model Summary

#### Approximate Normalised Performance

Approximate normalised performance from the Phase 2 pass suggests Gemini was strongest when operational, GPT-4o was mid-tier but inconsistent, and Claude was weakest qualitatively despite full run reliability. Exact cross-model averages should not be treated as hard final metrics due to the scoring framework evolving during the run.

| Model | Clips Scored | Approximate Avg | Strongest Clip | Weakest Clip |
|-------|-------------|----------------|----------------|--------------|
| Gemini | 5/8 | ~65% | Jimbo Crash (73%) | Mark Crash (60%) |
| GPT-4o | 7/8 | ~42% | Long Hill (70%) | Mark Crash (25%) |
| Claude | 8/8 | ~34% | Long Hill (43%) | Nick Crash (23%) |

#### Operational Reliability

| Model | Successful Runs | DNFs | Visual Failures | DNF/Failure Causes |
|-------|----------------|------|-----------------|-------------------|
| Claude | 8/8 (100%) | 0 | 0 | — |
| GPT-4o | 7/8 (88%) | 1 | 3 visual refusals across 7 runs | Audio file error (1), visual refusal/pipeline failures (3) |
| Gemini | 5/8 (63%) | 3 | 0 | Upload failure (2), quota exceeded (1) |

GPT-4o's visual refusals may be caused by moderation/guardrail behaviour, integration/prompting issues, or pipeline handling problems — not purely model capability limitations. Further investigation needed to isolate the cause.

Gemini operational concerns: 3–5x slower than GPT-4o/Claude per clip, requires 1080p re-encode for large files, free tier cap (20 RPD) unusable for production, MAX_TOKENS truncation on 3 clips.

---

## Section 2: Systematic Failure Patterns

These 10 patterns were repeatedly evidenced across multiple clips and are the core findings of Phase 2.

### 1. Outcome Detection Bias
**Evidence:** Colin Hill (all three initially said "clean" on a bail), Long Hill (correct).
All three models share a bias toward "clean" outcomes. This is a shared systematic bias that model fusion cannot fix — it requires explicit outcome verification in the pipeline.

### 2. Scenario Classification Defaults
**Evidence:** Clutch Scream Hill, Fall Bulgario, Jimbo Crash (Claude defaults to "obstacle crossing" for POV clips).
Claude defaults to "obstacle crossing" for nearly all POV clips regardless of actual scenario. GPT-4o defaults to "obstacle crossing" when visual observation fails. Systematic training bias, not per-clip error.

### 3. POV Camera Blindness
**Evidence:** Steep Hill Bail (Claude saw "riderless motorcycle"), Clutch Scream Hill (Claude/GPT-4o confused riding partner with subject rider).
Claude cannot reliably recognise POV camera perspective. Fundamental perception failure requiring prompt-level or pipeline-level intervention.

### 4. Fabricated Certainty Under Low Observability
**Evidence:** Nick Crash (Claude fabricated seated flat-trail riding from distant jump footage), Steep Hill Bail (Claude saw riderless bike from POV).
When the rider is distant, low-resolution, or obscured, models fabricate confident claims rather than expressing uncertainty. No mechanism exists for assessing confidence based on input quality.

### 5. No Terrain Feature Detection
**Evidence:** Mark Crash (no model saw the jump), Nick Crash (no model saw the tabletop or second jump), Steep Hill Bail (no model identified dead-end route).
No model identified jumps, drops, or discrete terrain features across any clip. Without terrain feature detection, the entire coaching chain collapses.

### 6. No Crash Type Classification
**Evidence:** Mark Crash (OTB misidentified by all three as lowside/cornering/obstacle), Nick Crash (off-angle landing crash missed).
No model distinguished OTB from lowside from highside from traction loss. Crash type determines coaching prescription — getting it wrong can produce dangerous advice.

### 7. No Causal / Failure Type Reasoning
**Evidence:** All 8 clips. Four failure archetypes: momentum failure (Fall Bulgario), decision failure (Clutch Scream Hill), technique failure (Mark Crash), traction limitation (Jimbo Crash). Plus line choice failure (Steep Hill Bail).
The pipeline addresses symptoms rather than root causes. "You lost momentum" is commentary. "You didn't carry enough entry speed for this gradient" is coaching.

### 8. No Event Sequencing
**Evidence:** Nick Crash (tabletop clean → second jump failed → mid-air yaw → off-angle landing → crash), Long Hill (steep entry → sustained climb → flow state).
All models treat clips as single monolithic events. Without multi-event sequencing, the coaching-relevant failure is lost.

### 9. No Line Choice / Route Viability Reasoning
**Evidence:** Steep Hill Bail (rider committed to dead-end route — no model identified this), Clutch Scream Hill (wrong line into trees).
None of the models can reason about route selection or assess whether the rider should have been on that line at all. This is a higher-order coaching concept: "should you be here?" before "how are you executing?"

### 10. No Airborne-State Reasoning
**Evidence:** Nick Crash (mid-air yaw invisible to all), Mark Crash (jump launch sequence misread as cornering by Claude).
Models have no concept of airborne state — takeoff stability, airborne alignment, yaw/pitch/roll, bike attitude, landing angle consequences. Without this, jump clips reduce to "obstacle → crash."

---

## Section 3: Architecture Requirements

### A. Camera Perspective Detection
**Evidence:** Steep Hill Bail, Clutch Scream Hill.
First pipeline step must classify camera perspective (POV, 3rd-person close, 3rd-person distant) and set expectations for what can and cannot be observed.

### B. Observability-Confidence Gating
**Evidence:** Nick Crash, Steep Hill Bail.
Before making confident claims, the system must assess rider size in frame, feature visibility, motion clarity, and camera perspective. When observability is low, confidence must drop automatically.

### C. Terrain Feature Detection Layer
**Evidence:** Mark Crash, Nick Crash, Steep Hill Bail.
A pre-coaching step that identifies discrete terrain features — jumps, drops, berms, ruts, ledges — before the rider reaches them. Not just surface type classification.

### D. Multi-Feature Event Sequencing
**Evidence:** Nick Crash, Long Hill.
The pipeline must represent feature 1 → outcome 1 → feature 2 → outcome 2 explicitly. Single-label summaries lose the actual coaching moment.

### E. Failure Type Ontology
**Evidence:** All 8 clips.
Explicit failure classification step before coaching: momentum failure, decision failure, technique failure, traction limitation, line choice failure. "What type of failure is this?" must be answered before "what should the rider do differently?"

### F. Crash Type Classification
**Evidence:** Mark Crash, Nick Crash.
Structured crash type taxonomy: OTB, lowside, highside, traction loss, stall/tip, obstacle impact. Crash type drives coaching prescription.

### G. Route Viability / Line Continuity Reasoning
**Evidence:** Steep Hill Bail, Clutch Scream Hill.
The system must assess whether the chosen route has a viable exit before coaching technique on that route. A dead-end line is a decision failure, not a technique failure.

### H. Airborne-State Reasoning Domain
**Evidence:** Nick Crash, Mark Crash.
Knowledge and reasoning for takeoff stability, airborne alignment, yaw drift, bike attitude, landing angle consequences.

### I. Coaching Tone Calibration
**Evidence:** Long Hill.
Outcome classification should drive coaching tone. Successful rides get reinforcement-first coaching. Failures get analysis-first coaching. Rider emotional state (from speech transcription) should influence framing.

### J. Coaching Safety as a First-Class Constraint
**Evidence:** Mark Crash (Gemini prescribed the opposite of correct fix).
Before any coaching output is delivered, it must be checked against the failure diagnosis. If the coaching would reproduce or worsen the observed failure, it must be blocked. This is a safety requirement, not a quality preference.

---

## Section 4: Model Role Recommendation

Based on Phase 2 evidence:

| Pipeline Role | Recommended Model | Caveat |
|-------------|------------------|--------|
| Visual observation | Gemini | Only if operational reliability can be solved (paid tier, retry logic, file size handling) |
| Audio / speech analysis | Gemini | Same reliability caveat |
| Event-family support | GPT-4o | Useful when visual observability is poor; audio can rescue event class |
| Coaching generation | None trusted raw | Coaching must come from a structured reasoning layer, not raw model output. No model should generate coaching without the reasoning pipeline above. |

**Claude is not recommended as a primary perception or coaching model** from this test set without heavy scaffolding. It was the most reliable operationally (100% run rate) but consistently produced the weakest quality output and the most dangerous failure modes (fabricated certainty, POV blindness, scenario defaults).

**Critical principle: Architecture over models.** The reasoning gaps (observability gating, event sequencing, terrain features, failure ontology, crash types, route viability) exist above the model layer. Building those structured reasoning steps will improve output quality regardless of which model fills each role.

---

## Section 5: Next Steps

### Immediate
1. **Update project docs** — backlog.md, architecture docs, evaluation framework to reflect Phase 2 findings.

### Architecture Build (Next Phase)
2. **Design the RideMind Reasoning Pipeline v1** — the structured multi-step pipeline:
   - Camera perspective detection
   - Observability assessment
   - Visual observation
   - Audio observation
   - Terrain feature detection
   - Event sequencing
   - Scenario classification
   - Failure type classification
   - Crash type classification (if applicable)
   - Coaching safety check
   - Coaching generation with tone calibration
3. **Migrate knowledge base to queryable database** — already planned, still the right next step. KB needs to be queryable by terrain feature, failure type, and crash type.
4. **Build terrain feature KB** — jumps, drops, berms, ruts, ledges, camber changes as discrete identifiable features with coaching implications.

### Validation (Future Phase)
5. **Re-run the same 8 clips as Phase 3** using the new pipeline architecture. Same clips, same ground truth, same scoring framework. Measures whether architecture improvements close the gaps Phase 2 identified.
6. **Expand test corpus** — 8 clips is enough for architecture discovery but not enough for statistical confidence. Target 20+ clips covering all scenario types.

---

## Appendix: Gemini Operational Risk Register

| Risk | Severity | Mitigation |
|------|----------|------------|
| Upload failures on large files | High | Re-encode to 1080p, retry logic, fallback model |
| 503 Service Unavailable errors | High | Retry with backoff |
| Free tier 20 RPD cap | Critical (blocks production) | Move to paid tier |
| 3–5x slower processing | Medium | Async processing, user expectations |
| MAX_TOKENS truncation (3 clips) | Medium | Increase token budget for classification/observation steps |
