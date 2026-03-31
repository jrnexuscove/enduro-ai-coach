---
topic_id: SENSOR-02
title: Throttle Position Sensor (TPS) Patterns
domain: Sensor & Data Interpretation
domain_id: 14
difficulty_range: intermediate–advanced
related_topics: [SENSOR-01, SENSOR-03, SENSOR-05, SENSOR-10, BIKECONTROL-04]
prerequisites: [METRIC-01, SENSOR-01]
tags: [sensor, TPS, throttle, telemetry, data-analysis, traction, smooth-inputs]
version: 1.0
last_updated: 2026-03-30
---

# Throttle Position Sensor (TPS) Patterns

## 1. OVERVIEW

The Throttle Position Sensor records the rotational angle of the throttle body as a percentage — 0% is fully closed, 100% is wide open — typically sampled at 50–100 Hz. This creates a continuous trace of every throttle input the rider makes, and it is one of the most revealing channels in a rider's data set because throttle control is both highly conscious and highly habitual. The TPS trace exposes hesitation, choppiness, overuse of snap throttle, and extended partial-throttle zones with a clarity that GPS speed data alone cannot achieve. When the TPS trace is compared against the speed trace and RPM channel, the complete story of how a rider is managing power delivery emerges — whether they are working with the engine or fighting it, and whether their inputs are creating traction or destroying it. Critically, the TPS trace shows what the rider intended to do with the throttle — not whether that intention was successfully converted into forward momentum. For complete diagnosis, TPS must always be cross-referenced with speed and RPM to understand the result of each throttle decision.

## 2. CORE PRINCIPLES

### Principle 1: Throttle Rate of Change Determines Traction Risk
It is not the absolute throttle position that triggers wheelspin and traction loss — it is the rate at which the throttle position changes. A rapid snap from 0% to 60% on loose terrain creates a spike in rear wheel torque faster than the tyre can respond, causing wheelspin and momentum disruption. A smooth roll from 0% to 60% over 0.5 seconds gives the tyre time to load progressively. The TPS trace reveals this directly: steep, near-vertical rises indicate aggressive inputs; gradual, sloped rises indicate progressive application.

### Principle 2: On/Off Throttle Patterns Signal a Fundamental Technique Problem
A TPS trace that continuously toggles between near-0% and near-100% with little middle ground — the "light switch" pattern — indicates a rider who has not developed partial throttle control. This pattern creates a bike that pitches back and forth as drive is alternately applied and removed, making balance and traction management extremely difficult on rough terrain. The correct pattern shows extended periods of partial throttle (20–60% range) with smooth transitions.

### Principle 3: The Partial Throttle Zone Is Where Precision Lives
The 15–60% TPS range is where the most skilled off-road throttle work happens. This range allows the rider to fine-tune traction, modulate drive through loose or slippery terrain, and maintain momentum without triggering aggressive wheelspin. A rider who can hold the TPS trace in this band smoothly and consistently for extended periods is operating at an advanced level. Most beginners and many intermediates either fall below it (over-cautious) or spike above it (over-aggressive).

### Principle 4: TPS Shape at Corner Exit Reflects Throttle Confidence
The shape of the TPS trace from 0% at corner apex to the exit full-throttle point is a direct measure of throttle confidence. An abrupt step change (0% to 60% in one movement) indicates the rider is treating the throttle as a switch. A smooth S-curve or ramp indicates progressive roll-on. The ideal exit shape is a gradual, accelerating ramp — start slow, increase roll-on rate as lean angle reduces and the bike stands up.

### Principle 5: Hesitation Appears as a Flat Plateau at Low TPS
A period where the TPS trace is flat at 5–15% — not fully closed, not opening — indicates throttle hesitation. The rider has not committed to either closing the throttle or opening it. This often occurs at terrain features the rider is unsure about, at corner exits where they are not confident in traction, or in technical sections where they cannot read the terrain ahead. Hesitation zones cause speed loss and disrupt suspension behaviour.

### Principle 6: TPS Correlated with RPM Reveals Clutch Use and Drive Effectiveness
When TPS is high but RPM does not rise proportionally, the clutch is being slipped excessively, or wheelspin is consuming the power. When TPS is low but RPM is high, the rider may be in too low a gear with the throttle barely open, or the clutch was just dumped at a high RPM. TPS alone tells half the story — the relationship between TPS and RPM tells the full one. A coaching engine that analyses TPS in isolation risks misidentifying clutch slip as smooth throttle technique or wheelspin as poor roll-on — the three-channel cross-reference of TPS, RPM, and GPS speed is the minimum required for correct throttle control diagnosis.

## 3. TECHNIQUE BREAKDOWN BY LEVEL

### 3a. Beginner Level
**Goal:** Eliminate the on/off throttle habit and develop a working relationship with the partial throttle zone.

**Key Focus Areas:**
- Holding 20–40% throttle position for extended periods without snapping fully open or fully closed
- Smooth, deliberate roll-on when accelerating out of corners — no snap
- Recognising the feel of wheelspin caused by abrupt throttle inputs and connecting it to what the trace shows
- Understanding that full throttle (100%) is not the goal in most technical terrain — partial throttle is the work zone

**What Good Looks Like:**
At beginner level, a good TPS trace has extended periods in the 20–50% range, smooth transitions between positions, and avoids the frequent 0–100 toggles. The trace looks like gently rolling hills rather than a series of sharp spikes. Some spikes are acceptable on straight sections of firm terrain.

**Common Mistakes:**
- **Constant 0%/100% toggling:** Rider treats throttle as a power switch. Why it happens: lack of tactile feel for partial throttle positions; using throttle for courage, not control. → Slow everything down, practice holding 30% TPS on a flat open area.
- **TPS drops to 0% at every small obstacle:** Rider closes the throttle whenever the trail gets rough. Why it happens: instinct to reduce power when uncertain. → Maintain 20–30% throttle through terrain; let the engine carry momentum.
- **Sharp spike at corner exit:** First move out of a corner is a snap to high TPS. Why it happens: eagerness to accelerate, poor feel for traction. → Lead with your wrist, not your elbow — roll the throttle, don't flick it.

### 3b. Intermediate Level
**Goal:** Develop smooth, terrain-matched throttle application — different TPS shapes for different terrain types and corner profiles.

**Progression Markers from Beginner:** Rider spends meaningful time in the 20–60% TPS range. On/off toggling is reduced. Can complete corners without a throttle snap on exit.

**Key Focus Areas:**
- Matching throttle application rate to terrain grip level — faster roll-on on hard pack, slower on loose
- Reading TPS vs speed correlation: does throttle position translate into speed gain, or is power being wasted through wheelspin?
- Identifying TPS hesitation zones in the data and connecting them to specific trail features
- Developing different exit shapes for tight corners (slow, gradual roll-on) versus fast sweepers (more immediate application)

**What Good Looks Like:**
The TPS trace shows purposeful, terrain-specific shapes. On hard pack, exits are confident and linear. On loose terrain, exits are more gradual with small modulations visible. The trace rarely hits 0% except in genuine braking zones. Hesitation plateaus are short or absent.

**Common Mistakes:**
- **Long hesitation plateau at corner exits:** TPS holds at 5–10% for a full second before opening. Why it happens: rider is not reading the exit as clear. → Commit to the exit earlier — decide before the apex, not at it.
- **Choppy trace in technical sections:** TPS oscillates rapidly between positions. Why it happens: rider is actively fighting the bike, over-correcting. → Stabilise the throttle and let the suspension work; frequent small inputs amplify instability.
- **Uniform TPS application regardless of terrain:** Same throttle shape in mud as on hard pack. Why it happens: rider has one throttle style. → Consciously slow the roll-on rate in low-grip conditions and compare traces.

### 3c. Advanced Level
**Goal:** Use TPS as a precision tool for managing traction on the limit — reading wheelspin events in the TPS/speed correlation and making real-time adjustments.

**Progression Markers from Intermediate:** Rider has distinct throttle shapes for different terrain. Hesitation zones are rare. Exit slopes are smooth and confident.

**Key Focus Areas:**
- Micro-modulation visible in TPS trace on technical sections: small, deliberate reductions and recoveries in TPS to manage traction at the limit
- Trail throttle technique — maintaining a very low but non-zero TPS during corner entry to keep the engine responsive without driving the rear
- Identifying the exact TPS percentage at which wheelspin begins in given conditions and working just below that threshold
- Using TPS data post-session to review whether throttle decisions led to successful drives or traction events

**What Good Looks Like:**
The TPS trace shows sophisticated micro-management. On loose terrain the trace is like a skilled musician's fingerwork — small, deliberate adjustments around a sustained open position. On hard pack, the exits are committed and aggressive. The rider can look at their own TPS trace and immediately identify their best and worst throttle decisions of the session.

**Common Mistakes:**
- **Excessive micro-modulation creating oscillation:** Too many small TPS changes in search of perfect traction create the same instability as choppy riding. → Find the stable partial-throttle position and hold it; adjust less frequently.
- **TPS not matching corner geometry:** Same throttle ramp used for a tight hairpin and a fast sweeper. → The geometry of the corner should dictate the TPS ramp profile — tighter corners need slower initial roll-on.

## 4. DIAGNOSTIC CUES (AI COACHING ENGINE REFERENCE)

### Visual Cues
- A TPS trace with smooth, progressive slopes on both opening and closing transitions indicates skilled throttle technique
- Vertical or near-vertical TPS rises (snap inputs) indicate aggressive, potentially traction-breaking technique
- A trace that rarely enters the 20–70% range — mostly near 0% or near 100% — indicates on/off throttle habit
- Flat TPS plateaus at 5–15% lasting more than 0.5 seconds indicate hesitation — rider is sitting in no-man's land
- High-frequency small oscillations in TPS during a technical section indicate the rider is constantly micro-correcting, often a sign of instability caused by poor body position or line choice
- TPS drops to 0% immediately before an obstacle and does not reopen until well after — the rider is killing momentum at every challenge

### Audio Cues
- An engine that repeatedly surges then settles corresponds to TPS snap-and-back patterns — audible as repeated revs
- A smooth, rising engine note on corner exit corresponds to a progressive TPS ramp — the ideal sound
- An engine that bogs slightly then surges at corner exit corresponds to a TPS hesitation plateau followed by a snap — audible as a delay then rush of sound
- Tyre squeal or wheelspin sounds correlate to steep TPS rise events in the trace

### Sensor Cues
- TPS channel sampled at minimum 25 Hz required for meaningful pattern analysis — 10 Hz misses rapid snap events
- Cross-reference TPS with rear wheel speed sensor: when TPS rises steeply and rear wheel speed rises faster than front wheel speed, wheelspin is occurring
- Cross-reference TPS with GPS speed: a TPS rise that produces no speed gain indicates wheelspin or clutch slip absorbing the power
- Cross-reference TPS with IMU longitudinal G: aggressive TPS inputs should produce a corresponding positive G spike — if G is low despite high TPS, the drive is not reaching the ground

## 5. COACHING CUES & LANGUAGE

### Positive Reinforcement
- "That corner exit — look at the trace. Smooth, progressive ramp from 0% to 80% over nearly a full second. That's exactly right. You rolled the throttle on, you didn't throw it on."
- "Through that whole technical section your throttle barely dropped below 20%. You kept the drive on. That's how you maintain momentum on rough terrain."
- "Your hesitation on corner 4 has completely gone. The trace confirms it — no more plateau. You're committing to the exit much earlier now."

### Corrective Feedback
- "See this pattern? Your throttle is going zero, full, zero, full, zero, full. That's not throttle control — that's a toggle switch. I need you to find the middle. Practice holding 30% and sitting there."
- "That hesitation plateau at the exit of corner 6 — you're holding 10% throttle for nearly a full second before you commit. The traction is there. Make the decision before the apex, not after it."
- "Your TPS is spiking to 70% within one tenth of a second at every corner exit. That's why the rear is stepping out. You have the right idea — opening the throttle at the right time — but the rate is too fast. Slow the wrist down."
- "You're closing the throttle completely at every rock in that section. That kills your momentum and makes the bike lurch. Hold 25% through there — let the engine carry you through, not brake you."

### Progression Prompts
- "This week, after every section pass, I want you to look at the TPS trace and count how many times it touched zero in a non-braking context. That number is your 'unnecessary throttle cuts' metric. Try to reduce it by 50% over the next three sessions — each cut you eliminate is momentum you kept."
- "Next session, I want you to complete that technical section without the TPS trace ever hitting 0% — not once. You can go as low as 10% but never fully close. Come back and let's see the trace."
- "Try this: in the practice corner, hold the throttle at exactly 30% on entry — don't close it, don't open it. Hold 30% through the corner. Then at the apex, start the roll-on. That 30% entry TPS changes everything about how the bike steers."
- "Your exit commitment is improving. Now I want you to match the throttle ramp to the lean angle. As the bike stands up, the throttle opens proportionally. They're linked. Think about making them happen together."

## 6. DRILLS & PRACTICE EXERCISES

### Drill 1: The 30% Lock Drill
**Purpose:** Break the on/off throttle habit by forcing the rider to hold a sustained partial throttle position.
**Setup:** Flat, open area or gentle fire road — no technical terrain needed.
**Execution:**
1. Set off at walking pace, targeting exactly 30% throttle opening by feel.
2. Hold that 30% position as steadily as possible for 30 seconds while maintaining a consistent speed.
3. Review the TPS trace: how flat is the 30% line? How many times did it spike or drop?
4. Repeat, trying to reduce the variance in the trace.
5. Increase speed slightly and repeat.
**Success Criteria:** TPS trace shows a relatively flat line at approximately 30% for a 30-second window. Variance less than ±5% from target position.
**Duration/Reps:** 15 minutes. Three speed levels: slow, moderate, moderately fast.
**Progression:** Introduce gentle curves. Then apply the same discipline to technical terrain, targeting 20–40% TPS throughout a whole section.

### Drill 2: Corner Exit Roll-On Shape Drill
**Purpose:** Develop a progressive, smooth throttle ramp on corner exit — replacing snap inputs with deliberate roll-ons.
**Setup:** A single corner with a clear, safe exit — practised in isolation.
**Execution:**
1. Enter and complete the corner normally to the apex.
2. At the apex, begin throttle application but count silently to three before reaching 50% TPS.
3. Continue building to full throttle proportionally as the bike straightens.
4. Review the TPS trace: does the exit ramp have a smooth slope, or is there an abrupt step?
5. Adjust the counting speed to match the ramp quality seen in the data.
**Success Criteria:** TPS exit ramp shows a smooth, consistent slope with no visible steps or abrupt rises. Time from 0% to 70% TPS is at least 0.8 seconds.
**Duration/Reps:** 20 corner passes.
**Progression:** Increase corner speed so the exit happens faster. Maintain the smooth ramp discipline at higher speed. Then chain two corners together.

### Drill 3: Terrain-Specific Throttle Mapping
**Purpose:** Develop different TPS profiles for different terrain types — moving beyond a one-size-fits-all throttle approach.
**Setup:** Access to two contrasting terrain sections: one firm/hard pack, one loose/slippery.
**Execution:**
1. Complete 5 passes of the hard pack section, applying throttle as aggressively as the terrain allows.
2. Complete 5 passes of the loose section, deliberately slowing the throttle roll-on rate.
3. Compare the TPS traces for both sections: the hard pack exits should show a steeper ramp; the loose section exits should show a gentler ramp.
4. If both traces look identical, the rider is not adapting to terrain — they are using one pattern everywhere.
5. Practice deliberately adjusting the ramp speed to match conditions.
**Success Criteria:** The two sections show measurably different exit ramp slopes in the TPS data. The rider can verbally describe the difference they felt between the two.
**Duration/Reps:** 10 passes per section, reviewing between sets.
**Progression:** Introduce a mixed section (alternating grip levels) and challenge the rider to adjust TPS ramp in real time.

### Drill 4: Zero-to-Partial Throttle Commitment Drill
**Purpose:** Develop clean, deliberate commitment from 0% TPS at the apex to a sustained partial throttle position — eliminating the hesitation plateau.
**Setup:** A single, well-understood corner with a clear exit.
**Execution:**
1. At the apex of the corner, the TPS should be at 0%.
2. The moment the bike reaches the apex, commit to opening to exactly 30% TPS — not to full throttle, just to 30%.
3. Hold 30% for 2 full seconds before continuing to open further.
4. Review the TPS trace: is there a visible step to 30% and then a sustained plateau at 30%? Or does the trace show hesitation at a lower value?
5. Repeat until the 30% commitment is clean and immediate, with no hesitation dip below 10% before reaching 30%.
**Success Criteria:** TPS trace shows a clean, decisive rise to 30% at the apex with a sustained hold, followed by a progressive build to full throttle on the exit. Zero hesitation plateaus below 10% TPS at the apex.
**Duration/Reps:** 20 corner passes.
**Progression:** Change the target partial throttle from 30% to 40%, then 50%. Each increase requires the same clean commitment discipline before moving higher.

## 7. CROSS-REFERENCES & DEPENDENCIES

**This topic connects to:**
- SENSOR-01 (GPS Speed Trace): exit acceleration slope in speed trace is the result of TPS trace exit ramp quality
- SENSOR-03 (Engine RPM): TPS and RPM must be read together — TPS without RPM misses gear selection and clutch factors
- SENSOR-05 (IMU / G-Force): longitudinal G spikes under acceleration correspond directly to aggressive TPS inputs
- SENSOR-10 (Multi-Channel Data Fusion): TPS is a primary channel in throttle control diagnosis alongside RPM and speed
- BIKECONTROL-04 (Throttle Control): the physical technique that generates the TPS trace patterns described here

**This topic is prerequisite for:**
- SENSOR-10: Multi-channel throttle diagnosis requires understanding TPS patterns first
- SENSOR-03: RPM interpretation requires TPS as context to distinguish gear problems from throttle problems

**This topic builds on:**
- SENSOR-01: GPS speed trace establishes where corners and acceleration zones are — TPS analysis interprets what happened within them
- METRIC-01: Basic performance metrics provide context for what TPS improvements should translate to in speed gains

## 8. TERRAIN & CONTEXT VARIATIONS

### Sand
In sand, TPS should be held in the 40–70% range for most riding — enough to maintain momentum through drag but not so much as to dig in the rear wheel. Sharp TPS spikes in sand typically produce wheelspin that buries the wheel rather than drives the bike forward. The ideal sand TPS trace shows sustained, relatively high partial throttle with smooth modulation rather than committed on/off patterns.

### Mud
Mud demands the most sensitive throttle technique. TPS traces in mud from skilled riders show low overall values (20–40%) with slow, deliberate roll-ons and frequent micro-modulation. The goal is to find the exact threshold where the tyre just begins to load without spinning. Any TPS spike in deep mud typically results in immediate wheelspin and momentum loss.

### Rocky Terrain
On rocky terrain, the TPS trace shows a characteristic pattern of brief reductions to 15–30% as the front wheel climbs onto rocks, followed by restoration of throttle as the bike rolls over. The key is that TPS never fully closes — the engine torque is used to pull the front wheel over rocks rather than coast over them. Full TPS closure on rocky terrain disrupts the bike's momentum and makes obstacles harder to cross.

### Steep Incline
Climbing requires sustained high TPS with smooth management — a TPS trace on a climb from a skilled rider looks like a smooth line at 70–90% for the duration of the climb, with small reductions matching traction changes. Abrupt TPS changes on climbs cause immediate traction loss and potential stalling. The most common climb error visible in TPS data is a mid-climb panic throttle snap in response to front wheel lift.

### Steep Descent
On descents, the TPS trace is typically at or near 0% — engine braking is doing useful work. The coaching signal is whether the TPS ever makes unexpected rises on the descent (rider trying to power through a section rather than controlling speed with brakes) or unexpected snaps (panic response to speed building).

### Tight Trees / Narrow Sections
Tight woodland sections at low speed require the most precise partial throttle control of any terrain type. The TPS trace from skilled riders in tight trees shows a sustained 15–30% partial throttle — just enough to keep the engine loaded and responsive without driving the wheel aggressively into roots and rocks. Beginners in tight trees show the on/off pattern most clearly: full throttle into a gap, then snap to zero as they approach the next tree, creating a stop-start rhythm that amplifies any technique error. Smooth, sustained partial throttle in tight trees is one of the hardest TPS skills to develop.

## 9. EXPERT INSIGHTS & SOURCES

### Key Insights
- **Taddy Blazusiak (six-time SuperEnduro World Champion) on throttle feel:** Blazusiak's riding is characterised by exceptional throttle sensitivity in extreme terrain — his throttle inputs are famously smooth and precise even at very high difficulty levels. Analysis of his riding style consistently highlights that traction management through partial throttle is what separates him from riders who are physically equally capable.
- **KTM Factory Racing throttle control coaching:** KTM's factory enduro team coaching methodology specifically identifies the on/off throttle habit as the most common single error in club-level enduro riders and dedicates significant training time to partial throttle development before any other skill progression.
- **Engine management system context:** Modern fuel-injected enduro bikes (KTM, Husqvarna, GASGAS, Beta) have multiple engine map modes that alter the TPS-to-power relationship — in aggressive maps, even a small TPS change produces a large power change. Riders selecting aggressive maps for technical terrain often amplify their own TPS errors. Coaching should note which map the rider is using when interpreting TPS data.
- **MotoGP partial throttle principle:** MotoGP data analysis consistently shows that partial throttle control at corner exit — not maximum throttle as fast as possible — is what separates competitive from non-competitive laps. This principle scales directly to enduro.
- **TPS data revealing unconscious habits:** One of the most consistent findings when riders first review their own TPS data is shock — their throttle trace is far more aggressive and erratic than they believed they were riding. The brain constructs a smoother, more intentional narrative of its own actions than the data supports. This gap between perceived and actual throttle behaviour is the primary value of TPS data in a coaching context: it bypasses the rider's self-perception and shows what is actually happening.
- **Traction control systems and TPS interpretation:** Enduro bikes with traction control (TC) systems compare TPS position against wheel speed sensors in real time. When TPS-driven wheel spin is detected, TC cuts ignition or retards timing momentarily. In TPS data from TC-equipped bikes, these cut events appear as brief TPS rises that do not produce corresponding speed gains — the TC intervention is invisible in the TPS channel but visible in the speed and RPM channels. Coaching analysis must account for TC activation when interpreting the TPS-to-speed relationship.

### Sources & References
- KTM Racing Academy technical coaching materials — throttle control curriculum
- SuperEnduro World Championship data analysis: Motorsport.com technical coverage
- Beta, KTM, Husqvarna engine mapping documentation — factory riding mode descriptions
- "Twist of the Wrist II" by Keith Code — foundational throttle control principles (road racing context, directly applicable)
- Donnie Emler / Gary Bailey MX School — throttle control progressive roll-on methodology
- AiM Sports Race Studio 3 analysis software — TPS channel interpretation guides
- Bosch Motorsport traction control system documentation — TC intervention signatures in telemetry data
- GASGAS and Beta fuel injection system documentation — TPS signal characteristics and engine map interactions
- "The Friction Zone" magazine — practical throttle control articles for off-road motorcycle technique
