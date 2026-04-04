---

# — BLOCK 1: Pipeline Contract ————————————————————————————
pipeline_contract:
  kb_type: terrain_feature
  pipeline_enum_value: [switchback]
  feature_class: single_event
  primary_observable_signature: "Acute directional reversal on gradient — the trail turns 120-180 degrees while climbing or descending a slope, requiring the rider to manage turning radius, gradient, and speed simultaneously"
  dominant_risk_axis: "Stall or tip-over from insufficient momentum through a tight radius on gradient"
  expected_outcome_patterns:
    clean: "Rider carries correct speed, selects appropriate line, and completes the turn maintaining momentum and balance"
    minor_error: "Rider completes the turn but with a dab, stall recovery, or wide line that forces correction"
    major_error: "Rider stalls mid-turn, tips over, or runs wide off the trail edge"
    crash: "Rider drops the bike on the uphill or downhill side of the turn, or slides off an exposed trail edge"

# — BLOCK 2: Retrieval Triggers ———————————————————————————
retrieval_triggers:
  primary:
    - "stage4_feature_type: [switchback]"
  secondary:
    - "stage6_failure_type: [technique, momentum, decision]"
    - "stage6_crash_type: [tip_over, lowside, stall]"
  contextual:
    - "stage5_intent: [climb, descent]"
    - "stage4_terrain_type: [rock, mud, roots, clay]"

# — BLOCK 3: Content Metadata ————————————————————————————
content_metadata:
  severity_definition:
    minor: "Wide-radius turn on moderate gradient, good traction surface, clear trail width, no exposure"
    moderate: "Tighter radius (sub-2m) on moderate gradient, mixed surface, limited trail width"
    significant: "Acute turn on steep gradient, poor traction, narrow trail, rocks or roots in the turn, camber toward exposure"
    major: "Near-180 degree reversal on steep gradient with loose or wet surface, minimal trail width, consequence exposure on the outside edge, no run-out on error"
  scope: "Covers acute directional reversals on gradient. Excludes general cornering technique (CORNER-01, CORNER-02), off-camber riding (FEATURE-02), and clutch/throttle fundamentals (CONTROL-01, CONTROL-03)."
  status: draft
  common_misclassifications:
    - "General corner — switchback requires gradient management combined with turning. A flat tight turn is cornering, not a switchback"
    - "Off-camber section (FEATURE-02) — switchbacks may include off-camber elements but the defining challenge is the directional reversal on gradient"

---

## 1. Feature Geometry & Physics *(MANDATORY)*

A switchback is an acute directional reversal where the trail turns 120–180 degrees while the rider is climbing or descending a slope. The defining physics problem is that the turn requires low speed (tight radius demands it), but the gradient demands momentum (uphill) or controlled deceleration (downhill). These two requirements conflict — the tighter and steeper the switchback, the narrower the workable speed window.

On an uphill switchback, the gradient constantly decelerates the bike, so any hesitation mid-turn bleeds speed rapidly toward stall. On a downhill switchback, the gradient constantly accelerates the bike, so the entry speed window is tight — too fast to make the radius, too slow risks stalling if the rider over-brakes.

**Classification hard rule:** It is a switchback when the directional change exceeds 120 degrees AND the trail is on a meaningful gradient. A tight flat turn is cornering. A gradual curve on a hill is a hill climb or descent. The switchback classification requires both acute direction change and gradient.

The available line through a switchback is constrained by trail width and steering lock limits. If the required turning radius exceeds available space, the rider must either widen the entry arc, use terrain features such as berms, or employ rear wheel pivot techniques.

### Commitment & Reversibility Profile

Commitment becomes high at turn entry. Once the rider initiates the turn on gradient, stopping or correcting mid-switchback becomes difficult and often leads to stall or loss of balance. On significant and major switchbacks, commitment is effectively irreversible once the turn begins. On uphill switchbacks, a stall mid-turn with the bike pointed across the slope is one of the hardest recovery positions in enduro. Reversibility is high before the turn; very low once committed.

---

## 2. Feature Forms & Variants *(MANDATORY)*

**Uphill switchback:** Dominant challenge is momentum preservation through the turn while maintaining sufficient engine drive to prevent stall. Failure mode is stall mid-turn from insufficient speed or poor clutch management.

**Downhill switchback:** Dominant challenge is speed control into and through the turn. Failure mode is over-speed on entry causing the rider to run wide or wash the front under braking.

**Bermed switchback:** Outside of the turn is built up, providing banking. Significantly easier — but riders can over-commit on speed expecting the berm to hold, then find the gradient transition catches them on exit (co-retrieve FEATURE-08 berm).

**Off-camber switchback:** Trail surface tilts away from the inside of the turn. Compounds turning with lateral gravity pull. Failure mode is progressive slide toward the outside/downhill edge (co-retrieve FEATURE-02 off-camber).

**Rocky/rooted switchback:** Loose or uneven surface through the turn removes the option of smooth, predictable traction. Failure mode is rear wheel spin on a rock or root mid-turn, breaking drive that maintains momentum.

---

## 3. Bike Behaviour *(MANDATORY)*

At switchback speeds (walking pace to slightly above), the bike's gyroscopic self-stabilisation is minimal. The rider must actively balance the bike — it will not hold itself up the way it does at trail speed.

Clutch and throttle interaction is the primary control input on uphill switchbacks. The rider slips the clutch to modulate drive at very low RPM while maintaining enough engine speed to prevent stalling. Any gap in power delivery on gradient results in immediate deceleration toward stall.

Steering lock limits the minimum turning radius. On tight switchbacks, the bars may be at or near full lock, fixing the turning radius by geometry. Tightening the turn further requires rear wheel pivot (briefly breaking rear traction to rotate the bike) — this is an advanced technique for significant/major severity only.

Rear brake is primarily used as a stability and speed control tool, though it may also be used for controlled deceleration on entry, particularly on downhill switchbacks. Light rear brake drag loads the rear suspension, improving low-speed stability.

At low speed, balance becomes the limiting factor rather than traction — many switchback failures occur without loss of traction, purely from inability to stabilise the bike at near-zero speed on gradient.

---

## 4. Technique by Severity *(MANDATORY)*

**Minor:** Standard slow-speed turn. Standing position, look through the turn to the exit, maintain light throttle, smooth arc.

**Moderate:** Gear selection before entry (typically first gear). Clutch modulation to control drive through the turn. Weight the outside peg through the apex. Head turns to the exit before the bike turns.

**Significant:** Pre-planned approach: entry speed, gear, line, and exit point all decided before committing. Clutch slip zone is narrow — too much drive spins the rear, too little stalls. Body shifts forward on uphill (prevent loop-out), rearward on downhill (prevent front tuck). Inside leg may come off the peg for balance. *Coaching gate: rider must demonstrate confident low-speed clutch control and standing balance before coaching significant switchback technique.*

**Major:** Decision-level assessment first — is this rideable given current conditions, or is walking the correct choice? If riding: full commitment, precise clutch zone, aggressive head turn, acceptance that a dab or foot-drag may be necessary. On exposed switchbacks, the consequence of running wide is high. *Coaching gate: rider must demonstrate significant-level switchback competence and risk assessment ability.*

---

## 5. Interaction Patterns & Failure Triggers *(MANDATORY)*

### Failure Chain 1: Mid-Turn Stall (Uphill)
**Trigger:** Insufficient momentum or abrupt clutch release mid-turn on uphill gradient
**Mechanism:** Engine stalls → bike decelerates immediately on gradient → rider cannot hold bike on slope at acute angle → tip-over
**Outcome:** Tip-over, potentially difficult recovery (bike across slope, uphill restart)
**Stage 6 classification:** technique

### Failure Chain 2: Over-Speed Entry (Downhill)
**Trigger:** Excessive speed entering a downhill switchback
**Mechanism:** Turning radius at speed exceeds available trail width → rider runs wide → exits trail on outside edge or panic brakes → front wash on loose surface
**Outcome:** Off-trail departure or front wheel wash
**Stage 6 classification:** technique

### Failure Chain 3: Rear Wheel Spin on Gradient
**Trigger:** Excessive throttle or abrupt clutch engagement on loose surface mid-turn
**Mechanism:** Rear wheel breaks traction → drive lost → on uphill, momentum drops below minimum → stall. On downhill, rear steps out laterally
**Outcome:** Stall (uphill) or rear slide (downhill)
**Stage 6 classification:** traction

### Failure Chain 4: Target Fixation on Exposure
**Trigger:** Rider looks at the outside edge or drop rather than the exit line
**Mechanism:** Bike follows vision → rider drifts toward outside → tightening correction or panic brake mid-turn
**Outcome:** Wide line, potential off-trail departure
**Stage 6 classification:** decision

Switchbacks with exposure significantly increase consequence — line errors are not recoverable with run-out, converting minor technique errors into high-risk outcomes.

### Pipeline Identification Notes
Switchbacks are identifiable by acute trail direction change on visible gradient. Multiple switchbacks stacked on a hillside (hairpin climb/descent) are common. The pipeline should detect the combination of turning angle + gradient, not turning angle alone.

### Observability Notes
**POV camera:** Trail direction change is visible. Gradient may be difficult to assess. Rider's head turn (or lack of) is a key diagnostic signal for target fixation.
**3rd person camera:** Full geometry visible — turn angle, gradient, trail width, surface condition. Stall events and line choice are clearly assessable.
**Key signal:** Abrupt speed change, foot down, or bike stopping mid-turn indicates technique breakdown.

---

## 6. Approach & Entry *(DEFAULT — adapted from Approach & Setup)*

Entry speed is the single most important decision. Too fast = run wide. Too slow = stall on gradient. The correct entry speed is the minimum at which the bike can complete the turn without stalling, with margin for traction loss.

Line selection: on uphill switchbacks, a wider entry arc trades trail width for a gentler turning radius. On downhill switchbacks, an inside line gives more room for error toward the outside.

Gear selection must happen before the turn. Shifting mid-switchback on gradient risks rear wheel spin during clutch re-engagement.

---

## 7. Terrain & Condition Interaction *(DEFAULT)*

Wet or muddy switchbacks dramatically increase rear wheel spin risk and reduce the usable clutch slip zone. Co-retrieve TERRAIN-01 (mud) or TERRAIN-08 (clay) for surface-specific traction behaviour.

Rocky switchbacks (co-retrieve TERRAIN-03) add unpredictable front wheel deflection through the turn, potentially pushing the rider off their chosen line at the worst possible moment.

Root-covered switchbacks (co-retrieve TERRAIN-07, FEATURE-09) combine low-friction surfaces with the already narrow speed window, compounding difficulty significantly.

---

## 8. Exit & Recovery *(DEFAULT)*

On uphill switchbacks, the exit is the highest-risk moment — the rider must accelerate out of the turn and up the gradient simultaneously. If momentum is too low at the exit point, the bike stalls on the uphill exit gradient even though the turn itself was completed.

On downhill switchbacks, the exit transitions from turning back to descending. The gradient resumes pulling the bike, so the rider must re-establish speed control immediately after the turn apex.

A failed switchback (stall or tip-over mid-turn) leaves the bike in a difficult position — across the slope, on gradient. Recovery requires repositioning the bike to face either uphill or downhill before restarting.

---

## 9. False Reads & Misidentification *(DEFAULT)*

**Switchback vs tight corner:** The gradient is the distinguishing factor. A tight turn on flat ground is a cornering problem, not a switchback. The pipeline should check for gradient before classifying as switchback.

**Switchback vs hill climb with direction change:** A gentle curve on a hill is not a switchback. The directional change must be acute (120+ degrees) to qualify. A 90-degree bend on a hill is a borderline case — classify based on whether the turning radius or the gradient is the dominant challenge.

---

## 10. Coaching Gates & Prerequisites *(DEFAULT)*

**Minor:** Standing position, basic throttle control.
**Moderate:** Low-speed clutch modulation, confident standing balance.
**Significant:** Precise clutch slip zone control, standing balance under gradient, ability to pre-plan approach.
**Major:** All above plus decision-making about when to ride vs walk.

Skill tags: `clutch_modulation`, `balance_low_speed`, `gradient_management`, `line_choice`, `decision_walk_vs_ride`

---

## 11. Feature Demands / Constraints *(DEFAULT)*

Clutch feel and modulation are the most important equipment factors. A heavy or grabby clutch makes precise low-speed clutch slip significantly harder. Hydraulic clutch (standard on most modern enduro bikes) provides better modulation than cable clutch.

Gearing affects the usable speed window. Shorter gearing (larger rear sprocket) provides more control at very low speeds but may feel over-revved on the approach. Stock enduro gearing is typically well-suited.

### Out-of-Scope Content

- General cornering technique → CORNER-01, CORNER-02
- Off-camber riding → FEATURE-02
- Berm technique → FEATURE-08
- Clutch control fundamentals → CONTROL-03
- Hill climb technique → HILL-01
- Standing balance fundamentals → BIOMECH-01
