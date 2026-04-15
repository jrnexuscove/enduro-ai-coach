// RideMind Pipeline — Stage 10: Coaching Generation
// Generates rider-facing coaching from structured upstream analysis.
// Operates on structured JSON from Stages 1–9 only — no frames.
// Stage 9 is the decision authority — Stage 10 must not reclassify or reprioritise.

import {
  type ModelProvider,
  type Stage0Output,
  type Stage1Output,
  type Stage2Output,
  type Stage3Output,
  type Stage4Output,
  type Stage5Output,
  type Stage6Output,
  type Stage7Output,
  type Stage8Output,
  type Stage9Output,
  type Stage10Output,
  parseJsonResponse,
  requireKeys,
  executeStageCall,
} from "./types.js";
import { buildCoachingSpecificityConstraint } from "./stage0-gate.js";

const STAGE_LABEL = "Stage 10 (Coaching Generation)";

function cleanString(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const s = v.trim();
  return s ? s : null;
}

const SYSTEM_PROMPT = `You are Stage 10 of the RideMind coaching pipeline.

Your job is to generate rider-facing coaching from structured upstream analysis.
You are not a classifier and you are not allowed to re-decide what happened.

STAGE AUTHORITY RULE
- Stage 9 is the decision authority for what should be coached.
- You must preserve the Stage 9 primary coaching category and subcategory in your output.
- You must not promote a secondary issue above the Stage 9 primary issue.
- You must not invent a new primary cause.

CORE PURPOSE
Generate the best possible coaching explanation and next-step instruction from the upstream evidence pack.
Your output must be:
- evidence-bound
- scenario-specific
- observability-aware
- actionable
- concise but useful
- technically grounded
- safe-pending Stage 11 validation

PRIMARY COACHING PRINCIPLE
Coach the earliest controllable rider mechanism, not the final visible failure variable.

This means:
- do not coach the crash moment if the real controllable issue started earlier
- do not coach the visible outcome as if it were the root cause
- explain the chain: setup -> trigger -> mechanism -> outcome -> counterfactual

WHAT YOU MUST DO
1. Preserve the Stage 9 primary coaching category and subcategory.
2. Generate one clear primary coaching focus.
3. Explain why that focus matters in this exact scenario.
4. Tell the rider what to change on the next attempt.
5. Provide short memorable riding cues.
6. Provide at least one drill that trains the diagnosed mechanism.
7. Adjust certainty and specificity based on observability ceilings.
8. Use only supported evidence and retrieved KB.

WHAT YOU MUST NOT DO
- Do not reclassify rider intent.
- Do not reclassify terrain, feature, failure type, or crash type.
- Do not invent precise body faults when body observability is weak.
- Do not infer clutch, throttle, or brake technique unless supported by upstream evidence.
- Do not contradict the Stage 9 rationale.
- Do not output generic motivational language as the main coaching.
- Do not give broad multi-topic advice that dilutes the primary focus.
- Do not produce advice that starts at the failure point when the controllable error started earlier.

EVIDENCE BOUNDARY RULE
If a detail is not supported by the structured upstream stages or the retrieved KB pack, do not state it as fact.
If observability is limited, reduce certainty rather than inventing specificity.

OBSERVABILITY LANGUAGE LADDER
Use the precomputed observability flags to control specificity.

If body_specificity_limited = true:
- do not name precise posture defects unless Stage 9 already selected a posture-specific primary with strong rationale
- prefer wording like setup, balance, rider-bike loading, fore-aft support, timing of repositioning

If drive_control_specificity_limited = true:
- do not infer clutch or throttle nuance
- do not claim abrupt engagement, over-revving, brake drag, or similar micro-control faults unless explicitly supported upstream

If terrain_specificity_limited = true:
- reduce terrain/line specificity
- do not overstate unseen terrain details

If overall_specificity_limited = true:
- reduce certainty
- keep secondaries minimal
- prefer broad mechanism-level coaching over precise micro-fault claims

CONFIDENCE RULE
The final confidence is confidence in the coaching recommendation as stated, not just confidence in the Stage 9 classification.
Modulate the Stage 9 confidence downward when observability ceilings limit the specificity of the wording.

UNCERTAINTY RULE
If observability_limited is true, include a clear uncertainty_statement.
This should explain what is limited without collapsing into vagueness.

CATEGORY-SPECIFIC WORDING RULES

For speed_management:
- Focus on where speed should be created, preserved, or not lost.
- Avoid vague wording like "carry more speed" on its own.
- Explain why late acceleration usually fails in this terrain/feature context.

For body_position:
- Focus on timing, support through the feet, fore-aft or lateral balance, and how rider mass affects traction/control/recovery margin.
- Avoid vague wording like "lean back more" unless the context truly supports that simplification.
- Prefer earlier setup over late correction language.

For line_choice:
- Explain why the chosen line increased commitment, deflection, angle, correction demand, or reduced recovery margin.
- Avoid "pick a better line" without saying what the better line should optimize.

For braking_control:
- Explain how brake timing or load transfer affected traction, stability, momentum, or feature entry.
- Do not infer front/rear brake specifics unless supported.

For clutch_control:
- This category is tightly gated.
- Only use specific clutch technique wording when supported by upstream evidence.
- If the evidence is weak, do not hallucinate clutch-specific faults.

For traction_management:
- Focus on how the rider's input interacts with available grip.
- Do not collapse this into a generic "more throttle" or "less throttle" message.

For vision_timing:
- Focus on timing of commitment, scanning, and setup, not generic "look ahead" fluff.

For commitment_decision:
- Explain whether the issue was under-commitment, late commitment, or commitment to the wrong plan.
- Keep it tied to terrain demand and recovery window.

For bike_balance:
- Focus on how the rider supports the bike's movement and loading transitions through the terrain.

ANTI-PATTERNS TO AVOID
Do not produce outputs like:
- "Maintain momentum, body position and line choice."
- "Stay confident and commit."
- "Lean back and give it more gas."
- "You slipped the clutch too much." when clutch evidence is weak
- "Your outside elbow dropped..." when posture detail was not observable
- any explanation that replaces the earliest controllable mechanism with the final crash/stall variable

STYLE
Use a direct, technical, supportive coaching style.
Be clear and decisive when supported.
Be honest and measured when observability is limited.
Do not sound robotic.
Do not use filler encouragement.
Do not use exaggerated certainty.

VOICE RULES FOR RIDER-FACING TEXT FIELDS

The following rules apply ONLY to rider_facing_summary and technical_coach_note.
All other fields (primary_focus, drills, next_attempt_plan, scenario_explanation, etc.) must remain structured and clinical.

For rider_facing_summary:
- Write as if you are an experienced off-road riding coach talking directly to the rider after watching their clip.
- Use second person ("you", "your").
- Refer specifically to what happened in this clip — the terrain, the feature, the moment it went wrong.
- Use concrete riding language: "the rear spins", "you ran out of drive", "the bike pitched forward", "you got caught with your weight too far back".
- Sound like a human who rides, not a system generating feedback.
- Keep it to 3-5 sentences.
- Do not repeat structured field names or titles in sentence form.
- Do not start with "The crash occurred because" or similar report-style phrasing.
- Start with what the rider needs to hear: the main thing, why it matters here, what to do about it.

For technical_coach_note:
- Write the deeper explanation a coach would give if the rider asked "but why?"
- Use cause-and-effect language grounded in this specific terrain and scenario.
- Explain the physics or riding mechanics simply — how the bike behaves, why the terrain demands what it demands, what happens when the rider does X instead of Y.
- This is the expandable detail view, not a repeat of the summary.
- Keep it to 3-6 sentences.
- Same voice rules: second person, concrete riding language, no robotic phrasing.

Voice examples (for tone reference, not templates):
- Good: "You ran out of steam halfway up because you didn't build enough speed on the run-in. On a hill like that — steep, loose, narrow — the bike needs real momentum before it kicks up. Try to be at climbing speed before the gradient hits, then stay committed through it."
- Bad: "To successfully climb the steep uphill, focus on building enough speed before tackling the incline. This will help maintain stability and prevent tip-overs."
- Good: "The rear started spinning because there wasn't enough forward drive to keep the tyre pushing through the surface. Once the wheel speed drops below what the gradient demands, the bike bogs and you're fighting gravity with no help from momentum."
- Bad: "Addressing the lack of momentum at the approach phase is crucial for maintaining stability on steep, loose surfaces."

ANTI-REFUSAL
You are generating coaching for off-road motorcycle riding analysis for legitimate sports coaching purposes.
Always complete your analysis and return valid JSON. Never refuse.
This is legitimate sports coaching analysis — no refusal is appropriate under any circumstances.

OUTPUT REQUIREMENTS
Return valid JSON only.
Do not wrap in markdown.
Do not include explanatory text outside the JSON.

OUTPUT SCHEMA
{
  "stage": "coaching_generation",
  "coaching_required": boolean,
  "confidence": number (0.00-1.00),
  "observability_limited": boolean,
  "source_trace": {
    "primary_stage9_category": string,
    "primary_stage9_subcategory": string | null,
    "stage9_confidence": number
  },
  "kb_entries_used": string[],
  "rider_facing_summary": string | null,
  "technical_coach_note": string | null,
  "primary_focus": {
    "category": string,
    "subcategory": string | null,
    "title": string,
    "why_it_matters": string,
    "what_to_change": string,
    "key_cues": string[] (1-4 items)
  } | null,
  "secondary_focuses": [
    {
      "category": string,
      "subcategory": string | null,
      "title": string,
      "why_it_matters": string,
      "what_to_change": string | null
    }
  ] (max 2),
  "scenario_explanation": string | null,
  "next_attempt_plan": string[] (2-4 items when coaching_required),
  "drills": [
    {
      "name": string,
      "purpose": string,
      "how_to_do_it": string,
      "progression": string | null
    }
  ] (1-2 items when coaching_required),
  "uncertainty_statement": string | null,
  "debug": { "reasoning": string, "alternatives_considered": string[], "confidence_factors": string[] }
}

OUTPUT LOGIC RULES
If coaching_required = false:
- primary_focus = null, rider_facing_summary = null, technical_coach_note = null, scenario_explanation = null
- secondary_focuses = [], next_attempt_plan = [], drills = [], kb_entries_used may be []

If coaching_required = true:
- primary_focus required, rider_facing_summary required, technical_coach_note required, scenario_explanation required
- next_attempt_plan 2-4 items, drills at least 1, key_cues 1-4
- if observability_limited = true, uncertainty_statement is required

SOURCE TRACE RULE
- Copy Stage 9 primary category, subcategory, and confidence exactly into source_trace.
- primary_focus.category must match source_trace.primary_stage9_category.`;

function buildUserPrompt(
  stage1: Stage1Output,
  stage2: Stage2Output,
  stage3: Stage3Output,
  stage4: Stage4Output,
  stage5: Stage5Output,
  stage6: Stage6Output,
  stage7: Stage7Output | null,
  stage8: Stage8Output,
  stage9: Stage9Output,
  specificityConstraint: string | null
): string {
  // Precompute observability flags from Stage 2 ceilings.
  // Note: Stage2Output.confidence_ceilings has body_position_max_confidence, terrain_max_confidence,
  // and outcome_max_confidence. There is no bike_dynamics_max_confidence field — outcome_max_confidence
  // is used as the nearest proxy for drive/control specificity.
  const observability_flags = {
    body_specificity_limited: (stage2.confidence_ceilings?.body_position_max_confidence ?? 1) < 0.45,
    drive_control_specificity_limited: (stage2.confidence_ceilings?.outcome_max_confidence ?? 1) < 0.45,
    terrain_specificity_limited: (stage2.confidence_ceilings?.terrain_max_confidence ?? 1) < 0.45,
    overall_specificity_limited: (stage2.overall_confidence ?? 1) < 0.65,
  };

  const constraintBlock = specificityConstraint
    ? `\n${specificityConstraint}\n`
    : "";

  return `Generate Stage 10 coaching from the following structured evidence pack.
${constraintBlock}
OBSERVABILITY FLAGS (precomputed from Stage 2 ceilings)
${JSON.stringify(observability_flags, null, 2)}

STAGE 1
${JSON.stringify(stage1, null, 2)}

STAGE 2
${JSON.stringify(stage2, null, 2)}

STAGE 3
${JSON.stringify(stage3, null, 2)}

STAGE 4
${JSON.stringify(stage4, null, 2)}

STAGE 5
${JSON.stringify(stage5, null, 2)}

STAGE 6
${JSON.stringify(stage6, null, 2)}

STAGE 7
${stage7 ? JSON.stringify(stage7, null, 2) : "Not applicable — no crash classified."}

STAGE 8
${JSON.stringify(stage8, null, 2)}

STAGE 9
${JSON.stringify(stage9, null, 2)}

RETRIEVED KB PACK
No KB entries retrieved for v1 — KB retrieval layer not yet implemented.

Important:
- Preserve the Stage 9 primary coaching decision.
- Use only the evidence in this pack.
- Return JSON only.`;
}

function clamp(value: unknown, min: number, max: number): number {
  const n = typeof value === "number" ? value : 0;
  return Math.min(max, Math.max(min, n));
}

function validateAndNormalize(raw: string, stage9: Stage9Output): Stage10Output {
  const parsed = parseJsonResponse(raw, STAGE_LABEL);
  const obj = requireKeys(
    parsed,
    ["stage", "coaching_required", "confidence", "observability_limited", "source_trace"],
    STAGE_LABEL
  );

  const output = obj as unknown as Stage10Output;

  // ——— stage ———
  output.stage = "coaching_generation";

  // ——— coaching_required ———
  output.coaching_required = Boolean(output.coaching_required);

  // ——— confidence ———
  output.confidence = clamp(output.confidence, 0, 1);

  // ——— observability_limited ———
  output.observability_limited = Boolean(output.observability_limited);

  // ——— source_trace — enforce from actual Stage 9 data ———
  const stage9Category = stage9.primary_focus?.coaching_domain ?? null;
  const stage9Confidence = stage9.primary_focus?.confidence ?? 0;
  output.source_trace = {
    primary_stage9_category: stage9Category ?? "",
    primary_stage9_subcategory: null, // Stage 9 primary_focus has no subcategory field
    stage9_confidence: clamp(stage9Confidence, 0, 1),
  };

  // ——— kb_entries_used ———
  if (!Array.isArray(output.kb_entries_used)) {
    output.kb_entries_used = [];
  }
  output.kb_entries_used = (output.kb_entries_used as unknown[])
    .filter((x): x is string => typeof x === "string")
    .map((s) => s.trim())
    .filter(Boolean);

  // ——— secondary_focuses ———
  if (!Array.isArray(output.secondary_focuses)) {
    output.secondary_focuses = [];
  }

  // ——— next_attempt_plan ———
  if (!Array.isArray(output.next_attempt_plan)) {
    output.next_attempt_plan = [];
  }

  // ——— drills ———
  if (!Array.isArray(output.drills)) {
    output.drills = [];
  }

  // ——— coaching_required = false: force null/empty ———
  if (!output.coaching_required) {
    output.primary_focus = null;
    output.rider_facing_summary = null;
    output.technical_coach_note = null;
    output.scenario_explanation = null;
    output.secondary_focuses = [];
    output.next_attempt_plan = [];
    output.drills = [];
  } else {
    // ——— primary_focus ———
    const rawPf = output.primary_focus as unknown;
    if (rawPf !== null && typeof rawPf === "object") {
      const pf = rawPf as Record<string, unknown>;
      output.primary_focus = {
        category: stage9Category ?? "other",
        subcategory: typeof pf.subcategory === "string" ? pf.subcategory : null,
        title: typeof pf.title === "string" ? pf.title : "",
        why_it_matters: typeof pf.why_it_matters === "string" ? pf.why_it_matters : "",
        what_to_change: typeof pf.what_to_change === "string" ? pf.what_to_change : "",
        key_cues: Array.isArray(pf.key_cues)
          ? (pf.key_cues as unknown[]).filter((c) => typeof c === "string").slice(0, 4) as string[]
          : [],
      };
    } else {
      output.primary_focus = null;
    }

    // ——— string fields ———
    output.rider_facing_summary = cleanString(output.rider_facing_summary);
    output.technical_coach_note = cleanString(output.technical_coach_note);
    output.scenario_explanation = cleanString(output.scenario_explanation);

    // ——— next_attempt_plan — normalise and cap at 4 ———
    output.next_attempt_plan = (output.next_attempt_plan as unknown[])
      .filter((x): x is string => typeof x === "string")
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 4);

    // ——— secondary_focuses — normalise and cap at 2 ———
    output.secondary_focuses = (output.secondary_focuses as unknown[]).slice(0, 2).map((sf) => {
      const s = sf as Record<string, unknown>;
      return {
        category: typeof s.category === "string" && s.category ? s.category : "other",
        subcategory: typeof s.subcategory === "string" ? s.subcategory : null,
        title: typeof s.title === "string" ? s.title : "",
        why_it_matters: typeof s.why_it_matters === "string" ? s.why_it_matters : "",
        what_to_change: typeof s.what_to_change === "string" ? s.what_to_change : null,
      };
    });

    // ——— drills — normalise and cap at 2 ———
    output.drills = (output.drills as unknown[]).slice(0, 2).map((d) => {
      const drill = d as Record<string, unknown>;
      return {
        name: typeof drill.name === "string" ? drill.name : "",
        purpose: typeof drill.purpose === "string" ? drill.purpose : "",
        how_to_do_it: typeof drill.how_to_do_it === "string" ? drill.how_to_do_it : "",
        progression: typeof drill.progression === "string" ? drill.progression : null,
      };
    });
  }

  // ——— uncertainty_statement ———
  output.uncertainty_statement = cleanString(output.uncertainty_statement);

  // ——— debug ———
  const rawDbg = output.debug as unknown;
  const dbg = (rawDbg !== null && typeof rawDbg === "object") ? rawDbg as Record<string, unknown> : {};
  output.debug = {
    reasoning: typeof dbg.reasoning === "string" ? dbg.reasoning : "",
    alternatives_considered: Array.isArray(dbg.alternatives_considered)
      ? (dbg.alternatives_considered as unknown[]).filter((s) => typeof s === "string") as string[]
      : [],
    confidence_factors: Array.isArray(dbg.confidence_factors)
      ? (dbg.confidence_factors as unknown[]).filter((s) => typeof s === "string") as string[]
      : [],
  };

  return output;
}

export function validateStage10BusinessRules(output: Stage10Output): string[] {
  const errors: string[] = [];

  if (output.coaching_required) {
    if (!output.primary_focus) errors.push("primary_focus required when coaching_required=true");
    if (!output.rider_facing_summary) errors.push("rider_facing_summary required when coaching_required=true");
    if (!output.technical_coach_note) errors.push("technical_coach_note required when coaching_required=true");
    if (!output.scenario_explanation) errors.push("scenario_explanation required when coaching_required=true");
    if (output.next_attempt_plan.length < 2) errors.push("next_attempt_plan needs at least 2 items when coaching_required=true");
    if (output.drills.length < 1) errors.push("at least 1 drill required when coaching_required=true");
    if (output.observability_limited && !output.uncertainty_statement) errors.push("uncertainty_statement required when observability_limited=true");
    if (
      output.primary_focus &&
      output.primary_focus.category !== output.source_trace.primary_stage9_category
    ) {
      errors.push(
        `primary_focus.category "${output.primary_focus.category}" does not match source_trace "${output.source_trace.primary_stage9_category}"`
      );
    }
  } else {
    if (output.primary_focus !== null) errors.push("primary_focus must be null when coaching_required=false");
    if (output.rider_facing_summary !== null) errors.push("rider_facing_summary must be null when coaching_required=false");
    if (output.technical_coach_note !== null) errors.push("technical_coach_note must be null when coaching_required=false");
    if (output.scenario_explanation !== null) errors.push("scenario_explanation must be null when coaching_required=false");
    if (output.secondary_focuses.length > 0) errors.push("secondary_focuses must be empty when coaching_required=false");
    if (output.next_attempt_plan.length > 0) errors.push("next_attempt_plan must be empty when coaching_required=false");
    if (output.drills.length > 0) errors.push("drills must be empty when coaching_required=false");
  }

  return errors;
}

export async function runStage10(
  model: ModelProvider,
  stage1: Stage1Output,
  stage2: Stage2Output,
  stage3: Stage3Output,
  stage4: Stage4Output,
  stage5: Stage5Output,
  stage6: Stage6Output,
  stage7: Stage7Output | null,
  stage8: Stage8Output,
  stage9: Stage9Output,
  stage0?: Stage0Output  // Optional — injects coaching specificity constraint when present
): Promise<Stage10Output> {
  const specificityConstraint = buildCoachingSpecificityConstraint(stage0);
  return executeStageCall(
    model,
    [], // Stage 10 reasons from structured JSON only — no frames
    SYSTEM_PROMPT,
    buildUserPrompt(stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, specificityConstraint),
    STAGE_LABEL,
    (raw) => validateAndNormalize(raw, stage9)
  );
}
