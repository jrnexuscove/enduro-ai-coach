---
# ── BLOCK 1: Pipeline Contract ──────────────────────────────────────────────
pipeline_contract:
  kb_type: terrain_feature
  pipeline_enum_value: [jump]
  feature_class: single_event

# ── BLOCK 2: Retrieval Triggers ─────────────────────────────────────────────
retrieval_triggers:
  PRIMARY:
    stage4_feature_type: [jump]
  SECONDARY:
    stage6_failure_types: [technique, decision, momentum]
    stage7_crash_types: [otb, ejection]
  CONTEXTUAL:
    stage3_intent_category: [jump, trail_ride, race_section]
    stage5_outcome: [crash, bail]

# ── BLOCK 3: Content Metadata ────────────────────────────────────────────────
content_metadata:
  topic_id: FEATURE-01
  title: Jump / Launch Features — Feature Profile
  domain: Terrain Feature KB
  domain_id: features
  scope: "Feature identification, severity classification, and technique requirements
    for jumps and launch features. Does NOT cover standing/seated fundamentals
    (see BIOMECH-01), general throttle control (see CONTROL-01), or surface physics
    of landing surfaces (see Terrain KB entries)."
  status: draft
  feature_type: jump
  severity_definition:
    minor: "Natural compression or roller under 0.5m; no commitment required; low speed sensitivity; consequence limited to awkward weight shift or unsettled chassis"
    moderate: "Defined face 0.5–1.5m with clear lip geometry; moderate commitment required; speed-sensitive takeoff angle; poor technique produces uncontrolled airtime with risk of hard landing"
    significant: "Jump face over 1.5m or gap jump requiring cleared distance; full commitment at approach; high speed sensitivity on takeoff; incorrect technique risks OTB, nose-dive, or ejection"
    major: "Large constructed or natural jump with extended gap distance, steep or complex landing geometry, narrow speed window for correct trajectory, and minimal recovery margin on under- or over-jump; consequence of technique error at this scale is serious injury"
  severity_covered: [minor, moderate, significant, major]
  crash_types_associated: [otb, ejection]
  failure_types_associated: [technique, decision, momentum]
  common_misclassifications:
    - step_up    # step_up has a defined vertical face requiring wheel placement; jump has a ramp/compression launching the bike
    - drop       # drop is purely downward with no upward launch trajectory; jump involves airtime from an ascending face
    - "undulating terrain — gentle rollers, compressions, and trail undulations are not jumps unless they produce unintended airtime"
    - ledge      # ledge is a horizontal-to-vertical transition; jump is a ramped launch surface
  typical_body_position: standing
  difficulty_range: [intermediate, advanced]
  related_topics: [BIOMECH-01, BIOMECH-02, DYNAMICS-01, DYNAMICS-04, FEATURE-02, FEATURE-07]
  prerequisites: [BIOMECH-01, CONTROL-01, DYNAMICS-01]
  tags: [jump, tabletop, double, gap, kicker, step-up-jump, natural, launch, air, airtime, landing, otb, ejection, commitment, airborne]
  version: 1.0
  last_updated: 2026-04-02
---

# Jump / Launch Features — Feature Profile

## 1. Feature Geometry & Physics *(MANDATORY)*

A jump is any terrain geometry where an ascending ramp or compression face launches the motorcycle into an airborne state. The defining characteristic is **airtime** — tyre-to-ground separation where the rider's only available controls are body weight shifts and rear brake. All critical inputs must be completed before the lip; corrections available during airtime are extremely limited.

**Primary Observable Signature:** Visible airborne phase with tyre-to-ground separation after launch from ramp, compression, or lip geometry.

**Dominant Risk Axis:** Pitch attitude at takeoff and landing impact severity.

### Physical Zones

**Approach zone:** Where the rider sets entry speed, gear, and body position. Ends at the face base. On natural terrain may be poorly defined — the rider may not recognise a launch feature until already on the face.

**Face:** The ascending ramp from base to lip. Face geometry determines launch angle; the rider's inputs during the face determine bike attitude at takeoff.

**Lip:** The last point where the rider can influence launch trajectory. Lip shape matters: rounded = smooth arc; sharp/square = abrupt trajectory change and higher rotational risk.

**Airborne phase:** Front wheel departure to rear wheel landing. No traction-based inputs available. Duration ranges from fractions of a second (minor) to 2+ seconds (major). Technique errors manifest here as visible pitch, roll, or yaw.

**Landing and run-out:** Downslope landing absorbs impact (trajectory and slope aligned); flat landing maximises impact force; upslope (casing) compounds it. On natural terrain the landing surface is unprepared and may be a different surface type entirely.

### Commitment & Reversibility Profile

**Point of no return:** Minor — at the lip (can roll over by scrubbing speed on the face). Moderate — at the face base (cannot safely stop once on the ramp at speed). Significant/major — during the approach (speed must be set before reaching the face).

**Recovery window:** Extremely short. Body weight shifts and rear brake tap are the only corrections available once airborne. A nose-high attitude established at the lip cannot be fully corrected in the air on most enduro jumps.

**Bailout options:** Approach zone only for moderate+. On minor features the rider can unweight and roll over. For moderate and above, the only bailout on the face is a deliberate lay-down before the lip.

---

## 2. Feature Forms & Variants *(MANDATORY)*

> **Classification hard rule:** If sustained ground contact is maintained throughout the feature, it is NOT a jump regardless of geometry.
>
> **Classification rule:** A feature belongs in the Jump KB when the defining event is launch into meaningful airtime from ramp or compression geometry. It belongs in the Steps/Ledges KB (FEATURE-07/08) when the defining event is wheel placement against a vertical face under sustained ground contact. It belongs in the Drop KB (FEATURE-02) when the defining event is purely downward transition with no upward launch trajectory. Speed can transform a step_up into a jump — classification is determined by the dominant event in the footage, not terrain geometry alone.

### Natural Compression / Roller

Convex rise (exposed root ball, embedded rock shelf, erosion hump) that launches the bike at sufficient speed. No clearly defined face or lip.

**Visual identification:** Trail surface rises and falls over 1–3m. No clear lip edge. Often embedded in the trail surface and partially obscured by vegetation or shadow.

**Severity range:** Almost always minor. Can reach moderate if combined with speed or when the landing surface drops away.

**Distinct failure pattern:** Rider surprised by unexpected airtime with body position set for trail riding (often seated, weight rearward) → nose-up launch and rear-heavy landing.

### Kicker / Step Jump

Short, steep face (under 1.5m ramp length) producing steep launch angle (40°+). Common where erosion creates a sharp lip at a trail shelf edge.

**Visual identification:** Short, abrupt ramp with a defined edge. Noticeably steeper than the approach. Appears at trail edges, erosion cuts, or natural rock steps.

**Severity range:** Moderate to significant. Steep launch angle means even low approach speeds produce meaningful airtime.

**Distinct failure pattern:** Excessive nose-up rotation — steep face angle with any rearward weight bias produces rapid pitch the rider cannot correct in short available airtime. Can result in rear-first landing with eject-on-rebound or rear collapse.

### Tabletop

Flat top surface between launch and landing ramps. Provides safety margin for under-jumpers.

**Visual identification:** Defined ramp face → flat elevated surface → second ramp or slope. Table surface typically 2–6m. Launch and landing ramps usually near-symmetrical.

**Severity range:** Moderate to major depending on table length and height.

**Distinct failure pattern:** Casing the knuckle — rider clears the table but lands on the transition from flat to downslope. Maximum impact force because landing surface is flat or uphill at the knuckle.

### Gap Jump / Double

Two separate ramp structures with empty space between them. No safe landing surface between launch and landing. Highest-commitment variant.

**Visual identification:** Two distinct mounds or ramp structures with visible space between. Gap floor is clearly lower than both surfaces and unfinished.

**Severity range:** Significant to major. Even small gaps (2–3m) carry significant consequence because the gap floor is not a prepared landing surface.

**Distinct failure pattern:** Coming up short — insufficient speed causes the bike to land in the gap or on the upslope of the landing ramp. Produces maximum impact and high OTB risk as the front wheel contacts the upslope while the bike is still descending. (Relevant to Mark Crash Phase 2 clip.)

### Natural Step with Launch

Trail steps over a natural obstacle (rock shelf, bank, root cluster) producing unintended or semi-intended airtime.

**Visual identification:** Trail rises sharply over a natural obstacle and drops away on the far side. No constructed lip — launch angle set by rock, root, or earth geometry.

**Severity range:** Minor to significant. Highly variable. The same natural step at walking speed is a step_up; at trail speed it becomes a launch feature.

**Distinct failure pattern:** Misread severity — rider either doesn't recognise it as a jump (uses low-speed technique on a feature that produces airtime) or underestimates the landing drop.

---

## 3. Bike Behaviour *(MANDATORY)*

This section covers mechanics unique to jump features. General suspension, traction, and steering behaviour: see Dynamics KB.

### Face and Lip Departure

Sequential front-then-rear suspension loading during the face means the bike almost always has some pitch component at takeoff. Fork compresses on face entry and rebounds at the lip — contributing to front-end rise. Rear shock compresses under power (squat) and rebounds as the rear wheel approaches the lip — if rebound timing coincides with front wheel departure, it amplifies nose-up pitch. A balanced launch requires matched rebound energy from both ends.

### Airborne Dynamics

Three rotational axes matter:

**Pitch:** Determined by weight distribution, throttle input, suspension rebound timing, and face geometry at the lip — not a simple one-input-one-output relationship. Generally: rearward weight bias and sustained face throttle tend toward nose-up; forward weight bias and abrupt throttle closure tend toward nose-down. Suspension rebound timing can override either tendency. Rear brake tapped in air reduces rear-wheel gyroscopic resistance, allowing the nose to drop. Body weight shifts fore-aft are the other available correction.

**Roll:** Lateral weight offset at the lip produces in-air roll. No traction-based correction once airborne — partial compensation via opposite-side body shift only.

**Yaw:** Caused by asymmetric lip contact, rider steering at the lip, or a face rut angling the bike off-axis. Essentially uncorrectable in air. Produces cross-track landing at high-consequence.

### Landing Impact

Downslope landing aligns trajectory with surface — smooth sequential fork and shock compression. Flat landing forces all vertical velocity through suspension. Upslope (casing) adds slope resistance to vertical impact — bottoming nearly certain. Front-first landing pitches rider forward; rear-first pitches rearward then ejects forward on shock rebound.

---

## 4. Technique by Severity *(MANDATORY)*

### Minor (Natural compressions, rollers, under 0.5m)

**Technique:** Standing with slight knee bend, weight centred over footpegs, elbows up. Steady throttle through compression — no chop, no aggressive acceleration. Light or no brake.

**Common errors:** Seated on approach. Throttle chop on unexpected rise → nose-up. Stiff arms transferring face impact to rider's shoulders.

**Coaching gate:** Basic standing technique (BIOMECH-01) confirmed.

### Moderate (Defined face 0.5–1.5m, clear lip geometry)

**Technique:** Standing attack position, weight slightly forward. Speed set on the approach — face is not the place to adjust. Steady throttle through face; subtle roll-off (not a chop) at the lip. In air: hands and feet on controls, rear brake available for nose-down correction. Absorb landing through knees and ankles, throttle ready to drive out.

**Common errors:** Accelerating on the face → nose-up. Braking on the face → fork compression/rebound pitch at lip. Looking down at lip instead of at landing zone. Pulling up on bars at lip → exaggerated nose-up.

**Coaching gate:** Standing attack position (BIOMECH-01) and throttle steadiness (CONTROL-01) confirmed. Rider comfortable with minor features.

### Significant (Over 1.5m face or gap; full commitment; high speed sensitivity)

**Technique:** Aggressive attack position — weight forward, head over bars looking at landing. Speed set in approach, no face adjustments. Smooth throttle roll to neutral at lip. Active body position management in air. Absorb landing through full leg range; drive out immediately for chassis stability.

**Common errors:** Insufficient approach speed (gap jump → coming up short, Mark Crash failure pattern). Excess speed → overshoot. Weight rearward at lip → nose-up rear-heavy landing. Panic front brake in air → hand tension prevents position correction. Looking down during airtime.

**Coaching gate:** Consistent moderate execution with neutral lip departure and balanced landing. Clutch-throttle coordination (CONTROL-01, CONTROL-02), weight distribution (DYNAMICS-01), and commitment decision-making (INTEL-05) confirmed. **Do not coach up without these confirmed.**

### Major (Extended gap, complex landing geometry, narrow speed window, minimal recovery margin)

**Technique:** Race-level attack position. Active centre-of-mass management through every phase: face loading, lip transition, airborne correction, landing absorption. Precise approach speed (±5 km/h changes outcome). Deliberate suspension pre-load timing. Immediate throttle on landing to stabilise chassis.

**Common errors:** At this severity, errors are typically setup errors (wrong speed, gear, line) rather than execution errors.

**Coaching gate:** All significant prerequisites plus demonstrated recovery from imperfect significant-severity landings, deliberate use of body weight and rear brake for in-air attitude control. **Do not coach up without confirmed significant competence and demonstrated recovery skills.**

---

## 5. Interaction Patterns & Failure Triggers *(MANDATORY)*

**Expected Outcome Patterns:**
- clean landing
- nose-heavy landing
- rear-heavy landing
- case / knuckle impact
- overshoot
- crash after landing
- bail before launch

### Failure Chain: Insufficient Approach Speed (momentum failure)

**Trigger:** Rider enters approach below the speed required to clear the feature or reach the intended landing zone.

**Mechanism:** Insufficient horizontal velocity at launch. Parabolic trajectory falls short. On tabletop → lands on flat table surface. On gap jump → lands in gap or on upslope of landing ramp.

**Outcome:** Gap jump — landing in gap produces maximum vertical impact on unprepared surface. Front wheel contacts upslope of landing ramp while bike is still descending → abrupt deceleration → rider pitches forward. High OTB and ejection risk. Tabletop — table-to-downslope knuckle may catch the rear wheel.

**Stage 6 classification:** `momentum` (primary), `decision` (contributing — rider committed at insufficient speed)

### Failure Chain: Weight-Rearward Launch (technique failure)

**Trigger:** Rider's centre of mass behind footpegs at the lip — from seated position, face throttle, or instinctive rearward lean.

**Mechanism:** Rear-biased CoM causes nose-up pitch through airtime.

**Outcome:** Rear-wheel-first landing. Shock absorbs then rebounds — pitches rider forward over bars (delayed OTB). If nose-up is severe, rider slides backward off seat during airtime (ejection).

**Stage 6 classification:** `technique` (primary — weight distribution error)

### Failure Chain: Throttle on Face (technique failure)

**Trigger:** Rider accelerates on the jump face — deliberate or reactive.

**Mechanism:** Throttle on face compresses rear shock under power and shifts CoG rearward. At the lip the loaded shock rebounds, combining with rearward CoG to produce aggressive nose-up pitch. Exact outcome varies with face angle, rebound timing, and speed; sustained face throttle generally produces nose-up departure.

**Outcome:** Nose-up airtime → rear-heavy landing. Severity scales with throttle input and jump size.

**Stage 6 classification:** `technique` (primary — throttle timing error)

### Failure Chain: Panic Brake on Face (technique failure)

**Trigger:** Rider applies front brake on the face in a reactive "too fast" moment.

**Mechanism:** Front brake on incline shifts weight forward aggressively and compresses the fork while climbing. If brake is released at the lip, compressed fork rebounds violently → nose-up departure.

**Outcome:** Either stalling on the face (low consequence on small jumps; dangerous on large ones) or uncontrolled nose-up departure from fork rebound.

**Stage 6 classification:** `technique` (primary — brake input error), `decision` (contributing — misjudged speed)

### Failure Chain: Yaw at Lip (technique/terrain failure)

**Trigger:** Bike leaves lip with rotational yaw — from asymmetric lip contact, rider steering at lip, or face rut angling the bike off-axis.

**Mechanism:** In air, yaw is essentially uncorrectable. Bike travels along momentum vector while pointed in a different direction.

**Outcome:** Cross-track landing — tyres contact ground at angle to momentum direction. Lateral force overwhelms traction instantly → highside or lowside at high consequence.

**Stage 6 classification:** `technique` (primary if caused by rider input), `traction` (primary if caused by lip surface condition)

### Pipeline Identification Notes

**Visual indicators for Stage 4 `feature_type: jump` detection:**

*Approach:*
- Trail surface rises with defined ramp geometry; visible lip or edge
- Natural: convex rise steeper than surrounding gradient
- Constructed: defined mound/ramp structure with prepared landing surface visible beyond

*Execution:*
- Both wheels leave ground sequentially (front then rear)
- Bike trajectory departs from ground surface — visible gap between tyres and terrain
- Airborne phase: bike silhouetted against background, shadow separation, no tyre dust

*Post-event:*
- Landing impact: suspension compression, dust cloud on contact, rider leg absorption
- Bike trajectory descending from above trail surface

**Audio markers:**
- Engine revs higher when rear wheel loses traction (unloaded engine)
- Impact sound on landing — suspension bottoming, tyre contact
- Silence or reduced engine noise during airtime
- Crash: scraping, impact, then engine idle or stall

**Severity indicators:**
- Airtime duration: sub-0.5s = minor, 0.5–1.5s = moderate, 1.5s+ = significant/major
- Peak height above ground: under 0.5m = minor, 0.5–1.5m = moderate, over 1.5m = significant/major
- Visible gap between launch and landing surfaces = significant+
- Rider body activity in air: passive = minor, active correction = moderate+
- Landing impact: soft = minor or correct technique; heavy compression = moderate+; visible bottoming or separation = significant+

**Edge cases — flag Stage 4 confidence low:**
- Distant rider in frame — jump vs undulation difficult to distinguish
- POV footage — face geometry not visible; rely on loss of ground reference and engine note change
- Low-resolution footage — lip geometry and airtime gap indistinguishable
- Natural terrain — flag confidence below 0.6 unless clear airtime is visible

### Observability Notes

**1. Reliably confirmable from footage:**
- Whether the bike becomes airborne (both wheels off ground)
- Approximate airtime duration (frame count)
- Landing type (front-first, rear-first, balanced)
- Whether the rider crashes after landing
- Bike attitude at peak airtime — in 3rd-person footage
- Whether rider is standing or seated on approach — in 3rd-person footage

**2. Inferable with caveats:**
- Approach speed (estimated from motion blur, background movement rate)
- Jump face angle and height (estimated from trajectory arc — requires known reference points)
- Weight distribution at lip (inferred from body position and bike attitude; subtle shifts may not be visible)
- Throttle on face (inferred from engine audio and rear suspension behaviour)
- Severity classification (inferred from airtime, height, consequence; natural features can deceive)

**3. Cannot be determined from footage:**
- Exact approach speed in km/h or mph
- Suspension setup and remaining travel
- Tyre pressure and condition
- Whether the rider intentionally jumped or was surprised
- Rider's skill level relative to the feature
- Landing surface condition beneath vegetation or water
- Whether fear, fatigue, or hesitation contributed

---

## 6. Approach & Setup Requirements

> *Merge restriction: this section must remain separate from Section 4 for timing-dependent features. Jump is timing-dependent.*

**Speed selection:** Target speed set before the face base — adjustments on the face are technique errors. For minor features, approach speed is trail speed or slightly above. For moderate, speed must be deliberately set in the approach zone. For significant/major, speed is specific to the jump and must be learned progressively.

**Line onto the feature:** Centred line hits the face squarely; offset line produces angled entry → yaw at lip risk. On natural terrain the correct line may not be obvious and worn ruts may force an angled approach.

**Body position setup:** Standing attack position must be established before reaching the face base. Setting up on the face shifts weight rearward then forward in sequence — exactly the instability that produces pitch errors at the lip.

**Gear and clutch:** Gear selection completed in the approach zone. Shifting on the face interrupts drive → changes suspension loading sequence → attitude errors at lip. Clutch should not be needed on the face — if it is, gear selection was wrong.

---

## 7. Terrain & Condition Interaction

**Rock (TERRAIN-03):** Consistent face traction; harsh lip transitions. Loose rock on face can spin the rear → nose-down. Rock landings punish incorrect technique more severely than any other surface.

**Mud (TERRAIN-01):** Reduces face traction → rear spin risk → nose-down pitch. Mud lip deforms on departure → unpredictable launch angle. Mud landing absorbs impact but decelerates sharply on run-out → front-wheel dig risk.

**Sand (TERRAIN-05):** Soft face absorbs energy → lower launch velocity than equivalent hardpack face. Sand lip deforms → lower, rounder trajectories. Sand landing forgiving on impact but creates ruts that can trap the front wheel.

**Hardpack:** Most consistent and predictable jump behaviour. Riders transitioning from hardpack to natural terrain often miscalibrate — natural surfaces do not behave as predictably.

**Condition modifiers:**
- Wet: reduces face traction, softens lip, reduces landing traction. Effectively increases severity by one tier.
- Frozen: hardens surface → sharper lip geometry, harsher landings, reduced traction on face and landing.
- Dusty: reduces visibility of lip and landing zone; generally good surface traction.

**Compounding risks:**
- Landing onto off-camber terrain sharply increases lateral instability.
- Jump followed immediately by a braking zone, turn, or technical obstacle reduces recovery margin — pipeline should flag multi-feature sequences where feature gap is shorter than expected recovery distance.

---

## 8. Exit, Landing & Recovery *(adapted: "Landing, Run-Out & Recovery")*

> *Merge restriction: this section must remain separate from Section 4 for timing-dependent features. Jump is timing-dependent.*

**Landing geometry:** Downslope (target) — trajectory and slope aligned; fork and shock compress smoothly in parallel. Flat — full vertical velocity absorbed by suspension; bottoming common on significant+. Upslope (casing) — worst case; slope resistance added to vertical impact; bottoming nearly certain; severe forward pitch.

**Run-out requirements:** Suspension needs 1–2 full rebound cycles to settle; rider needs distance to rebalance position and re-establish steering and throttle control. Indicative minimums: minor = 2–3m, moderate = 5–10m, significant = 10–20m, major = 20m+. If the run-out contains a second feature shorter than these distances, compound difficulty must be flagged.

**Recovery from imperfect landings:**
- Front-heavy: fork bottoms, rider pitches forward → push weight rearward, gentle throttle to level chassis, avoid front brake until fork rebounds.
- Rear-heavy: shock bottoms, rider pitches rearward then forward on rebound → absorb rebound through knees, neutral weight, no throttle until settled.
- Lateral (off-axis): weight inside peg immediately, avoid steering until both wheels tracking, accept wider line.

---

## 9. False Reads & Misidentification

**Underestimating natural jumps:** Rider classifies feature as undulating terrain until on the face. Most common on unfamiliar trails. Body position and speed are wrong for a launch feature.

**Overestimating tabletop safety:** Tabletop's reputation as "safe" leads riders to attempt at severity levels they would avoid on gap jumps. Casing the knuckle risk is underappreciated. 2–3 sentences is correct length.

**Confusing step_up and jump:** step_up at trail speed becomes a jump — same geometry, different technique requirement. Riders competent at step_up may be unprepared for the airborne state the same feature produces at higher speed.

**POV footage:** Jump face typically not visible. Stage 4 relies on: loss of ground reference, engine note change (unloaded), and smooth-then-abrupt camera shake pattern (float in air, abrupt on landing).

**Distant 3rd-person footage:** At distance, jump vs trail undulation is difficult to distinguish. Flag confidence below 0.5 for jump detection from distant 3rd-person footage. (Mark Crash and Nick Crash Phase 2 clips demonstrated this.)

**Low-resolution footage:** Lip geometry disappears at low resolution — edge definition required to distinguish defined face from trail rise.

**Condition-created ambiguity:** Wet rock shelf may look flat but have convex geometry that launches at speed. Shadow-hidden lips — dense tree cover hides lip geometry entirely. Vegetation-covered landing may hide a steeper-than-apparent drop-off.

---

## 10. Coaching Gates & Prerequisites

### Minimum Prerequisites by Severity

**Minor:** Basic standing technique (BIOMECH-01) confirmed — rider must be comfortable standing on pegs with bent knees and elbows.

**Moderate:** Minor prerequisites plus: steady throttle through terrain changes (CONTROL-01), basic weight distribution awareness (DYNAMICS-01), commitment decision-making (speed set before the face), and visual scan ahead (INTEL-04) — rider must be looking at the landing zone, not the lip.

**Significant:** Moderate prerequisites plus: demonstrated consistent moderate execution with neutral lip departure and balanced landing; in-air awareness (active body position management, not frozen grip); clutch-throttle coordination (CONTROL-01, CONTROL-02); advanced commitment reasoning (INTEL-05, INTEL-06).

**Major:** Significant prerequisites plus: demonstrated recovery from imperfect significant-severity landings; deliberate use of body weight and rear brake for in-air attitude control; advanced airborne control at significant severity. **Do not coach up to major without confirmed significant competence and demonstrated recovery skills.**

### Progression Model

1. Standing attack position on flat terrain
2. Absorbing compressions (minor rollers) while standing
3. Small natural features with visible airtime (minor severity)
4. Purpose-built tabletops at moderate severity
5. Natural features at moderate severity
6. Gap jumps at moderate-to-significant severity
7. Significant natural features
8. Major features (only with progressive speed building and local knowledge)

Each step requires demonstrated competence — not just completion, but consistent technique. Technique errors at current tier must be resolved before progressing.

### "Do Not Coach Up" Thresholds

Stage 9 should decline to recommend next severity tier when:
- Current footage shows technique errors at the current tier
- Body position fundamentals not internalised (death-grip, seated on approach, stiff arms, looking down)
- Current-tier outcome includes crash or near-miss indicating the rider is at their limit
- Rider profile indicates skill level below prerequisite threshold for next tier

### Skill Category Tags

- `balance_standing` — minor+
- `throttle_steady` — moderate+
- `weight_distribution_neutral` — moderate+
- `commitment_decision` — moderate+
- `visual_scan_ahead` — moderate+
- `clutch_throttle_coordination` — significant+
- `airborne_body_control` — significant+
- `recovery_imperfect_landing` — major

---

## 11. Feature Demands / Constraints

### Minimum Technique Required

Standing technique (BIOMECH-01) at any severity. Riders not comfortable standing should not attempt any feature that could produce unintended airtime. Moderate and above require full attack position, throttle control, weight distribution management, and commitment decision-making.

### Equipment Considerations

**Suspension:** Correct sag and damping more important for jumps than any other feature. Insufficient travel → landing harshness and reduced recovery window. Over-sprung suspension may not activate on the face → unpredictable launch as suspension suddenly engages at the lip.

**Tyres:** Pressure is a compromise on enduro trail rides — not optimised for jumps. Lower pressure = better face grip but rim strike risk on landing; higher pressure = better landing support but reduced face grip.

**Bike geometry:** Longer wheelbase (enduro) = more stable in air but less correctable. Shorter wheelbase = more responsive to corrections but more sensitive to errors.

### Out-of-Scope Content

- Standing vs seated fundamentals → BIOMECH-01
- Throttle control mechanics → CONTROL-01
- Weight distribution physics → DYNAMICS-01
- Line choice and terrain reading → INTEL-01, INTEL-03
- Commitment vs hesitation psychology → INTEL-05
- Drop features (purely downward, no upward launch) → FEATURE-02
- Step_up features (vertical face, low-speed wheel placement) → FEATURE-07
