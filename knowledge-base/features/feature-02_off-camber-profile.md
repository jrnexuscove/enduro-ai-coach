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

Off-camber terrain is any surface where the ground slopes laterally relative to the rider's direction of travel, tilting the bike and rider toward the outside or downhill edge. The defining characteristic is a sustained lateral gravitational component acting on the bike's centre of mass, pulling it sideways off the intended line. Unlike a jump where the critical event is a single moment at the lip, off-camber is a continuous exposure feature — the lateral force acts throughout the section and accumulates consequence over time and distance.

**Primary Observable Signature:** Sustained lateral slope requiring visible counter-lean, uphill weighting, or line-holding against downhill drift.

**Dominant Risk Axis:** Lateral traction depletion and fall-line drift toward the downhill edge.

### Physical Zones — Entry / Extent / Exit

**Entry zone:** The transition from neutral or favourable camber into the off-camber section. This is where the lateral force begins and where the rider must establish the weight distribution, lean angle, and speed that will sustain them through the section. On well-defined trails, the entry may be gradual — the trail surface tilts progressively over several metres. On natural terrain, the entry can be abrupt: a trail contouring around a hillside may transition to full off-camber within a single bike length.

**Extent zone:** The sustained off-camber section where the lateral slope is continuous. This is the exposure duration — the period during which the rider must maintain active balance against the lateral force. The extent may be a few metres on a tight trail corner or hundreds of metres on a hillside traverse. Difficulty compounds with distance: fatigue, micro-corrections, and minor traction events accumulate. Unlike single-event features where difficulty concentrates at one moment, off-camber difficulty is distributed across the full extent with no natural rest point.

**Exit zone:** The transition back to neutral camber or to a different terrain feature. The exit may be a relief (camber flattens) or a compounded challenge (off-camber exits into a corner, obstacle, or gradient change). If the rider has been compensating heavily through the section — leaning uphill, weighting the inside peg — the exit can produce an overcorrection as the lateral force disappears and the compensating body position is suddenly excessive for the neutral surface that follows.

### Force Vectors

Gravity acts vertically downward on the combined bike-rider centre of mass. On flat terrain, the ground's normal force acts directly upward — the two forces balance and no lateral component exists. On off-camber terrain, the ground surface is tilted, so the normal force acts perpendicular to the slope rather than vertically upward. The difference between gravitational pull (straight down) and the ground's reaction force (perpendicular to the slope) produces a net lateral force component that pushes the tyre contact patches toward the downhill edge.

The rider's available traction must resist this lateral force to maintain the intended line. The traction budget has a fixed maximum determined by surface type, tyre compound, and wheel load. On off-camber terrain, a portion of this budget is consumed by resisting the lateral gravitational component, leaving less available for braking, acceleration, or directional changes. The steeper the off-camber angle, the greater the proportion of the traction budget consumed by lateral resistance, and the less remains for any other demand. This is why off-camber terrain punishes combined inputs — braking on off-camber adds a longitudinal traction demand to the lateral one, and the combined demand can exceed the total budget even at angles and speeds that would be manageable if only one demand were present.

### Why This Creates a Distinct Riding Problem

Off-camber is the only common feature type where gravity works continuously against the rider's intended line. On flat terrain, gravity loads the tyres vertically and assists traction. On off-camber, gravity pulls the bike sideways off the line. This lateral force is constant and unrelenting — the rider cannot "get past" it the way they can get past a rock, a jump, or a rut. Every metre of the section requires the same active resistance. The cumulative effect is that off-camber sections demand sustained concentration, sustained body position discipline, and sustained traction management over the full section length — a qualitatively different demand from the brief intensity of single-event features.

The interaction with surface type is multiplicative rather than additive. Dry hardpack off-camber at 15° is a moderate challenge. Wet grass off-camber at 15° can be a significant or major challenge, because the available traction is dramatically lower while the lateral demand is identical. This surface-angle interaction is what makes off-camber the most common UK enduro failure geometry: UK conditions combine moderate slopes with wet grass, damp clay, and slippery root surfaces — surfaces that reduce traction precisely when lateral traction demand is highest.

### Commitment & Reversibility Profile

**Point of no return:** Unlike single-event features, off-camber has no single commitment point. The rider can typically stop or slow at any point in the section. However, stopping on off-camber terrain does not resolve the lateral force — the bike is still being pulled sideways while stationary. On steep or low-traction off-camber, stopping may be worse than continuing: a moving bike has gyroscopic stability that a stationary bike does not, and a stationary bike on steep off-camber will slide or tip. The commitment is therefore progressive rather than binary — the deeper into the section, the more committed, because turning around or reversing on off-camber is often more difficult than continuing.

**Recovery window:** The recovery window for off-camber is the full section width — the distance between the rider's current line and the downhill edge where recovery is no longer possible. Unlike a jump where the recovery window is temporal (measured in seconds of airtime), the off-camber recovery window is spatial (measured in metres of trail width available on the downhill side). The window narrows as the rider drifts downhill and widens if the rider can regain uphill position. On narrow trails with steep drop-offs on the downhill side, the recovery window may be as small as one metre — a single lateral drift event can consume it entirely.

**Bailout options:** The primary bailout is stopping and dismounting uphill of the bike. On moderate off-camber, the rider can foot-down on the uphill side and stabilise. On steep off-camber, dismounting cleanly requires the bike to be stationary and the rider must exit uphill — exiting downhill places the rider below the bike with the bike potentially sliding down onto them. On extended off-camber with no flat rest points, the bailout may be retreating to the entry zone.

---

## 2. Feature Forms & Variants *(MANDATORY)*

> **Classification rule:** A feature classifies as off-camber when the defining challenge is sustained lateral slope working against the rider's intended line. It classifies as a berm when the lateral slope assists the rider's turn by providing inward banking. It classifies as a switchback when the defining challenge is the turn geometry itself, even if off-camber sections exist within the turn. Off-camber within a corner is covered here; the corner itself is covered in CORNER entries.

### Hillside Traverse

The most common off-camber form in UK enduro: a trail that contours horizontally across a hillside, with the uphill slope above the trail and the downhill slope below. The trail surface itself is tilted at the hillside angle (or close to it). The rider travels roughly perpendicular to the fall-line. The off-camber exposure is continuous for the full traverse length, which can be tens or hundreds of metres.

**Visual identification:** Trail visible crossing a hillside at roughly constant elevation. The uphill edge of the trail is visibly higher than the downhill edge. The slope continues below the trail — the downhill edge is not the bottom of a feature but the edge of the hillside.

**Severity range:** Minor to major, determined primarily by slope angle and surface type. Dry hardpack at 10° is minor. Wet grass at 15° is moderate to significant. Any surface at 25°+ with exposure below the trail is significant to major.

**Distinct failure pattern:** Progressive lateral drift. The rider enters the traverse at the correct line (upper edge of the trail). Over the section length, repeated micro-slips on the off-camber surface move the line progressively downhill. The rider does not notice any single slip event — each is individually minor — but the accumulated drift moves the bike from the upper trail edge toward the lower edge. When the rider recognises the drift, they are now riding on the most off-camber part of the trail with the least available recovery width. Correction requires regaining uphill position, which demands more traction than maintaining the original line — traction that may not be available on the surface that caused the drift.

### Off-Camber Corner

A corner where the road or trail surface slopes away from the apex — the opposite of a banked corner (berm). The outside edge of the turn is higher than the inside edge, or the entire trail surface tilts outward on a hillside. The cornering forces (centripetal demand pushing the bike outward) combine with the off-camber gravitational component (also pushing outward), producing a compounded lateral force that substantially exceeds either demand alone.

**Visual identification:** A visible turn in the trail where the ground slopes away from the inside of the turn. The downhill side of the trail is on the outside of the corner. The rider must turn while the surface pushes them toward the outside — the opposite of a berm where the slope would assist the turn.

**Severity range:** Moderate to major. Off-camber corners are rarely minor because the combination of cornering forces and camber forces is inherently multiplicative. Even gentle off-camber angles on dry surfaces create meaningful challenge when combined with cornering loads.

**Distinct failure pattern:** Front-wheel push to outside. The rider enters the corner at a speed and lean angle appropriate for a flat corner. The off-camber adds an outward gravitational component that the rider's lean angle does not account for. The front tyre's lateral traction budget is consumed by the combined cornering and camber demand. The front wheel pushes wide (understeers), tracking toward the outside edge of the trail rather than following the rider's steered line. On low-traction surfaces, this push develops gradually — the rider senses the front drifting but does not have enough lateral traction to correct it by adding lean. The result is either running wide (off the trail on the outside) or a lowside when the front tyre exceeds its lateral friction limit.

### Off-Camber Descent

A downhill section where the trail surface is tilted laterally. The rider is managing both the downhill gradient and the off-camber angle simultaneously. Braking on a surface that is already consuming traction to resist lateral force creates a three-way traction demand: lateral resistance, longitudinal braking, and the weight-forward shift from deceleration that unloads the rear tyre (the tyre with the most lateral traction contribution from the rear footpeg weighting).

**Visual identification:** Trail descending at an angle with visible lateral tilt. The slope falls away both forward (descent) and sideways (off-camber). The downhill and lateral fall-lines are at an angle to each other — the bike wants to follow the combined fall-line (diagonally down the hill) rather than the trail.

**Severity range:** Moderate to major. The combination of gradient and off-camber is inherently compound. Even moderate gradient with moderate off-camber produces significant lateral drift risk under braking.

**Distinct failure pattern:** Rear-wheel lateral slide under braking. The rider brakes on the descent, shifting weight forward and unloading the rear tyre. The rear tyre, now carrying less weight, has reduced lateral traction resistance against the off-camber force. The rear wheel slides downhill while the front wheel (more loaded under braking) tracks straighter. The bike adopts an increasingly sideways attitude — the rear end slides downhill of the front end. If the rider does not release the brake and rebalance, the angle continues to increase until the rear swings fully around (spin-out) or the front washes out (lowside).

### Off-Camber Climb

An uphill section with lateral tilt. Often lower immediate slide severity than off-camber descent because the climbing gradient naturally loads the rear wheel and the rear tyre is under drive traction rather than braking traction. However, severity can escalate sharply when drive demand, low traction, and exposure combine — a stalled climb on steep wet off-camber leaves the rider stationary on a slope with no gyroscopic stability and limited restart options. The failure mode shifts from lateral slide to front-wheel drift: the front wheel, lightly loaded on the climb and receiving the lateral gravitational force, drifts downhill while the rear wheel maintains drive traction on the uphill side.

**Visual identification:** Trail climbing at an angle with visible lateral tilt. Less immediately obvious than off-camber descent because the rider's attention is focused on the climb difficulty rather than the lateral angle.

**Severity range:** Minor to moderate in most conditions. Elevated to significant when combined with low-traction surfaces (wet grass, mud) or steep climbing gradients that demand high throttle (consuming rear traction budget for drive rather than lateral resistance).

**Distinct failure pattern:** Front-wheel downhill wander. The lightly loaded front wheel on a climb does not resist the lateral gravitational force effectively. The rider steers for the intended line but the front tracks progressively downhill. Because the rear wheel is under drive traction and more heavily loaded, it continues to track the rider's power line — the bike gradually angles across the trail with the front end lower than the rear. On narrow trails, this wander moves the front wheel off the trail edge.

### Rutted Off-Camber

Off-camber terrain with ruts running approximately along the direction of travel. The ruts channel the wheels but the rut floor is itself tilted at the off-camber angle. The rut walls provide some lateral constraint but — particularly in mud — the wall on the downhill side has less structural integrity (the material is looser and wetter on the downhill edge where water drains). The result is a section where the bike is both constrained by the rut and pulled sideways by the camber, with the constraining wall weakest on the side toward which the bike is being pulled.

**Visual identification:** Visible rut channels on a trail surface that is clearly tilted laterally. Rut walls may be asymmetric — firmer on the uphill side, softer or eroded on the downhill side.

**Severity range:** Moderate to significant. The rut adds constraint that can either help (preventing lateral drift) or trap (preventing escape if the rut floor collapses or the downhill wall fails).

**Distinct failure pattern:** Downhill rut wall collapse. The bike rides in a rut on off-camber terrain. The lateral force pushes the tyre against the downhill rut wall. The wall has lower structural integrity than the uphill wall (water drainage and erosion weaken the downhill side). The tyre pushes through the downhill wall, and the bike drops sideways off the rut line. The rider loses the rut's lateral constraint and is now on the open off-camber surface at a point where they were relying on the rut for stability.

---

## 3. Bike Behaviour *(MANDATORY)*

This section describes the mechanical response of the motorcycle to off-camber terrain at the physics level. No coaching language, rider intent, or corrective advice — that content belongs in Section 4.

### Tyre Contact Patch and Lateral Force

On off-camber terrain, the tyre contact patch is loaded asymmetrically. The downhill edge of the contact patch bears more load than the uphill edge because the gravitational component is directed toward the downhill side. This asymmetric loading reduces the effective contact patch area contributing to lateral resistance and concentrates stress on the downhill tyre edge. At steeper off-camber angles, the tyre may begin to roll off its crown onto its sidewall — a region with less tread compound and lower grip.

The lateral force that the tyre must resist increases with the off-camber angle. As a rough guide: at gentle angles (around 10°), a modest fraction of the tyre's load acts laterally; at moderate angles (around 20°), roughly a third of the load becomes lateral force; at steep angles (around 30°), roughly half the load is acting sideways. The exact proportion depends on rider position, speed, and dynamic loading, but the key principle is that the lateral demand scales steeply with angle — a doubling of the off-camber angle more than doubles the lateral force the tyre must resist.

### Lean Angle Mechanics

On flat terrain, the bike leans into corners and the lean angle is matched by the centripetal acceleration of the turn — the system is in dynamic balance. On off-camber terrain, the bike must lean uphill (toward the high side of the slope) to position the combined centre of mass above the tyre contact patches. If the bike remains vertical on off-camber terrain, the centre of mass is actually downhill of the contact patches, and the bike will fall toward the downhill side.

Maintaining balance on off-camber terrain generally requires uphill lean roughly proportionate to the off-camber angle, modified by speed, surface grip, and line. A steeper slope demands more uphill lean. In an off-camber corner, the lean angle must compensate for both the camber and the cornering forces — the required lean is significantly greater than either demand alone.

### Suspension Response

Suspension behaviour on off-camber terrain is asymmetric. The fork and shock are designed to absorb vertical loads (perpendicular to the ground). On off-camber terrain, the load vector is tilted relative to the suspension's designed axis. The suspension absorbs the vertical component of terrain inputs normally but does not resist the lateral component. This means terrain bumps on off-camber produce a lateral displacement in addition to the normal vertical suspension response. Every bump pushes the bike slightly downhill in addition to producing the expected vertical compression.

On rough off-camber surfaces, these accumulated lateral displacements add up. Each rock, root, or terrain undulation nudges the bike incrementally downhill. Over a long section, these micro-displacements produce the progressive lateral drift described in the hillside traverse failure pattern — the drift is not a single traction event but an accumulation of hundreds of small lateral inputs that the suspension design does not resist.

### Braking Dynamics on Off-Camber

Braking on off-camber terrain produces two simultaneous effects that compound the lateral risk. First, braking shifts weight forward (pitch moment), which unloads the rear tyre. The rear tyre, now carrying less weight, has less lateral friction available — it resists the off-camber force less effectively. Second, the longitudinal braking force consumes a portion of the front tyre's total traction budget, leaving less available for the lateral resistance that the front tyre also needs to provide.

The result is that braking on off-camber terrain reduces the lateral traction available on both tyres simultaneously — the rear through weight transfer and the front through combined-load friction budget. This is why off-camber sections under braking are disproportionately more difficult than either off-camber or braking alone.

Engine braking distributes the retardation force through the rear wheel only and does so more progressively than the brake lever, making it somewhat less likely to break lateral traction abruptly. However, engine braking still produces weight-forward transfer and still unloads the rear tyre.

### Drive Traction on Off-Camber

Under throttle on off-camber terrain, the rear tyre must generate both drive force (longitudinal) and lateral resistance (against the camber). If the combined demand exceeds the available traction, the rear tyre breaks free. The direction of the break depends on which force component was dominant at the failure point — the rear may spin (longitudinal failure) or step out sideways (lateral failure) or both simultaneously. On wet off-camber surfaces, rear wheel step-out under throttle is a common failure mode because the low lateral traction budget is consumed by the camber resistance before the throttle demand is applied.

### Gyroscopic Stability

Forward speed provides gyroscopic stability from both wheels that resists lateral tipping. At higher speeds, the bike is more resistant to falling toward the downhill side. At very low speeds (walking pace, technical crawl), gyroscopic stability is minimal and the bike must be held upright almost entirely by rider balance and footpeg weighting. This speed-stability relationship creates a non-monotonic difficulty curve on off-camber: very slow is hard (no gyroscopic help), moderate speed is the sweet spot (gyroscopic stability assists lateral resistance), and high speed reintroduces difficulty (any traction event at speed develops faster than the rider can correct).

---

## 4. Technique by Severity *(MANDATORY)*

Severity is defined primarily by observable feature geometry (slope angle, exposure, section length) and surface traction conditions. Rider skill requirement is secondary commentary.

### Minor (Gentle lateral slope under 10°, manageable surfaces)

**Entry technique:** Recognise the off-camber angle on approach. No specific entry setup required — standard standing position with weight through the pegs is sufficient.

**Sustained technique:** Maintain standing position with slight weight bias toward the uphill peg. The bike may need a few degrees of uphill lean to track straight. Throttle and braking inputs should be smooth — abrupt inputs on even mild off-camber can trigger a lateral slip that would not occur on flat terrain.

**Exit technique:** Allow the body position to return to neutral as the camber flattens. No specific correction needed.

**Common errors:** Remaining seated — seated position prevents the rider from weighting the uphill peg independently of the bike's lean angle. Overcorrecting — riders who notice the off-camber angle may overcompensate with excessive uphill lean, which actually reduces the downhill tyre's contact patch and makes lateral grip worse.

**Mechanical consequence:** On minor off-camber, errors produce slow lateral drift rather than sudden crashes. The drift is recoverable by steering correction on most surfaces.

**Coaching gate:** Basic standing technique (BIOMECH-01) must be confirmed. Peg weighting awareness (BIOMECH-03) is beneficial but not strictly required at minor severity.

### Moderate (10–20° lateral slope on reduced-traction surfaces)

**Entry technique:** Set speed before the section — speed adjustment within the off-camber zone consumes traction. Establish standing position with deliberate uphill peg weighting before the camber begins. The bike should enter with a slight uphill lean already established.

**Sustained technique:** Active peg weighting through the outside (uphill) peg. The rider's weight goes through the uphill peg to load the uphill edges of both tyre contact patches. Upper body positioned slightly uphill of the bike — the rider leans the bike downhill while keeping their body weight over or slightly uphill of the contact patches. This is the opposite of flat-ground cornering technique where the rider leans with the bike. Throttle must be steady — no acceleration or deceleration within the section unless absolutely necessary. Steering inputs should be minimal and smooth — the bike tracks its line through peg weighting and lean, not through active steering.

**Exit technique:** Gradually reduce the uphill peg weighting and lean as the camber flattens. Allow the bike to come upright progressively. Abrupt exit correction (standing upright suddenly) can unload the uphill edge of the tyre contact and produce a momentary traction gap.

**Commitment threshold:** Moderate. The rider can stop at most points in the section, but stopping on moderate off-camber requires foot-down on the uphill side and careful balance.

**Common errors:** Weighting the downhill peg (instinctive but wrong — loads the tyre edge with least grip). Leaning the body downhill with the bike rather than counter-leaning uphill (places the centre of mass on the wrong side). Braking within the section (consumes lateral traction budget). Looking down at the surface immediately in front of the wheel rather than ahead through the section (causes target fixation on the off-camber surface and late response to line changes).

**Mechanical consequence:** Downhill peg weighting shifts the combined CoM downhill, increasing the lateral gravitational component on the tyres and reducing the effective traction at the tyre edges where grip is needed. The bike slides toward the downhill edge progressively. On wet surfaces at moderate severity, this error can develop within 2–3 bike lengths from a stable line to a committed slide.

**Coaching gate:** Standing peg weighting (BIOMECH-03) must be confirmed. The rider must be able to weight a specific peg independently of the bike's lean angle. Without this skill, the rider cannot generate the uphill lean that maintains traction on moderate off-camber.

### Significant (Over 20° or moderate slope on near-zero traction; continuous exposure)

**Entry technique:** Full commitment to the entry line. Speed must be set before the section — and the correct speed is the slowest controllable speed that maintains gyroscopic stability. On very low-traction surfaces, this may be near-walking pace. The uphill lean and peg weighting must be established before the camber reaches full angle. The entry line should be as far uphill as possible to maximise the available recovery width below.

**Sustained technique:** Maximum uphill peg weighting with the rider's body positioned to keep the combined CoM directly above or slightly uphill of the tyre contact patches. The bike is leaned significantly toward the downhill side while the rider's upper body counter-leans uphill. This separation of bike lean from body lean is the critical technique — it requires core strength and active balance throughout the section. Arms must remain relaxed — gripping the bars tightly on off-camber transfers every micro-bump directly into steering correction, which consumes lateral traction through constant small steering inputs.

At significant severity on long sections, the rider must manage fatigue. Peg weighting and core engagement are physically demanding — calf muscles, ankles, and core fatigue over extended off-camber. Fatigue reduces the precision of weight placement and increases the likelihood of a gradual downhill drift that the rider does not have the energy to correct.

**Exit technique:** If the exit transitions to a different feature (corner, obstacle), the rider must transition from off-camber body position to the new feature's requirements while still managing the camber. This transition is a high-difficulty moment — the rider is changing technique while the lateral force is still present.

**Commitment threshold:** High. At significant severity, stopping on the section may not be feasible — the slope angle and surface traction may not support a static bike. The rider is effectively committed to traversing the full section once entered.

**Common errors:** Entering too fast — speed generates lateral forces in addition to the gravitational lateral component. Entering on a downhill line (not far enough uphill) — leaves no recovery width if drift begins. Allowing arms to stiffen from fatigue — converts every bump to a steering correction input. Overcorrecting with steering — each steering input requires lateral traction, which is the resource most scarce on significant off-camber.

**Mechanical consequence:** At significant severity, a single traction event (one wheel losing lateral grip momentarily) can initiate a committed slide because the recovery traction needed to stop the slide is greater than the traction available. The slide accelerates under gravity — unlike flat-ground slides which decelerate through friction.

**Coaching gate — do not prescribe significant off-camber technique without confirmed prerequisites:** Rider must demonstrate reliable peg weighting with counter-lean body position on moderate off-camber sections. Core-engaged standing position must be sustained, not momentary. If moderate off-camber footage shows the rider seated, death-gripping, or weighting the downhill peg, coaching should address those fundamentals before recommending significant off-camber technique.

### Major (Extreme angle 30°+, extended distance 50m+, compounded by conditions)

Major off-camber severity is defined by the feature geometry and conditions rather than technique demands. At this level, the available traction on most surfaces is insufficient for reliable lateral resistance regardless of technique quality. Major off-camber represents a terrain constraint rather than a technique challenge — the correct coaching response is often a routing or decision-level intervention (avoid the section, walk the bike, choose an alternative line) rather than a technique instruction. This tier exists for hazard classification and decision-level response, not as a coaching progression target.

**Entry technique:** If the section must be ridden, the entry line should be as far uphill as physically possible. Speed should be the minimum that maintains balance — near-walking pace. Full uphill body position with maximum peg weighting.

**Sustained technique:** At major severity, the rider is managing at the limit of what the surface can sustain. Even perfect technique may not prevent lateral drift on surfaces where the gravitational lateral component exceeds the available lateral friction. The rider's task is to manage the rate of drift rather than prevent it entirely — keeping the drift slow enough that the available trail width absorbs it before the section exit.

**Common errors:** Attempting to ride major off-camber at moderate-severity speeds. Attempting major off-camber on a surface where the lateral friction coefficient is plainly insufficient (wet smooth rock, frost, ice).

**Coaching gate — do not prescribe this tier without confirmed prerequisites and explicit decision-level assessment:** Stage 9 (Decision Engine) should assess whether the section is rideable before recommending technique. If the slope angle and surface combination indicate that available friction is likely below the required lateral resistance, the coaching response should be: "This section may exceed available traction regardless of technique. Consider dismounting or choosing an alternative route."

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

**Trigger:** Rider enters off-camber traverse on a wet or loose surface at the uphill edge of the trail.

**Mechanism:** Each micro-bump, terrain irregularity, or steering correction produces a small lateral displacement downhill. The suspension does not resist lateral inputs. Over the section length, these displacements accumulate. The rider does not perceive any single slip event — each is individually sub-threshold. After 20–50 metres, the accumulated drift has moved the bike from the upper trail edge to the middle or lower trail edge.

**Outcome:** The rider now has less recovery width available and is on a more severely off-camber portion of the trail (the trail often has a crown or is steeper at the edges). Attempting to regain the uphill line requires more lateral traction than maintaining the original line — traction that may not be available. The rider continues to drift until they run out of trail width, then either falls to the downhill side (lowside or tip-over) or puts a foot down and stabilises.

**Stage 6 classification:** `traction` (primary — cumulative micro-slips), `line_choice` (contributing — the rider did not manage their line through active uphill correction)

### Failure Chain: Off-Camber Corner Washout (traction / technique)

**Trigger:** Rider enters an off-camber corner at a speed and lean angle calibrated for a flat corner.

**Mechanism:** The cornering forces (centripetal, pushing outward) and the off-camber gravitational component (also pushing outward) combine. The total lateral demand on the front tyre exceeds the available lateral friction coefficient. The front wheel pushes wide (understeer) and tracks toward the outside of the corner rather than following the steered line.

**Outcome:** The front wheel drifts outward. If the rider adds lean to compensate, the combined CoM moves further downhill and the tyre rolls onto its sidewall where grip is lower — worsening the slide. If the rider reduces speed (braking), the weight-forward transfer unloads the rear tyre, which may then slide laterally as well. The most common outcome is a front-wheel lowside — the front washes out and the bike falls toward the outside of the corner (downhill).

**Stage 6 classification:** `traction` (primary — friction limit exceeded), `technique` (contributing — lean angle and speed not adapted for off-camber)

### Failure Chain: Braking-Induced Rear Slide on Off-Camber Descent (technique / traction)

**Trigger:** Rider brakes on a descending off-camber section.

**Mechanism:** Braking produces weight-forward transfer, unloading the rear tyre. The rear tyre now has less weight and therefore less lateral friction available to resist the off-camber force. The rear wheel begins sliding downhill while the front wheel (more heavily loaded under braking) tracks straighter. The bike rotates — the rear end moves downhill of the front.

**Outcome:** If the rider releases the brake and allows the rear to settle, recovery is possible at moderate severity. If the rider continues braking (common instinct on a descent), the rear slide continues and the bike eventually either spins fully around or the rider falls (lowside with the rear downhill).

**Stage 6 classification:** `technique` (primary — brake input on off-camber), `traction` (contributing — surface traction insufficient for combined demand)

### Failure Chain: Surface Transition Mid-Section (decision / traction)

**Trigger:** Off-camber section transitions from a higher-grip surface to a lower-grip surface partway through. Common example: grass on the upper part of the trail, mud at the apex of an off-camber corner where drainage concentrates.

**Mechanism:** The rider's technique is calibrated for the entry surface. The transition to a lower-grip surface occurs within the section, often at the most critical point (corner apex, steepest angle). The lateral traction available drops below the lateral force demand at a point where the rider cannot adjust speed, line, or body position in time.

**Outcome:** Sudden lateral drift or lowside at the transition point. The rider's calibration was correct for the entry surface but incorrect for the mid-section surface. The transition gives minimal warning — the surface change may be visible on approach but its traction consequence is not apparent until the tyre contacts it.

**Stage 6 classification:** `decision` (primary — the rider chose to continue through a visible surface change without adjusting), `traction` (contributing — the new surface cannot sustain the lateral demand)

### Pipeline Identification Notes

**Visual indicators for off-camber detection:**

*Approach indicators:*
- Trail surface visibly tilted laterally — the uphill edge is higher than the downhill edge
- Hillside terrain visible above and below the trail, indicating a contouring path
- Trees, posts, or vegetation growing at an angle relative to the trail surface (indicating the trail surface is not level)

*Execution indicators (in-section):*
- Rider visibly leaning uphill or counter-leaning against the bike
- Bike lean angle that does not match the direction of travel (leaning uphill on a straight section)
- Lateral drift visible — the bike's line moves progressively toward the downhill edge
- Rear wheel sliding laterally under braking or throttle

*Post-event indicators:*
- Lowside toward the downhill edge
- Tip-over on the downhill side
- Rider putting a foot down on the uphill side to stabilise

**Audio markers:**
- Tyre scrubbing sound from lateral slip (a sustained high-frequency scraping, different from the brief chirp of a throttle-induced spin)
- No engine note change specific to off-camber — engine loads do not change from the camber itself (they change from gradient, which may be concurrent)

**Severity indicators — distinguishing minor from significant:**
- Slope angle: estimated from visible terrain features, vegetation angle, bike lean angle relative to the rider
- Section length: longer continuous sections indicate higher sustained difficulty
- Surface type: wet grass, wet rock, or mud on off-camber dramatically increases severity
- Trail width: narrow trail with exposure below increases consequence
- Rider body position: rider actively counter-leaning indicates moderate+ severity; rider struggling or foot-down indicates significant+

**Edge cases where Stage 4 classification confidence should be flagged low:**
- POV footage: off-camber angle is extremely difficult to assess from POV because the camera is attached to the rider's head, which counter-leans against the slope — the horizon in the footage may appear level even on significant off-camber
- Distant 3rd-person footage: subtle off-camber angles (under 10°) may not be visible at distance
- Flat trail with drainage crown: very gentle drainage slope (under 5°) should not trigger off-camber classification

### Observability Notes

**1. Reliably confirmable from footage (directly observable):**
- Off-camber presence: trail surface visibly tilted laterally in 3rd-person footage at medium distance
- Rider body position: counter-lean or uphill lean visible in 3rd-person footage
- Lateral drift: progressive line change toward the downhill edge visible in overhead or medium-distance footage
- Crash direction: lowside toward downhill confirms off-camber as a contributing factor
- Surface type: wet grass, mud, or rock visible on the off-camber surface
- Trail width and exposure below the trail

**2. Inferable with caveats (can be estimated but not confirmed):**
- Off-camber angle: estimated from bike lean, vegetation angle, and terrain context — exact angle is not measurable from footage
- Section length: estimated from footage duration and rider speed, but the full section may not be captured
- Whether the rider is weighting the uphill peg (body position suggests it but is not directly confirmable)
- Surface traction level: estimated from surface type and condition, not measured
- Whether cumulative micro-drift is occurring (requires sustained footage of the full section; individual micro-slips are not visible)

**3. Cannot be determined from footage (pipeline must flag as unknown):**
- Exact off-camber angle in degrees
- Whether the rider's tyre pressure is appropriate for the surface
- Sub-surface conditions (root networks, hidden moisture, frozen ground beneath surface layer)
- Rider fatigue level through a long section
- Tyre compound and condition (which directly affect lateral friction coefficient)
- Whether the rider is actively counter-leaning by choice or by instinct

---

## 6. Entry Discipline (adapted from Approach & Setup Requirements)

> *For continuous features, this section covers what the rider must establish before the off-camber section begins. Adapted from "Approach & Setup Requirements" per schema adaptation rules.*

### Speed Selection

Speed must be set before entering the off-camber section. The correct speed for off-camber is determined by the balance between gyroscopic stability (higher speed = more stability) and lateral force management (higher speed = less reaction time for traction events). The sweet spot is typically moderate trail speed — fast enough for gyroscopic benefit, slow enough that any lateral drift develops slowly enough to correct.

On low-traction surfaces (wet grass, mud, wet rock), the correct entry speed may be near-walking pace. On dry hardpack, moderate trail speed is appropriate. Speed adjustment within the off-camber section consumes lateral traction through braking or acceleration forces — the speed must be right before the section.

### Line Selection

The entry line should be as far uphill as the trail allows. Every metre of uphill position at entry is a metre of recovery width available if drift occurs. Entering on the downhill edge of the trail leaves no margin. On off-camber corners, the entry line should be wide (uphill) to maximise the available width through the apex where cornering and camber forces compound.

### Body Position Setup

Standing with uphill peg weighting must be established before the camber begins. Transitioning from seated to standing within the off-camber section shifts weight unpredictably during the phase where weight placement is most critical. The rider should be standing with the correct peg loaded before the trail surface begins to tilt.

---

## 7. Terrain & Condition Interaction

**This section flags which Terrain KB entries should be co-retrieved and documents the feature-level interaction. It does not duplicate Terrain KB content.**

### Surface Type × Off-Camber Interaction

**Wet grass (retrieve TERRAIN-04):** The highest-risk surface for UK off-camber riding. Wet grass blade surfaces are near-frictionless (see TERRAIN-04 Section 1). The lateral traction available on wet grass at moderate off-camber angles may be below the gravitational lateral component — meaning no technique can prevent lateral drift. The interaction is multiplicative: grass terrain severity and off-camber feature severity compound rather than add. A section that is moderate severity on dry grass can become major severity on wet grass without any change in geometry.

**Mud (retrieve TERRAIN-01):** Mud on off-camber reduces traction through the shear-layer mechanism described in TERRAIN-01. The specific risk on off-camber: the tyre is loaded asymmetrically (downhill edge bearing more weight), and the downhill edge of the contact patch is most likely to break through the surface cohesion first — because the load concentration exceeds the shear resistance at that point. This produces a directional traction failure: the tyre breaks free toward the downhill side preferentially.

**Rock (retrieve TERRAIN-03):** Dry textured rock on off-camber provides moderate lateral traction through mechanical interlock. Wet rock on off-camber — particularly smooth or polished rock — provides very little lateral traction. The critical interaction: wet rock slab on off-camber is one of the most hazardous terrain-feature combinations available in off-road riding. The traction coefficient may be below 0.2 on smooth wet rock, while the lateral gravitational demand at 15° is approximately 0.26 of the bike's weight — meaning the physics do not support lateral resistance regardless of technique.

**Hardpack (retrieve TERRAIN-02):** Dry hardpack provides the best off-camber performance of common surfaces — high friction coefficient and sharp break-away characteristics mean the rider has good lateral resistance right up to the friction limit. The risk on hardpack off-camber is the break-away speed: when the friction limit is exceeded on hardpack, the traction loss is abrupt rather than progressive. The rider has less warning than on mud or grass.

**Clay (retrieve TERRAIN-08):** Wet clay on off-camber is particularly hazardous because of clay's non-linear moisture response. Slightly damp clay may provide adequate traction. Saturated clay's friction coefficient drops dramatically and the plastic deformation under lateral load means the tyre cannot find a stable contact — it slides on a continuously deforming surface.

### Condition Modifiers

**Wet conditions:** Reduce lateral traction on all surfaces. The severity multiplier of wet conditions is highest on smooth surfaces (grass, rock slab, polished hardpack) where the lubricating film is most effective. On rough-textured surfaces (coarse rock, dry-soil hardpack), wet conditions reduce traction but not to the same degree.

**Frost:** Near-zero traction in all directions. Off-camber frosted terrain is effectively unrideable at any meaningful severity — the gravitational lateral component exceeds available friction at angles as low as 5–8°. The coaching response for frosted off-camber should be a decision-level constraint: dismount or avoid.

**Seasonal context:** Spring conditions in the UK combine maximum moisture with soft ground and active vegetation growth (wet grass). This is the peak period for off-camber failures. Autumn conditions may produce drier surfaces but with leaf cover that acts as a lubricant on otherwise grippy terrain.

**Compounding Risk:**
- Off-camber entering directly into a braking zone or descent sharply increases combined traction demand.
- Off-camber combined with surface transition mid-section magnifies line-holding failure risk.
- Off-camber immediately after landing or major impact event increases instability before recovery is complete.

---

## 8. Section Exit & Recovery (adapted from Exit, Landing & Recovery)

> *Adapted to "Section Exit & Recovery" for continuous features per schema adaptation rules.*

### Exit Dynamics

The exit from an off-camber section is the transition from sustained lateral management back to neutral or favourable camber. If the camber change is gradual, the rider progressively reduces uphill peg weighting and allows the bike to come upright. If the exit is abrupt (off-camber section ends at a feature boundary, corner, or level trail), the rider must transition body position quickly.

The exit overcorrection risk: a rider who has been counter-leaning hard through the section may continue the counter-lean after the camber has flattened, producing an unnecessary lean that itself creates instability on the now-flat terrain. The correction is conscious — the rider must actively register the camber change and adjust, rather than relying on feel alone (because the body has adapted to the camber angle and may not register the transition immediately).

### Speed Management into the Exit

If the off-camber section exits into a corner or braking zone, the rider must manage the transition from lateral-traction-management mode to cornering or braking mode. The traction budget that was consumed by lateral resistance is now available for cornering or braking — but the rider's calibration may still be set for the reduced-budget off-camber mode, leading to excessive caution at the exit.

### Recovery from Within-Section Errors

**Lateral drift recovery:** If the rider has drifted downhill within the section, recovery requires regaining uphill position. This demands more lateral traction than maintaining the original line — the rider must steer uphill, which adds a lateral steering force to the existing gravitational lateral force. On moderate severity and adequate traction surfaces, this is possible with gentle, sustained steering. On significant severity or low-traction surfaces, regaining uphill position may not be feasible — the rider may need to accept the lower line and manage the increased severity.

**Foot-down recovery:** A foot placed on the uphill side stabilises the bike temporarily. The rider can then reassess speed, body position, and line before continuing. This is a valid recovery technique on moderate severity but may not be feasible on significant or major severity where the slope angle makes stable foot placement difficult.

---

## 9. False Reads & Misidentification

### Rider Misreads

**Dry-calibrated confidence on wet off-camber:** The most common rider misread. A section ridden successfully in dry conditions creates a calibration that the rider applies to the same section in wet conditions. The geometry is identical — only the surface traction has changed. The rider carries the same speed and body position into a section where the available lateral traction is a fraction of the dry value. This is the same calibration failure described in TERRAIN-04 (grass) and TERRAIN-02 (hardpack), but compounded by the off-camber geometry that directly exploits the reduced traction.

**Underestimating the angle:** Off-camber angles are difficult to assess accurately from the rider's perspective. The rider's natural head-level horizon makes moderate off-camber feel less severe than it is — the brain adjusts the perceived horizontal to match the terrain, downplaying the actual angle. This perceptual error is strongest on gradual-entry off-camber where the rider's reference frame tilts progressively rather than encountering an abrupt angle change.

**Confusing berm with off-camber:** On unfamiliar terrain, a rider may enter a corner expecting banking (berm) and find off-camber (the slope falls away from the turn). This is a total calibration inversion — the rider's lean angle, speed, and body position are set for a surface that assists the turn, and they encounter a surface that opposes it. The result is typically an immediate front-wheel push to the outside.

### Camera/Footage Misclassification Risks

**POV footage:** Off-camber is the hardest feature to detect from POV footage. The camera is mounted to the rider's head, which counter-leans against the slope — the horizon in the footage may appear level or nearly level even on significant off-camber. Indirect indicators: the bike appears to lean relative to trees and vertical objects in the frame; the rider's hands are asymmetrically positioned on the bars; the trail surface is visibly tilted relative to background features.

**Overhead drone footage:** The best camera angle for off-camber assessment — the lateral slope is clearly visible from above and the rider's line drift is trackable over time.

**Low-angle 3rd-person footage:** Effective for off-camber detection if the camera is positioned to show the trail cross-section. Less effective if the camera is positioned along the trail looking at the rider head-on, where the lateral angle is foreshortened.

### Condition-Created Ambiguity

**Wet trail that masks the angle:** A trail surface covered in water, mud, or wet leaves may appear flat and level when the actual trail surface beneath is tilted. The standing water or mud fills the low (downhill) side and creates a false level appearance.

**Leaf cover in autumn:** Fallen leaves over a trail surface can hide both the off-camber angle and the surface traction state beneath. The rider sees a leaf-covered trail and cannot assess either the geometry or the grip until they are on it.

---

## 10. Coaching Gates & Prerequisites

### Minimum Prerequisites by Severity

**Minor:** Standing technique with basic peg awareness (BIOMECH-01). The rider must understand that weight distribution through the pegs affects lateral stability. Active peg weighting (BIOMECH-03) is helpful but not strictly required at minor severity.

**Moderate:** Standing technique with deliberate peg weighting (BIOMECH-03) must be confirmed. The rider must demonstrate the ability to weight a specific peg independently of the bike's lean angle — this is the fundamental skill for off-camber riding. Speed discipline — the rider must set speed before the section rather than adjusting within it.

**Significant:** All moderate prerequisites plus: demonstrated counter-lean body position (body uphill, bike downhill) sustained over a full section, not just momentary. Core engagement and fatigue management for extended sections. Line selection awareness — the rider must demonstrate choosing the uphill entry line. Demonstrated ability to manage braking before sections rather than within them.

**Major:** All significant prerequisites plus: the coaching system should assess whether the section is rideable before recommending technique. At major severity, the correct coaching output may be a decision recommendation rather than a technique instruction. Prerequisites: demonstrated significant-severity competence with consistent peg weighting and counter-lean, plus judgment about when a section should not be attempted.

### Progression Model

1. Standing peg weighting on flat terrain → 2. Deliberate uphill peg weighting on minor off-camber (dry) → 3. Counter-lean body position on minor off-camber → 4. Moderate off-camber on dry surfaces → 5. Moderate off-camber on wet surfaces → 6. Significant off-camber on dry surfaces → 7. Significant off-camber on wet surfaces → 8. Major severity (by necessity only — not a training target)

### "Do Not Coach Up" Thresholds

Stage 9 (Decision Engine) should decline to recommend the next severity tier when:
- The rider's footage shows seated position on off-camber sections (standing with peg weighting is a prerequisite for moderate+)
- The rider weights the downhill peg (indicates incorrect muscle memory)
- The rider's footage shows braking within the off-camber section (indicates speed discipline is not established)
- The rider's line drifts progressively downhill through moderate-severity sections (indicates peg weighting and counter-lean are not effective)
- The surface conditions indicate major severity — the coaching system should recommend avoidance rather than technique

### Skill Category Tags (Future-Proofing)

Prerequisites by tier reference the following skill categories for future Skill Tag and Drill KB integration:
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

Off-camber terrain at any coaching-relevant severity requires standing technique with peg weighting awareness (BIOMECH-01, BIOMECH-03). Riders who cannot stand on the pegs and weight a specific peg independently should not attempt off-camber sections above minor severity. At moderate and above, deliberate counter-lean body position and speed discipline are required.

### Equipment Considerations

**Tyres:** Tyre selection has moderate influence on off-camber performance. Tyres with a rounded profile (motocross-style) allow the bike to lean further before rolling onto the sidewall. Tyres with a square profile provide a larger contact patch when upright but transition abruptly to the sidewall at lean. For sustained off-camber riding, a rounded profile provides more predictable grip through the lean range. Tyre pressure reduction (1–2 psi below normal trail pressure) marginally increases the contact patch on the downhill tyre edge but increases the risk of tyre roll off the rim under sustained lateral load.

**Suspension:** Off-camber riding does not place specific demands on suspension setup beyond normal trail settings. However, rough off-camber terrain generates lateral micro-displacements at each suspension event — stiffer compression damping marginally reduces the lateral displacement per event but increases the harshness of the vertical response. There is no optimal suspension setup that solves the lateral displacement problem — it is a fundamental limitation of suspension designed for vertical loads.

**Handguards and bark busters:** On off-camber terrain in wooded or bush areas, the uphill side of the bike passes close to vegetation, trees, and rock walls. Handguard contact with uphill obstacles can wrench the bars and produce sudden steering inputs on terrain where steering stability is critical.

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
