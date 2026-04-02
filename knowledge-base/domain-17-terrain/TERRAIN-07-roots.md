---
# ── BLOCK 1: Pipeline Contract ──────────────────────────────────────────────
pipeline_contract:
  kb_type: terrain
  pipeline_enum_value: [roots]            # Exact Stage 4 surface.primary_type value

# ── BLOCK 2: Retrieval Triggers ─────────────────────────────────────────────
retrieval_triggers:
  PRIMARY:                                # Top-ranked when roots surface fires
    stage4_surface_type: [roots]
  SECONDARY:                              # Retrieve when primary fires or these signals are present
    stage6_failure_types: [traction, technique, line_choice, decision]
    stage4_gradient: [flat, gentle_up, moderate_up, steep_up, gentle_down, moderate_down, steep_down]
    stage4_surface_condition: [dry, damp, wet]
    scenario_cues: [dry_root_network, wet_root_network, moss_covered_root_network, root_over_rock, submerged_root_crossing, embedded_root_trail]
  CONTEXTUAL:                             # Background context — retrieve when no closer match
    stage3_intent_category: [trail_ride, technical_section, descent, climb]
    stage4_features_detected: [roots]

# ── BLOCK 3: Content Metadata ────────────────────────────────────────────────
content_metadata:
  topic_id: TERRAIN-07
  title: Roots — Terrain Profile
  domain: Terrain KB
  domain_id: terrain
  scope: "Surface physics, terrain states, and pipeline identification for root network
    terrain — continuous root coverage where the root network is the dominant riding
    surface. Does NOT cover single discrete root crossings or root-obstacle technique
    (see FEATURE-06), trail technique for woodland riding (see domain-05, domain-06),
    or tyre selection (see domain-12). Roots here are treated as a terrain type because
    of their continuous coverage and distinct traction physics. Where roots are encountered
    as isolated obstacles within another surface type, FEATURE-06 is the correct reference."
  status: draft
  surface_type: roots
  terrain_states:
    - dry_root_network
    - wet_root_network
    - moss_covered_root_network
    - root_over_rock
    - submerged_root_crossing
    - embedded_root_trail
  conditions_covered: [dry, damp, wet]
  traction_range:
    dry: moderate       # Across-root traction low; along-root moderate; knobbly tip interlock with bark provides partial grip
    damp: low           # Bark begins to lubricate; transition point from manageable to hazardous
    wet: very_low       # Near-zero friction on smooth wet roots in all directions; UK-critical hazard state
  gradient_contexts: [flat, gentle_up, moderate_up, steep_up, gentle_down, moderate_down, steep_down]
  failure_types_associated: [traction, technique, line_choice, decision]
  common_misclassifications:
    - rock     # Root-over-rock combination may be classified as rock terrain; roots have fundamentally different directional traction and wet behaviour
    - loam     # Embedded root trail within loam may appear as loam at low resolution; root density changes traction and deflection character significantly
    - hardpack # Dry embedded roots in compacted substrate resemble rocky hardpack; wet roots have a qualitatively different traction floor
  common_mixed_contexts:
    - "roots over rock base — dual deflection mechanism plus near-zero wet traction on both surfaces simultaneously"
    - "roots through mud — root network provides partial traction reference within otherwise traction-free mud sections"
    - "root network transitioning to loam at trail edge — traction improves significantly off the root corridor; line choice determines grip"
  difficulty_range: [intermediate, advanced]
  regional_terminology:
    UK: ["roots", "rooty", "root section", "technical woodland", "tree roots", "rooted trail"]
    AU_US: ["roots", "rooty", "root garden", "tech roots", "singletrack roots"]
    note: "Root terrain is a UK-critical surface type. Wet woodland root networks are among
      the highest-risk surfaces in UK enduro and trail riding — the combination of steep
      woodland gradients, high annual rainfall, and north-facing shaded terrain produces
      conditions where wet root traction is near-zero for extended periods. UK riders have
      a richer vocabulary for root terrain than most other regions because they encounter
      it more frequently and at higher severity. 'Greasy roots' is widely understood in
      UK riding contexts as a maximum-hazard descriptor."
  related_topics: [TERRAIN-01, TERRAIN-03, TERRAIN-04, TERRAIN-06, FEATURE-06, DYNAMICS-01, BIOMECH-01, BIOMECH-04, CONTROL-01, CONTROL-05, CONTROL-11, CONTROL-12]
  prerequisites: [BIOMECH-04]
  tags: [roots, wet-roots, directional-traction, deflection, woodland, UK-enduro, near-zero-grip, across-root, along-root, moss, greasy, root-network]
  version: 1.0
  last_updated: 2026-04-02
---

# TERRAIN-07 — Roots: Terrain Profile

---

## 1. Surface Physics

Roots present a unique traction physics problem that distinguishes them from every other terrain type in this KB. They are rigid cylindrical or flattened obstacles with a smooth, hard surface that provides near-zero friction when wet — but unlike rock, their geometry creates directional traction anisotropy: traction along the root axis differs fundamentally from traction across the root axis. This directional character means that traction on a root network is not a single value but a direction-dependent variable that changes with every heading change.

The traction mechanism on dry roots is compound adhesion and bark texture interlock. Dry bark has a coarse, irregular surface that knobbly tyre tips can partially engage with through mechanical interlock, similar in mechanism to rough dry rock but at smaller scale. This provides moderate grip in the along-root direction (tyre rolling along the root length) because the contact is consistent and the knobbly can track the surface continuously. In the across-root direction (tyre rolling perpendicular to root length), the knobbly must ride over the cylindrical root profile — contact occurs only at the root apex, reducing the contact footprint to a line rather than a patch. This reduced contact area means across-root traction on dry roots is lower than along-root traction, even on the same surface.

When roots are wet, the physics change fundamentally. Water on a smooth bark surface creates a continuous lubricating film that eliminates compound adhesion entirely and reduces mechanical interlock to near-zero. Unlike wet rock, where rough surface texture can provide some residual mechanical interlock through the water film, smooth wet root bark has a surface that is too uniform to provide meaningful tyre engagement. The result is near-zero traction in all directions: both along-root and across-root grip collapse simultaneously. This is the UK-critical hazard state — wet woodland root networks with near-zero traction across the full coverage area are one of the highest-consequence traction environments in off-road riding.

The deflection behaviour of roots is distinct from rock deflection. A rock edge deflects the tyre laterally — the wheel meets a fixed point and is pushed sideways. A root crossing perpendicular to travel presents a smooth, sloped surface that the tyre rides up and over. The deflection is not a sharp lateral push but a gentle ramp that still redirects the tyre slightly off its intended line. At low speed this is negligible. At speed, the cumulative deflection of crossing multiple roots in rapid succession accumulates: each crossing redirects the wheel slightly, and the handlebars oscillate as the front tyre continually crosses and re-corrects. Dense root networks at speed produce a continuous low-amplitude handlebar oscillation that is tiring and requires deliberate grip management.

The most hazardous deflection event on roots is the across-root slide. When the tyre crosses a wet root at any angle, and the load at the contact point exceeds the near-zero traction available, the tyre does not deflect laterally as it would off a rock edge — it slides along the root axis. The direction of the slide is determined by the root's orientation relative to the bike's direction of travel. This slide is faster-developing than a conventional lateral washout and the rider has less recovery time because the tyre is not deflecting (which can be steered out of) but sliding (which cannot be corrected until the tyre leaves the root surface).

Root network coverage also affects drainage patterns within the trail corridor. Dense root networks hold water on the surface rather than allowing it to drain through — the roots act as a barrier that prevents water from reaching the soil below. This concentrates surface water on the trail in wet conditions, keeping the root surfaces wetter for longer after rain stops than equivalent loam or hardpack terrain would be. Shaded woodland trails compound this: the canopy reduces evaporation, root surfaces that are wet in the morning may remain wet through the afternoon of a dry day.

---

## 2. Terrain States

**Dry root network** — A root network where bark surfaces are dry and compound adhesion is functional. Traction is moderate in the along-root direction and lower in the across-root direction, but both are sufficient for controlled riding at appropriate speed. The knobbly tyre can partially engage with bark texture through mechanical interlock at the contact point. The primary hazard of dry root networks is not traction but deflection: the cylindrical profile of each root crossing redirects the tyre slightly, and at speed the accumulation of many such crossings produces persistent handlebar oscillation. The unique failure mode of this state is across-root deflection escalation — the rider grips the bars firmly in response to handlebar oscillation, which transmits each subsequent root impact directly into the steering, increasing the oscillation amplitude. This does not occur in any other terrain state at the same speed.

**Wet root network** — This is the primary hazard state for roots terrain and the UK-critical condition. Rain, dew, or surface drainage wets the bark surfaces, eliminating compound adhesion and reducing traction to near-zero in all directions. The grip in both along-root and across-root directions collapses simultaneously — there is no residual traction direction advantage as there is in dry conditions. A tyre contact patch on a wet root has approximately the same grip as a tyre on polished wet steel. The unique failure mode of this state: wet root traction appears present at initial contact — the surface feels slightly tacky before the load increases — then disappears completely once load exceeds the lubricating film threshold. This gives a false initial confidence that the surface will hold, followed by immediate total traction loss, which is different from the gradual degradation of other wet surfaces. Visually: roots appear dark and wet with possible visible moisture; often indistinguishable from damp roots at approach distance until contact.

**Moss-covered root network** — Biological moss, lichen, or algae growth covering the root bark surface. The organic layer changes the traction mechanism: the moss covering acts as a lubricating interface between tyre and root regardless of moisture state. In dry conditions, dry moss provides marginal grip through blade-tip contact with knobbly tread, similar to the mechanism of dry grass. Any moisture — light dew, light drizzle, stream spray — is sufficient to collapse this marginal grip to near-zero, because the moss layer holds moisture against the root surface and releases it under tyre contact pressure. The unique failure mode of this state: inconsistent grip between moss-covered sections and exposed root sections within the same network. The tyre crosses from near-zero (moss) to marginal (exposed root bark) to near-zero (next moss section) within a single wheel rotation, creating abrupt grip cycling that cannot be predicted or tracked by the rider. The inconsistency is more hazardous than uniformly low traction because no stable grip calibration is possible. Visually: green, dark-green, or black surface colouration on root sections — identifiable at close range as biological growth but not reliably distinguishable from shadow or wet root surface at typical filming distances.

**Root over rock** — A state where the root network lies over or between rock surfaces, creating a combined terrain that presents both root deflection and rock deflection simultaneously. The traction implications are compounded: dry rock may provide partial grip where the tyre contacts the rock between roots, but wet rock and wet roots together produce near-zero traction across the entire surface without any reference traction point. The unique failure mode of this state: the tyre crosses a root, is deflected sideways, and the new contact point is a wet rock surface — the bike cannot recover from the root deflection because the recovery contact provides no additional traction. This dual-failure mechanism (deflection removing directional control, low traction preventing recovery) is not shared with either root-only or rock-only terrain states. Visually: distinguishable from pure root network by visible rock surface between root elements; distinguishable from pure rock by visible root structure over or between rock faces.

**Submerged root crossing** — Roots that are partially or fully submerged in standing or flowing water at a water crossing. The root surface is wet and potentially carrying organic silt or fine sediment from the water column. Traction is near-zero on the root surface — the combination of full wetting and potential sediment coating eliminates any residual bark texture interlock. The unique failure mode of this state: the tyre rides on top of the submerged root (which acts as a raised ridge above the water-covered rock or substrate below), then slips sideways off the root edge into the water channel. Unlike dry or wet root crossings where the slide occurs in the plane of travel, a submerged root slide can send the tyre into the water beside the root rather than along the intended line — potentially depositing the front wheel in a hole or on a submerged rock. Depth uncertainty below the root is also a specific hazard: the rider cannot assess what the tyre will contact if it slips off the root. Visually: identifiable when water crossing context is established in footage; root surfaces may be visible above water level or just below; submerged roots may not be visible from approach angle.

**Embedded root trail** — Roots that protrude from a loam, hardpack, or compacted soil surface as a semi-embedded network — partly integrated with the substrate, partly above it. This is the most common root state in woodland trail riding: the trail substrate is not root-dominated, but roots cross the trail surface at irregular intervals and heights. Traction character is mixed: the substrate (loam or hardpack) provides the baseline grip between root contacts, and the roots themselves present localised traction reduction and deflection events. The unique failure mode of this state: individual protruding roots vary in height above the substrate and in their degree of weathering, so some roots are ridden over smoothly while others produce a deflection event. The rider cannot distinguish significant from insignificant root contacts from approach distance at speed, and the deflection events within an otherwise grippy surface are unexpected relative to the overall traction calibration. Visually: identifiable as loam or hardpack trail with visible root elements crossing the surface; the primary surface type determines the overall visual classification.

---

## 3. Bike Behaviour

**Traction delivery — directional anisotropy** — Root traction is directionally variable in a way that no other terrain surface is. Along-root traction (front wheel rolling parallel to root length) is the highest-traction direction: contact is consistent across the tyre profile, the knobbly engages the root surface over a continuous strip, and the force required to overcome root adhesion acts uniformly. Across-root traction (front wheel rolling perpendicular to root length) is the lowest-traction direction in dry conditions and effectively zero in wet conditions: contact occurs only at the root apex, a narrow line contact produces less total adhesion, and any lateral load has near-zero resistance. Mixed-direction root networks — where roots cross the trail in multiple orientations — present both traction values simultaneously depending on tyre heading relative to each individual root.

**Deflection behaviour** — Every root crossing perpendicular to the direction of travel produces a small redirection event. The front wheel rides up the curved root surface, is deflected slightly in the direction the root slopes, and returns to its original vector after the tyre has cleared the root. At low speed this is unnoticeable. As speed increases, the deflection amplitude remains the same but the frequency of root crossings increases, and the recovery time between deflections decreases. Dense root networks at speed produce a continuous fine oscillation in the front wheel that requires active grip pressure management to prevent accumulation into a larger steering event. Passive, tight grip converts each root contact into a direct steering input; relaxed grip allows the bars to oscillate while the bike maintains its heading.

**Break-away characteristics** — Dry root network: break-away is moderately progressive. The tyre partially engages with bark texture before sliding, providing a brief warning window of reduced grip before a committed slide. Wet root network: break-away is sharp and provides near-zero warning. The lubricating film on wet bark eliminates the initial engagement phase — the tyre either has grip or it does not, with no meaningful intermediate stage. The transition from held to sliding on wet roots occurs within a fraction of a wheel rotation. This is the defining hazard: the speed of break-away on wet roots is closer to wet polished rock than to wet loam, and riders whose prior experience is in loam or mud are not calibrated for this.

**Rear wheel behaviour** — The rear wheel on wet roots is the most immediate crash risk. Under drive load at corner exit, the rear tyre on wet roots has near-zero lateral resistance: any combined drive force and cornering force immediately exceeds the friction budget and produces rear wheel step-out. The step-out on wet roots develops faster than on wet hardpack and much faster than on wet loam: the tyre breaks free with very little auditory or feel warning. On descents, engine braking on wet roots can lock the rear wheel at a lower retardation force than expected — the tyre-to-root friction limit under braking is lower than the rider's calibration from other surfaces.

**Front wheel behaviour** — The front wheel on a wet root network can wash out under cornering load at forces that would be well within the grip envelope on equivalent wet loam or wet hardpack. The combination of near-zero lateral friction on root surfaces and the directional variability of root orientation means the front tyre experiences grip loss at unpredictable points relative to rider expectations. An across-root front wheel contact at a corner apex where the root is oriented to provide zero resistance to the cornering load direction can produce an immediate front wheel washout without the progressive warning phase of other wet surfaces.

**Suspension behaviour** — Root networks produce a high-frequency, low-amplitude suspension input pattern at trail speed. Individual root crossings are small impacts compared to rocks; the frequency of crossings is often higher. This produces a sustained fine vibration through the chassis, which is fatiguing and which reduces grip feel feedback to the rider. On steep descents with dense root networks, the combined effect of braking forces, root deflection, and suspension vibration can make it difficult to maintain consistent brake modulation — the small chassis inputs interrupt even gentle pressure application.

---

## 4. Technique Implications

**Grip pressure management** — The most critical technique parameter on root networks at speed is grip pressure on the handlebars. Tight grip transmits every root crossing directly through the bars to the steering, accumulating small deflections into large oscillations. The correct technique is a relaxed, guiding grip pressure that allows the bars to move slightly under root impacts while the rider's hands maintain contact rather than resisting. This is counter-intuitive: when the bars are oscillating, the rider's instinct is to grip tighter to regain control. Doing so worsens the oscillation. The correct response is to consciously relax grip pressure and reduce speed simultaneously. See BIOMECH-04 for grip pressure mechanics and the relaxed-grip active-contact technique.

**Speed calibration for wet roots** — The technique adjustment for wet roots is primarily speed, not body position or throttle. Wet root network traction is so low that no amount of technique variation can recover a traction event that exceeds the friction available. The practical implications: reduce speed before the root section to the point where any traction event is recoverable with available steering response time. On UK woodland descents in wet conditions, this speed is substantially lower than the equivalent dry speed — often half or less. Riders who have ridden the section dry apply dry-calibrated speeds and find wet conditions produce unrecoverable traction events at speeds that felt conservative.

**Line selection** — Line choice on root networks is a traction direction management decision. Where roots run predominantly longitudinally to the trail (along the direction of travel), along-root traction is available and the line should track the root direction. Where roots cross the trail at angles, the rider should seek contact points where the tyre meets the root at the flattest possible angle — minimising the across-root traction deficit. On mixed root-loam surfaces, the loam between roots provides far higher traction than the roots themselves in wet conditions, and line selection should seek maximum loam contact even if this requires small deviations from the optimal geometrical line.

**Throttle and braking on wet roots** — Both throttle and braking forces must be reduced on wet roots relative to any other surface at equivalent speed. The narrow friction budget of wet roots does not support combined load from drive or braking plus cornering simultaneously. Braking must be completed before corner entry and fully released before leaning into the turn. Throttle at corner exit must be applied after the bike has begun to straighten and the lean angle is reducing. The compound-load failure is the primary cause of crashes on wet root corners: a rider who applies any brake or throttle while the bike is leaned on a wet root surface immediately exceeds the friction budget in both lateral and longitudinal directions.

---

## 5. Gradient Interaction

**Uphill roots** — Dry root networks on moderate gradients are manageable with smooth throttle and appropriate speed. Along-root traction is sufficient for drive force on gentle to moderate climbs. Steep climbs on wet root networks are extremely hazardous: the rear wheel has near-zero traction in the along-root direction on wet surfaces, and the climb gradient reduces available downforce on the rear tyre while simultaneously increasing the drive force demand. Steep wet root climbs typically require the rider to generate sufficient approach speed on the preceding loam or hardpack section to carry the climb on momentum, with minimal throttle application on the root section itself.

**Downhill roots** — Downhill root networks in wet conditions are among the highest-risk descent scenarios in UK enduro. The combination of gradient-driven speed, near-zero traction from wet roots, and the high frequency of deflection events creates a compound hazard that is difficult to manage with technique alone. Engine braking is the preferred retardation method: it distributes braking force through the drivetrain rather than concentrating it at the rear tyre contact patch. Rear brake application on wet root descents carries high rear wheel lock risk at forces far below those that would lock the rear wheel on hardpack. Front brake application at any lean angle on wet roots is the highest-consequence input — the front wheel will wash out immediately if any lateral load is present. Braking should occur only on upright sections between root crossings where a brief period of non-root contact can support the braking force.

**Steep descent on wet woodland roots** — This is the specific scenario that makes roots UK-critical. Steep north-facing woodland descents with continuous wet root coverage, loam between roots also wet, poor light from canopy, and limited lines away from the root network combine multiple hazards simultaneously. The correct coaching gate for Stage 11 (safety validation): if footage shows a rider crashing on a steep wet root descent, the counterfactual coaching must acknowledge that the primary intervention is speed reduction before the section, not technique correction within it.

---

## 6. Directional Grip and Network Geometry

Root rut behaviour is not the primary formation concern on root terrain. Root networks have fixed geometry determined by tree root growth patterns rather than traffic-induced deformation. The relevant structural characteristics are the spatial arrangement of the network, the directional traction implications of root orientation, and the drainage patterns that the network creates. This section replaces the standard Rut Behaviour section with these roots-specific structural dynamics.

**Along-root vs across-root traction differential** — The most important structural characteristic of a root network is the predominant orientation of roots relative to the trail direction. A trail descending along the axis of root growth (roots running parallel to the direction of travel) provides along-root traction for both front and rear wheels throughout the section. A trail crossing roots at right angles presents the minimum-traction direction continuously. Most woodland trails intersect root networks at oblique angles that are neither fully along nor fully across — the effective traction value is intermediate and varies with heading.

**Network density effects** — Sparse root networks (individual roots separated by significant loam intervals) behave as embedded obstacles within a loam surface — the loam between roots provides the baseline traction, and individual root contacts are localised traction and deflection events. Dense root networks (roots covering more than approximately 50% of the trail surface) behave as a continuous surface with loam pockets — the roots become the dominant traction surface and the loam between them is a secondary contributor. The density threshold at which the surface transitions from loam-with-roots to roots-with-loam-pockets determines which surface's traction physics should be applied. Pipeline Stage 4 classification should use `surface.primary_type: roots` only when root coverage is sufficient to dominate the traction behaviour.

**Root channel drainage concentration** — Dense root networks create drainage channels along the spaces between roots. Water that would drain through a loam or hardpack surface instead pools between root elements and concentrates in the lowest points of the network. This channelled drainage keeps root surfaces wetter longer after rain stops than equivalent loam terrain would be. On north-facing slopes with dense canopy, root surfaces can remain wet for several days after the last rain. Trail sections with root networks are therefore subject to a longer wet-hazard window than visual assessment of ambient conditions would suggest.

**Radiating vs parallel root networks** — Tree roots grow in two predominant architectural patterns: radiating (from a central trunk outward in all directions) and parallel (root systems of multiple trees with similar growth direction producing a roughly parallel root structure). Radiating networks from large woodland trees close to the trail produce a circular crossing pattern — the rider meets roots at all angles in a short section, and no consistent along-root direction exists for grip exploitation. Parallel root networks (common on slopes where multiple trees grow along the contour) can present a mostly-along-root crossing if the trail runs parallel to the slope contour. Line selection for grip on root networks should account for this geometric character.

**Root-carved channels** — On steep descents, root networks can develop erosion channels in the soil between roots, creating a mini-topography of ridges (root surfaces) and channels (eroded inter-root spaces). At speed, the wheel alternates between riding on root surfaces (near-zero wet traction) and dropping into soil channels (higher traction). This rapid alternation makes consistent braking or cornering force application very difficult — the available friction changes within a single wheel rotation. Root-carved channels are most developed on heavily trafficked descent lines in woodland trail riding and are distinguishable from simple root crossings by the significant depth difference between root surface level and channel floor.

---

## 7. Conditions Impact

**Dry conditions** — Dry root networks are the most manageable roots state. Bark compound adhesion is functional, along-root traction is usable, and deflection is the primary challenge rather than traction failure. Dry woodland trails in summer present root terrain as a moderate rather than extreme challenge for intermediate riders. The coaching emphasis in dry conditions is deflection management and grip pressure technique.

**Damp conditions** — Damp roots represent the transition between manageable and hazardous. Moisture begins to form on bark surfaces, reducing compound adhesion and approaching the near-zero threshold. Damp roots are visually similar to dry roots in low light and can catch riders who have not adjusted their traction expectations. On sections where roots dominate more than 40–50% of the surface, damp conditions should be treated as wet — the uncertainty about whether the specific root contact point is in the near-zero zone is too high to support dry-calibrated technique.

**Wet conditions** — Wet roots are the UK-critical state. This is the default condition for woodland root terrain in UK autumn, winter, and much of spring — typically seven to eight months of the year in higher-rainfall regions. Wet root traction is near-zero and this cannot be managed by technique at speeds above approximately walking-to-slow-trail pace for dense networks. The coaching protocol is: correctly identify the surface as wet roots, correctly assess the coverage density, and apply the appropriate speed constraint before the section entry. Attempting to coach technique adjustments for wet root network traction at speed is not effective — the physics constraint is below the recoverable threshold.

**Frost** — Frosted root networks are the most hazardous condition variant of roots terrain. Frost crystal formation on bark surfaces eliminates all residual mechanical interlock and adhesion simultaneously. Frost on roots is more hazardous than frost on grass because root surfaces are smoother and harder — the tyre cannot sink through the frost layer to a grippy substrate as it can partially do with frosted grass. Frosted roots are visually identifiable in good morning light as a crystalline pale coating. Partial frost on shaded woodland sections may not be identifiable from approach distance.

**Long-term wetness — organic layer development** — Root surfaces that are consistently wet develop progressive organic surface growth over years of exposure. This accelerates the transition toward the moss_covered_root_network state, which has even lower wet-condition traction than clean wet bark. Established UK woodland trails with a history of wet conditions frequently have significant moss and algae development on root surfaces. A trail that was manageable on a first visit may become more hazardous over years of biological surface development.

---

## 8. Entry / Exit Transitions

**Loam to roots** — Traction drops at the loam-to-roots boundary, particularly in wet conditions. Loam-calibrated braking and cornering forces will exceed the available root traction immediately on surface transition. Speed should be set on the loam approach to accommodate the traction reduction. The transition is usually visible (the shift from dark organic soil surface to visible root structure), but the magnitude of the traction change is not visually intuitive — wet roots look like they should provide reasonable grip and consistently do not.

**Roots to loam** — When the root section ends and the tyre transitions to loam or compacted soil between root zones, traction increases. Riders who have correctly slowed for the root section may find themselves exiting onto loam with more speed margin than they expect. This is generally positive, but on steep descents where speed management is continuous, the loam section's higher braking capacity relative to the just-exited root section should be used actively.

**Roots to rock** — Root-to-rock transitions produce a change in deflection character: roots produce ramp-based redirection while rocks produce edge-based lateral deflection. The traction physics are both low in wet conditions but the failure modes differ — a slide on wet roots runs along the root axis; a deflection on a wet rock edge moves the wheel laterally off line. Riders calibrated for root management (relaxed grip, minimal load) are not necessarily prepared for the rock deflection character that follows immediately.

**Wet roots to dry section** — Exiting a wet root section onto a dry loam or hardpack area after rain has cleared provides a useful reminder of how different the traction states are. The traction jump at this transition is significant. Riders who have been managing correctly for wet roots may apply excessive caution on the subsequent section — correct recalibration requires recognising the surface state change, not just continuing the wet-roots technique.

---

## 9. Interaction Patterns & Failure Triggers

**Across-root wet slide — cornering** — Rider approaches corner on wet root network → roots are oriented transversely to the trail → corner entry loads the front tyre laterally → tyre contacts wet root surface at apex → zero lateral traction available → front wheel slides along root axis → front end washes out with near-zero warning → lowside. This chain can complete within one to two wheel rotations from the point of root contact — recovery steering is not possible after the front wheel begins sliding on the root surface.

**Grip tightening oscillation escalation** — Rider enters dry root network at trail speed → front wheel crossings produce handlebar vibration → rider tightens grip instinctively → each subsequent root crossing is transmitted directly to steering → oscillation amplitude increases → at threshold amplitude, front wheel is deflected off line by a root contact that amplifies the existing oscillation → crash. The unique characteristic: the failure is caused by the response to the warning signal, not the signal itself.

**Wet root descent brake lock** — Rider descends steep root section in wet conditions → attempts rear brake application for speed control → rear wheel contacts wet root surface mid-brake-application → friction limit exceeded by braking force alone → rear wheel locks → locked wheel slides along root → rear slides wide → lowside or bike-drop. The root contact during braking is the trigger — the same brake force would have been controllable on loam.

**Moss section grip cycling** — Rider traverses mixed moss-covered and exposed root network → encounters consistent traction cycling between near-zero (moss) and marginal (exposed bark) → throttle or braking force calibrated to the marginal exposed-bark traction is applied → tyre transitions onto moss section mid-force application → force immediately exceeds friction limit of moss-covered surface → rear or front traction loss → crash.

**Submerged root slip** — Rider negotiates water crossing with submerged roots → attempts to ride on root surface to avoid soft substrate below water → wheel rides on root ridge above water level → lateral load from cornering or gradient → tyre slips laterally off root edge → wheel drops into water channel beside root → contacts uncertain substrate → abrupt deceleration or lateral collapse → crash or tip-over.

### Pipeline Identification Notes

`surface.primary_type: roots` confirmed by: visible root structure (cylindrical or flattened woody elements crossing the trail surface), woodland trail context (tree presence in frame or adjacent to trail), root colouration (grey-brown, dark brown, or green if moss-covered). Coverage density assessment: roots should dominate the visible surface (>50% coverage) for root terrain classification; lower density with loam dominant should classify as loam with `features_detected: roots`. Root orientation relative to trail direction: identifiable from overhead or oblique footage angle — along-root vs across-root classification is possible from 3rd-person footage with adequate angle.

`surface.condition: wet` on roots: surface sheen on root elements, darker colouration, and visible moisture — observable in standard footage at medium distance. Moss coverage: green or dark-green colouration on root surfaces visible at close filming distance; not reliably distinguishable from shadow or simple wet root surface at typical trail filming distances.

Audio cues on roots: dry roots produce a distinctive hollow tapping or knocking sound as knobbly tread contacts the root surface — audible in close or helmet-mounted footage. Wet roots produce less audible contact but the absence of the characteristic dry root knocking can be a negative indicator. Root deflection events produce abrupt bar input sounds (handlebar grip shift, rider body adjustment) that are often audible in helmet-cam footage.

Discrete single-root crossings should NOT trigger `surface.primary_type: roots` — these are `features_detected: roots` within another surface type and should retrieve FEATURE-06. The pipeline threshold for roots-as-terrain is continuous coverage where root physics dominate the overall traction character.

### Observability Notes

**Reliably observable from footage:**
- Root terrain classification: root structure visible at most filming distances in decent lighting
- Wet vs dry state: surface sheen and colouration change on root surfaces visible in 3rd-person footage at medium distance
- Root orientation relative to trail: determinable from overhead or well-angled 3rd-person footage
- Traction events (wheel slides, handlebar deflections): visible as chassis movement events in footage
- Root coverage density: rough assessment possible from 3rd-person footage
- Moss coverage: visible at close filming distance as green or dark surface colouration

**Inferable with caveats:**
- Damp vs wet root state: the critical distinction between manageable-damp and near-zero-wet is not reliably determined from footage alone; ambient conditions (rain, time since rain, shade level) must be used as contextual modifiers
- Along-root vs across-root contact direction: determinable for primary root orientation; mixed-network directionality is not assessable without detailed frame analysis
- Moss vs shadow on roots: cannot be reliably distinguished from typical trail footage; close-up footage required for confirmation
- Whether a traction event was caused by root contact or by simultaneous contact with rock or other surface below root level

**Cannot be determined from footage:**
- Absolute traction value at any root contact point — wet bark traction varies with root species, bark texture, and degree of biological surface development in ways not assessable from footage
- Whether a visually similar root is moss-covered or simply wet — moss-covered roots have qualitatively lower traction than clean wet roots; the distinction is pipeline-significant but visually ambiguous
- Submerged root coverage in water crossings — root locations and orientations below water surface are not visible
- How long the roots have been wet (affects whether biological surface development has progressed to moss state)

---

## 10. False Signals / Illusions

**Wet roots look rideable** — Wet bark surface visually resembles many other surfaces that provide reasonable wet grip: it does not look like ice, does not look like polished metal, and does not look obviously different from damp loam or compacted soil. Riders who have not specifically experienced near-zero wet root traction have no visual signal to trigger appropriate speed reduction. The surface appears to be a normal challenging section, not a near-zero traction hazard. This is the defining false signal of roots terrain: the traction level is not visually communicated by the surface appearance.

**Dry roots last time** — Riders who have successfully completed a root section in dry conditions carry that experience as a positive reference. The surface felt manageable — challenging but not severe. Returning to the same section in wet conditions, the route, the visual layout, and the line choice are all familiar and positively associated. The calibration is anchored to the dry experience and is wrong for the wet state. This is the same calibration transfer failure as grass, but roots are more extreme: the grip reduction from dry to wet roots is proportionally larger than from dry to wet grass.

**Gripping through it** — When handlebar oscillation from root deflection begins, the instinctive response is to hold the bars more firmly to stabilise the steering. This is the wrong response and makes the situation worse: firm grip converts root impacts into steering inputs, amplifying the oscillation. The false signal is that tighter grip feels like it provides control because the rider can feel more of the bar movement. The improved sensation of control is not matched by improved stability — the feedback is higher but the outcome is worse.

**Moss as benign surface** — Moss on roots looks soft and natural — in a woodland context it appears as normal organic ground cover rather than as a traction hazard. Riders associate moss with soft landings and natural ground rather than with near-zero wet friction. The visual association with organic woodland floor is entirely misleading for the traction purpose: dry moss provides barely adequate grip, and any moisture makes moss-covered roots among the lowest-traction surfaces in the terrain KB.

---

## 11. Terrain Demands / Constraints

**Minimum technique required for safe riding** — Relaxed grip pressure with active handlebar contact rather than resistance (see BIOMECH-04 — critical prerequisite for roots); speed calibration appropriate for surface state before entry — wet roots require substantially lower speed than equivalent dry sections (see CONTROL-11); engine braking preferred over rear braking on wet root descents (see CONTROL-05); braking and cornering separated — no combined load on wet root contact; line selection for maximum along-root contact and loam between roots (see Section 4).

**UK riding context** — Wet root network terrain is encountered as a regular part of normal riding conditions in the UK for approximately seven to eight months of the year in high-rainfall woodland riding areas. UK enduro courses often include sections with continuous wet root coverage that, in other regions, would be considered exceptional conditions. This entry should be treated as a primary reference for wet UK woodland trail coaching, not a secondary or edge-case reference. The coaching urgency classification for wet root terrain at speed is high — the physics constraint is below the recoverable threshold and the primary intervention is a speed decision before the section, not technique correction within it.

**Tyre equipment** — Roots are the terrain least affected by tyre specification of all terrain types in this KB. Because wet root traction is governed by the friction of wet bark (approaching zero regardless of tyre compound), neither soft compound, hard compound, nor tyre pattern variations produce meaningful improvements in wet root grip. Tyre pressure reduction does not improve root traction the way it improves sand or mud traction. The only tyre variable with any effect on roots is compound softness under dry conditions, where soft compound slightly improves adhesion on bark texture. For wet roots, no available trail tyre specification provides meaningful grip — this is a physics constraint, not an equipment limitation with a solution.

**Coaching pipeline relevance** — Root terrain failures are classified primarily as traction failures (front or rear washout on wet roots) or technique failures (grip escalation oscillation, combined-load overcorrection). Decision failures (approaching wet roots at inappropriate speed) are the upstream cause of most root traction failures. Stage 6 classification on roots: traction failure pattern is observable as sudden directional change without preceding excessive input; technique failure from grip escalation is observable as progressive handlebar oscillation before crash. Stage 8 causal chains for wet root crashes are typically short — one to two links — but Stage 11 safety validation is critical: coaching that implies a technique fix for near-zero wet root traction can produce the same crash by giving the rider false confidence in technique adjustment. The correct counterfactual is speed reduction before entry.

**Out-of-scope for this entry** — Single discrete root crossings and root obstacle technique are covered in FEATURE-06. General woodland trail technique progressions are covered in domain-05 and domain-06. Grip pressure technique and active-contact bar handling are covered in BIOMECH-04. Engine braking mechanics are covered in CONTROL-05. Braking threshold identification is covered in CONTROL-11 and CONTROL-12. Tyre selection is covered in domain-12.
