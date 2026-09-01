const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { ROOT, read, listFiles } = require('./helpers.cjs');
const { PROMPTS } = require('./contracts.cjs');

test('required protocols, state templates, scripts and delivery documents are present', () => {
  const files = ['AGENTS.md', 'README.md', 'README.en.md', 'LICENSE', 'LICENSE.zh-CN.md', 'NOTICE.md',
    'CONTRIBUTING.md', 'CONTRIBUTING.en.md', 'SECURITY.md', 'SECURITY.en.md',
    'CODE_OF_CONDUCT.md', 'CODE_OF_CONDUCT.en.md', 'PROJECT.md', 'package.json', 'package-lock.json', 'build-docx.js',
    '.github/workflows/ci.yml', '.github/ISSUE_TEMPLATE/config.yml',
    '.github/ISSUE_TEMPLATE/bug_report.yml', '.github/ISSUE_TEMPLATE/feature_request.yml',
    '.github/pull_request_template.md', 'examples/minimal-story/README.en.md',
    ...['architecture', 'workflow', 'state-model', 'source-inventory', 'parity-matrix', 'codex-port-notes'].map(n => 'docs/' + n + '.md'),
    ...['setting', 'rules', 'timeline', 'locations'].map(n => 'world/' + n + '.md'),
    'characters/_TEMPLATE.md', 'characters/cast.md', 'outline/structure.md', 'outline/scenes/_TEMPLATE.md',
    ...[1, 2, 3].map(n => 'outline/act-' + n + '.md'),
    ...['tracker', 'threads', 'changelog'].map(n => 'continuity/' + n + '.md'),
    ...['voice-guide', 'motifs', 'samples'].map(n => 'style/' + n + '.md'),
    ...PROMPTS.map(n => 'prompts/' + n + '.md'),
    ...['init-project', 'compile-manuscript', 'word-count', 'continuity-snapshot'].map(n => 'scripts/' + n + '.sh'),
    'scripts/init-from-seed.cjs'];
  for (const file of files) assert.ok(read(file).trim().length > 0, file);
});
test('public project guidance is bilingual and points to the public repository', () => {
  const pairs = [
    ['README.md', 'README.en.md'],
    ['CONTRIBUTING.md', 'CONTRIBUTING.en.md'],
    ['SECURITY.md', 'SECURITY.en.md'],
    ['CODE_OF_CONDUCT.md', 'CODE_OF_CONDUCT.en.md'],
  ];
  for (const [chinese, english] of pairs) {
    assert.match(read(chinese), new RegExp(english.replaceAll('.', '\\.')));
    assert.match(read(english), new RegExp(chinese.replaceAll('.', '\\.')));
  }
  assert.match(read('NOTICE.md'), /## English/);
  assert.match(read('NOTICE.md'), /## 简体中文/);
  assert.match(read('LICENSE.zh-CN.md'), /以.*LICENSE.*英文原文为准/);
  const pkg = JSON.parse(read('package.json'));
  assert.equal(pkg.private, true, 'prevent accidental npm publication');
  assert.equal(pkg.repository.url, 'git+https://github.com/fly3457/StoryEngine-Codex.git');
  assert.equal(pkg.bugs.url, 'https://github.com/fly3457/StoryEngine-Codex/issues');
});
test('MIT license and both original reusable templates match upstream Git blobs exactly', () => {
  const expected = {
    'LICENSE': '026e180e4e141d90ffbceafe8012c69f39852c68',
    'characters/_TEMPLATE.md': 'e02c46a8aa4f1f7cd76fdf50d4085b716b31c7c0',
    'outline/scenes/_TEMPLATE.md': '918dfd5d7be0ee117f210225fa870ead6e453e66',
  };
  for (const [file, sha] of Object.entries(expected)) {
    const bytes = fs.readFileSync(path.join(ROOT, file));
    const actual = crypto.createHash('sha1').update('blob ' + bytes.length + '\0').update(bytes).digest('hex');
    assert.equal(actual, sha, file);
  }
  assert.match(read('LICENSE'), /Copyright \(c\) 2026 brian-caylor/);
  assert.match(read('README.md'), /https:\/\/github.com\/brian-caylor\/StoryEngine_Template/);
  assert.match(read('README.md'), /OddlyUseful\.app/);
});
test('all original state sections and explicitly requested voice fields remain available', () => {
  for (const name of ['Working Title', 'Logline', 'Premise', 'Genre / Subgenre', 'Core Themes',
    'Target Length', 'Comparable Works', 'Current Phase', 'Status']) assert.ok(read('PROJECT.md').includes('## ' + name), name);
  for (const name of ['Characters', 'Objects & Items', 'Information & Secrets', 'Relationships', 'World State']) {
    assert.ok(read('continuity/tracker.md').includes('### ' + name), name);
  }
  for (const name of ['Open Threads', 'Active Threads (In Progress)', 'Closed Threads']) {
    assert.ok(read('continuity/threads.md').includes('## ' + name), name);
  }
  for (const name of ['POV', 'Narrative Distance', 'Tense', 'Sentence Rhythm', 'Sentence Length Tendencies',
    'Paragraph Rhythm', 'Description Density', 'Exposition Strategy', 'Metaphor Density', 'Dialogue Style',
    'Pacing Philosophy', 'Paragraph Length', 'What This Voice Does NOT Do']) {
    assert.ok(read('style/voice-guide.md').includes('## ' + name), name);
  }
});
test('all local Markdown navigation links resolve from their own document', () => {
  for (const file of listFiles().filter(n => n.endsWith('.md'))) {
    for (const match of read(file).matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      const link = match[1].replace(/^<|>$/g, '').split('#')[0];
      if (!link || /^[a-z][a-z0-9+.-]*:/i.test(link)) continue;
      const target = path.resolve(ROOT, path.dirname(file), decodeURIComponent(link));
      assert.ok(target.startsWith(ROOT + path.sep), 'link stays in repository: ' + file + ' -> ' + link);
      assert.ok(fs.existsSync(target), file + ' -> ' + link);
    }
  }
});
test('source inventory covers all 29 pinned files and parity maps each of them', () => {
  const inventory = read('docs/source-inventory.md');
  const matrix = read('docs/parity-matrix.md');
  const entries = [...inventory.matchAll(/^\| \[([^\]]+)\]\(https:\/\/github\.com\/brian-caylor\/StoryEngine_Template\/blob\/([a-f0-9]{40})\/[^)]+\) \| \x60([a-f0-9]{40})\x60/gm)];
  assert.equal(entries.length, 29);
  assert.equal(new Set(entries.map(e => e[1])).size, 29);
  for (const entry of entries) {
    assert.equal(entry[2], 'ec42f2709391d42968cb9059c107ae64e2fd42b3');
    assert.ok(matrix.includes('[' + entry[1] + ']('), entry[1]);
  }
  assert.ok(matrix.includes('| StoryEngine Original | Codex Port | Status | Difference | Reason |'));
});
