---

# — BLOCK 1: Pipeline Contract ————————————————————————————
pipeline_contract:
  kb_type: terrain_feature
  pipeline_enum_value: [elevated_beam]
  feature_class: continuous
  primary_observable_signature: "Narrow raised surface the rider must travel along — planks, beams, pallets, concrete pipes, or natural log bridges where the riding surface is elevated and narrower than normal trail width"
  dominant_risk_axis: "Balance failure on a narrow elevated surface where falling off the sides is the primary consequence"
  expected_outcome_patterns:
    clean: "Rider traverses the full length of the beam maintaining balance and line"
    minor_error: "Rider wobbles or dabs a foot but remains on the beam"
    major_error: "Rider falls off the beam sideways, losing balance at low speed"
    crash: "Rider falls from height (elevated beam) or catches a wheel on the beam edge causing abrupt stop and tip-over"

# — BLOCK 2: Retrieval Triggers ———————————————————————————
retrieval_triggers:
  primary:
    - "stage4_feature_type: [elevated_beam]"
  secondary:
    - "stage6_failure_type: [technique, decision]"
    - "stage6_crash_type: [tip_over, lowside]"
  contextual:
    - "stage5_intent: [trials, drill, technical]"

# — BLOCK 3: Content Metadata ————————————————————————————
content_metadata:
  severity_definition:
    minor: "Ground-level beam or plank, wide enough for comfortable tyre width margin, short length, flat surface"
    moderate: "Slightly elevated (under 50cm), narrower width, longer span, may have surface texture (wet wood, bark)"
    significant: "Elevated above ground (50cm+), narrow (tyre-width or slightly wider), long span, wet or uneven surface, consequence of falling includes height impact"
    major: "High elevation, very narrow, long span, wet or unstable surface, no safe dismount option, significant injury risk from falling"
  scope: "Covers narrow elevated surfaces ridden along their length. Excludes log crossings where the rider crosses perpendicular (FEATURE-05), general balance technique (BIOMECH-01), and trials-specific competition skills."
  status: draft
  common_misclassifications:
    - "Log crossing (FEATURE-05) — log crossings are perpendicular obstacles crossed over. Elevated beams are surfaces ridden along their length"
    - "Rut (FEATURE-07) — ruts constrain the wheel laterally in a channel. Beams constrain the wheel laterally on top of a raised surface"
    - "Narrow trail ridge — if the surface is naturally part of the terrain and not distinctly raised above surroundings, it may be classified as terrain rather than an elevated beam"

---

## 1. Feature Geometry & Physics *(MANDATORY)*

An elevated beam is any narrow raised surface that the rider must travel along rather than cross over. The defining physics problem is that the available riding surface is narrower than normal trail width, often close to tyre width, and elevated above the surrounding ground. Any lateral deviation beyond the beam edge results in falling off.

Unlike normal trail riding where lateral line choice is available, beam riding constrains the rider to a near one-dimensional path, where any lateral deviation results in failure.

Balance control is tightly coupled to vision — where the rider looks directly influences steering input and stability. Balance corrections on beams must be continuous and minimal — large corrections arrive too late and result in overcorrection.

Balance on a narrow surface is governed by the rider's ability to make continuous micro-corrections to keep the bike's centre of gravity over the contact patch. At very low speed — which beams typically demand — the bike provides minimal gyroscopic stabilisation. The rider must actively balance through steering input, body weight shifts, and clutch/throttle modulation.

The elevation adds consequence. On a ground-level plank, falling off means the wheels drop a few centimetres. On an elevated beam, falling means the bike and rider drop from height, with the bike potentially landing on the rider or sustaining damage.

**Classification hard rule:** It is an elevated beam when the rider travels along the length of a narrow raised surface. If the rider crosses perpendicular to a log or beam, it is a log crossing (FEATURE-05). The direction of travel relative to the obstacle defines the classification.

### Commitment & Reversibility Profile

Commitment is progressive with elevation. On ground-level beams, the rider can step off at any point with minimal consequence. On elevated beams, stepping off becomes increasingly dangerous as height increases. On high beams, the rider is committed for the full length — dismounting mid-beam may be more dangerous than continuing. Reversibility decreases with height and length.

---

## 2. Feature Forms & Variants *(MANDATORY)*

**Ground-level plank:** Flat plank or board on the ground, used in training and drills. Width varies from generous to tyre-width. Failure mode is lateral drift off the edge, causing the wheel to drop and the rider to lose balance.

**Pallet bridge:** Pallets laid flat as a riding surface. Uneven surface with gaps between boards. Failure mode is front wheel catching in a gap between pallet boards, causing abrupt deceleration or steering deflection.

**Log bridge:** Natural or placed log spanning a gap (stream, ditch). Round surface creates a camber problem — the tyre sits on the crown of the log and any lateral deviation rolls the tyre off. Failure mode is lateral roll-off, particularly when wet.

**Concrete pipe:** Large-diameter pipe lying on the ground, ridden along the top. Similar to log bridge but harder surface and more consistent geometry. Common in trials. Failure mode is lateral roll-off on the curved surface.

**Elevated competition beam:** Purpose-built narrow beam at height, used in hard enduro and trials events. Maximum difficulty — narrow, elevated, potentially long. Failure mode is balance loss at height with significant fall consequence.

---

## 3. Bike Behaviour *(MANDATORY)*

At beam speeds (walking pace or slower), the bike is below its natural stability threshold. At very low speed, the bike is less self-stabilising, so small steering inputs have a greater effect on balance and direction. The rider must use very small, frequent steering corrections to maintain line on the beam.

The front wheel's contact patch on a narrow beam is the entire stability reference. As the tyre approaches the beam edge, the bike's centre of mass moves beyond the available support base, causing the tyre to roll off the edge. On a flat beam this is a step-off; on a round log it is a progressive roll that accelerates once it starts.

Clutch and throttle provide the primary speed control. Steady, very slow forward movement is more stable than static balance. The slight gyroscopic effect and forward momentum, even at walking pace, provide more stability than standing still.

Light rear brake combined with clutch drive helps stabilise speed and prevents abrupt changes in motion, creating a controlled, steady crawl.

---

## 4. Technique by Severity *(MANDATORY)*

**Minor:** Standing position, look at the far end of the beam (not down at the front wheel), steady crawl speed, light grip. The beam is wide enough that small corrections keep the tyre centred.

**Moderate:** Same principles but precision increases. The rider may need to use clutch slip to maintain very slow speed. Arms must stay relaxed — tension in the arms causes overcorrection. Head position is critical — looking down at the beam causes target fixation and drift.

**Significant:** Pre-commitment assessment — check the beam surface (wet? uneven? stable?). Commit to the full length. Clutch and rear brake modulation to maintain a crawl. Body stays centred over the bike — any lateral lean must be corrected immediately. Inside of the knees grip the tank for lateral stability. *Coaching gate: rider must demonstrate confident low-speed balance and clutch control on ground-level beams before attempting elevated beams.*

**Major:** Full commitment required. Assess dismount options before starting — if there are none, the rider must be confident of completing the beam. Maximum focus, minimum grip tension, continuous micro-corrections. Physical calmness matters — anxiety causes grip tightening and overcorrection, which causes the exact balance loss the rider fears. *Coaching gate: rider must demonstrate significant-level beam competence on elevated surfaces and demonstrate calm, controlled riding under consequence pressure.*

---

## 5. Interaction Patterns & Failure Triggers *(MANDATORY)*

### Failure Chain 1: Target Fixation Drift
**Trigger:** Rider looks down at the beam or at the edges rather than the exit point
**Mechanism:** Vision locks on the nearest threat (edge) → steering drifts toward fixation point → lateral deviation exceeds beam width → wheel rolls off
**Outcome:** Fall off beam, consequence proportional to height
**Stage 6 classification:** technique

### Failure Chain 2: Overcorrection Cascade
**Trigger:** Small lateral deviation triggers a correction that overshoots
**Mechanism:** Rider corrects too aggressively → bike swings past centre → rider corrects back → oscillation amplifies → balance lost
**Outcome:** Fall off beam sideways
**Stage 6 classification:** technique

### Failure Chain 3: Speed Stall
**Trigger:** Rider allows speed to drop to zero or near-zero on the beam
**Mechanism:** Gyroscopic and momentum stabilisation disappear → static balance required → rider cannot hold static balance on narrow surface → tip-over
**Outcome:** Tip-over, fall off beam
**Stage 6 classification:** technique

### Failure Chain 4: Surface Traction Loss
**Trigger:** Wet wood, moss, or ice on beam surface
**Mechanism:** Front or rear tyre slides laterally on low-friction beam surface → rider cannot correct before wheel leaves the beam
**Outcome:** Lateral slide off beam
**Stage 6 classification:** traction

### Pipeline Identification Notes
Elevated beams are visually distinctive — narrow raised surfaces are unusual in trail environments. The pipeline should flag any visible plank, beam, log bridge, or pipe that the rider approaches along the length axis. Training/drill footage may frequently contain beam exercises.

### Observability Notes
**POV camera:** The beam is visible ahead. Rider's head position (looking at exit vs looking down) is a key diagnostic signal. Steering oscillation visible through handlebar movement indicates balance struggle.
**3rd person camera:** Full beam geometry, height, and rider's body position are assessable. Balance quality is clearly visible from the side.
**Key signal:** Increasing handlebar oscillation frequency indicates deteriorating balance leading to failure.

---

## 6. Approach & Entry *(DEFAULT)*

Alignment on entry is critical. The rider must be square to the beam before the front wheel contacts it. A misaligned entry requires immediate correction on a narrow surface, which is much harder than entering straight.

Speed at entry should be a slow, controlled crawl — just enough forward momentum to provide basic stability. Too fast risks overshooting the beam or being unable to correct quickly enough.

---

## 7. Terrain & Condition Interaction *(DEFAULT)*

Wet wood is the most dangerous surface condition for beams. Wet wood provides extremely low friction — comparable to wet roots. Any lateral tyre movement on wet wood becomes a slide rather than a correction.

Mossy or algae-covered beams (common on natural log bridges in woodland) are similarly low-friction and may be worse than wet wood alone.

Temperature matters — frozen beams with ice or frost are effectively unrideable without studded tyres.

---

## 8. Exit & Recovery *(DEFAULT)*

The transition from beam back to ground is a moment of reduced control. The front wheel drops from beam height to ground level, compressing the suspension and changing the bike's geometry. On high beams, this drop can be significant. The rider should be prepared for the front-end compression on exit and maintain throttle to drive the rear wheel off the beam cleanly.

As the rear wheel leaves the beam, a second instability can occur if drive is not maintained, potentially causing a stall or imbalance immediately after exit.

If the beam ends at a gap (spanning a ditch or stream), the exit may involve a short drop — treat this as a small drop (co-retrieve FEATURE-03 if significant).

---

## 9. False Reads & Misidentification *(DEFAULT)*

**Beam vs log crossing:** Direction of travel is the classifier. Along the length = beam. Across it = log crossing (FEATURE-05).

**Beam vs rut:** Both constrain lateral movement, but ruts constrain from below (channel walls) while beams constrain from above (narrow elevated surface with drop on both sides). The failure modes are opposite — ruts trap the wheel in, beams let the wheel fall off.

---

## 10. Coaching Gates & Prerequisites *(DEFAULT)*

**Minor:** Standing position, basic low-speed balance.
**Moderate:** Clutch slip control, relaxed upper body, ability to look ahead rather than down.
**Significant:** Confident ground-level beam riding, clutch and rear brake modulation at crawl speed.
**Major:** All above plus composure under consequence pressure and pre-commitment assessment.

Skill tags: `balance_low_speed`, `clutch_modulation`, `target_fixation_resistance`, `composure_under_pressure`

---

## 11. Feature Demands / Constraints *(DEFAULT)*

Tyre width and profile affect beam riding. A narrower tyre provides more margin on narrow beams. A rounder profile tracks better on curved surfaces (logs, pipes) but provides less flat contact on planks.

Clutch feel is critical — grabby or heavy clutches make the precise low-speed modulation significantly harder.

Handlebar width affects clearance on beams with side obstacles but does not directly affect balance on open beams.

### Out-of-Scope Content

- Log crossing technique (perpendicular) → FEATURE-05
- Standing balance fundamentals → BIOMECH-01
- Clutch control fundamentals → CONTROL-03
- Drop technique (beam exit into drop) → FEATURE-03
- Trials competition rules and scoring → out of scope for RideMind
