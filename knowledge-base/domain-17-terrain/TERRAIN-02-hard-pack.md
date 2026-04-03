---
# ── BLOCK 1: Pipeline Contract ──────────────────────────────────────────────
pipeline_contract:
  kb_type: terrain
  pipeline_enum_value: [hardpack]         # Exact Stage 4 surface.primary_type value

# ── BLOCK 2: Retrieval Triggers ─────────────────────────────────────────────
retrieval_triggers:
  PRIMARY:                                # Top-ranked when hardpack surface fires
    stage4_surface_type: [hardpack]
  SECONDARY:                              # Retrieve when primary fires or these signals are present
    stage6_failure_types: [traction, technique, line_choice, decision]
    stage4_gradient: [moderate_up, steep_up, very_steep_up, moderate_down, steep_down, very_steep_down]
    stage4_surface_condition: [dusty, dry, damp]
    scenario_cues: [clean_hard_pack, dust_over_hard_pack, polished_worn_hard_pack, rutted_hard_pack_shallow, rutted_hard_pack_deep, braking_bump_hard_pack]
  CONTEXTUAL:                             # Background context — retrieve when no closer match
    stage3_intent_category: [trail_ride, race_section, climb, descent, technical_section]
    stage4_features_detected: [rut]

# ── BLOCK 3: Content Metadata ────────────────────────────────────────────────
content_metadata:
  topic_id: TERRAIN-02
  title: Hard Pack — Terrain Profile
  domain: Terrain KB
  domain_id: terrain
  scope: "Surface physics, terrain states, and pipeline identification for hard-pack terrain.
    Does NOT cover cornering technique (see domain-04), braking technique (see CONTROL-11,
    CONTROL-12), or tyre selection (see domain-12)."
  status: draft
  surface_type: hardpack
  terrain_states:
    - clean_hard_pack
    - dust_over_hard_pack
    - polished_worn_hard_pack
    - rutted_hard_pack_shallow
    - rutted_hard_pack_deep
    - braking_bump_hard_pack
  conditions_covered: [dry, dusty, damp, wet]
  traction_range:
    dry: high
    dusty: low
    damp: moderate
    wet: moderate
  gradient_contexts: [flat, gentle_up, moderate_up, steep_up, very_steep_up, gentle_down, moderate_down, steep_down, very_steep_down]
  failure_types_associated: [traction, technique, line_choice, decision]
  common_misclassifications:
    - clay    # Clay shares surface rigidity but has a much lower wet-traction threshold and surface sheen when damp
    - gravel  # Loose gravel over hardpack resembles dust-over-hardpack; gravel particles are larger and more mobile
    - shale   # Compact shale can appear as hard pack; lateral traction on shale is significantly lower
    - rock    # Exposed rock sections in hardpack terrain may be misclassified as pure hardpack
  common_mixed_contexts:
    - "hardpack with gravel overlay — behaves as dust-over-hardpack with larger particle movement"
    - "hardpack with mud pockets in corners — primary type hardpack, corner traction significantly reduced"
    - "hardpack transitioning to clay under sustained wet conditions — traction drops non-linearly"
  difficulty_range: [beginner, intermediate, advanced]
  regional_terminology:
    UK: ["hard pack", "hard ground", "baked track", "packed earth", "firm trail"]
    AU_US: ["hardpack", "hard pack", "packed dirt", "hard-baked", "dirt"]
    note: "'Hard pack' is universally understood in off-road riding contexts. UK riders may
      use 'baked track' for summer dry conditions. The pipeline enum is one word: hardpack.
      Do not confuse with the motorsport term 'compact', which has different connotations."
  related_topics: [TERRAIN-01, TERRAIN-07, TERRAIN-08, DYNAMICS-04, CONTROL-01, CONTROL-05, CONTROL-11, CONTROL-12, CORNER-01, CORNER-05]
  prerequisites: []
  tags: hardpack, traction, braking, cornering, dust, polished, braking-bumps, ruts, high-grip, washout, lowside
  version: 1.0
  last_updated: 2026-04-02
---

# TERRAIN-02 — Hard Pack: Terrain Profile

---

## 1. Surface Physics

Hard pack is consolidated, compact terrain with minimal deformation under load. Its primary physical characteristic is that the tyre rides on the surface rather than in it — traction is generated through surface friction and mechanical interlock of tyre knobbly tips with surface texture micro-features, rather than through particle displacement or penetration. This distinction defines everything about how the bike behaves on it and what can go wrong.

The traction envelope of hard pack is typically higher than mud, sand, or loose surfaces, but it has a more abrupt break-away characteristic. When a tyre exceeds the friction coefficient of hard pack, it slides suddenly rather than progressively. The rider has materially less warning of a traction event than on mud or sand. This combination — high available grip with sharp break-away — means hard pack rewards precision and punishes overconfidence more consistently than any other common off-road surface.

Surface deformation is minimal: the terrain does not yield meaningfully under the tyre. Suspension behaviour is therefore governed entirely by terrain geometry — rocks, bumps, braking bumps, and surface irregularities translate directly into chassis inputs rather than being absorbed by surface deformation. Rough hard pack generates more chassis disturbance than equivalently rough mud for this reason.

The traction modifiers for hard pack have a non-linear relationship with surface condition. Dry clean hard pack offers the highest friction coefficients of any common off-road surface. Dusty hard pack introduces a lubricating layer that reduces surface friction disproportionately to the thin depth of the dust — a rider moving from clean to dusty hard pack is not on a slightly worse version of the same surface; they are on a surface that behaves by a fundamentally different mechanism. Wet hard pack is variable: slightly damp clay-content hard pack can show improved grip through particle adhesion; wet hard-mineral (granite-based) surfaces lose grip as the water film lubricates the tyre-surface contact.

---

## 2. Terrain States

**Clean hard pack** — Firm, well-consolidated surface with intact surface micro-texture providing direct mechanical interlock with tyre knobblies. Traction is moderate to high depending on mineral composition, surface age, and tyre compound. This is the reference state against which all other hard pack variants are evaluated. Visually: neutral colouration (tan, grey-brown, or red depending on geology), consistent surface texture without visible deformation from traffic, no dust cloud under wheel passage.

**Dust-over-hard-pack** — A thin layer of fine loose material — pulverised rock particles, dry clay fragments, or desiccated organic debris — overlying a firm consolidated base. This is the most deceptive hard pack state. The surface visually resembles soft loose soil or fine gravel. Riders who associate a loose visual texture with a deformable, forgiving surface expect the tyre to dig in and find grip below the loose layer. On dust-over-hard-pack, the tyre does not dig in — the dust layer is too thin for penetration and instead acts as a ball-bearing lubricant over the hard base. Traction is disproportionately lower than the visual appearance suggests. Common in late-summer dry conditions on sun-exposed slopes and in heavily trafficked sections where surface material has been progressively pulverised. The fuller analysis of the false-signal this creates is in Section 10.

**Polished / worn hard pack** — Repeated high-speed tyre passes over the same surface erode the micro-texture that provides mechanical interlock. The result is a smooth, glazed surface with genuinely reduced friction compared to virgin hard pack. The polishing effect is most pronounced on clay-content surfaces that respond to tyre abrasion. Visually identifiable by the polished or glazed appearance — most visible under low-angle light or when the surface reflects the sky. From a straight-on approach angle, polished hard pack can appear identical to clean hard pack, which is why it produces surprise traction events. Common on race tracks (particularly corners and braking zones), heavily trafficked trails, and inside-line corners after race-weekend use.

**Rutted hard pack (shallow)** — Hard pack with track deformations from repeated tyre and braking forces (under 4 cm). Hard pack ruts differ from mud ruts: they are formed by surface material being displaced laterally to form compressed ridges rather than compressed downward. The rut interior is often slightly softer than the surrounding surface (loosened material), while the rut edges can be harder compressed ridges. At speed, the front wheel can skip between shallow ruts rather than tracking cleanly — particularly apparent on rutted hard-pack descents at higher speed.

**Rutted hard pack (deep)** — Less common than deep mud ruts but occurring on sustained high-traffic sections and in braking zones (over 4 cm). The key hazard difference from mud ruts: hard pack rut walls have sharp, rigid edges rather than deformable mud walls. Inadvertent contact of the footpeg, engine case, or lower bike panel with a hard pack rut edge can produce sudden lateral force — potentially levering the bike abruptly off-line with considerably more violence than a mud rut contact.

**Braking-bump hard pack** — A specific surface deformation pattern: regularly spaced transverse ridges formed by rear-wheel braking forces on descents or approaches to corners. Unlike random surface roughness, braking bumps have near-regular spacing (approximately equal to the rear tyre circumference), a steep face on the uphill side (in the direction toward which braking force acts) and a gradual slope on the downhill side. Braking on developed bumps causes the wheel to skip between peaks, interrupting brake force and producing non-linear, unpredictable deceleration performance. Severity escalates with traffic volume — bumps that are minor mid-morning become significant by race afternoon. Common on motocross tracks and heavily ridden trail descents.

---

## 3. Bike Behaviour

**Traction delivery** — Hard pack delivers traction primarily through surface friction and tyre compound adhesion. The contact area between tyre and ground is smaller on hard pack than on deforming surfaces (because the surface does not wrap the tyre), so peak grip is determined by the tyre's compound softness and the surface's friction coefficient. Knobbly tyre architecture is less decisive than compound softness on hard pack — harder compound tyres lose grip on solid surfaces before soft or intermediate compounds, which is counter-intuitive to riders who associate hard compound with durability.

**Break-away characteristics** — Hard pack traction break-away is sharp. The transition from grip to slide is rapid when the friction limit is exceeded. On polished or dusty hard pack, this characteristic is amplified — the rider has a brief window between initial slide and committed slide, compared to the longer progressive warning of mud. Front wheel washout on dusty hard pack is particularly sudden: the tyre moves from directional tracking to a slide with very little intermediate feedback.

**Braking performance** — Clean hard pack offers the highest braking performance of any common off-road surface. The longitudinal friction coefficient under braking is higher than the lateral coefficient under cornering — allowing aggressive braking with well-calibrated technique. The risk is threshold identification: precise modulation is required because the feedback between controlled and locked-wheel braking is less progressive than on soft surfaces. Riders transitioning from mud or sand to hard pack commonly under-brake initially, then overcorrect once they discover the available stopping power.

**Front wheel behaviour** — The front wheel on clean hard pack has good directional stability under normal conditions but is susceptible to washout on cambered, dusty, or polished surfaces. Cornering loads on the front tyre must respect the lateral friction limit, which is lower than the longitudinal braking limit. Combining late braking and turn-in on hard pack overloads the front tyre along both axes simultaneously — the most common mechanism for front-wheel washout at this surface type.

**Rear wheel behaviour** — The rear wheel on hard pack is stable under drive but sensitive to combined loading — lateral force plus drive force at corner exit can push the rear tyre beyond its friction limit and produce rear wheel step-out. Engine braking on steep hard-pack descents can induce rear wheel lock if the engine braking force exceeds the available grip — particularly with worn tyres on polished hard pack. Rear wheel step-out on hard pack tends to be faster-developing than on mud: the sharp break-away characteristic applies to the rear as well as the front.

**Suspension behaviour** — Hard pack terrain features transfer fully to the chassis without surface absorption. Braking bumps produce a rhythmic chassis disturbance that compounds under sustained braking: the wheel skips between peaks, the braking force is briefly interrupted at each skip, and the chassis pitches forward and rearward cyclically. This rhythmic disturbance feeds back into steering through bar oscillation if the rider is gripping tightly. Rough hard pack with exposed rocks or roots produces sharp, high-frequency inputs requiring an active grip response (see BIOMECH-04).

---

## 4. Technique Implications

**Braking calibration** — The high braking performance of clean hard pack creates a calibration hazard for riders who have recently been riding softer or more forgiving surfaces. The transition requires deliberately recognising that the surface supports aggressive braking, re-establishing threshold feel, and not over-modulating out of caution. The opposite direction (transitioning from hard pack to mud) is more commonly a failure point — see TERRAIN-01 Section 8 for that transition.

**Cornering technique** — Lean angle is the primary cornering variable on hard pack. The relationship between lean angle, speed, and available grip is more sensitive than on deforming surfaces. Correct technique involves identifying the friction limit and staying within it, rather than managing surface deformation. Body position should keep weight over the outside peg and allow the bike to lean without the upper body exaggerating lean angle beyond the bike's lean. See CORNER-05 for lean angle mechanics; see CORNER-01 for entry/apex/exit theory as it applies to hard-pack line selection.

**Throttle management** — Clean hard pack allows smooth, confident throttle application. The risk zone is dusty or polished hard pack, where the friction coefficient is substantially lower than the visual appearance suggests. Corner-exit throttle on dusty hard pack with a rear tyre approaching the lateral friction limit can produce rear wheel step-out before the rider expects it — because the rider's calibration is set for clean hard pack traction. This is the primary throttle error on hard pack.

**Braking bump management** — Braking bump sections require specific bar technique: absorb bump energy through ankles and knees rather than transmitting it through arm tension into the handlebars. Gripping the bars tightly on developed braking bumps converts the rhythmic chassis disturbance directly into steering oscillation, reducing braking control and increasing the risk of bar snap. Feathering rather than pinning the brake lever through the bump section maintains better modulation — a consistent 80% application is more effective than a pinned application that unloads and reloads as the wheel skips.

**Line selection** — Line choice on hard pack is primarily a grip management decision rather than a traction creation decision (as it is in mud). On polished hard pack, the outside edge of a corner, which has received less traffic, may offer meaningfully better grip than the inside line. On dusty hard pack, any line that avoids accumulated dust (often swept to the outside edge by traffic, leaving the inside edge cleaner) should be preferred. These line choices are the inverse of mud and sand, where the outside edge typically has worse surface preparation.

---

## 5. Gradient Interaction

**Uphill hard pack** — Clean hard pack on a gradient is generally manageable with standard technique. The high traction allows riders to carry speed they would not be able to on softer surfaces. The risk is overconfidence on gradient transitions: a climb that begins on clean hard pack may transition to dusty or polished at a high-traffic section, and the rider's calibrated entry speed exceeds what the degraded surface state can support. Rear wheel spin on very steep hard-pack gradients is possible under high throttle, but less common than on other surfaces — the primary error is maintaining speed rather than managing it.

**Downhill hard pack** — Speed management is less hazardous on downhill hard pack than on mud but more hazardous than it appears. Braking-bump formation on descents is the primary compound risk: bumps that develop during the day create progressive difficulty for later riders. A rider who scouted the descent in the morning may find their braking points and technique no longer work on developed bumps by the afternoon. Engine braking provides a useful background retardation that reduces reliance on brake lever precision through bump sections (see CONTROL-05, CONTROL-16).

**Steep downhill hard pack** — On very steep hard pack with rough surface texture, sustained braking through the full descent can drive the front fork through available travel, reducing front wheel response and increasing the tendency for front wheel deflection off rocks and edges. Standing with weight rearward and allowing the front wheel to roll freely over obstacles (rather than weighting the fork toward the ground) maintains better control. Braking should be applied with the bike relatively upright, releasing for corners and re-applying on straights.

**Camber** — Off-camber hard pack is a higher consequence scenario than off-camber mud. On mud, lateral traction loss is gradual and the bike drifts with some warning. On hard pack, lateral traction holds at the full friction coefficient until the limit, then breaks away sharply. Off-camber hard-pack cornering on polished or dusty surface compresses both variables — reduced friction and sharp break-away — into a scenario where the failure can be complete before the rider has time to respond.

---

## 6. Rut Behaviour

**Shallow ruts on hard pack** — Shallow hard-pack ruts (under 4 cm) are minor influences on line choice. Because the rut material is harder than mud, rut walls hold their shape and the rut functions more as a groove than a channel. The edges are compressed ridges of displaced material. At speed, the front wheel can skip between shallow ruts rather than tracking into them — more apparent at higher speed and on descents where the wheel is lightly loaded. Edge contact at speed can produce brief handlebar deflection rather than the gradual push of mud rut edges.

**Deep ruts on hard pack** — Hard pack deep ruts have sharp, rigid walls rather than deformable mud walls. The key distinction is the consequence of unintended contact: footpeg or lower engine case contact with a hard pack rut wall can lever the bike abruptly sideways with significant force, potentially producing a sudden highside-like event or wheel deflection. The rider does not have the option of leaning into the wall for partial support as can sometimes occur in deep mud ruts.

**Braking ruts** — A specific rut variant: V-profile channels formed under repeated hard braking in the same spot on an approach to a corner. The uphill face of each rut is steep, the downhill face is gradual. Entering at speed produces front wheel trapping with rigid walls — similar in mechanism to deep mud ruts but with substantially less wall compliance. These are common at the entry to timed-section starts and the braking zones of heavily raced natural terrain courses.

**Rut depth assessment on hard pack** — Hard pack ruts are more difficult to assess for depth from approach than mud ruts because the colour contrast between rut interior and rut edge is lower. 3rd-person footage at a low angle or with adequate lighting provides better depth assessment than POV footage where rut depth is almost entirely non-observable.

---

## 7. Conditions Impact

**Dry conditions** — Dry, clean hard pack is the reference state — highest traction, most predictable behaviour. However, dry conditions promote dust formation through progressive surface particle loosening, particularly on clay-content surfaces. A trail that starts the season as clean hard pack will develop dust cover through summer traffic on exposed sections. This is a progressive seasonal degradation pattern relevant to repeated-use venues.

**Dusty conditions** — A thin layer of fine dust (Stage 4 `surface.condition: dusty`) produces the dust-over-hard-pack state. The depth and mobility of the dust layer varies: fine clay dust is more lubricating than coarse rock-particle dust. The effect on traction is disproportionate to the thin depth of the layer. Dawn and late-afternoon conditions in dry summer may produce dew-dampened dust that temporarily improves grip — this is transient and varies along the trail by exposure.

**Wet conditions** — Water on hard-mineral (granite, quartz-rich) hard pack typically reduces traction through lubrication. Water on clay-content hard pack produces variable results: slightly damp clay-content surfaces show improved grip through particle adhesion and increased friction coefficient; sustained or heavy rain saturates the clay to the point where it begins to deform under load and transitions toward clay-surface behaviour with substantially lower traction. This non-linear response is a significant diagnostic challenge for Stage 4 — the visual appearance of wet hard pack and transitioning clay-hard-pack is similar.

**Freeze-thaw effects** — Hard pack exposed to freeze-thaw cycles can develop surface upheaval as water freezes in the particle matrix and expands. Post-thaw hard pack may be softer and more irregular than its pre-freeze state for several days, as the particle matrix has been disrupted and not yet re-compacted. This temporary condition resembles loosened compacted material more than true hard pack, and may be misclassified.

---

## 8. Entry / Exit Transitions

**Mud to hard pack** — Tyres contaminated with mud carry reduced grip onto hard pack, particularly in the first 10–30 metres. The rear tyre is most at risk under braking or corner-exit throttle: mud-packed knobblies on hard pack can produce rear wheel step-out before the tread has self-cleared. Allow several metres of straightline running before loading the tyres with braking or cornering forces.

**Hard pack to mud** — Speed and technique calibrated for hard pack is inappropriate for mud entry. This is the most common transition failure — full treatment in TERRAIN-01 Section 8. The pipeline should consider this transition whenever `surface.primary_type` changes between hard pack and mud within the same clip.

**Hard pack to gravel** — Loose gravel over hard pack shares the lubricating-layer mechanism with dust-over-hard-pack but with larger, more mobile particles. This transition is a common misclassification trigger: gravel has the visual characteristics of both a discrete surface type and a hard-pack modifier. See `common_misclassifications` in frontmatter.

**Track to adjacent open ground** — Moving from a defined trail (worn, compacted hard pack) to adjacent undisturbed ground can produce sudden traction changes in either direction — adjacent ground may be softer (loose organic material) or harder (bedrock) than the trail. Stage 4 will classify on primary surface type; coaching should acknowledge the possibility of adjacent surface variation in any scenario where the rider leaves the defined line.

---

## 9. Interaction Patterns & Failure Triggers

**Dust deception failure chain** — Stage 4 classifies surface as `hardpack` with `condition: dusty` (or dry with unrecognised dust texture) → rider maintains hard-pack-calibrated entry speed and lean angle → corner entry produces front wheel understeer as tyre rides on dust lubricant layer rather than compressing through it → rider increases lean angle to tighten the line → lean angle exceeds lateral friction limit of dust-over-hard-pack (which is substantially lower than clean hard pack) → front wheel washes out suddenly → lowside with little warning.

**Braking bump escalation** — Rider enters descent on hard pack → braking bumps develop through the section → rider applies consistent braking force → wheels skip between bump peaks → effective braking force interrupted rhythmically → stopping distance extends beyond expectation → rider does not reach target entry speed for corner → enters corner with excess speed → front wheel overloaded on corner entry → OTB or front push.

**Polished corner washout** — Surface appears as standard dry hard pack → rider selects inside line (most polished, highest traffic) → corner exit throttle applied with rear tyre near lateral limit → rear tyre on polished surface produces step-out at lower throttle level than expected → rider cannot correct at speed → lowside or high-speed slide.

**Combined-load front washout** — Rider carries speed into corner with late braking → braking and cornering loads are applied simultaneously → front tyre longitudinal and lateral friction budget exceeded simultaneously → front wheel slides forward and outward → OTB or crash without meaningful warning phase.

**Observable surface indicators for Stage 4 classification** — Clean hard pack: no surface deformation or dust cloud under wheel pass, consistent colouration and texture. Dusty condition: visible dust cloud displaced by wheel pass, general dust haze behind bike in dry conditions. Polished surface: slight surface sheen visible under oblique or low-angle light — not reliably visible in overcast or head-on footage. Braking bumps: transverse surface ridges visible on descent footage, regularly spaced, steep uphill face. Rutted state: channel lines with compressed edges visible. Audio: hard pack produces a consistent engine note without the cyclical load variation of soft-surface traction events; wheel skip on braking bumps produces brief engine over-rev as the wheel unloads momentarily.

**Pipeline Identification Notes** — `surface.primary_type: hardpack` confirmed by: surface rigidity (no deformation under wheel pass), consistent colour and texture, firm-surface audio (stone tapping, no mud squelch). `surface.condition: dusty` identified by dust displacement during wheel pass and dust plume behind the bike. Polished surface is not reliably distinguishable from clean hard pack in medium-distance footage — pipeline should flag when footage shows a heavily trafficked trail or race-day context and apply polished consideration. Braking bumps are visually identifiable from 3rd-person footage at correct angle; not identifiable from POV unless the chassis disturbance is visible. **Observability note:** Hard pack and firm clay are not reliably distinguishable from footage without geological context — pipeline should consider both in ambiguous cases. Dust layer depth (thin dust vs thick loose gravel) is not determinable from footage. Polishing level is not assessable in most filming conditions.

---

## 10. False Signals / Illusions

**Dust-over-hard-pack false grip signal** — This is the defining deception of hard-pack terrain. Dust-covered hard pack resembles loose soft soil or fine gravel at a glance. Riders who have trained to associate a visually loose texture with a forgiving, deformable surface — where the tyre digs in and finds traction below the loose layer — apply this expectation to dust-over-hard-pack. The expectation is wrong: the dust layer is too thin and too fine for tyre penetration. The tyre rides on the dust, which acts as a lubricant over the base, and traction is substantially lower than it appears. Riders who have recently been riding true loose surfaces (sand, loam) are specifically vulnerable. The overconfidence is calibrated by the wrong surface mental model, not just by excess speed.

**Polished surface confidence** — Polished hard pack is visually indistinguishable from clean hard pack when viewed from the approach angle. The glazed appearance that identifies polishing is most visible under oblique lighting or from a standing position looking across the surface — neither of which is available to a rider at approach speed. Riders who have ridden a trail previously, or who are following a line that feels established and safe, may not perceive the progressive polishing that develops over a race weekend or repeated-use season. The failure is calibrated to an accurate memory of the surface that is no longer accurate.

**Wet clay improved-grip illusion** — Slightly damp clay-content hard pack may genuinely feel grippier than dry for the opening section of a wet trail — the moisture adds adhesion and raises the friction coefficient briefly. This creates a false confidence that the full wet trail offers improved conditions. Clay hard pack behaves non-linearly with saturation: once the moisture content exceeds the field capacity, traction drops rapidly toward clay or mud levels with almost no warning between the improved-damp state and the saturated low-traction state.

**Smooth surface = safe surface** — Smooth hard pack (polished or rolled) looks more benign than rough hard pack. Riders associate surface smoothness with easier riding — less handlebar input required, more predictable surface. The traction physics are the opposite: rough hard pack with surface micro-texture provides more mechanical interlock than smooth polished hard pack. The visually "nicer" surface has worse grip characteristics.

---

## 11. Terrain Demands / Constraints

**Minimum technique required for safe riding** — Precise braking threshold identification (see CONTROL-11, CONTROL-12); lean angle awareness and management in cornering (see CORNER-05); bump absorption through knees and ankles rather than through bar grip (see BIOMECH-01, BIOMECH-04); line reading for surface state variation, particularly for dusty and polished sub-states.

**Coaching pipeline relevance** — Hard pack failures are well-suited to confident Stage 6 classification because the failure patterns are mechanistically distinct. Washout (traction failure), over-run (decision + speed), braking bump mismanagement (technique), and dusty line choice (line_choice) each produce different observable indicators in footage. Stage 7 crash type on hard pack is most commonly lowside (front or rear washout) or OTB (over-braking or combined load). Causal chains for hard pack failures typically have higher confidence than mud chains because the surface behaviour is more deterministic — when the friction limit is known, the chain from cause to outcome is direct.

**Tyre equipment** — Hard compound tyres underperform on hard pack — a counter-intuitive finding for new riders who associate compound hardness with speed. Soft or intermediate compound tyres generate higher friction coefficients on consolidated surfaces through greater conformity to surface micro-features. Tyre specification for hard pack is covered in domain-12; the performance dependency on compound softness is noted here because it is directly relevant to coaching interpretation of traction failure events.

**Out-of-scope for this entry** — Cornering technique is covered in domain-04. Braking technique and threshold identification are covered in CONTROL-11 and CONTROL-12. Engine braking management is covered in CONTROL-05 and CONTROL-16. Tyre selection and pressure is covered in domain-12. The Conditions & Adaptation entry will be generated separately as a cross-cutting modifier.
