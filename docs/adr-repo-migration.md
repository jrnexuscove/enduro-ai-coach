# ADR — Repo Migration: jrnexuscove/enduro-ai-coach → RigomiLtd/RideMind

**Status:** DECIDED
**Date:** 2026-04-16
**Owner:** Jake (Rigomi Limited)

---

## Context

The original RideMind repository was created under the personal GitHub account `jrnexuscove` (Jake's original personal account) during early project exploration. The repository was named `enduro-ai-coach`, predating the product rename to RideMind (2026-03-31).

Two issues accumulated that made continued development in this repo suboptimal:

1. **Wrong ownership.** The repo sits under a personal account. RideMind is a commercial product in development under Rigomi Limited. All IP, code, and associated assets are owned by Rigomi Limited. A personal GitHub account is the wrong home for a commercial product repository.

2. **Name mismatch.** The repo is named `enduro-ai-coach` but the product is RideMind. This creates confusion in URLs, tooling references, and documentation.

The migration decision coincides with the end-of-session documentation capture for the 2026-04-16 session, at which point several major decisions were also locked: Lovable as production platform, expanded Claude role, formal workflow structure, and Phase A road map. This is a natural point to establish the canonical repository under the correct ownership.

---

## Decision

Migrate active development to a new private repository under the RigomiLtd GitHub organisation:

- **New repo:** https://github.com/RigomiLtd/RideMind (private)
- **Old repo:** https://github.com/jrnexuscove/enduro-ai-coach — archived, kept on GitHub indefinitely as a provenance record

### What migrates

- `docs/` — all specifications, ADRs, KB schemas, pipeline contracts, roadmap, workflow, Phase 2 report, landscape review, ARCH-V2 spec
- `CLAUDE.md` — project context for Claude Code sessions
- `docs/backlog.md` — task backlog
- `README.md` — updated for new repo
- `.gitignore` — carried forward
- `knowledge-base/` — all KB domains (technique, terrain, features, machines), pipeline prompt files

### What does NOT migrate

- `app/`, `components/` — Next.js UI code (not the production product; pipeline dev env only)
- `lib/` — pipeline TypeScript implementation (stays in old repo as reference; will be rebuilt against ARCH-V2 spec)
- `pipeline/` — S0–S11 stage implementations (benchmark/debug infrastructure; not the product)
- `scripts/` — test runners, batch runners, perception test harness
- `results/` — perception test results, phase 2 outputs
- `package.json`, `package-lock.json`, `node_modules/` — Node.js project files
- `.env.local`, any files with API keys
- Build artefacts, local config, ffmpeg binaries

**Reasoning for not migrating code:** The local Next.js implementation is benchmark and evaluation infrastructure, not the production product. Production code will be built in Lovable (UI) and a separate pipeline API deployment. Starting the new repo with docs and KB only creates a clean slate for Phase A, without importing a codebase that is not the product.

### What happens to the old repo

The old repo is preserved indefinitely on GitHub as a provenance record of:
- Original local pipeline architecture (S0–S11, 11-stage implementation)
- Phase 2 multi-model benchmark testing (GPT-4o, Claude Sonnet, Gemini)
- Perception Viability Experiment (PVE) results
- ARCH-V2 spec evolution
- All KB entries generated during Phase 1–3

An archive notice is committed to the old repo's README pointing to the new location. The repo is then marked "Archived" in GitHub settings (read-only, visually marked as archived).

---

## Reasoning

**Why migrate rather than rename/transfer?**

A GitHub repo transfer would move the repo from `jrnexuscove` to `RigomiLtd` while preserving commit history. This was considered but rejected because:

1. The old repo name (`enduro-ai-coach`) does not match the product name — it would need renaming anyway.
2. Starting the new repo without the implementation codebase is intentional. Phase A begins with a clean slate. The ARCH-V2 pipeline will be built against the spec, not ported from the reference implementation.
3. Keeping the old repo intact and unmodified (other than the archive notice) preserves a complete, unaltered provenance record. A transfer would change the repo's URL and ownership metadata.

**Why private?**

RideMind is a commercial product in development. The knowledge base, pipeline architecture, and specifications represent significant IP investment. Private repo until commercial launch.

---

## Implications

1. All future Claude Code sessions open `C:\Projects\RideMind\` (new repo), not `C:\Projects\Enduro-AI-Coach\`.
2. All document references updated to reflect Rigomi Limited ownership (replacing Nexus Cove).
3. The `CLAUDE.md` in the new repo references the new GitHub URL.
4. When pipeline implementation work begins (PASS1-IMPL, PASS2-IMPL), it starts in the new repo — not ported from the old one.
5. The old repo at `jrnexuscove/enduro-ai-coach` is archived. No further commits should be made there except the archive notice.

---

## Revisit Triggers

- If the new repo needs to go public (e.g., for open-source strategy) — revisit visibility.
- If the Lovable production code should be co-located (rather than Lovable's own hosted project) — evaluate adding a `/lovable` directory or separate repo.

---

## Related

- `CLAUDE.md` — updated to reference new repo URL
- `docs/adr-lovable-migration.md` — Lovable as production platform (motivates clean repo split)
- `docs/roadmap.md` — Phase A begins in the new repo
- `docs/workflow.md` — team roles and workflow unchanged by this migration
