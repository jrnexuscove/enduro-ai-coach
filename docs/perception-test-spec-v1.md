# Perception Viability Experiment — Spec v1

## Purpose

Test whether current vision models can reliably perceive riding events from still frames before investing further in the pipeline reasoning layer.

The pipeline reasoning layer (S1–S11) is solid and transfers to any perception system. The bottleneck is perception reliability. This experiment isolates perception from reasoning.

## Design

- **3 clips**: Nick Crash, Colin Hill, Steep Hill Bail
- **3 models**: GPT-4o, Gemini 2.5 Flash, Claude (Sonnet)
- **16 frames** per clip, evenly spaced, extracted via ffmpeg
- **No pipeline, no KB, no coaching** — raw observation prompt only
- **Same frames to all models** — no Gemini video shortcut

Model names are config-driven, not hardcoded.

## Prompt (perception_v1)

```
You are viewing sequential still frames extracted at even intervals from a single off-road motorcycle clip.

Describe only what is visually observable in the frames. Do not infer intent, cause, skill level, or coaching advice.

If something is unclear, occluded, or not visible, state that explicitly.

Return your answer under these exact headings:

1. Rider objective & context
2. Rider
3. Terrain & environment
4. Events
5. Outcome
6. Unclear or not visible
```

## Input Conditions (Fixed)

All models receive identical input:

- Same 16 frames (extracted once, reused across models)
- Same frame dimensions (no resizing per model)
- Same frame ordering
- Same prompt text
- Temperature 0 (or lowest available)
- Frames only — no video files, no audio

## Output Format

One JSON file per clip × model combination. Saved to `results/perception-test/`.

```json
{
  "clip": "nick-crash",
  "model": "gpt-4o",
  "model_id": "gpt-4o-2024-11-20",
  "frames_extracted": 16,
  "frame_dimensions": "1920x1080",
  "prompt_version": "perception_v1",
  "response_raw": "...",
  "response_parsed": {
    "rider_objective_context": "...",
    "rider": "...",
    "terrain_environment": "...",
    "events": "...",
    "outcome": "...",
    "unclear_not_visible": "..."
  },
  "duration_ms": 12400,
  "token_usage": {
    "input": 8200,
    "output": 650
  },
  "timestamp": "2026-04-10T..."
}
```

## Scoring

Each model response is scored against human ground truth (in `results/perception-test/ground-truth/`).

### Criteria

| # | Criterion | What you're checking |
|---|-----------|---------------------|
| 1 | Rider objective | Did it correctly identify what the rider is attempting? |
| 2 | Outcome | Did it correctly identify how the clip ends? |
| 3 | Event sequence | Did it get the sequence of events right? |
| 4 | Terrain / features | Did it correctly describe surface and features? |
| 5 | Visibility handling | Did it correctly acknowledge what could not be seen? |
| 6 | Hallucination | Did it claim to see things that aren't there? |

### Scale

- **0** — Wrong
- **1** — Partial
- **2** — Correct

### Evidence Notes

Every score must include a one-line evidence note explaining why. Example:

> Terrain = 1 — "Correctly identified rocky uphill, missed loose embedded rock vs dirt mix."

## Decision Gate

After scoring all 9 runs:

- **If no model sees reliably** → rethink frame strategy before further pipeline work
- **If one model sees clearly** → route perception stages to that model
- **If all inconsistent** → need uncertainty-aware system or CV layer

## Script

`scripts/perception-test.ts`

```
Config:
  clips: [nick-crash, colin-hill, steep-hill-bail]
  models: [gpt-4o, gemini-2.5-flash, claude-sonnet]
  frames_per_clip: 16
  temperature: 0
  output_dir: results/perception-test/
  ground_truth_dir: results/perception-test/ground-truth/
  frames_dir: /tmp/perception-test-frames/

Flow:
  for each clip:
    extract 16 frames via ffmpeg → frames_dir/{clip}/
    for each model:
      send frames + prompt
      parse response into sections
      save { clip, model, prompt, response_raw, response_parsed, timing, tokens }

Output:
  results/perception-test/{clip}_{model}.json  (9 files)
```

## Future Expansion

These 3 clips are a Phase 1 smoke test. If the framework proves useful, expand to cover:

- Clean successful climb (e.g. Long Hill)
- Failed climb without crash
- Crash with obvious outcome
- Ambiguous / poor observability clip
- Airborne / jump sequence
- Easy terrain read
- Hard / mixed terrain read
- Clip where model should explicitly say "unclear"

All 8 test clips have ground truth written and ready.
