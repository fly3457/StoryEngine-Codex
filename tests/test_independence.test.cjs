const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { ROOT, read, listFiles, tempProject, copyRepository, success } = require('./helpers.cjs');
const { scanIndependence } = require('./contracts.cjs');

test('runtime dependencies, imports and operational paths stay independent', () => {
  const files = Object.fromEntries(listFiles().map(file => [file, read(file)]));
  assert.deepEqual(scanIndependence(files), []);
  assert.equal(JSON.parse(read('package.json')).dependencies.docx, '9.7.1');
  assert.equal(JSON.parse(read('package.json')).devDependencies.jszip, '3.10.1');
  assert.ok(!listFiles().some(p => p.startsWith('StoryEngine-Codex-Prompts-v1')));
});
test('independence checker rejects actual coupling without flagging exclusion prose', () => {
  assert.deepEqual(scanIndependence({ 'docs/notes.md': 'TIDARC, RAG and multi-agent reviews are not implemented; deferred only.' }), []);
  assert.deepEqual(scanIndependence({ 'tool.js': "const fs = require('node:fs');" }), []);
  for (const files of [
    { 'engine.js': "const other = require('../TIDARC/engine');" },
    { 'engine.py': 'import AgentSoul\n' },
    { 'tool.js': "require('../../private-project/tool');" },
    { 'server.js': "require('node:http').createServer(() => {}).listen(3000);" },
    { 'prompts/draft.md': 'READ: /private/TIDARC/world.md' },
    { 'package.json': JSON.stringify({ dependencies: { tidarc: 'file:../TIDARC' } }) },
    { '.gitmodules': '[submodule "outside"]\n' },
  ]) assert.ok(scanIndependence(files).length > 0, JSON.stringify(files));
});
test('a complete detached copy runs contracts without source checkout or npm packages', t => {
  const copy = tempProject(t, false);
  copyRepository(copy);
  assert.ok(!fs.existsSync(path.join(copy, 'node_modules')));
  assert.ok(!fs.existsSync(path.join(copy, 'StoryEngine-Codex-Prompts-v1')));
  const childEnv = { ...process.env, NODE_PATH: '' };
  delete childEnv.NODE_TEST_CONTEXT;
  const result = spawnSync(process.execPath, ['--test', '--test-reporter=tap',
    'tests/test_structure.test.cjs', 'tests/test_required_files.test.cjs', 'tests/test_workflow_contract.test.cjs'], {
    cwd: copy, encoding: 'utf8', timeout: 30000,
    env: childEnv,
  });
  success(result);
  assert.match(result.stdout, /fail 0/);
  assert.notEqual(path.resolve(copy), ROOT);
});
