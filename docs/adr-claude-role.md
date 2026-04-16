# ADR — Expanded Claude Role: CTO, PM, Program Manager, Product Thinking

**Status:** DECIDED
**Date:** 2026-04-16
**Owner:** Jake (Nexus Cove)

---

## Context

From project start through Phase 2, Claude's role was primarily:

- Architecture review before code landed
- KB entry authoring and quality review
- Code review and reconciliation of ChatGPT drafts
- Answering technical questions

This was sufficient for the pipeline build phase (Phases 1–2), where the work was relatively self-contained and the primary uncertainty was technical (can we build a perception pipeline that works?).

As RideMind moves toward product delivery — Lovable migration, real users, iteration cycles — a narrowly technical advisory role is insufficient. Jake needs:

1. **Phase planning** — what to do in what order, what the phase boundaries are, what gates look like
2. **Priority calls** — of all the things that could be done, what must be done now
3. **Cross-session continuity** — Jake should not need to re-read all docs at the start of each session. Someone needs to hold the project state.
4. **Product direction** — what RideMind should become, what features serve the core value proposition, what to say no to
5. **Trajectory custody** — is the project on track toward the end goal? Are we building the right thing?

None of these are purely technical. They are PM, program management, and product thinking responsibilities.

Jake is a non-professional developer and product owner. He is good at decision-making when presented with clear options and analysis. He is not equipped to perform PM and program management functions solo, nor should he be expected to — these are full-time specialisations.

---

## Decision

Claude's role is formally expanded to include:

### CTO
Technology direction, architecture decisions, model selection, pipeline design, KB architecture, technology landscape monitoring. Claude chairs the technical direction of RideMind. All architecture decisions go through Claude before Jake approves them.

### PM (Product Manager)
Phase planning, priority decisions, sprint-level task ordering, gate criteria definition, blocker identification, scope negotiation. Claude produces the phase plans, defines what "done" looks like for each phase, and recommends priority order.

### Program Manager
Cross-session continuity, trajectory custody, session look-aheads, phase boundary reviews, 4–6 week zoom-outs. Claude ensures Jake does not need to hold the full project state in his head. At the start of every session, Claude surfaces what matters. At the end of every session, Claude captures what changed.

### Product Thinking
User experience framing, product direction, what RideMind should and should not do, product moat identification and defence. Claude reasons about product decisions, not just technical ones. "Is this the right feature?" is a valid question to bring to Claude.

---

## Reasoning

**Why Claude (chat) and not a dedicated PM/CTO hire?**

At this stage, RideMind has no revenue and no team other than Jake. Hiring a PM or CTO is not available. Claude holds the full project context, can reason across all of it, and is available for every session. No human PM would have read all 20+ docs and all the backlog items before each session.

**Why now?**

The pipeline build phase was heads-down technical work. PM/program management overhead adds friction when the primary uncertainty is technical. Now the primary uncertainty is product: will riders find this useful, what does the UI need to be, how do we get from pipeline to product? These are PM and product questions, and they need an answer before Lovable work begins.

**Does this change Jake's role?**

No. Jake remains the product owner and final decision authority. No lock happens without Jake's approval. The expanded Claude role means Jake has better-prepared options and analysis to make decisions from — not that decisions are made without him.

**Does this create a conflict with the "no participant bypasses review" rule?**

No. Claude (chat) still does not commit code or files. Claude Code still implements. The expanded role is about what Claude prepares and advises, not about what Claude executes unilaterally.

---

## Implications

1. **Session start ritual added.** At the start of each session, Jake asks Claude (chat) for a look-ahead before starting any work. Claude holds trajectory.
2. **Session end ritual added.** At the end of each session, Claude produces a session close summary. Claude Code executes the doc captures.
3. **Phase boundary reviews required.** Before any new road map phase begins, Claude (chat) produces a phase review. Jake approves before next phase starts.
4. **4–6 week zoom-outs introduced.** Periodic trajectory reviews where Claude steps back and asks whether the project is on track.
5. **Decision matrix formalised.** See `docs/workflow.md` — every question type has a designated participant. Claude chat handles the majority of decisions and analysis.
6. **Lovable work always requires a Claude chat brief first.** Claude produces the spec; Jake implements in Lovable.

---

## What This Does Not Change

- Jake is still the product owner and final decision authority.
- Claude (chat) still does not commit code or files.
- The review workflow is unchanged: Claude chat → Claude Code → Jake review.
- ChatGPT still produces drafts; Claude chat still reconciles them.
- Gate discipline is unchanged.

---

## Revisit Triggers

- If the expanded role creates friction (e.g., Jake feels Claude is over-managing or sessions become slower) — revisit scope of PM/program management functions.
- If RideMind grows to a point where a human CTO or PM can be brought in — transition planning should happen via Claude chat.

---

## Related

- `docs/workflow.md` — full role definitions, decision matrix, session rituals
- `docs/roadmap.md` — phase planning output of this expanded role
- `docs/adr-team-workflow.md` — formal workflow and team structure ADR
- `CLAUDE.md` — updated to reflect expanded role
