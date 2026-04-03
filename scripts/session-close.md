# RideMind — Session Closure Procedure

> **Purpose:** Leave the project in a verified, consistent, resumable state after every working session.
> **When:** At the end of every meaningful working session, before closing Claude Code.
> **Why this version exists:** The previous closure procedure updated files but didn't verify consistency. This caused decisions made in Claude chat to be lost or contradicted by repo files. This version adds a mandatory reconciliation step.

---

## Step 1 — Write the Session Summary in Claude Chat

Before touching Claude Code, write (or ask Claude chat to produce) a session summary covering:
```
## Session Summary — [DATE]

### Completed This Session
- (what got built, reviewed, committed)

### Decisions Made This Session
- (every decision, including sequencing changes, architectural choices, and scope changes)
- (include the reasoning for each — context → decision → why)

### What Changed From Previous Plan
- (anything that was planned differently before this session but changed today)
- (e.g. "Was going to batch all 14 features → decided to stop at 2 and build pipeline first")

### Open Questions
- (anything unresolved that needs addressing next session)

### Next Action
- (the single most important thing to do next session)
```

**This is the authority document.** The Claude Code prompt below will reconcile the repo files against this summary.

---

## Step 2 — Reconcile and Update in Claude Code

Paste the session summary into Claude Code along with this prompt:
```
Session closure — reconcile and update. Follow these steps IN ORDER.

Here is what happened this session:

[PASTE SESSION SUMMARY HERE]

STEP 1 — READ CURRENT STATE
Read these files:
- CLAUDE.md
- docs/backlog.md
- docs/ridemind-phase3-master-plan-v1.md

STEP 2 — RECONCILE
Compare the session summary above against what's currently in each file. For each file, list:
- What needs to be ADDED (new completions, new decisions)
- What needs to be CHANGED (status updates, sequencing changes, priority shifts)
- What needs to be REMOVED (items that are no longer relevant or were superseded)
- Any CONTRADICTIONS between files (e.g. backlog says X is P0 but CLAUDE.md says Y is next)

Show me the reconciliation report BEFORE making any changes. Format:

## Reconciliation Report

### CLAUDE.md
- Add: ...
- Change: ...
- Remove: ...

### docs/backlog.md
- Add: ...
- Change: ...
- Remove: ...

### docs/ridemind-phase3-master-plan-v1.md
- Add: ...
- Change: ...
- Remove: ...

### Cross-File Contradictions
- (list any, or "None")

STOP HERE. Show me the report. Do NOT apply changes until I confirm.
```

---

## Step 3 — Review and Confirm

Read the reconciliation report. Check:

- Does it capture all the decisions from the session summary?
- Are any changes missing?
- Are the priority/sequencing changes correct?

If correct, tell Claude Code:
```
Reconciliation approved. Apply all changes listed above, then commit with message: "Session close [DATE]: [brief summary of key changes]"
```

If something is wrong or missing, correct it before approving.

---

## Step 4 — Final Verification (Optional but Recommended)

After the commit, run the Session Start procedure prompt (from scripts/session-start.md) to verify the files are now consistent. This takes 30 seconds and catches any update errors.

---

## Rules

1. **Never skip the reconciliation step.** The old procedure's failure was updating files without checking them first.
2. **The session summary written in Claude chat is the authority.** If it conflicts with what's in the files, the summary wins — that's where the real decisions were made.
3. **Every decision needs to land in at least two places:** CLAUDE.md (narrative state) AND backlog.md (actionable tracking). If it only lands in one, the other will contradict it next session.
4. **Sequencing changes are the highest-risk items.** If "what to do next" changed during the session, triple-check that both CLAUDE.md and backlog.md reflect the new order.
5. **Don't batch closure with other work.** Do it as a standalone step so it gets full attention.
