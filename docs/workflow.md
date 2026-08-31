# Workflow and Command Protocol

Read the matched task prompt before performing story work. State ownership is in
[state-model](state-model.md); the four invariants are in [architecture](architecture.md).

## Eight phases

| Phase | Name | Trigger and required work | Review Gate |
|---|---|---|---|
| 1 | Conception | User shares an idea; clarify genre, tone, length, themes, audience; populate PROJECT | User approves PROJECT |
| 2 | World Building | Read PROJECT; create/review setting, rules, timeline, locations | User approves world files |
| 3 | Character Architecture | Read world; create cast and major profiles using the template | User approves characters |
| 4 | Structural Outlining | Read world and characters; create structure, acts and scene cards | User approves outline |
| 5 | Style Calibration | Read PROJECT and key characters; produce three 300–500 word tonal samples, codify chosen voice and motifs, save approved sample | User approves style and directs drafting |
| 6 | Iterative Drafting | One chapter at a time; Read → Draft → Update → Verify; present beats and continuity notes | User directs the next chapter and approves completed draft for review |
| 7 | Review Cycles | Full draft complete; continuity audit, voice check, then reader simulation; save and present all three reports | User approves review findings or supplies revision notes |
| 8 | Revision | Read feedback and context; plan, edit in place, update state, verify, detect downstream effects; present diff summary | User reviews revision; broader propagation needs authorization |

Keep this order; do not add a ninth phase. Individual audit/revise commands remain
available when the user requests them before the whole draft is complete. Such a
targeted operation does not declare the full phase complete or silently reset PROJECT.

## Review Gates and next

PROJECT.md owns Current Phase and the existing Status checklist. Record actual
approval and its scope in continuity/changelog.md before advancing. Present completed
artifacts, not just a proposal for future work. A clear next after presentation can
approve the presented step; record that user direction and advance exactly one step.
If artifacts are incomplete or approval is unclear, show what is missing and ask only
for the unresolved decision. Do not ask again for authorization already given.
Never infer creative approval from engineering implementation, tests, elapsed time,
or a fixture. End of Phase 8 means complete when the user approves the revision;
do not start an unrequested new phase or an endless optimization loop.

## Drafting contract

1. **Read:** PROJECT; every scene card for the chapter; tracker and threads;
   voice-guide and samples; applicable POV profiles; the previous two chapters.
   Resolve real filenames and record actual reads/missing files in the changelog.
2. **Draft:** follow scene beats, hooks, emotional trajectory, voice, and word target.
3. **Update:** tracker facts, thread openings/advances/closures, then the changelog.
   Record no change explicitly where appropriate. Update other owning Canon files
   if the chapter establishes information that belongs there.
4. **Verify:** continuity, time/location/objects/knowledge/relationships, voice,
   all scene beats, hooks, and emotional trajectory. Record findings; do not claim
   verification if it has not been performed. Resolve conflicts under the rule below.
5. **Present:** chapter plus a short summary of beats hit and continuity notes.

## Commands

These are natural-language operations in Codex, not shell commands or a CLI parser.
A targeted command uses the active repository's files and does not grant global
permission to change the story or skip Review Gates.

| Command | Required behavior |
|---|---|
| status | Read PROJECT, relevant outline/draft progress and changelog; report current phase, actual progress, pending approval and next step; no edits |
| review [file] | Read and display the named file for user review; report missing files without creating or rewriting them |
| revise [chapter] | Read prompts/revision-pass.md and its required context; revise the specified existing chapter within user feedback/scope |
| continuity | Read/display continuity/tracker.md; do not silently run an audit or change facts |
| threads | Read/display continuity/threads.md grouped as Open / Active / Closed |
| wordcount | Run bash scripts/word-count.sh from the story root; report wc -w counts, not Chinese character counts |
| compile | Run bash scripts/compile-manuscript.sh from the story root; default manuscript.md, or the user-specified safe output filename |
| audit | Read prompts/continuity-check.md; sequentially audit current chapters; write continuity/audit-report.md |
| voice-check | Read prompts/voice-check.md; compare current chapters with voice references; write style/consistency-report.md |
| reader-sim | Route before normal state reads; read prompts/reader-review.md, then only chapter prose as story input; write drafts/reader-report.md |
| next | Resolve current phase, completed artifacts and Gate; record approval if clearly given, then advance one phase or one chapter; never bulk-approve the remainder |

For an unspecified review filename or revision chapter, identify the intended target
from explicit context; ask only if multiple targets remain plausible. Utilities are
optional: missing Bash/Node is a tooling limitation to report, not permission to fake
results or request an OpenAI API key. Word export remains node build-docx.js.

## Reviews

At Phase 7, run continuity, voice, and reader reviews in that order and present all
reports. Each review can also be run individually on the current draft. Use numeric
chapter filenames in order; never treat reader-report.md as prose input.
Continuity review includes factual, temporal, location, object, knowledge,
relationship, physical-state, and world-rule checks plus thread health. Voice review
compares both the guide and approved samples, including characters' Voice DNA.
Reader simulation uses only what the text has revealed by that point; do not bring
later revelations into earlier chapter reactions or consult hidden story files.
Reports identify findings and suggestions; they do not automatically rewrite Canon.

## Revision

Persist user notes/review references and a short strategy (what changes, what stays,
ripple effects, continuity impact) in the changelog before editing. Read target prose,
scene cards, relevant Canon, tracker/threads, voice guide/samples and POV profiles.
Edit existing chapter files. Update tracker, threads, changelog and affected owner
files, then verify. Search subsequent chapters for changed facts and flag affected
chapters. Ask before expanding scope unless the user already authorized that exact
propagation. Preserve working passages and report a diff summary, not a new manuscript.

## Emergency protocols

### Context Window Limits

Use targeted reads and the tracker as a compressed state summary. For full-manuscript
reviews, process batches of 3–5 chapters in order, covering every chapter. Accumulate
coverage and findings in the applicable report as you go. In reader mode those notes
may contain only observations from already-read prose; never consult Canon to fill
gaps. Batching is not a new phase, retrieval service, or license to skip material.

### Contradictions Detected

1. STOP affected drafting.
2. Document both conflicting versions and their file/chapter sources in the changelog.
3. Present the conflict and ask which version is canonical unless already decided.
4. Update ALL affected files within the authorized scope; flag any unapproved wider edits.
5. Verify the resolution, then resume. Do not secretly pick a version or erase history.

### Voice Drift Detected

1. Re-read style/samples.md in full.
2. Write a temporary 100-word calibration paragraph before resuming.
3. Delete that temporary paragraph; keep it outside chapter files and compiled prose.
4. Continue the chapter in the chosen voice and verify. Do not create a new evaluator.
