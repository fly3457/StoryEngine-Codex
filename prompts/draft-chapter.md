# Prompt: Draft Chapter

## Instructions for Codex

You are about to draft Chapter [N]. Follow this protocol EXACTLY.

### Step 1: Pre-Draft Reads
Resolve placeholders to actual zero-padded chapter filenames and applicable scene/POV files.
Read every scene card belonging to this chapter. Log files actually read and missing
paths/reasons in continuity/changelog.md before drafting. Nonexistent prior chapters
for Chapters 1–2 are expected; skip those unavailable reads without inventing prose.
Resolve missing required Canon or scene dependencies before affected writing.

```
READ: PROJECT.md
READ: drafts/chapter-[N-1].md
READ: drafts/chapter-[N-2].md
READ: outline/scenes/[scene-id].md
READ: continuity/tracker.md
READ: continuity/threads.md
READ: style/voice-guide.md
READ: style/samples.md
READ: characters/[pov-character].md
```

### Step 2: Pre-Draft Checklist
Before writing a single word, confirm:
- [ ] I know the scene's purpose
- [ ] I know the entry hook
- [ ] I know the exit hook
- [ ] I know the emotional trajectory
- [ ] I know all continuity dependencies
- [ ] I've internalized the voice guide
- [ ] I know what the POV character wants, fears, and is hiding

### Step 3: Draft
Write the chapter. Target word count: [N from scene card].

### Step 4: Post-Draft Updates
```
UPDATE: continuity/tracker.md — new or changed facts with chapter provenance
UPDATE: continuity/threads.md — opened, advanced, or closed threads
UPDATE: continuity/changelog.md — chapter summary, changed files, and no-change results
```

### Step 5: Self-Check — Verify
Before presenting to the user, verify:
- [ ] No continuity violations against tracker
- [ ] Voice is consistent with samples
- [ ] All scene card beats were hit
- [ ] Entry and exit hooks are strong
- [ ] Emotional trajectory lands as planned

Record verification outcomes in continuity/changelog.md before presenting the chapter.
Check time, location, object state, knowledge, relationships and world rules against
what was true at this point in the story, not just the tracker's latest state.
If there is an unresolved contradiction: STOP affected drafting, log both versions
and file/chapter sources, and ask the user to determine Canon unless already decided.
Update canonical owner files first when the user clearly changes an established fact.
Present the chapter with beats hit and continuity notes; wait for direction to the
next chapter unless already authorized. Follow docs/workflow.md for emergency protocols.
