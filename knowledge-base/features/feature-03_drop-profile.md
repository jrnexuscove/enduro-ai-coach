---
# ── BLOCK 1: Pipeline Contract ──────────────────────────────────────────────
pipeline_contract:
  kb_type: terrain_feature
  pipeline_enum_value: [drop]
  feature_class: single_event

# ── BLOCK 2: Retrieval Triggers ─────────────────────────────────────────────
retrieval_triggers:
  PRIMARY:
    stage4_feature_type: [drop]
  SECONDARY:
    stage6_failure_types: [technique, decision, momentum]
    stage7_crash_types: [otb, ejection]
  CONTEXTUAL:
    stage3_intent_category: [descent, trail_ride, technical_section]
    stage5_outcome: [crash, bail]

# ── BLOCK 3: Content Metadata ────────────────────────────────────────────────
content_metadata:
  topic_id: FEATURE-03
  title: Drop Features — Feature Profile
  domain: Terrain Feature KB
  domain_id: features
  scope: "Feature identification, severity classification, and technique requirements
    for drop features — vertical or steep downward transitions where the bike descends
    from an upper surface to a lower surface without an upward launch trajectory.
    Does NOT cover jumps (upward launch into airtime — see FEATURE-01), step-downs
    at walking speed with sustained ground contact (see FEATURE-04), standing/seated
    fundamentals (see BIOMECH-01), or surface physics of landing surfaces (see
    Terrain KB entries)."
  status: draft
  feature_type: drop
  severity_definition:
    minor: "Vertical transition under 0.5m; rollable at low speed with basic weight shift; consequence limited to front-heavy landing or minor chassis pitch"
    moderate: "Drop 0.5–1.5m with defined edge; requires deliberate body position and speed management; poor technique produces nose-dive, hard front landing, or OTB risk"
    significant: "Drop 1.5–3m or blind drop where landing is not visible from the edge; full commitment required; technique errors produce high-consequence OTB, nosedive, or chassis damage from impact"
    major: "Drop over 3m or extended vertical face with complex landing geometry, narrow technique window, and minimal recovery margin; consequence of error at this scale is serious injury"
  severity_covered: [minor, moderate, significant, major]
  crash_types_associated: [otb, ejection]
  failure_types_associated: [technique, decision, momentum]
  common_misclassifications:
    - jump           # A jump has an upward launch trajectory producing airtime from a ramp; a drop is purely downward from an edge
    - step_down      # A step_down is managed at low speed with sustained or near-sustained ground contact; a drop involves freefall and airborne descent
    - "steep descent — a sustained downhill gradient is NOT a drop; a drop is a discrete vertical or near-vertical transition"
    - ledge          # Ledge describes a horizontal-to-vertical edge geometry that may be a drop, a step_up, or a wall; classification depends on direction of travel
  typical_body_position: standing
  difficulty_range: [intermediate, advanced]
  related_topics: [BIOMECH-01, BIOMECH-02, DYNAMICS-01, DYNAMICS-04, FEATURE-01, FEATURE-04]
  prerequisites: [BIOMECH-01, DYNAMICS-01]
  tags: [drop, ledge-drop, step-down-drop, rolloff, blind-drop, vertical, descent, nose-dive, otb, landing, commitment, freefall, edge]
  version: 1.0
  last_updated: 2026-04-03
---

# FEATURE-03 — Drop Features: Feature Profile

---

## 1. Feature Geometry & Physics *(MANDATORY)*

A drop is any terrain geometry where the riding surface transitions abruptly downward — the bike descends from an upper surface to a lower surface without an upward launch trajectory. The defining characteristic is **downward transition from an edge**: the front wheel loses its supporting surface and gravity pulls the bike down. No ascending face, no ramp — purely downward.

**Primary Observable Signature:** Bike descending from a visible upper edge to a lower surface with no upward launch trajectory — front wheel drops below the departure surface level.

**Dominant Risk Axis:** Nose-down pitch at departure and vertical landing impact severity.

### Physical Zones

**Approach zone:** Where the rider assesses drop geometry, sets speed, and establishes body position. On natural terrain, drops may give minimal warning — the trail appears to continue, then drops beyond a convex crest, or vegetation obscures the edge.

**Edge / departure point:** The lip where the upper surface ends. Last point of full ground contact. Sharp square edges produce immediate front-wheel freefall (fast nose-down pitch rate). Rounded or angled edges allow the front wheel to track down the face briefly, producing a more gradual transition.

**Descent phase:** Front wheel departure to landing contact. On vertical drops: pure freefall, no traction-based control. On angled rolloffs: rear wheel may briefly maintain upper-surface contact, providing a short window of rear-brake authority.

**Landing zone:** Often unprepared on natural drops — rock, root, mud, or loose surface creates compound impact-plus-traction demands.

**Run-out zone:** Drops generate significant forward momentum on landing. Rider needs distance for suspension settling, weight transition from rearward drop position to neutral, and steering re-establishment.

### Key Mechanic: Low Speed Worsens Pitch

The front wheel reaches the edge first and drops under gravity while the rear wheel is still on the upper surface — this creates the nose-down pitch moment. Counterintuitively: lower approach speed = longer front-unsupported window = faster nose-down pitch and less gyroscopic resistance. Slowing down for a drop worsens the pitch problem at moderate severity and above.

### Commitment & Reversibility Profile

**Point of no return:** Minor — at the edge (can roll to the edge and stop). Moderate — 1–2 bike lengths before the edge at trail speed. Significant/major — during the approach. Blind drops: may be committed before the feature is visible.

**Recovery window:** Very short. On vertical drops, no traction-based control once the front wheel passes the edge. On angled rolloffs, brief rear-wheel contact window for rear-brake control. Body weight and rear brake are the only corrections once fully airborne.

**Bailout options:** Approach zone only for moderate+. Stopping at the edge with front wheel over is unstable — the bike may roll forward uncontrolled. If already at the edge with speed, committed.

---

## 2. Feature Forms & Variants *(MANDATORY)*

> **Classification hard rule:** If the bike travels up an ascending face before becoming airborne, it is a jump (FEATURE-01), not a drop. If the rider maintains sustained ground contact throughout the descent at walking speed, it is a step-down (FEATURE-04), not a drop.
>
> **Classification boundary note:** Speed can transform a step-down into a drop. A 0.5m ledge at walking pace with the front wheel carefully placed = step-down. The same ledge at trail speed where the front wheel drops into freefall = drop. Classification is determined by the dominant event in the footage, not geometry alone.

### Vertical Ledge Drop

Square or near-square edge where the front wheel departs into immediate freefall. No slope to track down. Fastest nose-down pitch rate of all drop variants.

**Visual identification:** Flat or near-flat upper surface terminating at a defined edge. Vertical or very steep face below. The upper surface does not curve downward before the edge.

**Severity range:** Minor to major by height (under 0.5m = minor, 0.5–1.5m = moderate, 1.5–3m = significant, over 3m = major). Escalates if landing surface is flat, rocky, or contains obstacles.

**Distinct failure pattern:** Immediate nose-dive. No transitional surface to track — front wheel drops at maximum pitch rate for the given speed and weight distribution. Even neutral weight at the edge produces OTB at moderate height.

### Angled Rolloff

Steep but not vertical face — front wheel transitions from horizontal to downhill along a surface rather than departing into freefall. Rear wheel maintains contact with upper surface or rolloff face while front descends, providing a rear-brake control window.

**Visual identification:** Trail tips steeply downward at a defined point, but transition is curved or angled rather than a sharp edge. Front wheel can follow the surface for part or all of the descent.

**Severity range:** Minor to significant. Inherently lower severity than vertical drops at the same height because the transitional surface reduces pitch rate. However, rolloffs on loose or slippery surfaces can produce uncontrolled sliding descents.

**Distinct failure pattern:** Front wash on the face. Front wheel descends the angled face but loses traction on the steep surface — slides forward and down faster than the rear. Bike transitions to uncontrolled nose-first slide. OTB risk if front wheel catches an obstacle at the base.

### Natural Trail Drop

Erosion-formed or geological drop — washed-out trail edges, creek bank descents, rock shelf edges, root-exposed ledges. Characterised by irregular geometry: crumbled edge, uneven face, uncontrolled landing surface.

**Visual identification:** Trail ends or drops at a non-constructed point. Edge geometry is rough, not a clean horizontal line. Face may include exposed roots, rock, loose earth. Landing zone is natural terrain.

**Severity range:** Minor to significant. Geometric severity elevated by irregular geometry and unprepared landing surfaces. A 1m natural drop onto rock is effectively a tier higher than a 1m drop onto groomed dirt.

**Distinct failure pattern:** Asymmetric departure. Non-uniform edge means the front wheel departs at an angle → yaw or roll in addition to nose-down pitch. Bike enters descent with a lateral component the rider did not anticipate.

### Blind Drop

Any drop variant where the landing zone is not visible from the approach or the edge. The rider can see the edge but cannot see what is below until the front wheel is already over. The "blind" classification adds one severity tier to any underlying drop form.

**Visual identification:** Trail approaches a crest or edge beyond which the ground falls away. Lower surface hidden by convex terrain geometry. Rider's perspective is obscured — confirmed when 3rd-person footage shows the drop is visible to the camera but not to the rider.

**Severity range:** Any drop severity plus one tier for the blind factor.

**Distinct failure pattern:** Speed miscalibration. Rider approaches at trail speed (appears to be continuing trail), discovers the drop at or past the commitment point. Speed is typically too high for the drop height, turning a manageable descent into an uncontrolled one. No time to set body position.

### Step-Down at Speed

A moderate-height step (0.3–1m) encountered at trail speed rather than walking pace. Identical geometry to a step-down feature; speed transforms the technique requirement.

**Visual identification:** Defined step in trail surface (rock ledge, earth bank, root step) in the minor-to-moderate height range, with evidence of trail speed on approach.

**Severity range:** Minor to moderate. Step height is small, but speed-induced airtime and lack of preparation increase severity.

**Distinct failure pattern:** Unweighted front end. Body position set for trail riding (neutral weight), not for drop (weight rearward). Front drops from the step, nose-down pitch develops, neutral weight allows it. Small steps → jarring front-heavy landing. Larger steps at higher speed → full nose-dive.

---

## 3. Bike Behaviour *(MANDATORY)*

This section covers mechanics unique to drop features. General suspension, traction, and steering behaviour: see Dynamics KB.

### Front-First Departure and Pitch

The front wheel reaches the edge first and loses its supporting surface. Rear wheel on the upper surface acts as a pivot point, creating a nose-down pitch moment. Pitch rate depends on: forward weight distribution (increases the moment), approach speed (higher speed → rear wheel follows sooner, reducing the pitch window), and edge geometry (sharp = instant loss of front support; rounded = gradual transition).

Critical implication: low speed produces longer front-unsupported time → more nose-down pitch than higher speed at the same drop. Slowing for a drop worsens pitch at moderate severity and above.

### Rear Wheel Contact Window

On non-vertical drops (angled rolloffs, rounded edges), the rear wheel maintains contact briefly after the front wheel departs. During this window: rear brake controls descent rate; throttle can extend horizontal trajectory (potentially reaching a downslope landing). Window is fractions of a second on most enduro drops, longer on angled rolloffs (up to 1–2 seconds). This is the primary mechanical difference from a jump — drops offer a brief single-wheel contact window that jumps do not.

### Suspension Response on Landing

Drops characteristically produce front-first landings. Fork compresses first — if drop height produces vertical velocity exceeding fork absorption capacity, fork bottoms and remaining energy transfers through headstock and frame. After fork compresses, bike pivots and rear shock engages. Significantly nose-down landings produce pitching motion from fork-to-shock sequential loading that can unseat the rider. Level landing distributes impact across both units simultaneously — harder to achieve on drops than on jumps due to inherent nose-down tendency.

### Speed and Trajectory

Higher approach speed extends horizontal trajectory during descent, landing the bike further from the drop base. On flat landings, extending trajectory does not reduce vertical impact (vertical velocity is set by drop height and gravity). However, carrying more speed can allow the rider to reach a downslope landing further from the base — converting a flat landing into a downslope landing.

---

## 4. Technique by Severity *(MANDATORY)*

### Minor (Under 0.5m vertical transition, rollable at low speed)

**Technique:** Standing, weight shifted rearward of neutral — hips behind footpegs. Arms bent and extended forward. Cover the rear brake. Allow front wheel to drop while maintaining rearward weight bias. Absorb landing through knees and ankles; shift weight forward to neutral as the bike levels.

**Common errors:** Looking down at the edge rather than at the landing — freezes body position at departure. Braking at the edge → forward weight shift at the worst moment. Seated position → cannot shift weight rearward independently.

**Coaching gate:** Standing technique (BIOMECH-01). Rider must understand rearward weight shift must occur before the edge.

### Moderate (0.5–1.5m drop with defined edge)

**Technique:** Standing, weight deliberately rearward — hips well behind footpegs. Arms extended but not locked — locked arms transfer front-end drop directly to rider's shoulders. Set speed on approach. If rear wheel still in contact (rolloff), brief rear brake controls descent rate. In air: weight shift and rear brake available for pitch management. Landing: absorb through full leg range, transition weight forward, throttle ready to drive out.

**Common errors:** Insufficient rearward weight shift (most common moderate error — slight back shift not enough for a 0.5–1.5m pitch moment). Front brake near the edge → forward weight shift + fork compressed → fork rebounds nose-down at the lip. Locked elbows → connected to front end's drop.

**Coaching gate:** Standing technique (BIOMECH-01) and weight distribution awareness (DYNAMICS-01). Rider must demonstrate deliberate rearward weight shift — hips actively behind pegs before the edge.

### Significant (1.5–3m drop or blind drop; full commitment)

**Technique:** Maximum rearward weight position — hips as far behind footpegs as reach allows, potentially backside behind the seat. Arms fully extended but relaxed. Speed set well before the edge. Optional: throttle blip at the edge to create slight nose-up attitude that partially offsets descent pitch — must be precisely timed; too early = front drops back before the edge; too late = already over. This is an advanced tool requiring practice on moderate drops first, not a default requirement. Rear brake available for pitch management in descent. Full leg absorption on landing; immediate forward weight transition to reload front tyre for steering authority.

**Common errors:** Hesitation on late approach — rider doubts, reduces speed, arrives at low speed with poor body position and maximum nose-down pitch rate. Speed too high → excessive horizontal and vertical landing impact. Throttle blip mistimed. Target fixation on the vertical face below — freezes body position.

**Coaching gate:** Consistent moderate technique with controlled pitch and balanced landing. Throttle blip practised on moderate drops first. Commitment decision-making (INTEL-05) confirmed. **Do not prescribe significant drop technique without confirmed moderate prerequisites.**

### Major (Over 3m or complex landing geometry)

**Technique:** As per significant, with throttle blip mandatory. Active pitch management throughout descent using body weight and rear brake. Precise approach speed — specific to the drop; ±5 km/h changes outcome.

**Coaching gate:** **Do not coach up to major without confirmed significant competence.** Stage 9 should assess whether the drop is appropriate before recommending technique. If drop exceeds demonstrated ability: "This drop exceeds the technique threshold demonstrated in your footage. Walk the feature or choose an alternative line."

---

## 5. Interaction Patterns & Failure Triggers *(MANDATORY)*

### Expected Outcome Patterns

- clean descent and landing
- nose-heavy landing (front-first, manageable)
- controlled rolloff descent
- nose-dive (steep front-first, OTB risk)
- rear-first landing (overcorrection)
- stall at edge (hesitation)
- crash after landing (run-out failure)
- bail before edge

### Failure Chain: Nose-Dive from Forward Weight (technique failure)

**Trigger:** Rider's CoM at or forward of footpegs as front wheel departs the edge.

**Mechanism:** Front end loses supporting surface and drops under gravity. Forward weight maximises the rotational moment around the rear axle contact point. Pitch rate is proportional to forward weight bias and inversely proportional to speed. Forward position prevents rearward correction — moving backward requires pulling against the front end's downward momentum.

**Outcome:** Steep nose-down descent. Minor = hard fork compression, rider pitched onto bars. Moderate = fork bottoms, OTB risk. Significant = OTB likely.

**Stage 6 classification:** `technique` (primary — weight distribution error)

### Failure Chain: Braking at the Edge (technique failure)

**Trigger:** Rider applies front brake within last 1–2 bike lengths of the edge, or at the edge.

**Mechanism:** Front brake shifts weight forward and compresses the fork. At the edge, the compressed fork begins to rebound — rebound drives the front end downward, accelerating nose-down pitch beyond what the weight position alone would produce. Braking weight transfer and fork rebound timing combine for faster nose-down rotation than the drop geometry alone.

**Outcome:** Accelerated nose-down pitch regardless of rearward weight position. The fork rebound effect overrides correct weight position.

**Stage 6 classification:** `technique` (primary — brake timing error), `decision` (contributing — misjudged approach speed)

### Failure Chain: Hesitation and Low-Speed Arrival (decision / momentum failure)

**Trigger:** Rider sees the drop, loses confidence, reduces speed on the late approach — arrives below the optimal speed range.

**Mechanism:** Low speed = minimal gyroscopic stability (fast nose-down pitch) + shortened horizontal trajectory (bike lands close to the base on flat ground). The combination of steep pitch angle and flat landing maximises impact severity.

**Outcome:** Steep nose-down descent with flat landing. Fork bottoming. High OTB risk on moderate drops and above. The worst possible outcome for the drop height, produced by the rider's attempt to be cautious.

**Stage 6 classification:** `decision` (primary — reduced speed when commitment was required), `momentum` (contributing — insufficient horizontal velocity)

### Failure Chain: Blind Drop Speed Miscalibration (decision failure)

**Trigger:** Rider does not see the drop until at or past the commitment point. Speed and body position set for continued trail riding.

**Mechanism:** Neutral weight distribution, trail speed (potentially excessive for the drop height), no time to recalibrate. Front wheel departs edge with no pre-set rearward bias. Pitch rate determined by neutral weight position — faster than prepared rearward position.

**Outcome:** Minor blind drops → jarring front-heavy landing. Moderate blind drops → significantly elevated OTB risk. Significant blind drops → crash.

**Stage 6 classification:** `decision` (primary — terrain not read ahead), `technique` (contributing — body position not set)

### Failure Chain: Overcorrection to Rear-Heavy (technique failure)

**Trigger:** Rider shifts weight excessively rearward — past drop-safe position to well behind the rear axle.

**Mechanism:** Nose-down pitch is successfully prevented, but the overcorrection produces a nose-up or level attitude through a descent phase where some nose-down is needed to align with a downslope landing. Bike arrives at landing surface rear-wheel-low, front-wheel-high. Rear shock absorbs initial impact, then rebounds upward, pitching rider forward.

**Outcome:** Rear-first landing followed by aggressive forward pitch from shock rebound. Rider thrown onto or over the bars. Less common than nose-dive but occurs in riders over-applying "lean back" as an absolute rule.

**Stage 6 classification:** `technique` (primary — overcorrection of weight distribution)

### Pipeline Identification Notes

**Visual indicators for Stage 4 `feature_type: drop` detection:**

*Approach:*
- Trail approaching a visible edge or crest beyond which the ground drops away
- No ascending ramp or face — trail is flat or slightly downhill to the edge
- Lower surface visible below the edge (or not visible = blind drop indicator)
- Rock face, earth bank, or constructed ledge visible below upper trail surface

*Execution:*
- Front wheel departing the upper surface and descending — visible gap opening between front tyre and upper surface
- Bike pitching nose-down — front end visibly lower than rear
- No upward trajectory — bike moves forward and down, not up
- Rider's body shifted rearward of normal trail position
- Rear wheel maintaining brief upper-surface contact after front departs (rolloff indicator)

*Post-event:*
- Front-first landing: fork compression, dust on contact, rider pitched forward
- Descending trajectory with no prior upward arc (distinguishes from jump landing)

**Audio markers:**
- No engine rev-up before the feature (no face acceleration — distinguishes from jump)
- Brief silence or idle during short descent phase
- Impact on landing: fork bottoming, tyre slap, chassis compression
- Crash: scraping, impact sequence consistent with forward ejection

**Severity indicators:**
- Drop height: estimated from departure-to-contact time or visible geometry
- Edge geometry: sharp square edge = vertical drop; rounded edge = rolloff
- Landing surface visibility: if rider cannot see landing from approach, classify as blind and add one severity tier
- Rider body position on approach: rearward shift = recognised drop; neutral = possible surprise or under-preparation

**Edge cases — flag Stage 4 confidence low:**
- POV footage: drop depth extremely difficult to assess — camera looks ahead not down; appears as trail disappearing; indirect indicators: sudden horizon rise, engine idle, freefall-then-impact shake pattern
- Distant 3rd-person: drops under 1m may not be distinguishable from trail undulation
- Speed-transformed step-downs: if rider speed cannot be reliably assessed, flag below 0.5
- Angled rolloffs vs steep descents: if rider maintains ground contact throughout, it is a descent not a drop; if contact status is ambiguous, flag low confidence

### Observability Notes

**1. Reliably confirmable from footage:**
- Whether bike descends from upper surface to lower surface
- Whether both wheels leave the ground (fully airborne vs tracked rolloff)
- Bike attitude during descent (nose-down angle visible in 3rd-person)
- Landing type (front-first, rear-first, balanced)
- Whether rider crashes after landing
- Whether rider is standing or seated on approach
- Edge geometry (sharp vs rounded) — in close or medium 3rd-person footage

**2. Inferable with caveats:**
- Drop height (estimated from visible geometry, bike proportions as reference, or descent time)
- Approach speed (estimated from motion cues)
- Whether rider shifted weight rearward (inferred from body position; subtle shifts may not be visible)
- Whether drop was blind to the rider (inferable from rider's perspective footage)
- Landing surface quality (estimated from visible texture and conditions)

**3. Cannot be determined from footage:**
- Exact drop height in metres
- Whether rear brake was applied during descent
- Whether throttle blip was used at the edge (engine note may indicate but not visually confirmable)
- Suspension setup and remaining travel at landing
- Rider confidence level or hesitation influence
- Hidden landing surface hazards (rocks under leaves, water depth)

---

## 6. Approach & Setup Requirements

> *Section 6 uses default naming for single_event features.*

**Speed selection:** Drop speed selection is counterintuitive — the instinct to slow down worsens outcomes at moderate severity and above. Optimal speed: enough horizontal velocity for gyroscopic stability and potential downslope trajectory reach, low enough for manageable landing impact. Minor = relatively forgiving. Moderate = moderate trail speed typically optimal. Significant = speed is specific to the drop; too slow produces excessive pitch, too fast produces excessive impact.

**Edge assessment:** Assess from the approach zone: edge sharp or rounded? Landing visible? Drop height? Landing surface type? Downslope available at speed? On blind drops, if landing geometry cannot be assessed, treat as one severity tier higher than visible geometry suggests.

**Body position setup point:** Weight must be shifted rearward before the front wheel reaches the edge — setup point is 2–3 bike lengths before the edge at moderate speed. Setting up at the edge is too late. On blind drops, there may be no time for proper setup — a primary reason blind drops are inherently higher severity.

**Gear selection:** One gear lower than normal trail riding for most enduro drops. Lower gears provide more engine braking (reducing need for braking close to the edge) and more precise throttle response for edge blip timing on significant drops.

---

## 7. Terrain & Condition Interaction

**Rock (TERRAIN-03):** Clean, predictable edge geometry and firm departure points. Maximum impact harshness on landing — no surface deformation to absorb energy. Technically clean, physically punishing.

**Mud (TERRAIN-01):** Mud near the edge can cause unintended slide over the drop. Mud on landing absorbs some impact energy but creates front-wheel dig risk — front tyre sinks and decelerates the front end abruptly while the rear continues forward → post-landing OTB. Different mechanism from nose-dive (occurs after landing, not during descent).

**Hardpack (TERRAIN-02):** Most forgiving overall — good approach traction, defined edge geometry, firm but manageable landing absorption.

**Loose surface / shale (TERRAIN-09):** Loose material on approach can cause unintended speed increase toward the edge (rear wheel spin) or uncontrolled slide. Loose material on rolloff face eliminates rear-brake control during the contact window. Loose landing provides some absorption but reduces run-out traction.

**Roots (TERRAIN-07):** Root clusters on the edge create irregular departure geometry — front wheel may depart at an unexpected angle. Root-exposed landing surfaces are slippery and uneven → high front-wash risk on contact.

**Condition modifiers:**
- Wet: reduces approach traction (uncontrolled slide toward edge risk), reduces edge friction (earlier-than-intended departure), reduces landing traction. Effectively increases severity by one tier.
- Frozen: edges extremely slippery — may slide over the edge without intending to drop. Zero landing absorption and high slide risk. Moderate drops become effectively significant; significant drops inadvisable.
- Leaf cover / vegetation: masks edge geometry and may hide the drop entirely. Leaf-covered drops should be classified as effectively blind if leaf layer obscures edge and landing geometry.

**Compounding risks:**
- Drop landing onto off-camber terrain: lateral instability on contact added to vertical impact management.
- Drop followed immediately by a turn, obstacle, or second drop: reduced recovery margin.
- Drop preceded by fast descent: rider arrives at edge with downhill momentum and limited braking distance.

---

## 8. Exit, Landing & Recovery

> *Section 8 uses default naming for single_event features.*

**Landing dynamics:** Drops characteristically bias toward nose-down landings — unlike jumps where nose-up or level is also possible. Drop landing technique is predominantly about managing front-first impact.

- Front-first (most common): fork compresses, absorbs vertical component to travel limit. Bike rotates around front axle as rear engages. Rider absorbs through knees and ankles, transitions weight from rearward drop position to neutral for run-out control.
- Level (target): rearward weight shift and any throttle blip have offset the pitch to produce near-level attitude. Both suspension units compress simultaneously — mechanically optimal, harder to achieve than on jumps.
- Rear-first (overcorrection): rear shock absorbs then rebounds upward → rider pitched forward. Less common on drops than jumps.

**Run-out requirements:** Indicative minimums: minor = 2–3m, moderate = 5–10m, significant = 10–15m, major = 15m+. Drops generate significant forward momentum on landing. If run-out contains obstacles, turns, or further features within these distances, compound difficulty increases significantly.

**Recovery from imperfect landings:**
- Nose-heavy landing: immediate rearward weight shift, gentle throttle to extend rear and level chassis. No front brake — fork already at or near maximum compression.
- Stall at edge: do not ride off at low speed (maximum nose-down pitch). Dismount carefully on upper surface, manage bike down manually, or roll backwards and reassess.
- Post-landing slide on slippery surface: release brakes, allow bike to track straight, use throttle to stabilise through drive. No steering correction until traction re-established.

---

## 9. False Reads & Misidentification

**Overestimating drop severity from above:** Looking directly down at a drop exaggerates height. Causes over-preparation (excessive speed or weight shift) or refusal of a feature within the rider's capability.

**Underestimating on blind drops:** Rider cannot calibrate for a drop they cannot see. Natural drops partially hidden by vegetation, shadow, or convex approach are frequently underestimated. Rider arrives at commitment speed with no preparation.

**Confusing drop with steep descent:** A sustained steep descent is not a drop — rider maintains surface contact. However, steep descents can contain embedded drops (a ledge partway down a steep hill). Rider calibrated for descent encounters a drop and must transition from braking-descent technique to drop technique (weight back, release brakes) in the time available after recognition.

**Confusing drop with jump on convex crests:** A convex crest at low speed = drop (tracks over and descends). At high speed = jump (convex geometry launches into arc). Riders who have ridden a feature at low speed may be unprepared for jump dynamics at higher speed, or vice versa.

**POV footage:** Drop depth extremely difficult to assess. Drop appears as the trail disappearing — horizon rises, ground falls away. Indirect indicators: sudden horizon rise, engine note dropping to idle, camera shake pattern of freefall then abrupt impact.

**3rd-person from behind the rider:** Best angle for drop assessment — approach, edge, and descent all visible.

**3rd-person from below:** Shows landing and descent but not approach, edge assessment, or rider preparation.

**Distant footage:** Drops under 1m not distinguishable from normal undulation at distance. Flag confidence below 0.5 for drop detection from distant 3rd-person footage.

**Condition-created ambiguity:** Leaf buildup near edge creates false ground level — actual edge is under the leaves. Shadow filling the drop face obscures depth. Standing water in landing zone obscures actual surface depth and type.

---

## 10. Coaching Gates & Prerequisites

### Minimum Prerequisites by Severity

**Minor:** Standing technique (BIOMECH-01). Weight distribution awareness (DYNAMICS-01) — rider must understand rearward weight shift before a drop.

**Moderate:** Minor prerequisites plus: demonstrated rearward weight shift on minor drops with controlled descent and balanced landing. Speed discipline (set on approach, not near the edge). Edge assessment ability.

**Significant:** Moderate prerequisites plus: consistent moderate-drop technique with controlled pitch management and balanced landing. Throttle blip timing practised on moderate drops first. Commitment decision-making (INTEL-05) confirmed.

**Major:** Significant prerequisites plus: demonstrated recovery from imperfect significant-severity landings; pitch management through body weight and rear brake during descent. Stage 9 should assess drop appropriateness before recommending technique. **Do not coach up to major without confirmed significant competence and demonstrated recovery skills.**

### Progression Model

1. Standing with rearward weight shift on flat terrain
2. Minor drops on dry, visible surfaces
3. Minor drops on varied surfaces (wet, loose)
4. Moderate drops on dry surfaces with visible landing
5. Moderate drops on varied surfaces
6. Moderate blind drops (if geometry known from pre-ride)
7. Significant drops on dry surfaces with visible landing
8. Significant drops with progressive speed building
9. Major drops (with specific feature knowledge and progressive attempts only)

### "Do Not Coach Up" Thresholds

Stage 9 should decline to recommend next severity tier when:
- Footage shows front-heavy landings at the current tier (weight shift insufficient)
- Rider brakes at or near the edge in current-tier footage (brake timing discipline not established)
- Seated position on drop approach (standing weight management is a prerequisite)
- Current-tier outcome includes OTB, nose-dive, or stall at the edge
- Drop is blind and rider has not demonstrated proficiency on visible drops at the same height

### Skill Category Tags

- `balance_standing` — minor+
- `weight_shift_rearward` — minor+
- `speed_discipline_pre_feature` — moderate+
- `edge_assessment` — moderate+
- `throttle_blip_timing` — significant+
- `commitment_decision` — significant+
- `pitch_management_airborne` — significant+
- `recovery_imperfect_landing` — major

---

## 11. Feature Demands / Constraints

### Minimum Technique Required

Standing technique with deliberate rearward weight shift (BIOMECH-01, DYNAMICS-01) at any coaching-relevant severity. Riders who cannot stand and shift hips behind the footpegs should not attempt drops above minor severity. Moderate and above require speed discipline, edge assessment, and commitment decision-making. Significant requires throttle blip timing and pitch management.

### Equipment Considerations

**Suspension:** Fork setup critical — sufficient fork travel is essential. Under-sprung forks will bottom on moderate drops; over-damped forks will not absorb the initial impact quickly enough, producing a spike force at the bars. Rear shock matters less — rear typically contacts after the fork has already absorbed the primary impact.

**Sump guard / bash plate:** Drop landings frequently impact the underside of engine cases on the landing surface, particularly on flat landings. Strongly recommended for any riding that includes moderate drops or above.

**Handlebars:** Hard fork bottoming transmits impact directly through bars to rider's hands and wrists. Bar risers or bar-mounted dampers can reduce transmitted force.

### Out-of-Scope Content

- Standing vs seated fundamentals → BIOMECH-01
- Weight distribution physics → DYNAMICS-01
- Throttle control mechanics → CONTROL-01
- Jump features (upward launch trajectory) → FEATURE-01
- Step-down features (low-speed sustained contact) → FEATURE-04
- Line choice and terrain reading → INTEL-01, INTEL-03
- Commitment vs hesitation psychology → INTEL-05
