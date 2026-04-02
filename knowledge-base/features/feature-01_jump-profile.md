---
# ── BLOCK 1: Pipeline Contract ──────────────────────────────────────────────
pipeline_contract:
  kb_type: terrain_feature
  pipeline_enum_value: [jump]
  feature_class: single_event

# ── BLOCK 2: Retrieval Triggers ─────────────────────────────────────────────
retrieval_triggers:
  PRIMARY:
    stage4_feature_type: [jump]
  SECONDARY:
    stage6_failure_types: [technique, decision, momentum]
    stage7_crash_types: [otb, ejection]
  CONTEXTUAL:
    stage3_intent_category: [jump, trail_ride, race_section]
    stage5_outcome: [crash, bail]

# ── BLOCK 3: Content Metadata ────────────────────────────────────────────────
content_metadata:
  topic_id: FEATURE-01
  title: Jump / Launch Features — Feature Profile
  domain: Terrain Feature KB
  domain_id: features
  scope: "Feature identification, severity classification, and technique requirements
    for jumps and launch features. Does NOT cover standing/seated fundamentals
    (see BIOMECH-01), general throttle control (see CONTROL-01), or surface physics
    of landing surfaces (see Terrain KB entries)."
  status: draft
  feature_type: jump
  severity_definition:
    minor: "Natural compression or roller under 0.5m; no commitment required; low speed sensitivity; consequence limited to awkward weight shift or unsettled chassis"
    moderate: "Defined face 0.5–1.5m with clear lip geometry; moderate commitment required; speed-sensitive takeoff angle; poor technique produces uncontrolled airtime with risk of hard landing"
    significant: "Jump face over 1.5m or gap jump requiring cleared distance; full commitment at approach; high speed sensitivity on takeoff; incorrect technique risks OTB, nose-dive, or ejection"
    major: "Large constructed or natural jump with extended gap distance, steep or complex landing geometry, narrow speed window for correct trajectory, and minimal recovery margin on under- or over-jump; consequence of technique error at this scale is serious injury"
  severity_covered: [minor, moderate, significant, major]
  crash_types_associated: [otb, ejection]
  failure_types_associated: [technique, decision, momentum]
  common_misclassifications:
    - step_up    # step_up has a defined vertical face requiring wheel placement; jump has a ramp/compression launching the bike
    - drop       # drop is purely downward with no upward launch trajectory; jump involves airtime from an ascending face
    - "undulating terrain — gentle rollers, compressions, and trail undulations are not jumps unless they produce unintended airtime"
    - ledge      # ledge is a horizontal-to-vertical transition; jump is a ramped launch surface
  typical_body_position: standing
  difficulty_range: [intermediate, advanced]
  related_topics: [BIOMECH-01, BIOMECH-02, DYNAMICS-01, DYNAMICS-04, FEATURE-02, FEATURE-07]
  prerequisites: [BIOMECH-01, CONTROL-01, DYNAMICS-01]
  tags: [jump, tabletop, double, gap, kicker, step-up-jump, natural, launch, air, airtime, landing, otb, ejection, commitment, airborne]
  version: 1.0
  last_updated: 2026-04-02
---

# Jump / Launch Features — Feature Profile

## 1. Feature Geometry & Physics *(MANDATORY)*

A jump is any terrain geometry where an ascending ramp or compression face launches the motorcycle and rider into an airborne state. The defining characteristic is **airtime** — a period where neither wheel is in contact with the ground, and the rider's ability to influence trajectory is reduced to body weight shifts and rear brake input only. Throttle, front brake, and steering have no meaningful effect without ground contact. The critical inputs must be completed before the launch point; corrections available during airtime are extremely limited.

### Physical Zones

**Approach zone:** The section of trail or track leading to the jump face. This is where the rider sets entry speed, selects gear, establishes body position, and commits to the feature. The approach zone ends at the base of the jump face. On natural terrain, the approach zone may be poorly defined — the rider may not recognise they are approaching a launch feature until they are already on the face.

**Execution zone — the face:** The ascending ramp surface from base to lip. This is where the bike transitions from horizontal travel to an upward trajectory. The face geometry determines launch angle, and the rider's throttle input, body position, and weight distribution during the face determine the bike's attitude at takeoff. The face is typically 1–5 metres long depending on severity. On natural terrain, the "face" may be a convex rock, a compression in the trail, a tree root step, or an eroded bank — not a purpose-built ramp.

**Transition point — the lip:** The top edge of the face where the front wheel leaves the ground. This is the last point where the rider can influence launch trajectory. Any weight shift, throttle change, or steering input at the lip directly affects airborne attitude. The lip shape matters: a rounded lip produces a smooth launch arc; a sharp or square lip produces an abrupt trajectory change and higher rotational risk.

**Airborne phase:** From front wheel departure to rear wheel contact with the landing surface. The rider has no traction-based control inputs available. The remaining influences are limited to body weight shifts (fore-aft and lateral) and rear brake (to reduce rear wheel gyroscopic force, allowing the nose to drop). Duration ranges from fractions of a second (minor) to 2+ seconds (major). This is the phase where technique errors manifest as visible consequences — nose-up, nose-down, lateral drift, or rotation.

**Exit zone — landing and run-out:** The surface where the bike returns to ground contact. Landing geometry varies: downslope (absorbs impact, extends range), flat (maximum impact force), upslope (compresses suspension hard, decelerates sharply). The run-out is the distance after landing where the rider re-establishes full control. On natural terrain, the landing surface is not prepared — it may be a different surface type entirely (rock face to mud, hardpack to loose), which creates a surface-transition problem on top of the landing problem.

### Force Vectors

During the face, the rider and bike experience a combination of forward momentum, gravitational pull, and the normal force from the ramp surface. At the lip, the normal force drops to zero and the bike follows a parabolic trajectory determined by exit speed and angle. In the air, gravity is the only external force — the bike decelerates horizontally and accelerates downward. Rotational forces established at the lip (from weight distribution, throttle input, or lip shape) persist throughout airtime with no damping mechanism. On landing, the bike experiences an impact force proportional to vertical velocity and inversely proportional to suspension travel available. Landing on a downslope reduces vertical velocity component; landing flat maximises it.

### Why This Creates a Distinct Riding Problem

Surface technique alone cannot solve a jump. Unlike every other terrain feature where the rider maintains ground contact and can make continuous corrections, a jump removes traction-based control for the duration of airtime. Every error in approach speed, body position, or weight distribution at the lip is locked in and amplified during the airborne phase — the corrections available in the air (body weight shift and rear brake) are limited and slow-acting relative to the forces involved. This makes jumps among the highest-consequence single-event features in enduro riding — the gap between "correct" and "incorrect" technique is narrow, and the consequence gap is disproportionately large.

### Commitment & Reversibility Profile

**Point of no return:** The commitment point varies by severity. For minor features (natural compressions, small rollers), commitment occurs at the lip — the rider can scrub speed on the face and reduce the jump to a roll-over. For moderate features, commitment occurs at the base of the face — once on the ramp at speed, the rider cannot safely stop. For significant and major features, commitment occurs during the approach — the rider must be at target speed before reaching the face base, and any speed adjustment on the face itself creates instability.

**Recovery window:** Extremely short. From the moment the front wheel leaves the lip, the rider has only body weight shifts and rear brake available. On minor jumps with sub-0.5-second airtime, there is effectively no recovery window — the bike lands before any correction takes effect. On moderate-to-major jumps, the recovery window is 0.5–2 seconds, but the corrections available (weight shift, rear brake tap) produce small effects relative to the forces involved. A nose-high attitude established at the lip cannot be fully corrected in the air on most enduro jumps.

**Bailout options before commitment:** On the approach, the rider can scrub speed or stop. On the face of minor features, the rider can unweight and roll over the lip without launching. For moderate and above, the only bailout on the face is to lay the bike down before the lip — this is a deliberate crash to avoid a worse outcome and is rarely chosen. The practical bailout window is the approach zone only.

---

## 2. Feature Forms & Variants *(MANDATORY)*

> **Classification rule:** A feature belongs in the Jump KB when the defining event is launch into meaningful airtime from ramp or compression geometry. It belongs in the Steps/Ledges KB (FEATURE-07/08) when the defining event is wheel placement against a vertical face under sustained ground contact. It belongs in the Drop KB (FEATURE-02) when the defining event is purely downward transition with no upward launch trajectory. Speed can transform a step_up into a jump — the classification is determined by the dominant event in the footage, not by the terrain geometry alone.

### Natural Compression / Roller

A convex rise in the trail surface — often an exposed root ball, embedded rock shelf, or erosion-formed hump — that launches the bike if ridden with sufficient speed. There is no clearly defined "face" or "lip" in the constructed sense. The rider may not recognise it as a jump feature until the front wheel lifts.

**Visual identification:** Trail surface rises and falls over a short distance (1–3m). No clear lip edge. The rise is typically embedded in the trail surface, not standing proud above it. Often partially obscured by vegetation or shadows.

**Severity range:** Almost always minor. Can become moderate if combined with speed (e.g., a roller at the top of a fast descent) or if the landing surface drops away (compression before a steep downhill section).

**Distinct failure pattern:** Rider is surprised by unexpected airtime. Because there is no recognised approach zone, the rider's body position and weight distribution are typically set for trail riding, not jumping. The most common failure is being seated with weight rearward, producing a nose-up launch and a rear-heavy landing that compresses the rear suspension and unloads the front wheel on landing.

### Kicker / Step Jump

A short, steep face — typically under 1.5m of ramp length — that produces a steep launch angle. Common on natural terrain where erosion creates a sharp lip at the edge of a trail shelf or rock face. The defining characteristic is that the launch angle is steep (40°+) relative to the approach angle, which means the bike transitions from horizontal to steep climb very quickly.

**Visual identification:** Short, abrupt ramp with a defined edge. The face is noticeably steeper than the approach. Often appears at trail edges, erosion cuts, or where rock ledges create a natural step with a sloped approach.

**Severity range:** Moderate to significant. The steep launch angle means even low approach speeds produce meaningful airtime, and the bike tends to pitch nose-up aggressively because the rear wheel is still on the steep face when the front wheel departs the lip.

**Distinct failure pattern:** Excessive nose-up rotation. The steep face angle combined with any rearward weight bias produces rapid nose-up pitch that the rider cannot correct in the short airtime available. Landing rear-wheel-first at a steep angle loads the rear suspension beyond its travel and can eject the rider forward over the bars on rebound, or collapse the rear end and cause the rider to sit down hard on the subframe.

### Tabletop

A jump with a flat top surface between the launch face and the landing face. The flat top provides a safety margin — if the rider does not clear the full distance, they land on the flat table rather than falling into a gap. Common on motocross tracks and purpose-built enduro courses.

**Visual identification:** Clearly defined ramp face leading to a flat elevated surface, with a second ramp or slope descending on the far side. The table surface is typically 2–6m long. The launch and landing ramps are usually symmetrical or near-symmetrical in angle.

**Severity range:** Moderate to major depending on table length and height. The table itself reduces consequence for under-jumping (landing on the flat), but the transition from table to landing ramp creates a secondary kicker effect if the rider lands at the edge.

**Distinct failure pattern:** Casing the landing — the rider clears the table but lands on the knuckle (the transition from flat to downslope) rather than on the downslope itself. This produces maximum impact force because the landing surface is flat or even slightly uphill at the knuckle, with no downslope to absorb vertical velocity. Casing produces severe chassis compression, risks bottoming the suspension, and can pitch the rider forward.

### Gap Jump / Double

Two separate ramp structures with empty space between them — the rider must clear the gap entirely. There is no safe landing surface between the launch and landing ramps. This is the highest-commitment jump variant: under-jumping lands the rider in the gap (which may be a flat bottom, a trench, or rough ground), and over-jumping clears the landing ramp into whatever is beyond it.

**Visual identification:** Two distinct mounds or ramp structures with visible space between them. The gap is clearly lower than both the launch and landing surfaces. The gap floor is often rough, unfinished, or deliberately left as a penalty zone.

**Severity range:** Significant to major. Gap jumps are almost never minor because the consequence of insufficient speed is landing in the gap rather than rolling over a feature. Even small gaps (2–3m) at low height carry significant consequence because the gap floor is not a prepared landing surface.

**Distinct failure pattern:** Coming up short. The rider does not carry sufficient speed to clear the gap and lands on the gap floor or the upslope of the landing ramp. Landing in the gap produces maximum impact (flat landing from height) and often results in OTB as the front wheel contacts the base of the landing ramp while the bike is still descending. This is the failure pattern most relevant to the Mark Crash Phase 2 test clip — airborne trajectory into an off-angle landing.

### Natural Step with Launch

A terrain feature where the trail steps up or ramps over a natural obstacle (rock shelf, bank, root cluster) and the geometry produces unintended or semi-intended airtime. Common in enduro where the trail follows natural terrain rather than purpose-built features.

**Visual identification:** The trail rises sharply over a natural obstacle and drops away on the other side. The "face" is the natural contour of the obstacle. There is no constructed lip — the launch angle is determined by the rock, root, or earth geometry. The landing surface is whatever the natural terrain provides.

**Severity range:** Minor to significant. Highly variable because the geometry is not controlled. The same natural step at walking speed is a step_up feature; at trail speed it becomes a launch feature.

**Distinct failure pattern:** Misread severity. The rider either does not recognise the feature as a jump (treats it as a step_up and uses low-speed technique on a feature that produces airtime at their actual speed) or underestimates the landing drop (the far side falls away more steeply than visible on approach). Natural features have no consistency — the same geological formation may produce different launch characteristics depending on approach line, speed, and surface condition.

---

## 3. Bike Behaviour *(MANDATORY)*

This section describes the mechanical response of the motorcycle to jump features at the physics level. No coaching language, rider intent, or corrective advice — that content belongs in Section 4.

### Suspension Dynamics on the Face

As the front wheel contacts the base of the face, the fork compresses under the deceleration component of the slope transition (horizontal momentum meeting an inclined surface). The fork rebounds as the front wheel travels up the face — this rebound energy contributes to the front end rising at the lip. A stiffer fork rebounds faster and launches the front end more aggressively; a softer fork absorbs more of the transition energy and produces a smoother lip departure.

The rear shock compresses as the rear wheel reaches the face base (delayed by wheelbase length behind the front). If the rider applies throttle on the face, rear squat adds to rear shock compression. The rear shock rebounds as the rear wheel approaches the lip — this rebound contributes to overall launch energy and can pitch the bike nose-up if the rebound timing coincides with the front wheel's lip departure.

On a perfectly neutral launch, both wheels leave the ground with matched rebound energy and the bike maintains its face angle through the air. In practice, the sequential nature of front-then-rear suspension loading means the bike almost always has some pitch component at takeoff.

### Airborne Dynamics

Once airborne, the motorcycle has no contact patch and therefore no traction-based control. The bike follows a parabolic trajectory determined by exit speed and exit angle at the lip. Three rotational axes are relevant:

**Pitch (nose up/down):** Determined by the interaction of weight distribution, throttle input, suspension rebound timing, and face geometry at the lip. The pitch outcome is not a simple one-input-one-result relationship — it depends on the timing of suspension rebound relative to lip departure, the rider's weight position, and the face angle. Generally: rearward weight bias and sustained throttle drive on the face tend to produce nose-up pitch; forward weight bias and abrupt throttle closure tend to produce nose-down pitch. However, suspension rebound timing can override these tendencies — the same throttle input on different face profiles can produce different pitch results. For coaching and retrieval purposes, the reliable observable is the bike's attitude at the lip and in the air, not a universal claim about which input always produces which pitch state. The rear brake can be tapped in the air to slow the rear wheel, reducing its gyroscopic resistance and allowing the nose to drop — this is one of the main pitch-correction tools available during airtime, alongside body weight shifts fore and aft.

**Roll (lateral lean):** Determined by any lateral weight offset at the lip. If the rider's weight is not centred over the bike's longitudinal axis at takeoff, the bike will roll in the air. There is no traction-based correction for roll once airborne — the rider can only partially compensate through body weight shift to the opposite side, but this compensation is limited and slow-acting relative to the available airtime on most enduro features. Landing with residual roll requires the rider to absorb the lateral component on contact.

**Yaw (rotation around vertical axis):** Rare but dangerous. Caused by asymmetric lip contact (one wheel leaving the lip before the other due to an angled lip surface) or by the rider steering slightly at the lip. Yaw in the air produces a cross-track landing where the wheels are not aligned with the direction of travel. This is extremely difficult to recover from on landing because the tyres contact the ground at an angle to the direction of momentum.

### Gyroscopic Effects

Both wheels act as gyroscopes. At higher speeds, the gyroscopic stability of the wheels resists pitch and roll changes in the air, making the bike more stable but also harder to correct. At lower speeds (common in enduro natural jumps), gyroscopic stability is lower, and the bike is more susceptible to rotation — but also more responsive to body weight corrections. The rear brake reduces rear wheel gyroscopic force, which is why tapping the rear brake in the air allows the nose to drop.

### Landing Impact

Landing forces are determined by vertical velocity at contact, bike mass, and available suspension travel. Landing on a downslope reduces vertical velocity component because the slope absorbs some of the descent angle — the bike's trajectory and the slope are more closely aligned. Landing flat maximises vertical velocity component because all of the descent must be absorbed by the suspension. Landing front-wheel-first compresses the fork fully before the rear shock engages, creating a sequential impact that pitches the rider forward. Landing rear-wheel-first compresses the rear shock first, which tends to pitch the rider rearward and can eject them over the bars on shock rebound if the rebound damping is insufficient.

A balanced two-wheel landing distributes impact across both suspension units simultaneously, minimising peak force on either. This is the mechanical target for all jump landings, regardless of severity.

### Speed and Severity Amplification

Every dynamic described above scales with speed. A nose-up pitch at low speed on a minor jump produces an awkward but manageable rear-heavy landing. The same nose-up pitch at high speed on a significant jump produces sustained airtime in a progressively worsening nose-up attitude, followed by a rear-first landing with impact force that can exceed suspension travel, bottom out the shock, and eject the rider. The relationship between speed and consequence is non-linear — doubling speed roughly quadruples landing force and roughly doubles airtime duration, giving rotational errors more time to develop.

---

## 4. Technique by Severity *(MANDATORY)*

### Minor (Natural compressions, rollers, trail undulations under 0.5m)

**Body position:** Standing with slight knee bend, weight centred over footpegs. Arms bent with elbows up and forward. Neutral grip on bars — no death-grip.

**Control inputs:** Maintain steady throttle through the compression. Do not chop throttle on the face — this unloads the rear and pitches the nose up. Do not accelerate aggressively on the face — this drives the rear down and pitches the nose up on rebound. Light or no brake input.

**Commitment threshold:** Low. The rider can roll over the feature by unweighting (standing tall and absorbing the compression through bent knees) rather than launching.

**Common errors:** Being seated — the rider's body mass is behind the footpegs, and the seat prevents the legs from absorbing the compression. Chopping throttle in surprise — abrupt throttle closure on an unexpected rise pitches the nose up. Stiff arms — locked elbows transfer the face impact directly to the rider's shoulders and prevent the bike from moving independently beneath them.

**Mechanical consequence:** Seated riders absorb the launch energy through their spine rather than their legs, producing discomfort and loss of control. Stiff arms cause the front end to kick back against the rider, pulling their weight rearward and amplifying nose-up pitch.

**Coaching gate:** Basic standing technique (BIOMECH-01) must be confirmed before coaching jump technique at any severity.

### Moderate (Defined face 0.5–1.5m, clear lip geometry)

**Body position:** Standing, attack position. Weight slightly forward of neutral — chest closer to bars than on flat trail. Knees and ankles absorbing, not rigid. Head up, looking past the jump to the landing zone.

**Control inputs:** Set speed on the approach — the face is not the place to adjust speed. Maintain steady throttle through the face. At the lip, a subtle throttle roll-off (not a chop) levels the bike's attitude. In the air, hands and feet stay on controls. Rear brake is available for nose-down correction if needed. On landing, absorb through knees and ankles with throttle ready to drive out.

**Commitment threshold:** Moderate. Once on the face at speed, the rider is committed to going over the lip. Speed adjustment on the face itself is dangerous — braking on an incline shifts weight forward aggressively and risks front-wheel tuck; acceleration extends the rear and pitches nose-up.

**Common errors:** Accelerating on the face — produces nose-up pitch and rear-heavy airtime. Braking on the face — shifts weight forward, compresses fork on the incline, and risks front-end tuck on the lip. Looking down at the lip instead of at the landing — causes the rider to freeze body position at the lip rather than flowing through the transition. Pulling on the bars at the lip — riders instinctively pull up on the bars to "help" the front wheel rise, which actually unloads the front end and produces an exaggerated nose-up attitude.

**Mechanical consequence:** Throttle on the face changes the suspension loading sequence — rear squat from drive compresses the shock, and the timing of the shock's rebound relative to lip departure determines the pitch outcome. The result depends on face angle, suspension setup, and speed, but the general pattern is that unplanned throttle changes on the face produce uncontrolled attitude at the lip. Braking on the face compresses the fork while climbing; fork rebound at the lip can pitch the front end upward aggressively. Both errors produce uncontrolled attitude that the rider cannot correct in the available airtime.

**Coaching gate:** Standing attack position (BIOMECH-01) and throttle steadiness (CONTROL-01) must be confirmed. Rider should be comfortable with minor jump features before progressing to moderate.

### Significant (Over 1.5m face or gap; full commitment; high speed sensitivity)

**Body position:** Aggressive attack position — weight forward, elbows up, knees gripping tank, head over bars looking at the landing. The rider's centre of mass must be directly above the footpegs or slightly forward at the lip. Any rearward weight bias at takeoff will be amplified through the extended airtime.

**Control inputs:** Speed set on the approach — no adjustments on the face. A deliberate, smooth throttle roll to neutral at the lip. Active body position management in the air: weight forward to prevent nose-up, weight back to prevent nose-down. Rear brake available for nose-down correction. On landing, absorb through full leg extension range, maintain throttle readiness, and drive out of the landing to maintain stability.

**Commitment threshold:** High. Commitment occurs during the approach — the rider must be at the correct speed before reaching the face base. Any speed adjustment on the face at this severity is a technique error with immediate consequences.

**Common errors:** Insufficient approach speed (coming up short on gap jumps — the Mark Crash failure pattern). Excessive approach speed (overshooting the landing zone). Weight rearward at the lip (nose-up, rear-heavy landing). Panic brake in the air (front brake in the air does nothing useful and creates hand tension that prevents body position correction). Looking down during airtime instead of at landing zone.

**Mechanical consequence:** Coming up short on a gap jump means landing on the flat gap floor or the upslope of the landing ramp — maximum impact force, suspension bottoming, high OTB risk as the front wheel contacts the upslope while the bike is still descending. Overshooting means landing past the prepared landing surface, potentially onto flat or rough ground with no run-out margin.

**Coaching gate:** Rider must demonstrate consistent moderate jump technique with correct approach speed, neutral lip departure, and balanced landing before progressing to significant. Specifically: clutch-throttle coordination (CONTROL-01), weight distribution awareness (DYNAMICS-01), and commitment decision-making (INTEL-05) must be confirmed. **Do not coach up to significant jump technique without these prerequisites confirmed.**

### Major (Extended gap distance, complex landing geometry, narrow speed window, minimal recovery margin)

**Body position:** Race-level attack position with deliberate pre-loading of the suspension through the face. The rider actively manages centre of mass through every phase: loading the face, transitioning at the lip, correcting in the air, and absorbing on landing. This is not a passive "hold on and hope" activity — it is active airborne bike control.

**Control inputs:** Precise approach speed (specific to the jump — too fast or too slow by 5 km/h changes the outcome). Deliberate suspension pre-load timing through the face. Controlled lip transition — the rider may use subtle throttle or body weight to adjust launch angle at the lip. In-air attitude control using body weight and rear brake. Landing absorption using full suspension travel and active leg damping. Immediate throttle application on landing to stabilise the chassis.

**Commitment threshold:** Total. Commitment occurs well before the face — the rider must be in the correct gear, at the correct speed, on the correct line, with the correct body position established before the approach zone ends. Any error in setup cascades through every subsequent phase.

**Common errors:** At this severity, errors are typically setup errors (wrong speed, wrong gear, wrong line) rather than execution errors. The technique itself requires extensive practice — riders at this level have internalised the mechanical skills and fail on judgment rather than execution.

**Mechanical consequence:** The forces involved at major severity exceed the bike's ability to compensate. Suspension bottoming is common on imperfect landings. Frame and subframe stress on case landings can cause mechanical failure. Rider injury from hard landings includes compression injuries to the spine, wrists, and ankles even with correct technique.

**Coaching gate:** **Do not prescribe major jump technique without confirmed competence at significant level.** This tier requires demonstrated airborne control, speed judgment, and landing technique at significant severity. Prerequisites: all of the above plus advanced commitment decision-making (INTEL-05, INTEL-06) and demonstrated recovery from imperfect significant-severity landings.

---

## 5. Interaction Patterns & Failure Triggers *(MANDATORY)*

### Failure Chain: Insufficient Approach Speed (momentum failure)

**Trigger:** Rider enters the approach zone below the speed required to clear the feature or reach the intended landing zone.

**Mechanism:** The bike launches from the lip with insufficient horizontal velocity. The parabolic trajectory falls short of the landing zone. On a tabletop, this means landing on the flat table surface (low consequence). On a gap jump, this means landing in the gap or on the upslope of the landing ramp (high consequence).

**Outcome:** On gap jumps — landing in the gap produces maximum vertical impact on unprepared surface. Front wheel contacts the upslope of the landing ramp while bike is still descending, producing an abrupt deceleration that pitches the rider forward. High OTB and ejection risk. On tabletops — landing on the flat table is a hard but survivable landing; the main risk is the table-to-downslope knuckle catching the rear wheel.

**Stage 6 classification:** `momentum` (primary), `decision` (contributing — the rider chose to commit at insufficient speed)

### Failure Chain: Weight-Rearward Launch (technique failure)

**Trigger:** Rider's centre of mass is behind the footpegs at the lip. Common causes: seated position, throttle application on the face, or instinctive rearward lean approaching the lip.

**Mechanism:** Rear-biased centre of mass at lip departure causes the bike to pitch nose-up during airtime. Gyroscopic forces partially resist the pitch but cannot overcome the rotational moment from the weight offset. The nose-up attitude worsens throughout airtime.

**Outcome:** Rear-wheel-first landing at steep angle. Rear shock absorbs initial impact, then rebounds — the rebound energy pitches the rider forward over the bars (delayed OTB). Alternatively, if the nose-up attitude is severe, the rider slides backward off the seat during airtime and separates from the bike (ejection).

**Stage 6 classification:** `technique` (primary — weight distribution error)

### Failure Chain: Throttle on Face (technique failure)

**Trigger:** Rider accelerates while on the jump face, either deliberately (trying to "boost" the jump) or reactively (target fixation on the lip).

**Mechanism:** Throttle application on the face compresses the rear shock under power (rear squat) while increasing exit speed. Combined with the rearward weight transfer from sustained drive, the rider's centre of mass shifts behind the bike's natural balance point. At the lip, the loaded shock rebounds — this rebound energy adds to the launch force and, combined with the rearward CoG, tends to produce an aggressive nose-up pitch as the bike departs. The exact pitch outcome depends on face angle, rebound timing, and speed, but the general pattern for sustained throttle on the face is nose-up departure.

**Outcome:** Nose-up airtime followed by rear-heavy landing. Severity depends on the magnitude of throttle input and the jump size — on minor jumps, this produces a sharp rear landing; on significant jumps, this can produce full nose-vertical attitude and rear-first impact at height.

**Stage 6 classification:** `technique` (primary — throttle timing error)

### Failure Chain: Panic Brake on Face (technique failure)

**Trigger:** Rider applies front brake on the jump face, typically in a reactive "too fast" moment.

**Mechanism:** Front brake on an incline shifts weight forward aggressively (compounding the natural weight-forward tendency on an incline). The fork compresses while climbing. If the rider brakes hard enough to slow significantly, they may stall on the face. If they release the brake at the lip, the compressed fork rebounds violently, pitching the front end upward.

**Outcome:** Either stalling on the face (embarrassing but low consequence on small jumps; dangerous on large jumps where stopping on the face means rolling backward) or an uncontrolled nose-up departure from the lip as the fork rebounds from its brake-loaded state.

**Stage 6 classification:** `technique` (primary — brake input error), `decision` (contributing — the rider judged speed incorrectly)

### Failure Chain: Yaw at Lip (technique/terrain failure)

**Trigger:** The bike leaves the lip with a rotational component around the vertical axis — the wheels are not aligned with the direction of travel. Caused by: asymmetric lip surface (one wheel leaves before the other), rider steering input at the lip, or a rut or groove on the face that angles the bike off-axis.

**Mechanism:** In the air, yaw is essentially uncorrectable. The bike travels along its momentum vector but is pointed in a different direction. Body weight shifts can partially compensate by rotating the bike under the rider, but this introduces roll simultaneously.

**Outcome:** Cross-track landing — the tyres contact the ground at an angle to the direction of momentum. This produces immediate lateral force at both contact patches, overwhelming traction instantly. The likely result is a highside (the tyres grip momentarily and flip the bike) or a lowside (the tyres slide laterally on contact). Both are high-consequence outcomes at any speed.

**Stage 6 classification:** `technique` (primary if caused by rider input), `traction` (primary if caused by lip surface condition)

### Pipeline Identification Notes

**Visual indicators for Stage 4 `feature_type: jump` detection:**

*Approach indicators (shape visible before the rider reaches the feature):*
- Trail surface rises ahead of the rider with a defined ramp geometry
- A visible lip or edge where the ramp surface ends and the air begins
- For natural features: a convex rise in the trail that is steeper than the surrounding gradient
- For constructed features: clearly defined mound or ramp structure with prepared landing surface visible beyond

*Execution indicators (in-feature cues, visible during the event):*
- Both wheels leave the ground simultaneously or sequentially (front then rear)
- The bike's trajectory departs from the ground surface — visible gap between tyres and terrain
- Rider's body extends or compresses through the face (visible weight management)
- Airborne phase: bike silhouetted against background, shadow separation from ground, no dust/debris from tyres

*Post-event indicators (aftermath observable when approach was not captured):*
- Landing impact visible: suspension compression, dust cloud on contact, rider absorption through legs
- Bike trajectory descending from above the trail surface
- Run-out behaviour: rider accelerating out of a landing, or loss of control immediately after a descent from height

**Audio markers:**
- Engine note change as the bike leaves the ground — unloaded engine revs higher when the rear wheel loses traction in the air
- Impact sound on landing — suspension bottoming, tyre contact, chassis settling
- Silence or reduced engine noise during airtime (no drive load)
- For crashes: scraping, impact, and silence followed by engine idle or stall

**Severity indicators — distinguishing minor from significant in footage:**
- Airtime duration: sub-0.5s = minor, 0.5–1.5s = moderate, 1.5s+ = significant/major
- Height above ground at peak: under 0.5m = minor, 0.5–1.5m = moderate, over 1.5m = significant/major
- Visible gap between launch and landing surfaces = significant+ (gap jump)
- Rider body position activity in air: passive = minor (no time to react), active = moderate+ (time for weight correction)
- Landing impact severity: soft absorption = correct technique or minor feature; heavy compression = moderate+; visible bottoming or rider separation = significant+

**Edge cases where Stage 4 classification confidence should be flagged low:**
- Distant rider in frame — jump features are difficult to distinguish from trail undulation at distance
- POV footage — the face geometry may not be visible (rider looks ahead, not down at the face); airtime is indicated by loss of ground reference and engine note change only
- Low-resolution footage — lip geometry and airtime gap may not be distinguishable
- Natural terrain — the boundary between "undulating trail" and "natural jump" is ambiguous; flag confidence below 0.6 for natural features unless clear airtime is visible

### Observability Notes

**1. Reliably confirmable from footage (directly observable):**
- Whether the bike becomes airborne (both wheels off ground)
- Approximate airtime duration (frame count between departure and landing)
- Landing type (front-first, rear-first, balanced)
- Whether the rider crashes after landing
- Bike attitude at peak airtime (nose-up, nose-down, level) — in 3rd-person footage
- Whether the rider is standing or seated on approach — in 3rd-person footage

**2. Inferable with caveats (can be estimated but not confirmed):**
- Approach speed (estimated from motion blur, background movement rate, time to cover known distances)
- Jump face angle and height (estimated from the bike's trajectory arc, but exact geometry requires known reference points)
- Weight distribution at lip (inferred from body position and bike attitude, but subtle weight shifts may not be visible)
- Whether throttle was applied on the face (inferred from engine audio and rear suspension behaviour, not directly visible)
- Severity classification (inferred from airtime, height, and consequence, but natural features can deceive)

**3. Cannot be determined from footage (pipeline must flag as unknown):**
- Exact approach speed in km/h or mph
- Suspension setup and travel remaining at any point
- Tyre pressure and tyre condition
- Whether the rider intentionally jumped or was surprised by the feature
- The rider's skill level relative to the feature (cannot determine if this is the rider's first attempt or their hundredth)
- Landing surface condition beneath visible vegetation or water
- Whether fear, fatigue, or hesitation contributed to the outcome

---

## 6. Approach & Setup Requirements

> *Merge restriction: this section must remain separate from Section 4 for timing-dependent features. Jump is timing-dependent.*

### Speed Selection

The single most important approach decision for jumps. Target speed must be set before the face base — adjustments on the face itself are technique errors with immediate consequences (see failure chains in Section 5). On natural terrain, target speed estimation is difficult because the feature geometry is not standardised — the rider must assess face angle, lip shape, and landing distance in real-time while approaching.

For minor features, approach speed is typically trail speed or slightly above — the rider does not need to accelerate specifically for the feature. For moderate features, the rider must deliberately set approach speed, which may require acceleration or deceleration in the approach zone. For significant and major features, approach speed is specific to the jump and must be learned through progressive attempts or local knowledge.

### Line Onto the Feature

The approach line determines the rider's trajectory onto the face. A centred line hits the face squarely; an offset line produces an angled entry that can cause yaw at the lip. On natural terrain, the "correct" line may not be obvious — worn ruts, rock placements, and root lines may force the rider onto the face at an angle. Reading the approach line is part of terrain intelligence (INTEL-01, INTEL-03).

### Body Position Setup Point

The rider must be in standing attack position before reaching the face base. Setting up body position on the face itself is dangerous — the transition from seated to standing while climbing an incline shifts weight rearward and forward in sequence, exactly the instability that produces pitch errors at the lip.

### Gear and Clutch Preparation

Gear selection must be completed in the approach zone. The correct gear maintains steady engine speed through the face without requiring throttle adjustment. If the rider needs to shift on the face, the momentary drive interruption changes the suspension loading sequence and can produce attitude errors at the lip. Clutch should not be needed on the face for most jumps — if the rider is slipping the clutch on a jump face, the gear selection was wrong.

---

## 7. Terrain & Condition Interaction

### Surface Type × Jump Interaction

**Rock surface (retrieve TERRAIN-03):** Rock faces provide consistent traction on the face but create harsh lip transitions. Embedded rock lips produce sharp, predictable launch angles. Loose rock on the face reduces rear wheel drive and can cause the rear to spin on the face, pitching the bike nose-down. Landing on rock produces maximum impact harshness — no surface deformation to absorb energy. Rock landings punish incorrect technique more severely than any other surface.

**Mud surface (retrieve TERRAIN-01):** Mud on the face reduces traction, making throttle application on the face more likely to spin the rear wheel (which unloads the rear and pitches nose-down). Mud on the lip can create an unpredictable launch angle as the tyre deforms the lip surface on departure. Mud on the landing absorbs some impact energy but creates a deceleration problem on the run-out — the bike slows rapidly on contact, loading the fork and risking front-wheel dig.

**Sand surface (retrieve TERRAIN-05):** Sand faces are typically soft and absorb energy — the bike launches with less velocity than the same face on hardpack. Sand lips deform under the tyre, creating lower, rounder launch trajectories. Sand landings are forgiving on impact but create deep ruts on the run-out that can trap the front wheel.

**Hardpack surface:** Hardpack provides the most consistent and predictable jump behaviour — firm traction on the face, defined lip geometry, and consistent landing response. Most jump technique is taught and practiced on hardpack or groomed surfaces. Riders transitioning from hardpack to natural terrain often miscalibrate because natural surfaces do not behave as predictably.

### Condition Modifiers

**Wet conditions:** Reduce face traction (rear wheel spin risk), soften lip geometry (lip may deform under the tyre), and reduce landing traction (run-out slide risk). Wet conditions effectively increase severity by one tier for most jumps — a dry-moderate jump becomes a wet-significant jump.

**Frozen conditions:** Harden the surface dramatically, producing sharper lip geometry and harsher landings. Frozen mud surfaces that are normally soft become rock-like. Frozen conditions also reduce traction on the face and landing.

**Dusty conditions:** Reduce visibility of the lip geometry and landing zone. Dust kicked up by the front wheel on the face may obscure the lip from the rider. Surface traction is generally good but the visual penalty can cause the rider to misjudge the feature.

---

## 8. Exit, Landing & Recovery *(adapted: "Landing, Run-Out & Recovery")*

> *Merge restriction: this section must remain separate from Section 4 for timing-dependent features. Jump is timing-dependent.*

### Landing Dynamics

The landing is where all approach and airborne technique errors manifest as physical consequences. Landing forces scale with the square of vertical velocity — a small increase in height or a slight miss of the landing zone slope produces a disproportionately larger impact force.

**Downslope landing (target):** The bike's trajectory and the landing surface slope are aligned, minimising the vertical velocity component at contact. The bike decelerates gradually along the slope rather than impacting a flat surface. Fork and shock compress smoothly and in parallel. This is the target landing geometry for all jump sizes.

**Flat landing:** The full vertical velocity component must be absorbed by the suspension. Fork and shock compress to maximum travel. On significant or major jumps, flat landings commonly exceed suspension travel, producing a bottoming impact that transfers directly to the rider's body and the chassis. Flat landings are the primary cause of suspension damage and rider compression injuries.

**Upslope landing (casing):** The worst case. The bike contacts a surface that is rising toward it, adding the slope's resistance to the vertical impact. Suspension compression is maximised and bottoming is nearly certain. The abrupt deceleration pitches the rider forward. Casing is the highest-consequence landing error.

### Run-Out Requirements

After landing, the rider needs distance to re-establish full control. The run-out zone must be long enough for suspension to settle (1–2 full rebound cycles), for the rider to rebalance body position, and for steering and throttle control to be re-established. On natural terrain, the run-out zone may contain additional features (rocks, roots, turns, drops) that require immediate input before the rider has fully recovered from the landing.

Minimum run-out distances by severity: minor = 2–3m, moderate = 5–10m, significant = 10–20m, major = 20m+. These are not rigid requirements but represent the distance within which the rider's control is degraded after landing impact.

### Recovery from Imperfect Landings

**Front-heavy landing:** Fork bottoms, rider pitches forward. Recovery: push weight rearward immediately, apply gentle throttle to extend the rear and level the chassis, avoid front brake until the fork rebounds.

**Rear-heavy landing:** Rear shock bottoms, rider pitches rearward, then forward on rebound. Recovery: absorb the rebound through the knees, maintain neutral weight, avoid throttle until both wheels are settled.

**Lateral landing (off-axis):** Bike contacts ground with lateral offset. Recovery: immediately weight the inside peg to counteract the lean, avoid steering input until both wheels are tracking, accept a wider line on the run-out.

### Consequence of Lost Recovery Window

If the run-out zone is consumed by another feature (immediate turn, drop, or obstacle), the rider must manage the second feature while still recovering from the landing. This compounds the difficulty dramatically and is a common crash scenario in enduro — a jump followed immediately by a turn or a technical section. The pipeline should flag multi-feature sequences where the gap between features is shorter than the expected recovery distance.

---

## 9. False Reads & Misidentification

### Rider Misreads

**Underestimating natural jumps:** The most common rider misread. A trail feature that looks like a gentle rise at walking speed becomes a launch feature at trail speed. The rider's mental model classifies the feature as "undulating terrain" until they are on the face and it is too late to adjust. This is particularly common on unfamiliar trails where the rider has no prior knowledge of what is ahead.

**Overestimating tabletop safety:** Tabletops have a reputation as "safe" jumps because the flat top catches under-jumpers. This creates a false sense of security that leads riders to attempt tabletop jumps at severity levels they would not attempt on gap jumps. The casing risk at the table-to-downslope knuckle is underappreciated.

**Confusing step_up and jump:** A step_up is a vertical face that the rider lifts or drives the front wheel over at low speed, placing the wheel on the upper surface. A jump uses speed and a ramp geometry to launch the bike over the feature. The confusion arises when a step_up at trail speed becomes a jump — the geometry is the same, but the rider's speed transforms the technique requirement. Riders who are competent at step_up technique may be unprepared for the airborne state that the same feature produces at higher speed.

### Camera/Footage Misclassification Risks

**POV footage:** The jump face may not be visible in POV footage because the rider looks ahead, not down at the face geometry. Airtime is indicated by: loss of ground reference in the frame, engine note change (unloaded), and the "float" feel visible in camera shake patterns (smooth in the air, abrupt on landing). Stage 4 should rely on these indirect indicators rather than face geometry in POV clips.

**Distant 3rd-person footage:** At distance, the gap between a jump and a terrain undulation is difficult to distinguish. The Mark Crash and Nick Crash Phase 2 clips both demonstrated this — models could not reliably detect jump features from distant camera angles. Stage 4 should flag confidence below 0.5 for jump detection from distant 3rd-person footage.

**Low-resolution footage:** Lip geometry disappears at low resolution. The distinction between "trail rises and falls" and "defined jump face with lip" requires edge definition that low-resolution footage cannot provide.

### Condition-Created Ambiguity

**Wet rock that looks flat:** A wet rock shelf may appear flat and safe but actually has a defined convex geometry that launches the bike when ridden at speed. Water on the surface obscures the shape.

**Shadow-hidden lips:** Dense tree cover creates shadows that can hide the lip geometry entirely. The rider may not see the lip until the front wheel is over it.

**Vegetation-covered landing:** Tall grass or low vegetation can hide a landing drop-off that is significantly steeper than it appears. The feature reads as a small roller but the far side drops away.

---

## 10. Coaching Gates & Prerequisites

### Minimum Prerequisites by Severity

**Minor:** Basic standing technique confirmed (BIOMECH-01). The rider must be comfortable standing on the pegs with bent knees and elbows. Without this, even minor compressions produce uncontrolled body position.

**Moderate:** All minor prerequisites plus: steady throttle control through terrain changes (CONTROL-01), basic weight distribution awareness (DYNAMICS-01), and commitment decision-making — the rider must understand that speed must be set before the face, not adjusted on it. Visual scanning ahead (INTEL-04) must be functional — the rider must be looking at the landing zone, not at the lip.

**Significant:** All moderate prerequisites plus: demonstrated consistent moderate-jump execution with neutral lip departure and balanced landing. The rider must show evidence of in-air awareness — active body position management during airtime, not frozen grip. Clutch-throttle coordination (CONTROL-01, CONTROL-02) and advanced commitment reasoning (INTEL-05, INTEL-06) must be confirmed.

**Major:** All significant prerequisites plus: demonstrated recovery from imperfect significant-severity landings. The rider must have experience managing surprise nose-up and nose-down situations at significant severity. Advanced airborne control — deliberate use of body weight and rear brake to adjust attitude in the air. **Do not coach up to major jump technique without confirmed competence at significant level and demonstrated recovery skills.**

### Progression Model

The safe progression path for jump skills:
1. Standing attack position on flat terrain → 2. Absorbing compressions (minor rollers) while standing → 3. Small natural features with visible airtime (still minor severity) → 4. Purpose-built tabletops at moderate severity → 5. Natural features at moderate severity → 6. Gap jumps at moderate-to-significant severity → 7. Significant natural features → 8. Major features (only with progressive speed building and local knowledge)

Each step requires demonstrated competence — not just completion, but consistent technique. A rider who completes a moderate jump with poor technique (rear-heavy landing, stiff arms, death-grip) has not passed the gate for significant.

### "Do Not Coach Up" Thresholds

Stage 9 (Decision Engine) should decline to recommend the next severity tier when:
- The rider's current footage shows technique errors at the current tier (coaching should fix current-tier errors before suggesting progression)
- The rider's body position in current-tier footage shows fundamentals are not internalised (death-grip, seated on approach, stiff arms, looking down)
- The outcome in current-tier footage includes crash or near-miss that indicates the rider is at their current limit
- The rider profile indicates a skill level below the prerequisite threshold for the next tier

### Skill Category Tags (Future-Proofing)

Prerequisites by tier reference the following skill categories for future Skill Tag and Drill KB integration:
- `balance_standing` — minor+
- `throttle_steady` — moderate+
- `weight_distribution_neutral` — moderate+
- `commitment_decision` — moderate+
- `visual_scan_ahead` — moderate+
- `clutch_throttle_coordination` — significant+
- `airborne_body_control` — significant+
- `recovery_imperfect_landing` — major

---

## 11. Feature Demands / Constraints

### Minimum Technique Required

Jump features at any severity require standing technique (BIOMECH-01). Riders who are not comfortable standing on the pegs should not attempt any feature that could produce unintended airtime. At moderate and above, jump features require the full attack position skill set plus throttle control, weight distribution management, and commitment decision-making.

### Equipment Considerations

**Suspension:** Correctly set sag and damping are more important for jumps than for any other feature type. Fork and shock must have sufficient travel to absorb landing impact without bottoming (or with controlled bottoming on significant+ features). Under-sprung or over-damped suspension increases landing harshness and reduces the rider's recovery window. Over-sprung suspension may not activate on the face, producing an unpredictable launch as the suspension suddenly engages at the lip.

**Tyres:** Tyre pressure affects face traction and landing grip. Lower pressures increase face grip but reduce support on landing impact (risk of rim strikes and tyre roll). Higher pressures reduce face grip but improve landing impact support. For enduro riders encountering natural jumps on trail rides, tyre pressure is set for the overall ride, not optimised for jumps — this is an accepted compromise.

**Bike geometry:** Wheelbase and head angle affect jump stability. Longer wheelbases are more stable in the air (less susceptible to pitch changes) but harder to correct if attitude is wrong. Shorter wheelbases are more responsive to body weight corrections but also more sensitive to errors. Enduro bikes (typically longer wheelbase than motocross) are naturally more forgiving in the air at the cost of responsiveness.

### Out-of-Scope Content

- Standing vs seated fundamentals → BIOMECH-01
- Throttle control mechanics → CONTROL-01
- Weight distribution physics → DYNAMICS-01
- Line choice and terrain reading → INTEL-01, INTEL-03
- Commitment vs hesitation psychology → INTEL-05
- Drop features (purely downward, no upward launch) → FEATURE-02
- Step_up features (vertical face, low-speed wheel placement) → FEATURE-07
