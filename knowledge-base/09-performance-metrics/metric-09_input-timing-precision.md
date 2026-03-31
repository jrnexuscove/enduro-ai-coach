---
topic_id: METRIC-09
title: Input Timing Precision
domain: Performance Metrics & Scoring
domain_id: 09
difficulty_range: beginner, intermediate, advanced
related_topics: CONTROL-04, CONTROL-11, CORNER-03, ERROR-09, METRIC-01
prerequisites: CONTROL-04, CONTROL-11, CORNER-03
tags: timing, precision, input, throttle, brake, apex, metric, accuracy
version: 1.0
last_updated: 2026-03-30
---

# Input Timing Precision

## 1. OVERVIEW

Input Timing Precision (ITP) measures whether control inputs — throttle, brakes, clutch — are applied at the correct moment relative to specific terrain features and ride geometry. Smoothness (METRIC-01) captures the quality of how inputs are made; timing captures the precision of when they are made. A smooth throttle input applied five metres too early is still a timing error that will cause problems — the bike is accelerating through a corner while still at significant lean angle, exceeding the lateral traction budget. A smooth brake application initiated too late causes a rushed braking event that requires higher pressure to achieve the same deceleration. Timing errors are among the most persistent and hardest to self-diagnose technique faults — the input feels correct because the execution itself is smooth, but the relative timing to the terrain feature is wrong. ITP is best measured from video with known landmark references (corner apex, obstacle position, surface change boundary) by correlating the input timestamp to the landmark geometry. Sensor-based timing analysis uses throttle position timestamps correlated with GPS position data. The ITP score represents the percentage of timed inputs that fall within the correct window for the terrain feature.

## 2. CORE PRINCIPLES

### Principle 1: Timing Is Relative to Terrain Features, Not Absolute Time
Input timing cannot be evaluated in isolation — it is always relative to a terrain reference. "Throttle on at the apex" means throttle application begins when the front wheel is at the apex point of the corner — this is the correct timing reference, not a specific elapsed time after the last input. "Braking starts before the corner" means braking begins at a distance from the corner entry sufficient to complete deceleration to entry speed before turn-in — again, a terrain-relative reference. The coaching engine must identify terrain landmarks from GPS and video before timing analysis is possible.

### Principle 2: Early Input Errors Are More Common Than Late Input Errors
Most riders' timing errors are early: early throttle (rolling on before the apex), early brake release (releasing brakes before they are fully in the corner geometry), early turn-in (initiating the corner arc before the correct point). Early errors are driven by anxiety — the brain anticipates the next action before the terrain moment has arrived. Late errors (late braking, late throttle) occur when the rider fails to read terrain far enough ahead and is reacting rather than anticipating. Both error directions are diagnosed by ITP, and both have different root causes and different coaching prescriptions.

### Principle 3: Throttle Timing at the Apex Is the Most Critical Single Reference
Among all timing references in off-road riding, throttle application at the corner apex is the most important. The apex is the point of maximum lean angle (or maximum inside positioning) where the arc begins to open — it is geometrically the correct moment to begin increasing speed because from this point the arc opens and traction budget for acceleration grows. Throttle before the apex tries to accelerate while the arc is still tightening — the worst possible combination of high lean angle and increasing throttle. Throttle after the apex delays acceleration unnecessarily, sacrificing exit speed. The ITP metric weights apex throttle timing heavily.

### Principle 4: Brake Timing Is Most Critical on Wet and Slippery Features
The consequence of late braking increases dramatically on low-traction surfaces: a brake application that is 0.5 seconds too late on hardpack merely requires slightly higher pressure; the same timing error on wet rock or mud may cause a front tyre wash or high-side. The ITP scoring system applies a terrain-sensitivity weighting to timing errors — the same timing deviation (measured in metres or seconds) scores as a more severe error on low-traction terrain than on high-traction hardpack.

### Principle 5: Timing Errors Are Detectable From Video Without Sensors
While sensor data provides the most precise ITP measurement (GPS position at exact throttle application timestamp), video analysis enables reliable timing diagnosis using terrain landmarks. The apex of a corner is visible. The position of a wet root or rock step is identifiable. If the video shows the front wheel at a specific landmark and the throttle input occurs at a frame identifiably before or after that landmark, the timing error is measurable in approximate metres. High-quality video from a consistent angle (chase camera, fixed external camera) provides sufficient resolution for timing error classification into correct, early, or late categories.

### Principle 6: Timing Precision Requires Visual Lookahead — It Cannot Be Reactive
Correct input timing at terrain landmarks requires that the rider has already seen the landmark 1-3 seconds earlier and is preparing the input in advance. Reactive timing — processing the landmark as it arrives and inputting immediately — is always late because of human reaction time (0.2-0.5 seconds) plus motor execution time. Correct timing is anticipatory: the rider identifies the landmark visually, processes the required input, and executes the input so that it lands at the correct terrain moment. This makes lookahead distance (vision horizon) the upstream variable that determines timing precision quality.

## 3. TECHNIQUE BREAKDOWN BY LEVEL

### 3a. Beginner Level
**Goal:** Understand the concept of terrain-relative timing and identify the most obvious timing errors (throttle before apex, late braking).

**Key Focus Areas:**
- Learning what "apex" means as a timing reference point
- Recognising early throttle as a feeling — the bike starting to push wide when throttle is applied too soon
- Learning to identify the braking zone as a terrain-defined location, not a reactive point
- Connecting visual lookahead to timing quality — looking further ahead enables earlier preparation

**What Good Looks Like:**
On a moderate corner, the rider enters under braking, releases brakes smoothly by the corner entry, and begins rolling the throttle on as the front wheel passes the closest point to the inside of the corner (the apex). The bike does not push wide on exit. There is no mid-corner brake application.

**Common Mistakes:**
- **Early throttle pushing wide:** Rider rolls on throttle while still in the first half of the corner arc, causing the bike to push wide on exit. Why it happens: urgency to accelerate, not knowing where the apex is. → Find the apex first — only then open the throttle.
- **Late braking requiring grab:** Rider brakes too late, requires high brake pressure because insufficient time available. Why it happens: not looking far enough ahead to prepare the braking zone. → Look ahead: the corner must be identified and the braking zone established 3 seconds before arrival.
- **Throttle at corner entry (wrong reference):** Rider thinks "throttle after the corner" and opens up when they think the corner is done — which may be early in the arc. Why it happens: vague understanding of where the corner actually is. → The corner is not done until the exit arc has fully opened and the bike is straight.

### 3b. Intermediate Level
**Goal:** Achieve consistent apex throttle timing on moderate corners; develop terrain-specific braking zone identification; begin applying timing discipline on technical features.

**Progression Markers from Beginner:** No early throttle pushing wide on moderate corners. Braking zone established before corners on familiar terrain. Rider can identify timing errors from video review.

**Key Focus Areas:**
- Consistent apex throttle timing across corner types — not just on the known training corner
- Technical feature timing: when to apply clutch dump before a log, when to modulate throttle before a rock step
- Brake timing on low-traction surfaces: additional time budget for braking in mud or on wet rock
- Visual lookahead as the primary timing tool — looking further to enable earlier timing decisions

**What Good Looks Like:**
The rider's throttle application consistently falls within the correct window across varied corner types. On technical features, the clutch dump is timed so the power surge reaches the obstacle at the correct moment. Braking zones are established earlier on slippery surfaces. Video review shows consistent landmark-to-input timing.

**Common Mistakes:**
- **Timing precision on known terrain not transferring:** Rider times correctly on training loop but timing breaks down on unfamiliar terrain. Why it happens: timing cues are landmark-specific rather than geometry-based. → Train on new terrain regularly to ensure timing is based on corner geometry, not memorised cues.
- **Same timing for all surface conditions:** Rider does not adjust braking timing for surface changes. Why it happens: awareness of timing but not of surface-dependent timing adjustment. → Build a mental rule: on low-traction surfaces, add 20-30% to the normal braking zone distance.

### 3c. Advanced Level
**Goal:** Achieve ITP score 80%+ across varied terrain types; timing discipline maintained under fatigue and competition conditions.

**Progression Markers from Intermediate:** ITP 65%+ on moderate terrain. Timing adjustments for surface conditions are automatic. Video review confirms consistent landmark-to-input timing across corner types.

**Key Focus Areas:**
- Micro-timing precision: the correct window at the apex is a 0.5-1 second range — advanced riding aims for the middle of this window consistently
- Combined input timing: trail braking requires brake release timing to coordinate with corner turn-in timing simultaneously
- Timing under fatigue: late-session timing precision is maintained through deliberate attention management
- ITP in first-encounter terrain: timing decisions made from geometry read in real time, not from memory

**What Good Looks Like:**
GPS analysis shows throttle application timestamps falling consistently at the GPS apex position — less than 5m deviation from the theoretical optimal timing point. ITP score 80%+. Video confirms input timing is consistent across laps. Under pressure (timed laps), timing precision does not degrade significantly.

**Common Mistakes:**
- **Fatigue-induced late timing:** As the session progresses, lookahead distance decreases as cognitive resources deplete, causing all timing to become reactive and therefore late. Why it happens: visual attention is a resource that fatigues. → Deliberate lookahead reminders during late-session riding; "eyes up" as a fatigue counter-cue.
- **Perfect timing in training, degraded in competition:** ITP drops under race conditions. Why it happens: competition narrows attention to immediate terrain rather than ahead terrain. → Race simulation training specifically targeting the lookahead habit under pressure.

## 4. DIAGNOSTIC CUES (AI COACHING ENGINE REFERENCE)

### Visual Cues — Correct Technique
- From video: throttle input (visible as chassis pitch change or rear squat) begins as the front wheel is at the apex point — not before, not significantly after
- Bike does not push wide on corner exit — confirms correct apex timing of throttle
- Braking visible (front-end compression) is complete before the corner turn-in — not during the arc
- No mid-corner braking visible — braking is fully resolved before the apex
- Technical feature timing: power surge (clutch dump or throttle increase) reaches the obstacle as the front wheel contacts it

### Visual Cues — Error Indicators
- Bike pushing wide on corner exit: early throttle timing — throttle applied before apex
- Mid-corner brake event visible: late braking — braking zone was too short, requiring braking into the arc
- Throttle delay after apex: late throttle timing — rider hesitating beyond the apex before rolling on
- Clutch dump before obstacle contact: early dump timing — power surge arrives before the front wheel needs it
- Clutch dump after obstacle contact: late dump timing — front wheel already at the obstacle before power arrives

### Audio Cues
- Rising engine note beginning as the corner apex is in the background of the video: correct throttle timing
- Rising engine note beginning while the corner mid-arc is visible: early throttle — bike still turning
- Rising engine note beginning only after the corner is fully complete (bike straight): late throttle — exit speed sacrificed
- Brake pad sound audible mid-corner: late braking — braking zone was insufficient
- Clutch dump (RPM spike then sudden engagement sound) timing relative to obstacle: compare audio event to video obstacle position

### Sensor Cues
- GPS position at throttle-on event: throttle position sensor reading > idle for the first time — compare GPS lat/long to corner apex GPS point; deviation in metres = timing error
- ITP score: percentage of timed inputs within ±5m of optimal GPS position (or ±0.5 seconds for time-based reference)
- Throttle trace shape: correct apex timing shows a throttle trace that begins rising at the GPS apex timestamp and continues rising through exit
- Brake pressure trace: should reach near-zero by the time GPS track shows the corner turn-in point; pressure remaining beyond turn-in = late brake release
- Combined input timing analysis: brake release and throttle roll-on as simultaneous events at the apex — trail braking technique signature

## 5. COACHING CUES & LANGUAGE

### Positive Reinforcement
- "That throttle came on right at the apex — I can see it in the chassis squat hitting exactly at the right moment. Your exit speed reflects it: clean and fast."
- "Your braking zone was dialled — brakes fully off before you turned in. That's the timing that gives you a clean, stable corner entry."
- "That clutch dump hit perfectly — front wheel just touching the obstacle and the power arrives. Textbook timing."

### Corrective Feedback
- "You're opening the throttle before the apex. I can see the bike starting to push wide — that's your early throttle fighting against the corner arc. Wait for the apex. The bike will feel like it wants to open up as soon as you can see the exit — that's your cue."
- "Your braking is too late. You're still squeezing the front lever in the corner because you didn't have enough distance. That's a timing error, not a braking error — you need to start earlier, not brake harder."
- "The clutch dump is early — you're releasing it 2 metres before the obstacle. By the time the front wheel hits the step, the power surge has already been absorbed and you've lost the benefit. Hold it one metre longer."
- "You're waiting until the corner is fully complete to roll on the throttle. The apex was 20 metres ago. You're giving away 20 metres of exit acceleration every single corner. That adds up to seconds per lap."

### Progression Prompts
- "Next lap, pick one corner and make the apex your reference. Find it visually on approach. Open the throttle the moment your front wheel is at that point — not before, not after. Just that one corner, perfect every time."
- "Walk the braking zone. Stand at the correct start point and look back at the approach. See how early it feels? That's where you need to start squeezing. It will feel too early — it is not too early."
- "Today we're going to use a cone at the apex of this corner. Your job is to have the throttle already rolling on as you pass the cone. Not before it, not after it — at it. Then we remove the cone and you replicate the timing."

## 6. DRILLS & PRACTICE EXERCISES

### Drill 1: The Apex Cone Throttle Drill
**Purpose:** Establish precise apex throttle timing using a physical landmark for instant feedback.
**Setup:** A defined corner. One cone placed at the apex — the closest point the front wheel should reach to the inside of the corner.
**Execution:**
1. Ride the corner five times at reduced pace, focusing on one thing: begin rolling the throttle on as the front wheel reaches the cone.
2. Check: does the bike begin to run wide after the cone (too early) or does exit speed drop (too late)?
3. Adjust: earlier or later relative to the cone.
4. Run 10 times at normal pace hitting the timing target.
5. Remove the cone and replicate the timing from feel.
**Success Criteria:** Rider can consistently time throttle application to the apex without the cone. No bikes pushing wide on exit. Exit speed is consistent and high.
**Duration/Reps:** 20 minutes. Minimum 15 cone-present runs, 10 cone-absent runs.
**Progression:** Apply to a different corner type (tighter, faster, off-camber). Then apply to a corner without a cone, using the corner geometry as the reference.

### Drill 2: The Braking Zone Walk-and-Ride
**Purpose:** Build precise braking zone identification by physically walking the reference point before riding it.
**Setup:** A moderate corner with an identifiable braking zone requirement. A marker (stick in ground, cone) at the correct braking start point.
**Execution:**
1. Walk the approach. Identify where braking should start — consider: how much distance does the bike need to decelerate to entry speed?
2. Place the marker at the correct start point.
3. Ride the corner three times using the marker as the braking trigger.
4. Move the marker 5m later — what happens? Braking becomes more rushed.
5. Move the marker 5m earlier — what happens? Braking finishes too early (okay — better than late).
**Success Criteria:** Rider can identify and establish the correct braking zone without the marker, by walk-and-judge, before riding an unfamiliar corner.
**Duration/Reps:** 20 minutes. Apply to two corners with different speeds.
**Progression:** Apply without walking first — establish the braking zone visually from the bike approach. Check accuracy by then walking the section.

### Drill 3: Technical Feature Timing Sequence
**Purpose:** Build precise timing for non-corner inputs — clutch dumps, throttle on/off at obstacles.
**Setup:** A sequence of three technical features: a log, a rock step, a soft surface transition. Each requires different timing.
**Execution:**
1. For each feature, define the correct timing: at what point should the specific input begin?
2. Log: clutch dump initiated 2m before, released as front wheel contacts.
3. Rock step: throttle reduce 1m before, maintain throttle through.
4. Soft surface: throttle reduce 2m before, resume after surface transition is complete.
5. Ride the sequence with conscious attention to each timing point.
**Success Criteria:** All three features completed cleanly with the defined timing on five consecutive passes.
**Duration/Reps:** 25 minutes, minimum 10 sequence passes.
**Progression:** Link additional features into a longer sequence. Increase riding speed. Apply on unfamiliar features where timing must be derived in real time.

### Drill 4: Video Timing Analysis Session
**Purpose:** Use post-session video review to identify and quantify timing errors for targeted correction.
**Setup:** GoPro or similar mounted for a side or chase angle on a known corner. External camera at the corner apex preferred.
**Execution:**
1. Ride five laps of the corner at normal pace.
2. Review video frame by frame at the apex: at what exact frame does the chassis show throttle application?
3. Compare this to the apex frame (front wheel at the cone or inside edge).
4. Is the throttle input before, at, or after the apex frame?
5. If early or late by more than 2-3 frames (0.1-0.15 seconds): this is a measurable timing error.
6. Run five more laps with targeted timing correction. Review again.
**Success Criteria:** Second video review shows throttle input within 2 frames of the apex frame on at least 4 of 5 laps.
**Duration/Reps:** 10 riding laps plus 20-minute video analysis.
**Progression:** Apply the same video analysis to braking zone timing. Then to technical feature inputs.

## 7. CROSS-REFERENCES & DEPENDENCIES

**This topic connects to:**
- CONTROL-04 (Throttle Control): ITP measures the timing of throttle inputs — when, not just how
- CONTROL-11 (Braking Technique): ITP measures brake timing precision relative to terrain landmarks
- CORNER-03 (Corner Exit Technique): apex throttle timing is the central technique in corner exit quality
- ERROR-09 (Early Throttle Error): the primary timing error class ITP is designed to detect
- METRIC-01 (Smoothness Index): smoothness and timing are complementary dimensions — ITP adds when to METRIC-01's how

**This topic is prerequisite for:**
- Trail braking analysis: trail braking requires simultaneous brake release and throttle timing precision
- Advanced corner speed analysis: timing precision is required to separate technique quality from line quality

**This topic builds on:**
- CONTROL-04 (Throttle Control): the physical throttle skill that ITP times
- CONTROL-11 (Braking): the physical braking skill that ITP times
- CORNER-03 (Corner Exit): the corner geometry that defines the apex timing reference

## 8. TERRAIN & CONTEXT VARIATIONS

### Tight Singletrack Corners
Timing windows are compressed — at low speed, the apex arrives quickly. Early throttle errors are highly visible (bike immediately pushes wide in tight terrain). Correct timing is still the same principle: apex first, then throttle. The apex may be only 2-3m of arc before the exit opens.

### Fast Sweeping Corners
At high speed, the timing window appears smaller (more ground covered per second) but the consequence window is also larger (the bike can manage small timing errors at speed better than in tight corners). The challenge is lookahead: at high speed, the apex comes fast and the visual preparation must begin further ahead.

### Wet and Low-Traction
Braking timing must be extended (earlier start) to maintain the same deceleration within the available traction budget. Throttle timing may need to be slightly later (past the apex) on wet terrain to ensure the arc has fully opened before any traction demand increase. Surface-specific timing adjustment is a key intermediate skill.

### Rocky and Technical
Feature-specific timing — when to dump the clutch for an obstacle, when to back off before a rock — requires real-time terrain reading without pre-loaded knowledge. The timing window for many technical features is very small (half a metre or less) which demands precise lookahead and rapid input execution.

### Night Riding
Timing errors increase at night because the terrain features (apex, braking zone markers, surface changes) are harder to identify early enough in limited light. Timing tends to become reactive and therefore late. Training specifically with low-beam illumination (or a helmet light without a high beam) builds timing skill under restricted visibility.

## 9. EXPERT INSIGHTS & SOURCES

### Key Insights
- **Keith Code — "A Twist of the Wrist"**: The concept of "the throttle rule" — throttle on at the apex, never early, never snap — is foundational to corner timing. Code formalised the apex-throttle timing relationship in two-wheel performance riding more precisely than any other coaching resource.
- **Circuit racing coaching**: "Trail braking" technique in circuit racing is entirely a timing skill — the precise coordination of brake release and throttle application at the apex. Formula 1 coaches use detailed data analysis of throttle and brake traces against track position to quantify ITP at the elite level.
- **Jimmy Lewis**: Emphasises the connection between visual lookahead and input timing in off-road contexts — "You can't time what you haven't seen. If your eyes are on the front wheel, your timing will always be late."
- **Rally driving methodology**: Stage notes in rally driving are specifically designed to enable pre-timing of inputs — the co-driver's description of corners and surface changes gives the driver 5-10 seconds of preparation time, enabling precise input timing. Without stage notes, timing must be derived from visual scanning — the off-road equivalent.
- **Motor learning research**: "Anticipatory control" — preparing inputs in advance of the triggering event — is described in motor learning science as a defining characteristic of expert performance. Beginners use reactive control; experts use anticipatory control. ITP quantifies the degree to which a rider has shifted from reactive to anticipatory control.
- **Taddy Blazusiak**: Noted by technical observers for exceptional clutch dump timing on extreme terrain obstacles — the power arrives precisely when the front wheel contacts the feature, not before or after. This precision is the result of thousands of deliberate repetitions calibrating the timing.

### Sources & References
- Keith Code — "A Twist of the Wrist" volumes I and II — throttle timing and apex rule
- Circuit racing coaching methodology — trail braking timing analysis and data trace interpretation
- Jimmy Lewis Off-Road Riding School — lookahead and timing connection
- Rally driving preparation methodology — input pre-timing and stage note systems
- Motor learning science: anticipatory vs reactive control (Schmidt and Lee — Motor Control and Learning)
- Hard Enduro technical coaching — Blazusiak clutch dump timing analysis
- Enduro GP coaching clinics — corner timing and throttle application timing standards
