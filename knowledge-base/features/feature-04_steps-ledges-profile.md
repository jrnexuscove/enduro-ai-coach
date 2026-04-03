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

A step is a discrete vertical or near-vertical transition in the trail surface managed at low speed with sustained or near-sustained ground contact. The defining characteristic is **sequential wheel management**: front wheel clears the face first, then the rear wheel follows. Unlike jumps (ramp launch) and drops (freefall from an edge), steps maintain ground contact throughout and require independent management of each wheel.

**Primary Observable Signature:** Rider managing one wheel at a time over a distinct vertical face at low speed — front wheel lifts to or places onto a surface at a different height, followed by the rear wheel crossing the same face.

**Dominant Risk Axis:** Momentum management through the vertical transition and sequential wheel placement accuracy.

A ledge is the edge geometry that creates a step. The same ledge is a step-up upward, a step-down downward, and a wall when the face exceeds the rider's technical ability. `ledge` is used as a pipeline classification when direction of travel or execution mode cannot be confidently resolved from footage.

### Physical Zones — Step-Up

**Approach zone:** Where the rider builds precise momentum — enough to drive the front wheel to step height but not enough to launch off the top (which transforms it into a jump). Typically 2–5 bike lengths on natural terrain.

**Face zone:** The vertical or near-vertical surface the front wheel must clear. Face surface type determines rear wheel drive effectiveness.

**Crest zone:** The top edge where the front wheel transitions from climbing to level travel. Sharp crest can catch the front tyre's lower sidewall or rim — producing sudden deceleration. Crest shape determines whether the front wheel rolls onto the upper surface or stalls.

**Critical timing rule:** The front wheel must be over the crest before the rear wheel reaches the face base. If the front stalls at the crest with the rear driving into the face — the bike straddles the step and cannot advance.

### Physical Zones — Step-Down

**Approach zone:** Upper surface approaching the edge. Set body position (weight rearward) and reduce speed to walking pace or below.

**Edge zone:** Top edge where the upper surface ends. Rider controls the rate at which the front wheel descends — placing it on the lower surface rather than allowing it to fall.

**Face zone:** The vertical face the bike descends. Rear wheel often remains on the upper surface or crest while the front wheel is placed on the lower surface. Rear brake controls descent rate.

### Key Mechanics

**Step-up force problem:** Converting horizontal momentum into vertical wheel displacement against gravity. Drive force is transmitted through rear tyre contact with the step face — if that contact has low traction, the drive force cannot be delivered and the bike stalls.

**Step-down force problem:** Controlling descent rate against gravity at low speed. Gyroscopic stability is minimal — the bike must be held upright almost entirely through rider balance and rear brake. Same pitch problem as drops but at lower speed and shorter height.

**Speed sensitivity:** Steps reward precision over momentum — more speed is usually harmful (transforms the step into a drop or jump). This is the opposite of drops, where some speed helps.

### Commitment & Reversibility Profile

**Point of no return — step-up:** When the front wheel contacts the face. Before this, the rider can stop. Stalling partway is recoverable on minor steps; becomes increasingly difficult on moderate and above (straddling, slope angle, restart difficulty).

**Point of no return — step-down:** When the front wheel passes over the edge. Before this, the rider can stop on the upper surface.

**Recovery window:** Longer than drops or jumps — lower speeds allow more foot-down recovery options. Narrows at higher severity.

**Bailout options:** Step-up — stop before the face, dismount, lift or push manually. Step-down — stop at edge, dismount, lower manually. Walking the bike is a legitimate coaching option on significant and major steps.

---

## 2. Feature Forms & Variants *(MANDATORY)*

> **Classification hard rule:** If sustained ground contact is maintained throughout at low speed, it is a step (FEATURE-04), not a drop or jump. If both wheels become fully airborne, classify by dominant trajectory: upward launch = jump (FEATURE-01); downward freefall = drop (FEATURE-03).
>
> **Classification boundary note:** Speed is the primary discriminator between step and drop/jump — the same geometry at walking pace is a step; at trail speed it may be a drop or jump. Classification follows the dominant event in the footage, not geometry alone.

### Rock Step

Exposed rock shelf, embedded boulder, or geological ledge creating a vertical or near-vertical face. Firm, predictable geometry — face angle and height are fixed. Traction characteristics of the rock face determine rear-wheel drive effectiveness.

**Visual identification:** Defined rock face crossing the trail at different heights on each side. May be a clean vertical plane (sedimentary layers) or irregular (granite boulders). May not span the full trail width — line choice possible.

**Severity range:** Minor to major. Rock surface type significantly modifies severity: textured dry rock = manageable; smooth wet rock = severe.

**Distinct failure pattern — step-up:** Rear wheel spin on the rock face. Traction insufficient for drive torque → bike stalls with front wheel at or near crest and rear wheel at the base (straddling).

**Distinct failure pattern — step-down:** Front wheel slam onto lower rock surface. Descent rate not controlled → front tyre hits hard → fork compresses → rider pitched forward. No surface absorption on rock.

### Root Step

Step formed by exposed tree roots at different heights. Round cross-section surface — tyre contacts a curved surface, not a flat one. Often wet and extremely slippery. May flex or shift under load.

**Visual identification:** One or more exposed roots crossing the trail, creating a vertical transition. Individual roots (15–20cm) or clustered (30–50cm cumulative). Round cross-section, typically dark, often wet.

**Severity range:** Minor to moderate for single roots. Moderate to significant for root clusters. Round cross-section dramatically increases severity in wet conditions.

**Distinct failure pattern:** Front wheel bounce-back. Front tyre contacts the round root surface and rebounds backward — the round profile does not provide a stable contact point for climbing. Pronounced on wet roots where the combination of round geometry and near-zero friction produces immediate wheel rejection.

### Earth Bank / Trail Erosion Step

Erosion-formed or geological step — compacted earth, clay, or mixed soil. Unlike rock, earth banks can deform under the tyre: the rear wheel may dig into the face, and the front wheel may sink into a soft upper surface.

**Visual identification:** Vertical or steep earth face, darker at the exposed face where soil layers are visible. Edge less defined than rock — crest may be rounded or partially collapsed.

**Severity range:** Minor to moderate dry. Moderate to significant wet — earth becomes soft and the face loses structural integrity. Crest may crumble under front wheel loading.

**Distinct failure pattern:** Crest collapse on step-up. Front wheel loads the crest edge; earth weakened by moisture or erosion collapses under the wheel; front drops back to a lower position; step now harder to re-attempt.

### Pallet / Constructed Step

Artificial steps — wooden pallets, concrete blocks, tyres, or constructed obstacles. Consistent, predictable geometry. Typically moderate-to-major severity by design.

**Visual identification:** Obviously artificial — uniform shape, consistent surface. Pallets have horizontal-slat structure. Found in competition sections, training areas, trials courses.

**Severity range:** Moderate to major. Pallets 15–20cm per layer, stacked 2–5 high (30cm–1m). Constructed obstacles any height.

**Distinct failure pattern:** Front wheel hook on pallet slats. Tyre knobs catch on horizontal slats → abrupt deceleration → bike stalls with wheel wedged. Potential OTB on taller stacks. Specific to pallet construction — gaps between slats catch knobs in a way solid surfaces do not.

### Sequential Steps / Staircase

Multiple steps in sequence with minimal flat terrain between them. Individual step heights may be minor, but recovery distance between steps is insufficient for full re-establishment of body position and momentum.

**Visual identification:** Series of vertical faces separated by short flat or sloped sections. Overall impression of a staircase ascending or descending.

**Severity range:** Moderate to major regardless of individual step height. Three minor steps in sequence create moderate-to-significant challenge — the rider must execute three technique sequences without a reset.

**Distinct failure pattern:** Momentum exhaustion between steps. Rider clears the first step but the technique execution (clutch dump, throttle, body position shift) consumes available momentum. Arrives at the second step with insufficient drive to repeat. Stalls in the gap — not at any individual face, but in the inter-step space where momentum was not re-established.

---

## 3. Bike Behaviour *(MANDATORY)*

This section covers mechanics unique to step features. General clutch, suspension, and traction behaviour: see Dynamics KB and CONTROL entries.

### Front Wheel Interaction with the Step Face (Step-Up)

Above approximately 70° face angle, the tyre cannot generate sufficient climbing traction — the wheel must be lifted over the face using a wheelie or manual technique, not rolled up. At the crest, if the wheel does not fully clear, the tyre contacts the crest edge on its lower sidewall or rim — no tread, minimal grip → wheel stalls and bounces back. Fork compression matters: if the rider lifts via clutch-throttle technique, the fork is extended (unloaded) at the moment of lift — correct. If the rider simply rides into the face, the fork compresses and rebound may produce an uncontrolled lift of insufficient height.

### Rear Wheel Drive Phase (Step-Up)

Rear wheel drive depends on three factors: tyre traction on the face surface, engine torque delivery, and rear wheel loading. Progressive clutch release allows controlled torque delivery. Sudden clutch dump delivers a torque spike that spins the rear wheel or produces a wheelspin-to-grip-to-jerk sequence. Two-stroke torque delivery is more abrupt — clutch control is more critical on 2T engines.

As the front end is elevated, forward chassis rotation can increase rear contact loading initially, but excessive forward weight reduces effective drive leverage. The correct weight position shifts forward (after the initial lift) but not so far forward that rear traction is compromised.

### Rear Wheel Hook and Catch

When the rear wheel reaches the crest, the tyre must transition from the vertical face to the upper surface. If knobs catch on the crest edge, the wheel decelerates abruptly — rear catches while the front continues → compresses the chassis wheelbase → can pitch the rider forward. The rear wheel can also catch on face irregularities mid-climb, stalling the bike partway up.

### Step-Down Chassis Dynamics

At low speed, the front wheel is lowered from upper to lower surface. The bike rotates around the rear axle contact point (still on the upper surface). Rear brake acts as descent rate controller, resisting forward rotation. Fork compression on lower surface contact is manageable at low speed — but the nose-down pitch is more pronounced because gyroscopic stability is minimal. If the rear brake is released before the rear wheel is over the crest, the bike accelerates forward suddenly — the braking resistance disappears while the CoM is already forward of the rear axle.

---

## 4. Technique by Severity *(MANDATORY)*

### Minor (Face under 0.3m, rollable with basic technique)

**Step-up:** Standing, moderate approach speed. Allow the front wheel to roll up and over — no deliberate lift required. Steady throttle through the transition.

**Step-down:** Standing, slow approach. Allow front wheel to roll off edge and drop to lower surface. Slight rearward weight bias. Cover rear brake.

**Common errors:** Seated — prevents weight management. Chopping throttle on step-up — stalls forward progress. Looking at the step face rather than beyond it.

**Coaching gate:** Standing technique (BIOMECH-01).

### Moderate (Face 0.3–0.7m, requires deliberate wheel management)

**Step-up:** Standing attack position. Clutch-assisted wheel lift: pull clutch slightly, blip throttle to build revs, release clutch while shifting weight rearward — front wheel rises. Timing: front wheel at crest height as it reaches the face. Once front wheel is on the upper surface, shift weight forward and drive the rear wheel up with steady throttle and controlled clutch release.

**Step-down:** Standing, weight well rearward. Walking pace or just above. Extend arms and allow the bike to rotate forward around the rear axle. Rear brake controls descent rate. Once front wheel contacts lower surface, progressively shift weight forward to reload front tyre. Maintain rear brake until rear wheel is fully on the lower surface.

**Common errors — step-up:** Insufficient wheel lift → front hits face → bounce-back. Clutch dump too aggressive → rear wheel spins on face. Weight too far forward during drive phase → reduces rear traction. Insufficient approach momentum → stalls before rear clears.

**Common errors — step-down:** Releasing rear brake too early → sudden forward acceleration as rear wheel comes over crest. Insufficient rearward weight → nose-heavy landing on lower surface. Approaching too fast → transforms to drop dynamics (FEATURE-03).

**Coaching gate:** Clutch-throttle coordination (CONTROL-01, CONTROL-02) confirmed. Rider must demonstrate controlled front wheel lift on flat ground before attempting moderate step-ups. Rear brake control and rearward weight shift confirmed for step-downs.

### Significant (Face 0.7–1.2m or sequential steps; trials-influenced technique)

**Step-up:** Trials-style technique required. Pre-load sequence: compress the fork (push bars down), then simultaneously shift weight rearward and release clutch with throttle. Fork rebound + rear wheel torque + rearward weight shift combine to lift the front wheel. Must be controlled — too little: wheel doesn't clear; too much: bike loops backward. Once front on upper surface, weight must shift forward precisely: far enough to load front tyre (prevent second lift), not so far as to reduce rear traction for the remaining drive.

**Step-down:** Resembles a very controlled slow-speed drop. Weight well behind footpegs. Rear brake primary speed controller throughout the full descent. May feather the clutch to use the engine as a secondary brake. Front wheel placed, not dropped, on the lower surface. Arms fully extended to allow bike to rotate forward while rider's weight stays as far rearward as possible.

**Common errors — step-up:** Looping backward (excessive lift input). Stalling with bike vertical against the step (insufficient post-lift momentum). Rear wheel spin on face (insufficient traction or too-aggressive clutch).

**Common errors — step-down:** Releasing rear brake from fatigue or surprise. Failing to fully extend arms (rider pulled forward with bike's rotation).

**Coaching gate:** Demonstrated consistent moderate step-up clearance with correct lift timing and rear wheel drive. Clutch control smooth and deliberate, not reactive. Trials pre-load technique practised on flat ground before application to significant steps. **Do not prescribe significant step technique without confirmed moderate prerequisites.**

### Major (Face over 1.2m or complex geometry)

**Step-up:** Advanced trials technique — splatter or zap. Pre-load, aggressive clutch-throttle coordination, full commitment at very low approach speed. Bike approaches the face near-stationary. Rider compresses the fork, then dumps the clutch with full throttle while shifting aggressively rearward. Front rises to or above crest height. Rider must immediately shift weight forward as front clears the crest to prevent loop-out. Rear drives up face with maximum available traction.

**Step-down:** Effectively identical to significant drop technique (FEATURE-03) — height means the front descends a significant distance and pitch must be managed through the full descent.

**Coaching gate:** **Do not coach up to major without confirmed significant competence.** Stage 9 should assess whether the step is appropriate. If it exceeds demonstrated ability: "This step exceeds the technique level demonstrated in your footage. Walk the bike over this obstacle or find an alternative line."

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

**Trigger:** Front wheel contacts the face below the crest rather than clearing it — insufficient wheel lift height or incorrect timing.

**Mechanism:** Tyre compresses against the vertical face and rebounds backward. Energy is directed backward and downward because the face angle is too steep for the tyre to climb. Bike decelerates abruptly. Rider's momentum continues forward while bike stops.

**Outcome:** Minor = jarring stop. Moderate = potential OTB as rider's forward momentum overcomes grip. Significant = OTB risk plus bike may fall backward onto the rider.

**Stage 6 classification:** `technique` (primary — wheel lift insufficient), `momentum` (contributing — approach speed insufficient for required lift height)

### Failure Chain: Rear Wheel Spin on Face (technique / traction failure)

**Trigger:** Front wheel is on the upper surface but rear wheel cannot find traction on the step face to drive the bike up.

**Mechanism:** Rear tyre contacts face surface but friction is insufficient for the torque being delivered. Wheel spins. Each spin further degrades the contact surface. Rider adds throttle instinctively — increases spin, further reduces remaining traction.

**Outcome:** Bike stalls with front on upper surface and rear spinning at base or partway up. Rider in precarious forward-weight position with no drive available. Eventually: engine stalls from excessive load, rear slides sideways (tip-over), or rider topples over the bars.

**Stage 6 classification:** `technique` (primary — clutch control too aggressive for surface), `traction` (contributing — surface friction insufficient for drive demand)

### Failure Chain: Stall / Straddling (momentum failure)

**Trigger:** Front wheel clears the crest but bike runs out of momentum before the rear wheel clears.

**Mechanism:** Bike stops with the frame or engine cases resting on the crest edge. Front wheel on upper surface; rear wheel off the ground or barely touching the face. Cannot be driven forward (no rear wheel traction); cannot easily be reversed (wedged on step).

**Outcome:** Rider stuck — must dismount and manually lift or reposition. On significant steps, manual recovery may require another rider.

**Stage 6 classification:** `momentum` (primary — insufficient speed to complete), `technique` (contributing — drive phase timing or clutch control allowed momentum to decay)

### Failure Chain: Loop-Out Backward on Step-Up (technique failure)

**Trigger:** Excessive lift input — front wheel rises past vertical.

**Mechanism:** Bike's CoM passes behind the rear axle. Gravity now pulls the bike backward. No forward corrective force available once the balance point is passed.

**Outcome:** Bike falls backward onto the rider. Minor steps: rider can step off the back. Moderate and above: fall speed may trap the rider beneath the bike. Highest-consequence step-up failure mode.

**Stage 6 classification:** `technique` (primary — excessive lift input)

### Failure Chain: Premature Rear Brake Release on Step-Down (technique failure)

**Trigger:** Rider releases the rear brake before the rear wheel is fully over the crest during a step-down.

**Mechanism:** Rear brake was controlling the bike's forward rotation rate over the edge. When released, the braking resistance disappears. Bike's CoM is already forward of the rear axle (front wheel below, bike tilted forward). Forward rotation accelerates unexpectedly.

**Outcome:** Bike accelerates forward and down. Rider's weight, balanced for the controlled descent rate, is now too far forward for the actual rate. Front end dives, rear lifts. Minor step-down: jarring lurch. Significant: OTB.

**Stage 6 classification:** `technique` (primary — brake control error)

### Pipeline Identification Notes

**Visual indicators for Stage 4 `feature_type: step_up / step_down / ledge` detection:**

*Approach:*
- Trail approaching a defined vertical face — rock shelf, earth bank, root cluster, or constructed obstacle
- Rider visibly slowing to walking pace or below (key discriminator: step vs drop/jump)
- Rider adjusting body position — weight shift, standing taller, hands repositioning on bars

*Execution:*
- Front wheel lift visible — front of bike rises above face height (step-up)
- Front wheel being placed or lowered over an edge (step-down)
- Sequential wheel management visible — front wheel on one level, rear wheel on another
- Rider body position shifting forward → rearward → forward through the technique sequence
- Engine note pattern: rev rising (throttle) → sharp drop (clutch grab) → engine loading (drive phase)
- Very low speed throughout — walking pace or just above

*Post-event:*
- Both wheels at new level (successful clearance)
- Bike stalled — wheels at different levels, rider stopped
- Bike fallen sideways (balance failure)
- Rider dismounted, manually managing bike over obstacle

**Audio markers:**
- Clutch-throttle pattern: distinctive rev-drop-loading signature for step-up
- Engine stall sound at the step (failed attempt)
- Low-speed engine note throughout (not high-speed approach of a jump; not the silence of a drop)
- Rear wheel scraping or spinning on the face surface

**Severity indicators:**
- Face height relative to wheel diameter: under one wheel diameter ≈ minor; one to two ≈ moderate; over two ≈ significant; over three ≈ major
- Visible technique level: simple roll-over = minor; visible wheel lift with clutch = moderate+; trials-style = significant+
- Sequential steps: count and spacing determine cumulative severity
- Face surface type: smooth wet surfaces increase severity by reducing available drive traction

**Edge cases — flag Stage 4 confidence low:**
- Speed ambiguity: if rider speed cannot be reliably assessed, step/drop/jump boundary unclear — flag below 0.5
- POV footage: step height foreshortened — camera angle compresses vertical faces; audio is primary indicator
- Distant 3rd-person: minor steps invisible; moderate steps appear as trail undulation
- Rock gardens containing steps: rock garden classification may take priority; individual steps within a rock field may not be classified separately

### Observability Notes

**1. Reliably confirmable from footage:**
- Whether a discrete vertical face exists in the trail
- Whether front and rear wheels are managed sequentially (step) vs as a unit (drop/jump)
- Whether rider is at low speed (step) vs trail speed or above (drop/jump)
- Whether a front wheel lift technique was used — visible in medium-distance 3rd-person
- Whether rider stalled, fell, or cleared the step
- Direction of travel (step-up vs step-down)
- Whether single face or sequence

**2. Inferable with caveats:**
- Face height (estimated from bike proportions — wheel diameter as reference)
- Face surface type (estimated from visible texture and colour)
- Whether clutch technique was used (inferred from engine audio and bike behaviour; clutch lever movement may not be visible)
- Whether step is part of a larger feature complex

**3. Cannot be determined from footage:**
- Exact face height in centimetres
- Face surface traction coefficient
- Whether clutch technique was correctly timed (subtle timing differences not visible)
- Tyre pressure and tread condition
- Structural integrity of earth banks or root steps

---

## 6. Approach & Setup Requirements

> *Section 6 uses default naming for single_event features.*

**Speed selection:** Minimum speed that provides sufficient momentum for the technique — walking pace to slow trail speed. Excessive speed transforms the step into a drop or jump. Step-up: enough momentum to sustain the bike through the lift and drive phases, not so much the bike launches off the crest. Step-down: near-zero — arrive at the edge at walking pace or below. Technique quality matters far more than raw speed.

**Line selection:** Critical for natural steps — different parts of the face may have different heights, angles, and surface types. Reading the step geometry and choosing the lowest, most tractable line is terrain intelligence. For step-downs, choose a line where the lower surface is flat and firm.

**Body position setup:** Step-up — standing with ability to shift rearward rapidly (for the lift) then forward (for the drive phase). Not already committed rearward. Step-down — weight rearward before the front wheel reaches the edge, as with drops, but less extreme (lower speed and height).

**Gear selection:** Low gear for maximum torque at low RPM. Steps require a torque pulse at walking pace — the engine must be in its torque band at very low speed. Typically first or second gear. 2T: first or second. 4T: second (broader torque curve, smoother engagement).

---

## 7. Terrain & Condition Interaction

**Rock (TERRAIN-03):** Dry textured rock — good rear-wheel traction for drive phase through mechanical interlock. Wet rock — dramatically reduced traction; smooth or polished wet rock can make the drive phase entirely unworkable. Same geometry: manageable on dry textured rock; significant on wet smooth rock.

**Mud (TERRAIN-01):** Mud on face reduces drive traction (shear-layer mechanism). Mud on upper surface reduces front wheel grip when it arrives — front may slide backward. Mud on lower surface creates front wheel dig risk on step-down contact. Mud-covered steps are effectively one severity tier higher than geometry suggests.

**Roots (TERRAIN-07):** Round-surface traction problem — rear tyre cannot reliably drive up a round, wet surface. Root steps may flex or shift under load, changing geometry during execution.

**Grass (TERRAIN-04):** Wet grass on step faces and crests dramatically reduces traction. Deceptive — appears solid but provides far less traction than visual appearance suggests.

**Condition modifiers:**
- Wet: single most impactful modifier. Reduces face traction, reduces crest grip, increases balance difficulty. Elevates severity by at least one tier.
- Frozen: frozen earth steps harden (may improve wheel placement) but frost-covered surfaces are near-zero traction. Ice on rock step faces is unrideable — rear wheel cannot generate drive traction on a vertical iced surface.
- Dried mud on rock: creates a false surface that crumbles under the tyre unpredictably — drops the wheel to the rock surface at an unexpected point.

**Compounding risks:**
- Steps on a climbing gradient: rider already fighting gravity on approach, reducing available momentum.
- Steps on off-camber terrain: lateral balance challenge added to sequential wheel management.
- Steps immediately adjacent to other technical features: reduced preparation and recovery time.

---

## 8. Exit, Landing & Recovery

> *Section 8 uses default naming for single_event features.*

**Post-step dynamics — step-up:** After clearing, re-establish momentum on the upper surface. Stalling after clearing the step (insufficient throttle) is common. On sequential steps, the exit from one step is the approach to the next — inter-step recovery in one bike length is the primary difficulty amplifier.

**Post-step dynamics — step-down:** After front wheel contacts lower surface and rear wheel follows over crest, gradually transition from rearward position to neutral. Maintain rear brake until fully on lower surface, then progressively release and resume normal riding. Snapping weight forward immediately overloads the front tyre.

**Recovery from failed attempts:**
- Bounce-back: allow bike to settle, reassess approach line and speed, re-attempt with higher wheel lift or more momentum. Repeated bounces can damage tyre sidewall against step edge.
- Stall (straddling): engage neutral or clutch, stabilise with body weight and feet. Assess whether the bike can be rocked forward or must be backed down. Significant steps may require manual recovery with assistance.
- Tip-over lateral: standard bike lift and repositioning. Reposition at the base for a fresh approach — do not attempt from fallen position.
- Loop-out backward: rider must get clear of the falling bike immediately. The bike falls rearward and may land on the rider who does not step off quickly. Preventing loop-out through controlled lift technique is more important than recovering from it.

---

## 9. False Reads & Misidentification

**Overestimating step difficulty from below:** Steps look more imposing than they often are when viewed from the approach. A 0.5m rock step is well within standard moderate technique. Refusal of rideable steps misses practice opportunities.

**Underestimating wet step difficulty:** Same geometry, dramatically different traction. Riders calibrated to dry conditions attempt the same step in wet conditions with unchanged technique and fail at the drive phase.

**Confusing height with difficulty:** Face angle, surface type, and crest shape all modify difficulty. A 0.5m step with a rounded crest on textured dry rock is significantly easier than a 0.5m step with a sharp square crest on wet smooth rock — same height, very different challenge.

**Not recognising sequential accumulation:** Individual minor steps that are trivial in isolation can be collectively significant in sequence. Riders assessing each step individually may not appreciate cumulative momentum and fatigue demands.

**POV footage:** Step height foreshortened from helmet-cam. Camera looks slightly downward, compressing apparent height. Rider's technique inputs (clutch work, weight shifts) are not visible. Audio is the primary indicator — the clutch-throttle sound signature is distinctive.

**3rd-person from the side:** Best angle — full face height visible, rider body position trackable, sequential wheel management clearly observable.

**3rd-person from above or behind:** Step face not visible from above (foreshortened) or from behind (obscured by rider and bike).

**Distant footage:** Minor steps invisible; moderate steps appear as trail undulation; significant steps identifiable by rider's technique rather than geometry.

**Condition-created ambiguity:** Vegetation on face hides actual height and surface type. Water flow over a rock step obscures face geometry and surface condition — and the step may be deeper than visible water level suggests. Shadow hides surface type and angle from the approach.

---

## 10. Coaching Gates & Prerequisites

### Minimum Prerequisites by Severity

**Minor:** Standing technique (BIOMECH-01). No specific step skills required.

**Moderate:** Minor prerequisites plus: clutch-throttle coordination (CONTROL-01, CONTROL-02) confirmed. Rider must demonstrate controlled front wheel lift on flat ground — as a practised skill, not just at steps. Rear brake control for step-down descent rate confirmed. Weight distribution awareness (DYNAMICS-01) — forward-rearward-forward sequence confirmed.

**Significant:** Moderate prerequisites plus: consistent moderate step-up clearance with correct lift timing and rear wheel drive. Clutch control smooth and deliberate, not reactive. Trials-influenced pre-load technique practised on flat ground before application to significant steps. For step-downs: controlled descent at moderate height with consistent rear brake management confirmed.

**Major:** Significant prerequisites plus: demonstrated recovery from failed significant-step attempts. Consistent controlled wheel lifts to significant height. **Do not coach up to major without confirmed significant competence.** Stage 9 should assess whether walking the obstacle is the appropriate recommendation.

### Progression Model

1. Standing technique and low-speed balance
2. Minor step roll-overs (both directions)
3. Front wheel lift on flat ground (practised skill)
4. Moderate step-ups on dry rock
5. Moderate step-downs with rear brake control
6. Moderate steps on varied surfaces (wet, root, earth)
7. Sequential minor/moderate steps
8. Significant step-ups on dry surfaces
9. Significant step-downs
10. Major steps (progressive attempts with specific feature knowledge)

### "Do Not Coach Up" Thresholds

Stage 9 should decline to recommend next severity tier when:
- Footage shows front wheel bounce-back at the current tier (lift technique insufficient)
- Rear wheel spin on step face (clutch control not adequate)
- Stall or straddling at the current tier (momentum management not established)
- Step-down footage shows uncontrolled nose-heavy descent (rear brake discipline not confirmed)
- Lateral falls at steps (low-speed balance insufficient for next tier)
- Rider seated during step technique (standing is a prerequisite for all coached step riding)

### Skill Category Tags

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

Minor: standing technique (BIOMECH-01) only. Moderate and above: clutch-throttle coordination (CONTROL-01, CONTROL-02) and deliberate weight distribution management (DYNAMICS-01). Steps are uniquely demanding of clutch control — no other common feature type requires clutch manipulation as a primary technique input at the moment of execution. Significant and above: trials-influenced technique (pre-load lifts, precise clutch timing, sustained low-speed balance).

### Equipment Considerations

**Clutch type:** Hydraulic clutches provide more consistent engagement; cable clutches offer more tactile feedback. Either works — rider must know their clutch's engagement point precisely.

**Gearing:** Lower gearing (smaller front sprocket or larger rear) provides more torque multiplication at low speed. Riders who frequently encounter steps may benefit from one tooth lower on the front sprocket than standard trail setup.

**Tyres:** Aggressive enduro tread (tall, widely spaced knobs) provides better mechanical grip on rock faces. Slightly lower pressure improves conformity to the step face and increases contact area — but excessively low pressure risks tyre folding off the rim during lateral balance loads.

**Bash plate / sump guard:** Steps are the feature most likely to result in the bike straddling an obstacle with engine cases resting on the crest. Strongly recommended for any riding including moderate steps or above.

**Handguards:** Rider's hands pass close to the step face and surrounding vegetation on step-ups in wooded areas. Handguard contact during the critical drive phase can wrench the bars.

### Out-of-Scope Content

- Standing vs seated fundamentals → BIOMECH-01
- Clutch and throttle coordination → CONTROL-01, CONTROL-02
- Weight distribution physics → DYNAMICS-01
- Drop features (speed-transformed step-downs) → FEATURE-03
- Jump features (speed-transformed step-ups) → FEATURE-01
- Rock garden technique (continuous rock field) → FEATURE-06
- Line choice and terrain reading → INTEL-01, INTEL-03
