// Maps raw pipeline output to the UI-facing AnalysisResult type.
// Pipeline internals do not cross this boundary.

import type { PipelineResult } from '@/pipeline/types';
import type { AnalysisResult } from '@/lib/types';

const INTENT_LABELS: Record<string, string> = {
  climb: 'Steep climb attempt',
  descent: 'Descent',
  traverse: 'Traverse',
  jump: 'Jump attempt',
  obstacle_clear: 'Obstacle clearance',
  trail_ride: 'Trail riding',
  technical_section: 'Technical section',
  race_section: 'Race section',
  practice: 'Practice run',
  unknown: 'Unknown intent',
};

const FAILURE_LABELS: Record<string, string> = {
  technique: 'Technique',
  decision: 'Decision error',
  momentum: 'Momentum loss',
  traction: 'Traction loss',
  mechanical: 'Mechanical',
  line_choice: 'Line choice',
  fitness: 'Fitness / fatigue',
  none: 'No failure',
  unknown: 'Unclassified',
};

const GRADIENT_LABELS: Record<string, string> = {
  flat: 'Flat',
  gentle_up: 'Gentle climb',
  moderate_up: 'Moderate climb',
  steep_up: 'Steep climb',
  very_steep_up: 'Very steep climb',
  gentle_down: 'Gentle descent',
  moderate_down: 'Moderate descent',
  steep_down: 'Steep descent',
  very_steep_down: 'Very steep descent',
  undulating: 'Undulating',
};

function buildTerrainLabel(result: PipelineResult): string {
  const gradient = result.stage4.gradient.overall;
  const surface = result.stage4.surface.primary_type;
  const gl = GRADIENT_LABELS[gradient] ?? gradient.replace(/_/g, ' ');
  const sl = surface.charAt(0).toUpperCase() + surface.slice(1).replace(/_/g, ' ');
  return `${gl} · ${sl}`;
}

function buildSupportingPoints(result: PipelineResult): string[] {
  const points: string[] = [];

  if (result.stage10?.secondary_focuses) {
    for (const sf of result.stage10.secondary_focuses.slice(0, 2)) {
      const text = sf.what_to_change ?? sf.title;
      if (text) points.push(text);
    }
  }

  if (result.stage10?.next_attempt_plan) {
    for (const p of result.stage10.next_attempt_plan) {
      if (points.length >= 3) break;
      points.push(p);
    }
  }

  return points.slice(0, 3);
}

function buildSafetyNote(result: PipelineResult): string | undefined {
  if (result.stage11 && !result.stage11.safe) {
    return (
      result.stage11.issues[0] ??
      'Safety concern flagged — review with a qualified coach before your next attempt.'
    );
  }
  if (result.stage10?.uncertainty_statement) {
    return result.stage10.uncertainty_statement;
  }
  return undefined;
}

export function formatResult(pipeline: PipelineResult): AnalysisResult {
  const { stage2, stage3, stage6, stage9, stage10 } = pipeline;

  return {
    summary: {
      intent: INTENT_LABELS[stage3.intent_category] ?? stage3.primary_intent,
      terrain: buildTerrainLabel(pipeline),
      failureType: FAILURE_LABELS[stage6?.failure_type ?? 'unknown'] ?? 'Unclassified',
      confidence: stage9?.primary_focus?.confidence ?? stage2.overall_confidence,
    },
    coaching: {
      title: stage10?.primary_focus?.title ?? 'Coaching unavailable',
      message:
        stage10?.rider_facing_summary ??
        stage10?.primary_focus?.what_to_change ??
        'Insufficient observability to generate coaching for this clip.',
    },
    supporting: buildSupportingPoints(pipeline),
    safetyNote: buildSafetyNote(pipeline),
  };
}
