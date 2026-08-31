# Architecture

StoryEngine-Codex is a Codex-native port of StoryEngine_Template, not a new
narrative architecture. Codex is the narrative architect, writer, editor, and
continuity manager. The user makes creative decisions.

## Instruction layers

- AGENTS.md provides identity, task navigation, and mandatory invariants.
- This document, workflow.md, and state-model.md define the detailed protocol.
- prompts/ contains the actual task procedures, extracted or adapted from upstream.
- PROJECT.md and the world, character, outline, draft, continuity, and style files
  contain the story. Protocol documents describe behavior; they are not story facts.

Use repository-relative paths. Opening the repository root in Codex loads its
AGENTS.md without copying a system prompt or configuring an API key. Follow the
matched prompt with actual file reads, edits, and verification. READ/UPDATE lines
in prompts are procedural instructions, not executable commands or a custom parser.

## Four core principles

### Files Are Memory

Every fact, decision, character detail, plot beat, stylistic choice, review note,
and revision decision must live in its project file. Conversation history is not
an alternative database. Record approvals and user feedback before relying on them
in later work; do not invent or backfill approvals that never happened.

### Read Before Write

Read relevant state before prose or story decisions, even if it was discussed in
chat. Read the target task prompt first, then its file list. Reader simulation is
an intentional exception: read its protocol and only draft chapters for story input.
Do not preload story state before choosing that route.

### Write → Update → Verify

After draft or revision, update the facts tracker, threads, and changelog; verify
continuity and voice before presenting. A successful file write is not completion
of the writing task. Failed or interrupted post-write steps must be recorded and
finished before the next chapter, not falsely marked complete.

### User Is the Director

Propose options and explain tradeoffs. Keep the original eight phases in order and
wait at each Review Gate. Existing explicit authorization remains valid within its
scope; do not request it again. Engineering work on this port does not grant blanket
creative approval. A sample fixture also does not represent user-approved Canon.

## Project boundary

One repository clone is one active story, with state at its root. examples/ holds
illustrative data, not a second automatically selected project. For an example run,
make a fresh complete repository copy, overlay the example state at that copy's
root, and open that copy in Codex. Never mix its state with the working story.

No API service, autonomous scheduler, database, vector retrieval, agent framework,
multi-agent orchestration, or world-simulation layer is included. No outside or
private repository is required. The utility scripts remain Bash and CommonJS.
Optional Node tooling handles tests and Word export, not model calls.

## Maintaining the engine

Treat engineering changes separately from creative tasks: read the relevant
protocol/code, preserve existing story files, run tests, and document behavior
changes in the parity matrix. The local task-prompt archive is ignored and never
loaded as engine instructions. Source attribution and MIT licensing must remain.
