# Review: mud-climb-rut-stall

## Issue
Body position coaching is too vague. Says "keep your body position forward enough" — should reference standing on the pegs, weight through the pegs, using legs to absorb ruts. This is observable and within allowed claim types.

## Root cause
Likely a KB gap — check TERRAIN-01 and DYNAMICS-04/09 for standing position and peg weighting references. If absent, the context pack gives Pass 2 nothing specific to work with.

## Action
1. Check KB entries for standing/peg references
2. If missing, add to technique_cues
3. Consider adding a Pass 2 prompt hint that body_position coaching should reference standing vs seated and peg weighting where observable
