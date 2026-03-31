# RideMind

## Overview

RideMind is an AI-powered coaching platform designed for off-road motorcycle riders.

The goal is to help riders improve performance by analysing ride data and visual footage, and providing actionable feedback — similar to how a professional coach would review technique.

---

## Problem

Riders currently:

* Have no structured way to analyse their riding
* Rely on feel, guesswork, or occasional coaching
* Cannot easily review or learn from their performance
* Lack consistent, objective feedback on technique

There is no simple, scalable system that turns ride data and riding footage into meaningful coaching insights.

---

## Solution (MVP)

The initial version of RideMind will:

1. Allow a rider to input ride/session data
2. Accept a short video clip (e.g. 30–60 seconds from an action camera such as GoPro or DJI)
3. Process the input through a simple analysis layer
4. Return structured coaching feedback

The inclusion of video is critical to validating whether meaningful coaching insights can be generated from real riding behaviour.

---

## MVP Constraints

* Video length will be limited (e.g. 30–60 seconds)
* No real-time processing in the first version
* Focus is on validating feedback quality, not performance or scale
* High-resolution footage (e.g. 4K60) may be downsampled for processing
* No hardware integration (IMUs, sensors) in the initial version

---

## Why This Matters

Long-term value depends on analysing real riding behaviour, not just rider input.

Including controlled video input early allows us to:

* Validate the coaching concept properly
* Identify what signals actually matter in riding technique
* Avoid building a system based only on manual or subjective inputs

---

## Current Status

* Repository and development environment set up
* Core project structure defined
* MVP scope being formalised before development begins

---

## Project Structure

* `/docs` → product, planning, and architecture documents
* `/app` → application code (Next.js App Router)
* `/public` → static assets
* `.claude/` → Claude skills and behaviour configuration
* `CLAUDE.md` → instructions for AI-assisted development
```

**Step 2 — Commit everything**
```
git add .
```
```
git commit -m "Scaffold Next.js project with TypeScript and App Router"
```
```
git push

---

## Approach

This project follows a **build small → validate → iterate** approach:

* Start with a simple, focused MVP
* Prove value quickly using real scenarios
* Expand based on actual user feedback and data

---

## Long-Term Vision

* Integration of ride telemetry (IMUs, sensors)
* Video + sensor fusion analysis
* Real-time and post-ride coaching
* AI models trained on expert/pro rider data
* Expansion into MTB, motocross, and other disciplines

### Advanced Coaching Experience

A key long-term goal is for the application to generate a **virtual playback of the ride scenario**, including:

* A reconstructed view of what the system believes happened during the ride
* Identification of mistakes or inefficiencies in rider technique
* A simulated version of how the rider *should* approach the same scenario
* Suggested adjustments for the next attempt

This creates a coaching experience closer to:

> “See what you did → see what you should do → try again”

---

## Author

Jake Rigby
Nexus Cove
