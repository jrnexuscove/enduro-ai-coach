---
# ── BLOCK 1: Pipeline Contract ──────────────────────────────────────────────
pipeline_contract:
  kb_type: terrain
  pipeline_enum_value: [sand]             # Exact Stage 4 surface.primary_type value

# ── BLOCK 2: Retrieval Triggers ─────────────────────────────────────────────
retrieval_triggers:
  PRIMARY:                                # Top-ranked when sand surface fires
    stage4_surface_type: [sand]
  SECONDARY:                              # Retrieve when primary fires or these signals are present
    stage6_failure_types: [traction, momentum, technique, line_choice]
    stage4_gradient: [flat, gentle_up, moderate_up, steep_up, gentle_down, moderate_down, steep_down]
    stage4_surface_condition: [dry, damp, wet]
    scenario_cues: [shallow_dry_sand, deep_loose_sand, hard_packed_sand, wet_sand, sand_over_rock_base, wind_ripple_sand]
  CONTEXTUAL:                             # Background context — retrieve when no closer match
    stage3_intent_category: [trail_ride, climb, descent, race_section]
    stage4_features_detected: [berm]

# ── BLOCK 3: Content Metadata ────────────────────────────────────────────────
content_metadata:
  topic_id: TERRAIN-05
  title: Sand — Terrain Profile
  domain: Terrain KB
  domain_id: terrain
  scope: "Surface physics, terrain states, and pipeline identification for sandy terrain.
    Does NOT cover sand-specific riding technique (see domain-05, domain-06), throttle
    delivery and momentum management mechanics (see CONTROL-01, DYNAMICS-02), or tyre
    selection and pressure (see domain-12). Sand berms and whoops are described here
    in terms of formation physics and riding behaviour only — discrete berm technique
    is covered in FEATURE-05."
  status: draft
  surface_type: sand
  terrain_states:
    - shallow_dry_sand
    - deep_loose_sand
    - hard_packed_sand
    - wet_sand
    - sand_over_rock_base
    - wind_ripple_sand
  conditions_covered: [dry, damp, wet]
  traction_range:
    dry: moderate       # Variable: shallow dry sand = moderate; deep loose sand = low; hard-packed = moderate_to_high
    damp: moderate      # Capillary cohesion between damp particles improves matrix resistance; grip better than dry loose
    wet: moderate_to_high  # Firm wet compacted sand = high; waterlogged sand = low
  gradient_contexts: [flat, gentle_up, moderate_up, steep_up, gentle_down, moderate_down, steep_down]
  failure_types_associated: [traction, momentum, technique, line_choice]
  common_misclassifications:
    - loam      # Fine dry loam resembles light sand at distance; loam has organic composition and higher wet traction
    - gravel    # Fine gravel and coarse sand share visual texture; gravel particles are angular and harder; sand particles are rounded and more mobile
    - hardpack  # Hard-packed sand surface resembles compacted hardpack; particle binding differs and is moisture-sensitive
    - mud       # Waterlogged sand in low-lying or coastal areas can appear muddy; traction mechanism is displacement-based not adhesion-based
  common_mixed_contexts:
    - "sand over rock base — firm bedrock under thin sand layer; tyre punches through to rock substrate without warning"
    - "sand transitioning to compacted gravel at trail edge — particle mobility reduces abruptly; braking and cornering character change sharply"
    - "wet sand pocket within dry trail — moisture-enhanced traction island creates localised grip variation"
  difficulty_range: [beginner, intermediate, advanced]
  regional_terminology:
    UK: ["sand", "sandy", "soft ground", "loose"]
    AU_US: ["sand", "sandy", "loamy sand", "soft", "whoops", "sugar sand"]
    note: "'Sugar sand' is a North American term for very fine dry loose sand that provides
      near-zero traction and resists compaction. 'Whoops' refers to rhythmic transverse ridges
      in sand (also used in hardpack contexts). Australian desert sand trail riding has a
      distinct technique vocabulary not widely used in UK or European enduro contexts."
  related_topics: [TERRAIN-01, TERRAIN-02, TERRAIN-06, DYNAMICS-01, DYNAMICS-02, CONTROL-01, CONTROL-05, CONTROL-11, BIOMECH-01, domain-12]
  prerequisites: []
  tags: [sand, momentum, flotation, sinkage, deep-sand, hard-packed, whoops, berms, displacement-traction, wallowing, soft-ground]
  version: 1.0
  last_updated: 2026-04-02
---

# TERRAIN-05 — Sand: Terrain Profile

---

## 1. Surface Physics

Sand is a granular, displacement-based terrain. The tyre does not ride on a fixed surface — it moves through the surface, displacing particles forward and sideways to generate a reaction force. This fundamental distinction from rigid or cohesive surfaces means that traction on sand cannot be understood in terms of a friction coefficient between tyre and ground. It must be understood in terms of particle displacement rate: how quickly sand can be displaced determines how much driving force can be generated before the wheel digs rather than drives.

Flotation and sinkage are the two competing states a tyre on sand can occupy. A tyre that maintains sufficient forward speed generates enough relative motion between wheel and sand that particles are displaced horizontally as the tyre passes — the tyre rides on top of the particle matrix rather than through it. This is the flotation state. Below a threshold speed, or with insufficient tyre footprint area, the tyre loads the sand vertically without forward displacement velocity — particles flow downward and outward under the wheel, creating a hole. This is the sinkage state. The transition from flotation to sinkage is not gradual: it has a velocity threshold below which forward motion becomes self-defeating. Applying more throttle once sinkage has begun in deep sand drives the tyre deeper rather than forward, consuming momentum while generating negative progress.

The momentum dependency of sand traction is more pronounced than on any other common terrain. Sand rewards a committed, forward-moving approach and punishes hesitation or mid-section deceleration disproportionately. On hardpack, a rider who slows mid-section can re-accelerate from a lower speed without catastrophic consequence. On deep sand, slowing below the flotation threshold produces sinkage, and once the rear wheel has sunk into a hole on gradient, re-establishing forward motion from rest is effectively impossible without physical assistance. The correct approach to deep sand is to set speed, maintain commitment, and resolve the line before the section rather than adjusting within it.

Tyre pressure has a greater impact on sand performance than on any other terrain. Reducing pressure spreads the tyre footprint, increasing the surface area of particle contact and reducing unit load per unit area. This directly improves flotation — the tyre sinks less under the same wheel load. The improvement is not incremental: reducing from 14 psi to 8–10 psi on deep sand can transform an unrideable section into a manageable one with the same technique. Riders who have not reduced pressure for a sand section are at a structural disadvantage that technique alone cannot fully compensate.

The traction break-away character on sand is progressive and warning-rich compared to rock or hardpack. The rear wheel does not snap to a committed slide — it begins to spin and dig, giving several wheel rotations of feedback before the situation is committed. The front wheel does not wash out sharply — it begins to wander, feels heavy, and requires increasing steering effort as sinkage increases. Both failure modes provide more warning than hardpack failures. However, on deep sand the warning is qualitatively different: the rider must recognise sinkage onset signals (increasing steering weight, reducing forward speed, engine revs rising without speed increase) rather than the conventional slip-before-slide cues of rigid surfaces.

Sand conceals depth variation in the same way grass conceals sub-surface hazards. A smooth, even sand surface gives no reliable indication of how deep the sand is below the visible top layer. A section that is 5 cm deep over bedrock can be ridden confidently at speed; a visually identical section that is 40 cm deep requires a fundamentally different approach. The first wheel pass — specifically the initial front wheel response on entry — is the primary depth sensor. Abrupt deceleration on entry indicates a shallow hard base. Progressive flotation indicates sufficient depth for displacement-based traction. Deep wallowing from first contact indicates excessive depth for the current speed and pressure combination.

---

## 2. Terrain States

**Shallow dry sand** — Sand layer of moderate depth (approximately 5–15 cm) over a firm substrate: compacted soil, hardpack, or bedrock. The reference state for sand terrain. Traction is generated through particle displacement, but the substrate provides a firm base that limits sinkage — the tyre displaces sand until it contacts the harder base and then rides on a mixed sand-over-firm surface. This limits sinkage risk and makes flotation achievable at normal trail speeds with appropriate technique. Visually: dry sand colouration (pale tan, yellow, orange, or white depending on mineral composition), smooth or lightly wind-textured surface with no significant track deformation from prior passes. The primary hazard of this state is the transition to deeper sand without visual warning — the visible surface appearance is identical regardless of depth. This state is the most forgiving entry point to sand terrain and the calibration reference against which deeper or wetter states are assessed.

**Deep loose sand** — Sand depth exceeds the tyre's practical ability to displace horizontally to reach a firm base. The wheel floats in the particle matrix or sinks progressively depending on speed and wheel load. This is the highest-consequence sand state: momentum loss below the flotation threshold produces a self-reinforcing sinkage cycle — the wheel digs, speed drops, the wheel digs faster, forward progress stops. On flat terrain, a rider with sufficient commitment and correct technique can maintain flotation through most deep sand sections. On gradient, the additional drive demand multiplies the throttle input required, increasing rear wheel sinkage risk proportionally. The unique failure mode of this state: once the rear wheel sinks to the point where the tyre sidewall is at sand level, restart from rest on a gradient is not achievable by the rider alone. This is not shared with any other sand state. Visually: similar surface appearance to shallow dry sand; may have more bowl-shaped indentations from prior wheel passes or footprints, with slumped rather than clean edge profiles, as an indicator of greater depth.

**Hard-packed sand** — Sand compacted by sustained traffic, moisture-and-evaporation cycles, or particle settling under wind and gravity into a semi-consolidated surface. The particle matrix has developed cohesion through capillary tension between damp particles that has since dried, or through mechanical interlocking under repeated load. Traction is moderate to high — significantly better than loose sand — and the surface behaves closer to a granular hardpack than to the displacement-based mechanism of loose sand. The unique failure mode of this state: the compacted layer may be only a few centimetres thick, and heavy braking, hard cornering, or a stationary loaded wheel can break through the crust into looser sand below mid-section, transitioning the surface physics without warning. This is not shared with loose states because those have no surface crust to break. Visually: surface has less texture variation than loose sand, may show a slightly firmer-looking appearance relative to adjacent loose sections, and often appears marginally darker due to residual moisture in the compacted matrix. Footprints and prior wheel tracks show less sinkage.

**Wet sand** — Sand with sufficient moisture content that capillary forces between particles increase particle-to-particle friction significantly. This is the near-firm sand state of beaches and recently rained-on desert terrain: moisture in the particle matrix adds internal cohesion that makes the surface behave closer to soft hardpack than to loose sand. Traction can be high — approaching moderate hardpack levels — and the surface supports confident braking and cornering at appropriate speed. The unique failure mode of this state: the transition zone as wet sand dries is layered and non-visible — the surface layer dries first, creating a dry loose upper layer over still-wet compacted sand below. A rider calibrated to wet-compacted traction who hits the dry surface layer loses the traction basis of their calibration within a single wheel rotation, without any visual warning at approach speed. Visually: distinctly darker and more uniform in colour than dry sand of the same mineral type; surface is smooth and shows no dust displacement under wheel pass; surface sheen visible under direct lighting.

**Sand over rock base** — A thin sand layer (under approximately 5 cm) directly over exposed bedrock or stone substrate with minimal intermediary material. From the approach, this appears as a normal sandy surface. On entry, the tyre displaces the shallow sand layer and contacts the rock base within the first wheel rotation or two. The physics switch from displacement-based to rigid-surface-based in a single event: the tyre transitions from floating in particles to riding on rock, with the full consequences of rock traction physics applying immediately. The unique failure mode of this state: if the rock base is smooth or wet, the traction at the moment of punch-through can be very low, and the rider's speed and technique are calibrated for sand and are both inappropriate for the rock surface. This is a qualitatively different failure from hard-packed crust punch-through (which transitions to a softer material); here the transition is to a harder, potentially far lower-grip surface. Visually: surface appears identical to other dry sand states from the approach — sand depth is not observable and this state cannot be confirmed without a prior wheel pass or local knowledge.

**Wind ripple sand** — A sand surface with a regular transverse ridged pattern formed by wind action: parallel ridges running approximately perpendicular to the prevailing wind direction, spaced at intervals corresponding to wind velocity and sand particle size. The riding implication is speed-dependent. At low speed, the wheel rolls over individual ridges smoothly. At moderate speed, the rhythm of the ridges begins to excite the front fork: the wheel is briefly airborne between ridges, contacts the next ridge face, is deflected slightly, and the deflection accumulates into a handlebar oscillation. The unique failure mode of this state: if the rider grips the handlebars firmly in response to the oscillation (the instinctive reaction), the stiffened grip transmits each ridge impact into the steering rather than isolating it, and the oscillation frequency can match the front fork's natural resonance and amplify into a tank-slapper. This escalation does not occur in any other sand state. Visually: reliable — the regular parallel ridge pattern is clearly identifiable from above or at an oblique approach angle.

---

## 3. Bike Behaviour

**Traction delivery** — Sand traction is delivered through particle displacement rather than surface friction. The knobbly tyre displaces particles rearward and sideways, generating a reactive driving force from the particle matrix. Knobbly architecture matters for displacement volume more than for compound adhesion: wide spacing, tall knobblies, and aggressive paddle-style profiles maximise the volume of sand displaced per wheel rotation and are optimised for deep sand. On hard-packed sand and wet sand, compound adhesion contributes as it does on hardpack, making standard intermediate trail tyres more effective in these sub-states than in loose sand. The critical equipment variable is tyre pressure: contact footprint area is the primary determinant of flotation threshold, and pressure reduction has a disproportionately large effect on rideable depth range.

**Rear wheel behaviour** — The rear wheel on sand is the primary drive component and the primary sinkage risk. Under controlled throttle, the rear wheel displaces sand rearward and drives forward. Under excessive throttle, it excavates progressively deeper holes. Moderate rear wheel slip on sand is normal and productive — the knobbly tread is actively displacing particles rather than riding on a static surface. The feedback signal for impending sinkage: revs climbing without corresponding speed increase combined with a rearward pitch sensation as the bike's rear begins to settle. This transition gives approximately two to four wheel rotations of warning before the hole becomes committed. On descents, engine braking causes the rear wheel to drag through the sand forward-facing rather than rearward-facing, creating a forward-pitching drag that is equally capable of causing sinkage as spin — the mechanism is the same.

**Front wheel behaviour** — The front wheel on sand provides directional guidance but limited precise steering authority in deep states. In shallow sand, the wheel rolls on the particle matrix with reasonable tracking. In deep sand, the wheel experiences progressive increases in rolling resistance as it displaces particles laterally ahead of it rather than rolling cleanly through. Steering input on deep sand produces a delayed, resistance-heavy response because the wheel must physically push through particles rather than changing its roll direction on a fixed surface. Front wheel sinkage in very deep sand produces an abrupt end to forward motion: there is no conventional washout warning of a lateral slide — the front wheel simply stops displacing and ploughs in. This pitch-forward arrest is distinct from hardpack OTB in that there is no sharp bar input; just increasing heaviness followed by sudden arrest.

**Braking performance** — Braking on sand is modulation-dependent rather than threshold-dependent. The maximum braking force available is governed by particle displacement rate, not by surface friction coefficient. A locked rear wheel on sand ploughs through particles and creates linear drag retardation — this is useful and manageable on straight-line descents. Front wheel lock on sand with any lateral load produces a front-end dig that loads one tyre edge preferentially and can tip the bike. Modulated braking is consistently more effective than threshold braking on sand because the partially rotating tyre actively displaces particles forward while decelerating, whereas a locked wheel only compresses and aerates the surface. Wet compacted sand and hard-packed sand support materially higher braking forces than dry loose sand and approach hardpack braking performance.

**Suspension behaviour** — On shallow sand over firm substrate, suspension inputs are partially absorbed by sand compression before the tyre reaches the base — minor irregularities are cushioned by the sand layer. On deep sand, no firm reaction surface exists; the fork compresses into the sand rather than rebounding off a substrate. Available suspension travel on deep sand is partially consumed by sand deformation rather than terrain absorption, which reduces available travel for actual terrain features. Wind ripple sand produces a rhythmic suspension input at a frequency determined by ridge spacing and riding speed. This frequency can match the front fork's natural oscillation frequency, producing amplification rather than damping if the rider's grip transmits the oscillation stiffly into the steering.

---

## 4. Technique Implications

**Momentum commitment** — The primary technique principle on deep sand is to commit to a speed that maintains flotation and sustain it through the section without deceleration. The temptation to reduce speed on entry to an uncertain sand section is the most common momentum failure: the rider backs off as the surface becomes uncertain, drops below the flotation threshold, and the rear wheel sinks. Correct technique is the inverse: maintain or increase speed at the transition into sand. On known sections, the ideal entry speed can be established by experience. On unfamiliar sand, the first cautious-but-committed pass at controlled speed provides the depth calibration for subsequent runs. See DYNAMICS-02 for throttle management mechanics on low-traction surfaces.

**Weight distribution** — Sand requires a weight distribution that is marginally more rearward than neutral. Excessive front weight causes the front wheel to plough into the sand, increasing rolling resistance and reducing flotation. Excessive rear weight overloads the rear wheel's displacement capacity and increases sinkage risk without providing the front wheel flotation advantage. The correct position is standing with weight through the pegs, body slightly rearward of centre. On steep sand climbs, a more aggressive rearward shift is needed to keep the front wheel loaded enough for directional control while the rear wheel drives upward. This rearward position is directly contrary to the forward-weight climbing technique used on rock and hardpack gradients — sand is the surface where this inversion applies most clearly. See DYNAMICS-01 for fore-aft weight mechanics.

**Throttle management** — Smooth, sustained throttle is essential in deep sand. Aggressive throttle immediately spins the rear wheel beyond the displacement rate, creating a hole. Throttle pulsing — applying, lifting, reapplying — interrupts the wheel's consistent particle engagement and produces alternating sinkage and recovery cycles. The correct throttle feel on deep sand is a sustained medium input held constant through the section, increasing gradually with gradient. Once the section is established and the wheel is displacing consistently, do not alter throttle unless sinkage begins. See CONTROL-01.

**Line selection** — Line choice on sand is a depth, state, and formation management decision. On sections with visible wind ripples, changing the angle of approach relative to the ridge direction (riding at a slight diagonal rather than straight-on) reduces the resonance excitation frequency and can prevent oscillation build-up. On sections known for sand-over-rock hazards, a line that follows verified prior wheel tracks (which show no sharp deceleration marks or rock contact indicators) is safer than unmarked surface. Where dry and damp sand coexist, the damp zone offers better traction and should be selected even if the line is slightly longer.

**Braking calibration** — The transition from hardpack or loam to sand requires braking recalibration. Hard threshold braking on sand locks wheels into the sand rather than generating peak retardation — effective stopping force under locked-wheel conditions is lower than under modulated braking on sand. Riders transitioning from harder surfaces consistently over-brake on first sand contact and do not achieve expected deceleration. Recalibrate to: apply earlier, with less peak force, and maintain modulation rather than threshold. On wet compacted sand and hard-packed sand, braking performance approaches hardpack and a higher threshold is supportable.

---

## 5. Gradient Interaction

**Uphill sand** — Sand climbs require a full momentum-commitment strategy. On shallow dry sand over firm base, the climb is manageable with sustained smooth throttle and rearward weight shift to prevent front wheel lift. On deep loose sand, the climb multiplies the flotation challenge: the drive demand for climbing exceeds the demand for flat riding, but increasing throttle to compensate also increases rear wheel sinkage risk proportionally. The typical failure pattern is: entry speed adequate, momentum carries the bike through the lower section, sinkage begins at the mid-section where gradient is highest, forward progress stops, and restart from rest is impossible. The correct approach is to pre-set sufficient entry speed to carry the gradient on momentum as the primary drive source, using throttle as a supplement rather than a primary driver once gradient increases the load demand.

**Downhill sand** — Downhill sand is more forgiving than downhill mud in terms of crash consequence, but creates specific challenges for speed management. Engine braking is more effective and controllable than rear brake application for initial speed management because it is distributed through the drivetrain rather than concentrating all retardation force at the rear tyre contact patch. On loose sand descents, rear wheel brake application can dig and send the rear sideways unpredictably, while engine braking slows the bike without the wheel contact asymmetry that causes lateral movement. At the base of a sand descent, the transition back to firmer terrain is often abrupt — riders who braked minimally through the sand section may be carrying excess speed at the transition.

**Off-camber sand** — Off-camber sand is a significant challenge. The lateral force from the slope load meets the displacement-based traction mechanism of sand: rather than a sharp lateral washout, the tyre displaces particles progressively downhill, producing a gradual drift toward the fall line. This drift builds without sharp feedback — the rider may not recognise the onset until the bike is already committed to the fall-line trajectory. Deep loose sand on significant off-camber terrain is the most challenging gradient-state combination: the lateral force demand from the camber combines with low lateral resistance from the particle matrix simultaneously.

---

## 6. Sand Formation Dynamics

Sand under repeated traffic and wind action develops characteristic surface formations — berms, channels, whoops, and wallowing patterns — that define the riding environment and require specific technique adjustments. This section replaces the standard Rut Behaviour section, which is not applicable to a non-cohesive granular surface that does not form ruts in the conventional sense.

**Sand berms** — At corners in sand terrain, repeated wheel passes displace sand outward from the corner apex under centrifugal force. The displaced material accumulates at the corner exterior, forming a banked berm. Sand berms build rapidly with sufficient traffic because each particle is mobile. A well-developed sand berm can be ridden like a hardpack berm: the banked surface provides a normal-force reaction that supports higher lean angles and corner speeds than flat sand. However, sand berms are structurally unstable. The banked wall is not consolidated — heavy loading on the berm face can collapse the outer edge, drop the tyre into the loose material behind the berm, and remove lateral support mid-corner. In wet conditions, surface moisture reduces inter-particle friction and the berm face can slump progressively through the day. A berm that supported a high-speed entry on pass 10 may have partially collapsed by pass 40 without visible indication from the approach angle.

**Sand channels** — Repeated passes through a consistent line on flat or descending sand compact the central track into a shallow depression with a firmer floor than adjacent undisturbed sand. Channels offer marginally better traction than undisturbed adjacent sand because the compaction has improved matrix density. However, channels constrain line choice without the sharp wall definition of a hardpack rut — the rider is steered by the channel without the clear edge that would indicate the need to commit or exit. Sand channels on descents accumulate displaced material at the lower end, which can abruptly increase rolling resistance at the channel exit and decelerate the bike without warning.

**Sand whoops** — Parallel transverse ridges formed under repeated braking forces or from wind particle transport across the surface. Sand whoops have rounded, soft profiles with gradual approach and exit slopes — qualitatively different from the steep-face braking bumps of hardpack. At moderate speed, the suspension can absorb whoops if the rider is standing with relaxed arms and bent knees. At higher speed, each successive whoop peak causes the rear wheel to launch briefly, losing traction contact during the airborne phase. The bike accelerates in these brief airborne intervals (no surface resistance), then decelerates abruptly at the next peak contact, creating a forward-pitching oscillation that builds with speed. The correct response to developing whoop oscillation on sand is to reduce speed below the launch threshold — not to brace against the rhythm, which transmits the oscillation through the chassis and amplifies it.

**Wallowing** — A characteristic deep-sand riding behaviour in which the front wheel partially submerges and the bike oscillates laterally in a low-frequency sway as the tyres alternately sink and float through the particle matrix. Controlled wallowing is a normal operational mode for deep sand at flotation-threshold speed, not a failure state. The transition from controlled wallow to committed sinkage is gradual and requires early recognition. Diagnostic signals: increased steering effort (front wheel beginning to plough rather than float), rising engine revs without speed increase (rear wheel beginning to dig), and loss of bilateral symmetry in the sway (the bike tilting consistently to one side as one tyre sinks preferentially). When any two of these signals appear together, maintaining or increasing throttle with an immediate rearward weight shift may recover flotation. Reducing throttle at this point confirms the sinkage.

---

## 7. Conditions Impact

**Dry conditions** — Dry sand is the loose, free-flowing reference state. Individual particles have no cohesion — capillary forces are absent and the matrix has the lowest resistance to displacement. Deep dry sand is the hardest state to ride because there is no compensating cohesion mechanism. Particle mobility is maximum: the rear wheel can displace large volumes of sand very quickly under excessive throttle, making hole-excavation easy and recovery difficult. Fine dry sand produces a dust-like roost cloud behind the rear wheel, which is a reliable pipeline observation cue for surface type identification.

**Damp conditions** — Moisture between sand particles generates capillary tension that increases particle-to-particle friction. This cohesion improves the matrix's resistance to displacement, which in practical terms means better traction: the tyre can generate drive force before the sand flows. Damp sand is the most forgiving riding state on a particle displacement basis — it tolerates more throttle variation and weight movement without sinkage. In most trail sand sections, damp conditions represent the best balance of grip and predictability. The hazard: the transition as the surface dries produces a layered state where dry loose particles sit over the still-damp compacted layer, providing variable traction within a single wheel rotation.

**Wet conditions** — Standing water on sand produces two distinct behaviours depending on drainage capacity. Well-draining sandy soil under rainfall produces the wet compacted state — high grip, firm, approaching soft hardpack in character. Poorly-draining sand in low-lying areas or after sustained heavy rain becomes waterlogged to the point where the particle matrix has near-zero shear resistance, because the water between particles acts as a lubricant rather than a cohesive agent. This waterlogged state is distinguishable from normal wet sand by free water visible on the surface or by the sound under the wheel (splashing rather than sand displacement).

**Wind effects** — Wind dries exposed sand surfaces and redistributes particles, progressively creating wind ripple patterns and altering section depth. Sections that were consistently deep on a previous pass may have been redistributed into shallow patches over a newly exposed base. The inverse — shallow sections filled by wind-driven particle deposition — also occurs. Wind-altered sections cannot be pre-planned from prior experience; a visual scan of the current ripple and depth pattern is required before commitment. The wind direction relative to the trail direction determines whether ridges are perpendicular to travel (resonance risk) or oblique (lower resonance excitation).

---

## 8. Entry / Exit Transitions

**Hardpack to sand** — One of the most significant traction and handling changes in off-road riding. Braking calibrated for hardpack becomes immediately inappropriate on sand: the front wheel digs rather than grips, the rear wheel spins or digs under normal drive load. Speed must be set on the hardpack approach, not within the sand. The transition is typically visually obvious (clear surface change) but kinematically surprising on a rider who has not pre-reduced speed — the change in tyre feel is sudden and coincides with the moment committed deceleration is needed.

**Sand to hardpack** — Exiting sand onto hardpack produces an abrupt increase in rolling resistance and grip. Riders who have adapted throttle to maintain momentum through the sand may be over-throttled at the transition, producing rear wheel spin on the first hardpack contact. Sand packed into tyre knobblies reduces effective tread depth for the first few metres until expelled. The steering transition is also abrupt: the heavy, resistance-laden steering of deep sand gives way suddenly to direct, responsive hardpack steering, and bar inputs calibrated for sand can oversteer on hardpack.

**Loam or grass to sand** — Both loam and grass provide traction through friction and organic structure mechanisms that differ fundamentally from sand's displacement mechanism. The first sand contact surprises riders calibrated to either because the surface yields under the front wheel rather than resisting it — steering becomes lighter and less responsive in a way that reads as front wheel loss rather than as normal sand behaviour. Speed should be reduced before the transition to allow tyre calibration to the new surface feedback.

**Sand to water crossing** — Sand sections followed by water crossings clean sand contamination from tyres. On the far side, the surface is typically wet hardpack, rock, or loam — the traction physics change completely at the far bank and sand technique must be abandoned immediately.

---

## 9. Interaction Patterns & Failure Triggers

**Momentum trap — deep sand deceleration** — Rider enters sand section at adequate speed → section transitions to deep loose sand without visual warning → surface resistance increases → rider reduces throttle rather than maintaining it → rear wheel transitions from displacing to digging → forward speed decreases → sinkage increases under load → bike stalls in hole → momentum cannot be recovered on gradient without physical assistance.

**Crust punch-through — hard-packed to loose sub-layer** — Rider encounters hard-packed sand surface → enters at hardpack-appropriate speed → mid-section the wheel breaks through surface crust into loose sand below → surface transitions from rigid traction to displacement-based → steering goes vague → rear wheel begins digging → rider cannot adjust technique at current speed → momentum loss and bail or tip-over.

**Sand-over-rock sudden deceleration** — Rider identifies sandy surface and enters at sand-calibrated speed → first wheel pass displaces thin sand layer → tyres contact rock base → rock provides rigid traction → abrupt deceleration load applies → if rock base is wet or smooth, front tyre can wash out on the sudden rigid contact → OTB or crash without progressive warning.

**Wind ripple tank-slapper** — Rider enters wind ripple section at moderate speed → front wheel contacts first ridge → brief deflection → rider grips bars firmly (instinctive response) → next ridge impact is transmitted through stiff grip into steering → oscillation frequency approaches front fork resonance → handlebar oscillation escalates → at high amplitude, rider cannot hold bar direction → crash. Prevention: reduce grip pressure to allow free oscillation while actively reducing speed.

**Wet-to-dry transition overshoot** — Rider experiences high grip on wet compacted sand → calibrates entry speed to wet-compacted traction → section transitions from wet to partially dried sand → surface layer is dry loose sand over wet compact base → rider applies wet-compacted braking → front wheel ploughs through dry layer without generating expected retardation → stopping distance exceeds available space → overshoot into feature or terrain boundary.

### Pipeline Identification Notes

`surface.primary_type: sand` confirmed by: sandy colouration and texture (pale tan, orange, white, or grey depending on mineral composition), visible particle displacement pattern under wheel (sand roost from rear tyre), absence of grass, rock, or organic matter as the dominant surface component. Deep loose sand: bowl-shaped depression profiles in prior wheel tracks, slumped edges indicating depth. Hard-packed sand: firmer surface appearance, reduced texture variation, marginally darker colouration. Wet sand: distinctly darker, uniform, no dust roost visible from rear tyre, surface moisture sheen under direct light. Wind ripple: distinctive parallel ridge pattern across the surface, reliably identifiable from above or oblique angle.

`surface.condition: dry` on sand: dust roost and particle spray visible from rear tyre in footage, possible dust cloud in dry conditions, no surface sheen. `surface.condition: wet`: no roost, darker surface, moisture sheen. Wind ripple state: parallel ridge structure identifiable from elevated or oblique footage angles in good lighting.

Audio cues on sand: soft, muffled tyre sound with swishing or rushing quality distinct from hardpack (sharp), mud (squelching), or rock (stone-striking). Rear wheel spin produces a high-pitched tyre hiss combined with sand displacement sound. Deep sand wallowing produces a rhythmic side-to-side swishing pattern. Wind ripple sections produce a rhythmic thump-thump pattern corresponding to ridge contact frequency.

### Observability Notes

**Reliably observable from footage:**
- Sand terrain classification: distinctive surface colour, texture, and particle displacement pattern
- Wet vs dry surface state: sheen, roost pattern, and colouration change reliably identifiable at standard filming distances
- Wind ripple pattern: parallel ridge structure visible from above or oblique angle in reasonable lighting
- Rear wheel spin and roost events: visible and audible from standard filming angles
- Sand berm formation: banked corner walls visible in 3rd-person footage
- Visible sinkage depth in prior wheel tracks when tracks are in frame

**Inferable with caveats:**
- Sand depth below visible surface: partially inferable from degree of wheel sinkage in prior tracks, footprint depth if visible, and transition from flat surface to bowl-shaped depressions. Cannot be confirmed without a depth reference or prior pass observation
- Hard-packed vs loose state: can be inferred from surface texture contrast, colouration, and whether prior tracks show clean edges (compacted) or slumped edges (loose); not reliable at medium camera distances
- Moisture at depth vs at surface: surface condition is observable; whether damp-over-dry layering has developed is not observable from footage

**Cannot be determined from footage:**
- Sand depth at any specific point without a visible track or sinkage reference
- Whether a smooth sand surface is shallow-over-rock or deep loose sand — these produce identical surface appearances
- Exact moisture content below the top 2–3 cm of visible surface
- Whether wind has redistributed section depth since the last rider pass

---

## 10. False Signals / Illusions

**Smooth surface = manageable depth** — A flat, smooth sand surface appears predictable and benign. The absence of visible deformation suggests firm footing. This appearance is completely uninformative about depth: the same smooth surface profile can be 3 cm over bedrock (high traction, firm base) or 50 cm of deep loose sand (momentum-critical, sinkage inevitable at low speed). Riders who have successfully completed shallow sand sections calibrate the smooth surface appearance as "safe", then transfer that calibration to the next smooth section which may be deep. The only reliable depth signal is the front wheel's response on first contact.

**Hard-packed confidence** — A section of hard-packed sand provides traction close to moderate hardpack. Riders who enter at hardpack-calibrated speed feel confirmed in their assessment by the firm response of the crust. The failure occurs when the crust breaks — from sustained loading, a sharp edge, or a transition to looser sand below. The hard-packed crust can fail suddenly: one moment the surface is firm, the next the tyre is in loose sand below the crust, with no gradual transition and no preceding reduction in confidence. The surface confirmed the rider's assessment until the failure point.

**Wet sand = uniformly good conditions** — Wet compacted sand at the beach-firm state is the highest-grip sand state and rewards confident technique. Riders who experience this state calibrate optimistically. The hazard is the uneven distribution of wet vs dry sand through a section: wet zones provide the grip basis, dry zones do not. A corner entry that crosses a dry zone at the apex provides less grip than the wet approach suggested. The colouration difference between wet (darker) and dry (paler) sand is visible in close footage but may not be detectable from approach speed.

**Sand berm reliability** — A well-formed sand berm feels like a hardpack berm: it provides progressive resistance as the bike presses into it, supporting lean angle. Riders who have used a sand berm successfully develop confidence in it and progressively increase speed. Sand berms are structurally fragile: they collapse under sustained load and dry conditions. The berm that supported a high-speed corner on early race laps may have partially collapsed by later laps. Collapse is not visible from the approach angle. The failure mode — sudden removal of lateral support at maximum lean — is high-consequence.

---

## 11. Terrain Demands / Constraints

**Minimum technique required for safe riding** — Commitment to entry speed rather than deceleration mid-section (see DYNAMICS-02); smooth progressive throttle without surges that exceed displacement capacity (see CONTROL-01); rearward weight distribution through the pegs to unload the front wheel (see DYNAMICS-01, BIOMECH-01); braking recalibration for displacement-based surface — earlier initiation, lower threshold force (see CONTROL-11); active visual scanning for colouration changes indicating dry-over-wet layering or depth transitions.

**Tyre equipment** — Sand is the terrain most sensitive to tyre pressure after mud. Reducing to 8–12 psi (from standard trail 14–18 psi) on deep sand dramatically improves flotation by increasing the tyre footprint. Wider rear tyres provide greater particle displacement volume per rotation. Sand-specific knobbly profiles (widely spaced, tall, paddle-style) are optimised for maximum displacement volume per rotation. Standard intermediate trail tyres are functional on shallow sand and hard-packed sand; deep loose sand performance with intermediates is limited by available knobbly volume. Tyre specification is covered in domain-12.

**Coaching pipeline relevance** — Sand failures generate distinctive pipeline patterns. Momentum failures (deep sand sinkage) are the most common and most directly preventable through a single technique change — maintain or increase speed. Traction failures (crust punch-through, sand-over-rock) are lower frequency but higher consequence because the surface confirms the rider's assessment before failing. Stage 6 classification on sand: momentum failures are identifiable by the progressive deceleration and sinkage visible in footage; traction failures are identifiable by sudden deceleration without apparent preceding rider error. Causal chains for sand failures are typically short (one to two links from trigger to outcome) but require specific sand state identification to generate correct coaching counterfactuals.

**Out-of-scope for this entry** — Sand-specific riding technique and drill progressions are covered in domain-05 and domain-06. Throttle delivery and momentum management mechanics are covered in CONTROL-01 and DYNAMICS-02. Weight distribution mechanics are covered in DYNAMICS-01. Tyre selection and pressure optimisation are covered in domain-12. Berm-specific riding technique is covered in FEATURE-05.
