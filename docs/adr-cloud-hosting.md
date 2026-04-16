# ADR — Cloud Hosting Gap in Original Project Plan

**Status:** DECIDED
**Date:** 2026-04-16
**Owner:** Jake (Rigomi Limited)

---

## Context

The original RideMind project plan assumed that a working AI coaching pipeline, once built locally, could be deployed to production as a standard web application. The architecture principles document (`docs/architecture-principles.md`) defined an MVP goal of a single Next.js web application running locally, with deployment assumed to be a later, straightforward step.

In practice, the deployment step was not straightforward. The following gap was identified during the 2026-04-16 session review:

**The gap:** The original plan had no concrete strategy for how a non-professional developer (Jake) would go from a locally-running Next.js app to a publicly accessible, hosted web product. The assumptions embedded in the original plan were:

1. Deployment is a standard Next.js deployment task (e.g., Vercel)
2. The developer has sufficient DevOps experience to handle environment variable management, build pipelines, API rate limiting, authentication, and payment integration
3. Cloud infrastructure decisions could be deferred until the pipeline was ready

All three assumptions were incorrect or incomplete:

- The pipeline uses ffmpeg, ffprobe, and heavy server-side processing that may not fit standard serverless deployment without configuration work
- Jake is a non-professional developer — DevOps complexity is a real friction point
- Deferring cloud infrastructure decisions created a situation where the pipeline was complete but the path to production was unclear

**When it was noticed:** During the 2026-04-16 session, when considering what would happen after ARCH-V2 Pass 1 and Pass 2 were implemented. The question "how does this get to real users?" did not have a ready answer.

---

## Decision

This gap is explicitly acknowledged as a planning error in the original project plan. It is now resolved by:

1. **Adopting Lovable as the production platform** — Lovable handles hosting, deployment, public access, and UI. See `docs/adr-lovable-migration.md`.
2. **Separating concerns clearly** — The local Next.js environment remains as the AI pipeline development environment. Lovable is the production-facing product.
3. **Pipeline as API** — ARCH-V2 pipeline will be deployed as a callable API endpoint that Lovable calls. This decouples pipeline development from UI/hosting concerns.

---

## Reasoning

The original plan's hosting gap was not caused by negligence — it was a natural consequence of building the hardest part first (AI pipeline, KB, reasoning logic) and deferring infrastructure concerns. This is defensible sequencing. The error was not acknowledging the gap explicitly and not planning for how a non-technical developer would bridge it.

The Lovable decision resolves the gap without requiring Jake to become a DevOps engineer. It also has secondary benefits: Lovable is faster for UI iteration, and its AI-native approach means UI components can be generated rapidly once the pipeline API is stable.

---

## Implications

- The original `docs/architecture-principles.md` guidance ("minimal infrastructure overhead", "local development that is easy to run") remains correct for the pipeline development environment. It no longer describes the production hosting approach.
- `docs/architecture-principles.md` should be updated in a future pass to clarify this distinction.
- The path to production is now Lovable → API call → pipeline. This is cleaner than the original single-app assumption because it separates UI concerns from AI pipeline concerns.
- Pipeline API design becomes a first-class concern. Pass 1 and Pass 2 must be deployable as an API endpoint with appropriate timeout handling, error responses, and authentication.

---

## Revisit Triggers

- If Lovable's platform constraints prevent the required UI/UX (e.g., video upload handling, result display requirements) — reconsider hosting approach.
- If pipeline API latency (target under 90 sec) is incompatible with Lovable's fetch timeout configuration — may need async job queue architecture.
- If RideMind scales to a point where Lovable's pricing or constraints are limiting — consider migrating to own hosting at that point.

---

## Related

- `docs/adr-lovable-migration.md` — the resolution to this gap
- `docs/architecture-principles.md` — original architecture principles (needs future update)
- `docs/roadmap.md` — Phase A–G road map (Lovable phases)
- `docs/workflow.md` — team roles and workflow
