---
topic_id: ERROR-09
title: Poor Throttle Timing
domain: Error Patterns & Diagnostics
domain_id: 08
difficulty_range: beginner, intermediate, advanced
related_topics: CONTROL-04, CORNER-03, ERROR-02, ERROR-03, DYNAMICS-01
prerequisites: CONTROL-04, CORNER-03
tags: throttle timing, corner, obstacle, climb, early, late, snap, enduro
version: 1.0
last_updated: 2026-03-30
---

# ERROR-09: Poor Throttle Timing

## 1. OVERVIEW

Throttle timing is the skill of opening the throttle at the right moment — not just the right amount (ERROR-02) or in the right way (smoothness). A rider can apply throttle smoothly, in the correct quantity, and still produce a traction event or momentum loss because the timing is wrong. Throttle too early at a corner means the drive is applied before the bike is in the correct position — causing a traction event at lean. Throttle too late at an obstacle means the drive arrives after the critical moment has passed — causing the bike to stall or stop mid-crossing. These are two distinct and opposite failures that share the same root: the rider's throttle decision does not match the terrain's geometry.

**CASCADE EFFECTS:** Early throttle in a corner cascades as follows: throttle before apex while still at lean → rear traction event → rear wheel steps out → crash or violent correction. Late throttle at an obstacle cascades as: momentum exhausted at the face of the obstacle → bike stops mid-crossing → stall or awkward manual extraction → potential fall at the worst position. The AI coaching engine should differentiate early-throttle events (correlated with traction events at lean angle) from late-throttle events (correlated with speed decay entering obstacles and climbs) because they require different corrections. Both can be detected from the combination of throttle position sensor data and IMU lean angle or chassis pitch data.

The correct timing reference points differ by context. In a corner, the throttle should open progressively from the apex — the moment the bike begins to straighten and lean angle begins to reduce. Opening before the apex, while lean angle is still increasing or at maximum, applies traction demand when the lateral grip budget is already fully committed. At an obstacle face, the throttle must be already building before the front wheel hits the obstacle — the drive must arrive as the front wheel rises, not after. On a climb approach, throttle should be building from 3–5 metres before the base of the gradient — not from the base.

Audio is a reliable self-monitoring tool for throttle timing. An RPM spike on a loose surface immediately after lean — a sharp rise followed by a chirp of rear spin — is the early-throttle sound signature. A lug or bog sound mid-obstacle is the late-throttle sound signature. Riders who develop ear for these sounds can self-diagnose timing errors without video review.

## 2. CORE PRINCIPLES

### Principle 1: Timing and Quantity Are Independent Variables
The quantity of throttle (how much) and the timing of throttle (when) are entirely independent. Both must be correct simultaneously. A rider can apply the right amount at the wrong moment (quantity correct, timing wrong) or the wrong amount at the right moment (timing correct, quantity wrong). ERROR-02 addresses quantity. ERROR-09 addresses timing. Coaching must specifically target each dimension.

### Principle 2: The Traction Budget at Each Moment Determines the Safe Throttle Window
Throttle timing is governed by the traction budget at each moment of the section. In a corner, the lateral demand of cornering uses part of the traction budget — the longitudinal drive from throttle must share the remaining budget. The safe throttle window opens when the lateral demand reduces (as the bike straightens after the apex). Opening throttle before this window — while the lateral demand is still high — is a timing error. The rider must develop a feel for when the traction budget "opens" for throttle.

### Principle 3: Obstacle Timing Is About Drive Arrival, Not Drive Start
At an obstacle face, the drive must arrive at the front wheel at the moment of impact — not begin being applied at the moment of impact. Throttle has a response lag: the time between twisting the grip and the drive reaching the rear wheel through the drivetrain. This lag is approximately 0.2–0.5 seconds on most bikes, longer on four-strokes. The throttle must open 0.2–0.5 seconds before the drive is needed — which means opening before the front wheel hits the obstacle, not as it hits.

### Principle 4: Apex Is the Corner Throttle Reference Point
The apex — the geometric midpoint of the corner where lean angle begins to reduce — is the primary throttle timing reference for corners. Throttle opens at the apex and builds progressively as lean reduces and the exit opens. This is consistent across corner types, although the precise location of the apex varies with surface and line. The rider must identify the apex for each corner and use it as the throttle trigger.

### Principle 5: Late Throttle Is Safer Than Early Throttle in Corners — But Still Harmful
Between the two corner timing errors, late throttle (opening after the apex) is less likely to cause a crash than early throttle (opening before the apex). A late throttle produces slow exit speed — a performance error, not a safety crisis. An early throttle at maximum lean produces a rear traction event — a safety event. However, consistently late throttle is a significant pace limiter that accumulates over an entire enduro stage. The goal is accurate timing at the apex, not late timing as a "safe" default.

## 3. TECHNIQUE BREAKDOWN BY LEVEL

### 3a. Beginner Level
**Goal:** Understand the concept of throttle timing and begin applying the apex reference point for corners and the obstacle-face reference point for obstacles.

**Key Focus Areas:**
- Identifying the apex of a corner before riding it — where is the midpoint?
- Understanding that throttle at the apex means opening as the bike straightens, not while still at lean
- Experiencing the difference between early-throttle traction events and correct apex throttle

**What Good Looks Like:**
In a moderate corner, the rider brakes on approach, releases brakes at entry, has no throttle through the first half of the corner, and begins opening throttle progressively as they pass the apex. The bike tracks the planned exit line and drives cleanly toward the next section. No rear spin or step-out. No mid-corner stall from late throttle.

**Common Mistakes:**
- **Throttle immediately at corner entry:** Rider opens throttle as soon as they stop braking — before the apex. Why it happens: gap between braking and throttle feels "wrong" — the rider wants to be on either brake or throttle. → Practise the "off zone" — neither brake nor throttle for the first portion of the corner.
- **Throttle too late at obstacles:** Rider applies throttle as the front wheel hits the obstacle. By this point, the drive arrives after the obstacle has been hit, not during. → Begin throttle application before the front wheel arrives at the obstacle face.
- **Throttle removed at the apex:** Rider has the correct general timing but reduces throttle at the apex from caution. → At the apex, the throttle should be building, not reducing.

### 3b. Intermediate Level
**Goal:** Develop consistent apex timing on known corners and obstacle-face timing on known obstacles, with the ability to adapt timing for different terrain and surface types.

**Progression Markers from Beginner:** Rider can identify the apex of a corner before riding it. Has experienced the early-throttle traction event and understands why it happened. Applies throttle consistently after the apex on moderate corners.

**Key Focus Areas:**
- Surface-adjusted timing: loose surfaces require slightly later throttle (apex timing must be conservative on loose)
- Obstacle-face timing: building throttle 2–3 metres before the obstacle face so drive arrives at impact
- Rhythm obstacles: maintaining consistent throttle timing through sequential obstacles

**What Good Looks Like:**
On a rough corner with a loose exit, the rider waits until the apex and confirms the surface before opening throttle — slightly later than on hard-pack. On a log obstacle, the rider begins building throttle 2 metres from the log face — the drive peaks as the front wheel hits the log and the bike lifts over cleanly. The timing is deliberate and visible.

**Common Mistakes:**
- **Same timing on all surfaces:** Rider applies apex timing correctly on hard-pack but uses the same timing on loose — early by comparison due to lower traction budget. → Surface-specific timing calibration: looser surface = later throttle relative to apex.
- **Obstacle throttle timing varying with confidence:** Timing is correct on small obstacles but late on large ones (intimidation effect). → Separate the size assessment from the timing decision — timing is consistent regardless of obstacle size.
- **Rhythm obstacles causing timing compression:** Second and third obstacles in a sequence are under-timed because the recovery time between obstacles is short. → Plan the throttle timing for the entire sequence before entering, not obstacle by obstacle.

### 3c. Advanced Level
**Goal:** Automatic, contextually calibrated throttle timing across all terrain types, corner geometries, and obstacle sequences — with continuous adjustment based on surface feedback.

**Progression Markers from Intermediate:** Rider consistently times throttle correctly on known terrain. Can self-diagnose timing errors by audio (RPM spike or engine bog). Can adapt timing to surface changes on the fly.

**Key Focus Areas:**
- Real-time timing adjustment based on traction feedback during the corner or obstacle
- Complex timing: throttle timing through combined scenarios (corner with obstacle mid-way)
- Race-pace timing: maintaining accurate timing at higher speeds where timing windows are compressed

**What Good Looks Like:**
On an unfamiliar rocky corner, the rider identifies a visual apex reference before entry, waits for it, and opens throttle with a slight additional delay to account for the unknown loose surface. The rear finds traction immediately — no spin, no bog. The exit is clean and fast. The rider adjusts on the next pass based on what the surface provided on the first.

**Common Mistakes:**
- **Race-pace timing compression:** At higher speeds, the apex arrives faster — the throttle window is shorter. Riders who have not trained at race pace lose timing precision under speed. → Progressive speed increase in corner training.
- **Timing regression under pressure:** Consistent in training, reverts to early-throttle under competition pressure. → Race simulation training specifically targeting throttle timing decisions.

## 4. DIAGNOSTIC CUES (AI COACHING ENGINE REFERENCE)

### Visual Cues — Correct Technique
- Rear wheel remains planted through the corner's high-lean phase — no spin at maximum lean
- Visible acceleration beginning at the apex — bike clearly driving toward exit after midpoint
- Front wheel rising consistently at obstacle face — drive arriving at the correct moment
- Smooth, continuous speed through obstacle sequences — not decelerating between each one

### Visual Cues — Error Indicators
- Rear wheel step-out or spin at lean angle — early throttle signature in corner
- Bike slowing or stopping at obstacle face — late throttle, drive not arriving
- RPM spike visible (from onboard) mid-corner at lean — early throttle traction event
- Rider correction mid-corner (sudden counter-steer or body shift) — responding to early-throttle traction event
- Bike stopping partway over an obstacle — timing error, not quantity error

### Audio Cues
- RPM spike followed by rear spin chirp at corner lean — early throttle signature
- Engine bog or lug at obstacle face — late throttle, engine under-powered at the critical moment
- Consistent RPM build beginning at corner apex — correct timing signature
- RPM already building as front wheel rises over obstacle — correct obstacle timing

### Sensor Cues
- Throttle position sensor combined with lean angle sensor: throttle opening while lean angle is still at maximum — early corner throttle timing error
- Rear wheel speed spike at lean angle > 20 degrees: traction event from early throttle
- Throttle position: still at low position as chassis pitch increases over obstacle — late obstacle throttle
- GPS speed: sustained speed through corner exit beginning at geometric apex — correct timing signature
- Chassis pitch sensor + throttle position: throttle opening 0.3+ seconds after pitch begins increasing — late obstacle timing

## 5. COACHING CUES & LANGUAGE

### Positive Reinforcement
- "That's it — you waited for the apex and the rear was planted. I could see the bike driving out of the corner cleanly. The timing was right."
- "Good obstacle timing. I could hear the RPM building before the front wheel hit it. The drive was already there when you needed it."
- "You waited through the whole corner — brake, then nothing, then throttle at the apex. That gap in the middle is the technique. Well done."

### Corrective Feedback
- "You put the throttle on before the apex — the rear stepped out at the corner. Hear that RPM spike? That's the early throttle sound. Wait for the apex, then open."
- "You were late on that obstacle — I heard the engine bog at the face. The throttle needs to be building before the front wheel gets there, not when it arrives. Start earlier."
- "There's a gap in the middle of your corner where there should be nothing — no brake, no throttle. But you're filling that gap with throttle when the bike is still turning. Let the corner finish before you drive."
- "That RPM spike mid-corner — hear that? That's your rear wheel spinning at lean. The surface can't give you cornering and drive at the same time. Wait for the bike to straighten."

### Progression Prompts
- "Next run, I want you to pick a physical reference point for the apex of that corner — a rock, a rut, a marking in the dirt. Don't open throttle until you pass that point."
- "We're going to do the log obstacle drill with a specific rule: throttle must be building by the time you are 3 metres from the log. Not at the log — 3 metres before it."
- "Once apex timing is solid on known corners, I want you to do the same approach on an unfamiliar corner — walk it first, find the apex, then ride it with timing based on that reference."

## 6. DRILLS & PRACTICE EXERCISES

### Drill 1: The Apex Marker Corner
**Purpose:** Build a concrete physical reference for throttle timing by marking the corner apex before riding it.
**Setup:** A moderate, consistent corner. A bright-coloured cone or marker placed at the identified apex point.
**Execution:**
1. Walk the corner, identify the apex, place the marker.
2. Ride the corner: brake on approach, release brakes at entry, zero throttle until the marker is passed.
3. As the marker passes under the inside peg, open throttle progressively.
4. Repeat 10 times, using the marker as a physical trigger for throttle.
5. After 10 marked passes, remove the marker and ride 5 times — recreate the timing from memory.
**Success Criteria:** Rider can ride the corner 5 times without the marker with throttle consistently opening at the correct timing. No traction events. Exit speed visibly increasing compared to pre-drill baseline.
**Duration/Reps:** 15 total passes. 20 minutes.
**Progression:** Move to a corner with a less obvious apex. Then move to a corner that the rider has to find the apex for themselves.

### Drill 2: Pre-Obstacle Throttle Build
**Purpose:** Train the habit of building throttle before the obstacle face so that drive arrives at the correct moment.
**Setup:** A log or board obstacle — 25–30cm height. Approach clear for 10 metres.
**Execution:**
1. Mark a point 3 metres from the obstacle face with a cone on the ground.
2. Ride toward the obstacle. When the front wheel crosses the 3-metre cone, begin opening throttle.
3. Maintain the throttle build through the crossing.
4. Note: does the front wheel rise easily at the face? Or does it hit flat (timing too late)?
5. Adjust: if the front still hits flat, start the throttle build earlier. If spin occurs before the obstacle, start it later.
**Success Criteria:** Rider crosses the obstacle cleanly — front wheel rises at the face, rear wheel drives over cleanly — on 8 consecutive passes.
**Duration/Reps:** 15 passes. 20 minutes.
**Progression:** Increase obstacle height. Add a loose surface approach.

### Drill 3: Off-Throttle Corner Middle
**Purpose:** Train the "neutral zone" — the portion of the corner between braking and throttle where neither input is applied — to prevent early throttle application.
**Setup:** A moderate corner with a clear entry, apex, and exit.
**Execution:**
1. Ride the corner in three defined phases: brake (approach to entry), neutral (entry to apex), throttle (apex to exit).
2. The neutral phase must be completely free of throttle — grip rotated to closed position.
3. After each pass, declare: "Was the neutral zone clean? Did throttle appear before the apex?"
4. A coach or camera confirms: throttle position zero through the first phase of the corner?
**Success Criteria:** Rider completes 10 consecutive passes with a confirmed clean neutral zone. Throttle only appears at or after the apex on every pass.
**Duration/Reps:** 15 passes. Multiple sessions.
**Progression:** Increase corner speed. Add a loose section to the neutral zone that makes the temptation to throttle early stronger.

### Drill 4: Rhythm Obstacle Timing Sequence
**Purpose:** Train throttle timing through a series of sequential obstacles — preventing timing compression that occurs when obstacles are close together.
**Setup:** Three obstacles in a row — logs or boards — spaced 5 metres apart.
**Execution:**
1. Walk the sequence before riding: identify the throttle reference points for each obstacle (3 metres before each).
2. Ride the sequence, applying pre-obstacle throttle build at each 3-metre reference point.
3. Maintain throttle consistency through the sequence — not recovering between obstacles, maintaining drive.
4. After each run, report timing accuracy: was each obstacle timed correctly?
**Success Criteria:** Rider completes the three-obstacle sequence with clean crossings of all three on 5 consecutive runs. No mid-sequence stalls or timing compression.
**Duration/Reps:** 10 runs. 20 minutes.
**Progression:** Reduce spacing between obstacles. Add a corner between obstacle two and three.

## 7. CROSS-REFERENCES & DEPENDENCIES

**This topic connects to:**
- CONTROL-04 (Throttle Control): the foundational skill; timing is a specific dimension of throttle control
- CORNER-03 (Corner Exit Technique): throttle timing is the primary skill in corner exit — apex timing determines exit quality
- ERROR-02 (Under-Committing Throttle): timing and quantity are independent errors that must both be addressed
- ERROR-03 (Gear Selection): wrong gear affects the effectiveness of correctly-timed throttle
- DYNAMICS-01 (Chassis Dynamics): the chassis response to throttle timing determines stability through corners and obstacles

**This topic is prerequisite for:**
- Advanced corner exit: optimal exit speed requires precise throttle timing
- Obstacle sequencing: rhythm sections require timing calibration across multiple consecutive obstacles

**This topic builds on:**
- CONTROL-04: Throttle control fundamentals
- CORNER-03: Corner exit technique provides the context for apex timing

## 8. TERRAIN & CONTEXT VARIATIONS

### Loose Corners
Apex timing must be slightly later on loose surfaces than on hard-pack — the traction budget reduces, so the safe throttle window shrinks. The reference point (apex) remains the same, but the throttle build rate must be more gradual. Immediate spin at the apex is a signal to start the throttle build more slowly.

### Mud Obstacles
In mud, the throttle timing for obstacles is critical: too early and the rear digs before the front wheel is over the obstacle; too late and the front wheel bogs into the far side. The correct timing is slightly earlier than on dry hard obstacles — the slower surface speed means the drive lag (0.2–0.5 seconds) covers a smaller distance before arriving.

### High-Speed Rocky Sections
In fast, rough sections, timing is compressed because the obstacles arrive faster. The training approach must include progressive speed increases — not jumping to race pace before timing is established at moderate speed.

### Switchback Corners
Switchbacks have an apex very close to the entry — the "neutral zone" before the apex is very short. Throttle timing is therefore later in the corner relative to entry, but still at the apex. The key is not to open early due to the shortness of the corner.

## 9. EXPERT INSIGHTS & SOURCES

### Key Insights
- **Steve Holcombe (Enduro World Champion):** Describes his throttle timing on obstacles as "drive arrives as the front lifts" — the physical cue is the front wheel beginning to rise, which should correspond exactly to the drive arriving from the throttle application a fraction of a second earlier.
- **Gary Bailey (Gary Bailey Motocross School):** Has been teaching apex throttle timing since the 1970s — the fundamental principle that the throttle opens at the apex is one of the most durable concepts in motorcycle coaching. The off-road application is identical to the motocross application.
- **Two-stroke timing note:** Two-stroke engines have less drivetrain lag than four-strokes because there is no torque converter and the power delivery is more direct. This means two-stroke obstacle timing can begin slightly later than four-stroke timing for the same drive-arrival result. Riders switching between platforms must recalibrate.
- **Audio diagnosis in coaching:** Multiple elite-level coaches (Tkacs, Lewis) note that audio diagnosis of throttle timing errors — the RPM spike at lean (early) and the engine bog at obstacle face (late) — is one of the most effective tools for developing timing awareness, particularly because it provides immediate feedback without camera or data equipment.

### Sources & References
- Steve Holcombe coaching content — Beta Factory Racing technical series
- Gary Bailey Motocross School — apex throttle timing curriculum
- Bret Tkacs / ADVMotoSkills — throttle timing coaching content
- CORNER-03 knowledge base topic — corner exit technique cross-reference
- CONTROL-04 knowledge base topic — throttle control fundamentals
- Two-stroke vs four-stroke drivetrain response: Jennings, G. "Two-Stroke Tuner's Handbook"
