---
# ── BLOCK 1: Pipeline Contract ──────────────────────────────────────────────
pipeline_contract:
  kb_type: terrain_feature
  pipeline_enum_value: [rock_garden]
  feature_class: continuous

# ── BLOCK 2: Retrieval Triggers ─────────────────────────────────────────────
retrieval_triggers:
  PRIMARY:
    stage4_feature_type: [rock_garden]
  SECONDARY:
    stage6_failure_types: [technique, momentum, line_choice, decision, traction]
    stage7_crash_types: [tip_over, otb, lowside]
  CONTEXTUAL:
    stage3_intent_category: [trail_ride, technical_section, climb, obstacle_clear]
    stage5_outcome: [crash, bail, stall]

# ── BLOCK 3: Content Metadata ────────────────────────────────────────────────
content_metadata:
  topic_id: FEATURE-06
  title: Rock Garden — Feature Profile
  domain: Terrain Feature KB
  domain_id: features
  scope: "Feature identification, severity classification, and technique requirements
    for rock gardens — sections of trail occupied by multiple discrete rocks requiring
    sequential obstacle negotiation, continuous line management, and momentum control
    across the full section length. Does NOT cover single discrete rock faces or steps
    (see FEATURE-04), single cylindrical log obstacles (see FEATURE-05), surface
    physics of rocky terrain (see TERRAIN-03), or foundational body position and
    throttle technique (see BIOMECH-01, CONTROL-01). Where a rock garden contains
    individual rocks requiring step-height technique, FEATURE-04 technique applies
    to those discrete faces; this entry covers the navigational and momentum demands
    of the field as a whole."
  status: draft
  feature_type: rock_garden
  severity_definition:
    minor: "Sparse to moderate rock density, rocks protruding less than 25cm above the surrounding surface, consistent spacing with readable lines visible from the approach; navigable at trail speed with deliberate line selection; consequence of line error limited to momentum disruption or minor chassis upset"
    moderate: "Mixed rock sizes with height variation up to 50cm, irregular spacing requiring active in-section line adaptation; two or more feasible lines typically present but none straightforward; consequence of line loss or front deflection is wheel deviation, stall, or momentum arrest requiring active recovery technique"
    significant: "Dense rock field with rocks up to 80cm, frequent line closure requiring reactive adaptation mid-section; momentum management critical throughout; compound failures possible — front deflection at one rock drives the line onto the next; consequence of lost line or momentum is stall, tip-over, or crash"
    major: "Boulder field with rocks exceeding 80cm, sections where no clear gap is visible from the approach, extreme density compounded by gradient or adverse camber; rider may need to dismount to scout before entry; consequence of commitment error is crash, bike damage, or inability to self-recover"
  severity_covered: [minor, moderate, significant, major]
  crash_types_associated: [tip_over, otb, lowside]
  failure_types_associated: [technique, momentum, line_choice, decision, traction]
  common_misclassifications:
    - step_up        # A step is a single discrete vertical face; a rock garden is a field of multiple rocks requiring continuous line management — rock gardens may contain step faces within them
    - step_down      # Same boundary from the other direction; the rock garden classification takes priority when the overall feature is a distributed field rather than a single face
    - roots          # Roots are flexible, thin, and round; rocks are rigid, fixed, and irregular — if soft flexible root obstacles dominate the section, classify as roots, not rock_garden
    - rut            # If drainage channels between rocks constrain the rider's line more than the rocks themselves, the primary feature may be rut rather than rock_garden; classify by the dominant obstacle type
    - "loose gravel — scattered small pebbles on a hardpack surface are not a rock garden; rock garden requires discrete rocks of sufficient size to demand individual wheel management decisions"
  typical_body_position: standing
  difficulty_range: [beginner, intermediate, advanced]
  related_topics: [BIOMECH-01, BIOMECH-02, CONTROL-01, CONTROL-02, DYNAMICS-01, DYNAMICS-05, TERRAIN-03, TERRAIN-01, TERRAIN-09, TERRAIN-10, FEATURE-04, FEATURE-05]
  prerequisites: [BIOMECH-01, CONTROL-01]
  tags: [rock-garden, rocks, boulder-field, line-selection, momentum, deflection, sequential, continuous, technical-section, tip-over, compound-failure, loose-rock, embedded-rock, gradient-climb, wet-rock]
  version: 1.0
  last_updated: 2026-04-03
---

# FEATURE-06 — Rock Garden: Feature Profile

---

## 1. Feature Geometry & Physics *(MANDATORY)*

A rock garden is a trail section occupied by multiple discrete rocks — loose, embedded, or protruding — that must be negotiated individually and sequentially. The defining characteristic is the **distributed nature of the challenge**: unlike a single obstacle (step, log), a rock garden presents a continuous sequence of decision points, wheel placement demands, and deflection vectors distributed across the full section length. Each rock contact is managed against the backdrop of every rock that follows.

**Primary Observable Signature:** A trail section densely populated by distinct rocks requiring visible line selection, active wheel placement management, and speed modulation throughout — the rider's line visibly deviates from a straight path and the chassis undergoes repeated vertical displacement.

**Dominant Risk Axis:** Front deflection and sequential rock contact — a single deflection event alters the line onto the next rock, which may produce a second deflection; the compound interaction accumulates momentum loss and exposes the rider to stall, tip-over, or OTB.

### Physical Zones

**Entry zone:** Where line, speed, and body position are established before the field boundary. The entry line determines which rocks the rider encounters first and constrains which subsequent rocks are reachable. Speed selection here sets the momentum budget for the full traverse.

**Field extent:** The continuous challenge zone. Unlike off-camber's uniform sustained lateral force, a rock garden presents a sustained sequence of discrete interactions — each rock has its own deflection vector, height, and surface condition. Momentum availability is the critical variable: enough to roll over each contact without exceeding the speed that allows reactive adaptation.

**Exit zone:** The transition from rock field back to normal trail. Speed at exit may be higher or lower than entry speed depending on throttle management. Exit conditions may demand active management before they arrive.

### Key Mechanics

**Deflection force:** Each rock contact generates a force perpendicular to the rock's face at the contact point. Lateral deflection is the critical mechanism — it changes the front wheel's heading, altering the line onto subsequent rocks. The magnitude of heading change depends on the deflection force magnitude relative to the front wheel's rotational momentum — higher speed resists deflection more effectively than lower speed.

**Momentum is a resource:** Momentum provides deflection resistance. A tyre at speed carries more forward inertia — the deflection force must overcome greater inertia to redirect the wheel. At low speed, each contact can substantially redirect the wheel. The non-intuitive result: moderate speed is often safer than very low speed. But excessive speed removes the reaction time needed to adapt the line.

**Sequential line commitment:** Each position in the field commits the rider to a visible set of subsequent rock contacts. A line choice at rock three determines what options are available at rocks four, five, and six.

### Commitment & Reversibility Profile

**Point of no return:** Section entry at speed. The commitment threshold is the decision to enter at section speed — not the first tyre contact with the first rock. Each rock deeper in the field increases the difficulty of reversing because the bike is surrounded by obstacles on more sides.

**Recovery window:** The full field extent, but it narrows progressively with each failed event. Sustained throttle management is the primary recovery mechanism. A rider who enters with sufficient speed has a wider window (more momentum margin).

**Bailout options:** Approach zone only for significant and major severity. For minor rock gardens, a controlled mid-section stop is feasible. For significant and major, the realistic bailout is the earliest navigable gap with a controlled stop and foot-down stabilisation.

---

## 2. Feature Forms & Variants *(MANDATORY)*

> **Classification hard rule:** A feature classifies as a rock garden when the trail is occupied by multiple discrete rocks requiring sequential wheel management and continuous line selection across the section length. A single rock face requiring a discrete crossing event is a step (FEATURE-04) or log (FEATURE-05), not a rock garden. A continuous rocky surface (slab rock, bedrock pavement) that does not present discrete raised obstacles is rocky terrain (TERRAIN-03), not a rock garden.
>
> **Classification boundary note:** The boundary between rock garden and step is quantity and continuity, not rock size. One large boulder = step (FEATURE-04). Three or more boulders in sequence requiring continuous line management = rock garden. When a rock garden contains individual rocks that are step-height (face above 0.3m), FEATURE-04 technique applies to those discrete faces; FEATURE-06 applies to the overall field navigation. Rock garden / rut boundary: if drainage channels constrain the rider's line more than the rocks themselves, classify by the dominant obstacle type.

### Embedded Rock Field

Rocks fixed in the trail surface — bedrock outcroppings or boulders partially buried in soil. Provide predictable mechanical interaction with consistent deflection vectors.

**Visual identification:** Rock surfaces visible through or protruding above soil. Lichened (white/orange on older dry-climate rock, black on shaded/wet surfaces) or showing exposed stone where soil has eroded. Rocks do not move when the rider passes.

**Severity range:** Minor to major. Dry granite or limestone provides reliable traction — severity comes from geometry, not surface slipperiness.

**Distinct failure pattern:** Sequential front deflection chain. Front wheel deflects off rock one → deflection aligns front wheel onto rock two → second deflection compounds the first → progressive line deviation toward the edge of the navigable corridor.

### Loose Rock Field

Rocks not anchored in the trail surface — can shift, rotate, or roll under tyre contact. Deflection vectors are unpredictable: a rock that would produce a consistent deflection if fixed may instead roll out from under the tyre, creating sudden traction loss rather than a deflection event.

**Visual identification:** Rocks appearing unanchored — visible soil around the base, rocks at varied angles, some obviously displaced by previous riders. Some rocks may show freshly broken faces.

**Severity range:** Moderate to major. Even small loose rocks (under 20cm) at moderate density require active rear wheel management.

**Distinct failure pattern:** Rear wheel traction loss under drive. Rear wheel encounters a loose rock under drive load → rock rolls or shifts → rear wheel spins or steps sideways → sudden rear displacement upsets chassis and may redirect front wheel line.

### Rock Garden on Uphill Gradient

Gradient adds a weight-forward component that progressively unloads the rear wheel as the climb steepens, reducing rear tyre grip precisely when drive demand is highest. Momentum decays faster between rocks on a climb. Gradient multiplier elevates base severity by approximately one tier.

**Distinct failure pattern — momentum exhaustion mid-climb:** Rider enters with sufficient speed for the entry rocks but each contact event and metre of climbing drains the momentum reserve. Speed decays below the rollover threshold by the midpoint. Stall occurs between rocks, not at a single face. Restarting from zero on an uphill rock garden surrounded by rocks with a stalled engine is one of the most technically demanding recovery scenarios in off-road riding.

**Distinct failure pattern — rear wheel traction break on climb:** Under drive load on an uphill gradient with forward weight reducing rear tyre load, the rear tyre's grip limit is reached before the throttle demand is met. Rear wheel breaks traction → wheelspin → momentum loss is rapid and often unrecoverable without immediate clutch control.

### Rock Garden on Downhill Gradient

Gradient loads the front tyre and progressively increases speed between contacts. The rider is managing a rock field while the terrain is trying to accelerate the bike. Braking on rocks adds longitudinal traction demand on top of deflection demands.

**Distinct failure pattern — speed gain between contacts:** Between rock contacts on a descent, the bike accelerates. If engine braking between rocks is insufficient to control inter-contact acceleration, the rider arrives at each successive rock faster than the previous one. By mid-section the entry speed at each rock is too high for reactive line correction — the bike runs into contacts rather than being guided to them.

### Wet / Mossy Rock Garden

Rock surfaces are wet, moss-covered, or algae-coated. Elevated by one to two tiers compared to equivalent dry rock garden. A minor dry rock garden becomes moderate on wet mossy rock; a moderate dry rock garden may reach significant or major severity.

**Visual identification:** Visible moisture (glistening or wet surface), green or black biological growth, or associated environmental moisture cues (stream proximity, woodland shade, spring conditions).

**Distinct failure pattern:** Rear wheel spin on contact. Dry rock allows throttle to drive through contacts. Wet mossy rock produces wheelspin before the contact can be managed — neither providing drive to clear the obstacle nor lateral stability. Bike stalls or deflects without corrective traction available.

---

## 3. Bike Behaviour *(MANDATORY)*

This section covers mechanics unique to rock garden features. General suspension, throttle, and traction behaviour: see Dynamics KB and CONTROL entries.

### Front Wheel Deflection and Fork Response

Lateral deflection at the contact patch — not vertical compression — is the primary mechanism producing line deviation. Lateral contact force is not absorbed by the fork; it transmits directly through the steering geometry to the handlebar as a steering impulse. Under sequential contacts in rapid succession, steering impulses accumulate. If contact frequency exceeds the rider's ability to dampen each impulse, the net effect is progressive line deviation in the direction of the dominant deflection forces.

Fork compression plays a secondary role: if the fork has not fully rebounded from the previous contact when the next contact occurs, absorption capacity is reduced and more force transfers through the chassis to the rider.

### Rear Wheel Tracking After Front Deflection

After a front deflection changes heading, the rear wheel follows the front wheel's track with a delay of approximately one wheelbase length. If the front wheel's new heading leads it toward a rock, the rear wheel arrives at the front wheel's previous position — itself possibly a rock — while the front wheel is already at the secondary contact. This produces near-simultaneous front and rear contacts, compounding chassis inputs and removing the sequential management that allows normal obstacle crossing.

### Momentum Decay Through a Rock Field

Each rock contact consumes forward momentum through: (1) the rearward component of the deflection force decelerating the wheel; (2) the lateral component redirecting some forward momentum sideways, then dissipated as the bike returns to heading. Throttle application partly offsets decay on flat terrain. On uphill gradient, decay is faster — gravity adds to the rearward deceleration. If momentum decays below the rollover threshold, even small rocks (under 20cm) can produce stall events.

### Throttle and Engine Braking in a Rock Field

Maintained throttle sustains rear wheel drive and preserves forward momentum. Engine braking (throttle off) produces deceleration and a weight-forward pitch moment — loads the front tyre and reduces rear tyre contact load, reducing lateral traction available to resist rear deflection events. On downhill rock gardens, controlled engine braking between contacts prevents inter-contact acceleration, but removes the rear drive engagement that provides lateral stability.

---

## 4. Technique by Severity *(MANDATORY)*

### Minor (Sparse density, rocks under 25cm, readable lines)

**Technique:** Standing with weight slightly central to neutral. Approach at a deliberate moderate pace. Identify the cleanest visible line before entering. Maintain steady throttle — allow momentum to roll over minor obstacles, don't decelerate at each rock. Scan two bike lengths ahead for the next line segment. Loose grip — allow small handlebar movements through minor deflections rather than fighting each one.

**Common errors:** Visual fixation on the immediate rock rather than scanning ahead. Over-gripping the bars (amplifies deflection into steering). Braking within the section (reduces momentum below deflection-resistance threshold).

**Coaching gate:** Standing technique (BIOMECH-01).

### Moderate (Mixed sizes up to 50cm, irregular spacing, active line adaptation)

**Technique:** Identify the first clear line segment and backup line options before entering. Entry speed controlled — fast enough for momentum, slow enough for adaptive response. Active throttle management: steady drive through contacts, ready to feather if a rock demands precise placement. Visual lead: eyes always two to three rocks ahead. Deflection correction: allow the deflection to develop briefly while maintaining throttle, then guide (not force) the wheel to the next available gap with smooth progressive steering — fighting deflection with a sharp input consumes lateral traction and may produce a worse counter-deflection.

**Exit technique:** Scan for the exit zone while managing the final rocks. Don't decelerate in the final two bike lengths if the exit is a continuation of the trail.

**Common errors:** Eyes on the immediate rock. Releasing throttle at each rock contact. Attempting to steer perfectly around every rock (on moderate rock gardens, some contact is expected and must be managed through).

**Coaching gate:** Standing technique (BIOMECH-01) and smooth throttle discipline (CONTROL-01) confirmed — rider must demonstrate ability to maintain forward speed over rough terrain rather than instinctively braking at each impact.

### Significant (Dense field up to 80cm, reactive line adaptation required)

**Technique:** Full deliberate setup before the field boundary. Visual scan of the opening section before committing. Select entry line with awareness of what subsequent rocks it commits to — not just the cleanest entry point but the cleanest first ten metres. Entry at controlled moderate pace. Standing position, weight slightly rearward, core engaged throughout.

Momentum management is the primary skill: maintain forward speed through the section without decay to stall threshold or increase to loss-of-reaction-time level. Throttle partially open through almost all rock contacts — the exception is when a rock requires deliberate front wheel placement at very low speed, where clutch-throttle coordination (FEATURE-04 step technique) is appropriate.

Body position: sustained core engagement. Absorb sequential impacts through knees and ankles, not arms. Stiff arms transmit deflection forces directly to the steering — upper body must remain relatively still while lower body absorbs terrain inputs.

Identify the exit zone at least three to four bike lengths before reaching it — a sharp surface transition or corner immediately after the rock garden exit requires pre-management.

**Common errors:** Entering too slowly (insufficient momentum → stall at first rocks). Entering too fast (insufficient reaction time → deflections develop too quickly). Death-grip on bars. Looking down rather than ahead. Releasing throttle during a deflection sequence.

**Coaching gate:** Reliable navigation of moderate rock gardens without consistent stall events or mid-section stops. Throttle management through obstacle sections confirmed under partial fatigue conditions. **Do not prescribe significant rock garden technique without confirmed moderate prerequisites.**

### Major (Boulder field 80cm+, no clear line, adverse conditions)

**Technique (if committed):** Near-walking pace. Line planning must extend as far ahead as terrain allows. Each major rock managed individually using FEATURE-04 step technique where required. At this severity, the rock garden is effectively a sequence of individual step-type obstacles managed in rapid succession — the continuous-navigation approach gives way to sequential discrete-obstacle technique. Gyroscopic stability is minimal.

**Common errors:** Committing to a boulder field without a clear path to the exit. Entering at a speed insufficient for the first rocks but creating too much momentum for subsequent obstacles. Failing to assess the section on foot before entry.

**Coaching gate:** Stage 9 should assess whether the section is rideable before any technique recommendation. If rock density and height indicate the feature exceeds demonstrated technique: "This rock section appears to exceed safe technique level for the footage shown. Walking the bike through or choosing an alternative line is the appropriate response."

---

## 5. Interaction Patterns & Failure Triggers *(MANDATORY)*

**Expected Outcome Patterns:**
- clean traverse (consistent line, momentum maintained throughout, no significant deflection)
- imperfect but controlled (line adaptations mid-section, minor momentum adjustments, section completed)
- deflection with recovery (front deflection off one rock, rider regains heading before secondary contact)
- mid-section stall (momentum decays to zero, rider dismounts cleanly and recovers the bike)
- tip-over (momentum arrest with lateral fall, typically onto adjacent rocks)
- OTB (high-speed front deflection pitches rider forward before recovery is possible)
- lowside (rear wheel lateral slide on wet or loose rock leading to lateral fall)
- bail (controlled stop at entry or at a navigable gap before significant/major section)

### Failure Chain: Sequential Front Deflection → Secondary Contact → Stall or Tip-Over (technique / line_choice)

**Trigger:** Front wheel contacts a rock with asymmetric deflection force — contact geometry redirects the front wheel sideways from the intended line.

**Mechanism:** Front wheel deflects off rock one, altering heading. New heading directs front wheel toward rock two not on the intended line. The distance between first deflection and second contact is under one bike length — no time to steer around it. Second contact occurs while bike is still recovering from the first. Compound chassis input from two rapid sequential deflections exceeds the rider's ability to stabilise heading and preserve momentum.

**Outcome:** Moderate = mid-section stop requiring foot-down. Significant = stop with rocks on multiple sides, stable foot placement difficult → tip-over if footing cannot be found before the bike falls laterally.

**Stage 6 classification:** `technique` (primary — initial deflection and secondary contact sequence not managed to preserve heading and momentum), `line_choice` (contributing — entry line placed rider where the deflection chain was difficult to avoid)

### Failure Chain: Momentum Decay Through Section → Mid-Section Stall (momentum)

**Trigger:** Rider enters at the lower end of the viable speed range, or allows speed to decay through the section by closing the throttle at each rock contact.

**Mechanism:** Each rock contact produces a small momentum loss. Without active throttle to compensate, losses accumulate over section length. Speed decreases incrementally — at no single moment does it feel critically low. By the midpoint, speed has decayed below the deflection-resistance threshold. The front wheel now deflects more easily and drive force to roll over rocks decreases simultaneously.

**Outcome:** Bike stalls mid-rock section surrounded by rocks — insufficient momentum to continue and a clutch restart demanded from an irregular surface. Moderate = carefully executed clutch restart is possible. Significant = restart on a tilted or obstructed surface often produces a further stall or fall.

**Stage 6 classification:** `momentum` (primary — speed decayed below the required threshold), `technique` (contributing — throttle management through contacts was insufficient)

### Failure Chain: Over-Committed Entry → High-Speed Front Deflection → OTB (decision / technique)

**Trigger:** Rider enters a significant rock garden at excessive speed — faster than available reaction time for the rock density allows.

**Mechanism:** Front wheel contacts a rock before the rider can steer to avoid it. Deflection force is large relative to front wheel's lateral compliance at this speed — deflection is abrupt and substantial. Abrupt lateral force transmits as a rapid yaw input to the handlebars. Rider's arms driven sharply sideways. Bike's nose deflects sharply while the rear end continues forward. Rider's body momentum continues in the original direction while the bike's front has deviated.

**Outcome:** OTB or forward ejection. Fall into rocks — most severe rock garden injury mechanism.

**Stage 6 classification:** `decision` (primary — entry speed too high for observed rock density and required reaction time), `technique` (contributing — body position and grip not configured for high-speed deflection management)

### Failure Chain: Early Line Error → Unavoidable Secondary Rocks → Forced Stop (line_choice / decision)

**Trigger:** Rider selects an entry line viable for the visible first three rocks but commits to it before scanning the subsequent rock sequence.

**Mechanism:** Rider is committed to the entry line by the time the consequences become visible. Chosen line leads to a rock cluster that requires a technique level the rider is not executing. Each rock in the unavoidable sequence demands improvised technique under time pressure. Improvised technique is less reliable than prepared — timing, throttle, and body position are reactive, not deliberate.

**Outcome:** Variable — rider may clear through improvisation, may stall partway, or may fall. The failure is in the line choice that committed the rider to this sub-section.

**Stage 6 classification:** `line_choice` (primary — entry line selected without sufficient forward planning), `decision` (contributing — commitment threshold reached before available line options were fully assessed)

### Failure Chain: Traction Loss on Wet Rock → Rear Wheel Lateral Slide → Lowside or Tip-Over (traction / technique)

**Trigger:** Rider navigates a rock garden with wet or mossy rock surfaces. Throttle applied to maintain momentum during a rock contact sequence.

**Mechanism:** Rear tyre contacts wet or mossy rock under drive load. Available friction is insufficient for the combined demand of drive force and lateral stabilisation. Rear wheel breaks traction — spinning and simultaneously losing lateral grip. A spinning rear tyre has effectively zero lateral friction. Rear end slides sideways, typically downhill or in the direction of the most recent steering input.

**Outcome:** Lateral fall (lowside or tip-over). In a rock field, the fall places the rider and bike onto and between rocks.

**Stage 6 classification:** `traction` (primary — wet rock friction insufficient for combined drive and lateral traction demand), `technique` (contributing — throttle not modulated for reduced traction budget of wet rock)

### Pipeline Identification Notes

**Visual indicators for Stage 4 `feature_type: rock_garden` detection:**

*Approach:*
- Multiple distinct rocks visible across the trail surface ahead — forward view interrupted by numerous rock shapes
- Trail surface colour shifts to predominantly grey, tan, or ochre rock rather than soil
- Rider visually scanning laterally on approach (line selection behaviour)
- Rider reducing speed and adjusting body position before entering the rock section

*Execution:*
- Bike line visibly deviating from a straight path — front wheel tracks an irregular course between rocks
- Multiple visible vertical chassis displacements in sequence — bike bobs repeatedly
- Rider body relatively still while the bike moves irregularly beneath — impacts absorbed through knees and ankles
- Engine note varying with throttle management through contacts
- Foot-down events mid-section at significant severity

*Post-event:*
- Both wheels on the far side = successful traverse
- Bike stationary within rock section with rider aboard = stall or stuck
- Bike fallen laterally within rock section = tip-over or lowside
- Rider and bike separated within rock section = OTB or ejection

**Audio markers:**
- Repeated impact sounds in rapid sequence — multiple distinct impacts within 2–5 seconds (distinct from single step or log impact)
- Tyre scraping sounds as wheel contacts and crosses individual rock surfaces
- Throttle blipping pattern — brief throttle applications between rock contacts
- Engine note change on gradient: labouring on uphill rocks, engine braking characteristic on downhill rocks

**Severity indicators:**
- Rock density: more than two rocks per bike length = moderate or above
- Rock height relative to wheel diameter: below one-third wheel diameter = minor; one-third to two-thirds = moderate; above two-thirds = significant; at or above wheel diameter = major
- Spacing: regular and navigable = minor; irregular with line closure events = moderate; frequent line closure = significant; no readable continuous line = major
- Gradient presence: elevates base severity by approximately one tier
- Surface condition: wet or mossy rock elevates by one to two tiers

**Edge cases — flag Stage 4 confidence low:**
- POV footage: rock garden size and density difficult to assess from helmet-cam — vertical parallax makes rocks appear smaller and flatter; reduce severity and classification confidence
- Distant 3rd-person: individual rocks under 20cm may not be distinguishable from surface texture — flag low if rock size cannot be individually assessed
- Rock garden vs root section: at distance or in shadow, large exposed roots can be visually confused with rocks. Rocks are rigid (no flex), irregular in shape, grey/tan/ochre; roots are flexible, round, dark brown
- Rock garden at section end: if clip ends mid-section, full severity cannot be assessed — flag severity as "at minimum [base estimate]"

### Observability Notes

**1. Reliably confirmable from footage:**
- Presence of multiple distinct rocks across the trail (rock garden classification)
- Approximate rock density (count of visible rocks per bike length — coarse estimate)
- Whether section is on a gradient
- Whether rider completed the section, stalled, or fell
- Whether a front deflection occurred — visible as a sharp heading change at the front wheel
- Whether the rider experienced a rear wheel slide — visible lateral movement of the rear end
- Dominant rock type: loose vs embedded (loose rocks visibly displaced; embedded do not move)
- Surface moisture: wet or dry rock visible from surface sheen and colour

**2. Inferable with caveats:**
- Average rock height (estimated from wheel diameter comparison; viewing angle significantly affects apparent height)
- Section length (estimated from footage duration and rider speed; full section may not be captured)
- Whether rider maintained throttle throughout (suggested by engine note consistency; exact throttle position not observable)
- Whether a stall resulted from momentum loss or technique error (event sequence suggests; root cause requires supplementary evidence)

**3. Cannot be determined from footage:**
- Exact rock height in centimetres
- Exact rock surface friction coefficient
- Whether loose rocks shifted under contact or remained stable
- Rider fatigue level through a long section
- Tyre compound and inflation pressure
- Whether the rider pre-planned the line or was navigating reactively

---

## 6. Entry Discipline *(adapted from Approach & Setup Requirements)*

> *For this continuous feature, this section covers what the rider must establish before the rock garden's entry boundary.*

**Speed selection:** Entry speed balances two competing demands: sufficient momentum to resist rock deflections and roll over contacts; sufficient reaction time to adapt the line mid-section. Minor = near trail speed. Moderate = deliberate reduction to controlled pace — typically one quarter to one third below normal trail speed. Significant = the slowest speed that maintains usable momentum — slower than intuition suggests, faster than walking pace. Must account for gradient: uphill requires more entry speed (momentum decays faster against gravity); downhill requires less (gradient will accelerate between contacts).

**Line selection at entry:** Scan from the approach zone and identify not just the cleanest first three rocks but the shape of the navigable path they create through the visible field. An entry line that begins on the left with the next gap also on the left is coherent. An entry on the right with the first gap opening immediately to the left demands an abrupt early correction at speed. On well-used trails, previous riders' tyre marks indicate commonly navigated lines.

**Body position setup:** Standing with weight slightly rearward of centre before the entry boundary. Rearward bias prepares for rock contacts that pitch the front wheel upward. Grip positive but not tight — death-grip before the section amplifies every subsequent deflection. Elbows slightly bent and raised, not locked or tucked.

**Gear selection:** One gear above minimum viable — smooth throttle response without requiring high RPM to maintain drive. Avoid very low gears (aggressive power delivery amplifies wheelspin on irregular terrain). Uphill rock gardens: gear must support sufficient torque for individual rock climbs. Downhill: gear should provide adequate engine braking between contacts to resist inter-contact acceleration.

---

## 7. Terrain & Condition Interaction

**Rock surface (TERRAIN-03):** Co-retrieve in all cases. Rock garden severity is partially determined by rock surface conditions — dry textured rock produces deflection failures; wet smooth rock adds traction failures. A rock garden that is moderate on dry textured rock may become significant on smooth wet rock with no change in geometry.

**Mud pockets in rock fields (TERRAIN-01):** Mud accumulates in low depressions between rocks. The traction switch from dry rock to mud pocket can be mid-contact and abrupt — same throttle input that was appropriate on rock produces wheelspin in mud. Co-retrieve when mud pockets are visible or conditions suggest mixed surface.

**Shale and loose fragments (TERRAIN-09):** Shale has lower lateral traction than solid rock — fractures along bedding planes and may split or shift under contact. Produces less predictable deflection direction than solid embedded rock. Co-retrieve when shale fragments are visible.

**Mixed surface rock gardens (TERRAIN-10):** Many real-world rock gardens combine rock with soil, gravel, or organic material between the rocks. Traction varies across the section. Co-retrieve when the surface is visibly mixed.

**Condition modifiers:**
- Dry: most predictable traction. Primary failure risks are sequential deflection and momentum decay — both manageable through technique. Classify at base geometry tier.
- Damp / wet: throttle management must be more conservative to stay below traction limit. Elevate base severity by approximately one tier when wet conditions confirmed.
- Frozen: near-zero traction on smooth surfaces. Rock garden navigation on frozen rock is a major severity event regardless of geometry. Correct coaching response: avoidance or decision-level assessment.

---

## 8. Section Exit *(adapted from Exit, Landing & Recovery)*

> *Renamed to "Section Exit" for continuous features.*

**Exit zone management:** The transition from rock garden to normal trail changes traction, braking, and handling characteristics abruptly.

- Speed surplus: if aggressive throttle through the final rocks preserved momentum, exit speed may be higher than post-section terrain warrants. A corner, descent, or narrowing immediately after the exit requires pre-managed speed.
- Weight rearward from section technique: rearward weight bias appropriate for rock navigation may need to reduce at the exit on flat or descending terrain — excess rearward weight deloads the front tyre on normal surface.
- Grip calibration: rock gardens demand a relatively open grip to allow handlebar movement. Normal trail after the section may demand more precise steering — progressively firm grip after exiting.

**Recovery from within-section errors:**
- Early in section: re-establish speed and line before the next significant rocks.
- Mid-section: possible if the next rocks allow — recovery window narrowing.
- Deep in section: commit to completing through whatever rocks remain. Stopping deep in a significant rock garden is more dangerous than attempting to continue at reduced speed.

Front deflection recovery technique: allow the deflection momentarily, maintain throttle, then guide (not force) the wheel to the next available gap with smooth steering. Smooth correction uses less traction than a sharp counter-steer and produces a more stable recovery trajectory.

**Lost recovery window:** If momentum decays to zero mid-section, the rider must find stable footing on or between rocks to support themselves and the bike before the bike tips. A controlled restart from a mid-section stall requires: stabilise the bike with feet; assess the immediate obstacle in front of the wheel; plan the clutch restart appropriate for that obstacle (may require FEATURE-04 step technique if a significant rock face is immediately in front); execute with deliberate clutch-throttle coordination.

---

## 9. False Reads & Misidentification

**Rock garden that reads as rocky trail:** At certain densities or camera angles, a rock garden may read as "rough rocky trail" rather than a classified feature. The operational distinction: does the surface require individual management decisions (rock garden) or does the rider maintain a consistent line with only vertical chassis inputs (rocky terrain)? If the footage shows the rider making visible lateral line adjustments, classify as rock garden.

**Rock garden that reads as step sequence:** A gradient rock garden with large uniform-height rocks may read as FEATURE-04. Discrimination: a step sequence has rocks spanning the full trail width with no choice around them, only over them. A rock garden has rocks distributed with navigable gaps. If gaps between rocks are visible and the rider's line visibly adapts around them, classify as rock garden.

**Rock garden that reads as root section:** In wooded terrain or at footage distance, large exposed roots can be visually confused with rocks. Roots are flexible (visible flex under tyre contact or natural curvature), round in cross-section, dark brown. Rocks are rigid (no visible flex), irregular in shape, grey/tan/ochre. Flag classification confidence as low when the distinction cannot be made from footage.

**Severity underestimation from approach footage:** The approach angle compresses the visual depth of the field — rocks appear closer together than they are laterally, and section length appears shorter. Severity tends to be underestimated from approach footage alone. When in-section footage is available, weight it more heavily for severity assessment.

**Dry rock garden that reads as wet:** Dark volcanic rock, moss-stained limestone, or shale-coated surfaces can suggest wet conditions in dry weather. Rock surface colour alone is not sufficient to confirm wet conditions — do not elevate severity classification based on colour without supporting moisture evidence (standing water, wet rider/bike components on entry, other environmental moisture cues).

---

## 10. Coaching Gates & Prerequisites

### Minimum Prerequisites by Severity

**Minor:** Standing technique (BIOMECH-01). Basic throttle management (CONTROL-01) — smooth application and release without instinctive closure on impact.

**Moderate:** Standing technique confirmed under rough terrain conditions. Throttle discipline through impacts (CONTROL-01) — rider must maintain throttle rather than instinctively releasing at each contact. Basic momentum awareness — momentum as a resource to preserve across the section, not managed contact-by-contact. If footage shows rider seated, instinctively braking at rock contacts, or repeatedly losing momentum, coach BIOMECH-01 and CONTROL-01 before moderate rock garden technique.

**Significant:** Reliable moderate rock garden navigation — rider completes moderate sections with controlled technique without consistent stall events. Sustained throttle management under fatigue conditions. Line reading at speed — able to assess options two to three rocks ahead while managing immediate contacts. Clutch-throttle coordination (CONTROL-01, CONTROL-02) for individual step-height rocks within the garden. **Do not prescribe significant technique without confirmed moderate prerequisites.**

**Major (decision gate):** Before prescribing any technique, Stage 9 should assess: (1) does footage demonstrate consistent completion of significant rock gardens; (2) does the specific major rock garden have any viable line at the rider's demonstrated technique level; (3) does gradient and surface condition compound the geometry severity beyond available technique. If any assessment is negative: "This rock section appears to exceed the technique level demonstrated in your footage. Walking the bike through or choosing an alternative line is the appropriate response."

### Progression Model

Minor (trail riding rock awareness, standing position, maintain speed) → Moderate (deliberate line selection, throttle management through contacts) → Significant (compound deflection management, momentum budgeting, reactive line adaptation) → Major (decision-level assessment before entry; trials-adjacent technique on individual obstacles within the field)

The progression is not primarily about rock size. Continuous navigation skill — line reading, momentum management, compound deflection recovery — is the coaching priority for rock garden technique.

### "Do Not Coach Up" Thresholds

Stage 9 should decline to recommend next severity tier when:
- Footage shows the rider seated, instinctively braking at rock contacts, or repeatedly losing momentum at the current tier
- Moderate footage shows consistent stall events or mid-section stops as a pattern
- Throttle management through rough terrain is not evident in footage

### Skill Category Tags

- `balance_standing` — minor+
- `throttle_open_rough` — minor+
- `obstacle_navigation_momentum` — moderate+
- `line_reading_continuous` — significant+
- `compound_obstacle_momentum` — significant+
- `decision_avoidance_major_terrain` — major

---

## 11. Feature Demands / Constraints

### Minimum Technique for Safe Navigation

- Standing position (BIOMECH-01): mandatory at all severity levels
- Throttle on through contacts (CONTROL-01): essential at minor and above
- Visual lead — scanning ahead rather than at immediate obstacles: essential at moderate and above
- Line selection and in-section adaptation: essential at moderate and above
- Clutch-throttle coordination (CONTROL-01, CONTROL-02): required for individual rock contacts at significant severity requiring step-level technique

### Equipment Considerations

**Tyres:** Aggressive block tread tyres with large widely-spaced knobs provide better mechanical interlock on rock surfaces. Tyre compound matters less on dry textured rock (mechanical interlock dominates) than on wet rock (where rubber friction coefficient is primary). Tyre inflation pressure is not observable from footage — lower pressures increase compliance and contact patch size but increase pinch flat risk; higher pressures resist puncture but reduce compliance.

**Suspension:** Sufficient travel and appropriate rebound speed are important for sequential contacts. Too-slow rebound leaves the fork compressed between contacts, reducing absorption capacity at each successive rock. Suspension settings are not observable from footage and are not available as a Stage 10 coaching lever.

### Out-of-Scope Content

- Rock surface physics, traction coefficients, and break-away characteristics → TERRAIN-03
- Mud pockets between rocks → TERRAIN-01
- Shale fragment physics → TERRAIN-09
- Individual high rock faces within the rock garden requiring step technique → FEATURE-04
- Single log or cylindrical horizontal obstacle → FEATURE-05
- Foundational throttle mechanics and clutch coordination → CONTROL-01, CONTROL-02
- Standing and seated fundamentals → BIOMECH-01, BIOMECH-02
- Momentum management physics → DYNAMICS-05
