---
# ── BLOCK 1: Pipeline Contract ──────────────────────────────────────────────
pipeline_contract:
  kb_type: terrain_feature
  pipeline_enum_value: [log]
  feature_class: single_event

# ── BLOCK 2: Retrieval Triggers ─────────────────────────────────────────────
retrieval_triggers:
  PRIMARY:
    stage4_feature_type: [log]
  SECONDARY:
    stage6_failure_types: [technique, momentum, line_choice]
    stage7_crash_types: [otb, tip_over]
  CONTEXTUAL:
    stage3_intent_category: [obstacle_clear, trail_ride, technical_section]
    stage5_outcome: [crash, bail]

# ── BLOCK 3: Content Metadata ────────────────────────────────────────────────
content_metadata:
  topic_id: FEATURE-05
  title: Log Crossing — Feature Profile
  domain: Terrain Feature KB
  domain_id: features
  scope: "Feature identification, severity classification, and technique requirements
    for log crossings — discrete cylindrical horizontal obstacles (fallen trees, logs,
    branches) that cross the trail and must be ridden over. Does NOT cover riding
    along a narrow elevated surface (see beam / narrow elevated surface feature), root crossings as a grouped
    obstacle type (see roots feature entry), step features with flat faces ridden at low speed
    (see FEATURE-04), standing technique fundamentals (see BIOMECH-01), or clutch
    and throttle mechanics (see CONTROL-01)."
  status: draft
  feature_type: log
  severity_definition:
    minor: "Log or branch under 20cm diameter; rollable at low trail speed with basic weight shift; no deliberate clutch technique required; consequence limited to jarring impact or brief momentum loss if contact angle is incorrect"
    moderate: "Log 20–40cm diameter, fixed and anchored; requires deliberate front-wheel lift via clutch-and-throttle blip or body-weight unweighting; poor technique produces front bounce-back, stall at bridge phase, or rear-wheel hook; tip-over risk if momentum is lost at the bridge phase"
    significant: "Log over 40cm diameter, or any log with a compounding factor (wet or mossy surface, steep gradient approach, angled crossing, or a second obstacle within one wheelbase); full clutch-blip and sustained drive-through required; technique errors produce OTB from front bounce-back, severe stall, or lateral fall at bridge phase"
    major: "Double log stack with close spacing, extreme diameter (60cm+) on adverse gradient, or log sequence requiring linked crossings; rare outside competition; narrow technique window and minimal recovery margin; consequence of error at this scale is high"
  severity_covered: [minor, moderate, significant, major]
  crash_types_associated: [otb, tip_over]
  failure_types_associated: [technique, momentum, line_choice]
  common_misclassifications:
    - step_up        # A step_up has a flat top and a vertical face; a log has a rounded cylindrical cross-section — contact geometry is fundamentally different
    - step_down      # Same distinction from the other direction; a step feature has a flat face, a log is a cylinder
    - roots          # Roots are thinner, usually flexible, and appear in groups across the trail; a log is a single discrete cylindrical obstacle
    - "ridge — a compacted earth ridge or rock roll can visually resemble a small log at distance; classified as log only when the obstacle is a cylindrical timber section"
  typical_body_position: standing
  difficulty_range: [beginner, intermediate, advanced]
  related_topics: [BIOMECH-01, CONTROL-01, DYNAMICS-02, FEATURE-04, FEATURE-06]
  prerequisites: [BIOMECH-01, CONTROL-01]
  tags: [log, log-crossing, fallen-tree, horizontal-obstacle, bounce-back, stall, rear-hook, straddling, clutch-blip, momentum, obstacle-clear, single-event]
  version: 1.0
  last_updated: 2026-04-03
---

# FEATURE-05 — Log Crossing: Feature Profile

---

## 1. Feature Geometry & Physics *(MANDATORY)*

A log crossing is a cylindrical horizontal obstacle lying across the trail, perpendicular or near-perpendicular to the direction of travel. The rider must cross over it — the bike's front wheel climbs the log's curved face, the chassis briefly bridges the log at its apex, and the rear wheel then crosses. The defining physical property is the rounded cross-section: unlike a step or ledge with a flat top and vertical face, the log presents a curved contact surface that redirects wheel forces in ways that are mechanically distinct from any other trail obstacle.

**Primary Observable Signature:** A cylindrical timber section blocking the full trail width — the trail is interrupted by a fallen tree or placed log. The front wheel is driven or lifted onto the log's face, the bike tilts over the apex at a raised chassis height, and the rear end drops back to ground level as the rear wheel clears.

**Dominant Risk Axis:** Bounce-back from insufficient front-wheel force, and lateral fall at the bridge phase when momentum is lost with the chassis unsupported on the log's apex.

### Physical Zones

**Approach zone:** The section of trail leading to the log. The rider assesses the log's diameter, surface condition (dry bark vs wet or mossy), crossing angle (perpendicular vs diagonal), gradient context, and the presence of compounding obstacles on the far side. Speed selection, gear selection, and body position setup all occur here. On maintained trails, the log is visible from several bike lengths away. On overgrown terrain, it may emerge from vegetation with minimal warning.

**Contact zone — front wheel phase:** From initial front-tyre contact with the log's forward face through to the front wheel cresting the log's apex and beginning its descent on the far side. The contact geometry here is critical: the front tyre contacts the log below the log's centre line, where the log's curved surface presents a normal vector directed partly rearward and partly upward. The rider's task is to ensure the upward force component dominates — achieved through rearward weight shift and a clutch-and-throttle blip timed to front-wheel contact.

**Bridge phase:** From the moment the front wheel descends the far side until the rear wheel makes contact with the log. During this phase the chassis crosses the log's apex. The bike is at its highest point relative to the ground. On logs small relative to the bike's wheelbase, the bridge phase is brief and both wheels remain near the ground. On larger logs, the chassis rests momentarily on the log's apex with the front wheel descending the far side and the rear wheel not yet in contact — the bike is balanced on the log. This is the highest-risk moment geometrically: wheel support is reduced or transitional, stable tyre-ground contact may be absent or momentary, lateral balance is poorly supported by tyre contact, and forward momentum must be maintained to complete the crossing.

**Contact zone — rear wheel phase:** From rear-wheel contact with the log's forward face through to rear-wheel departure from the far side. The rear wheel is driven by engine power and must climb the same cylindrical obstacle the front wheel crossed. If drive is maintained, the rear wheel compresses against the log and its forward momentum carries it over. If drive is interrupted — throttle released or brake applied — the rear wheel loses the energy needed to climb. The trailing edge of the log then catches the rear tyre, producing sudden deceleration.

**Exit zone:** From rear-wheel departure from the log to full control re-establishment. When the rear wheel clears the log's apex, the rear end drops from log height to ground level. This produces a forward chassis pitch — the rear drops as the front is already level. The rider must absorb this pitch through knees and ankles and quickly re-establish a neutral riding position. The exit zone is typically short (1–3m) but requires active management.

### Force Vectors

The log's cylindrical geometry creates a contact force that is vectorially different from a vertical step. On a flat-faced step, the tyre presses forward against a wall and the reactive force pushes the wheel backward — overcoming this requires lifting the wheel above the step height. On a log, the forward face below the centre line presents a curved surface where the reactive normal force is directed partly rearward and partly upward. The balance between these components depends on the contact angle: a wheel contacting the log at a higher point on the face (more upward on the curve) experiences a greater upward force relative to rearward; a wheel contacting low on the base of the face experiences more rearward deflection. This is why front wheel lift changes the outcome: elevating the contact point shifts the force ratio toward upward, making the log easier to climb.

At the bridge phase, the chassis rests on the log's apex and gravity acts through the bike's centre of mass. If the centre of mass is forward of the log contact point, the front end's weight pulls the crossing to completion naturally. If momentum has dropped so the centre of mass is behind the contact point, gravity works against completion — the bike may balance or rock backward.

### Why This Creates a Distinct Riding Problem

Most trail riding problems involve forces in the forward/backward plane — pitch, acceleration, braking. Log crossings add a compound problem: the obstacle forces the bike through a sequence of distinct mechanical states — ascending face, bridge phase, descending face, exit drop — each requiring different weight distribution and drive inputs, all within approximately one second. The transition between states is not smooth; each phase produces a sudden shift in chassis dynamics that the rider must anticipate and counter in the correct sequence.

The bridge phase is the specific problem that distinguishes log crossings from all other obstacle types. No other enduro feature places the bike in a state where both wheels simultaneously lack stable ground contact and the chassis is balanced on a rounded apex. The rider cannot use tyre traction to stabilise laterally during this phase — balance is maintained only through body position and the brief duration of the phase itself.

A secondary distinct problem is the rear wheel phase. Most features end at the rider's point of maximum effort; the log crossing has a second active phase — the rear wheel crossing — after the rider may believe the hard part is done. The rear-wheel hook failure occurs specifically because riders relax or release throttle once the front wheel is over, before the rear wheel has completed its crossing.

### Commitment & Reversibility Profile

**Point of no return:** When the front wheel is in contact with the log's ascending face. Once the tyre has engaged the log surface with forward momentum, the rider cannot reliably reverse — the front wheel cannot back off the log face without risk of the wheel slipping sideways or the bike falling. The rider must drive forward.

**Recovery window:** From front-wheel contact through to the rear wheel fully clearing the log's apex. Throughout this window, sustained throttle and body position actively influence the outcome. The rear wheel phase is entirely within the recovery window — the rider can recover from a sub-optimal front crossing by maintaining drive into the rear phase.

**Bailout options:** Approach zone only for moderate and significant logs. A rider approaching at moderate speed can choose not to cross. A rider who has stopped at the log with the front wheel touching but no momentum can back up and reassess. A rider committed with the front wheel on the log face at speed cannot reliably bail. For minor logs, a rider who stalls at the bridge phase can dismount and manually walk the bike over. For significant logs, stalling at the bridge phase is a high-risk situation — dismounting without tipping the bike is difficult.

---

## 2. Feature Forms & Variants *(MANDATORY)*

> **Classification hard rule:** A log crossing is classified when the primary obstacle is a discrete cylindrical timber section spanning the trail that the rider must cross over. If the obstacle has a flat top and a vertical face, it is a step feature (FEATURE-04), not a log. If the obstacle is a narrow elevated surface that the rider rides along (not over), it is a beam / narrow elevated surface feature. Multiple roots crossing the trail in a group are a root crossing (FEATURE-06), not a log — even if one root is large, the group dynamics change the technique.

> **Classification boundary note:** Object diameter is the primary indicator but does not alone determine severity. A log partially buried in the trail may have an effective crossing height of 10cm (minor) despite its actual diameter being 40cm. Effective crossing height — the height the front wheel must overcome from the approach side — is the operationally relevant measure. Always assess from the entry side.

### Small Log / Branch (Under 20cm diameter)

A fallen branch or small log that the front wheel can roll over without deliberate lift technique. The effective crossing height is at or below the depth of the tyre's sidewall deformation — the tyre rolls over the obstacle through compliance and contact.

**Visual identification:** A narrow timber section lying across the trail. The obstacle does not reach ankle height when standing alongside it. The trail is visible on the far side through and over the obstacle. The log may have bark intact or stripped, and may be partially sunk into soft ground (reducing effective height).

**Severity range:** Minor only. Small logs do not reach moderate severity unless compounding factors are present — steep gradient, wet surface, angled crossing on a narrow trail, or the log is free-rolling rather than anchored.

**Distinct failure pattern:** Surprise deceleration. The rider does not register the small log as a feature requiring technique and rolls into it at trail speed with neutral body position. The log decelerates the front wheel abruptly and the rider is pitched onto the bars. Not a crash-producing failure at this height, but produces a jarring impact and potential loss of line in tight sections.

### Medium Log (20–40cm diameter)

The most common crossing obstacle in enduro and trail riding. This diameter range requires deliberate technique — a simple roll at trail speed produces bounce-back or stall. The log is large enough to create a defined bridge phase and to require active management of the rear-wheel crossing.

**Visual identification:** A log reaching between knee and hip height when standing alongside it. The full trail width is typically blocked — the log cannot be ridden around without significant deviation. The log's cylindrical apex is clearly visible as the rider approaches. Using the bike's front wheel diameter (approximately 70–75cm for a standard 21-inch enduro wheel) as reference: a 30cm log diameter is approximately 40% of the wheel diameter — clearly visible as a significant obstacle in frame.

**Severity range:** Moderate at standard conditions on flat or slight gradient. Moderate-to-significant where a wet or mossy surface, steep uphill approach, or angled crossing applies.

**Distinct failure pattern:** Front bounce-back or rear hook, depending on the specific technique error. Bounce-back occurs when the rider fails to lift the front wheel — the log deflects the front wheel rearward. Rear hook occurs when the rider gets the front over but releases throttle as the rear wheel contacts the log — the log catches the rear tyre's trailing edge and the bike lurches forward. These represent opposite errors: one from insufficient commitment, one from mismanaged timing.

### Large Log (Over 40cm diameter)

A large fallen tree or substantial log requiring full technique execution with no margin for error. The bridge phase is extended — the front wheel descends significantly before the rear wheel contacts. The bike spends measurable time fully supported only by the log's apex. Lateral balance at the bridge phase is a real management problem, not just a theoretical risk.

**Visual identification:** A log reaching hip height or above when standing alongside it. A standard front wheel (approximately 53cm) alongside a 45cm log makes the log visibly close to the full wheel height. The bridge phase is obvious in footage — the bike clearly tilts over the log with the front end dropping as the rear is elevated. The rider's body position change is pronounced and deliberate.

**Severity range:** Significant at standard conditions. Major where a double log, extreme diameter (60cm+), significant gradient, or sequential obstacles apply.

**Distinct failure pattern:** Lateral fall at bridge phase. The large log creates a pronounced bridge phase where the bike is balanced on the apex with limited wheel contact below. If the rider's weight is offset to one side, or the crossing angle was not dead perpendicular, the bike tilts laterally and falls. This failure does not occur on medium logs because the bridge phase is brief — but on large logs the bike is visibly elevated and the lateral fall risk is material.

### Wet or Mossy Log

Any diameter log where the bark surface is wet, lichen-covered, or mossy — significantly reducing tyre-to-log friction. This is a severity modifier, not a separate geometry. A 25cm log that is moderate in dry conditions becomes significant when wet and mossy because the tyre cannot generate adequate grip on the log surface.

**Visual identification:** Visible moisture on the log surface, green or grey lichen or moss covering the bark, water dripping from the log, or wet conditions in the surrounding environment. In footage, the log surface has a green or dark colouration rather than bare brown or grey bark.

**Severity range:** Adds one tier to the base diameter classification. Minor logs become moderate; moderate logs become significant.

**Distinct failure pattern:** Tyre slip on the log surface during the ascending face. The tyre contacts the log and attempts to ride up the curve, but instead of gripping and maintaining upward progress, the tyre slides — potentially laterally along the log's surface. On wet logs, slip and lateral loss of directional purchase become more likely, and may replace or compound the usual bounce-back pattern: the tyre slides on the log surface, the bike's line deviates laterally, and the bike may fall to the side.

### Angled Log (Non-Perpendicular Crossing)

A log lying at an angle to the trail — diagonal rather than perpendicular. The rider must cross it at an angle, which creates a lateral force component during the crossing that a perpendicular crossing does not produce.

**Visual identification:** The log is visible across the trail at an angle — one end is further down the trail than the other. The ideal crossing direction is not straight and requires the rider to adjust their approach angle to cross perpendicular to the log's axis.

**Severity range:** Adds one tier to the base diameter classification where the angle exceeds approximately 20–30 degrees from perpendicular.

**Distinct failure pattern:** Lateral wheel deflection. The front wheel contacts the angled log face and is deflected not just backward but sideways — perpendicular to the log's axis rather than to the direction of travel. The bike is pushed off its line. The solution is to approach the log at the correct angle so the wheel crosses perpendicular to the log's axis, not perpendicular to the trail.

### Double Log / Log Stack

Two logs lying close together — within one wheelbase length of each other. The rider cannot complete the rear-wheel crossing of the first log before the front wheel contacts the second. This creates an overlapping crossing sequence where the bridge phase of the first log merges with the approach to the second.

**Visual identification:** Two parallel log sections lying across the trail, spaced less than approximately 1.2–1.5m apart. The gap between the logs may be visible or may be tight enough that the front wheel cannot settle between them before the second log is engaged.

**Severity range:** Significant to major. The compound crossing sequence leaves no recovery window between the two crossings, placing it at the high end of this range. This is an extreme technique demand.

**Distinct failure pattern:** Collapse between the logs. The front wheel clears the first log and drops into the gap. Before the rear wheel crosses the first log, the front wheel contacts the second log. The bike is simultaneously pushed forward by the rear wheel on the first log and resisted by the second log on the front wheel. The bike stalls in the gap with both wheels jammed against a log simultaneously. Recovery from this position is very difficult.

### Log on Gradient

A log crossing on an uphill or downhill gradient. The gradient changes the available momentum, weight distribution during the crossing, and the severity of the bridge phase.

**Visual identification:** The trail is visibly ascending or descending as the log is approached. The log lies across the trail on a slope.

**Severity range:** Adds one tier regardless of direction. Uphill: gravity works against forward momentum throughout the crossing, requiring more throttle and clutch effort. Downhill: approach speed is harder to control, the bridge phase tips the front more aggressively, and the exit is onto a falling surface that removes the cushion of level ground absorbing the rear-drop.

**Distinct failure pattern:** Uphill stall — the rider approaches with reduced speed (already working against gravity) and the clutch blip produces insufficient forward drive to complete the bridge phase. The bike stalls on or just before the log's apex with gravity now actively working against completion.

---

## 3. Bike Behaviour *(MANDATORY)*

This section describes the mechanical response of the motorcycle to log crossings at the physics level. No coaching language, rider intent, or corrective advice — that content belongs in Section 4.

### Front Tyre Contact Mechanics

When the front tyre contacts a log's curved surface below the log's centre line, the contact force is directed normal to the log's surface at the point of contact. Because the tyre touches the log on its lower-forward quadrant, the normal vector points upward-and-rearward from the tyre's perspective — not purely rearward as it would against a flat vertical wall. The wheel contacts the log at an angle, and the reactive force has both a rearward component (deflecting the wheel back) and an upward component (riding the wheel up the log's curve). The balance between these components depends on the contact angle: a higher contact point (more upward on the log's face) produces a greater upward force relative to rearward. This is why front-wheel lift changes the outcome — elevating the contact point shifts the force ratio toward upward.

The tyre's compliance plays a secondary role: the front tyre partially deforms to the log's curve at contact, increasing the contact area. This deformation increases grip between tyre and log surface on dry bark, allowing the tyre to generate upward drive rather than slip. On wet or mossy logs this grip is reduced — the tyre deforms but cannot generate the same friction, reducing upward drive and increasing slip probability.

The fork's compression state at the moment of contact affects the response. A fork preloaded (compressed before contact) has its rebound energy available to assist the front wheel lift at the exact moment of log contact — the fork attempts to rebound upward simultaneously with the contact event. A fork that is already compressed from braking has less available rebound energy.

### Bridge Phase Dynamics

At the bridge phase, the chassis rests on or near the log's apex. The front wheel has descended the far side and the rear wheel has not yet reached the log. The bike is not in static equilibrium — it is in a dynamic transition. The front wheel's downward weight moment on the far side and the rear wheel's weight on the entry side create opposing moments around the log apex contact point.

If forward momentum is sufficient, the front-end weight moment dominates and the bike continues forward naturally. If momentum drops to near-zero, the moments approach balance and the bike is in a metastable state — a small perturbation determines whether it tips forward or rocks backward. Lateral imbalance at the bridge phase is not self-correcting: with the chassis resting on the log's rounded apex, there is no restoring lateral force — the bike tends to fall toward whichever side it has begun to tilt.

The duration of the bridge phase is proportional to log diameter and wheelbase. On a 20cm log with a standard 1450mm wheelbase, the bridge phase is extremely brief. On a 50cm log, the bridge phase is longer and the chassis height at the apex is substantially elevated — increasing both the duration of lateral instability and the fall height if balance is lost.

### Rear Wheel Crossing Mechanics

The rear wheel is driven by the engine through the chain and rear sprocket. The driven rear wheel behaves differently from the rolling front wheel: engine torque pushes the rear wheel forward against the log's surface. If throttle is maintained, the driven wheel compresses the tyre against the log's forward face and uses the contact force to push the chassis forward — the wheel rides up the log's curve as the front wheel did. If throttle is released at the critical moment, rear-wheel speed decreases; the driven momentum is removed, and the log's trailing geometry becomes a catch point.

The trailing edge of the log (the far-side lower quadrant) is where the rear hook failure initiates. When the rear tyre has partially crested the log and throttle is released, the rear tyre's knobs engage the trailing edge. This decelerates the rear wheel sharply while the front wheel and rider's inertia continue forward — the rear end rises, pitching the front end down. The severity of this pitch depends on the speed of the throttle release: a gradual reduction produces a moderate forward lurch; a sudden chop produces an aggressive pitch with OTB risk.

### Suspension Response Through the Crossing

The fork is loaded sequentially: compressed on initial front-wheel contact (the fork absorbs the impact of meeting the log face), then extends as the front wheel descends the far side (gravity-assisted extension), then re-compresses on the exit drop when the rear wheel clears the log. The rear shock is loaded when the rear wheel contacts the log (brief compression during climbing) and significantly when the rear wheel drops from the log to ground level at exit — this rear-drop produces the characteristic forward pitch that is the final event of the crossing.

On large logs, the rear-drop at exit is a substantial impact. The rear wheel falls from the log's apex height — potentially 40cm or more — to ground level. If the rear shock is undersprung, or the rider's weight is forward at exit, this impact can bottom the rear shock and produce a harsh chassis pitch.

---

## 4. Technique by Severity *(MANDATORY)*

Severity is defined primarily by observable feature geometry — log diameter, effective crossing height, surface condition, gradient context, and proximity of compounding obstacles. Rider skill requirement is secondary commentary.

### Minor (Under 20cm diameter, level ground, dry conditions)

**Body position:** Standing with weight very slightly rearward of neutral. The minor log is small enough that no deliberate lift is required — the tyre rolls over it through contact and compliance. A slight rearward weight shift reduces the load on the front wheel at contact, preventing the abrupt forward pitch that a neutral or forward position produces.

**Control inputs:** Approach at low-to-moderate trail speed. Maintain consistent throttle through the contact — do not accelerate aggressively into the log (increases bounce-back risk at the lower end of the minor range) and do not back off the throttle (reduces forward momentum). The crossing is brief. Absorb through knees and ankles at the exit rear-drop.

**Commitment threshold:** Low. The rider can stop before the log at minor severity. The crossing requires minimal preparation.

**Common errors:** Rolling into the log at speed with forward-biased weight — the front wheel contacts the log and the neutral-to-forward rider is pitched toward the bars. Excessive speed through a minor log that is rotten or free-rolling — unexpected surface behaviour at a contact point the rider expected to be stable.

**Mechanical consequence:** At minor severity, errors produce a jarring contact and brief momentum loss — uncomfortable and potentially line-disrupting in technical sections, but not crash-producing at this height.

**Coaching gate:** Basic standing technique (BIOMECH-01). The rider must be standing — seated riders cannot absorb the chassis pitch through the crossing and are exposed to the full seat-transmitted impact.

### Moderate (20–40cm diameter, level ground, dry conditions)

**Body position:** Standing, weight deliberately rearward. Hips behind the footpegs. Arms extended but not locked — locked arms connect the rider's upper body to the front end and prevent the fork from working freely during the technique sequence.

**Control inputs:** The technique sequence for moderate logs is compress, unweight, blip, drive through.

*Compress:* 1–2 bike lengths before the log, push down on the bars to compress the fork. This preloads the fork spring and sets up the rebound that assists the front wheel lift.

*Unweight:* As the front wheel reaches the log, shift bodyweight rearward sharply. This transfers weight from the front wheel to the footpegs and rear. The compressed fork rebounds upward simultaneously — this physical rebound contributes to the front wheel lift.

*Blip:* Simultaneously with the rearward shift, release the clutch with a brief throttle blip. The sudden rear-wheel drive pushes the bike forward at the exact moment the front is lightened — the combined effect lifts the front wheel onto and over the log. The blip must be timed to the moment of log contact, not 1–2 seconds before.

*Drive through:* After the front wheel crests the log, maintain throttle through the rear-wheel crossing. Do not release throttle as the rear wheel contacts the log — the rear wheel must be driven over, not rolled. Sustained drive prevents rear-wheel hook.

**Commitment threshold:** Moderate. The rider should be committed before the log contact point — adjusting technique at the log is too late for the blip timing. Speed and approach line must be set within the approach zone.

**Common errors:**

Front bounce-back — no blip, insufficient front lift, or speed too low. The front wheel contacts the log and deflects rearward rather than climbing. This is the most common moderate-log failure and results from under-preparation on the approach.

Stall at bridge phase — front wheel over but insufficient drive maintained through. The bike reaches the bridge phase with low momentum. The front wheel descends the far side, but the rear wheel contacts the log with insufficient drive. The bike stalls.

Rear hook — throttle released as rear wheel contacts the log. Front is over, rider relaxes, rear wheel hooks. Produces a sharp forward pitch.

Blip timing errors — too early lifts the front wheel before the log and it drops back before contact; too late fires after the front wheel is already against the log, providing no lift benefit.

**Mechanical consequence:** Moderate-log errors produce bounce-back (jarring deceleration), stall (bike stopped on log with lateral fall risk), or rear hook (forward pitch with OTB potential). These are real crash scenarios at this severity level.

**Coaching gate:** Clutch and throttle coordination (CONTROL-01) must be confirmed. The blip technique is the core skill at moderate severity — riders who cannot execute a controlled clutch-and-throttle blip should develop this skill before attempting moderate logs. Standing technique (BIOMECH-01) is prerequisite.

### Significant (Over 40cm diameter, or compounding factors)

**Body position:** Maximum practical rearward weight position. The front wheel lift must be substantial — a moderate lift that barely clears a 30cm log will fail against a 50cm log. Hips well behind the footpegs. Arms extended with soft elbows — the fork must be free to work. Head up, looking at the log's apex and the far side, not at the log's face.

**Control inputs:** The technique sequence is identical to moderate, but all elements are amplified:

The preload compression must be more deliberate — a stronger downward push on the bars to load the fork more deeply, providing more rebound energy.

The rearward weight shift must be more aggressive — not a slight movement but a committed shift that visibly moves the rider's hips behind the seat.

The clutch blip must deliver more throttle — a larger rear-wheel drive impulse is needed to push the bike forward against a 40cm+ obstacle. A larger throttle opening is required for the same blip duration.

Drive through the rear-wheel phase must be sustained and controlled — not a brief blip but maintained throttle that drives the rear wheel progressively up and over the large obstacle. A throttle spike rather than sustained drive will cause the rear wheel to spin against the log surface rather than grip and climb.

Line selection is critical at this severity: dead perpendicular to the log. Any diagonal approach on a significant log creates lateral forces at the bridge phase that the rider cannot counteract. If the log angle forces a diagonal crossing, the rider must adjust their approach angle so both wheels cross perpendicular to the log's axis.

**Commitment threshold:** High. The rider must be committed before the approach zone ends. Hesitation on approach to a significant log produces the worst outcome — arriving at the log at intermediate speed (too fast to stop cleanly, too slow for the blip to work) with uncommitted body position.

**Common errors:**

Insufficient lift — the blip and weight shift are not large enough for the log diameter. The front wheel contacts the log face but cannot climb to the apex. The wheel is deflected rearward from partway up the log face.

Front wheel placed off-centre on the log — if the approach line is not exactly perpendicular, one side of the tyre contacts the log ahead of the other. The front wheel tilts sideways on the apex. The bike leans laterally at the bridge phase and may fall to the side.

Lateral fall at bridge phase — the bike tilts sideways at the apex, unsupported by wheel traction. The rider cannot put a foot down because the log is between them and the ground. The bike falls.

Throttle spike on rear wheel crossing — instead of sustained drive, a sudden power spike causes the rear wheel to spin against the log surface rather than grip and climb. Progressive throttle is required.

**Coaching gate — do not prescribe significant log technique without confirmed prerequisites:** The rider must demonstrate consistent moderate-log crossings with clean front lift, sustained drive-through, and no rear hook errors. The blip technique must be reliable before increasing log diameter. If moderate-log footage shows bounce-back, stall, or rear hook, those errors must be resolved first. The lateral fall risk at significant severity means a poorly prepared rider faces a materially higher-consequence failure mode.

### Major (Double log stack, extreme diameter, or adverse gradient)

Major log crossings represent extreme terrain encountered primarily in competition or dedicated technical riding. The technique chain is identical to significant, with the addition that multiple crossings must be planned as a sequence from the approach — there is no natural pause between linked crossings to recalibrate.

**Body position:** As per significant, with continuous active weight adjustment through each sub-crossing.

**Control inputs:** For double log stacks, drive must be maintained continuously from the start of the first crossing through the completion of the second. The rear-wheel crossing of the first log overlaps with the front-wheel approach to the second — the rider cannot reset between them.

**Commitment threshold:** Total. The speed, line, and technique commitment must be correct before entering the approach zone. Any mid-approach adjustment compromises the technique sequence.

**Coaching gate:** **Do not prescribe major log technique without confirmed competence at significant level.** At major severity, the correct coaching output may be: "This log obstacle exceeds the technique threshold demonstrated in your footage. Walk the obstacle or choose an alternate line."

---

## 5. Interaction Patterns & Failure Triggers *(MANDATORY)*

### Expected Outcome Patterns

- clean crossing (front lift, sustained drive-through, controlled exit)
- bounce-back (front wheel deflected rearward — no crossing)
- stall at bridge phase (bike balanced on log, stopped)
- rear-wheel hook (front over, rear catches — forward pitch)
- straddling (front over, bike stopped with rear wheel against log face)
- lateral fall at bridge phase (bike tips sideways at apex)
- controlled partial crossing followed by rider-assisted recovery
- crash at exit (rear-drop pitch produces loss of control on landing)

### Failure Chain: Front Wheel Bounce-Back (Technique / Momentum)

**Trigger:** Front wheel contacts the log's forward face without sufficient forward momentum or upward force component to climb the log's curve.

**Mechanism:** The log's curved surface generates a reactive force directed partly rearward from the tyre's contact point. With insufficient approach speed or no deliberate front-wheel lift, the rearward force component dominates. The front tyre is deflected backward — the fork extends as the wheel is pushed rearward — and the wheel pulls away from the log face rather than climbing it. The bike decelerates abruptly.

**Outcome:** The front wheel moves backward from the log. The rider's forward momentum carries them toward the bars. On minor logs, this is a jarring but recoverable surprise. On moderate logs, the sudden deceleration pitches the rider significantly forward onto the bars. At higher approach speeds, the abrupt stop can produce OTB if the rider's body is thrown forward past the handlebar plane.

**Stage 6 classification:** `technique` (primary — insufficient front-wheel lift; no blip or inadequate blip timing), `momentum` (contributing — insufficient approach speed to overcome the rearward force component)

### Failure Chain: Stall at Bridge Phase (Momentum / Technique)

**Trigger:** The bike's forward momentum drops to near-zero with the chassis at the bridge phase — front wheel on the far side, rear wheel not yet at the log.

**Mechanism:** The front wheel has successfully crossed the log. However, forward momentum is insufficient to carry the bike through the bridge phase without active drive. The bike reaches the balance point on the log's apex with no speed. The rear wheel has no effective traction — it is in the air or barely touching the entry-side ground — and engine drive is not transmitted effectively. The front end's weight pulls the front wheel down the far side, but this moment is insufficient to pull the rear wheel up and over from a standing start. The bike is balanced on the log, unable to proceed without external force or a standing-start clutch engagement.

**Outcome:** The bike stops balanced on the log's apex. This is geometrically unstable — the rounded log provides no lateral stability. On minor-to-moderate logs, the rider can put feet down on the entry side and push the bike forward. On significant logs, the feet cannot reach the ground from astride the bike, and recovery requires carefully dismounting without tipping the bike to the side, then manually guiding the bike over.

**Stage 6 classification:** `momentum` (primary — insufficient forward drive through the crossing), `technique` (contributing — throttle management error during the bridge phase)

### Failure Chain: Rear Wheel Hook (Technique)

**Trigger:** Rider releases throttle (or applies brake) as the rear wheel makes contact with the log's forward face, or while the rear wheel is on the ascending portion of the log.

**Mechanism:** With sustained throttle, the rear wheel is driven forward against the log's surface — the tyre compresses against the log and the forward drive carries the bike over. When throttle is released at the critical moment, rear-wheel speed decreases. The driven rear tyre, no longer pressing forward, allows the log's trailing geometry to become active — the rear tyre's knobs engage the trailing (far) edge of the log as the wheel has partially crested. The log's edge catches the tyre and decelerates the rear wheel sharply while the front wheel and rider's inertia continue forward.

**Outcome:** The rear end decelerates sharply. The bike pitches forward — front end dips, rear end rises. The severity depends on the speed of the throttle release: a gradual reduction produces a moderate forward lurch; a sudden chop produces an aggressive pitch with OTB risk. This failure occurs most commonly on moderate logs because the rider successfully gets the front over and then relaxes before the rear-wheel phase is complete.

**Stage 6 classification:** `technique` (primary — throttle released before rear wheel clearing was complete)

### Failure Chain: Straddling (Momentum)

**Trigger:** The front wheel successfully crosses the log but the bike's forward momentum is insufficient to drive the rear wheel to the log's apex.

**Mechanism:** The front wheel crosses the log and descends the far side. The rear wheel contacts the log's forward face with low speed — insufficient for the driven wheel to climb. The bike stalls with the front wheel on the exit side and the rear wheel pressed against the log's forward face on the entry side. The chassis bridges the log but without the balance-point instability of a full bridge-phase stall — both wheels are touching ground on their respective sides, so the bike is stable in this straddling position.

**Outcome:** The bike is stopped straddling the log. This is less dangerous than stalling at the bridge phase because the bike is supported by both wheels touching the ground. However, the log is between the rear and front contact points — the bike cannot easily move backward (the rear wheel would have to climb the log in reverse) and moving forward requires driving the rear wheel over the log from a stopped position. A common result on first attempts at moderate logs.

**Stage 6 classification:** `momentum` (primary — insufficient forward drive to complete the rear-wheel crossing)

### Failure Chain: Lateral Fall at Bridge Phase (Technique / Line Choice)

**Trigger:** The bike's lateral balance is lost at the bridge phase — when the chassis is at the log's apex and neither wheel has stable ground contact.

**Mechanism:** At the bridge phase, lateral stability depends on the chassis being level around the log apex and the approach line being dead perpendicular (ensuring the chassis rests on the log's highest point, not offset to one side). If the approach line was angled, the chassis rests on the log at an offset point — not on the true apex but shifted to one side. This tilts the chassis laterally. With no wheel traction available to generate a restoring force, the tilt increases until the bike falls to the lower side.

**Outcome:** The bike falls sideways — off the log and onto the ground — from the height of the bridge phase. On significant logs, this is a fall from 40–60cm, and the risk of the bike landing on the rider's leg or foot is present. The rider cannot use a foot to prevent the fall because the log is between them and the ground. This failure mode is more severe than the others because it occurs at the highest point of the crossing and produces a lateral fall rather than a forward pitch.

**Stage 6 classification:** `technique` (primary — lateral balance loss at bridge phase), `line_choice` (contributing — angled approach created asymmetric log contact point)

### Pipeline Identification Notes

**Visual indicators for Stage 4 `feature_type: log` detection:**

*Approach indicators:*
- A cylindrical timber section clearly visible spanning the full trail width — the trail is blocked
- The obstacle is distinctly rounded in cross-section (not a flat-topped ledge or a rock face)
- The trail surface is visible on the approach side and beyond the log on the far side
- The log may have bark (brown or grey texture), exposed wood (pale, lighter colour), or lichen or moss covering
- The rider's approach speed typically reduces in the last 2–3 bike lengths as technique setup occurs

*Execution indicators:*
- Front wheel visibly lifting or being driven upward at the moment of log contact — not a flat roll
- Brief bridge phase visible where the chassis is elevated above normal riding height
- Rear end dropping at exit as the rear wheel clears the log — a visible downward movement of the tail
- Rider's body position shifts: rearward on approach and through the front crossing, then transitioning forward at exit
- Clutch hand movement visible in close 3rd-person footage (the blip is a discrete arm movement)

*Post-event indicators:*
- Bike stopped with rear wheel against a cylindrical obstacle on the entry side (straddling failure)
- Bike lying on its side adjacent to a log (lateral fall failure)
- Rider over the bars with bike stopped at a cylindrical obstacle (bounce-back or severe rear hook)
- Visible skid marks or disturbed ground at the log's entry face (bounce-back)
- The log itself has tyre marks or disturbed bark at the contact zone — visible in close-up still frames or slow footage

*Audio markers:*
- Engine note increase immediately before contact — the throttle blip is often audible as a brief rev surge
- Tyre impact on wood — a distinctive dull thud, different from rock impact (sharper crack) or root impact (duller, lower frequency)
- The bridge phase is typically quiet — engine near idle as the chassis pivots
- Rear-drop at exit produces a chassis thud and suspension compression sound as the rear shock absorbs the drop

*Severity indicators:*
- Log height relative to the bike's front wheel: using the 21-inch (approximately 53cm) front wheel as reference — a log matching 30–40% of wheel diameter is moderate (16–21cm effective height); 50–75% is significant (27–40cm); over 75% is major (40cm+)
- Duration of bridge phase: longer bridge phase indicates a larger log and higher severity
- Whether deliberate technique is visible — a visible rearward weight shift and throttle blip indicates the rider recognised the feature as requiring technique (moderate+); clean roll-over with no visible preparation indicates minor severity
- Landing surface and gradient on exit: a downslope exit increases severity due to compounded rear-drop and descent dynamics

*Edge cases where Stage 4 classification confidence should be flagged low:*
- POV footage: the rider looks ahead, not at the log face. The log may appear as a sudden ground-level obstruction only at the moment of contact. The bridge phase may not be visible — the camera rises and falls as the bike crosses. Confidence should be flagged below 0.6 for log detection in POV footage; rely on audio (rev blip, wood thud) to support classification.
- Distant 3rd-person footage: small logs (under 20cm) may be invisible from distance — the crossing looks like normal trail riding with a brief chassis pitch. Flag confidence below 0.5 for log detection from distant footage.
- Embedded or partially buried logs: the visible log diameter does not correspond to the effective crossing height. A 30cm log half-buried in soft ground has a 15cm effective height — classified as minor, not moderate. Flag when the log's ground-level context is unclear.
- Log partially covered by leaves or debris: the cylindrical geometry may not be visible. The obstacle may be detectable only from crossing dynamics (chassis pitch, bridge phase) rather than visual identification. Flag confidence low if obstacle geometry cannot be confirmed.
- Root crossing vs log crossing: a large exposed root arching across the trail can produce similar crossing dynamics to a small log. Distinguish by: roots are embedded in the ground and attached at both ends; logs are detached timber. If unclear, flag classification confidence below 0.6 and note both candidate types.

### Observability Notes

**1. Reliably confirmable from footage (directly observable):**
- That a cylindrical timber obstacle spans the trail and requires crossing
- Whether the bike successfully crossed the log or stopped (stall, bounce-back, or fall)
- Front wheel lift — whether the front wheel visibly lifted over the log or contact was flat
- Bridge phase — whether the chassis was visibly elevated above normal riding height
- Rear-drop at exit — the visible drop of the tail end as the rear wheel clears the log
- Log surface condition (bark, moss, moisture) where close footage is available
- Log crossing angle — whether the crossing was perpendicular or diagonal
- Whether the rider was standing on approach

**2. Inferable with caveats:**
- Log diameter — estimated from reference proportions (bike wheel diameter, rider leg height), accurate to approximately ±20% from standard 3rd-person footage at moderate distance; less accurate from distant or POV footage
- Effective crossing height (accounting for burial depth) — inferred from the magnitude of the bridge phase and front wheel lift required, not directly measured
- Whether the rider applied a deliberate clutch blip — inferred from front wheel lift timing and any visible clutch-hand movement; engine audio (brief rev surge) supports but does not confirm
- Approach speed — estimated from motion cues relative to the log and surrounding trail
- Whether the rear hook failure occurred — if the tail of the bike pitches upward sharply after the front has crossed, rear hook is inferable with high confidence from the pitch pattern

**3. Cannot be determined from footage:**
- Exact log diameter in centimetres (estimates only from proportion reference)
- Whether the rider applied rear brake during or after the crossing (brake lever input is rarely visible)
- Exact clutch position and engagement timing (the clutch lever is not reliably visible in most footage angles)
- Log bark integrity and firmness beneath the visible surface — a log may look intact but be soft and rotten inside, changing the contact mechanics
- Whether the log is anchored to the ground or free-rolling — a loose log will move during the crossing, fundamentally changing the dynamics; this cannot be determined from footage unless the log visibly shifts
- Rider's confidence level and whether hesitation influenced approach speed selection

---

## 6. Approach & Setup Requirements

> *Section 6 uses default naming for single_event features.*

### Speed Selection

Log crossing speed selection is counterintuitive on moderate-to-significant logs: more speed helps, but the instinct is to slow down. Sufficient approach speed provides the forward momentum that the rearward force component of log contact must overcome — higher momentum makes bounce-back less likely. However, excessive speed means the front wheel has less time to climb the log's curve before it is deflected, and the bridge phase and exit impact are harder to manage.

For minor logs: low trail speed is fine. The log is small enough that momentum is not critical.

For moderate logs: moderate trail speed — faster than walking pace but not full trail speed. The approach must be controlled enough to set up the blip technique while providing sufficient momentum for the crossing.

For significant logs: speed must be specific to the log. Too slow produces bounce-back or bridge-phase stall; too fast produces a violent bridge phase and high-impact exit. The correct speed is the minimum that produces a clean crossing — maximum control, minimum impact. This speed is only reliably established through progressive attempts.

For uphill logs: approach speed must be higher than on flat ground to account for momentum lost to gravity during the crossing. Build momentum in the approach zone above what would be needed on flat terrain.

### Line Selection

Dead perpendicular to the log's axis — both wheels crossing at 90 degrees to the log. Any deviation creates lateral force components at the contact points. On minor logs this is manageable; on moderate and significant logs, a diagonal approach creates forces that can push the bike off-line. Where the log is not perpendicular to the trail, the rider must adjust their approach angle — steering to position themselves perpendicular to the log rather than parallel to the trail. This adjustment must be made in the approach zone, not at the log.

### Body Position Setup Point

The rearward weight shift and the fork preload compression must be initiated before the front wheel reaches the log — typically 1–2 bike lengths before contact on a moderate log, further on a significant log. The blip timing must be coordinated with the front wheel's arrival at the log face. Setting up body position at the log itself is too late — the technique sequence requires a setup window that begins before the contact event.

### Gear Selection

First or second gear for the majority of log crossings. Low gear provides precise throttle response (small inputs produce controlled power), adequate torque at low speed for the rear-wheel drive requirement, and better clutch feel for blip timing. Higher gears produce sluggish throttle response at low speed and reduce torque — the blip becomes harder to time and the rear drive is insufficient.

### Clutch Preparation

The clutch should be lightly covered on approach to a moderate or significant log — fingers resting on the lever without engaging. This allows the blip to be executed in one motion without repositioning the hand. The clutch should not be pulled in on the approach — this disconnects the engine and removes the option for a last-moment throttle-blip drive.

---

## 7. Terrain & Condition Interaction

**This section flags which Terrain KB entries should be co-retrieved and documents the feature-level interaction. It does not duplicate Terrain KB content.**

### Surface Type × Log Interaction

**Mud on log or approach (retrieve TERRAIN-01):** Mud on the log bark significantly reduces tyre-to-log friction — the tyre slides rather than grips the log's surface. Effective severity increases by one tier. Mud on the approach reduces rear traction for the blip's drive phase — the rear wheel may spin rather than providing the forward drive needed for the clutch blip.

**Rock approach (retrieve TERRAIN-03):** Rocky approach terrain complicates speed management — braking distance is less predictable and the rider is already managing traction on rock when the log appears. The cognitive demand of managing both rock traction and log crossing technique simultaneously is compounded. Post-crossing, rock surface on the exit reduces run-out traction.

**Roots approach (retrieve TERRAIN-07):** Root sections leading into a log crossing require the rider to manage traction through the roots while simultaneously preparing the log crossing sequence. The combined demand — maintaining speed through roots and preparing a timed blip — is harder than either in isolation. A root cluster that disrupts approach speed can compromise blip timing.

**Grass surface (retrieve TERRAIN-09):** Grass on the log surface is as slippery as mud for tyre grip. Grass-covered logs should be classified one tier higher than diameter alone indicates. Grass approach is generally stable but slippery when wet.

**Hardpack approach (retrieve TERRAIN-02):** Firm, predictable surface on approach provides the best conditions for log crossing — consistent braking, stable gear selection, and reliable blip execution. Hardpack is the baseline against which the severity definitions above are set.

### Condition Modifiers

**Wet conditions:** Wet bark on a log significantly reduces friction. On any log above minor severity, wet conditions increase effective severity by one tier — the tyre cannot generate the same grip on wet bark as on dry bark. The approach surface is also wet, reducing traction for the blip's rear-wheel drive.

**Frozen conditions:** Frozen log surface is extremely slippery — the tyre slides rather than grips. On any log above minor severity, frozen conditions make the crossing inadvisable without specialist tyres. The contact mechanics change from grip-based climbing to uncontrolled sliding.

**Leaf and debris cover:** Leaves or debris on top of the log hide surface condition and may conceal exact log geometry (diameter, crossing angle). Leaf cover on the log surface reduces traction similarly to grass. The rider cannot assess the log's condition from the approach if it is obscured.

**Rotten log:** A log in partial decay loses structural integrity. When the tyre contacts a rotten log, the surface may compress or break rather than providing firm contact. In severe cases, the log surface collapses under the bike, creating an uncontrolled situation. Visual indicators: dark colouration, visible wood decay at broken ends, fungi on the surface, bark that visibly sags or deforms.

### Compounding Risk

- Log crossing followed immediately by a sharp turn, drop, or second obstacle reduces recovery time from the exit and compounds consequence.
- Log crossing on a narrow trail with no room for approach angle adjustment eliminates the option of optimising crossing angle.
- Log crossing after a fast descent section — the rider arrives with excess momentum and limited braking distance. Speed management must begin higher on the descent than expected.
- Multiple logs spaced 5–20m apart in a section — each crossing must be completed cleanly before the next is engaged. A stall or bounce-back on the first log leaves the rider in the wrong position for the second.

---

## 8. Exit, Landing & Recovery

> *Section 8 uses default naming for single_event features.*

### Rear-Drop Dynamics

The exit of a log crossing is not neutral — it is an active event. When the rear wheel clears the log's apex and descends the far side, the rear end drops from log height to ground level. This drop produces a forward chassis pitch: the rear drops as the front is already level. On minor logs this is barely perceptible. On moderate logs it is a noticeable pitch. On significant logs, the rear-drop from a 40+cm log is a meaningful impact and pitch event that requires active absorption.

The rear shock must absorb the rear-drop impact. If the rider remains in the rearward weight position maintained through the crossing, the rear-drop pitches them forward — this is intentional and correct, the rearward position through the crossing transitioning naturally toward neutral for the run-out. Riders who shift forward before the rear wheel has cleared the log are pitched even further forward by the rear-drop.

### Run-Out Requirements

The run-out zone after a log crossing must allow for rear shock settling (completing its rebound cycle after the rear-drop impact), weight redistribution from the rearward crossing position to neutral trail riding position, and throttle and steering re-establishment.

Minimum run-out: minor = 1–2m, moderate = 3–5m, significant = 5–8m.

Obstacles, turns, or drops within the minimum run-out distance compound the crossing's difficulty. A log crossing followed immediately by a tight turn is a compound technical challenge — the rider must complete the crossing and immediately manage the turn before their position has been re-established.

### Recovery from Imperfect Crossings

**Bounce-back recovery:** The bike has been deflected backward from the log. Do not attempt a second immediate crossing at speed — the approach zone has been disrupted. Back up from the log, reassess approach speed, ensure the blip technique is prepared, and attempt again from the correct approach distance.

**Stall at bridge phase recovery:** The rider must hold the bike upright to prevent lateral fall. If feet can reach the ground on the entry side (minor-to-moderate logs), push the bike forward while the engine drives it — a standing-start clutch release with the rider's feet on the ground for stability. On significant logs where feet cannot reach, dismount carefully to the entry side and manually guide the bike over the log. Priority is preventing the lateral fall, not rapid recovery.

**Post-crossing slide on wet exit:** If the exit surface is slippery and the bike slides after the rear-drop, release all brakes, allow the bike to track straight, and apply gentle throttle to stabilise through drive. The rear-drop produces forward momentum — use it to maintain stability rather than braking immediately on a slippery surface.

---

## 9. False Reads & Misidentification

### Rider Misreads

**Overestimating log difficulty from head-on:** A log viewed from the approach angle appears taller than its actual diameter — the approach foreshortens the log's height and the upper surface is the only visible reference. Riders consistently overestimate log diameter by 30–50% when viewed from the approach. This causes excessive caution, reduced approach speed, and a higher stall probability. Pre-ride observation from beside the log (viewing it from the side) reveals the true diameter.

**Underestimating difficulty due to rotten appearance:** A decayed log may appear softer and easier than a solid log of similar diameter — the rider assumes the log will compress under tyre contact. On moderately rotten logs, partial compression can actually improve grip (the tyre sinks into the surface). On severely rotten logs, the surface collapses unexpectedly and the crossing becomes an uncontrolled drop into soft wood. The appearance of decay does not reliably indicate the log's structural integrity.

**Misidentifying a free-rolling log:** Most natural fallen logs are anchored at their ends or partially embedded. A loose log — recently fallen, placed, or freed from embedded position — will roll when the tyre contacts it. The crossing dynamics of a rolling log are fundamentally different from a fixed log: the log moves rearward under tyre pressure rather than providing a fixed climbing surface. This is rarely anticipated. The front tyre contacts the log, the log rolls backward, and the rider experiences a sudden loss of the expected resistance. Visual indicators: the log has no embedded section at its ends, is floating on the surface, or shows signs of recent movement (disturbed ground beneath).

**Confusing log crossing with root crossing:** Large exposed roots arching across the trail can produce similar crossing dynamics to a small log. The distinction matters: roots are flexible (absorbing tyre impact differently from rigid timber), roots are connected to a tree at both ends (both anchored), and root crossings typically appear in groups — multiple roots rather than a single obstacle. The technique for root crossings (FEATURE-06) differs from log crossings in the approach and contact dynamics. Classify as log only when the obstacle is a single detached cylindrical timber section.

**Confusing log crossing with step feature:** An embedded log with flat bark facing upward, or a log whose far-side geometry is shadowed, may be visually misidentified as a flat-faced step or ledge. The key distinguisher is the bridge phase: a step crossing does not produce a bridge phase where the chassis is elevated above both wheel contact points simultaneously. If the bridge phase is visible, the classification is log.

### Camera / Footage Misclassification Risks

**POV footage:** Log crossings are difficult to assess from POV because the camera looks forward — the log appears as a sudden ground-level obstacle rising in the frame. The bridge phase produces a camera rise followed by a drop, which may appear in footage as simple trail undulation. Log diameter is very difficult to estimate from POV. The rear hook failure is particularly hard to detect — the forward pitch feels like a normal crossing lurch. Use audio (rev blip, wood thud) to support log detection in POV footage.

**Distant 3rd-person footage:** Minor logs may be invisible at distance — the crossing appears as a brief chassis pitch in otherwise normal trail riding. Detection confidence for minor logs from distant footage should be flagged below 0.5. Medium logs are detectable from moderate distance (30–50m) as the bridge phase is visible. Large logs are visible from most distances due to the pronounced bridge phase.

**Log under debris or snow:** A log covered by significant debris or snow may not be visually identifiable as a log. The obstacle may appear as a ground-level ridge or bump. Classification is possible only if the crossing dynamics (bridge phase, characteristic rear-drop) are visible — in which case a cylindrical obstacle can be inferred. Flag classification confidence low when obstacle geometry cannot be confirmed.

---

## 10. Coaching Gates & Prerequisites

### Minimum Prerequisites by Severity

**Minor:** Standing technique (BIOMECH-01). The rider must be standing — seated riders cannot absorb the chassis pitch through the crossing and are exposed to the full seat-transmitted impact at contact.

**Moderate:** Standing technique (BIOMECH-01) plus clutch and throttle coordination (CONTROL-01). The blip technique is the core skill at moderate severity and requires coordinated clutch release and throttle input timed to front wheel contact. The rider must also demonstrate the rearward weight shift and sustained drive-through discipline. Both elements must be present — body position alone is insufficient without blip timing, and blip timing without rearward weight shift produces an unbalanced lift.

**Significant:** All moderate prerequisites plus demonstrated consistent moderate-log crossings with reliable front lift, clean rear-wheel drive-through, and no rear hook errors. Line selection discipline (dead perpendicular) must be established. The rider must show evidence of setting approach speed correctly in the approach zone — not adjusting at the log. If moderate-log footage shows bounce-back, stall, or rear hook, those errors must be resolved before significant logs are attempted.

**Major:** All significant prerequisites plus demonstrated recovery from imperfect significant-severity crossings — specifically, the ability to manage a bridge-phase stall on a large log without the bike falling laterally. **Do not coach up to major log technique without confirmed competence at significant level.** Stage 9 (Decision Engine) should assess whether the obstacle is appropriate before recommending technique.

### Progression Model

1. Standing with basic rearward weight shift on flat terrain (BIOMECH-01) → 2. Minor logs at walking speed, absorbing the exit rear-drop → 3. Minor logs at trail speed, reading the crossing as a feature to set up for → 4. Clutch-blip practice on flat ground (CONTROL-01) — the blip technique isolated from the crossing → 5. Moderate logs on dry surfaces with deliberate technique sequence → 6. Moderate logs on varied surfaces (slight gradient, damp conditions) → 7. Significant logs on dry surfaces with progressive speed building → 8. Significant logs with compounding factors (angled crossing, wet surface) → 9. Major logs (competition context only, with specific feature knowledge and progressive attempts)

### "Do Not Coach Up" Thresholds

Stage 9 (Decision Engine) should decline to recommend the next severity tier when:
- The rider's footage shows bounce-back at the current tier — front lift is insufficient and technique is not ready for larger diameter
- The rider's footage shows rear hook on moderate-log crossings — throttle management discipline is not established
- The rider's footage shows the rider seated on approach to logs — standing prerequisite not met
- The approach speed is consistently too low (the rider decelerates excessively on approach — indicating hesitation that will compound on larger logs)
- The crossing produces lateral wavering or instability through the bridge phase — lateral balance skill is not ready for the longer bridge phase of larger logs

### Skill Category Tags (Future-Proofing)

Prerequisites by tier reference the following skill categories for future Skill Tag and Drill KB integration:
- `balance_standing` — minor+
- `weight_shift_rearward` — minor+
- `clutch_throttle_coordination` — moderate+
- `front_wheel_lift` — moderate+
- `drive_through_commitment` — moderate+
- `line_perpendicular_selection` — significant+
- `lateral_balance_bridging` — significant+
- `recovery_bridge_phase_stall` — major

---

## 11. Feature Demands / Constraints

### Minimum Technique Required

Log crossings at any coaching-relevant severity (moderate and above) require standing technique (BIOMECH-01) and clutch-and-throttle coordination (CONTROL-01). These are the non-negotiable prerequisites — a rider who cannot stand on the pegs and execute a controlled clutch blip cannot safely attempt moderate or significant log crossings. Minor log crossings require standing technique only.

### Equipment Considerations

**Tyres:** Aggressive tread (deep knobs) provides better grip on log bark than hardpack or intermediate-compound tyres. On wet or mossy logs, tread depth and rubber compound matter more than on any other crossing scenario — the tyre must grip a curved, non-porous, potentially slippery surface. Worn tyres with shallow knobs perform significantly worse on wet logs.

**Handguards:** Bounce-back failures produce sudden deceleration that can drive the rider's hands into adjacent branches or vegetation. Handguards protect the hands if the bike is deflected into trailside cover during a failed crossing.

**Footpegs:** Wide, grippy footpegs are important for the rearward weight shift technique — the rider's feet must be secure on the pegs through the crossing sequence. Smooth or narrow footpegs allow foot slip during the weight shift, disrupting the technique.

**Sump guard:** Not directly involved in the crossing technique, but a bike that stalls and falls from the bridge phase of a significant log may land on the underside of the engine. A sump guard reduces the risk of engine case damage in this scenario.

### Out-of-Scope Content

- Standing vs seated fundamentals → BIOMECH-01
- Clutch and throttle mechanics → CONTROL-01
- Throttle blip physics → DYNAMICS-02
- Root crossings (thin, flexible, grouped roots across the trail) → FEATURE-06
- Step features with flat faces at low speed with sustained ground contact → FEATURE-04
- Riding along a narrow elevated surface (beam, plank, skinny) → beam / narrow elevated surface feature
- Line reading and terrain assessment → INTEL-01, INTEL-03
- Commitment and hesitation decision-making → INTEL-05
