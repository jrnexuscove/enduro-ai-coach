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
  tags: [drop, ledge-drop, step-down-drop, rolloff, blind-drop, vertical, descent, nose-dive, otb, endover, landing, commitment, freefall, edge]
  version: 1.0
  last_updated: 2026-04-03
---

# FEATURE-03 — Drop Features: Feature Profile

---

## 1. Feature Geometry & Physics *(MANDATORY)*

A drop is any terrain geometry where the riding surface transitions abruptly downward — the bike descends from an upper surface to a lower surface across a vertical or near-vertical face. The defining characteristic is **downward transition without upward launch**: the bike does not travel up a ramp or face before becoming airborne. Instead, it rolls or rides off an edge and gravity pulls it downward to a lower landing surface. The critical distinction from a jump is the absence of an ascending trajectory — a drop produces descent, not launch.

**Primary Observable Signature:** Bike descending from a visible upper edge to a lower surface with no upward launch trajectory — front wheel drops below the departure surface level.

**Dominant Risk Axis:** Nose-down pitch at departure and vertical landing impact severity.

### Physical Zones

**Approach zone:** The section of trail leading to the drop edge. This is where the rider assesses the drop geometry, sets speed, selects gear, and establishes body position. On well-defined drops (purpose-built or well-worn trails), the approach is obvious — the trail ends at a visible edge. On natural terrain, the approach may give minimal warning: the trail may appear to continue but actually drops away beyond a convex crest, or vegetation may obscure the edge geometry.

**Edge / departure point:** The lip where the upper surface ends and the vertical or steep face begins. This is the last point of full ground contact before the bike enters the descent. The edge geometry is critical: a sharp square edge produces an abrupt departure where the front wheel drops immediately; a rounded or angled edge allows a more gradual transition where the front wheel tracks down the face before departing. The edge shape determines the initial pitch rate — sharp edges produce faster nose-down rotation than rounded edges.

**Descent phase:** From edge departure to landing contact. During this phase the bike is either fully airborne (vertical drops) or tracking down a steep face with partial and diminishing contact (angled rolloffs). On vertical drops, this phase is pure freefall with no traction-based control available. On steep rolloffs, the rear wheel may maintain partial contact with the upper surface briefly after the front wheel departs, providing a short window of rear-brake and drive control.

**Landing zone:** The surface where the bike returns to full ground contact. Landing geometry varies: flat ground below the edge (maximum vertical impact), downslope transition (reduces vertical velocity component), or stepped terrain (the landing surface may itself be rough, angled, or contain further features). The landing zone on natural drops is rarely prepared — it may be rock, root, mud, or loose surface, creating a compound problem of impact absorption plus immediate traction management.

**Run-out zone:** The distance after landing where the rider re-establishes full control. Drops generate significant forward momentum on landing (the vertical descent converts to forward chassis pitch that drives the bike forward), and the rider needs distance to rebalance, settle the suspension, and resume steering authority.

### Force Vectors

On approach, the bike carries horizontal momentum. At the edge, the supporting surface disappears beneath the front wheel first (because the front wheel reaches the edge first). The front end drops under gravity while the rear wheel still has surface contact — this creates a nose-down pitch moment that is the defining force problem of drops. The pitch rate depends on the edge geometry, the bike's speed at the edge, and the rider's weight distribution. Once the rear wheel also departs the edge, the bike is fully airborne and follows a trajectory determined by its horizontal speed and the vertical freefall acceleration.

On pure vertical drops to flat landings, the vertical impact velocity is primarily set by gravity and drop height. On natural drops, angled rolloffs, and downslope landings, the effective impact severity varies with departure shape, trajectory, and landing geometry. The suspension must absorb the vertical component — if the drop height produces a vertical velocity that exceeds the suspension's absorption capacity, the suspension bottoms and the remaining energy transfers directly to the chassis and rider.

### Why This Creates a Distinct Riding Problem

Drops invert the normal riding relationship with gravity. On flat terrain and climbs, gravity loads the tyres and assists traction. On descents, gravity pulls the bike downhill but the rider maintains surface contact. On a drop, gravity becomes the primary motive force during the descent phase, and the rider has no traction to resist it. The nose-down pitch tendency is the core problem — the front wheel enters freefall before the rear, creating a rotational moment that the rider must counteract through body position alone. Every other terrain feature where the rider maintains ground contact allows continuous steering, braking, and throttle corrections. A drop removes these for the duration of the descent.

The second distinct problem is that drops are often difficult to assess from the approach. A jump face is visible as the rider climbs it — the ramp geometry is apparent. A drop edge may look like flat trail until the rider is at the edge and can see over it. Blind drops — where the landing zone is not visible from the approach — are a common source of crashes because the rider cannot calibrate technique to a feature they cannot fully see.

### Commitment & Reversibility Profile

**Point of no return:** For minor drops (under 0.5m), commitment occurs at the edge — the rider can roll to the edge and stop. For moderate drops, commitment occurs 1–2 bike lengths before the edge — at trail speed, the rider cannot stop in time once they recognise the drop. For significant and major drops, commitment occurs during the approach when the rider decides to carry speed toward the edge. On blind drops, commitment may occur before the rider can even assess the feature — they are committed by speed and trail geometry before the drop is visible.

**Recovery window:** Very short once the front wheel passes the edge. On vertical drops, there is no recovery window — the bike is in freefall. On angled rolloffs, there is a brief window (rear wheel still on the upper surface) where rear brake can slow the descent rate. Once both wheels are airborne, the only corrections available are body weight shifts and rear brake (to manage pitch, as with jumps). The recovery window is shorter than for jumps because the airtime is typically shorter and the nose-down tendency is stronger.

**Bailout options:** On the approach, the rider can stop before the edge — this is the only clean bailout. At the edge on minor drops, the rider can dismount. On moderate and above, stopping at the edge may leave the bike in an unstable position (front wheel over the edge, rear on flat — the bike may roll forward uncontrolled). The practical bailout is approach-zone only. Once at the edge with speed, the rider is committed.

---

## 2. Feature Forms & Variants *(MANDATORY)*

> **Classification hard rule:** If the bike travels up an ascending face before becoming airborne, the feature is a jump (FEATURE-01), not a drop. A drop is classified when the dominant event is downward transition from an edge without upward launch. If the rider maintains sustained ground contact throughout the descent at walking speed, it is a step-down (FEATURE-04), not a drop.

> **Classification boundary note:** Speed can transform a step-down into a drop. A 0.5m ledge ridden at walking pace with the front wheel placed carefully onto the lower surface is a step-down. The same ledge at trail speed where the front wheel drops into freefall is a drop. Classification is determined by the dominant event in the footage, not by geometry alone.

### Vertical Ledge Drop

A square or near-square edge where the upper surface ends abruptly and a vertical (or near-vertical) face descends to a lower surface. The defining characteristic is that there is no slope to track down — the front wheel departs the edge and enters freefall immediately. This is the purest form of drop and produces the fastest nose-down pitch rate.

**Visual identification:** A clear horizontal upper surface that terminates at a defined edge. Below the edge, a vertical or very steep face. The lower surface is visible below (or not visible — blind drop). The edge is typically rock, compacted earth, or constructed material. The upper surface does not curve downward before the edge — it is flat or nearly flat right to the lip.

**Severity range:** Minor to major, determined primarily by height. Under 0.5m is minor. 0.5–1.5m is moderate. 1.5–3m is significant. Over 3m is major. Severity escalates further if the landing surface is flat, rocky, or contains obstacles.

**Distinct failure pattern:** Immediate nose-dive. The front wheel drops from the edge with no transitional surface to track. The bike pitches nose-down at the maximum rate for the given speed and weight distribution. If the rider's weight is neutral or forward at the edge, the pitch rate exceeds the rider's ability to correct — the bike goes vertical in the air and the rider is ejected over the bars (OTB). On lower drops, this manifests as a front-heavy landing that compresses the fork fully and pitches the rider onto the bars.

### Angled Rolloff

A steep but not vertical face that the bike tracks down from the upper surface. The edge is rounded or sloped rather than square — the front wheel transitions from horizontal travel to downhill travel along a surface rather than departing into freefall. The rear wheel remains in contact with the upper surface or the top of the rolloff face while the front wheel descends, providing a brief window of rear-wheel traction.

**Visual identification:** The trail tips steeply downward at a defined point, but the transition is curved or angled rather than a sharp edge. The front wheel can follow the surface for part or all of the descent. The distinction from a "steep descent" is that the angle is steep enough that the front wheel is likely to lose surface contact at some point during the transition — the bike does not maintain four-point contact throughout.

**Severity range:** Minor to significant. Angled rolloffs are inherently lower severity than vertical drops of the same height because the transitional surface reduces the nose-down pitch rate and the rear wheel maintains contact longer. However, rolloffs on loose or slippery surfaces can produce uncontrolled sliding descents that are difficult to manage.

**Distinct failure pattern:** Front wheel washes out on the face. On loose or wet surfaces, the front wheel descends the angled face but loses traction on the steep surface. The front slides forward and down faster than the rear, and the bike transitions from a controlled rolloff to an uncontrolled nose-first slide. The rider ends up sliding down the face with the front wheel leading, which can produce an OTB if the front wheel catches an obstacle at the base.

### Natural Trail Drop

An erosion-formed or geological feature where the trail surface drops away. Common forms include washed-out trail edges, creek bank descents, rock shelf edges, and root-exposed ledges. Natural drops are characterised by irregular geometry — the edge may be partially crumbled, the face may be uneven, and the landing surface is uncontrolled.

**Visual identification:** The trail surface ends or drops at a point that is not obviously constructed. The edge geometry is irregular — not a clean horizontal line but a rough, natural transition. The face below may include exposed roots, rock, loose earth, or mixed surfaces. The landing zone is natural terrain.

**Severity range:** Minor to significant. Natural drops rarely reach major severity (over 3m) on normal trail riding, but their severity is elevated by irregular geometry and unprepared landing surfaces. A 1m natural drop onto a rock landing is effectively a tier higher in severity than a 1m drop onto groomed dirt.

**Distinct failure pattern:** Asymmetric departure. The natural edge is not uniform — one side may be higher or further forward than the other. The front wheel departs the edge at an angle, producing yaw or roll in addition to the nose-down pitch. The bike enters the descent phase with a lateral component that the rider did not anticipate, compounding the nose-down management problem with a lateral stability problem.

### Blind Drop

Any drop where the landing zone is not visible from the approach or the edge. The rider can see the edge but cannot see what is below it until the front wheel is already over. Blind drops can be any of the above forms — the "blind" classification is additive, not a separate geometry.

**Visual identification:** The trail approaches a crest or edge beyond which the ground falls away. The lower surface is hidden by the convex geometry of the terrain — the rider cannot see over the edge from the approach. From a 3rd-person camera behind the rider, the drop-off is visible but the rider's perspective is obscured.

**Severity range:** Any drop severity, plus one tier for the blind factor. A geometrically minor drop that is blind becomes effectively moderate because the rider cannot calibrate body position, speed, or line to the actual landing geometry.

**Distinct failure pattern:** Speed miscalibration. The rider approaches at a speed appropriate for continued trail riding (because the trail appears to continue) and discovers the drop at or past the commitment point. The speed is typically too high for the drop height, converting what would be a controlled descent into an uncontrolled one. The rider has no time to set body position for the drop because they did not know it was coming.

### Step-Down at Speed

A moderate-height step (0.3–1m) that the rider encounters at trail speed rather than the walking pace at which it would be managed as a step-down feature. The geometry is identical to a step-down, but the rider's speed transforms the technique requirement. At walking pace, the rider places the front wheel carefully and lowers the bike. At trail speed, the front wheel drops from the edge and the bike is briefly airborne.

**Visual identification:** A defined step in the trail surface — typically a rock ledge, compacted earth bank, or root step. The step height is in the minor-to-moderate range, but the context indicates the rider is travelling at speed (visible forward momentum, no slowing on approach).

**Severity range:** Minor to moderate. The step height is small, but the speed-induced airtime and the rider's lack of preparation (if they were riding at trail pace and did not recognise the step as a drop) increase severity.

**Distinct failure pattern:** Unweighted front end at the wrong moment. The rider's body position is set for trail riding (neutral weight) rather than drop technique (weight rearward). The front wheel drops from the step, the bike pitches nose-down, and the rider's neutral weight distribution allows the pitch to develop. On small steps this produces a jarring front-heavy landing. On larger steps at higher speed, it can produce a full nose-dive.

---

## 3. Bike Behaviour *(MANDATORY)*

This section describes the mechanical response of the motorcycle to drop features at the physics level. No coaching language, rider intent, or corrective advice — that content belongs in Section 4.

### Front-First Departure and Pitch Dynamics

The motorcycle's wheelbase means the front wheel reaches the drop edge before the rear wheel. As the front wheel passes the edge, the front end loses its supporting surface and begins to drop under gravity. The rear wheel is still on the upper surface, acting as a pivot point. This creates a nose-down pitch moment — the front end rotates downward around the rear axle contact point. The pitch rate depends on three factors: the rider's weight distribution (forward weight increases the downward moment on the front), the bike's speed (higher speed means the rear wheel reaches the edge sooner, reducing the time the front is unsupported), and the edge geometry (a sharp edge produces an instant loss of front support; a rounded edge produces a gradual transition).

The critical implication: at low speed, the front wheel is unsupported for a longer duration before the rear wheel also departs the edge. This means low-speed drops produce more nose-down pitch than the same drop at higher speed. This is counterintuitive — riders often slow down for drops, which actually worsens the pitch problem. The optimal drop speed is fast enough that the rear wheel follows the front off the edge quickly (reducing the pitch window) but slow enough that the landing impact is manageable.

### Rear Wheel Contact Window

On drops where the face is not perfectly vertical, the rear wheel maintains surface contact for a brief period after the front wheel departs. During this window, the rider has rear-brake authority (to control descent rate) and limited drive authority (throttle can push the bike forward, extending the trajectory and reducing the vertical landing component). This window is measured in fractions of a second on most enduro drops. On angled rolloffs, the window is longer — potentially 1–2 seconds — because the rear wheel tracks down the face.

The rear wheel contact window is the primary mechanical difference between drops and jumps in terms of available control. On a jump, both wheels depart the lip in quick succession and the rider has full airborne time. On a drop, the staggered departure gives the rider a brief moment of single-wheel contact that, if used correctly, significantly changes the outcome.

### Suspension Response on Landing

Landing from a drop loads the fork first (if the bike is nose-down, which is the typical drop attitude) or both suspension units simultaneously (if the rider has managed to level the bike). Front-first landings compress the fork rapidly. If the drop height exceeds the fork's absorption capacity, the fork bottoms — the remaining impact energy transfers through the triple clamps, headstock, and frame to the rider. Fork bottoming on drops is common at moderate severity and above because the vertical velocity component is high relative to the available fork travel.

Rear shock loading follows the fork (front-first landing) or occurs simultaneously (level landing). If the bike is significantly nose-down at landing, the rear shock engages after the fork has already compressed — the bike pivots from fork compression to rear shock loading, producing a pitching motion that can unseat the rider. A level landing distributes impact across both units simultaneously, which is mechanically optimal but harder to achieve on drops than on jumps (because drops produce inherent nose-down pitch).

### Speed and Trajectory

Higher approach speed extends the horizontal trajectory during the descent phase. This means the bike lands further from the base of the drop face. On drops with a flat landing, extending the trajectory does not reduce the vertical impact — the vertical velocity is determined by drop height and is independent of horizontal speed. However, extending the trajectory can be beneficial if the landing surface transitions to a downslope further from the base — the rider "reaches" the downslope landing by carrying more speed, converting what would be a flat landing into a downslope landing.

On drops with flat landings, there is no speed advantage beyond maintaining gyroscopic stability. Excessive speed simply means landing at high horizontal velocity in addition to the vertical velocity, creating a compound impact and reducing the rider's recovery window.

### Gyroscopic Stability in the Descent

As with jumps, wheel gyroscopic forces resist pitch changes. At higher speeds, the wheels resist the nose-down pitch tendency — the bike holds its attitude longer. At low speeds, gyroscopic stability is minimal and the bike pitches nose-down rapidly. This contributes to the counterintuitive speed-pitch relationship described above: slow drops pitch more aggressively because there is less gyroscopic resistance to the nose-down moment.

Rear brake application during the descent reduces rear wheel speed and therefore its gyroscopic contribution, but the effect is less significant on drops than on jumps because the descent phase is typically shorter (less airtime) and the nose-down tendency is stronger (more rotational energy to overcome).

---

## 4. Technique by Severity *(MANDATORY)*

Severity is defined primarily by observable feature geometry (drop height, edge geometry, landing surface) and visibility (blind vs sighted). Rider skill requirement is secondary commentary.

### Minor (Under 0.5m vertical transition, rollable at low speed)

**Body position:** Standing with weight shifted rearward of neutral. Hips behind the footpegs, arms extended forward with bend at the elbows. The rearward weight shift counteracts the nose-down pitch moment as the front wheel departs the edge. Head up, looking at the landing surface and beyond — not at the edge itself.

**Control inputs:** Approach at low-to-moderate speed. Cover the rear brake. As the front wheel passes the edge, allow it to drop while maintaining rearward weight bias. The rear wheel follows naturally. On landing, absorb through knees and ankles, allow the body to shift forward to neutral as the bike levels.

**Commitment threshold:** Low. The rider can stop at the edge on minor drops. They can also roll through at walking pace, treating the feature as a step-down rather than a drop.

**Common errors:** Looking down at the edge rather than at the landing — causes the rider to freeze at the departure point. Braking at the edge — shifts weight forward at the worst possible moment, accelerating the nose-down pitch. Remaining seated — prevents the rider from shifting weight rearward independently of the bike's pitch.

**Mechanical consequence:** On minor drops, errors produce a front-heavy landing that compresses the fork and pitches the rider onto the bars. Uncomfortable but rarely crash-producing at this height.

**Coaching gate:** Basic standing technique (BIOMECH-01) must be confirmed. Rider must understand that weight must shift rearward before the edge, not at or after it.

### Moderate (0.5–1.5m drop with defined edge)

**Body position:** Standing, weight deliberately rearward. Hips well behind the footpegs — further back than on minor drops because the pitch moment is stronger and lasts longer. Arms extended but not locked — locked arms transfer the front-end drop directly to the rider's shoulders and pull them forward. Head up, looking at the landing zone.

**Control inputs:** Set speed on the approach — moderate speed that provides some gyroscopic stability without producing excessive landing impact. As the front wheel departs the edge, the rider's rearward weight position resists the nose-down pitch. If the rear wheel is still in contact (angled rolloff or rounded edge), a brief rear brake application controls the descent rate. In the air, weight shift and rear brake are available for pitch management. On landing, absorb through full leg range, allow body to shift forward to neutral, maintain throttle readiness to drive out.

**Commitment threshold:** Moderate. The rider should be committed before reaching the edge — stopping at the edge of a moderate drop leaves the bike in an unstable position. Speed adjustment must happen on the approach.

**Common errors:** Insufficient rearward weight shift — the most common moderate-drop error. The rider moves weight back slightly but not enough to counteract the pitch moment of a 0.5–1.5m drop. The front drops faster than the rider's position can resist, producing a steep nose-down attitude. Front brake on approach too close to the edge — braking shifts weight forward, then the rider enters the drop with forward-biased weight. Stiff arms — locked elbows connect the rider's upper body to the front end, so when the front drops, the rider is pulled forward with it.

**Mechanical consequence:** Nose-down departure at moderate height produces significant fork compression on landing. If the angle is steep enough, the fork bottoms and the bike pivots over the front axle — the rear end lifts and the rider is ejected forward (OTB). Even without full OTB, a steep front-first landing loads the headstock and steering bearings heavily and can damage the fork seals.

**Coaching gate:** Standing technique (BIOMECH-01) and weight distribution awareness (DYNAMICS-01) must be confirmed. The rider must demonstrate deliberate rearward weight shift — not just standing, but actively positioning the hips behind the pegs before the edge.

### Significant (1.5–3m drop or blind drop; full commitment)

**Body position:** Maximum rearward weight position. Hips as far behind the footpegs as the rider's reach allows — in some cases, the rider's backside is behind the seat. Arms fully extended but relaxed — the rider is at the limits of their reach on the bars. This extreme rearward position is necessary because the nose-down pitch moment scales with drop height, and a 2m drop produces a pitch rate that a moderate rearward position cannot resist. Head up, eyes on the landing zone.

**Control inputs:** Speed set well before the edge — the approach is the only place to manage speed. At the edge, the rider may apply a brief throttle blip to lift the front wheel slightly above horizontal before departure. This pre-loads the front end with a small nose-up attitude that partially offsets the nose-down pitch during the descent. The throttle blip must be precisely timed — too early and the front drops back before the edge; too late and the front is already over the edge. This is an advanced timing tool, not a default requirement for all significant drops, and its usefulness depends on edge shape, approach speed, and the rider's existing pitch control skill. In the descent, rear brake is available for pitch management. On landing, full leg absorption with immediate forward weight transition to reload the front tyre for steering authority.

**Commitment threshold:** High. The rider must be fully committed before the approach zone. Hesitation on approach to a significant drop produces the worst outcome — the rider arrives at the edge at an intermediate speed (too fast to stop, too slow for gyroscopic stability) with uncommitted body position.

**Common errors:** Hesitation — the rider sees the drop, doubts their ability, and reduces speed on the late approach. This produces low-speed arrival at the edge with poor body position and maximum nose-down pitch rate (low gyroscopic resistance). Speed too high — the rider overcompensates for the drop by carrying excessive speed, which extends the trajectory horizontally but does not reduce vertical impact. The landing force is high and the rider must manage significant forward momentum on contact. Throttle blip mistimed — too early lifts the front then drops it before the edge; too late has no effect because the front is already over. Looking into the drop rather than at the landing — target fixation on the vertical face below freezes the rider's body position.

**Mechanical consequence:** At significant height, the vertical velocity at landing exceeds the fork's normal operating range. Fork bottoming is expected. The impact loads the headstock, frame, and rider's wrists and ankles heavily. If the nose-down angle is steep, OTB becomes the primary risk — the bike pivots over the front axle with enough energy to eject the rider completely. At this height, incorrect technique causes crashes that produce injury.

**Coaching gate — do not prescribe significant drop technique without confirmed prerequisites:** Rider must demonstrate consistent moderate-drop technique with deliberate rearward weight shift, controlled descent rate, and balanced landing. Throttle blip timing requires practice on moderate drops first. If moderate-drop footage shows the rider nose-heavy on landing, stiff-armed, or braking at the edge, coaching should address those fundamentals before recommending significant-drop technique.

### Major (Over 3m or complex landing geometry)

Major drops represent extreme terrain that most enduro riders will rarely encounter outside competition or dedicated freeride lines. At this severity, the vertical velocity at landing exceeds the suspension's designed operating range regardless of technique. Major drops require race-level skill, bike preparation (uprated suspension, frame protection), and familiarity with the specific feature through progressive attempts.

**Body position:** As per significant, with pre-loading of the front end through throttle blip mandatory (not optional). The rider must actively manage attitude through the full descent using body weight and rear brake.

**Control inputs:** Approach speed must be precise for the specific drop — too slow produces excessive nose-down pitch; too fast extends the trajectory beyond the intended landing zone. The throttle blip at the edge must produce enough nose-up to offset the pitch moment for the full descent duration. In the air, continuous weight management and rear brake modulation.

**Commitment threshold:** Total. The approach speed and line must be correct before the rider enters the approach zone. Any adjustment within the approach zone at this severity compromises the technique chain.

**Coaching gate:** **Do not prescribe major drop technique without confirmed competence at significant level.** Stage 9 (Decision Engine) should assess whether the drop is appropriate for the rider's demonstrated ability before recommending technique. At major severity, the correct coaching output may be: "This drop exceeds the technique threshold demonstrated in your footage. Walk the feature or choose an alternative line."

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

**Trigger:** Rider's centre of mass is at or forward of the footpegs as the front wheel departs the drop edge.

**Mechanism:** The front wheel loses its supporting surface and drops under gravity. With the rider's weight forward, the gravitational moment around the rear axle contact point is maximised. The front end pitches nose-down rapidly. The rate of pitch is proportional to the forward weight bias and inversely proportional to speed (more speed = more gyroscopic resistance). The rider cannot correct the pitch because their forward position prevents rearward weight shift — moving backward while the bike is already pitching forward requires pulling against the downward momentum of the front end.

**Outcome:** The bike enters the descent phase at a steep nose-down angle. On minor drops, this produces a hard fork compression on landing. On moderate drops, the fork bottoms and the bike may pitch forward enough to eject the rider (OTB). On significant drops, OTB is the likely outcome.

**Stage 6 classification:** `technique` (primary — weight distribution error)

### Failure Chain: Braking at the Edge (technique failure)

**Trigger:** Rider applies front brake on the approach within the last 1–2 bike lengths before the edge, or applies brake while the front wheel is at the edge.

**Mechanism:** Front braking shifts weight forward (pitch moment). The fork compresses under braking load. The rider arrives at the edge with forward-biased weight and a compressed fork. As the front wheel passes the edge, the compressed fork begins to rebound — this rebound energy drives the front end downward rather than allowing it to float, accelerating the nose-down pitch. The braking weight transfer and the fork rebound timing combine to produce faster nose-down rotation than the drop geometry alone would create.

**Outcome:** Accelerated nose-down pitch. The bike enters the descent phase at a steeper angle than the rider's weight position alone would produce. The fork rebound effect is particularly dangerous because the rider may have correct weight position (rearward) but the braking-induced fork dynamics override it.

This describes the common failure pattern for late braking on drops; the exact pitch outcome also depends on brake release timing relative to edge departure and fork rebound damping characteristics.

**Stage 6 classification:** `technique` (primary — brake timing error), `decision` (contributing — the rider misjudged approach speed and attempted late correction)

### Failure Chain: Hesitation and Low-Speed Arrival (decision / momentum failure)

**Trigger:** Rider sees the drop, loses confidence, and reduces speed on the late approach — arriving at the edge at a speed below the optimal range.

**Mechanism:** Low speed produces two compounding effects. First, gyroscopic stability is minimal, so the bike pitches nose-down faster once the front wheel departs the edge. Second, the horizontal trajectory is shortened — the bike drops more vertically, landing closer to the base of the drop face. Landing close to the base means landing on a flat surface rather than reaching any downslope transition that might exist further out. The combination of steep pitch angle and flat landing maximises impact severity.

**Outcome:** Steep nose-down descent with flat landing. Fork bottoming. High OTB risk on moderate drops and above. The worst possible outcome for the given drop height, produced paradoxically by the rider's attempt to be cautious.

**Stage 6 classification:** `decision` (primary — the rider chose to reduce speed when commitment was required), `momentum` (contributing — insufficient horizontal velocity for trajectory management)

### Failure Chain: Blind Drop Speed Miscalibration (decision failure)

**Trigger:** Rider does not see the drop until they are at or past the commitment point. Their speed and body position are set for continued trail riding, not drop management.

**Mechanism:** The rider's weight is neutral (trail riding position), their speed is trail speed (potentially too fast for the drop height), and they have no time to recalibrate. The front wheel departs the edge with neutral weight distribution and no pre-set rearward bias. The nose pitches down at the rate determined by the neutral weight position, which is faster than the rate from a prepared rearward position.

**Outcome:** Varies with drop height. On minor blind drops, the outcome is a jarring front-heavy landing — unpleasant but manageable. On moderate blind drops, OTB risk increases significantly because the rider had no preparation time. On significant blind drops, the outcome is typically a crash — the rider is not prepared for the forces involved and cannot establish correct technique in the available time.

**Stage 6 classification:** `decision` (primary — the rider did not read the terrain ahead), `technique` (contributing — body position was not set for the feature)

### Failure Chain: Overcorrection to Rear-Heavy (technique failure)

**Trigger:** Rider, aware of the nose-down risk on drops, shifts weight excessively rearward — past the drop-safe position into a position where the centre of mass is well behind the rear axle.

**Mechanism:** With extreme rearward weight, the nose-down pitch at the edge is successfully prevented — but the overcorrection produces a nose-up or level attitude through a descent phase where some nose-down is actually needed to align the bike with a downslope landing. The bike arrives at the landing surface with the rear wheel low and the front wheel high. The rear shock absorbs the initial impact, then rebounds — the rebound pitches the rider forward. Additionally, the rear-first landing means the rear tyre must absorb the full vertical velocity before the front engages, which can exceed the rear shock's capacity on higher drops.

**Outcome:** Rear-first landing followed by aggressive forward pitch from shock rebound. The rider is thrown forward onto the bars or over them. This failure pattern is less common than nose-dive but occurs in riders who have been taught "lean back on drops" as an absolute rule without understanding the degree of weight shift needed.

**Stage 6 classification:** `technique` (primary — overcorrection of weight distribution)

### Pipeline Identification Notes

**Visual indicators for Stage 4 `feature_type: drop` detection:**

*Approach indicators:*
- Trail surface approaching a visible edge or crest beyond which the ground drops away
- No ascending ramp or face visible — the trail is flat or slightly downhill leading to the edge
- The lower surface is visible below the edge (or not visible — indicating blind drop)
- Rock face, earth bank, or constructed ledge visible below the upper trail surface

*Execution indicators:*
- Front wheel departing the upper surface and descending — visible gap opening between front tyre and upper surface
- Bike pitching nose-down during descent — the front end visibly lower than the rear
- No upward trajectory visible — the bike moves forward and down, not forward and up
- Rider's body position shifted rearward relative to normal trail riding
- Rear wheel maintaining brief contact with upper surface after front has departed (on angled rolloffs)

*Post-event indicators:*
- Front-first landing visible: fork compression, dust on contact, rider pitched forward
- Bike trajectory descending from above with no prior upward arc (distinguishes from jump landing)
- Rider absorption through legs on landing, or loss of control immediately after a descent

**Audio markers:**
- Engine note does not increase before the feature (no rev-up from acceleration on a face — distinguishes from jump)
- Brief silence or idle during short descent phases
- Impact sound on landing — fork bottoming, tyre slap, chassis compression
- On crashes: scraping, impact sequence consistent with forward ejection

**Severity indicators:**
- Drop height: estimated from the time between front wheel departure and landing contact, or from visible geometry if the full drop face is in frame
- Edge geometry: sharp square edge = vertical drop; rounded edge = rolloff
- Landing surface visibility: if the rider cannot see the landing from the approach position, classify as blind and add one severity tier
- Rider body position on approach: rearward weight shift indicates recognised drop; neutral position indicates possible surprise or under-preparation

**Edge cases where Stage 4 classification confidence should be flagged low:**
- POV footage: drop depth is extremely difficult to assess from helmet-cam because the camera looks ahead, not down at the edge geometry. The drop may appear as the trail simply steepening
- Distant 3rd-person footage: drops under 1m may not be distinguishable from normal trail undulation at distance
- Speed-transformed step-downs: the same geometry can be a step-down or a drop depending on speed. If rider speed cannot be reliably assessed, flag the classification confidence below 0.5
- Angled rolloffs vs steep descents: the boundary between "rolloff drop" and "steep descent" is not sharp. If the rider maintains surface contact throughout, it is a descent, not a drop. If surface contact is lost, it is a drop. In footage where contact status is ambiguous, flag low confidence.

### Observability Notes

**1. Reliably confirmable from footage (directly observable):**
- Whether the bike descends from an upper surface to a lower surface
- Whether both wheels leave the ground during the descent (fully airborne vs tracked rolloff)
- Bike attitude during descent (nose-down angle visible in 3rd-person footage)
- Landing type (front-first, rear-first, balanced)
- Whether the rider crashes after landing
- Whether the rider is standing or seated on approach
- Edge geometry (sharp vs rounded) — in close or medium 3rd-person footage

**2. Inferable with caveats:**
- Drop height (estimated from visible geometry, bike proportions as reference, or descent time)
- Approach speed (estimated from motion cues)
- Whether the rider shifted weight rearward on approach (inferred from body position change relative to bike, but subtle shifts may not be visible)
- Whether the drop was blind to the rider (inferable if the camera shows the rider's perspective and the drop-off is not visible until the edge)
- Landing surface quality (estimated from visible texture and conditions)

**3. Cannot be determined from footage:**
- Exact drop height in metres
- Whether the rider applied rear brake during the descent (brake lever input is rarely visible)
- Whether the rider applied a throttle blip at the edge (engine note may indicate this but is not confirmable visually)
- Suspension setup and remaining travel at landing
- The rider's confidence level or whether hesitation influenced the approach
- Whether the landing surface has hidden hazards (rocks under leaves, water depth)

---

## 6. Approach & Setup Requirements

> *Section 6 uses default naming for single_event features.*

### Speed Selection

Drop speed selection is more counterintuitive than for any other feature. The instinct to slow down for a drop is strong but produces worse outcomes at moderate severity and above. The optimal speed balances three factors: enough horizontal velocity for gyroscopic stability (resists nose-down pitch), enough horizontal trajectory to reach a downslope landing if one exists (rather than landing flat at the drop base), and low enough that the combined vertical and horizontal landing impact is within the rider's absorption capacity.

For minor drops, speed is relatively forgiving — any speed from walking pace to moderate trail speed produces a manageable outcome. For moderate drops, moderate trail speed is typically optimal. For significant drops, speed must be specific to the drop — too slow produces excessive nose-down pitch, too fast produces excessive landing impact and reduces the recovery window.

### Edge Assessment

The rider must assess the edge geometry before committing. Key questions: Is the edge sharp or rounded? Is the landing surface visible? What is the drop height? What is the landing surface type? Is there a downslope transition available at speed? These assessments must be made from the approach zone — stopping at the edge to look may be possible on minor drops but is impractical or dangerous on moderate and above.

On blind drops, edge assessment is limited to what the rider can see from the approach. If the landing geometry cannot be assessed, the rider must either have prior knowledge of the feature or treat it as one severity tier higher than the visible geometry suggests.

### Body Position Setup Point

Weight must be shifted rearward before the front wheel reaches the edge. The setup point is 2–3 bike lengths before the edge at moderate speed. Setting up body position at the edge itself is too late — the front wheel is already departing and any weight shift at that moment changes the departure dynamics unpredictably. On blind drops where the rider does not recognise the feature until they are close, there may be no time for proper setup — this is why blind drops are inherently higher severity.

### Gear Selection

The correct gear maintains enough drive to allow a throttle blip at the edge (for significant drops) and enough engine braking to assist speed control on the approach without requiring heavy braking close to the edge. Lower gears provide more engine braking and more precise throttle response. Higher gears smooth the drive but provide less low-speed control. For most enduro drops, one gear lower than normal trail riding is appropriate.

---

## 7. Terrain & Condition Interaction

**This section flags which Terrain KB entries should be co-retrieved and documents the feature-level interaction. It does not duplicate Terrain KB content.**

### Surface Type × Drop Interaction

**Rock surface (retrieve TERRAIN-03):** Rock edges provide the most defined drop geometry — sharp, predictable edges and firm departure points. Rock landings produce maximum impact harshness with no surface deformation to absorb energy. Rock drops are technically clean (good edge assessment, predictable departure) but physically punishing (hard landings, no absorption).

**Mud surface (retrieve TERRAIN-01):** Mud on the upper surface near the edge can cause the bike to slide toward the edge uncontrolled — the rider may not intend to drop but loses traction near the lip and slides over. Mud on the landing absorbs some impact energy but creates a front-wheel dig risk — the front tyre sinks into the landing surface and decelerates the front end abruptly while the rear continues forward, pitching the rider over the bars. This is a different OTB mechanism from nose-dive — it occurs after landing rather than during descent.

**Hardpack surface (retrieve TERRAIN-02):** Firm edges, predictable departure, manageable landing absorption. Hardpack is the most forgiving drop surface overall — good traction on approach, defined edge geometry, and firm but not harsh landing.

**Loose surface / shale (retrieve TERRAIN-09):** Loose material on the approach can cause unintended speed increase toward the edge (rear wheel spins, bike accelerates) or uncontrolled slide toward the edge. Loose material on the drop face (angled rolloffs) reduces rear-wheel traction during the contact window, eliminating the rear-brake control that makes rolloffs more manageable. Loose landing surfaces provide some absorption but reduce traction for the run-out, making post-landing control difficult.

**Roots (retrieve TERRAIN-07):** Root clusters on the edge create irregular departure geometry — the front wheel may depart from a root surface rather than solid ground, at an unexpected angle. Root-exposed landing surfaces are slippery and uneven, producing high front-wash risk on contact.

### Condition Modifiers

**Wet conditions:** Reduce approach traction (risk of uncontrolled slide toward the edge), reduce edge friction (the bike may depart the edge earlier than intended if the edge surface is slippery), and reduce landing traction (front-wash and slide risk on contact). Wet conditions effectively increase severity by one tier on most drops.

**Frozen conditions:** Frozen edges are extremely slippery — the bike may slide over the edge without the rider intending to drop. Frozen landing surfaces provide zero absorption and high slide risk. Frozen conditions make moderate drops effectively significant and significant drops inadvisable.

**Leaf cover / vegetation:** Leaves on the approach mask the edge geometry and may hide the drop entirely. Leaves on the landing mask the surface type and condition beneath. Leaf-covered drops should be classified as effectively blind if the leaf layer obscures the edge and landing geometry.

### Compounding Risk

- Drop landing onto off-camber terrain sharply increases lateral instability on contact — the rider must manage vertical impact and lateral traction demand simultaneously.
- Drop followed immediately by a turn, obstacle, or second drop reduces recovery margin and compounds consequence.
- Drop preceded by a fast descent reduces the rider's ability to set correct approach speed — they arrive at the edge with downhill momentum and limited braking distance.

---

## 8. Exit, Landing & Recovery

> *Section 8 uses default naming for single_event features.*

### Landing Dynamics

Drop landings differ from jump landings in one critical respect: drops characteristically bias the bike toward a nose-down landing attitude, whereas jumps can produce nose-up, nose-down, or level depending on face technique. This means drop landing technique is predominantly about managing front-first impact.

**Front-first landing (most common on drops):** The fork compresses first, absorbing the vertical component up to its available travel. If the fork bottoms, the remaining energy transfers through the chassis. As the fork absorbs impact, the bike rotates around the front axle contact — the rear end drops onto the landing surface. The rider must absorb through the knees and ankles and allow their weight to transition from the rearward drop position to a neutral or slightly forward position for run-out control.

**Level landing (target):** Achieved when the rider's rearward weight shift and any throttle blip at the edge have successfully offset the nose-down pitch to produce a near-level attitude at landing. Both suspension units compress simultaneously, distributing impact. This is mechanically optimal but requires precise technique — particularly on drops where the natural pitch tendency is strongly nose-down.

**Rear-first landing (overcorrection):** The rider has shifted weight too far back or used too much throttle blip, producing a nose-up attitude. The rear shock absorbs initial impact, then rebounds upward, pitching the rider forward. This is less common on drops than on jumps but occurs in riders who have over-learned the "lean back" cue.

### Run-Out Requirements

Drops generate significant forward momentum on landing — the vertical descent converts gravitational potential energy to kinetic energy, and the landing produces a forward weight shift that drives the bike forward. The run-out zone must allow for suspension settling (1–2 rebound cycles), rider rebalancing (forward weight transition from the rearward drop position), and steering re-establishment.

Minimum run-out distances: minor = 2–3m, moderate = 5–10m, significant = 10–15m, major = 15m+. These are practical minimums — if the run-out contains obstacles, turns, or further features within these distances, the compound difficulty increases significantly.

### Recovery from Imperfect Landings

**Nose-heavy landing recovery:** Immediate weight shift rearward. Apply gentle throttle to extend the rear and level the chassis. Do not apply front brake — the fork is already at or near maximum compression, and front braking adds load to a system that is already saturated.

**Stall at the edge recovery:** If the rider stops at the edge with the front wheel over, do not attempt to ride off — the low-speed departure will produce maximum nose-down pitch. Instead, dismount carefully on the upper surface, manage the bike down manually, or roll backwards from the edge and reassess.

**Post-landing slide recovery:** If the landing surface is slippery and the bike slides after contact, release brakes, allow the bike to track straight, and use throttle to stabilise the chassis through drive. Do not attempt steering correction until traction is re-established.

---

## 9. False Reads & Misidentification

### Rider Misreads

**Overestimating drop severity from above:** Riders looking down at a drop from the edge experience a perspective that exaggerates the height. A 1m drop viewed from directly above looks significantly larger than it is. This causes riders to over-prepare (excessive speed, excessive rearward weight shift) or refuse a feature that is within their capability.

**Underestimating drop severity on blind drops:** The inverse problem — the rider cannot see the drop and therefore cannot calibrate for it. Natural terrain drops that are partially hidden by vegetation, shadow, or a convex approach are frequently underestimated. The rider arrives at the edge expecting continued trail and discovers a drop at or past the commitment point.

**Confusing drop with steep descent:** A sustained steep descent is not a drop — the rider maintains surface contact throughout. However, steep descents can contain drops embedded within them (a ledge midway down a steep hill). The rider calibrated for "steep descent" encounters a "drop within descent" that requires different technique. The transition from sustained braking descent to drop management (weight back, release brakes, allow front to drop) is difficult to execute at the recognition speed available.

**Confusing drop with jump:** On some natural terrain, a convex crest can function as either a drop or a jump depending on speed. At low speed, the bike tracks over the crest and descends the far side — a drop. At high speed, the convex geometry launches the bike into an arc — a jump. Riders who have ridden a feature at low speed (drop technique) may encounter it at higher speed and be unprepared for the jump dynamics, or vice versa.

### Camera/Footage Misclassification Risks

**POV footage:** Drops are difficult to identify from POV because the rider looks ahead, not down. The drop may appear as the trail simply disappearing — the ground falls away and the horizon rises in the frame. The camera may not capture the edge geometry or the landing surface. Indirect indicators: sudden horizon rise, engine note dropping to idle, camera shake pattern consistent with freefall then impact.

**3rd-person from behind the rider:** This angle shows the drop well — the rider approaches the edge, the lower surface is visible, and the descent is captured. This is the best camera angle for drop assessment.

**3rd-person from below the drop:** Shows the landing and the bike descending but does not show the approach or edge geometry. The descent phase and landing are visible, but the rider's preparation and edge technique are not assessable.

**Distant footage:** Drops under 1m are difficult to distinguish from normal trail undulation at distance. Even moderate drops may not be visible if the camera is far from the feature. Flag confidence below 0.5 for drop detection from distant 3rd-person footage.

### Condition-Created Ambiguity

**Leaf cover obscuring the edge:** Fallen leaves can build up on the upper surface near the edge, creating a false ground level. The actual edge is hidden beneath the leaves. The rider may ride onto the leaf buildup and discover that the edge is further forward than visible.

**Shadow hiding the drop depth:** In wooded terrain, shadows can fill the drop face and landing zone, making the drop appear shallower than it is or obscuring the landing surface entirely.

**Water at the base:** Standing water in the landing zone obscures the actual landing surface. The depth may be unknown — the rider could be landing on a solid surface under 10cm of water or dropping into a 50cm-deep puddle that decelerates the front wheel abruptly.

---

## 10. Coaching Gates & Prerequisites

### Minimum Prerequisites by Severity

**Minor:** Standing technique confirmed (BIOMECH-01). Weight distribution awareness (DYNAMICS-01) — the rider must understand the concept of shifting weight rearward before a drop. Without this understanding, even minor drops produce front-heavy landings.

**Moderate:** All minor prerequisites plus: demonstrated rearward weight shift on minor drops with controlled descent and balanced landing. The rider must show evidence of setting body position before the edge, not reacting at the edge. Speed discipline — speed must be set on approach, not adjusted near the edge. Edge assessment — the rider must demonstrate reading the drop geometry from the approach.

**Significant:** All moderate prerequisites plus: demonstrated consistent moderate-drop technique with controlled pitch management through the descent. Throttle blip timing must be practised on moderate drops before applying to significant. The rider must demonstrate awareness of landing geometry — choosing speed to reach downslope landings when available. Commitment decision-making (INTEL-05) must be confirmed — the rider must demonstrate the ability to commit fully once the decision is made.

**Major:** All significant prerequisites plus: demonstrated recovery from imperfect significant-severity landings. The rider must show evidence of pitch management through body weight and rear brake during descent. **Do not coach up to major drop technique without confirmed competence at significant level and demonstrated recovery skills.** Stage 9 should assess whether the drop is appropriate before recommending technique.

### Progression Model

1. Standing with rearward weight shift on flat terrain → 2. Minor drops on dry, visible surfaces → 3. Minor drops on varied surfaces (wet, loose) → 4. Moderate drops on dry surfaces with visible landing → 5. Moderate drops on varied surfaces → 6. Moderate blind drops (if geometry is known from pre-ride) → 7. Significant drops on dry surfaces with visible landing → 8. Significant drops with progressive speed building → 9. Major drops (with specific feature knowledge and progressive attempts only)

### "Do Not Coach Up" Thresholds

Stage 9 (Decision Engine) should decline to recommend the next severity tier when:
- The rider's footage shows front-heavy landings at the current tier (weight shift is insufficient)
- The rider brakes at or near the edge in current-tier footage (brake timing discipline is not established)
- The rider's footage shows seated position on drop approach (standing weight management is a prerequisite)
- The outcome in current-tier footage includes OTB, nose-dive, or stall at the edge
- The drop is blind and the rider has not demonstrated proficiency on visible drops at the same height

### Skill Category Tags (Future-Proofing)

Prerequisites by tier reference the following skill categories for future Skill Tag and Drill KB integration:
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

Drop features at any coaching-relevant severity require standing technique with deliberate rearward weight shift (BIOMECH-01, DYNAMICS-01). Riders who cannot stand on the pegs and shift their hips behind the footpegs should not attempt drops above minor severity. At moderate and above, speed discipline, edge assessment, and commitment decision-making are required. At significant, throttle blip timing and pitch management become necessary.

### Equipment Considerations

**Suspension:** Fork setup is more critical for drops than for most other features. Sufficient fork travel is essential — drops produce front-first landings that compress the fork to its limits. Under-sprung forks will bottom on moderate drops; over-damped forks will not absorb the initial impact quickly enough, producing a spike force at the bars. Rear shock setup matters less for drops than for jumps because the rear typically contacts after the front has already absorbed the primary impact.

**Sump guard / bash plate:** Drop landings frequently impact the underside of the engine cases on the landing surface — particularly when the front wheel contacts the base of the drop face on a flat landing. A sump guard is strongly recommended for any riding that includes moderate drops or above.

**Handlebars:** Hard fork bottoming on drop landings transmits impact directly through the bars to the rider's hands and wrists. Bar risers or bar-mounted dampers can reduce the transmitted force. Bar-end weights reduce high-frequency vibration from impact but do not reduce the primary force.

### Out-of-Scope Content

- Standing vs seated fundamentals → BIOMECH-01
- Weight distribution physics → DYNAMICS-01
- Throttle control mechanics → CONTROL-01
- Jump features (upward launch trajectory) → FEATURE-01
- Step-down features (low-speed sustained contact) → FEATURE-04
- Line choice and terrain reading → INTEL-01, INTEL-03
- Commitment vs hesitation psychology → INTEL-05
