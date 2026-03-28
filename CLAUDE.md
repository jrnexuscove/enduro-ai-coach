# Project Overview
This project is Enduro AI Coach.

Enduro AI Coach is an AI-powered coaching platform for off-road motorcycle riders.

The purpose of the product is to help riders improve performance by analysing ride/session information and short action-camera footage, then returning useful coaching feedback.

The user building this product is not a professional software engineer, so all development should be beginner-friendly, clearly explained, and easy to maintain.

---

# Current Phase
The project is currently in the MVP definition and early build preparation phase.

The immediate goal is to build the smallest useful version of the product that proves real value.

Do not assume the full long-term vision should be built now.

---

# Product Priorities
Prioritise the following in order:

1. Build a small, working MVP
2. Validate whether users get real value from automated coaching
3. Keep the codebase simple and maintainable
4. Avoid overengineering
5. Expand only after the MVP flow works

---

# MVP Direction
The MVP should focus on a simple flow where:

1. A rider provides ride/session information
2. A rider uploads a short video clip (for example 30–60 seconds from an action camera such as GoPro or DJI)
3. The system analyses the input
4. The system returns structured coaching feedback

The MVP is about validating coaching quality, not scale, speed, or perfect technical sophistication.

---

# Explicit MVP Constraints
For the MVP, assume the following constraints:

- No real-time processing
- No hardware integration such as IMUs or other external sensors
- No advanced telemetry fusion yet
- No pro-rider model training yet
- No complex multi-service backend unless clearly necessary
- No premature optimisation for scale
- Video may be downsampled or simplified for processing
- Focus on proving value, not building the final system

---

# Long-Term Vision
Long term, the product may expand into:

- ride telemetry integration
- sensor and IMU integration
- video + sensor fusion
- richer post-ride analysis
- real-time coaching support
- AI models informed by expert/pro rider technique
- expansion into MTB, motocross, and other disciplines

A key long-term goal is for the application to generate a virtual playback of the ride scenario, including:

- a reconstructed view of what the system believes happened
- likely mistakes or inefficiencies in rider technique
- a simulated view of what to try next time
- coaching suggestions linked to the scenario

However, this should not distort MVP scope.

---

# Technical Preferences
Prefer the following unless there is a strong reason not to:

- Next.js for the web app
- TypeScript where practical
- simple API routes over complex backend architecture
- mainstream, well-supported libraries
- small and understandable folder structures
- minimal dependencies

Ask before introducing major new dependencies or architectural complexity.

---

# Working Style
When helping with this project:

- Explain the plan before making major changes
- Break work into small steps
- Make the smallest sensible change first
- Prefer clarity over cleverness
- Reuse existing patterns where possible
- Suggest sensible commit points
- Flag tradeoffs clearly
- Ask before destructive changes
- Do not refactor unrelated areas unless asked

---

# Code Style
- Use clear variable and function names
- Keep functions small and readable
- Add comments where logic is not obvious
- Prefer maintainability over cleverness
- Avoid unnecessary abstraction
- Keep files reasonably focused

---

# Output Style
When responding in this project:

- Be practical
- Be concise but clear
- Avoid generic startup fluff
- Avoid overcomplicated architecture unless justified
- Assume the user wants direct, actionable next steps
- Explain errors in plain English
- When suggesting code changes, explain what changed and why

---

# Product Thinking Rules
Always keep the following in mind:

- The project should follow build small → validate → iterate
- The first version should prove usefulness before chasing sophistication
- Video matters because it is central to understanding real riding behaviour
- Hardware/sensor ideas are important, but later
- The system should eventually help a rider understand:
  - what happened
  - what likely went wrong
  - what to try next time

---

# What To Avoid
Avoid these common mistakes unless explicitly asked:

- building for scale too early
- adding many dependencies without need
- complex microservices
- premature authentication complexity
- premature database complexity
- trying to solve the full long-term vision in version 1
- changing unrelated files during focused tasks
- producing vague advice without concrete next actions

---

# Decision Heuristic
If unsure what to do next, prefer the option that:

1. makes the MVP more real
2. keeps the system simpler
3. improves feedback quality
4. helps validate real user value quickly