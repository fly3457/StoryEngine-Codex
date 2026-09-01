# File-Based State Model

A file is the durable source of truth for its responsibility; chat is not a second
copy. A bracketed placeholder, unchecked dependency, suggested option, or illustrative
example is not an established fact. Never treat an unapproved sample as approved.

## Canonical responsibilities

| State | Canonical file(s) | Meaning |
|---|---|---|
| Optional source dossier | STORY_SEED.md | User-supplied, unapproved Phase 1–4 input; not Canon or Gate evidence |
| Premise, scope, genre, themes | PROJECT.md | User-directed project definition |
| Phase and completion | PROJECT.md: Current Phase and Status | Actual workflow progress, not inferred approval |
| World | world/setting.md, rules.md, timeline.md, locations.md | Setting, limits, chronology, and places |
| Characters | characters/cast.md and individual profiles | Identity, psychology, arc, Voice DNA, relationships, secrets |
| Planned plot | outline/structure.md and act files | Intended progression and turning points |
| Planned scene | outline/scenes/[scene-id].md | Beats, POV, purpose, hooks, emotional trajectory, dependencies and outputs |
| Prose | drafts/chapter-[N].md | What the reader has actually been told |
| Established facts | continuity/tracker.md | Five fact categories with chapter provenance |
| Narrative promises | continuity/threads.md | Open, Active, and Closed threads with chapter history |
| Style | style/voice-guide.md, motifs.md, samples.md | Chosen voice, recurring imagery, approved reference passages |
| Reviews | continuity/audit-report.md, style/consistency-report.md, drafts/reader-report.md | Findings and recommendations, not automatic Canon changes |
| Decisions and revision history | continuity/changelog.md | Approvals, user notes, revisions, missing reads, conflicts and verification |

Use the original Markdown templates. Do not introduce JSON story state, a database,
or a separate competing approval ledger. Reports are generated when their review
runs; their absence before a review is normal. Do not ship fictitious clean reports.
STORY_SEED.md may preserve imported source detail, but adopted facts become durable
Canon only in their normal owner files after the applicable Review Gate. Drafting and
review do not consult the seed as a shortcut around those owners.

## Established Facts

Keep these categories and provenance conventions:

- **Characters:** a fact about a character (Established: Ch. N).
- **Objects & Items:** status/location (Last referenced: Ch. N).
- **Information & Secrets:** who knows what (Revealed: Ch. N).
- **Relationships:** A → B state (Last development: Ch. N).
- **World State:** established conditions (Established: Ch. N).

The tracker summarizes the latest established state, not every earlier scene's
state. For chronological audits, use the chapter tags, prose, timeline, and changelog
to distinguish an actual contradiction from a legitimate change. Character knowledge
is time-dependent: a later revelation does not authorize knowledge in an earlier scene.

## Threads

- **Open Threads:** promises that need resolution; record opening and intended deadline.
- **Active Threads (In Progress):** threads currently advancing; record opening and advances.
- **Closed Threads:** paid-off threads; record opening and resolution.

Move entries between categories as the prose warrants. Planned scene outputs are
not accomplished facts. Do not close a thread just because the outline predicts a payoff.
Record explicit no-change results after a chapter when no thread or fact changed.

## Chapters and project roots

Chapter filenames are chapter-[N].md with consistent zero padding (at least two
digits; plan three digits if the story needs 100 or more chapters). All tools use
filename order. Only numeric chapter filenames are manuscript inputs; reader-report.md,
notes, templates, snapshots, and calibration passages are not chapters.
Use each scene card's Chapter field to select every scene belonging to a chapter.
The engine's state is at the repository root; do not merge examples or another story.

## Missing files and durable handoff

Before writing, append a compact entry in the changelog identifying the task, files
actually read, and missing paths with reasons. For Chapter 1, N-1 and N-2 are not
applicable; for Chapter 2, N-2 is not applicable. Do not synthesize previous chapters.
If a required scene card, POV profile, approved style reference, or already-written
preceding chapter is missing, record it and resolve the dependency before affected
prose. Skip the unavailable read, not the obligation to establish required Canon.
If the changelog itself is missing, restore its blank template and record that fact.

After prose, retain a per-chapter or revision entry describing changed facts and
threads, files updated, and verification outcomes. On interruption, preserve truthful
in-progress status and finish Read → Update → Verify before continuing the story.
User feedback and a revision strategy belong here before editing, so a new session
can resume without relying on chat. Never overwrite prior history to hide a contradiction.

## Canon changes and approvals

When the user clearly changes Canon, record that instruction and update its owner
file, tracker/threads where affected, and the changelog before dependent writing.
Existing prose may require revision; identify it and respect the authorized scope.
There is no blanket rule that the tracker silently wins over a world file or draft.
For unresolved conflicts, log both versions and their file/chapter sources, stop the
affected writing, ask which is canonical, then update all affected files as authorized.
An approval entry records what was approved and the actual user direction; a timestamp
alone is not evidence. Update PROJECT phase/status only when the corresponding work
and Review Gate are satisfied. Preserve explicit user-authorized scope across sessions
by recording it, not by repeatedly requesting the same permission.
