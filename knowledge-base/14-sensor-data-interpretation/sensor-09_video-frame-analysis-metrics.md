---
topic_id: SENSOR-09
title: Video Frame Analysis Metrics
domain: Sensor & Data Interpretation
domain_id: 14
difficulty_range: intermediate–advanced
related_topics: [SENSOR-05, SENSOR-08, SENSOR-10, BIOMECH-01, BIOMECH-09]
prerequisites: [BIOMECH-01, METRIC-01]
tags: [sensor, video, frame-analysis, body-position, keypoint-detection, lean-angle, gaze, AI-vision]
version: 1.0
last_updated: 2026-03-30
---

# Video Frame Analysis Metrics

## 1. OVERVIEW

Video frame analysis applies computer vision techniques to extract quantitative technique metrics from action camera footage — transforming subjective visual observations into measurable, comparable data. Rather than a coach watching video and commenting qualitatively, the AI system can detect rider body keypoints (head, shoulders, elbows, hips, knees), calculate angular relationships between body segments, estimate lean angle from frame geometry, infer gaze direction from head orientation, and measure relative movement of the rider against the bike frame across time. The result is a channel of quantitative body position data that can be analysed, trended, and compared across sessions in the same way as sensor data. For RideMind, video frame metrics are the primary technique channel in the MVP — they provide biomechanical information that no other available sensor can deliver, particularly in the absence of dedicated IMU body-tracking hardware. Unlike sensor channels that require hardware installation, video analysis requires only an action camera the rider likely already owns — making it the most accessible high-value data channel for the widest possible rider audience.

## 2. CORE PRINCIPLES

### Principle 1: Keypoint Detection Converts Video into Body Position Data
Modern pose estimation models (such as MediaPipe BlazePose, OpenPose, or YOLOv8 Pose) can detect 17–33 body keypoints per frame — including head, neck, shoulders, elbows, wrists, hips, knees, and ankles — at real-time or near-real-time speeds. When applied to enduro riding video, these keypoints create a per-frame skeleton overlay that quantifies body segment positions. Joint angles (knee angle, elbow angle, hip hinge angle) can be calculated from connected keypoints. Changes in these angles across frames create time-series body position channels that parallel the mechanical sensor data.

### Principle 2: Head Position Relative to the Handlebar Is a Primary Technique Indicator
In enduro riding, the horizontal distance between the rider's head keypoint and the handlebar region (identified from the bike frame in video) is a reliable indicator of body position fore/aft on the bike. A head position significantly behind the handlebar indicates a rearward weight bias. A head position at or forward of the handlebar indicates a forward-aggressive position. This ratio — head-to-bar horizontal offset — changes with terrain in a pattern that reflects the rider's body position adaptation quality.

### Principle 3: Elbow Height Relative to the Shoulder Is a Posture Quality Indicator
In the correct enduro attack position, the elbows are raised to approximately shoulder height or slightly above, angled outward from the body. Collapsed elbows (elbows below shoulder height, tucked against the body) indicate tension, arm pump risk, and reduced bar control leverage. From a front-facing or chase camera, elbow height relative to shoulder keypoints can be measured in each frame, and the proportion of riding time with correct elbow position calculated across a session.

### Principle 4: Pixel Flow Analysis Infers Momentum and Smoothness
Optical flow algorithms measure the velocity and direction of pixel movement between consecutive video frames. In a chase camera setup, the background moves forward as the bike moves forward — the speed of background flow correlates with riding speed. More relevantly, the relative motion of the rider's body keypoints against the fixed bike frame (seat, handlebars) reveals how much the rider is absorbing terrain versus transmitting impacts to the upper body. A rider with excellent absorption technique shows minimal upper body movement against the bike frame despite significant terrain-induced bike motion.

### Principle 5: Lean Angle Can Be Estimated from Frame Geometry
The angular deviation of the bike from vertical can be estimated from video frames by detecting the angle of the fork legs, the swing arm, or the overall bike silhouette relative to the vertical axis of the frame. This lean angle estimation is less precise than IMU-derived lean angle (errors of 3–8 degrees are typical) but provides useful trend data for identifying riders who are consistently under-leaning in corners or who show asymmetric lean angle between left and right corners.

### Principle 6: Gaze Direction Inference Predicts Terrain Reading Quality
Head yaw angle — the left-right rotation of the head relative to the bike's forward axis — inferred from the relative position of ear keypoints and nose keypoint in video frames, provides an estimate of where the rider is looking. A rider who consistently looks directly ahead (zero head yaw) is potentially not scanning ahead or looking into corners. A rider whose head yaw rotates into corners before the bike turns is demonstrating active terrain reading and anticipatory gaze. This head-yaw lead time is a quantitative measure of vision and anticipation quality. Head-yaw lead time is one of the most powerful single-metric predictors of overall riding skill level — experienced riders consistently show significantly longer lead times than beginners, and improving this metric through deliberate vision training produces measurable improvements in corner entry speed and line selection quality.

## 3. TECHNIQUE BREAKDOWN BY LEVEL

### 3a. Beginner Level
**Goal:** Establish baseline body position metrics from video — primarily confirming whether the rider is standing or sitting, and whether basic elbow position is correct.

**Key Focus Areas:**
- Detecting sitting vs standing as a binary classification from keypoint data — is the gap between hip keypoint and seat height (inferred from bike frame detection) measurably positive (standing) or near-zero (sitting)?
- Measuring elbow height relative to shoulder across the session — what proportion of riding time shows correct elbow position?
- Identifying gross body position errors visible from a chase or side camera — does the rider's head remain approximately level across rough terrain (good absorption) or does it bounce significantly (locked knees, not absorbing)?
- Establishing the rider's personal keypoint baseline for later comparison

**What Good Looks Like:**
At beginner level, the video metrics show standing position in rough terrain sections (confirmed by hip-seat gap), elbow height at or near shoulder level for a significant proportion of riding time, and moderate head stability across rough sections. These are achievable baselines that can be tracked for improvement over time.

**Common Mistakes:**
- **Sitting detected during rough sections:** Hip-seat gap metric falls to zero or near-zero during technically demanding terrain. Why it happens: rider reverts to seated position under pressure — the most common beginner error. → Stand before it gets rough; use terrain anticipation rather than reaction.
- **Elbow height consistently below shoulder:** The elbow-to-shoulder vertical ratio is negative throughout the session. Why it happens: tension and arm pump causing collapse, or rider unfamiliar with correct position. → Active elbows-up cue; reconnect to the physical sensation of correct position.
- **High head bounce amplitude in rough sections:** Head keypoint shows large vertical amplitude oscillations correlated with terrain impact events. Why it happens: legs not absorbing — either locked knees or seated position transmitting terrain to the torso. → Active knee flex; let the legs work.

### 3b. Intermediate Level
**Goal:** Use video frame metrics to quantify the quality of active body position changes — not just static position, but dynamic adaptation across terrain.

**Progression Markers from Beginner:** Standing position is confirmed in rough terrain sections. Elbow height is generally acceptable. Gross position errors are reduced.

**Key Focus Areas:**
- Measuring head-to-bar offset change across terrain transitions — does the rider shift forward on climbs and rearward on descents as expected?
- Quantifying the head stability metric (vertical head amplitude relative to bike motion) and tracking it over sessions
- Measuring the head yaw lead time in corners — does the rider's head turn into corners before the bike does (good) or after (reactive vision)?
- Identifying left-right body position asymmetry in corners — comparing keypoint geometry on left vs right corners of similar speed

**What Good Looks Like:**
The video metrics show dynamic body position changes that are terrain-appropriate: forward shift on climbs (head-to-bar offset reduces), rearward shift on descents (offset increases). Head yaw leads the bike into corners by at least 0.5 seconds. Head bounce amplitude during rough sections is moderate — the rider is absorbing some terrain but with room for improvement.

**Common Mistakes:**
- **Static body position regardless of terrain:** Head-to-bar offset does not change between climbs, descents, and flat sections. Why it happens: rider has one body position and does not adapt it. → Use terrain reading to anticipate required position change before the terrain demands it.
- **Reactive head yaw in corners:** Head yaw changes at the same time as or after the bike turn — rider is looking at the corner, not through it. → Vision must lead the turn by looking to the exit before initiating the turn.
- **Left-right asymmetry in lean angle:** Lean angle estimation from video shows consistently lower lean angles on one side. → Identify the weaker cornering direction and target confidence work specifically there.

### 3c. Advanced Level
**Goal:** Use video frame metrics as a precision audit of fine body position details — elbow position micro-changes, CoM relative movement within corners, and upper/lower body decoupling quality.

**Progression Markers from Intermediate:** Body position changes are terrain-responsive. Head yaw leads corners. Left-right asymmetry is reduced.

**Key Focus Areas:**
- Measuring upper-lower body decoupling: if the bike's frame orientation is changing (rolling, pitching) while the rider's upper body keypoints remain stable, decoupling is occurring — quantify this by calculating the differential between bike frame angle change and upper body angle change per frame
- Tracking elbow angle (not just height) — elbows should be slightly bent at all times; locked elbows visible in video as a specific keypoint geometry
- Identifying moments where the rider's CoM drops inside a corner (knee tracks inward, weight shifts to footpeg side) — advanced cornering technique visible in keypoint geometry
- Measuring the quality and timing of position transitions — how many frames does it take for the rider to complete a standing-to-sitting transition?

**What Good Looks Like:**
The video metrics at advanced level show a body position that is constantly, slightly in motion — the rider's CoM is being managed continuously. Upper body keypoints show significantly less angular change than the bike frame across rough terrain. Head yaw leads corners by 0.5–1.0 seconds consistently. Elbow angles are consistently in the correct range. Left and right cornering keypoint geometry is near-symmetric.

**Common Mistakes:**
- **Upper body over-correction:** Rider moves their upper body so dramatically to compensate for bike motion that the motion actually destabilises the bike rather than absorbing terrain. Visible in video as large upper body angular swings that precede bike instability events. → Smaller, more subtle body adjustments; the legs do the work, not the torso.
- **Gaze not extending far enough ahead:** Head yaw leads corners, but the absolute head position shows the rider is looking only 2–3 metres ahead rather than 10+ metres. → Vision training is separate from head yaw — looking further ahead is the goal, not just looking earlier.

## 4. DIAGNOSTIC CUES (AI COACHING ENGINE REFERENCE)

### Visual Cues
- Hip keypoint consistently at or below seat height during rough terrain sections: rider is sitting during technically demanding sections — most critical beginner error
- Elbow keypoints consistently below shoulder keypoints: collapsed elbow position — tension and reduced bar control
- Head keypoint showing large vertical oscillation amplitude synchronized with terrain impacts: rider not absorbing terrain through legs — impacts transmitting to torso
- Head-to-bar horizontal offset showing no change between climbs, flat sections, and descents: static body position, not adapting to terrain demands
- Head yaw keypoint change occurring simultaneously with or after bike yaw change in corners: reactive vision — rider is following the terrain, not leading it
- Left vs right corner keypoint geometry showing systematic differences in lean angle or body lean: directional asymmetry — weaker cornering side identified
- Rider upper body angular changes tracking closely with bike frame angular changes: poor decoupling — body is riding with the bike rather than independently of it

### Audio Cues
- From action camera audio: heavy breathing sounds correspond to high-effort sections — useful for cross-referencing with HR data when HR sensor data is available
- Handlebar noise (vibration, clunking) audible on action camera audio corresponds to moments when the rider is not absorbing terrain — these should align with high head bounce amplitude moments in the video metric trace

### Sensor Cues
- Video frame rate should be at minimum 60 fps for meaningful motion analysis in off-road riding — 30 fps misses rapid body position changes during impacts
- Keypoint detection confidence scores should be reviewed — low-confidence keypoints (typically caused by occlusion, motion blur, or extreme angles) should be excluded from metric calculations rather than averaged in as noisy data
- Camera mounting position significantly affects which metrics are calculable: chase camera enables head-to-bar offset and head stability metrics; front-facing camera enables lean angle estimation and gaze direction; side camera enables standing/sitting classification and elbow height analysis
- Temporal synchronisation between video and sensor data requires either a shared GPS timestamp or a synchronisation event (such as a hand gesture in front of the camera at the session start) that is also detectable in other channels

## 5. COACHING CUES & LANGUAGE

### Positive Reinforcement
- "Your head stability score through that rock section is significantly better than last session — your vertical head amplitude has almost halved. The legs are absorbing. I can see it in the numbers."
- "Your head yaw is consistently leading the corners by 0.8 seconds this session. You're looking where you're going, not where you are. That's how fast riders read terrain."
- "Your elbow height metric is excellent today — above shoulder level for 78% of the session. That's up from 45% four weeks ago. The position is becoming automatic."

### Corrective Feedback
- "Your hip metric shows you're sitting during three of the five most technical sections on the loop. We've worked on this, but under pressure you're still going back to the seat. The data doesn't lie — we need to make standing your automatic response, not your conscious response."
- "Look at your head bounce amplitude in the rock garden — it's twice what it is on the smooth sections, which tells me your legs are not absorbing those impacts. If your legs were working correctly, your head would barely move. Bend the knees. Let the bike come up into you, not the other way around."
- "Your head yaw is reacting to corners rather than leading them. See how the head angle changes at exactly the same moment as the bike angle? You're looking at the corner, not through it. Look to the exit before you start the turn."
- "Your left and right cornering lean angle metrics are still asymmetric — right corners are averaging 4 degrees less lean than left. That's your weaker side. We know this now. Let's spend 20 minutes specifically on right-hand corners today."

### Progression Prompts
- "Look at the side-by-side video metric comparison between today and six weeks ago. Your head-to-bar offset on climbs has changed by 15 cm — you're significantly more forward on climbs now. The technique change is real and the data confirms it. That is not a feeling — it's a measurement."
- "Your head stability metric is currently 8 cm of vertical amplitude per rough section pass. I want to get that below 5 cm. We'll use that as our target for the next three sessions. The drill to get there is the bump absorber drill — exaggerate the knee flex."
- "Try this in the next session: before every corner, consciously turn your head to look at the exit before you reach the turn-in point. It will feel like you're looking too far around too early. That's correct. Come back and we'll check whether your head yaw lead time has increased."
- "Your elbow collapse metric spikes during the technical uphill sections specifically. Those sections require more upper body tension to manage the throttle on the climb — but the elbows are folding as a result. Work on maintaining elbow height even when the physical demand is high. It's a conscious effort at first, then it becomes automatic."

## 6. DRILLS & PRACTICE EXERCISES

### Drill 1: Head Stability Video Audit
**Purpose:** Directly measure head bounce amplitude improvement over a session by using video metric feedback.
**Setup:** A rough section that produces measurable head bounce — at least 15 seconds of consistent rough terrain.
**Execution:**
1. Complete 3 passes of the section with normal riding. Extract head stability metric (vertical head amplitude relative to bike frame) from each pass.
2. Focus the next 3 passes entirely on knee flex — exaggerate the knee bend on each impact, consciously letting the knees rise toward the chest.
3. Extract the head stability metric from the second set of 3 passes.
4. Compare: has the vertical head amplitude reduced?
5. If not, the knee flex is not being maintained. Add a visual cue — look at a fixed point straight ahead and try to keep it in the same position in the video frame.
**Success Criteria:** Head vertical amplitude reduces by at least 20% between the first and second sets of passes.
**Duration/Reps:** Two blocks of 3 passes with metric review between blocks.
**Progression:** Increase terrain speed. Apply the same head stability drill to a section with larger, more irregular impacts.

### Drill 2: Corner Vision Lead Time Drill
**Purpose:** Increase the head yaw lead time before corners — making it measurable and trainable through video analysis.
**Setup:** A series of corners with clear visual exits — not blind corners.
**Execution:**
1. Complete 5 passes of the corner series. Measure head yaw lead time for each corner.
2. For the next 5 passes: before each corner, physically force the head to turn toward the exit as early as possible — well before the turn-in point.
3. The movement should feel uncomfortably early — looking at the exit when still approaching the entry.
4. Measure head yaw lead time from the second set. Has it increased?
5. Continue until head yaw consistently leads the bike by 0.5+ seconds.
**Success Criteria:** Head yaw lead time (from first frame of head turn to first frame of bike turn) increases to at least 0.5 seconds and remains consistent across all corners in the series.
**Duration/Reps:** Three blocks of 5 passes with metric review between blocks.
**Progression:** Apply the same vision lead discipline to blind or partially blind corners using known visual cues rather than direct visual of the exit.

### Drill 3: Body Position Adaptation Terrain Mapping
**Purpose:** Build the habit of adapting body position to terrain by measuring head-to-bar offset changes across terrain type transitions.
**Setup:** A section with clear terrain type transitions — flat to climb, climb to descent, flat to technical.
**Execution:**
1. Complete 5 passes of the section normally. Extract head-to-bar offset for each terrain segment.
2. Identify whether the offset is changing at the expected transitions (forward on climb, rearward on descent).
3. If the offset is static: actively exaggerate the body position change at each transition. Move deliberately forward before a climb; move deliberately rearward before a descent.
4. Complete 5 more passes with the exaggerated transitions. Compare offset metrics.
5. The goal is to see the metric respond to terrain changes — then gradually reduce the exaggeration until the natural movement produces the correct offset.
**Success Criteria:** Head-to-bar offset shows a statistically measurable difference between climb sections (lower offset = more forward) and descent sections (higher offset = more rearward) across 5 consistent passes.
**Duration/Reps:** Two blocks of 5 passes with metric review between blocks.
**Progression:** Reduce the deliberateness of the position changes — work toward the transitions being automatic and natural while maintaining the metric values.

### Drill 4: Decoupling Quality Measurement Drill
**Purpose:** Quantify the quality of upper-lower body decoupling by measuring how much the upper body moves relative to the bike frame across rough terrain — then reducing that movement through active leg absorption.
**Setup:** A rough section of trail that produces clear bike motion (visible suspension activity) from the chase or side camera.
**Execution:**
1. Complete 5 passes of the section. Extract the upper body angular change relative to the bike frame per video frame (decoupling metric).
2. Calculate the average upper body motion amplitude relative to bike frame motion amplitude — this ratio is the decoupling score (1.0 means perfect coupling; 0.0 means perfect decoupling).
3. Focus the next 5 passes on actively absorbing terrain through the knees — exaggerating leg flex while keeping the torso as still as possible.
4. Extract the decoupling metric from the second set of passes and compare.
5. Verify the improvement is also visible in the head stability metric — both should improve together.
**Success Criteria:** Decoupling score improves by at least 0.15 points (closer to 0.0) between the first and second set of passes. Head stability metric also shows reduction in vertical amplitude.
**Duration/Reps:** Two blocks of 5 passes with metric calculation between blocks.
**Progression:** Increase the terrain difficulty (larger impacts). Maintain the same decoupling score quality at higher terrain severity.

## 7. CROSS-REFERENCES & DEPENDENCIES

**This topic connects to:**
- SENSOR-10 (Multi-Channel Data Fusion): video frame metrics are combined with sensor data to build comprehensive technique scoring — SENSOR-09 is the body position channel in multi-channel analysis
- SENSOR-08 (Heart Rate / Physiological Data): video body position changes correlated with HR spikes identify stress response posture changes — the body often telegraphs anxiety through postural changes before HR data reflects it
- SENSOR-05 (IMU / G-Force): IMU bike motion data combined with video rider keypoints enables precise upper-lower body decoupling measurement
- BIOMECH-01 (Standing vs Sitting): the physical technique being quantified by the sitting/standing video metric
- BIOMECH-09 (Upper/Lower Decoupling): the physical technique being quantified by the decoupling video metric

**This topic is prerequisite for:**
- SENSOR-10: Multi-channel session analysis requires video frame metrics as the body position channel

**This topic builds on:**
- BIOMECH-01: Standing vs sitting technique provides the reference for classifying video keypoint positions correctly
- METRIC-01: Basic performance metrics framework provides context for how video metrics are integrated with performance analysis

## 8. TERRAIN & CONTEXT VARIATIONS

### Sand
Sand riding produces distinctive keypoint patterns — riders sit more, lean rearward significantly, and the elbow position changes as the arms are used more for balance on the loose surface. Video metrics in sand should apply terrain-specific reference values rather than universal enduro standards. A seated position in sand at speed may be entirely correct; the metric should be interpreted in terrain context.

### Mud
Mud produces significant keypoint detection challenges — the rider may be covered in mud, reducing contrast for the pose estimation model, and clothing may obscure limb positions. Video frame analysis quality in mud may be significantly lower than on other terrain types. Confidence scores should be monitored carefully and low-confidence frames excluded from metric calculations.

### Rocky Terrain
Rocky terrain is where video body position metrics are most diagnostic and most important. The high terrain demand means body position errors have immediate consequences, and the video data is typically high quality (dry, clear conditions common in rocky terrain). Head stability, knee flex, and elbow position are the most critical metrics for rocky terrain analysis.

### Steep Incline
Climbs require specific video metric adjustments — in steep climb video, the camera perspective changes dramatically, which affects keypoint geometry calculations. Head-to-bar offset should be measured along the bike's longitudinal axis, not the horizontal axis of the frame, to account for the slope angle. Lean angle estimation is essentially meaningless on steep climbs as the reference vertical is distorted.

### Steep Descent
Descents have the opposite camera distortion challenge to climbs. Additionally, on descents the rider should show a specific rearward weight shift — visible as increased head-to-bar offset and hip position moved toward the rear of the seat. A rider who maintains a neutral or forward body position on a descent will be visible in the video metric as insufficient rearward shift.

### Tight Trees / Narrow Sections
Tight woodland sections are challenging for video frame analysis because frequent occlusion — branches, leaves, shadows, and rapid direction changes — reduces keypoint detection confidence. Despite this, head yaw analysis is particularly valuable in tight trees: a rider who is looking ahead to the next gap before committing to the current one shows head yaw leading the direction change. A rider looking at immediate obstacles rather than the gap beyond shows head yaw coinciding with or trailing the direction change. This head yaw lead time is one of the clearest video-based predictors of flow state in tight terrain.

## 9. EXPERT INSIGHTS & SOURCES

### Key Insights
- **Computer vision in motorcycle coaching:** Academic research in sports biomechanics has applied pose estimation to cycling, swimming, and running extensively. Motorcycle-specific applications are less developed in academic literature but the same pose estimation models are directly applicable to the fundamentally biomechanical aspects of rider technique.
- **Keypoint-based coaching in skateboarding and BMX:** Computer vision coaching systems developed for skateboarding and BMX riding (which share many biomechanical features with off-road motorcycle riding — dynamic balance, impact absorption, terrain reading) have demonstrated that keypoint-based feedback improves skill acquisition rates compared to verbal feedback alone.
- **The limitation of single-camera systems:** A single action camera provides 2D keypoint data — all depth information is lost. Head-to-bar offset measured from a side camera cannot distinguish between the rider leaning forward and the rider moving their shoulders forward. Multi-camera systems or depth cameras would resolve this, but for MVP purposes, single-camera analysis with accepted limitations is appropriate and valuable.
- **Video frame analysis vs sensor accuracy:** Video-derived metrics are inherently noisier than sensor data — they depend on detection accuracy, camera angle consistency, lighting conditions, and model generalisation quality. The coaching value is in trends and large differences, not in precise absolute values. A 10-degree lean angle estimate from video is meaningful; a 1-degree difference between sessions is likely within the noise.
- **Frame rate and shutter speed interaction for off-road video:** At 60 fps with a slow shutter speed, motion blur in individual frames will degrade keypoint detection accuracy significantly. For reliable pose estimation from action camera footage in off-road riding, 60 fps minimum with a shutter speed of at least 1/500s is recommended to freeze rider body motion adequately. GoPro and DJI cameras should be configured in manual exposure mode with high shutter speed when video analysis is the intended use. Wide Dynamic Range (WDR) modes should be disabled as they reduce contrast and degrade keypoint detection.
- **Temporal consistency filtering for keypoint data:** Individual video frames may produce significantly incorrect keypoint positions due to motion blur, partial occlusion (e.g., arm crossing body midline), or model error. A temporally consistent keypoint filter — which rejects keypoint positions that move faster than biomechanically possible between frames — significantly improves the quality of calculated metrics. Without this filtering, a single bad keypoint detection in one frame creates a large spike in any derived metric.

### Sources & References
- MediaPipe BlazePose: Google AI pose estimation model documentation and accuracy benchmarks
- OpenPose: Carnegie Mellon University — body keypoint detection for sports analysis
- YOLOv8 Pose: Ultralytics documentation — real-time pose estimation applications
- "Computer Vision in Sports Analytics" — review paper covering pose estimation applications in sports coaching
- Dartfish sports video analysis platform — professional sports technique measurement methodology
- Silicon Coach and Kinovea — video analysis tool documentation for sports coaching applications
- ISEA (International Sports Engineering Association) proceedings — computer vision in action sports and motorcycle applications
- GoPro Labs and DJI camera documentation — frame rate, shutter speed, and exposure settings for action sport analysis
- "Deep Learning for Sports Video Analysis" — IEEE proceedings on computer vision techniques for athlete performance analysis
- CVPR (Computer Vision and Pattern Recognition) sports analytics workshop proceedings — keypoint detection accuracy in outdoor sports environments
