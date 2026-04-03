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

A rock garden is a trail section occupied by multiple discrete rocks — loose, embedded, or protruding — that must be negotiated individually and sequentially. The defining characteristic is the distributed nature of the challenge: unlike a single obstacle (step, log) where the difficulty concentrates at one point, a rock garden presents a continuous sequence of decision points, wheel placement demands, and deflection force vectors distributed across the full section length. No single crossing event resolves the challenge; each rock contact is managed against the backdrop of every rock that follows it.

**Primary Observable Signature:** A trail section densely populated by distinct rocks requiring visible line selection, active wheel placement management, and speed modulation throughout — the rider's line visibly deviates from a straight path and the bike's chassis undergoes repeated vertical displacement across the section.

**Dominant Risk Axis:** Front deflection and sequential rock contact — a single deflection event alters the line onto the next rock, which may produce a second deflection; the compound interaction accumulates momentum loss and exposes the rider to stall, tip-over, or OTB.

### Physical Zones — Entry / Field Extent / Exit

**Entry zone:** The approach to the rock garden boundary where line, speed, and body position are established. This is the single most consequential decision zone. The entry line determines which rocks the rider encounters first and, by extension, constrains which subsequent rocks are reachable. An entry on the left half of the trail locks the rider onto the left-side rock sequence for the opening section. Speed selection here sets the momentum budget for the full traverse — too fast removes reaction time; too slow depletes the momentum reserve needed to roll over rocks without stalling. On well-defined trail rock gardens, the entry zone is visible from several bike lengths away. On natural terrain, vegetation may restrict sighting to a narrow entry window.

**Field extent:** The section where the rider is actively negotiating rocks. This is the continuous challenge zone. Unlike off-camber terrain (FEATURE-02) where the challenge is a uniform sustained lateral force, a rock garden presents a sustained sequence of discrete interactions — each rock presents its own deflection vector, height, and surface condition, and the rider must process and respond to each without being able to fully return to a neutral state between them. The field may contain sub-sections of different density and rock size. Momentum availability is the critical variable throughout: the rider begins with the entry speed and must manage throttle, terrain contacts, and line to maintain sufficient momentum to roll over each contact without exceeding the speed that allows reactive adaptation.

**Exit zone:** The transition from the rock field back to normal trail or a different feature. The exit is rarely obvious while navigating the field extent — the rider is managing immediate rock contacts, not scanning the horizon. On gradient exits (rock garden leading to a descent, a corner, or a step), the conditions in the exit zone require active management before they arrive. Speed at exit may be higher or lower than entry speed depending on whether throttle was maintained or momentum decayed through the section.

### Force Vectors

Each rock contact generates a deflection force vector at the tyre's contact patch. The direction and magnitude of this vector depend on the rock's geometry at the contact point. A rock with a rounded top presents a force vector with a significant upward component — the tyre can climb. A rock with a near-vertical face presents a primarily rearward deflection force. A rock angled across the trail presents an asymmetric force with a lateral component that deflects the wheel sideways.

Lateral deflection is the critical mechanism in rock gardens. Longitudinal deflection (rearward force) slows the front wheel and can partly be overcome by maintaining drive. Lateral deflection changes the front wheel's heading: the wheel tracks in a direction other than intended. Because the front wheel determines the bike's steering direction, a heading change alters the line onto subsequent rocks. If the subsequent rock's geometry generates its own deflection force at the new heading, the compound effect is exponential — deflection one leads to contact two, which deflects onto contact three. Each event is manageable individually; the compound chain overwhelms the rider's ability to react sequentially.

Momentum provides resistance to deflection. A tyre contacting a rock at speed carries more forward inertia — the deflection force must overcome greater inertia to redirect the wheel. At low speed, each rock contact can redirect the wheel substantially. At moderate speed, the wheel's momentum tends to carry it over or past the rock. This creates the non-intuitive characteristic of rock gardens: moderate speed is often safer than very low speed because momentum provides deflection resistance, but excessive speed removes the reaction time needed to adapt the line.

### Why This Creates a Distinct Riding Problem

Rock gardens differ from every other continuous feature in that the challenge is discrete but densely repeated. Off-camber (FEATURE-02) presents a single sustained force that acts uniformly over the section. A rock garden presents multiple distinct forces in rapid sequence, each with different direction and magnitude. The rider cannot adopt a single body position and hold it — each rock may require a different weight distribution, different throttle input, and different steering correction.

The second distinct problem is momentum budgeting. On single-event features, momentum is managed for one clearing event. In a rock garden, momentum must be managed as a resource across the full section: enough must be maintained to roll over each contact, but not so much that deflection events develop too quickly to correct. Throttle management is therefore active and continuous — not set-and-hold as on a gradient, but a series of micro-adjustments matching the terrain contacts.

The third distinct problem is sequential line commitment. Each position in the field commits the rider to a visible set of subsequent rock contacts. A choice made at rock three determines what options are available at rocks four, five, and six. Poor line commitment early in the section can make the remainder unavoidable even if the rider recognises the error immediately.

### Commitment & Reversibility Profile

**Point of no return:** Section entry at speed. Once the front wheel is engaged with the first rock contact, the rider cannot reliably reverse — rocks on both sides of the intended line, limited trail width, and forward momentum from the entry speed make aborting impractical. The commitment is spatial and progressive: each rock deeper in the field increases the difficulty of reversing because the bike is surrounded by obstacles on more sides. The commitment threshold is the decision to enter at section speed — not the first tyre contact with the first rock.

**Recovery window:** The full field extent, but the window narrows progressively with each failed event. After a front deflection, the rider has until secondary rock contact to regain heading and speed. After a momentum arrest, the window compresses to the immediate obstacle — the rider must restart from near-zero speed on a surface that provides uncertain traction. Unlike a jump where the recovery window is measured in fractions of a second, a rock garden's recovery window is measured in metres and rock contacts. A rider who enters with sufficient speed has a wider window (more momentum margin) than one who entered too slowly. Sustained throttle management is the primary recovery mechanism within the window.

**Bailout options:** Approach zone only for significant and major severity. A rider approaching a significant rock garden at trail speed can stop before the field boundary. A rider who has entered at moderate speed cannot reliably stop cleanly in the middle of a dense rock field — rocks obstruct both forward progress if momentum fails and backward retreat. For minor rock gardens, a controlled mid-section stop is feasible. For significant and major, the realistic bailout is a controlled stop at the earliest navigable gap, followed by foot-down stabilisation and manual bike management.

---

## 2. Feature Forms & Variants *(MANDATORY)*

> **Classification hard rule:** A feature classifies as a rock garden when the trail is occupied by multiple discrete rocks requiring sequential wheel management and continuous line selection across the section length. A single rock face requiring a discrete crossing event is a step (FEATURE-04) or log (FEATURE-05), not a rock garden, regardless of that rock's size. A rock garden classification requires multiple discrete rocks within a continuous section of trail such that the rider must make sequential wheel-management and line-selection decisions across the field rather than solve a single isolated obstacle. A continuous rocky surface (slab rock, bedrock pavement) that does not present discrete raised obstacles is not a rock garden — it is rocky terrain (TERRAIN-03).

> **Classification boundary note:** The boundary between rock garden and step is quantity and continuity, not rock size. One large boulder requiring a single crossing event = step (FEATURE-04). Three or more boulders in sequence requiring continuous line management = rock garden. When a rock garden contains individual rocks that are step-height (face above 0.3m), FEATURE-04 technique applies to those discrete faces; the FEATURE-06 classification applies to the overall field navigation. At speed, classification follows the dominant event in the footage — if the rider is continuously selecting lines through a field, it is a rock garden; if the rider is managing a single wheel placement at low speed, it is a step. The rock garden / rut boundary: if drainage channels between rocks constrain the rider's line more than the rocks themselves, the primary feature may be rut rather than rock_garden; classify by the dominant obstacle type.

### Embedded Rock Field

The most common rock garden form: rocks fixed in the trail surface, either bedrock outcroppings or boulders partially buried in soil. Embedded rocks do not shift under contact — they provide predictable mechanical interaction with consistent deflection vectors for a given rock geometry. Embedded rock gardens are more manageable than loose rock fields at equivalent density because deflection outcomes are repeatable.

**Visual identification:** Rock surfaces visible through or protruding above soil. Rocks may be coloured by lichen (white or orange on older dry-climate rock, black on consistently shaded or wet surfaces), show exposed stone faces where soil has eroded, or appear as a series of protruding bumps across the trail. The rocks do not move when the rider passes — no visible displacement during or after contact.

**Severity range:** Minor to major. Embedded rock gardens span the full severity range based on density, rock height, and spacing. Dry granite or limestone provides reliable traction — severity comes from geometry, not surface slipperiness. Wet embedded rock changes the technique requirements significantly (see Section 7).

**Distinct failure pattern:** Sequential front deflection chain. The front wheel contacts a rock and deflects sideways — direction determined by the rock's asymmetric geometry. The deflection aligns the front wheel onto the approach to a second rock. The second rock produces a second deflection, often in the same or compounding direction. The rider may be tracking correctly between rocks but the deflection sequence has moved the line progressively toward the edge of the navigable corridor. By the third or fourth deflection, the line has departed far enough from the original that the rider encounters a rock for which no preparation was made.

### Loose Rock Field

Rocks not anchored in the trail surface — stones, boulders, or shale fragments that can shift, rotate, or roll under tyre contact. Loose rock fields are significantly more demanding than embedded fields at equivalent rock size because the deflection vectors are unpredictable: a rock that would produce a consistent deflection if fixed may instead roll out from under the tyre, creating a sudden traction loss event rather than a deflection event.

**Visual identification:** Rocks that appear unanchored — visible soil around the base, rocks sitting at varied angles (not flush with the trail surface), some rocks obviously displaced by previous riders. The trail surface beneath and between rocks may be visible as bare soil or dust. Some rocks may show freshly broken faces where they have been recently displaced.

**Severity range:** Moderate to major. Loose rock fields are rarely minor because the unpredictable contact geometry adds a traction dimension that embedded fields do not have. Even small loose rocks (under 20cm) at moderate density require active rear wheel management because the surface under the rear tyre may shift under load, producing wheelspin or lateral slip rather than a manageable contact bump.

**Distinct failure pattern:** Rear wheel traction loss under drive. The rider maintains forward momentum through the front wheel negotiating rocks, but the rear wheel encounters a loose rock under drive load. The rock rolls or shifts, reducing effective contact friction to near zero for the duration of the event. The rear wheel spins or steps sideways. The sudden rear wheel displacement upsets the chassis attitude and may redirect the front wheel's line into an obstacle not originally on the chosen path.

### Rock Garden on Uphill Gradient

A rock field on an ascending gradient. The gradient adds a weight-forward component that progressively unloads the rear wheel as the climb steepens, reducing rear tyre grip precisely when drive demand is highest. Individual rocks on an uphill gradient require more drive force to clear than equivalent rocks on flat terrain because forward momentum is fighting gravity. Momentum decays faster between rocks on a climb.

**Visual identification:** The trail rises visibly through the rock field — horizon visible above the field, bike attitude nose-up in footage. Rock contacts visible on a section where the bike is clearly ascending.

**Severity range:** The gradient multiplier elevates the base severity by approximately one tier. A minor flat rock garden becomes moderate on a meaningful climb. A moderate flat rock garden can become significant or major on a steep climb where momentum cannot be maintained against combined obstacle resistance and gradient.

**Distinct failure pattern — momentum exhaustion mid-climb:** The rider enters with sufficient speed for the entry rocks but each contact event and metre of climbing gradient drains the momentum reserve. By the midpoint of the field, speed has decayed below the threshold needed to roll over rocks without deliberate technique. The rider stalls — not at a single rock face, but between rocks where forward speed is insufficient to initiate the next contact phase. Restarting from zero on an uphill rock garden surrounded by rocks with a stalled engine is one of the most technically demanding recovery scenarios in off-road riding.

**Distinct failure pattern — rear wheel traction break on climb:** Under drive load on an uphill gradient, with weight-forward reducing rear tyre load, the rear tyre's grip limit is reached before the throttle demand is met. The rear wheel breaks traction and produces wheelspin. On a gradient, wheelspin means the bike is decelerating against gravity — the momentum loss is rapid and often unrecoverable without immediate clutch control.

### Rock Garden on Downhill Gradient

A rock field on a descending gradient. The gradient loads the front tyre and progressively increases speed between contacts — the rider is managing a rock field while the terrain is trying to accelerate the bike. Braking on rocks adds a longitudinal traction demand on top of the existing deflection and lateral demands. The consequence of a front deflection at speed on a downhill rock garden is typically more severe than on flat terrain because the available speed is higher and the approach to secondary rocks is faster.

**Visual identification:** The trail descends through the rock field — the horizon drops below the entry level, bike attitude nose-down in footage. Rock contacts on a clearly descending section.

**Severity range:** Moderate to major. Downhill rock gardens require engine braking and controlled braking to manage speed, which adds traction demand to the rock contact demands.

**Distinct failure pattern — speed gain between contacts:** Between rock contacts on a descent, the bike accelerates. The rider is in a pattern of rock contact → deceleration → acceleration between rocks → next contact. If throttle-off and engine braking between rocks are insufficient to control the inter-contact acceleration, the rider arrives at each successive rock faster than the previous one. By mid-section, the entry speed at each rock is too high for reactive line correction — the bike runs into contacts rather than being guided to them.

### Wet / Mossy Rock Garden

A rock garden where rock surfaces are wet, moss-covered, or algae-coated. The surface physics change substantially: dry textured rock provides moderate-to-high traction; wet rock provides moderate traction on textured surfaces but significantly lower traction on smooth or mossy surfaces. Wet mossy rock can approach near-zero longitudinal traction — the rear wheel provides drive but the contact patch friction coefficient is close to wet glass.

**Visual identification:** Rock surfaces with visible moisture (glistening or wet appearance), green or black biological growth (moss, algae, lichen), or both. Rocks may be darker in colour than surrounding soil. Wet conditions are associated with persistent moisture — stream proximity, woodland shade, winter or spring conditions.

**Severity range:** Elevated by one to two tiers compared to the equivalent dry rock garden. A minor dry rock garden becomes moderate on wet mossy rock. A moderate dry rock garden may reach significant or major severity on wet moss because traction is removed as an error-correction tool.

**Distinct failure pattern:** Rear wheel spin on contact. On dry rock, rear wheel traction supports controlled drive through rock contacts. On wet mossy rock, the same throttle input produces wheelspin before the rock contact can be managed. The contact then occurs with the rear wheel spinning — neither providing drive to clear the obstacle nor providing lateral stability. The bike stalls or deflects without the rider having any available corrective traction.

---

## 3. Bike Behaviour *(MANDATORY)*

This section describes the mechanical response of the motorcycle to rock garden terrain at the physics level. No coaching language, rider intent, or corrective advice — that content belongs in Section 4.

### Front Wheel Deflection Mechanics

When the front tyre contacts a rock, the reactive force acts perpendicular to the rock's face at the contact point. The direction of this force depends on the rock's geometry. A rock with a rounded top generates a force with a significant upward component — the tyre can roll over. A rock with a near-vertical face generates a primarily rearward force — the tyre is deflected backward. A rock angled across the trail generates an asymmetric force with a lateral component that redirects the wheel sideways.

Lateral deflection is the critical mechanism in rock gardens. Lateral deflection changes the front wheel's heading: the wheel tracks in a direction other than intended. Because the front wheel determines the bike's steering direction, a heading change at the front alters the line onto subsequent rocks. The magnitude of the heading change depends on the deflection force magnitude relative to the front wheel's rotational momentum — higher wheel speed resists deflection more effectively than lower speed.

Fork compression plays a role in deflection management. When the front wheel contacts a rock, the fork compresses. The fork's compression absorbs the vertical component of the contact force. The lateral component is not absorbed by the fork — it is transmitted through the steering geometry directly to the handlebar as a steering impulse. In rapid sequential contacts, the fork may not fully rebound between contacts, meaning each successive rock contact occurs with the fork already partially compressed and with reduced vertical absorption capacity.

### Chassis Response to Sequential Contacts

Each rock contact produces a chassis input: vertical, lateral, or compound. The suspension absorbs vertical components through fork and shock compression. Lateral components at the contact patch are transmitted directly through the steering geometry to the handlebar — the rider feels each deflection as a steering impulse.

On a single contact, the steering impulse is manageable. Under sequential contacts in rapid succession, the steering impulses accumulate. If the frequency of contacts exceeds the rider's ability to dampen and correct each impulse individually, the net effect is a progressive deviation from the intended line in the direction of the dominant deflection forces.

Insufficient rebound time between contacts (contacts too closely spaced) means the fork is still compressed from the previous contact when the next occurs. This reduces the suspension's absorption capacity for subsequent impacts and transfers more force through the chassis to the rider.

### Rear Wheel Tracking After Front Deflection

After a front wheel deflection changes heading, the rear wheel follows the front wheel's track with a delay of approximately one wheelbase length. If the front wheel's new heading takes it toward a rock, the rear wheel will arrive at the front wheel's previous position — which itself may be a rock — while the front wheel is already at the secondary contact. This produces simultaneous or near-simultaneous front and rear contacts, compounding chassis inputs at two points in rapid succession and removing the sequential management that allows normal obstacle crossing.

### Momentum Decay Through a Rock Field

Each rock contact consumes forward momentum through two mechanisms. First, the deflection force has a rearward component that decelerates the wheel. Second, the lateral component redirects some forward momentum sideways, which is then dissipated as the bike returns to its intended heading through suspension and steering compliance. Momentum decreases with each contact. On flat terrain, throttle application partly offsets this decay. On an uphill gradient, the decay is faster and harder to offset because gravity also opposes forward progress.

If momentum decays below the threshold needed to roll over the next rock, the bike stalls. At very low speeds, even small rocks (under 20cm) produce stall events because the tyre's inertia is insufficient to generate the upward force component needed to climb the rock face.

### Throttle and Engine Braking Dynamics in a Rock Field

Maintaining throttle through rock contacts sustains rear wheel drive and helps preserve forward momentum. Engine braking (throttle off) produces both deceleration and a weight-forward pitch moment, which loads the front tyre and reduces rear tyre contact load. Reduced rear tyre load means less lateral traction available to resist sideways deflection events at the rear.

On a downhill rock garden, controlled engine braking between contacts prevents the inter-contact acceleration that leads to speed gain through the section. However, engine braking also means the rear tyre is not under drive load — the contact patch has less total traction engagement, which allows the rear wheel to deflect laterally more easily than when under drive.

---

## 4. Technique by Severity *(MANDATORY)*

Severity is defined primarily by observable rock field geometry (density, rock height, height variation, spacing) and surface conditions. Rider skill requirement is secondary commentary.

### Minor (Sparse density, rocks under 25cm, readable lines)

**Entry technique:** Reduce from trail speed to a deliberate moderate approach. Identify the cleanest line through the visible portion of the field before entering. Establish a standing position with weight slightly central to neutral. Gear selection should allow smooth throttle response without aggressive power delivery — typically one gear above minimum viable, allowing smooth drive without wheelspin on contact.

**Sustained technique:** Maintain steady throttle. Do not decelerate at each rock — allow the bike's momentum to roll over minor obstacles. Scan actively ahead: not at the rock immediately in front of the wheel, but at the rocks one to two bike lengths ahead, selecting the next line segment. Maintain a loose (not dead) grip on the bars — allow small handlebar movements through minor deflections rather than fighting each one with grip tension.

**Exit technique:** Allow the bike to continue at section speed into the exit. No specific exit technique required at minor severity. Confirm the surface character on exit before resuming trail speed — loose rock sections often transition to surfaces of different traction without warning.

**Common errors:** Looking down at the immediate rock rather than ahead — visual fixation at this distance removes the ability to select the next line segment. Over-gripping the bars, which transfers deflection forces directly into the steering and amplifies line deviation. Braking within the section — reduces momentum below the deflection-resistance threshold without recovering time to react.

**Mechanical consequence:** At minor severity, errors produce chassis upset and minor momentum loss rather than crashes. Progressive line deviation is recoverable through smooth steering correction.

**Coaching gate:** Basic standing technique (BIOMECH-01) confirmed. No rock-specific skills required at minor severity, but standing body position is essential — seated riders cannot absorb chassis inputs through the legs.

### Moderate (Mixed sizes up to 50cm, irregular spacing, active line adaptation)

**Entry technique:** Identify the first clear line segment before entering. Set entry speed at a controlled moderate pace — fast enough for momentum but slow enough to adapt the line after the first contacts. Standing position with weight slightly rearward of centre, anticipating that rock contact will pitch the front wheel upward momentarily. Identify not only the first rocks but also the backup line options if the primary line closes.

**Sustained technique:** Active throttle management — maintain steady drive rather than coasting; be ready to feather the throttle if a rock demands precise front wheel placement. Visual lead: eyes always two to three rocks ahead of the current position.

When the front wheel deflects off a rock, the correction sequence is: do not fight the deflection with an immediate sharp steering input; allow the deflection to develop briefly while maintaining throttle; guide the wheel to the next available gap with smooth progressive steering. Fighting deflection with sharp input consumes lateral traction and produces a counter-deflection in the opposite direction, which may be worse than the original deviation.

**Exit technique:** Scan for the exit zone while managing the final rocks. Prepare for a possible surface transition — rock gardens frequently end at a soil or hardpack transition where traction and handling characteristics change suddenly. Do not decelerate in the final two bike lengths if the exit is a continuation of the trail — carry momentum out.

**Commitment threshold:** Moderate. Once entered, the rider should complete the section unless a clean stopping point (a visible gap between rocks with stable ground) presents itself. Stopping mid-section in a moderate rock garden is feasible but requires careful foot placement.

**Common errors:** Fixing eyes on the rock immediately in front of the wheel. Releasing the throttle at each rock contact — the momentum dip makes the next contact harder. Attempting to steer perfectly around every rock — on moderate rock gardens, some contact is expected and must be managed through, not avoided entirely.

**Mechanical consequence:** Line loss on moderate rock gardens typically produces a front deflection redirecting the wheel toward an adjacent rock or trail edge. Recovery is possible if throttle is maintained. Brake application during a deflection sequence compounds the effect by reducing available traction on both tyres.

**Coaching gate:** Standing technique (BIOMECH-01) and smooth throttle discipline (CONTROL-01) confirmed. Rider must demonstrate the ability to maintain forward speed over rough terrain rather than instinctively braking at each impact.

### Significant (Dense field up to 80cm, reactive line adaptation required)

**Entry technique:** Full deliberate setup before the field boundary. If the entry is visible from outside the section, visually scan the opening section before committing. Select the entry line with awareness of what subsequent rocks it commits to — not just the cleanest entry point but the cleanest first ten metres. Entry speed at a controlled moderate pace. Standing position, weight slightly rearward, core engaged throughout.

**Sustained technique:** Momentum management is the primary skill. The rider must maintain forward speed through the section without allowing it to decay to stall threshold or rise to loss-of-reaction-time levels. Throttle should be partially open through almost all rock contacts — the only exception is when a rock requires deliberate front wheel placement at very low speed, where clutch-throttle coordination (as in FEATURE-04 step technique) is appropriate for individual high rocks within the garden.

Line reading at significant severity is reactive — the line cannot always be pre-planned because rock geometry reveals itself at closer range. The skill is pattern recognition: identifying which rock surfaces are rounded (rollable) vs angular (deflection-likely), which gaps are passable vs too narrow, and which rocks are anchored vs potentially mobile.

Body position requires sustained core engagement throughout. The rider absorbs sequential impacts through knees and ankles — not through the arms. Stiff arms transmit deflection forces directly to the steering; the upper body should remain relatively still while the lower body absorbs terrain inputs.

**Exit technique:** Identify the exit zone at least three to four bike lengths before reaching it. In significant rock sections, the exit can be a sharp transition — the final rock may be followed immediately by a tight corner, gradient change, or surface transition. Scanning the exit while managing the final section rocks is a dual-attention demand unique to this severity level.

**Commitment threshold:** High. Once entered at speed into a significant rock garden, the rider must commit to completing the traverse or reaching the earliest feasible controlled stopping point. Attempting to stop mid-section surrounded by significant rocks requires careful foot placement and may itself produce a fall if stable footing cannot be found.

**Common errors:** Entering too slowly (insufficient momentum → stall events at the first rocks); entering too fast (insufficient reaction time → deflections develop too quickly to correct); death-grip on bars (amplifies deflection transmission into the steering); looking down rather than ahead; releasing throttle during a deflection sequence (removes drive precisely when momentum is needed most).

**Mechanical consequence:** Front deflection at significant severity can produce compound sequences — three contacts within under two seconds. Each contact produces a chassis input. The bike may deviate substantially from the intended line before the rider can react. Momentum loss at significant rock height produces stall events where the wheel contacts a rock and cannot climb — the bike stops with a rock in front and rocks on both sides.

**Coaching gate — do not prescribe significant rock garden technique without confirmed prerequisites:** Rider must demonstrate reliable navigation of moderate rock gardens without consistent stall events or mid-section stops. Throttle management through obstacle sections must be confirmed under partial fatigue conditions. If footage shows consistent momentum loss or evidence of death-grip on moderate rock gardens, coach those fundamentals before significant rock garden technique.

### Major (Boulder field 80cm+, no clear line, adverse conditions)

Major rock garden severity is a hazard and decision tier, not a routine progression target. Boulder fields of this scale exceed what standard enduro technique can manage reliably. The rider's correct first response is assessment, not execution — walking the section on foot to identify any viable line, assessing whether the bike's geometry can fit through available gaps, and evaluating whether the gradient and surface conditions are compatible with the available technique.

**Entry technique (if committed):** The slowest speed that can maintain any momentum — near-walking pace for extreme boulder fields. Line planning must extend as far ahead as the terrain allows. Each major rock is managed individually using FEATURE-04 step technique where required. Clutch-throttle coordination at each major rock contact is the primary mechanism.

**Sustained technique:** At major severity, the rock garden is effectively a sequence of individual step-type obstacles managed in rapid succession. The continuous-navigation approach of minor-to-significant rock gardens gives way to sequential discrete-obstacle technique. Speed is near-walking pace throughout — gyroscopic stability is minimal and balance is maintained almost entirely through active rider input.

**Common errors:** Committing to a boulder field without a clear path to the exit. Entering at a speed insufficient for the first few rocks but which creates too much momentum for the obstacles that follow. Failing to assess the section before entry.

**Coaching gate:** Stage 9 (Decision Engine) should assess whether the section is rideable before any technique recommendation. If the rock density and height combination indicate the feature exceeds the technique demonstrated in footage, the coaching response should be: "This rock section appears to exceed safe technique level for the footage shown. Walking the bike through or choosing an alternative line is the appropriate response."

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

### Failure Chain: Sequential Front Deflection → Secondary Rock Contact → Stall or Tip-Over (technique / line_choice)

**Trigger:** Rider is navigating a moderate or significant rock garden. The front wheel contacts a rock whose face presents an asymmetric deflection force — the contact geometry redirects the front wheel sideways from the intended line.

**Mechanism:** The front wheel deflects off the first rock, altering the bike's heading. The new heading directs the front wheel toward a second rock that was not on the intended line. The rider does not have sufficient time or available line space to steer around the second rock — the distance between the first deflection and the second contact is less than one bike length. The second rock contact occurs while the bike is still recovering from the first deflection. The compound chassis input from two rapid sequential deflections exceeds the rider's ability to stabilise heading. Forward momentum decays through both contacts. If momentum drops below the stall threshold at the second contact, the bike stops with a rock in front of the wheel. The rider must either generate a clutch-assisted restart from near-zero speed on an irregular surface, or dismount.

**Outcome:** At moderate severity, a mid-section stop requiring foot-down stabilisation. At significant severity, the stop may occur with rocks on multiple sides, making stable foot placement difficult — tip-over is the likely outcome if the rider cannot find footing before the bike falls laterally.

**Stage 6 classification:** `technique` (primary — the rider did not manage the initial deflection and secondary contact sequence effectively enough to preserve heading and momentum), `line_choice` (contributing — the entry line or pre-contact line selection placed the rider in a position where the deflection chain was difficult to avoid)

### Failure Chain: Momentum Decay Through Section → Mid-Section Stall (momentum)

**Trigger:** Rider enters a moderate or significant rock garden at the lower end of the viable speed range, or manages the entry well but allows speed to decay through the section by closing the throttle at each rock contact.

**Mechanism:** Each rock contact produces a small momentum loss. Without active throttle to compensate, the losses accumulate over the section length. The rider's speed decreases incrementally — at no single moment does it feel critically low. By the midpoint of the section, speed has decayed below the deflection-resistance threshold. The front wheel now deflects more easily at each contact because there is less momentum to resist deflection forces. Simultaneously, drive force available to roll over rocks is decreasing with speed. A rock that would have been rolled over at entry speed now produces a stall event.

**Outcome:** The bike stalls in the middle of the rock section. The rider is surrounded by rocks, with insufficient momentum to continue and a clutch restart demanded from an irregular, rock-strewn surface. At moderate severity, a carefully executed clutch restart is possible. At significant severity, the restart attempt on a tilted or obstructed surface often produces a further stall or fall.

**Stage 6 classification:** `momentum` (primary — speed allowed to decay below the required threshold through the section), `technique` (contributing — throttle management through contacts was insufficient to maintain viable speed)

### Failure Chain: Over-Committed Entry → High-Speed Front Deflection → OTB (decision / technique)

**Trigger:** Rider enters a significant rock garden at excessive speed — faster than the available reaction time for the rock density allows.

**Mechanism:** At high speed through a dense rock field, the front wheel contacts a rock before the rider can steer to avoid it. The rock's deflection force is large relative to the front wheel's lateral compliance at this speed — the deflection is abrupt and substantial. The steering geometry transmits this abrupt lateral force as a rapid yaw input to the handlebars. The rider's arms, extended at trail speed, are driven sharply sideways by the handlebar input. The bike's nose deflects sharply while the rear end continues forward — the bike yaws suddenly. The rider's body momentum continues in the original direction while the bike's front end has deviated. The rider is pitched forward and sideways relative to the bike.

**Outcome:** OTB, or ejection forward as the rider's body separates from the bike. At high speed in a rock field, this produces a fall into rocks — the most severe rock garden injury mechanism.

**Stage 6 classification:** `decision` (primary — entry speed was too high for the observed rock density and reaction time required), `technique` (contributing — body position and grip were not configured for high-speed deflection management)

### Failure Chain: Early Line Error → Unavoidable Secondary Rocks → Forced Stop (line_choice / decision)

**Trigger:** Rider selects an entry line that appears viable for the visible first three rocks but commits to it before scanning the subsequent rock sequence. The entry line leads into a sub-section of the field where rocks are denser or higher than the approach section.

**Mechanism:** The rider is committed to the entry line by the time the consequences become visible — the bike is moving forward into the rock field and there is insufficient space to change to an alternative line. The chosen line leads to a rock cluster or series of high rocks that requires a technique level the rider is not executing. Each rock in the unavoidable sequence demands improvised technique under time pressure that a planned approach would not have required. Improvised technique is less reliable than prepared technique — timing, throttle, and body position are reactive rather than deliberate.

**Outcome:** Variable — the rider may clear the unavoidable rocks through improvised technique, may stall partway through the cluster, or may fall. The failure is in the line choice that committed the rider to this sub-section, not in any single rock execution.

**Stage 6 classification:** `line_choice` (primary — entry line selected without sufficient forward planning of the subsequent rock sequence), `decision` (contributing — commitment threshold reached before available line options were fully assessed)

### Failure Chain: Traction Loss on Wet Rock → Rear Wheel Lateral Slide → Lowside or Tip-Over (traction / technique)

**Trigger:** Rider is navigating a rock garden with wet or mossy rock surfaces. Throttle is applied to maintain momentum during a rock contact sequence.

**Mechanism:** The rear tyre contacts a wet or mossy rock surface under drive load. The available friction on the wet rock surface (particularly smooth granite, limestone, or moss-covered surfaces) is insufficient to sustain the combined demand of drive force and lateral stabilisation. The rear wheel breaks traction — spinning and simultaneously losing lateral grip. A spinning rear tyre has effectively zero lateral friction. The bike's forward momentum is no longer matched by rear wheel drive, and the rear end is free to move laterally without resistance. The rear slides sideways — typically downhill on gradient, or in the direction of the most recent steering input on flat terrain.

**Outcome:** Lateral fall (lowside or tip-over). The rear end swings sideways until the bike falls in the direction of the slide. In a rock field, the fall places the rider and bike onto and between rocks.

**Stage 6 classification:** `traction` (primary — wet rock surface friction insufficient for the combined drive and lateral traction demand), `technique` (contributing — throttle input was not modulated to account for the reduced traction budget of wet rock)

### Pipeline Identification Notes

**Visual indicators for Stage 4 `feature_type: rock_garden` detection:**

*Approach indicators:*
- Multiple distinct rocks visible across the trail surface ahead — the trail's forward view is interrupted by numerous rock shapes, not just one or two
- Trail surface colour shifts to predominantly grey, tan, or ochre rock rather than soil
- Rider visually scanning laterally on approach (line selection behaviour)
- Rider reducing speed and adjusting body position before entering the rock section

*Execution indicators (in-section):*
- Bike line visibly deviating from a straight path — the front wheel tracks an irregular course between rocks
- Multiple visible vertical chassis displacements in sequence — the bike bobs repeatedly as wheels cross rocks
- Rider body relatively still while the bike moves irregularly beneath — impacts absorbed through knees and ankles
- Engine note varying with throttle management through contacts
- Foot-down events mid-section (at significant severity)
- Rear wheel intermittent wheelspin sound (audible on textured rock with microphone proximity)

*Post-event indicators:*
- Both wheels visible on the far side of the rock section = successful traverse
- Bike stationary within rock section with rider still aboard = stall or stuck
- Bike fallen laterally within rock section = tip-over or lowside
- Rider and bike separated within rock section = OTB or ejection

**Audio markers:**
- Repeated impact sounds in rapid sequence — distinct from single step or log impact; multiple distinct impacts within 2–5 seconds
- Tyre scraping sounds as the wheel contacts and crosses individual rock surfaces
- Throttle blipping pattern — brief throttle applications between rock contacts
- Engine note change on gradient: labouring on uphill rocks, engine braking characteristic on downhill rocks
- Metal impact (footpeg, exhaust, frame) on larger rocks when the bike chassis drops between contacts

**Severity indicators — distinguishing minor from significant:**
- Rock density: count of visible rocks per bike length; more than two rocks per bike length indicates moderate or above
- Rock height relative to wheel diameter: below one-third wheel diameter = minor; one-third to two-thirds = moderate; above two-thirds = significant; at or above wheel diameter = major
- Spacing between rocks: regular and navigable = minor; irregular with line closure events = moderate; frequent line closure = significant; no readable continuous line = major
- Gradient presence: any gradient elevates the base severity by approximately one tier
- Surface condition: wet or mossy rock elevates severity by one to two tiers

**Edge cases where Stage 4 classification confidence should be flagged low:**
- POV footage: rock garden size and density are difficult to assess from a helmet-cam — the vertical parallax makes rocks appear smaller and flatter than they are; severity and classification confidence should be reduced
- Distant third-person footage: individual rocks under 20cm may not be distinguishable from surface texture; rock garden classification confidence should be flagged low if rock size cannot be individually assessed
- Rock garden vs root section: at distance or in shadow, large exposed roots can be visually confused with rocks — surface texture and contact response (roots flex; rocks do not) are the discriminating factors but may not be visible at distance
- Rock garden at section end: if the clip ends mid-section, full severity cannot be assessed — flag severity as "at minimum [base estimate]" based on visible evidence

### Observability Notes

**1. Reliably confirmable from footage (directly observable):**
- Presence of multiple distinct rocks across the trail surface (rock garden classification)
- Approximate rock density: count of visible rocks per bike length (coarse estimate)
- Whether the section is on a gradient — visible from bike and rider attitude in third-person footage
- Whether the rider completed the section, stalled, or fell
- Whether a front deflection occurred — visible as a sharp heading change at the front wheel
- Whether the rider experienced a rear wheel slide — visible lateral movement of the rear end
- Dominant rock type: loose vs embedded (loose rocks visibly displaced by contact; embedded rocks do not move)
- Surface moisture: wet or dry rock visible from surface sheen and colour

**2. Inferable with caveats (can be estimated but not confirmed):**
- Average rock height: estimated from wheel diameter comparison, but viewing angle significantly affects apparent height
- Section length: estimated from footage duration and approximate rider speed, but the full section may not be captured
- Whether the rider maintained throttle throughout: suggested by engine note consistency, but exact throttle position is not observable
- Whether a stall event resulted from momentum loss or technique error: event sequence suggests primary cause but root cause requires supplementary evidence
- Whether the line selected was optimal for the visible rocks: inferred from subsequent deviation but intent cannot be confirmed

**3. Cannot be determined from footage (pipeline must flag as unknown):**
- Exact rock height in centimetres
- Exact rock surface friction coefficient — wet rock appearance varies across the section and cannot be precisely estimated from footage
- Whether loose rocks shifted under contact or remained stable — the shift may be too small to observe
- Rider fatigue level through a long section — fatigue increases technique error rate but is not observable
- Tyre compound and inflation pressure — which directly affect rock garden navigation capability
- Whether the rider pre-planned the line or was navigating reactively — cannot be determined from footage

---

## 6. Entry Discipline *(adapted from Approach & Setup Requirements)*

> *For this continuous feature, this section covers what the rider must establish before the rock garden's entry boundary. Adapted from "Approach & Setup Requirements" per schema adaptation rules.*

### Speed Selection

Entry speed is the most consequential decision for a rock garden traverse. The correct speed balances two competing demands: sufficient momentum to resist rock deflections and roll over contacts, and sufficient reaction time to adapt the line mid-section. These demands point in opposite directions — high speed provides more deflection resistance but less reaction time; low speed provides more reaction time but less deflection resistance.

For minor rock gardens, entry speed can be near trail speed — rocks are small and manageable at moderate pace. For moderate rock gardens, a deliberate reduction to controlled pace is appropriate — typically one quarter to one third below normal trail speed in comparable conditions. For significant rock gardens, entry speed should be the slowest that maintains usable momentum — this is slower than intuition suggests but faster than walking pace.

Speed selection must account for gradient. An uphill rock garden requires more entry speed than a flat one because momentum will decay faster against gravity. A downhill rock garden requires less entry speed because the gradient will accelerate the bike between contacts.

### Line Selection at Entry

The entry line is a commitment to a corridor through the opening section of the field — not just the first rock to navigate. The rider should scan from the approach zone and identify not just the cleanest first three rocks but the shape of the navigable path they create through the visible field. An entry line that begins on the left half of the trail with the next gap also on the left is a coherent choice. An entry on the right with the first gap opening immediately to the left is an incoherent choice that demands an abrupt early correction at speed.

On well-used trails, previous riders' tyre marks often indicate the most commonly navigated lines. These may not always be optimal but they represent aggregated experience of which routes through the field are consistently passable.

### Body Position Setup

Standing with weight slightly rearward of centre should be established before the entry boundary. The rearward bias prepares for rock contacts that pitch the front wheel upward — a contact that meets a weight-forward rider pitches the rider onto the bars. The standing position allows the legs to absorb chassis inputs independently of the upper body.

Grip on the bars should be positive but not tight. Death-grip before the section amplifies every subsequent deflection impulse. Elbows should be slightly bent and raised — not locked or tucked against the body.

### Gear Selection

One gear above minimum viable is the typical starting point — a gear that provides smooth throttle response without requiring high RPM to maintain drive. Very low gears produce aggressive power delivery that amplifies wheelspin events on irregular terrain. Too high a gear creates torque gaps between contacts where the engine cannot maintain drive.

For uphill rock gardens, gear must support sufficient torque for individual rock climbs. For downhill rock gardens, gear should provide adequate engine braking between contacts to resist inter-contact acceleration.

---

## 7. Terrain & Condition Interaction

**This section flags which Terrain KB entries should be co-retrieved and documents the feature-level interaction. It does not duplicate Terrain KB content.**

### Rock Surface (retrieve TERRAIN-03)

Rock terrain is the primary surface for rock garden features. TERRAIN-03 covers rock surface physics, traction generation on rock, and break-away characteristics. Rock garden classification should co-retrieve TERRAIN-03 in all cases. The key feature-level interaction: rock garden severity is partially determined by rock surface conditions (dry vs wet, textured vs smooth), which TERRAIN-03 describes. A rock garden that is moderate severity on dry textured rock may become significant severity on smooth wet rock without any change in geometry — the TERRAIN-03 interaction effectively elevates the working severity tier.

### Mud Pockets in Rock Fields (retrieve TERRAIN-01)

Mud accumulates in low points and depressions between rocks. A predominantly dry rock garden may contain isolated mud pockets where water collects. The traction switch from dry rock (moderate-to-high traction) to mud pocket (low traction) can be abrupt and mid-contact — the rear wheel crosses a rock with rock traction, then hits a mud pocket immediately after, where the same throttle input that was appropriate on rock now produces wheelspin. This sudden traction switch within a section is a distinct failure risk in mixed rock-mud terrain. Co-retrieve TERRAIN-01 when mud pockets are visible or conditions suggest mixed surface.

### Shale and Loose Fragment Sections (retrieve TERRAIN-09)

Rock gardens in shale-bearing geology often contain shale fragments on top of or between more stable rocks. Shale has lower lateral traction than solid rock — it fractures along bedding planes and may split or shift under contact. A shale fragment in a rock garden produces a different deflection profile than solid embedded rock: less predictable deflection direction, possible surface failure under contact load. Co-retrieve TERRAIN-09 when shale fragments are visible or the geological context suggests shale composition.

### Mixed Surface Rock Gardens (retrieve TERRAIN-10)

Many real-world rock gardens combine rock with soil, gravel, or organic material between and around the rocks. The mixed surface means traction varies across the section — the rider cannot apply a single traction estimate to the full field. Co-retrieve TERRAIN-10 when the rock garden surface is visibly mixed. TERRAIN-10 covers mixed surface physics and the challenge of traction calibration on variable surfaces.

### Condition Modifiers

**Dry conditions:** Dry rock provides the most predictable traction in rock gardens. Deflection events arise from geometry (deflection forces) rather than traction loss. The primary failure risks are sequential deflection and momentum decay, both manageable through technique. Classify at the base geometry tier.

**Damp / wet conditions:** Wet rock reduces traction. Throttle management must be more conservative to stay below the traction limit. Each rock contact now carries a traction dimension in addition to the deflection dimension. Elevate the base severity classification by approximately one tier when wet conditions are confirmed.

**Frozen conditions:** Frozen rock provides near-zero traction on smooth surfaces. Rock garden navigation on frozen rock is a major severity event regardless of field geometry. Normal technique cannot compensate for the traction deficit — the correct coaching response is avoidance or a decision-level assessment.

---

## 8. Section Exit *(adapted from Exit, Landing & Recovery)*

> *Renamed from "Exit, Landing & Recovery" to "Section Exit" per schema adaptation rules for continuous features.*

### Exit Zone Management

The transition from a rock garden to normal trail changes traction, braking, and handling characteristics abruptly. A rider who has calibrated throttle, grip, and body position for rock field navigation may be over-committed in one or more dimensions at the exit. Common exit zone hazards:

**Speed surplus:** If the rider maintained aggressive throttle through the final rocks to preserve momentum, exit speed may be higher than the post-section terrain warrants. A corner, descent, or narrowing immediately after the rock garden exit requires speed management that must begin in the final metres of the section.

**Weight rearward from section technique:** The rearward weight bias appropriate for rock garden navigation may need to reduce at the exit if the post-section terrain is flat or descending. Excess rearward weight on exit deloads the front tyre on the normal surface.

**Grip calibration:** Rock gardens demand a relatively open grip to allow handlebar movement through deflections. The normal trail after the section may demand more precise steering input than an open grip provides — the rider should progressively firm grip after exiting.

### Recovery from Within-Section Errors

When a technique error (deflection, momentum loss) occurs within the section, the recovery decision depends on the remaining section depth:

- **Early in the section:** Recovery is feasible by re-establishing speed and line before the next significant rocks.
- **Mid-section:** Recovery is possible if the next rocks allow it — this is the section's recovery window narrowing.
- **Deep in the section:** The rider must commit to completing through whatever rocks remain. Stopping deep in a significant rock garden is more dangerous than attempting to continue at reduced speed.

The recovery technique from a front deflection event: allow the deflection momentarily, maintain throttle, then guide (not force) the wheel to the next available gap with smooth steering. Smooth correction uses less traction than a sharp counter-steer and produces a more stable recovery trajectory.

### Consequence of Lost Recovery Window

If momentum decays to zero mid-section, the bike stalls and the rider must stabilise on a rock-strewn surface. Stable foot placement is the immediate requirement — the rider must find footing on or between rocks to support themselves and the bike. In significant rock gardens, finding stable footing is itself a balance challenge. If stable footing cannot be established before the bike tips, the tip-over is onto rocks.

A controlled restart from a mid-section stall requires: stabilise the bike with feet; assess the immediate obstacle in front of the wheel; plan the clutch restart appropriate for that obstacle (which may require FEATURE-04 step technique if a significant rock face is immediately in front); execute the restart with deliberate clutch-throttle coordination.

---

## 9. False Reads & Misidentification

### Rock Garden That Reads as Rocky Trail

At certain rock densities or from certain camera angles, a rock garden may read as "rough rocky trail" rather than as a classified rock garden feature. This matters because rocky trail stays at the terrain level (TERRAIN-03); rock garden fires FEATURE-06 retrieval. The operational distinction is whether the rocks require individual management decisions (rock garden = yes) or whether the surface is rough but does not interrupt the rider's line management (rocky trail = no). If the footage shows the rider making visible lateral line adjustments around or between rocks, classify as rock garden. If the rider maintains a consistent line with vertical chassis inputs but no lateral deviations, it is rocky terrain.

### Rock Garden That Reads as Step Sequence

A rock garden on a gradient or composed of large uniform-height rocks may read as a step sequence (FEATURE-04). The visual discrimination is the distribution of rocks across the trail width and the presence of gaps requiring lateral line navigation. A step sequence presents rocks that span the full trail width — there is no choice around them, only over them. A rock garden has rocks distributed across the trail with navigable gaps. If gaps between rocks are visible and the rider's line visibly adapts around them, classify as rock garden. If the rider's technique is entirely forward-over at each discrete face with no lateral line adaptation, classify as sequential steps.

### Rock Garden That Reads as Root Section

In heavily wooded terrain or at footage distance, a rock garden may be visually confused with a root section. Physical discrimination: roots are flexible (they visibly flex under tyre contact or show natural curvature), round in cross-section, and dark brown; rocks are rigid (no visible flex under contact), irregular in shape, and grey, tan, or ochre in colour. When colour and texture are unclear (poor lighting, distance, POV), the pipeline should flag classification confidence as low when the distinction cannot be made from footage.

### Severity Underestimation from Approach Footage

A common misread: the approach to a rock garden shows the section from behind and slightly above the rider's position. This angle compresses the visual depth of the field — rocks appear closer together than they are in the lateral dimension, and the section length appears shorter. Severity tends to be underestimated when only approach footage is available because the full extent is not visible. When in-section footage is available, weight it more heavily than approach footage for severity assessment.

### Dry Rock Garden That Reads as Wet

Dark volcanic rock, moss-stained limestone, or shale-coated surfaces can suggest wet conditions in dry weather. Observable indicators for actual wet conditions: visible standing water on surfaces, wet rider or bike components on entry, other environmental moisture cues visible in the footage. Rock surface colour alone is not sufficient to confirm wet conditions — do not elevate severity classification based on colour alone without supporting moisture evidence.

---

## 10. Coaching Gates & Prerequisites

### Minor Severity Prerequisites

- Standing technique (BIOMECH-01): confirmed — the rider must be in a standing position to absorb chassis impacts through the legs
- Basic throttle management (CONTROL-01): smooth application and release without instinctive closure on impact

Minor rock gardens do not require rock-specific skill beyond basic standing technique. Coaching at this level is accessible to any rider who has confirmed standing fundamentals.

### Moderate Severity Prerequisites

- Standing technique (BIOMECH-01): confirmed and reliable under rough terrain conditions
- Throttle discipline through impacts (CONTROL-01): rider must maintain throttle rather than instinctively releasing at each contact
- Basic momentum awareness (DYNAMICS-05): awareness of momentum as a resource to preserve across the section rather than manage contact-by-contact

**Coaching gate:** If footage at moderate rock gardens shows the rider seated, instinctively braking at each rock contact, or repeatedly losing momentum mid-section, coach BIOMECH-01 and CONTROL-01 fundamentals before moderate rock garden technique.

Future skill tag: `obstacle_navigation_momentum`, `throttle_open_rough`

### Significant Severity Prerequisites

- Confirmed reliable moderate rock garden navigation — rider completes moderate sections with controlled technique and without consistent stall events
- Sustained throttle management under fatigue conditions
- Line reading at speed — rider demonstrates ability to assess line options two to three rocks ahead while managing immediate contacts
- Clutch-throttle coordination (CONTROL-01, CONTROL-02) for individual step-height rocks within the garden at significant severity

**Coaching gate — do not prescribe significant rock garden technique without confirmed prerequisites:** Rider must demonstrate completion of moderate rock gardens without stall events or mid-section stops as a pattern. Throttle management through rough terrain must be evident in footage. If footage shows the rider stopping repeatedly at moderate rock gardens, do not prescribe significant technique.

Future skill tag: `line_reading_continuous`, `compound_obstacle_momentum`

### Significant to Major Threshold — Decision-Level Gate

Before prescribing any technique for a major rock garden, Stage 9 (Decision Engine) should assess:
1. Whether the rider's footage demonstrates consistent completion of significant rock gardens
2. Whether the specific major rock garden has any viable line at the rider's demonstrated technique level
3. Whether the gradient and surface conditions compound the geometry severity beyond the available technique

If any of these assessments is negative, the coaching response should be: "This rock section appears to exceed the technique level demonstrated in your footage. Walking the bike through or choosing an alternative line is the appropriate response at your current skill level."

### Progression Model

Minor (trail riding rock awareness, standing position, maintain speed) → Moderate (deliberate line selection, throttle management through contacts) → Significant (compound deflection management, momentum budgeting, reactive line adaptation) → Major (decision-level assessment before entry; trials-adjacent technique on individual obstacles within the field)

This progression is not primarily about rock size. A rider who can navigate a significant-density rock garden at moderate rock height has more transferable skill than a rider who can clear a single major rock obstacle. The continuous navigation skill — line reading, momentum management, compound deflection recovery — is the coaching priority for rock garden technique.

---

## 11. Feature Demands / Constraints

### Minimum Technique for Safe Navigation

- Standing position (BIOMECH-01): mandatory at all severity levels
- Throttle on through contacts (CONTROL-01): essential at minor and above
- Visual lead — scanning ahead rather than at immediate obstacles: essential at moderate and above
- Line selection and in-section adaptation: essential at moderate and above
- Clutch-throttle coordination (CONTROL-01, CONTROL-02): required for individual rock contacts at significant severity that require step-level technique

### Equipment Considerations

**Tyres:** Aggressive block tread tyres with large widely-spaced knobs provide better mechanical interlock on rock surfaces than close-packed or intermediate tread patterns. Tyre compound matters less on dry textured rock (mechanical interlock dominates) than on wet rock (where rubber friction coefficient is the primary traction mechanism). Tyre inflation pressure is a significant variable not observable from footage — lower pressures increase compliance and contact patch size on rough rock but increase the risk of pinch flats; higher pressures resist puncture but reduce compliance.

**Suspension:** Sufficient suspension travel and appropriate rebound speed are important for sequential rock contacts. Compression damping that is too stiff does not absorb contacts effectively; compression damping that is too soft allows repeated bottoming that reduces control. Rebound that is too slow leaves the fork compressed between sequential contacts, reducing absorption capacity at each successive rock. These settings are not observable from footage and are not a coaching lever available to Stage 10.

**Bike geometry:** Long-wheelbase bikes have a longer contact-to-contact cycle when negotiating closely spaced rocks. Short-wheelbase bikes are more manoeuvrable between tight gaps. Neither characteristic is directly observable from footage as a distinct coaching lever.

### Out-of-Scope Content

- Rock surface physics, traction coefficients, and break-away characteristics → TERRAIN-03
- Mud pockets between rocks (surface physics) → TERRAIN-01
- Shale fragment physics → TERRAIN-09
- Individual high rock faces within the rock garden requiring step technique → FEATURE-04
- Single log or cylindrical horizontal obstacle → FEATURE-05
- Foundational throttle mechanics and clutch coordination → CONTROL-01, CONTROL-02
- Standing and seated fundamentals → BIOMECH-01, BIOMECH-02
- Weight distribution physics → DYNAMICS-01
- Momentum management physics → DYNAMICS-05
