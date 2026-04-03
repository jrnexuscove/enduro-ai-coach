---
# ── BLOCK 1: Pipeline Contract ──────────────────────────────────────────────
pipeline_contract:
  kb_type: terrain_feature
  pipeline_enum_value: [off_camber_left, off_camber_right]   # Maps to stage4_camber, not stage4_feature_type — see schema note
  feature_class: continuous               # single_event | continuous

# ── BLOCK 2: Retrieval Triggers ─────────────────────────────────────────────
retrieval_triggers:
  PRIMARY:                                # Top-ranked when off-camber geometry detected via camber field
    stage4_camber: [off_camber_left, off_camber_right]
  SECONDARY:                              # Crash or failure involving lateral traction
    stage6_failure_types: [traction, line_choice, technique, decision]
    stage7_crash_types: [lowside, tip_over]
  CONTEXTUAL:                             # General context signals
    stage3_intent_category: [trail_ride, traverse, descent, climb, technical_section]
    stage5_outcome: [crash, bail]

# ── BLOCK 3: Content Metadata ────────────────────────────────────────────────
content_metadata:
  topic_id: FEATURE-02
  title: Off-Camber / Side Slope — Feature Profile
  domain: Terrain Feature KB
  domain_id: features
  scope: "Feature identification, severity classification, and technique requirements
    for off-camber and side-slope terrain. Does NOT cover standing/seated fundamentals
    (see BIOMECH-01), general cornering technique (see CORNER-01 through CORNER-06),
    or surface physics of the underlying terrain (see Terrain KB entries). Where
    off-camber occurs within a corner, this entry covers camber-specific demands;
    CORNER entries cover the cornering fundamentals."
  status: draft
  feature_type: off_camber
  severity_definition:
    minor: "Gentle lateral slope under 10° from horizontal; rider can maintain line with minor weight adjustment; consequence of traction loss is slow lateral drift recoverable by steering correction"
    moderate: "Lateral slope 10–20° on a surface with reduced traction (wet grass, damp clay, loose gravel); sustained weight discipline required throughout the section; traction loss produces committed lateral drift with limited recovery window"
    significant: "Steep lateral slope over 20° or moderate slope on near-zero-traction surface (wet rock slab, frosted grass); continuous exposure with no rest point; traction loss produces a fall-line slide with very limited recovery"
    major: "Extreme lateral slope over 30° or sustained significant off-camber over extended distance (50m+) with no exit option; compounded by wet/frozen surface, obstacles, or gradient; consequence of traction loss is uncontrolled descent off the trail"
  severity_covered: [minor, moderate, significant, major]
  crash_types_associated: [lowside, tip_over]
  failure_types_associated: [traction, line_choice, technique, decision]
  common_misclassifications:
    - berm                                # A berm provides inward camber (assistance); off-camber is the opposite — outward slope working against the rider
    - "flat trail with drainage slope — very gentle drainage camber (<5°) is not coaching-relevant off-camber"
    - "banked corner misread as off-camber — if the slope assists the turn, it is a berm, not off-camber"
    - switchback                          # Switchbacks often include off-camber sections but the primary feature type is the turn geometry
  typical_body_position: standing
  difficulty_range: [beginner, intermediate, advanced]
  related_topics: [BIOMECH-01, BIOMECH-03, DYNAMICS-04, CORNER-02, CORNER-05, TERRAIN-01, TERRAIN-02, TERRAIN-03, TERRAIN-04]
  prerequisites: [BIOMECH-01, BIOMECH-03]
  tags: [off-camber, side-slope, camber, lateral, lean, traction, lowside, wet, grass, clay, peg-weighting, fall-line, traverse, exposure, continuous]
  version: 1.0
  last_updated: 2026-04-02
---

# FEATURE-02 — Off-Camber / Side Slope: Feature Profile

---

## 1. Feature Geometry & Physics *(MANDATORY)*

Off-camber terrain slopes laterally relative to the rider's direction of travel, applying a continuous gravitational component pulling the bike toward the downhill edge. Unlike single-event features, off-camber is a **continuous exposure feature** — the lateral force acts throughout the section and accumulates consequence over time and distance.

**Primary Observable Signature:** Sustained lateral slope requiring visible counter-lean, uphill weighting, or active line-holding against downhill drift.

**Dominant Risk Axis:** Lateral traction depletion and fall-line drift toward the downhill edge.

### Physical Zones

**Entry zone:** Where the rider must establish correct weight distribution, lean angle, and speed before the lateral force begins. The transition to full off-camber angle can be gradual or abrupt — on natural terrain, full off-camber may begin within one bike length.

**Extent zone:** Sustained off-camber with no natural rest point. Difficulty compounds with distance: fatigue, micro-corrections, and minor traction events accumulate throughout.

**Exit zone:** Transition back to neutral camber. An abrupt exit can produce overcorrection — the rider continues counter-leaning after the camber has flattened. If the exit leads to a corner, obstacle, or gradient change, the traction management transition must be active.

### Key Mechanic: Traction Budget

The off-camber lateral force consumes a portion of available traction throughout the section, leaving less for braking, acceleration, or directional changes. Combined inputs (e.g., braking on off-camber descent) are disproportionately risky because they draw on the same budget already partially committed to lateral resistance.

### Commitment & Reversibility Profile

**Point of no return:** Progressive rather than binary — the deeper into the section, the more committed, because turning around on off-camber is often harder than continuing. On steep or low-traction off-camber, stopping may be worse than continuing: a stationary bike loses gyroscopic stability while the lateral force remains.

**Recovery window:** Spatial, not temporal — measured in metres of trail width between the rider's current line and the downhill edge. Narrows as the rider drifts downhill; widens only if the rider can actively regain uphill position.

**Bailout options:** Stop and dismount uphill of the bike. On moderate off-camber, foot-down on the uphill side and stabilise. On steep off-camber, exit uphill only — exiting downhill places the rider below the bike. On extended sections with no flat rest points, retreat to the entry zone.

---

## 2. Feature Forms & Variants *(MANDATORY)*

> **Classification rule:** A feature classifies as off-camber when the defining challenge is sustained lateral slope working against the rider's intended line. It classifies as a berm when the lateral slope assists the rider's turn. It classifies as a switchback when the defining challenge is the turn geometry itself. Off-camber within a corner is covered here; the corner geometry is covered in CORNER entries.

### Hillside Traverse

Trail contouring horizontally across a hillside with continuous lateral tilt. Most common off-camber form in UK enduro. Exposure is continuous for the full traverse length — tens to hundreds of metres.

**Visual identification:** Trail crossing hillside at roughly constant elevation. Uphill edge visibly higher than downhill edge. Slope continues below the trail.

**Severity range:** Minor to major, set by slope angle and surface type. Dry hardpack at 10° = minor. Wet grass at 15° = moderate to significant. Any surface at 25°+ with exposure below = significant to major.

**Distinct failure pattern:** Progressive lateral drift. Repeated micro-slips accumulate over section length without any single visible event. When the rider registers the drift, they are on the most off-camber part of the trail with the least recovery width. Correction requires more traction than the original line — traction that may not be available on the surface that caused the drift.

### Off-Camber Corner

Corner where the trail surface slopes away from the apex. Cornering forces (centripetal, pushing outward) and off-camber gravitational component (also outward) compound multiplicatively.

**Visual identification:** Visible turn where the ground slopes away from the inside of the turn — downhill side is on the outside of the corner.

**Severity range:** Moderate to major. Off-camber corners are rarely minor because the combined force compound is inherently significant.

**Distinct failure pattern:** Front-wheel push to outside. Rider's lean angle set for a flat corner does not account for the off-camber component. Front tyre's lateral budget exceeded → front pushes wide → lowside or run-wide on low-traction surfaces.

### Off-Camber Descent

Downhill section with lateral tilt. Braking creates a three-way traction demand: lateral resistance + longitudinal braking + weight-forward transfer that unloads the rear tyre.

**Visual identification:** Trail descending with visible lateral tilt. Slope falls both forward (descent) and sideways (off-camber).

**Severity range:** Moderate to major. Even moderate gradient with moderate off-camber produces significant lateral drift risk under braking.

**Distinct failure pattern:** Rear-wheel lateral slide under braking. Braking unloads the rear tyre, reducing its lateral friction. Rear slides downhill while front tracks straighter. Bike rotates — rear end moves downhill of front. Releasing the brake allows recovery at moderate severity; continued braking produces spin-out or lowside.

### Off-Camber Climb

Uphill section with lateral tilt. Rear wheel heavily loaded under drive — typically lower immediate slide severity than descent. Escalates sharply on low-traction surfaces where drive demand and lateral resistance both compete for the rear tyre budget. A stalled climb on steep wet off-camber leaves the rider stationary with no gyroscopic stability.

**Visual identification:** Trail climbing with visible lateral tilt — less immediately obvious because rider focus is on the climb.

**Severity range:** Minor to moderate in most conditions. Significant on wet grass, mud, or steep gradients demanding high throttle.

**Distinct failure pattern:** Front-wheel downhill wander. Front lightly loaded on climb → lateral force drifts it downhill while rear under drive tracks the power line → bike angles across trail with front lower than rear.

### Rutted Off-Camber

Off-camber terrain with ruts running along the direction of travel. Rut walls provide lateral constraint, but the downhill wall has lower structural integrity (drainage and erosion weaken it — exactly the side toward which the bike is being pulled).

**Visual identification:** Visible ruts on a laterally tilted surface. Rut walls may be asymmetric — firmer uphill, softer/eroded downhill.

**Severity range:** Moderate to significant.

**Distinct failure pattern:** Downhill rut wall collapse. Lateral force pushes tyre against the downhill wall; wall fails; bike drops sideways off the rut line and onto open off-camber surface — exactly where the rider was relying on the rut for stability.

---

## 3. Bike Behaviour *(MANDATORY)*

This section covers mechanics unique to off-camber features. General traction, suspension, and steering behaviour: see Dynamics KB.

### Traction Asymmetry

Off-camber loads the tyre contact patch asymmetrically — the downhill edge bears more load. Effective lateral resistance area is reduced and the tyre may roll onto its sidewall at steep angles. The lateral demand scales steeply with angle — a doubling of off-camber angle more than doubles the required lateral resistance. (Exact proportion depends on speed, rider position, and dynamic loading.)

### Balance Mechanics

Maintaining balance requires uphill lean roughly proportionate to off-camber angle. A bike remaining vertical on off-camber has its CoM downhill of the contact patches and will fall toward the downhill side. In an off-camber corner, lean must compensate for both camber and cornering forces simultaneously.

### Suspension and Lateral Micro-Displacement

Suspension is designed for vertical loads. On off-camber rough terrain, each suspension event also produces a small lateral downhill displacement. Over a long section, these micro-displacements accumulate into visible drift — this is a physics constant, not a technique failure, but its rate is reduced by active uphill correction.

### Braking on Off-Camber

Braking simultaneously: (1) unloads the rear tyre via weight-forward transfer, reducing its lateral friction; (2) consumes a share of the front tyre's traction budget for longitudinal deceleration, reducing available lateral resistance. Both effects reduce lateral traction while the off-camber demand remains constant. Engine braking affects only the rear and more progressively than the lever, but still produces weight-forward transfer.

### Speed and Gyroscopic Stability

Speed provides gyroscopic stability that resists lateral tipping. Very low speed = near-zero gyroscopic help; moderate speed = the sweet spot; high speed = traction events develop faster than correction allows. The difficulty curve is non-monotonic — correct speed is the slowest controllable speed that maintains gyroscopic benefit.

---

## 4. Technique by Severity *(MANDATORY)*

### Minor (Gentle lateral slope under 10°, manageable surfaces)

**Technique:** Standing, weight centred through pegs with slight uphill bias. Smooth throttle and braking inputs. The bike may need a few degrees of uphill lean to track straight.

**Common errors:** Remaining seated — cannot weight pegs independently of bike lean. Overcorrecting — excessive uphill lean reduces downhill tyre contact patch and worsens lateral grip.

**Coaching gate:** Basic standing technique (BIOMECH-01) confirmed.

### Moderate (10–20° lateral slope on reduced-traction surfaces)

**Technique:** Deliberate uphill peg weighting before the camber begins. Upper body slightly uphill of the bike — bike leaned downhill, body counter-leans uphill. This separation of bike lean from body lean is the core technique. Steady speed set before entry. Steering minimal and smooth — track line through weighting and lean, not active steering. Exit: progressively reduce counter-lean as camber flattens.

**Common errors:** Weighting the downhill peg (instinctive but loads the wrong tyre edge). Leaning body downhill with the bike instead of counter-leaning. Braking within the section. Looking immediately ahead rather than through the section.

**Coaching gate:** Deliberate peg weighting (BIOMECH-03) confirmed — rider must be able to weight a specific peg independently of lean angle.

### Significant (Over 20°, or moderate slope on near-zero traction; continuous exposure)

**Technique:** Entry as far uphill as trail allows. Speed at the slowest controllable speed maintaining gyroscopic stability. Maximum uphill peg weighting with body positioned above or uphill of the contact patches. Arms relaxed — stiff arms convert every micro-bump into a steering input, consuming lateral traction. Manage fatigue on long sections — peg weighting and core engagement are physically demanding and degrade over extended exposure.

**Common errors:** Entering too fast. Entering on the downhill line — no recovery width if drift begins. Stiffening arms from fatigue. Overcorrecting with steering inputs (each steering input consumes lateral traction).

**Coaching gate:** Demonstrated counter-lean body position (body uphill, bike downhill) sustained over a full section. Core engagement maintained, not momentary. If footage shows seated, death-gripping, or downhill-peg weighting, address fundamentals before recommending significant off-camber. **Do not prescribe significant off-camber without confirmed moderate prerequisites.**

### Major (Extreme angle 30°+, extended distance 50m+, compounded by conditions)

**Technique:** Entry as far uphill as physically possible, minimum speed, full counter-lean and peg weighting. At this severity the rider manages the rate of drift, not elimination of it — keeping drift slow enough that available trail width absorbs it before the exit. At major severity, available traction on most surfaces may be insufficient for reliable lateral resistance regardless of technique quality.

**Common errors:** Attempting at moderate-severity speeds. Attempting on surfaces where lateral friction coefficient is plainly below the geometric demand (wet smooth rock, frost, ice).

**Coaching gate:** Stage 9 should assess whether the section is rideable before recommending technique. If slope angle and surface conditions indicate available friction is likely below required lateral resistance, coaching output should be: "This section may exceed available traction regardless of technique. Consider dismounting or choosing an alternative route."

---

## 5. Interaction Patterns & Failure Triggers *(MANDATORY)*

**Expected Outcome Patterns:**
- stable traverse
- controlled foot-down recovery
- progressive lateral drift
- line loss to downhill edge
- lowside
- tip-over
- bail / dismount uphill

### Failure Chain: Progressive Lateral Drift (traction / line_choice)

**Trigger:** Rider enters off-camber traverse on wet or loose surface.

**Mechanism:** Each micro-bump, terrain irregularity, or steering correction produces a small lateral downhill displacement — no single slip event is above the threshold of perception. After 20–50 metres the accumulated drift has moved the bike from upper to middle or lower trail edge.

**Outcome:** Rider now has less recovery width and is on a more severely tilted portion of the trail. Regaining uphill position requires more lateral traction than maintaining the original line — traction that may not be available. Rider continues to drift to trail edge → lowside, tip-over, or foot-down.

**Stage 6 classification:** `traction` (primary — cumulative micro-slips), `line_choice` (contributing — no active uphill correction)

### Failure Chain: Off-Camber Corner Washout (traction / technique)

**Trigger:** Rider enters off-camber corner at speed and lean angle set for a flat corner.

**Mechanism:** Centripetal cornering force and off-camber gravitational component combine. Total lateral demand on the front tyre exceeds available lateral friction. Front wheel pushes wide — tracks toward the outside of the corner rather than the steered line.

**Outcome:** Front drifts outward. Adding lean rolls the tyre onto its sidewall where grip is lower — worsening the slide. Braking to reduce speed unloads the rear, which may also slide. Most common outcome: front-wheel lowside toward the outside of the corner (downhill).

**Stage 6 classification:** `traction` (primary — friction limit exceeded), `technique` (contributing — lean and speed not adapted for off-camber)

### Failure Chain: Braking-Induced Rear Slide on Off-Camber Descent (technique / traction)

**Trigger:** Rider brakes on a descending off-camber section.

**Mechanism:** Braking shifts weight forward, unloading the rear tyre. Rear tyre's lateral friction reduces. Rear wheel slides downhill while front tracks straighter. Bike rotates — rear end moves downhill of front.

**Outcome:** Brake release at moderate severity allows rear to settle — recovery possible. Continued braking → rear continues sliding → spin-out or lowside with rear downhill.

**Stage 6 classification:** `technique` (primary — brake input on off-camber), `traction` (contributing — surface traction insufficient for combined demand)

### Failure Chain: Surface Transition Mid-Section (decision / traction)

**Trigger:** Off-camber section transitions from higher-grip to lower-grip surface partway through (e.g., grass to mud at corner apex where drainage concentrates).

**Mechanism:** Rider's technique is calibrated for entry surface. Transition to lower-grip surface occurs within the section at a critical point (apex, steepest angle). Lateral traction drops below demand before the rider can adjust speed, line, or body position.

**Outcome:** Sudden lateral drift or lowside at the transition point. Traction consequence of the surface change is not apparent until the tyre contacts it.

**Stage 6 classification:** `decision` (primary — rider continued through a visible surface change without adjusting), `traction` (contributing — new surface cannot sustain lateral demand)

### Pipeline Identification Notes

**Visual indicators for off-camber detection:**

*Approach:*
- Trail surface visibly tilted laterally — uphill edge higher than downhill edge
- Hillside terrain above and below the trail indicating a contouring path
- Trees or vegetation growing at an angle relative to the trail surface

*Execution:*
- Rider visibly counter-leaning or leaning uphill
- Bike lean angle that does not match the direction of travel (uphill lean on a straight section)
- Progressive lateral drift toward downhill edge
- Rear wheel lateral slide under braking or throttle

*Post-event:*
- Lowside toward the downhill edge
- Tip-over on the downhill side
- Rider foot-down on the uphill side to stabilise

**Audio markers:**
- Tyre scrubbing from lateral slip (sustained high-frequency scrape, distinct from brief throttle-spin chirp)
- No engine note change specific to off-camber (engine loads change from gradient, which may be concurrent)

**Severity indicators:**
- Slope angle: estimated from visible terrain, vegetation angle, bike lean relative to rider
- Section length: longer continuous sections = higher sustained difficulty
- Surface type: wet grass, wet rock, or mud dramatically increases severity
- Trail width: narrow trail with exposure below increases consequence
- Rider body position: active counter-lean = moderate+; struggling or foot-down = significant+

**Edge cases — flag Stage 4 confidence low:**
- POV footage: off-camber angle is extremely difficult to assess — the camera counter-leans with the rider, horizon may appear level even on significant off-camber; indirect indicators: bike appears to lean relative to vertical background objects
- Distant 3rd-person footage: subtle angles under 10° may not be visible
- Flat trail with drainage crown: under 5° drainage slope should not trigger off-camber classification

### Observability Notes

**1. Reliably confirmable from footage:**
- Off-camber presence — trail surface visibly tilted in 3rd-person footage at medium distance
- Rider body position: counter-lean or uphill lean visible
- Lateral drift: progressive line change toward downhill edge visible in overhead or medium-distance footage
- Crash direction: lowside toward downhill confirms off-camber as contributing factor
- Surface type and trail width / exposure

**2. Inferable with caveats:**
- Off-camber angle (estimated from bike lean, vegetation angle, terrain context — not measurable)
- Section length (estimated from footage duration and speed; full section may not be captured)
- Whether rider is actively weighting the uphill peg (body position suggests it; not directly confirmable)
- Surface traction level (estimated from surface type and condition)
- Cumulative micro-drift (requires sustained footage of full section; individual micro-slips not visible)

**3. Cannot be determined from footage:**
- Exact off-camber angle in degrees
- Tyre pressure and compound
- Sub-surface conditions (root networks, hidden moisture, frozen ground beneath surface layer)
- Rider fatigue level through a long section
- Whether counter-lean is by choice or instinct

---

## 6. Entry Discipline *(adapted from Approach & Setup Requirements)*

> *For continuous features, this section covers what the rider must establish before the off-camber section begins.*

**Speed selection:** Set before entry — not within the section. Correct speed balances gyroscopic stability benefit against reaction time for traction events. On low-traction surfaces (wet grass, mud, wet rock), correct entry speed may be near-walking pace. Speed adjustment within the section consumes lateral traction through braking or acceleration.

**Line selection:** As far uphill as the trail allows. Every metre of uphill position at entry is a metre of recovery width if drift occurs. On off-camber corners, wide uphill entry maximises available width through the apex where forces compound.

**Body position setup:** Standing with uphill peg weighting established before the camber begins. Transitioning from seated to standing within the section shifts weight unpredictably during the phase where weight placement is most critical.

---

## 7. Terrain & Condition Interaction

**Wet grass (TERRAIN-04):** Highest-risk surface for off-camber. Available lateral traction on wet grass at moderate off-camber may be below the gravitational lateral component — no technique prevents drift. Surface severity and feature severity multiply rather than add: a moderate-severity dry-grass section may become major severity on wet grass with no geometry change.

**Mud (TERRAIN-01):** Asymmetric contact patch loading on off-camber concentrates stress on the downhill tyre edge — the point most likely to exceed shear resistance first. Produces directional traction failure toward the downhill side.

**Rock (TERRAIN-03):** Dry textured rock provides moderate lateral traction through mechanical interlock. Wet smooth rock provides very little. Wet rock slab on off-camber is one of the most hazardous terrain-feature combinations — traction coefficient on smooth wet rock may be below the lateral gravitational demand at 15°.

**Hardpack (TERRAIN-02):** Best off-camber performance of common surfaces — high friction coefficient up to the limit, then abrupt break-away with little warning (unlike mud or grass which break progressively).

**Clay (TERRAIN-08):** Saturated clay is particularly hazardous — plastic deformation under lateral load means the tyre cannot find a stable contact surface.

**Condition modifiers:**
- Wet: reduces lateral traction on all surfaces; severity multiplier highest on smooth surfaces (grass, rock slab, polished hardpack).
- Frost: near-zero traction in all directions; off-camber frosted terrain effectively unrideable at any meaningful severity. Coaching output should be: dismount or avoid.
- Seasonal: UK spring = maximum moisture + wet grass = peak off-camber failure period. Autumn = leaf cover acts as lubricant on otherwise grippy surfaces.

**Compounding risks:**
- Off-camber entering directly into a braking zone or descent: combined traction demand.
- Surface transition mid-section: magnifies line-holding failure risk.
- Off-camber immediately after landing or major impact: instability before recovery is complete.

---

## 8. Section Exit & Recovery *(adapted from Exit, Landing & Recovery)*

> *Adapted to "Section Exit & Recovery" for continuous features.*

**Exit dynamics:** Gradual camber change → progressively reduce uphill peg weighting and allow bike to come upright. Abrupt exit → active body position transition required. Exit overcorrection risk: rider continues counter-leaning after camber has flattened — must actively register the change, not rely on feel alone (the body adapts to the camber angle and may not register the transition immediately).

**Speed management into exit:** If exit leads to a corner or braking zone, the traction budget that was committed to lateral resistance is now available — but the rider's calibration may still be set for off-camber mode, leading to excessive caution.

**Recovery from within-section errors:**
- Lateral drift: regaining uphill position requires more lateral traction than maintaining the original line. On moderate severity with adequate traction, possible with gentle sustained steering uphill. On significant severity or low traction, may not be feasible — accept the lower line and manage increased severity.
- Foot-down recovery: uphill foot stabilises the bike temporarily. Valid on moderate severity; may not be feasible on significant or major where slope angle makes stable foot placement difficult.

---

## 9. False Reads & Misidentification

**Dry-calibrated confidence on wet off-camber:** Most common rider misread. Rider applies speed and body position from dry-condition experience to same section in wet conditions. Identical geometry but a fraction of the available lateral traction. Compounded by the off-camber feature directly exploiting reduced traction.

**Underestimating the angle:** Off-camber angles are difficult to assess from the rider's perspective. The brain adjusts perceived horizontal to match the terrain — downplaying the actual angle, especially on gradual-entry sections where the reference frame tilts progressively.

**Confusing berm with off-camber:** Rider enters a corner expecting banking and finds off-camber — lean angle, speed, and body position set for a surface that assists the turn, encountering one that opposes it. Typically produces immediate front-wheel push to outside.

**POV footage:** Hardest feature to detect from POV — camera counter-leans with rider, horizon may appear level on significant off-camber. Indirect indicators: bike appears to lean relative to vertical background objects; rider's hands asymmetrically positioned on bars; trail surface visibly tilted relative to background features.

**Overhead drone footage:** Best camera angle for off-camber assessment — lateral slope clearly visible and line drift trackable.

**Low-angle 3rd-person footage:** Effective if camera shows trail cross-section. Less effective looking at the rider head-on (lateral angle foreshortened).

**Wet trail masking angle:** Standing water, mud, or wet leaves fills the low (downhill) side and creates a false level appearance. Leaf cover in autumn hides both the geometry and the surface traction state.

---

## 10. Coaching Gates & Prerequisites

### Minimum Prerequisites by Severity

**Minor:** Standing technique (BIOMECH-01). Basic peg awareness helpful but not strictly required.

**Moderate:** Deliberate peg weighting (BIOMECH-03) confirmed — rider must demonstrate weighting a specific peg independently of lean angle. Speed discipline — speed set before the section, not within it.

**Significant:** Moderate prerequisites plus: demonstrated counter-lean body position (body uphill, bike downhill) sustained over a full section; core engagement maintained throughout; uphill line selection awareness; braking managed before sections, not within them.

**Major:** Significant prerequisites plus: the coaching system must assess whether the section is rideable before recommending technique. At major severity, the correct output may be a decision recommendation, not a technique instruction. Prerequisites include judgment about when a section should not be attempted.

### Progression Model

1. Standing peg weighting on flat terrain
2. Deliberate uphill peg weighting on minor off-camber (dry)
3. Counter-lean body position on minor off-camber
4. Moderate off-camber on dry surfaces
5. Moderate off-camber on wet surfaces
6. Significant off-camber on dry surfaces
7. Significant off-camber on wet surfaces
8. Major severity (by necessity only — not a training target)

### "Do Not Coach Up" Thresholds

Stage 9 should decline to recommend next severity tier when:
- Footage shows seated position on off-camber sections (standing with peg weighting is a prerequisite for moderate+)
- Rider weights the downhill peg (incorrect muscle memory)
- Footage shows braking within the off-camber section (speed discipline not established)
- Line drifts progressively downhill through moderate-severity sections (peg weighting and counter-lean not effective)
- Surface conditions indicate major severity — recommend avoidance rather than technique

### Skill Category Tags

- `balance_standing` — minor+
- `peg_weighting_deliberate` — moderate+
- `counter_lean_sustained` — moderate+
- `speed_discipline_pre_section` — moderate+
- `core_engagement_sustained` — significant+
- `line_selection_uphill_bias` — significant+
- `decision_avoidance` — major

---

## 11. Feature Demands / Constraints

### Minimum Technique Required

Standing technique with peg weighting (BIOMECH-01, BIOMECH-03) at any coaching-relevant severity. Riders who cannot weight a specific peg independently should not attempt off-camber above minor severity. Moderate and above require deliberate counter-lean and speed discipline.

### Equipment Considerations

**Tyres:** Rounded profile allows more lean before sidewall contact. Square profile provides larger contact patch upright but transitions abruptly. Rounded profile more predictable for sustained off-camber. Marginal pressure reduction (1–2 psi) increases downhill contact patch area but increases tyre roll risk under sustained lateral load.

**Suspension:** No specific setup beyond normal trail settings. Rough off-camber generates lateral micro-displacement at each suspension event — stiffer compression damping marginally reduces displacement per event but increases vertical harshness. No optimal setup eliminates the lateral displacement fundamental.

**Handguards:** On wooded or bush off-camber, uphill side passes close to vegetation and rock walls. Contact can wrench bars and produce sudden steering inputs on terrain where steering stability is critical.

### Out-of-Scope Content

- Standing vs seated fundamentals → BIOMECH-01
- Peg weighting technique → BIOMECH-03
- Cornering technique and lean angle management → CORNER-01, CORNER-02, CORNER-05
- Weight distribution physics → DYNAMICS-04
- Surface physics for grass → TERRAIN-04
- Surface physics for mud → TERRAIN-01
- Surface physics for rock → TERRAIN-03
- Rut-specific technique → FEATURE-04
- Switchback technique (turn geometry with possible off-camber) → FEATURE-XX
