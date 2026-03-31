# RideMind Phase 2 — Multi-Model Evaluation Framework

## Objective

Validate model performance across 8 riding clips to determine task-level strengths per model, consistency across scenarios, and whether a multi-model fusion architecture is justified.

## Test Matrix

8 clips × 3 models = **24 scored runs**

---

## Ground Truth Reference

| # | Clip | Camera | Scenario | Surface | Outcome | Body Position | Key Test | Audio Notes |
|---|------|--------|----------|---------|---------|---------------|----------|-------------|
| 1 | colin hill | 3rd person | Hill climb | Rocky/shale | Bail midway | Seated entire time, never stands | Body position accuracy | Engine revving, wheel spin |
| 2 | clutch scream hill | POV helmet | Hill climb | Leafy forest | Wrong turn → hits tree → falls | NOT VISIBLE (POV) | Audio analysis (clutch abuse) | Clutch screaming, high RPM |
| 3 | Fall bulgario muddy hill 1 | POV helmet | Muddy hill climb | Mud/slippery | Falls near top, momentum loss | NOT VISIBLE (POV) | Momentum/crash detection | Engine note changes |
| 4 | jimbo crash | POV helmet, low res | Descent through trees | Forest trail | Hits tree with headlight, swears | NOT VISIBLE (POV) | Impact detection, low quality | Swearing, impact sound |
| 5 | long hill | POV helmet | Long sustained hill climb | Mixed trail | Clean completion | NOT VISIBLE (POV) | Must NOT report false failures | Over-clutching sounds |
| 6 | nick crash | 3rd person, very distant | Jumps on open hillside | Grass/open | Crash after jumps | Standing (distant, minimal detail) | Distant rider visibility | Minimal audio useful |
| 7 | steep hill bail in trees | POV helmet | Steep hill climb | Bare forest floor | Runs out of room, drops bike | NOT VISIBLE (POV) | Line choice failure detection | Engine struggling |
| 8 | Mark crash | 3rd person, close | Descent into jump | Open terrain | Over-handlebars crash | Visible but brief (4 sec clip) | Crash detection speed | Background music in audio |

### Camera Type Distribution
- **3rd person** (body position testable): colin hill, nick crash, Mark crash
- **POV helmet** (body position NOT visible): clutch scream hill, Fall bulgario, jimbo crash, long hill, steep hill bail

---

## Scoring Rubric — Two Profiles

POV and 3rd-person clips test fundamentally different capabilities, so each has its own scoring profile that focuses only on what that camera type reveals.

---

### PROFILE A: 3rd-Person Clips (colin hill, nick crash, Mark crash)

These clips show the rider externally. They test visual perception: body position, technique form, crash detection from an observer's viewpoint.

**Core Metrics (scored 0–5)**

**A1. Body Position Accuracy**
- 5 = Correctly identifies position for every visible moment, including transitions
- 4 = Mostly correct, minor misread on 1 frame/moment
- 3 = Gets dominant position right but misses transitions or changes
- 2 = Partially correct — mentions the right position but also claims wrong ones
- 1 = Mostly wrong — e.g., says standing when rider is clearly seated
- 0 = Completely wrong or fabricated

**A2. Scenario Classification Accuracy**
- 5 = Correct terrain, direction, context, and difficulty assessment
- 4 = Correct terrain and direction, minor context error
- 3 = Gets terrain right but direction or difficulty wrong
- 2 = Partially correct — gets one major element right
- 1 = Mostly wrong classification
- 0 = Completely wrong (e.g., calls a hill climb a descent)

**A3. Outcome Detection Accuracy**
- 5 = Correctly identifies outcome AND timing (when it happens in the clip)
- 4 = Correct outcome, timing slightly off
- 3 = Gets general outcome right but misses specifics (e.g., "stopped" but not "bailed")
- 2 = Partially correct — detects something happened but mischaracterises it
- 1 = Misses the key outcome event entirely
- 0 = Reports opposite outcome (e.g., "clean completion" when rider crashed)

**A4. Rider Visibility Handling**
- 5 = Accurately describes what's visible AND flags what's unclear (e.g., distant rider, partial obstruction)
- 4 = Good detail, minor assumptions on unclear moments
- 3 = Reasonable but doesn't acknowledge visibility limits (e.g., nick crash is very distant)
- 2 = Makes confident claims about things that are hard to see at this distance/angle
- 1 = Ignores visibility constraints entirely
- 0 = Fabricates detail that isn't visible

**A5. Coaching Quality**
- 5 = Specific to this clip, references correct techniques, actionable drills, correct KB usage
- 4 = Good specificity, mostly correct technique references
- 3 = Reasonable coaching but some generic advice mixed in
- 2 = Mostly generic — could apply to any riding clip
- 1 = Generic AND incorrect technique references
- 0 = Harmful advice or completely irrelevant coaching

**3rd-Person Perception Average** = average of A1 + A2 + A3

**DEPENDENCY RULE:** If 3rd-person perception average < 2.5, coaching (A5) is capped at 2. Coaching built on wrong observations is wrong coaching, even if it reads well.

**Secondary Metrics (categorical)**
- Hallucination Rate: None / Low / Medium / High
- Confidence Calibration: Well-calibrated / Over-confident / Under-confident / None expressed
- Chronological Accuracy: Accurate / Mostly accurate / Confused / N/A (short clip)
- Specificity: Specific / Mixed / Generic
- Observation Consistency: Consistent / Minor contradiction / Major contradiction

---

### PROFILE B: POV/Helmet Cam Clips (clutch scream hill, Fall bulgario, jimbo crash, long hill, steep hill bail)

These clips show the rider's perspective. Body position is NOT visible. They test audio analysis, terrain reading, line choice assessment, outcome detection from subjective view, and whether the model understands the limits of what it can see.

**Core Metrics (scored 0–5)**

**B1. Audio Analysis Quality**
- 5 = Correctly identifies engine behaviour, clutch use, impact sounds, and links them to riding events
- 4 = Good audio identification, minor misread on one element
- 3 = Picks up some audio cues but misses key ones (e.g., obvious clutch abuse)
- 2 = Superficial audio observations — "engine sounds" without specifics
- 1 = Audio analysis present but largely wrong
- 0 = No meaningful audio analysis or completely fabricated

**B2. Scenario Classification Accuracy**
- 5 = Correct terrain, direction, context, and difficulty assessment
- 4 = Correct terrain and direction, minor context error
- 3 = Gets terrain right but direction or difficulty wrong
- 2 = Partially correct — gets one major element right
- 1 = Mostly wrong classification
- 0 = Completely wrong (e.g., calls a hill climb a descent)

**B3. Outcome Detection Accuracy**
- 5 = Correctly identifies outcome AND timing (when it happens in the clip)
- 4 = Correct outcome, timing slightly off
- 3 = Gets general outcome right but misses specifics (e.g., "stopped" but not "fell")
- 2 = Partially correct — detects something happened but mischaracterises it
- 1 = Misses the key outcome event entirely
- 0 = Reports opposite outcome (e.g., "clean completion" when rider crashed)

**B4. Terrain & Line Reading**
- 5 = Correctly reads terrain features, surface conditions, obstacles, and the line the rider takes through them
- 4 = Good terrain reading, minor miss on one element
- 3 = Gets terrain type right but misses surface detail or line choice
- 2 = Vague terrain description — "off-road" without specifics
- 1 = Terrain description largely wrong
- 0 = No terrain detail or fabricated conditions

**B5. POV Awareness**
- 5 = Explicitly states what it cannot determine from this angle (body position, technique form). Focuses analysis on what IS visible: terrain, line, obstacles, speed, outcome
- 4 = Mostly respects POV limits, one minor unsupported claim
- 3 = Some appropriate restraint but still guesses at things not visible
- 2 = Occasionally claims to see body position or technique form
- 1 = Regularly claims to see rider body despite POV angle
- 0 = Analyses as if viewing externally — describes body position, stance, posture from a helmet cam

**B6. Coaching Quality**
- 5 = Specific to this clip, appropriate for POV context (focuses on throttle, clutch, line choice, speed — not body position)
- 4 = Good specificity, mostly appropriate coaching targets for what's visible
- 3 = Reasonable but includes some coaching on things it can't verify from POV (e.g., "stand up more")
- 2 = Mostly generic or coaches on invisible elements
- 1 = Generic AND coaches on things not visible
- 0 = Harmful advice or completely irrelevant

**POV Perception Average** = average of B1 + B2 + B3

**DEPENDENCY RULE:** If POV perception average < 2.5, coaching (B6) is capped at 2.

**Secondary Metrics (categorical)**
- Hallucination Rate: None / Low / Medium / High
- Confidence Calibration: Well-calibrated / Over-confident / Under-confident / None expressed
- Chronological Accuracy: Accurate / Mostly accurate / Confused / N/A (short clip)
- Specificity: Specific / Mixed / Generic
- Observation Consistency: Consistent / Minor contradiction / Major contradiction

---

### Cross-Profile Comparison Notes

The shared metrics (scenario classification, outcome detection, coaching quality) can be compared directly across both profiles. The profile-specific metrics tell you different things:
- 3rd-person profile reveals: Can the model see a rider accurately? (body position, technique form)
- POV profile reveals: Can the model hear and interpret context? (audio analysis, terrain reading, self-awareness of limits)

---

## Per-Run Output Templates

### Template A: 3rd-Person Clips

```
=== PHASE 2 EVALUATION (3RD PERSON) ===
Clip:           [clip name]
Model:          [GPT-4o / Gemini / Claude]
Camera Type:    3rd person
File:           [output filename]
Date:           [timestamp]
Runtime:        [seconds]

--- CORE SCORES (0-5) ---
A1. Body Position:            [0-5]
A2. Scenario Classification:  [0-5]
A3. Outcome Detection:        [0-5]
A4. Rider Visibility Handling:[0-5]
Perception Average:           [avg of A1+A2+A3]
A5. Coaching Quality:         [0-5, capped at 2 if perception avg < 2.5]

--- SECONDARY SCORES ---
Hallucination Rate:      [None / Low / Medium / High]
Confidence Calibration:  [Well-calibrated / Over / Under / None]
Chronological Accuracy:  [Accurate / Mostly / Confused / N/A]
Specificity:             [Specific / Mixed / Generic]
Consistency:             [Consistent / Minor / Major]

--- KEY ERRORS ---

[specific error description]
[specific error description]

--- NOTABLE STRENGTHS ---

[specific strength]
[specific strength]

--- FAILURE PATTERN TAGS ---
[from: default-standing, direction-confusion, missed-crash, missed-bail, false-success, hallucinated-event, generic-coaching, wrong-terrain, confidence-mismatch, self-contradiction]

--- VERDICT ---
[Pass / Partial / Fail]

--- PRODUCTION USABILITY ---
[Usable / Needs correction / Not usable]
(Usable = no critical hallucinations + outcome correct + scenario mostly correct)
```

### Template B: POV/Helmet Cam Clips

```
=== PHASE 2 EVALUATION (POV) ===
Clip:           [clip name]
Model:          [GPT-4o / Gemini / Claude]
Camera Type:    POV helmet
File:           [output filename]
Date:           [timestamp]
Runtime:        [seconds]

--- CORE SCORES (0-5) ---
B1. Audio Analysis Quality:  [0-5]
B2. Scenario Classification: [0-5]
B3. Outcome Detection:       [0-5]
B4. Terrain & Line Reading:  [0-5]
B5. POV Awareness:           [0-5]
Perception Average:          [avg of B1+B2+B3]
B6. Coaching Quality:        [0-5, capped at 2 if perception avg < 2.5]

--- SECONDARY SCORES ---
Hallucination Rate:      [None / Low / Medium / High]
Confidence Calibration:  [Well-calibrated / Over / Under / None]
Chronological Accuracy:  [Accurate / Mostly / Confused / N/A]
Specificity:             [Specific / Mixed / Generic]
Consistency:             [Consistent / Minor / Major]

--- KEY ERRORS ---

[specific error description]
[specific error description]

--- NOTABLE STRENGTHS ---

[specific strength]
[specific strength]

--- FAILURE PATTERN TAGS ---
[from: direction-confusion, missed-crash, missed-bail, false-success, hallucinated-event, generic-coaching, audio-ignored, pov-body-claim, over-clutch-missed, wrong-terrain, confidence-mismatch, self-contradiction]

--- VERDICT ---
[Pass / Partial / Fail]

--- PRODUCTION USABILITY ---
[Usable / Needs correction / Not usable]
(Usable = no critical hallucinations + outcome correct + scenario mostly correct)
```

---

## Failure Pattern Tags (standardised)

Use these tags consistently across all 24 runs so patterns can be aggregated:

| Tag | Meaning |
|-----|---------|
| default-standing | Claims standing when sitting or without evidence |
| direction-confusion | Confuses uphill vs downhill |
| missed-crash | Fails to detect crash/fall/bail |
| missed-bail | Detects struggle but not the bail/stop |
| false-success | Reports clean completion when rider failed |
| hallucinated-event | Describes something that didn't happen |
| generic-coaching | Coaching not specific to this clip |
| audio-ignored | Audio doesn't contribute to coaching |
| pov-body-claim | Claims body position from POV cam (impossible) |
| over-clutch-missed | Fails to detect clutch abuse in audio |
| wrong-terrain | Misidentifies terrain type |
| confidence-mismatch | High confidence on wrong observations |
| temporal-disorder | Events out of sequence |
| self-contradiction | Contradicts own observations |

---

## Model-Specific Evaluation Focus

### GPT-4o (test-coaching-kb.ts)
- Still frames + audio extraction
- Watch for: Default standing bias, hallucinated events from ambiguous frames
- Strength hypothesis: Scenario classification, coaching synthesis
- Known Phase 1 issue: Said standing when seated, missed bail, claimed clean completion

### Gemini (test-coaching-gemini.ts)
- Raw video input (can see motion)
- Watch for: Direction confusion, truncated outputs
- Strength hypothesis: Timeline understanding, event detection, momentum reading
- Known Phase 1 issue: Wrong direction, output truncation

### Claude Vision (test-coaching-claude.ts)
- Still frames (Claude vision) + audio (GPT-4o audio)
- Watch for: Scenario misclassification, missed outcomes
- Strength hypothesis: Body position accuracy (got seated correct in Phase 1)
- Known Phase 1 issue: Wrong scenario classification, missed bail

---

## End-of-Phase-2 Deliverables

### 1. Results Matrices (two CSVs)
**scoring-3rd-person.csv** — 9 runs (3 clips × 3 models). Scored on body position, scenario, outcome, rider visibility, coaching.
**scoring-pov.csv** — 15 runs (5 clips × 3 models). Scored on audio analysis, scenario, outcome, terrain/line reading, POV awareness, coaching.

### 2. Model Strength Map
Aggregated averages per model, split by profile.

### 3. Failure Pattern Summary
Count of each failure tag per model.

### 4. Architecture Recommendation
Based on evidence: single model vs multi-model vs fusion pipeline. Must reference specific scores and patterns.

---

## Post-Analysis Calculations (derive AFTER scoring all 24 runs)

These metrics are calculated from the completed scoring matrix, not scored per-run.

**Reliability % (per model)**
Count runs where: no High hallucinations AND outcome score >= 3 AND scenario score >= 3. Divide by total runs for that model. This is your production readiness signal.

**Complementarity Score (per clip)**
For each clip, compare model outputs. Count clips where at least one model gets it right when others don't. High complementarity = strong case for fusion.

**Cross-Model Agreement vs Truth**
When models agree, are they right? Track agreement rate AND agreement-accuracy rate separately. Shared bias is the most dangerous finding because fusion won't fix it.

**Weighted Total Score (per model)**
Perception (body position + scenario + outcome) at 70%, Coaching at 30%. Calculate both weighted and unweighted totals.

**Critical Error Rate (per model)**
Count failure tags: missed-crash, false-success, pov-body-claim, hallucinated-event. These matter more than minor issues.

**Cost/Performance Ratio**
Average runtime per model from captured data.

---

## Testing Principles

1. **Separate observation from coaching** — score steps 1-3 (perception) separately from step 4 (coaching).
2. **Allow "unknown" as valid output** — penalise hallucinations more heavily than uncertainty. A model that says "I can't determine body position from this angle" scores higher than one that guesses wrong.
3. **Score against ground truth only** — not "sounds good" but "is factually correct."
4. **Focus on consistency** — a model that's usually right beats one that's occasionally perfect.
5. **POV clips test different things** — audio, scenario, outcome, coaching. Not body position.
