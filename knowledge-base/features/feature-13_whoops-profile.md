---

# — BLOCK 1: Pipeline Contract ————————————————————————————
pipeline_contract:
  kb_type: terrain_feature
  pipeline_enum_value: [whoops]
  feature_class: continuous
  primary_observable_signature: "Repeated undulations in the trail surface — regular or irregular bumps in sequence that require the rider to manage rhythm, momentum, and suspension loading across multiple impacts"
  dominant_risk_axis: "Progressive loss of control from compounding suspension events and rhythm breakdown"
  expected_outcome_patterns:
    clean: "Rider maintains rhythm and momentum through the section, absorbing undulations with body and suspension working together"
    minor_error: "Rider loses rhythm briefly, harsh impact on one or two whoops, recovers without stopping"
    major_error: "Rhythm breaks down completely, bike bucks or kicks, rider loses body position"
    crash: "Compounding suspension overload causes rear kick or front dive, ejecting the rider or causing OTB"

# — BLOCK 2: Retrieval Triggers ———————————————————————————
retrieval_triggers:
  primary:
    - "stage4_feature_type: [whoops]"
  secondary:
    - "stage6_failure_type: [technique, momentum]"
    - "stage6_crash_type: [otb, ejection, rear_kick]"
  contextual:
    - "stage4_terrain_type: [hard_pack, sand, mud]"
    - "stage5_intent: [trail, race]"

# — BLOCK 3: Content Metadata ————————————————————————————
content_metadata:
  severity_definition:
    minor: "Low-amplitude undulations, gradual transitions, forgiving spacing, rider can absorb at moderate speed"
    moderate: "Defined whoops with consistent spacing, requires active body position and deliberate speed selection"
    significant: "Deep whoops with tight or irregular spacing, high speed required to skim, or slow speed required to crawl — wrong speed is punishing"
    major: "Large-amplitude whoops at high frequency, deep troughs, steep faces, demanding sustained physical effort and precise speed management over extended distance"
  scope: "Covers repeated undulations and rhythm sections. Excludes single bumps or compressions (not a sequence), general suspension setup (Domain 03), and body position fundamentals (BIOMECH-01)."
  status: draft
  common_misclassifications:
    - "Single compression or roller — whoops require a sequence of repeated undulations. A single bump is not a whoops section"
    - "Braking bumps — braking bumps are formed by repeated braking in the same zone and have different geometry. They may co-exist with whoops but are a distinct formation"

---

## 1. Feature Geometry & Physics *(MANDATORY)*

Whoops are repeated undulations in the trail surface — a sequence of peaks and troughs that the rider must cross. The defining physics problem is that each undulation loads and unloads the suspension in sequence. If the suspension cannot recover between impacts, the bike's response compounds — each successive whoops amplifies the instability until the rider loses control.

The critical variable is the relationship between speed, whoops spacing, and suspension recovery time. At the right speed, the bike rides higher in the section, interacting more with the peaks and upper transitions rather than dropping fully into each trough. Too slow, the bike drops into every trough and climbs every face — exhausting and unstable. Too fast, the bike launches off peaks and lands hard in troughs, overloading the suspension.

Whoops spacing interacts with amplitude and face shape to define the workable speed window. Tighter spacing often narrows the speed window, while wider spacing may allow higher speeds if amplitude and transitions support it. Irregular spacing is the most difficult because no single speed works — the rider must constantly adapt.

**Classification hard rule:** It is a whoops section when there are three or more repeated undulations in sequence that require the rider to manage rhythm across multiple impacts. A single bump, dip, or compression is not whoops. Braking bumps (formed by repeated braking, typically found before corners) may look similar but have different geometry — sharper, more angular, and concentrated in a braking zone.

Whoops are a continuous feature because the rider's success depends on managing repeated interactions across the full section rather than solving a single obstacle.

### Commitment & Reversibility Profile

Commitment is progressive. The rider can slow or stop at any point, but the act of slowing in whoops is itself destabilising — braking loads the front suspension, which changes the bike's geometry mid-sequence and can trigger a nose-dive into a trough. The safest option is often to maintain speed through the section rather than brake mid-way.

---

## 2. Feature Forms & Variants *(MANDATORY)*

**Regular whoops (motocross-style):** Even spacing, consistent amplitude. Formed by track preparation or repeated traffic. Reward a single speed and rhythm. Failure mode is wrong speed selection — the bike either bogs in troughs or launches off peaks.

**Irregular natural undulations:** Uneven spacing and varying amplitude. Common on natural enduro trails where erosion and traffic create inconsistent bumps. Failure mode is rhythm breakdown from spacing changes — the rider cannot settle into a pattern.

**Sand whoops:** Soft landing, soft launch. The sand absorbs energy on each impact, decelerating the bike through the section. Failure mode is momentum decay — each whoops costs speed, and the rider stalls or bogs before the end of the section (co-retrieve TERRAIN-05 sand).

**Hardpack whoops:** Hard impact, fast rebound. The bike bounces aggressively off each peak. Failure mode is progressive amplification — each bounce is harder than the last until the bike bucks the rider (co-retrieve TERRAIN-02 hard pack).

**Downhill whoops:** Gravity accelerates the rider through the section, narrowing the speed control window. Failure mode is speed building beyond the manageable range, converting moderate whoops into major severity.

---

## 3. Bike Behaviour *(MANDATORY)*

Suspension is under maximum stress in whoops. Each undulation creates a compression-rebound-compression cycle. If rebound damping is too fast, the bike extends aggressively between whoops and launches off peaks. If rebound is too slow, the suspension packs down — it doesn't fully extend between impacts, progressively losing travel until it bottoms out.

The rear end is more affected than the front in most whoops because the rear wheel follows the front wheel's path through each undulation with a time delay. The rear hits each trough while the front is already climbing the next face, creating a see-saw effect that pitches the rider forward and backward in sequence.

At high speed, the bike can skim across the peaks — the wheels barely enter the troughs. This is physically easier but technically demanding because any disruption to the rhythm at high speed creates larger forces. At low speed, the wheels follow more of the full undulation profile, which can be more controlled in mild sections but becomes physically demanding and unstable in deeper whoops.

---

## 4. Technique by Severity *(MANDATORY)*

**Minor:** Standing position, light grip, let the bike move underneath the body. Maintain steady throttle. The body acts as the primary suspension — absorb with knees and ankles.

**Moderate:** Active standing position with deliberate weight through the pegs. Select speed before entry and commit to it. Grip the bike with knees to control lateral movement. Steady throttle helps stabilise rear-wheel drive and reduces abrupt pitch changes caused by inconsistent drive input.

**Significant:** Speed selection becomes critical — there is a narrow window between too slow (bogging) and too fast (launching). The rider must find the rhythm speed where the suspension cycles match the whoops spacing. Physical fitness matters — significant whoops sections demand sustained leg and core effort. *Coaching gate: rider must demonstrate confident standing position and ability to maintain consistent speed through moderate whoops before coaching significant technique.*

**Major:** Sustained high-intensity riding. Speed must be precise. The rider's body becomes a major supplementary damping system over the full section, working with the suspension rather than replacing it. Fatigue management becomes a factor — major whoops sections are physically demanding enough that technique degrades as the rider tires. *Coaching gate: rider must demonstrate significant-level whoops competence, physical fitness for sustained standing effort, and ability to hold rhythm under fatigue.*

---

## 5. Interaction Patterns & Failure Triggers *(MANDATORY)*

### Failure Chain 1: Suspension Packing
**Trigger:** Rider enters at a speed that does not match whoops spacing, causing suspension recovery mismatch
**Mechanism:** Suspension doesn't fully extend between impacts → progressive loss of travel → eventual bottom-out → bike stops absorbing and transmits full force to rider
**Outcome:** Harsh impacts, potential loss of body position, ejection on severe pack-down
**Stage 6 classification:** technique

### Failure Chain 2: Rhythm Breakdown
**Trigger:** Irregular spacing or speed change mid-section
**Mechanism:** Rider's body timing falls out of sync with bike movement → body absorbs impacts late or early → weight shifts become erratic → bike bucks or kicks
**Outcome:** Loss of body position, potential crash
**Stage 6 classification:** technique

### Failure Chain 3: Momentum Decay (Sand/Mud)
**Trigger:** Soft surface absorbs energy on each impact
**Mechanism:** Each whoops costs more speed than the rider maintains with throttle → progressive deceleration → bike drops deeper into troughs → resistance increases further → stall or bog
**Outcome:** Stall or loss of momentum requiring restart
**Stage 6 classification:** momentum

### Failure Chain 4: Speed Escalation (Downhill)
**Trigger:** Gravity adds speed through downhill whoops section
**Mechanism:** Bike accelerates beyond the speed the rider can manage → launches off peaks → landing forces exceed suspension capacity and rider's absorption ability
**Outcome:** Loss of control, potential OTB or ejection
**Stage 6 classification:** technique

### Pipeline Identification Notes
Whoops sections are visually identifiable as repeated undulations. The pipeline should look for consistent trail surface oscillation across multiple frames. Speed assessment relative to whoops spacing is important — the same whoops at different speeds produce completely different rider demands.

### Observability Notes
**POV camera:** Whoops are visible as repeated horizon-line oscillation. The camera bounce pattern itself is diagnostic — regular bounce indicates rhythm, erratic bounce indicates breakdown.
**3rd person camera:** Full section geometry is visible. Rider's body position relative to bike movement shows whether they are absorbing or being thrown.
**Key signal:** Progressive worsening of bike stability through the section indicates suspension packing or rhythm loss.

---

## 6. Approach & Entry *(DEFAULT)*

Speed selection at entry determines the entire section. The rider must read the spacing and amplitude from the approach and commit to a speed before the first whoops. Changing speed mid-section is possible but risky — acceleration or deceleration changes the suspension timing relative to the whoops spacing.

Gear selection matters. A gear that allows steady throttle at the target speed without requiring shifts through the section is ideal.

---

## 7. Terrain & Condition Interaction *(DEFAULT)*

Sand whoops (co-retrieve TERRAIN-05) absorb energy and decelerate the bike, demanding more throttle to maintain momentum. Hardpack whoops (co-retrieve TERRAIN-02) bounce the bike aggressively, demanding more body absorption.

Wet or muddy whoops (co-retrieve TERRAIN-01) fill troughs with standing water or soft mud, concealing depth and adding drag. The whoops effectively become a combined whoops and water crossing problem.

---

## 8. Exit & Recovery *(DEFAULT)*

Exiting whoops requires the rider to transition from rhythm-mode back to normal trail riding. The main risk is carrying whoops speed into the next trail section — if there is a corner, feature, or obstacle immediately after the whoops, the rider needs to decelerate in time. After sustained whoops sections, the rider may be physically fatigued, which degrades braking and reaction time.

Exit stability depends on how the bike leaves the final undulation. A poor final impact can leave the bike pitching or unloading as it returns to flat ground, compromising immediate braking or turning input.

---

## 9. False Reads & Misidentification *(DEFAULT)*

**Whoops vs braking bumps:** Braking bumps are concentrated in braking zones (before corners), are typically sharper and more angular, and are shorter sections. Whoops extend over longer distances with more consistent geometry. Braking bumps are usually clustered before corners or deceleration zones and generated under braking load, whereas whoops are a sustained rhythm feature that defines the whole section.

**Whoops vs rough trail:** General trail roughness with random bumps is not whoops. Whoops require repeated, sequential undulations with a discernible pattern (even if irregular).

---

## 10. Coaching Gates & Prerequisites *(DEFAULT)*

**Minor:** Standing position, steady throttle.
**Moderate:** Active standing position, deliberate speed selection, knee grip.
**Significant:** Rhythm management, speed precision, physical fitness for sustained effort.
**Major:** All above plus fatigue management and advanced speed control.

Skill tags: `balance_standing`, `throttle_steady`, `rhythm_management`, `physical_fitness`, `speed_selection`

---

## 11. Feature Demands / Constraints *(DEFAULT)*

Suspension setup is more relevant for whoops than almost any other feature. Rebound damping directly determines whether the bike packs down or extends correctly between impacts. Riders with poorly set-up suspension will struggle with whoops regardless of technique.

Physical fitness is an unusual equipment-parallel factor. Whoops sections demand sustained leg and core strength. Fatigue causes technique breakdown, which causes compounding instability. This is one of the few features where the rider's physical condition directly limits severity capability.

### Out-of-Scope Content

- Suspension setup and tuning → Domain 03 (Bike Dynamics)
- Standing position fundamentals → BIOMECH-01
- Sand surface physics → TERRAIN-05
- Hardpack surface physics → TERRAIN-02
- General throttle control → CONTROL-01
