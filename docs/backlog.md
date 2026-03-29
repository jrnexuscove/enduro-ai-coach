# Backlog

## Purpose
This backlog translates the MVP scope into actionable build tasks.

It is intentionally simple and focused on execution.

---

## Status Types
- TODO
- IN PROGRESS
- DONE

---

## MVP Tasks

### 1. Project Setup
- [ ] Create Next.js app
- [ ] Set up basic project structure
- [ ] Confirm local dev server runs
- [ ] Push initial app to GitHub

---

### 2. Basic UI Shell
- [ ] Create homepage layout
- [ ] Add simple navigation
- [ ] Add upload page route
- [ ] Ensure mobile-friendly layout

---

### 3. Session Input Form
- [ ] Create form for ride context
- [ ] Fields:
  - terrain type
  - difficulty level
  - rider experience
  - description of issue
- [ ] Validate inputs
- [ ] Submit form data

---

### 4. Video Upload
- [ ] Add file upload component
- [ ] Accept video files
- [ ] Limit file size (e.g. ~100MB)
- [ ] Show upload progress
- [ ] Store file temporarily

---

### 5. Processing Flow (Mock First)
- [ ] Create API route `/analyze`
- [ ] Accept form + video metadata
- [ ] Return mock response:
  - what happened
  - what to improve
  - tips

---

### 6. Feedback Display
- [ ] Create results page
- [ ] Show structured feedback
- [ ] Sections:
  - observation
  - mistake
  - recommendation
- [ ] Keep UI clean and readable

---

### 7. End-to-End Flow
- [ ] User submits form + video
- [ ] Data sent to backend
- [ ] Mock analysis returned
- [ ] Results displayed

---

### 8. Polish (MVP Level)
- [ ] Improve layout spacing
- [ ] Improve mobile UX
- [ ] Add loading states
- [ ] Handle errors

---

## Post-MVP (Do Not Build Yet)

### AI Enhancements
- Real video analysis
- Frame extraction
- Motion detection
- Technique classification

### Hardware Integration
- IMU sensors
- Telemetry ingestion
- Sensor fusion

### Experience Enhancements
- Session history
- User accounts
- Saved feedback
- Progress tracking

### Advanced Features
- Virtual playback simulation
- AI-generated replays
- Comparison with pro riders