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

A log crossing is a cylindrical horizontal obstacle lying across the trail. The front wheel climbs the log's curved face, the chassis briefly bridges the log at its apex, then the rear wheel crosses. The defining physical property is the **rounded cross-section** — unlike a step's flat face, the log presents a curved contact surface that redirects wheel forces differently.

**Primary Observable Signature:** A cylindrical timber section blocking the full trail width. The front wheel is driven or lifted onto the log's face, the bike tilts over the apex at raised chassis height, and the rear end drops back to ground level as the rear wheel clears.

**Dominant Risk Axis:** Bounce-back from insufficient front-wheel force, and lateral fall at the bridge phase when momentum is lost with the chassis unsupported on the log's apex.

### Physical Zones

**Approach zone:** Where the rider assesses log diameter, surface condition, crossing angle, gradient context, and compounding obstacles. Speed, gear, and body position setup all occur here.

**Contact zone — front wheel phase:** From initial tyre contact with the log's forward face through to the front wheel cresting the apex and beginning its descent on the far side. The log's curved surface presents a normal vector directed partly rearward and partly upward — front wheel lift shifts the force balance toward upward.

**Bridge phase:** From front wheel descending the far side until the rear wheel contacts the log. This is the highest-risk moment: wheel support is transitional, lateral balance is unsupported by tyre traction, and forward momentum must be maintained. Duration scales with log diameter.

**Contact zone — rear wheel phase:** From rear-wheel contact through to rear-wheel departure from the far side. If drive is maintained, the rear wheel is driven over. If drive is interrupted, the trailing edge of the log catches the rear tyre → sudden deceleration → forward pitch.

**Exit zone:** When the rear wheel clears the log's apex, the rear end drops from log height to ground level → forward chassis pitch. Must be absorbed and ridden out actively.

### Key Mechanic: Curved Contact Surface

A log's curved face generates an upward-and-rearward force vector — not purely rearward as a flat wall does. The balance between upward and rearward components depends on the contact point height on the log's face: higher contact = greater upward component. This is why front wheel lift is mechanically effective: elevating the contact point shifts the force toward upward, enabling the tyre to climb.

At the bridge phase, if momentum drops to near-zero, the bike is in a metastable state — small perturbation determines whether it tips forward or rocks backward. Lateral imbalance at the bridge phase is not self-correcting.

### Commitment & Reversibility Profile

**Point of no return:** When the front wheel is in contact with the log's ascending face at speed.

**Recovery window:** From front-wheel contact through to rear wheel fully clearing the apex. Sustained throttle and body position actively influence outcome throughout this window — including the rear-wheel phase.

**Bailout options:** Approach zone only for moderate and significant logs. A rider committed with the front wheel on the log face at speed cannot reliably bail. For minor logs, a bridge-phase stall can be recovered on foot; for significant logs, that is a high-risk dismount.

---

## 2. Feature Forms & Variants *(MANDATORY)*

> **Classification hard rule:** A log crossing is classified when the primary obstacle is a discrete cylindrical timber section the rider must cross over. If the obstacle has a flat top and a vertical face, it is a step (FEATURE-04). If the obstacle is a narrow elevated surface ridden along (not over), it is a beam feature. Multiple roots in a group are a root crossing (FEATURE-06) — even if one root is large, group dynamics change the technique.
>
> **Classification boundary note:** Effective crossing height — the height the front wheel must overcome from the approach side — is the operationally relevant measure. A 40cm log half-buried in soft ground may have a 20cm effective height. Always assess from the entry side.

### Small Log / Branch (Under 20cm diameter)

Front wheel can roll over without deliberate lift technique. The tyre rolls over through compliance and contact.

**Visual identification:** Narrow timber section not reaching ankle height alongside it. Trail visible on far side through and over the obstacle.

**Severity range:** Minor only. Becomes moderate only with compounding factors — steep gradient, wet surface, angled crossing on a narrow trail, or free-rolling log.

**Distinct failure pattern:** Surprise deceleration. Rider does not register the small log as requiring technique → neutral body position at contact → jarring pitch forward.

### Medium Log (20–40cm diameter)

Most common crossing obstacle in enduro. Requires deliberate technique — simple roll produces bounce-back or stall. Creates a defined bridge phase.

**Visual identification:** Log reaching between knee and hip height alongside it. A 30cm log is approximately 40% of front wheel diameter — clearly visible as a significant obstacle.

**Severity range:** Moderate at standard conditions. Moderate-to-significant with wet/mossy surface, steep uphill, or angled crossing.

**Distinct failure pattern:** Front bounce-back (no blip or insufficient lift) OR rear hook (front over but throttle released before rear wheel cleared). These are opposite errors — one from under-commitment, one from mismanaged timing.

### Large Log (Over 40cm diameter)

Requires full technique execution with no margin for error. Extended bridge phase — the bike spends measurable time supported only by the log's apex. Lateral balance at the bridge phase is a real management problem.

**Visual identification:** Log at hip height or above alongside it. Bridge phase is obvious in footage — bike clearly tilts over the log with front end dropping as rear is elevated.

**Severity range:** Significant at standard conditions. Major with double log, extreme diameter (60cm+), significant gradient, or sequential obstacles.

**Distinct failure pattern:** Lateral fall at bridge phase. Large log creates a pronounced bridge phase where lateral recovery through tyre traction is impossible. Approach angle must be dead perpendicular — any offset creates asymmetric apex contact → lateral tilt → fall.

### Wet or Mossy Log

A severity modifier applied to any diameter log. Reduces tyre-to-log friction significantly — adds one tier to base diameter classification.

**Visual identification:** Visible moisture on surface, green or grey lichen or moss covering bark, dark colouration rather than bare brown/grey bark.

**Distinct failure pattern:** Tyre slip on the ascending face — instead of gripping and climbing, the tyre slides, potentially laterally along the log's axis. May compound or replace the usual bounce-back pattern.

### Angled Log (Non-Perpendicular Crossing)

Log lying at a diagonal to the trail — more than approximately 20–30 degrees from perpendicular. Adds one tier to base classification.

**Visual identification:** Log visible across the trail at an angle — one end further down trail than the other.

**Distinct failure pattern:** Lateral wheel deflection. Front wheel contacts the angled log and is deflected perpendicular to the log's axis (not to the direction of travel) → bike pushed off line. Solution: approach at the correct angle to cross perpendicular to the log's axis.

### Double Log / Log Stack

Two logs within one wheelbase length of each other. The rear-wheel crossing of the first log overlaps with the front-wheel approach to the second — no recovery window between crossings.

**Visual identification:** Two parallel log sections across the trail, spaced under approximately 1.2–1.5m.

**Severity range:** Significant to major.

**Distinct failure pattern:** Collapse between the logs. Front wheel clears the first log and drops into the gap. Before the rear wheel crosses the first log, the front wheel contacts the second. Bike stalls jammed against both logs simultaneously.

### Log on Gradient

Adds one tier regardless of direction. Uphill: gravity works against forward momentum throughout the crossing, requiring more drive. Downhill: harder to control approach speed; bridge phase tips more aggressively; exit is onto a falling surface.

**Distinct failure pattern:** Uphill stall — rider arrives with reduced speed from fighting gravity; blip is insufficient to complete the bridge phase. Bike stalls on or just before the apex.

---

## 3. Bike Behaviour *(MANDATORY)*

This section covers mechanics unique to log crossings. General clutch, suspension, and traction behaviour: see Dynamics KB and CONTROL entries.

### Front Tyre Contact Mechanics

The log's curved forward face presents a normal force directed upward-and-rearward at the contact point. Higher contact point = greater upward component relative to rearward. Fork compression state at contact matters: a preloaded (compressed) fork has rebound energy available to assist the lift at the moment of contact — fork rebounds upward simultaneously with the contact event. A fork already compressed from braking has less available rebound energy.

Tyre compliance plays a secondary role: the tyre partially deforms to the log's curve at contact, increasing contact area and grip on dry bark. On wet or mossy logs, the tyre deforms but cannot generate the same friction, reducing upward drive and increasing slip probability.

### Bridge Phase Dynamics

At the bridge phase, the front-end weight moment on the far side and the rear-end weight on the entry side create opposing moments around the log apex contact point. Sufficient forward momentum → front-end moment dominates → crossing completes naturally. Near-zero momentum → moments approach balance → metastable state. Lateral imbalance at the bridge phase is not self-correcting: the rounded apex provides no lateral restoring force.

Bridge phase duration scales with log diameter and wheelbase. On a 20cm log: extremely brief. On a 50cm log: measurably longer, with substantially elevated chassis height.

### Rear Wheel Crossing Mechanics

The driven rear wheel is different from the rolling front wheel: engine torque pushes the rear wheel forward against the log's surface. If throttle is maintained, the tyre compresses against the log and drives the chassis forward — the wheel rides up the log's curve. If throttle is released as the rear wheel has partially crested the log, the trailing edge catches the tyre's knobs → sharp rear deceleration while the front wheel and rider's inertia continue forward → aggressive forward pitch.

The severity of the pitch depends on the speed of the throttle release: gradual reduction = moderate lurch; sudden chop = OTB risk.

### Suspension Through the Crossing

Fork compresses on initial front-wheel contact, extends as front wheel descends the far side, then re-compresses on the exit rear-drop. Rear shock compresses briefly when rear wheel climbs the log and significantly when the rear wheel drops from log height to ground at exit — this rear-drop is the final active event of the crossing and produces the characteristic forward pitch.

---

## 4. Technique by Severity *(MANDATORY)*

### Minor (Under 20cm diameter, level ground, dry conditions)

**Technique:** Standing with weight very slightly rearward of neutral. Approach at low-to-moderate trail speed. Maintain consistent throttle through contact. Absorb the exit rear-drop through knees and ankles.

**Common errors:** Forward-biased weight at contact → pitched onto bars. Excessive speed through a free-rolling or rotten log.

**Coaching gate:** Standing technique (BIOMECH-01).

### Moderate (20–40cm diameter, level ground, dry conditions)

**Technique:** Standing, weight deliberately rearward — hips behind footpegs. Arms extended but not locked. Technique sequence: **compress, unweight, blip, drive through.**

- *Compress:* 1–2 bike lengths before the log, push down on the bars to preload the fork.
- *Unweight:* As front wheel reaches the log, shift bodyweight rearward sharply. Compressed fork rebounds simultaneously — contributing to the lift.
- *Blip:* Simultaneously with the rearward shift, release clutch with a brief throttle blip. Timed to the moment of log contact, not before.
- *Drive through:* After the front wheel crests, maintain throttle through the rear-wheel crossing. Do not release as the rear wheel contacts the log — sustained drive prevents rear hook.

**Common errors:** Front bounce-back — no blip or speed too low. Stall at bridge phase — front over but insufficient drive maintained. Rear hook — throttle released as rear wheel contacts the log. Blip too early (front rises then drops before log) or too late (no lift benefit).

**Coaching gate:** Clutch-throttle coordination (CONTROL-01) confirmed. Standing technique (BIOMECH-01) prerequisite. Rider must demonstrate a controlled clutch blip before attempting moderate logs.

### Significant (Over 40cm diameter, or compounding factors)

**Technique:** Identical technique sequence to moderate, with all elements amplified: deeper preload compression; more aggressive rearward weight shift; larger throttle opening in the blip; sustained (not brief) throttle through the rear-wheel phase — throttle spike causes rear wheel spin against the log rather than grip-and-climb. Line selection: dead perpendicular to the log. Any diagonal approach on a significant log creates lateral forces at the bridge phase that cannot be counteracted. If the log is angled in the trail, adjust approach angle to cross perpendicular to the log's axis — not perpendicular to the trail.

**Common errors:** Insufficient lift for the log diameter. Front wheel placed off-centre → lateral tilt at bridge phase → lateral fall. Throttle spike on rear wheel crossing → rear wheel spins rather than grips.

**Coaching gate:** Consistent moderate-log crossings with clean front lift, sustained drive-through, and no rear hook. **Do not prescribe significant log technique without confirmed moderate prerequisites.** Lateral fall risk at significant severity means poorly prepared riders face materially higher-consequence failure.

### Major (Double log stack, extreme diameter, or adverse gradient)

**Technique:** As per significant. For double log stacks, drive must be maintained continuously from the start of the first crossing through the completion of the second — the rear-wheel crossing of the first log overlaps with the front-wheel approach to the second. No natural pause for recalibration.

**Coaching gate:** **Do not coach up to major without confirmed significant competence.** If obstacle exceeds demonstrated ability: "This log obstacle exceeds the technique threshold demonstrated in your footage. Walk the obstacle or choose an alternate line."

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

### Failure Chain: Front Wheel Bounce-Back (technique / momentum)

**Trigger:** Front wheel contacts the log's forward face without sufficient forward momentum or upward force component to climb the log's curve.

**Mechanism:** Rearward force component dominates the contact force. Front tyre deflected backward. Fork extends as the wheel is pushed rearward. Bike decelerates abruptly.

**Outcome:** Minor = jarring but recoverable. Moderate = pitched significantly forward onto the bars. Higher approach speed = potential OTB as the rider is thrown forward past the handlebar plane.

**Stage 6 classification:** `technique` (primary — insufficient front-wheel lift; no blip or inadequate timing), `momentum` (contributing — insufficient approach speed)

### Failure Chain: Stall at Bridge Phase (momentum / technique)

**Trigger:** Forward momentum drops to near-zero with the chassis at the bridge phase.

**Mechanism:** Front wheel has crossed the log. Rear wheel is not yet at the log and has no effective traction — in the air or barely touching the entry-side ground. Engine drive is not transmitted effectively. The bike is balanced on the log's apex in a metastable state. The front-end weight moment is insufficient to pull the rear wheel up from a standing start.

**Outcome:** Bike stops on the log's rounded apex — laterally unstable. Minor-moderate logs: rider can put feet down on the entry side and push forward. Significant logs: feet cannot reach the ground from astride the bike; must dismount carefully without tipping the bike sideways.

**Stage 6 classification:** `momentum` (primary — insufficient forward drive through the crossing), `technique` (contributing — throttle management error)

### Failure Chain: Rear Wheel Hook (technique)

**Trigger:** Rider releases throttle (or applies brake) as the rear wheel contacts the log's forward face or while the rear wheel is on the ascending portion.

**Mechanism:** Throttle release removes the forward drive from the rear wheel. The log's trailing edge catches the tyre's knobs as the wheel has partially crested. Sharp rear deceleration while the front wheel and rider's inertia continue forward.

**Outcome:** Forward pitch. Gradual throttle release = moderate forward lurch. Sudden chop = aggressive pitch with OTB risk. Occurs most commonly on moderate logs where the rider successfully gets the front over and then relaxes prematurely.

**Stage 6 classification:** `technique` (primary — throttle released before rear wheel clearing was complete)

### Failure Chain: Straddling (momentum)

**Trigger:** Front wheel crosses the log but bike's forward momentum is insufficient to drive the rear wheel to the apex.

**Mechanism:** Rear wheel contacts the log's forward face with low speed — insufficient for the driven wheel to climb. Bike stalls with front wheel on exit side and rear wheel against log's entry face. Both wheels are touching ground on their respective sides — more stable than bridge-phase stall, but the bike cannot easily move backward (rear wheel would have to climb the log in reverse) or forward (needs drive from a stopped position).

**Outcome:** Bike stopped straddling the log. Less immediately dangerous than bridge-phase stall; common result on first attempts at moderate logs.

**Stage 6 classification:** `momentum` (primary — insufficient forward drive to complete the rear-wheel crossing)

### Failure Chain: Lateral Fall at Bridge Phase (technique / line_choice)

**Trigger:** Lateral balance lost at the bridge phase — chassis at the log's apex, neither wheel has stable ground contact.

**Mechanism:** If the approach line was angled (not perpendicular), the chassis rests on the log at an offset point — not on the true apex but shifted to one side. This tilts the chassis laterally. No wheel traction is available to generate a restoring force. The tilt increases until the bike falls to the lower side.

**Outcome:** Bike falls sideways off the log from the bridge phase height. On significant logs: fall from 40–60cm with risk of the bike landing on the rider's leg or foot. Rider cannot use a foot to prevent the fall because the log is between them and the ground.

**Stage 6 classification:** `technique` (primary — lateral balance loss), `line_choice` (contributing — angled approach created asymmetric log contact point)

### Pipeline Identification Notes

**Visual indicators for Stage 4 `feature_type: log` detection:**

*Approach:*
- Cylindrical timber section visibly spanning the full trail width — trail blocked
- Obstacle distinctly rounded in cross-section (not flat-topped ledge or rock face)
- Brown/grey bark, pale exposed wood, or green/dark lichen or moss
- Rider's approach speed reduces in the last 2–3 bike lengths as technique setup occurs

*Execution:*
- Front wheel visibly lifting or being driven upward at log contact
- Brief bridge phase — chassis elevated above normal riding height
- Rear end dropping at exit as rear wheel clears — visible downward movement of the tail
- Rider body: rearward on approach and front crossing, transitioning forward at exit
- Clutch hand movement visible in close 3rd-person footage

*Post-event:*
- Bike stopped with rear wheel against a cylindrical obstacle on the entry side (straddling)
- Bike lying on its side adjacent to a log (lateral fall)
- Rider over the bars with bike stopped at a cylindrical obstacle (bounce-back or severe rear hook)
- Visible disturbed bark or skid marks at log contact zone

**Audio markers:**
- Engine rev blip immediately before contact — often audible
- Tyre impact on wood: distinctive dull thud (vs sharper crack on rock, lower frequency on root)
- Bridge phase: typically quiet — engine near idle as chassis pivots
- Rear-drop at exit: chassis thud and suspension compression sound

**Severity indicators:**
- Log height relative to front wheel diameter (21-inch ≈ 53cm): 30–40% of wheel diameter = moderate (16–21cm effective height); 50–75% = significant (27–40cm); over 75% = major (40cm+)
- Duration of bridge phase: longer = larger log and higher severity
- Deliberate technique visible: visible rearward shift and throttle blip = moderate+; clean roll-over with no preparation = minor
- Exit drop magnitude: larger rear-drop = larger log

**Edge cases — flag Stage 4 confidence low:**
- POV footage: log appears as sudden ground-level obstruction; bridge phase looks like trail undulation; log diameter not assessable. Flag below 0.6; rely on audio (rev blip, wood thud).
- Distant 3rd-person: minor logs invisible; medium logs detectable from ~30–50m by bridge phase. Flag below 0.5 for minor log detection from distant footage.
- Embedded or partially buried logs: visible diameter does not equal effective crossing height — flag when ground-level context is unclear.
- Root vs log: large exposed root arching across trail can produce similar crossing dynamics. Roots are embedded and attached at both ends; logs are detached timber. Flag below 0.6 when unclear.

### Observability Notes

**1. Reliably confirmable from footage:**
- That a cylindrical timber obstacle spans the trail
- Whether the bike successfully crossed or stopped (stall, bounce-back, or fall)
- Front wheel lift — whether the front wheel visibly lifted over the log or contact was flat
- Bridge phase — whether the chassis was visibly elevated above normal riding height
- Rear-drop at exit — visible drop of the tail end
- Log surface condition (bark, moss, moisture) where close footage is available
- Log crossing angle — perpendicular or diagonal
- Whether rider was standing on approach

**2. Inferable with caveats:**
- Log diameter (estimated from reference proportions ± approximately 20% from standard 3rd-person at moderate distance)
- Effective crossing height (inferred from bridge phase magnitude)
- Whether rider applied a deliberate clutch blip (inferred from lift timing and engine audio; clutch-hand movement may not be visible)
- Approach speed (estimated from motion cues)
- Whether rear hook occurred (forward pitch after front crossing = high confidence inference)

**3. Cannot be determined from footage:**
- Exact log diameter in centimetres (estimates only)
- Whether rear brake was applied during or after the crossing
- Exact clutch engagement timing
- Log bark integrity beneath visible surface (may look solid but be rotten inside)
- Whether the log is anchored or free-rolling

---

## 6. Approach & Setup Requirements

> *Section 6 uses default naming for single_event features.*

**Speed selection:** More speed helps on moderate-to-significant logs, but the instinct is to slow down. Sufficient approach speed provides forward momentum to overcome the rearward force component of log contact. However, too fast = front wheel has less time to climb the curve; bridge phase and exit impact are harder to manage.
- Minor: low trail speed — momentum not critical.
- Moderate: moderate trail speed — controlled enough for blip setup, sufficient for crossing momentum.
- Significant: minimum speed that produces a clean crossing — only reliably established through progressive attempts. Too slow = bounce-back or bridge-phase stall; too fast = violent bridge phase and high-impact exit.
- Uphill logs: approach speed must be higher than on flat ground — build momentum above what would be needed on flat terrain to account for momentum lost to gravity during the crossing.

**Line selection:** Dead perpendicular to the log's axis. Any deviation creates lateral force components at the contact points. On minor logs: manageable. On moderate and significant: a diagonal approach can push the bike off-line and create the lateral fall risk at the bridge phase. Where the log is not perpendicular to the trail, adjust approach angle in the approach zone — not at the log.

**Body position setup point:** Rearward weight shift and fork preload compression must be initiated 1–2 bike lengths before the front wheel reaches the log on moderate logs; further on significant. Setting up at the log is too late — the technique sequence requires a setup window before the contact event.

**Gear selection:** First or second gear. Low gear provides precise throttle response and adequate torque at low speed. Higher gears produce sluggish throttle response and reduce the torque available for the rear-wheel drive requirement.

**Clutch preparation:** Lightly cover the clutch on approach to moderate or significant logs — fingers on the lever without engaging. This allows the blip to be executed in one motion without repositioning the hand.

---

## 7. Terrain & Condition Interaction

**Mud on log or approach (TERRAIN-01):** Mud on bark significantly reduces tyre-to-log friction — tyre slides rather than grips. Effective severity increases one tier. Mud on approach reduces rear traction for the blip's drive phase.

**Rock approach (TERRAIN-03):** Complicates speed management — braking distance is less predictable on rock. Managing rock traction and log crossing technique simultaneously increases cognitive demand. Rock on exit reduces run-out traction.

**Roots approach (TERRAIN-07):** Root sections leading into a log crossing require simultaneous root traction management and log crossing preparation. A root cluster that disrupts approach speed can compromise blip timing.

**Grass on log surface (TERRAIN-04):** Grass-covered logs are as slippery as mud for tyre grip. Add one severity tier to base classification.

**Hardpack approach (TERRAIN-02):** Baseline against which severity definitions are set. Consistent braking, stable gear selection, and reliable blip execution.

**Condition modifiers:**
- Wet: wet bark significantly reduces friction on any log above minor severity. Increases effective severity by one tier. Also reduces approach rear-wheel traction for the blip's drive phase.
- Frozen: frozen log surface is extremely slippery — tyre slides rather than grips. Any log above minor severity: crossing inadvisable without specialist tyres.
- Leaf and debris cover: hides surface condition and exact log geometry; reduces traction similarly to grass.
- Rotten log: surface may compress or break rather than providing firm contact. Visual indicators: dark colouration, visible wood decay at broken ends, fungi on surface, bark that sags or deforms.

**Compounding risks:**
- Log crossing followed immediately by a sharp turn, drop, or second obstacle: reduced recovery time from exit.
- Narrow trail: no room for approach angle adjustment — cannot optimise crossing angle.
- After a fast descent: rider arrives with excess momentum and limited braking distance.
- Multiple logs spaced 5–20m apart: each crossing must be completed cleanly before the next is engaged.

---

## 8. Exit, Landing & Recovery

> *Section 8 uses default naming for single_event features.*

**Rear-drop dynamics:** When the rear wheel clears the log's apex, the rear end drops from log height to ground level → forward chassis pitch. On minor logs: barely perceptible. On moderate: noticeable pitch. On significant: meaningful impact requiring active absorption. The rearward weight position maintained through the crossing transitions naturally toward neutral as the rear drops — this is correct. Riders who shift forward before the rear wheel has cleared are pitched even further forward by the rear-drop.

**Run-out requirements:** Minimum distances: minor = 1–2m, moderate = 3–5m, significant = 5–8m. Run-out must allow for rear shock settling, weight redistribution from rearward crossing position to neutral, and throttle and steering re-establishment. Obstacles or turns within minimum run-out distance compound the crossing's difficulty.

**Recovery from imperfect crossings:**
- Bounce-back: do not attempt an immediate re-approach. Back up from the log, reassess approach speed and blip preparation, re-attempt from the correct distance.
- Stall at bridge phase: hold the bike upright. If feet reach the ground (minor-to-moderate), push forward while the engine drives it. If feet cannot reach (significant), dismount carefully to the entry side and manually guide the bike over. Priority: prevent the lateral fall.
- Post-crossing slide on wet exit: release all brakes, allow bike to track straight, apply gentle throttle to stabilise through drive. Use the rear-drop's forward momentum rather than braking immediately on a slippery surface.

---

## 9. False Reads & Misidentification

**Overestimating log difficulty from head-on:** Approach angle foreshortens log height and shows only the upper surface as reference. Riders consistently overestimate log diameter by 30–50% from the approach. Side-on observation reveals true diameter. This causes excessive caution, reduced approach speed, and higher stall probability.

**Underestimating difficulty on rotten logs:** Decay does not reliably predict structural integrity. Moderately rotten logs may improve grip (tyre sinks into surface). Severely rotten logs collapse unexpectedly — crossing becomes an uncontrolled drop into soft wood.

**Misidentifying a free-rolling log:** Most natural logs are anchored at their ends or partially embedded. A loose log rolls backward under tyre pressure rather than providing a fixed climbing surface. Visual indicators: no embedded section at ends, floating on surface, signs of recent movement (disturbed ground beneath).

**Confusing log crossing with root crossing:** Large exposed roots arching across the trail produce similar crossing dynamics to a small log. Distinguish by: roots are flexible and embedded in the ground at both ends; logs are detached rigid timber. If unclear, flag classification confidence below 0.6 and note both candidate types.

**Confusing log crossing with step feature:** A log with flat bark facing upward, or whose far-side geometry is shadowed, may be visually misidentified as a flat-faced step. Key distinguisher: a step crossing does not produce a bridge phase where the chassis is elevated above both wheel contact points simultaneously. If a bridge phase is visible, the classification is log.

**POV footage:** Log appears as a sudden ground-level obstruction rising in the frame. Bridge phase looks like trail undulation. Log diameter very difficult to estimate from POV. Rear hook failure particularly hard to detect — forward pitch feels like a normal crossing lurch. Use audio (rev blip, wood thud) to support log detection.

**Distant 3rd-person:** Minor logs invisible at distance. Medium logs detectable from moderate distance (30–50m) by bridge phase. Large logs visible from most distances due to pronounced bridge phase.

**Log under debris or snow:** Cylindrical geometry may not be visible. Classification possible only if crossing dynamics (bridge phase, characteristic rear-drop) are visible — cylindrical obstacle can be inferred. Flag confidence low when geometry cannot be confirmed.

---

## 10. Coaching Gates & Prerequisites

### Minimum Prerequisites by Severity

**Minor:** Standing technique (BIOMECH-01). Rider must be standing — seated riders cannot absorb the chassis pitch.

**Moderate:** Standing technique (BIOMECH-01) plus clutch-throttle coordination (CONTROL-01). Both body position rearward weight shift and blip timing must be present — body position alone is insufficient without blip timing, and blip timing without rearward weight shift produces an unbalanced lift.

**Significant:** Moderate prerequisites plus: consistent moderate-log crossings with reliable front lift, clean rear-wheel drive-through, and no rear hook errors. Line selection discipline (dead perpendicular) established. Correct approach speed discipline confirmed.

**Major:** Significant prerequisites plus: demonstrated recovery from imperfect significant-severity crossings — specifically, management of a bridge-phase stall on a large log without lateral fall. **Do not coach up to major without confirmed significant competence.** Stage 9 should assess whether the obstacle is appropriate before recommending technique.

### Progression Model

1. Standing with basic rearward weight shift (BIOMECH-01)
2. Minor logs at walking speed, absorbing exit rear-drop
3. Minor logs at trail speed, reading crossing as a feature to set up for
4. Clutch-blip practice on flat ground (CONTROL-01) — blip technique isolated from the crossing
5. Moderate logs on dry surfaces with deliberate technique sequence
6. Moderate logs on varied surfaces (slight gradient, damp conditions)
7. Significant logs on dry surfaces with progressive speed building
8. Significant logs with compounding factors (angled crossing, wet surface)
9. Major logs (competition context only, with specific feature knowledge and progressive attempts)

### "Do Not Coach Up" Thresholds

Stage 9 should decline to recommend next severity tier when:
- Footage shows bounce-back at the current tier — front lift insufficient
- Footage shows rear hook on moderate-log crossings — throttle management discipline not established
- Rider seated on approach to logs
- Approach speed consistently too low (excessive deceleration indicating hesitation)
- Lateral wavering or instability through the bridge phase — lateral balance skill not ready for longer bridge phase of larger logs

### Skill Category Tags

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

Moderate and above: standing technique (BIOMECH-01) and clutch-throttle coordination (CONTROL-01). These are non-negotiable prerequisites — a rider who cannot stand and execute a controlled clutch blip cannot safely attempt moderate or significant log crossings. Minor: standing technique only.

### Equipment Considerations

**Tyres:** Aggressive tread (deep knobs) provides better grip on log bark. On wet or mossy logs, tread depth and rubber compound matter more than on any other crossing scenario. Worn tyres with shallow knobs perform significantly worse on wet logs.

**Handguards:** Bounce-back failures produce sudden deceleration that can drive the rider's hands into adjacent branches or vegetation.

**Footpegs:** Wide, grippy footpegs are important for the rearward weight shift — the rider's feet must be secure through the crossing sequence. Smooth or narrow footpegs allow foot slip, disrupting the technique.

**Sump guard:** Protects engine cases if the bike falls from the bridge phase of a significant log onto its underside.

### Out-of-Scope Content

- Standing vs seated fundamentals → BIOMECH-01
- Clutch and throttle mechanics → CONTROL-01
- Throttle blip physics → DYNAMICS-02
- Root crossings (thin, flexible, grouped roots across the trail) → FEATURE-06
- Step features with flat faces at low speed with sustained ground contact → FEATURE-04
- Riding along a narrow elevated surface (beam, plank, skinny) → beam / narrow elevated surface feature
- Line reading and terrain assessment → INTEL-01, INTEL-03
- Commitment and hesitation decision-making → INTEL-05
