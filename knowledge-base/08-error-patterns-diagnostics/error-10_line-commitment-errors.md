---
topic_id: ERROR-10
title: Line Commitment Errors
domain: Error Patterns & Diagnostics
domain_id: 08
difficulty_range: beginner, intermediate, advanced
related_topics: INTEL-01, INTEL-05, INTEL-08, ERROR-12, TERRAIN-10
prerequisites: INTEL-01, INTEL-05
tags: line, commitment, hesitation, mid-section, change, switch, instability
version: 1.0
last_updated: 2026-03-30
---

# ERROR-10: Line Commitment Errors

## 1. OVERVIEW

A line commitment error occurs when a rider begins a section on a chosen line and then changes that line mid-section. The error is not in having chosen a line — a suboptimal line ridden with full commitment will almost always produce a better outcome than a better line ridden with hesitation and mid-section correction. The error is the change itself. When a bike is set up for a specific line — leaned at a specific angle, loaded in a specific direction, at a specific speed — any sudden deviation from that line requires control inputs that may exceed the available traction, exceed the rider's reaction time, or simply surprise the chassis in a destabilising way.

**CASCADE EFFECTS:** Line commitment errors have terrain-specific cascades. Rut switching mid-descent (the most dangerous sub-type): bike inside a rut → rider decides to leave the rut mid-descent → forced steering input at speed → tyres encounter the rut wall → tyre deflects → bike lurches → rider comes off pegs → crash. Corner line change after apex: rider is on the inside line → decides to go wide at apex → throttle and lean inputs required to change line → traction event from combined correction → runs wide into outside hazard. Obstacle approach line change at last moment: rider commits to a line, sees alternative, switches 2 metres from obstacle → body weight not positioned for new line → under-committed approach → obstacle failed at worst position. The AI coaching engine should detect GPS track deviations from the established line in known sections as a line commitment indicator — a track that deviates mid-section is more likely a commitment error than a deliberate reroute.

Sub-types of line commitment error are important to distinguish. Rut commitment is the highest-risk variant: ruts on descents guide the bike physically — they are channels that require the bike to track their path. Exiting a rut deliberately is difficult and slow; exiting it accidentally (due to a tyre deflection from a commitment error) is fast and violent. Corner line commitment errors are the most common variant: the rider enters with a planned line, the corner tightens unexpectedly, and the rider changes the line mid-apex. Obstacle approach commitment errors are the most variable — sometimes the alternative line is genuinely better, but the timing of the decision (too late) is what makes it an error.

The fundamental coaching principle is: commit before entry, ride the committed line, debrief after. The decision-making phase and the execution phase must be completely separated. During execution, the line is fixed. After execution, the line is reviewed. This does not mean the rider must never adapt — genuine unexpected hazards require adaptation — but the threshold for mid-section line change must be very high, and the change must be executed smoothly rather than suddenly.

## 2. CORE PRINCIPLES

### Principle 1: The Bike Is Set Up for the Committed Line
When a rider selects a line and begins executing it, the bike's dynamics — lean angle, suspension load, weight distribution, throttle level — are calibrated for that line. The physics of the bike "expects" the committed line to continue. A sudden change disrupts all these calibrations simultaneously. The lean angle was appropriate for the original corner radius; the new, tighter line needs more lean — which may not be available. The suspension was loaded for the original surface; the new surface has different characteristics. Every mid-section line change is a physics disruption that the chassis must then absorb.

### Principle 2: Rut Exit Is the Highest-Risk Line Change
Ruts on descents are the most dangerous context for line commitment errors. A bike inside a rut is physically constrained to that path — the rut walls prevent easy exit. The only clean rut exit is a deliberate, carefully timed move at low speed. Any attempt to exit a rut at speed — whether deliberate or accidental — involves the tyres running into the rut wall, which creates a sudden lateral force and possible tyre deflection. The bike lurches in the direction of the rut wall contact. At descent speeds, this lurch is frequently unrecoverable.

### Principle 3: Decision and Execution Are Separate Phases
The decision about which line to ride must be made before entry. Once entry has begun, the execution phase has started and the line is fixed. This is not because line changes are always bad — sometimes the optimal line changes at the last moment — but because the mental bandwidth required to execute the current line and simultaneously plan a new line is beyond what most riders have available, particularly at pace. Attempting both simultaneously degrades both: the execution of the current line suffers because attention is divided, and the new line is not properly planned because attention is divided.

### Principle 4: Adaptation Is Valid When Executed Smoothly and Early
A mid-section line change is not always wrong — an unexpected fallen tree, a sudden deep rut, or another rider blocking the line are legitimate reasons to adapt. The key distinction is: smooth and early vs sudden and late. A smooth early adaptation (beginning 10+ metres from the obstacle) gives the bike time to adjust to the new line. A sudden late adaptation (2 metres from the obstacle) disrupts all the physics simultaneously. The coaching rule is not "never adapt" — it is "decide early and execute smoothly."

### Principle 5: Verbal Pre-Commitment Builds Decision-Before-Entry Habit
The most effective drill for building line commitment is verbal pre-commitment: before entering a section, the rider says out loud exactly which line they will ride. The specific act of verbalising the line before entry forces the decision to be made before the execution phase begins. It also creates accountability — a witnessed commitment — which increases follow-through. Over sessions, the verbal pre-commitment internalises as a mental pre-commitment habit.

## 3. TECHNIQUE BREAKDOWN BY LEVEL

### 3a. Beginner Level
**Goal:** Understand the principle of line commitment and begin making deliberate line decisions before sections — eliminating impulsive mid-section changes.

**Key Focus Areas:**
- Making a deliberate line choice before each section entry
- Understanding why mid-section changes are more dangerous than suboptimal committed lines
- Practising committing to a line even when it is not the best possible line

**What Good Looks Like:**
Before entering a corner, the rider identifies the line they will follow — inside, outside, or middle — and rides that line from entry to exit without deviation. Even if the line is not optimal, it is consistent and predictable. The rider's body position is set for the chosen line before entry.

**Common Mistakes:**
- **Deciding mid-corner:** Rider enters without a specific line chosen and makes the decision while leaned — simultaneously deciding and executing. → The decision must precede the entry. Stop at the approach, pick the line, then ride.
- **Changing line when the corner tightens unexpectedly:** Rider enters wide, corner tightens, rider tries to cut inside. Why it happens: instinct to correct the entry line. → Stay on the original line and accept the wider exit. Deal with it after — then plan the tighter entry on the next pass.
- **Rut switching on descent:** Rider in a rut sees a better-looking rut and tries to move to it. → Commit to the entered rut. Only rut-switch at planned points and at managed speed.

### 3b. Intermediate Level
**Goal:** Build the verbal pre-commitment habit and develop the ability to identify which line to commit to before section entry, including in unfamiliar terrain.

**Progression Markers from Beginner:** Rider no longer makes mid-corner line decisions. Has experienced the difference between a committed line and a hesitated line. Can articulate why commitment produces better outcomes.

**Key Focus Areas:**
- Verbal pre-commitment on every section — name the line before riding it
- Rut commitment on descents — specifically training to stay in the committed rut
- Line selection quality — choosing better lines before entry so that commitment to a good line produces good outcomes

**What Good Looks Like:**
Before a section, the rider says: "I'm going to take the left rut from the top, stay right of the rock step, and apex the corner on the inside." The section is then ridden exactly as described. Afterwards, the debrief evaluates: was the line correct? What would be better next time?

**Common Mistakes:**
- **Verbal commitment followed by silent mid-section deviation:** Rider pre-commits verbally but still changes the line mid-section under pressure. → The verbal commitment has not yet transferred to an automatic override. Continue the verbal drill; add a coach to confirm the line was followed.
- **Committing to a bad line:** Rider commits before entry but has chosen a difficult or dangerous line. → Commitment without good line selection is worse than no commitment. Improve line selection quality alongside commitment habit.
- **Rut hesitation causing involuntary exit:** Rider in a rut is not committed — hesitates on the peg and the bike exits the rut involuntarily. → Commitment includes body position and peg weighting appropriate for the chosen rut.

### 3c. Advanced Level
**Goal:** Automatic line commitment with high-quality line selection — the decision is made early, committed fully, and the debrief is used to improve future selection rather than justify in-section changes.

**Progression Markers from Intermediate:** Verbal pre-commitment is established. Rider rarely deviates mid-section. Can self-report a commitment error accurately when one occurs.

**Key Focus Areas:**
- Race-pace line commitment under time pressure
- Managing unexpected mid-section hazards with smooth early adaptation
- Post-session line analysis — using debrief to improve future selection, not just commitment

**What Good Looks Like:**
On a first pass of an unfamiliar trail, the rider makes deliberate line choices at the approach to each section, commits and rides them consistently, and uses the post-ride debrief to identify which lines were suboptimal and what would be better on the next pass. On the second pass, improved lines are pre-committed and ridden consistently.

**Common Mistakes:**
- **Race-pace commitment degradation:** Under race pressure, line decisions are made too close to entry, compressing the decision phase and increasing mid-section changes. → Practice race-pace riding with specific focus on early line selection.
- **Over-committing to a dangerous line:** Committed rider encounters a line that is clearly beyond capability mid-section. → There is a threshold for genuine danger where stopping or adapting is the correct choice — commitment does not override safety.

## 4. DIAGNOSTIC CUES (AI COACHING ENGINE REFERENCE)

### Visual Cues — Correct Technique
- GPS track or camera line showing consistent path from section entry to exit — no deviation from initial trajectory
- Body position set for the chosen line before entry — lean, weight, and grip already committed
- Smooth, predictable path through ruts — no sudden exits or lateral jumps
- Corner exit tracks the intended line — wide or inside as pre-selected, consistently

### Visual Cues — Error Indicators
- GPS track showing sudden deviation mid-section — commitment error signature
- Bike exiting a rut abruptly — rut switch or involuntary rut exit
- Corner entry on one line transitioning to a different line at or after apex — mid-corner line change
- Rider's body weight shift indicating surprise or correction mid-section — reactive input signature
- Obstacle approach with visible hesitation and direction change at close range — last-moment line change

### Audio Cues
- Sudden chassis clunk mid-descent — rut wall contact from commitment error
- Tyre squeal at unexpected point in corner — line change causing traction event
- Verbal "oh" or sharp intake of breath — rider surprised by outcome of unplanned line change
- Consistent, smooth sound through a section — no sudden inputs indicating committed execution

### Sensor Cues
- GPS track lateral deviation: track deviates from established section path mid-section — commitment error candidate
- IMU sudden steering input rate spike: steering rate above normal for that section speed — reactive correction from line change
- Lean angle sudden change mid-corner: lean angle changes direction (increases then decreases rapidly) — line change forcing chassis adjustment
- Handlebar torque sensor: high torque input at unexpected point in section — forced steering correction from commitment error

## 5. COACHING CUES & LANGUAGE

### Positive Reinforcement
- "You called your line before you went in and you rode exactly what you said. That's line commitment. The section looked clean and controlled."
- "You stayed in that rut all the way down — I could see the temptation to move to the other one, but you held it. That was the right call. Switching at that speed would have been trouble."
- "Good — you made the decision early, committed it, and executed it. Now let's talk about whether the line itself was the best choice. That's a separate question from whether you rode it well."

### Corrective Feedback
- "You went in on the right line and switched to the left line mid-corner. I watched the bike set up for one thing and then suddenly asked to do another. That's where the wobble came from — the bike wasn't ready for the change."
- "You switched ruts halfway down. At that speed, the rut wall hit your tyre and destabilised the rear. That's not a traction problem — that's a commitment problem. Once you're in a rut on a descent, you stay."
- "I want to hear your line out loud before you go into every section we practice today. Tell me what you're going to ride. Then we'll check if you rode it."
- "You saw a 'better' line right at the obstacle and tried to switch 2 metres before it. There's no better line at 2 metres — there's only the committed line and the disrupted line."

### Progression Prompts
- "Next session, I want you to walk every section before riding it. Find the line, mark it mentally, and ride that line. No in-flight decisions."
- "We're going to add a rut-specific drill today. I'll put you in a rut at the top of the descent. Your job is to hold that rut all the way down — no matter what you see in the other ruts."
- "Once verbal pre-commitment is automatic on known terrain, I want you to apply it to new terrain. First pass: walk it, pick your lines, commit verbally, ride. Second pass: refine based on what you found."

## 6. DRILLS & PRACTICE EXERCISES

### Drill 1: Verbal Pre-Commitment
**Purpose:** Build the before-entry decision habit by making line selection a deliberate, audible, observable act.
**Setup:** Any section of trail or a set of cones representing a section. Coach or observer present.
**Execution:**
1. At the approach to each section, the rider stops (or slows significantly) and states out loud: "I will take [specific line description]."
2. The rider then executes the section as described.
3. After the section, the coach confirms: "Did you ride the line you committed to?"
4. If not, identify exactly where the deviation occurred and what caused it.
5. Repeat the section with the same pre-committed line until the deviation is eliminated.
**Success Criteria:** Rider rides the pre-committed line on 10 consecutive sections without deviation. Debrief accurately identifies any deviations.
**Duration/Reps:** Entire session with verbal pre-commitment on every section. 3 sessions.
**Progression:** Reduce the stop-time before commitment — move from a full stop to a slow-speed commitment statement. Eventually to a mental-only commitment.

### Drill 2: Rut Commitment Descent
**Purpose:** Specifically train rut commitment on descents — the highest-risk line commitment context.
**Setup:** A descent with clear, parallel ruts — at least two rut options. Moderate gradient.
**Execution:**
1. Before descending, choose one rut from the top.
2. Commit verbally: "Left rut, full descent."
3. Descend in the chosen rut — do not exit until the bottom.
4. If the temptation to switch ruts appears, acknowledge it and continue in the committed rut.
5. After 5 descents in one rut, switch to the other rut and repeat. Compare the outcomes.
**Success Criteria:** Rider completes 5 consecutive descents in the chosen rut without unplanned exits. Can report which rut produced the better outcome.
**Duration/Reps:** 10 total descents across both ruts. 20 minutes.
**Progression:** Increase gradient. Add a rock mid-rut to increase temptation to exit.

### Drill 3: Suboptimal Line Commitment
**Purpose:** Train the willingness to ride a suboptimal line to completion rather than changing mid-section — building the principle that a committed bad line beats an uncommitted good line.
**Setup:** A corner with at least two identifiable lines — an inside line and an outside line.
**Execution:**
1. Ride the outside (wider) line with full commitment. Note the outcome.
2. Ride the inside (tighter, faster) line with full commitment. Note the outcome.
3. Ride the outside line and deliberately attempt a mid-corner switch to the inside line. Note the disruption.
4. Compare: was the committed outside line smoother than the disrupted switch attempt?
**Success Criteria:** Rider confirms by experience that a committed suboptimal line (outside) produces a smoother result than a disrupted line-change attempt. Can articulate why.
**Duration/Reps:** 3 attempts of each scenario. 15 minutes.
**Progression:** Increase corner speed. Add a loose surface to increase the disruption from the line change.

### Drill 4: Mid-Section Adaptation with Early Detection
**Purpose:** Train the legitimate exception to line commitment — smooth, early adaptation — by practising early detection and smooth re-routing rather than last-moment switches.
**Setup:** A section with a coach who will place a surprise obstacle (cone or log) at a random point within the section before the rider begins.
**Execution:**
1. Rider walks the section with no obstacle. Commits to a line verbally.
2. Coach places obstacle at an unexpected point.
3. Rider begins the section on the committed line.
4. When the obstacle is detected, the rider begins re-routing smoothly — as early as possible after detection.
5. Debrief: how far from the obstacle did the re-route begin? Was it smooth or sudden?
**Success Criteria:** Rider re-routes more than 5 metres from the obstacle on 7 of 10 attempts. Re-routes are smooth (no chassis disruption). Rider can report the distance at which they began the adaptation.
**Duration/Reps:** 10 obstacle placements per session.
**Progression:** Add the obstacle closer to a corner or rut section where the adaptation disruption is more consequential.

## 7. CROSS-REFERENCES & DEPENDENCIES

**This topic connects to:**
- INTEL-01 (Trail Reading Fundamentals): quality line selection depends on effective terrain reading before entry
- INTEL-05 (Line Planning): the skill of planning lines is distinct from committing to them — both are required
- INTEL-08 (Pre-Ride Section Assessment): walking sections before riding is a direct commitment-quality enhancer
- ERROR-12 (Arm Pump Degradation): arm pump degradation increases mid-section line changes because fine steering control is reduced
- TERRAIN-10 (Rut and Channel Navigation): rut commitment is the highest-risk application of line commitment

**This topic is prerequisite for:**
- Race-pace riding: consistent line commitment is required before race speed is safe
- Technical descent riding: rut commitment must be established before technical descent speeds

**This topic builds on:**
- INTEL-01: Terrain reading provides the foundation for quality line selection
- INTEL-05: Line planning techniques are prerequisites for intelligent commitment

## 8. TERRAIN & CONTEXT VARIATIONS

### Ruts on Descents
The highest-risk line commitment context — see Principle 2 and Drill 2. Rut commitment is not optional on steep rut descents; it is the only safe option. Training must specifically address rut descents as a category.

### Sand
Sand surfaces often have multiple line options with similar traction. Line commitment in sand is important because changing lines disturbs the rear wheel's surfing dynamic — a line change in deep sand often causes the rear to dig in. Commit to the line that keeps momentum highest.

### Mud Ruts
Mud ruts are deeper and more constraining than dirt ruts. Exit from a mud rut mid-section is often physically impossible without the bike stopping. Commitment in mud ruts is therefore partly enforced by the terrain — the training goal is building the mental commitment so the rider is working with the rut rather than fighting it.

### Tight Woodland
In tight woodland, the "line" is the gap between trees. Commitment means picking the gap and not adjusting the trajectory toward a different gap mid-section. The target fixation risk (ERROR-07) and line commitment risk compound in woodland — the rider fixates on a tree (ERROR-07) and then tries to switch to a different gap (ERROR-10) too late.

## 9. EXPERT INSIGHTS & SOURCES

### Key Insights
- **Trial riding principle:** In trials, "commitment" is used as an explicit coaching term — once the rider begins a section, the line is fixed. The trials tradition of walking sections before riding is a direct import into enduro coaching: line selection quality is developed on foot, not on the bike.
- **Jonny Walker (Hard Enduro):** Notes that on extreme terrain, the mid-section adaptation option is frequently unavailable — the terrain simply does not allow it. This means the commitment habit that works on easier terrain also protects the rider on extreme terrain where adaptation would be impossible. Building the habit at all levels prepares the rider for the constraints of extreme terrain.
- **MX coaching tradition:** Line commitment is taught explicitly in motocross schooling — riders who "rut swap" mid-moto are corrected immediately because rut swaps in MX are a consistent crash cause. The same principle applies in enduro with added severity because the terrain is less predictable and the ruts are less uniform.
- **Cognitive load and decision-making:** Research on expert vs novice decision-making in motorsport consistently shows that experts make fewer decisions during execution — they make more decisions during the planning phase (approach, preview) and fewer during the action phase. Line commitment is the practical application of this principle.

### Sources & References
- Trials riding training methodology: British Trials Training resources, section walking curriculum
- Jonny Walker coaching content — Red Bull Media extreme terrain technique
- MX coaching: rut commitment training in Gary Bailey and Donnie Emler school curricula
- Cognitive load in motorsport decision-making: applied sport psychology literature — Starkes, J. & Ericsson, A. (expert performance research)
- INTEL-01 and INTEL-05 knowledge base topics — terrain reading and line planning cross-references
- TERRAIN-10 knowledge base topic — rut and channel navigation
