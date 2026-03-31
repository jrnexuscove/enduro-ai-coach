# ENDURO AI COACH — KNOWLEDGE BASE TOPIC TEMPLATE

## Purpose
This template defines the exact structure every topic document in the knowledge base must follow. Consistency across all 155 topics ensures the AI coaching engine can reliably reference, cross-link, and generate high-quality feedback from the knowledge base.

## File Naming Convention
domain-XX_topic-name.md
Examples: biomechanics-01_standing-vs-sitting-positioning.md, bike-control-03_power-delivery-across-terrain-types.md

## Document Structure — Every topic document MUST contain these 10 sections:

### 1. METADATA BLOCK
topic_id, title, domain, domain_id, difficulty_range (beginner/intermediate/advanced), related_topics, prerequisites, tags, version, last_updated

### 2. OVERVIEW
3-5 sentence summary: WHAT the technique is, WHY it matters, understandable by beginners. No jargon without explanation.

### 3. CORE PRINCIPLES
3-6 fundamental truths grounded in physics, biomechanics, or proven coaching methodology. Each with heading and 2-4 sentence explanation of the "why".

### 4. TECHNIQUE BREAKDOWN BY LEVEL
4a. Beginner Level: Goal, key focus areas, what good looks like, common mistakes with why they happen and what to do instead
4b. Intermediate Level: Same structure plus progression markers from beginner
4c. Advanced Level: Same structure plus progression markers from intermediate
CRITICAL: Each level must be genuinely different, not the same content repeated.

### 5. DIAGNOSTIC CUES (AI COACHING ENGINE REFERENCE)
Visual Cues: Observable indicators of correct technique AND error indicators from video analysis
Audio Cues: Engine sound patterns, impact sounds, clutch/brake sounds
Sensor Cues: Acceleration patterns, lean angle data, vibration signatures (for future IMU integration)

### 6. COACHING CUES & LANGUAGE
Pre-written coaching phrases: Positive reinforcement, corrective feedback, progression prompts.
Tone: Encouraging but direct. Concrete physical cues. Reference what rider will FEEL. Never condescending.

### 7. DRILLS & PRACTICE EXERCISES
2-4 drills per topic with: Name, purpose, setup, step-by-step execution, success criteria, duration/reps, progression.

### 8. CROSS-REFERENCES & DEPENDENCIES
Topics this connects to, topics this is prerequisite for, topics this builds on.

### 9. TERRAIN & CONTEXT VARIATIONS
How technique adapts across: Sand, mud, rocky terrain, steep incline/descent, tight trees. Only include relevant variations.

### 10. EXPERT INSIGHTS & SOURCES
Key insights from professional riders/coaches. Reference sources used.

## QUALITY CHECKLIST
All 10 sections present and populated. Cross-references use valid topic IDs. Coaching language sounds like a real coach. Beginner/Intermediate/Advanced are genuinely distinct. Diagnostic cues are specific enough for AI. Drills are practical. No placeholder text remains.
