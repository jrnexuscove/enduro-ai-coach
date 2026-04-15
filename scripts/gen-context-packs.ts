// scripts/gen-context-packs.ts
// One-shot generator: runs buildContextPack for two golden-path inputs and saves
// the resulting .context.json files that the benchmark harness expects.
//
// Run via: npx tsx scripts/gen-context-packs.ts

import fs from 'node:fs';
import path from 'node:path';
import { buildContextPack } from '../lib/retrieval/index';
import type { PerceptionInput } from '../lib/retrieval/types';

const GOLDEN_PATH_DIR = path.join(process.cwd(), 'lib', 'pass2', 'golden-paths');

// ── Helper: combine ContextPack + perception_summary → .context.json shape ────
// The benchmark harness passes this to evaluateSafety(contextPack, coaching).
// Safety rules read:
//   contextPack.perception_summary.instability_signals  (the raw observable signals)
//   contextPack.perception_summary.outcome
//   contextPack.perception_summary.gradient
//   contextPack.perception_summary.surface_type
//   contextPack.terrain.surface_type                    (from TerrainArtifact)
//   contextPack.features[].feature_type                 (from FeatureArtifact[])

interface ContextJsonInput {
  perceptionInput: PerceptionInput;
  instabilitySignals: string[];   // raw observable signals (rear_wheel_spin etc.)
  outcome: string;
}

function buildContextJson(args: ContextJsonInput): object {
  const pack = buildContextPack(args.perceptionInput);

  return {
    perception_summary: {
      surface_type: args.perceptionInput.surface_type,
      surface_condition: args.perceptionInput.surface_condition,
      gradient: args.perceptionInput.gradient,
      instability_signals: args.instabilitySignals,
      outcome: args.outcome,
    },
    terrain: pack.terrain,
    features: pack.features,
    dynamics: pack.dynamics,
  };
}

// ── Case 1: mud-climb-rut-stall ───────────────────────────────────────────────
// surface mud, gradient steep_up, feature rut (moderate)
// signals: rear_wheel_spin (0.80) + drive_interruption (0.65), outcome: stall
//
// Failure-type mapping for retrieval:
//   rear_wheel_spin → traction (primary, 0.80) — traction failure is the root signal
//   drive_interruption → momentum (secondary, 0.65) — momentum collapse is the downstream effect

const mudClimbInput: PerceptionInput = {
  surface_type: 'mud',
  surface_condition: 'wet',
  gradient: 'steep_up',
  features_detected: [
    { feature_type: 'rut', severity: 'moderate', confidence: 0.80 },
  ],
  failure_signals: [
    { type: 'traction', confidence: 0.80 },   // rear_wheel_spin
    { type: 'momentum', confidence: 0.65 },   // drive_interruption
  ],
  outcome: 'stall',
};

const mudClimbContext = buildContextJson({
  perceptionInput: mudClimbInput,
  instabilitySignals: ['rear_wheel_spin', 'drive_interruption'],
  outcome: 'stall',
});

const mudClimbPath = path.join(GOLDEN_PATH_DIR, 'mud-climb-rut-stall.context.json');
fs.writeFileSync(mudClimbPath, JSON.stringify(mudClimbContext, null, 2), 'utf-8');
console.log(`Written: ${mudClimbPath}`);

// ── Case 2: rock-drop-crash ────────────────────────────────────────────────────
// surface rock, gradient steep_down, feature drop (moderate)
// signals: front_end_light (0.75) + weight_shift_rear (0.70), outcome: crash
//
// Failure-type mapping for retrieval:
//   front_end_light → technique (primary, 0.75) — body-position / technique failure
//   weight_shift_rear → technique (secondary, 0.70) — same domain; both map to technique

const rockDropInput: PerceptionInput = {
  surface_type: 'rock',
  surface_condition: 'dry',
  gradient: 'steep_down',
  features_detected: [
    { feature_type: 'drop', severity: 'moderate', confidence: 0.75 },
  ],
  failure_signals: [
    { type: 'technique', confidence: 0.75 },  // front_end_light
    { type: 'technique', confidence: 0.70 },  // weight_shift_rear
  ],
  outcome: 'crash',
};

const rockDropContext = buildContextJson({
  perceptionInput: rockDropInput,
  instabilitySignals: ['front_end_light', 'weight_shift_rear'],
  outcome: 'crash',
});

const rockDropPath = path.join(GOLDEN_PATH_DIR, 'rock-drop-crash.context.json');
fs.writeFileSync(rockDropPath, JSON.stringify(rockDropContext, null, 2), 'utf-8');
console.log(`Written: ${rockDropPath}`);

// ── Case 3: grass-offcamber-clean ─────────────────────────────────────────────
// surface grass, gradient flat (off-camber geometry captured in terrain, not features)
// signals: line_deviation (observable but non-failing — minor, no failure_signal)
// outcome: completed
//
// off_camber is not a FeatureType enum value — it's surface geometry.
// No failure_signals: getDynamicsContext returns [] for clean completions.

const grassOffcamberInput: PerceptionInput = {
  surface_type: 'grass',
  surface_condition: 'damp',
  gradient: 'flat',
  features_detected: [],
  failure_signals: [],
  outcome: 'completed',
};

const grassOffcamberContext = buildContextJson({
  perceptionInput: grassOffcamberInput,
  instabilitySignals: ['line_deviation'],
  outcome: 'completed',
});

const grassOffcamberPath = path.join(GOLDEN_PATH_DIR, 'grass-offcamber-clean.context.json');
fs.writeFileSync(grassOffcamberPath, JSON.stringify(grassOffcamberContext, null, 2), 'utf-8');
console.log(`Written: ${grassOffcamberPath}`);

console.log('\nDone. All .context.json files generated.');
