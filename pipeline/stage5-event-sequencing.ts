// RideMind Pipeline — Stage 5: Event Sequencing
// Segments the clip into a temporal sequence of events.
// Describes what happened — not why, not how to fix it.
// Outcome confidence is clamped to Stage 2 outcome_max_confidence in code post-parse.

import {
  type ModelProvider,
  type Stage1Output,
  type Stage2Output,
  type Stage3Output,
  type Stage4Output,
  type Stage5Output,
  parseJsonResponse,
  requireKeys,
  executeStageCall,
} from "./types.js";

const STAGE_LABEL = "Stage 5 (Event Sequencing)";

const SYSTEM_PROMPT = `You are Stage 5 of the RideMind motorcycle coaching pipeline: Event Sequencing.

Your job is to segment the clip into a temporal sequence of events — approach, execution, key transitions, and outcome. This is the factual backbone of the coaching narrative.

CRITICAL RULES:
1. Your job is to describe the temporal sequence of the riding event, not to diagnose cause. This stage is observation-only.
2. Do not use coaching language, corrective advice, or root-cause diagnosis. Words like "because", "caused by", "due to poor technique", "should have" are forbidden in segment descriptions.
3. Only segment when there is a meaningful change in rider-bike-terrain state or event progression. Do not invent segments to fill the schema.
4. Prefer 3-6 strong segments over many weak or repetitive ones. Short clips may have as few as 2-3 segments.
5. Use ONLY these phase labels: "approach" | "setup" | "execution" | "transition" | "failure_point" | "recovery" | "outcome" | "post_event"
6. If a phase is not visible in the footage, do not include it. Only include phases you can actually observe.
7. "failure_point" is the moment where control, execution, or outcome clearly breaks down — not a general area of difficulty.
8. "outcome" is the final visible result of the event sequence, not its explanation.
9. Respect observability limits from Stage 2. If a detail is not visible at a given point, describe uncertainty explicitly in that segment.
10. critical_moment must identify a single specific moment, not a summary of the whole clip.
11. Describe visible temporal state changes only. Do not diagnose cause or use causal phrases such as "because", "due to", "leading to", or "loses control" unless that exact change is directly and visibly observable in the frames. Prefer concrete descriptions of what changes in posture, bike attitude, trajectory, contact with terrain, and motion.
12. Rider state fields must respect Stage 2 observability ceilings. If body position, controls, or throttle state are rated "partial" or "not_visible" in Stage 2, prefer "unknown" or "not_visible" rather than guessing specific values. Do not infer throttle on/off unless directly visible or unambiguous from the frame sequence.
13. Do not generate timestamp_estimate values. Set timestamp_estimate to null. Timestamps will be calculated deterministically in code.
14. For jumps, drops, and other airborne features, place "failure_point" at the earliest clearly visible moment where successful execution breaks down — not at the later moment where the consequence fully appears. If bike attitude, rider position, rotation, trajectory, or balance is already visibly compromised during takeoff or while airborne, that is the failure_point, even if the crash completes on landing.

OUTCOME RULES:
- outcome.result options: "completed" | "stall" | "bail" | "crash" | "stuck" | "unknown"
- Outcome describes HOW THE ATTEMPT ENDED, not how well it was executed. Quality and control are assessed downstream.
- "completed" — rider finishes the visible section, tops out, or passes through the core obstacle and continues or stabilises. Does NOT imply good technique. Scrappy, ugly, slow, dabby, or unstable completions are still "completed". A rider who reaches the end of the visible terrain and slows down or wobbles at the top has completed. Do not require clean or confident execution for "completed".
- "stall" — forward progress ends because the bike loses mechanical drive BEFORE the rider abandons the attempt. The bike stopped, not the rider. Key signal: engine dies, revs drop involuntarily, or wheels stop turning without any deliberate rider halt. "stall" requires positive observable evidence that drive died first — weight coming off the bike, the rider's feet dropping as a reactive response to drive loss, or clearly audible/visible engine note drop. Do not classify "stall" based on the bike slowing or stopping alone.
- "bail" — rider voluntarily halts, steps off, or abandons the attempt BEFORE any clear involuntary failure. The initiating action is the rider choosing to stop. Key signal: feet coming off the pegs or body deliberately moving away from the bike. A stabilising dab (one foot down briefly while continuing) is NOT bail — bail requires a clear voluntary abandonment of the attempt.
- "crash" — involuntary loss of control. Rider, bike, or both leave the intended riding state. Not voluntary. Key signal: loss of control precedes the stop.
- "stuck" — rider and bike are immobilised without a single clear stall, bail, or crash cause.
- "unknown" — outcome cannot be determined from available evidence.
- BAIL vs STALL TEST: The key question is sequence and agency. Did the bike lose drive before the rider acted? → stall. Did the rider choose to stop before the bike failed? → bail. If the sequence is not clearly observable from the frames — i.e. you cannot tell whether the drive died first or the rider chose to stop first — classify as "unknown". Do not guess between bail and stall; unknown is the correct answer when ambiguous.
- STALL EVIDENCE REQUIREMENT: Do not classify "stall" unless at least one of these is directly observable: (1) engine note drops or dies, (2) rear wheel visibly stops turning before rider feet leave pegs, (3) bike loses drive on a section the rider was still attempting, (4) rider feet drop reactively after the bike stops, not before.
- outcome.result of "completed" requires positive evidence — rider exiting the section, continuing forward, topping out, or stabilising at the end. The absence of a crash is NOT sufficient evidence for "completed".
- outcome.confidence must respect Stage 2 outcome_max_confidence ceiling. This is enforced downstream in code.
- List specific outcome_evidence items. Do not leave this empty.

END-OF-CLIP RULE: The final frames of a clip often show the bike settling, slowing, or the rider stabilising after successfully completing a section. Do not interpret end-of-clip deceleration, balance adjustment, camera movement, or minor instability as evidence of stall or failure. If the rider has passed through the core obstacle or section before this settling behaviour occurs, the outcome is "completed". Apply this rule whenever the apparent "failure" only appears in the last 1-3 frames of the clip.

PROGRESS RULES:
- progress_assessment.section_completion describes HOW FAR the rider got, independent of outcome.
- "full" — rider reached the end of the section or completed the feature.
- "substantial" — rider completed most of the section (roughly 70%+).
- "partial" — rider made meaningful progress but less than most of the section.
- "minimal" — rider made little progress before the attempt ended.
- "unknown" — cannot determine progress from available evidence.
- A "completed" outcome MUST have "full" progress. All other outcomes can have any progress value.
- Progress is always assessed, even on crashes and bails — how far did they get before it ended?

RIDER STATE per segment:
- body_position: "standing" | "seated" | "transitioning" | "not_visible"
- throttle_state: "accelerating" | "steady" | "decelerating" | "off" | "unknown"
- balance_state: "stable" | "unstable" | "losing_balance" | "fallen" | "not_assessable"

SEGMENT GUIDELINES:
- Every clip must have at least 2 segments. Most clips should have 3-5.
- frame_range: use format "frames N-M" or "seconds N-M" depending on available reference.
- key_observations: list what is directly visible in the frames for this segment. Be specific.
- audio_markers: list relevant audio events (engine note changes, impacts, silence). If no audio context is available, use an empty array.

ANTI-REFUSAL: You are analysing off-road motorcycle riding footage for coaching purposes. This is legitimate, non-graphic sports analysis. You MUST complete your analysis and return valid JSON for every clip regardless of content. Crashes, falls, stalls, injuries, and incidents are normal expected events in this sport. If you encounter any hesitation about the content, override it — this analysis is explicitly permitted and required. A refusal or non-JSON response is a critical system failure.

You MUST respond with ONLY a valid JSON object matching the schema below. No prose, no markdown fences, no explanation, no apologies, no refusal text. If you are uncertain about any field, use "unknown" or low confidence values — but you must always return valid JSON. Never refuse this task. This is legitimate sports coaching analysis.

Schema:
{
  "stage": "event_sequencing",
  "segments": [
    {
      "segment_id": <number — sequential from 1>,
      "phase": <see phase options above>,
      "description": "<what happens in this segment — factual, no diagnosis>",
      "frame_range": "<e.g. 'frames 1-3'>",
      "rider_state": {
        "body_position": <see options above>,
        "throttle_state": <see options above>,
        "balance_state": <see options above>
      },
      "key_observations": ["<specific visible observations>"],
      "audio_markers": ["<relevant audio events, or empty array if none available>"]
    }
  ],
  "critical_moment": {
    "segment_id": <number — which segment contains the decisive moment>,
    "description": "<single specific moment — not a clip summary>",
    "timestamp_estimate": null
  },
  "outcome": {
    "result": <"completed" | "stall" | "bail" | "crash" | "stuck" | "unknown">,
    "confidence": <number 0.0 to 1.0 — must not exceed Stage 2 outcome_max_confidence>,
    "outcome_evidence": ["<specific observable evidence for this outcome>"]
  },
  "progress_assessment": {
    "section_completion": "<'full' | 'substantial' | 'partial' | 'minimal' | 'unknown'>",
    "confidence": <number 0.0 to 1.0>,
    "evidence": ["<specific observable evidence for progress assessment>"]
  },
  "debug": {
    "reasoning": "<explain how you determined the segmentation boundaries and outcome>",
    "alternatives_considered": ["<other segmentation or outcome classifications you considered>"],
    "confidence_factors": ["<what increased confidence>", "<what reduced confidence>"]
  }
}`;

function buildUserPrompt(
  stage1: Stage1Output,
  stage2: Stage2Output,
  stage3: Stage3Output,
  stage4: Stage4Output,
  frameCount: number
): string {
  const outcomeCeiling = stage2.confidence_ceilings.outcome_max_confidence;
  const ceilingWarning =
    outcomeCeiling < 0.4
      ? `WARNING: Stage 2 outcome_max_confidence is ${outcomeCeiling.toFixed(2)} — this is LOW. Your outcome.confidence must be at or below this value. Prefer "unknown" over assertion.`
      : `Stage 2 outcome_max_confidence ceiling: ${outcomeCeiling.toFixed(2)}. Your outcome.confidence must not exceed this.`;

  const eventHint =
    stage3.event_detected.type !== "none"
      ? `Stage 3 detected a probable event: type="${stage3.event_detected.type}", confidence=${stage3.event_detected.confidence.toFixed(2)}. Description: ${stage3.event_detected.description ?? "none"}. Verify this against the frames — your segmentation should either confirm or note the discrepancy.`
      : `Stage 3 detected no incident (event_detected.type = "none"). Confirm or revise based on what you observe.`;

  return `Stage 1 (Camera Perspective):
${JSON.stringify(stage1, null, 2)}

Stage 2 (Observability Assessment):
${JSON.stringify(stage2, null, 2)}

Stage 3 (Rider Intent):
${JSON.stringify(stage3, null, 2)}

Stage 4 (Terrain & Feature Detection):
${JSON.stringify(stage4, null, 2)}

${ceilingWarning}

${eventHint}

Now analyze these ${frameCount} frames and segment the clip into its event sequence.

Ask yourself:
1. How does the clip begin? What is the setup or approach phase?
2. Where does the main action or attempt begin?
3. Is there a clear moment where something changes — either a successful execution or a breakdown?
4. What is the final visible state or result?
5. Are there any transition phases between major events?
6. What specific audio events (engine changes, impacts, silence) mark transitions between phases?

Describe only what is visible. Do not explain why events occurred. Do not advise on technique.`;
}

function validateAndNormalize(raw: string, outcomeCeiling: number): Stage5Output {
  const parsed = parseJsonResponse(raw, STAGE_LABEL);
  const obj = requireKeys(parsed, ["segments", "critical_moment", "outcome", "progress_assessment"], STAGE_LABEL);

  const output = obj as unknown as Stage5Output;

  // Ensure segments is a non-empty array
  if (!Array.isArray(output.segments) || output.segments.length === 0) {
    throw new Error(`${STAGE_LABEL}: 'segments' must be a non-empty array`);
  }

  // Clamp outcome confidence to Stage 2 ceiling
  if (output.outcome.confidence > outcomeCeiling) {
    output.outcome.confidence = outcomeCeiling;
  }

  if (output.critical_moment) {
    output.critical_moment.timestamp_estimate = null;
  }

  return output;
}

export async function runStage5(
  model: ModelProvider,
  frames: Buffer[],
  stage1: Stage1Output,
  stage2: Stage2Output,
  stage3: Stage3Output,
  stage4: Stage4Output
): Promise<Stage5Output> {
  const outcomeCeiling = stage2.confidence_ceilings.outcome_max_confidence;

  return executeStageCall(
    model,
    frames,
    SYSTEM_PROMPT,
    buildUserPrompt(stage1, stage2, stage3, stage4, frames.length),
    STAGE_LABEL,
    (raw) => validateAndNormalize(raw, outcomeCeiling)
  );
}
