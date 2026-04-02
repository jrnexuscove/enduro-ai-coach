---
# ── BLOCK 1: Pipeline Contract ──────────────────────────────────────────────
pipeline_contract:
  kb_type: terrain
  pipeline_enum_value: [mixed]            # Exact Stage 4 surface.primary_type value
                                          # NOTE: this entry should ALSO be retrieved when
                                          # Stage 4 classification confidence is low for any
                                          # single surface type, or when multiple surface types
                                          # are detected within a single clip or section.

# ── BLOCK 2: Retrieval Triggers ─────────────────────────────────────────────
retrieval_triggers:
  PRIMARY:                                # Top-ranked when mixed surface classification fires
    stage4_surface_type: [mixed]
  SECONDARY:                              # Retrieve when multiple surface types detected, or when traction failure occurs
                                          # at a surface that does not match the dominant classification
    stage6_failure_types: [traction, line_choice, decision, technique]
    stage4_gradient: [moderate_up, steep_up, very_steep_up, moderate_down, steep_down, very_steep_down, flat]
    stage4_surface_condition: [wet, damp, dry, saturated]
    scenario_cues: [mud_over_rock, grass_over_clay, sand_over_hardpack, seasonal_transition_zone, hardpack_clay_fade, multi_substrate_trail]
  CONTEXTUAL:                             # Background context — retrieve when no single terrain entry closely matches
    stage3_intent_category: [trail_ride, climb, descent, technical_section, race_section]
    stage4_features_detected: [rut, rock_garden, roots]
    # This entry is a retrieval fallback: when Stage 4 has low classification confidence
    # or detects indicators of multiple surface types, retrieve this entry alongside
    # the highest-confidence single-surface entry.

# ── BLOCK 3: Content Metadata ────────────────────────────────────────────────
content_metadata:
  topic_id: TERRAIN-10
  title: Mixed Terrain — Terrain Profile
  domain: Terrain KB
  domain_id: terrain
  scope: "Surface physics and pipeline identification for terrain sections where no single
    surface type is dominant, or where surface type changes within a section. Does NOT
    duplicate technique or physics for individual surface types — those are covered in
    TERRAIN-01 through TERRAIN-09. Does NOT cover discrete terrain features that overlay
    surface type (see FEATURE entries). Does NOT cover braking, throttle, or engine braking
    mechanics in isolation (see CONTROL-01, CONTROL-05, CONTROL-11, CONTROL-12). The
    Conditions & Adaptation cross-cutting modifier will reference this entry for
    mixed-condition scenarios."
  status: draft
  surface_type: mixed
  terrain_states:
    - mud_over_rock
    - grass_over_clay
    - sand_over_hardpack
    - seasonal_transition_zone
    - hardpack_clay_fade
    - multi_substrate_trail
  conditions_covered: [dry, damp, wet, saturated]
  traction_range:
    dry: variable       # Determined by component surface types and their boundary spacing
    damp: variable
    wet: variable       # Transitions can be more hazardous in wet than either component surface alone
    saturated: variable
  gradient_contexts: [flat, gentle_up, moderate_up, steep_up, very_steep_up, gentle_down, moderate_down, steep_down, very_steep_down]
  failure_types_associated: [traction, line_choice, decision, technique]
  common_misclassifications:
    - Any single surface type — the classification hazard for mixed terrain is that the dominant
      surface appearance is used to classify the full section, while a different surface type
      at the transition point is the actual failure cause
  common_mixed_contexts:
    - "mud_over_rock at varying depth — mud depth over rock varies within a section; same visual appearance produces different traction at different points"
    - "grass_over_clay transitioning to mud at drainage concentration points — surface type changes at the drainage apex of corners"
    - "hardpack_clay_fade with seasonal variation — same section classified as hardpack in summer and clay in spring"
  difficulty_range: [intermediate, advanced]
  regional_terminology:
    UK: ["mixed ground", "technical", "variable surface", "mixed conditions", "changeable trail"]
    AU_US: ["mixed", "variable terrain", "tech terrain", "mixed conditions"]
    note: "No terrain-type-specific terminology. Regional terms are primarily descriptive of
      difficulty or variability rather than of specific surface composition. 'Technical'
      in a UK context often implies a mixed terrain challenge rather than any single
      surface type."
  related_topics: [TERRAIN-01, TERRAIN-02, TERRAIN-03, TERRAIN-04, TERRAIN-05, TERRAIN-06, TERRAIN-07, TERRAIN-08, TERRAIN-09, DYNAMICS-04, CONTROL-01, CONTROL-05, CONTROL-11, CONTROL-12, BIOMECH-01]
  prerequisites: []
  tags: [mixed, surface-transition, traction-change, calibration, hidden-boundary, mud-over-rock, grass-over-clay, sand-over-hardpack, seasonal, multi-surface, line-choice]
  version: 1.0
  last_updated: 2026-04-02
---

# TERRAIN-10 — Mixed Terrain: Terrain Profile

---

## 1. Surface Physics

Mixed terrain is not a single surface type — it is the condition that arises when a rider cannot treat the terrain ahead as having a consistent set of physical properties. The coaching and pipeline challenge of mixed terrain is not the physics of any individual surface; those are covered in TERRAIN-01 through TERRAIN-09. The challenge is the physics of surface transitions: what happens to bike behaviour and rider calibration when the surface type changes within a section, and how that transition creates failure modes that are not present on either component surface alone.

The fundamental principle of mixed terrain physics is that a rider calibrates technique and speed to the surface they have assessed, and applies those calibrated inputs until the next assessment opportunity. On a single-surface section, this calibration is valid throughout. On a mixed-surface section, the calibration becomes invalid at the moment the surface type changes — and the change may occur without any signal that the rider can detect before the transition is committed. The failure is not a technique error on the new surface; it is an application of correct technique for the old surface, on a surface where that technique is wrong.

Surface transitions create traction discontinuities — abrupt step-changes in the available friction envelope — that are categorically different from the gradual variations within a single surface type. A section of hardpack transitioning to wet clay does not present a gradual reduction in grip across the transition zone. It presents hardpack-level grip until the transition point, then clay-level grip immediately after. The rider's inputs — speed, lean angle, braking pressure — were set for hardpack. At the transition point, those inputs are simultaneously applied to a clay surface that cannot support them.

The spatial dimension of this problem is critical. The transition boundary — the physical location where surface type changes — is the point of maximum failure risk. If the transition boundary is visible from a distance that allows adjustment, the risk is manageable. If the boundary is hidden — by a corner, a crest, surface visual similarity, or sub-surface changes without visible surface change — the risk is structural. The rider is committed before they can detect the change.

Sub-surface transitions are the most hazardous category. These occur when the visible surface material is consistent but the substrate below it changes type. Grass growing over clay produces a consistent grass surface appearance while the sub-surface shifts from mineral soil to plastic clay. Sand over hardpack appears as a sandy section while the base material transitions from deep sand to shallow sand over bedrock to direct bedrock contact. The tyre encounters the sub-surface transition without any visual signal at the surface level. These hidden transition boundaries are the defining hazard of mixed terrain, analogous to the way hidden sub-surface voids define the hazard of grass terrain (TERRAIN-04) or unknown depth defines the hazard of sand terrain (TERRAIN-05).

The coaching pipeline must handle mixed terrain differently from single-surface terrain. Single-surface entries allow confident surface-specific physics to be applied throughout the section. Mixed terrain requires that the coaching address the transition point specifically: where it is, when the rider will encounter it, what traction level changes at that point, and what the required technique adjustment is before the boundary — not after it.

---

## 2. Terrain States

**Mud over rock** — Rocky terrain with a mud coating: from a thin film to a layer several centimetres deep. This is one of the most common post-rain mixed states in mountain and woodland riding. The visual appearance can resemble either surface at different depths and lighting conditions. The traction behaviour is determined by whether the tyre can penetrate the mud layer and reach the rock substrate. When the mud is thin (less than knobbly height on the rear tyre — typically under 3–4 cm), the tyre engages the rock through the mud and traction is dominated by the rock surface character, with mud as a lubricant modifier. When the mud is deeper, the tyre rides entirely in the mud layer and rock-surface traction is unavailable. The tyre may still contact individual high rock points through the mud, producing unpredictable grip spikes. Visually: the surface appears darker than dry rock, with a mud sheen; individual rocks visible through the mud coating at shallower depths. Unique failure mode for this state: traction spike under braking from intermittent rock contact. The tyre is operating in mud-physics mode; the rider has mud-calibrated braking; the tyre contacts a rock protrusion through the mud layer — applying a brief high-traction braking force that is greater than the rider's modulation accounted for — the rear wheel skips or the front wheel pitches forward at the rock contact point, within an otherwise mud-traction event.

**Grass over clay** — Grass surface over clay substrate. Visually a grass section; behaviourally a clay section when conditions are wet. This is the defining hidden-hazard configuration for grass-dominated terrain with clay sub-soil — common throughout the UK lowlands, the Midlands, and wherever glacial clay deposits underlie thin topsoil. The grass layer provides authentic grass-surface traction when the grass is intact and the clay below is below its plastic limit. As rainfall saturates the grass layer and the clay below reaches the plastic limit, the traction mechanism changes: the tyre punches through the grass layer on high-load inputs (braking, corner entry, gradient drive) and encounters the plastic clay below. The transition from grass traction to clay traction occurs at the moment of maximum load — the worst possible timing for a traction surprise. On hillsides, saturated clay substrate under grass creates a slope stability risk as described in TERRAIN-08: the entire grass-over-clay section can slide as a unit over the clay interface. Unique failure mode: punch-through under maximum load. On a dry-grass section, heavy braking or corner entry load on a short, steep corner does not punch through the grass because the clay below is firm. The same load on a wet version of the same section punches through the grass into plastic clay at the moment the front fork is maximally compressed — traction transitions at peak cornering or braking force.

**Sand over hardpack** — A thin sand layer over a consolidated hardpack or bedrock base. Behaves differently from deep sand (TERRAIN-05) because the base is accessible under sufficient load, and differently from pure hardpack because the sand layer modifies the tyre interface. When the sand layer is thin enough that the tyre can displace it and reach the base, traction is a mix of sand displacement and hardpack contact — typically lower than pure hardpack but higher than deep sand. When the sand layer is thick enough that the tyre cannot displace it to reach the base, the section behaves as shallow sand. The transition between these sub-states occurs at different sand depths for different tyre types and applied loads. Unique failure mode: hardpack contact under controlled braking. The rider identifies the sand and calibrates to sand-physics braking — early initiation, modulated force, below the sand displacement threshold. Heavy braking force displaces the sand layer and contacts the hardpack base. Hardpack braking traction is substantially higher than sand-calibrated assumption. The front wheel grips more aggressively than expected and transfers load forward. If the rear is still on sand, the rear unloads suddenly. A braking event calibrated as appropriate for sand becomes a pitch event when the hard base is reached unexpectedly.

**Seasonal transition zone** — A section of trail that transitions between surface types at a predictable geographic boundary that changes with season. Common examples: a section that is dry hardpack through summer, begins showing clay behaviour at the drainage point in autumn, and is a full clay-mud section in spring. The geographic transition point — where the surface changes — is typically consistent between seasons, but the surface type on each side of the boundary, and the sharpness of the boundary, changes with season and recent weather. A rider who has ridden the section in one season has accurate knowledge of the transition location but potentially inaccurate knowledge of the current surface types on each side. Unique failure mode: prior knowledge invalidation. The rider who knows the section from a drier season knows where the transition is but not what the current traction on each side of the transition is. Confidence from prior experience is applied to a surface state that has changed. The boundary location knowledge is correct; the surface state knowledge is not.

**Hardpack clay fade** — A gradual transition from compacted hardpack to clay-dominant surface over a distance of several metres to tens of metres. No sharp boundary: the proportion of clay particles in the surface composition increases progressively, and the surface behaviour changes correspondingly. The difficulty is that there is no identifiable moment of transition — the rider cannot point to the metre at which it became clay. Yet at some point along the fade, the surface behaves as clay for the purposes of moisture sensitivity and plastic behaviour under load. In wet conditions, the clay portion of the hardpack-clay surface reaches plastic behaviour while the hardpack portion remains stable — the section appears uniform but has a variable and unpredictable traction coefficient. Unique failure mode: calibration applied to a fade that has already crossed the threshold. On a dry-to-wet transition day, the section that was hardpack-grade this morning has already reached clay-plastic behaviour at the clay-dominant end of the fade by afternoon — but the rider's calibration was set in the morning on the hardpack-dominant entry. The rider enters at hardpack-appropriate speed and encounters clay traction before any visual change signals the transition.

**Multi-substrate trail** — A trail section with multiple distinct surface type zones in close alternating sequence: rock patch, muddy hollow, short hardpack run, grass crossing, clay section — each within a few bike-lengths of the next. The calibration challenge is that there is insufficient distance between zones for the rider to adjust technique to each surface before the next zone begins. The ride is not a sequence of manageable single-surface sections — it is a continuous demand to manage multiple surface physics simultaneously, carrying the calibration of one surface into the next before the adjustment can be completed. Unique failure mode: calibration lag failure. A braking event initiated on a high-traction hardpack zone is still completing when the tyre crosses into an adjacent low-traction mud or clay zone. The braking force applied on hardpack is inappropriate for the next surface. The rider has no option to stop and recalibrate — the sections are too close together for sequential adjustment.

---

## 3. Bike Behaviour

**Traction discontinuity** — The bike behaviour across a mixed-terrain section cannot be characterised by a single traction envelope. Different sections of the same trail present different peak braking forces, different cornering limits, and different drive traction. The rider cannot apply a consistent throttle, braking, or lean angle calibration across the section — each surface zone requires its own parameters. The bike's tyres present the same surface to each zone, but the zone's response to that surface varies. Tyre contamination from one zone affects performance in the next: mud-contaminated tyres on hardpack, clay-packed knobblies on rock, sand-covered tyres on clay. Each transition is a traction event even if the rider's inputs do not change.

**Transition-point wheel behaviour** — The front wheel typically reaches a surface transition before the rear wheel — there is a brief period when the front is on the new surface and the rear is still on the old. During this period, the bike is simultaneously experiencing two different traction regimes. If the front surface offers higher traction than the rear, the front brakes harder or corners sharper than the rear, creating a pitching or rotating moment. If the front surface offers lower traction than the rear, the front loses grip before the rear's grip has reduced, creating a front-wash event with rear grip still available — a scenario that limits recovery options. The interaxle transition period is short at speed but long enough to be the mechanistic origin of mixed-terrain failures.

**Suspension behaviour across transitions** — Surface transition points often coincide with geological or drainage boundaries that also produce physical terrain changes — a rock edge, a soft-ground hollow, a vegetation-line boundary. The suspension input at the transition can compound the traction change: the front wheel encounters a physical step or depression at the same moment it enters a lower-traction surface, loading the fork while traction is simultaneously reduced. This physical and traction compound event is more severe than either alone.

---

## 4. Technique Implications

**Conservative calibration to the lowest traction component** — The fundamental technique principle for mixed terrain is to calibrate speed, lean angle, and braking to the lowest-traction surface type present or likely to be present in the section, and to maintain that calibration throughout rather than re-calibrating at each transition. This principle is conservative and limits achievable pace on the higher-traction zones — but it is the only approach that provides consistent safety margin at transition points, because the rider cannot reliably identify the exact location of each transition before it is committed.

**Transition-point scanning** — Where transition boundaries are visible in advance — a colour change, a vegetation boundary, a surface texture change, a drainage line — the correct technique is to complete any aggressive inputs (braking, corner entry) before the boundary, and to arrive at the transition at a speed and lean angle that the lower-traction surface can support. The transition point itself should be treated as a no-commitment zone: no hard braking, no maximum lean, no aggressive throttle at the exact boundary location.

**Line selection as surface state selection** — On mixed terrain, line choice is primarily a surface state selection decision above all other considerations. A line that keeps the tyre on a consistent surface type for the full length of a manoeuvre is worth a significant geometric disadvantage over a line that crosses multiple surface types at the critical load moments. For example: a corner entry that stays entirely on hardpack to the apex, then crosses to mud on the exit, is preferable to a geometrically superior line that crosses from hardpack to mud at the corner entry point where front tyre load is maximum.

**Accept speed reduction at uncertainty** — When a rider cannot identify the surface type ahead with confidence, the correct response is to reduce speed to within what the lowest-credible-traction surface could support, not to proceed at current speed and plan for a reactive correction. Mixed terrain's fundamental hazard is that the correction window at a hidden transition point is zero — the failure occurs simultaneously with the transition, not after a warning phase. Proactive speed reduction before uncertainty is the only available prevention.

---

## 5. Gradient Interaction

**Downhill multi-surface** — Descent sections that combine multiple surface types present the braking calibration problem in its most consequential form. The rider must set entry speed for the full descent based on the worst-traction surface expected, because braking on a low-traction surface mid-descent cannot compensate for the excess speed generated by over-committed entry. The most hazardous configuration: a high-traction surface at the top of the descent (hardpack, dry rock) transitioning to a low-traction surface at the base (wet clay, mud) at or before the braking zone for a corner. The high-traction entry encourages speed; the low-traction base prevents braking to manage it.

**Uphill calibration mismatch** — An uphill section that begins on a driveable surface (dry rock, hardpack) and transitions to a lower-traction surface mid-gradient (wet clay, mud) creates a momentum-commitment failure. The rider has committed to a line and speed based on the entry surface's drive traction. At the transition, drive traction drops but gradient demand does not. The rider applies more throttle to compensate, which in low-traction surfaces (clay, mud) produces wheel spin or excavation rather than drive. The climb fails at the transition point, not at the start or end of it.

**Off-camber mixed terrain** — The highest-consequence gradient-mixed scenario is off-camber terrain that transitions from a higher-lateral-traction surface to a lower-lateral-traction surface mid-traverse. Off-camber hardpack transitioning to off-camber wet clay or wet shale presents a lateral traction reduction precisely when the off-camber slope requires maximum lateral grip. The transition may not be visible from the approach angle: a hillside traverse that appears visually consistent may cross a drainage line where surface saturation changes the clay content abruptly.

---

## 6. Surface Boundary Dynamics

Surface boundaries — the physical transition zones between surface types — have characteristic properties that are distinct from either component surface. Understanding the dynamics of these boundaries is central to mixed terrain coaching. This section replaces the standard Rut Behaviour section, which is not meaningful for mixed terrain as a category. Rut behaviour for each component surface type is covered in TERRAIN-01 through TERRAIN-09.

**Drainage-line boundaries** — Many mixed terrain transitions occur at drainage lines: the points in the landscape where water flows or accumulates. These boundaries are often consistent in location season-to-season but vary in the sharpness and type of transition depending on current moisture. A trail that crosses a drainage line transitions from drier terrain (upslope) to wetter terrain (at and downslope of the drainage concentration point). At the drainage line, multiple effects converge: surface material may change (accumulated organic matter, clay concentration in depressions), moisture content is higher, and roots and other features may be present at the drainage boundary. The drainage line is often the traction minimum of the section — the point at which the worst-traction condition is concentrated — and it may not be identifiable from the approach as the specific transition location.

**Vegetation-boundary transitions** — Transitions between vegetation types — from grass to woodland floor, from open hillside to shaded corridor, from trail to adjacent meadow — frequently correspond to surface type changes. Woodland floor under trees accumulates organic matter, roots, and seasonal moisture; open grass is more mineral-dominant. The canopy shade at a vegetation boundary creates consistent moisture differential: shaded woodland floor remains wetter for longer after rain than adjacent open terrain. A rider crossing from an open hillside into a woodland trail in wet conditions crosses a surface type boundary and a traction boundary simultaneously. The visual signal — the canopy line — is a reliable indicator of the transition location.

**Geological boundaries** — Geological boundaries produce surface type changes that are consistent in location and often sharp in character. Transitions from sedimentary to igneous rock produce the hardpack/clay to rock transition. Shale seams within otherwise solid rock produce the rock-to-shale transition. These transitions are typically not visible from approach distance at normal riding speed — the colour change that marks the geological boundary may be subtle. They are, however, consistent between visits, which allows pre-knowledge to be an effective mitigation. A rider who knows the geological boundary location can treat it as a fixed transition point regardless of seasonal surface state variation.

**Seasonal and time-of-day migration** — Some surface boundaries are not fixed in location but migrate with season, time of day, or moisture level. The winter boundary between frost-hardened and unfrozen ground moves down the slope as the day warms; the summer boundary between shaded-damp and sun-dry terrain shifts with the sun angle; the autumn transition between still-dry and newly-wet terrain migrates as rainfall proceeds. A boundary that was at metre 50 of a section at 8am may be at metre 20 by midday. Riders on later passes of a section encounter a different transition location than early passes.

---

## 7. Conditions Impact

**Rain events and boundary sharpening** — Rain typically sharpens surface boundaries rather than smoothing them, because rain affects different surface types at different rates. Rock transitions to wet rock consistently across its area. Clay reaches its plastic limit in low-drainage areas before it does in high-drainage areas, creating a sharp boundary between plastic and firm clay within a clay section. Grass over clay punches through in hollows before it does on slopes, creating localised grass-over-plastic-clay zones within an otherwise intact grass section. Post-rain mixed terrain typically has sharper, more abrupt traction transitions than dry mixed terrain.

**Freeze-thaw boundary dynamics** — Freeze-thaw conditions create the most spatially variable mixed terrain because the freezing front advances at different rates in different surface types and substrate configurations. Rock freezes quickly and uniformly. Clay freezes slowly due to high water content. Loam-over-clay freezes at the loam surface while remaining unfrozen at the clay interface. On a mixed terrain trail, a single freeze event can leave some sections frozen, some thawing, and some unfrozen within a few metres of each other. Post-freeze mixed terrain has the most hazardous combination of high apparent grip (frozen surfaces look and feel firm) and unpredictable transitions (unfrozen sections between frozen zones, thaw-layer shear planes). See TERRAIN-08 for clay freeze-thaw behaviour.

**Traffic redistribution** — Traffic on mixed terrain progressively moves low-traction material (mud, clay) from high-traffic zones to low-traffic margins, and deposits high-traction material (rock debris, aggregate) in the traffic line. A well-trafficked mixed trail section may have better traction on the main traffic line than on the virgin surface to either side, because the traffic has cleared low-traction material from the line. Equally, drainage-channel mud accumulation at the base of rock sections creates a transition that gets worse with each event as the mud accumulation builds.

---

## 8. Entry / Exit Transitions

Section 8 is the central analysis section for mixed terrain, because every mixed terrain encounter is fundamentally an entry or exit from one surface type to another. The transitions below represent the most common and most hazardous pairs; they cross-reference the relevant single-surface entries for physics detail on each component.

**Hardpack to wet clay** — One of the highest-consequence transition pairs. Hardpack supports confident braking and lean angle up to the transition point. Wet clay immediately after the transition cannot support the speed or lean angle that was calibrated for hardpack. The transition boundary may not be visually distinct at approach speed, particularly when both surfaces are similarly coloured and the clay has not yet been visibly deformed. Braking distance is extended dramatically — any braking that began on hardpack and continues across the transition encounters traction that is a fraction of the hardpack equivalent. See TERRAIN-02 and TERRAIN-08 for physics of each surface; the transition pair amplifies the consequences of each surface's limitations.

**Rock to mud pocket** — Rocky terrain with mud-filled hollows is a transition that repeats multiple times within a single section. The rock provides confident, moderately high traction between the mud pockets. Each mud pocket transitions the traction from rock-physics to mud-physics for a brief period — potentially a single wheel rotation on a small pocket, several seconds on a deep one. The hazard is the return transition: as the tyre exits the mud pocket onto dry rock, mud contamination reduces rock-surface grip for the first contact after the pocket. The rider cannot simply manage each pocket independently — they must manage each rock zone after a pocket as a contaminated-rock scenario rather than a clean-rock scenario. See TERRAIN-01 and TERRAIN-03.

**Grass to clay** — Grass provides traction through blade-tip friction and root structure. Clay, when below its plastic limit, provides moderate traction. Clay at or above its plastic limit provides near-zero traction. The transition from grass to plastic clay can occur at an invisible surface boundary (at the drainage line), at the clay surface boundary (where the grass layer thins), or as a punch-through under load. In all cases, the transition is from grass-calibrated technique to a clay surface that may be in a plastic state. Riders who are on grass terrain under wet conditions should treat any surface change — colour, texture, vegetation density, footprint retention — as a potential grass-to-clay transition signal and reduce speed proactively. See TERRAIN-04 and TERRAIN-08.

**Mud to rock** — Transitioning from mud riding onto rock is one of the most significant calibration adjustments in off-road riding. Mud-calibrated technique: maximum knobbly penetration, smooth sustained throttle for adhesion-traction rather than surface-friction traction, rearward weight for rear wheel drive, early braking. Rock-calibrated technique: hard surface contact, line precision for deflection management, weight neutral, threshold braking possible. Every aspect of the calibrated technique changes. The transition boundary often occurs at the base of a rock section that follows a muddy approach — the rider arrives at the rock with mud-calibrated technique and must immediately shift to rock technique. Mud-contaminated tyres on rock further reduce the initial rock-surface traction. See TERRAIN-01 and TERRAIN-03.

**Sand to hardpack** — Sand transitions to hardpack at natural terrain boundaries — dune edges, beach approaches, sandy trail endings. The sand requires: displaced-traction physics, high momentum, modulated braking below displacement threshold, rearward weight. Hardpack requires: surface-friction traction, direct steering, threshold braking available, neutral weight. The transition from sand to hardpack produces an abrupt increase in traction that can cause over-steer if the rider's current steering inputs are sand-calibrated (heavy, delayed). The braking change is equally significant: sand-calibrated braking (early initiation, gentle modulation) under-utilises hardpack braking capacity, leaving the rider with excess speed at the point of adequate stopping power. See TERRAIN-05 and TERRAIN-02.

**Wet loam to shale** — Wet loam provides organic-structure traction — resilient, with progressive breakaway. Shale provides plate-slide traction — low lateral, binary failure. A loam section transitioning to a shale zone (common at geological boundaries in trail riding) presents a lateral traction step-down at the transition point. Riders calibrated for loam's progressive lateral response find that shale's binary failure arrives without the progressive warning the loam has been providing throughout the preceding section. The calibration built on loam feedback is a poor model for shale failure behaviour. See TERRAIN-06 and TERRAIN-09.

**Clay to shale** — Clay and shale share low wet traction but fail through different mechanisms: clay through plastic deformation under vertical and lateral load; shale through plate-slide under lateral load. A rider managing wet clay with a technique focused on minimising vertical penetration (weight rearward, smooth throttle to avoid excavation) transitions to shale with a different optimal technique (minimising lateral load through line straightening). The transition requires a simultaneous technique recalibration that cannot be performed at speed without prior identification of the boundary. See TERRAIN-08 and TERRAIN-09.

**Hardpack to sand** — Speed must be set for the sand on the hardpack approach, not after the transition. Any braking or cornering force that begins on hardpack and continues into the sand section is calibrated for hardpack traction. Sand immediately reduces both lateral and longitudinal traction relative to hardpack. Front wheel behaviour changes from direct responsive steering to the displaced-resistance steering of a granular surface. The steering weight change is abrupt and can be misread as front wheel traction loss — causing over-correction that accelerates sinkage in deep sand. See TERRAIN-02 and TERRAIN-05.

**Wet rock to moss-covered section** — Within rocky terrain, the transition from clean wet rock (partial mechanical traction remaining) to moss or algae-covered rock (near-zero traction) is the most hazardous within-surface transition in off-road riding. The traction step-down is extreme: clean wet rock retains perhaps 30–50% of dry traction; moss-covered wet rock retains perhaps 5–10%. The visual signal for the transition — a colour change from grey-brown to dark green or black — is visible in good lighting conditions but unreliable in low light or at approach speed. A rider who has adjusted for wet rock has not adjusted for moss-covered rock. See TERRAIN-03 for full moss-covered rock analysis.

**Frozen surface to thaw zone** — In freeze-thaw conditions, the transition from frozen (apparently firm, low surface friction) to thaw zone (thin mobile layer over frozen substrate) is the highest-consequence surface transition available in off-road riding. The frozen surface confirms the rider's technique with firm feel and adequate grip at low lean angle. The thaw zone transitions the traction mechanism from frozen-surface friction (which exists) to thaw-layer shear (which approaches zero). The transition may occur at a spatial boundary — sun-shadow line, geology change — or may occur at a time boundary as the day warms. In either case, the transition is not reliably detectable before it is committed. See TERRAIN-01 (frozen mud), TERRAIN-08 (clay freeze-thaw), and TERRAIN-04 (frost grass) for component physics.

---

## 9. Interaction Patterns & Failure Triggers

**Calibration overhang — dominant surface fails at hidden transition** — Rider assesses section by dominant surface type visible at approach → entire section calibrated to visible surface → trail crosses hidden transition boundary (drainage line, geological boundary, sub-surface change) → surface type changes without visual signal → rider's technique — speed, lean angle, braking force — is calibrated for a surface that no longer exists → failure at the transition point with no warning phase. The failure chain applies to any surface pair. The probability of failure is determined by: how abrupt the transition is, how different the traction levels are between surfaces, and how close the transition boundary is to a high-load moment (corner entry, braking zone).

**Mud-over-rock depth deception** — Rock clearly visible through a mud coating → rider calibrates for rock traction; reduces speed only marginally from dry rock → mud layer is deeper than the rock-visibility suggests → tyre does not reach rock base during corner or braking load → traction is mud-physics throughout the event → rock-calibrated speed and lean angle exceed mud traction envelope → front wheel understeer in mud, or rear wheel step-out under drive → crash. The mechanism depends on the failure type, but the root cause is consistent: traction was mud-physics while technique was rock-calibrated.

**Grass-over-clay punch-through at maximum load** — Section presents as wet grass: moderate grip, rider reduces speed for wet grass conditions → trail crosses drainage concentration point where clay substrate has reached plastic limit below the grass layer → corner entry applies maximum front fork load → tyre punches through grass layer at the compression peak → tyre contacts plastic clay below → traction drops from grass level to saturated-clay level at the moment of maximum applied load → front wheel washes forward into the clay → lowside. The timing is the critical element: punch-through occurs at peak load because peak load is what breaks the grass layer. The failure cannot be preceded by a warning phase that allows adjustment.

**Sand-over-hardpack braking pitch event** — Rider correctly identifies sandy section; calibrates to sand-physics braking — early initiation, gentle modulated force → mid-braking event, braking force displaces thin sand layer from beneath front tyre → tyre contacts hardpack base → hardpack presents substantially higher braking traction than sand calibration assumed → front wheel grips and pitches bike forward aggressively → load transfers to front; rear wheel unloads → rear tyre on remaining sand loses contact resistance → OTB event. The failure is not the rider's braking technique — it was appropriate for the identified surface. The failure is the sub-surface hardpack generating a traction surprise at maximum braking load.

**Seasonal transition prior-knowledge failure** — Rider has ridden the section in a different season and has accurate route knowledge: the transition boundary location is known; the braking points are established → surface conditions have changed with season (summer hardpack now spring clay, or summer grass now autumn mud) → rider arrives at the known transition point with technique calibrated for the prior-season surface type at that point → current surface type at the transition point is different from the stored calibration → failure at the transition point the rider thought they understood. Prior knowledge is converted from a safety asset to a safety liability when the surface type has changed between visits.

### Pipeline Identification Notes

`surface.primary_type: mixed` should be classified when: no single surface type accounts for more than approximately 60–70% of the visible surface area in the analysed section; multiple surface types are present in close alternating sequence; a known combination exists (e.g., mud in hollows within a rocky trail, grass edges with clay centre); or Stage 4 confidence for any single surface type is below threshold.

This entry should be retrieved as a secondary retrieval alongside the highest-confidence single-surface entry whenever: Stage 4 detects indicators of a second surface type in addition to the primary classification; the section includes known mixed-context combinations from the `common_mixed_contexts` fields of other terrain entries; or the failure event occurs at a visible surface transition point rather than within a consistent surface zone.

Observable indicators for mixed terrain identification: surface colour variation within the section (distinct patches rather than gradual fade); vegetation boundary crossing; drainage line crossing visible as surface moisture differential; surface texture discontinuity (rocky section with mud patches, grass with clay-exposure at tyre tracks). Post-failure indicators: if the crash or traction event occurs at a location that shows a visible surface type change, `primary_type: mixed` and this entry should be retrieved regardless of the pre-crash dominant surface classification.

### Observability Notes

**Reliably observable from footage:**
- Visible surface type boundaries: colour, texture, and material changes within the same section visible in 3rd-person footage with adequate lighting
- Drainage line crossings: moisture differential and vegetation changes at drainage boundaries typically visible at medium distance
- Vegetation boundary transitions: canopy lines, grass-to-woodland boundaries clearly identifiable
- Mud patches within rocky or hardpack terrain: distinctive dark colouration against lighter surface
- Geological colour boundaries: geological surface type changes often correspond to mineral colouration changes visible at medium distance

**Inferable with caveats:**
- Sub-surface transition locations: grass-over-clay and sand-over-hardpack boundaries are not visible but can be inferred from terrain context (hollow shapes, drainage topology, prior wheel track sinkage patterns). Cannot be confirmed without surface investigation
- Seasonal state of a known mixed section: general surface state inferable from visible conditions; specific transition point locations inferable only from geographic analysis, not from footage alone
- Transition boundary sharpness: whether a hardpack-to-clay transition is abrupt or a hardpack-clay-fade can be partially inferred from the visible surface texture change rate. Not reliably quantifiable from footage

**Cannot be determined from footage:**
- Sub-surface material type at any location without a surface breach visible in footage
- Exact spatial location of hidden transition boundaries (drainage-based, geological, sub-surface) — location must be inferred from terrain topology, not from surface observation
- Whether a compacted surface that appears single-type contains a transitioning sub-surface (clay substrate under grass, rock base under sand, frozen layer under thaw surface)
- Whether a transition boundary the rider cannot see is within or beyond the current manoeuvre's commitment point — this is the fundamental pipeline limitation for mixed terrain: the failure-risk location may not be observable in the available footage

---

## 10. False Signals / Illusions

**Dominant surface as section representative** — The surface visible from approach occupies the majority of the visual field and produces the majority of the initial sensory feedback. Riders naturally calibrate to the dominant surface — the one most seen and most felt — and treat it as representative of the section. In mixed terrain, the dominant surface is representative of its zones but not of the transition points and the minority surface zones. The failure is systematically more likely at the minority surface zones, precisely because they are given less calibration weight. The most dangerous element of a mixed section is often the smallest in spatial extent.

**Hidden transition boundary** — The defining false-signal of mixed terrain. A surface that appears visually consistent — same colour, same texture, same general appearance — can contain a transition boundary that is invisible because the change is sub-surface or because the visible surface material is consistent even when the substrate is not. Sand over hardpack, grass over clay, loam over rock, and wet grass over saturated clay all present consistent visible surfaces while hiding transitions that will be experienced by the tyre. The rider's visual scan, which correctly reads the available signals, provides an incomplete picture. The tyre will encounter information that the eye could not provide. This is not a perception failure; it is a structural limitation of surface assessment from above.

**Prior knowledge under seasonal change** — A rider who has ridden a section before applies their stored knowledge of the transition locations and surface types. This knowledge may be accurate for the season and conditions in which it was acquired. When season, weather, or traffic has changed the surface types at those locations, the prior knowledge is a false signal: accurate route geometry, inaccurate surface physics. The confidence generated by prior route knowledge is legitimate; the calibration applied to that confidence is not. Prior knowledge is a strong signal for route geometry (where the transitions are) but a weak and possibly incorrect signal for surface physics at those transitions.

**Consistent feel early in a section** — The opening metres of a mixed section often lie on the dominant surface type. The bike behaviour in these opening metres provides a feel baseline that the rider extrapolates to the rest of the section. If the opening metres are on hardpack and the section has a mid-section clay transition, the rider's calibration is set on hardpack evidence and is extrapolated through the transition zone. The consistent early feel is a real and accurate signal for the surface currently under the wheels — it is only a false signal as a predictor of the next surface zone's behaviour.

---

## 11. Terrain Demands / Constraints

**Minimum technique required for safe riding** — Identification of mixed surface conditions before entry through visual scanning for surface type variation and boundary indicators; speed calibration to the lowest-traction surface type present or credible within the section (see CONTROL-11 for braking); proactive adjustment before transition boundaries rather than reactive adjustment after them; line selection that keeps critical load moments (corner entry, maximum braking) on identified consistent surface zones; standing position for lateral balance management across surface discontinuities (see BIOMECH-01, BIOMECH-03).

**Coaching pipeline relevance** — Mixed terrain is the highest-complexity coaching scenario for the Stage 8 causal chain: the failure surface may not be the surface that was classified by Stage 4, because the classification was made on the dominant surface and the failure occurred at a transition. Correct Stage 8 chain construction for a mixed-terrain failure requires identifying the transition point as a step in the chain: surface type A (classified) → transition boundary (undetected) → surface type B (failure surface) → calibrated technique for surface A applied to surface B → failure. The coaching counterfactual addresses the transition identification and the pre-transition speed adjustment, not the in-zone technique on surface B.

Stage 4 should flag `primary_type: mixed` when confidence for a single surface is below threshold, and should retrieve this entry alongside the highest-confidence single-surface entry whenever mixed indicators are present. Stage 11 coaching safety validation should apply the slope stability constraint from TERRAIN-08 when mixed terrain includes clay substrate on gradient in wet conditions, and should flag `not_coachable` for hidden-transition failures where the rider had no reasonable means of identifying the boundary.

**Out-of-scope for this entry** — Physics and technique for each component surface type are covered in TERRAIN-01 through TERRAIN-09. Discrete terrain features that overlay surface type are covered in FEATURE-01 through FEATURE-08. Braking technique and threshold identification are covered in CONTROL-11 and CONTROL-12. Throttle control is covered in CONTROL-01. Engine braking is covered in CONTROL-05 and CONTROL-16. Traction physics are covered in DYNAMICS-04. The Conditions & Adaptation cross-cutting modifier will reference this entry for mixed-condition seasonal variation.
