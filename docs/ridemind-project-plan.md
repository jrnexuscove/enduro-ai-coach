
# RideMind — Project Plan & Architecture Decisions

**Product:** RideMind (ridemind.ai)
**Codebase rename:** From "Enduro AI Coach" → "RideMind"
**Date:** 31 March 2026
**Owner:** Jake

---

## Current State Summary

### What exists today

**Knowledge Base (Domains 1–15):** ~194 files of expert-level coaching content covering rider biomechanics, bike control inputs, dynamics and traction, cornering, terrain management, hill and technical terrain, riding intelligence, error patterns and diagnostics, performance metrics, training and skill development, mental performance, bike setup and environment, discipline-specific modules, sensor and data interpretation, and named techniques and manoeuvres. All files follow a 10-section template schema with diagnostic cues, coaching language, drills, and cross-references. Target quality: 240–270 lines per file.

**Domain 16 (Machine/Bike Knowledge):** Blueprint drafted — 37 topics across class profiles, fueling profiles, and platform families. Not yet built. Architecture decision locked: model-specific profiles required (see Architecture Decisions below).

**Technical Validation:** A Node.js/TypeScript test script (scripts/test-coaching.ts) has been successfully tested on real riding clips. It extracts video frames via ffmpeg, sends them to GPT-4o for visual analysis, extracts audio for engine sound analysis via gpt-4o-audio-preview, then combines both into structured coaching feedback.

**Project Docs:** CLAUDE.md, README.md, backlog.md, architecture-principles.md, mvp-scope.md, user-flow.md, product-vision.md all written.

**Application Code:** Next.js project scaffolded (TypeScript, Tailwind CSS, App Router). No running application code yet. Code lives in app/ at root, not src/app/.

**Stack:** Next.js, TypeScript, Tailwind CSS, Node.js, OpenAI API (GPT-4o, gpt-4o-audio-preview), ffmpeg-static, ffprobe-static, fluent-ffmpeg.

---

## Architecture Decisions (Locked)

### AD-01: Coaching Output Schema

The coaching response follows this structure:

1. **Scenario Read** — The coach describes what it sees happening in the video. Proves to the rider the AI understood the situation.
2. **Key Observations** — 2–3 specific things noticed, both positive and negative.
3. **Diagnosis** — Root cause analysis, not just symptoms. This is where the knowledge base earns its value.
4. **The Fix** — Concrete, physical instructions. What to do differently, in terms the rider can feel.
5. **Drill** — One specific practice exercise pulled from the knowledge base.
6. **Confidence Note** — Acknowledges what went well, encourages the rider.

### AD-02: Coaching Tone

Personable but clearly expert. Not a textbook, not a mate down the pub. A knowledgeable coach who's watching alongside you — direct, encouraging, uses physical cues the rider can feel. Never condescending.

### AD-03: MVP Input

Video only. No forms, no structured metadata input per session. The rider uploads GoPro footage (POV helmet cam or third-party filming the rider) and the AI does the work of understanding context.

### AD-04: Rider Profile (Setup — One-Time)

Captured once at first use. Pre-loaded as context before any video analysis runs.

Profile captures:
- Rider type / experience level
- Body info (height, weight)
- Bike(s) — make, model, year (supports multiple bikes)
- Riding disciplines (hard enduro, general enduro, motocross, trials — multi-select)

The discipline selection filters/prioritises which knowledge base domains are most relevant.

### AD-05: Domain 16 — Bike Knowledge Architecture

Model-specific profiles are required. Bikes sharing the same engine platform (e.g., KTM/GasGas/Husqvarna Pierer 2T) still differ in chassis, suspension design (linkage vs PDS), brakes (Brembo vs Braktec), and clutch. These differences are coaching-relevant.

Four-layer architecture:
1. **Platform family** — Engine characteristics, basic architecture (e.g., "Pierer 2T enduro")
2. **Model-specific profile** — Chassis, suspension type, brake system, clutch (e.g., "GasGas EC300 TPI")
3. **Fueling/generation profile** — Engine management, fuel delivery (e.g., "TBI generation")
4. **Rider mods layer** (post-MVP) — Aftermarket modifications that affect riding

Same principle applies across manufacturers: Beta RR vs RR Racing (different suspension), Rieju 300 vs 300 Pro (different spec levels).

### AD-06: Knowledge Base Retrieval (MVP)

For MVP testing: manually select relevant KB files per test clip with hardcoded rider/bike context in the system prompt. For production: automated retrieval based on rider profile and video analysis context.

### AD-07: LLM Strategy

Test both GPT-4o and Claude for coaching output quality. Compare on the same clips. Use whichever produces better coaching.

---

## Phase Plan

### Phase 1 — Coaching Output Sanity Test (NOW)

**Objective:** Validate that the knowledge base + a well-crafted prompt + real video footage produces coaching output good enough that a rider would find it genuinely useful.

**Steps:**
1. Verify scripts/test-coaching.ts still runs against a clip
2. Design the coaching system prompt (incorporating output schema, tone, rider context, relevant KB content)
3. Wire selected knowledge base content into the prompt
4. Test against 3–5 real clips showing different scenarios
5. Evaluate: Does it sound like a real coach? Does it catch the right issues? Is the advice actionable?
6. Compare GPT-4o vs Claude output quality on same clips

**Test rider profile (hardcoded):**
- Rider: Intermediate enduro rider, general trail and hard enduro
- Bike: GasGas EC300 TPI — 300cc two-stroke, fuel-injected, PDS no-linkage rear suspension, Braktec brakes and clutch

**Exit criteria:** Honest assessment of whether the coaching engine fundamentally works.

### Phase 2 — Rider Profile & Input Schema

**Objective:** Lock the data model for rider profiles and per-session input.
**Depends on:** Phase 1 results.

### Phase 3 — Domain 16 Build (Machine/Bike Knowledge)

**Objective:** Build the bike knowledge base to the locked four-layer architecture.
**Depends on:** Phase 2 locking the rider profile schema.
**Build order:** Enduro class profiles first, then fueling profiles, then MX, then platform families.

### Phase 4 — MVP Application Build

**Objective:** Build the running Next.js application with the core coaching loop.
**Depends on:** Phases 1–3.

**Explicitly out of scope for MVP:**
- Animation / visual overlay on video
- Progressive dashboards / pattern detection across sessions
- Sensor/telemetry integration
- Rider avatar system
- Pro rider marketplace

### Phase 5 — Evaluation & Pilot

**Objective:** Validate the MVP with real riders.

---

## Future Vision (Not MVP — Do Not Build Yet)

- Animation overlays showing technique corrections on video playback
- Progressive rider intelligence dashboards
- Training plan generation based on recurring weaknesses
- Rider avatar system
- Coaching avatar / riding buddy
- Interactive video playback
- Sensor/telemetry fusion (IMU, GPS)
- Track database and terrain intelligence
- Pro rider / expert marketplace
- Multi-discipline expansion beyond enduro
- Mobile native apps (iOS/Android)
- Rider mods layer in bike profiles

---

## Immediate Next Actions

1. Rename project from "Enduro AI Coach" to "RideMind" in codebase
2. Verify test script runs against a GoPro clip
3. Design coaching system prompt with output schema, tone, and KB content
4. Run sanity test — 3–5 clips, evaluate output, compare GPT-4o vs Claude
