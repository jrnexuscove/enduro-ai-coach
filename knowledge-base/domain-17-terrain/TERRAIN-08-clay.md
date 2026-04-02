---
# ── BLOCK 1: Pipeline Contract ──────────────────────────────────────────────
pipeline_contract:
  kb_type: terrain
  pipeline_enum_value: [clay]             # Exact Stage 4 surface.primary_type value

# ── BLOCK 2: Retrieval Triggers ─────────────────────────────────────────────
retrieval_triggers:
  PRIMARY:                                # Top-ranked when clay surface fires
    stage4_surface_type: [clay]
  SECONDARY:                              # Retrieve when primary fires or these signals are present
    stage6_failure_types: [traction, technique, line_choice, decision]
    stage4_gradient: [gentle_up, moderate_up, steep_up, very_steep_up, gentle_down, moderate_down, steep_down, very_steep_down]
    stage4_surface_condition: [wet, damp, saturated]
    scenario_cues: [dry_clay, slightly_damp_clay, wet_clay, saturated_clay, drying_clay_crust, churned_wet_clay, baked_clay]
  CONTEXTUAL:                             # Background context — retrieve when no closer match
    stage3_intent_category: [climb, descent, trail_ride, technical_section]
    stage4_features_detected: [rut]

# ── BLOCK 3: Content Metadata ────────────────────────────────────────────────
content_metadata:
  topic_id: TERRAIN-08
  title: Clay — Terrain Profile
  domain: Terrain KB
  domain_id: terrain
  scope: "Surface physics, terrain states, and pipeline identification for clay terrain.
    Does NOT cover clay-specific riding technique or drill progressions (see domain-05,
    domain-06), braking or throttle mechanics (see CONTROL-01, CONTROL-11, CONTROL-12),
    engine braking management (see CONTROL-05, CONTROL-16), or tyre selection and pressure
    (see domain-12). Traction physics underlying the moisture non-linearity are covered
    in DYNAMICS-04. Clay in mixed-surface contexts — including clay substrate beneath
    grass, loam, or hardpack — is covered in TERRAIN-10."
  status: draft
  surface_type: clay
  terrain_states:
    - dry_clay
    - slightly_damp_clay
    - wet_clay
    - saturated_clay
    - drying_clay_crust
    - churned_wet_clay
    - baked_clay
  conditions_covered: [dry, damp, wet, saturated]
  traction_range:
    dry: high              # Counterintuitive — dry clay has excellent friction; the inversion from dry to wet is the sharpest of any terrain type
    damp: very_high        # Peak traction state: capillary cohesion maximises inter-particle friction above dry levels
    wet: low               # Rapid non-linear drop as plastic deformation begins; tyre packing compounds traction loss
    saturated: very_low    # Worse than saturated mud in many conditions — clay adhesion traps tyres
  gradient_contexts: [flat, gentle_up, moderate_up, steep_up, very_steep_up, gentle_down, moderate_down, steep_down, very_steep_down]
  failure_types_associated: [traction, technique, line_choice, decision]
  common_misclassifications:
    - mud       # Wet clay and mud share low traction and plastic behaviour; clay has higher particle-to-particle adhesion, lower permeability, and a more extreme dry-to-wet traction inversion
    - hardpack  # Dry clay resembles compacted hardpack visually and in traction character; wet-transition behaviour is fundamentally different and far more severe
    - loam      # Clay-loam mixed surfaces are common; loam has organic content and better drainage; the traction-moisture curve is less steep and the tyre packing effect is lower
  common_mixed_contexts:
    - "clay substrate under grass — hillside grass appears stable; hidden clay saturation produces slope instability on sustained rain without visible surface change"
    - "clay substrate under loam — surface drainage appears good; clay below reaches saturation before visible surface indicators appear"
    - "clay transitioning to mud at corner apex — drainage concentration at apex accelerates saturation; entry may be clay, apex is mud"
  difficulty_range: [beginner, intermediate, advanced]
  regional_terminology:
    UK: ["clay", "sticky clay", "clag", "blue clay", "heavy ground", "clay soil"]
    AU_US: ["clay", "clay soil", "gumbo", "hardpan", "slick clay"]
    note: "'Gumbo' is North American — used particularly in agricultural and trail-riding contexts
      for very sticky, expansive clay that adheres aggressively to tyres, frames, and boots.
      'Blue clay' is UK terminology for dense, moisture-retentive subsoil clay common in
      southern England. 'Clag' in a UK context refers to sticky mud-clay mixes that cling
      to moving parts — the primary hazard is tyre packing. Not uniformly used in formal
      coaching language but may appear in rider descriptions of footage conditions."
  related_topics: [TERRAIN-01, TERRAIN-02, TERRAIN-04, TERRAIN-06, TERRAIN-10, DYNAMICS-04, CONTROL-01, CONTROL-05, CONTROL-11, CONTROL-12, domain-12]
  prerequisites: []
  tags: [clay, plastic-deformation, traction-inversion, tyre-packing, damp-grip, crust, saturation, slope-instability, lowside, clag, gumbo, baked-clay]
  version: 1.0
  last_updated: 2026-04-02
---

# TERRAIN-08 — Clay: Terrain Profile

---

## 1. Surface Physics

Clay is a fine-particle mineral terrain whose traction behaviour is determined almost entirely by a single variable: moisture content. No other common off-road surface produces a more dramatic traction inversion across its moisture range. Dry clay has excellent friction — higher than many riders expect from its smooth appearance. Slightly damp clay is at the absolute peak of its traction envelope: capillary forces between particles create cohesion that genuinely improves grip above the dry state. Wet clay transitions rapidly into a plastic, near-frictionless condition. Saturated clay is frequently worse than saturated mud. This non-linear four-stage response — high, peak, low, very low — is the defining characteristic of clay, and every failure mode and coaching implication for this terrain flows from it.

The physics behind this behaviour are rooted in clay mineralogy. Clay particles are extremely fine — typically 2 micrometres or less — and plate-shaped, with an exceptionally high surface area relative to their mass. In the dry state, particle surfaces carry electrostatic charge that creates resistance to relative movement. This is why dry clay has unexpectedly high friction: it is not simply a loose mineral powder but an electrostatically cohesive solid. In the slightly damp state, a thin water film between particles adds capillary tension — the particles are drawn together by the adhesive properties of water at the particle interface, without the water yet acting as a lubricant. This combination of electrostatic cohesion and capillary tension produces the peak traction state: marginally more grip than dry clay from the same surface.

Beyond the plastic limit — the moisture content at which capillary bonding is overcome by lubricating water — the surface changes mechanism entirely. The clay begins to deform plastically under load: not flowing like a liquid, but deforming continuously at the contact point, like a thick paste under sustained pressure. The tyre no longer rolls on a surface with a fixed friction coefficient; it shears through a deforming medium. Traction drops sharply because the shear resistance of plastic clay is far lower than the surface friction of dry clay, and because the clay deforms around the tyre knobblies rather than providing the mechanical interlock the tread requires.

At full saturation, clay approaches fluid behaviour and acquires a critical secondary characteristic: high adhesion to rubber surfaces. This is what distinguishes wet clay from wet mud as a traction scenario. Mud has relatively low adhesion to the tyre casing and is partially expelled from knobbly gaps by centrifugal force at speed. Clay adheres tenaciously to rubber and fills knobbly gaps progressively without self-clearing. Each wheel revolution pushes more clay into the gaps, and none comes out. The tyre surface transitions from an aggressive knobbly profile to a near-smooth cylinder coated in low-friction clay paste. The rider is now on what is effectively a slick tyre on a plastic low-friction surface — and this failure develops without any single identifiable event. The compound nature of the failure (clay physics on the surface plus clay-packed tyre) produces lower effective traction than saturated mud with the same tyre, and it cannot be corrected by throttle, braking, or weight management.

The sub-surface hazard of clay is qualitatively different from any other terrain type's hidden hazard. Clay is essentially impermeable — water does not drain vertically through it. On hillsides where a clay substrate underlies a more permeable surface layer (grass, loam, thin hardpack), rainfall infiltrates through the permeable layer until it reaches the clay. With no downward drainage path, water accumulates at the soil-clay interface and progressively saturates the material above. While the surface may continue to look stable — even appear dry on top — the clay interface below has become a plastic shear plane. Under lateral load from a traversing rider, the entire overlying surface layer can begin to slide as a unit over the clay base. This is not traction loss in the conventional sense: it is terrain failure. The mechanism is abrupt and provides no warning readable from the visible surface. Stage 11 coaching safety validation must treat this as a block, not a coaching scenario.

---

## 2. Terrain States

**Dry clay** — Fully desiccated clay with moisture content below the plastic limit. Surface is hard, rigid, and typically marked by shrinkage cracks — visible networks of fine or broad fractures corresponding to the clay mineral's volumetric contraction as moisture has evaporated. Colour is pale: tan, buff, grey, or orange-red depending on iron content. Traction is high and consistent, comparable to compacted hardpack. No surface deformation under wheel load. Visual ID: cracked surface texture and pale colouration are the most reliable identifiers. Unique failure mode: riders who have ridden the same surface in dry conditions develop calibration confidence that does not transfer across the moisture boundary. Dry clay's visual appearance does not change significantly when moisture content begins rising. The rider may not detect the transition to slightly damp and then to wet until a traction event occurs.

**Slightly damp clay** — Moisture content at or near the plastic limit: sufficient capillary cohesion present, no plastic deformation yet. This is the peak traction state. The surface is marginally grippier than dry, and the knobbly tyre engages with a surface whose microscopic particle-level cohesion provides higher friction than the dry particle surface alone. Colour is slightly darker than dry clay; surface sheen is absent; no visible deformation under wheel pass. Visual ID: intermediate colour relative to dry and wet; no cracking, no sheen — the least visually distinctive state. Unique failure mode: riders who experience slightly damp clay as their calibration baseline set their technique to a traction level that is available only at this specific narrow moisture range. Rain that pushes moisture beyond this threshold reduces grip non-linearly, while the rider's visual cue for transition is minimal. Overconfidence built on the peak state is worse than overconfidence built on the dry state, because the peak state provides the highest traction that will be available at any subsequent moisture level.

**Wet clay** — Moisture content exceeding the plastic limit; visible plastic deformation under load. Wheel passes leave retained impressions that do not spring back. The surface appears darker and may show a slight sheen. Traction drops sharply relative to dry and damp states: the front wheel begins to push rather than tracking, and the rear wheel requires less throttle than expected to initiate spin. Tyre packing begins in this state. Clay adheres to the tyre surface; knobbly gaps fill progressively. A tyre that was delivering adequate traction on first contact loses effective knobbly depth through the section without any external surface change, without any event, and without any feedback to the rider. Unique failure mode: tyre packing is a system-state drift, not an incident. The rider's technique is unchanged, the surface is unchanged, but the traction capacity of the tyre decreases with each revolution. The failure arrives without a trigger event — the consequence of a progressive process that is invisible from inside the ride.

**Saturated clay** — Clay at or approaching its liquid limit; surface deforms continuously and significantly under wheel load. Free water may be visible at or near the surface. Colour is very dark — near-black in iron-rich clay. Deep wheel impressions retained with clean tread detail. Traction is very low. The clay adhesion mechanism now actively resists tyre departure from the surface: the tyre sinks into the impression it makes under cornering load, reducing the contact patch geometry and eliminating lean-angle-based cornering force generation. Unique failure mode: restart failure from stationary. Unlike saturated mud, where the tyre can sometimes find marginal drive through the shear layer, saturated clay's adhesion traps the rear wheel in its own impression. Throttle drives the tyre downward rather than forward: the adhesion exceeds the centrifugal force that would otherwise expel packed clay. The tyre excavates rather than drives. Restart from stationary on a gradient in saturated clay is effectively impossible without physical intervention.

**Drying clay crust** — A surface layer of clay that has dried and hardened over a still-wet or plastic substrate. The upper few millimetres are rigid and provide momentarily high friction at initial contact. Below the crust, clay is at or above the plastic limit. Visually, this state presents as dry clay — pale, cracked, firm-looking. Initial wheel contact feels grippy. Unique failure mode: the crust punch-through is a combined-load event. The crust fractures under maximum wheel load — which occurs at the moment of maximum braking or at corner entry when the fork is loaded. The traction transitions instantaneously from dry-clay-high to wet-clay-low at the exact moment of peak applied force. No other clay state combines maximum load and instantaneous traction collapse in a single event. The rider has zero recovery window because the failure occurs in the same instant as the load input.

**Churned wet clay** — Wet clay that has been mechanically worked by repeated wheel passes, foot traffic, or equipment contact. The internal structure of the plastic clay has been disrupted into a near-homogeneous paste with minimal shear resistance at any depth. The surface is glossy and uniformly dark. Knobbly penetration does not encounter any firmer particle matrix below the shear layer — the same disrupted paste continues at every depth. Traction is at its minimum for the clay surface type. Unique failure mode: progressive sinkage under light loads. Unlike saturated mud, where the tyre can sometimes skim the shear layer, churned wet clay's adhesive properties actively pull the tyre into the surface. Under drive load, the rear wheel sinks with each rotation: traction consumed vertically, not used for forward progress. Ground clearance is consumed progressively and silently.

**Baked clay** — Summer-hardened clay that has undergone extended dehydration well below the plastic limit — potentially years of accumulated hardening on path surfaces. The surface is extremely rigid, often harder than typical hardpack, and shows characteristic small-scale cracking (surface crazing) and angular micro-fragment formation at the surface. Traction is high and consistent, very similar to compacted hardpack. Unique failure mode: the delayed wetting transition. Heavily dehydrated clay develops a hydrophobic surface character — the desiccated particle structure initially repels water rather than absorbing it. Under the first minutes of rainfall, the surface may feel and perform identically to its dry state while remaining effectively waterproofed. Once wetting penetrates — when sustained rainfall overcomes the hydrophobic resistance — the clay absorbs moisture rapidly and the transition from rigid to plastic occurs faster than in normally moist clay, and across a wide area simultaneously. The rider's calibration is set for a surface that was accurate and was apparently still accurate at the beginning of the rain event. The transition arrives without warning signs that could prompt recalibration.

---

## 3. Bike Behaviour

**Traction delivery** — Dry and slightly damp clay deliver traction through surface friction augmented by electrostatic and capillary particle cohesion. The tyre rides on a surface whose particle-level binding provides resistance to shear loading under cornering and drive inputs. In wet clay states, this mechanism fails as plastic deformation replaces fixed surface friction. Tyre compound sensitivity on clay differs from other surfaces: on dry clay, intermediate and hard-compound tyres perform adequately because surface friction is high regardless of compound. On wet clay, soft compound tyres show modest advantage through better rubber-to-particle adhesion, but this advantage is substantially overwhelmed by the clay's progressive plastic behaviour and the tyre-packing effect.

**Break-away characteristics** — Dry clay break-away is abrupt — similar to polished hardpack in character. The transition from grip to slide is rapid, with limited progressive warning. Wet clay break-away is qualitatively different and in some respects more insidious. The tyre begins to plastically deform the surface before reaching a conventional friction limit — effective traction decreases progressively rather than holding to a threshold and failing abruptly. The rider may perceive increasing front push or rear slip as a warning signal, but the available correction time is shorter than this progressive onset implies because: (1) throttle reduction in plastic clay does not produce a traction recovery — the surface is already deforming, and (2) the tyre-packing effect may have reduced the tyre's traction capacity independent of the surface state.

**Tyre packing** — The dominant operational difference between clay and mud behaviour. Mud-spec tyres are designed for maximum knobbly spacing and mud-clearing through centrifugal and self-cleaning mechanisms. These mechanisms are partially effective in mud. In wet and saturated clay, clay's adhesive properties overwhelm self-clearing: the clay adheres to rubber surfaces more aggressively than it separates under centrifugal force at normal riding speeds. Knobbly gaps fill progressively and remain filled. A fully packed tyre on wet clay has the traction characteristics of a smooth cylinder on a low-friction plastic surface — effectively zero lateral resistance and very low longitudinal friction. This failure occurs invisibly: neither the rider nor the pipeline can observe knobbly packing directly in footage. Observable indicators are indirect: traction loss that is disproportionate to apparent surface state and applied technique, and absence of the normal clay-spray pattern from the rear tyre (which disappears when the tyre is packed and no longer displacing material).

**Braking performance** — Dry clay supports braking performance comparable to moderate hardpack. Wet clay reduces braking performance sharply and non-linearly. The combination of plastic surface deformation and tyre packing creates a braking surface that offers near-zero mechanical interlock. Threshold braking technique calibrated for dry conditions produces early wheel lock on wet clay because the traction envelope has contracted dramatically. Locked wheels on wet clay do not produce the sharp vibration feedback of hardpack lockup — the wheel slides through the deforming clay with reduced vibration and noise, making the locked-wheel state difficult to identify through feel alone. This is the inverse of the feedback that makes hardpack threshold braking manageable: the signal that lockup has occurred is reduced at the same moment the consequences are more severe.

**Rear wheel behaviour** — Under drive in dry and slightly damp clay, the rear wheel delivers strong, consistent traction with good drive force and predictable responses to throttle variation. Under drive in wet clay, the rear wheel excavates rather than drives: the clay deforms under the knobbly rather than providing resistance. The practical consequence is that the rear wheel's drive contribution drops dramatically at the moisture transition, while the rider's throttle input remains calibrated to the dry-state drive response. This mismatch — constant throttle, reduced drive — produces unexpected rear wheel spin before the rider has adjusted. In saturated clay, rear wheel spin under drive digs the tyre progressively deeper rather than clearing and finding the surface — excavation rather than spin.

**Suspension behaviour** — Dry and baked clay transfer suspension inputs similarly to hardpack — rigid surface, no absorption. Wet clay partially absorbs suspension inputs by deforming under impact, making terrain feel softer underfoot than it is in terms of traction. This softness is a false signal: the comfortable suspension feel is deformation, not compliance. The actual grip is lower. Riders who interpret soft suspension feel as improved surface conditions miscalibrate toward wet clay's compliance, then discover the traction deficit at the next cornering or braking input.

---

## 4. Technique Implications

**Moisture-state identification before entry** — Clay's dramatic moisture non-linearity makes surface state identification before entry the highest-priority technique element for this terrain type, above all others. The visual cues — colour, surface texture, cracking pattern, visible sheen — must be read before committing to a section. A rider who cannot identify which clay state they are entering should assume wet clay (the lower-traction state) and adjust from there. The cost of assuming dry when it is wet is a traction event. The cost of assuming wet when it is dry is reduced pace. The asymmetry in consequences dictates the conservative assumption.

**Tyre packing management** — Once tyre packing begins in wet clay, recovery requires a surface that can mechanically clear the packed clay from the knobbly gaps: coarse aggregate, rock, or a water crossing. No mid-section technique adjustment restores a packed tyre. When packing is suspected — based on disproportionate traction loss — the technique adjustment is not a correction of the tyre state; it is a compensation for it: reduce corner speed to within what a near-slick tyre on a low-grip surface could manage, avoid aggressive corner-exit throttle, and extend braking points to allow for reduced retardation.

**Throttle management on wet clay** — Smooth, progressive throttle is more critical on wet clay than on mud, because wet clay's adhesive properties mean that rear wheel spin does not result in lost traction with a chance of recovery — it results in progressive excavation. The correct response to incipient rear wheel spin on wet clay is throttle reduction to allow the wheel to re-engage with the surface. Unlike mud, where brief spin on the shear layer may allow the tyre to find a firmer substrate below, clay has no firmer substrate below the plastic layer — the same material continues at any depth to which the tyre can reasonably penetrate.

**Braking recalibration** — The transition from dry to wet clay is the most critical braking recalibration event in clay terrain. Riders who have established braking points on dry clay — or who are arriving from hardpack that transitions to clay — have calibrated for a surface that no longer exists. Braking initiation must move substantially earlier. In wet clay, the preferred approach is to set speed on any adjacent better-grip surface and arrive at the wet clay at a manageable speed, relying on clay-surface braking only for final fine adjustment, not for primary deceleration.

**Line selection** — On wet clay, line choice is determined by surface state rather than geometric advantage. A geometrically shorter line through saturated churned clay is inferior to a longer line on slightly damp clay. Pale colouration indicates drier clay; dark, reflective areas are wetter. Outside corner edges may have less drainage accumulation and better clay state. On hillside trails with clay substrate, the preferred line avoids the fall-line traverse because lateral force on a slope with clay-substrate hidden hazard creates the most adverse loading direction for slope stability failure.

---

## 5. Gradient Interaction

**Uphill clay** — Dry and slightly damp clay on a gradient is excellent climbing terrain: high grip allows confident throttle and aggressive drive. The failure scenario is weather change during a ride — a climb that was rideable on the way up can be in a fundamentally different state by the time of return descent. Wet clay on a gradient compounds every clay traction problem: gradient demands more throttle, which increases the risk of rear wheel excavation; falls on gradients produce higher-energy impacts and tumble distance; and the surface offers reduced braking authority for speed management before the section.

**Downhill clay** — Dry clay supports braking comparable to hardpack. Wet clay on a descent is among the most hazardous terrain combinations in off-road riding for a rider expecting hard-surface braking performance. Braking precision is reduced; alternative retardation through engine braking (see CONTROL-05, CONTROL-16) is effective but provides less fine modulation than wheel braking. The preferred approach on wet clay descents: initiate speed management before the wet section on whatever better-grip surface precedes it, use engine braking as the primary retardation method within the section, and apply rear brake with feathering force only as a supplement — enough to contribute to deceleration without approaching the low traction threshold.

**Off-camber clay** — Off-camber wet clay is qualitatively different from off-camber hardpack. On hardpack, off-camber traction fails abruptly when the lateral friction limit is exceeded. On wet clay, the failure mechanism is plastic deformation: lateral wheel load causes the clay to deform in the downhill direction, creating a progressively deepening lateral groove that channels the tyre toward the fall line. Counter-steering into the slope increases lateral load, which accelerates the deformation. The result is a failure mode that develops under the rider's attempt to correct it. Off-camber wet clay should be treated as technically unrideable at speed — deliberate, low-speed navigation with a foot down is the appropriate approach, not traction management.

**Hidden clay substrate — slope stability** — The mechanism described in Section 1 applies most critically to hillside gradients. Clay substrate under permeable surface layers on slopes creates a potential slope instability condition under sustained rain. When the clay interface is saturated, the entire overlying layer is on a plastic shear plane. A rider applying lateral or downhill force to this section creates loading that can initiate or accelerate slope sliding. This scenario is a safety constraint for Stage 11 coaching safety validation — it is not a traction challenge to be addressed with technique coaching. The pipeline must flag steep-gradient clay terrain in sustained wet conditions as a potential terrain-failure scenario, not merely a low-traction scenario.

---

## 6. Rut Behaviour

**Clay rut formation** — Clay ruts form through plastic deformation of the surface under wheel load rather than through particle displacement into rut walls (as in mud). The result is typically sharper-edged and smoother-walled ruts than mud, because clay deforms without significant particle dispersal. Fresh clay ruts retain the tread pattern of the tyres that formed them as exact impressions in the plastic surface — a diagnostic visual indicator visible in close footage as a tread-mirror texture on rut walls and floors.

**Wet clay rut walls** — Wet clay rut walls have near-zero lateral resistance, like churned mud, with an additional characteristic: the walls adhere to the tyre casing rather than simply pushing against it. A front wheel that contacts a wet clay rut wall encounters a surface that grips the rubber rather than deflecting it. This can produce a suction-like lateral arrest of the front wheel in deep clay ruts, distinct from the loose-material contact of a mud rut. Extracting the front wheel from a clay rut wall requires more force than a mud rut and produces a more abrupt lateral correction when the wheel releases. At speed, this release can produce a sudden counter-steer event.

**Drying rut edge hazard** — When clay ruts partially dry at the surface, the rut edges develop a thin hard crust over a soft interior. Footpeg or lower-panel contact with this edge feels solid and provides apparent support — then the crust fractures and the contact point drops into soft clay. This abrupt edge collapse can lever the bike sideways more violently than either fully wet clay (no support, load distributed) or fully dry clay (solid support, consistent force). The half-dried rut edge is the highest-risk rut-edge contact condition for clay terrain.

**Rut depth assessment** — Clay ruts are the most difficult rut type to depth-assess from approach footage. Colour contrast between rut interior and surrounding clay surface is low; both are the same material at similar moisture states. Depth inference depends on shadow and oblique lighting cues that are rarely available in typical footage conditions. The pipeline should treat clay rut depth as not determinable from most footage and assign `feature.severity: unknown` when Stage 4 detects rut features on a clay surface without a reliable reference for scale.

---

## 7. Conditions Impact

**Rainfall timing and rate** — Light intermittent rain on dry clay may produce the drying-crust-punch-through state if rainfall is insufficient to wet the full surface depth but sufficient to restore surface moisture. Heavy sustained rain drives clay through wet to saturated states. The rate of traction degradation on clay under rain is faster than on any other common off-road surface — a section that was dry-clay-grade at event start can reach saturated state within one to two hours of moderate rainfall in clay-dominant soil terrain. Event timing awareness is critical for coaching contextualisation.

**Drainage concentration** — Clay is essentially impermeable. Surface water runs off along the path of least resistance rather than percolating through. Corner apices, low points, and cross-trail drainage paths accumulate water on clay surfaces faster than equivalent positions on permeable surfaces. Within a single section, some areas will reach saturation while adjacent areas remain slightly damp. The worst clay traction point at any trail section is always at the drainage convergence point — typically the apex of a corner that doubles as a low point in the cross-sectional profile.

**Freeze-thaw** — Clay undergoes more significant volume change under freeze-thaw cycling than other terrain types, because fine particles have high water retention and the volumetric expansion of water on freezing disrupts the particle matrix. Post-thaw clay can be softer and more plastic than pre-freeze clay at the same moisture content, because freeze-thaw disruption has increased porosity and reduced particle packing density. This temporary elevated-plasticity state may persist for days after thaw on shaded terrain. The post-thaw state is misclassified as normal wet clay; it is in fact more extreme in its plastic behaviour than wet clay at the equivalent moisture content.

**Summer baking** — Extended dry weather produces baked clay states on exposed sections with remarkable stability and high grip. The same terrain section can be near-unrideable in wet conditions and race-track quality in summer. Riders who have experienced only one seasonal state of a clay trail have no accurate calibration for the other.

---

## 8. Entry / Exit Transitions

**Hardpack to clay** — Dry clay and dry hardpack share surface appearance closely enough that the transition is frequently not recognised until wheel contact. At speed, a rider is unlikely to identify the surface change from hardpack to dry clay before the transition is complete. In dry conditions, this is low-consequence — the surfaces behave similarly. In wet conditions, the stakes are high: braking performance and cornering traction are materially worse on wet clay than wet hardpack, and the transition point provides no visual signal that warrants calibration adjustment.

**Loam to clay** — Wet loam provides moderate-to-good grip through organic particle binding. Wet clay directly below a loam layer produces a tyre punch-through event as the wheel breaches the loam surface into the plastic clay substrate. This is the substrate mechanism behind the `grass_over_clay` and `loam_over_clay` mixed surface contexts in TERRAIN-10. The surface visible from approach does not represent the traction system the tyre will encounter once the surface layer is breached under load.

**Wet clay to hardpack** — Clay-contaminated tyres on hardpack produce an extended period of reduced grip, substantially longer than mud contamination on the same surface. Clay adheres to the tyre casing and persists through many wheel revolutions without self-clearing. A clay-contaminated tyre on dry hardpack has the effective grip of a lightly lubricated hardpack surface — real traction is available but the clay film reduces it materially. Allow more distance than for mud contamination before relying on normal hardpack traction performance after exiting wet clay.

**Clay to water crossing** — Water crossings clean clay contamination from tyres more effectively than driving on dry surfaces, because water lubricates the clay off the rubber surface. However, expelled clay from the tyre can be deposited on any firm base in the water crossing (rock, compacted gravel), degrading grip at the exit point where the tyre returns to a firm surface. The grip degradation at the far bank exit is the more consequential event: the rider may be accelerating away from the crossing at a moment when the tyre is still partially clay-contaminated from the entry.

---

## 9. Interaction Patterns & Failure Triggers

**Dry calibration to wet clay lowside** — Rider pre-rides or scouts section in dry conditions; calibrates corner entry speed and lean angle for dry-clay grip → weather deteriorates during the event or morning dew wets surface → rider arrives at section with unchanged entry plan → wet clay traction is substantially lower than dry calibration → corner entry speed exceeds the available friction envelope → front wheel understeer into plastic surface begins → lean angle correction cannot recover the line → lowside with near-zero progressive warning. The failure is not a technique error in the conventional sense — the rider's technique was appropriate for the surface they assessed. The failure is a calibration that was invalidated by surface state change without an assessment update.

**Tyre packing progressive grip loss** — Rider enters wet clay section with adequate traction on first contact → clay adheres to knobbly tyre surface; packing begins → traction reduces progressively with each wheel revolution as knobbly depth decreases → rider makes no technique changes because there is no incident triggering a reassessment → at approximately 60–80% knobbly fill, corner-exit throttle that was previously generating clean drive now produces rear wheel slip → slip develops into step-out without the buildup of warning cues that would normally precede this failure → lowside without a trigger event the rider can identify or the pipeline can classify as a specific input error.

**Drying crust punch-through combined-load failure** — Section presents with pale, drying appearance; rider assesses as dry clay → corner entry braking applied at dry-clay threshold → wheel load reaches maximum for the corner entry → surface crust fractures under the combined braking and cornering load → tyre drops through crust into plastic wet clay → traction transitions instantaneously from high (dry crust) to very low (wet clay) at the exact moment of maximum applied load → rider has no recovery window because the failure occurs in the same event as the maximum load application → front wheel washes out → crash at corner entry with no observable error preceding the fall.

**Clay substrate slope instability** — Hillside trail with permeable surface layer (grass, loam, thin soil) over clay substrate. Surface appears stable with normal traction → sustained rain over preceding hours saturates the permeable layer, water accumulates at clay interface → clay interface becomes plastic → rider traverses section unaware of sub-surface state → transverse or downhill force applied through the tyre → surface layer initiates sliding over plastic clay base → bike is on a moving surface with no traction foundation → catastrophic fall, unrecoverable. This is terrain failure, not traction failure. Pipeline Stage 11 must flag this as a safety block: coaching counterfactuals are not applicable, and the correct output is a safety constraint rather than a technique recommendation.

**Baked clay delayed wetting failure** — Summer or dry-season event on clay terrain; surface appears fully baked, provides excellent grip → light then moderate rain begins → baked clay hydrophobic resistance initially prevents water penetration → rider continues with unmodified technique because surface feel has not changed → wetting front breaks through hydrophobic layer after sustained rainfall → moisture absorbs rapidly → clay transitions from rigid to plastic across a wide area in a short time → rider's technique is calibrated for baked-dry conditions at the moment they have been invalidated → first corner after breakthrough: available grip does not match entry plan → crash.

### Pipeline Identification Notes

`surface.primary_type: clay` is confirmed by: characteristic colouration (pale buff, grey, orange-red in dry states; very dark to near-black in saturated states), shrinkage cracking pattern in dry and baked states, retained tread impressions in wet states with clean tread detail visible in close footage, glossy reflective sheen in saturated states, and clay spray character from the rear tyre — thick, adhesive deposits that persist on lower bike panels rather than the roost spray of loose surfaces.

Audio cues on clay: wet clay produces a distinctive sucking or intermittent popping sound as the tyre releases from the adhesive surface — distinct from the squelching of mud (which is higher-frequency) and from the silence of hardpack. Dry clay audio resembles hardpack (stone-like), which is a misclassification risk.

Misclassification from mud: clay spray has a thicker, more adhesive character; clay deposits on lower bike panels drip less and adhere more than mud deposits; clay surface texture is smoother and more uniform than churned mud at equivalent footage distances. The wet-state distinction may not be reliably achievable from footage without close-frame analysis.

Tyre packing indicator in footage: absence of rear tyre spray or roost in conditions that would normally produce it; uniformly clean lower bike panels despite wet clay surface conditions; this is a late-stage indicator — packing will already be significant by the time it is visible as spray absence.

### Observability Notes

**Reliably observable from footage:**
- Dry vs saturated state: colouration and surface sheen reliably distinguish pale matte dry clay from dark glossy saturated clay at standard filming distances
- Shrinkage cracking in dry and baked states: visible in medium to close footage with adequate lighting
- Retained tread impressions in wet states: visible in close footage when the camera angle shows the surface
- Surface deformation under wheel: visible in 3rd-person footage with clear frame conditions
- Rut presence: visible; smooth-walled clay ruts with tread-mirror impressions identifiable in close footage

**Inferable with caveats:**
- Slightly damp vs dry state: colour is intermediate; sheen is absent in both; inference requires contextual cues (recent weather, drainage context, adjacent wet areas). Cannot be confirmed from footage alone
- Tyre packing: cannot be observed directly; inferable from disproportionate traction loss relative to surface appearance and applied technique, or from absence of expected spray pattern. Requires multi-frame analysis
- Drying crust over wet base: visible surface appearance suggests dry; wet base is not observable. Inferable if recent rainfall is contextually known and drying conditions have been partial
- Clay substrate under other surfaces: not observable; must be inferred from terrain context and regional geology if available

**Cannot be determined from footage:**
- Moisture content at any specific surface point — only approximate state category (dry/damp/wet/saturated)
- Whether baked clay hydrophobic resistance has been overcome by current rainfall — transition not visible until its consequences manifest
- Rut depth on clay terrain — insufficient colour contrast between rut interior and surrounding surface for reliable depth assessment from typical footage angles
- Clay mineralogy — plastic behaviour thresholds differ between clay types (kaolinite, montmorillonite, illite) and are not determinable from footage

---

## 10. False Signals / Illusions

**Dry clay as hardpack** — Dry clay and consolidated hardpack share colouration, surface texture, and braking and traction characteristics closely enough that riders and Stage 4 classification both may not distinguish between them. In dry conditions this is low consequence — the surfaces behave similarly. In wet conditions it is critical: hardpack softens gradually under rain with a relatively linear traction degradation curve, while clay transitions sharply to a plastic state in a non-linear fashion. A rider who has mentally classified the surface as hardpack and encounters clay's wet-response curve has applied the wrong model to their situation without being able to identify the moment of error.

**Slightly damp clay as reliable conditions** — The peak traction of slightly damp clay creates a genuinely excellent riding surface that rewards confident technique. Confidence in this state is earned by real grip. The hazard is the narrow moisture window this state occupies: additional rain moves the surface from peak grip to significantly reduced grip, and the visual difference between the peak state and the early-wet state is subtle enough that the rider's assessment does not update. The rider's technique is calibrated to a traction level that no longer exists, on a surface that appears unchanged.

**Smooth surface = reliable surface** — Clay that has been repeatedly trafficked in wet conditions develops a smooth, polished-looking surface from the plastic deformation of particles under wheel loads. This smooth surface appears processed and therefore predictable. The traction reality is the inverse: rough, cracked clay is the dry high-traction state; smooth, glossy clay is the wet low-traction state. The visual cue that reads as "settled and safe" is the indicator of the lowest-traction condition available on this terrain type.

**First-pass grip as section calibration** — In the transition between slightly damp and wet clay, the first wheel contact on a fresh part of the surface may feel adequately grippy — the tyre is engaging with clay that has not yet been plastically deformed at that exact location. Subsequent passes through the same point work the clay and reduce resistance. Riders who commit to a speed based on first-pass feel and then make multiple passes — as in repeated cornering practice or a race with multiple laps — find that later passes through the same section have substantially lower traction than the initial assessment suggested.

---

## 11. Terrain Demands / Constraints

**Minimum technique required for safe riding** — Surface state identification before entry through visual assessment (see Section 2); braking recalibration for current moisture state with earlier initiation and lower threshold force (see CONTROL-11, CONTROL-12); smooth progressive throttle to avoid rear wheel excavation (see CONTROL-01); tyre packing awareness with compensatory technique when suspected; standing position with active peg weighting for lateral balance management without steering over-correction (see BIOMECH-01, BIOMECH-03). Clay-specific skills above and beyond these fundamentals cannot compensate for wrong moisture-state assessment.

**Coaching pipeline relevance** — Clay failures are mechanistically distinct from mud failures despite surface appearance overlap. The moisture non-linearity, tyre-packing failure mode, crust punch-through failure chain, and clay-substrate slope instability each require clay-specific causal chain construction in Stage 8. Stage 6 classification on clay: traction failures on wet clay are frequently misclassified as technique failures because the surface can appear rideable in footage. The correct causal chain for a clay lowside identifies surface state (wet or saturated clay) as the primary root cause when the failure occurs at speeds that would be appropriate for the surface's dry-state traction level. Stage 11 must apply a safety block for the slope instability scenario — this is the one clay failure mode that cannot be addressed by coaching.

**Tyre equipment** — Clay makes simultaneous demands on tyre compound and tread architecture. Hard-compound tyres lose clay-surface grip faster than on hardpack and have very limited grip on wet clay. Soft compound tyres improve dry-clay and wet-clay performance through better rubber-to-particle adhesion and greater rubber compliance against the clay surface texture. Open knobbly spacing delays tyre packing but does not prevent it in sustained saturated conditions. The combined optimal specification for wet clay is soft compound with maximum knobbly spacing. Tyre selection and pressure are covered in domain-12.

**Out-of-scope for this entry** — Clay-specific riding technique and drill progressions are covered in domain-05 and domain-06. Braking technique and threshold identification are covered in CONTROL-11 and CONTROL-12. Throttle control mechanics are covered in CONTROL-01. Engine braking is covered in CONTROL-05 and CONTROL-16. Traction physics underlying the moisture-dependency behaviour are covered in DYNAMICS-04. Tyre selection and pressure are covered in domain-12. Mixed clay-surface contexts — clay substrate under grass, loam, or hardpack, and clay transitioning to mud — are covered in TERRAIN-10.
