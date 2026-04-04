---

# — BLOCK 1: Pipeline Contract ————————————————————————————
pipeline_contract:
  kb_type: terrain_feature
  pipeline_enum_value: [roots]
  feature_class: continuous
  primary_observable_signature: "Exposed root systems crossing or running along the trail surface — cylindrical, irregular, interlocking obstacles creating unpredictable traction and deflection zones"
  dominant_risk_axis: "Traction loss and front wheel deflection from low-friction cylindrical surfaces at unpredictable angles"
  expected_outcome_patterns:
    clean: "Rider maintains momentum and balance through root section without significant traction loss or line deviation"
    minor_error: "Brief front or rear wheel slip on root surface, momentary weight shift, but rider recovers without stopping"
    major_error: "Front wheel deflection off angled root causes line deviation or loss of balance"
    crash: "Complete traction loss on wet roots causing lowside, or front wheel wash leading to ground contact"

# — BLOCK 2: Retrieval Triggers ———————————————————————————
retrieval_triggers:
  primary:
    - "stage4_feature_type: [roots]"
  secondary:
    - "stage6_failure_type: [traction, technique]"
    - "stage6_crash_type: [lowside, front_wash]"
  contextual:
    - "stage4_terrain_type: [loam, mud, clay]"
    - "stage5_intent: [descent, climb, traverse]"

# — BLOCK 3: Content Metadata ————————————————————————————
content_metadata:
  severity_definition:
    minor: "Scattered surface roots with gaps between them, low profile, predominantly perpendicular to travel direction, dry conditions"
    moderate: "Denser root network with some angled roots, moderate profile, mixed wet/dry, occasional interlocking patterns"
    significant: "Dense interlocking root mat, roots at multiple angles, wet conditions, on gradient or camber, roots obscured by leaf litter or mud"
    major: "Saturated root section on steep gradient or off-camber, dense interlocking network with no clean line available, high consequence terrain either side"
  scope: "Covers root crossings as discrete trail features and root sections as continuous obstacles. Excludes general surface traction physics (TERRAIN-07), standing balance technique (BIOMECH-01), and throttle control fundamentals (CONTROL-01)."
  status: draft
  common_misclassifications:
    - "Log crossing (FEATURE-05) — roots are lower profile, multiple contact points, no single dominant obstacle"
    - "Rock garden (FEATURE-06) — rocks are rigid and angular, roots are cylindrical and can flex"

---

## 1. Feature Geometry & Physics *(MANDATORY)*

Roots are cylindrical, low-friction obstacles that cross, run along, or network across the trail surface. Unlike rocks (rigid, angular, predictable deflection) or logs (single dominant obstacle), roots create multiple simultaneous contact points at varying angles. The defining physics problem is that a cylinder lying on a flat surface produces a tangential contact point — the tyre rolls across rather than gripping against the root.

Wet roots provide extremely low friction — among the lowest-grip surfaces a rider will encounter. Dry roots provide marginally better grip but still significantly less than any soil surface. This makes roots uniquely dangerous in conditions where the surrounding terrain appears rideable — the traction loss is localised and sudden rather than progressive.

Root angle relative to the direction of travel determines the failure mode. Perpendicular roots (crossing the trail) produce vertical deflection — the wheel lifts over them. Parallel roots (running with the trail) produce lateral deflection — the wheel tracks along the root and slides sideways. Angled roots between 20°–60° are the most dangerous because they produce diagonal deflection that combines both effects unpredictably.

**Classification hard rule:** It belongs in the Roots entry when the defining challenge is multiple low-profile cylindrical obstacles creating traction and deflection problems. It belongs in FEATURE-05 (Log) when there is a single dominant cylindrical obstacle the rider must cross over. Root diameter is typically under 8cm; log diameter is typically over 10cm. The boundary case is a single large exposed root — classify by whether the rider's technique problem is traction (roots) or obstacle clearance (log).

### Commitment & Reversibility Profile

Commitment on roots is progressive, not binary. The rider can slow, stop, or dismount at most points in a root section. Reversibility decreases on gradient (uphill roots with momentum loss = stall risk; downhill roots with speed = no braking option). Reversibility also decreases on wet roots where any speed reduction requires braking on a near-zero-friction surface.

Roots typically form continuous feature sections rather than discrete single obstacles, requiring sustained management rather than single-event execution.

---

## 2. Feature Forms & Variants *(MANDATORY)*

**Perpendicular crossing roots:** Run across the trail. Produce vertical bumps. Failure mode is front wheel deflection bouncing the rider off line, or rear wheel spin on the root surface losing drive.

**Parallel roots:** Run along the direction of travel. Act as rails that capture or deflect the wheel laterally. Failure mode is the front wheel tracking along the root and sliding sideways, particularly under braking.

**Root mat / network:** Dense interlocking root systems covering the trail surface. No clean line between roots. Failure mode is continuous traction loss with no recovery surface between obstacles.

**Camber roots:** Root section on off-camber or cambered terrain. The root's low friction combines with gravity's lateral pull. Failure mode is progressive lateral slide downhill across root surfaces (co-retrieve FEATURE-02 off-camber).

**Hidden roots:** Roots buried under leaf litter, mud, or standing water. Not visible until tyre contact. Failure mode is unexpected traction loss with no setup opportunity.

---

## 3. Bike Behaviour *(MANDATORY)*

Tyre contact on a root surface produces near-zero lateral grip when wet. The tyre rolls across the root's cylindrical surface rather than deforming into it. Knobby tyres provide marginally better purchase on dry roots where the knobs can bite into bark texture, but this advantage disappears when wet.

Front wheel deflection on angled roots produces a steering input the rider did not command. The bars turn toward the root's angle — this is the primary mechanism for front-end wash on roots. The deflection force increases with speed.

Rear wheel spin on roots under power produces a sudden loss of drive. On gradient, this can stall forward progress entirely. The transition from grip (soil) to slip (root) to grip (soil) happens within centimetres, creating an oscillating traction pattern that makes smooth throttle application difficult.

Traction loss on roots is often binary at the contact point but intermittent across the section, creating a repeating grip-slip cycle that destabilises the rider's rhythm and makes smooth throttle application difficult.

Suspension has limited influence compared to traction — roots are primarily a surface friction problem rather than an impact absorption problem. Softer suspension can improve compliance over dense root mats, but it does not solve the core grip deficit.

---

## 4. Technique by Severity *(MANDATORY)*

**Minor:** Light grip on the bars. Allow the front wheel to deflect without fighting it. Maintain steady throttle through the section. Weight through the pegs, not the seat.

**Moderate:** Active body position — standing, elbows up, knees gripping the bike. Look beyond the root section, not at individual roots. Momentum maintenance is critical — slowing down increases time on low-friction surfaces without improving control. Select the line that minimises time on root surfaces and avoids shallow-angled (20-60 degree) root contact where possible.

**Significant:** Pre-select gear before entry. Commit to a line and hold it — mid-section line changes on wet roots cause slides. Use rear brake sparingly — front brake on wet roots is high-risk for front wash. Accept rear wheel spin as normal and maintain throttle to preserve momentum. *Coaching gate: rider must demonstrate confident standing position and steady throttle before coaching significant root technique.*

**Major:** Decision-level assessment before entry. Evaluate whether walking is safer. If riding: maximum momentum, lightest possible grip, fully committed line with no mid-section corrections. Front brake use is highly limited on wet roots, particularly on gradient, due to near-zero available grip. *Coaching gate: rider must demonstrate significant-level root competence and confident wet-terrain riding before attempting major root sections.*

---

## 5. Interaction Patterns & Failure Triggers *(MANDATORY)*

### Failure Chain 1: Front Wheel Wash on Wet Angled Root
**Trigger:** Front wheel contacts root at 20°–60° angle in wet conditions
**Mechanism:** Tyre slides along root's cylindrical surface in the direction of the root angle → steering deflects → rider cannot correct before front tucks
**Outcome:** Front wheel wash, potential lowside
**Stage 6 classification:** traction

### Failure Chain 2: Rear Wheel Spin and Momentum Loss
**Trigger:** Rear wheel contacts root under throttle on uphill gradient
**Mechanism:** Zero traction on root surface → rear spins → drive lost → momentum drops below minimum for gradient → stall
**Outcome:** Stall on gradient, potential tip-over
**Stage 6 classification:** momentum

### Failure Chain 3: Braking on Roots
**Trigger:** Rider applies front brake on wet root surface
**Mechanism:** Near-zero friction prevents braking force from decelerating the bike → front wheel locks or slides → no directional control
**Outcome:** Front wheel slide, potential lowside or off-line departure
**Stage 6 classification:** technique

### Failure Chain 4: Parallel Root Rail Capture
**Trigger:** Front wheel contacts root running parallel or near-parallel to travel direction
**Mechanism:** Wheel tracks along the root like a rail → lateral position shifts → wheel drops off root edge at unpredictable point → sudden steering correction required
**Outcome:** Line deviation, potential loss of balance
**Stage 6 classification:** line_choice

### Pipeline Identification Notes
Root sections are often visually subtle — low profile, earth-coloured, partially buried. The pipeline should flag sections where visible root structures cross the riding line, particularly in forest or woodland terrain. Wet conditions dramatically increase severity classification for any root section.

### Observability Notes
**POV camera:** Roots may not be visible until very close to contact. Wet roots may be indistinguishable from surrounding mud. Audio cues are minimal — no distinctive sound signature.
**3rd person camera:** Root sections are often invisible from distance. Traction loss events (wheel spin, slides) are observable but the cause (root contact) may not be.
**Key signal:** Sudden lateral or rotational bike movement without visible terrain change suggests hidden root contact.

---

## 6. Approach & Setup *(DEFAULT)*

Line selection matters more than speed on roots. Choose the line with the most perpendicular root crossings and the least angled or parallel roots. Where no clean line exists, choose the line with the shortest total distance on root surfaces.

Set gear before the section — shifting on roots risks rear wheel spin during the clutch transition.

---

## 7. Terrain & Condition Interaction *(DEFAULT)*

Roots are dramatically more dangerous when wet. A dry root section at moderate severity becomes significant or major when saturated. Co-retrieve TERRAIN-07 (Roots surface physics) for traction coefficients and grip behaviour.

Clay soil around roots (co-retrieve TERRAIN-08) creates a compound problem — clay itself is low-friction when wet, and roots in clay become effectively frictionless.

Leaf litter over roots (common in autumn forest riding) hides both the root positions and the gaps between them, removing the rider's ability to plan a line.

---

## 8. Exit & Recovery *(DEFAULT)*

Root section exits are typically abrupt — the rider transitions from low-friction root surface back to soil. The sudden traction recovery can cause the rear wheel to grip unexpectedly if the rider has been compensating with excess throttle for rear wheel spin. Ease off throttle slightly at the transition point.

---

## 9. False Reads & Misidentification *(DEFAULT)*

**Roots vs wet rock:** Both produce traction loss, but rock is rigid and angular while roots are cylindrical and can flex. Coaching differs — rock technique uses momentum and line precision, root technique uses light grip and acceptance of deflection.

**Single large root vs log:** See classification hard rule in Section 1. If the rider needs to lift the front wheel, it's a log crossing problem. If the rider rolls over it with traction as the main concern, it's a root problem.

---

## 10. Coaching Gates & Prerequisites *(DEFAULT)*

**Minor roots:** Standing position, basic throttle control.
**Moderate roots:** Confident standing position, ability to maintain momentum through rough terrain.
**Significant roots:** Wet terrain experience, rear brake modulation, commitment to holding a line.
**Major roots:** All of the above plus decision-making experience (when to ride vs when to walk).

Skill tags: `balance_standing`, `throttle_steady`, `wet_terrain`, `line_commitment`, `decision_walk_vs_ride`

---

## 11. Feature Demands / Constraints *(DEFAULT)*

Tyre tread pattern and condition are the most significant equipment factor. Worn knobs provide almost no purchase on roots. Fresh, aggressive tread provides marginal improvement on dry roots but minimal benefit on wet.

Tyre pressure has limited effect on root traction — the problem is surface friction, not contact patch size.

### Out-of-Scope Content

- Root surface physics and traction coefficients → TERRAIN-07
- Standing body position fundamentals → BIOMECH-01
- Throttle control fundamentals → CONTROL-01
- Off-camber technique → FEATURE-02
- Log crossing technique → FEATURE-05
