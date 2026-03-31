---
topic_id: SENSOR-05
title: IMU / G-Force Analysis
domain: Sensor & Data Interpretation
domain_id: 14
difficulty_range: intermediate–advanced
related_topics: [SENSOR-01, SENSOR-04, SENSOR-06, SENSOR-10, BIOMECH-08]
prerequisites: [METRIC-01, SENSOR-01]
tags: [sensor, IMU, accelerometer, gyroscope, g-force, lean-angle, traction-circle, telemetry]
version: 1.0
last_updated: 2026-03-30
---

# IMU / G-Force Analysis

## 1. OVERVIEW

An Inertial Measurement Unit combines accelerometers and gyroscopes to measure forces and rotation rates across three axes simultaneously. On an enduro motorcycle, the IMU reports longitudinal G (forward/backward — braking and acceleration forces), lateral G (sideways — cornering forces), and vertical G (up/down — terrain impacts and jumps), plus pitch, roll, and yaw rates typically measured in degrees per second. The combined channels create a rich, six-degree-of-freedom picture of how the bike is moving through space at any moment. For coaching purposes, IMU data exposes input quality in a way that no single channel can: abrupt vs progressive inputs appear immediately in the G force traces, traction events generate characteristic IMU signatures, and body movement patterns create predictable gyroscope signatures. IMU data is the closest thing to riding inside the physics of the bike. When mounted rigidly to the frame, the IMU captures both rider-induced and terrain-induced forces simultaneously — the skill in interpretation is separating the two to isolate technique signals from terrain noise.

## 2. CORE PRINCIPLES

### Principle 1: The Traction Circle Defines the Envelope
The traction available at any moment is limited — it can be used for braking, cornering, or acceleration, but the total cannot exceed what the tyre-ground interface provides. Plotting longitudinal G against lateral G creates the traction circle (or traction ellipse for most tyres). Points inside the circle indicate unused traction capacity; points on the boundary are at the limit; points beyond indicate traction loss. IMU data from an entire session, plotted as a scatter chart of longitudinal vs lateral G, instantly shows whether the rider is operating conservatively (cluster near the centre) or at the limit (cluster near the edge).

### Principle 2: Longitudinal G Shape Encodes Input Quality
The rate of change of longitudinal G — how quickly braking or acceleration G builds — reflects input quality. A progressive braking event appears as a smooth, gradual rise in negative longitudinal G, reaching a sustained peak, then a gradual release as the corner apex approaches. Panic braking appears as a near-vertical spike to maximum negative G. Smooth throttle-on appears as a consistent positive G ramp. A snap throttle appears as an abrupt positive G spike. The shape of the G trace — its slopes and curvatures — is the input quality signature.

### Principle 3: Lateral G Reveals Cornering Technique Quality
In off-road riding, lateral G in corners should be progressive (building as speed and lean angle increase) and sustained (maintained through the apex) rather than peaking then dropping mid-corner (which indicates the rider ran wide or the tyre lost grip). Very low lateral G through corners indicates the rider is not committing lean angle and is cornering far below the traction limit. Asymmetric lateral G between left and right corners of similar speed indicates a technical difference in the rider's left vs right cornering technique.

### Principle 4: Pitch Data Encodes Fore/Aft Weight Transfer
The gyroscope pitch channel measures the bike's nose-up/nose-down rotation rate. Wheelies produce positive pitch (nose rising); endos produce negative pitch (nose diving). More subtly, the pitch channel shows the bike's balance during braking (nose-down moment from front brake) and acceleration (nose-up moment from drive). A bike that pitches aggressively under braking and returns slowly suggests the rider is braking hard but releasing slowly — potentially because they are trail braking or because they are afraid to go to throttle.

### Principle 5: Vertical G Measures Terrain Severity and Landing Quality
Vertical G spikes correspond to terrain impacts and jump landings. A well-executed landing on a jump produces a moderate, single vertical G spike as the suspension absorbs the landing. A poor, wheel-first landing produces a very large initial spike followed by rapid oscillations. Flat landings (both wheels simultaneously) produce the highest vertical G peaks. The magnitude of vertical G spikes, correlated with GPS speed, allows calculation of what terrain features the bike is encountering and whether the suspension and rider are managing them appropriately.

### Principle 6: Gyroscope Data Reveals Bike Stability and Tank-Slappers
The yaw gyroscope measures side-to-side rotation of the bike around the vertical axis. Sudden, oscillating yaw signatures indicate tank-slapper events (handlebar oscillation), which occur when the front wheel regains grip after a slide and snaps back violently. Similarly, high roll-rate oscillations indicate the bike is weaving side-to-side under traction loss. Identifying these events in IMU data and correlating them with speed and terrain features helps pinpoint the specific conditions that are destabilising the bike.

## 3. TECHNIQUE BREAKDOWN BY LEVEL

### 3a. Beginner Level
**Goal:** Understand what the three primary G channels mean and learn to identify the most important single event type — the panic braking spike — in the longitudinal G trace.

**Key Focus Areas:**
- Reading longitudinal G to identify whether braking is progressive (gradual) or abrupt (spike)
- Connecting lateral G values to corner speed and commitment — very low lateral G means very slow corners
- Understanding that vertical G spikes correspond to impacts and that large spikes indicate the suspension is not managing terrain well
- Learning that the traction circle concept means braking, cornering, and acceleration all compete for the same available grip

**What Good Looks Like:**
At beginner level, a good IMU trace shows braking events with smooth, gradual negative G buildup rather than abrupt spikes. Lateral G during corners is consistently positive (the rider is committing lean angle). Vertical G spikes from terrain impacts are present (the terrain is challenging) but moderate in magnitude.

**Common Mistakes:**
- **Multiple large longitudinal G spikes in braking zones:** Each brake application is abrupt. Why it happens: rider grabs the brake lever rather than squeezing progressively. → Slow down the brake application — squeeze like a handshake, not a punch.
- **Very low lateral G throughout session:** Rider is not committing lean angle in corners. Why it happens: fear of tipping over. → Low lateral G means slow corners — more lean angle equals more speed, not less safety.
- **Repeated large vertical G spikes in the same location:** One terrain feature is consistently producing large impacts. → Investigate whether the speed is too high for the feature, or whether the suspension or body position is not absorbing the impact.

### 3b. Intermediate Level
**Goal:** Use the traction circle to identify unused traction capacity and connect G-trace shapes to specific technique improvements in braking and cornering.

**Progression Markers from Beginner:** Rider can identify panic braking spikes and has reduced their frequency. Lateral G is consistently positive in corners. Understands traction circle concept.

**Key Focus Areas:**
- Plotting the traction circle and identifying where the cluster sits — are they consistently operating in one quadrant or using the full circle?
- Identifying asymmetric left vs right lateral G — is the rider less committed on one side?
- Reading the pitch trace to understand front-end loading during braking — are they over-loading the front fork?
- Correlating longitudinal G with TPS channel to create a complete braking-to-acceleration picture for each corner

**What Good Looks Like:**
The traction circle plot shows a moderate ellipse rather than a tight central cluster — the rider is using meaningful traction capacity. Left and right corners show similar lateral G magnitudes. Braking events show gradual G ramp-ups. The transition from negative longitudinal G (braking) to positive longitudinal G (acceleration) at each corner apex is smooth rather than abrupt.

**Common Mistakes:**
- **Left-right lateral G asymmetry:** One direction consistently shows lower G than the other. Why it happens: physical asymmetry, dominant side confidence, or a specific technique error on the weaker side. → Target the weaker side specifically; identify whether it is lean angle, body position, or throttle application that differs.
- **Mid-corner longitudinal G spikes:** Negative G (braking) occurring in the middle of a corner — mid-corner braking visible in the data. → Mid-corner braking disrupts the traction balance and pushes the front toward the limit. Identify what is triggering it and eliminate.
- **Abrupt positive-to-negative G transition at apex:** Rider stays on brakes through the apex and snaps the throttle on — no smooth transition. → Trail braking coaching is the solution — teaching the rider to blend brake release with throttle application at the apex.

### 3c. Advanced Level
**Goal:** Use IMU data as a precision technique audit — identifying every moment where traction capacity is wasted, transition is abrupt, or the bike is destabilised.

**Progression Markers from Intermediate:** Traction circle plot shows usage closer to the ellipse boundary. Braking events are smooth. Left/right asymmetry is minimal.

**Key Focus Areas:**
- Identifying the specific percentage of traction limit being operated at, by corner and section
- Reading yaw gyroscope for tank-slapper precursors — elevated yaw oscillation preceding a crash risk event
- Analysing pitch gyroscope for wheelie risk moments — pitch rate rising sharply under aggressive acceleration
- Comparing the IMU signature of a clean technical section against the same section in a failed or difficult run to identify what changed

**What Good Looks Like:**
The traction circle plot at advanced level shows a well-distributed ellipse, with the cluster consistently near the 80–90% boundary — operating at the limit intentionally, not accidentally. Braking G traces show smooth peaks with gradual onset. Lateral G is consistent and high through corners. The pitch and yaw gyroscopes show smooth, predictable patterns without oscillation.

**Common Mistakes:**
- **Traction circle showing isolated extreme outliers:** Most data is reasonable but occasional extreme points indicate uncontrolled moments. → Each outlier point is a near-miss — correlate with video and GPS to identify exact moments and causes.
- **Pitch oscillations on accelerating exits:** The bike is pitching back and forth as the rider applies and then eases throttle. → Throttle oscillation causing longitudinal pitch — connect TPS trace to the pitch gyroscope data.

## 4. DIAGNOSTIC CUES (AI COACHING ENGINE REFERENCE)

### Visual Cues
- Traction circle scatter plot clustered tightly near centre: rider operating far below traction limit — significant performance capacity unused
- Traction circle scatter plot showing outlier points beyond the ellipse boundary: traction loss events occurred
- Longitudinal G trace showing repeated abrupt negative spikes during braking: panic or grab-braking pattern
- Lateral G trace showing consistently lower values on one cornering direction: left-right asymmetry in technique
- Vertical G spikes consistently exceeding 3G at the same GPS location: setup or technique issue at a specific terrain feature
- Yaw rate oscillations (rapid side-to-side alternation) following a speed reduction event: tank-slapper or front-end instability signature
- Pitch rate rising steeply without corresponding forward acceleration: wheelie initiation or front wheel lift

### Audio Cues
- A sharp clunk or slap sound corresponds to a large vertical G spike — direct impact event
- A rhythmic side-to-side noise from the handlebars (tank-slapper warning sounds from rider) corresponds to yaw oscillation in the gyroscope channel
- A sudden tyre squeal or slide sound corresponds to a lateral G exceedance event — the moment the tyre broke loose

### Sensor Cues
- IMU sensors must be mounted rigidly to the frame — handlebar-mounted IMUs pick up handlebar oscillation, not chassis movement, and can produce false yaw and roll rate readings
- Accelerometer saturation (hitting the measurement ceiling of the sensor range) produces flat-topped spikes — verify the sensor's G range is appropriate for the application (minimum ±10G for off-road)
- GPS-derived acceleration (differentiated speed) can be compared against IMU longitudinal G to validate both channels — consistent disagreement indicates a calibration error
- Lean angle calculation from IMU requires careful calibration for off-road use — off-camber terrain creates false lean angle readings if the algorithm assumes flat ground

## 5. COACHING CUES & LANGUAGE

### Positive Reinforcement
- "Look at your traction circle — you're consistently working at the 80–85% boundary in corners. That's committed, skilled riding. You're using the traction, not leaving it on the table."
- "Your braking G trace is smooth on every corner this session. No spikes, no panic moments. The brake is going on like a handshake every time."
- "Your left and right corners are almost perfectly symmetrical in lateral G now. Three weeks ago your right corners were half the commitment of your left. You've closed that gap completely."

### Corrective Feedback
- "See these spikes in the longitudinal G trace? Every one of those is a grab-braking event. The G goes from zero to maximum in a fraction of a second. That's your fingers snapping the lever shut instead of squeezing it. Slow the lever hand down."
- "Your traction circle looks like a bullet — everything pointed in one direction, longitudinal braking. You're braking hard and going fast in straight lines, but your lateral G is almost nothing. You're not committing lean angle in corners."
- "That yaw oscillation after corner 3 — that's the front end chattering. You hit the corner too fast and the front broke loose briefly. The yaw data shows the bike was trying to fall into a tank-slapper. That's where we need to reduce entry speed and rebuild commitment from a safer level."
- "Your vertical G through the rock garden is peaking at 4.5G on the same rock every lap. That rock is not getting any bigger — the impact is coming from your approach angle and speed. Let's look at your line."

### Progression Prompts
- "Pull up the traction circle plot for today and compare it to two months ago. The ellipse has grown — you are using more of the traction available. That's measurable progress in a place where most riders cannot even see improvement happening."
- "Your traction circle shows you're consistently at 70% of available grip in corners. Your target for next session is to push that to 80%. That means more lean angle, not more speed — lean the bike further and let it do the work."
- "Let's look at your transition from braking to throttle at corner 4. Right now it's an abrupt switch — the G trace goes from negative to positive with a sharp step at zero. I want to see a smooth curve through zero. That's trail braking. Let's start working on it."
- "Your pitch gyroscope shows front wheel lift starting on every high-speed crest. That's fine if it's controlled, but it's uncontrolled right now — the pitch rate is random. Work on pre-loading the front before the crest to keep the wheel on the ground."

## 6. DRILLS & PRACTICE EXERCISES

### Drill 1: Progressive Braking G Ramp Drill
**Purpose:** Replace abrupt panic-brake spikes with smooth, progressive braking events that show as clean G ramps in the data.
**Setup:** A straight section of track with a clear braking zone at the end.
**Execution:**
1. Complete 10 braking events from the same speed to the same target point.
2. Focus on the first 20% of the brake application — count to two silently before applying full braking force.
3. Review the longitudinal G trace: does the rise look like a steep spike or a gradual ramp?
4. Repeat, trying to make the initial G ramp as gradual as possible while still reaching the same deceleration peak.
5. Track whether the peak G changes — a longer ramp can reach the same peak, just more smoothly.
**Success Criteria:** Braking G traces show a gradual ramp-up of at least 0.3 seconds before reaching peak deceleration. No near-vertical spikes.
**Duration/Reps:** 20 braking events, reviewing trace every 5.
**Progression:** Apply the progressive braking technique at higher initial speeds. Then combine with a corner after the braking zone.

### Drill 2: Left/Right Symmetry Corner Drill
**Purpose:** Identify and close the lateral G gap between the rider's confident and weak cornering direction.
**Setup:** A loop that includes comparable left and right corners at similar speeds.
**Execution:**
1. Complete 5 laps and review lateral G for left vs right corners of comparable geometry.
2. Identify the weaker direction (lower lateral G).
3. Focus the next 5 laps entirely on the weak direction: more lean angle, more commitment at the apex.
4. Compare the lateral G data before and after.
5. Alternate focus between strong and weak direction until the values converge.
**Success Criteria:** Left and right lateral G values for similar corners are within 15% of each other across a session.
**Duration/Reps:** Three blocks of 5 laps with focused analysis between blocks.
**Progression:** Reduce the margin target to 10%, then 5%. Then apply the same symmetry focus to a different section with tighter corners.

### Drill 3: Traction Circle Expansion Session
**Purpose:** Deliberately push the traction circle boundary under controlled conditions to build confidence and identify the actual grip limit.
**Setup:** A smooth, consistent section with one corner that is well-understood and low-risk.
**Execution:**
1. Complete 5 laps at normal pace. Plot the traction circle — establish baseline position.
2. For the next 5 laps, increase lean angle in the target corner — aim to push lateral G 15% higher than baseline.
3. Review: did the G increase? Did any traction loss events occur (outlier points beyond the boundary)?
4. If no traction loss: push another 10% in the next 5 laps.
5. Stop when the data shows traction loss events (outliers) — that is the boundary.
**Success Criteria:** Rider can identify their current traction circle operating position with a percentage. Has explored the boundary in a controlled setting and knows where the limit is.
**Duration/Reps:** Three blocks of 5 laps, with data review between each block.
**Progression:** Repeat the process on different terrain types (hard pack, gravel, grass) to understand how the traction circle size changes with surface.

### Drill 4: Pitch Gyroscope Awareness Drill
**Purpose:** Develop awareness of the bike's front-rear pitch behaviour during acceleration and braking — using the IMU pitch channel as a training feedback tool.
**Setup:** A straight section with a defined braking zone and acceleration zone.
**Execution:**
1. Complete 10 passes of the section. Review the pitch gyroscope channel.
2. Identify peak pitch-up rate (front wheel lift tendency under acceleration) and peak pitch-down rate (front fork dive under braking).
3. Set a pitch-up limit target — the maximum pitch rate that keeps the front wheel controllably light without requiring correction.
4. On the next 10 passes, manage throttle application specifically to stay below the pitch-up limit.
5. Review whether the pitch-up reduction coincided with any speed loss — ideally the bike reaches the same exit speed but with lower front-wheel-lift tendency.
**Success Criteria:** Peak pitch-up rate reduces by 20% from baseline without a corresponding reduction in exit speed. The rider can feel the connection between throttle ramp rate and pitch behaviour.
**Duration/Reps:** Two blocks of 10 passes with data review between blocks.
**Progression:** Apply the same pitch management discipline to a section with a corner exit — combine pitch awareness with cornering lateral G to build the full traction circle picture.

## 7. CROSS-REFERENCES & DEPENDENCIES

**This topic connects to:**
- SENSOR-01 (GPS Speed Trace): speed trace provides the context in which G events occur — correlating speed with G magnitude classifies events correctly
- SENSOR-04 (Suspension Travel Data): vertical G spikes correlate directly with suspension compression events — together they describe terrain impact management
- SENSOR-06 (Brake Pressure): braking G corresponds to brake pressure application — comparing the two channels reveals braking efficiency
- SENSOR-10 (Multi-Channel Data Fusion): IMU data is central to multi-channel analysis, providing the physical force context for all other channels
- BIOMECH-08 (Centre of Mass): G-force data reflects the consequences of CoM movement and loading decisions

**This topic is prerequisite for:**
- SENSOR-10: Multi-channel fusion analysis of traction and input quality requires IMU as a primary channel

**This topic builds on:**
- SENSOR-01: GPS speed trace establishes where events occur; IMU describes what forces were involved
- METRIC-01: Basic performance metrics provide the performance context for interpreting G levels

## 8. TERRAIN & CONTEXT VARIATIONS

### Sand
Sand significantly reduces the maximum lateral G available — the traction circle shrinks. A rider operating at 80% of a hard-pack traction circle may be at 100% or beyond in sand, without realising it. IMU data in sand shows lower absolute G values but more frequent traction loss events. The coaching signal is to set lower G targets for sand sections.

### Mud
Mud produces extremely low lateral G capacity and unpredictable longitudinal G. The traction circle in mud may be less than 30% of the hard-pack value. IMU data in mud shows frequent outlier points outside the available traction boundary, indicating riders regularly exceed grip limits in mud. The coaching focus in mud is on recognising the traction loss signature (yaw oscillation) and recovering rather than preventing it.

### Rocky Terrain
Rocky terrain produces the most complex IMU data — frequent vertical G spikes from impacts, plus reduced lateral G capacity on individual rocks. The key coaching signals are vertical G magnitude (are impacts within manageable limits?) and whether lateral G exceedance events coincide with specific rocks (tyre-on-rock contact changing grip unexpectedly).

### Steep Incline
Climbing changes the reference frame for the IMU — the longitudinal axis tilts, so what the accelerometer reports as "longitudinal" G includes a gravity component on a slope. Data analysis must account for the slope angle (calculable from GPS elevation data) to correctly interpret braking and acceleration G during hill climbing.

### Steep Descent
Similarly to climbs, descents require gravity correction for accurate G interpretation. A bike descending a steep grade with no braking will show negative longitudinal G from gravity alone — not from braking. Coaching analysis must normalise for slope to correctly identify true braking G vs gravitational acceleration.

### Tight Trees / Narrow Sections
In tight woodland sections, lateral G values are low — speeds are too slow for significant cornering forces. The most diagnostic IMU channels in tight trees are the yaw gyroscope (side-to-side directional changes) and the vertical G channel (root and stump impacts). High yaw rates in tight trees indicate aggressive direction changes — the rider is fighting for line rather than flowing through. Low yaw rates with consistent forward progress indicate the rider has found a flow state through the trees. Vertical G spikes at low speed in tight trees indicate poor line selection — hitting features squarely rather than threading between them.

## 9. EXPERT INSIGHTS & SOURCES

### Key Insights
- **MotoGP traction circle analysis:** MotoGP teams publish traction circle diagrams from individual corners showing that top riders consistently operate at 90–95% of tyre capacity in corners, with near-perfect transitions between braking, apex, and exit. The same analytical framework applies directly to enduro — the circle is smaller, but the principle is identical.
- **WRC and rally application:** World Rally Championship teams have used IMU-based traction analysis for decades. The finding that consistently emerges is that stage time correlates more strongly with how evenly the traction circle is used (well-distributed) than with how large the maximum G values are — meaning smooth, committed riding beats erratic, aggressive riding.
- **Off-road IMU complexity:** Road-racing IMU analysis assumes a relatively predictable surface. Off-road requires accepting that vertical G spikes from terrain are expected and filtering them to avoid drowning the technique signal. Advanced coaching engines should use a running mean filter on G data, with spike detection for terrain impact classification.
- **Lean angle estimation from IMU:** In off-road, lean angle estimated from the roll-rate gyroscope is less reliable than in road racing because the terrain surface itself may be off-camber. A bike leaning 30 degrees on an off-camber hillside has a very different effective lean angle to the same bike on flat ground.
- **IMU sensor fusion with GPS for improved accuracy:** Integrating IMU accelerometer data with GPS position data using a Kalman filter produces a combined position and velocity estimate that is more accurate than either sensor alone. GPS provides absolute position reference that corrects IMU drift; IMU provides high-frequency data between GPS samples. This sensor fusion approach is standard in automotive applications and increasingly available in motorcycle-specific data loggers. The result is a smoother, more accurate speed trace and better G-force resolution at the GPS sample-rate gaps.
- **G-force limits in off-road vs road:** On tarmac, a modern performance tyre can sustain 1.2–1.5G in combined braking and cornering. A knobby enduro tyre on hardpack sustains approximately 0.6–0.8G. In mud or sand, the limit may be 0.3–0.4G. Coaching analysis must normalise G targets to the tyre type and surface — an enduro rider at 0.6G lateral in hard-pack corners is operating at a higher percentage of available grip than a road rider at 0.6G.

### Sources & References
- MotoGP telemetry documentation: Dorna Sports / MotoGP.com technical analysis features
- World Rally Championship data analysis: M-Sport Ford and Hyundai Motorsport technical reports (publicly available)
- Bosch Motorsport IMU documentation — motorsport-grade inertial measurement applications
- AiM Sports gyroscope and accelerometer channel interpretation guides
- "Race Car Vehicle Dynamics" by Milliken and Milliken — traction circle theory (automotive, directly applicable principle)
- Cosworth Electronics — off-road data acquisition for rally and enduro applications
- Kalman filter implementation for GPS/IMU fusion: academic literature and STMicroelectronics application notes
- VectorNav Technologies — IMU integration documentation for motorsport and off-road applications
- SAE International: "Inertial Measurement Unit Applications in Motorsport" — technical paper collection covering G-force analysis methodology
