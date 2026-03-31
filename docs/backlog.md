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

# Updated Backlog - Post AI Validation

## Status
✅ **COMPLETED:**
- Project scaffolding (Next.js, TypeScript, environment setup)
- AI coaching validation script (visual + audio analysis)
- Proven AI can provide useful coaching feedback from video clips
- Identified coaching quality improvements needed (expert knowledge integration)

## CURRENT PRIORITY: AI Enhancement (Before UI Build)

### 1. Expert Knowledge Integration
- [ ] Extract transcripts from key YouTube channels (IRC Tyre Guy, Splat Moto, Chris Birch)
- [ ] Purchase and analyze 2-3 reputable online courses 
- [ ] Build technique knowledge base organized by scenario
- [ ] Enhance system prompt with specific techniques (standing vs sitting, weight distribution, etc.)
- [ ] Test improved coaching on existing video clips

### 2. MVP Web Application 

### 2a. Core Flow Architecture
- [ ] Define final feedback schema (based on AI testing results)
- [ ] Create API route `/api/analyze` (accepts video + metadata)
- [ ] Set up temporary video storage and processing pipeline

### 2b. UI Development
- [ ] Build single-page MVP flow:
  - Session context form (terrain type, rider goal, issue description)
  - Video upload component (30-60 second limit)
  - Processing state display 
  - Structured coaching feedback display
- [ ] Mobile-first responsive design
- [ ] Error handling and validation

### 2c. Integration & Testing
- [ ] Connect frontend to analysis API
- [ ] End-to-end testing with real video clips
- [ ] Performance optimization for video processing

## Phase 1 — Coaching Validation Testing

- [x] Built test-coaching.ts baseline script (visual + audio via GPT-4o)
- [x] Built test-coaching-kb.ts with knowledge base integration
- [x] Refactored to 4-step observe-then-coach architecture
- [x] Built test-coaching-gemini.ts (raw video via Gemini)
- [x] Built test-coaching-claude.ts (Claude vision + GPT-4o audio)
- [x] Completed colin hill comparison test across all 3 models
- [ ] Run remaining 6 test clips through all 3 models
- [ ] Build comparison matrix and select model architecture

---

## POST-MVP ENHANCEMENTS
- [ ] Session history and user accounts
- [ ] Multiple video angle support  
- [ ] Real-time coaching integration
- [ ] Advanced telemetry fusion
- [ ] Expert coach validation system


## MVP Tasks

### 1. Project Setup
- [x] Create Next.js app — DONE
- [x] Set up basic project structure — DONE
- [x] Confirm local dev server runs — DONE
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