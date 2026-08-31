const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { ROOT, read } = require('./helpers.cjs');
const { PROMPTS } = require('./contracts.cjs');

test('the complete independent project structure exists', () => {
  for (const dir of ['docs', 'world', 'characters', 'outline', 'outline/scenes', 'drafts',
    'continuity', 'style', 'prompts', 'scripts', 'tests', 'examples/minimal-story']) {
    assert.ok(fs.statSync(path.join(ROOT, dir)).isDirectory(), dir);
  }
  assert.ok(fs.existsSync(path.join(ROOT, 'drafts/.gitkeep')), 'empty drafts survives Git clone');
  assert.ok(!fs.existsSync(path.join(ROOT, '.gitmodules')), 'no submodule');
});
test('AGENTS is a compact navigation map with all ten task routes', () => {
  const agents = read('AGENTS.md');
  assert.ok(Buffer.byteLength(agents) <= 8192, 'keep AGENTS below 8 KiB');
  assert.ok(agents.split('\n').length <= 120, 'keep detailed protocols out of AGENTS');
  for (const name of PROMPTS) assert.ok(agents.includes('(prompts/' + name + '.md)'), name);
  for (const name of ['architecture', 'workflow', 'state-model']) assert.ok(agents.includes('docs/' + name + '.md'));
  assert.ok(!fs.existsSync(path.join(ROOT, 'SYSTEM_PROMPT.md')), 'no second active master prompt');
  assert.ok(!fs.existsSync(path.join(ROOT, 'CLAUDE.md')), 'no platform-specific legacy entrypoint');
});
test('minimal example contains one scene and no generated chapters or fake approvals', () => {
  const base = path.join(ROOT, 'examples/minimal-story');
  for (const dir of ['world', 'characters', 'outline/scenes', 'style', 'continuity', 'drafts']) {
    assert.ok(fs.statSync(path.join(base, dir)).isDirectory(), dir);
  }
  assert.deepEqual(fs.readdirSync(path.join(base, 'outline/scenes')).filter(n => n !== '_TEMPLATE.md'), ['ch01-s1.md']);
  assert.deepEqual(fs.readdirSync(path.join(base, 'drafts')), ['.gitkeep']);
  assert.equal(fs.readdirSync(path.join(base, 'characters')).filter(n => !['_TEMPLATE.md', 'cast.md'].includes(n)).length, 2);
  assert.doesNotMatch(read('PROJECT.md', base), /- \[x\]/i);
  assert.match(read('continuity/changelog.md', base), /no creative Gate was approved/i);
  assert.match(read('style/samples.md', base), /Not Approved/);
});
