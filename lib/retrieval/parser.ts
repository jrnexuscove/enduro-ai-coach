// RideMind KB Retrieval — Markdown + YAML Field Extraction
// Pure functions — no filesystem access, no side effects, no LLM calls.
//
// The KB has two distinct frontmatter schemas:
//   New (terrain + features): three named comment blocks — pipeline_contract,
//     retrieval_triggers, content_metadata — with nested YAML fields.
//   Old (dynamics domain-03): flat YAML key-value frontmatter.
//
// Parsers here target specific fields by pattern, not by full YAML parse.
// This keeps zero external dependencies and is robust to the specific file formats.

import fs from 'fs';
import path from 'path';

// ── Filesystem helpers ────────────────────────────────────────────────────────

export function listMarkdownFiles(dir: string): string[] {
  try {
    return fs
      .readdirSync(dir)
      .filter(f => f.endsWith('.md'))
      .map(f => path.join(dir, f));
  } catch {
    console.warn(`[KB] Directory not readable: ${dir}`);
    return [];
  }
}

// ── Frontmatter / body split ──────────────────────────────────────────────────

/**
 * Extracts the YAML frontmatter content (between the --- delimiters).
 * Returns null if no valid frontmatter found.
 * Non-greedy match stops at the first closing ---, correct for all KB file formats.
 */
export function extractFrontmatter(content: string): string | null {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  return match ? match[1] : null;
}

/**
 * Returns the markdown body — everything after the closing --- delimiter.
 * Handles markdown horizontal rules (---) inside the body correctly because
 * the non-greedy regex stops at the FIRST closing delimiter.
 */
export function extractBody(content: string): string {
  const match = content.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?([\s\S]*)$/);
  return match ? match[1].trim() : '';
}

// ── Scalar field extractors ───────────────────────────────────────────────────

/**
 * Extracts a simple scalar field at any indentation level.
 * Handles inline YAML comments and strips surrounding quotes.
 *   e.g.   topic_id: TERRAIN-01
 *   e.g.   surface_type: mud    # primary type
 */
export function extractField(fm: string, key: string): string | null {
  const re = new RegExp(`^[ \\t]*${key}:[ \\t]*(.+?)(?:[ \\t]*#.*)?$`, 'm');
  const match = fm.match(re);
  if (!match) return null;
  return match[1].trim().replace(/^['"]|['"]$/g, '');
}

/**
 * Extracts an inline YAML array: `key: [a, b, c]`
 * Strips surrounding quotes from each item.
 */
export function extractArrayField(fm: string, key: string): string[] {
  const re = new RegExp(`^[ \\t]*${key}:[ \\t]*\\[([^\\]]+)\\]`, 'm');
  const match = fm.match(re);
  if (!match) return [];
  return match[1]
    .split(',')
    .map(s => s.trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean);
}

/**
 * Extracts the tags field, which appears in two formats across the KB:
 *   tags: mud, traction, ruts, ...          (comma-separated string — old schema)
 *   tags: [rut, channel, tyre-track, ...]   (inline array — new schema)
 */
export function extractTagsField(fm: string): string[] {
  const re = /^[ \t]*tags:[ \t]*(.+?)(?:[ \t]*#.*)?$/m;
  const match = fm.match(re);
  if (!match) return [];
  const raw = match[1].trim();
  if (raw.startsWith('[')) {
    const inner = raw.slice(1, raw.lastIndexOf(']'));
    return inner
      .split(',')
      .map(s => s.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean);
  }
  return raw
    .split(',')
    .map(s => s.trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean);
}

/**
 * Extracts related_topics — appears as comma-separated string OR inline array.
 * Identical logic to extractTagsField but keyed on related_topics.
 */
export function extractRelatedTopics(fm: string): string[] {
  const re = /^[ \t]*related_topics:[ \t]*(.+?)(?:[ \t]*#.*)?$/m;
  const match = fm.match(re);
  if (!match) return [];
  const raw = match[1].trim();
  if (raw.startsWith('[')) {
    const inner = raw.slice(1, raw.lastIndexOf(']'));
    return inner
      .split(',')
      .map(s => s.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean);
  }
  return raw
    .split(',')
    .map(s => s.trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean);
}

// ── Structured field extractors ───────────────────────────────────────────────

/**
 * Extracts a YAML list under a key. Handles `- value  # comment` format.
 * Stops when indentation returns to the parent key's level.
 *   common_misclassifications:
 *     - loam       # comment
 *     - clay       # comment
 * Returns: ["loam", "clay"]
 *
 * Note: only captures single-word/identifier values (no quoted multi-word strings).
 * Sufficient for common_misclassifications in terrain files.
 */
export function extractListField(fm: string, key: string): string[] {
  const keyRe = new RegExp(`^([ \\t]*)${key}:\\s*$`, 'm');
  const keyMatch = fm.match(keyRe);
  if (!keyMatch) return [];

  const parentIndent = keyMatch[1].length;
  const startIdx = fm.indexOf(keyMatch[0]) + keyMatch[0].length;
  const afterKey = fm.slice(startIdx);
  const results: string[] = [];

  for (const line of afterKey.split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) continue;

    const indentLen = (line.match(/^([ \t]*)/) ?? ['', ''])[1].length;
    if (indentLen <= parentIndent) break; // back to parent/sibling level

    const itemMatch = line.match(/^\s*-\s+([^\s"#]+)/);
    if (itemMatch) results.push(itemMatch[1]);
  }

  return results;
}

/**
 * Extracts a nested key-value object where children are simple scalars.
 * Tracks parent indentation to stop correctly at sibling keys.
 *   traction_range:
 *     wet: low
 *     saturated: very_low
 * Returns: { wet: "low", saturated: "very_low" }
 */
export function extractNestedObject(fm: string, key: string): Record<string, string> {
  const keyRe = new RegExp(`^([ \\t]*)${key}:\\s*$`, 'm');
  const keyMatch = fm.match(keyRe);
  if (!keyMatch) return {};

  const parentIndent = keyMatch[1].length;
  const startIdx = fm.indexOf(keyMatch[0]) + keyMatch[0].length;
  const afterKey = fm.slice(startIdx);
  const result: Record<string, string> = {};

  for (const line of afterKey.split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) continue;

    const indentLen = (line.match(/^([ \t]*)/) ?? ['', ''])[1].length;
    if (indentLen <= parentIndent) break;

    // Child key: value  (simple scalar only)
    const m = line.match(/^\s+(\w+):\s+(\S+?)(?:\s*#.*)?$/);
    if (m) result[m[1]] = m[2];
  }

  return result;
}

/**
 * Extracts a severity tier from the severity_definition block.
 * Handles both single-line and multi-line YAML double-quoted strings.
 *
 *   severity_definition:
 *     minor: "Short one-line description"
 *     moderate: "Multi-line description
 *       continuing here"
 *
 * Normalises line continuations (newline + leading whitespace → single space).
 */
export function extractSeverityTier(fm: string, tier: string): string {
  const re = new RegExp(`^[ \\t]*${tier}:[ \\t]+"`, 'm');
  const match = fm.match(re);
  if (!match) return '';

  // Position of the character immediately after the opening "
  const openQuoteIdx = fm.indexOf(match[0]) + match[0].length;

  // Scan forward to find the closing " (no escaped quotes in KB files)
  let pos = openQuoteIdx;
  while (pos < fm.length && fm[pos] !== '"') pos++;

  const raw = fm.slice(openQuoteIdx, pos);
  return raw.replace(/\r?\n\s*/g, ' ').trim();
}

// ── Prose section extractor ───────────────────────────────────────────────────

/**
 * Extracts a named section from the markdown body by heading title.
 * Matches any heading level (# through ####) whose text contains sectionTitle.
 * Returns the section content up to the next heading of the same or higher level.
 *
 * Examples:
 *   extractSection(body, 'Technique Implications')  → finds "## 4. Technique Implications"
 *   extractSection(body, 'CORE PRINCIPLES')          → finds "## 2. CORE PRINCIPLES"
 */
export function extractSection(body: string, sectionTitle: string): string | null {
  const escaped = sectionTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const headingRe = new RegExp(`^(#{1,4})[^#\\n]*${escaped}[^\\n]*$`, 'mi');
  const headingMatch = body.match(headingRe);
  if (!headingMatch || headingMatch.index === undefined) return null;

  const level = headingMatch[1].length;
  // Use match.index (position in body) rather than indexOf, to avoid confusion
  // with substrings that appear earlier in the body text.
  const startIdx = headingMatch.index + headingMatch[0].length;
  const afterHeading = body.slice(startIdx);

  // Next heading of same or higher level ends the section.
  // Use nextMatch.index (position in afterHeading) — NOT indexOf(nextMatch[0]),
  // because nextMatch[0] = e.g. "## " which is a substring of "### " and would
  // match too early if indexOf is used.
  const nextRe = new RegExp(`^#{1,${level}}[^#\\n]`, 'm');
  const nextMatch = afterHeading.match(nextRe);
  const raw =
    nextMatch && nextMatch.index !== undefined
      ? afterHeading.slice(0, nextMatch.index)
      : afterHeading;

  return raw.trim() || null;
}

// ── Technique reference cap (Amendment 2) ────────────────────────────────────

export const TECHNIQUE_REF_MAX = 500;

/**
 * Truncates a technique_reference string to ≤500 chars per ARCH-V2 Amendment 2.
 * Logs to console when truncation occurs, with the source entry ID.
 * Breaks at a word boundary to avoid mid-word cuts.
 */
export function truncateTechniqueRef(
  text: string,
  sourceId: string
): { text: string; truncated: boolean } {
  if (!text) return { text: '', truncated: false };
  if (text.length <= TECHNIQUE_REF_MAX) return { text, truncated: false };

  console.log(
    `[KB] ${sourceId}: technique_reference truncated (${text.length} → ${TECHNIQUE_REF_MAX} chars)`
  );
  // Break at the last word boundary within the limit
  const cut = text.slice(0, TECHNIQUE_REF_MAX).replace(/\s+\S*$/, '');
  return { text: cut + '…', truncated: true };
}

// ── Keyword-ranked section extraction ────────────────────────────────────────

/**
 * Splits a prose section into bullet blocks, ranks them by keyword relevance,
 * and concatenates the highest-ranking bullets up to maxChars.
 *
 * A "bullet block" is any paragraph (blank-line-separated) whose trimmed text
 * begins with one of:
 *   - ** (bold-led paragraph — standard in terrain Technique Implications sections)
 *   - "- " (markdown unordered list item)
 *   - A digit followed by "." (numbered list item)
 *
 * keywordTiers is an ordered array of arrays: tier[0] carries the highest weight
 * (keywordTiers.length points per match), tier[N] the lowest (1 point per match).
 * Each keyword is matched case-insensitively; multiple keyword hits in the same
 * bullet accumulate score.
 *
 * Bullets are sorted by total score descending, then by original order on ties.
 * The highest-scoring bullets are concatenated greedily up to maxChars.
 *
 * Fallback cases (both return plain truncation identical to truncateTechniqueRef):
 *   - No bullet-led paragraphs found in the section
 *   - No keywords match any bullet
 */
export function extractRankedSection(
  text: string,
  keywordTiers: ReadonlyArray<ReadonlyArray<string>>,
  maxChars: number
): { text: string; truncated: boolean } {
  if (!text) return { text: '', truncated: false };

  // Split on one or more blank lines into paragraph blocks
  const paragraphs = text
    .split(/\n{2,}/)
    .map(p => p.trim())
    .filter(Boolean);

  // Keep only bullet-led paragraphs
  const bulletRe = /^(\*\*|-\s|\d+\.)/;
  const bullets = paragraphs.filter(p => bulletRe.test(p));

  // No bullets detected — plain truncation fallback
  if (bullets.length === 0) {
    if (text.length <= maxChars) return { text, truncated: false };
    const cut = text.slice(0, maxChars).replace(/\s+\S*$/, '');
    return { text: cut + '…', truncated: true };
  }

  // Score each bullet by keyword tiers (case-insensitive)
  const scored = bullets.map((bullet, originalOrder) => {
    const lc = bullet.toLowerCase();
    let score = 0;
    keywordTiers.forEach((tier, tierIndex) => {
      const weight = keywordTiers.length - tierIndex; // tier 0 → highest weight
      for (const kw of tier) {
        if (lc.includes(kw.toLowerCase())) score += weight;
      }
    });
    return { bullet, score, originalOrder };
  });

  // No keywords matched any bullet — plain truncation fallback
  if (!scored.some(s => s.score > 0)) {
    if (text.length <= maxChars) return { text, truncated: false };
    const cut = text.slice(0, maxChars).replace(/\s+\S*$/, '');
    return { text: cut + '…', truncated: true };
  }

  // Sort: highest score first; original order as tiebreaker (stable)
  scored.sort((a, b) => b.score - a.score || a.originalOrder - b.originalOrder);

  // Greedily fill up to maxChars, highest-scoring bullets first
  const selected: string[] = [];
  let charCount = 0;
  let truncated = false;

  for (const { bullet } of scored) {
    const sep = selected.length > 0 ? '\n\n' : '';
    const needed = sep.length + bullet.length;
    if (charCount + needed > maxChars) {
      truncated = true;
      if (selected.length === 0) {
        // First bullet alone exceeds limit — hard-truncate at word boundary
        const cut = bullet.slice(0, maxChars).replace(/\s+\S*$/, '');
        selected.push(cut + '…');
      }
      break;
    }
    selected.push(bullet);
    charCount += needed;
  }

  return { text: selected.join('\n\n'), truncated };
}
