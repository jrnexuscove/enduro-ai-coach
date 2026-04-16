# ADR — Migration to Lovable as Production Platform

**Status:** DECIDED
**Date:** 2026-04-16
**Owner:** Jake (Rigomi Limited)

---

## Context

RideMind has a working AI coaching pipeline (ARCH-V2, locally implemented in Next.js + TypeScript) but no path to a publicly accessible production product. The original plan assumed a standard Next.js deployment, but this created an unresolved DevOps complexity gap for a non-professional developer. See `docs/adr-cloud-hosting.md` for the full gap analysis.

The current local Next.js app (`app/`, `components/`, `lib/`) serves two distinct purposes:

1. **AI pipeline development environment** — where Pass 1, Pass 2, KB retrieval, safety validation, and benchmark tooling live
2. **UI** — upload form, result display, processing state

These two concerns have been conflated in one codebase. Separating them enables a cleaner production path.

Lovable is an AI-native web app builder that provides: hosted UI building, deployment, cloud hosting, public access, and built-in payment/auth integrations. It is designed for rapid product development without DevOps overhead.

---

## Decision

Adopt Lovable as the production platform for the public-facing RideMind product.

- **Lovable owns:** UI (upload, result display, onboarding, user management), cloud hosting, deployment, public URL, payment integration (Phase F).
- **This repo owns:** ARCH-V2 pipeline (Pass 1, Pass 2, KB retrieval, safety), knowledge base, benchmark tooling, all AI/ML logic.
- **Interface:** Lovable calls the pipeline via an API endpoint. The pipeline is deployed separately as a callable API. Lovable is the client; the pipeline is the service.

The existing local Next.js app is retained as:
- The AI pipeline development environment
- The benchmark and evaluation harness
- The reference implementation for pipeline contracts

It is not the production product.

---

## Reasoning

**Why Lovable:**

1. **Hosting and deployment solved.** Lovable provides cloud hosting without Jake needing to configure infrastructure. This directly resolves the gap in `docs/adr-cloud-hosting.md`.
2. **UI speed.** Lovable's AI-native approach means UI components can be generated rapidly once specs are written. Claude (chat) produces the brief; Jake implements in Lovable.
3. **Separation of concerns.** By moving UI to Lovable, the pipeline codebase becomes cleanly focused on AI logic. No confusion between UI concerns and pipeline concerns.
4. **Developer accessibility.** Jake is a non-professional developer. Lovable reduces the cognitive load of frontend development and deployment.
5. **Future integrations.** Auth, payment (Stripe), user management are first-class Lovable features — critical for Phase F (scale prep).

**What Lovable does not change:**

- The AI pipeline architecture (ARCH-V2) is unchanged.
- The knowledge base is unchanged — still in `knowledge-base/` in this repo.
- The benchmark tooling is unchanged.
- Claude (chat) still authors all specs and plans.
- Claude Code still handles all pipeline file changes and git commits.

---

## Migration Phases

Phase A (Foundation) through Phase G (Moat Building) are defined in `docs/roadmap.md` and tracked in `docs/backlog.md` under "Lovable Migration."

High-level sequence:

```
Phase A: Lovable setup + pipeline API deployed + one clip end-to-end
Phase B: 8-clip benchmark passing in Lovable
Phase C: Novel clip testing (15-20 new clips)
Phase D: First users (5 riders)
Phase E: Iterate from rider feedback
Phase F: Scale prep (rate limits, Stripe, public onboarding)
Phase G: Moat building (CV layer, IMU, physical location)
```

Phase A is blocked on PASS1-IMPL and PASS2-IMPL (ARCH-V2 pipeline must be implemented before it can be deployed as an API).

---

## Workflow Implications

Lovable introduces a new workflow step: the **Lovable handover brief**. Before any Lovable work begins, Claude (chat) produces a brief that specifies exactly what to build. Jake implements in Lovable using the brief. This mirrors the existing Claude chat → Claude Code workflow but with Lovable as the implementer.

Jake owns scope on the Lovable side. Lovable should build what the brief specifies, not add features.

---

## Implications for Existing Codebase

- `app/`, `components/` — retained as pipeline API server and dev environment, not as the production UI
- `lib/` — unchanged; pipeline logic
- `knowledge-base/`, `pipeline/`, `scripts/`, `results/` — unchanged
- **New requirement:** Pipeline needs an HTTP API layer that Lovable can call. Pass 1 + Pass 2 + safety must be accessible as a single `/analyze` endpoint with appropriate request/response contracts.
- **Timeout handling:** ARCH-V2 target is under 90 seconds total. API endpoint must handle this gracefully (async job or long-poll pattern may be needed if Lovable has fetch timeout limits).

---

## Revisit Triggers

- If Lovable's video upload handling cannot meet RideMind's requirements (file size limits, formats) — may need custom upload handling.
- If pipeline API timeout (90 sec) is incompatible with Lovable's client timeout configuration — may need async job queue.
- If Lovable's pricing becomes a constraint at scale — evaluate migrating UI to own hosting at that point.
- If the separation (Lovable UI / pipeline API) creates more complexity than it solves — reconsider.

---

## Related

- `docs/adr-cloud-hosting.md` — the gap this decision resolves
- `docs/roadmap.md` — Phase A–G road map
- `docs/backlog.md` — Lovable Migration phase tasks
- `docs/workflow.md` — how Lovable fits into the team workflow
- `docs/arch-v2-spec.md` — the pipeline architecture being deployed
