# Contributing Guide

[简体中文](CONTRIBUTING.md) | [English](CONTRIBUTING.en.md)

Thank you for improving StoryEngine-Codex. This repository is both a reusable fiction
workflow template and a contract-tested Codex port. Contributions should preserve
file-based state, the eight Review Gates, and the user's role as director.

## Before you start

- Do not open a public issue for a vulnerability; follow the
  [Security Policy](SECURITY.en.md).
- Ordinary questions, documentation fixes, and small patches may use an issue or a
  pull request directly.
- For a large feature, protocol change, or directory redesign, open a discussion or
  issue first and explain the use case and compatibility impact.
- Version 1 deliberately excludes databases, RAG, multi-agent frameworks, web UIs,
  API servers, and world-simulation engines. Adding one is a major scope change and
  needs maintainer agreement first.

## Local development

Requirements:

- Git;
- Node.js 22 or later;
- Bash, GNU `sed`, and coreutils. Git Bash is recommended on Windows.

```bash
git clone https://github.com/fly3457/StoryEngine-Codex.git
cd StoryEngine-Codex
npm ci
npm test
```

If tests cannot find Git Bash on Windows, set `STORYENGINE_BASH` to the actual
`bash.exe` path.

## Change guidelines

1. Read the root `AGENTS.md`, then the code, tests, and documentation relevant to the
   proposed change.
2. Preserve the one-repository-copy-per-story model. Never use `examples/` as the
   active root story.
3. Do not generate a full novel to test the scaffold. Use temporary fixtures or a
   deliberately small example.
4. Engineering maintenance is not approval of story Canon and must not check any
   Review Gate automatically.
5. Update both Chinese and English versions of public-facing guidance.
6. Do not commit API keys, access tokens, private manuscripts, or data you do not have
   permission to publish.
7. Preserve the upstream MIT license, source links, and attribution in `NOTICE.md`.

## Tests

```bash
# Full suite, including real Bash utilities and DOCX export
npm test

# Structural and protocol contracts only
npm run test:contracts
```

Before opening a pull request, confirm that:

- `npm test` passes;
- `git diff --check` reports no whitespace errors;
- new or changed local Markdown links resolve;
- behavior changes include corresponding tests and bilingual user documentation;
- the root story Canon and real manuscript prose were not changed accidentally.

## Pull requests

Keep each pull request focused on one topic. Include:

- the problem and motivation;
- the chosen solution;
- test evidence;
- workflow, compatibility, and existing-story impact;
- anything intentionally left out of scope.

By contributing, you confirm that you have the right to submit the material and agree
to license the contribution under this project's [MIT License](LICENSE).

