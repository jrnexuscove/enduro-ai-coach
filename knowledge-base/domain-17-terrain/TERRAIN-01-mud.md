---
# ── BLOCK 1: Pipeline Contract ──────────────────────────────────────────────
pipeline_contract:
  kb_type: terrain
  pipeline_enum_value: [mud]              # Exact Stage 4 surface.primary_type value

# ── BLOCK 2: Retrieval Triggers ─────────────────────────────────────────────
retrieval_triggers:
  PRIMARY:                                # Top-ranked when mud surface fires
    stage4_surface_type: [mud]
  SECONDARY:                              # Retrieve when primary fires or these signals are present
    stage6_failure_types: [traction, momentum, technique, line_choice]
    stage4_gradient: [gentle_up, moderate_up, steep_up, very_steep_up, gentle_down, moderate_down, steep_down, very_steep_down]
    stage4_surface_condition: [wet, saturated, frozen]
    scenario_cues: [fresh_wet_mud, churned_mud, rutted_mud_shallow, rutted_mud_deep, boggy_swampy_mud, drying_mud, frozen_mud, thawing_mud]
  CONTEXTUAL:                             # Background context — retrieve when no closer match
    stage3_intent_category: [climb, descent, trail_ride, technical_section]
    stage4_features_detected: [rut]

# ── BLOCK 3: Content Metadata ────────────────────────────────────────────────
content_metadata:
  topic_id: TERRAIN-01
  title: Mud — Terrain Profile
  domain: Terrain KB
  domain_id: terrain
  scope: "Surface physics, terrain states, and pipeline identification for muddy terrain.
    Does NOT cover mud riding technique (see domain-05, domain-06), throttle or clutch
    mechanics (see CONTROL-01, CONTROL-06), or tyre selection (see domain-12)."
  status: draft
  surface_type: mud
  terrain_states:
    - fresh_wet_mud
    - churned_mud
    - rutted_mud_shallow
    - rutted_mud_deep
    - boggy_swampy_mud
    - drying_mud
    - frozen_mud
    - thawing_mud
  conditions_covered: [wet, saturated, frozen, damp]
  traction_range:
    wet: low
    saturated: very_low
    damp: moderate
    frozen: variable
  gradient_contexts: [flat, gentle_up, moderate_up, steep_up, very_steep_up, gentle_down, moderate_down, steep_down, very_steep_down]
  failure_types_associated: [traction, momentum, technique, line_choice]
  common_misclassifications:
    - loam       # Wet loam can appear muddy — has better internal drainage and organic structure; grip is distinctly higher
    - clay       # Clay shares plastic deformation but has lower water saturation point and different grip curve
    - wet_grass  # Wet grass over soft ground may appear muddy; surface behaviour and traction profile are different
  common_mixed_contexts:
    - "mud over rock base — surface slides but rocky substrate creates unexpected support under wheel sinkage"
    - "mud pockets within rocky terrain — traction switches mid-section without visual warning at approach speed"
    - "mud transitioning to hard pack at drying track boundary — grip jumps non-linearly at the transition edge"
  difficulty_range: [beginner, intermediate, advanced]
  regional_terminology:
    UK: ["mud", "slop", "clag", "claggy ground", "bog", "muck"]
    AU_US: ["mud", "muck", "slop", "bog", "goop"]
    note: "No significant divergence. 'Clag' and 'claggy' are UK-specific terms for
      sticky, clay-rich mud that clings to tyres and boots. Not commonly used in formal
      coaching language but may appear in rider description of their footage."
  related_topics: [TERRAIN-02, TERRAIN-06, DYNAMICS-04, CONTROL-01, CONTROL-03, CONTROL-06, CONTROL-08, BIOMECH-01, BIOMECH-03]
  prerequisites: []
  tags: mud, traction, ruts, churned, bog, slop, wet, saturated, momentum, traction-loss, low-grip, clag
  version: 1.0
  last_updated: 2026-04-02
---

# TERRAIN-01 — Mud: Terrain Profile

---

## 1. Surface Physics

Mud is a suspension of fine mineral particles — clay, silt, or decomposed organic matter — in water. Its physical properties change dramatically with water content, particle composition, and the degree of mechanical disturbance it has sustained. Unlike hard pack or rock, mud does not have a fixed traction characteristic: it transitions between states with fundamentally different behaviour, sometimes within the same corner or climb.

The core traction physics of mud is adhesion under shear loading. When a tyre pushes through mud, grip depends on whether the particle matrix can sustain shear without flowing. Fresh wet mud often retains enough cohesion to provide meaningful resistance. Churned mud has lost this structure — repeated wheel passes break down particle cohesion, saturate the upper layer, and create a near-frictionless shear plane between tyre and ground. The tyre is no longer riding on a surface; it is riding inside a fluid with no meaningful resistance to lateral or longitudinal movement.

Mud deforms under load rather than offering a rigid base. Tyre behaviour is fundamentally different from hard surfaces: the tyre partially sinks into the surface rather than riding on top of it. Mud-specific tyres with tall, widely spaced, open knobblies work by displacing mud laterally and continuously finding fresh purchase rather than relying on surface friction. Intermediate or hard-pack-spec tyres ride on the shear layer and generate very little usable traction at any speed.

Traction loss in mud does not feel like traction loss on hard pack. On hard pack, break-away is sharp and rapid. In mud, the tyre begins floating on the shear layer before the rider registers the slip event — the initial phase of loss is nearly feedback-free. This is why mud crashes and momentum failures often surprise even experienced riders: they have no warning cue from the front end or rear wheel before the slide is already established.

---

## 2. Terrain States

**Fresh wet mud** — Mud that has been recently wetted by rain or water crossing but not yet mechanically churned. Particle cohesion is still substantially intact. Grip is compromised but real: a rider with good technique and appropriate tyres can generate meaningful drive traction and modulate braking. Surface appears dark, moderately reflective, with an intact surface texture — individual soil particles or grass fragments still visible. Depth is typically shallow unless the underlying substrate is inherently soft. This is the highest-traction mud state and the reference point against which degraded states are evaluated.

**Churned mud** — Mud that has been repeatedly deformed by wheel passes, footpeg action, or sustained foot traffic. Particle structure is broken down into a near-homogeneous slurry with very low shear resistance. Distinguished from fresh wet mud by appearance: pocked surface with visible tyre track smears, loss of any distinct surface texture, and a flat, glossy or matt sheen with no visible grain. Grip is severely reduced. Even aggressive knobblies will displace the slurry rather than bite through it — the tyre must seek the underlying substrate, which may be several centimetres down. This state is characteristic of race starts, mid-field trail sections in events, and repeatedly-ridden training loops in wet conditions.

**Rutted mud (shallow)** — Formed by repeated wheel passes in the same line, which compress and displace surface material into low ridges either side of the channel. Shallow ruts (under 5 cm) can assist line discipline by channelling the front wheel, but restrict the rider's ability to correct or change direction. The rut edge acts as a pivot point for the front wheel — if the wheel contacts the edge at an angle, the deflection is abrupt relative to the soft rut interior. Drying ruts can develop a harder edge than the soft interior, increasing this catch risk.

**Rutted mud (deep)** — A distinct riding scenario requiring specific technique. The front wheel inside a deep mud rut (over 10 cm) has almost no steering authority — rut walls determine direction. Any attempt to steer against the rut requires enough speed to lift the front wheel over the wall, which is rarely available mid-rut. The rut walls in deep churned-mud ruts have near-zero lateral resistance — leaning into a wall does not produce correction. Deep rut riding requires peg-to-peg balance with weight kept central, tracking straight, and committing fully to a single exit point. Full technical treatment in Section 6.

**Boggy / swampy mud** — Substrate is saturated to significant depth, typically peat, decomposed organic matter, or waterlogged clay. Surface may not distinguish itself visually from shallow mud on approach, but sinkage is progressive and deep — rear wheels can reach axle depth under traction load in extreme cases. Characteristic audio: deep, low-frequency squelching rather than the high-pitched splash of shallow mud. Common in low-lying areas, beside stream crossings, and after extended rainfall on terrain with poor natural drainage. Once a wheel has sunk, recovery requires significant throttle and momentum, adding roost risk and front-end loading.

**Drying mud** — Mud transitioning from wet to dry. Surface behaviour is highly variable and spatially inconsistent within the same section: areas that have crusted over provide surprising grip, while adjacent patches remain treacherous just below the crust. Colour variation is the diagnostic cue: pale or tan with visible cracking = crusted drying; darker, slightly reflective patches = still wet below the crust. The crust illusion is a significant false-signal hazard — covered in Section 10.

**Frozen mud** — Water in the particle matrix has crystallised. The surface is firm, rigid, and has extremely low friction on the surface layer itself. Traction depends entirely on whether the knobbly tyre can penetrate the frozen crust. Where penetration occurs, moderate grip is available from the underlying particle matrix. Where the tyre rides on the frozen surface, traction approaches near-zero — comparable to ice. Frozen mud inside deep ruts creates rigid walls with a slippery base — the rut constrains the bike but provides no recoverable traction.

**Thawing mud** — The most treacherous mud state and the most likely to be misjudged. The surface layer has melted but the substrate may still be frozen, creating a mobile shear layer over a hard base. The tyre sinks through the soft upper layer but cannot penetrate the frozen substrate — producing a genuine shear plane with no rotational resistance. The surface appearance is nearly identical to frozen mud and may be confused with drying mud. Rider feedback is deceptive: the feel at initial wheel contact is similar to wet mud, but traction is substantially lower than it appears. Diurnal freeze-thaw cycles on sun-facing slopes create morning-safe / afternoon-treacherous patterns that are particularly hazardous in spring riding.

---

## 3. Bike Behaviour

**Traction delivery** — In all mud states, traction is generated primarily through the tyre's ability to displace surface mud and reach the particle matrix below, rather than through surface friction. This produces discontinuous grip: the bike can have real traction one moment and none the next if the tyre stops displacing and starts floating. Smooth, progressive throttle allows the tyre to seat before loading. Aggressive throttle in mud does not increase drive — it spins the knobbly on the shear layer rather than driving it through.

**Rear wheel behaviour** — The rear wheel is prone to lateral step-out under both throttle and braking in all mud states. In fresh wet mud, controlled rear wheel slip is manageable and is part of normal technique. In churned mud, any slip event can escalate rapidly: once the tyre breaks free of any surface structure, it finds no resistance on the shear layer and the step-out continues until either fresh traction is found or the rider actively corrects. On uphill gradients, rear wheel spin drills the tyre downward rather than forward — consuming forward momentum while losing height.

**Front wheel behaviour** — The front wheel in mud is prone to gradual push and deflection rather than the sharp snap characteristic of hard pack. Under braking, the front tyre can cut progressively into the surface and lock without providing the sharp feedback of a locked front on a hard surface. On off-camber mud, the front wheel runs off its line gradually rather than in a single abrupt step, making the slide feel controllable even as it is becoming committed.

**Steering response** — Mud damps steering response because the tyre does not ride on a fixed, reactive surface. Handlebars feel heavy and require more deliberate input. Direction changes must be initiated earlier than on hard surfaces and require more decisive commitment. Over-correction is common: the rider applies a larger steer input than needed to produce the expected response, then finds the terrain responds inconsistently.

**Suspension behaviour** — Soft mud absorbs suspension inputs by deforming under impact — bumps that would rebound sharply on hard pack are partially absorbed by surface deformation. This can feel more comfortable but reduces terrain feedback to the rider. In very wet conditions, mud can pack into tyre knobblies and reduce available tread depth, effectively turning a mud-spec tyre into an intermediate. This is typically audible as reduced mud-throwing sound from the rear.

---

## 4. Technique Implications

**Momentum management is the primary skill discipline in mud.** Unlike hard pack where speed can be modulated through braking within a section, mud requires maintaining momentum *before* traction events rather than reacting during them. Once forward speed is lost in deep or churned mud, restarting from rest is very often impossible — the rear wheel digs rather than drives, and the bike sinks progressively. Selecting a higher-traction path before the section, even if longer, is frequently preferable to a direct line with high traction risk.

**Weight distribution** in mud sits marginally rearward of neutral compared to normal riding. Excessive front weight causes the front tyre to cut into the surface, reducing steering authority and increasing the risk of front-end push. However, extreme rear bias causes the front wheel to float, reducing directional stability and line precision. The correct position is a standing posture with weight distributed through the pegs, allowing the bike to track without the rider adding asymmetric body-mass loading through the seat.

**Throttle control** must be smooth and progressive. The margin between generating drive and spinning uselessly is narrower in mud than on any other common surface. Initial throttle application should seek purchase: if the rear wheel begins spinning, the correct response is a brief throttle reduction to allow the tyre to re-seat, then a second application. Maintaining sustained spin while hoping to find traction is the most common throttle error in mud. See CONTROL-03 for terrain-specific power delivery and CONTROL-06 for clutch modulation in low-traction scenarios.

**Braking** requires significantly increased stopping distances and earlier initiation than hard pack. Threshold braking technique calibrated for hard pack will lock wheels on mud, particularly in churned or boggy states. Engine braking (see CONTROL-05) provides a controllable retardation force that supplements rear braking on descents without requiring precise lever modulation on a surface where precise modulation is difficult to maintain.

**Line selection** in mud is a higher-order skill than on any other surface. A fresh traction line beside a churned groove offers substantially better grip and may be the difference between completing a section and bailing. On circuits and heavily trafficked trails, the outside edge of a corner may have better-draining, less-churned surface than the inside line that every rider has targeted. Rut choice and rut navigation are sub-disciplines with specific technique — see Section 6.

**Rider position** — Standing is almost always preferable to sitting in mud, regardless of gradient. Peg weighting (see BIOMECH-03) allows fine lateral balance adjustments that compensate for mud deflection without requiring large steering corrections. Seated riding in deep mud traps the rider's weight mass at the pivot point and prevents lateral correction through the lower body, converting every balance adjustment into a handlebar input.

---

## 5. Gradient Interaction

**Uphill in mud** — Traction demands multiply with gradient. The mechanical drive requirement increases as the gradient steepens, while available rear wheel traction decreases as surface contact deteriorates. The common failure pattern is: entry speed is adequate, momentum carries the bike through the lower section, but traction loss during the mid-section climb exhausts forward velocity, and the rider cannot restart from a stationary position on steep mud. Momentum management — entering fast enough to carry the bike through low-traction zones without restarting — is more important than any in-section technique correction.

Fresh wet mud on moderate gradients remains rideable with correct technique. Churned mud on steep gradients typically requires a momentum-carry strategy or a line change to undisturbed surface. Boggy mud on any uphill gradient is a disproportionate multiplier of difficulty: wheel sinkage under traction load and climbing gradient compounds rapidly, and the sinkage itself reduces forward clearance.

**Downhill in mud** — Speed management is the primary challenge. Braking before entering the muddy section (while still on better-grip surface) is always preferable to braking on it. Engine braking provides controllable retardation that avoids wheel lock on a surface where threshold braking is difficult to modulate accurately. On steep muddy descents, the rear wheel stepping out under braking is the most common failure mode — light rear brake application with significant engine braking contribution is the correct distribution.

**Off-camber mud** — Off-camber muddy terrain is disproportionately difficult relative to the gradient. Even fresh wet mud on significant off-camber will cause sustained lateral drift under normal cornering load. The combined lateral and longitudinal force on the tyre exceeds the available friction envelope in a direction that cannot be corrected by counter-steering alone. Off-camber mud on a descent is a high-consequence scenario: the bike drifts both downhill and sideways simultaneously, with the lower wheel (the one on the downhill side) carrying excess loading that further reduces its grip.

---

## 6. Rut Behaviour

**Shallow ruts (under 5 cm)** — These are primarily line-discipline features rather than technical obstacles. The rut channels the wheel and reduces the need for active steering within the rut. The principal hazard is the exit: when the rider wants to leave the rut (to correct line, avoid deepening, or change direction), the rut edge acts as a pivot point and can deflect the front wheel abruptly. Shallow ruts in drying mud commonly develop firmer edges than the soft interior, increasing the catch force at the edge.

**Deep ruts (over 10 cm)** — Deep ruts are a distinct riding discipline with specific technique requirements that differ significantly from standard mud riding. Inside a deep rut, the front wheel has almost no steering authority — the rut walls determine direction. The bike must be balanced on the peg-to-peg axis with weight kept central so the machine can track straight rather than tipping into a rut wall. Any tendency for the bike to tilt into a wall must be corrected through peg pressure and hip weight shift, not handlebar input.

Climbing out of a deep rut requires momentum and a specific diagonal technique: approach the exit point at a shallow angle to the rut wall, use a positive throttle input to drive the front wheel up and over the rut edge, and commit fully to the exit line with no hesitation. Pausing mid-exit drops the front wheel back into the rut at an angle, resulting in a sudden handlebar twist with high crash probability.

**Rut-to-rut transitions** — Moving from one rut to an adjacent rut is a high-difficulty manoeuvre. The terrain between ruts is typically churned, bermed, or unstable — the machine is briefly on the least grippy surface while executing a directional change. Transitions require sufficient speed to maintain gyroscopic stability, precise timing, and full commitment to the destination rut.

**Rut walls by mud state** — Fresh-rut mud walls have some lateral resistance — they were formed by material compression and retain some structure. Churned mud rut walls have near-zero lateral resistance: leaning into a churned wall produces no counter-force. Drying mud rut walls develop hard top edges that act as catchers for the footpeg, engine cases, and lower bike panels. Frozen rut walls are rigid but offer no friction — the bike is constrained by the walls but traction within the rut is severely reduced.

**Rut depth assessment** — Rut depth is a significant coaching variable. It is partially observable in 3rd-person footage from elevated angles or when the bike is stationary in the rut, but is not reliably assessable from approach footage or POV. The Stage 4 pipeline should classify `features_detected: rut` with severity based on available visual cues; the depth category (shallow vs deep) constrains the coaching response.

---

## 7. Conditions Impact

**Rainfall intensity and duration** — Light rain on a dry mud surface can create a deceptive initial condition: a thin wet layer over largely dry substrate, where wet particle binding temporarily provides better grip than expected. Heavy sustained rain saturates progressively — first the upper layer, then the substrate. Track conditions degrade non-linearly: moderate rain for one hour may leave a trail manageable; a second identical hour of rainfall can produce near-unrideable conditions if the substrate reaches field capacity. This non-linearity is relevant to event timing: riders on later runs face a fundamentally different surface than early runners.

**Temperature** — Cold temperatures slow surface saturation by reducing infiltration rate. Below freezing, mud transitions to frozen state. The thaw cycle is the most hazardous transition because thaw completion is not visually obvious — frozen substrate can persist for hours after the surface layer has melted. Diurnal freeze-thaw cycles create reliable morning-safe / afternoon-treacherous patterns on trails with morning sun exposure, and the reverse pattern on shadowed north-facing slopes.

**Seasonal timing** — Spring mud is typically the most challenging: high water table, possible frozen substrate, and ongoing rain produce conditions that cannot be managed by rider technique alone in the worst states. Autumn mud is often deeper but better-draining than spring (natural drainage systems are not yet overwhelmed). Summer mud near water crossings or in permanently shaded sections may persist between rain events while surrounding terrain has dried completely — creating localised hazard zones.

**Traffic load** — Mud surface degradation under wheel traffic is highly non-linear. A section of fresh wet mud that is rideable early in a race or group ride can transition to unrideable churned mud through mid-field passage. Stage 4 footage classification must account for this: footage timestamp or event position (early vs late pass) is a relevant context modifier if available.

---

## 8. Entry / Exit Transitions

**Hard pack to mud** — Traction drops sharply at the transition boundary. Braking calibrated for hard pack (higher friction coefficient, more progressive feedback) becomes over-aggressive the moment the front wheel crosses into mud. The most common failure is carrying too much speed into the mud section and being unable to arrest it on significantly lower braking traction. Speed reduction should happen on the hard-pack approach, not in the mud itself.

**Mud to hard pack** — The bike exits the mud section with mud contamination on tyre surfaces. This reduces grip on the first hard-pack contact, particularly under rear braking or corner-exit throttle. The rear tyre is most at risk: mud-packed knobblies on dry hard pack can produce rear wheel step-out on the first aggressive input. Allow several metres of hard-pack running to allow self-cleaning before loading the tyres fully.

**Mud to water crossing** — Crossing water cleans tyre surfaces, temporarily restoring grip on the far side. However, wet tyres on any surface create a brief reduced-traction window as the tyres clear. Riders who expect grip restoration immediately at the water exit may load the tyres before this window has closed.

**Partial transitions and mud pockets** — A common real-world scenario: discrete mud pockets within rocky, gravel, or hard-pack terrain, or a trail where the outer edge is dry and the inner corner is muddy from surface drainage. Stage 4 will classify based on the dominant surface type; mixed-surface scenarios may also fire TERRAIN-10 (mixed). Coaching for transitions must acknowledge that the full-section mud profile does not apply to these partial scenarios.

---

## 9. Interaction Patterns & Failure Triggers

**Traction failure — throttle escalation** — Rider enters mud at hard-pack-calibrated speed and throttle → rear wheel generates drive initially → traction begins dropping as mud state degrades through section → rider applies more throttle expecting to drive through → rear wheel breaks free and begins spinning → forward momentum is consumed by wheel spin rather than drive → bike decelerates → bail or tip-over.

**Momentum failure — under-speed entry** — Rider recognises traction risk, reduces speed for caution → entry speed is insufficient for gradient and mud depth → momentum drops below threshold mid-section → bike decelerates progressively → wheel sinkage increases as load rises without forward velocity → rider cannot restart from rest on this surface state → bail.

**Rut catch — deep rut exit failure** — Rider selects rut line, initial tracking stable → rut deepens through section → front wheel fully constrained → rider attempts steering correction → no effect → rut exits at an angle or terminates into a berm → bike launches off rut edge → OTB or lowside.

**Boggy commitment failure** — Approach appears similar to shallow mud → rider carries normal momentum → front wheel penetrates surface layer → rear wheel sinks under power load → bike digs in and decelerates hard → rider is thrown forward → OTB or stall-drop.

**Observable surface indicators for Stage 4 classification** — Mud can be confirmed by visible surface deformation under wheel pass (mud spray pattern, surface displacement). Churned state: pocked surface texture, smeared tyre tracks, no visible grain. Boggy state: deep wheel sinkage visible in footage, low-frequency mud sound. Rutted state: visible channel lines on surface, raised edge ridges, wheel tracking visible. Frozen state: uniform pale-grey colouration, no surface deformation visible, wheel deflects rather than sinks. Audio cues: deep squelching at low speed = boggy; rhythmic slip-grip pattern in engine audio = churned traction cycling; absence of spray but visible slide = frozen mud.

**Pipeline Identification Notes** — `surface.primary_type: mud` confirmed by: visible surface deformation under wheel, dark discolouration relative to surrounding terrain, mud spray or displacement pattern, mud contamination visible on lower bike panels. Frozen mud may appear grey-brown without deformation — `surface.condition: frozen` should be considered when temperature context is cold (environmental cues, ice elsewhere in footage) and surface appears rigid. Boggy mud may not be distinguishable from shallow mud in early frames — progressive wheel sinkage is the discriminating cue. **Observability note:** Mud depth below the surface is not observable from footage. Substrate composition (clay vs peat vs loam) is not distinguishable at typical filming distances. The distinction between fresh wet mud and early-stage churned mud requires close examination of surface texture that may not be achievable at medium to far camera distance.

---

## 10. False Signals / Illusions

**The drying crust illusion** — A mud surface that is crusting over presents a pale, tan or dry-looking appearance that can be read as safe or recoverable terrain. The crust can be millimetres thin over soft wet mud beneath. At riding speed, the wheel breaks through the crust without any gradual feedback and immediately encounters the shear layer — there is no progressive warning. Riders who have trained to read dark, wet mud as the hazard and pale surface as safe are specifically vulnerable: their visual risk signal is inverted for this state. On group rides and events, riders who passed early (when the surface was still intact) may communicate an inaccurate report of conditions to those following.

**Fresh rut grip illusion** — Newly cut ruts in fresh mud have briefly firmer walls than the surrounding surface because the rut-forming process compresses the displaced wall material. Riders may perceive the rut as providing better control and grip than the open surface, and commit to it at higher speed than the rut depth warrants. This is partially valid but transient: as subsequent passes widen and soften the walls, the grip advantage disappears and the depth disadvantage remains.

**Frozen surface firmness** — Frozen mud provides a firm surface feel that suggests reasonable control conditions. Riders familiar with frozen mud surface will calibrate for its known low cornering and braking friction. Thawing mud exploits this calibration: the surface appears frozen, feels firm at initial wheel contact, but the shear layer is active underneath. Confident frozen-mud technique applied to thawing mud produces a non-recoverable slide before the rider identifies the difference.

**Boggy entry surface** — Boggy mud frequently presents a consolidated-looking surface at the entry point — a thin mat of grass, roots, or compressed material over saturated substrate. Riders assess depth from the appearance of the leading edge, judge it as manageable, and commit forward momentum. Unlike rocky terrain where surface structure is reliable to the depth visible, bog depth cannot be estimated from approach appearance. The bike may travel several wheel diameters before sinkage begins, by which time commitment is complete.

---

## 11. Terrain Demands / Constraints

**Minimum technique required for safe riding** — Smooth progressive throttle control (see CONTROL-01); standing position with active peg weighting (see BIOMECH-01, BIOMECH-03); early braking initiation and reduced threshold expectation (see CONTROL-11); clutch modulation for drive delivery in traction-marginal sections (see CONTROL-06, CONTROL-08). Line reading for surface state variation within a section is a foundational mud-specific skill.

**Tyre equipment sensitivity** — Mud is the surface most sensitive to tyre specification in the entire terrain profile set. Mud-specific tyres with open, tall, widely spaced knobblies are functionally necessary for churned or boggy states — intermediate or hard-pack tyres have near-zero performance in these conditions. Tyre pressure reduction to 10–14 psi (from typical trail pressure of 14–18 psi) increases the contact patch and improves floatation in very soft mud. Tyre specification and pressure are covered in domain-12; the dependency on correct equipment is noted here because it is the most direct influence on traction performance of any surface in this KB.

**Coaching pipeline relevance** — Mud riding failures generate reliable failure patterns for Stage 6 and Stage 8 classification. Rear wheel spin, momentum loss on gradients, rut catches, and transition traction drops are all observable failure types with identifiable causal chains. Coaching interventions have high directness: identifying the specific mud state (fresh vs churned vs boggy) determines the coaching priority — momentum strategy for boggy and churned, technique correction for fresh wet mud, rut discipline for rutted states.

**Out-of-scope for this entry** — Mud-specific riding technique and drill progressions are covered in domain-05 and domain-06. Throttle and clutch mechanics are covered in CONTROL-01 and CONTROL-06. Tyre selection and pressure is covered in domain-12. The Conditions & Adaptation entry (a cross-cutting modifier) will be generated separately and will reference this entry for mud-specific condition modifiers.
