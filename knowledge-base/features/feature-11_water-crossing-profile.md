---

# — BLOCK 1: Pipeline Contract ————————————————————————————
pipeline_contract:
  kb_type: terrain_feature
  pipeline_enum_value: [water_crossing]
  feature_class: single_event
  primary_observable_signature: "Standing or flowing water across the trail that the rider must cross — streams, flooded sections, bog pools, or puddles concealing the riding surface"
  dominant_risk_axis: "Hidden depth and concealed surface creating unpredictable traction loss, wheel trap, or sudden depth change"
  expected_outcome_patterns:
    clean: "Rider crosses at controlled speed maintaining momentum and balance through the water"
    minor_error: "Rider slows excessively or splashes through with poor line, gets wet but completes crossing"
    major_error: "Front wheel drops into hidden hole or gets trapped, momentum lost, rider stalls or tips"
    crash: "Front wheel submerges in unexpected depth causing abrupt deceleration and OTB or tip-over"

# — BLOCK 2: Retrieval Triggers ———————————————————————————
retrieval_triggers:
  primary:
    - "stage4_feature_type: [water_crossing]"
  secondary:
    - "stage6_failure_type: [momentum, traction, decision]"
    - "stage6_crash_type: [otb, tip_over, stall]"
  contextual:
    - "stage4_terrain_type: [mud, rock, sand]"
    - "stage5_intent: [trail, traverse]"

# — BLOCK 3: Content Metadata ————————————————————————————
content_metadata:
  severity_definition:
    minor: "Shallow puddle or trickle crossing, visible bottom, firm base, under 15cm depth"
    moderate: "Ankle-to-shin depth stream, partially visible bottom, moderate current or soft base possible"
    significant: "Knee depth or above, bottom not visible, current present, soft or rocky base, entry/exit transitions unclear"
    major: "Deep water with no visible bottom, strong current, unknown base surface, steep or slippery entry/exit banks, consequence of stall includes potential bike submersion"
  scope: "Covers water crossings as discrete trail features. Excludes sustained boggy terrain (TERRAIN-01 mud), sand surface physics (TERRAIN-05), and general throttle/clutch control (CONTROL-01, CONTROL-03)."
  status: draft
  common_misclassifications:
    - "Mud section (TERRAIN-01) — water crossing has standing or flowing water as the dominant obstacle, not soft saturated ground"
    - "Bog — sustained waterlogged terrain is a terrain condition. A discrete bog pool with standing water is a water crossing"

---

## 1. Feature Geometry & Physics *(MANDATORY)*

A water crossing is any point where standing or flowing water covers the riding surface and must be crossed. The defining physics problem is concealment — water hides the depth, the base material, and any submerged obstacles. Every other feature in the KB is at least partially visible. Water removes visual information entirely below the waterline.

Hydrodynamic drag is the second problem. Water resists the bike's forward movement proportionally to depth and speed. At shin depth, drag is noticeable. At knee depth, it significantly decelerates the bike. The rider must carry more momentum than the visible obstacle seems to demand because the water itself is actively slowing them.

Current in flowing water adds lateral force that pushes the bike downstream. The force increases with depth and flow rate. The front wheel is more susceptible to deflection from current due to its role in steering and lower stabilisation compared to the driven rear.

**Classification hard rule:** It is a water crossing when standing or flowing water is the primary obstacle. If water is incidental (shallow puddle on an otherwise defined trail), classify by the underlying feature. If the water IS the challenge (depth, current, concealed base), it is a water crossing.

### Commitment & Reversibility Profile

Commitment increases with depth. Shallow crossings are fully reversible. Once water reaches axle depth or above, stopping mid-crossing risks the bike settling into soft base material. In flowing water, stopping exposes the rider to current without forward momentum to counteract it. Deep crossings are effectively committed once the front wheel enters.

Water crossings are phase-asymmetric: entry involves unknown depth, mid-crossing involves sustained drag and concealment, and exit often requires immediate traction recovery on a wet bank. This asymmetry means the hardest part of the crossing is often the last.

Water crossings remove the rider's ability to make micro-adjustments based on terrain feedback, forcing commitment to a chosen line without real-time correction.

---

## 2. Feature Forms & Variants *(MANDATORY)*

**Shallow stream crossing:** Visible or near-visible bottom, firm base, low current. Failure mode is unexpected soft spot or submerged rock causing wheel deflection.

**Deep still water:** Flooded trail section or bog pool with no current. Depth is the primary unknown. Failure mode is front wheel dropping into hidden depth, causing abrupt deceleration.

**Flowing stream:** Active current across the trail. Failure mode is lateral push destabilising the bike, particularly at low speed or during hesitation.

**Rocky stream bed:** Water over rocks. Combines concealment with rock traction problems. Failure mode is wheel slip on submerged rock surfaces (co-retrieve TERRAIN-03, FEATURE-06).

**Soft-bottomed crossing:** Mud, sand, or silt beneath the water. Failure mode is wheels sinking into soft base, consuming momentum and potentially trapping the bike (co-retrieve TERRAIN-01, TERRAIN-05).

**Steep bank entry/exit:** The transition into and out of the water involves steep or slippery banks. Failure mode is front slide on entry or rear wheel spin on exit climb.

---

## 3. Bike Behaviour *(MANDATORY)*

Deep crossings introduce risk of water ingestion into the intake or exhaust, which can stall the engine. This risk increases with depth and excessive entry speed.

Brakes lose effectiveness when submerged. Disc brakes recover quickly after exiting water, but there is a brief period of reduced braking during and immediately after the crossing.

Maintaining steady throttle helps sustain exhaust pressure, reducing the likelihood of water entering the exhaust system.

---

## 4. Technique by Severity *(MANDATORY)*

**Minor:** Maintain momentum, light standing position, steady throttle through. No special technique beyond not stopping in the water.

**Moderate:** Standing with weight slightly rearward to keep the front light. Steady momentum — not fast, not slow. Avoid braking in the water. Select the shallowest visible line.

**Significant:** Assess before entering — look for depth clues (vegetation height, bank angles, water colour changes). Enter at controlled momentum with committed throttle. Keep RPM up to maintain exhaust pressure on two-strokes. Weight rearward to prevent front wheel diving into hidden depth. *Coaching gate: rider must demonstrate confident standing position and steady throttle maintenance before coaching significant water crossings.*

**Major:** Decision-level assessment. Walk the crossing first if possible. Check depth with a foot or stick. If riding: committed entry, firm throttle, weight well back, accept that the exit may require immediate power to climb a wet bank. *Coaching gate: rider must demonstrate significant-level water crossing competence and sound risk assessment before attempting major crossings.*

---

## 5. Interaction Patterns & Failure Triggers *(MANDATORY)*

### Failure Chain 1: Hidden Depth Drop
**Trigger:** Front wheel enters water of unknown depth and hits a sudden depth increase
**Mechanism:** Front wheel drops → abrupt deceleration from hydrodynamic drag at depth → rider's momentum continues forward over the bars
**Outcome:** OTB or front-end submersion causing stall
**Stage 6 classification:** momentum

### Failure Chain 2: Soft Base Trap
**Trigger:** Wheels sink into soft mud or sand beneath water surface
**Mechanism:** Rolling resistance increases sharply → momentum consumed → bike decelerates to stop → restart on soft base in water is extremely difficult
**Outcome:** Stall, potential tip-over during recovery attempts
**Stage 6 classification:** momentum

### Failure Chain 3: Current Push
**Trigger:** Rider enters flowing water at insufficient speed or hesitates mid-crossing
**Mechanism:** Lateral current pushes bike downstream → front wheel deflects → rider corrects into current → overcorrection or loss of balance
**Outcome:** Tip-over into flowing water
**Stage 6 classification:** technique

### Failure Chain 4: Bow Wave Ingestion
**Trigger:** Excessive entry speed into moderate-depth water
**Mechanism:** Bow wave pushes water up and over the front of the bike → water enters airbox → engine stalls mid-crossing
**Outcome:** Engine stall in water, difficult recovery
**Stage 6 classification:** technique

### Pipeline Identification Notes
Water crossings are visually identifiable when water is visible on the trail. The pipeline should flag any visible water body across the riding line. Depth assessment from video is unreliable — the pipeline should default to elevated severity when depth is unclear.

### Observability Notes
**POV camera:** Water surface is visible but depth is not assessable. Entry and exit bank steepness may be partially visible. Bow wave height is observable and indicates speed relative to depth.
**3rd person camera:** Width of crossing is assessable. Rider's body position and speed can be evaluated. Depth remains difficult to judge from any camera angle.
**Key signal:** Sudden deceleration in water, engine note change, or bike attitude change (nose diving) indicates depth or traction problem.

---

## 6. Approach & Entry *(DEFAULT)*

Speed assessment is the critical entry decision. The correct speed is enough to maintain momentum through the crossing but not enough to create a bow wave that risks airbox ingestion. This window narrows as depth increases.

Where possible, observe other riders crossing first — their waterline shows depth. Watch for sudden depth changes or soft spots revealed by bike behaviour ahead.

Enter perpendicular to the water's edge where possible. Angled entry on a slippery bank increases front wheel slide risk.

Line selection is often inferred rather than observed, based on entry and exit alignment, water flow patterns, or prior crossings, rather than visible terrain.

---

## 7. Terrain & Condition Interaction *(DEFAULT)*

Rocky stream beds (co-retrieve TERRAIN-03) combine water's concealment with rock's low wet-surface friction. Submerged rocks are significantly more slippery than dry or even wet-but-exposed rocks.

Mud entry/exit banks (co-retrieve TERRAIN-01) are the most common compounding factor. The wet bank on the far side of a crossing is often the hardest part — the rider needs drive to climb it but the surface offers minimal traction.

Sand-bottomed crossings (co-retrieve TERRAIN-05) can be deceptively soft. Sand that appears firm when submerged may give way under tyre load.

---

## 8. Exit & Recovery *(DEFAULT)*

The exit bank is often the hardest part of a water crossing. The far bank is wet, potentially muddy, and may be steeper than the entry. The rider must transition from water resistance to bank climbing — this requires a throttle increase at the exit point, which risks rear wheel spin on the wet bank surface.

Maintain momentum through the exit. Hesitating at the water's edge allows the rear wheel to settle and lose traction. Committed drive up the exit bank is critical.

As the rear tyre exits the water, sudden traction recovery can occur if the rider has been compensating with excess throttle, potentially causing abrupt acceleration or rear wheel snap.

After exiting, brakes will be temporarily reduced. Allow a few seconds of light braking to clear water from the discs before relying on full braking force.

---

## 9. False Reads & Misidentification *(DEFAULT)*

**Water crossing vs wet trail:** A wet trail surface from rain is not a water crossing. The classification requires standing or flowing water as the obstacle itself, not just a wet surface condition.

**Puddle vs water crossing:** A shallow puddle that does not conceal the riding surface or present a depth/traction challenge is not a water crossing — it is a wet surface condition on whatever the underlying feature is.

---

## 10. Coaching Gates & Prerequisites *(DEFAULT)*

**Minor:** Standing position, basic throttle control.
**Moderate:** Confident standing position, ability to maintain steady momentum.
**Significant:** Water-specific assessment skills, committed throttle through obstacle, weight-back technique.
**Major:** All above plus risk assessment and decision-making (ride vs walk vs scout).

Skill tags: `balance_standing`, `throttle_steady`, `weight_transfer_rear`, `decision_walk_vs_ride`, `terrain_assessment`

---

## 11. Feature Demands / Constraints *(DEFAULT)*

Air intake height is the primary equipment constraint. Riders should know their bike's airbox height relative to water depth. Snorkel kits extend the safe depth but are uncommon on standard enduro bikes.

Mousse-equipped tyres are unaffected by water. Tubed tyres are also unaffected, but the rim and spoke nipples on the far bank may collect mud that adds rotating weight.

### Out-of-Scope Content

- Mud surface physics → TERRAIN-01
- Rock surface physics → TERRAIN-03
- Sand surface physics → TERRAIN-05
- Standing position fundamentals → BIOMECH-01
- Throttle control fundamentals → CONTROL-01
- Rock garden technique → FEATURE-06
