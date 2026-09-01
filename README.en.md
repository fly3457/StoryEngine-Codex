# StoryEngine-Codex

[简体中文](README.md) | [English](README.en.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js 22+](https://img.shields.io/badge/Node.js-22%2B-339933.svg)](package.json)
[![CI](https://github.com/fly3457/StoryEngine-Codex/actions/workflows/ci.yml/badge.svg)](https://github.com/fly3457/StoryEngine-Codex/actions/workflows/ci.yml)

A Codex-native port of StoryEngine_Template.

StoryEngine-Codex is a file-based fiction workflow that uses Codex as a narrative
architect, writer, editor, and continuity manager. It explores whether agentic work
plus file-based state can support sustained long-form writing. It is not an OpenAI
API application and does not require an API key.

This project is based on
[brian-caylor/StoryEngine_Template](https://github.com/brian-caylor/StoryEngine_Template)
at pinned reference commit
[ec42f2709391d42968cb9059c107ae64e2fd42b3](https://github.com/brian-caylor/StoryEngine_Template/tree/ec42f2709391d42968cb9059c107ae64e2fd42b3).
The upstream project is credited as “Built by
[OddlyUseful.app](https://oddlyuseful.app).” This independent port preserves the MIT
license and Copyright (c) 2026 brian-caylor; see [LICENSE](LICENSE). It is not an
official upstream release.

## Core principles

- **Files are memory.** World, character, plot, style, fact, review, and revision
  state must be written to files.
- **Read before write.** Relevant state is actually read before prose is written;
  chat memory is not a substitute.
- **Write → Update → Verify.** Every chapter is followed by tracker, thread, and
  changelog updates, then verification.
- **The user is the director.** The user makes creative decisions, and every phase
  retains a Review Gate.

## Quick start

1. Click **Use this template** on GitHub and create a separate repository for each
   story. Choose Private for unpublished fiction. Fork this repository instead if
   you intend to contribute to the engine.
2. Clone the story repository you created and open its root directory in Codex.
3. Tell Codex: **“I want to write a story about … Please start the StoryEngine
   workflow.”**
4. Codex reads [AGENTS.md](AGENTS.md) and enters Conception.
5. Review each phase's files before continuing. Approvals and the current phase are
   recorded in project files.

```bash
git clone https://github.com/<your-account>/<your-story-repository>.git my-story
cd my-story

# Optional: set the blank template's title; this approves no phase.
bash scripts/init-project.sh "Your Story Title"

# Alternative optional entry point: import a supported world/character seed.
npm run init:seed -- path/to/seed-directory
```

You do not need to paste a system prompt or edit global Codex configuration.
`AGENTS.md` is loaded through Codex's
[project instruction mechanism](https://learn.chatgpt.com/docs/agent-configuration/agents-md).
If the task was opened before `AGENTS.md` existed, start a new task or explicitly ask
Codex to reread it.

### Starting from a seed

Seed startup is for an existing world-and-character package that should still pass
through all eight phases. It requires `compiled_blueprint.json`, `manifest.json`,
`validation_report.json`, `genesis_validation_report.json`, and
`world_fabric_report.json`. After validation, it creates only `STORY_SEED.md` in the
story root.

The seed dossier is user-supplied, unapproved source material. It does not modify
`PROJECT.md`, establish Canon, check status boxes, or approve Review Gates. Phases
1–4 translate selected material into the normal Canon files. Phase 5 onward relies
only on the approved project files. Importing a seed requires Node.js 22+.

## Eight-phase workflow

| Phase | Name | Primary output |
|---|---|---|
| 1 | Conception | `PROJECT.md`: title, premise, themes, genre, length, and status |
| 2 | World Building | Setting, rules, timeline, and locations |
| 3 | Character Architecture | Cast, profiles, arcs, and Voice DNA |
| 4 | Structural Outlining | Structure, act files, and Scene Cards |
| 5 | Style Calibration | Three samples, selected voice, motifs, and an approved sample |
| 6 | Iterative Drafting | Chapter prose plus synchronized continuity state |
| 7 | Review Cycles | Continuity, voice, and first-reader reports |
| 8 | Revision | In-place edits, propagation checks, state maintenance, and a diff summary |

The phase order is fixed. Reports are written to
`continuity/audit-report.md`, `style/consistency-report.md`, and
`drafts/reader-report.md`; their absence before the corresponding review is normal.
See [workflow](docs/workflow.md) for operational details and
[state model](docs/state-model.md) for file ownership.

## Repository map

| Path | Purpose |
|---|---|
| `AGENTS.md` | Compact task routing and core invariants |
| `docs/` | Architecture, workflow, state ownership, provenance, and port notes |
| `STORY_SEED.md` (optional) | Unapproved Phase 1–4 seed dossier |
| `PROJECT.md` | Current story and workflow status |
| `world/`, `characters/` | World and character Canon |
| `outline/`, `outline/scenes/` | Story structure and Scene Cards |
| `drafts/` | `chapter-01.md`, `chapter-02.md`, and later prose |
| `continuity/` | Tracker, threads, changelog, snapshots, and audits |
| `style/` | Voice, motifs, and approved samples |
| `prompts/` | Ten task-specific protocols |
| `scripts/`, `build-docx.js` | Utilities and optional Word export |
| `tests/` | Contract and real-tool tests |
| `examples/` | Reference fixtures; never the active root story |

One complete repository copy represents one story. Do not mix `examples/` with the
root story state. The minimal example has its own
[instructions](examples/minimal-story/README.md).

## Natural-language commands

These are instructions to Codex, not a separate CLI parser.

| Command | Behavior |
|---|---|
| `status` | Report the real phase, progress, pending approval, and next step |
| `review [file]` | Show a file for review without automatically editing it |
| `revise [chapter]` | Revise an existing chapter within the supplied scope |
| `continuity` | Show established continuity facts |
| `threads` | Show Open, Active, and Closed narrative threads |
| `wordcount` | Run the per-chapter whitespace-delimited word count |
| `compile` | Merge numeric chapter files into `manuscript.md` or a safe named output |
| `audit` | Run a continuity audit |
| `voice-check` | Check voice consistency |
| `reader-sim` | Simulate a first reader using chapter prose as story input |
| `next` | Advance one phase or chapter after the current Gate is satisfied |

## Optional tools

The core workflow only needs Codex with file access. Bash tools expect GNU
`sed`/coreutils; Git Bash is recommended on Windows. Node.js 22+ is used for tests,
seed import, and optional DOCX export.

```bash
bash scripts/init-project.sh "Story Title"
bash scripts/word-count.sh
bash scripts/compile-manuscript.sh
bash scripts/compile-manuscript.sh "my manuscript.md"
bash scripts/continuity-snapshot.sh
npm run init:seed -- path/to/seed-directory

# Optional locked dependencies and Word export
npm ci
npm run export:docx
```

Run every Bash tool from the story root containing `PROJECT.md`. Compiled output
must remain inside that story and cannot overwrite Canon, chapters, or engine files.
Chapter files use consistently zero-padded numeric names such as `chapter-01.md`.

Word counts retain upstream `wc -w` whitespace semantics, including Markdown
headings. They are not equivalent to Chinese character counts. DOCX export reads
numeric chapters from `drafts/`, uses the Working Title when available, and retains
the lightweight upstream 6×9-inch book layout.

## Tests and limitations

```bash
npm ci
npm test

# Markdown and structural contracts only
npm run test:contracts
```

The Node test suite validates the directory layout, prompts, eight phases,
read/update/verify contracts, reviews, authorization propagation, licensing,
independence, shell utilities, and real DOCX export. Tests clean up their own
temporary fixtures and do not modify the active story. If Windows cannot locate Git
Bash, set `STORYENGINE_BASH` to its `bash.exe` path.

Tests cannot prove that a model actually performs every required read on every run,
nor can they prove literary quality or long-term voice stability. Reader simulation
does not proactively read hidden state, but prior author context from the same task
cannot be literally erased, so it is not a strict blind test.

Migration evidence is available in the
[source inventory](docs/source-inventory.md),
[parity matrix](docs/parity-matrix.md),
[port notes](docs/codex-port-notes.md), and
[v1 implementation report](docs/implementation-report.md).
Version 1 deliberately excludes databases, RAG, multi-agent frameworks, web UIs,
API servers, and world-simulation architecture.

## Open-source community

- Read the [Contributing Guide](CONTRIBUTING.en.md) before opening a change; the
  Chinese version is [贡献指南](CONTRIBUTING.md).
- Community participation follows the
  [Code of Conduct](CODE_OF_CONDUCT.en.md); see the
  [Chinese version](CODE_OF_CONDUCT.md).
- Report vulnerabilities privately under the
  [Security Policy](SECURITY.en.md); see the [Chinese version](SECURITY.md). Do not
  disclose an unpatched vulnerability in a public issue.
- Attribution and independent-port details are recorded in [NOTICE.md](NOTICE.md).

## License and ownership of story text

Project code, workflow documentation, and templates are released under the
[MIT License](LICENSE). The [Chinese translation](LICENSE.zh-CN.md) is provided only
as a reading aid; the English license is authoritative.

New fiction written with this template remains copyrighted by its author unless that
author grants a separate license. If your story is not intended to be public, create
a Private repository from this template and do not commit manuscript text to this
public project.
