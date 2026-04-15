// RideMind KB Retrieval — Types
// Interfaces for perception input, KB artifacts, and the context pack.
// When ARCH-V2 Pass 1 schema lands, update fromStage4() — retrieval logic stays unchanged.

import type {
  SurfacePrimaryType,
  SurfaceCondition,
  FeatureType,
  FeatureSeverity,
  GradientOverall,
  FailureType,
  OutcomeResult,
  Stage4Output,
  Stage5Output,
  Stage6Output,
} from '@/pipeline/types';

// Re-export pipeline types used by retrieval consumers
export type { FailureType, FeatureSeverity, SurfacePrimaryType, OutcomeResult };

// ── Perception input ──────────────────────────────────────────────────────────
// Thin adapter interface over Stage 4 output (+ optional Stage 5/6 signals).
// Retrieval functions only touch this type — not raw pipeline stages.

export interface PerceptionSignal {
  type: FailureType;
  confidence: number;
}

export interface PerceptionInput {
  surface_type: SurfacePrimaryType;
  surface_condition: SurfaceCondition;
  gradient: GradientOverall;
  features_detected: Array<{
    feature_type: FeatureType;
    severity: FeatureSeverity;
    confidence: number;
  }>;
  /** Failure signals from Stage 6. Empty array = no failure diagnosed. */
  failure_signals: PerceptionSignal[];
  /** Section outcome from Stage 5, if available. */
  outcome?: OutcomeResult;
}

/**
 * Adapter: maps Stage4Output + optional Stage 5/6 data to PerceptionInput.
 * Swap the body of this function when ARCH-V2 Pass 1 schema replaces Stage 4.
 */
export function fromStage4(
  s4: Stage4Output,
  opts?: {
    stage5?: Stage5Output;
    stage6?: Stage6Output;
  }
): PerceptionInput {
  const failureSignals: PerceptionSignal[] = [];

  if (
    opts?.stage6?.failure_type &&
    opts.stage6.failure_type !== 'none' &&
    opts.stage6.failure_type !== 'unknown'
  ) {
    failureSignals.push({
      type: opts.stage6.failure_type,
      confidence: opts.stage6.confidence,
    });
  }

  return {
    surface_type: s4.surface.primary_type,
    surface_condition: s4.surface.condition,
    gradient: s4.gradient.overall,
    features_detected: s4.features_detected.map(f => ({
      feature_type: f.feature_type,
      severity: f.severity,
      confidence: f.confidence,
    })),
    failure_signals: failureSignals,
    outcome: opts?.stage5?.outcome.result,
  };
}

// ── KB artifacts ──────────────────────────────────────────────────────────────

export interface TerrainArtifact {
  topic_id: string;
  title: string;
  surface_type: string;
  /** Traction quality per surface condition. e.g. { wet: "low", saturated: "very_low" } */
  traction_range: Record<string, string>;
  /** Failure types commonly associated with this terrain. */
  failure_types: string[];
  /** Gradient contexts covered by this entry. */
  gradient_contexts: string[];
  /** Terrain types this entry is commonly confused with during Stage 4 classification. */
  common_misclassifications: string[];
  tags: string[];
  /** ≤500-char prose excerpt from Technique Implications section. Amendment 2 compliant. */
  technique_reference: string;
  technique_reference_truncated: boolean;
}

export interface FeatureArtifact {
  topic_id: string;
  title: string;
  feature_type: string;
  /** "single_event" | "continuous" */
  feature_class: string;
  /** Which severity tier was selected for this retrieval. */
  severity_tier: FeatureSeverity;
  /** Prose description of the selected severity tier from severity_definition. */
  severity_description: string;
  failure_types: string[];
  crash_types: string[];
  tags: string[];
  /** ≤500-char severity description (same as severity_description, capped per Amendment 2). */
  technique_reference: string;
  technique_reference_truncated: boolean;
}

export interface DynamicsArtifact {
  topic_id: string;
  title: string;
  tags: string[];
  related_topics: string[];
  /** ≤500-char prose excerpt from CORE PRINCIPLES section. Amendment 2 compliant. */
  technique_reference: string;
  technique_reference_truncated: boolean;
  /** Why this entry was selected — signals and terrain context that matched. */
  match_reason: string;
}

// ── Context pack ──────────────────────────────────────────────────────────────

export interface ContextPack {
  /** Terrain artifact for the detected surface type. Null if surface type not in KB. */
  terrain: TerrainArtifact | null;
  /** Feature artifacts for each detected feature. One per feature_detected entry. */
  features: FeatureArtifact[];
  /**
   * 0–3 dynamics artifacts ranked by Amendment 3 criteria:
   * signal confidence → signal frequency → terrain context → outcome alignment.
   * Empty if no failure signals present or no mapping exists for the primary signal.
   */
  dynamics: DynamicsArtifact[];
}
