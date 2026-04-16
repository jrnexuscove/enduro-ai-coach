# RideMind — Knowledge Base Architecture

**Status:** ADR
**Decided:** 2026-04-16
**Owner:** Jake (Nexus Cove)

## Context

Yesterday (2026-04-15) the ARCH-V2 retrieval layer was built as deterministic markdown-driven retrieval from structured Pass 1 output. Today (2026-04-16) a separate proposal emerged to build a research agent that ingests YouTube transcripts and other external coaching content. An initial recommendation bundled both into a unified retrieval rebuild (vector embeddings + SQLite). On reflection — supported by ChatGPT review — this conflated two distinct concerns at different time horizons.

## Decision

Adopt a four-layer KB model with strict separation:

1. **Canonical KB** — authored, reviewed, trusted markdown. Source of truth for coaching. Located at `knowledge-base/`. Only ever written to via the Proposal Layer.

2. **Research Corpus** — externally sourced material extracted by the Track 2 research agent. Structured, forward-compatible with future indexed retrieval, but NOT product truth. Never directly consumed at runtime.

3. **Proposal Layer** — candidate diffs, new docs, rewrites, language patterns generated from the Research Corpus. Human review gate before any write to the Canonical KB. No automatic promotion.

4. **Runtime Retrieval Pack** — what Pass 2 actually consumes. Built fresh per clip by `buildContextPack()` in `lib/retrieval/`. Reads only from the Canonical KB.

## Reasoning

- Pass 1 output is structured (terrain enum, feature types with severity tiers, instability signals, etc.). Mapping structured input to KB entries is a deterministic lookup problem, not a similarity-search problem. Embeddings buy nothing here.
- Research ingestion is the opposite — unstructured prose extracted from YouTube transcripts, books, courses. THAT is where semantic retrieval, deduplication, and cross-reference earn their keep.
- Forcing both into the same architecture would either over-engineer Phase 3 retrieval or under-spec research-agent ingestion. Separation lets each evolve independently at its own pace.
- Voice drift is a real risk if external research material shapes coach voice before the voice itself is defined. The Coach Voice Seed Spec must be locked before any Track 2 ingest runs.
- Direct writes from the research agent to the Canonical KB would destroy quality control. The Proposal Layer enforces human gate.

## Implications

- Track 1 (Phase 3 product delivery) builds against the Canonical KB only. Status: retrieval layer complete; Pass 1 + Pass 2 outstanding.
- Track 2 (research agent) is its own workstream. Does not block Track 1.
- The Runtime Retrieval Pack contract (`buildContextPack` output shape) is already defined in `lib/retrieval/types.ts` (`ContextPack` interface).
- A future v2 of `buildContextPack()` may consume indexed retrieval over the Canonical KB if coaching quality gaps demand it — see Revisit Triggers below.

## Revisit Triggers

The deterministic markdown retrieval decision should be reopened if any of the following hold:

- Coaching quality gaps in Pass 2 output traced to missing or incorrect KB entries in the runtime pack
- Pass 1 perception output drifts toward less-structured fields (e.g. free-form failure descriptions)
- Research Corpus matures to a point where direct runtime consumption would meaningfully improve coaching quality
- Context pack assembly latency exceeds the <1 sec target defined in ARCH-V2

None of these are present today. Any one of them is a signal to reopen, not a guarantee of redesign.

## Related

- `docs/arch-v2-spec.md` (in progress) — the Track 1 architecture
- `docs/ARCH-V2-AMENDMENTS_1.md` — pre-lock amendments to ARCH-V2
- `lib/retrieval/` — the deterministic context pack implementation
- `docs/coach-voice-seed-v1.md` (TBD) — required gate before Track 2 ingest
- `docs/research-corpus-schema-v1.md` (TBD) — Track 2 ingest schema
- `docs/proposal-layer-spec-v1.md` (TBD) — Track 2 promotion gate
