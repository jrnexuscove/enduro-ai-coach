---
# ── BLOCK 1: Pipeline Contract ──────────────────────────────────────────────
pipeline_contract:
  kb_type: terrain
  pipeline_enum_value: [grass]          # Exact Stage 4 surface.primary_type value

# ── BLOCK 2: Retrieval Triggers ─────────────────────────────────────────────
retrieval_triggers:
  PRIMARY:                              # Top-ranked when grass surface fires
    stage4_surface_type: [grass]
  SECONDARY:                            # Retrieve when primary fires or these signals are present
    stage6_failure_types: [traction, line_choice, decision]
    stage4_gradient: [gentle_up, moderate_up, steep_up, gentle_down, moderate_down, steep_down]
    stage4_surface_condition: [wet, damp, dry]
    scenario_cues: [dry_grass, wet_grass_short, wet_grass_long, damp_grass, grass_over_soft_ground, worn_grass_trail, frost_grass, long_overgrown_grass]
  CONTEXTUAL:                           # Background context — retrieve when no closer match
    stage3_intent_category: [trail_ride, climb, descent, race_section]
    stage4_features_detected: [rut]

# ── BLOCK 3: Content Metadata ────────────────────────────────────────────────
content_metadata:
  topic_id: TERRAIN-04
  title: Grass — Terrain Profile
  domain: Terrain KB
  domain_id: terrain
  scope: "Surface physics, terrain states, and pipeline identification for grassy terrain.
    Does NOT cover riding technique for hillsides and field crossings (see domain-05,
    domain-06), braking or throttle mechanics (see CONTROL-01, CONTROL-11), or
    tyre selection (see domain-12). Hidden sub-surface features (ruts, holes) are
    described here only in terms of their traction consequences — obstacle-specific
    technique is covered in FEATURE-04."
  status: draft
  surface_type: grass
  terrain_states:
    - dry_grass
    - damp_grass
    - wet_grass_short
    - wet_grass_long
    - frost_grass
    - grass_over_soft_ground
    - worn_grass_trail
    - long_overgrown_grass
  conditions_covered: [dry, damp, wet, frozen]
  traction_range:
    dry: moderate_to_high   # Variable: well-rooted sward = high; sparse grass over soil = moderate
    damp: moderate          # Damp grass lubricating layer begins forming; grip reduced but not eliminated
    wet: low                # Wet grass blade surface is near-frictionless; traction dominated by grass layer
    frozen: very_low        # Frosted grass is near-zero grip in all directions
  gradient_contexts: [flat, gentle_up, moderate_up, steep_up, gentle_down, moderate_down, steep_down]
  failure_types_associated: [traction, line_choice, decision]
  common_misclassifications:
    - loam       # Wet loam in open terrain resembles wet grass — distinctly higher grip; loam has organic sub-surface structure
    - mud        # Wet grass over soft or saturated ground can appear muddy; traction profile differs at the surface layer
    - hardpack   # Worn grass trail at distance resembles hardpack; grass-over-hardpack has significantly lower wet traction
  common_mixed_contexts:
    - "grass over soft ground — when wheels punch through grass layer, soft substrate determines outcome"
    - "grass with root network — dense root system dramatically improves dry-condition grip; less benefit in wet"
    - "grass transitioning to mud at off-camber corner — poor drainage concentrates at corner apex; entry may be grass, apex is mud"
  difficulty_range: [beginner, intermediate, advanced]
  regional_terminology:
    UK: ["grass", "grassy", "green lane", "hillside", "meadow", "field", "pasture"]
    AU_US: ["grass", "grassland", "pasture", "meadow", "green"]
    note: "'Green lane' in a UK context refers specifically to a legal off-road track through
      farmland or countryside, which is typically grass or mud. Not synonymous with green-coloured
      surface in other contexts. No significant AU/US terminology divergence for this surface type."
  related_topics: [TERRAIN-01, TERRAIN-02, TERRAIN-05, DYNAMICS-04, CONTROL-01, CONTROL-11, CONTROL-12, BIOMECH-01, BIOMECH-03]
  prerequisites: []
  tags: [grass, wet-grass, off-camber, frost, hidden-hazard, traction-loss, overconfidence, lowside, field-crossing]
  version: 1.0
  last_updated: 2026-04-02
---

# TERRAIN-04 — Grass: Terrain Profile

---

## 1. Surface Physics

Grass is a two-layer surface. The upper layer is the grass itself — blades of varying height, density, and water content. The lower layer is the soil or substrate in which the grass is rooted. The tyre interacts with both layers simultaneously, but the relative contribution of each depends on grass state and the degree to which the tyre penetrates through the grass into the soil.

In dry conditions, the grass blade layer is compressed under tyre contact and provides mechanical interlock with the tyre knobbly through blade-tip friction and blade-edge contact. The soil root zone below adds adhesion through lateral root tension resisting tyre displacement. Combined, dry well-rooted grass with healthy sward density provides moderate to high traction comparable to dry hardpack on flat terrain. The illusion of safety that dry grass creates is accurate — but only for dry grass.

Wet grass changes the physics entirely. Water on the grass blade surface creates a thin lubricating film on the contact faces between tyre knobblies and grass blade tips. The blade tips become near-frictionless. The tyre no longer engages with the grass layer mechanically — it slides across the blade surface as though on a wet polished hardpack. The only remaining traction contribution comes from the tyre penetrating through the grass to the soil below, which depends on grass height and soil hardness. On short wet grass over hard soil (the most common state), the tyre rides almost entirely on the grass layer and generates very little grip. This is the defining physical property of grass terrain: dry grip is reasonable; wet grip can be near-zero, and the visual appearance gives no reliable warning of the state transition.

The traction break-away on wet grass is sharp. The grass blade lubricant removes the progressive slip-before-slide feedback that mud provides. The tyre transitions from grip to slide with very little intermediate feedback — closer in character to wet polished rock than to mud. Combined with the dry-grass confidence illusion (riders who have ridden the section dry expect the same grip they experienced), this produces some of the most surprise-laden crashes in trail and event riding.

Root networks beneath the grass layer are a significant but invisible traction modifier. A dense root network in the soil below short grass creates lateral resistance to tyre displacement that supplements the grip of the grass layer itself. This is why some grassy terrain feels grippy even when visually unremarkable. When the root network is thin or absent (sparse grass, recently sown field), the soil beneath contributes no additional lateral resistance and the traction is governed entirely by the grass layer. Root network presence is not observable from footage or from approach distance.

Grass also conceals sub-surface terrain features. Ruts, holes, root systems, embedded rocks, and drainage channels lie beneath the grass surface and are not visible from approach speed. This is a distinct hazard type from traction failure: the bike's trajectory or balance is disrupted by hidden terrain rather than by traction loss. The grass surface presents a uniform, benign visual appearance that provides no signal of feature severity below.

---

## 2. Terrain States

**Dry grass** — The reference state. Grass blades are dry, blade tips are rough and provide friction interlock with tyre knobblies, root zone below is intact and adds lateral traction resistance. Grip is moderate to high depending on grass density and sward health. Dry short grass on firm soil with good root coverage provides traction comparable to dry hardpack for longitudinal loads (braking and drive). Lateral traction (cornering) is somewhat lower than hardpack because the grass blade layer still has directional compliance. Visually: upright, distinctly green blades with visible individual blade structure. No surface sheen. This is the state riders calibrate to when approaching a grassy section, and the state that creates overconfidence when the surface has transitioned to damp or wet.

**Damp grass** — A transitional state between dry and wet. Light moisture (dew, light misting, early rainfall) wets the blade surface without fully saturating it. Grip is reduced but not eliminated. The lubricating layer is forming but incomplete — some mechanical interlock still functions between knobblies and damp blade tips. The hazard of damp grass is not its actual grip level, which is manageable, but its appearance: damp grass at distance looks essentially identical to dry grass in most lighting conditions. The first warning of damp conditions is often the first traction event, not a visual cue. Damp grass on off-camber ground is the highest-risk damp scenario — the marginal lateral grip available is consumed by the off-camber load, and the remaining grip is lower than the rider expects from the dry-calibrated appearance.

**Wet grass (short)** — This is the primary hazard state for grass terrain. Short wet grass (blade height under ~10 cm) creates a continuous lubricating film across the tyre contact patch through which the tyre knobbly tips slide rather than grip. Penetration through to the soil below is limited by the hardness of the substrate — on firm or compacted soil, the tyre rides almost entirely on the grass layer and generates very little grip. Traction is disproportionately lower than the visual surface appearance suggests. Visually: blades pressed flat or slightly matted under moisture, darker and less distinctly upright than dry grass. In wet conditions, the colour change may be subtle. Surface sheen under direct light or overhead footage is the most reliable visual indicator.

**Wet grass (long)** — Long wet grass (blade height over ~15 cm) behaves differently from short wet grass. The blades wrap around lower bike panels and the tyre sidewall as well as contacting the tread surface, generating significant drag. Forward momentum is consumed rapidly by this additional resistance. The traction mechanism is also different: long wet blades fold under the tyre rather than being ridden over, bringing the tyre into contact with the soil below at a shallower blade angle. This slightly improves grip compared to short wet grass on the same soil. However, the momentum reduction from drag creates its own failure mode — riders who carry short-grass-appropriate speed into long wet grass decelerate faster than expected and may stall on gradient. Additionally, long grass can trap the footpeg or obscure ruts and holes below.

**Frost grass** — Frosted grass is a near-zero traction state in all directions, comparable to ice. The frost crystal structure on blade tips eliminates all mechanical interlock and adhesion simultaneously. Unlike wet grass, which retains some grip through soil contact on penetration, frosted grass provides near-zero traction even when the tyre reaches the root zone — the frost extends through the blade length and the blade tips provide no grip at any penetration depth. Visually: pale, crystalline, uniformly bright surface in morning light. The appearance is distinctive and in good lighting frosted grass is identifiable. However, patchy frost on partial shade sections can appear as dry grass from a distance — riders passing from a sunny unfrosted section into a shaded frosted section face the same calibration failure as wet grass overconfidence.

**Grass over soft ground** — When the substrate below the grass layer is soft, wet, or saturated, the traction equation shifts. The tyre penetrates through the grass layer under load and engages primarily with the soft soil below. This transitions the effective surface behaviour from grass to soft ground — closer in physics to mud than to hardpack. The initial wheel pass may feel like normal wet grass, but repeated passes drive the tyre deeper into the soft substrate, and the surface degrades rapidly from the grass-state to a churned soft-ground state. This is the primary degradation path for heavily trafficked grassy events: the first pass behaves as wet grass, subsequent passes behave as mud. Stage 4 should consider both `surface.primary_type: grass` and `surface.primary_type: mud` for soft-ground grass states — whichever is dominant in the specific footage.

**Worn grass trail** — A defined trail corridor through which grass has been largely removed by repeated wheel passes. The surface is compacted earth or hardpack with residual grass at the trail edges and occasional grass patches across the trail line. Traction characteristics are primarily those of the exposed substrate (hardpack or compacted soil) rather than the grass layer. Visually similar to hardpack at distance; distinguishable by grass-fringe edges and occasional green patches across the trail. Traction is higher than wet grass but subject to contamination from adjacent grassy surface under wet conditions — the trail edge is still wet grass, and line deviation onto the grass fringe carries the full wet-grass traction risk.

**Long overgrown grass** — Tall or dense grass that obscures the ground surface entirely, typically blade height over 30–40 cm or dense low scrub mixed with grass. The primary hazard is not traction but visibility: the rider cannot see any underlying terrain features — ruts, holes, rocks, camber changes, or drainage channels — because the grass cover is complete. This creates a delayed-reaction scenario in which hazards are only detected at the moment of contact, not during approach. Even in dry conditions, when traction itself is adequate, the risk remains high due to hidden geometry — a concealed rut or hole cannot be avoided because it cannot be seen. When wet, the visibility failure combines with the traction failure from the wet grass layer, compounding difficulty through two independent mechanisms simultaneously. This state is fundamentally different from wet_grass_short, where the primary failure mode is traction loss on a visible surface; in long overgrown grass, the primary failure mode is encountering an unseen terrain feature. Common in UK countryside riding, unused trail sections, and seasonal overgrowth conditions on green lanes and hillside tracks between summer and autumn. The coaching implication is qualitatively different from other grass states: traction management techniques address the wet_grass states; long overgrown grass requires a speed constraint informed by zero terrain visibility — the rider must be slow enough that any hidden hazard contact is survivable rather than trying to navigate a surface they cannot see. See Section 6 (Hidden Sub-Surface Hazards) for the full treatment of concealed terrain features under grass cover.

---

## 3. Bike Behaviour

**Traction delivery** — Dry grass delivers traction through blade-tip mechanical interlock and root-zone lateral resistance. The contact area between tyre and grass is smaller than between tyre and hardpack because the blades have directional compliance — they fold slightly under load rather than offering a rigid reaction surface. This means traction in dry grass is real but less predictable than hardpack: a section of dense well-rooted grass holds better than a section of sparse grass, and neither is assessable from approach distance. Wet grass: traction is primarily governed by whether the tyre reaches the soil below. On firm substrate, grass acts as a lubricating layer and available traction is very low.

**Rear wheel behaviour** — The rear wheel on wet grass is prone to spin and step-out at lower drive force than any other common terrain except mud. Corner-exit throttle in wet grass requires particular caution: the rear tyre is under combined drive and lateral load simultaneously at corner exit, and the wet grass provides very little resistance in either direction. Step-out in wet grass develops progressively enough to be catchable (unlike rock or polished hardpack) but fast enough that the rider must detect and respond within one to two wheel rotations. Engine braking on wet grass descents can lock the rear wheel at lower retardation force than expected — the tyre-to-blade friction limit is lower than tyre-to-hardpack even before the wheel approaches lock.

**Front wheel behaviour** — The front wheel on dry grass has normal steering response. On wet grass, front wheel directional tracking is reduced — the tyre can drift laterally from its intended line without generating the feedback of a surface that is actively resisting the drift. Off-camber wet grass is specifically hazardous for the front wheel: the lateral load from the slope plus the traction reduction from the wet grass layer compounds against the front tyre simultaneously. The front wheel will track the fall-line of the slope rather than the rider's steered line once lateral traction is exceeded.

**Braking performance** — Dry grass braking is moderate, comparable to soft hardpack. Wet grass braking is significantly impaired. The longitudinal friction coefficient on wet short grass is lower than wet hardpack and approaches the range of wet clay or light mud. Threshold braking calibrated for hardpack will lock wheels immediately on wet grass. The rear wheel locks at lower force than the front because the rear braking load is distributed through the grass layer rather than having the forward pitch component that loads the front. Engine braking contribution to deceleration is relatively safer on wet grass than pure brake application, for the same reason it is preferred on rock.

**Hidden feature interaction** — Hidden sub-surface features (ruts, holes, root systems, embedded rocks) produce sudden suspension and steering events with no visual pre-warning. The most common: a concealed rut catching the front wheel and redirecting it at an angle to the rider's intended line. Unlike a visible rut where the rider can prepare, a hidden rut catch has zero reaction time. The bike changes direction suddenly, the rider's hands are loaded with the bar input from the rut wall, and the bike is already off-line before any correction can be attempted. This is not a traction failure — it is a terrain feature failure concealed by the grass surface.

---

## 4. Technique Implications

**Calibration discipline** — The primary technique demand of grass terrain is maintaining calibration across surface state transitions. A rider who has ridden a section in dry conditions must actively re-evaluate on subsequent wet approaches and resist applying dry-grass technique to wet-grass conditions. This recalibration is resisted by familiarity: experienced riders on known terrain are less likely to question a surface they have ridden successfully before, and grass changes state subtly enough that the re-evaluation cue (visual surface change) is weak. The correct discipline is to treat every wet grass approach as a new calibration event, not as a modified version of the dry surface.

**Speed management** — Speed on wet grass must be set before the section, not modulated within it. Wet grass does not support threshold braking to recover from excess entry speed. Braking in wet grass at angles other than straight-up produces both lock risk and lateral drift. The correct approach: identify the grass section from the approach, set speed on the last firm-grip surface, and enter at a speed that requires minimal braking within the section. See CONTROL-11 for braking threshold identification.

**Throttle management** — Smooth, progressive throttle application is essential on wet grass. Corner-exit throttle in wet grass should be later and softer than on hardpack. The traction break-away from rear wheel spin on wet grass is faster than on mud but slower than on rock — the rider has approximately one to two wheel rotations to detect and correct before spin becomes a committed slide. Early detection requires sustained rear wheel feel attention and willingness to back off throttle before the spin is fully established.

**Off-camber positioning** — Off-camber wet grass is the highest-consequence grass scenario and requires specific technique emphasis. Body weight should be on the outside peg, the bike leaning against the camber with the rider's body providing the counter-lean that keeps the tyres loaded. Any tendency to lean into the slope (toward the downhill side) transfers weight away from the uphill tyre and directly onto the traction surface already at its limit. See BIOMECH-03 for peg-weighting technique and CORNER-05 for off-camber cornering principles. If the off-camber section is also wet and steep, the correct coaching instruction may be a line choice rather than a technique correction — avoid the off-camber section entirely rather than attempting it with insufficient traction.

**Line selection** — Line choice on grass is primarily a surface state management decision. Where dry and wet grass coexist (common in partial shade or drainage areas), the driest available line should be taken even if it is longer. On hillside crossings, taking a more upright line (less off-camber) trades gradient difficulty for traction. On worn grass trails, staying within the worn corridor keeps the tyre on the exposed hardpack substrate and avoids the wet-grass fringe. Visual line reading for grass must also account for sub-surface hazards: areas of slightly different grass colour, texture, or height relative to surrounding grass can indicate underlying features (ruts, drainage lines, root mounds).

---

## 5. Gradient Interaction

**Uphill grass** — Dry grass on a gradient is manageable with standard technique. Traction is adequate for climbing without the momentum-dependency of mud. Wet grass on an uphill gradient becomes a meaningful challenge: rear wheel spin risk increases with gradient and any wheel spin on wet grass can escalate to a committed skid before the rider has time to modulate. The technique distinction from muddy climbs: on wet grass, smooth throttle avoids spin onset — there is less recovery available from spin once it starts. Clutch modulation (see CONTROL-06) to smooth drive delivery is beneficial on steep wet grass gradients.

**Downhill grass** — Wet grass descents require full downhill technique attention. The low traction coefficient means that both front and rear braking limits are reduced. Steeper descents with wet grass can produce understeer (front tyre tracking fall-line rather than steered line) if corner entry speed is too high, because the lateral friction budget of wet grass is insufficient to support the combination of speed, lean, and gradient loading. Engine braking distributes retardation without brake lock risk — preferred on wet grass descents over threshold rear braking.

**Off-camber gradient** — The combination of off-camber terrain and wet grass is the highest-difficulty gradient scenario for this surface. The lateral slip tendency from the camber plus the low lateral friction coefficient of the wet grass layer combine directly. The bike tends to track the fall-line of the slope regardless of rider steering input once the lateral traction limit is exceeded. On significantly angled off-camber wet grass, the correct coaching gate may be: is this rideable at all on this equipment and at this skill level? If the answer is uncertain, the response is a routing decision, not a technique instruction.

---

## 6. Hidden Sub-Surface Hazards

Rut-specific behaviour is not the primary concern on grass terrain. Section 6 is replaced here with Hidden Sub-Surface Hazards, which is the terrain-specific equivalent and the more significant coaching-relevant concern for grass.

Grass conceals terrain features. The uniform surface appearance provides no visual differentiation between grass over flat firm ground, grass over a rut, grass over a hidden rock, or grass over a drainage hole. The rider is navigating by the grass surface but the terrain below may be completely different from what the grass surface implies.

**Concealed ruts** — Vehicle or tyre ruts beneath the grass surface are particularly hazardous because the grass has recovered over the rut without filling it. The visual surface appears flat. The rut below catches the front wheel unexpectedly, redirecting it at an oblique angle mid-section. The correction required is much larger than a visible rut entry would require, because the wheel is already inside the rut before the rider has any cue. Concealed rut depth of 10–15 cm is sufficient to catch a tyre and produce a sudden directional change.

**Ground holes and depressions** — Animal burrows, drainage sumps, and soft-ground depressions in grass terrain can swallow a front wheel partially or fully at speed. The front wheel drops into the hole, decelerates abruptly, and the bike pitches over the front wheel. This is kinematically similar to an OTB event but with no preceding warning: the surface appeared uniform. Holes in grass terrain are most common in pasture land (animal activity) and at field edges (drainage features). They are not reliably identifiable from approach distance.

**Root mounds and root networks** — Dense root systems in grass terrain create irregular micro-topography — slight mounds and depressions that are invisible under the grass cover. At low speed these are minor handling events. At speed, root mound contacts produce sudden steering and suspension inputs that are unexpected because they are visually invisible. Root networks also create anisotropic traction — traction is higher along root lines than perpendicular to them — which can produce unexpected rear wheel behaviour under combined lateral and drive loading.

**Visual cues for sub-surface hazards** — Grass colour variation (yellower grass over a filled rut, darker grass over a drainage line, slightly raised or lower areas relative to surrounding grass) provides partial indication of sub-surface features. These cues require trained observation and are not reliably detectable at speed. The most reliable strategy for new grass sections: reduce speed to the point where the full depth of concealed hazards is manageable, until the section is verified by a slow pass or visual inspection.

---

## 7. Conditions Impact

**Dry conditions** — Dry grass is the reference state. Traction is primarily determined by sward density and root network strength. Well-maintained, dense grass on firm soil with good root coverage provides the highest-grip dry grass state. Sparse grass over thin soil provides moderate grip. Dry grass in late summer or early autumn may be brittle and have reduced blade-tip friction relative to healthy spring-summer grass — traction is slightly lower and the grass layer is more easily displaced under heavy loads. The traction envelope in dry conditions is predictable and consistent within a given section.

**Damp conditions** — Early morning dew, light mist, or the onset of rainfall creates damp grass. The lubricating film is beginning to form but the grip is still materially better than full wet. This is the most deceptive state because it appears dry but is no longer dry. Damp grass on gradient or off-camber terrain is the first scenario where the traction reduction becomes coaching-relevant — standard dry technique applied to damp grass will produce traction surprises at corner entry or on off-camber sections.

**Wet conditions** — Full wet grass, from sustained rainfall or heavy dew, produces the lowest-traction grass state (except frost). As described in Section 1, the lubricating film on wet grass blades dominates the tyre-surface interaction on firm substrates. The practical coaching note: wet grass should be treated as a low-grip surface at all times, regardless of how it has behaved previously on the same section. The rider's experience of dry grass is not transferable to wet grass beyond the gross line layout.

**Frost** — Frosted grass is the most hazardous condition variant because it is identifiable but only with attention. Morning frost in clear cold weather is reliably visible as a crystalline white coating. Partial frost in shaded sections is more hazardous: the unshaded entry grass is dry, the rider builds speed on familiar terrain, then enters the frosted section which provides near-zero grip. This spatial inconsistency within a single section is the highest-risk frost scenario.

**Traffic load** — Grass degrades under repeated wheel passes more rapidly than most terrain types. A grassy loop that is manageable early in a grass track event can transition to mud or churned soft ground through mid-to-late-field passage. Stage 4 classification must account for this when footage timestamp or event position is available — `surface.primary_type: grass` may be accurate for footage of early-pass riders but not for footage of later riders on the same section.

---

## 8. Entry / Exit Transitions

**Hardpack to grass** — Traction drops at the transition boundary, particularly in wet conditions. Speed and braking calibrated for hardpack will produce wheel lock or loss of directional control immediately on wet grass entry. Speed should be set on the hardpack approach before the grass transition, not adjusted within the grass section. The transition is abrupt rather than gradual: the moment the tyre is fully on the grass layer, the hardpack traction contribution disappears.

**Grass to mud** — In wet conditions, grass can transition to mud within a short distance, particularly at corners where drainage concentrates, on heavily trafficked lines, or in low-lying areas. The traction reduction continues, but the physics change: mud provides more progressive feedback than wet grass and the tyre penetrates the surface differently. Riders who are already managing wet grass technique should not assume the mud transition makes conditions worse by the same proportion — mud at certain depths may actually provide slightly better grip than wet grass over firm ground, while saturated mud is worse than either.

**Grass to rock or root sections** — Transitioning from grass to rock or exposed root networks produces sudden traction and handling character changes. Grass-calibrated grip and compliance expectations are wrong for both rock and root surfaces. The transition from wet grass to wet rock is particularly consequential: both are low-grip, but rock produces deflection events while grass does not. Riders who are already managing wet grass sliding may not adjust bar technique for the rock section in time.

**Partial grass transitions** — A worn trail through grass terrain leaves grass fringe either side of the worn corridor. Line deviation onto the grass fringe carries the full wet grass traction risk even if the worn section itself has adequate grip. This partial transition is common in event conditions where riders progressively push their line wider as the worn corridor deteriorates.

---

## 9. Interaction Patterns & Failure Triggers

**Wet grass off-camber washout** — Rider enters off-camber grassy hillside at dry-calibrated speed → wet conditions are present but surface appears similar to dry → corner entry → lateral traction demand from off-camber load exceeds the wet grass friction limit → front wheel tracks fall-line rather than steered line → front washes out progressively → lowside with relatively low warning. The defining characteristic: the slide develops gradually enough that the rider senses it happening but the surface provides insufficient grip for recovery steering.

**Hidden rut catch** — Rider traverses grassy section at appropriate speed → grass surface appears uniform → front wheel enters concealed rut at oblique angle → front wheel is redirected by rut wall → handlebar is deflected sharply → rider cannot pre-load the correction because the rut was not visible → bike is thrown off its planned line → depending on speed and rut depth, steer recovery or crash.

**Frost section entry failure** — Rider traverses a section of dry grass in morning conditions → grass appears normal on the approach → section transitions into shade where frost has persisted → tyre immediately loses grip on frosted grass → no meaningful deceleration or steering possible until frost section is exited → depending on gradient and obstacles, rider goes down or transitions onto adjacent non-frosted ground.

**Overconfidence calibration failure** — Rider has completed this section successfully in dry conditions → arrives for a second run under wet conditions → applies dry-calibrated entry speed and throttle → first corner on wet grass → rear wheel steps out at entry speed that was entirely safe dry → lowside. The failure mechanism is calibration anchored to a surface state that no longer exists. The visual appearance of the section is sufficiently similar that the rider does not register the need to recalibrate.

**Soft ground punch-through** — Rider enters grassy section, first pass feels like normal wet grass → subsequent passes (or single pass with soft substrate) drive tyre through grass layer into soft ground below → traction characteristics shift from grass-type to mud-type mid-section → rider is applying grass technique to a surface that now behaves as soft mud → rear wheel spin increases, momentum drops, bike sinks → bail or tip-over.

### Pipeline Identification Notes

`surface.primary_type: grass` confirmed by: visible grass blade structure on the terrain surface, green colouration, absence of rock, soil exposure, or loose aggregate as the dominant surface element. Wet grass: darker colouration, potential surface sheen from water film, flattened or matted blade appearance. Worn grass trail: central corridor of exposed dirt or hardpack with grass fringe, distinguishable from full-grass surface by the defined trail line.

`surface.condition: wet` on grass: visible blade matting and moisture sheen in footage at medium distance. `surface.condition: damp`: subtle colouration change without clear sheen — marginal reliability for pipeline classification. Frost: pale crystalline coating visible as bright white in appropriate lighting — highly identifiable when present.

Audio cues on grass: grass surfaces produce a soft, muted tyre sound with low-frequency swishing on longer grass. Distinct from hardpack (sharper tyre sound), mud (squelching), or rock (stone-striking). Long wet grass adds drag-swish sound as grass wraps around the tyre and panels. Wheel spin on wet grass is audible as a brief high-pitched spin event before the tyre re-seats.

Hidden sub-surface features (ruts, holes) are not observable from footage until the bike contacts them. The grass surface provides no visual warning of concealed terrain below.

### Observability Notes

**Reliably observable from footage:**
- Grass terrain classification: distinctive surface appearance in good lighting at most filming distances
- Wet vs dry state: matted, dark, or shiny grass blades are reliably visible in 3rd-person footage under most lighting conditions
- Frost state: highly identifiable from footage when well-lit
- Wheel spin or slip events on wet grass: brief rear wheel spin is visible as a tyre chirp or slide
- Worn grass trail vs full-grass surface: the worn corridor is visible as a colour contrast against adjacent grass
- Off-camber angle: slope angle is reliably visible in 3rd-person footage

**Inferable with caveats:**
- Damp vs wet state: distinction between early-damp and fully-wet grass is not reliable from footage; erring toward wet in coaching assessment is appropriate
- Grass height and density: partially assessable at close camera distance; affects whether tyres reach the soil below
- Substrate hardness (firm soil vs soft ground below grass layer): not directly observable but inferable from wheel sinkage visible under slow or stationary conditions
- Root network presence: not observable; inferred from terrain type context (natural meadow = likely rooted; field edge = variable)

**Cannot be determined from footage:**
- Concealed sub-surface features (ruts, holes, rocks beneath the grass) — not observable until the bike contacts them
- Grass moisture level at the sub-surface root zone (affects whether the grass-over-soft-ground state is developing)
- Frost section boundary locations within a partially frost-covered section
- Whether a traction event was caused by wet grass or by a concealed sub-surface feature — both can produce similar observed outcomes

---

## 10. False Signals / Illusions

**Dry grass confidence transfer** — Dry grass provides adequate traction for standard riding technique. Riders who have established a calibration on a dry grass section trust that calibration for subsequent passes and for superficially similar grass sections. Wet grass looks similar to dry grass in most lighting conditions at approach distance. The calibration transfers when it should not. This is the most common failure pattern on grass terrain and occurs specifically because the visual change between dry and wet grass is subtle while the traction change is significant.

**Green = safe** — Grass terrain appears benign: it is associated with pastoral, open riding and is often encountered in scenic or event contexts where conditions feel positive. The visual association of green grass with safe, enjoyable terrain creates a mental model that does not match the physics of wet or off-camber grass. Riders who are appropriately cautious on rock or mud often apply insufficient caution to grass because it does not look dangerous.

**Long grass as protection** — Long wet grass might appear to offer a softer landing or more forgiving surface than short wet grass. In traction terms, the opposite is sometimes true: long wet grass produces significant drag that removes forward momentum faster than expected, and the grip at the tyre surface is still near-zero when the blades are wet. The long grass drag is a false reassurance of surface control; the traction is not present to justify any additional confidence it might suggest.

**Uniform surface = uniform sub-surface** — Grass provides a uniformly flat visual surface regardless of what lies below it. Riders accustomed to terrain types where surface appearance reflects sub-surface conditions (rock where what you see is what you get, mud where surface texture indicates depth) develop a visual-to-physical mapping that fails completely on grass. The flat green surface tells nothing about whether there is a rut, a hole, a rock cluster, or a drainage channel below. This mental model mismatch is specifically hazardous on unfamiliar grass sections.

---

## 11. Terrain Demands / Constraints

**Minimum technique required for safe riding** — Speed set on firm-grip surface before entering grass section (see CONTROL-01); brake threshold recalibration for wet conditions — earlier initiation, significantly reduced threshold (see CONTROL-11, CONTROL-12); smooth throttle application — no aggressive drive on wet grass; off-camber weight management through outside peg (see BIOMECH-03); active visual scanning for sub-surface feature indicators (colour variation, height variation in grass cover).

**Tyre equipment** — Grass is less sensitive to tyre specification than mud or rock, but tyre pressure has meaningful effect. Lower pressures (12–15 psi) on wet grass improve contact patch size and allow the tyre to compress slightly into the grass and soil layer, improving penetration and traction. Hard-compound tyres provide less compound adhesion on grass blade tips than soft or intermediate compounds. Tyre specification is covered in domain-12; the pressure dependency is noted here because it is the most accessible equipment variable for wet grass improvement.

**Coaching pipeline relevance** — Grass failures generate moderately reliable pipeline signals. Traction failures (wet grass) and decision failures (calibration overconfidence) are the dominant categories. Line_choice failures on off-camber grass are also common and distinctive. Stage 6 classification confidence is moderate: the traction failure pattern on wet grass is observable, but the distinction between a traction failure and a hidden-feature catch may not be determinable from footage alone. Stage 8 causal chains for wet grass failures are typically short (two to three links): surface state → traction demand exceeds available grip → crash. Coaching counterfactuals are high-directness: reduce speed on wet grass approach, recalibrate for wet conditions, choose less off-camber line.

**Out-of-scope for this entry** — Hillside riding technique and field-crossing drill progressions are covered in domain-05 and domain-06. Braking technique and threshold identification are covered in CONTROL-11 and CONTROL-12. Throttle control for low-traction surfaces is covered in CONTROL-01. Tyre selection and pressure is covered in domain-12. Rut-specific technique for concealed ruts is covered in FEATURE-04. The Conditions & Adaptation entry (a cross-cutting modifier) will reference this entry for grass-specific wet and frost condition modifiers.
