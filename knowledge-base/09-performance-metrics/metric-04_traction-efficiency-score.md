---
topic_id: METRIC-04
title: Traction Efficiency Score
domain: Performance Metrics & Scoring
domain_id: 09
difficulty_range: beginner, intermediate, advanced
related_topics: DYNAMICS-01, DYNAMICS-02, METRIC-01, ERROR-13
prerequisites: DYNAMICS-01, DYNAMICS-02
tags: traction, efficiency, score, events, tyre, grip, metric, AI
version: 1.0
last_updated: 2026-03-30
---

# Traction Efficiency Score

## 1. OVERVIEW

The Traction Efficiency Score (TES) measures how effectively a rider uses the available traction budget — the maximum grip their tyre can provide on a given surface — without either over-loading it (causing loss events) or under-using it (excessive caution that sacrifices performance). Traction is the fundamental currency of off-road motorcycle riding: every control input, every cornering force, every acceleration and deceleration event draws from the tyre's available grip. A highly efficient rider consistently operates at 70-90% of the available traction budget — near maximum performance without crossing into loss events. An inefficient rider either operates well below this (timid, sacrificing performance unnecessarily) or repeatedly exceeds it (aggressive, triggering uncontrolled traction loss events). The TES captures both failure modes: over-load and under-use. Terrain normalisation is critical — mud riding naturally generates more traction events than hardpack, and this must be accounted for in scoring.

## 2. CORE PRINCIPLES

### Principle 1: The Traction Budget Is a Fixed Resource That Combines All Forces
A tyre generates maximum grip in any direction — forward (acceleration), backward (braking), or lateral (cornering). These forces are not independent: using 60% of traction budget for acceleration leaves only 40% for cornering. Exceeding the total budget in any combination causes loss. A skilled rider manages this budget across all simultaneous demands — this is what experienced coaches mean when they say "smooth inputs give you traction for cornering." Over-aggressive throttle steals traction budget from cornering grip.

### Principle 2: Controlled Loss Events Are Technique; Uncontrolled Events Are Errors
Not all traction loss events are equal. A deliberate controlled slide — rider intentionally breaking traction to rotate the rear of the bike through a corner — is advanced technique that scores neutrally or positively on TES. An uncontrolled snap-throttle rear spin that the rider did not intend and did not control is an error that is penalised. The AI coaching engine must classify loss events by control status: was the rider ahead of the event (controlled) or behind it (uncontrolled)?

### Principle 3: Under-Use of Traction Is Also an Inefficiency
A rider who never exceeds 40% of the available traction budget is leaving significant performance on the table. They are going slower than the terrain allows, using less cornering force than is safe, and accelerating more slowly than the tyre can support. The TES penalises this as much as it penalises over-use. The ideal zone is consistently close to the limit without crossing it — the hallmark of efficient, experienced riding.

### Principle 4: Traction Loss Events Are Multi-Sense Detectable
Uncontrolled traction loss has a distinctive multi-channel signature. Visual: rear step-out, visible roost (spinning wheel throwing material), front wash event. Audio: RPM spike above road speed (rear spinning faster than forward velocity), tyre scrub sound. Sensor: wheel speed differential (rear faster than front), lateral IMU acceleration spike (chassis displacing sideways), throttle position spike preceding the event. Combining these channels allows the coaching engine to reliably identify loss events without full sensor integration.

### Principle 5: Traction Efficiency Improves Before Raw Speed
Counter-intuitively, riders usually improve their traction efficiency before their outright speed improves. A beginner may be very slow but have a low TES because they regularly exceed the traction budget with snap inputs. As throttle technique improves, TES rises first — fewer loss events — and then speed catches up as the rider learns to use more of the budget deliberately. Tracking TES separately from speed captures this intermediate improvement phase that lap time alone misses.

### Principle 6: Surface Changes Are the Highest Traction Risk Moments
The most frequent cause of traction loss events in enduro riding is a surface change the rider did not anticipate or adjust for — crossing from hardpack to wet rock, from dry dirt to mud, from loose shale to solid ground. A rider applying throttle appropriate for hardpack encounters a wet root and immediately exceeds the traction budget. TES tracking that identifies surface-change-correlated loss events points to the terrain reading skill (INTEL domain) as the root cause rather than input quality alone.

## 3. TECHNIQUE BREAKDOWN BY LEVEL

### 3a. Beginner Level
**Goal:** Eliminate the most obvious uncontrolled traction loss events and develop basic awareness of the traction budget concept.

**Key Focus Areas:**
- Recognising when the rear wheel spins uncontrollably versus when it does not
- Connecting throttle snap inputs to rear spin events — understanding cause and effect
- Learning the visual and feel difference between grip and slip
- Reducing the frequency of full traction loss events (rear steps out significantly)

**What Good Looks Like:**
On a moderate trail, the rear wheel maintains contact and does not visibly spin or step out. There is no roost from the rear tyre. The rider can accelerate out of corners without the rear breaking away. The engine note does not spike sharply during acceleration.

**Common Mistakes:**
- **Not connecting throttle and spin:** Rider does not realise their throttle input caused the spin event. Why it happens: the connection between input and outcome is not yet established. → After each spin event, immediately ask: "What was my throttle doing one second ago?"
- **Snap throttle on corners:** Rider accelerates immediately and aggressively at the corner exit, causing rear spin. Why it happens: eager to accelerate, unaware of traction budget. → Roll on gently — the throttle is a tap, not a switch.
- **Unaware of surface changes:** Rider rides over wet roots or rock at the same throttle position as dry dirt. Why it happens: terrain reading not yet developed. → Look for surface texture changes and reduce throttle before crossing them.

### 3b. Intermediate Level
**Goal:** Develop deliberate traction management — operating intentionally near the budget limit and beginning to distinguish controlled from uncontrolled events.

**Progression Markers from Beginner:** Uncontrolled rear spin events are infrequent on moderate terrain. Rider can identify the throttle input that caused previous loss events on video review.

**Key Focus Areas:**
- Learning to feel the onset of traction loss and respond before it becomes uncontrolled
- Beginning to use rear wheel slip intentionally in corners as a rotation tool
- Adjusting throttle position and progression in response to changing surface conditions
- Understanding how body weight (fore/aft) affects traction budget distribution between tyres

**What Good Looks Like:**
The rider trails throttle through a loose corner and the rear begins to step out slightly — a controlled slide. They maintain or slightly increase throttle to keep the slip controlled rather than panicking and closing throttle (which would cause a snap-back). On a surface change (dirt to rock), the rider automatically reduces throttle before the transition and resumes normal input after.

**Common Mistakes:**
- **Panic throttle closure on first slip:** Rider feels the rear begin to slip and immediately closes throttle completely. This snaps the rear back and can cause a crash. Why it happens: instinct. → Counter-intuitive training: when you feel slip beginning, maintain or slightly increase throttle — do not close suddenly.
- **No adjustment for surface changes:** Rider still applies the same throttle pattern regardless of surface. Why it happens: surface change awareness not yet systematic. → Build a pre-emptive surface scan habit: look at the surface 5m ahead, not just at the immediate terrain.

### 3c. Advanced Level
**Goal:** Operate consistently at 70-90% traction budget across varied terrain with deliberate, classified use of controlled slides as technique.

**Progression Markers from Intermediate:** TES 70+ across typical sessions. Controlled slides are intentional and repeatable. Uncontrolled loss events are rare and terrain-justified when they occur.

**Key Focus Areas:**
- Actively using the 70-90% zone: not backing off below 70% when terrain allows more
- Deliberate slide angle management: using rear slide angle as a cornering tool
- Combined load management: braking, cornering, and throttle loads managed simultaneously within total budget
- Traction sensing: proprioceptive awareness of traction level without waiting for visible events

**What Good Looks Like:**
An advanced rider consistently produces smooth, controlled exits from corners with a small amount of rear slip — not wheel-spinning loss but a deliberate rotational slide. They adjust throttle and body position continuously to stay near the traction limit. TES scores 85+ terrain-normalised. Uncontrolled events are rare (fewer than two per session on capability-appropriate terrain).

**Common Mistakes:**
- **Underusing traction from habit:** Advanced rider who trained primarily in the error-avoidance mindset under-uses traction budget habitually even when conditions allow more. Why it happens: early training focused on eliminating loss events rather than maximising use. → Deliberately train at higher traction loads — find the edge intentionally in safe conditions.
- **Misclassifying controlled as uncontrolled:** Rider treats all rear movement as error, losing natural bike rotation in corners. → Learn to distinguish — deliberate rear slide is the tool that makes corners fast.

## 4. DIAGNOSTIC CUES (AI COACHING ENGINE REFERENCE)

### Visual Cues — Correct Technique
- Rear wheel maintains traction or shows controlled minimal slip on corner exits — no large step-out events
- No visible roost (thrown material) from rear tyre on hardpack — spin events absent
- Corner exits show bike rotating smoothly with rear tyre maintaining consistent contact
- Bike transitions from corner to straight without chassis instability events
- Rider body position remains stable during acceleration — no backward jerk indicating snap throttle

### Visual Cues — Error Indicators
- Roost from rear tyre visible during throttle application — rear spinning, traction budget exceeded
- Rear step-out event: rear of bike slides sideways suddenly, rider correction visible — uncontrolled traction loss
- Front wheel wash event: front tyre loses grip and slides forward — front traction budget exceeded in cornering
- Rear wheel hop or bounce on braking: ABS-absent over-braking causing intermittent lock — rear traction over-load
- Repeated chassis instability on the same section: systematic traction management error at that feature

### Audio Cues
- RPM spike during acceleration higher than the speed change would justify: rear wheel spinning — traction loss event
- Tyre scrub sound: lateral sliding of tyre on surface — lateral traction loss event (controlled or uncontrolled)
- Consistent RPM with no spikes during acceleration: good traction management, no spin events
- Sudden RPM drop after spike: throttle snapped, rear spun, throttle instinctively closed — over-load and correction sequence
- High-pitched tyre scream during braking: front or rear locked under braking — severe over-load event

### Sensor Cues
- Wheel speed differential (rear minus front): positive spike = rear spin event; negative spike = front lock; near-zero = no wheel speed difference
- IMU lateral acceleration: spike > 0.3g not consistent with deliberate cornering = uncontrolled lateral traction event
- Throttle position first derivative: spike > 30%/second preceding wheel speed differential event = snap throttle causing traction loss
- TES formula: 100 - (uncontrolled loss events × penalty weight × terrain normalisation) - (under-use penalty from speed analysis)
- Loss event classification: cross-reference wheel speed, lateral IMU, and throttle trace to classify controlled vs uncontrolled

## 5. COACHING CUES & LANGUAGE

### Positive Reinforcement
- "Clean exits all session — your traction management is dialled. The rear stayed planted every time. That's how you go fast without fighting the bike."
- "That controlled slide through the second corner was exactly right. You're using the traction budget deliberately, not hoping for the best."
- "You adjusted your throttle before that surface change without me saying anything. That's terrain reading and traction management working together perfectly."

### Corrective Feedback
- "You snapped the throttle at the exit and the rear went. You've now spent your traction budget AND your momentum. Roll it on progressively — the rear will hook up and you'll actually go faster."
- "You feel the rear start to move and you instantly close the throttle. That snap-back is almost as dangerous as the original slide. When the rear starts to go, maintain throttle — let it control, not snap back."
- "Your TES is showing two uncontrolled rear events on that climb. Both times, same spot — the surface changes from dirt to wet rock. You're not adjusting. Reduce your throttle 5m before you hit that transition."
- "You're running at 40% of your traction budget on this terrain. There's grip there you're not using. Increase your corner entry speed and trust the tyre — it can handle more than you're asking of it."

### Progression Prompts
- "Next session, I want you to find the edge deliberately. Pick one safe corner and increase your throttle roll-on by 20% on each lap until you feel the rear begin to slip. Then back off 10%. That's your traction limit for that surface."
- "Find a loose section and practice maintaining throttle as the rear begins to slide. Don't close it — hold it. This is the anti-instinct drill that makes your traction management reliable."
- "Track your rear spin events per lap this session. Write it down after each lap. Three events, two events, one event — that's what progress looks like."

## 6. DRILLS & PRACTICE EXERCISES

### Drill 1: The Traction Limit Finder
**Purpose:** Find the traction limit deliberately in a controlled environment to calibrate proprioceptive awareness.
**Setup:** A loose or gravel surface in an open area — nothing to crash into. Safe, known ground.
**Execution:**
1. Ride in a circle (5m radius) at a gentle pace.
2. Gradually increase throttle each lap until the rear begins to slip.
3. When slip starts: maintain throttle (counter-intuitive — do not close it). Feel the bike rotate.
4. Now reduce throttle gradually — find the slip level where the rear slides but is controllable.
5. Hold that throttle level and maintain the slide for 3-5 seconds.
**Success Criteria:** Rider finds and maintains a controlled rear slide for at least 3 seconds without loss of control. Identifies the traction limit for that surface by feel.
**Duration/Reps:** 20 minutes. Multiple circles at each throttle level.
**Progression:** Move to a corner on a trail. Apply the same progressive throttle increase. Find the limit and manage it.

### Drill 2: Surface Transition Pre-Adaptation
**Purpose:** Build the habit of adjusting throttle before a surface change, not after a traction event.
**Setup:** A section of trail with at least one visible surface change — dirt to rock, dry to wet, hard to loose.
**Execution:**
1. Identify the surface change point 5m before arriving at it.
2. Reduce throttle to 50% of current position at 3m before the change.
3. Pass through the transition at the reduced throttle.
4. After the transition is fully crossed, resume normal throttle.
5. Repeat until the pre-adaptation is automatic — no thought required.
**Success Criteria:** Zero traction events at surface transitions across five consecutive passes. Pre-reduction becomes habitual.
**Duration/Reps:** 15 minutes, minimum 10 passes.
**Progression:** Increase speed approaching the transition. Reduce the pre-adaptation distance until you can adjust with only 1-2m warning.

### Drill 3: Corner Exit Traction Management Progression
**Purpose:** Build deliberate, progressive throttle application on corner exits to maximise traction budget use without exceeding it.
**Setup:** A consistent corner with a defined apex and a 20m exit straight.
**Execution:**
1. Run the corner five times at conservative throttle (50% roll-on speed).
2. Increase roll-on speed by 10% per five runs.
3. Monitor: at what roll-on speed does the rear begin to slip?
4. Back off 10% from that threshold — this is your optimal roll-on rate for this surface.
5. Run 10 consecutive exits at the optimal rate — build the habit.
**Success Criteria:** Rider identifies and repeats the optimal roll-on rate for a specific corner and surface. Exit speed is maximised without uncontrolled spin events.
**Duration/Reps:** 30 minutes, minimum 30 corner passes.
**Progression:** Move to a corner with a different surface. Then apply to a corner preceded by a surface change.

### Drill 4: Braking Traction Management
**Purpose:** Practice applying maximum braking force without exceeding the front traction budget.
**Setup:** Flat straight section with a defined stopping zone. Safe surface (hardpack or gravel).
**Execution:**
1. Ride at 30 km/h.
2. Apply front brake progressively — build pressure over 2 seconds to maximum comfortable deceleration.
3. Hold maximum pressure for 1 second.
4. Release progressively over 1 second.
5. Monitor: did the front wheel slide or lock? If yes, that pressure exceeded the front traction budget.
**Success Criteria:** Maximum deceleration achieved without front wheel lock. Consistent stopping distance across five runs (±10%).
**Duration/Reps:** 15 minutes, 15 runs. Vary surface: dry, damp, gravel.
**Progression:** Add cornering load — begin releasing brakes as you initiate a corner turn. Trail braking.

## 7. CROSS-REFERENCES & DEPENDENCIES

**This topic connects to:**
- DYNAMICS-01 (Traction Fundamentals): the physical principles underlying TES measurement
- DYNAMICS-02 (Traction Budget and Load Transfer): the traction budget model that TES quantifies
- METRIC-01 (Smoothness Index): smooth inputs are the primary driver of traction efficiency
- ERROR-13 (Traction Loss Events): the primary error class that TES measures and diagnoses

**This topic is prerequisite for:**
- Advanced corner speed analysis: separating traction-limited from line-limited corner speed requires TES context
- Trail braking analysis: requires TES as the traction load monitoring framework

**This topic builds on:**
- DYNAMICS-01 (Traction Physics): the physical foundation for traction budget understanding
- DYNAMICS-02 (Load Transfer and Traction): how load transfer affects traction budget availability

## 8. TERRAIN & CONTEXT VARIATIONS

### Hardpack / Dry Singletrack
Maximum traction available. TES benchmarks are highest here — a good rider should be able to operate at 80-90% of traction budget reliably. Loss events on hardpack are clearly attributable to input errors rather than terrain limitation. Uncontrolled events on hardpack are penalised most heavily in TES scoring.

### Mud and Deep Loose
Traction budget is dramatically reduced. The TES normalisation factor is highest for mud — many events that would be penalised on hardpack are terrain-imposed in mud. Focus shifts to whether the rider adapts their inputs to the reduced traction environment. A rider applying hardpack throttle patterns in mud will generate constant loss events — not necessarily a technique error, but an adaptation failure.

### Wet Roots and Rock
The most unpredictable traction environment — grip can change dramatically within centimetres as the surface transitions from dry to wet rock. TES scoring gives significant weight to adaptive pre-adjustments rather than reactive corrections. The rider who adjusts before the low-traction surface is scored better than the rider who corrects after the loss event even if the outcome is the same.

### Sand
Traction physics in sand differ significantly from other surfaces — the tyre sinks and the contact patch changes dynamically. Loss events in sand are often accompanied by the front wheel "ploughing" rather than spinning. TES in sand weights front traction events more heavily and adjusts for the lower overall budget available.

### Competition
Under competition pressure, riders typically operate closer to the traction budget limit — slightly more loss events are acceptable as the risk-reward calculation shifts toward speed. TES under competition conditions should be normalised upward (a higher loss rate is acceptable relative to training sessions).

## 9. EXPERT INSIGHTS & SOURCES

### Key Insights
- **Tyre manufacturer data**: Modern off-road tyres are designed to operate optimally at a small amount of controlled slip — 3-7% wheel slip for maximum traction force. Zero slip is not maximum traction; this counterintuitive insight is the physical basis for understanding why small controlled slides are not errors.
- **Graham Jarvis** on traction management in extreme enduro: "You have to feel the grip through your feet and your seat. When you've got it, push. When you're losing it, don't panic — just back off smoothly. The bike will sort itself out if you don't make it worse."
- **Taddy Blazusiak**: Coaches have noted his ability to maintain throttle through traction events rather than instinctively closing — the sign of a rider who understands traction management at a reflexive level, not just intellectually.
- **Motocross data analysis**: In professional motocross, data engineers track wheel speed differential as a primary metric — essentially TES data at the pro level. The target for pro riders is controlled slip of 5-10% on acceleration, zero uncontrolled events. This methodology translated to enduro coaching is a significant differentiator.
- **Jimmy Lewis**: Uses the concept of a "traction budget" explicitly in coaching — allocating grip across acceleration, cornering, and braking. The TES metric operationalises this coaching concept into a measurable score.
- **Rally car parallel**: Four-wheel rally drivers train extensively on traction limit identification — particularly the transition from grip to slide and back. The two-wheel equivalent has the same physics and similar coaching approaches, translated for different vehicle dynamics.

### Sources & References
- Tyre physics: Pacejka Magic Formula (theoretical foundation for traction budget modelling)
- Jimmy Lewis Off-Road Riding School — traction budget coaching concept
- Taddy Blazusiak and Graham Jarvis coaching interviews — traction management in hard enduro
- Motocross data analysis methodology (professional team data engineer practices)
- Dunlop, Michelin and Bridgestone off-road tyre design documentation — optimal slip ratio data
- "Going Faster" (Skip Barber) — traction budget concept from circuit racing translated to off-road context
