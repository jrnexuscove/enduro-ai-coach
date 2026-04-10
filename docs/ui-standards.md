# RideMind UI Standards

## Core Principle
RideMind v1 is a mobile-first product focused on a single loop:
upload → process → understand → act

## Design Priorities
1. Clarity over cleverness
2. Fast comprehension over dense detail
3. Trust through honesty, not polish
4. One primary coaching takeaway first
5. Mobile-first, desktop-compatible

## Mobile-First Rules
- Design for 375px viewport first, scale up
- Touch targets minimum 44px
- Single-column layout on mobile
- No horizontal scrolling
- Large, readable type — body minimum 16px
- Thumb-friendly action placement (bottom of screen)

## Layout
- Max content width: 640px centered on desktop
- Consistent vertical spacing scale: 8/16/24/32px
- Cards for grouped content, not raw text blocks
- One primary action visible per state

## Typography
- System font stack (no custom fonts in v1)
- Hierarchy: page title > section label > body > caption
- Coaching output: slightly larger body text for readability

## States
Every screen state must be designed:
- idle (upload prompt)
- ready (file selected)
- processing (progress indicators)
- result (coaching output)
- error (clear message + recovery action)

## Confidence & Uncertainty
- Show confidence as plain English: high / moderate / limited
- Never show raw decimal scores to users
- When confidence is limited, say why briefly
- Safety notes appear visually distinct (not buried in body text)

## Copy Tone
- Direct, specific, concise
- Coaching voice: like a knowledgeable riding buddy, not a textbook
- No hype, no waffling, no filler
- Prefer "We couldn't see X clearly" over "Error: low confidence"

## v1 Non-Goals
- No auth
- No user profiles
- No clip history
- No dashboard
- No settings
- No stage inspector
- No feature bloat
- No custom themes
