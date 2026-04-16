# RideMind — Workflow and Team Roles

**Status:** v1.0 — first formal definition
**Decided:** 2026-04-16
**Owner:** Jake (Rigomi Limited)

---

## Purpose

This document defines how the RideMind team operates: who does what, how work flows between participants, when to use each participant, and what failure modes to watch for. It is the authoritative reference for collaboration workflow.

---

## Team Roster

### Jake — Product Owner / Delivery Lead

Jake is the founder, final decision authority, and the only human on the team. Every irreversible decision — architecture locks, gate passes, major scope changes, production releases — requires Jake's explicit approval.

**Jake's job is not to read all the docs.** Claude (chat) holds trajectory and surfaces what matters at each session start. Jake's job is to make good decisions when presented with options, and to approve work before it lands.

### Claude (chat.ai) — CTO / PM / Program Manager / Product Thinking

Claude (chat) is the highest-leverage participant. It holds the full project context, makes architecture decisions, authors specs, manages phase planning, and is responsible for product trajectory.

**Expanded role (confirmed 2026-04-16):** Claude's role was formally expanded beyond architecture review to include:

- **CTO:** Technology direction, architecture decisions, model selection, pipeline design, KB design.
- **PM:** Phase planning, priority decisions, sprint-level task ordering, gate decisions, blocker identification.
- **Program Manager:** Cross-session continuity, trajectory custody, phase boundary reviews, session look-aheads. Jake should not need to hold the full project state in his own head.
- **Product thinking:** User experience framing, scope negotiation, product direction, what RideMind should and should not do.

**Important:** Claude (chat) does not commit code or files. It produces specs, plans, prompts, and KB entries that Claude Code implements.

### Claude Code — Primary Implementer (Window 1)

Claude Code Window 1 executes reviewed specs. It does not design — it implements. All non-trivial implementation work flows through Claude chat review first.

**Claude Code's job:** File operations, git, running build/test commands, executing implementation instructions step by step.

**Constraint:** Claude Code does not implement un-reviewed code. If Jake brings a ChatGPT draft directly to Claude Code without Claude chat review, Claude Code should flag this.

### Claude Code — Parallel Implementer (Window 2)

Window 2 handles independent tasks only. Before firing Window 2, Jake must confirm that the tasks do not touch the same files as Window 1 (collision check).

### ChatGPT — Draft Generator

ChatGPT produces first-draft code modules, test outputs, and candidate prompts. Its output is always treated as a draft, not final. The workflow is:

```
ChatGPT draft → Jake pastes into Claude chat → Claude reviews and reconciles → Claude Code implements
```

ChatGPT output never enters the repo directly without Claude chat review.

### Lovable — Production Platform

Lovable is the production platform for the public-facing RideMind application. Decided 2026-04-16. The current Next.js local app remains as the AI pipeline development environment.

**Lovable's job:** UI build, cloud hosting, deployment, public access. Lovable does not own the pipeline or the knowledge base — those remain in this repo and are called via API from Lovable.

**Workflow for Lovable work:**
1. Claude (chat) authors a Lovable handover brief specifying exactly what to build
2. Jake implements in Lovable using the brief
3. Claude Code handles any API/pipeline side needed to support Lovable

### Product AI (future role)

Once the coaching pipeline is stable and deployed, a Product AI participant will handle user-facing AI features (personalised training plans, progress tracking summaries, etc.). Not active yet.

### Automated Harness — Validation

The benchmark harness validates pipeline outputs against benchmark clips and acceptance criteria. It replaces manual review for pipeline output validation. The harness validates; it does not decide. Gate decisions belong to Jake.

---

## Standard Workflow

### For any meaningful task

1. **Jake surfaces the task** — brings it to Claude (chat), not directly to Claude Code.
2. **Claude chat reviews the context** — reads relevant docs and current state before responding.
3. **Claude chat produces a plan or spec** — architecture decision, implementation spec, or prompt design.
4. **Jake approves or adjusts** — asks questions, pushes back, or gives the go-ahead.
5. **Claude Code implements** — executes the approved spec exactly. No freelancing.
6. **Claude Code verifies** — runs build, tests, or validation as specified.
7. **Jake reviews the result** — confirms it matches intent before marking complete.

### For KB entries

1. Claude chat authors the KB entry (or reviews a ChatGPT draft)
2. Jake reviews the coaching content for rider accuracy
3. Claude Code commits the entry to the repo

### For architecture decisions

1. Jake raises the question in Claude chat
2. Claude chat analyses options and produces a recommendation with reasoning
3. Jake approves (or asks for a second opinion via ChatGPT, which Claude chat then reconciles)
4. Claude chat authors or updates the relevant ADR or spec
5. Claude Code implements any code changes required

### For Lovable UI work

1. Claude chat produces a Lovable handover brief — exact spec of what to build
2. Jake implements in Lovable
3. Jake pastes results or issues back to Claude chat for review
4. Claude Code handles any API changes needed on the pipeline side

---

## Decision Matrix — Who Jake Goes To For What

| Question type | Go to | Notes |
|---------------|-------|-------|
| Architecture decision | Claude chat | Always. Not Claude Code, not ChatGPT. |
| Spec authoring (pipeline, KB, prompts) | Claude chat | Claude chat authors; Claude Code implements. |
| Priority / phase planning | Claude chat | Claude holds the backlog context. |
| Code review before implementation | Claude chat | All non-trivial code reviewed before Claude Code touches it. |
| Implementation / file changes | Claude Code | After review is complete. |
| Lovable UI build | Lovable | After Claude chat brief is produced. |
| First-draft code modules | ChatGPT → Claude chat | ChatGPT drafts, Claude chat reconciles, Claude Code implements. |
| Coaching content / KB entries | Claude chat | Claude (chat) authors; Jake reviews for rider accuracy. |
| Session look-ahead | Claude chat | At session start and session end. |
| Final lock decisions | Jake | No one else locks. |
| "Is this a good idea?" | Claude chat | Claude holds product context. Use it. |

---

## Session Rituals

### Start-of-session look-ahead

At the start of each working session, Jake asks Claude (chat) for a session look-ahead before starting any work. Claude surfaces:

- What was completed last session
- What is now unblocked
- The highest-leverage tasks available right now
- Any blockers or decisions needed before work can proceed
- Any time-sensitive items (model retirements, dependencies)

Jake does not need to re-read all docs. Claude holds trajectory.

### End-of-session look-ahead

At the end of each working session, Claude (chat) produces a session close summary:

- What was completed this session
- What is now unblocked as a result
- The recommended first tasks for next session
- Any open questions or decisions held in chat that need to land on disk

Claude Code executes the doc captures (CLAUDE.md updates, backlog updates, session notes).

### Phase boundary reviews

Before beginning a new phase (e.g., Phase A → Phase B on the road map), Claude (chat) produces a full phase review:

- What was achieved this phase
- What gaps remain (unmet exit criteria, deferred items)
- Whether the exit criteria were genuinely met or partially met
- What assumptions the next phase depends on
- Recommended scope for the next phase

Jake approves the phase boundary review before the next phase begins.

### 4–6 week zoom-outs

Roughly every 4–6 weeks of active work (not calendar weeks — working weeks), Claude (chat) produces a zoom-out review:

- Are we on the right trajectory toward the end goal?
- What assumptions have changed since the last zoom-out?
- What does the road map look like from here?
- Are there any approaches we should reconsider?
- What is the product moat, and are we building toward it?

These are not bound to a strict calendar schedule. Jake initiates when the work feels like it needs stepping back.

---

## Failure Modes Per Role

### Jake
- **Routing work directly to Claude Code** without Claude chat review. Symptom: Claude Code implements something that doesn't fit the architecture.
- **Skipping gate reviews.** Symptom: work lands that contradicts a locked decision.
- **Bringing ChatGPT output directly to the repo.** Symptom: inconsistency with existing architecture or quality standards.

### Claude chat
- **Losing trajectory custody** — if Claude chat loses context of what phase we're in and what the P0 items are, it may give misaligned recommendations. Mitigation: session look-ahead ritual forces context reload.
- **Over-specifying Lovable work.** Claude chat should write what to build, not how Lovable builds it.
- **Architecture drift** — making decisions in chat that contradict locked specs. All decisions should be explicitly reconciled with existing docs.

### Claude Code
- **Implementing without a reviewed spec.** Claude Code should refuse or flag if asked to implement something that hasn't been through Claude chat review.
- **Making design decisions during implementation.** If Claude Code encounters something ambiguous, it should surface it rather than deciding unilaterally.
- **Window 2 collision.** Window 2 must check for file conflicts before starting.

### ChatGPT
- **Output treated as final.** ChatGPT produces drafts. Always.
- **Architecture hallucination.** ChatGPT may produce code that looks right but doesn't fit RideMind's pipeline contracts or type system. Claude chat catches this.

### Lovable
- **UI scope creep.** Lovable should build what the brief specifies, not add features. Jake owns scope on the Lovable side.
- **Pipeline logic in UI.** The pipeline stays in this repo, called via API. Lovable does not own pipeline logic.

### Automated Harness
- **Passing clips that shouldn't pass.** The harness validates against defined criteria. If criteria drift, the harness gives false confidence. Keep benchmark ground truth current.

---

## Golden Rules

1. **Claude (chat) holds the trajectory. Use it.** Jake should not need to re-read all docs at the start of each session. This is Claude's job.
2. **No participant bypasses review.** Claude Code does not implement un-reviewed code. ChatGPT output does not enter the repo directly.
3. **Specs before code.** All non-trivial implementation is preceded by a reviewed spec. This is not bureaucracy — it is how we avoid expensive rewrites.
4. **Coaching accuracy is the product.** Correct > impressive. Every architectural and workflow decision should serve this.
5. **The harness validates; it does not decide.** Gate decisions belong to Jake, informed by Claude chat analysis.
6. **Lovable is UI, not pipeline.** The coaching intelligence stays in this repo. Lovable serves it.
7. **Gate discipline.** No work proceeds past an approval gate until it is explicitly approved. This applies equally to pipeline gates and phase boundaries on the road map.
8. **One lock at a time.** Do not lock a downstream decision before the upstream decision it depends on is locked.
9. **Quality over speed in the KB.** The knowledge base is the product moat. Never trade KB quality for shipping speed.
10. **When in doubt, bring it to Claude chat.** Not to Google. Not to ChatGPT first. Claude holds the full project context.

---

## Related Documents

- `CLAUDE.md` — Project context and quick reference
- `docs/roadmap.md` — Phase A–G road map
- `docs/backlog.md` — Current task backlog
- `docs/arch-v2-spec.md` — ARCH-V2 parent spec
- `docs/kb-architecture.md` — Four-layer KB ADR
- `docs/adr-cloud-hosting.md` — ADR: cloud hosting gap
- `docs/adr-lovable-migration.md` — ADR: Lovable migration
- `docs/adr-claude-role.md` — ADR: expanded Claude role
- `docs/adr-team-workflow.md` — ADR: team workflow ADR
