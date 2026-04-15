// RideMind KB Retrieval — File Loading + Caching
// Reads KB markdown files from disk, parses structured fields, and caches in memory.
// Server-side only — uses fs.readFileSync, safe in Next.js API routes.

import fs from 'fs';
import path from 'path';
import {
  listMarkdownFiles,
  extractFrontmatter,
  extractBody,
  extractField,
  extractArrayField,
  extractTagsField,
  extractRelatedTopics,
  extractListField,
  extractNestedObject,
  extractSeverityTier,
  extractSection,
  truncateTechniqueRef,
  extractRankedSection,
  TECHNIQUE_REF_MAX,
} from './parser';
import type { TerrainArtifact, FeatureArtifact, DynamicsArtifact } from './types';

// ── KB paths ──────────────────────────────────────────────────────────────────

const KB_ROOT    = path.join(process.cwd(), 'knowledge-base');
const TERRAIN_DIR  = path.join(KB_ROOT, 'domain-17-terrain');
const FEATURES_DIR = path.join(KB_ROOT, 'features');
const DYNAMICS_DIR = path.join(KB_ROOT, '03-bike-dynamics-traction');

// ── Terrain technique_reference keyword tiers ─────────────────────────────────
// Tier 0 (body position / peg weighting) scores highest — these are the coaching
// cues most likely to be absent from a generic LLM response.
// Tier 1 (throttle / momentum / traction) scores lower — common and often already
// represented in the coaching output without KB input.
// Bullets with no keyword match fall through to the plain-truncation fallback.

const TERRAIN_KEYWORD_TIERS: ReadonlyArray<ReadonlyArray<string>> = [
  ['standing', 'peg', 'body position', 'weight'],
  ['throttle', 'momentum', 'traction'],
];

// ── Internal cache type for features ─────────────────────────────────────────
// Features store all 4 severity tiers; getFeatureContext selects the right one.

export interface ParsedFeatureEntry {
  topic_id: string;
  title: string;
  feature_type: string;
  feature_class: string;
  /** Keyed by tier name: "minor" | "moderate" | "significant" | "major" */
  severity_tiers: Partial<Record<string, string>>;
  failure_types: string[];
  crash_types: string[];
  tags: string[];
}

// ── Module-level caches (lazy init) ──────────────────────────────────────────

let terrainCache: Map<string, TerrainArtifact> | null = null;
let featureCache: Map<string, ParsedFeatureEntry> | null = null;
let dynamicsCache: Map<string, DynamicsArtifact> | null = null;

// ── Terrain loader ────────────────────────────────────────────────────────────
// Keyed by surface_type (matches Stage 4 surface.primary_type enum).

function loadTerrainKb(): Map<string, TerrainArtifact> {
  const map = new Map<string, TerrainArtifact>();

  for (const filePath of listMarkdownFiles(TERRAIN_DIR)) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const fm = extractFrontmatter(content);
      if (!fm) continue;

      const topic_id = extractField(fm, 'topic_id') ?? path.basename(filePath, '.md');
      const surface_type = extractField(fm, 'surface_type') ?? '';
      if (!surface_type) continue; // skip non-terrain files

      const title = extractField(fm, 'title') ?? topic_id;
      const traction_range = extractNestedObject(fm, 'traction_range');
      const failure_types = extractArrayField(fm, 'failure_types_associated');
      const gradient_contexts = extractArrayField(fm, 'gradient_contexts');
      const common_misclassifications = extractListField(fm, 'common_misclassifications');
      const tags = extractTagsField(fm);

      // technique_reference: keyword-ranked bullets from Technique Implications (Section 4).
      // Highest-scoring bullets (body position / peg weighting tier) fill the 500-char budget
      // first. Falls back to plain truncation if no bullets or no keyword matches.
      const body = extractBody(content);
      const rawSection =
        extractSection(body, 'Technique Implications') ??
        extractSection(body, 'Technique') ??
        '';
      const { text: technique_reference, truncated: technique_reference_truncated } =
        extractRankedSection(rawSection, TERRAIN_KEYWORD_TIERS, TECHNIQUE_REF_MAX);

      map.set(surface_type, {
        topic_id,
        title,
        surface_type,
        traction_range,
        failure_types,
        gradient_contexts,
        common_misclassifications,
        tags,
        technique_reference,
        technique_reference_truncated,
      });
    } catch (err) {
      console.warn(`[KB] Failed to load terrain file: ${filePath}`, err);
    }
  }

  console.log(`[KB] Terrain KB loaded: ${map.size} entries`);
  return map;
}

// ── Feature loader helpers ────────────────────────────────────────────────────
// FEATURE-01–08 use the old schema: content_metadata contains topic_id, title, feature_type.
// FEATURE-09–14 use a newer schema: feature_type is in pipeline_enum_value; no topic_id/title.
// These helpers normalise across both schemas.

function deriveFeatureTopicId(filename: string): string {
  // "feature-10_switchback-profile" → "FEATURE-10"
  const m = filename.match(/^feature-(\d+)/i);
  return m ? `FEATURE-${parseInt(m[1], 10).toString().padStart(2, '0')}` : filename.toUpperCase();
}

function featureTypeToTitle(ft: string): string {
  // "switchback" → "Switchback — Feature Profile"
  // "rock_garden" → "Rock Garden — Feature Profile"
  const label = ft.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return `${label} — Feature Profile`;
}

// ── Feature loader ────────────────────────────────────────────────────────────
// Keyed by feature_type (matches Stage 4 features_detected[].feature_type enum).

function loadFeatureKb(): Map<string, ParsedFeatureEntry> {
  const map = new Map<string, ParsedFeatureEntry>();

  for (const filePath of listMarkdownFiles(FEATURES_DIR)) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const fm = extractFrontmatter(content);
      if (!fm) continue;

      const filename = path.basename(filePath, '.md');

      // feature_type: new schema stores it in pipeline_enum_value, old schema has explicit key
      const feature_type =
        extractField(fm, 'feature_type') ??
        extractArrayField(fm, 'pipeline_enum_value')[0] ??
        '';
      if (!feature_type) continue;

      // topic_id and title: old schema only; derive from filename for new schema
      const topic_id = extractField(fm, 'topic_id') ?? deriveFeatureTopicId(filename);
      const title = extractField(fm, 'title') ?? featureTypeToTitle(feature_type);
      const feature_class = extractField(fm, 'feature_class') ?? '';

      // Parse all 4 severity tiers from frontmatter
      const severity_tiers: Partial<Record<string, string>> = {};
      for (const tier of ['minor', 'moderate', 'significant', 'major']) {
        const text = extractSeverityTier(fm, tier);
        if (text) severity_tiers[tier] = text;
      }

      const failure_types = extractArrayField(fm, 'failure_types_associated');
      const crash_types = extractArrayField(fm, 'crash_types_associated');
      const tags = extractTagsField(fm);

      map.set(feature_type, {
        topic_id,
        title,
        feature_type,
        feature_class,
        severity_tiers,
        failure_types,
        crash_types,
        tags,
      });
    } catch (err) {
      console.warn(`[KB] Failed to load feature file: ${filePath}`, err);
    }
  }

  console.log(`[KB] Feature KB loaded: ${map.size} entries`);
  return map;
}

// ── Dynamics loader ───────────────────────────────────────────────────────────
// Keyed by topic_id (e.g. "DYNAMICS-04").
// Domain-03 files use the old flat-YAML frontmatter schema (no pipeline_contract block).

function loadDynamicsKb(): Map<string, DynamicsArtifact> {
  const map = new Map<string, DynamicsArtifact>();

  for (const filePath of listMarkdownFiles(DYNAMICS_DIR)) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const fm = extractFrontmatter(content);
      if (!fm) continue;

      const topic_id = extractField(fm, 'topic_id') ?? '';
      if (!topic_id.startsWith('DYNAMICS-')) continue; // guard against non-dynamics files

      const title = extractField(fm, 'title') ?? topic_id;
      const tags = extractTagsField(fm);
      const related_topics = extractRelatedTopics(fm);

      // technique_reference: from CORE PRINCIPLES section; fall back to OVERVIEW
      const body = extractBody(content);
      const rawSection =
        extractSection(body, 'CORE PRINCIPLES') ??
        extractSection(body, 'OVERVIEW') ??
        '';
      const { text: technique_reference, truncated: technique_reference_truncated } =
        truncateTechniqueRef(rawSection, topic_id);

      map.set(topic_id, {
        topic_id,
        title,
        tags,
        related_topics,
        technique_reference,
        technique_reference_truncated,
        match_reason: '', // set at retrieval time, not load time
      });
    } catch (err) {
      console.warn(`[KB] Failed to load dynamics file: ${filePath}`, err);
    }
  }

  console.log(`[KB] Dynamics KB loaded: ${map.size} entries`);
  return map;
}

// ── Lazy getters (public API for this module) ─────────────────────────────────

export function getTerrainKb(): Map<string, TerrainArtifact> {
  if (!terrainCache) terrainCache = loadTerrainKb();
  return terrainCache;
}

export function getFeatureKb(): Map<string, ParsedFeatureEntry> {
  if (!featureCache) featureCache = loadFeatureKb();
  return featureCache;
}

export function getDynamicsKb(): Map<string, DynamicsArtifact> {
  if (!dynamicsCache) dynamicsCache = loadDynamicsKb();
  return dynamicsCache;
}
