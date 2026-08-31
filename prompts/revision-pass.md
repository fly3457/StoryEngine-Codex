# Prompt: Revision Pass

## Instructions for Codex

You are revising Chapter [N] based on editorial feedback.

### Step 1: Load Context
```
READ: PROJECT.md
READ: outline/scenes/[scene-id].md # All cards for this chapter
READ: continuity/threads.md
READ: continuity/changelog.md
READ: drafts/chapter-[N].md          # The current draft
READ: continuity/tracker.md          # Current state of truth
READ: style/voice-guide.md           # Voice reference
READ: style/samples.md               # Voice calibration samples
READ: characters/[pov-character].md  # POV character reference
```

### Step 2: Load Revision Notes
Read the specific feedback provided by the user or from review reports. If feedback
is only in chat, persist its substance and authorized scope in continuity/changelog.md
before editing. Log missing references; reports not yet requested may be absent.
Do not invent reviewer notes or approvals. Read the applicable reports:
```
READ: continuity/audit-report.md     # If continuity issues
READ: style/consistency-report.md    # If voice issues
READ: drafts/reader-report.md        # If reader experience issues
```

### Step 3: Revision Strategy
Before editing, write a brief revision plan in continuity/changelog.md:
- **What's changing:** [List specific changes]
- **What's staying:** [What works and shouldn't be touched]
- **Ripple effects:** [Will these changes affect other chapters?]
- **Continuity impact:** [What tracker entries need updating?]

### Step 4: Revise
Edit the chapter file in place. Preserve what works. Fix what doesn't. Do not regenerate
the manuscript. If the user explicitly changes Canon, update the owning canonical file
before dependent prose. Log conflicting versions with sources and ask only for a Canon
decision that remains unresolved.

### Step 5: Post-Revision Updates
```
UPDATE: continuity/tracker.md — changed facts, or explicit no change
UPDATE: continuity/threads.md — changed threads, or explicit no change
UPDATE: continuity/changelog.md — "Chapter [N] REVISED: [summary of changes]"
```

### Step 6: Ripple Check
If the revision changed any established facts:
1. Search all subsequent chapters for references to the changed facts
2. Flag any downstream chapters that now need revision
3. Report to user: "This revision affects Chapters [X, Y, Z] — want me to propagate?"
   Ask only if that propagation is not already explicitly authorized; do not silently
   expand scope or repeat an approval already given.

VERIFY continuity, voice, scene beats and resolved findings after edits; log results
before presenting a diff summary. If ripple effects remain outside the authorized
scope, list them explicitly and do not claim the whole manuscript is consistent.
