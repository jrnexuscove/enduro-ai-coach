---
# ── BLOCK 1: Pipeline Contract ──────────────────────────────────────────────
pipeline_contract:
  kb_type: terrain_feature
  pipeline_enum_value: [rut]
  feature_class: continuous

# ── BLOCK 2: Retrieval Triggers ─────────────────────────────────────────────
retrieval_triggers:
  PRIMARY:
    stage4_feature_type: [rut]
  SECONDARY:
    stage6_failure_types: [technique, momentum, line_choice, decision, traction]
    stage7_crash_types: [tip_over, lowside]
  CONTEXTUAL:
    stage3_intent_category: [trail_ride, technical_section, climb, descent]
    stage5_outcome: [crash, bail, stall]

# ── BLOCK 3: Content Metadata ────────────────────────────────────────────────
content_metadata:
  topic_id: FEATURE-07
  title: Rut — Feature Profile
  domain: Terrain Feature KB
  domain_id: features
  scope: "Feature identification, severity classification, and technique requirements
    for ruts — channels formed in the trail surface by repeated wheel passage or
    directional water erosion along the trail axis. Covers in-rut navigation (riding
    within the channel), rut entry and exit technique, and cross-rut traversal.
    Does NOT cover gullies or washouts formed by lateral water erosion across the
    trail (see gully feature entry), single discrete steps or ledges (see FEATURE-04),
    rock garden navigation (see FEATURE-06), surface-level mud physics (see
    TERRAIN-01), or foundational body position and throttle technique (see
    BIOMECH-01, CONTROL-01)."
  status: draft
  feature_type: rut
  severity_definition:
    minor: "Shallow channel less than 15cm deep with a width accommodating the tyre
      comfortably, dry or damp surface, straight or gently curving; navigable at
      trail speed with minor steering adaptation; consequence of error limited to
      momentary line disruption"
    moderate: "Channel 15–30cm deep with narrowing sections or directional changes;
      handlebar clearance to rut walls becomes relevant; wet or soft base possible;
      two or more feasible approaches (ride in, ride beside, cross); consequence of
      tracking error is handlebar strike on rut wall, forced stop, or uncontrolled
      rut exit"
    significant: "Deep channel 30–50cm with tight curves, wet or clay base, limited
      or no escape line once committed; handlebar strike on walls likely if technique
      breaks down; compound failures possible — tracking error forces wall contact
      which jams steering which arrests momentum; consequence of commitment error
      is stall, tip-over, or inability to self-recover without dismounting"
    major: "Channel exceeding 50cm depth, wet clay or standing water in base, blind
      curves, rut walls above axle height; bike geometry may not permit clean passage
      (handlebar width exceeds rut width at depth); rider should assess before entry;
      consequence of commitment error is crash, bike wedged in rut, or inability to
      extract without assistance"
  severity_covered: [minor, moderate, significant, major]
  crash_types_associated: [tip_over, lowside]
  failure_types_associated: [technique, momentum, line_choice, decision, traction]
  common_misclassifications:
    - gully          # A gully is formed by lateral water erosion ACROSS or perpendicular to the trail; a rut is formed by repeated passage or directional erosion ALONG the trail axis — the rider rides WITHIN a rut but typically rides ACROSS a gully
    - rock_garden    # If drainage channels between rocks constrain the line, the primary feature may be rut; if discrete rocks dominate the challenge, classify as rock_garden — classify by the dominant obstacle type
    - roots          # Root channels can create rut-like geometry; if the confining walls are formed by roots rather than soil, the traction and deflection physics differ — classify by the material forming the channel walls
    - "wheel track on flat trail — a shallow tyre impression on a firm surface that does not constrain the wheel or affect steering is not a rut; rut classification requires sufficient depth to influence wheel tracking or restrict the rider's line options"
  typical_body_position: standing
  difficulty_range: [beginner, intermediate, advanced]
  related_topics: [BIOMECH-01, BIOMECH-02, BIOMECH-03, CONTROL-01, CONTROL-02, DYNAMICS-01, DYNAMICS-05, TERRAIN-01, TERRAIN-04, TERRAIN-09, FEATURE-04, FEATURE-06]
  prerequisites: [BIOMECH-01, CONTROL-01]
  tags: [rut, channel, tyre-track, confinement, handlebar-strike, tracking, wheel-trap, clay-rut, wet-rut, off-camber-rut, braking-rut, cross-rut, committed-line, mud-channel]
  version: 1.0
  last_updated: 2026-04-03
---

# FEATURE-07 — Rut: Feature Profile

---

## 1. Feature Geometry & Physics *(MANDATORY)*

A rut is a channel formed in the trail surface by repeated wheel passage or directional water erosion along the trail axis. The defining characteristic is confinement: the channel walls constrain lateral movement, restrict steering range, and limit escape options. Unlike features where the rider negotiates an obstacle and returns to open trail, a rut captures the wheel and holds it.

**Primary Observable Signature:** A visible linear or curving channel in the trail surface within which the rider's wheel tracks, with raised walls on one or both sides restricting lateral wheel movement and handlebar clearance.

**Dominant Risk Axis:** Lateral confinement and steering restriction — rut walls physically limit handlebar sweep, and tracking errors force the front wheel against a wall rather than allowing correction onto open trail.

### Physical Zones

**Entry zone:** Entry requires matching the wheel's heading to the rut direction — entering at an angle risks the front wheel catching the entry lip. Entry speed and angle are the two consequential decisions.

**Channel extent:** Steering is mechanically limited by wall proximity. On straight sections the walls provide passive guidance. On curving sections, steering demand may exceed available sweep, requiring body position rather than handlebar input to guide the bike through.

**Exit zone:** Planned exit requires a front wheel lift over the rut wall. If the front exits but the rear remains in the rut, the bike straddles the wall with divergent wheel tracks — a chassis twist that can force a lowside.

### Key Mechanic

Ruts present a confinement problem, not a deflection or traction problem. Unlike off-camber (FEATURE-02, full steering range retained) or rock gardens (FEATURE-06, steer freely between obstacles), a rut physically restricts steering range by wall proximity. The technique question is not "how do I steer around this" but "how do I navigate with restricted steering." Entry-exit asymmetry compounds this: gravity pulls the wheel in; the wheel must climb the wall to exit, making commitment progressive and one-directional. Handlebar width is the primary geometric constraint — unique to this feature. In deep ruts the bars extend beyond the walls and contact them before the tyre does; a handlebar strike rigidly jams the bars at a fixed angle on a moving bike.

### Commitment & Reversibility Profile

**Point of no return:** When the front wheel drops into the channel at speed. Scales with depth: minor = steer out freely; moderate = deliberate wheel lift required; significant = committed until a viable exit presents.

**Recovery window:** Full channel extent but narrow at each point — the rider can adjust speed and body position but not lateral line. Recovery from a tracking error must happen before the handlebar contacts the wall; once it hits, recovery is a full reset.

**Bailout options:** Minor: steer over the wall at any point. Moderate: deliberate wheel lift at a manageable wall section. Significant and major: limited to natural rut endings, junctions, or low-wall sections. In deep wet ruts the realistic bailout is stopping, dismounting, and lifting the bike out.

---

## 2. Feature Forms & Variants *(MANDATORY)*

> **Classification hard rule:** A feature classifies as a rut when the trail surface contains a channel formed by repeated wheel passage or directional erosion along the trail axis, and the channel depth is sufficient to constrain the wheel's lateral movement or restrict the rider's available steering range. A drainage channel formed by lateral water erosion across the trail is a gully (see gully feature entry), not a rut. A shallow tyre impression on firm ground that does not constrain wheel tracking is surface texture, not a rut feature.

> **Classification boundary note:** The boundary between rut and gully is formation direction and rider interaction. A rut runs along the trail axis — the rider rides within it, parallel to the channel direction. A gully runs across the trail axis — the rider rides across it, perpendicular or diagonal to the channel direction. When a rut curves sharply enough that the rider must cross it rather than follow it, the crossing event may warrant gully-crossing technique for that specific interaction while the overall feature remains a rut. The rut / rock garden boundary: if rock protrusions within a rut dominate the challenge more than the confinement geometry, classify as rock garden with rut as a terrain modifier. If confinement and steering restriction dominate, classify as rut.

*Dry hardpack rut is the base form — no distinct variant. See Section 7 condition modifiers.*

### Wet Clay Rut

Clay-based soil saturated by moisture — extremely low base traction, clay accumulates in tyre knobs and progressively removes grip with each metre.

**Visual identification:** Smooth, glossy channel surface; tyre marks show smeared impressions not crisp tread; edges rounded by water action.

**Severity range:** Moderate to major. Traction deficit removes the rider's primary recovery tool; significant or major when curvature is also present.

**Distinct failure pattern:** Clay accumulates between tyre knobs over the first metres, gradually degrading grip. The rider, calibrated to initial traction, continues inputs that now exceed available grip → sustained wheelspin without drive → stall with mud-packed tyre.

### Off-Camber Rut

Rut with a laterally tilted base (hillside traverse) — combines rut confinement with the lateral force of off-camber terrain (FEATURE-02): gravity pulls the bike toward the low side while the walls restrict the steering corrections that would otherwise counteract the drift.

**Visual identification:** Inside wall (uphill) visibly higher than outside wall (downhill), or rut base visibly tilted in cross-section.

**Severity range:** Moderate to major. Lateral force adds a failure axis standard rut technique cannot address; deep off-camber clay ruts warrant line avoidance coaching.

**Distinct failure pattern:** Rear tyre slides laterally on the tilted base toward the low wall → wall acts as guide rail pushing the bike further downhill within the confined space → rider cannot counter-lean sufficiently within the narrow channel → lowside within the rut.

### Braking Rut

Rut formed by repeated braking at a consistent point — often V-shaped (braking forces push soil forward and outward), deepest at entry, shallower further along.

**Visual identification:** Channel on the approach to a corner or descent, deepest at entry; polished or compacted base from repeated locked-wheel braking.

**Severity range:** Minor to significant. Encountered while decelerating — braking demands traction at exactly the point rut geometry constrains the wheel.

**Distinct failure pattern:** Front wheel drops into the V-profile and is wedged at the narrowest point during braking. Resolution requires either releasing the brake to drive the wheel out (increasing speed on approach to a feature demanding braking) or following the rut's trajectory into the corner at a sub-optimal line and angle.

### Cross-Rut Traversal

A discrete crossing event — rut runs perpendicular or diagonal to the direction of travel. Requires a front wheel lift or deliberate angle of attack to prevent wheel capture.

**Visual identification:** Channel visible across the trail at an angle to the direction of travel.

**Severity range:** Minor to moderate. Increases with depth, crossing angle (perpendicular easier than diagonal), and speed.

**Distinct failure pattern:** Front wheel drops into the cross-rut; the far wall acts as a step face — abrupt impact decelerates the front wheel while the rear continues at trail speed → pitch forward. If the far wall exceeds what the tyre can climb at available speed, the front stalls and the rear lifts.

---

## 3. Bike Behaviour *(MANDATORY)*

**Steering restriction:** In a rut narrower than the handlebar width, the bars contact the walls before reaching full steering lock — correction sweep is physically capped. If the required correction exceeds that cap, the handlebar contacts the wall before the correction completes.

**Wall contact dynamics:** Tyre contact has some compliance (may slide or climb the wall). Handlebar contact is rigid — steering jams at the contact angle; forward momentum continues; the rear swings in the direction the front would have turned, yawing around the jammed front end. The rear tyre cannot seek better traction laterally — the channel walls prevent it.

---

## 4. Technique by Severity *(MANDATORY)*

Severity is defined primarily by observable rut geometry (depth, width, curvature, base condition). Rider skill requirement is secondary.

### Minor (Under 15cm deep, dry, straight or gentle curve)

**Technique:** Align the front wheel with the rut direction before dropping in. Maintain a steady pace; allow the rut to guide the wheel passively. Light grip — do not fight the passive steering influence. Eyes forward along the rut path. Exit by steering gently over the wall at any convenient point; no deliberate wheel lift required.

**Common errors:** Over-steering against passive guidance; tensing the grip unnecessarily.

**Coaching gate:** Standing technique (BIOMECH-01) confirmed.

### Moderate (15–30cm deep, possible curves, wet base possible)

**Technique:** Deliberate alignment before entry; controlled pace. In wet conditions select a gear providing smooth drive to avoid immediate wheelspin. Stand with weight slightly rearward, centred; in curving sections lean the bike beneath the body using peg weighting (BIOMECH-03) — leaning the body shifts mass beyond the wall and reduces recovery options. Keep elbows raised and slightly out. Maintain a consistent light drive; do not coast on wet bases. If bars approach a wall on a curve, the correction is more bike lean, not more steering input. Plan the exit: compression-rebound lifts the front wheel over the wall; maintain throttle to drive the rear wheel over the same wall.

**Common errors:** Entering at an angle to the rut direction. Death-grip through curves. Closing the throttle in wet ruts.

**Coaching gate:** Standing technique (BIOMECH-01). Throttle discipline on challenging terrain (CONTROL-01). Basic peg weighting (BIOMECH-03).

### Significant (30–50cm deep, wet clay, tight curves, limited escape)

**Technique:** Assess depth, curvature, base condition, and exit points before committing — walking the line on foot is appropriate. Entry speed at the minimum that maintains forward momentum; low gear for clutch-controlled drive. Primary technique shifts from steering to body-led direction control: lean the bike substantially while keeping the body upright and weighted on the outside peg (reduces effective bar width within the rut; clutch acts as torque limiter). Identify viable exit locations in advance — exit requires a committed front wheel lift or clutch-throttle pop. Mid-rut stops at this depth typically require dismounting.

**Common errors:** Entering without assessing exit options. Steering through tight curves with handlebar inputs (guarantees wall strike). Over-driving throttle on wet clay. Target fixation toward the rut walls.

**Coaching gate:** Confirmed reliable moderate rut navigation without consistent handlebar strikes. Body-lean technique evident. Clutch-throttle coordination confirmed (CONTROL-01, CONTROL-02). Front wheel lift capability demonstrated.

### Major (50cm+ deep, wet clay, blind curves, bike geometry may not permit passage)

Major severity is a hazard and decision tier. Ruts at this depth may physically prevent passage — if handlebar width exceeds rut width at depth, no amount of technique allows clean navigation. The correct first response is assessment: walk the rut on foot, check depth and curvature, evaluate whether alternative lines exist.

**Technique (if committed):** Lowest viable speed, clutch-controlled drive throughout. Near-trials-level bike control at near-zero speed — accept that handlebar wall contacts may occur and manage each as a discrete event.

**Common errors:** Committing without assessing exit options; attempting moderate-severity speed in a major rut.

**Coaching gate:** Stage 9 (Decision Engine) must assess passability before any technique recommendation. If depth exceeds effective clearance or no viable exit is visible: "This rut appears too narrow or deep for your bike's handlebar width. Walking the bike through or choosing an alternative line is the appropriate response."

---

## 5. Interaction Patterns & Failure Triggers *(MANDATORY)*

**Expected Outcome Patterns:**
- clean navigation (controlled entry, smooth sustained passage, deliberate exit)
- imperfect but controlled (minor wall contacts, speed adjustments, section completed)
- handlebar strike with recovery (bar contacts wall, rider stops, repositions, continues)
- mid-rut stall (momentum decays to zero, rider dismounts and recovers)
- tip-over (bike falls laterally within the rut from wall jam or traction loss)
- lowside (rear wheel lateral slide on wet rut base)
- bail (rider assesses rut and chooses alternative line before entry)

### Failure Chain: Handlebar Strike on Curve → Steering Jam → Stall or Tip-Over (technique)

**Trigger:** Rider navigates a moderate or significant rut through a curve. The steering input required to follow the curve brings the handlebar end close to the outside rut wall.

**Mechanism:** Handlebar sweep approaches the mechanical limit set by the rut width; the handlebar end contacts the outside wall — rigid, no give. Steering jams at the contact angle. Forward momentum continues with the front wheel unable to follow the curve; the bike drives straight while the rut curves away. Forward momentum is arrested. The bike stalls with the front wheel wedged against the wall.

**Outcome:** If balance is sufficient, a stall requiring repositioning. If the yaw moment from the jam exceeds the rider's ability to stabilise, tip-over within the rut.

**Stage 6 classification:** `technique` (primary — rider relied on steering input rather than body-led bike lean, did not preserve sufficient bar clearance through the curve)

### Failure Chain: Momentum Decay in Wet Clay → Traction Loss → Mid-Section Stall (momentum / traction)

**Trigger:** Rider enters a wet clay rut. Clay base provides limited initial traction; tyre tread blocks begin packing with clay.

**Mechanism:** Over the first metres, clay accumulates between tyre knobs, progressively reducing grip. Increased throttle to compensate produces sustained wheelspin rather than drive. Forward speed decays to a stop with the rear wheel spinning freely on a clay-packed surface.

**Outcome:** Mid-section stall in a wet rut. Restart requires clearing tread blocks manually or finding a harder patch. At significant depth the confined space makes dismounting itself difficult.

**Stage 6 classification:** `momentum` (primary — forward speed decayed below viable threshold), `traction` (contributing — wet clay progressively removed available grip)

### Failure Chain: Rear Wheel Lateral Slide in Wet Rut → Lowside (traction / technique)

**Trigger:** Rider navigating a wet rut under drive load. Rut base is saturated clay or has standing water.

**Mechanism:** The combined demand of drive force and lateral stabilisation exceeds available traction on the low-friction base. The rear wheel breaks lateral grip and slides sideways; the walls confine the slide so the rear either contacts the wall (secondary impact) or the bike falls laterally before reaching it. In an off-camber rut the slide is biased downhill. The lateral slide produces a yaw rotation around the front wheel, which is still tracking in the rut.

**Outcome:** Lowside fall within the rut. Extraction requires lifting the bike vertically — the walls prevent lateral movement.

**Stage 6 classification:** `traction` (primary — wet rut base friction insufficient for combined drive and lateral demand), `technique` (contributing — throttle not modulated for the reduced traction budget)

### Failure Chain: Early Line Commitment to Deepening Rut → No Exit Available → Forced Stop (decision / line_choice)

**Trigger:** Rider enters a rut that appears moderate at entry but deepens progressively. Entry committed without assessing the full rut ahead.

**Mechanism:** Initial moderate section is navigated comfortably. The rut deepens — handlebar clearance decreases, walls rise above the exit-feasibility threshold at current speed. The rider cannot exit; the next curve requires body-lean technique that has not been set up for. The handlebar contacts the wall.

**Outcome:** Handlebar strike and stall at depth, or forced dismount in a deep rut. The failure is in the entry decision.

**Stage 6 classification:** `decision` (primary — entry commitment made without assessing full rut depth and curvature ahead), `line_choice` (contributing — rut line selected without evaluating alternatives that avoided the deepening section)

### Failure Chain: Cross-Rut Front Wheel Capture → Abrupt Deceleration (technique / line_choice)

**Trigger:** Rider encounters a rut running perpendicular or diagonal to the direction of travel.

**Mechanism:** The front wheel drops into the cross-rut channel. At moderate depth the far wall acts as a step face — the tyre impacts it abruptly, decelerating the front wheel while the rear continues at trail speed. The deceleration pitches the bike forward. If the far wall exceeds what the tyre can climb at available speed, the front stalls and the rear end lifts.

**Outcome:** At low speed, a jolting stop. At moderate speed, a pitch forward with OTB risk if the rider's weight is already forward. At high speed, abrupt deceleration with potential front wheel buckle.

**Stage 6 classification:** `technique` (primary — rider did not lift the front wheel to clear the cross-rut), `line_choice` (contributing — crossing point or angle did not minimise drop depth or wall impact)

### Pipeline Identification Notes

**Visual indicators for Stage 4 `feature_type: rut` detection:**

*Approach indicators:*
- Visible linear or curving channel in the trail surface with continuous defined edges
- Previous tyre marks within the channel; rider slowing and aligning wheel direction with it
- Parallel ruts (vehicle tracks) or single ruts (motorcycle/bicycle tracks)

*Execution indicators (in-rut):*
- Bike wheels visibly below the surrounding trail surface
- Handlebars close to or intermittently contacting rut walls
- Rider standing upright while the bike leans beneath; limited or no lateral line deviation
- Controlled low-speed throttle note

*Post-event indicators:*
- Bike emerges onto open trail = clean exit; stationary within channel = stall
- Bike fallen laterally within channel = tip-over or lowside
- Rider walking beside bike alongside channel = bailout

**Audio markers:**
- Reduced tyre-surface noise (rut walls dampen trail noise)
- Scraping or contact sounds (handlebar, footpeg, or exhaust guard contacting walls)
- Consistent low-throttle engine note indicating controlled drive
- Higher-pitched tyre slip without forward speed increase = wheelspin on wet clay base
- Splash sounds if standing water present in rut base

**Severity indicators:**
- Depth relative to wheel: at or above surrounding surface = minor; partially below = moderate; substantially below with walls at axle height = significant; walls above axle height = major
- Base condition: dry and firm = lower modifier; wet sheen = elevated; standing water = further elevated; visible clay texture = further elevated
- Curvature: straight or gentle = lower; visible tight curves = elevated
- Width relative to bike: rut wider than handlebars = lower; rut narrower than handlebars = elevated

**Edge cases where Stage 4 classification confidence should be flagged low:**
- POV footage: helmet camera compresses apparent rut depth; reduce severity confidence
- Distant third-person footage: shallow ruts may not be visible; classification may be missed
- Minor depth: boundary between "rut" and "rough trail" is ambiguous; flag confidence as low if depth cannot be confirmed
- Multiple parallel ruts (vehicle tracks): identify which rut the wheel is tracking; rider between ruts is on open trail, not in a rut feature

### Observability Notes

**1. Reliably confirmable from footage:**
- Presence of a channel in the trail surface
- Whether the rider's wheel is tracking within the channel
- Approximate rut depth relative to wheel (coarse estimate from visible wheel position)
- Whether handlebar contact with rut walls occurred (visible impact or deflection)
- Whether the rider completed the section, stalled, or fell
- Surface condition: wet or dry (from visible sheen, water, or mud spray)
- Rut direction relative to trail axis (along = rut; across = gully)

**2. Inferable with caveats:**
- Rut base material: clay vs hardpack vs organic — inferred from colour and visible texture but not precisely determinable
- Tyre tread condition: whether tread is packed with mud — sometimes visible but often obscured
- Whether throttle management was appropriate for base traction — suggested by wheelspin or steady drive, but exact throttle position is not observable
- Whether a stall resulted from traction loss or momentum error — event sequence suggests primary cause but root cause requires supplementary evidence

**3. Cannot be determined from footage (pipeline must flag as unknown):**
- Exact rut depth in centimetres
- Exact base surface friction coefficient
- Whether the rut deepens ahead beyond the visible section
- Rider's prior experience with this specific rut
- Tyre compound, tread pattern, and inflation pressure
- Whether clay build-up on tyres is from this rut or accumulated from previous terrain

---

## 6. Entry Discipline *(adapted from Approach & Setup Requirements)*

### Assessment Before Entry

Ruts may deepen, curve, or change base condition beyond the visible entry section — assessment before commitment is the most consequential rut-specific skill. Assess from the approach:

- Visible depth at entry; whether it increases along the visible length; curves present
- Base condition: dry, damp, wet clay, standing water
- Whether the rut width accommodates the bike's handlebar width at visible depth
- Whether exit points are visible; whether alternative lines exist

For significant and major ruts, walking the line on foot before committing is a positive decision-making skill, not a sign of inadequacy.

### Entry Alignment and Speed

The front wheel must be aligned with the rut direction before the wheel drops in — entering at an angle risks the front tyre catching the entry lip or immediately pressing against one wall. Entry speed is typically lower than for other continuous features; momentum is a secondary resource here, not the primary technique. Excess speed reduces reaction time to curves, depth changes, and wall proximity. In wet ruts, a higher gear than expected may be appropriate — less torque per throttle increment reduces the risk of a sudden traction break on a slippery base.

---

## 7. Terrain & Condition Interaction

### Mud (retrieve TERRAIN-01)

Feature-level interaction: mud in a rut is worse than on open trail — the rider cannot select a drier line within the confined channel. Co-retrieve TERRAIN-01 for any rut with visible moisture or mud.

### Sand (retrieve TERRAIN-04)

Feature-level interaction: sand in a rut requires more speed than standard rut technique suggests — the soft base demands momentum to prevent the front wheel digging in, conflicting with normal rut guidance to moderate speed. Co-retrieve TERRAIN-04 when the rut base is visibly sandy.

### Shale and Loose Surface (retrieve TERRAIN-09)

Feature-level interaction: shale fragments in a rut shift under the tyre within the confined channel, producing unpredictable traction events in a space where the rider cannot correct laterally. Co-retrieve TERRAIN-09 when the rut base shows loose fragmented material.

### Condition Modifiers

**Dry:** Challenge is primarily geometric — depth, curvature, and handlebar clearance. Classify at the base geometry tier.

**Wet:** Traction deficit added to geometric challenge. Elevate base severity by one tier when wet conditions are confirmed. Two-tier elevation for heavy clay with standing water.

**Frozen:** Frozen rut walls are harder than normal compacted earth — handlebar impacts are more severe. Frozen rut base may be extremely slippery (ice). Frozen rut classification is at minimum significant regardless of geometry.

---

## 8. Section Exit

### Planned Exit

Identify the exit point in advance (where wall is lowest or rut widens); apply compression-rebound or clutch-throttle pop to loft the front wheel over; maintain throttle to drive the rear wheel over the same wall. Critical error: cutting throttle after the front clears — the rear stalls at the wall, leaving the bike straddling with a chassis twist.

### Forced Exit

A tracking error ejects the wheel at an uncontrolled point and angle. An uncontrolled exit into another rut, a rock, or the trail edge becomes a secondary feature event.

### Recovery from Within-Rut Errors

- **After a handlebar strike:** Stop, reposition so bars are clear of walls, restart with adjusted body position
- **After a stall on wet clay:** Clear tread blocks manually if packed; clutch-controlled restart demands minimal throttle and maximum clutch finesse
- **After momentum loss approaching a curve:** Stop before the curve — attempting it with insufficient speed guarantees wall contact

---

## 9. False Reads & Misidentification

### Rut That Reads as Gully

If a rut curves sharply across the trail, footage may show a channel crossing the rider's path — suggesting gully classification. Discriminating factor: if the rider rides along the channel (parallel to it) it is a rut; if the rider rides across the channel (perpendicular) it is a gully or cross-rut event.

### Rut That Reads as Trail Surface

At minor depth, a rut may be indistinguishable from general trail roughness. Operational test: does the channel geometry visibly influence the rider's available line or steering range? If not, it is surface texture, not a rut feature.

### Multiple Ruts Misread as Single Feature

Vehicle tracks produce parallel ruts. A rider between parallel ruts is on open trail with ruts on either side — not in a rut feature. The pipeline should identify which rut (if any) the wheel is tracking.

### Rut Depth Underestimation from POV

Helmet-cam footage compresses vertical depth perception — a 30cm rut may appear 15cm from directly above. POV footage should trigger a severity confidence reduction; state severity as "at minimum [base estimate]."

### Wet Rut Misidentified as Water Crossing

Standing water in a rut may trigger water crossing classification. Discriminating factor: if the water is within a defined channel with rut walls constraining the flow, it is a wet rut. When walls are submerged and no longer constrain the wheel, the feature transitions to water crossing physics.

---

## 10. Coaching Gates & Prerequisites

### Minor Severity Prerequisites

- Standing technique (BIOMECH-01): confirmed
- Basic throttle management (CONTROL-01): smooth controlled drive

### Moderate Severity Prerequisites

- Standing technique (BIOMECH-01): confirmed and reliable
- Peg weighting for bike lean (BIOMECH-03): lean the bike beneath the body using peg pressure rather than body lean
- Throttle discipline on low-traction surfaces (CONTROL-01)
- Basic clutch-throttle coordination (CONTROL-02): for controlled entry, exit, and restart

**Coaching gate:** If footage shows handlebar steering through curves rather than body-lean and peg weighting, coach BIOMECH-03 before moderate rut technique. Future skill tag: `rut_body_lean`, `throttle_low_traction`

### Significant Severity Prerequisites

- Confirmed reliable moderate rut navigation — body-lean technique evident, no consistent handlebar strikes
- Clutch-throttle coordination at near-walking pace (CONTROL-01, CONTROL-02)
- Front wheel lift capability — compression-rebound technique for deliberate rut exit
- Assessment discipline — rider chooses alternative lines rather than committing to every rut

**Coaching gate:** Do not prescribe significant rut entry if footage shows consistent bar-to-wall contact in moderate ruts. Future skill tag: `rut_assessment_entry`, `clutch_precision_low_speed`

### Significant to Major Threshold — Decision-Level Gate

Before prescribing any technique for a major rut, Stage 9 (Decision Engine) must assess: (1) whether rut width permits the bike's handlebar width at stated depth; (2) whether exit points are visible; (3) whether base condition and gradient compound severity beyond demonstrated technique level.

If the rut geometry does not physically permit the bike's passage: "This rut appears too narrow or deep for your bike's handlebar width. Walking the bike through or choosing an alternative line is the appropriate response."

**Progression:** Minor (awareness, passive guidance) → Moderate (deliberate entry, body-lean steering, planned exit, wet-surface throttle) → Significant (pre-entry assessment, clutch-precision drive, front wheel lift exit) → Major (decision-level assessment; trials-adjacent low-speed control)

---

## 11. Feature Demands / Constraints

### Minimum Technique for Safe Navigation

- Standing position (BIOMECH-01): mandatory at all severity levels
- Throttle management on variable surfaces (CONTROL-01): essential at moderate and above
- Peg weighting and bike lean (BIOMECH-03): essential at moderate and above for curve management
- Clutch-throttle coordination (CONTROL-01, CONTROL-02): required at significant
- Front wheel lift capability: required at moderate and above for deliberate rut exit

### Equipment Considerations

**Handlebars:** Bar width is a direct and unique constraint in rut navigation — no other Feature KB entry has handlebar width as a primary limiter. Standard enduro bars (780–820mm) may contact walls in moderate ruts. Bar-end guards (handguards) add effective width and are typically the first contact point on rut walls; guard mount strength determines whether a wall contact bends the guard or transmits the full impact to the bars and rider. Not observable from footage; not a coaching lever available to Stage 10.

### Out-of-Scope Content

- Mud surface physics and traction generation → TERRAIN-01
- Sand surface physics → TERRAIN-04
- Shale fragment behaviour → TERRAIN-09
- Gully crossing technique (channel across the trail) → see gully feature entry
- Single step face climbing → FEATURE-04
- Rock garden navigation → FEATURE-06
- Foundational throttle and clutch mechanics → CONTROL-01, CONTROL-02
- Standing and peg weighting fundamentals → BIOMECH-01, BIOMECH-03
- Weight distribution physics → DYNAMICS-01
