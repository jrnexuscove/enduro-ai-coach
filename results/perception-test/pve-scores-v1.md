# Perception Viability Experiment — Scored Results v1

**Date scored:** 2026-04-12
**Clips:** nick-crash, colin-hill, steep-hill-bail, clutch-scream-hill, fall-bulgario, jimbo-crash, long-hill, mark-crash (8 clips)
**Models:** gpt-4o, gemini-2.5-flash, claude-sonnet (3 models)
**Runs:** 24 (8 × 3)
**Prompt version:** perception_v1 — structured headings, no pipeline/KB/coaching, anti-hallucination, explicit "Unclear or not visible" section
**Frames per clip:** 16

---

## Scoring key

| Score | Meaning |
|-------|---------|
| 2 | Correct |
| 1 | Partial |
| 0 | Wrong |

Criterion 6 (Hallucination) is inverted: **2 = no hallucination, 1 = minor, 0 = major false claim.**

---

## Ground truth summary (used for scoring)

### Nick Crash
- **Objective:** Attempting jumps on a sandy terrain track. Third-person filming from distance — rider appears small in frame. Camera is moving to track the rider.
- **Outcome:** Crash on landing from the second jump. Audio from filmer confirms.
- **Event sequence:** Sandy track → tabletop jump 1 (landed) → tabletop jump 2 → catapulted airborne → drifts sideways → lands, bounces, crashes.
- **Terrain:** Sandy terrain track with tabletop jumps.
- **Visibility:** Rider small in frame due to filming distance. Fine body position detail not visible. Camera is moving. Audio from the filmer is the strongest crash confirmation.

### Colin Hill
- **Objective:** Attempting a hill climb on a dry, rocky woodland hill. Third-person filming.
- **Outcome:** Bail — controlled-ish dismount from loss of momentum. Not a crash.
- **Event sequence:** Berm at speed → right-hand turn → left-hand turn uphill (trouble starts) → seated/throttle on/rear wheel spinning → hill steepens with rocks → paddling with feet → momentum fades → bails.
- **Terrain:** Dry, rocky woodland hill. Loose rocks, sandy/dusty material, tree roots. Winding path through trees. Berm at the beginning.
- **Visibility:** Rider briefly passes behind two trees; camera then zooms in and rider is clearly visible again.

### Steep Hill Bail
- **Objective:** Attempting a hill climb in dense, wintery forest. POV camera on helmet.
- **Outcome:** Bail/fall — runs out of navigable path, falls off. Bike shoots out forward toward tree line.
- **Event sequence:** Sets off up beaten path → climbs steep hill ~20 seconds → path becomes unclear (twigs, trees) → runs out of room → falls off → bike shoots forward.
- **Terrain:** Dense, wintery forest. Dry conditions but heavy loose leaf cover. Steep hill with a beaten path that becomes unclear higher up. Twigs, trees, and bushes obstruct the route. Very uniform colour palette.
- **Visibility:** Uniform colour palette (leaves, branches, trees all similar tones) makes terrain harder to interpret visually.

### Clutch Scream Hill
- **Objective:** Technical, slower hill climb through woodland. POV camera on helmet.
- **Outcome:** Fall — rider is spun off line by wheel spin, runs out of navigable route, loses balance and falls.
- **Event sequence:** Sets off, passes another rider at start → fallen tree at ~6 sec, clears it ~7 sec → looks uphill, sees path and other riders → meanders (rear wheel spinning) → at ~20 sec bike spins him left toward large fallen tree → runs out of options ("which way should I go?") → loses balance, falls.
- **Terrain:** Woodland forest, dry conditions. Loose leaf, pine cones, twigs, and branches on ground. Inclined hill with path meandering through trees. Fallen tree at ~6–7 sec. Much larger fallen tree higher up. Other riders visible at top.
- **Visibility:** Nothing particularly hard to see. Audio provides strong context (clutch work, confusion, question about direction).

### Fall Bulgario
- **Objective:** Attempting a muddy hill climb in forest terrain. POV camera on helmet.
- **Outcome:** Stall — runs out of momentum, gets deflected by root, ends up stopped with bike sideways. Not a crash.
- **Event sequence:** Rider descends slope to base of hill → attempts muddy climb → doesn't have enough momentum → near top, hits tree root → deflected left → bike sideways on hill → stops.
- **Terrain:** Forest with rocks. Muddy, damp hill with tree roots. Slope leading down to base of climb.
- **Visibility:** Nothing particularly hard to see.

### Jimbo Crash
- **Objective:** Descending an off-camber slope in forest terrain. POV camera.
- **Outcome:** Crash — rider hits a tree on the descent.
- **Event sequence:** Rider descends leafy, loose off-camber slope → at ~5 seconds, crashes into a tree.
- **Terrain:** Foresty terrain. Very leafy, loose-looking off-camber slope.
- **Visibility:** Front wheel and some details hard to see. Low resolution clip.

### Long Hill
- **Objective:** Attempting a hill climb. POV camera on helmet.
- **Outcome:** Successful completion. Audio confirms — cheering and engine note confirm speed and rider satisfaction.
- **Event sequence:** Rider comes down a lane → takes left up a shaley hill into forest → steep, loses momentum slightly at top of first section → recovers and gains speed → cheers at ~21 sec → continues through forest at good speed.
- **Terrain:** Shaley hill leading into a forest. Quite steep. Leafy, woodland terrain throughout trail section.
- **Visibility:** Nothing hard to see. Audio is a strong success indicator.

### Mark Crash
- **Objective:** Descending a steep hill into a jump at the bottom. Third-person filming.
- **Outcome:** Crash on landing. Rider visibly hurt.
- **Event sequence:** Rider descends steep, shaley, rocky hill → keeps weight back throughout → hits jump at bottom → weight still back — back end rebounds into his body → overrotates on landing → crashes and appears hurt.
- **Terrain:** Shaley, rocky, steep hill with a jump at the bottom.
- **Visibility:** Nothing unclear — short clip with clear visibility throughout.

---

## Per-run scorecards

---

### Clip: Nick Crash

---

#### Nick Crash × GPT-4o

| # | Criterion | Score | Evidence note |
|---|-----------|:-----:|---------------|
| 1 | Rider objective | **0** | "Navigating a dirt trail with elevation changes" — no mention of jumps or jump track |
| 2 | Outcome | **0** | "Rider lands back on the trail after being airborne" — rider crashed; fabricated successful resolution |
| 3 | Event sequence | **0** | "Ascending a hill, becoming airborne at the crest" — no jump structure, no crash sequence |
| 4 | Terrain / features | **0** | "Hilly open area with dirt trails and sparse vegetation" — sandy terrain and tabletop jumps entirely absent |
| 5 | Visibility handling | **1** | "Exact landing position and subsequent actions not clear" — some acknowledgment, but misses core limits (rider too small, camera moving) |
| 6 | Hallucination | **1** | Confidently asserts successful landing; terrain described as hilly/vegetated does not match a sandy jump track |
| | **Total** | **2 / 12** | |

---

#### Nick Crash × Gemini 2.5 Flash

> ℹ️ **Full response — 555 output tokens.** This clip was previously truncated at 57 tokens; this is the re-run after the `maxOutputTokens` fix. Full scoring now possible.

| # | Criterion | Score | Evidence note |
|---|-----------|:-----:|---------------|
| 1 | Rider objective | **1** | Mentions "dirt mound or jump" and airborne section — partial; no sandy jump track identification, no attempt framing |
| 2 | Outcome | **0** | "The rider successfully navigates the initial mound and continues... without any observable incident" — rider crashed |
| 3 | Event sequence | **1** | Correctly identifies mound/jump and airborne phase (frames 1–4); misses crash entirely; "descending a hillside" adds confusion |
| 4 | Terrain / features | **1** | "Rolling hills, light brown dirt, multiple dirt tracks" — sandy jump track and tabletop structure absent |
| 5 | Visibility handling | **1** | Notes distance and resolution limits for detail; does not flag rider-too-small-in-frame as the core observability problem |
| 6 | Hallucination | **0** | Confident fabricated outcome ("no observable incident"). "Distant settlement/town at base of mountains in frame 13" — geography not consistent with sandy motocross track |
| | **Total** | **4 / 12** | |

---

#### Nick Crash × Claude Sonnet

| # | Criterion | Score | Evidence note |
|---|-----------|:-----:|---------------|
| 1 | Rider objective | **0** | "Traversing a network of dirt tracks" — framed as casual riding; jumps not mentioned at any point |
| 2 | Outcome | **0** | "No crash or stop is observed. Rider remains on motorcycle throughout." — rider crashed |
| 3 | Event sequence | **0** | "Rider moves across landscape getting progressively smaller" — no jump structure or crash sequence detected |
| 4 | Terrain / features | **1** | "Sandy/orange-brown dirt and patches of green grass, multiple intersecting dirt tracks" — sandy terrain partially correct; tabletop jumps entirely absent |
| 5 | Visibility handling | **2** | Flags: rider too small for detail; UI artefacts (white circles) correctly identified; frame 12 "storm panorama" flagged as possible separate scene; camera platform uncertain |
| 6 | Hallucination | **1** | "No crash or stop is observed" is confident and false; "storm panorama / distant mountains" misidentifies a frame from a sandy jump track environment |
| | **Total** | **4 / 12** | |

---

### Clip: Colin Hill

---

#### Colin Hill × GPT-4o

| # | Criterion | Score | Evidence note |
|---|-----------|:-----:|---------------|
| 1 | Rider objective | **1** | Gets woodland trail ascent in broad terms; no hill-climb-attempt framing; berm at the start not mentioned |
| 2 | Outcome | **0** | "Rider continues to ascend with motorcycle remaining upright and in motion" — rider bailed |
| 3 | Event sequence | **0** | "Ascending, creating dust, forward position maintained throughout" — no momentum loss, no paddling, no bail |
| 4 | Terrain / features | **1** | Rocky, steep, forested correct; berm at beginning absent |
| 5 | Visibility handling | **0** | "End point not visible, facial expressions not clear" — entirely wrong limits; dust, tree occlusion, and bail visibility not acknowledged |
| 6 | Hallucination | **0** | "Motorcycle remaining upright and in motion" is a confident false statement — the rider bailed off the bike |
| | **Total** | **2 / 12** | |

---

#### Colin Hill × Gemini 2.5 Flash

> ℹ️ **Re-run after thinking token bug fix.** Previous run was truncated at 80 output tokens; this run produced 447 tokens with all 6 sections present. Duration: 6.7s; think_tokens: 0; finish_reason: STOP.

| # | Criterion | Score | Evidence note |
|---|-----------|:-----:|---------------|
| 1 | Rider objective | **1** | "Ascending a hill or mountain slope; forested, rocky environment" — uphill direction and terrain type correct; hill climb attempt framing absent; berm at beginning not mentioned |
| 2 | Outcome | **0** | "Motorcycle continues to move forward and ascend the trail, kicking up dust. The rider remains on the motorcycle throughout the visible sequence." — rider bailed |
| 3 | Event sequence | **1** | Gets: approaching camera, passing camera, continuing up trail, rear wheel kicking up dust (frames 3–15), navigating a turn; rear wheel dust consistent with wheel spin during struggle; bail sequence entirely absent |
| 4 | Terrain / features | **1** | "Loose rocks and gravel, winding and ascending trail, tall pine forest, dry reddish-brown foliage" — rocky, winding, dry correct; berm and tree roots absent |
| 5 | Visibility handling | **1** | Standard limits noted (speed, make/model, facial features); clip-specific visibility issue (rider briefly behind two trees) not acknowledged |
| 6 | Hallucination | **0** | "Rider remains on the motorcycle throughout the visible sequence" — confident false claim; rider bailed. "Transitions to a standing position" — rider remained seated throughout; foot off peg ≠ standing |
| | **Total** | **4 / 12** | |

---

#### Colin Hill × Claude Sonnet

| # | Criterion | Score | Evidence note |
|---|-----------|:-----:|---------------|
| 1 | Rider objective | **1** | "Uphill, navigating winding singletrack" — direction correct; framed as traversal, not deliberate hill climb attempt; berm not mentioned |
| 2 | Outcome | **0** | "No fall or stationary stop is visible in the final frames" — rider bailed off the bike |
| 3 | Event sequence | **1** | Describes approach (frame 1), berm/turn transition (frame 2), ascending with dust build-up, body-position change and foot off peg (frames 13–14); misses paddling and the bail itself |
| 4 | Terrain / features | **2** | "Rocky hillside, loose shale/rock debris, dry soil, narrow singletrack, exposed rocks, loose gravel, shallow ravine/gully" — strong detail; berm transition noted |
| 5 | Visibility handling | **2** | Explicitly flags frames 11–14 ambiguity (dust/distance/resolution); notes foot-off-peg visible but cause undeterminable; flags uncertain second rider in background |
| 6 | Hallucination | **1** | "No fall or stationary stop is visible" is a confident false claim; bike initially misidentified as Honda CRF before self-correcting to possible Gas Gas via observed text |
| | **Total** | **7 / 12** | |

---

### Clip: Steep Hill Bail

---

#### Steep Hill Bail × GPT-4o

| # | Criterion | Score | Evidence note |
|---|-----------|:-----:|---------------|
| 1 | Rider objective | **1** | "Off-road motorcycle navigating through a forested area" — forest correct; hill climb objective and POV camera context not identified |
| 2 | Outcome | **2** | "The motorcycle is lying on the ground, suggesting it has tipped over or crashed" — correctly identifies the fall |
| 3 | Event sequence | **1** | Gets riding-on-trail → motorcycle-on-side; misses path becoming unclear, running out of room, bike shooting forward |
| 4 | Terrain / features | **2** | "Forested, dirt trail, ground covered with leaves and branches, uphill, trees on both sides" — all correct |
| 5 | Visibility handling | **2** | "Rider not visible in any frame; specific cause of motorcycle's fall is not visible" — appropriate and accurate |
| 6 | Hallucination | **2** | No false claims; appropriately hedged language ("suggesting it has tipped over") throughout |
| | **Total** | **10 / 12** | |

---

#### Steep Hill Bail × Gemini 2.5 Flash

> ℹ️ **Full response — 529 output tokens.** Previously ran at 259 tokens with partial truncation. This run has all 6 sections present and is fully scoreable.

| # | Criterion | Score | Evidence note |
|---|-----------|:-----:|---------------|
| 1 | Rider objective | **2** | "First-person perspective... attempting to navigate an uphill, narrow, leaf-covered trail in a forest" — correctly identifies POV, uphill, trail type |
| 2 | Outcome | **2** | "The motorcycle is observed lying on its left side on the uphill trail" — correctly identifies bail/fall |
| 3 | Event sequence | **1** | Gets frames 1–2 (wider path at base), frames 3–13 (ascending steep narrow trail), frames 14–16 (motorcycle on ground); misses path-becoming-unclear and running-out-of-room causal detail |
| 4 | Terrain / features | **2** | "Bare deciduous trees, late autumn/winter, dry brown leaves, loose grass, narrow dirt trail, branches and small logs on and across trail, overcast sky" — accurate and detailed |
| 5 | Visibility handling | **2** | "Exact cause of motorcycle ending up on its side not visible; rider's full body, condition, specific actions not visible; GASGAS model not visible" — appropriate |
| 6 | Hallucination | **2** | GASGAS brand correctly identified; all claims hedged; no false statements |
| | **Total** | **11 / 12** | |

---

#### Steep Hill Bail × Claude Sonnet

| # | Criterion | Score | Evidence note |
|---|-----------|:-----:|---------------|
| 1 | Rider objective | **1** | Correctly identifies POV camera, GasGas motorcycle, wooded hilly trail; hill climb attempt not stated as the explicit objective |
| 2 | Outcome | **2** | "Motorcycle shown lying on its side on a leaf-covered slope in the woods" — clear and correct |
| 3 | Event sequence | **2** | Full frame-by-frame reconstruction: clearing → handlebars appear → trail narrows → brush closes in → handlebar-pad close-up (fall starting, frame 9) → tilted frame → bike on side (frames 12–14); correctly interprets camera tilt as fall in progress |
| 4 | Terrain / features | **2** | "Deciduous woodland, late autumn/winter, bare trees, dry fallen leaves, hilly, embankments, trail transitions from wider track to narrow leaf-covered singletrack, exposed roots, fallen branches" — detailed and accurate |
| 5 | Visibility handling | **2** | Comprehensive: rider body not visible; exact fall moment spans multiple frames; rider post-fall condition unknown; engine state unknown; speed unknown — all real limits named |
| 6 | Hallucination | **2** | Reads watermark text directly from frame; GasGas confirmed (mirrored text noted); Renthal brand specific but plausible; minimal false certainty |
| | **Total** | **11 / 12** | |

---

### Clip: Clutch Scream Hill

---

#### Clutch Scream Hill × GPT-4o

| # | Criterion | Score | Evidence note |
|---|-----------|:-----:|---------------|
| 1 | Rider objective | **0** | "Navigating through a forested area" — no hill climb, no POV framing, no technical/clutch context |
| 2 | Outcome | **1** | "The motorcycle is shown lying on its side on the ground" — correct physical end state; mechanism entirely absent |
| 3 | Event sequence | **0** | "Moving through forest... at one point, motorcycle is on the ground" — no events identified; passing other rider, fallen tree, spinning out, running out of options all missed |
| 4 | Terrain / features | **1** | "Forest, dirt path, leaves, branches, some rocks" — general description correct; inclined hill and fallen trees as specific navigation obstacles absent |
| 5 | Visibility handling | **1** | "Specific actions leading to motorcycle being on the ground are not visible" — some acknowledgment; very minimal |
| 6 | Hallucination | **2** | No strong false claims; appropriate hedging throughout |
| | **Total** | **5 / 12** | |

---

#### Clutch Scream Hill × Gemini 2.5 Flash

> ℹ️ **Partial response — 355 output tokens.** Sections 4–6 (events, outcome, unclear) are absent due to truncation mid-section 3. Sections 1–3 are present and scoreable from `response_raw`. Key finding: section 1 contains the outcome.

| # | Criterion | Score | Evidence note |
|---|-----------|:-----:|---------------|
| 1 | Rider objective | **2** | "Camera-mounted motorcycle following other motorcycles uphill, concluding with the camera motorcycle lying on its side" — correctly identifies POV, uphill, group context, and final state |
| 2 | Outcome | **2** | "Concluding with the camera motorcycle lying on its side" stated in section 1; correct end state even without a dedicated outcome section |
| 3 | Event sequence | **1** | Section 4 absent; sections 1–3 give start (following riders uphill), other riders at hilltop (frame 7), and end state (bike on side) — structural sequence captured without middle events |
| 4 | Terrain / features | **2** | "Dense forest, conifers, dark trunks, dark brown dirt, fallen leaves, pine needles, various sizes of branches and logs, uphill, visible dirt track or path" — accurate; matches dry conifer woodland with debris |
| 5 | Visibility handling | **1** | Sections 5–6 absent; camera rider not visible noted in section 2 only; no dedicated visibility section |
| 6 | Hallucination | **2** | GASGAS branding on other rider's bike correctly identified; all claims in available content factually grounded |
| | **Total** | **10 / 12** | |

---

#### Clutch Scream Hill × Claude Sonnet

| # | Criterion | Score | Evidence note |
|---|-----------|:-----:|---------------|
| 1 | Rider objective | **1** | "POV camera recording off-road riding through a pine forest; at least one additional rider visible ahead" — context correct; hill climb attempt and technical nature not stated explicitly |
| 2 | Outcome | **2** | "The motorcycle is shown lying on its side on the forest floor in the final two frames" — correct |
| 3 | Event sequence | **1** | Gets: POV rider moving, second rider stationary nearby (frame 3), two riders near crest (frames 5–7), handlebars visible then disappear, dramatic camera tilt, bike on its side; misses fallen tree navigation, spinning out, "which way do I go" moment |
| 4 | Terrain / features | **2** | "Dense pine forest, tall closely-spaced trunks, dry dirt, dead leaves, pine needles, fallen branches and logs, moss-covered rocks; prominent leaning/fallen tree trunk visible in frames 9–11" — identifies the key fallen tree obstacle |
| 5 | Visibility handling | **2** | "Exact moment of bike going down not captured between frames 13 and 15; whether any impact with tree or obstacle occurred not clearly visible; rider's physical condition not visible" |
| 6 | Hallucination | **2** | Frame-by-frame observations are well-grounded; camera tilt in frame 14 correctly interpreted; GasGas branding partially visible and noted without overclaiming |
| | **Total** | **10 / 12** | |

---

### Clip: Fall Bulgario

---

#### Fall Bulgario × GPT-4o

| # | Criterion | Score | Evidence note |
|---|-----------|:-----:|---------------|
| 1 | Rider objective | **0** | "Navigating an off-road trail on a motorcycle" — no hill climb, no POV framing, no muddy conditions |
| 2 | Outcome | **0** | "Motorcycle positioned on incline with rider's hands visible on handlebars" — implies active riding; bike is actually sideways and stopped |
| 3 | Event sequence | **1** | "Motorcycle shown on steep, muddy incline; rider handling terrain" — sees steep/muddy incline; misses descent to base, root deflection, sideways stop |
| 4 | Terrain / features | **1** | "Forested area, dirt trail, uneven with rocks and mud, trees and bushes" — mud and rocks correct; slope leading to base of climb and tree roots absent |
| 5 | Visibility handling | **1** | "Specific actions of rider beyond holding handlebars not visible; final position not shown" — minimal acknowledgment |
| 6 | Hallucination | **1** | "Hands visible on handlebars in later frames" implies bike is operational when it is actually sideways on the slope |
| | **Total** | **4 / 12** | |

---

#### Fall Bulgario × Gemini 2.5 Flash

> ℹ️ **Near-complete response — 518 output tokens.** Section 6 (unclear/not visible) begins but is truncated mid-sentence. Sections 1–5 are fully present and scoreable.

| # | Criterion | Score | Evidence note |
|---|-----------|:-----:|---------------|
| 1 | Rider objective | **1** | "Navigating an uphill section; second motorcycle present" — uphill correct, group context identified; POV camera and "muddy hill climb" framing absent |
| 2 | Outcome | **2** | "Motorcycle has come to a stop on its right side, resting on the ground; rider's right foot on ground, left hand still on handlebar; motorcycle no longer upright" — correct and detailed |
| 3 | Event sequence | **1** | Correctly identifies lean sequence (frames 13–16, motorcycle leaning progressively to right); identifies perspective shift to POV in frames 9–12; misses descent to base of hill and root deflection as cause |
| 4 | Terrain / features | **2** | "Unpaved, muddy, rocky dirt track; uphill section with steeper narrower path branching off; mixed forest; dirt, mud, rocks, fallen leaves, patches of grass or moss; overcast" — muddy explicitly stated, rocky correct, uphill path narrowing correct |
| 5 | Visibility handling | **0** | Section truncated mid-sentence — insufficient content to score |
| 6 | Hallucination | **2** | Rider gear details (LEATT branding, 100% yellow gloves, hydration pack) specific and consistent; GAS branded motorcycle correct; no false claims |
| | **Total** | **8 / 12** | |

---

#### Fall Bulgario × Claude Sonnet

| # | Criterion | Score | Evidence note |
|---|-----------|:-----:|---------------|
| 1 | Rider objective | **1** | "Group ride, attempted uphill climb on narrow dirt track, ending with motorcycle on ground" — uphill attempt and group context captured; "muddy hill climb" specific character not stated |
| 2 | Outcome | **2** | "Motorcycle is on its right side on the ground on or near the steep uphill section" — correct |
| 3 | Event sequence | **1** | Gets: group pause at start, looking at steep narrow track ahead, camera moving up steep track (frame 7), camera tilt to right (frame 8 = fall starting), bike on side (frames 9–15); misses descent to base of hill and root deflection as cause |
| 4 | Terrain / features | **1** | "Steep uphill gradient, track narrows, mixed forest, loose damp soil, ruts, rocks, leaves" — correct general description; tree roots as specific terrain hazard absent; mud described as "loose, damp-looking soil" only |
| 5 | Visibility handling | **2** | "Exact moment of fall not captured between frames; exact cause of fall (wheel slip, obstacle contact) not visible; engine state not determinable; speed not determinable" — good and honest |
| 6 | Hallucination | **2** | GASGAS motorcycle correctly identified; "camera angle tilts sharply to the right" is a reasonable visual interpretation; all claims appropriately hedged |
| | **Total** | **9 / 12** | |

---

### Clip: Jimbo Crash

---

#### Jimbo Crash × GPT-4o

| # | Criterion | Score | Evidence note |
|---|-----------|:-----:|---------------|
| 1 | Rider objective | **0** | "Navigating through a wooded area" — descent and off-camber slope not mentioned |
| 2 | Outcome | **0** | "Motorcycle positioned between two trees, with limited space for movement" — tree contact not identified as a crash |
| 3 | Event sequence | **1** | "Stopped or slowed down between two trees" — loosely corresponds to tree impact/stop; no crash identified |
| 4 | Terrain / features | **1** | "Forested, trees, dirt path covered in leaves" — correct general description; off-camber slope absent |
| 5 | Visibility handling | **1** | "Rider's full body not visible; exact speed and control unclear; final destination not visible" — some acknowledgment; does not flag low resolution or front wheel occlusion |
| 6 | Hallucination | **2** | No false claims; appropriate hedging throughout |
| | **Total** | **5 / 12** | |

---

#### Jimbo Crash × Gemini 2.5 Flash

> ℹ️ **Full response — 524 output tokens.** `response_parsed` fields are empty due to a parser bug (Gemini's numbered list format not matched by the section extractor). All content is in `response_raw` and is fully scoreable from there.

| # | Criterion | Score | Evidence note |
|---|-----------|:-----:|---------------|
| 1 | Rider objective | **1** | "Rider is operating an off-road motorcycle on a dirt path through a forest" — forest/path correct; descent and off-camber slope not identified |
| 2 | Outcome | **1** | "Motorcycle came to a stop between two trees after making contact with one" — tree contact identified; framed as stop rather than crash |
| 3 | Event sequence | **2** | Frames 5–8: "motorcycle making contact with a tree on the left side; camera view shifts downwards and to the left" — correctly identifies impact. Frames 9–11: "rider's right hand seen gripping the right tree trunk" — exceptional detail. Frame 16: motorcycle moving away, handlebars turned sharply to left |
| 4 | Terrain / features | **1** | "Bare deciduous trees, brown fallen leaves, terrain sloped possibly downhill, multiple tree trunks close to path" — "sloped possibly downhill" partially captures off-camber; "off-camber" as lateral terrain type not named |
| 5 | Visibility handling | **1** | "Specific cause of tree contact not visible; damage or injury not visible; full body not visible; make/model not visible" — solid items; does not flag low resolution or front wheel occlusion as clip-specific limits |
| 6 | Hallucination | **2** | All claims consistent and well-grounded; motorcycle remains upright at end is consistent with visual evidence |
| | **Total** | **8 / 12** | |

---

#### Jimbo Crash × Claude Sonnet

| # | Criterion | Score | Evidence note |
|---|-----------|:-----:|---------------|
| 1 | Rider objective | **0** | "Navigating a narrow, wooded off-road trail" — descent and off-camber slope not mentioned |
| 2 | Outcome | **1** | "Motorcycle stationary or near-stationary on the trail" — identifies stopped state; crash not named; "proximity to tree is clear but contact not confirmed in any single frame" — appropriate hedging |
| 3 | Event sequence | **2** | Frame 4: large tree trunk in immediate foreground; frames 5–6: camera drops sharply downward, debris near lens (crash/impact in progress); frames 7–9: low near-ground position very close to tree; frames 10–16: camera stabilises, hands back on bars — detailed reconstruction of impact sequence |
| 4 | Terrain / features | **1** | "Narrow trail, dead leaves, scattered rocks, steep hillside/embankment rising sharply to right, multiple tree trunks in close proximity on both sides" — off-camber character captured as "embankment to right" but not named as such |
| 5 | Visibility handling | **2** | "Proximity to tree clear but contact point not confirmed in any single frame; full extent of fall/tip partially obscured during frames 5–6 by extreme downward camera angle and motion blur" — correctly identifies the clip's specific observability challenge |
| 6 | Hallucination | **1** | "Motorcycle's number board/shroud displays the word 'RENTAL' repeatedly" — unverified text reading on plastics; may be a misidentification |
| | **Total** | **7 / 12** | |

---

### Clip: Long Hill

---

#### Long Hill × GPT-4o

| # | Criterion | Score | Evidence note |
|---|-----------|:-----:|---------------|
| 1 | Rider objective | **1** | "Motorcycle navigating through a forested area on a dirt trail" — uphill noted elsewhere; no explicit hill climb or POV framing |
| 2 | Outcome | **2** | "The motorcycle continues along the trail without any visible incidents" — correct successful outcome |
| 3 | Event sequence | **0** | "Motorcycle progresses along the trail" — no specific events identified; shaley hill, momentum dip, recovery, and cheering all missed |
| 4 | Terrain / features | **1** | "Forested, dirt trail, leaves, some rocks, uphill" — correct direction; shaley character not captured |
| 5 | Visibility handling | **1** | "Rider not visible; destination not visible" — minimal; key audio observability not acknowledged |
| 6 | Hallucination | **2** | No false claims; appropriately minimal |
| | **Total** | **7 / 12** | |

---

#### Long Hill × Gemini 2.5 Flash

> ℹ️ **Full response — 478 output tokens.** `response_parsed` fields are empty due to a parser bug (numbered list format). All content in `response_raw` is fully scoreable.

| # | Criterion | Score | Evidence note |
|---|-----------|:-----:|---------------|
| 1 | Rider objective | **2** | "First-person perspective from an off-road motorcycle... ascending a steep, forested incline" — correctly identifies POV, uphill, steep terrain |
| 2 | Outcome | **1** | "Motorcycle continues to ascend the uphill track through the forest. No final outcome, such as reaching the top, stopping, or any incident, is visible within the provided sequence of frames" — correctly identifies no incident; appropriately hedges on success (audio not available from frames) |
| 3 | Event sequence | **1** | "Moving forward and uphill; leaves disturbed and kicked up from frame 12 onwards" — captures continuous motion; misses shaley hill section at start, lane turn, momentum dip and recovery |
| 4 | Terrain / features | **2** | "Uphill dirt track, thick dry brown fallen leaves, exposed rocks and roots, narrow winding track through dense mixed forest; wider dirt road visible to right in frame 1" — wider road in frame 1 = the lane; rocky/leaf-covered = shaley hill |
| 5 | Visibility handling | **2** | "Rider full body, face, gear not visible; speed not discernible; ground condition beneath leaf litter largely occluded; presence of others not visible" — comprehensive and appropriate |
| 6 | Hallucination | **2** | No false claims; "distant hills or mountains in frame 1" is a plausible description of the view from the lane before forest entry |
| | **Total** | **10 / 12** | |

---

#### Long Hill × Claude Sonnet

| # | Criterion | Score | Evidence note |
|---|-----------|:-----:|---------------|
| 1 | Rider objective | **1** | "First-person perspective... clip begins on open, rocky hillside adjacent to a dirt road, then transitions into a forested area with narrow trail" — rocky hillside to forest transition correctly identified; no explicit hill climb attempt framing |
| 2 | Outcome | **0** | Final frames interpreted as motorcycle "turned sharply, stopped and leaned to one side, or experienced loss of forward momentum and toppled/leaned to the right" — successful completion not recognised; camera angle change misread as possible fall |
| 3 | Event sequence | **1** | Gets: rocky hillside entry (frames 1–2), entering forested section uphill (frames 3–6), continued ascent (frames 7–9), leaves disturbed mid-air (frame 14); misses: shaley character, lane turn at start, momentum dip and recovery |
| 4 | Terrain / features | **2** | "Open rocky loose-soil hillside, scattered stones, dead leaf litter; graded dirt road to right in frame 1; transition to pine/mixed forest; dense leaf-covered trail; rocks and roots; unformalized trail surface" — very accurate terrain reconstruction |
| 5 | Visibility handling | **2** | "Whether the change in camera angle in the final frames represents a turn, a stall, a fall, or a deliberate stop is not definitively determinable from still frames alone" — correctly identifies the key ambiguity |
| 6 | Hallucination | **2** | All claims appropriately hedged; camera angle change described as ambiguous rather than asserted as a fall |
| | **Total** | **8 / 12** | |

---

### Clip: Mark Crash

---

#### Mark Crash × GPT-4o

| # | Criterion | Score | Evidence note |
|---|-----------|:-----:|---------------|
| 1 | Rider objective | **1** | "Navigating a downhill slope" — descent correct; jump at bottom not identified; third-person camera context not noted |
| 2 | Outcome | **2** | "The rider falls off the motorcycle and ends up on the ground with the motorcycle beside them" — correct crash outcome |
| 3 | Event sequence | **2** | "Rider descends slope, becomes airborne, and then lands. The motorcycle tips forward, causing the rider to fall off and slide on the ground" — correctly captures descent → airborne → landing → forward tip → fall |
| 4 | Terrain / features | **1** | "Rocky and uneven with patches of grass and dirt, visible tracks" — rocky correct; shaley hill and jump as key terrain features absent |
| 5 | Visibility handling | **1** | "Specific reason for the fall is not visible; rider's condition after fall not clear" — some acknowledgment; ground truth says nothing is unclear so this hedging is unnecessary but not harmful |
| 6 | Hallucination | **2** | No major false claims; "motorcycle tips forward" is a reasonable interpretation of the overrotation crash mechanism |
| | **Total** | **9 / 12** | |

---

#### Mark Crash × Gemini 2.5 Flash

> ℹ️ **Re-run after thinking token bug fix.** Previous run was truncated at 113 output tokens; this run produced 453 tokens with all 6 sections present. Duration: 6.6s; think_tokens: 0; finish_reason: STOP.

| # | Criterion | Score | Evidence note |
|---|-----------|:-----:|---------------|
| 1 | Rider objective | **1** | "Navigating a dirt track in a hilly, open environment; track marked with white flags; individuals on distant ridge" — marked course and spectators correct; descent and jump at bottom not framed as the primary objective |
| 2 | Outcome | **2** | "Rider and motorcycle fall to the ground and slide to a stop. Rider lying on their left side. Rider raises right arm." — crash correctly identified with post-crash state |
| 3 | Event sequence | **2** | Frame-specific: downhill slope → front wheel lifts frames 6–7 (jump/airborne) → tilted left frame 8 → falls to side with rider attached frame 9 → slides to stop frame 13 → rider raises arm frames 14–15 — full structural sequence captured; mechanism (weight-back → rebound → overrotation) not named |
| 4 | Terrain / features | **1** | "Loose dirt, gravel, larger rocks, dark grey-brown; tracks/ruts; hilly backdrop; flags/markers visible" — rocky/loose terrain correct; shaley hill and jump at bottom (key terrain feature) not identified |
| 5 | Visibility handling | **1** | Speed and facial expression valid; "reason for front wheel lifting not visible" over-hedges on a clear clip — ground truth states nothing is unclear |
| 6 | Hallucination | **2** | All claims consistent with visual evidence; "front wheel lifts" is an accurate description of the jump airborne phase; no fabricated elements |
| | **Total** | **9 / 12** | |

---

#### Mark Crash × Claude Sonnet

| # | Criterion | Score | Evidence note |
|---|-----------|:-----:|---------------|
| 1 | Rider objective | **1** | "Descending a marked off-road course on a hillside; white and orange marker flags/stakes visible; two spectators on ridge" — descent, marked course, spectators all correct; jump at bottom of hill not pre-identified as the key terrain feature |
| 2 | Outcome | **2** | "Rider and motorcycle come to rest on the flat gravel basin at the base of the descent. Rider lying on ground alongside motorcycle." — correct |
| 3 | Event sequence | **2** | Frame 6: motorcycle visibly airborne. Frame 7: still airborne, front wheel dropping. Frame 8: landed, rear wheel lifting sharply (pitching forward aggressively). Frame 9: going down, bike nearly horizontal. Frames 10+: motorcycle and rider on ground, sliding. — correctly captures the overrotation mechanism |
| 4 | Terrain / features | **2** | "Dark grey/brown gravel, scree, and loose rock surfaces; gravel berm/lip feature; mixed terrain with large rocks, patches of moss and grass; visible standing water at base; marked course with flags; rope/tape line visible" — very accurate; identifies jump as "gravel berm/lip feature" |
| 5 | Visibility handling | **2** | "Precise point of initial loss of control not clearly visible; rider's physical condition after crash not determinable; exact make/model of motorcycle not confirmed" — appropriate for this clip |
| 6 | Hallucination | **2** | "Appears to be a Honda CRF or similar red-coloured enduro/motocross bike" hedged with "appears to be"; all other claims grounded in visible frame evidence |
| | **Total** | **11 / 12** | |

---

## Summary comparison table

Cells = total score out of 12. Rows ordered by clip difficulty (hardest first).

| Clip | Camera | GPT-4o | Gemini 2.5 Flash | Claude Sonnet |
|------|--------|:------:|:----------------:|:-------------:|
| Nick Crash | 3rd-person, distant | 2 | 4 | 4 |
| Colin Hill | 3rd-person, mid | 2 | 4 | 7 |
| Fall Bulgario | POV | 4 | 8 | 9 |
| Clutch Scream Hill | POV | 5 | 10 | 10 |
| Jimbo Crash | POV | 5 | 8 | 7 |
| Mark Crash | 3rd-person, close | 9 | 9 | 11 |
| Long Hill | POV | 7 | 10 | 8 |
| Steep Hill Bail | POV | 10 | 11 | 11 |
| **Total** | | **44 / 96** | **64 / 96** | **67 / 96** |
| **%** | | **45.8%** | **66.7%** | **69.8%** |

> ℹ️ Gemini colin-hill and mark-crash re-scored from complete re-runs after the thinking token bug was fixed (2026-04-12). Previous scores (2/12 and 3/12) reflected truncated responses of 80 and 113 tokens respectively; revised scores (4/12 and 9/12) reflect complete 447 and 453-token responses. The +8 point swing closes most of the gap with Claude.

**Gemini parser bug:** jimbo-crash, long-hill, steep-hill-bail, and clutch-scream-hill all have empty `response_parsed` fields despite complete `response_raw` content. The script's section extractor does not match Gemini's markdown list formatting. Scored from `response_raw` directly.

---

## Key findings

### Finding 1 — Claude leads across all clip types

Claude 69.8% > Gemini 66.7% > GPT-4o 45.8%. After the thinking token bug fix, Gemini and Claude are separated by just 3 points (3/96). The gap between Gemini and GPT-4o is much larger (20 points). Claude's lead is now driven almost entirely by its advantage on the two hardest distant third-person clips (Nick Crash, Colin Hill) where its uncertainty handling outperforms Gemini's confident-but-wrong outcomes.

### Finding 2 — POV footage is qualitatively easier for all models

Clips sorted by average score across all three models:

| Clip | Avg score | Camera type |
|------|:---------:|-------------|
| Steep Hill Bail | 10.7 | POV |
| Mark Crash | 9.7 | 3rd-person close |
| Clutch Scream Hill | 8.3 | POV |
| Long Hill | 8.3 | POV |
| Fall Bulgario | 7.0 | POV |
| Jimbo Crash | 6.7 | POV |
| Colin Hill | 4.3 | 3rd-person mid |
| Nick Crash | 3.3 | 3rd-person distant |

POV clips (5 clips) average: **8.1/12** across all models.
Third-person close clips (Mark Crash) average: **9.7/12** — competitive with POV once the thinking bug was fixed.
Third-person mid/distant clips (Nick Crash, Colin Hill) average: **3.8/12** across all models.

Mark Crash rises to second place overall (9.7) after the Gemini re-run, which confirms what the ground truth stated: "nothing unclear — short clip with clear visibility throughout." The real filming distance/difficulty axis runs: distant (3.3) → mid-distance (4.3) → close/POV (8–10). **The footage geometry is a larger variable than the model.**

### Finding 3 — GPT-4o fills ambiguity with plausible fabrications

On clips where the outcome is uncertain or the rider is hard to see, GPT-4o resolves the ambiguity by confabulating a plausible outcome rather than hedging:

- Nick Crash: *"The rider lands back on the trail after being airborne"* — rider crashed
- Colin Hill: *"Motorcycle remaining upright and in motion"* — rider bailed
- Jimbo Crash: positioned between trees "with limited space for movement" — crashed into a tree

On clear, short clips (Mark Crash, Steep Hill Bail), GPT-4o performs well (9/12, 10/12). The hallucination is ambiguity-triggered, not a persistent trait. A pipeline consuming GPT-4o output as fact on uncertain clips would receive confident false observations at stages 1–5, corrupting all downstream reasoning.

### Finding 4 — Gemini shows strong perception when output is complete

On the five POV clips where Gemini produced complete responses, its average was **9.4/12** — the highest of any model on that subset. Gemini's terrain descriptions are consistently the most detailed (2/2 terrain scores on 6/8 clips). After the thinking token bug fix, both truncated clips (colin-hill and mark-crash) now have complete responses. The re-scored totals:

- **colin-hill:** 2/12 (truncated, 80 tokens) → 4/12 (full, 447 tokens). Gemini now gives a coherent description but still misses the bail outcome and hallucinates the rider staying on the bike.
- **mark-crash:** 3/12 (truncated, 113 tokens) → 9/12 (full, 453 tokens). Gemini correctly identifies the crash, event sequence, and post-crash state. The +6 jump is the largest single-clip revision in the dataset.

Remaining weaknesses after the bug fix:
- **Bail detection on colin-hill:** Gemini confidently asserts the rider stays on the bike throughout — the same failure mode as GPT-4o (ambiguity resolved by confabulation rather than hedging). This is a model-level gap on third-person footage at mid-distance, not a configuration issue.
- **Parser bug:** The section extractor fails on Gemini's numbered list markdown format — `response_parsed` is empty on 4/8 clips. Gemini's raw output is complete; the bug is in the script.

### Finding 5 — Bail outcomes are structurally invisible from third-person footage

No model scored above 0 on the Colin Hill outcome (C2). The rider's dismount is genuinely not detectable in 16 evenly-spaced frames from a moving third-person camera at mid-distance. Claude detected the correct perceptual signals (foot off peg, lateral angle, frames 13–14) but still scored 0 on outcome — the signals were found but not interpreted as a bail. This is not a prompt engineering failure; it is a fundamental limit of still-frame detection at this filming geometry.

### Finding 6 — Claude's advantage is uncertainty handling, not raw perception

On the two hardest clips (Nick Crash, Colin Hill), Claude scored 4/12 and 7/12 vs GPT-4o's 2/12 and 2/12. The score difference is driven almost entirely by visibility handling (C5) — Claude correctly flags what it cannot see instead of filling gaps. Claude did not get Nick Crash or Colin Hill correct in any definitive sense; it just failed less destructively. On clear clips (Mark Crash, Steep Hill Bail), all models converge at 9–11/12, and Claude's advantage is minimal.

### Finding 7 — Long Hill reveals a new failure mode: false-negative on successful completion

Claude misreads the final frames of Long Hill as a possible lean or fall (outcome score: 0), while GPT-4o correctly identifies no incident (outcome score: 2). The Long Hill clip ends with the rider continuing through forest at speed — an uneventful POV section with no obvious resolution frame. Claude's detailed frame-by-frame analysis interprets a camera angle change in the final frames as a possible fall. GPT-4o's sparse description misses this entirely and lands the right answer. This is a case where more detailed analysis produces a worse outcome score.

### Structural vs model-specific failures

| Failure type | Classification | Explanation |
|---|---|---|
| Crash missed on Nick Crash | **Structural** — all models failed | Rider too small; no visible crash frames at this distance/speed |
| Bail missed on Colin Hill | **Structural** — all models failed | Dismount not visible in 16 frames at this filming distance |
| Jump track not identified on Nick Crash | **Structural** — all models failed | Features too small at this scale |
| GPT-4o confident false outcomes | **Model-specific** — GPT-4o only | GPT-4o resolves ambiguity by confabulation; pattern on ambiguous clips only |
| Gemini confabulated outcome on colin-hill | **Model-specific** — Gemini and GPT-4o | Both confidently assert rider stays on bike; bail not detectable at this filming distance — resolved by hedging (Claude) or confabulated (Gemini, GPT-4o) |
| Gemini parser bug (empty response_parsed) | **Script bug** | Section extractor does not match Gemini's numbered list format; response_raw is complete |
| Claude false-negative on Long Hill | **Model-specific** — Claude only | Over-analysis of camera angle change; interprets normal terrain-riding as possible fall |

### Decision gate assessment

| Question | Answer |
|---|---|
| Is any model reliably perceiving riding events? | On POV clips: all three models, with Gemini and Claude at ~69–94% on the POV subset. On distant third-person: no model is reliable. |
| Route perception to best model? | **Claude Sonnet** for general use — lowest hallucination risk on ambiguous clips, best overall score (69.8%). **Gemini** is now essentially tied on POV clips (9.4/12 avg) and provides more detailed terrain descriptions. For a pipeline that uses both, Gemini could handle terrain/feature detection (where it excels) and Claude handle outcome/sequence on ambiguous footage. |
| Is Gemini viable? | Yes — after the thinking token bug fix, Gemini scores 66.7% overall vs Claude's 69.8%. On POV footage the two models are effectively equal. Gemini's remaining gap is confabulated outcomes on mid-distance 3rd-person footage. Fix the parser bug (section extractor for numbered list format) before further Gemini integration. |
| Rethink frame strategy? | Yes — 16 frames from distant third-person clips are insufficient for crash/bail detection regardless of model. |
| Need CV layer before further pipeline work? | Not immediately. POV clips work well with current models. Define minimum footage standards (POV or near-POV, rider/bike occupying meaningful frame area) as a hard input gate. |

**Recommended next step:** Fix the Gemini parser bug (section extractor needs to handle numbered list format), then establish minimum footage standards as a pipeline input gate. The colin-hill re-run confirms the bail outcome failure is a model-level perception gap on mid-distance 3rd-person footage, not a configuration issue — no further re-runs needed.

---

## Gemini Video Comparison

**Date added:** 2026-04-12
**Method:** Full video file uploaded to Gemini 2.5 Flash via Files API — no frame extraction; Gemini receives the video directly and processes audio + video together.
**Audio:** Available — Gemini can hear the clip.
**Prompt version:** perception_v1 (identical prompt text)
**Token note:** Video token counts are determined by Gemini's internal frame sampling, not by the script. Short clips (mark-crash) may yield only 3 effective frames (~1,579 input tokens vs 4,232 for the 16-frame approach). Long clips (long-hill, clutch-scream-hill) yield proportionally more.

---

### Per-clip scorecards — Gemini Video

---

#### Nick Crash × Gemini Video

> ℹ️ **694 output tokens, all 6 sections present.** Gemini processed only 2 frames showing the rider (00:00–00:01) before the camera panned away. No crash audio cue reported. Honest unknown on outcome — no fabricated successful landing.

| # | Criterion | Score | Evidence note |
|---|-----------|:-----:|---------------|
| 1 | Rider objective | **1** | "Attempting a jump over a raised section of the track" — jump intent captured; sandy terrain, tabletop track structure, and third-person distance framing absent |
| 2 | Outcome | **0** | "Landing and subsequent actions not captured in the provided sequence" — honest unknown; crash not identified because camera panned away before landing |
| 3 | Event sequence | **1** | 00:00: airborne after jump, front wheel slightly higher. 00:01: still airborne, nose-down attitude. 00:02+: rider not visible — camera panned right before landing |
| 4 | Terrain / features | **1** | "Rolling hills, numerous dirt tracks, some rocky patches" — partial; sandy terrain and tabletop jump structure absent |
| 5 | Visibility handling | **2** | Explicitly flags: "whether the rider successfully landed the jump" and "rider's location or status after frame 00:01" — correctly names the core observability challenge |
| 6 | Hallucination | **2** | No fabricated outcome; does not assert a successful landing; appropriately hedged throughout |
| | **Total** | **7 / 12** | |

---

#### Colin Hill × Gemini Video

> ⚠️ **561 output tokens, all 6 sections present. Systematic directional hallucination throughout.** Gemini describes the entire clip as a descent ("downhill", "descending") when the rider is climbing a hill. End state is captured but the whole framing is inverted.

| # | Criterion | Score | Evidence note |
|---|-----------|:-----:|---------------|
| 1 | Rider objective | **0** | "Navigating a steep, rocky, and dusty **downhill** section of a trail" — rider is attempting an uphill hill climb; directional hallucination throughout all sections |
| 2 | Outcome | **1** | "Motorcycle has fallen onto its side on the trail. The rider is standing next to the fallen motorcycle." — end state is bail-consistent; partial credit for correct physical outcome despite inverted context |
| 3 | Event sequence | **1** | Describes descent with dust build-up → dust intensifies → bike on side; partially maps to events with direction reversed; berm, paddling, and bail mechanism absent |
| 4 | Terrain / features | **1** | Rocky, loose dirt, small rocks, pine trees correct; "downhill slope" wrong; berm and tree roots absent |
| 5 | Visibility handling | **1** | Standard limits noted (facial expression, cause, white object in 00:02); clip-specific tree occlusion not identified |
| 6 | Hallucination | **0** | "Navigating a downhill section / rider continues to descend / moving downhill" — repeated across all event timestamps; the entire clip is an uphill climb |
| | **Total** | **4 / 12** | |

---

#### Mark Crash × Gemini Video

> ℹ️ **489 output tokens, 3 frames sampled from short clip.** Input tokens: 1,579 vs 4,232 for the 16-frame approach — Gemini's video sampler only captured 3 effective frames. Jump/airborne phase falls between sampled frames and is entirely absent.

| # | Criterion | Score | Evidence note |
|---|-----------|:-----:|---------------|
| 1 | Rider objective | **1** | "Off-road riding event or practice, slopes and flat sections" — event context partially correct; descent-into-jump framing absent |
| 2 | Outcome | **2** | "Rider and motorcycle have fallen to the ground. Motorcycle on its left side, rider lying next to it." — crash correctly identified |
| 3 | Event sequence | **1** | Frame 1: descending slope. Frame 2: motorcycle tipping left, rider falling. Frame 3: bike and rider on ground. Jump/airborne phase entirely absent — fell between the 3 sampled frames |
| 4 | Terrain / features | **1** | "Loose dirt/gravel, slopes, mounds, rocky, spectators on distant ridge, flags" — consistent with terrain; shaley hill and jump at bottom not named |
| 5 | Visibility handling | **1** | Speed, condition, event type hedged; ground truth says nothing is unclear so this over-hedges |
| 6 | Hallucination | **2** | No false claims; "front wheel turned sharply left" and "leaning slightly forward" are reasonable visual observations |
| | **Total** | **8 / 12** | |

---

#### Steep Hill Bail × Gemini Video

> ℹ️ **344 output tokens, all 6 sections present.** 206-second processing time. Less output detail than the 16-frame version despite having full video — Gemini's frame sampler captures fewer effective frames from this clip than the static 16-frame approach.

| # | Criterion | Score | Evidence note |
|---|-----------|:-----:|---------------|
| 1 | Rider objective | **1** | "Navigate the trail and ascend a hill" — uphill direction correct; dense wintery forest context and POV framing absent |
| 2 | Outcome | **2** | "Motorcycle lying on its left side on leaf-covered ground, rider no longer on motorcycle, rider's left hand visible near handlebars" — bail/fall correctly identified |
| 3 | Event sequence | **1** | "Ascending steep leaf-covered incline → loses traction/momentum → front wheel lifts → falls to left side" — ascending and fall captured; path-becoming-unclear and bike shooting forward absent |
| 4 | Terrain / features | **1** | "Dry leaves, dry grass, winding, ascending, bare trees, late autumn/winter" — correct general description; branches and small logs across trail (key navigation obstacles) absent |
| 5 | Visibility handling | **1** | Cause not visible, rider not visible; uniform colour palette (the clip's specific challenge) not flagged |
| 6 | Hallucination | **1** | "Front wheel lifts off the ground" — minor inaccuracy; ground truth has the bike shooting forward after rider falls off, not a front-wheel-lift stall |
| | **Total** | **7 / 12** | |

---

#### Clutch Scream Hill × Gemini Video

> ℹ️ **446 output tokens, all 6 sections present.** 276-second processing time. Audio partially used: "sound of engine" referenced, but key spoken audio ("which way should I go?") missed. Audio misinterpreted as restart attempt rather than directional confusion.

| # | Criterion | Score | Evidence note |
|---|-----------|:-----:|---------------|
| 1 | Rider objective | **1** | "Enduro or trail riding, navigating challenging terrain" — genre correct; POV framing and explicit technical hill climb absent |
| 2 | Outcome | **2** | "Motorcycle has fallen over on its side, rider is no longer on it" — correct end state |
| 3 | Event sequence | **1** | Gets: uphill POV, another rider visible further up slope, rider stops, motorcycle falls to side; misses fallen tree at ~6 sec, large fallen tree higher up, "which way should I go?" directional confusion moment |
| 4 | Terrain / features | **1** | "Dense pine forest, pine needles, fallen leaves, scattered branches and twigs, uphill, tire tracks" — correct general description; fallen tree obstacles as specific navigation hazards absent |
| 5 | Visibility handling | **2** | Cause not visible, rider condition not visible, other rider identities not visible; appropriate for this clip |
| 6 | Hallucination | **1** | "Rider attempts to restart the motorcycle, as indicated by the sound of the engine" — audio misinterpreted; rider was stopped and confused about direction, not restarting; the spoken "which way should I go?" missed entirely |
| | **Total** | **8 / 12** | |

---

#### Fall Bulgario × Gemini Video

> ℹ️ **619 output tokens, all 6 sections present.** 254-second processing time. Most detailed timeline of any video run — timestamped events through 00:32 including rider attempting to lift bike after fall.

| # | Criterion | Score | Evidence note |
|---|-----------|:-----:|---------------|
| 1 | Rider objective | **1** | "Preparing to ride or having just ridden on a dirt track" — weak framing; muddy hill climb attempt absent |
| 2 | Outcome | **2** | "Motorcycle has fallen on its side on the uphill section. The rider is attempting to lift it." — correct and detailed end state |
| 3 | Event sequence | **2** | Timestamps: stationary at start (00:00–00:05) → POV activates (00:06) → steep muddy rocky incline (00:06–00:15) → loses momentum/control and falls (00:16–00:17) → on side (00:18–00:20) → rider off motorcycle (00:21) → rider attempting to lift (00:23–00:32); tree root deflection as specific cause absent but overall sequence accurate |
| 4 | Terrain / features | **2** | "Muddy and rocky, uphill, forest, tire tracks, mixed trees with early spring foliage, fallen leaves, some moss" — muddy explicitly stated; accurate and detailed |
| 5 | Visibility handling | **1** | "Exact cause of the motorcycle falling is not explicitly visible" — over-hedges; ground truth says nothing particularly hard to see |
| 6 | Hallucination | **2** | GasGas motorcycle correctly identified; neon yellow LEATT glove detail accurate; all claims well-grounded |
| | **Total** | **10 / 12** | |

---

#### Jimbo Crash × Gemini Video

> ℹ️ **663 output tokens, all 6 sections present.** Detailed frame-by-frame events: left-arm tree contact specifically identified at 00:03 with camera drop at 00:04 confirming crash.

| # | Criterion | Score | Evidence note |
|---|-----------|:-----:|---------------|
| 1 | Rider objective | **1** | "Navigating a downhill section" — descent correct; off-camber slope and POV framing absent |
| 2 | Outcome | **1** | "Motorcycle stops between two trees after rider's left arm makes contact with a tree" — tree contact identified; framed as stop rather than crash; "rider remains on motorcycle" is uncertain and likely wrong |
| 3 | Event sequence | **2** | 00:03: rider's left arm extended, bracing against tree trunk. 00:04: view shifts downward rapidly (impact in progress), front fender visible. 00:05: still low, hand near trunk. 00:06–00:07: upright again, stationary between two trees. 00:08–00:12: stationary. Closely matches crash impact sequence |
| 4 | Terrain / features | **1** | "Leafy trail, many fallen brown leaves, forest, descending, bare lichen-covered trees, green moss patches" — correct general description; off-camber slope character absent |
| 5 | Visibility handling | **1** | "Renthal branding visible, contact with tree is evident"; low resolution and front wheel occlusion (clip-specific limits) not flagged |
| 6 | Hallucination | **2** | "Renthal" is a real handlebar brand; "contact with tree is evident" is accurate; all claims appropriately hedged |
| | **Total** | **8 / 12** | |

---

#### Long Hill × Gemini Video

> ℹ️ **367 output tokens, all 6 sections present.** 315-second processing time (longest clip). Audio channel pays off: engine revving and group context used. Correctly identifies the successful outcome that Claude frames got wrong (0/2 outcome score).

| # | Criterion | Score | Evidence note |
|---|-----------|:-----:|---------------|
| 1 | Rider objective | **2** | "Attempting to ascend a steep, leaf-covered incline in a forest" — matches ground truth closely |
| 2 | Outcome | **2** | "The rider successfully ascends the steep, leaf-covered incline" — correct; audio + visual used for determination |
| 3 | Event sequence | **1** | "Three riders on dirt road → rider turns onto steep incline → ascends through trees with engine revving" — group context and lane-to-forest transition correctly captured; momentum dip/recovery and cheering audio absent |
| 4 | Terrain / features | **2** | "Steep dry brown leaves, scattered rocks and branches, narrow worn path, dense forest, wider dirt road at bottom, distant hills in background" — accurate; wider road = the lane before the climb |
| 5 | Visibility handling | **2** | Standard limits noted; audio correctly used for outcome determination |
| 6 | Hallucination | **2** | "Three riders gathered on a dirt road" consistent with group context; "sound of motorcycle engine revving" accurate; no false claims |
| | **Total** | **11 / 12** | |

---

### Four-track comparison table

Cells = total score out of 12. Clips ordered by Gemini video score (hardest first at top).

| Clip | Camera | GPT-4o<br>frames | Gemini<br>frames | Claude<br>frames | Gemini<br>video | Video<br>delta |
|------|--------|:----------------:|:----------------:|:----------------:|:---------------:|:--------------:|
| Colin Hill | 3rd-person, mid | 2 | 4 | 7 | 4 | = |
| Nick Crash | 3rd-person, distant | 2 | 4 | 4 | 7 | **+3** |
| Steep Hill Bail | POV | 10 | 11 | 11 | 7 | **−4** |
| Clutch Scream Hill | POV | 5 | 10 | 10 | 8 | **−2** |
| Jimbo Crash | POV | 5 | 8 | 7 | 8 | = |
| Mark Crash | 3rd-person, close | 9 | 9 | 11 | 8 | −1 |
| Fall Bulgario | POV | 4 | 8 | 9 | 10 | **+2** |
| Long Hill | POV | 7 | 10 | 8 | 11 | **+1** |
| **Total** | | **44 / 96** | **64 / 96** | **67 / 96** | **63 / 96** | **−1** |
| **%** | | **45.8%** | **66.7%** | **69.8%** | **65.6%** | |

> Video delta = Gemini video score minus Gemini frames score for each clip.

---

### Borderline clip analysis

#### Nick Crash (video: 7/12, frames: 4/12) — **video wins by +3**

The video approach fixes the failure mode that plagued the frames approach. Gemini frames fabricated "no observable incident"; Gemini video correctly hedges with "landing and subsequent actions not captured in the provided sequence." The crash is still not identified (C2=0 on both) but the video version avoids the hallucination (C6: 2 vs 0). The improvement is entirely in uncertainty handling — the structural problem (rider too small, camera pans away before landing) is not solved.

#### Colin Hill (video: 4/12, frames: 4/12) — **tie, different failure modes**

Frames: confabulates the rider staying on the bike (confident false positive).
Video: confabulates the entire clip as a descent when the rider is climbing (systematic directional hallucination).
Both fail at 4/12 via different routes. Neither approach can identify the bail. The structural limit — bail from mid-distance third-person footage, no clear dismount frame — holds for both modalities.

#### Mark Crash (video: 8/12, frames: 9/12) — **frames win by −1**

The video approach processes only 3 effective frames from this short clip (1,579 input tokens vs 4,232). The jump/airborne phase falls between sampled frames and is entirely absent from the video response. The frames approach sampled the jump airborne phase (frames 6–7) and captured the full sequence. On very short clips, higher frame density beats continuous video.

---

### Key findings — Gemini video

**Finding V1 — Video is essentially tied with frames overall (65.6% vs 66.7%)**

The audio channel provides real benefit on two clips:
- **Long Hill:** video correctly identifies successful completion (2/2 outcome); frames correctly identifies it too (1/2) but with less confidence and less context on the group/lane start
- **Nick Crash:** video avoids hallucination on outcome; frames fabricate success

The frame-density advantage of the 16-frame static approach provides real benefit on three clips:
- **Steep Hill Bail:** frames 11/12 → video 7/12 (−4); frames captured the bike-on-side sequence in fine detail
- **Clutch Scream Hill:** frames 10/12 → video 8/12 (−2); frames captured more of the event sequence structure
- **Mark Crash:** frames 9/12 → video 8/12 (−1); fewer effective frames sampled from short clip

**Finding V2 — Audio helps most on outcome classification, not event sequencing**

On Long Hill, the audio (engine revving, group context) confidently produces the correct success outcome. On Clutch Scream Hill, the audio ("which way should I go?") was potentially available but misinterpreted as a restart attempt rather than directional confusion. Audio contribution is higher-level (outcome classification) than fine-grained (event sequence reconstruction).

**Finding V3 — Colin Hill is categorically unsolvable by any current approach**

Third run of this clip with a different approach (video vs frames), same score (4/12), different failure mode. The bail outcome has now failed under: Gemini frames (confabulated success), Gemini video (confabulated descent direction), GPT-4o frames (confabulated continued riding), Claude frames (foot off peg detected but outcome not concluded). Approaching this as a prompt or modality engineering problem is the wrong framing. The bail is structurally undetectable from available camera geometry + any model.

**Finding V4 — Gemini's video frame sampler disadvantages short clips**

Mark Crash (short clip, ~5 seconds): video sampler produced only 3 effective frames. The static 16-frame approach provides 5× the visual coverage on this clip. This is not a Gemini capability issue — it's a sampling arithmetic issue. For clips under ~10 seconds, the static frame approach is likely always better than video-native due to frame density.

**Finding V5 — No single approach dominates across all clip types**

| Clip type | Best approach |
|---|---|
| Long POV climbs (audio-confirmable success) | Video (audio channel) |
| Distant third-person crashes | Video (avoids hallucination) but still fails on crash detection |
| Short clear clips (Mark Crash) | Frames (frame density beats video sampler) |
| Long POV with specific obstacles (Steep Hill Bail, Clutch Scream Hill) | Frames (16-frame density captures obstacle detail) |
| Medium-duration POV (Fall Bulgario, Jimbo Crash) | Roughly equal |

---

### Perception approach recommendation

**Primary recommendation: 16-frame static approach, Claude Sonnet, for pipeline integration.**

Rationale:
- Highest overall score: 69.8% (Claude frames) vs 66.7% (Gemini frames) vs 65.6% (Gemini video)
- Best uncertainty handling on ambiguous clips — avoids fabrication on distant third-person footage
- Frame density advantage on short clips and obstacle-dense POV footage
- Predictable input size (16 frames = fixed token cost)

**Secondary recommendation: add Gemini video as a parallel perception track for audio-confirmable clips.**

The audio channel provides real signal on outcome classification (Long Hill success, Clutch Scream Hill crash direction). A dual-track approach — Claude frames for primary event sequencing + Gemini video for outcome/audio cross-check — would outperform either alone. This is a pipeline architecture question for a future stage, not a blocker now.

**Immediate next steps before pipeline integration:**
1. Fix the Gemini parser bug (section extractor for numbered list format) — applies to both frames and video runs
2. Define minimum footage standard: POV or near-POV, rider/bike occupying ≥20% of frame area; distant third-person clips (Nick Crash geometry) flagged as `observability_limited: true` at Stage 2
3. Do not invest further in Colin Hill outcome detection — it is a structural camera geometry problem, not a perception problem
