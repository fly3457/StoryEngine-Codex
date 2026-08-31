# Prompt: Continuity Audit

## Instructions for Codex

Perform a full continuity audit of the current manuscript.

### Step 1: Load State
```
READ: continuity/tracker.md
READ: continuity/threads.md
READ: world/rules.md
READ: world/timeline.md
READ: world/locations.md
READ: characters/cast.md
```

Record missing reads and resolve missing required references rather than inventing state.
Read relevant character profiles when a fact needs more detail than the cast list.

### Step 2: Sequential Read
Read numeric chapter files in filename order from Chapter 1 to the latest draft.
Do not read drafts/reader-report.md as prose. For long manuscripts use batches of
3–5 chapters and accumulate coverage/findings in the report without skipping chapters.
Use chapter provenance, the timeline and changelog to distinguish historical states
from the tracker's latest state. Location/travel contradictions are part of the audit.
For EACH chapter, check:

1. **Fact Consistency:** Does anything contradict the continuity tracker?
2. **Timeline Logic:** Do events happen in a possible order? Are travel times realistic?
3. **Character Knowledge:** Does any character act on information they shouldn't have yet?
4. **Object Tracking:** Are objects where they should be? Did anyone use something they don't possess?
5. **World Rule Violations:** Does anything break the established rules?
6. **Relationship Consistency:** Do character dynamics match their last established state?
7. **Physical State:** Are injuries, conditions, or appearances tracked correctly?

### Step 3: Generate Report
Create `continuity/audit-report.md` with:

```markdown
# Continuity Audit Report — [Date]

## Summary
- Chapters Audited: [N]
- Issues Found: [N]
- Critical (breaks plot): [N]
- Moderate (noticeable to careful readers): [N]
- Minor (nitpicks): [N]

## Critical Issues
### Issue [N]
- **Location:** Chapter [N], paragraph [N]
- **Problem:** [description]
- **Contradicts:** [source — tracker entry, earlier chapter, world rule]
- **Suggested Fix:** [recommendation]

## Moderate Issues
[same format]

## Minor Issues
[same format]

## Thread Health
- Open threads past deadline: [list]
- Threads that seem forgotten: [list]
- Threads resolved too abruptly: [list]
```

Present the report for user review. Do not silently repair chapters or choose between
conflicting versions of Canon. Record unresolved contradictions and their sources in
continuity/changelog.md; user-approved fixes are performed through revision-pass.md.
