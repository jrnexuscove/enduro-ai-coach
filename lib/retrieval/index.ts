// RideMind KB Retrieval — Core Retrieval Functions + Context Pack Composition
//
// Public API:
//   getTerrainContext(surfaceType)                          → TerrainArtifact | null
//   getFeatureContext(featureType, severity)                → FeatureArtifact | null
//   getDynamicsContext(input)                               → DynamicsArtifact[]
//   buildContextPack(input)                                 → ContextPack
//
// Also exports:
//   PerceptionInput, fromStage4 (adapter), ContextPack types
//   smokeTest() — call to validate against real KB content

import type {
  PerceptionInput,
  PerceptionSignal,
  TerrainArtifact,
  FeatureArtifact,
  DynamicsArtifact,
  ContextPack,
  FailureType,
} from './types';
import type { FeatureSeverity } from '@/pipeline/types';
import { getTerrainKb, getFeatureKb, getDynamicsKb } from './loader';
import { truncateTechniqueRef } from './parser';

export type { PerceptionInput, TerrainArtifact, FeatureArtifact, DynamicsArtifact, ContextPack };
export { fromStage4 } from './types';

// ── Terrain retrieval ─────────────────────────────────────────────────────────

/**
 * Returns the terrain KB artifact for a given surface type.
 * surfaceType must match the Stage 4 surface.primary_type enum value exactly.
 */
export function getTerrainContext(surfaceType: string): TerrainArtifact | null {
  return getTerrainKb().get(surfaceType) ?? null;
}

// ── Feature retrieval ─────────────────────────────────────────────────────────

/**
 * Returns the feature KB artifact for a given feature type at a specified severity tier.
 * If the exact severity tier is missing, falls back to the lowest available tier.
 * featureType must match the Stage 4 feature_type enum value exactly.
 */
export function getFeatureContext(
  featureType: string,
  severity: FeatureSeverity
): FeatureArtifact | null {
  const entry = getFeatureKb().get(featureType);
  if (!entry) return null;

  const tierOrder: FeatureSeverity[] = ['minor', 'moderate', 'significant', 'major'];

  // Use requested tier if available; otherwise walk down to first available
  let selectedTier = severity;
  let severityDescription = entry.severity_tiers[severity] ?? '';

  if (!severityDescription) {
    for (const tier of tierOrder) {
      if (entry.severity_tiers[tier]) {
        selectedTier = tier;
        severityDescription = entry.severity_tiers[tier]!;
        break;
      }
    }
  }

  // technique_reference = capped severity description (per Amendment 2)
  const { text: technique_reference, truncated: technique_reference_truncated } =
    truncateTechniqueRef(severityDescription, entry.topic_id);

  return {
    topic_id: entry.topic_id,
    title: entry.title,
    feature_type: entry.feature_type,
    feature_class: entry.feature_class,
    severity_tier: selectedTier,
    severity_description: severityDescription,
    failure_types: entry.failure_types,
    crash_types: entry.crash_types,
    tags: entry.tags,
    technique_reference,
    technique_reference_truncated,
  };
}

// ── Dynamics retrieval ────────────────────────────────────────────────────────
// Static signal-to-dynamics map.
// Maps failure_type → ordered list of dynamics topic IDs, highest priority first.
// Ranking is then refined by terrain context + outcome (Amendment 3).

const FAILURE_TO_DYNAMICS: Partial<Record<FailureType, string[]>> = {
  momentum: ['DYNAMICS-09', 'DYNAMICS-04'],
  // DYNAMICS-09: Momentum vs Traction Trade-offs (primary — the core momentum concept)
  // DYNAMICS-04: Weight Transfer (secondary — gradient amplifies momentum loss on climbs)

  traction: ['DYNAMICS-01', 'DYNAMICS-02'],
  // DYNAMICS-01: Traction Generation and Loss (primary — root cause physics)
  // DYNAMICS-02: Wheel Slip vs Drive Dynamics (secondary — mechanism of slip events)

  technique: ['DYNAMICS-04', 'DYNAMICS-05'],
  // DYNAMICS-04: Weight Transfer (primary — most technique errors manifest as weight transfer)
  // DYNAMICS-05: Chassis Pitch (secondary — pitch attitude is the visible symptom)

  // GAP: no dynamics mapping for line_choice
  //   Line selection is an observational/tactical domain, not a bike dynamics domain.
  //   Domain-03 has no entry covering how route choice interacts with suspension or traction.
  //   Candidate future entry: DYNAMICS-11 — Line vs Surface Dynamics Interaction.

  // GAP: no dynamics mapping for decision
  //   Decision-making is cognitive, not a mechanics domain.
  //   No domain-03 entry covers the physics consequences of decision timing.

  // GAP: no dynamics mapping for mechanical
  //   Mechanical failures are a bike maintenance domain, not covered in domain-03.

  // GAP: no dynamics mapping for fitness
  //   Rider fatigue is a physiological domain (domain-11 or similar), not domain-03.
};

// Terrain/feature context rules: boost entries already in the candidate pool.
// A rule may only boost — never add new entries (Amendment 3: no fallback to generic matches).

interface TerrainBoostRule {
  condition: (input: PerceptionInput) => boolean;
  ids: string[];
  reason: string;
}

const TERRAIN_BOOST_RULES: TerrainBoostRule[] = [
  {
    condition: i =>
      ['gentle_up', 'moderate_up', 'steep_up', 'very_steep_up'].includes(i.gradient),
    ids: ['DYNAMICS-09', 'DYNAMICS-04'],
    reason: 'climb gradient — momentum and weight transfer both amplified',
  },
  {
    condition: i =>
      ['steep_down', 'moderate_down', 'very_steep_down'].includes(i.gradient),
    ids: ['DYNAMICS-04', 'DYNAMICS-08'],
    reason: 'descent gradient — forward weight transfer + brake dive risk',
    // GAP: DYNAMICS-08 (Brake Dive) is a valid contextual match for descent + technique/traction
    // but is not in any primary signal map. It can only appear as a boost here.
  },
  {
    condition: i => ['mud', 'clay'].includes(i.surface_type),
    ids: ['DYNAMICS-01', 'DYNAMICS-02'],
    reason: 'low-traction surface — traction loss and wheel slip dynamics relevant',
  },
  {
    condition: i => i.surface_type === 'rock',
    ids: ['DYNAMICS-07', 'DYNAMICS-03'],
    reason: 'rock terrain — deflection and suspension loading are primary dynamics',
    // GAP: DYNAMICS-07 (Deflection) and DYNAMICS-03 (Suspension Loading) have no primary
    // signal mapping. They only appear when rock is the surface context.
    // These entries should be added to FAILURE_TO_DYNAMICS if technique failures on rock
    // are a frequent coaching scenario.
  },
  {
    condition: i => i.surface_type === 'sand',
    ids: ['DYNAMICS-09'],
    reason: 'sand — momentum management is the defining dynamic',
  },
  {
    condition: i =>
      i.features_detected.some(f => ['jump', 'drop'].includes(f.feature_type)),
    ids: ['DYNAMICS-06', 'DYNAMICS-10'],
    reason: 'airborne feature — wheel lift and gyroscopic stability relevant',
    // GAP: DYNAMICS-06 (Wheel Lift) and DYNAMICS-10 (Gyroscopic Stability) have no primary
    // signal mapping. Only retrievable when jump/drop is a detected feature.
  },
  {
    condition: i => i.features_detected.some(f => f.feature_type === 'rut'),
    ids: ['DYNAMICS-05'],
    reason: 'rut feature — chassis pitch/lean is the key technique dynamic',
    // GAP: DYNAMICS-05 (Chassis Pitch) only maps here via feature context.
    // A dedicated dynamics entry for rut confinement + lateral balance would be more precise.
  },
];

/**
 * Returns 0–3 dynamics KB artifacts ranked by Amendment 3 criteria:
 *   1. Signal confidence (highest-confidence detected signal defines the candidate pool)
 *   2. Signal frequency (co-occurring signals boost entries they also match)
 *   3. Terrain context (surface/gradient/feature boosts matching pool entries)
 *   4. Outcome alignment (failure outcomes apply a small universal boost)
 *
 * Returns [] when:
 *   - No failure signals present
 *   - Primary signal has no dynamics mapping (Amendment 3: no fallback to generics)
 */
export function getDynamicsContext(input: PerceptionInput): DynamicsArtifact[] {
  if (input.failure_signals.length === 0) return [];

  // Sort signals by confidence descending
  const signals = [...input.failure_signals].sort((a, b) => b.confidence - a.confidence);
  const primarySignal = signals[0] as PerceptionSignal; // guarded by length check above

  // Criteria 1: primary signal defines the candidate pool
  const primaryIds = FAILURE_TO_DYNAMICS[primarySignal.type] ?? [];
  if (primaryIds.length === 0) {
    console.log(
      `[KB] GAP: no dynamics mapping for primary failure_type:${primarySignal.type}` +
      ` (confidence ${primarySignal.confidence.toFixed(2)})`
    );
    return [];
  }

  // Score map: only entries that meet criteria 1 are eligible
  type ScoreEntry = { score: number; reasons: string[] };
  const scoreMap = new Map<string, ScoreEntry>();

  for (const id of primaryIds) {
    scoreMap.set(id, {
      score: Math.round(primarySignal.confidence * 100),
      reasons: [`failure:${primarySignal.type}@${primarySignal.confidence.toFixed(2)}`],
    });
  }

  // Criteria 2: co-occurring signals boost entries they also match (within the pool)
  for (const sig of signals.slice(1)) {
    const matchIds = FAILURE_TO_DYNAMICS[sig.type] ?? [];
    for (const id of matchIds) {
      const entry = scoreMap.get(id);
      if (entry) {
        entry.score += Math.round(sig.confidence * 50);
        entry.reasons.push(`co_signal:${sig.type}@${sig.confidence.toFixed(2)}`);
      }
    }
  }

  // Criteria 3: terrain/feature context boosts (pool-only — no new entries added)
  for (const rule of TERRAIN_BOOST_RULES) {
    if (rule.condition(input)) {
      for (const id of rule.ids) {
        const entry = scoreMap.get(id);
        if (entry) {
          entry.score += 30;
          entry.reasons.push(`terrain:${rule.reason.split(' — ')[0]}`);
        }
      }
    }
  }

  // Criteria 4: outcome alignment — small universal boost for failure outcomes
  if (input.outcome && ['crash', 'bail', 'stall', 'stuck'].includes(input.outcome)) {
    for (const entry of scoreMap.values()) {
      entry.score += 10;
      entry.reasons.push(`outcome:${input.outcome}`);
    }
  }

  // Resolve against loaded KB, sort by score, cap at 3
  const db = getDynamicsKb();
  return [...scoreMap.entries()]
    .sort(([, a], [, b]) => b.score - a.score)
    .slice(0, 3)
    .flatMap(([id, { reasons }]) => {
      const artifact = db.get(id);
      if (!artifact) {
        console.warn(
          `[KB] GAP: dynamics topic_id ${id} is in the signal map but was not loaded from disk`
        );
        return [];
      }
      // Return a copy with match_reason populated
      return [{ ...artifact, match_reason: reasons.join('; ') }];
    });
}

// ── Context pack composition ──────────────────────────────────────────────────

/**
 * Builds the full context pack for a given perception input.
 * This is the primary function called by Pass 2 (coaching synthesis).
 *
 * Input: PerceptionInput (from fromStage4 adapter or future ARCH-V2 Pass 1 schema)
 * Output: { terrain, features[], dynamics[] } — all structured data, no raw markdown
 */
export function buildContextPack(input: PerceptionInput): ContextPack {
  const terrain = getTerrainContext(input.surface_type);

  const features = input.features_detected
    .filter(f => f.feature_type !== 'none')
    .map(f => getFeatureContext(f.feature_type, f.severity))
    .filter((f): f is FeatureArtifact => f !== null);

  const dynamics = getDynamicsContext(input);

  return { terrain, features, dynamics };
}

// ── Smoke test ────────────────────────────────────────────────────────────────
// Validates the retrieval layer against real KB content.
// Call from a script or API route handler for one-time verification.
//
// To run from a ts-node-compatible script:
//   import { smokeTest } from '@/lib/retrieval';
//   smokeTest();

export function smokeTest(): void {
  console.log('\n════════════════════════════════════════');
  console.log('  KB Retrieval Smoke Test');
  console.log('════════════════════════════════════════\n');

  // Mock input: muddy steep climb, rut feature, momentum failure, stall outcome
  const mockInput: PerceptionInput = {
    surface_type: 'mud',
    surface_condition: 'wet',
    gradient: 'steep_up',
    features_detected: [
      { feature_type: 'rut', severity: 'moderate', confidence: 0.80 },
    ],
    failure_signals: [
      { type: 'momentum', confidence: 0.80 },
    ],
    outcome: 'stall',
  };

  console.log('Input:\n', JSON.stringify(mockInput, null, 2), '\n');

  const pack = buildContextPack(mockInput);

  // ── Terrain ──
  console.log('──────────────────── TERRAIN ────────────────────');
  if (pack.terrain) {
    const t = pack.terrain;
    console.log(`  ${t.topic_id}: ${t.title}`);
    console.log(`  surface_type: ${t.surface_type}`);
    console.log(`  traction_range:`, t.traction_range);
    console.log(`  failure_types: [${t.failure_types.join(', ')}]`);
    console.log(`  misclassifications: [${t.common_misclassifications.join(', ')}]`);
    console.log(
      `  technique_reference (${t.technique_reference.length} chars,` +
      ` truncated=${t.technique_reference_truncated}):`
    );
    console.log(`    "${t.technique_reference.slice(0, 140)}…"`);
  } else {
    console.log('  null — surface_type not found in terrain KB');
  }

  // ── Features ──
  console.log('\n──────────────────── FEATURES ───────────────────');
  if (pack.features.length === 0) {
    console.log('  [] — no features matched in KB');
  }
  for (const f of pack.features) {
    console.log(`  ${f.topic_id}: ${f.title} [${f.feature_class}]`);
    console.log(`  severity_tier: ${f.severity_tier}`);
    console.log(`  severity_description: "${f.severity_description.slice(0, 120)}…"`);
    console.log(
      `  technique_reference (${f.technique_reference.length} chars,` +
      ` truncated=${f.technique_reference_truncated})`
    );
    console.log(`  failure_types: [${f.failure_types.join(', ')}]`);
    console.log(`  crash_types: [${f.crash_types.join(', ')}]`);
  }

  // ── Dynamics ──
  console.log('\n──────────────────── DYNAMICS ───────────────────');
  if (pack.dynamics.length === 0) {
    console.log('  [] — no dynamics mapped for these signals');
  }
  for (const d of pack.dynamics) {
    console.log(`  ${d.topic_id}: ${d.title}`);
    console.log(`  match_reason: ${d.match_reason}`);
    console.log(
      `  technique_reference (${d.technique_reference.length} chars,` +
      ` truncated=${d.technique_reference_truncated}):`
    );
    console.log(`    "${d.technique_reference.slice(0, 140)}…"`);
  }

  console.log('\n════════════════════════════════════════');
  console.log('  Smoke test complete');
  console.log('════════════════════════════════════════\n');
}
