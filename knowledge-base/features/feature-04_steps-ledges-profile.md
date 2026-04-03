---
# ── BLOCK 1: Pipeline Contract ──────────────────────────────────────────────
pipeline_contract:
  kb_type: terrain_feature
  pipeline_enum_value: [step_up, step_down, ledge]
  feature_class: single_event

# ── BLOCK 2: Retrieval Triggers ─────────────────────────────────────────────
retrieval_triggers:
  PRIMARY:
    stage4_feature_type: [step_up, step_down, ledge]
  SECONDARY:
    stage6_failure_types: [technique, momentum, decision, traction]
    stage7_crash_types: [otb, tip_over]
  CONTEXTUAL:
    stage3_intent_category: [climb, descent, technical_section, trail_ride]
    stage5_outcome: [crash, bail, stall]

# ── BLOCK 3: Content Metadata ────────────────────────────────────────────────
content_metadata:
  topic_id: FEATURE-04
  title: Steps / Ledges (Up & Down) — Feature Profile
  domain: Terrain Feature KB
  domain_id: features
  scope: "Feature identification, severity classification, and technique requirements
    for step-up, step-down, and ledge features — discrete vertical or near-vertical
    transitions managed at low speed with sustained or near-sustained ground contact.
    Does NOT cover drops at speed where both wheels become fully airborne (see
    FEATURE-03), jumps with upward launch trajectory (see FEATURE-01), standing/seated
    fundamentals (see BIOMECH-01), clutch and throttle coordination (see CONTROL-01,
    CONTROL-02), or surface physics of step surfaces (see Terrain KB entries).
    Where speed transforms a step into a drop or jump, classification follows the
    dominant event in the footage — see classification rules in Section 2."
  status: draft
  feature_type: step
  severity_definition:
    minor: "Vertical face under 0.3m; rollable with basic wheel lift or placement; consequence limited to minor chassis upset or stall"
    moderate: "Vertical face 0.3–0.7m; requires deliberate front wheel lift, clutch-throttle coordination, and body position management; poor technique produces stall, wheel bounce-back, or uncontrolled chassis pitch"
    significant: "Vertical face 0.7–1.2m or multiple sequential steps; requires trials-influenced technique with precise clutch, throttle, and body position timing; technique errors produce stall with the bike straddling the obstacle, OTB on step-ups, or uncontrolled descent on step-downs"
    major: "Vertical face over 1.2m or complex step geometry (angled, off-camber, blind); requires advanced trials technique with full commitment; consequence of error is crash, bike damage, or inability to recover without assistance"
  severity_covered: [minor, moderate, significant, major]
  crash_types_associated: [otb, tip_over]
  failure_types_associated: [technique, momentum, decision, traction]
  common_misclassifications:
    - drop           # A drop involves freefall and airborne descent at speed; a step-down is managed at low speed with sustained or near-sustained ground contact
    - jump           # A jump launches from a ramp with upward trajectory; a step-up is a vertical face managed with wheel placement, not launch
    - "steep gradient — a sustained slope is NOT a step; a step is a discrete vertical or near-vertical transition in the trail surface"
    - rock_garden    # A rock garden is a field of loose or embedded rocks requiring continuous line management; a step is a single discrete vertical face (though rock gardens may contain steps within them)
  typical_body_position: standing
  difficulty_range: [beginner, intermediate, advanced]
  related_topics: [BIOMECH-01, BIOMECH-02, CONTROL-01, CONTROL-02, DYNAMICS-01, DYNAMICS-04, FEATURE-01, FEATURE-03]
  prerequisites: [BIOMECH-01, CONTROL-01]
  tags: [step-up, step-down, ledge, pallet, boulder, vertical, rock-step, root-step, trials, wheel-lift, wheel-placement, clutch, stall, bounce-back, straddling]
  version: 1.0
  last_updated: 2026-04-03
---

# FEATURE-04 — Steps / Ledges (Up & Down): Feature Profile

---

## 1. Feature Geometry & Physics *(MANDATORY)*

A step is a discrete vertical or near-vertical transition in the trail surface where the rider must lift, place, or lower one wheel at a time over a defined face. The defining characteristic is **sequential wheel management at low speed with sustained or near-sustained ground contact**. Unlike a jump where both wheels leave the ground from a ramp, or a drop where the bike enters freefall from an edge, a step is negotiated through direct mechanical interaction between the wheels and the obstacle face. The rider uses clutch, throttle, body position, and momentum to move each wheel over the vertical face in sequence.

**Primary Observable Signature:** Rider managing one wheel at a time over a distinct vertical face at low speed — front wheel lifts to or places onto a surface at a different height, followed by the rear wheel crossing the same face.

**Dominant Risk Axis:** Momentum management through the vertical transition and sequential wheel placement accuracy.

A ledge is the edge geometry that creates a step. The same ledge is a step-up when ridden upward, a step-down when ridden downward, and a wall when the face exceeds the rider's technical ability to cross. The ledge itself is not a separate feature type — it is the geometry that produces steps in either direction. In the pipeline, `ledge` is used as a geometry-dominant classification when direction of travel or execution mode cannot be confidently resolved as step-up or step-down from the footage. This entry covers both directions and uses "step" as the general term, specifying "step-up" or "step-down" where the direction-specific physics or technique differ.

### Physical Zones — Step-Up

**Approach zone:** The section of trail leading to the base of the vertical face. On step-ups, the approach zone is where the rider builds the precise amount of momentum needed — enough to drive the front wheel to the height of the step, but not so much that the bike launches off the top (which transforms the feature into a jump). The approach is typically very short on natural terrain — often 2–5 bike lengths.

**Face zone:** The vertical or near-vertical surface that the front wheel must clear. The face height is the defining severity metric. The face angle matters: a true vertical face (90°) requires the front wheel to be lifted clear; an angled face (60–80°) allows the front wheel to climb partially before requiring a lift. The face surface type affects rear wheel traction during the critical drive phase — loose rock, wet root, or mud on the face reduces the rear wheel's ability to drive the bike upward.

**Crest zone:** The top edge of the step where the front wheel transitions from climbing to level travel. On natural steps, the crest may be sharp (square rock edge), rounded (weathered rock, compacted earth), or irregular (root cluster, broken rock). The crest shape determines whether the front wheel rolls smoothly onto the upper surface or catches on the edge. A sharp crest can catch the front tyre's lower sidewall or rim, producing a sudden deceleration that stalls forward progress.

**Upper surface:** The terrain above the step. The front wheel must establish traction here while the rear wheel is still negotiating the face. If the upper surface is significantly different from the approach surface (e.g., approach on dirt, upper surface on wet rock), the front wheel may not find traction when it arrives, preventing the bike from pulling itself up.

### Physical Zones — Step-Down

**Approach zone:** The section of trail on the upper surface leading to the step edge. On step-downs, the approach zone is where the rider sets body position (weight rearward) and reduces speed to walking pace or below. The approach to a step-down is functionally similar to a drop approach but at much lower speed.

**Edge zone:** The top edge where the upper surface ends and the face begins. This is where the front wheel transitions from level to descending. On step-downs, the rider controls the rate at which the front wheel descends — ideally placing it on the lower surface rather than allowing it to fall.

**Face zone:** The vertical or near-vertical surface that the bike descends. On step-downs, the rear wheel often remains on the upper surface or the crest while the front wheel is placed on the lower surface. The rear brake controls descent rate during this phase.

**Lower surface:** The terrain at the base of the step. The front wheel contacts this first, and the rider must manage weight distribution to prevent the front end from diving as the rear wheel follows over the crest.

### Force Vectors — Step-Up

The central force problem on a step-up is converting horizontal momentum into vertical wheel displacement against gravity. The front wheel must rise by the height of the step — this requires either lifting energy (from a wheelie or manual technique) or climbing energy (the wheel rolling up an angled face). Once the front wheel reaches the crest, the rear wheel must follow. The rear wheel's drive force must overcome gravity acting on the entire bike-rider mass over the step height. The drive force is transmitted through the rear tyre's contact with the step face — if this contact point has low traction (wet, loose, smooth), the drive force cannot be delivered and the bike stalls.

The critical timing problem: the front wheel must be over the crest before the rear wheel reaches the base of the face. If the front wheel stalls at the crest, the rear wheel drives into the face and the bike is wedged — the front is blocked by the crest and the rear is pushing against a vertical surface. This is the "straddling" failure mode.

### Force Vectors — Step-Down

The force problem on a step-down is controlling the rate of descent against gravity while maintaining chassis stability. The front wheel drops from the upper surface to the lower surface — gravity provides the motive force. The rider's task is to prevent the nose-down pitch that gravity creates (the same pitch problem as drops, but at lower speed and shorter height). The rear brake, acting through the rear wheel still on the upper surface, controls the rate of the bike's forward rotation over the edge.

At the low speeds typical of step-downs, gyroscopic stability is minimal. The bike must be held upright almost entirely through rider balance, footpeg weighting, and brake control. This makes step-downs at significant severity a balance challenge as much as a technique challenge.

### Why This Creates a Distinct Riding Problem

Steps are the only common feature type where the rider must manage each wheel's interaction with the obstacle independently and sequentially. On jumps and drops, both wheels experience the feature as a unit — the bike launches or descends as a whole. On steps, the front wheel and rear wheel have completely different tasks at different moments. The front wheel must clear the face (step-up) or be placed below it (step-down) while the rear wheel is still on the original surface. Then the rear wheel must negotiate the same face while the front wheel is on the new surface. This sequential management requires different inputs at different moments — a coordination problem that no other feature type demands to the same degree.

The second distinct problem is speed sensitivity in the opposite direction from drops. On drops, more speed often helps (gyroscopic stability, trajectory extension). On steps, more speed is usually harmful — it transforms the step into a different feature entirely (drop or jump) and removes the sequential wheel management that is the correct technique. Steps reward precision and timing over momentum — a qualitatively different skill set from the commitment and speed management that drops and jumps require.

### Commitment & Reversibility Profile

**Point of no return — step-up:** Commitment occurs when the front wheel contacts the face. Before this, the rider can stop. Once the front wheel is on the face and the rear wheel is providing drive, the rider is committed to completing the step or stalling on it. Stalling partway is not dangerous on minor steps but becomes increasingly problematic at moderate and above — the bike may roll backward, the rider may be straddling the obstacle, and restarting on a slope with the front wheel elevated is difficult.

**Point of no return — step-down:** Commitment occurs when the front wheel passes over the edge. Before this, the rider can stop on the upper surface. Once the front wheel is descending, the rider must complete the step-down or stall with the bike straddling the edge (front wheel below, rear wheel above).

**Recovery window:** Longer than drops or jumps because the speeds are lower. On step-ups, if the front wheel stalls at the crest, the rider can often back the bike down and re-attempt. On step-downs, if the front wheel is placed too heavily, the rider can foot-down on the lower surface and stabilise. The recovery window narrows significantly at higher severity where the face height makes backing down or foot-down stabilisation difficult.

**Bailout options:** On step-ups, the primary bailout is stopping before the face, dismounting, and lifting or pushing the bike up manually. On step-downs, the primary bailout is stopping at the edge, dismounting on the upper surface, and lowering the bike down manually. Manual bike management is a legitimate technique on significant and major steps — choosing to ride a step that could be walked is a decision the coaching system should assess.

---

## 2. Feature Forms & Variants *(MANDATORY)*

> **Classification hard rule:** If sustained ground contact is maintained throughout the feature at low speed, it is a step (FEATURE-04), not a drop or jump. If both wheels become fully airborne during the transition, classify based on the dominant trajectory: upward launch = jump (FEATURE-01), downward freefall = drop (FEATURE-03). Speed is the primary classification discriminator between step and drop/jump — the same geometry at walking pace is a step; at trail speed it may be a drop or jump.

> **Classification boundary note:** The boundary between step-down and drop is speed-dependent, not geometry-dependent. A 0.5m ledge ridden at walking pace with the front wheel placed onto the lower surface is a step-down. The same ledge at trail speed where the front wheel enters freefall is a drop. Classification follows the dominant event in the footage. Similarly, a 0.5m rock face that a rider drives over at walking pace is a step-up; the same face hit at speed with a launch off the top is a jump.

### Rock Step

The most common natural step form. An exposed rock shelf, embedded boulder, or geological ledge that creates a vertical or near-vertical face across the trail. Rock steps provide firm, predictable geometry — the face angle and height are fixed and the surface does not deform under the tyre. The traction characteristics of the rock face determine rear-wheel drive effectiveness on step-ups and front-wheel placement reliability on step-downs.

**Visual identification:** A defined rock face crossing the trail, with the trail surface at different heights on each side. The face may be a clean vertical plane (sedimentary rock layers, quarried stone) or irregular (granite boulders, broken limestone). The step may span the full trail width or only part of it, offering a line choice around the step.

**Severity range:** Minor to major. Rock steps cover the full severity range — from 10cm trail ledges to 1.5m+ boulder faces. The rock surface type significantly affects severity: textured dry rock provides grip for rear-wheel drive; smooth wet rock provides almost none.

**Distinct failure pattern — step-up:** Rear wheel spin on the rock face. The rear tyre contacts the rock face and must drive the bike upward, but the rock surface does not provide sufficient traction. The rear wheel spins, the bike stalls with the front wheel at or near the crest and the rear wheel at the base. The rider is straddling the step with no drive traction to complete it.

**Distinct failure pattern — step-down:** Front wheel slam onto the lower rock surface. The rider lowers the front wheel off the edge but does not control the descent rate. The front tyre hits the rock landing hard, compressing the fork and pitching the rider forward. On rock, there is no surface absorption — the full impact transfers through the fork to the rider.

### Root Step

A step formed by exposed tree roots crossing the trail at different heights. Root steps differ from rock steps in several ways: the root surface is round rather than flat (the tyre contacts a curved surface), roots are often wet and extremely slippery, and root steps may flex or shift under load (unlike rock which is fixed). Multiple roots at different heights can create a staircase effect — a sequence of small steps rather than a single face.

**Visual identification:** One or more exposed tree roots crossing the trail, creating a vertical transition. The roots may be individual (a single large root forming a 15–20cm step) or clustered (multiple roots at different levels creating a 30–50cm cumulative step). Roots are typically round in cross-section, dark in colour, and often wet or muddy.

**Severity range:** Minor to moderate for individual roots. Moderate to significant for root clusters that create cumulative height. The round cross-section of roots dramatically increases severity in wet conditions — the tyre's contact with a round wet surface provides almost no longitudinal traction for driving over the step.

**Distinct failure pattern:** Front wheel bounce-back. The front tyre contacts the round root surface and, instead of climbing over, bounces back or deflects sideways. The round profile of the root does not provide a stable contact point — the tyre's loading angle on the curved surface tends to push the wheel backward rather than allowing it to roll up and over. This is particularly pronounced on wet roots where the combination of round geometry and near-zero friction produces immediate wheel rejection.

### Earth Bank / Trail Erosion Step

A step formed by erosion, trail wear, or geological layering where the trail surface drops or rises at an earth bank. The bank may be compacted earth, clay, or mixed soil. Unlike rock steps, earth banks can deform under the tyre — the rear wheel may dig into the face rather than driving up it, and the front wheel may sink into a soft upper surface rather than rolling cleanly onto it.

**Visual identification:** A vertical or steep earth face crossing the trail, typically darker at the exposed face where soil layers are visible. The face may be crumbling, undercut by water erosion, or partially supported by root networks. The edges are typically less defined than rock steps — the crest may be rounded or partially collapsed.

**Severity range:** Minor to moderate in dry conditions. Moderate to significant in wet conditions where the earth becomes soft and the face loses structural integrity. Earth banks that are undermined by water may collapse under the bike's weight — the crest crumbles as the front wheel loads it, dropping the front end into the collapsing face.

**Distinct failure pattern:** Crest collapse on step-up. The rider drives the front wheel to the crest of the earth bank. The front wheel loads the crest edge, and the earth — weakened by moisture, erosion, or root damage — collapses under the wheel's weight. The front wheel drops back to a lower position, the bike stalls, and the crest is now further damaged and harder to negotiate on a re-attempt.

### Pallet / Constructed Step

An artificial step used in hard enduro competition and training — wooden pallets, concrete blocks, tyres, or constructed obstacles placed deliberately. These steps have consistent, predictable geometry (known height, uniform face angle, consistent surface) but often present severity at the moderate-to-major range because they are designed as challenges rather than natural trail features.

**Visual identification:** Obviously artificial — uniform shape, consistent surface, clearly placed. Pallets have a characteristic horizontal-slat structure. Concrete blocks have flat faces and sharp edges. These features are typically found in competition sections, training areas, or trials courses.

**Severity range:** Moderate to major. Pallets are typically 15–20cm per layer, but may be stacked 2–5 high (30cm–1m). Concrete blocks and constructed obstacles can be any height. The consistent geometry makes severity assessment straightforward — the height is what it appears to be, and the surface properties are uniform.

**Distinct failure pattern:** Front wheel hook on pallet slats. The front tyre's knobs catch on the horizontal slats of a pallet, producing an abrupt deceleration rather than a smooth roll-over. The bike stalls with the front wheel wedged between slats, and the rider's momentum continues forward (potential OTB on taller stacks). This is specific to pallet construction — the gaps between slats catch tyre knobs in a way that solid surfaces do not.

### Sequential Steps / Staircase

Multiple steps in sequence with minimal flat terrain between them. The rider must negotiate each step individually, but the recovery distance between steps is insufficient for full re-establishment of body position and momentum. Common in rocky hill climbs (the Colin Hill test clip terrain), eroded trails, and waterfall-type geological formations.

**Visual identification:** A series of vertical faces separated by short flat or sloped sections. The overall impression is of a staircase ascending or descending. Individual step heights may be minor, but the cumulative challenge of managing multiple sequential steps without a rest point elevates the overall difficulty.

**Severity range:** Moderate to major regardless of individual step height, because the sequential nature prevents recovery between steps. Three 0.3m steps in sequence (minor individually) creates a moderate-to-significant challenge because the rider must execute three technique sequences without a reset.

**Distinct failure pattern:** Momentum exhaustion on sequential step-ups. The rider clears the first step but the technique execution (clutch dump, throttle, body position shift) consumes the available momentum. The rider arrives at the second step with insufficient speed and drive to repeat the technique. The bike stalls between steps — not at any individual step face, but in the gap between steps where momentum was not re-established.

---

## 3. Bike Behaviour *(MANDATORY)*

This section describes the mechanical response of the motorcycle to step features at the physics level. No coaching language, rider intent, or corrective advice — that content belongs in Section 4.

### Front Wheel Interaction with the Step Face (Step-Up)

When the front wheel contacts the base of a vertical face, the tyre compresses against the obstacle. If the face angle is less than approximately 70° from horizontal, the tyre can grip and roll up the face — the wheel climbs the obstacle through traction. Above approximately 70°, the tyre cannot generate sufficient climbing traction and the wheel must be lifted over the face using a wheelie or manual technique.

The front wheel's interaction with the face is a binary outcome at steep angles: either the wheel clears the crest or it does not. If the wheel reaches the crest but does not fully clear it, the tyre contacts the crest edge on its lower sidewall or rim — a region with no tread and minimal grip. The wheel stalls at the crest edge, the fork compresses from the impact, and the bike decelerates abruptly. This is the "front wheel bounce-back" — the crest edge rejects the tyre and the wheel drops back to the base.

Fork compression plays a significant role in step-up dynamics. As the front wheel contacts the face, the fork compresses. If the rider uses a wheelie approach (throttle and clutch to lift the front), the fork is extended (unloaded) at the moment of lift, which is correct. If the rider simply rides into the face without lifting, the fork compresses against the obstacle and the rebound energy may lift the wheel — but the timing is uncontrolled and the lift height may be insufficient.

### Rear Wheel Drive Phase (Step-Up)

Once the front wheel is on the upper surface, the rear wheel must climb the face. The rear wheel's ability to drive the bike upward depends on three factors: the rear tyre's traction on the face surface, the engine's torque delivered through the drivetrain, and the weight on the rear wheel (which determines the normal force and therefore the available friction).

On step-ups, the weight distribution shifts forward as the front end is elevated — the front wheel is above the rear, tilting the bike and shifting the centre of mass forward. Forward chassis rotation can increase rear contact loading initially, but excessive forward weight reduces effective drive leverage and compromises the rear wheel's ability to complete the climb.

The clutch is the critical control input during the rear wheel drive phase. A progressive clutch release allows controlled torque delivery to the rear wheel. A sudden clutch dump delivers a torque spike that can spin the rear wheel (breaking traction on the face) or produce a wheelspin-to-grip-to-jerk sequence that upsets the bike's balance. On two-stroke engines, the torque delivery is more abrupt than on four-strokes, making clutch control more critical for step technique.

### Rear Wheel Hook and Catch

When the rear wheel reaches the crest of a step-up, the tyre must transition from the vertical face to the upper surface. If the rear tyre's knobs catch on the crest edge, the wheel decelerates abruptly. This sudden deceleration at the rear while the front wheel is already moving on the upper surface produces a compression of the bike's wheelbase — the rear end catches while the front continues, pitching the rider forward. On minor steps, this manifests as a jarring chassis upset. On moderate steps and above, the rear wheel hook can pitch the rider over the bars if the front wheel does not have sufficient forward momentum to absorb the compression.

The rear wheel can also catch on the face itself rather than the crest — the tyre knobs dig into a crack, root, or irregularity in the face surface, producing a sudden deceleration mid-climb. This stalls the bike with the rear wheel partway up the face and insufficient momentum to complete the climb.

### Step-Down Chassis Dynamics

On step-downs at low speed, the front wheel is lowered from the upper surface to the lower surface. The bike rotates around the rear axle contact point (which is still on the upper surface). This rotation is controlled by the rear brake — the rear brake acts as a descent rate controller, resisting the forward rotation of the bike around the rear axle.

The suspension response on step-downs at low speed is dominated by fork compression on the lower surface contact. Because the speed is low, the vertical velocity at contact is low — the fork compression is manageable and bottoming is unlikely on minor-to-moderate step-downs. However, the nose-down pitch is more pronounced at low speed because gyroscopic stability is minimal. The rider must counteract the pitch entirely through body position (weight rearward) and rear brake (descent rate control).

The rear wheel's transition over the crest on step-downs is less problematic than on step-ups because the rear wheel is descending rather than climbing — gravity assists rather than resists. However, if the rider releases the rear brake before the rear wheel is over the crest, the bike accelerates forward suddenly as the braking resistance disappears, potentially pitching the rider forward.

### Balance at Low Speed

Steps are negotiated at speeds where gyroscopic stability provides minimal assistance. The bike must be kept upright through active rider balance — footpeg weighting, knee grip, and core stability. Any lateral imbalance during the step negotiation develops quickly because there is no gyroscopic resistance to lateral tipping. This is why steps become dramatically harder when the face is off-camber or the approach line is angled — the lateral balance challenge is added to the already demanding sequential wheel management.

---

## 4. Technique by Severity *(MANDATORY)*

Severity is defined primarily by observable feature geometry (face height, face angle, crest shape) and surface conditions. Rider skill requirement is secondary commentary.

### Minor (Face under 0.3m, rollable with basic technique)

**Step-up technique:** Standing, moderate approach speed. Allow the front wheel to roll up and over the face — on faces under 0.3m at a slight angle, the front wheel can often climb without a deliberate lift. Maintain steady throttle through the transition. Keep weight centred to allow both wheels to cross. The rear wheel typically rolls over without specific technique at this height.

**Step-down technique:** Standing, slow approach. Allow the front wheel to roll off the edge and drop to the lower surface. Slight rearward weight bias. Rear brake covers descent rate. At this height, the step-down is barely distinguishable from normal trail undulation.

**Common errors:** Being seated — prevents weight management. Chopping throttle at the step — stalls forward progress on step-ups. Looking at the step face rather than beyond it.

**Mechanical consequence:** Errors at minor severity produce chassis upset — a jarring bump — but rarely stalls or crashes.

**Coaching gate:** Basic standing technique (BIOMECH-01). No specific step skills required at minor severity.

### Moderate (Face 0.3–0.7m, requires deliberate wheel management)

**Step-up technique:** Standing, attack position. The front wheel cannot simply roll over a 0.3–0.7m face — it must be lifted. The standard technique is a clutch-assisted wheel lift: the rider pulls the clutch in slightly, blips the throttle to build revs, and releases the clutch while simultaneously shifting weight rearward. This produces a front wheel lift driven by rear wheel torque. The lift must be timed so the front wheel is at crest height as it reaches the face. Once the front wheel is on the upper surface, the rider shifts weight forward to load the front and drives the rear wheel up the face with steady throttle and controlled clutch.

**Step-down technique:** Standing, weight well rearward. Approach at walking pace or just above. The front wheel is lowered over the edge — the rider extends the arms and allows the bike to rotate forward around the rear axle. Rear brake controls descent rate. Once the front wheel contacts the lower surface, the rider shifts weight forward progressively to reload the front tyre while the rear wheel follows over the crest. The rear brake is maintained until the rear wheel is fully on the lower surface.

**Commitment threshold:** Moderate. On step-ups, once the front wheel is at the face and the rider has initiated the lift, they are committed to completing the technique or stalling. On step-downs, once the front wheel is past the edge, the descent must be completed.

**Common errors — step-up:** Insufficient wheel lift — the front wheel hits the face rather than clearing it, producing bounce-back. Clutch dump too aggressive — rear wheel spins on the face rather than driving the bike up. Weight too far forward during rear wheel drive phase — reduces rear traction. Not enough approach momentum — the bike stalls before the rear wheel clears the crest.

**Common errors — step-down:** Releasing the rear brake too early — the bike accelerates forward as the rear wheel comes over the crest. Weight not far enough rearward — nose-down pitch develops and the rider loads the front end on the lower surface too heavily. Approaching too fast — removes sustained contact and transforms the event into a drop (FEATURE-03 classification), and the rider's step-down body position is not rearward enough for drop dynamics.

**Mechanical consequence:** On step-ups, front wheel bounce-back at moderate height can pitch the rider rearward or stall the bike in an awkward straddling position. Rear wheel spin on the face wears the tyre and can erode the face surface, making re-attempts harder. On step-downs, excessive front loading on the lower surface compresses the fork and pitches the rider forward — less dangerous than at drop speed but still unsettling.

**Coaching gate:** Standing technique (BIOMECH-01) and clutch-throttle coordination (CONTROL-01, CONTROL-02) must be confirmed. The rider must demonstrate a controlled front wheel lift before attempting moderate step-ups. For step-downs, rear brake control and rearward weight shift must be confirmed.

### Significant (Face 0.7–1.2m or sequential steps; trials-influenced technique)

**Step-up technique:** This severity requires trials-style technique. The front wheel lift must be higher and more precisely timed — the wheel must reach 0.7–1.2m above the approach surface, which requires a deliberate pre-load and explosive clutch-throttle input. The sequence: compress the fork (push the bars down), then simultaneously shift weight rearward and release the clutch with throttle. The fork rebound combines with the rear wheel drive torque and the rearward weight shift to lift the front wheel. The lift must be controlled — too little and the wheel does not clear the crest; too much and the bike loops backward.

Once the front wheel is on the upper surface, the rear wheel must drive up a face that is now 0.7–1.2m high. The rear tyre needs sustained traction on the face for the full climb distance. The rider's weight must shift forward to load the front tyre on the upper surface (preventing the front from lifting again) while maintaining enough rear wheel loading for traction. This is a precise balance — too far forward lifts the rear off the face; too far back lifts the front off the upper surface.

**Step-down technique:** At significant height, the step-down resembles a very controlled, slow-speed drop. Weight must be well behind the footpegs. Rear brake is the primary speed controller through the entire descent. The rider may need to feather the clutch to provide slight rear wheel drive that resists the forward rotation — this technique uses the engine as a secondary brake. The front wheel should be placed as gently as possible on the lower surface, not dropped. On 1m+ step-downs, the rider's arms must be fully extended to allow the bike to rotate forward while keeping the rider's weight as far rearward as possible.

**Commitment threshold:** High on step-ups. Once the front wheel lift is initiated at this height, the rider is fully committed — the energy in the system is too great to abort cleanly. On step-downs, commitment occurs when the front wheel passes the edge — but the low speed means the rider can often foot-down and stabilise if the descent goes wrong.

**Common errors:** On step-ups — looping the bike backward (excessive lift), stalling with the bike vertical against the step (insufficient momentum after the lift), and rear wheel spin on the face (insufficient traction or too-aggressive clutch). On step-downs — releasing the rear brake from fatigue or surprise (the bike accelerates forward as the rear wheel comes over the crest), failing to extend the arms fully (the rider is pulled forward with the bike's rotation).

**Mechanical consequence:** On step-ups at this height, a failed attempt typically results in the bike falling backward onto the rider or tipping sideways. The bike may end up wedged against the step with significant weight resting on the rider's legs. On step-downs, losing control at 1m height produces a fall from the upper surface — the rider and bike tumble down the step face.

**Coaching gate — do not prescribe significant step technique without confirmed prerequisites:** Rider must demonstrate reliable clutch-assisted wheel lifts on flat ground (not just at steps). Rear wheel drive on moderate step faces must be consistent. For step-downs, controlled rearward weight management at moderate height must be confirmed. Sequential steps require demonstrated single-step proficiency plus fitness for repeated technique execution.

### Major (Face over 1.2m or complex geometry)

Major steps are competition-level trials features. The face height exceeds what standard enduro technique can manage — the front wheel must be lifted above the rider's head height. This requires advanced trials technique including splatter (aggressive clutch dump at maximum throttle to launch the front wheel vertically), zap (a compression-based technique using suspension and body weight to generate extreme lift), or assisted techniques (using features in the face geometry to break the height into sub-steps).

**Step-up technique:** Pre-load, aggressive clutch-throttle coordination, and full commitment. The bike approaches the face at very low speed. The rider compresses the fork, then simultaneously dumps the clutch and opens the throttle while shifting weight aggressively rearward. The front wheel rises to or above crest height. As the front wheel clears the crest, the rider must immediately shift weight forward to prevent the bike looping backward. The rear wheel then drives up the face with maximum traction and drive.

**Step-down technique:** At major height, step-down technique is effectively identical to significant drop technique (FEATURE-03). The speed is still low, but the height means the front wheel descends a significant distance and the bike's pitch must be managed through the full descent. Rear brake, engine braking, and maximum rearward body position are all required.

**Coaching gate:** **Do not prescribe major step technique without confirmed competence at significant level.** Stage 9 should assess whether the step is appropriate for the rider's demonstrated ability. At major severity, the coaching response may be: "This step exceeds the technique level demonstrated in your footage. Walk the bike over this obstacle or find an alternative line."

---

## 5. Interaction Patterns & Failure Triggers *(MANDATORY)*

### Expected Outcome Patterns

- clean step clearance (both wheels over, controlled)
- front wheel bounce-back (wheel rejected by face or crest)
- stall on the step (bike stops with wheels at different levels)
- straddling (bike wedged across step, neither wheel fully over)
- rear wheel hook (rear catches on crest, chassis upset)
- controlled step-down placement
- uncontrolled step-down (nose-heavy landing)
- loop-out backward (step-up overcorrection)
- tip-over lateral (balance failure at low speed)
- bail / dismount

### Failure Chain: Front Wheel Bounce-Back (technique / momentum failure)

**Trigger:** Rider approaches step-up with insufficient wheel lift height or incorrect timing — the front wheel contacts the face below the crest rather than clearing it.

**Mechanism:** The front tyre contacts the vertical face at a point below the crest. The tyre compresses against the face and rebounds — the energy is directed backward and downward rather than upward because the face angle is too steep for the tyre to climb. The wheel bounces back to the approach surface. The bike decelerates abruptly as the forward momentum is absorbed by the face impact. The rider's momentum continues forward while the bike stops, pitching the rider onto the bars or, on taller steps, over the bars.

**Outcome:** On minor steps, a jarring stop. On moderate steps, potential OTB as the rider's forward momentum overcomes their grip. On significant steps, OTB risk is high and the bike may fall backward onto the rider after the bounce-back.

**Stage 6 classification:** `technique` (primary — wheel lift insufficient), `momentum` (contributing — approach speed insufficient to generate required lift height)

### Failure Chain: Rear Wheel Spin on Face (technique / traction failure)

**Trigger:** Front wheel is on the upper surface, but the rear wheel cannot find traction on the step face to drive the bike up.

**Mechanism:** The rear tyre contacts the face surface and the rider applies throttle to drive upward. The face surface — wet rock, smooth root, mud, or loose material — provides insufficient traction for the torque being delivered. The rear wheel spins. Each spin further degrades the contact surface (polishes rock, displaces loose material, deepens mud). The bike does not advance. The rider adds more throttle (instinctive), which increases the spin and further reduces any remaining traction.

**Outcome:** The bike stalls with the front wheel on the upper surface and the rear wheel spinning at the base or partway up the face. The rider is in a precarious position — weight forward to hold the front on the upper surface, but the rear is not advancing. Eventually the bike either stalls (engine dies from excessive load), the rear slides sideways (tip-over), or the rider's weight shifts too far forward and they topple over the bars.

**Stage 6 classification:** `technique` (primary — clutch control too aggressive for available surface traction), `traction` (contributing — surface friction insufficient for drive demand)

### Failure Chain: Stall / Straddling (momentum failure)

**Trigger:** Rider clears the front wheel over the crest but runs out of momentum before the rear wheel clears.

**Mechanism:** The front wheel is on the upper surface, but the bike has insufficient forward momentum to drive the rear wheel up and over the remaining face height. The bike stops with the frame or engine cases resting on the crest edge — the bike is "straddling" the step. The front wheel is on the upper surface, the rear wheel is off the ground or barely touching the face, and the bike's weight is resting on the obstacle.

**Outcome:** The rider is stuck. The bike cannot be driven forward (no rear wheel traction — the wheel is off the surface or spinning freely). The bike cannot easily be reversed (it is wedged on the step). The rider must typically dismount and manually lift or reposition the bike. On significant steps, the bike may be heavy and awkwardly balanced on the crest, making manual recovery difficult.

**Stage 6 classification:** `momentum` (primary — insufficient speed to complete the obstacle), `technique` (contributing — drive phase timing or clutch control allowed momentum to decay)

### Failure Chain: Loop-Out Backward on Step-Up (technique failure)

**Trigger:** Rider applies excessive lift technique — the front wheel rises past vertical and the bike begins to fall backward.

**Mechanism:** The clutch-throttle input produces more lift energy than needed for the step height. The front wheel rises past the 12 o'clock position. The bike's centre of mass passes behind the rear axle. Gravity now pulls the bike backward rather than forward. The rider cannot correct once the balance point is passed — there is no forward force available (the front wheel is in the air and the rear wheel is the pivot point, not a drive point in this configuration).

**Outcome:** The bike falls backward onto the rider. On minor steps, the rider can often step off the back. On moderate and above, the bike's rearward fall is fast enough that the rider may be trapped beneath it. This is one of the most dangerous step-up failure modes because the bike lands on the rider from above.

**Stage 6 classification:** `technique` (primary — excessive lift input)

### Failure Chain: Premature Rear Brake Release on Step-Down (technique failure)

**Trigger:** Rider releases the rear brake before the rear wheel is fully over the crest during a step-down.

**Mechanism:** The rear brake was controlling the bike's forward rotation rate over the step edge. When released, the braking resistance disappears. The bike's centre of mass, which is already forward of the rear axle (front wheel is below, bike is tilted forward), accelerates the forward rotation. The bike pitches nose-down faster than the rider expected.

**Outcome:** The bike accelerates forward and down. The rider's weight, previously balanced for the controlled descent rate, is now too far forward for the actual descent rate. The front end dives, the rear lifts, and the rider is pitched forward. On minor step-downs, this is a jarring lurch. On significant step-downs, this can produce an OTB.

**Stage 6 classification:** `technique` (primary — brake control error)

### Pipeline Identification Notes

**Visual indicators for Stage 4 `feature_type: step_up / step_down / ledge` detection:**

*Approach indicators:*
- Trail surface approaching a defined vertical face — rock shelf, earth bank, root cluster, or constructed obstacle visible ahead
- Rider visibly slowing to walking pace or below (distinguishes step from drop/jump)
- Rider adjusting body position — weight shift, standing taller, hands repositioning on bars

*Execution indicators:*
- Front wheel lift visible — the front of the bike rises above the face height (step-up)
- Front wheel being placed or lowered over an edge (step-down)
- Sequential wheel management visible — front wheel on one level, rear wheel on another
- Rider's body position shifting forward-to-rearward-to-forward through the technique sequence
- Clutch hand movement visible on close footage (clutch lever engagement)
- Engine note changes consistent with clutch-throttle technique (rev-drop-rev pattern)
- Very low speed throughout — the bike is moving at walking pace or just above

*Post-event indicators:*
- Both wheels at the same new level after the technique (successful clearance)
- Bike stalled on the step — wheels at different levels, rider stopped
- Bike fallen sideways at the step (balance failure)
- Rider dismounted and manually managing the bike over the obstacle

**Audio markers:**
- Clutch-throttle pattern: engine rev rising (throttle), sharp drop (clutch grab), engine loading (drive phase) — distinctive sound signature for step-up technique
- Engine stall sound at the step (failed attempt)
- Low-speed engine note throughout (not the high-speed approach of a jump or the silence of a drop)
- Rear wheel scraping or spinning on the face surface (on step-ups)

**Severity indicators:**
- Face height relative to wheel diameter: under one wheel diameter ≈ minor; one to two wheel diameters ≈ moderate; over two wheel diameters ≈ significant; over three ≈ major
- Rider technique level visible: simple roll-over = minor; visible wheel lift with clutch = moderate+; trials-style technique = significant+
- Sequential steps visible: count and spacing determine cumulative severity
- Face surface type: smooth wet surfaces increase severity by effectively reducing available drive traction

**Edge cases where Stage 4 classification confidence should be flagged low:**
- Speed ambiguity: if the rider's speed cannot be reliably assessed, the boundary between step and drop/jump is unclear — flag confidence below 0.5
- POV footage: step height is very difficult to assess from helmet-cam because the camera angle foreshortens vertical faces. The step may appear smaller or larger than it is
- Distant 3rd-person footage: minor steps (under 0.3m) may not be visible at all; moderate steps may appear as simple trail undulation
- Rock gardens containing steps: individual steps within a rock garden may not be classified separately — the rock garden classification may take priority if the overall feature is a field of rocks rather than a discrete step

### Observability Notes

**1. Reliably confirmable from footage (directly observable):**
- Whether a discrete vertical face exists in the trail
- Whether the rider manages the front and rear wheels sequentially (step) vs both wheels as a unit (drop/jump)
- Whether the rider is at low speed (step) vs trail speed or above (drop/jump)
- Whether a front wheel lift technique was used (visible in medium-distance 3rd-person footage)
- Whether the rider stalled, fell, or cleared the step
- Direction of travel (step-up vs step-down)
- Whether the step is a single face or a sequence

**2. Inferable with caveats:**
- Face height (estimated from bike proportions — wheel diameter as reference unit)
- Face surface type (estimated from visible texture and colour)
- Whether the rider used clutch technique (inferred from engine audio and bike behaviour, but clutch lever movement may not be visible)
- Whether the step is part of a larger feature complex (rock garden, hill climb section)
- Rider skill level relative to the step (inferred from technique quality and outcome)

**3. Cannot be determined from footage:**
- Exact face height in centimetres
- Face surface traction coefficient
- Whether the rider's clutch technique was correctly timed (the subtle timing differences between correct and incorrect clutch release are not visible)
- Tyre pressure and tread condition (which significantly affect step-up capability)
- Whether the rider has prior experience with this specific step
- The structural integrity of earth banks or root steps (whether the face will support the tyre's load)

---

## 6. Approach & Setup Requirements

> *Section 6 uses default naming for single_event features.*

### Speed Selection

Steps require the opposite speed approach from drops and jumps. The correct approach speed for a step is the **minimum speed that provides sufficient momentum for the technique** — typically walking pace to slow trail speed. Excessive speed transforms the step into a drop or jump, bypassing the sequential wheel management that is the correct step technique. On step-ups, the approach speed must provide enough momentum to sustain the bike through the lift and drive phases but not so much that the bike launches off the crest. On step-downs, the approach speed should be near-zero — the bike should arrive at the edge at walking pace or below.

The speed requirement increases with step height on step-ups — a taller face requires more momentum to drive the rear wheel up a longer distance. However, the increase is moderate, not dramatic — the difference between a 0.3m and a 0.7m step-up approach speed is slight. The technique quality (wheel lift timing, clutch control, drive phase management) matters far more than raw speed.

### Line Selection

Line choice on steps is critical and often determines success or failure. On natural rock steps, different parts of the face may have different heights, angles, and surface types. A step that is 0.7m on the left side of the trail may be 0.4m on the right where the rock shelf is lower. Reading the step geometry and choosing the lowest, most tractable line is a terrain intelligence skill.

On step-downs, line choice determines the landing surface type and angle. Choosing a line where the lower surface is flat and firm is preferable to a line where the lower surface is angled, loose, or contains further obstacles.

### Body Position Setup

On step-ups, the rider must be in standing position with the ability to shift weight rearward rapidly (for the wheel lift) and then forward (for the drive phase). This requires an active, centred start position — not already committed rearward (which prevents the forward weight shift needed for the drive phase).

On step-downs, weight must be rearward before the front wheel reaches the edge, as with drops — but the degree of rearward shift is less extreme because the speed and height are lower. The rider needs enough rearward bias to prevent nose-down pitch but enough forward range to reload the front wheel on the lower surface.

### Gear Selection

Steps require a low gear that provides maximum torque at low RPM. The clutch-throttle technique used on step-ups relies on the engine's ability to deliver a sharp torque pulse at low speed — this requires a gear low enough to keep the engine in its torque band at walking pace. On two-stroke engines, first or second gear is typical. On four-strokes with broader torque curves, second gear is often preferred because it provides smoother engagement.

---

## 7. Terrain & Condition Interaction

**This section flags which Terrain KB entries should be co-retrieved and documents the feature-level interaction. It does not duplicate Terrain KB content.**

### Surface Type × Step Interaction

**Rock surface (retrieve TERRAIN-03):** Rock steps are the most common natural step form. Dry textured rock provides good rear-wheel traction for the drive phase — the mechanical interlock between tyre knobs and rock texture enables the rear wheel to grip and climb. Wet rock dramatically reduces this traction, particularly smooth or polished rock where the friction coefficient drops below what the rear wheel needs to drive upward. The interaction is multiplicative: a moderate rock step on dry textured rock may be entirely manageable, while the same step on wet smooth rock becomes significant because the rear wheel simply cannot deliver drive.

**Mud surface (retrieve TERRAIN-01):** Mud on the step face reduces rear wheel traction through the shear-layer mechanism. Mud on the upper surface (step-up crest) reduces front wheel traction when it arrives — the front tyre cannot grip the muddy upper surface, and the bike slides backward. Mud on the lower surface (step-down landing) creates a front wheel dig risk on contact. Mud-covered steps are effectively one severity tier higher than their geometry suggests.

**Roots (retrieve TERRAIN-07):** Root steps present the round-surface traction problem described in Section 2. Wet roots on step faces are near-zero traction surfaces — the rear tyre cannot drive up a round, wet surface. Root steps embedded in earth may shift or flex under the bike's weight, changing the step geometry during the technique execution.

**Grass (retrieve TERRAIN-04):** Wet grass on step faces and crests dramatically reduces traction. Grass-covered earth steps are particularly deceptive — the step face may appear solid but the grass-over-earth surface provides far less traction than the visual appearance suggests.

### Condition Modifiers

**Wet conditions:** The single most impactful condition modifier for steps. Wet conditions reduce face traction (the rear wheel cannot drive on wet surfaces), reduce crest grip (the front wheel cannot hold its position on the upper surface), and reduce the rider's balance stability (foot placement on wet surfaces is uncertain if a foot-down is needed). Wet conditions elevate step severity by at least one tier.

**Frozen conditions:** Frozen earth steps become harder and may provide better wheel placement (the surface does not deform). However, frozen surfaces covered in frost are near-zero traction. Ice on rock steps is unrideable — the rear wheel cannot generate any drive traction on an iced vertical face.

**Dried mud on rock:** Old mud deposits on rock step faces create a false surface. The tyre contacts the dried mud rather than the rock beneath. If the mud layer is thin, it crumbles under the tyre and the wheel drops to the rock surface unpredictably. If the mud layer is thick, it may provide less traction than the underlying rock.

### Compounding Risk

- Steps embedded in a climbing gradient compound the momentum challenge — the rider is already fighting gravity on the approach, reducing available momentum for the step technique.
- Steps on off-camber terrain add a lateral balance challenge to the already demanding sequential wheel management.
- Steps immediately after or before other technical features (drops, corners, other steps) reduce the rider's preparation and recovery time.

---

## 8. Exit, Landing & Recovery

> *Section 8 uses default naming for single_event features.*

### Post-Step Dynamics — Step-Up

After clearing a step-up, the rider must re-establish forward momentum and stable body position on the upper surface. The technique sequence (wheel lift, drive phase, weight shift) leaves the rider in a forward-weight position with the bike at low speed. The immediate priority is throttle application to maintain forward progress — stalling after clearing the step (from insufficient throttle on the upper surface) is a common frustration that wastes the effort of the successful clearance.

On sequential steps, the "exit" from one step is the "approach" to the next. The rider must re-establish body position and momentum in the gap between steps — which may be as short as one bike length. This inter-step recovery is the primary difficulty amplifier for sequential step sections.

### Post-Step Dynamics — Step-Down

After the front wheel contacts the lower surface and the rear wheel follows over the crest, the rider must transition from the rearward step-down position to a neutral or slightly forward riding position. The transition should be gradual — snapping forward immediately can overload the front tyre on the lower surface. The rider should maintain rear brake until fully on the lower surface, then progressively release and resume normal riding.

### Recovery from Failed Attempts

**Bounce-back recovery:** If the front wheel bounces back from the face, the rider should allow the bike to settle, reassess the approach line and speed, and re-attempt with a higher wheel lift or more momentum. Repeated bounces can damage the tyre's sidewall against the step edge.

**Stall recovery:** If the bike stalls on the step (straddling), the rider should engage neutral or the clutch, stabilise the bike with body weight and feet, and assess whether the bike can be rocked forward to complete the step or must be backed down. On significant steps, manual recovery may require help from another rider.

**Tip-over recovery:** If the bike falls sideways at the step, the recovery is a standard bike lift and repositioning. The bike should be repositioned at the base of the step for a fresh approach rather than attempted from the fallen position.

**Backward fall recovery (step-up loop-out):** If the bike falls backward from a step-up attempt, the rider must get clear of the falling bike immediately. The bike will fall rearward and may land on the rider if they do not step off quickly. This is the highest-consequence step failure and preventing it (through controlled lift technique) is more important than recovering from it.

---

## 9. False Reads & Misidentification

### Rider Misreads

**Overestimating step difficulty:** Steps appear more intimidating than they often are when viewed from the approach. A 0.5m rock step looks imposing from below but is well within standard moderate technique. Riders who refuse rideable steps miss practice opportunities that build the sequential wheel management skills needed for harder steps.

**Underestimating wet step difficulty:** The same step that is moderate in dry conditions can become significant or major in wet conditions. The visual geometry has not changed, but the available traction has changed dramatically. Riders calibrated to a step in dry conditions may attempt it in wet conditions with unchanged technique and fail at the rear wheel drive phase.

**Confusing step height with step difficulty:** Height is the primary severity metric, but face angle, surface type, and crest shape all modify difficulty. A 0.5m step with a rounded crest on textured dry rock is significantly easier than a 0.5m step with a sharp square crest on wet smooth rock — same height, very different difficulty.

**Not recognising sequential step accumulation:** Individual minor steps that are trivial in isolation can become collectively challenging in sequence. Riders who assess each step individually may not appreciate the cumulative momentum and fatigue demands of a 10-step staircase section.

### Camera/Footage Misclassification Risks

**POV footage:** Step height is foreshortened from helmet-cam perspective. The camera looks slightly downward at the step face, compressing the apparent height. A moderate step may appear minor, and a significant step may appear moderate. The rider's technique inputs (clutch work, weight shifts) are not visible from POV. Audio is the primary indicator — the clutch-throttle sound signature is distinctive.

**3rd-person from the side:** This is the best camera angle for step assessment — the full face height is visible, the rider's body position is trackable, and the sequential wheel management is clearly observable.

**3rd-person from above or behind:** The step face may not be visible from above (it is foreshortened) or from behind (it is obscured by the rider and bike). From behind, the rider's body position changes are visible but the step geometry is not.

**Distant footage:** Minor steps are invisible at distance. Moderate steps are barely visible. Significant steps are identifiable by the rider's technique (visible pause, slow speed, body position changes) rather than by the step geometry itself.

### Condition-Created Ambiguity

**Vegetation obscuring face height:** Grass, ferns, or moss growing on a step face can hide the actual height and surface type. The rider sees a green bank that could be anything from a minor root step to a significant rock face beneath the vegetation.

**Water flowing over a step:** Water flow over a rock step obscures the face geometry and surface condition. The rider cannot assess traction or crest shape when water is flowing. The step may also be deeper than it appears — the water level on the lower surface hides the actual face height.

**Shadow and light:** Steps in dense tree cover may have the face in shadow, making it difficult to read the surface type and angle from the approach.

---

## 10. Coaching Gates & Prerequisites

### Minimum Prerequisites by Severity

**Minor:** Standing technique confirmed (BIOMECH-01). No specific step skills required — minor steps can be managed with basic trail riding technique.

**Moderate:** All minor prerequisites plus: clutch-throttle coordination (CONTROL-01, CONTROL-02) must be confirmed. The rider must demonstrate a controlled front wheel lift on flat ground — not just at steps, but as a practised skill. Rear brake control for step-down descent rate must be confirmed. Weight distribution awareness (DYNAMICS-01) — the rider must understand and execute the forward-rearward-forward weight shift sequence.

**Significant:** All moderate prerequisites plus: demonstrated consistent moderate step-up clearance with correct wheel lift timing and rear wheel drive. Clutch control must be smooth and deliberate, not reactive. The rider must demonstrate trials-influenced pre-load technique on flat ground before applying it to significant steps. For sequential steps, fitness for repeated technique execution must be adequate. For step-downs, controlled descent at moderate height with consistent rear brake management must be confirmed.

**Major:** All significant prerequisites plus: demonstrated recovery from failed significant-step attempts. The rider must show evidence of controlled wheel lifts to significant height with consistent clearing. **Do not coach up to major step technique without confirmed competence at significant level.** Stage 9 should assess whether the step is appropriate for the rider and may recommend walking the obstacle.

### Progression Model

1. Standing technique and balance at low speed → 2. Minor step roll-overs (both directions) → 3. Front wheel lift on flat ground → 4. Moderate step-ups on dry rock → 5. Moderate step-downs with rear brake control → 6. Moderate steps on varied surfaces (wet, root, earth) → 7. Sequential minor/moderate steps → 8. Significant step-ups on dry surfaces → 9. Significant step-downs → 10. Major steps (with progressive attempts and specific feature knowledge)

### "Do Not Coach Up" Thresholds

Stage 9 (Decision Engine) should decline to recommend the next severity tier when:
- The rider's footage shows front wheel bounce-back at the current tier (lift technique is insufficient)
- The rider's footage shows rear wheel spin on the step face (clutch control is not adequate)
- The rider stalls or straddles at the current tier (momentum management is not established)
- The rider's step-down footage shows uncontrolled nose-heavy descent (rear brake discipline is not confirmed)
- The rider falls laterally at steps (low-speed balance is insufficient for the next tier)
- The rider is seated during step technique (standing is a prerequisite for all coached step riding)

### Skill Category Tags (Future-Proofing)

Prerequisites by tier reference the following skill categories for future Skill Tag and Drill KB integration:
- `balance_standing` — minor+
- `balance_low_speed` — moderate+
- `clutch_throttle_coordination` — moderate+
- `front_wheel_lift` — moderate+
- `rear_brake_descent_control` — moderate+ (step-downs)
- `weight_shift_sequential` — moderate+
- `trials_preload_technique` — significant+
- `stamina_repeated_technique` — significant+ (sequential steps)
- `decision_walk_vs_ride` — major

---

## 11. Feature Demands / Constraints

### Minimum Technique Required

Step features at minor severity require only standing technique (BIOMECH-01). At moderate and above, step features demand clutch-throttle coordination (CONTROL-01, CONTROL-02) and deliberate weight distribution management (DYNAMICS-01) — these are the foundational skills that separate step technique from general trail riding. At significant and above, trials-influenced technique is required — pre-load lifts, precise clutch timing, and sustained low-speed balance.

Steps are uniquely demanding of clutch control. No other common feature type requires the same degree of clutch-throttle coordination at the moment of execution. Jumps, drops, and corners use throttle and braking but rarely involve clutch manipulation as a primary technique input. Steps are where clutch skills directly determine success or failure.

### Equipment Considerations

**Clutch type:** Hydraulic clutches provide more consistent engagement than cable clutches, which is beneficial for the precise clutch control that steps require. However, cable clutches offer more tactile feedback, which some riders prefer for trials-style technique. Either type works — the rider must be familiar with their specific clutch's engagement point and behaviour.

**Gearing:** Lower gearing (smaller front sprocket or larger rear sprocket) provides more torque multiplication at low speed, making step-up drive phases easier. Riders who frequently encounter steps may benefit from gearing one tooth lower on the front sprocket than standard trail setup.

**Tyres:** Tyre knob pattern affects step performance significantly. Aggressive enduro tyres with tall, widely spaced knobs provide better mechanical grip on rock faces than smooth or low-profile tread. Tyre pressure at the lower end of the recommended range (slightly softer) improves conformity to the step face, increasing contact area and traction — but excessively low pressure risks the tyre folding off the rim during the lateral loads of balance corrections at low speed.

**Bash plate / sump guard:** Steps are the feature most likely to result in the bike straddling an obstacle with the engine cases or frame resting on the step crest. A bash plate protects the engine from the step edge contact that is common during stalls and failed attempts.

**Handguards:** On step-ups in wooded areas, the rider's hands pass close to the step face and surrounding vegetation. Handguard contact with the step face or adjacent rocks can wrench the bars during the critical drive phase.

### Out-of-Scope Content

- Standing vs seated fundamentals → BIOMECH-01
- Clutch and throttle coordination → CONTROL-01, CONTROL-02
- Weight distribution physics → DYNAMICS-01
- Drop features (speed-transformed step-downs) → FEATURE-03
- Jump features (speed-transformed step-ups) → FEATURE-01
- Rock garden technique (continuous rock field) → FEATURE-06
- Line choice and terrain reading → INTEL-01, INTEL-03
