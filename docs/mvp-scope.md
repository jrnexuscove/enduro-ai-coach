# MVP Scope

## Purpose
The purpose of the MVP is to validate whether Enduro AI Coach can provide useful coaching feedback from short-form rider input and short action-camera footage.

The MVP is not intended to prove scale, real-time performance, advanced sensor fusion, or a complete end-state architecture.

It is intended to answer one core question:

**Can a rider upload a short clip, provide basic session context, and receive feedback that feels useful enough to justify building further?**

---

## Core MVP Outcome
A rider can:

1. open the application
2. provide basic ride/session details
3. upload a short riding video clip
4. submit the session for analysis
5. receive structured coaching feedback

If this full flow works and the feedback is useful, the MVP is successful.

---

## Target User
The first target user is:

**An off-road motorcycle rider who wants to improve technique and is willing to upload a short clip of real riding in exchange for coaching feedback.**

This user:
- wants practical feedback
- may not have access to regular coaching
- wants to understand what happened in a riding scenario
- wants to know what to try differently next time

---

## MVP In Scope
The MVP should include the following:

### 1. Simple web application
A basic web app that a rider can access in the browser.

### 2. Session input
A form where the rider can provide basic session context, such as:
- ride type
- scenario type
- rider goal
- what they think went wrong
- any other lightweight contextual fields

### 3. Video upload
The ability to upload a short action-camera clip.

Assumptions for MVP:
- short clip only
- roughly 30–60 seconds
- source may be GoPro, DJI, or similar action camera footage
- high-resolution footage may be simplified or downsampled during processing

### 4. Analysis step
A simple analysis workflow that processes the rider input and video input.

This does not need to be perfect or highly optimised in version 1.

### 5. Coaching feedback output
The system should return structured feedback, such as:
- what likely happened
- what may have gone wrong
- what the rider should try next time
- practical coaching suggestions

### 6. Clear results screen
The rider should receive feedback in a clean, understandable format.

---

## MVP Success Criteria
The MVP is successful if:

1. a rider can complete the end-to-end flow without confusion
2. the application accepts a short riding clip successfully
3. the system returns feedback in a structured format
4. the feedback feels relevant enough to be useful
5. the product demonstrates enough promise to justify iteration

---

## MVP Out of Scope
The following are explicitly out of scope for version 1:

- real-time coaching
- IMU integration
- external sensor integration
- advanced telemetry fusion
- multi-camera analysis
- pro-rider model training
- fully accurate virtual playback generation
- complex user account systems unless clearly needed
- large-scale video pipeline optimisation
- production-grade scale architecture
- mobile app development
- expansion into MTB, motocross, or other sports in version 1

---

## Technical Constraints
For MVP, prefer:
- simple implementation
- browser-based flow
- minimal dependencies
- minimal infrastructure
- maintainable code over clever code

Assume the goal is to prove usefulness, not engineer the final platform.

---

## Product Constraints
The MVP should not try to solve everything.

Important principles:
- keep the journey short
- keep the user input simple
- keep feedback useful
- prioritise validation over sophistication

---

## Key Product Question
The MVP exists to test this:

**Will riders find enough value in short-video-based coaching feedback to want more?**

---

## Definition of Done
The MVP scope is considered defined when:

- the first user is clear
- the first workflow is clear
- the expected input is clear
- the expected output is clear
- the out-of-scope list is clear
- development can begin without ambiguity