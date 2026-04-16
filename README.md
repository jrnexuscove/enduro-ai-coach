# Enduro AI Coach — ARCHIVED

This repository is archived as of 16 April 2026.

Active development for RideMind has moved to:
**https://github.com/RigomiLtd/RideMind**

This repo is preserved as a reference record of:
- The original local pipeline architecture (Stages S0–S11, 11-stage implementation)
- Phase 2 multi-model benchmark testing (GPT-4o, Claude Sonnet, Gemini)
- PVE (Perception Viability Experiment) — 32 runs, 3 models, 8 clips
- ARCH-V2 spec evolution (v1.0 → v1.1.1)

All intellectual property is owned by Rigomi Limited.

For current work, see the new repository: https://github.com/RigomiLtd/RideMind

---

*Original README content preserved below.*

---

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

## Current Status (as of archive — April 2026)

* ARCH-V2 pipeline spec locked (v1.1.1)
* Stages S0–S11 implemented and validated (11-stage reasoning pipeline)
* Phase 2 multi-model benchmark complete
* Perception Viability Experiment complete — Claude Sonnet selected as primary model
* Active development moved to Lovable (production platform) at RigomiLtd/RideMind

---

## Author

Jake Rigby
Rigomi Limited
