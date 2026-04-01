# Session Closure Procedure

When Jake pastes a "Session Handoff Brief" from Claude chat, do ALL of the following in order:

## 1. Read the Handoff Brief
The brief contains:
- What was completed this session
- What decisions were made
- What documents need creating or updating
- What the next action is

Treat the handoff brief as the source of truth for what happened.

## 2. Create Any New Files Listed
If the brief says "create docs/X.md" and includes content, create it.

## 3. Update Existing Docs
Read each of these files and check them against the handoff brief:
- CLAUDE.md — is "Current Phase", gate statuses, and project state accurate?
- docs/backlog.md — are completed items marked done? Are new items added? Are paths valid?
- docs/ridemind-phase3-master-plan-v1.md (or current master plan) — does it reflect any new decisions?
- docs/architecture-principles.md — does it need updates?
- Any other docs referenced in the brief

For each file, either confirm it's current or make the specific updates needed.

## 4. File & Path Consistency Check
- Verify all file paths referenced in CLAUDE.md actually exist
- Verify all paths in docs/backlog.md are valid
- Check for orphaned or outdated files that should be cleaned up
- Flag anything inconsistent

## 5. Git Status, Commit & Push
- Run git status
- Show what's changed, staged, and untracked
- Suggest a commit message based on the handoff brief
- Wait for Jake to confirm the message
- Run: git add . && git commit -m "[confirmed message]"
- Ask if Jake wants to push

## 6. Confirm Closure
Output:
- List of files created
- List of files updated
- List of items confirmed as current (no changes needed)
- Next action when Jake returns
