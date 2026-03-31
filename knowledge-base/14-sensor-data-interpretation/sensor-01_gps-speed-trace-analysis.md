---
topic_id: SENSOR-01
title: GPS Speed Trace Analysis
domain: Sensor & Data Interpretation
domain_id: 14
difficulty_range: intermediate–advanced
related_topics: [SENSOR-05, SENSOR-06, SENSOR-10, METRIC-02, INTEL-03]
prerequisites: [METRIC-01]
tags: [sensor, GPS, speed, telemetry, data-analysis, momentum, corner-analysis]
version: 1.0
last_updated: 2026-03-30
---

# GPS Speed Trace Analysis

## 1. OVERVIEW

A GPS speed trace plots the rider's speed in kilometres per hour against time or distance, creating a continuous line that is one of the most information-rich channels in off-road telemetry. Every deceleration event, every corner apex, every hesitation under braking, and every throttle-on moment leaves a legible signature in the trace. For a coaching engine, the speed trace is the skeleton that all other data channels are hung against — it defines where the rider is going fast, where they are unnecessarily slow, and whether momentum is being carried efficiently through terrain. Understanding the shape of a speed trace — its peaks, troughs, slopes, and plateaus — is the starting point for diagnosing nearly every category of riding technique error.

## 2. CORE PRINCIPLES

### Principle 1: Speed Trace Shape Encodes Technique Quality
A skilled enduro rider's speed trace shows smooth, progressive deceleration into corners, a defined minimum-speed apex point, and a clean acceleration arc out — the characteristic V-shape of a well-executed corner. Hesitation, late braking, panic braking, and early throttle all produce recognisably different deformation of that V-shape. The AI coaching engine should treat the V-shape as the reference template and measure deviation from it.

### Principle 2: Momentum Killers Are Visible as Unexpected Troughs
Any speed trough that does not align with a known corner or technical obstacle is a momentum killer — the rider shed speed they did not need to lose. These can be caused by hesitation at terrain features, lack of commitment on obstacles, braking for features they can roll through, or poor line selection that forces additional braking. These show as narrow, steep-sided dips in the trace that recover slowly.

### Principle 3: Corner Entry Speed Is Diagnostic of Braking Quality
The speed at the start of a deceleration ramp going into a corner, versus the speed at the apex minimum point, gives the braking delta — the total speed lost. A well-braked corner has a progressive, linear deceleration ramp. Panic or late braking appears as a steep, abrupt ramp close to the apex. Over-braking appears as an excessively low apex speed relative to corner difficulty.

### Principle 4: Corner Exit Acceleration Rate Reflects Throttle Confidence
The slope of the acceleration curve out of a corner minimum is a direct readout of throttle confidence and drive out of corners. A shallow, slow-building slope indicates hesitation or throttle choppiness. A strong, consistent climb indicates confident drive. The exit slope should be nearly symmetrical to the entry deceleration slope — if braking in was aggressive but exit was tentative, the rider is more comfortable braking than accelerating.

### Principle 5: Speed Variance Across a Section Reflects Consistency
Comparing the standard deviation of speed across repeated passes of the same section quantifies consistency. High variance between passes suggests the rider has not yet committed to a line and is making different decisions each time. Low variance, especially at high average speed, indicates the rider has found and committed to an optimal approach.

### Principle 6: Comparing Rider Trace to Reference Trace Reveals Opportunity
When a reference trace (from a faster rider or an ideal simulation) is overlaid, the gaps appear as regions where the rider is slower than possible. These gaps cluster in predictable places: corner entries (braking too early or too hard), apexes (carrying too little speed), exits (not accelerating early enough), or straights (not fully committing to maximum speed).

## 3. TECHNIQUE BREAKDOWN BY LEVEL

### 3a. Beginner Level
**Goal:** Understand that speed is not about maximum speed everywhere — it is about momentum management. Beginners should learn to read their own trace and identify the single biggest speed loss point on a given section.

**Key Focus Areas:**
- Identifying the deepest troughs in the trace (where speed is lowest)
- Connecting each trough to a physical location on track
- Understanding that wider, smoother troughs indicate progressive braking; sharp, narrow troughs indicate panic responses
- Recognising that a consistently low average speed across a whole section may indicate over-caution rather than one specific error

**What Good Looks Like:**
Even at beginner pace, the trace shows clear braking zones with gradual deceleration ramps, defined apex minimums, and visible (even if shallow) exit acceleration. The trace is not completely flat — some speed variation is appropriate. The rider can point at each trough and explain what it corresponds to.

**Common Mistakes:**
- **Flat trace across technical sections:** Speed does not vary much — rider is riding below their threshold everywhere, neither committing nor braking. → Start pushing into one section; let the trace show bigger variation.
- **Multiple overlapping troughs:** Rider brakes, accelerates slightly, then brakes again before the corner — double-braking. → Commit to a single brake zone and hold it.
- **Very slow corner exit speeds:** Apex speed is fine but exit never climbs back — rider is sitting in the throttle hesitation zone. → Work on committing to throttle at the apex.

### 3b. Intermediate Level
**Goal:** Optimise corner entry and exit speed by comparing actual trace shapes against the ideal V-profile. Begin making data-driven decisions about where to commit more speed.

**Progression Markers from Beginner:** Rider can connect trace features to specific physical locations. Can explain most major troughs. Average section speed is increasing.

**Key Focus Areas:**
- Measuring braking delta (entry speed minus apex speed) and comparing it to reference
- Identifying asymmetric V-shapes: steep entry ramp but slow exit climb
- Spotting mid-corner speed loss (speed continues to drop after expected apex point, indicating mid-corner braking or poor line)
- Comparing corner exit speeds across multiple laps of the same section for consistency

**What Good Looks Like:**
The V-shapes are visible and reasonably symmetric. The rider can identify the section of track where they consistently carry least speed compared to their reference. Exit acceleration slopes are positive and sustained — no flat spots or hesitations on exit.

**Common Mistakes:**
- **U-shape instead of V-shape:** Corner apex is too wide — rider is at minimum speed for too long, indicating over-braking and then hesitation before throttle. → Brake later, reach the apex sooner, commit to throttle.
- **Speed dips in unexpected places (non-corner sections):** Momentum killers not related to corners — obstacles or hesitation points. → Identify the physical feature and address commitment or line selection.
- **Inconsistent apex speeds across laps:** Same corner produces different minimum speeds each time. → Standardise the braking point using a landmark.

### 3c. Advanced Level
**Goal:** Use the speed trace as a precision instrument to identify fractions of seconds lost per corner and prioritise which corners offer the highest return on focus.

**Progression Markers from Intermediate:** Rider's trace shows clean V-shapes in most corners. Consistency is high. Average section speed is close to reference.

**Key Focus Areas:**
- Corner-by-corner time delta analysis: which corners lose the most time?
- Trail braking signatures in the speed trace (gradual, extended deceleration ramp into the apex rather than an abrupt stop of braking)
- Micro-analysis of straight-line speed — is the rider reaching maximum speed before the next brake zone, or is acceleration incomplete?
- Comparing GPS trace to TPS and brake pressure channels to build a full picture of where each input occurs relative to speed

**What Good Looks Like:**
The trace shows confident, committed V-shapes with sharp and purposeful deceleration and strong exit drive. Straight-line segments reach speed peaks that indicate full throttle commitment. The rider can identify the 2-3 corners on a given section that are costing the most time and has a specific plan for each.

**Common Mistakes:**
- **Perfect V-shapes but slow overall:** The shapes are textbook but the entry speed is too low — rider is braking too early, not reaching the speed available before the braking zone. → Push the speed higher before braking; the trace will show more kinetic energy available to convert.
- **Late apex visible in GPS trace:** The speed minimum occurs after the geometric apex — rider is turning in late, tightening the line, and running out of road on exit. → Move the minimum speed point earlier in the corner.

## 4. DIAGNOSTIC CUES (AI COACHING ENGINE REFERENCE)

### Visual Cues
- A series of clean, symmetric V-shapes in a speed-vs-distance plot indicates well-executed corners with committed entry and exit
- U-shaped troughs (flat bottom on apex) indicate the rider is holding minimum speed too long — over-braking followed by hesitation
- Asymmetric shapes with steep entry slope and shallow exit slope indicate braking confidence exceeds throttle confidence
- Narrow, abrupt troughs (spike-like drops in speed) in non-corner sections indicate panic reactions to terrain features or hesitation at obstacles
- Speed trace that is very flat (low variance) over rough sections indicates the rider is not committing and is riding far below threshold
- Multiple overlapping small troughs in a braking zone indicate pumping the brakes rather than a single committed application

### Audio Cues
- Abrupt engine note changes correlate to abrupt throttle events — these appear as vertical rises or drops in the speed trace
- Sustained off-throttle sound (engine braking noise) over an unusually long period correlates to over-braking traces
- Engine revving without speed increase (clutch slip or wheelspin) may appear as a flat spot in speed despite apparent throttle application

### Sensor Cues
- GPS sample rate should be at minimum 10 Hz for meaningful corner analysis — 1 Hz GPS is too coarse to identify apex timing
- Speed trace spikes or flat lines may indicate GPS signal loss (tree canopy, canyons) and should be excluded from analysis
- Correlate speed trace troughs with brake pressure sensor data to separate braking-induced speed loss from terrain-induced speed loss
- IMU longitudinal G channel should mirror the speed trace slope — positive G on acceleration phases, negative G on deceleration phases; mismatch indicates GPS lag or error

## 5. COACHING CUES & LANGUAGE

### Positive Reinforcement
- "Look at that corner — clean V-shape, good entry, strong exit. That's what committed riding looks like in the data."
- "Your consistency is impressive — the last three passes of that section show nearly identical apex speeds. You've found your line."
- "That straight-line section, you're hitting full speed before the next braking zone every single time. That's maximum efficiency."

### Corrective Feedback
- "See this U-shape here? You're braking to a good speed, but then you're sitting on that apex for too long before you go for the throttle. The apex is not a resting point — it's a trigger point. The moment you reach minimum speed, the throttle goes on."
- "That trough in the middle of the rocky section — there's no corner there. You're shedding speed you don't need to lose. Something in that section is scaring you. Let's walk it and talk about what's happening."
- "Your exit slopes are shallow compared to your entry slopes. You're braking like an intermediate but throttling like a beginner. The confidence needs to be equal on both ends."
- "You're braking 10 metres before you need to on this corner. I can see it in the trace — the deceleration starts too early and you're arriving at the apex going too slow. Move your braking point closer to the corner."

### Progression Prompts
- "Next session, I want you focused on exit speed on corners 3 and 7. Those two corners are costing you more time than everything else combined. Make them look like your corner 5, which is already excellent."
- "Try running the section and focusing only on accelerating at the apex — don't change anything else. Then let's look at the exit slopes and compare."
- "Your trace shows you're at full speed 40 metres before the end of the straight but then coasting. You're leaving time on the table. Push that full-speed window all the way to the braking point."

## 6. DRILLS & PRACTICE EXERCISES

### Drill 1: Landmark Braking Reference
**Purpose:** Convert an abstract speed trace feature (early braking point) into a physical, solvable problem by establishing a fixed braking landmark.
**Setup:** A corner the rider knows well, with a clear visual landmark 5–10 metres later than their current braking point.
**Execution:**
1. Identify the rider's current braking point from the speed trace (look for where deceleration starts).
2. Place a cone or identify a natural landmark 5 metres closer to the corner.
3. Rider rides the corner, targeting the new landmark as the braking trigger.
4. Review the speed trace: did the entry speed into the apex increase? Did exit speed also improve?
5. Gradually move the landmark closer to the corner over multiple sessions.
**Success Criteria:** Entry speed into apex increases by at least 5 km/h without sacrificing apex or exit quality. Speed trace V-shape narrows and shifts later.
**Duration/Reps:** 10 passes per session, comparing trace after each 5-pass block.
**Progression:** Remove the landmark — the rider internalises the later braking point. Then apply the same process to the next earliest-braking corner.

### Drill 2: Exit Commitment Drill
**Purpose:** Correct the asymmetric V-shape problem by specifically targeting throttle application at the apex.
**Setup:** A familiar corner with a clear exit that opens up — preferably not immediately into another corner.
**Execution:**
1. Rider focuses only on the moment they reach minimum speed (the apex).
2. At that exact moment, they commit to a progressive throttle roll-on — no hesitation, no dribbling.
3. After 5 passes, review the exit slope shape on the speed trace.
4. The slope should be steep and linear — a fast-building exit speed.
5. If the slope is still shallow, the throttle commitment is not happening at the apex. Drill the exact moment.
**Success Criteria:** Exit slope is at least as steep as the entry deceleration ramp (symmetric V). Exit speed 10 metres after apex increases by 5+ km/h.
**Duration/Reps:** 15 passes, reviewing trace every 5.
**Progression:** Apply the same exit commitment to a series of connected corners, maintaining the habit across linked sections.

### Drill 3: Section Momentum Audit
**Purpose:** Identify and eliminate every non-corner momentum killer in a given section using the speed trace.
**Setup:** A 2–3 minute section the rider will repeat 5 times with data logging.
**Execution:**
1. Complete 5 passes of the section, logging GPS speed throughout.
2. Print or display the speed trace and identify every trough that does not correspond to a known corner or major obstacle.
3. For each unexplained trough, walk the section and identify the physical feature causing hesitation.
4. On the next 5 passes, consciously carry speed through each identified feature — no braking, no hesitation.
5. Compare the second set of 5 passes to the first.
**Success Criteria:** All non-corner troughs are either explained and addressed or eliminated. Average section speed improves by 3–7%.
**Duration/Reps:** Two blocks of 5 passes with a walk-and-review between blocks.
**Progression:** Reduce the section length to focus on a high-density technical area. Then apply the same audit process to corner troughs.

### Drill 4: Multi-Lap Consistency Analysis
**Purpose:** Build consistency in section speed by using trace overlay comparison to identify and reduce lap-to-lap variation.
**Setup:** A timed section the rider completes at least 5 times in a session.
**Execution:**
1. Complete 5 laps of the section. Overlay all 5 speed traces on the same chart.
2. Identify the sections of highest trace divergence — where the 5 passes vary most from each other.
3. These high-variance locations are where the rider's approach is inconsistent — uncommitted to a line or braking point.
4. For the next 5 laps, focus specifically on the two highest-variance locations: make the same decision every single lap.
5. Overlay the second set of 5 traces and compare variance to the first set.
**Success Criteria:** Speed trace variance (standard deviation of speed at each GPS point) reduces by at least 25% at the previously high-variance locations in the second set of 5 laps.
**Duration/Reps:** Two blocks of 5 laps with overlay comparison between blocks.
**Progression:** Reduce the acceptable variance threshold progressively over multiple sessions. When variance is low, begin pushing entry speed higher while maintaining the new consistency standard.

## 7. CROSS-REFERENCES & DEPENDENCIES

**This topic connects to:**
- SENSOR-05 (IMU / G-Force Analysis): longitudinal G channel mirrors and validates the speed trace deceleration and acceleration phases
- SENSOR-06 (Brake Pressure & Application Patterns): brake trace explains the cause of speed trace deceleration shapes — sharp vs progressive application
- SENSOR-02 (TPS Patterns): throttle position explains the exit acceleration slope shape in the speed trace
- SENSOR-10 (Multi-Channel Data Fusion): speed trace is the primary reference channel for temporal alignment of all other data
- METRIC-02 (Corner Time Analysis): corner time metrics are derived directly from the speed trace

**This topic is prerequisite for:**
- SENSOR-10: Multi-channel fusion requires the speed trace as the alignment backbone
- METRIC-02: Corner time analysis depends on identifying apex minimum speed from GPS data

**This topic builds on:**
- METRIC-01 (Basic Performance Metrics): foundational understanding of speed and time as performance measures
- INTEL-03 (Terrain Reading): understanding where corners, obstacles, and technical sections are on the physical track before interpreting the trace

## 8. TERRAIN & CONTEXT VARIATIONS

### Sand
GPS speed trace in sand sections often shows sustained high speed with few defined corners — deceleration events are gradual due to sand's rolling resistance doing much of the braking. Look for unexpected speed drops in deep sand ruts — these indicate the rider fighting the bike rather than letting it track through.

### Mud
Speed traces in mud are characterised by generally lower average speed and more frequent small troughs as the rider reacts to grip changes. A skilled mud rider's trace still shows commitment on exit — the troughs are lower but the exit slopes are still present. A struggling rider's trace is flat and low — no committed exits at all.

### Rocky Terrain
Rocky terrain produces a choppy speed trace with many small fluctuations. The key signal is the trend line, not individual data points — is the overall speed through the section rising, constant, or dropping? Sustained deceleration through a rock garden (falling trend) indicates the rider is using brakes where they should be using body position and momentum.

### Steep Incline
Speed trace on climbs shows a naturally falling speed profile — gravity works against the rider. The coaching signal is the rate of deceleration. An excessively steep speed drop on a climb indicates the rider chose the wrong gear or lost traction and had to ease off throttle. A gradual, controlled decline indicates the rider is managing the climb well.

### Steep Descent
Speed on descents naturally rises if the rider is not actively braking. An unexpectedly flat speed profile on a descent indicates over-braking and excessive caution. A speed trace that rises quickly then drops sharply may indicate the rider is entering too fast and panic-braking mid-descent rather than setting entry speed correctly.

### Tight Trees / Narrow Sections
Tight woodland sections produce GPS speed traces characterised by sustained low average speed and very frequent, closely-spaced speed troughs as the rider navigates around trees and roots. The coaching signal in tight trees is the floor speed — how high the minimum speed stays between obstacles. A skilled rider maintains a higher floor speed by committing to a flowing line; a hesitant rider's trace shows repeated drops toward zero between each feature, indicating they are stopping and restarting rather than flowing through.

## 9. EXPERT INSIGHTS & SOURCES

### Key Insights
- **Loic Larrieu and FIM Enduro GPS analysis:** Professional enduro timing systems at World Enduro Championship level use GPS traces to compare riders through special tests — the consistent finding is that top riders carry more apex speed, not just more entry speed. The corner minimum is the competitive differentiator.
- **Rally Raid coaching principle:** In rally raid (Dakar) coaching, GPS traces are reviewed after every stage. Coaches look specifically at the deceleration initiation point relative to waypoints and corner geometry — "early brakers" are systematically slower even if their absolute apex speeds are similar.
- **Data coaching methodology:** The principle that "data doesn't lie but it doesn't explain itself" is fundamental — a speed trace shows where time is lost but not why. The coach must connect trace features to physical technique. This is the core rationale for multi-channel data fusion.
- **MotoGP application to off-road:** Road racing data analysis techniques (lap delta, mini-sector analysis) are directly applicable to enduro timing sections where the course is consistent enough to repeat. The key difference in off-road is terrain variation between passes creating natural trace variance.
- **Consistency as a leading indicator:** In data analysis across multiple motorsport disciplines, session-to-session consistency of key speed trace metrics — particularly apex speed and exit speed at the same corner — is a stronger predictor of competitive improvement than absolute peak speed values. A rider who consistently hits 42 km/h at the same apex will improve faster than one who randomly varies between 38 km/h and 48 km/h. Consistency shows the rider has a repeatable model; variability shows they are still searching for one. Coaching focus on reducing variance before pushing absolute speed is therefore analytically supported.
- **GPS sample rate and corner analysis accuracy:** At 10 Hz GPS, a rider travelling at 40 km/h generates a data point every 1.1 metres. This is sufficient for corner shape analysis but may miss the precise apex speed minimum if the minimum occurs within a 2-metre window. At 25 Hz GPS, the resolution improves to 0.44 metres at the same speed — sufficient for apex timing precision. Coaches should note the GPS sample rate of their logging system before making conclusions about apex timing accuracy.

### Sources & References
- FIM World Enduro Championship timing data analysis and commentary — Enduro GP technical coverage
- Erzbergrodeo and Extreme Enduro GPS tracking data — public race coverage showing elite vs amateur speed profiles
- Rally Raid data coaching: Dakar stage analysis presentations from KTM and Honda factory teams
- MotoGP data analysis methodology: "The Competitive Edge" by Simon McBeath — adapted principles for off-road application
- AiM Sports and MyChron5 GPS data coaching guides — practical telemetry interpretation for motorcycle sport
- u-blox GPS receiver datasheets — sample rate specifications and accuracy specifications for motorsport applications
- Racelogic VBOX Sport — GPS data logging methodology and accuracy documentation for motorsport
