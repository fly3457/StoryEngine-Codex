const test = require('node:test');
const assert = require('node:assert/strict');
const { read } = require('./helpers.cjs');
const { PHASES, PROMPTS, COMMANDS, validateDraft } = require('./contracts.cjs');

test('workflow defines exactly the original eight ordered phases', () => {
  const rows = [...read('docs/workflow.md').matchAll(/^\| ([1-8]) \| ([^|]+) \|/gm)];
  assert.deepEqual(rows.map(row => Number(row[1])), [1, 2, 3, 4, 5, 6, 7, 8]);
  assert.deepEqual(rows.map(row => row[2].trim()), PHASES);
});
test('optional seed startup preserves Canon ownership and every original Gate', () => {
  const workflow = read('docs/workflow.md');
  const state = read('docs/state-model.md');
  const agents = read('AGENTS.md');
  for (const text of [workflow, state, agents]) {
    assert.match(text, /STORY_SEED\.md/);
    assert.match(text, /not Canon|不是 Canon|not a Canon owner/i);
  }
  assert.match(workflow, /not a ninth phase/);
  assert.match(workflow, /does not populate or\napprove PROJECT, world, characters, outline, style, prose, or continuity state/);
  for (const name of ['conception', 'world-building', 'character-architecture', 'structural-outlining']) {
    assert.match(read('prompts/' + name + '.md'), /STORY_SEED\.md/, name);
  }
  for (const name of ['style-calibration', 'draft-chapter', 'continuity-check', 'voice-check', 'reader-review', 'revision-pass']) {
    assert.doesNotMatch(read('prompts/' + name + '.md'), /STORY_SEED\.md/, name);
  }
});
test('all first five phase prompts preserve a director Review Gate', () => {
  for (const name of PROMPTS.slice(0, 5)) {
    const text = read('prompts/' + name + '.md');
    assert.match(text, /### Step \d: Review Gate/);
    assert.match(text, /approval|approved/i);
    assert.match(text, /changelog/);
    assert.match(text, /PROJECT/);
  }
  assert.match(read('prompts/conception.md'), /genre, tone, target length, core themes, and intended audience/);
  const style = read('prompts/style-calibration.md');
  assert.match(style, /three sample passages, 300–500 words each/);
  for (const option of ['Option A', 'Option B', 'Option C', 'Approved Sample', 'style/motifs.md']) assert.ok(style.includes(option));
});
test('draft protocol enforces complete reads and Read → Draft → Update → Verify ordering', () => {
  assert.deepEqual(validateDraft(read('prompts/draft-chapter.md')), []);
});
test('draft contract checker rejects missing history, state updates and verification', () => {
  const original = read('prompts/draft-chapter.md');
  for (const omitted of ['READ: drafts/chapter-[N-2].md', 'UPDATE: continuity/threads.md', '### Step 5: Self-Check — Verify']) {
    assert.ok(validateDraft(original.replace(omitted, '')).length > 0, omitted);
  }
});
test('three reviews retain output paths, original report fields and complete coverage', () => {
  const cases = [
    ['continuity-check', 'continuity/audit-report.md', ['## Critical Issues', '## Moderate Issues', '## Minor Issues', '## Thread Health', '**Contradicts:**', '**Suggested Fix:**']],
    ['voice-check', 'style/consistency-report.md', ['## Overall Assessment', '## Voice Drift Instances', '## Character Voice Distinctiveness', '## Strongest Chapters (Voice)', '## Chapters Needing Voice Revision']],
    ['reader-review', 'drafts/reader-report.md', ['## First Impression', '## Chapter-by-Chapter Reactions', '### Pacing Arc', '### Dropped Threads (Reader Perspective)', '### Emotional Dead Zones', '## Verdict']],
  ];
  for (const [name, output, fields] of cases) {
    const text = read('prompts/' + name + '.md');
    for (const token of [output, '3–5 chapters', ...fields]) assert.ok(text.includes(token), name + ': ' + token);
  }
  const audit = read('prompts/continuity-check.md');
  for (const check of ['Fact Consistency', 'Timeline Logic', 'Character Knowledge', 'Object Tracking',
    'World Rule Violations', 'Relationship Consistency', 'Physical State']) assert.ok(audit.includes(check), check);
});
test('reader simulation routes before state loading and never claims to erase prior context', () => {
  const agents = read('AGENTS.md');
  assert.ok(agents.indexOf('Reader simulation is the exception') < agents.indexOf('## Mandatory drafting contract'));
  const reader = read('prompts/reader-review.md');
  assert.match(reader, /BEFORE ordinary project-state loading/);
  assert.match(reader, /Read ONLY the prose/);
  assert.match(reader, /cannot literally erase earlier context/);
  assert.match(reader, /only by what the text has revealed/);
  assert.doesNotMatch(reader, /^READ: (?:PROJECT|continuity\/|style\/|world\/|characters\/|outline\/)/m);
});
test('revision is durable, edits in place, updates all state, verifies and controls ripple scope', () => {
  const revision = read('prompts/revision-pass.md');
  for (const text of ['write a brief revision plan in continuity/changelog.md', 'Edit the chapter file in place',
    'Do not regenerate', 'Search all subsequent chapters', 'not already explicitly authorized', 'VERIFY continuity',
    'UPDATE: continuity/tracker.md', 'UPDATE: continuity/threads.md', 'UPDATE: continuity/changelog.md']) {
    assert.ok(revision.includes(text), text);
  }
  assert.match(revision, /feedback[\s\S]*only in chat[\s\S]*persist/);
});
test('Canon conflicts, emergency protocols and approval semantics survive the split', () => {
  const workflow = read('docs/workflow.md');
  for (const text of ['STOP affected drafting', 'both conflicting versions', 'file/chapter sources',
    'ask which version is canonical', 'Update ALL affected files', 'Re-read style/samples.md in full',
    'temporary 100-word calibration paragraph', 'Delete that temporary paragraph', 'batches of 3–5 chapters',
    'Do not ask again for authorization already given', 'Never infer creative approval from engineering']) {
    assert.ok(workflow.includes(text), text);
  }
  assert.match(read('docs/state-model.md'), /Planned scene outputs are\nnot accomplished facts/);
});
test('all eleven natural-language commands retain distinct semantics', () => {
  const workflow = read('docs/workflow.md');
  for (const command of COMMANDS) assert.ok(workflow.includes('| ' + command + ' |'), command);
  assert.match(workflow, /not shell commands or a CLI parser/);
  assert.match(workflow, /advance one phase or one chapter/);
  assert.match(workflow, /review \[file\][^\n]*without creating or rewriting/);
});
test('active Codex instructions contain no Claude-specific activation requirement', () => {
  for (const file of ['AGENTS.md', ...PROMPTS.map(p => 'prompts/' + p + '.md')]) {
    assert.doesNotMatch(read(file), /Claude(?: Code)?|CLAUDE\.md|paste.*SYSTEM_PROMPT/i, file);
  }
});
