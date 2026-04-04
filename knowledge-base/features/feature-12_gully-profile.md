---

# — BLOCK 1: Pipeline Contract ————————————————————————————
pipeline_contract:
  kb_type: terrain_feature
  pipeline_enum_value: [gully]
  feature_class: single_event
  primary_observable_signature: "Erosion channel cutting across or along the trail — a void in the riding surface created by water runoff, ranging from shallow drainage channels to deep washed-out trenches"
  dominant_risk_axis: "Wheel trap or abrupt suspension event from crossing a void at speed, with depth concealment and irregular geometry"
  expected_outcome_patterns:
    clean: "Rider crosses the gully at controlled speed with correct body position, bike absorbs the transition"
    minor_error: "Harsh impact from misjudged depth or speed, rider absorbs but line is disrupted"
    major_error: "Front wheel drops into gully and stops or deflects sharply, rider loses balance or stalls"
    crash: "Front wheel traps in deep gully at speed causing OTB, or bike drops into gully with rider unable to recover"

# — BLOCK 2: Retrieval Triggers ———————————————————————————
retrieval_triggers:
  primary:
    - "stage4_feature_type: [gully]"
  secondary:
    - "stage6_failure_type: [technique, momentum, line_choice]"
    - "stage6_crash_type: [otb, front_wash, tip_over]"
  contextual:
    - "stage4_terrain_type: [mud, rock, clay, shale]"
    - "stage5_intent: [trail, descent, traverse]"

# — BLOCK 3: Content Metadata ————————————————————————————
content_metadata:
  severity_definition:
    minor: "Shallow drainage channel under 15cm depth, gradual edges, visible bottom, perpendicular to travel"
    moderate: "Moderate depth (15-40cm), defined edges, partially concealed bottom, may be angled to travel direction"
    significant: "Deep erosion channel (40cm+), sharp edges, concealed or rocky bottom, crosses trail at angle, no clean line around"
    major: "Deep washout with vertical or undercut edges, unknown depth, on gradient or off-camber, no bypass, high consequence of wheel trap at speed"
  scope: "Covers erosion channels, drainage cuts, and washouts as discrete trail features. Excludes rut physics (FEATURE-07 — ruts are formed by tyres, gullies by water), general terrain surface physics, and suspension fundamentals."
  status: draft
  common_misclassifications:
    - "Rut (FEATURE-07) — ruts are tyre-formed channels the rider follows. Gullies are water-formed voids the rider crosses or avoids"
    - "Water crossing (FEATURE-11) — a gully may contain water, but the primary obstacle is the void geometry, not the water itself"

---

## 1. Feature Geometry & Physics *(MANDATORY)*

A gully is an erosion channel formed by water runoff cutting into the trail surface. Unlike ruts (which are tyre-formed and typically ridden along), gullies are water-formed and typically crossed. The defining physics problem is the void — a gap in the riding surface that the wheels must cross, with edges that can trap, deflect, or stop a wheel depending on approach angle, speed, and depth.

The crossing angle relative to the gully determines the interaction. Perpendicular crossings allow both wheels to drop and climb cleanly. Angled crossings risk the front wheel tracking along the gully (lateral capture) or the rear wheel sliding into the channel after the front has crossed. Parallel approach (riding along a gully) risks the wheel dropping in unexpectedly.

Gully edges are often the most dangerous element. Water erosion creates sharp, sometimes undercut edges that crumble under tyre load. What appears to be a solid edge may collapse when the rear wheel loads it, dropping the bike into the channel.

Gully edge shape — rounded, vertical, or undercut — determines whether the wheel can climb out or will stop abruptly, directly influencing failure outcome.

Severity increases significantly when gullies are concealed or only visible at short range, reducing the rider's ability to adjust speed and approach angle before contact.

**Classification hard rule:** It is a gully when the obstacle is a water-eroded void in the trail surface. If the channel is tyre-formed and the rider follows it, it is a rut (FEATURE-07). If the channel is filled with standing or flowing water as the primary obstacle, it is a water crossing (FEATURE-11). If the void is formed by erosion but is deep enough to require the rider to descend into and climb out of it, classify by dominant challenge — if the geometry dominates, it is a gully; if the gradient dominates, it may be a step/ledge (FEATURE-04).

### Commitment & Reversibility Profile

Commitment depends on speed and visibility. At low speed with visible depth, the rider can stop before the gully and assess. At trail speed, the gully may appear with insufficient stopping distance — commitment is forced by speed. Once the front wheel enters a deep gully, the rider is committed to crossing.

Gullies are primarily encountered as discrete crossing events, though parallel gullies may create short continuous hazards alongside the riding line.

---

## 2. Feature Forms & Variants *(MANDATORY)*

**Perpendicular drainage channel:** Crosses the trail at roughly 90 degrees. Both wheels cross cleanly in sequence. Failure mode is misjudged depth causing harsh suspension bottom-out or front wheel trap.

**Angled erosion cut:** Crosses the trail at an angle. Creates asymmetric wheel interaction — one wheel may track along the gully edge while the other crosses. Failure mode is lateral capture of the front wheel or rear wheel slide into the channel.

**Parallel gully:** Runs along or near the riding line. The rider must ride alongside without dropping a wheel in. Failure mode is wheel dropping into the channel unexpectedly, particularly the rear on a camber.

**Deep washout:** Full trail erosion creating a significant void — often on descents where water has cut deep channels. Failure mode is bike dropping into a void too deep to ride through, potentially trapping the bike.

**Concealed gully:** Hidden by vegetation, leaf litter, or mud. The rider has no depth information before contact. Failure mode is the same as any gully but without setup opportunity.

---

## 3. Bike Behaviour *(MANDATORY)*

When the front wheel enters a gully, it drops into the void and hits the far wall. The impact is a square-edge hit — abrupt, not ramped. Suspension compresses rapidly. If the gully is deeper than available suspension travel, the fork bottoms out and the bike stops or deflects.

The rear wheel enters the gully after the front has (ideally) exited. The timing gap between front exit and rear entry means the bike is briefly spanning the gully. On narrow gullies, this is momentary. On wider gullies, the bike may bottom out the frame on the gully edges.

At speed, the bike can clear narrow gullies without the wheels fully dropping in — the momentum carries the wheel across the void. This only works if the gully is sufficiently narrow relative to speed and wheel trajectory for the wheel to bridge the gap without fully dropping into it. Wider gullies require the wheels to enter and exit regardless of speed.

Gullies create a timing mismatch between front and rear wheel events — the front may clear while the rear is still entering, creating instability during the transition phase.

Unlike predictable obstacles, concealed gullies disrupt suspension timing — the rider cannot preload or prepare for the impact, increasing the likelihood of harsh compression or bottom-out.

---

## 4. Technique by Severity *(MANDATORY)*

**Minor:** Maintain momentum, light standing position, allow the bike to absorb the channel. No special technique needed.

**Moderate:** Standing position with active legs absorbing the impact. Approach perpendicular where possible. Maintain steady speed — too slow risks the front wheel trapping, too fast risks harsh impact.

**Significant:** Assess depth before crossing. If rideable: approach perpendicular, weight slightly rearward, lift the front wheel slightly before the edge (not a full wheelie — just enough to prevent the wheel diving to the bottom). Allow the rear to follow through. If not rideable: dismount and walk the bike across. *Coaching gate: rider must demonstrate confident standing position and ability to lift the front wheel on demand.*

**Major:** Decision-level assessment. Walk and inspect the gully. Assess depth, edge stability, base material, and exit geometry. If riding: full commitment, front wheel lift, controlled rear entry. If the gully is too deep or the edges too unstable, walking is the correct choice. *Coaching gate: rider must demonstrate significant-level gully technique and risk assessment ability.*

---

## 5. Interaction Patterns & Failure Triggers *(MANDATORY)*

### Failure Chain 1: Front Wheel Trap
**Trigger:** Front wheel enters gully at insufficient speed with no wheel lift
**Mechanism:** Wheel drops to bottom of channel → hits far wall square → stops or deflects → rider's momentum continues forward
**Outcome:** OTB or abrupt stop with loss of balance
**Stage 6 classification:** technique

### Failure Chain 2: Edge Collapse
**Trigger:** Rear wheel loads a gully edge that appears solid
**Mechanism:** Eroded edge crumbles under weight → rear drops into channel unexpectedly → bike drops and tilts
**Outcome:** Bike drops into gully, potential tip-over
**Stage 6 classification:** decision

### Failure Chain 3: Lateral Capture on Angled Gully
**Trigger:** Front wheel contacts gully at shallow angle (under 45 degrees)
**Mechanism:** Wheel tracks along the gully channel instead of crossing → steering deflects along the gully line → rider cannot correct before losing line
**Outcome:** Line deviation, potential fall into gully
**Stage 6 classification:** line_choice

### Failure Chain 4: Speed Misjudgement on Hidden Gully
**Trigger:** Rider encounters concealed gully at trail speed with no time to assess
**Mechanism:** Bike hits gully at uncontrolled speed → suspension overwhelmed → harsh impact or wheel trap depending on depth
**Outcome:** Harsh impact (minor) or wheel trap (major)
**Stage 6 classification:** decision

### Pipeline Identification Notes
Gullies may be difficult to identify from video, particularly concealed ones. The pipeline should look for visible erosion patterns, exposed soil channels, and sudden bike attitude changes (nose dip, suspension compression) that indicate a void crossing.

### Observability Notes
**POV camera:** Shallow gullies may be visible as dark lines across the trail. Deep gullies are more obvious. Concealed gullies are invisible until contact.
**3rd person camera:** Gully geometry is often visible from distance. Bike attitude change at the crossing point is the primary diagnostic signal.
**Key signal:** Sudden downward bike movement followed by upward recovery indicates gully crossing. Abrupt stop or deflection indicates wheel trap.

---

## 6. Approach & Entry *(DEFAULT)*

Cross perpendicular wherever possible. Angled crossings increase lateral capture risk. If the trail forces an angled approach, the rider should aim to maximise the crossing angle.

Speed should match gully depth — shallow channels can be crossed at trail speed, deeper channels require slower, more controlled crossing with front wheel management.

---

## 7. Terrain & Condition Interaction *(DEFAULT)*

Gullies on clay terrain (co-retrieve TERRAIN-08) have slippery edges and walls that provide no grip for climbing out. Wet clay gullies are particularly hazardous — the edges become frictionless ramps.

Rocky gullies (co-retrieve TERRAIN-03) have harder, more stable edges but create harsher impacts. Submerged rocks at the gully bottom can trap or deflect wheels unpredictably.

Gullies often appear on descents where water runoff concentrates. Co-retrieving gradient context helps the pipeline assess whether the rider can control approach speed.

---

## 8. Exit & Recovery *(DEFAULT)*

The exit side of a gully is often steeper or more eroded than the entry side because water flow undermines the downstream edge. The rear wheel must climb this edge under drive — insufficient throttle on exit causes the rear to spin on the edge or drop back into the channel.

If the rear wheel fails to climb the exit edge, the bike may pivot around the frame or swingarm contact point, destabilising the rider.

---

## 9. False Reads & Misidentification *(DEFAULT)*

**Gully vs rut:** Ruts are tyre-formed and ridden along. Gullies are water-formed and typically crossed. If the channel follows the riding line and shows tyre marks, it is a rut. If it cuts across the trail and shows erosion patterns, it is a gully.

**Gully vs water crossing:** If the gully contains water, classify by dominant challenge. If the void geometry is the primary problem, it is a gully. If the water depth and concealment are the primary problem, it is a water crossing.

---

## 10. Coaching Gates & Prerequisites *(DEFAULT)*

**Minor:** Standing position, basic momentum control.
**Moderate:** Active standing position, ability to absorb impacts through legs.
**Significant:** Front wheel lift on demand, depth assessment skills.
**Major:** All above plus risk assessment (ride vs walk).

Skill tags: `balance_standing`, `front_wheel_lift`, `terrain_assessment`, `decision_walk_vs_ride`

---

## 11. Feature Demands / Constraints *(DEFAULT)*

Suspension travel is the primary equipment factor for gully crossings. Bikes with longer travel absorb deeper gullies more effectively. Bottoming out the fork in a gully concentrates all impact force through the frame rather than being absorbed progressively.

Bash plate and frame protection become relevant on deep gullies where the frame may contact the gully edges. However, these are protection items, not performance modifiers — they do not change coaching advice.

### Out-of-Scope Content

- Rut technique → FEATURE-07
- Water crossing technique → FEATURE-11
- Step/ledge technique → FEATURE-04
- Rock surface physics → TERRAIN-03
- Clay surface physics → TERRAIN-08
- Standing position fundamentals → BIOMECH-01
