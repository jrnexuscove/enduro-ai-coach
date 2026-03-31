# User Flow (MVP)

## Context
The primary usage scenario is:

- A rider has just completed (or is reviewing) a ride
- They want feedback on a specific scenario
- They are likely using a mobile device (e.g. Android phone)
- They want quick, practical insights

The product should be designed as **mobile-first**, even if initially built as a web app.

---

## Core Flow (MVP)

### Step 1 — Open Application
The rider opens the application in their browser.

Goal:
- fast access
- no friction
- simple entry point

---

### Step 2 — Start New Session
The rider chooses to create a new session.

Goal:
- clear call to action
- minimal confusion

---

### Step 3 — Enter Session Details
The rider provides basic context, such as:

- ride type (enduro, hill climb, technical section, etc.)
- what they were trying to do
- what they think went wrong (optional)
- any other lightweight inputs

Constraints:
- should be quick to complete on mobile
- minimal typing required

---

### Step 4 — Upload Video
The rider uploads a short clip:

- typically 30–60 seconds
- recorded on an action camera (GoPro, DJI, etc.)
- selected from phone storage

Considerations:
- must work smoothly on mobile
- should not require complex steps
- file size and upload time should be reasonable

---

### Step 5 — Submit for Analysis
The rider submits the session.

System behaviour:
- show clear “processing” state
- reassure user something is happening

---

### Step 6 — Receive Coaching Feedback
The system returns structured feedback.

Feedback should include:

- what likely happened
- what may have gone wrong
- what to try next time
- practical coaching advice

Presentation:
- clear
- easy to read on mobile
- not overly long or complex

---

## Desired User Experience
The flow should feel:

- quick
- simple
- useful
- low friction

The user should not feel like they are filling out a complex form or using a technical system.

---

## Key Design Principles

### 1. Mobile First
- assume most usage is on a phone
- prioritise simplicity
- minimise typing

### 2. Fast Feedback Loop
- user should get value quickly
- avoid long or unclear processes

### 3. Practical Output
- feedback must be actionable
- avoid vague or generic advice

### 4. Low Friction
- minimal steps
- minimal decisions
- minimal setup

---

## Future Flow Enhancements (Not MVP)

Later versions may include:

- saving sessions
- comparing attempts
- tracking improvement over time
- syncing with sensors
- real-time feedback
- visual playback of scenarios

These should not be built in version 1.