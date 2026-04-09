# RideMind — Session Start Procedure

> **Purpose:** Verify project state is consistent and accurate before any work begins.
> **When:** Paste the prompt below into Claude Code at the start of every working session.
> **Why:** Prevents building on stale or contradictory state. Catches drift from previous sessions before it compounds.

---

## Step 0 — Tool Verification

Before file checks, verify the tool stack is operational. Include these checks at the top of the session start prompt (already integrated below).

| Tool | How to verify | Action if missing |
|------|--------------|-------------------|
| **MemPalace MCP** | `mempalace_status` | Warn — session continuity degraded; proceed without memory recall |
| **Context7 MCP** | `resolve-library-id` with any test library name (e.g. `next`) | Warn — do NOT write library/framework code without docs lookup; note it in diary |
| **TypeScript LSP** | Check if LSP tools are available in session context | Warn — fall back to grep for type/symbol lookup |
| **UI/UX Pro Max** | No startup check — activates on demand for UI work only | N/A |

If any tool is missing, report it prominently at the top of the state report and note it in the session close diary entry.

---

## Prompt — Paste into Claude Code
```
Session start — tool verification + state check. Do NOT make any changes. Read and report only.

STEP 0 — TOOL VERIFICATION
Run these checks and report status for each:
1. Call mempalace_status — report: OK / warning / error (include any summary it returns)
2. Call Context7 resolve-library-id with the query "next" — report: connected (got a result) / not connected (error or no response)
3. Report whether TypeScript LSP tools are available in this session — report: active / not available

If any tool is unavailable, flag it at the top of your report as: ⚠ TOOL MISSING: [name] — [impact]

---

Read these files and answer the following:

1. CLAUDE.md
   - What does it say the current phase/gate status is?
   - What does it say the next action is?

2. docs/backlog.md
   - What are the current P0 items?
   - What items are marked as blocked, and what blocks them?
   - Are there any items marked "unresolved" or "open decision"?

3. docs/ridemind-phase3-master-plan-v1.md
   - What gate statuses does it show?
   - What does it say the current execution step is?

Now compare:
- Do CLAUDE.md and backlog.md agree on what's done and what's next?
- Do CLAUDE.md and the master plan agree on gate statuses?
- Are there any contradictions between the three files?
- Is there anything marked as "next" in one file but "unresolved" or "blocked" in another?

Report:
## Current State (from files)
- Phase:
- Gates passed:
- Last completed work:
- Next action (per files):

## Contradictions Found
- (list any, or "None")

## Files That Need Updating
- (list any, or "None — state is consistent")

Do NOT fix anything. Just report. I will decide what to update.
```

---

## What to do with the output

- If **no contradictions**: proceed with the session. The files are your source of truth.
- If **contradictions found**: fix them BEFORE starting any build work. Use the output to write a targeted update prompt for Claude Code.
- If **"next action" is wrong**: update it based on what you and Claude (chat) agreed in the previous session. The chat conversation is the authority; the files are the record.

---

## Notes

- This takes ~30 seconds and prevents the 15-minute confusion spiral of discovering stale state mid-session.
- If you're resuming after a long gap (2+ days), also ask Claude Code to check `git log --oneline -10` so you can see what was last committed and when.
