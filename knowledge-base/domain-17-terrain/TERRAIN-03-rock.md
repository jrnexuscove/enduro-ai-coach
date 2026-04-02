---
# ── BLOCK 1: Pipeline Contract ──────────────────────────────────────────────
pipeline_contract:
  kb_type: terrain
  pipeline_enum_value: [rock]           # Exact Stage 4 surface.primary_type value

# ── BLOCK 2: Retrieval Triggers ─────────────────────────────────────────────
retrieval_triggers:
  PRIMARY:                              # Top-ranked when rock surface fires
    stage4_surface_type: [rock]
  SECONDARY:                            # Retrieve when primary fires or these signals are present
    stage6_failure_types: [technique, traction, line_choice, decision]
    stage4_gradient: [moderate_up, steep_up, very_steep_up, moderate_down, steep_down, very_steep_down]
    stage4_surface_condition: [dry, damp, wet]
    scenario_cues: [exposed_bedrock, boulder_field, rocky_trail, rock_garden, rock_slab, loose_rock_over_base, wet_rock, moss_algae_covered_rock, broken_jagged_rock]
  CONTEXTUAL:                           # Background context — retrieve when no closer match
    stage3_intent_category: [trail_ride, climb, descent, obstacle_clear, technical_section]
    stage4_features_detected: [rock_garden, step_up, step_down, ledge]

# ── BLOCK 3: Content Metadata ────────────────────────────────────────────────
content_metadata:
  topic_id: TERRAIN-03
  title: Rock — Terrain Profile
  domain: Terrain KB
  domain_id: terrain
  scope: "Surface physics, terrain states, and pipeline identification for rocky terrain.
    Does NOT cover riding technique on rocky terrain (see domain-05, domain-06), or
    obstacle-specific technique for rock gardens, ledges, and step features (see FEATURE-03,
    FEATURE-08). Shale is classified as a distinct terrain type with different lateral
    traction physics — see TERRAIN-07."
  status: draft
  surface_type: rock
  terrain_states:
    - exposed_bedrock
    - boulder_field
    - rocky_trail
    - rock_garden
    - rock_slab
    - loose_rock_over_base
    - wet_rock
    - moss_algae_covered_rock
    - broken_jagged_rock
  conditions_covered: [dry, damp, wet]
  traction_range:
    dry: moderate     # Highly variable: rough granite = high; smooth limestone = moderate; lichen = near-zero
    damp: low
    wet: low          # Smooth/polished rock = very_low; rough/textured rock = low
  gradient_contexts: [flat, moderate_up, steep_up, very_steep_up, gentle_down, moderate_down, steep_down, very_steep_down]
  failure_types_associated: [technique, traction, line_choice, decision]
  common_misclassifications:
    - shale     # Shale is sedimentary and laminated — dramatically lower lateral traction; separate entry TERRAIN-07
    - gravel    # Gravel is loose aggregate that displaces under wheel load; rock is solid or embedded
    - hardpack  # Rocky hardpack — embedded stones in compacted soil — may appear similar to rocky trail at low resolution
  common_mixed_contexts:
    - "rock with mud pockets — traction switches mid-section without visual warning at approach speed"
    - "loose rock over hardpack base — surface rocks are mobile; behaves like coarse gravel despite appearing embedded"
    - "rock garden transitioning to shale — lateral traction drops sharply at the geological boundary"
    - "wet bedrock sections within otherwise dry trail — localised near-zero traction zone inside high-grip surrounding terrain"
  difficulty_range: [intermediate, advanced]
  regional_terminology:
    UK: ["rock", "rocky", "stone", "technical", "boulders", "choss"]
    AU_US: ["rock", "rocky", "chunky", "tech", "chunder", "loose-over-hard"]
    note: "'Chunder' is Australian slang for loose rocky surface material. 'Choss' is UK
      and climbing-community terminology for loose, friable, or decomposing rock. 'Technical'
      in UK trail-riding context often implies specifically rock or root terrain rather than
      any difficult terrain generally."
  related_topics: [TERRAIN-01, TERRAIN-07, DYNAMICS-03, DYNAMICS-07, BIOMECH-01, BIOMECH-04, CONTROL-01, CONTROL-05, CONTROL-11, CONTROL-12, FEATURE-03, FEATURE-08]
  prerequisites: [BIOMECH-01, BIOMECH-04]
  tags: [rock, rocky, bedrock, boulder, rock-garden, slab, technical, deflection, traction, line-choice, pinch-flat, lichen, wet-rock]
  version: 1.0
  last_updated: 2026-04-02
---

# TERRAIN-03 — Rock: Terrain Profile

---

## 1. Surface Physics

Rock is the only common off-road terrain type that is mechanically rigid across the full range of conditions. It does not deform, compress, or yield under wheel load at any speed a rider can generate. This single property defines everything about how the bike behaves on it and why rock riding requires a fundamentally different physical model from any soft or deformable surface.

The critical physical distinction is between deflection and absorption. On mud, sand, or soft surfaces, impact energy from terrain irregularities is partially absorbed by surface deformation — the terrain yields under the wheel and cushions the contact. On rock, no such absorption occurs. A wheel meeting a rock edge transmits the full impact energy into the tyre, rim, suspension, and chassis instantaneously. The tyre deflects around the edge if contact angle and load are favourable, or deflects away from its intended line if the contact is unfavourable. Lateral front wheel deflection — the wheel being pushed sideways off its planned path by a rock edge — is the defining failure mechanism of rock terrain. It happens faster than steering input can compensate. This is not a failure of rider reaction time; it is a physics constraint.

Traction on rock is generated through two mechanisms, depending on rock surface character. On rough-textured rock (granite, weathered sandstone, coarse limestone), tyre knobblies mechanically interlock with surface asperities — the same mechanism as hard pack, but the asperities are harder, sharper, and more durable. On smooth or polished rock (limestone slabs, glacially worn surfaces, heavily trafficked bedrock), traction is generated primarily through rubber compound adhesion — the molecular contact between tyre compound and the rock surface. This is why soft-compound tyres perform better on smooth rock than hard-compound tyres: their greater compliance increases molecular contact area and adhesion energy. Knobbly profile matters less on smooth slab than tyre compound softness.

The traction coefficient of rock is more variable than any other terrain type, because it depends on rock mineralogy rather than just surface state. Dry rough granite: approximately 0.6–0.8. Dry smooth limestone: 0.4–0.6. Wet granite: 0.3–0.5. Wet polished limestone: 0.1–0.25. Wet lichen-covered rock: near-zero regardless of rock type. These are approximations; the key principle is that rock traction can span from the highest available on any off-road surface to the lowest possible within a single terrain classification. The pipeline cannot determine rock type from footage — this uncertainty must be built into any Stage 8 confidence assessment.

A further consequence of rock's non-deformation: the surface is essentially permanent between visits. Unlike mud, which degrades through use, or dusty hardpack, which is traffic-dependent, the rock surface at a given section remains consistent across seasons. Experienced riders on familiar rock terrain can pre-plan every major deflection point and traction variation. On unfamiliar rock, this learned precision is unavailable and the rider must execute decisions at speed on terrain that cannot have been rehearsed.

Pinch flat risk is a direct operational consequence of rock's non-deformation. When the tyre contacts a sharp rock edge under load — particularly under braking compression or a hard vertical impact — the tyre casing can be momentarily compressed between the rock edge and the wheel rim. In tubed tyres, this pinches the inner tube and punctures it. In tubeless systems at low pressure, the casing may collapse momentarily. Pinch flats are not traction events — they are mechanical failures that occur at the boundary between technique and equipment tolerance. Their consequence is immediate: the wheel loses pressure within seconds, steering goes vague then collapses, and the rider has no meaningful recovery window mid-rock section.

---

## 2. Terrain States

**Exposed bedrock** — The surface is continuous, solid rock for significant extent: a rock face, a geological outcrop, or a substantial ledge section that the trail traverses. No loose material, no intervening soil. The rock surface is either in its natural weathered state (rough texture, surface cracks, mineral variation) or in a polished state from sustained tyre traffic and natural abrasion. Visually: consistent mineral colouration (grey, brown, orange, or white depending on geology), surface may show bedding planes, crack networks, or glacial striations. Traction is determined primarily by rock type and surface condition. Dry rough bedrock is the highest-traction rock state. This is the reference state for rock terrain physics.

**Boulder field** — The terrain is dominated by large discrete boulders (>30 cm in any dimension) that require the rider to navigate between, over, and around individual rocks rather than following a defined trail surface. Ground between boulders may be soil, hardpack, or further rock — all are secondary to the boulder placement as the defining challenge. Line selection is the primary cognitive task: the rider is solving a three-dimensional sequence puzzle at speed, committing to a path through a boulder arrangement. Each decision locks in multiple subsequent decisions. Falls in boulder fields have above-average consequence: the landing surface is composed of the same immovable obstacles the rider was navigating.

**Rocky trail** — The most common rock classification in trail footage. A defined trail surface — hardpack, loam, or compacted earth — through which rocks of various sizes (fist-sized to melon-sized) are embedded or protrude. The dominant surface is non-rock, but the rocks are frequent enough to determine bike behaviour. Visually: recognisable trail corridor with protruding stones creating irregular surface texture. Traction baseline is set by the non-rock substrate, but deflection events occur at each significant rock contact. The distinction from gravel: these rocks are too large to displace under wheel load, are embedded or too heavy to move under tyre contact, and function as fixed obstacles rather than loose aggregate.

**Rock garden** — A discrete, high-density rock section where the dominant surface becomes the rocks themselves rather than any substrate between them. Distinguished from boulder field by the typically smaller individual rock size (fist to head-sized rather than body-sized) and by the presence of a defined entry and exit that makes line-planning a distinct event. This terrain state overlaps with the FEATURE-03 (rock garden) classification. When Stage 4 classifies the surface as `rock` and detects `feature_type: rock_garden`, both this Terrain KB entry and FEATURE-03 should be retrieved. Surface physics are consistent with exposed bedrock; the pipeline signal from this state is the finite, committed, high-density nature of the section.

**Rock slab** — A large, smooth, continuous rock surface with minimal surface texture: glacially polished limestone, worn sandstone paving, or any flat rock face where mechanical texture interlock has been eliminated by natural polishing or traffic wear. This is the highest-consequence wet state in rock terrain. Dry traction on clean slab is moderate and consistent — compound adhesion functions adequately. Wet traction on smooth slab is near-zero on limestone and very low on other rock types: a continuous water film over a smooth surface eliminates compound adhesion and provides no mechanical interlock for knobbly tyre tips. Rock slabs on gradient descents, combined with wet conditions, represent one of the most hazardous localised terrain features available in off-road riding. Visually: the smooth surface is detectable as a flat or near-flat reflective area under good lighting or at oblique angle, but at approach speed it is not reliably distinguishable from textured dry rock.

**Loose rock over base** — Surface rocks of modest individual size (fist to melon-sized) that are not embedded in the substrate and can be displaced or rotate under wheel contact. Mechanically, this behaves similarly to coarse gravel but with larger, heavier particles — the wheel cannot cleanly displace them but they can rotate or shift laterally under load, particularly on gradient. Traction uncertainty is high: a rock that appears embedded and stable may rotate under the rear wheel at corner-exit throttle, or shift laterally under the front wheel on corner entry. This state is common on approaches to natural rock features where weathering has scattered surface debris, and on loose-over-compacted terrain where the surface material has not yet been bedded in. It is the primary driver of the `common_mixed_context`: "loose rock over hardpack base."

**Wet rock** — Any of the above states under wet or damp conditions, classified separately because wet conditions change rock traction physics fundamentally and non-linearly. On rough-textured rock (granite, coarse sandstone), mechanical knobbly interlock is partially maintained through a thin water film — grip is degraded but not eliminated. On smooth rock (polished limestone, worn slab), a continuous water film lubricates the tyre-rock interface and eliminates adhesion on surfaces too smooth for mechanical engagement. Wet rock coated with lichen or algae produces near-zero traction regardless of rock type: the organic layer is itself essentially frictionless when wet. Visually: wet rock is darker and more reflective than dry; surface sheen is reliably visible in 3rd-person footage at medium distance. Lichen and algae are visible as discolouration (grey-green, orange-black, pale growth patches) in close footage but are not reliably distinguishable from clean wet rock at typical approach distances.

**Moss / algae covered rock** — Biological surface layer (moss, algae, or lichen growth) over rock of any base type. This is a distinct terrain state from wet rock because the biological coating changes the traction mechanism entirely: the organic layer acts as a lubricant film that cannot be displaced by tyre contact, regardless of how aggressively the tyre engages with the surface. Grip is near-zero when wet — significantly worse than clean wet rock of the same base type — and highly inconsistent, because patches of biological growth may be interspersed with clean rock within a single line. The tyre crosses a growth patch and loses traction momentarily, then regains it on the adjacent clean surface; this abrupt transition is more hazardous than uniformly low traction because the rider's calibration cannot track it. Dry moss provides marginal grip through blade-tip mechanical interlock with knobbly tread, but any moisture — light drizzle, dew, or stream spray — is sufficient to collapse this marginal grip to near-zero. Common in shaded woodland, stream beds, north-facing terrain, and seasonal wet-climate riding. The critical distinction from wet rock: clean wet rock retains partial grip through rough surface texture; moss and algae covered rock does not, because the biological layer covers the texture entirely. Visually identifiable at close range by green, dark-green, or black discolouration on rock surfaces, and by a matted or velvet-like surface texture. At typical trail approach distances, moss and algae patches are not reliably distinguishable from shadow, wet rock, or discoloured stone.

**Broken / jagged rock** — Fragmented, angular rock with sharp edges and highly inconsistent contact geometry. Unlike rock slab or embedded bedrock where the contact surface is continuous and predictable, broken jagged rock presents a different edge angle at every contact point. The tyre cannot roll smoothly across the surface — it glances off edges, drops into voids between fragments, and encounters unpredictable lateral forces at each contact. This produces a high frequency of micro-deflection events through the chassis, accumulating into instability under momentum that cannot be corrected by steering alone. Traction is variable within the state: a knobbly sitting in a void between two fragments has near-zero resistance to lateral movement; the same knobbly on a fragment top may have adequate grip. The high incidence of sharp edges significantly increases tyre damage risk — pinch flat probability is elevated compared to all other rock states, and sidewall cuts from sharp fragment edges are a specific risk. Common in quarry terrain, eroded rocky climbs, and shattered escarpment terrain. The distinction from boulder field: boulder field rocks are large and discrete, requiring navigation between or over them; broken jagged rock is fragmented across the riding surface continuously, offering no clean path around individual contacts.

---

## 3. Bike Behaviour

**Traction delivery** — Rock delivers traction through compound adhesion and surface mechanical interlock. Because the surface is rigid, the tyre contact patch does not spread into the terrain as it does in mud — contact area is defined purely by tyre casing deflection and wheel load. Traction is consistent within a rock state but changes abruptly at transitions between states (rock type change, wet zone, lichen patch). There is no progressive traction degradation on rock the way there is in mud. The surface either provides traction or it does not, and the transition between states can occur within a single tyre rotation.

**Deflection behaviour** — The defining bike behaviour on rock. When the front or rear wheel contacts a rock edge at any angle, the wheel is deflected. Vertical deflection (edge compresses the tyre upward) produces a chassis pitch event and front-end rise or drop. Lateral deflection (edge redirects the tyre sideways) moves the wheel off its intended line. Lateral front wheel deflection is the primary failure mechanism: the tyre is pushed off line, and the steering input required to correct occurs after the deflection force has already been applied. At low speed, the deflection is manageable — the rider has time to correct, and gyroscopic stability brings the wheel back toward its original vector. At higher speed, the same deflection produces a line change that has committed the bike before correction is possible. The practical implication is that rock terrain has a lower controllable speed ceiling than appearance suggests.

**Rear wheel behaviour** — Under drive, the rear wheel on rock generates traction through the same compound adhesion mechanism as the front. Under braking, the rear wheel is susceptible to locking because the braking limit on rock is lower than riders calibrated for hardpack expect. A locked rear wheel on rock does not slide progressively — it skips and bounces off successive rock edges, interrupting the braking force and producing an irregular, difficult-to-control skid event. Locked rear wheel on a rocky descent is a common chain step leading to front wheel overload and line loss. Engine braking is the preferred retardation mechanism on rocky descents: it produces smooth retardation without lock risk and remains consistent as the wheel rolls across varied rock contacts (see CONTROL-05).

**Front wheel behaviour** — The front wheel on rock must continuously track its line against deflection inputs. Maintaining direction across repeated rock contacts requires the wheel to self-correct through gyroscopic stability between deflections — which it can do if bar grip is relaxed enough to allow the wheel to move with rock contacts rather than resist them. Tight grip transmits deflection forces through the bars into the rider's arms, generates fatigue, and creates steering oscillations as the rider over-corrects each deflection. Relaxed grip with bent elbows allows the deflection to pass through the system without generating a correction error. This grip mechanic is more critical on rock than on any other terrain type (see BIOMECH-04).

**Suspension behaviour** — Rock delivers the highest-frequency, highest-magnitude suspension inputs of any terrain type. Individual rock contacts at speed can produce immediate full-travel compression events. Repeated contacts create a continuous high-frequency oscillation with occasional high-amplitude spike inputs. Suspension tuning for rock (firmer compression damping to prevent bottoming, controlled rebound to avoid kick-back between contacts) differs from soft-surface tuning. A bike set up for mud or sand riding will typically be under-damped on rock at speed — the suspension rebounds between contacts and produces a bounce-back that compounds the next impact rather than recovering cleanly. This coaching detail matters because a bike poorly set up for rock terrain will perform worse than the rider's technique would otherwise produce.

**Braking performance** — Braking on dry rough rock is moderate but requires recalibration from soft-ground technique. The braking friction coefficient is lower than hardpack but higher than wet surfaces. The key difference from hardpack is surface discontinuity: as the wheel rolls across rock contacts on a rocky trail, it momentarily leaves the ground between rocks or encounters different rock surfaces with different traction coefficients. This makes precise threshold braking on rock significantly harder to maintain. The preferred technique is to brake before rock sections rather than within them, arriving at a speed that requires only light modulation within the section, rather than relying on mid-section braking precision that the surface cannot support.

---

## 4. Technique Implications

**Vision and line pre-planning** — Rock demands further-ahead vision than any other terrain type. On soft surfaces, a minor line deviation can be corrected within the section with steering input. On rock, once the front wheel is committed to a vector, deflection events will occur before steering input can compensate. The line must be identified and committed to before the wheels reach it. Riders who focus on immediate foreground rock contacts are constantly responding after events rather than anticipating them. The correct visual technique looks two to four bike-lengths ahead, planning the sequence from that distance and allowing immediate foreground contacts to fall within peripheral attention only.

**Bar grip and arm position** — Relaxed grip is not optional on rock; it is the mechanical requirement for surviving deflection events without injury or crash. Tight grip transmits rock deflections into the rider's arms, fatigue accumulates rapidly, and steering overcorrections develop as the arms resist rather than absorb the deflections. Correct arm position: bent elbows, light grip (firm enough to steer, not firm enough to lock against deflection), forearms roughly parallel to the ground. See BIOMECH-04 for the full grip mechanics and active absorption principle. This is the single most important technique variable for rocky terrain.

**Speed calibration** — Rock has an optimal speed range that is narrower than soft-surface terrain. Too slow: the wheels lack enough rotational momentum to roll over rock edges — they deflect instead, and the suspension does not have sufficient incoming velocity to stay compliant. The bike stalls on rock contacts rather than rolling over them. Too fast: deflection events exceed the rider's absorption capacity, and the frequency of rock contacts prevents steering recovery between deflections. The optimal speed is that at which the suspension can absorb rock contacts sequentially without rebound interference between them. This is typically lower than the equivalent perceived-safe speed on hardpack.

**Line commitment** — Partial commitment on rock is more dangerous than full commitment to an imperfect line or full withdrawal before the section. Entering at speed and then losing confidence mid-section produces the worst outcome: speed is too high for controlled deflection management, momentum is too low for the bike to roll over contacts cleanly, and throttle reduction shifts weight forward to unload the front wheel precisely when front wheel tracking matters most. If a line is chosen, it should be executed at the speed it was planned for. The abort decision must happen before the section entry, not within it.

**Weight distribution** — Neutral to slightly rearward on rock, particularly on descents and through boulder sections. Rearward bias allows the front wheel to rise slightly over rock edges rather than driving directly into them. However, extreme rearward bias on flat or uphill rock lifts the front wheel and eliminates its traction entirely — the bike is balancing on the rear wheel on a surface where the rear wheel is also at traction risk. Neutral standing weight through the pegs, with the chest positioned just behind the rider's natural midpoint, is the correct reference position for rocky terrain.

**Line selection** — Rock line selection is not about surface state variation (as in mud) or dust avoidance (as in hardpack) — it is about geometry. The objective is a path that minimises the angle and severity of edge deflection events and avoids smooth or wet surfaces where traction is uncertain. Specifically: prefer rounded rock surfaces over sharp edges, prefer rough-textured surfaces over smooth, prefer embedded rocks over loose, and prefer rolling over rock tops rather than threading past rock edges. In rock gardens, the line that approaches each rock roughly perpendicularly avoids the lateral deflection problem and allows the wheel to roll over rather than deflect off.

---

## 5. Gradient Interaction

**Uphill rock** — Rock climbs are qualitatively different from hardpack or mud climbs. Traction is not the limiting factor on dry rock (as it is in mud) — momentum management and wheel placement are. Front wheel deflection on a steep uphill rock section can redirect the bike off the intended line and into a rut edge, rock wall, or unstable position. Loss of line on a steep uphill rock climb typically means a static stop, and restarting from rest on a steep rocky incline has high bail probability. Uphill momentum should be treated as irreplaceable: do not sacrifice it for minor technique corrections that can wait until lower-gradient sections.

A specific uphill hazard on smooth rock: rear wheel spin under hard throttle. Unlike mud, where sustained spin maintains some rotational traction attempt, rear wheel spin on smooth rock is a complete traction loss event. The tyre breaks free of compound adhesion and rides on the surface film — recovery requires throttle reduction and a stationary restart, which on a steep incline is likely to fail. Smooth progressive throttle with early detection and correction of spin onset is the correct technique (see CONTROL-01).

**Downhill rock** — Rocky descents are the highest-consequence riding scenario in this entry. Three risk factors compound: deflection events from rock contacts, braking difficulty on a discontinuous surface, and gravity. Speed management requires braking before the rocky section, light modulation within it using engine braking as the primary retardation force, and avoiding threshold braking on rocky surfaces where wheel skip interrupts brake force unpredictably. The common failure: rider carries hardpack-calibrated entry speed into rocky descent, applies brake, rear wheel locks and skips between rock contacts, braking force becomes irregular, speed exceeds the controllable threshold, front wheel overloads at corner entry — OTB. See CONTROL-05 for engine braking management and CONTROL-11, CONTROL-12 for braking technique references.

**Steep descent on rock slab** — On very steep smooth rock slab, wet conditions produce a near-zero-friction descent scenario where neither wheel has meaningful longitudinal traction. This is genuinely one of the most dangerous conditions available in off-road terrain. The coaching response here is a constraint, not a technique correction: steep wet smooth rock slab is beyond the technique envelope of intermediate riders and requires a decision-layer intervention (Stage 9 coaching strategy), not a technique recommendation.

**Off-camber rock** — Off-camber rock amplifies both the deflection risk and the lateral slip risk simultaneously. The tyre is fighting the lateral gradient while also absorbing lateral deflection from rock contacts. On smooth or wet off-camber rock, the combination of lateral slip tendency and deflection force can produce front-end loss with no recovery window. The pipeline should flag `off-camber` + `rock` + `wet` or `rock_slab` as a compounded high-risk scenario.

---

## 6. Rock Line Navigation

Line navigation on rock is not about ruts or surface state variation — it is about geometric path planning through a three-dimensional obstacle field. The section structure from the default schema (Rut Behaviour) is replaced here with Rock Line Navigation because rut-specific dynamics are not applicable to this terrain type.

**Geometric path planning** — Every rock contact is a deflection event with a vector. The ideal line through a rock section approaches each significant rock edge roughly perpendicularly — the wheel rolls over the rock rather than being deflected by it. Diagonal crossing of a rock edge (shallow approach angle) maximises the lateral deflection component and is the most common source of line loss. Riders who approach each rock edge at a shallow angle are continuously generating lateral deflection inputs; riders who approach perpendicularly allow vertical roll-over to absorb the contact.

**Rock top vs rock edge** — On individual boulders or protruding embedded rocks, the choice between rolling over the rock top and threading past the rock edge is the fundamental line decision. Rock top: the wheel rolls up one face and down the other, producing a vertical deflection (suspension event) with minimal lateral component. Rock edge: the wheel strikes the side of the rock, producing maximum lateral deflection and the highest pinch flat risk. Where approach momentum is sufficient to roll over the rock top, this is always the preferred option. Threading past the edge is only correct when rolling over is impossible — for rocks too tall, too angled, or too close together.

**Sequence planning in rock gardens** — Rock gardens require planning the line as a sequence, not as a series of independent decisions. Each rock contact affects the bike's speed, direction, and balance state going into the next contact. A line that handles rock one optimally but places the wheel at a poor approach angle for rock two is inferior to a slightly longer line that handles both cleanly. This requires visual pre-planning at the section entry and sufficient visual lead time through the section to see the next two to three contacts. In race conditions without preview, this demands maximum forward vision and acceptance that the first pass through an unfamiliar rock garden will be slower than subsequent passes.

**Gaps and voids** — In boulder fields and rock gardens, gaps between rocks can trap the front wheel. A wheel dropping into a gap between boulders can produce an immediate OTB event: the wheel stops, the bike continues forward over it. Gap identification requires visual lead time and proactive line adjustment. Gaps are most hazardous at higher speeds where reaction distance is insufficient to steer around a gap identified at close range.

**Momentum threshold** — There is a minimum momentum threshold for rock section navigation below which the wheel cannot roll over rock contacts and instead deflects through them. This threshold increases with rock size and decreases with tyre size and casing compliance. The non-monotonic speed-controllability relationship means that coaching for a rocky section failure must first identify which side of the threshold the rider was on: under-speed failures produce tip-overs and foot-down events; over-speed failures produce deflection crashes with high-consequence outcomes.

---

## 7. Conditions Impact

**Dry conditions** — Dry rock is the reference state. Traction is determined primarily by rock type and surface texture, not by a condition modifier. Rough dry granite or sandstone provides the highest available friction coefficients on rock. Dry smooth limestone ranges from moderate (textured) to low (polished). Dry rock slab provides consistent compound adhesion. This is the state in which rock's non-deformation property is most manageable — the physical properties are predictable, and line choice is the primary determinant of outcome.

**Damp conditions** — A thin moisture film begins to reduce traction through partial lubrication of the tyre-rock interface. On textured rock, damp has relatively limited effect — mechanical interlock still operates through the thin film. On smooth rock, even a light damp condition creates a marginal lubricating effect that is difficult to detect by feel until it has produced a traction event. Damp rock is the most deceptive condition: it appears visually similar to dry rock, the first contacts feel near-identical, but the margin between controlled and sliding has narrowed significantly. Riders calibrated to dry conditions on the same section are at specific risk under damp conditions.

**Wet conditions** — Full wet on rock creates a fundamentally different physics state. On rough-textured rock, mechanical interlock through knobbly tips is partially maintained — grip is degraded but not eliminated. On smooth or polished rock, a continuous water film eliminates both adhesion and interlock simultaneously, collapsing traction to near-zero. This transition from damp to fully wet is non-linear: grip does not reduce proportionally with moisture level. The critical threshold is when the water film becomes continuous across the tyre contact patch — at that point, traction collapses rather than continuing to degrade gradually.

**Algae and lichen** — Biological surface growth on rock is the most hazardous invisible risk in this terrain type. Algae and lichen form on shaded, damp rock surfaces and create a near-zero-friction coating when wet, by covering the rock micro-texture that would otherwise provide mechanical interlock. The organism reduces traction to effectively nothing regardless of underlying rock type. At approach speed, lichen appears as a colour variation — grey-green, orange-black, pale growth patterns. At typical trail footage distance, lichen is not reliably distinguishable from clean damp rock. The pipeline should flag `wet` + `rock_slab` or `exposed_bedrock` as carrying possible lichen risk even without confirming lichen presence.

**Frost and ice on rock** — A thin ice coating on rock is not visually distinguishable from wet rock and produces near-zero traction in any direction — worse than lichen-covered wet rock because ice provides no mechanical resistance whatsoever. This is primarily a late-autumn and early-spring risk at altitude or on north-facing shadowed surfaces. The pipeline should consider ice as a possibility when `surface_condition: wet` coincides with environmental temperature cues suggesting sub-zero conditions.

---

## 8. Entry / Exit Transitions

**Hardpack or trail to rock** — Immediately upon entering a rock section, suspension behaviour changes from soil-damped inputs to rigid impacts. Braking, grip, and steering calibration set for hardpack are incorrect for rock at the moment of entry. Braking calibrated for hardpack may immediately lock the wheel on the first significant rock contact; bar grip calibrated for smooth surface will transmit the first deflection into the rider's arms before the rider has readjusted. This recalibration requires several wheel rotations to establish, which means the first metres of any rock section are the highest-risk zone regardless of rider experience. Speed reduction should happen on the approach to the rock section, not at the entry.

**Rock to mud** — Exiting rock into mud combines two risk factors simultaneously. The chassis is in rock mode (absorbing high-frequency rigid inputs) and suddenly encounters a surface that provides neither mechanical constraint nor predictable friction. Speed carried from rock into mud is typically too high for the available mud traction. Braking should occur on the last solid rock before the mud boundary, not after entering the mud. Tyre surfaces contaminated with rock grit or mud from rock pockets also carry reduced grip onto the transition surface until they self-clear.

**Rock to shale** — The highest-consequence terrain type transition within the rock group. Shale looks like rock but has dramatically lower lateral traction and can delaminate or chip under tyre load (see TERRAIN-07). A rider carrying rock-calibrated speed and lean angle into shale is immediately over the lateral friction budget. This transition is listed in `common_misclassifications` and must trigger TERRAIN-07 retrieval whenever Stage 4 suggests this geological boundary.

**Wet rock to dry rock** — A positive traction step, but one that requires awareness of tyre surface state. Tyres contaminated with algae, fine grit, or mud from a wet rock section carry reduced grip onto the dry section until they self-clear through several tyre rotations on abrasive dry surface. The first dry rock contacts after a wet section should not be loaded at full traction threshold.

---

## 9. Interaction Patterns & Failure Triggers

**Front wheel deflection chain** — Rider enters rocky trail at speed calibrated for hardpack → front wheel contacts rock edge at oblique angle → lateral deflection redirects the front wheel off planned line → rider applies steering correction but the deflection has already committed the wheel's vector → bike continues off-line → secondary rock contact at the new, unplanned angle → compounding deflection event → OTB or collision with boulder. The deflection-correction-deflection cycle is the primary mechanism by which rock failures escalate. Each correction made at the wrong moment creates a new deflection event on an unfavourable line.

**Rocky descent speed misjudgment** — Rider descends rocky section at speed appropriate for hardpack → braking threshold applied → front and/or rear wheel contacts rock edge under braking load → wheel skips → braking force briefly interrupted at contact → bike accelerates momentarily past braking threshold → rider applies more brake to recover → repeated skip-brake-skip cycle develops → corner arrives with excess speed → front wheel overloads on entry → OTB or front push.

**Pinch flat sequence** — Rider enters rock section at correct speed → compression event over significant sharp rock edge drives tyre casing against rim under braking or vertical impact load → tube pinches against rim (or tubeless casing collapses) → puncture → front tyre pressure drops over one to four wheel rotations → steering becomes imprecise, then vague, then collapses → rider goes down with minimal warning, typically mid-section.

**Line commitment failure** — Rider identifies a line through rock garden → approaches at planned speed → mid-section, a rock appears larger or more hazardous than anticipated → rider reduces throttle and begins to alter line → throttle reduction shifts weight forward and unloads the rear → line change redirects front wheel to a rock edge not on the planned path → deflection at reduced speed produces tipping or OTB. The coaching note: partial commitment on rock is frequently more dangerous than executing an imperfect line at planned speed.

**Wet rock overconfidence** — Rider has ridden this section previously in dry conditions → arrives to find damp or light-wet rock → applies dry-calibrated technique → corner entry at full dry-section lean and speed → front wheel on smooth or polished rock under combined lateral and braking load → traction is 30–50% lower than dry → front wheel washes out with near-zero warning → lowside. The predictive failure: the rider is using a calibration built on a surface that no longer exists under current conditions.

### Pipeline Identification Notes

`surface.primary_type: rock` confirmed by: rigid surface without visible deformation under wheel pass, rock faces or stone surfaces visible in terrain, absence of mud spray or loose particle displacement, high-frequency chassis pitch and suspension compression events visible in footage indicating rigid impact. Rocky trail: embedded stones visible protruding from a defined trail corridor. Boulder field: large discrete obstacles requiring navigation. Rock garden: dense close-spaced rock section with defined entry and exit. Rock slab: smooth, continuous rock surface visible as flat or near-flat area extending across the camera field of view.

`surface.condition: wet` on rock: dark colouration with visible sheen or reflective surface. `surface.condition: damp`: subtle darkening without full reflective sheen — less reliably observable. Lichen and algae: colour variations on rock surface (grey-green, orange-black patches) — may be visible in close overhead footage, not reliably distinguishable at typical filming distance.

Audio cues on rock: stone-striking sounds from tyre contact (higher-pitched, sharper than hardpack impact sounds); chassis rattle at medium-to-high speed; rhythmic regularity of sounds in a rock garden distinguishes it from isolated rock contacts on a rocky trail. Absence of all soft-surface sounds: no mud squelch, no sand hiss, no surface deformation audio.

### Observability Notes

**Reliably observable from footage:**
- Rock terrain state: embedded vs loose vs slab vs boulder field at medium-to-close camera distance
- Wet vs dry surface: sheen and dark colouration on wet rock is consistently visible in standard filming conditions
- Rock contact events and resulting chassis deflection or pitch
- Wheel skip or bounce pattern on rocky sections — visible as chassis oscillation
- Approximate rock size and density (rocky trail vs rock garden vs boulder field)
- Whether rider approaches rock section at high or appropriate speed relative to rock density

**Inferable with caveats:**
- Approximate traction level: rough textured dry = moderate-high; smooth slab = moderate to low; wet = low. Exact coefficient unknown without rock type
- Rock type from surface colour and visible texture at close camera distance (granite: coarse-grained, speckled; limestone: pale, sometimes banded; sandstone: orange-brown, layered) — misclassification risk is significant, especially at medium distance
- Lichen or algae presence: distinctive greenish-grey or orange discolouration may be visible in close or overhead footage; not confirmable from approach-angle footage
- Whether a gap or void trapped the wheel (visible in overhead 3rd-person footage, not in POV)

**Cannot be determined from footage:**
- Rock mineralogy and precise friction coefficient for the specific surface
- Lichen vs clean wet rock: both appear as dark, matte, non-reflective surface at distance
- Whether a specific rock is firmly embedded or sitting loose on the surface
- Exact rock edge sharpness (sharp vs rounded)
- Tyre pressure at the time of entering the rock section
- Whether a pinch flat was the cause of a crash unless post-event wheel deformation is visible

---

## 10. False Signals / Illusions

**Smooth rock = safe rock** — Smooth, rounded rock surfaces look more benign than jagged, rough rock. Riders associate visual surface smoothness with manageable terrain — the same mental model that causes overconfidence on polished hardpack. The traction physics invert this expectation: rough-textured rock provides mechanical interlock through knobbly tips engaging with surface asperities; smooth rock relies on compound adhesion, which is both lower in absolute value and more sensitive to moisture. A perfectly smooth pale rock slab is a higher-consequence traction scenario than a jagged rough granite face. Riders who use visual texture as a traction proxy will systematically miscalibrate for smooth rock.

**Dry appearance on damp rock** — Rock transitions into the damp traction state before it produces a visual damp appearance on rough surfaces. The first moisture from misting, light drizzle, or dew wets the surface and reduces traction without producing the visible sheen that riders associate with wet conditions. On textured rock, the visual transition from dry to damp is subtle or absent until moisture levels are already significantly elevated. The first indication of damp rock on a rough surface is often the first traction event, not a visual pre-warning. On smooth rock, sheen appears earlier but may still lag behind traction degradation.

**Rock hardness = stability** — Riders familiar with soft-surface instability (gravel shifting, mud deflecting) associate rock with solidity. This is valid for embedded bedrock and fixed boulders. It is not valid for loose rock over base, which is mobile and can rotate or shift laterally under braking or cornering load. The visual distinction between firmly embedded rock and loosely placed surface rock is not reliable at approach speed — both appear solid. The consequence of misidentifying loose rock as fixed: the bike loads the rock expecting a fixed deflection event and receives a surface that moves, producing a crash different in character from any rock deflection failure.

**Rock section familiarity overrides condition awareness** — Unlike mud, which changes state visibly between visits, rock is highly consistent from ride to ride. Riders who know a section intimately may use their memory of the section as their primary information source and reduce the observational attention needed to detect current condition changes. A section that was dry on a previous visit may be wet or lichen-coated today. Familiarity suppresses the precautionary scanning that identifies condition-specific risk. This pattern is specific to rock terrain because of its high visit-to-visit physical consistency — the surface condition is the only variable, and familiar riders stop checking it.

**Speed misjudgment through foreshortening** — Steep rocky descents, particularly those approaching the camera at a head-on angle, foreshorten the apparent distance to obstacles and compress the visual difficulty of the descent profile. Riders viewing the descent from the top often underestimate speed requirements and rock spacing. This is also relevant to video analysis: POV descent footage from a helmet camera foreshortens rock contacts significantly, making the approach speed appear more controlled than it was. Stage 8 should apply a correction for this effect when evaluating speed judgments on rocky descents from POV footage.

---

## 11. Terrain Demands / Constraints

**Minimum technique required for safe riding** — Active absorption through ankles, knees, and elbows with relaxed bar grip (see BIOMECH-04); sufficient visual lead time to pre-plan line sequences (at minimum two bike-lengths); speed calibration appropriate to rock density and size (see CONTROL-01); braking adjustment for rock surface — earlier initiation, lighter threshold, engine braking preferred on descents (see CONTROL-05, CONTROL-11, CONTROL-12); full commitment to planned line without mid-section deviation.

**Tyre equipment** — Rock is the surface most sensitive to tyre casing construction. Dual-ply or reinforced carcass tyres significantly reduce pinch flat risk by resisting compression between the rock edge and rim. Tubeless setups with appropriate sealant eliminate most pinch flat events entirely. Tyre pressure on rock has a narrow optimum: too low increases pinch flat risk on edge contacts; too high reduces compound compliance and contact patch conformity on rounded surfaces, decreasing adhesion on smooth rock. Trail rock (rocky trail state) is less demanding on casing than full boulder field or rock garden riding. Tyre specification is covered in domain-12; the pinch flat dependency on casing construction is noted here because it directly determines whether a technique-correct performance is physically achievable on the terrain.

**Coaching pipeline relevance** — Rock failures are well-suited to Stage 6 classification because failure types are mechanistically distinct. Deflection events (technique), speed misjudgment (decision), wet traction loss (traction), and line commitment failure (line_choice) each have different observable indicators in footage. Stage 7 crash type on rock is most commonly OTB (front wheel deflection or washout) or tip-over (low-speed balance failure in boulder field). Causal chain confidence for rock failures is moderate: deflection events are rapid and the precipitating rock contact is often not visible in footage, particularly at higher speeds. Coaching counterfactuals for rock failures typically focus on entry speed, visual lead distance, and bar technique — because the in-section intervention window is too narrow for technique correction once the section is entered.

**Out-of-scope for this entry** — Rocky terrain riding technique and drill progressions are covered in domain-05 and domain-06. Rock garden obstacle technique is covered in FEATURE-03. Ledge and step feature technique is covered in FEATURE-08. Shale, though visually similar to rock, is a separate surface type with fundamentally different lateral traction physics — see TERRAIN-07. Tyre selection and casing specification is covered in domain-12. Suspension response to rigid terrain inputs (deflection vs absorption physics) will be covered in DYNAMICS-03 and DYNAMICS-07.
