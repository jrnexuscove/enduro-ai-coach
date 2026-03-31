---
topic_id: ERROR-13
title: Loss of Traction Due to Input Mismatch
domain: Error Patterns & Diagnostics
domain_id: 08
difficulty_range: intermediate, advanced
related_topics: DYNAMICS-01, DYNAMICS-02, CORNER-03, ERROR-04, ERROR-09
prerequisites: DYNAMICS-01, CONTROL-04, CONTROL-11
tags: traction loss, input mismatch, combined load, throttle, braking, cornering, traction circle
version: 1.0
last_updated: 2026-03-30
---

# ERROR-13: Loss of Traction Due to Input Mismatch

## 1. OVERVIEW

Input mismatch is not an error of a single control — it is an error of combined inputs that collectively exceed the traction budget available at the tyre contact patch. The traction circle (also called the friction ellipse) describes the total grip budget: at any given moment, the total demand from braking, acceleration, and cornering forces must remain within this budget or traction is lost. The critical insight is that no single input is necessarily the problem — the combination is. A rider can brake safely on a straight. The same rider can corner safely at moderate speed. But braking while cornering simultaneously, on a surface where those combined demands exceed the traction circle budget, produces a traction event even though neither input alone would have caused one.

**CASCADE EFFECTS:** Input mismatch traction events are particularly dangerous because they are compound — the loss itself typically triggers a secondary mismatch. The traction circle model explains why: when the primary event occurs (rear step-out from throttle at lean), the contact patch forces shift abruptly. The rider's reactive correction — counter-steer, brake grab, throttle snap — is itself a rapid input that lands on an already disturbed traction budget. The sequence is: input combination exceeds traction circle budget → traction event (front wash, rear step-out, or simultaneous) → rider makes a reactive correction → the correction is a sudden input → sudden input creates a secondary mismatch on a destabilised contact patch → secondary event is usually more severe than the primary → crash. Examples: throttle at lean exceeds budget → rear steps out → rider counter-steers sharply → counter-steer plus remaining throttle equals compound event → crash. The AI coaching engine should flag traction events where multiple inputs were simultaneously elevated — not just single-input excess — as mismatch candidates. The traction circle model is the diagnostic framework: at the event moment, which combination of inputs occupied what proportion of the available budget? Cross-reference with ERROR-04 (grab braking at lean) and ERROR-09 (early throttle at lean), both of which are single-cause mismatch events that fit within the compound model.

The most common real-world mismatch scenarios in enduro are: throttle while at maximum lean in a corner (ERROR-09 is the most frequent single cause), braking while leaned through a corner entry (ERROR-05 compound form), brief throttle-and-braking overlap during a speed transition, and any combined input on a surface where the traction circle is dramatically smaller than expected — wet rock, ice, mud concealing a hard base. Each scenario involves inputs that would be acceptable individually but collectively exceed the budget.

Sensor-based detection of input mismatch is one of the most promising applications of telemetry in enduro coaching. Combined high throttle position and high lateral G simultaneously constitutes a traction circle overload signature. Combined elevated brake pressure and significant lean angle is a braking-cornering mismatch signature. These compound readings identify the overload event even when neither individual input is at an extreme level — the combination is the diagnostic indicator, which is precisely what makes it detectable by sensor systems and invisible to riders managing single-input awareness. A multi-channel sensor suite logging at 50Hz or above can reconstruct the 2-second pre-event input history, identifying the compound input sequence that preceded the traction event — a capability that is unavailable from video alone and that distinguishes AI-assisted coaching from observational coaching in this specific error domain.

## 2. CORE PRINCIPLES

### Principle 1: The Traction Circle Is the Diagnostic Framework
Every tyre has a finite grip capacity at any given moment — the traction circle. This circle's radius is determined by tyre type and condition, surface type and condition, tyre pressure, and contact patch load. The available grip must be shared simultaneously between cornering force (lateral), braking force (longitudinal deceleration), and drive force (longitudinal acceleration). The traction circle model makes the diagnostic implication concrete: as cornering demand increases toward the budget limit, the remaining available budget for braking and drive shrinks proportionally. Maximum cornering uses nearly all the budget. Any additional braking or throttle input at maximum lean will exceed the circle — traction is lost. This is not a failure of technique judgment; it is a physics outcome. The rider's skill is managing the combined demands to stay within the circle.

### Principle 2: Combined Demands Are Non-Linear
The relationship between combined inputs and traction budget is not simply additive. The friction ellipse (the more accurate shape — traction budgets are typically larger in the longitudinal direction than the lateral direction for typical tyres) means that maximum braking uses less than maximum budget, maximum cornering uses close to maximum budget, and even moderate combined braking-plus-cornering can exceed the budget. This non-linearity is why experienced riders develop feel rather than calculation — the sensitivity to approaching the limit cannot be reliably computed, only felt. Training to develop this feel is the core skill.

### Principle 3: Compound Events Are the Most Common Crash Cause
Simple single-input overloads are relatively rare crash causes because the rider typically feels a single overload developing and backs off before it becomes a crash. Compound mismatch events are more dangerous precisely because no single input feels excessive — each is within the rider's established comfort zone. The combined effect silently exceeds the traction circle without either input individually triggering a warning. This is the mechanism that makes mismatch crashes surprising — and why the traction circle model, once understood, changes what the rider monitors.

### Principle 4: Surface Budget Changes Are Invisible Until Felt
When the surface changes mid-section — from hard-pack to wet rock, from firm gravel to deep mud — the traction circle shrinks instantaneously. An input combination within budget on the previous surface may be far outside the budget on the new surface. Surface reading (identifying changes before riding onto them) is therefore a direct traction mismatch prevention skill. The rider who identifies a surface change 5 metres ahead and reduces inputs before reaching it uses the traction circle model proactively. The rider who discovers the change through a traction event was applying inputs calibrated for the wrong traction circle.

### Principle 5: Approaching the Limit Is Detectable Before Exceeding It
There is a measurable and trainable sensation difference between approaching the traction limit and exceeding it. Approaching the limit: the tyre begins to squirm slightly under load, steering feel becomes slightly vague, the bike requires slightly more input to maintain the intended line. These are the tyre communicating proximity to its circle boundary. Exceeding the limit: sudden step-out or wash, with rapid transition from the warning signal to the event. Training at progressively higher percentages of the limit — on surfaces where the event can be managed safely — builds the proprioceptive sensitivity to the warning signal. This sensitivity is the most effective preventative skill in the traction circle model.

### Principle 6: Recovery Must Be a Single, Smooth Input
When a traction event begins, the recovery input must be singular and smooth. The paradox of the traction circle at the moment of a traction event: the circle is at maximum deformation, the contact patch forces are in transition, and the available budget for a recovery input is smaller than normal. A compound recovery — simultaneously releasing throttle sharply, grabbing brake, and counter-steering — creates a second mismatch on top of the first. Correct recovery: remove the primary excess input smoothly. If the rear steps out from throttle excess, reduce throttle progressively — do not snap it shut, do not add brake, do not steer aggressively. The smooth single-input recovery is designed to work with the traction circle, not against it.

## 3. TECHNIQUE BREAKDOWN BY LEVEL

### 3a. Beginner Level (Foundation — not primary training focus at this level)
Beginners rarely encounter compound mismatch as a diagnostic issue because they do not typically approach the traction limit with any single input, let alone combined inputs. The relevant foundation at beginner level is establishing the conceptual understanding that brake, throttle, and cornering forces all share one tyre and cannot all be at maximum simultaneously. This sets up intermediate-level traction circle training. Beginners who do experience mismatch events are almost always encountering extreme surface budget reduction on features like wet roots or hidden mud — the budget drops below even conservative beginner inputs.

### 3b. Intermediate Level
**Goal:** Build traction circle awareness in practical terms — understanding how combined inputs occupy the budget, developing the approaching-limit feel, and establishing single-input recovery as the default traction event response.

**Key Focus Areas:**
- Understanding the traction circle as a practical tool — not academic theory but a real-time sense of how much budget is being used at any moment
- Corner throttle timing (ERROR-09 prevention) as a specific mismatch avoidance practice: waiting for lean reduction before applying drive
- Surface reading to detect budget changes before riding onto them — 5-metre pre-adaptation habit
- Single-input recovery: smooth throttle reduction as the sole recovery input from a rear step-out

**What Good Looks Like:**
In a corner, the rider waits until the apex before opening throttle — the lean angle has begun to reduce, increasing the available longitudinal budget in the traction circle. On a visible surface change, the rider pre-adapted 5 metres before the transition, reducing lean and speed. When a mild rear step-out occurs, the rider smoothly reduces throttle — no brake, no counter-steer — and the step-out resolves cleanly within a metre.

**Common Mistakes:**
- **Not recognising the approaching-limit feel:** Rider transitions directly from no concern to full traction event without detecting the warning squirm or steering vagueness. → Train at progressively higher percentages of the limit on safe surfaces to build sensitivity to the tyre's pre-event communication.
- **Compound recovery:** Rear steps out, rider simultaneously snaps throttle shut, grabs rear brake, and counter-steers. → Practise single-input recovery deliberately at low speed in controlled conditions until smooth throttle-only recovery is the automatic response.
- **Same input levels across all surfaces:** Rider does not adjust for surface quality changes. The traction circle shrinks on loose or wet surfaces but the rider's inputs remain calibrated for hard-pack. → Surface-specific practice on multiple surface types, developing the habit of reading and adjusting for the traction circle of each surface.
- **Treating the traction circle as binary — safe or crashed:** Many riders have no concept of the approaching-limit zone between safe and traction event. They experience the world as "I had grip" then "I crashed" with no intermediate state. Building awareness of the approaching-limit zone — the squirm, the vagueness, the subtle push — is the primary diagnostic skill development goal at intermediate level.

### 3c. Advanced Level
**Goal:** Continuous real-time traction circle management — dynamically balancing the combined throttle, braking, and lean demands against the available traction budget across all terrain types, speeds, and conditions.

**Progression Markers from Intermediate:** Rider consistently detects the approaching-limit feel on familiar surfaces. Single-input recovery is automatic. Rarely compounds a recovery input. Can describe the traction circle model in practical terms and explain their own traction events using it.

**Key Focus Areas:**
- Dynamic budget management in compound scenarios: ascending corners (throttle plus lean plus uphill load), descending corners (braking plus lean plus downhill load), wet technical terrain (reduced circle with technical demands unchanged)
- Trail braking as a controlled traction circle technique — deliberately carrying brake into corner entry while managing the braking-plus-lean budget within the available circle
- Race-pace traction circle management — maintaining real-time budget awareness at higher speeds where the approaching-limit window is compressed
- Post-traction-event reconstruction: identifying the specific input combination that caused each event using the traction circle model as the analytical framework

**What Good Looks Like:**
On a fast wet corner, the rider simultaneously reduces lean angle, reduces entry speed earlier than on a dry corner, and delays throttle further past the apex than normal. The circle is smaller — all inputs must be proportionally smaller. The rider can explain afterwards: "I reduced lean angle by about 10 degrees and delayed throttle because the wet surface cut my budget. On dry, I could carry the same entry speed and lean and still have drive budget at the apex — on wet, I didn't."

**Common Mistakes:**
- **Budget overconfidence on familiar terrain:** Rider has calibrated their traction circle feel for dry conditions on known trails. When conditions change, the inputs do not change proportionally because the familiar inputs feel normal. → Regular surface-condition variation training — same trails in wet, dry, and soft conditions to build a flexible budget model.
- **Fatigue-induced budget management failure:** Late-session arm pump and general fatigue cause input coarsening (ERROR-12, ERROR-11). Individual inputs exceed their normal levels, pushing the combined demand closer to the budget boundary. Recognise that fatigue reduces both budget management quality and the available reaction time when the limit is approached.

## 4. DIAGNOSTIC CUES (AI COACHING ENGINE REFERENCE)

### Visual Cues — Correct Technique (Traction Circle Management)
- Lean angle visibly reduces before throttle opens at corner exit — cornering demand reduced before drive demand added, managing the circle correctly
- Entry speed visibly adjusted for surface quality — slower on loose or wet surfaces, reflecting reduced traction circle
- Smooth, progressive single-input changes throughout — no simultaneous abrupt multiple-input events visible
- Rear wheel stays planted through corners — longitudinal and lateral demands balanced within the available circle
- Consistent traction across a full section — no chirps, squirms, or step-outs across multiple passes

### Visual Cues — Error Indicators (Traction Circle Exceeded)
- Rear wheel step-out at visible lean angle — lateral and longitudinal demands simultaneously exceeded the circle
- Front wheel wash at corner entry with braking continuing — combined braking and cornering demand exceeded the available budget
- Surface change with no visible rider input reduction — rider did not pre-adapt, budget reduction not acknowledged
- Sudden simultaneous throttle snap and counter-steer — compound recovery creating a secondary mismatch event
- Multiple traction events in the same section on consecutive passes — systematic input timing error, not random variance
- Step-out occurring at a lower speed than expected — surface budget smaller than the rider estimated

### Audio Cues
- Rear tyre spin chirp at audible lean angle in corner — drive demand at lean angle exceeded the traction circle (ERROR-09 + traction circle interaction)
- Front tyre squeal at corner entry with engine note dropping — combined braking-plus-cornering demand exceeded budget
- Sudden silence then impact — traction event with no recoverable recovery window
- Progressive engine note build through corner with clean exit — correct traction circle management, throttle opening proportional to lean reduction

### Sensor Cues
- Combined throttle position (high) + lateral G (high) simultaneously: compound traction circle demand — mismatch candidate flag
- Combined brake pressure (elevated) + lean angle sensor (significant) simultaneously: braking-while-leaned budget overrun
- Rear wheel speed significantly exceeding chassis speed at measured lean angle: drive-induced traction loss at lean angle — traction circle exceeded in longitudinal-plus-lateral quadrant
- Sudden lateral chassis rotation without preceding gradual lean development: rapid traction event onset — budget overrun was instantaneous, consistent with surface change mismatch
- Pre-event signature: throttle position variance plus lateral G variance both elevated in the 2 seconds before a traction event — approaching-limit tyre communication period, detectable as pre-event instability in combined sensor channels

## 5. COACHING CUES & LANGUAGE

### Positive Reinforcement
- "Good budget management on that wet corner — you reduced speed and lean angle before you got there, and the tyre gave you everything it had because you weren't asking for more than its circle allowed. That's the skill."
- "That rear step-out — you took the throttle off smoothly. One input, progressively. The step-out resolved and you kept the bike moving. That's the traction circle recovery working exactly as it should."
- "You read the surface change before you got to it. I watched you back off and stand the bike up slightly 5 metres before the mud. You pre-adapted your inputs for the smaller circle. That's traction circle thinking."

### Corrective Feedback
- "You put the throttle on while you were still at maximum lean — hear that chirp? The tyre's circle was nearly full from cornering load. Adding drive on top of that took it over the edge. In the traction circle, cornering and drive share the same budget. Wait for the apex — let the lean reduce first."
- "When the rear stepped out, you grabbed the brake and snapped the throttle at the same time. Both of those are new inputs into an already overloaded traction circle. They made the recovery worse than the event. One smooth input. Throttle reduction only."
- "The surface changed to wet rock and you kept exactly the same inputs. But wet rock gives you maybe 30% of the traction circle you have on dry gravel. You need to reduce lean, reduce speed, and delay throttle before you reach it — before, not on it."
- "You're treating the traction circle like it's always the same size. It isn't. It changes every time the surface changes, every time it rains, every time you hit loose over firm. You need to read the circle as well as the line."

### Progression Prompts
- "Next session, I want you to specifically practise approaching-limit feel. We'll find a surface where you can get near the limit safely — and I want you to call out the moment you first feel the tyre start to squirm or the steering go slightly vague. That signal is the circle boundary."
- "We're going to work on single-input recovery from rear step-outs at low speed. I'll tell you when to induce a mild step-out deliberately. Your only allowed recovery is smooth throttle reduction — nothing else. Build the reflex to stay inside the circle during recovery."
- "Once the budget concept is solid, I want to work specifically on surface transition detection. We'll ride a section that moves from firm to soft repeatedly. The task is to pre-adapt inputs 5 metres before each transition rather than at it."
- "After each traction event from now on — not crashes, just any step-out or wash — I want you to immediately reconstruct what the traction circle looked like at that moment. What was the lean angle? What was the throttle? Was there any braking? Which combination exceeded the circle? If you can reconstruct the cause in real time, you're developing the in-session diagnostic skill."

## 6. DRILLS & PRACTICE EXERCISES

### Drill 1: Traction Circle Mapping
**Purpose:** Develop a personal, experiential understanding of the traction budget on different surfaces by systematically exploring different input combinations relative to the traction circle — building the proprioceptive feel for the circle's boundary.
**Setup:** A safe open area with at least two surface types — firm gravel and softer dirt, or hard-pack and loose surface.
**Execution:**
1. On firm gravel: ride a moderate arc at consistent speed. Note the lean angle that feels comfortable.
2. At the same lean angle, add moderate throttle. Notice: does the rear begin to squirm? Any reduction in steering precision?
3. At the same lean angle, add light braking. Notice: does the front lose any steering feel? Does the bike push wider?
4. If no event occurs, increase inputs gradually, one at a time, until the first approaching-limit signal appears.
5. Repeat on the softer surface. Note how much earlier the limit approach signal appears.
**Success Criteria:** Rider can describe the different traction circle size on each surface from feel — "the soft surface limit came at about 70% of what firm gravel allows." Can identify the approaching-limit signal on both surfaces.
**Duration/Reps:** 30 minutes total, equal time on each surface type. Multiple sessions across varied surfaces.
**Progression:** Add a wet version of one surface. Add a corner with a surface change mid-corner.

### Drill 2: Single-Input Recovery Training
**Purpose:** Build the smooth single-input recovery reflex for rear step-outs — specifically overcoming the compound recovery instinct that creates secondary mismatch events.
**Setup:** A loose, safe surface with wide open run-out. Low speed — 10–15 km/h only. No obstacles.
**Execution:**
1. In a gentle arc on a loose surface, apply enough throttle to induce a mild controlled rear step-out.
2. When the step-out occurs: the only permitted recovery input is smooth throttle reduction — not rapid, smooth.
3. No braking, no counter-steer, no body movement change — throttle reduction only, progressively.
4. Confirm: does the step-out resolve with smooth throttle reduction alone?
5. Repeat 10 times. Each repetition, focus on making the throttle reduction smoother and the response faster.
**Success Criteria:** Rider recovers cleanly from a controlled mild rear step-out using smooth throttle reduction alone on 8 of 10 attempts. No secondary input added on any attempt.
**Duration/Reps:** 15 minutes per session. Low speed maintained throughout. Multiple sessions.
**Progression:** Increase the induced step-out severity slightly. Move to a different surface type. Increase speed gradually once recovery is reliable at low speed.

### Drill 3: Surface Change Pre-Adaptation
**Purpose:** Train the habit of detecting surface changes before reaching them and pre-adapting inputs to the new traction circle — preventing mismatch from surface budget transitions.
**Setup:** A section with a clear, identifiable surface change — firm to loose, or dry to wet. The change should be visible 5–10 metres in advance.
**Execution:**
1. Ride the section at moderate pace without deliberate adjustment. Note: at which point did the surface change? Was the traction circle change felt before or after the transition?
2. After the first pass, identify the transition point precisely.
3. On subsequent passes, begin reducing lean angle and throttle 5 metres before the transition.
4. Note: does the bike feel more stable through the changed surface when inputs were pre-reduced?
5. On later passes, try adjusting at 7 metres, then 10 metres — earlier detection equals more preparation.
**Success Criteria:** Rider pre-adapts inputs consistently from 5 metres before the transition on 5 consecutive passes. No traction events on any pre-adapted pass. Transition feels smooth rather than unsettling.
**Duration/Reps:** 10 passes. 20 minutes. Repeat on unfamiliar sections.
**Progression:** Add a second surface change further into the section. Move to unfamiliar terrain where the change must be detected from visual cues rather than section memory.

### Drill 4: Budget Awareness Corner Progression
**Purpose:** Progressively explore the traction circle in a corner to develop proprioceptive feel for the approaching-limit signal — the tool that enables pre-event correction rather than post-event recovery.
**Setup:** A consistent corner on a known surface with a safe exit. Coach or observer present.
**Execution:**
1. Ride the corner at 60% of perceived ability. Note: how much budget headroom does this feel like?
2. Increase to 70% — add slightly more lean or slightly more exit throttle, not both simultaneously.
3. Increase to 80%. Note the first signs of the approaching-limit feel in the traction circle: slight squirm, slight steering vagueness, slight increase in effort to hold the line.
4. Report the approaching-limit signal out loud when first detected. Do not increase further once it appears.
5. Hold at this level for 3 passes to confirm the detection is reliable and repeatable.
**Success Criteria:** Rider identifies and verbally reports the approaching-limit signal before a traction event occurs. Reproduces the identification reliably across three consecutive passes. Can distinguish the approaching-limit signal from within-budget riding feel.
**Duration/Reps:** 10–15 passes at progressive percentages. 20–25 minutes. Multiple sessions.
**Progression:** Move to an unfamiliar corner. Introduce a slight surface change mid-corner. Replicate on a wet version of the same corner to experience the reduced traction circle.

## 7. CROSS-REFERENCES & DEPENDENCIES

**This topic connects to:**
- DYNAMICS-01 (Tyre Dynamics and Traction): the physics foundation — traction circle and how tyres generate and limit force
- DYNAMICS-02 (Combined Load Dynamics): the specific dynamics of compound inputs and their effect on the traction budget
- CORNER-03 (Corner Exit Technique): throttle-at-lean mismatch is the primary corner exit traction event in enduro
- ERROR-04 (Panic Braking): grab braking at lean angle is a specific braking-cornering traction circle event
- ERROR-09 (Poor Throttle Timing): early throttle in corner is the most common single-cause mismatch trigger

**This topic is prerequisite for:**
- Advanced cornering: managing the full traction circle is required for fast, consistent cornering on varied surfaces
- Trail braking: controlled compound input (brake plus lean) requires robust traction circle budget awareness before it can be applied safely

**This topic builds on:**
- DYNAMICS-01: Tyre dynamics and the traction circle provide the physics foundation
- CONTROL-04: Throttle control fundamentals — the primary single input in most mismatch events
- CONTROL-11: Braking technique — the second most common input in compound mismatch scenarios

## 8. TERRAIN & CONTEXT VARIATIONS

### Wet Rock
The most extreme traction circle reduction scenario in enduro. Wet rock surfaces can reduce the available budget to 20–30% of dry hard-pack. Any compound input on wet rock is immediately at or beyond the circle boundary. Single inputs must be significantly reduced — lean angle, throttle, and braking all at much lower levels than dry conditions. The only safe approach is extremely slow, deliberate, single-input riding with inputs separated in time as much as possible to avoid compound loading.

### Mud Over Hard-Pack
Mud provides a variable traction circle — where the mud is deep, the circle is very small; where the hard-pack underneath is accessible, the circle is moderate. The variability makes compound inputs unpredictable because the budget changes between steps. Conservative compound inputs and rapid readiness to reduce any input when the circle drops unexpectedly are the specific management responses.

### High-Speed Rocky Terrain
At high speed, the approaching-limit signal window is compressed — the time between the first squirm and the step-out is shorter at 60 km/h than at 30 km/h. Input combinations manageable at moderate speed become mismatch scenarios at race pace because the rider's reaction time represents a larger fraction of the available response window. Training at race pace with traction circle focus is the specific intervention — simply riding faster does not build the compressed-window detection skill.

### Loose Over Firm (Marbles)
Loose gravel over a firm base is particularly dangerous for input mismatch because the surface initially feels firm — the rider calibrates inputs for the larger firm-surface traction circle — but the loose layer slides laterally, providing much less lateral grip than the surface feel suggests. The mismatch occurs because the rider's inputs were calibrated for the perceived traction circle, not the actual one. Treating any loose-surfaced section as a reduced-circle environment regardless of feel is the appropriate conservative default.

### Root and Wooden Surfaces
Roots and wooden bridges in wet conditions approach wet-rock levels of traction circle reduction — polished wet wood can provide near-zero lateral grip. The danger specific to root sections is that the traction circle changes with every tyre placement: rock patch, then root, then mud between roots. The budget is not constant within a single section — it varies contact-patch by contact-patch. The correct model is not one traction circle for the section but a rapidly changing circle that the rider must continuously update. Single inputs at low magnitudes with maximum smoothness are the only safe strategy on mixed root and mud surfaces.

### Ascending Corners (Uphill Turns)
Uphill cornering modifies the traction circle in a specific way — weight transfers rearward on the ascent, increasing rear tyre load and rear grip, while reducing front tyre load. This shifts the ellipse: more rear budget is available, less front budget. The common mismatch on ascending corners is heavy front braking into the turn — the reduced front budget is exceeded quickly. The correct adjustment is to rely more on rear braking before the corner and to avoid front braking at lean on an ascent.

## 9. EXPERT INSIGHTS & SOURCES

### Key Insights
- **Traction circle as the diagnostic framework:** The traction circle (friction ellipse) is the foundational model for combined tyre force analysis. Formalised in vehicle dynamics research by Milliken & Milliken (1995) for four-wheeled vehicles, it has been adapted for motorcycle coaching at the professional level. Its application to off-road riding is less formalised than circuit racing but the physics is identical. Every compound traction event in enduro is explainable using this model — the framework's power is that it makes a previously opaque event (why did that cause a crash when neither input seemed extreme?) analytically transparent.
- **Input mismatch as primary compound crash cause:** Analysis of off-road crash footage consistently identifies compound input mismatch as the cause in cases where no single input appeared excessive. The combination is the diagnostic — a finding supported by both coaching observation and physics analysis from multiple enduro coaching programs.
- **Elite rider perspective on traction feel:** Professional enduro and hard enduro riders describe their highest-level skill as "feeling the budget" — a continuous, real-time proprioceptive awareness of how much of the traction circle is occupied at any moment. Graham Jarvis and Jonny Walker both describe this feel in interviews as built over years of deliberate riding on diverse surfaces, not through analytical calculation during riding.
- **Sensor validation of compound detection:** The feasibility of detecting compound input mismatch from sensor data has been demonstrated in high-level motorsport — combined throttle position, lateral G, and lean angle data is used in MotoGP and rally racing to identify at-limit events. The same sensor combination applied to enduro coaching represents a near-future capability for AI-based mismatch detection that does not require video analysis.
- **Pre-event sensor signature:** The 2-second window before a traction event shows elevated variance in both throttle position and lateral G simultaneously — a detectable compound instability signature in sensor data. This pre-event pattern is the sensor equivalent of the approaching-limit feel described by elite riders.
- **Tyre pressure and traction circle size:** Tyre pressure directly affects the size and shape of the traction circle. Under-inflated tyres deform more under lateral load, initially increasing the contact patch and lateral grip but degrading progressively under sustained load and heat — the traction circle becomes unpredictably variable. Over-inflated tyres reduce the contact patch, shrinking the traction circle and making both longitudinal and lateral limits lower. For enduro, tyre pressure is a traction circle management variable — lower pressures for rocky terrain increase compliance and grip, but the rider must account for the different traction feel compared to higher pressures.
- **Surface reading as a traction circle prediction skill:** The most practical interpretation of the traction circle for riders who are not thinking in physics during riding is: the smoother and harder the surface, the more you can ask from the tyre; the rougher, looser, or wetter the surface, the less you can ask. Surface reading (INTEL-04) is therefore a direct traction circle prediction skill — the rider who accurately predicts the traction circle of the upcoming surface and calibrates inputs accordingly is implementing the traction circle model without consciously invoking it.

### Sources & References
- Traction circle physics: Milliken, W. & Milliken, D. "Race Car Vehicle Dynamics" (adapted for motorcycle application)
- Motorcycle tyre dynamics: Cossalter, V. "Motorcycle Dynamics" — tyre force and traction budget modelling
- Off-road crash analysis: ISDE safety committee observations and FIM safety research findings
- Elite rider perspective: Graham Jarvis and Jonny Walker interview content on traction feel and limit sensing
- Sensor application in motorsport: MotoGP telemetry analysis — combined input detection methodology
- DYNAMICS-01 knowledge base topic — tyre dynamics and traction circle fundamentals
- Rally and enduro data analytics: emerging sensor application literature in competitive off-road motorsport
- Tyre pressure and contact patch dynamics: Michelin and Pirelli off-road tyre technical documentation
- Ascending corner weight transfer and traction ellipse: adapted from motorcycle dynamics modelling literature
- Traction event reconstruction methodology: multi-channel sensor pre-event analysis — AI coaching engine design
- Surface reading as traction circle prediction: INTEL-04 knowledge base topic cross-reference
- Traction circle in off-road coaching: Jimmy Lewis and Bret Tkacs applied coaching frameworks
