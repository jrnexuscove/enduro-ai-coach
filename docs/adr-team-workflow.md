# ADR — Formal Workflow and Team Role Structure

**Status:** DECIDED
**Date:** 2026-04-16
**Owner:** Jake (Nexus Cove)

---

## Context

RideMind has been built by an informal team of Jake + AI tools from the start. The workflow evolved organically:

- ChatGPT was used to draft code modules
- Claude (chat) reviewed and reconciled them
- Claude Code implemented reviewed specs
- Jake made final decisions and committed

This worked for the pipeline build phase because the work was sequential and self-contained. As RideMind grows — multiple concurrent workstreams (Track 1 pipeline + Track 2 research + Lovable UI), a new participant (Lovable), and a more complex phase structure — the informal workflow is insufficient.

The specific problems:

1. **Role ambiguity.** It was not always clear whether Jake should bring a question to Claude chat, Claude Code, or ChatGPT. This caused inefficiency (questions asked of the wrong participant) and inconsistency (architecture decisions made in Claude Code when they should have been made in Claude chat).

2. **No session rituals.** Sessions started from scratch each time. Jake re-read docs to get up to speed. This was Jake's job to do; it should be Claude's.

3. **No decision matrix.** When encountering a decision, Jake had to judge who to involve based on intuition rather than a defined routing table.

4. **New participant (Lovable) with no defined workflow.** Lovable was added without a clear workflow for how specs flow from Claude chat to Lovable implementation.

5. **No failure mode awareness.** Each participant has characteristic failure modes. Without defining them, they repeat silently.

---

## Decision

Adopt a formal workflow and team role structure, documented at `docs/workflow.md`.

The structure defines:

### Participants and roles (as of 2026-04-16)

| Participant | Role |
|-------------|------|
| Jake | Product owner, delivery lead, final decision authority |
| Claude (chat) | CTO, PM, Program Manager, product thinking, architecture |
| Claude Code Window 1 | Primary implementer |
| Claude Code Window 2 | Parallel implementer (independent tasks only) |
| ChatGPT | Draft generator |
| Lovable | Production platform (UI, hosting, deployment) |
| Automated harness | Pipeline validation |

### Standard workflow for meaningful tasks

1. Jake surfaces the task to Claude chat
2. Claude chat reviews context and produces a plan or spec
3. Jake approves or adjusts
4. Claude Code implements
5. Claude Code verifies
6. Jake reviews

### Decision matrix

Every question type is routed to a specific participant. See `docs/workflow.md` for full matrix. The key routing rules:

- Architecture decisions → Claude chat (always)
- Implementation → Claude Code (after Claude chat review)
- Lovable UI build → Lovable (after Claude chat brief)
- First-draft code → ChatGPT → Claude chat → Claude Code
- Priority / phase planning → Claude chat

### Session rituals

Four rituals formalised:
1. Start-of-session look-ahead (Claude chat)
2. End-of-session look-ahead + doc capture (Claude chat + Claude Code)
3. Phase boundary reviews (Claude chat, Jake approves)
4. 4–6 week zoom-outs (Claude chat)

### Failure modes

Each participant's characteristic failure modes are defined in `docs/workflow.md`. These are surfaced so they can be caught before they cause damage.

### Golden rules

Ten golden rules distilled from the workflow. See `docs/workflow.md`.

---

## Reasoning

**Why formalise now?**

The informal workflow was adequate for a single-track, heads-down build. It is inadequate for a multi-track product with a new platform (Lovable), multiple concurrent workstreams, and a more complex phase structure. The cost of formalising is low (one document); the cost of not formalising is repeated friction and misrouted work.

**Why write it down rather than relying on CLAUDE.md?**

CLAUDE.md is the quick-reference project context document loaded at the start of every Claude Code session. It is not a detailed operational manual. `docs/workflow.md` can go into depth that CLAUDE.md cannot. CLAUDE.md contains a summary; `docs/workflow.md` contains the full specification. Both should agree.

**Why include failure modes?**

Because each participant will fail in characteristic ways that can be anticipated. Defining them in advance means Jake can recognise a failure mode when it occurs and correct it early, rather than discovering it after significant rework.

---

## Implications

1. `docs/workflow.md` is now the authoritative reference for how the team operates.
2. CLAUDE.md is updated to summarise the team structure and link to `docs/workflow.md`.
3. All future participants (e.g., Product AI) get a defined role before they are activated.
4. Session rituals are now expected by default. Claude chat should proactively offer a look-ahead when sessions start.
5. The decision matrix should be consulted when Jake is uncertain about who to involve. If the matrix doesn't cover a case, it should be updated.

---

## Revisit Triggers

- When a new participant is added to the team (e.g., Product AI, a human developer) — update `docs/workflow.md`.
- If any workflow rule repeatedly causes friction — revisit that rule specifically.
- If the decision matrix is wrong for a given case — update it immediately rather than creating an informal exception.
- At each 4–6 week zoom-out — review whether the workflow is serving the project.

---

## Related

- `docs/workflow.md` — the full workflow specification (this ADR's output)
- `docs/adr-claude-role.md` — expanded Claude role ADR
- `docs/adr-lovable-migration.md` — Lovable as production platform
- `CLAUDE.md` — updated summary of workflow
