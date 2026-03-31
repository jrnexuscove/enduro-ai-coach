---
topic_id: METRIC-05
title: Line Efficiency vs Optimal Path
domain: Performance Metrics & Scoring
domain_id: 09
difficulty_range: beginner, intermediate, advanced
related_topics: INTEL-01, CORNER-01, METRIC-07, SENSOR-04
prerequisites: INTEL-01, CORNER-01
tags: line, efficiency, optimal, path, GPS, corner, metric, deviation
version: 1.0
last_updated: 2026-03-30
---

# Line Efficiency vs Optimal Path

## 1. OVERVIEW

Line Efficiency vs Optimal Path (LE) measures how closely a rider's chosen line through corners and technical sections matches the theoretically optimal path — the route that minimises time or effort while maintaining safe margins. A perfect line score indicates the rider tracked exactly the fastest, most geometrically efficient path through the terrain. Deviations from the optimal line reduce the score — whether the deviation is entering a corner too late, missing the apex, running wide on the exit, or taking an inefficient line through a technical obstacle field. The optimal line is not fixed: it depends on surface conditions, obstacle positions, visibility, and rider capability level. For the AI coaching engine, line efficiency is assessed through a combination of GPS trace analysis (where available), video geometry analysis (apex timing and corner exit width), and exit speed (a strong proxy for line quality — a well-executed line produces high exit speed). The sector analysis approach — identifying which sections show the most line deviation — allows the coaching engine to direct attention to the highest-priority improvement areas.

## 2. CORE PRINCIPLES

### Principle 1: The Optimal Line Maximises the Corner Radius
The fundamental principle of line efficiency is geometric: a wider arc through a corner allows a higher speed for the same lateral g-force. By using the full width of the available trail — entering wide, apexing late at the inside, and using the full exit width — a rider creates the largest possible corner radius, which allows higher speed at the same traction level. A rider who stays in the middle of the trail at all times is using a much tighter arc — they must go slower for the same traction demand, or they exceed the traction budget. This geometric principle applies across all corner types and terrain.

### Principle 2: Late Apex Beats Early Apex for Exit Speed
An early apex — turning into the inside of the corner too soon — produces a progressively tightening arc on the exit, forcing the rider wide and requiring either throttle reduction or accepting a wide exit. A late apex — waiting until the corner is more than half complete before reaching the inside — produces a progressively opening arc on the exit, allowing the rider to increase throttle continuously from the apex onward without running wide. Late apex is the near-universal optimal technique for corners with exits that continue forward. Early apex is correct only for corners that tighten on exit — a specific terrain scenario.

### Principle 3: Exit Speed Is the Most Reliable Proxy Measurement
In the absence of GPS trace data, exit speed is the strongest single indicator of line quality. A well-executed optimal line produces a higher exit speed than a suboptimal line at the same entry speed — because the wider arc and late apex allow earlier, more aggressive throttle application. If GPS is not available, measuring or estimating exit speed through a timed section (time-to-speed after corner) provides a reliable line quality indicator. This allows the coaching engine to assess line efficiency from video and audio alone.

### Principle 4: Deviations Have Compounding Effects
A poor line into a corner does not just reduce speed through that corner — it sets up a poor entry to the next feature. Running wide on a corner exit places the rider on the outside of the trail, which may be the wrong side of the trail for the next corner, the next obstacle, or the next terrain feature. Line errors compound across sections: poor exit → wrong position for entry → poor entry → worse exit. The LE metric captures this compounding by scoring section-to-section continuity, not just individual corner geometry.

### Principle 5: The Optimal Line Is Condition-Dependent, Not Fixed
The theoretical optimal line for a corner changes with conditions. In mud, the outer edge of the trail may be deeper and slower — the optimal line moves inward. On loose surfaces, a tighter apex may reduce the slide angle requirement on exit. On wet rock, the dry line may not be the safe line. Line efficiency assessment must account for conditions, which means the coaching engine needs either condition metadata (from session notes or weather data) or video texture analysis to classify conditions before scoring line choices. A rider who correctly avoids the wet outer line in favour of a safer but slower inner line should not be penalised for the condition-appropriate deviation.

### Principle 6: Section-Level Analysis Identifies Coaching Priorities
Rather than computing a single session LE score, the most useful output is a sector-by-sector breakdown: which corners and technical sections show the greatest line deviation? These highest-deviation sections are the highest-priority coaching targets. A rider may have excellent line selection on 80% of sections but systematically poor line on fast, sweeping corners — a specific pattern that reveals a specific skill gap. Sector analysis transforms the LE metric from a summary score into a targeted coaching prescription.

## 3. TECHNIQUE BREAKDOWN BY LEVEL

### 3a. Beginner Level
**Goal:** Understand and begin applying the wide-in, late-apex, wide-out principle on moderate corners.

**Key Focus Areas:**
- Understanding what "apex" means and where it is on different corner types
- Learning to enter corners wide rather than diving immediately toward the inside
- Identifying the point where the front wheel should be at the apex (closest to the inside)
- Recognising the difference between an early and late apex outcome on the exit

**What Good Looks Like:**
On a moderate corner, the rider approaches from the outer edge of the trail, begins turning smoothly, and reaches the inside of the corner (apex) at approximately the corner midpoint or slightly beyond. The exit is on the outer edge of the trail, and the rider can begin increasing throttle without feeling the bike push wide.

**Common Mistakes:**
- **Centre-track riding:** Rider stays in the middle of the trail through corners rather than using the full width. Why it happens: feels safest, most familiar from road riding without race technique. → Walk the corner first — physically identify the wide entry point, the apex, and the wide exit point.
- **Early apex and running wide:** Rider turns in too early, reaches the inside too soon, and runs wide on the exit. Why it happens: instinct to get to the inside as quickly as possible. → Focus on the late turn-in point — resist turning in until the apex cone is visible.
- **Missing apex point on technical terrain:** On rough singletrack the apex is less obvious. Why it happens: trail varies, no clear inside edge. → Look for the natural inside of the trail's curvature and treat that as the apex reference.

### 3b. Intermediate Level
**Goal:** Apply optimal line selection consistently across varied corner types and begin adapting line choice to conditions.

**Progression Markers from Beginner:** Late apex is habitually applied on moderate corners. Entry wide is natural. Exit speed improvement is noticeable compared to centre-track riding.

**Key Focus Areas:**
- Distinguishing corner types: constant radius, decreasing radius, increasing radius — different optimal apex timing for each
- Adapting line for surface conditions — wet outside, mud ruts, off-camber sections
- Linking corners: position at exit of corner A sets up entry to corner B — thinking two corners ahead
- Recognising and correcting mid-corner line errors without compromising safety

**What Good Looks Like:**
The rider reads a series of corners, positions for a wide entry to the first, uses the exit width to carry speed into a position that perfectly sets up the second corner's wide entry. Line is consistently late-apex. On a wet corner, the rider voluntarily uses a slightly tighter line to stay on the dry surface — condition-appropriate adaptation.

**Common Mistakes:**
- **Same apex timing for all corners:** Rider applies a fixed late-apex template to all corners regardless of radius change. Why it happens: over-generalisation of the late-apex rule. → Decreasing radius corners need an even later apex; increasing radius corners allow a slightly earlier apex.
- **Mid-corner correction causing brake event:** Rider realises they have early-apexed and brakes mid-corner to avoid running wide. Why it happens: error recognition too late. → Move the recognition point earlier — the turn-in moment is when to adjust, not mid-arc.

### 3c. Advanced Level
**Goal:** Optimise line selection under race conditions, extreme terrain variability, and visibility limitations. Use LE data to identify systematic sector weaknesses.

**Progression Markers from Intermediate:** Line selection is automatic and condition-adapted on moderate terrain. Exit speed is consistently high relative to entry speed. Occasional systematic errors on specific corner types visible in GPS or video review.

**Key Focus Areas:**
- High-speed line selection: at higher speeds, the timing windows for line decisions compress dramatically — visual lookahead must increase
- Extreme terrain line selection: obstacles may force a non-optimal geometric line — the correct choice accepts the line compromise
- GPS-informed self-analysis: reviewing ridden line against theoretical optimal to identify systematic deviations
- Race line under competitive pressure: understanding when to sacrifice theoretically optimal line for a safer or more consistent line

**What Good Looks Like:**
GPS trace shows the ridden line closely following the theoretical optimal for most corners, with visible deviations traceable to specific obstacle avoidance or surface choices. Exit speed data confirms line quality — consistently near the maximum achievable for each section. LE score is 80+ terrain-normalised.

**Common Mistakes:**
- **Tunnel vision on the apex:** Advanced rider focuses so intently on hitting the apex that they ignore a surface hazard on the apex line. → The optimal line is safe optimal, not pure geometric optimal — surface hazards override geometry.
- **Optimising individual corners, losing section flow:** Rider optimises each corner perfectly but the transitions between corners are inefficient because they are not linking exit position to next entry. → Think in pairs: optimise the corner-to-corner link, not just each corner in isolation.

## 4. DIAGNOSTIC CUES (AI COACHING ENGINE REFERENCE)

### Visual Cues — Correct Technique
- Camera: rider enters corner from the outer edge of the available trail width
- Apex: front wheel reaches the inside of the corner at the late-apex point (approximately 60-70% through the corner)
- Exit: rider exits corner using the full outer trail width, allowing the arc to open up
- Exit speed: bike continues accelerating through and beyond the corner without correction
- Body position: rider's inside knee tracks toward the apex, weight balanced for the corner radius

### Visual Cues — Error Indicators
- Centre-track riding: rider never uses full trail width, stays in the middle throughout — visible from overhead or chase camera
- Early apex: bike reaches the inner edge of the trail before the midpoint of the corner — exit forces wide
- Running wide on exit: bike drifts to the outer edge of the trail early and continues beyond it — over-run
- Mid-corner brake event: visible front-end compression mid-corner indicates a line correction
- Repeated same-corner mistakes: same error pattern on the same corner across multiple laps

### Audio Cues
- Throttle roll-on beginning at corner apex: correct late-apex technique — engine note rises at the back half of the corner
- Throttle roll-on beginning at corner entry: early apex pattern — engine note rises too early in the corner arc
- Throttle reduction mid-corner: either a line correction or a traction event — either indicates a line or input error
- Consistent high exit engine note: good exit speed from correct line — positive indicator
- Brake sound (pads, tyre) mid-corner: late braking or line correction event — negative indicator

### Sensor Cues
- GPS trace: ridden line overlaid on satellite imagery — deviation from optimal line (theoretically computed) measured in metres
- Corner entry point: GPS latitude/longitude at turn-in — compared to optimal entry point
- Apex point: GPS closest point to inner corner boundary — compared to optimal apex point and timing
- Exit speed: GPS speed at defined exit marker — primary proxy for line quality without full trace
- Section time: GPS time through a defined section — improves with better line selection (combined with momentum metric)

## 5. COACHING CUES & LANGUAGE

### Positive Reinforcement
- "That line was clean — wide in, late apex, full exit width. I could see you setting up early and letting the corner come to you. Exit speed was excellent."
- "You're thinking two corners ahead now. Your exit position from corner one set you up perfectly for the entry to corner two. That's section-level thinking."
- "Perfect condition adaptation — you moved your line inward to stay on the dry surface. You sacrificed a small amount of geometry and gained traction and safety. Smart riding."

### Corrective Feedback
- "You're riding the middle of the trail. That's the smallest arc, the tightest radius, the most traction demand. Move to the outside on entry — give yourself a wider arc and you'll carry more speed for the same effort."
- "You're apexing early — I can see you get to the inside with half the corner still to go, and then you run wide on the exit. Wait longer before turning in. Make yourself wait until you can see where the corner goes."
- "You're braking mid-corner. That tells me your line put you in trouble — either too fast or too tight. Fix the line: wider entry and later apex gives you an exit that opens up rather than tightens, and you won't need to brake."
- "Your exit on that corner is putting you on the wrong side of the trail for the next corner's entry. Think ahead — where do you need to be after this corner to be set up for the next one?"

### Progression Prompts
- "Walk the corner before the next run. Physically stand at the entry point — as far outside as the trail allows — then walk to the apex, then to the exit. Feel the geometry of the line before you ride it."
- "This session, GPS is on. After each lap we're going to look at your line on screen. I want you to see the difference between where you're going and where the optimal line is. Then we adjust."
- "Pick one corner and dedicate the next 10 passes to it. Nothing else — just that corner, working the line. Entry position, apex timing, exit width. Repeat until it's perfect. Then move to the next corner."

## 6. DRILLS & PRACTICE EXERCISES

### Drill 1: The Cone Line Drill
**Purpose:** Make the optimal line physically visible and measurable for deliberate practice.
**Setup:** A corner or series of corners with room for cone placement. Place three cones: entry (wide side), apex (inside), exit (wide side).
**Execution:**
1. Ride through the cones at walking pace — get the line imprinted physically.
2. Increase speed each pass — front wheel must pass within 0.5m of each cone.
3. Focus on the timing of the apex cone: are you reaching it at the right point in the arc?
4. Remove the entry and exit cones — keep only the apex cone. Practice finding it without the guides.
5. Finally, remove all cones and replicate the line from feel and memory.
**Success Criteria:** Rider can replicate the cone-guided line consistently without cones present. Apex point is late and consistent across five passes.
**Duration/Reps:** 20 minutes, minimum 15 passes with cones, 10 passes without.
**Progression:** Move to a second corner type (decreasing radius). Then link two coned corners into a sequence.

### Drill 2: Exit Speed Measurement
**Purpose:** Use exit speed as a real-time feedback proxy for line quality.
**Setup:** A consistent corner with a 20m straight after the exit. Use GPS or a timing device to measure speed at the exit marker.
**Execution:**
1. Run the corner 10 times with normal technique. Record exit speed each time.
2. Deliberately adjust one variable: enter 1m wider on the next 5 runs. Record exit speed.
3. Adjust apex timing: wait 0.5 seconds longer before turning in on the next 5 runs. Record exit speed.
4. Combine both adjustments. Record exit speed.
5. Identify which combination produces the highest consistent exit speed.
**Success Criteria:** Rider achieves measurable improvement in exit speed (target: 5-10% increase) through deliberate line adjustment. Can replicate the fastest line consistently.
**Duration/Reps:** 25 runs total with systematic variable adjustment.
**Progression:** Apply the exit speed measurement approach to a different corner type. Then to a two-corner sequence.

### Drill 3: The Two-Corner Link
**Purpose:** Train section-level thinking by optimising the transition between consecutive corners.
**Setup:** Two consecutive corners with different directions — left-right or right-left combination.
**Execution:**
1. Run both corners treating each independently — optimise each without reference to the other.
2. Note the exit position from corner 1 and entry position for corner 2 — are they compatible?
3. Deliberately adjust the exit line of corner 1 to set up the optimal entry for corner 2.
4. Measure exit speed from corner 2 after the link adjustment — compare to the isolated approach.
5. Repeat until the link produces faster combined time than the isolated optimisation.
**Success Criteria:** Combined section time improves versus optimising each corner independently. Rider demonstrates conscious transition management.
**Duration/Reps:** 30 minutes, minimum 20 linked passes.
**Progression:** Add a third corner to the link. Then apply to a full trail section with five or more corners.

### Drill 4: GPS Line Review Session
**Purpose:** Use GPS trace playback to identify systematic line deviations and target them directly.
**Setup:** GPS device or phone with GPS app mounted. A trail loop with at least five corners.
**Execution:**
1. Ride three laps recording GPS trace.
2. Download and view GPS trace on a map overlay.
3. Identify the three corners where the ridden line deviates most from the theoretical optimal.
4. For each deviation, classify the error: early apex, centre-track, running wide?
5. Ride three more laps targeting only those three corners. Review GPS again — did the line improve?
**Success Criteria:** At least two of the three targeted corners show visible line improvement in the GPS trace on the second set of laps.
**Duration/Reps:** Six laps plus 20-minute review session.
**Progression:** Target the next three lowest-scoring corners. Progressively reduce systematic deviations across all corners.

## 7. CROSS-REFERENCES & DEPENDENCIES

**This topic connects to:**
- INTEL-01 (Terrain Reading and Line Selection): the underlying visual skill that enables optimal line identification
- CORNER-01 (Corner Fundamentals): the foundational technique that LE scores against
- METRIC-07 (Section Consistency Score): line efficiency and consistency are measured together in section analysis
- SENSOR-04 (GPS Data Analysis): GPS is the primary tool for precise LE measurement

**This topic is prerequisite for:**
- Advanced corner speed analysis: separating line-limited from traction-limited corner speed requires LE data
- Race line optimisation: competition line strategy requires LE as the baseline assessment

**This topic builds on:**
- INTEL-01 (Terrain Reading): visual identification of optimal line is the upstream skill
- CORNER-01 (Corner Technique Fundamentals): the cornering technique that LE evaluates

## 8. TERRAIN & CONTEXT VARIATIONS

### Singletrack Trail
On singletrack, the available width is narrow — often only 1-2m. The geometric optimisation range is limited but still important: even within narrow singletrack, staying outside then apexing inside then returning outside makes a meaningful difference to corner radius and exit speed. Line efficiency on singletrack is primarily about apex timing rather than lateral width.

### Wide Forest Road / Fire Road
With more width available, line efficiency gains are larger and more measurable. Entry and exit width can vary by 2-4m, making the radius difference significant at speed. GPS analysis is most informative on wide sections where the ridden line can diverge substantially from optimal.

### Muddy Conditions
Optimal line frequently shifts to follow existing tyre tracks (where the surface is rutted but predictable) rather than the geometric ideal. A rider who correctly follows the mud rut rather than attempting the geometric apex is making a good decision — LE scoring must recognise condition-appropriate line selection as correct.

### Rocky Technical
On rocky terrain, the optimal line is often the "clean" line — avoiding the most unstable or sharp rocks — rather than the geometric corner-racing line. Safety and obstacle avoidance override geometric optimisation. LE scoring on rocky sections should weight section completion and obstacle avoidance over pure geometric efficiency.

### Night Riding / Limited Visibility
Line efficiency decreases under limited visibility — riders cannot see the optimal line as clearly and take more conservative, centre-track lines. LE expectations should be adjusted downward for visibility-limited conditions. Training to improve lookahead even under limited visibility is a specific skill development area.

## 9. EXPERT INSIGHTS & SOURCES

### Key Insights
- **Enduro racing coaching** (Christophe Nambotin, Quinn Cody coaching material): "The fastest line is rarely the shortest line. A rider who takes an extra metre of entry width and carries twice the corner speed has won that exchange decisively."
- **Circuit racing geometry**: The late apex principle was formalised in circuit racing by performance driving coaches — Keith Code ("A Twist of the Wrist"), Carroll Smith, and others. The two-wheel off-road application is identical in principle, modified by the non-uniform surface width and obstacle placement constraints of trail riding.
- **Graham Jarvis on line selection in hard enduro**: "In extreme terrain, the line is everything. Sometimes the perfect line is a 2m detour around a rock that saves you a 10-second recovery. You have to see the big picture — the fastest point-to-point, not the prettiest corner line."
- **GPS coaching in rally**: Professional rally teams use GPS stage trace comparison as a primary coaching tool — comparing driver line against pace notes and fastest-driver reference lines. The same methodology applied to off-road motorcycle coaching represents a significant analytical capability.
- **Keith Code**: "A Twist of the Wrist" — the foundational text for corner line theory on two wheels, applicable to off-road with terrain modifications.
- **Bret Tkacs**: Regularly coaches that "most riders are riding in the middle of the trail, and the middle is the worst place to be for corners." The centre-track error is the most common line inefficiency across all ability levels.

### Sources & References
- Keith Code — "A Twist of the Wrist" volumes I and II — corner geometry fundamentals for two wheels
- Enduro GP coaching resources — line selection in varied terrain coaching methodology
- Graham Jarvis and Jonny Walker rider interviews — line selection in extreme terrain
- Professional rally team GPS coaching methodology — trace comparison and line analysis
- Bret Tkacs / ADVMotoSkills — trail width usage and corner line coaching
- Jimmy Lewis Off-Road Riding School — line selection and corner geometry for off-road
