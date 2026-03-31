---
topic_id: SENSOR-04
title: Suspension Travel Data
domain: Sensor & Data Interpretation
domain_id: 14
difficulty_range: intermediate–advanced
related_topics: [SENSOR-01, SENSOR-05, SENSOR-10, BIKESETUP-03, TERRAIN-02]
prerequisites: [METRIC-01, BIKESETUP-03]
tags: [sensor, suspension, travel, fork, shock, telemetry, data-analysis, setup]
version: 1.0
last_updated: 2026-03-30
---

# Suspension Travel Data

## 1. OVERVIEW

Suspension travel sensors — typically linear potentiometers attached to the fork leg and shock body — measure the compression distance of the fork and rear shock in millimetres at sample rates of 100–200 Hz. The resulting traces describe every terrain impact, every braking dive, every acceleration squat, and every rider-induced suspension event across a session. For a coaching engine, suspension data is uniquely powerful because it sits at the intersection of bike setup and rider technique: poor suspension traces can indicate either the bike is set up incorrectly or the rider is loading it incorrectly — or both. Distinguishing between the two is one of the key analytical challenges, and it requires correlating the suspension traces with GPS speed, TPS, and braking channels.

## 2. CORE PRINCIPLES

### Principle 1: Bottoming Signatures Are Immediately Identifiable
A bottoming event appears as the fork or shock trace reaching maximum travel (the physical end of stroke — typically 300 mm for fork, 100–130 mm for shock depending on linkage ratio) and holding there briefly. A true bottom-out produces a characteristic flat plateau at maximum travel in the trace, often with a spike in the IMU vertical G channel at the same moment. Occasional bottoming on large hits is acceptable; repeated bottoming at normal terrain speeds indicates a setup problem (springs too soft, not enough compression damping) or a rider problem (too much speed, inadequate pre-loading of the suspension).

### Principle 2: Static Sag vs Dynamic Sag Are Both Visible in the Data
Static sag is the suspension compression under the bike's weight alone; rider sag is the additional compression with the rider on board. Both can be read from the suspension trace by examining the zero-speed, zero-load baseline of the trace versus the resting value when the rider is seated. Dynamic sag — the average suspension position during riding — can be calculated from the trace mean. If the dynamic sag mean is consistently near maximum travel, the suspension is far too soft or the rider is being unnecessarily aggressive on braking.

### Principle 3: Front/Rear Balance Is Diagnostic of Braking and Body Position
In ideal riding, the front fork and rear shock traces should show roughly balanced travel usage across a session. Heavily biased front fork compression events during non-braking sections indicate the rider is loading the front — often through improper body position (too far forward) or repeated front-brake-only use. Heavy rear shock bias without corresponding acceleration events indicates a rider who is sitting rearward habitually. The front/rear ratio across a whole session creates a "body position signature" visible in suspension data.

### Principle 4: Rebound Timing Is As Diagnostic As Compression
When the suspension compresses and then rebounds (returns to full extension), the rate of rebound is controlled by the rebound damping adjuster. Rebound that is too fast (loose) appears as a rapid return to full extension after each compression — the suspension "packs" the next hit before full recovery is not the issue here — actually the opposite: too fast rebound means the suspension extends too quickly and can spit the rider or lose traction. Rebound that is too slow (tight) appears as a gradual, slow return with the suspension never fully recovering between hits — it progressively packs down. Both are visible in the trace shape after each compression event.

### Principle 5: High-Speed vs Low-Speed Compression Events Have Different Shapes
Suspension compression events fall into two categories based on the velocity of compression. High-speed compression events — from sharp impacts like rocks and roots — appear as narrow, spike-like compression curves in the trace. Low-speed compression events — from braking dives and acceleration squats — appear as broad, gradual curves. Modern enduro suspension has separate high-speed and low-speed compression adjusters for this reason. A trace dominated by spike-like events indicates high-speed terrain loading; a trace dominated by gradual curves indicates rider-induced loading.

### Principle 6: Rider-Induced vs Terrain-Induced Events Can Be Separated by Cross-Referencing
A suspension compression that coincides with a brake pressure rise and speed decrease is rider-induced (braking dive). A suspension compression that does not coincide with any rider input (TPS, brake) but does coincide with a sudden speed disturbance or GPS position consistent with an obstacle is terrain-induced. The ability to classify each major suspension event as rider or terrain-induced is essential for correct diagnosis — a "harsh ride" complaint may be from the terrain, poor setup, or the rider loading the suspension incorrectly through their inputs.

## 3. TECHNIQUE BREAKDOWN BY LEVEL

### 3a. Beginner Level
**Goal:** Understand that suspension travel data reflects what the bike is experiencing and how the rider is interacting with it. Learn to identify the two most important signature types: bottoming and braking dive.

**Key Focus Areas:**
- Identifying bottoming events in the fork trace and connecting them to specific terrain features or speed levels
- Recognising the braking dive signature (gradual fork compression coinciding with brake pressure rise)
- Understanding the concept of "using" the suspension versus "abusing" it — the trace should show the suspension working across its range, not repeatedly maxing out
- Connecting suspension trace to the feel of impacts on the bike

**What Good Looks Like:**
At beginner level, a good suspension trace shows the fork and shock using 60–80% of available travel in normal terrain, with occasional approach to full travel on large hits but rarely touching the bottom. Braking dives are visible as gradual compressions (not sudden) that recover before the next event. The trace is active — frequent small compressions and rebounds show the suspension is working, not rigid.

**Common Mistakes:**
- **Constant bottoming in normal terrain:** Fork or shock repeatedly hitting full travel. Why it happens: setup too soft for rider weight/speed, or riding too fast for suspension setup. → Check sag; likely needs stiffer spring or more compression damping. Slow down until setup is corrected.
- **Suspension appearing almost flat (no travel variation):** Rider is not loading the suspension — likely sitting very stiffly, legs absorbing nothing, or suspension set up far too stiff. → Review compression settings; also review rider standing position.
- **Huge braking dive spikes:** Fork compresses violently on every braking event. Why it happens: too much front brake applied too suddenly; compression damping may be too low. → Progressive brake application reduces dive; also check compression damping setting.

### 3b. Intermediate Level
**Goal:** Use suspension data to evaluate rider technique through the lens of front/rear balance and the ratio of rider-induced to terrain-induced events.

**Progression Markers from Beginner:** Rider understands what bottoming looks like and has addressed it. Can identify braking dives in the fork trace. Basic setup is reasonable.

**Key Focus Areas:**
- Comparing front vs rear trace to identify loading imbalance
- Identifying which suspension compressions are rider-induced (coincide with inputs) vs terrain-induced (independent of inputs)
- Looking at rebound behaviour — does the suspension recover fully between hits?
- Connecting front fork usage patterns to braking technique analysis

**What Good Looks Like:**
The front and rear traces show reasonably balanced travel usage across a section. Braking dives are visible but moderate — the fork does not bottom under braking. The rebound trace shows the suspension returning to a neutral position between hits rather than packing progressively downward. The rider can look at the trace and identify at least 5 specific suspension events and explain what caused each.

**Common Mistakes:**
- **Progressive packing (traces trending downward over a section):** Rebound is too slow — each hit is compressing further than the last, creating a progressively harsher ride. → Open rebound adjusters; re-ride the section and compare the trace trend.
- **Front/rear heavily imbalanced:** Fork uses 80% of travel while shock uses 40% — or vice versa. → Investigate whether this is body position related (too far forward loads front, too far back loads rear) or braking related (front-only braking vs rear-heavy braking).
- **No bottoming at all on large hits:** Rider is approaching features so cautiously that the suspension barely works. Not necessarily wrong, but a sign the rider is not committing to the speed the terrain allows. → Use the suspension usage percentage as a commitment indicator.

### 3c. Advanced Level
**Goal:** Use suspension data to fine-tune both setup and technique simultaneously — treating the trace as a precision instrument for optimising the bike-rider system.

**Progression Markers from Intermediate:** Rider can identify rider vs terrain events. Front/rear balance is reasonable. Rebound is consistent and managed.

**Key Focus Areas:**
- Identifying specific terrain features in the suspension trace by their distinctive impact signature shapes
- Using suspension data to validate setup changes — before/after comparisons of compression and rebound settings
- Connecting suspension overload events to speed at that point in the GPS trace — identifying the speed threshold at which setup breaks down
- Using front/rear balance data as a body position audit — does the rider's intentional body position match what the suspension data says?

**What Good Looks Like:**
The suspension trace at advanced level shows deliberate usage. The rider pre-loads the suspension into specific impacts (a slight compression just before a jump or drop, initiating a controlled dive into the landing). Rebound is perfectly timed — the suspension recovers fully between impacts without overextending. The rider uses suspension data to make specific setup changes between sessions and can predict the trace shape based on those changes.

**Common Mistakes:**
- **Misidentifying setup problems as technique problems or vice versa:** The data is ambiguous unless all channels are cross-referenced simultaneously. → Never diagnose from suspension data alone at this level; always correlate with TPS and braking.
- **Over-damping to compensate for technique errors:** A rider who brakes too late and too aggressively may run excessively stiff suspension to mask the fork dive this creates. → The trace will show barely any braking dive but very large impact spikes — setup is masking a technique problem.

## 4. DIAGNOSTIC CUES (AI COACHING ENGINE REFERENCE)

### Visual Cues
- Fork or shock trace reaching maximum travel value (physical bottom) and showing a plateau — clear bottoming signature
- A large, sudden compression spike in the fork trace coinciding with a simultaneous brake pressure rise — braking dive event
- Front fork trace showing consistently deeper compressions than rear shock across an entire section — forward body position bias or front-heavy braking
- Progressive downward drift of the trace baseline over a series of hits — rebound too slow, suspension packing
- Very high-frequency, small-amplitude oscillations in the trace — chatter event, often from high-speed compression on hard-pack or stiff suspension at speed
- A large suspension extension spike (trace jumping to maximum extension) after a jump landing — the suspension bottomed and the spring bounced the bike upward violently

### Audio Cues
- A sharp metallic "clunk" sound on hard hits corresponds to a bottoming signature in the trace — the metal-to-metal contact of the fork or shock reaching end of travel
- A sustained "clacking" or "rattling" sound on rough terrain may correspond to suspension chatter in the trace — high-frequency small oscillations
- A deep "thump" on landing corresponds to a large compression spike in both fork and shock channels simultaneously

### Sensor Cues
- Suspension pot (potentiometer) accuracy depends on clean installation — any mechanical slop in the mounting produces noise in the trace; verify sensor mounting before diagnosing technique
- Suspension travel sensors should be calibrated at zero travel (fully extended) and full travel (fully compressed) — miscalibration creates false bottoming or false full-extension readings
- Correlate fork and shock compression events with the IMU vertical G channel: terrain impacts produce positive G spikes (upward force on the bike); braking produces forward G and fork compression without a vertical G spike
- Cross-reference suspension events with GPS speed to calculate the speed at which specific events (bottoming, large impacts) are occurring — this defines the setup window for that terrain type

## 5. COACHING CUES & LANGUAGE

### Positive Reinforcement
- "Your suspension usage is excellent in that section — using 70–80% of travel consistently, never bottoming. The bike is working exactly as designed."
- "Look at the front/rear balance on that section. Almost perfectly even. That means your body position is centred and your braking is balanced between the wheels."
- "Your rebound management is great here — the trace shows the suspension recovering fully between every hit. No packing at all. That means the bike is always ready for the next impact."

### Corrective Feedback
- "You're bottoming the fork six times in that section. Every single time is on the same three corners. That's a late, hard braking problem — the bike is diving because you are braking too aggressively too late. Fix the braking point and that fork will stop hitting the floor."
- "The fork trace and the shock trace tell a story. Your fork is using 80% of its travel and your shock is using 40%. You're loading the front much harder than the rear. That's a body position problem — you're too far forward. Move back and let the rear carry more of the load."
- "Your suspension is packing. See how the trace drifts downward over the section? Each hit compresses a bit further than the last. That's your rebound adjuster — it's too slow. Open it two clicks and let's see if the drift disappears."
- "There's almost no suspension movement in your trace. It looks flat. That means one of two things: either the suspension is so stiff it can't move, or you're not loading it at all. The terrain is rough enough to justify much more travel. Let's check your compression settings first."

### Progression Prompts
- "Your suspension data shows you're using 60% of available travel consistently. That's conservative for this terrain — there's capacity you're not using. Try carrying 10% more speed through the technical section and see if the suspension responds properly or if it starts bottoming."
- "Next session, I want you to focus on actively pre-loading the suspension before impacts — compress the bike intentionally just before big hits by pumping down with your legs. Come back and let's see if the impact spikes look different."
- "Your data shows you're front-heavy on braking. For the next run, practice rear brake use on the approach to corners and compare the front/rear suspension ratio. If it evens out, you know where the imbalance is coming from."

## 6. DRILLS & PRACTICE EXERCISES

### Drill 1: Suspension Bottoming Audit
**Purpose:** Identify exactly which terrain features are causing bottoming events and whether the cause is setup or technique.
**Setup:** A section that has produced bottoming events in recent data.
**Execution:**
1. Review the suspension trace and mark each bottoming event by time stamp.
2. Cross-reference with GPS data to identify the physical location of each event.
3. Visit each location physically — is the feature large enough to justify full travel use?
4. For each location, cross-reference with brake and TPS data: is the bottoming caused by rider input or pure terrain impact?
5. If rider-input-caused: address the braking or body position technique. If terrain-caused: investigate suspension setup stiffness.
**Success Criteria:** Each bottoming event is classified as technique or setup. A specific action is assigned to each category.
**Duration/Reps:** One data session followed by a focused analysis session.
**Progression:** Implement the changes (technique or setup) and run the same section. Compare the new trace to the original.

### Drill 2: Front/Rear Balance Body Position Exercise
**Purpose:** Use suspension balance data as feedback for body position correction.
**Setup:** A familiar section that the rider completes multiple times.
**Execution:**
1. Complete 5 passes of the section in normal riding position. Review front/rear suspension balance ratio.
2. If front-biased: complete 5 more passes with a deliberate rearward weight shift — hips back, weight on rear peg. Review balance ratio.
3. If rear-biased: complete 5 more passes with a deliberate forward weight shift — chest toward bars. Review balance ratio.
4. Target a front/rear ratio within 60/40 to 40/60 range as a balanced baseline.
**Success Criteria:** The suspension balance ratio shifts measurably in response to body position changes. Rider can feel the difference and correlate it with the data.
**Duration/Reps:** Three blocks of 5 passes each with different body positions.
**Progression:** Apply the balanced body position to a different section and verify the ratio transfers.

### Drill 3: Rebound Tuning Through Data
**Purpose:** Use suspension trace shape to tune rebound damping to the correct setting for a specific terrain type.
**Setup:** A rough section that shows clear suspension activity in the data.
**Execution:**
1. Complete 5 passes with current rebound setting. Record the trace.
2. Open both rebound adjusters (fork and shock) by 3 clicks from current position (faster rebound).
3. Complete 5 passes. Review trace: does the suspension recover more quickly between hits? Has packing reduced?
4. If the trace now shows the suspension overextending (bouncing past neutral), add 1 click of rebound back.
5. Continue in 1-click increments until the trace shows full recovery between hits without overextension.
**Success Criteria:** The suspension trace shows consistent return to near-full extension between impacts with no progressive packing trend. No overextension spikes visible.
**Duration/Reps:** Multiple 5-pass blocks, one per setting change. Document each setting.
**Progression:** Repeat the same process for a different terrain type (e.g., compare hard-pack optimum vs soft-terrain optimum settings).

### Drill 4: Travel Usage Percentage Target Drill
**Purpose:** Set and progressively raise the rider's dynamic suspension travel usage target — building confidence to use the available travel without fear of bottoming.
**Setup:** A section with measurable suspension data, with the rider knowing the percentage of available travel currently being used.
**Execution:**
1. Establish the rider's current average travel usage percentage for the section (e.g., fork is using 55% of available travel on average).
2. Set a target 10% higher (65% in this example) and instruct the rider to increase pace until the trace shows that usage level.
3. Check that the increased travel usage does not produce bottoming events — if it does, the pace increase was too large.
4. Hold the new target for 5 consecutive laps without bottoming, then raise the target another 10%.
5. Stop raising the target when the rider begins consistently approaching 85% of available travel — that is a healthy operational ceiling for most sections.
**Success Criteria:** Average travel usage percentage increases by 10% per drill block. No new bottoming events introduced. Rider reports that the bike "feels better" at the higher travel usage — a sign the suspension is working as designed.
**Duration/Reps:** 5 passes per target level. Multiple levels per session.
**Progression:** Apply the same progressive travel usage target approach to a more technically demanding section where the travel usage is different.

## 7. CROSS-REFERENCES & DEPENDENCIES

**This topic connects to:**
- SENSOR-05 (IMU / G-Force Analysis): vertical G channel validates suspension compression events — correlating the two channels separates terrain-induced from rider-induced events; every suspension compression produces a corresponding G event, allowing the two channels to cross-validate each other
- SENSOR-06 (Brake Pressure): brake-induced fork dive events require cross-referencing with brake pressure channel to diagnose correctly
- SENSOR-01 (GPS Speed Trace): speed at which suspension events occur determines whether events are setup-related (too soft for the speed) or technique-related
- SENSOR-10 (Multi-Channel Data Fusion): suspension data is a key channel in multi-channel impact analysis
- BIKESETUP-03 (Suspension Setup): the setup context required to correctly interpret whether suspension data reflects a setup or technique problem

**This topic is prerequisite for:**
- SENSOR-10: Multi-channel impact analysis requires suspension travel data as a primary channel

**This topic builds on:**
- BIKESETUP-03: Understanding spring rates, damping, and sag is required before suspension trace data can be meaningfully interpreted
- METRIC-01: Basic performance context for what "good" suspension usage should look like

## 8. TERRAIN & CONTEXT VARIATIONS

### Sand
In sand, suspension travel usage is relatively low — sand absorbs impacts. The main signals to look for are rear shock compression patterns reflecting how aggressively the rider is accelerating in sand (squat signatures) and fork compression in choppy sand whoops. Consistent fork pounding in sand whoops indicates the rider is not absorbing impacts through their legs.

### Mud
Mud creates unusual suspension loading — deep ruts and steps cause abrupt compression events similar to rock impacts. The suspension trace in mud is characterised by irregular, unpredictable spike patterns. Skilled mud riders show consistent rebound recovery between spikes; struggling riders show progressive packing as the mud prevents quick speed and the suspension is loaded repeatedly without recovery time.

### Rocky Terrain
Rocky terrain produces the most demanding and complex suspension traces — high frequency, high amplitude compression events. The key signals are bottoming frequency (how often is the suspension running out of travel?) and packing trend (is rebound keeping up with the hit frequency?). Very rocky terrain at speed is where suspension setup matters most and where technique errors in braking and body position have the greatest negative impact.

### Steep Incline
Climbs show characteristic rear shock squat as the engine drives the rear wheel against gravity. The trace should show sustained rear compression with recovery as the slope eases. A front fork that compresses repeatedly on a climb indicates front wheel deflection off rocks — the rider is not picking lines that allow the front wheel to roll rather than deflect.

### Steep Descent
Descents load the front fork heavily as gravity and braking both compress it. The fork trace on a descent from a skilled rider shows controlled, moderate compression — not bottoming. A fork that bottoms repeatedly on descents is either a setup issue (too soft) or the rider is braking too aggressively downhill. The rear shock on descents is relatively unloaded — light compression only.

### Tight Trees / Narrow Sections
Tight woodland sections produce a distinctive suspension trace characterised by moderate-frequency, irregular compression events from roots, ruts, and tree roots crossing the track. The low average speed means impact velocities are lower, so peak compression values should be modest. If the trace shows large compression spikes at low GPS speed in tight trees, the rider is hitting features squarely rather than rolling over them on a good line — a line selection problem that the suspension data is exposing.

## 9. EXPERT INSIGHTS & SOURCES

### Key Insights
- **WP Suspension and Öhlins factory data analysis philosophy:** Both suspension manufacturers' racing support teams use travel data as the primary tool for setup changes between special test stages at World Enduro Championship level. The standard process is: run a section, review travel data, adjust compression and rebound in 2-click increments, re-run. The rider's feedback is secondary to the data, because riders often cannot accurately describe what the suspension is doing at speed.
- **Principle of setup transparency:** The best suspension setup is one the rider does not notice — the bike just feels planted and controlled. If the rider is consciously fighting the suspension, the trace will show it through asymmetric loading and overuse of travel. The goal is a trace that looks effortlessly smooth.
- **Rider-induced bottoming is more common than terrain-induced:** Analysis of club-level enduro rider suspension data consistently shows the majority of bottoming events are caused by late, aggressive braking rather than terrain that exceeds the suspension's capability. This means most bottoming is a technique issue, not a setup issue.
- **Spring rate vs damping decisions from data:** Suspension setup decisions guided by data follow a clear hierarchy. First, confirm that static sag is correct — this is a spring rate and preload adjustment. Then confirm that dynamic sag (the mean of the travel trace during riding) is in the acceptable range. Only after sag is confirmed should compression and rebound damping be adjusted. Many riders incorrectly adjust damping to compensate for incorrect sag — the data reveals this because the trace mean will be off regardless of damping settings.
- **Front-rear suspension balance as a setup and technique audit:** A perfectly balanced rider on correctly set up suspension will show approximately equal percentage travel usage on front and rear across a full mixed session. Any significant deviation (more than 20% difference in average travel percentage) indicates either a setup imbalance (spring rates not matched to weight distribution) or a technique bias (body position systematically loading one end). Data can identify the presence of imbalance but cannot distinguish the cause — a human coach or the technique channels are required to determine whether it is setup or body position.

### Sources & References
- WP Suspension technical documentation — travel sensor installation and interpretation guides for enduro applications
- Öhlins Suspension setup guides for enduro — data-driven setup methodology
- MXGP and Enduro GP technical regulations — suspension sensor specifications
- AiM Sports suspension channel analysis guides — potentiometer installation and data interpretation
- Gary Semics MX Coaching — suspension and body position interaction in motocross (applicable to enduro)
- "Motorcycle Dynamics" by Vittore Cossalter — theoretical foundation for suspension loading and rider interaction
- Suspension Secrets by Paul Thede and Lee Parks — data-driven suspension tuning methodology for motorcycles
