const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { ROOT, read, write, listFiles, tempProject, runBash, success, projectTitle, fixedDate } = require('./helpers.cjs');
const { blankProject, blankAct } = require('./fixtures.cjs');

const continuityFiles = ['tracker', 'threads', 'changelog'].map(n => 'continuity/' + n + '.md');
function seedChapters(root) {
  write(root, 'drafts/chapter-01.md', '# One\n\nalpha beta\n');
  write(root, 'drafts/chapter-02.md', '# Two\n\ngamma\n');
  write(root, 'drafts/reader-report.md', 'READER_REPORT_MUST_NOT_ENTER_MANUSCRIPT\n');
  write(root, 'drafts/chapter-notes.md', 'NONNUMERIC_NOTES_MUST_NOT_ENTER_MANUSCRIPT\n');
}
test('init applies literal Unicode/special-character titles without executing them', t => {
  const root = tempProject(t);
  const title = '夜班 / A&B | C:\\letters\\new $(touch INJECTED) ' + String.fromCharCode(96) + 'echo nope' + String.fromCharCode(96);
  const before = continuityFiles.map(file => read(file, root));
  success(runBash(root, 'init-project.sh', [title]));
  const project = read('PROJECT.md', root);
  assert.equal(project.split('\n')[0], '# PROJECT — ' + title);
  assert.ok(project.includes('## Working Title\n' + title + '\n'));
  assert.deepEqual(continuityFiles.map(file => read(file, root)), before);
  assert.ok(!fs.existsSync(path.join(root, 'INJECTED')));
  assert.doesNotMatch(project, /- \[x\]/i);
});
test('init creates missing directories/acts and is idempotent for existing Canon', t => {
  const root = tempProject(t);
  fs.rmdirSync(path.join(root, 'drafts'));
  fs.unlinkSync(path.join(root, 'outline/act-2.md'));
  success(runBash(root, 'init-project.sh', ['First Title']));
  assert.ok(fs.statSync(path.join(root, 'drafts')).isDirectory());
  assert.equal(read('outline/act-2.md', root), blankAct(2));
  write(root, 'outline/act-2.md', 'Approved act content — preserve me.\n');
  const project = read('PROJECT.md', root);
  success(runBash(root, 'init-project.sh', ['Do Not Replace Existing Title']));
  assert.equal(read('PROJECT.md', root), project);
  assert.equal(read('outline/act-2.md', root), 'Approved act content — preserve me.\n');
});
test('init supports CRLF templates and rejects multiline title changes', t => {
  const root = tempProject(t);
  write(root, 'PROJECT.md', blankProject.replace(/\n/g, '\r\n'));
  success(runBash(root, 'init-project.sh', ['CRLF & Title']));
  assert.ok(read('PROJECT.md', root).includes('## Working Title\nCRLF & Title\n'));
  const before = fs.readFileSync(path.join(root, 'PROJECT.md'));
  const failed = runBash(root, 'init-project.sh', ['First\nSecond']);
  assert.notEqual(failed.status, 0);
  assert.deepEqual(fs.readFileSync(path.join(root, 'PROJECT.md')), before);
});
test('utility fixtures stay blank after the source story is initialized and outlined', t => {
  const source = tempProject(t);
  success(runBash(source, 'init-project.sh', ['Active Story Title']));
  const activeFiles = ['outline/act-2.md', 'world/rules.md', 'continuity/tracker.md',
    'characters/active-character.md', 'drafts/chapter-01.md'];
  for (const file of activeFiles) write(source, file, 'ACTIVE_STORY_CANON_MUST_NOT_SEED_TESTS\n');
  const before = ['PROJECT.md', ...activeFiles].map(file => read(file, source));
  write(source, 'scripts/word-count.sh', read('scripts/word-count.sh', source) + '\n# CURRENT_TOOL_COPY\n');

  const root = tempProject(t, true, source);
  assert.equal(read('PROJECT.md', root), blankProject);
  assert.equal(read('outline/act-2.md', root), blankAct(2));
  for (const file of ['world/rules.md', 'continuity/tracker.md']) {
    assert.doesNotMatch(read(file, root), /ACTIVE_STORY_CANON_MUST_NOT_SEED_TESTS/);
  }
  assert.ok(!fs.existsSync(path.join(root, 'characters/active-character.md')));
  assert.deepEqual(fs.readdirSync(path.join(root, 'drafts')), []);
  assert.match(read('scripts/word-count.sh', root), /CURRENT_TOOL_COPY/);
  success(runBash(root, 'init-project.sh', ['Independent Test Title']));
  assert.ok(read('PROJECT.md', root).includes('## Working Title\nIndependent Test Title\n'));
  assert.deepEqual(['PROJECT.md', ...activeFiles].map(file => read(file, source)), before);
});
test('scripts refuse to initialize or operate from an unrelated empty directory', t => {
  const root = tempProject(t, false);
  for (const name of ['init-project.sh', 'word-count.sh', 'compile-manuscript.sh', 'continuity-snapshot.sh']) {
    fs.mkdirSync(path.join(root, 'scripts'), { recursive: true });
    fs.copyFileSync(path.join(ROOT, 'scripts', name), path.join(root, 'scripts', name));
    const result = runBash(root, name);
    assert.notEqual(result.status, 0, name);
    assert.match(result.stderr, /PROJECT\.md/);
  }
  assert.deepEqual(fs.readdirSync(root), ['scripts']);
});
test('word count keeps wc -w semantics, excludes reports/notes, and reads the actual target', t => {
  const root = tempProject(t);
  projectTitle(root, 'Fixture', '~10 words / 2 chapters');
  seedChapters(root);
  const result = runBash(root, 'word-count.sh');
  success(result);
  assert.match(result.stdout, /chapter-01\s+4 words/);
  assert.match(result.stdout, /chapter-02\s+3 words/);
  assert.match(result.stdout, /TOTAL\s+7 words/);
  assert.match(result.stdout, /Progress: \[█{21}░{9}\] 70% \(7 \/ 10\)/);
  assert.doesNotMatch(result.stdout, /reader-report|chapter-notes|�/);
});
for (const target of ['[e.g., ~50,000 words / Novella / ~18 chapters]', '0 words', '-10 words',
  '1.5 words', 'many words', '500 字', '999999999999999 words']) {
  test('word count skips invalid or unapproved target: ' + target, t => {
    const root = tempProject(t);
    projectTitle(root, 'Fixture', target);
    seedChapters(root);
    const result = runBash(root, 'word-count.sh');
    success(result);
    assert.match(result.stdout, /TOTAL\s+7 words/);
    assert.doesNotMatch(result.stdout, /Progress:/);
  });
}
test('word count handles CRLF, comma-separated goals, and a completed goal without bar overflow', t => {
  const root = tempProject(t);
  projectTitle(root, 'Fixture', '~1,000 words / ~18 chapters');
  write(root, 'PROJECT.md', read('PROJECT.md', root).replace(/\n/g, '\r\n'));
  seedChapters(root);
  let result = runBash(root, 'word-count.sh');
  success(result);
  assert.match(result.stdout, /0% \(7 \/ 1000\)/);
  projectTitle(root, 'Fixture', '1 word');
  result = runBash(root, 'word-count.sh');
  success(result);
  assert.match(result.stdout, /Progress: \[█{30}\] 700% \(7 \/ 1\)/);
});
test('compile preserves chapter order and contents and excludes reviews/nonchapters', t => {
  const root = tempProject(t);
  projectTitle(root, 'Fixture');
  seedChapters(root);
  write(root, 'drafts/chapter-10.md', '# Ten\n\nomega\n');
  const before = continuityFiles.map(file => read(file, root));
  const result = runBash(root, 'compile-manuscript.sh');
  success(result);
  const manuscript = read('manuscript.md', root);
  assert.ok(manuscript.startsWith('# Fixture\n'));
  assert.ok(manuscript.indexOf('# One') < manuscript.indexOf('# Two'));
  assert.ok(manuscript.indexOf('# Two') < manuscript.indexOf('# Ten'));
  assert.match(manuscript, /alpha beta/);
  assert.doesNotMatch(manuscript, /READER_REPORT|NONNUMERIC_NOTES/);
  assert.match(result.stdout, /Chapters: 3/);
  assert.match(result.stdout, /Total words: 10/);
  assert.deepEqual(continuityFiles.map(file => read(file, root)), before);
  success(runBash(root, 'compile-manuscript.sh', ['collected manuscript.md']));
  assert.equal(read('collected manuscript.md', root), manuscript);
  assert.ok(!fs.readdirSync(root).some(n => n.includes('.tmp.')));
});
test('empty manuscript compiles to the original header with zero counts', t => {
  const root = tempProject(t);
  projectTitle(root, 'Empty Fixture');
  const result = runBash(root, 'compile-manuscript.sh');
  success(result);
  assert.match(result.stdout, /Chapters: 0/);
  assert.match(result.stdout, /Total words: 0/);
  assert.ok(read('manuscript.md', root).startsWith('# Empty Fixture\n'));
  const counts = runBash(root, 'word-count.sh');
  success(counts);
  assert.match(counts.stdout, /TOTAL\s+0 words/);
});
test('compile refuses Canon, chapters, normalized aliases and outside-project output', t => {
  const root = tempProject(t);
  projectTitle(root);
  seedChapters(root);
  const protectedFiles = ['PROJECT.md', 'world/rules.md', 'outline/structure.md', 'drafts/chapter-01.md', 'continuity/tracker.md', 'style/samples.md'];
  const before = Object.fromEntries(protectedFiles.map(file => [file, read(file, root)]));
  for (const output of [...protectedFiles, './outline/../PROJECT.md', '../' + path.basename(root) + '-outside.md']) {
    const result = runBash(root, 'compile-manuscript.sh', [output]);
    assert.notEqual(result.status, 0, output);
    assert.match(result.stderr, /Error:/);
  }
  for (const file of protectedFiles) assert.equal(read(file, root), before[file], file);
  assert.ok(!fs.existsSync(path.join(path.dirname(root), path.basename(root) + '-outside.md')));
});
test('compile refuses an existing hard link to a canonical file', t => {
  const root = tempProject(t);
  projectTitle(root);
  fs.linkSync(path.join(root, 'PROJECT.md'), path.join(root, 'alias.md'));
  const before = read('PROJECT.md', root);
  const result = runBash(root, 'compile-manuscript.sh', ['alias.md']);
  assert.notEqual(result.status, 0);
  assert.equal(read('PROJECT.md', root), before);
});
test('compile resolves directory symlinks/junctions before enforcing Canon protection', t => {
  const root = tempProject(t);
  projectTitle(root);
  fs.symlinkSync(path.join(root, 'world'), path.join(root, 'alias-dir'),
    process.platform === 'win32' ? 'junction' : 'dir');
  const before = read('world/rules.md', root);
  const result = runBash(root, 'compile-manuscript.sh', ['alias-dir/rules.md']);
  assert.notEqual(result.status, 0);
  assert.equal(read('world/rules.md', root), before);
});
test('snapshots copy three exact files and refuse same-minute replacement', t => {
  const root = tempProject(t);
  const pathPrefix = fixedDate(root);
  const before = continuityFiles.map(file => read(file, root));
  success(runBash(root, 'continuity-snapshot.sh', [], { pathPrefix }));
  const names = fs.readdirSync(path.join(root, 'continuity/snapshots')).sort();
  assert.deepEqual(names, ['changelog_2026-09-01_1200.md', 'threads_2026-09-01_1200.md', 'tracker_2026-09-01_1200.md']);
  for (let i = 0; i < continuityFiles.length; i++) {
    const name = path.basename(continuityFiles[i], '.md');
    assert.equal(read('continuity/snapshots/' + name + '_2026-09-01_1200.md', root), before[i]);
  }
  write(root, 'continuity/tracker.md', 'Later state; must not overwrite prior backup.\n');
  const retry = runBash(root, 'continuity-snapshot.sh', [], { pathPrefix });
  assert.notEqual(retry.status, 0);
  assert.match(retry.stderr, /refusing to overwrite/);
  assert.equal(read('continuity/snapshots/tracker_2026-09-01_1200.md', root), before[0]);
});
test('snapshot preflight fails without leaving partial backups when a source is missing', t => {
  const root = tempProject(t);
  fs.unlinkSync(path.join(root, 'continuity/threads.md'));
  const result = runBash(root, 'continuity-snapshot.sh', [], { pathPrefix: fixedDate(root) });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /missing continuity\/threads\.md/);
  assert.ok(!fs.existsSync(path.join(root, 'continuity/snapshots')));
});

test('utilities also work from a story path with spaces and non-ASCII characters', t => {
  const container = tempProject(t);
  const files = listFiles(container);
  const root = path.join(container, '故事 with spaces');
  fs.mkdirSync(root);
  // Node 22 on a Windows runner can incompletely copy sibling directories into a
  // nested non-ASCII destination with fs.cpSync. Copy the pre-enumerated fixture
  // files individually so the test exercises the utilities, not that Node quirk.
  for (const file of files) {
    const target = path.join(root, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.join(container, file), target);
  }
  success(runBash(root, 'init-project.sh', ['Path Fixture']));
  seedChapters(root);
  success(runBash(root, 'word-count.sh'));
  success(runBash(root, 'compile-manuscript.sh', ['合并 manuscript.md']));
  assert.match(read('合并 manuscript.md', root), /alpha beta/);
  success(runBash(root, 'continuity-snapshot.sh', [], { pathPrefix: fixedDate(root) }));
});
