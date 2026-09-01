const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { ROOT, read, write, tempProject, success } = require('./helpers.cjs');
const { SOURCE_FILES } = require('../scripts/init-from-seed.cjs');

const REAL_SEED = path.join(ROOT, 'examples', 'seed-20260901');
const STATE_FILES = [
  'PROJECT.md',
  ...['setting', 'rules', 'timeline', 'locations'].map(name => `world/${name}.md`),
  'characters/cast.md',
  ...['structure', 'act-1', 'act-2', 'act-3'].map(name => `outline/${name}.md`),
  ...['tracker', 'threads', 'changelog'].map(name => `continuity/${name}.md`),
  ...['voice-guide', 'motifs', 'samples'].map(name => `style/${name}.md`),
];

function runImport(root, seed = REAL_SEED) {
  return spawnSync(process.execPath, [path.join(root, 'scripts', 'init-from-seed.cjs'), seed], {
    cwd: root,
    encoding: 'utf8',
    timeout: 20000,
  });
}

function selectedSeedCopy(t, directoryName = '种子 package with spaces') {
  const container = tempProject(t, false);
  const seed = path.join(container, directoryName);
  fs.mkdirSync(seed, { recursive: true });
  for (const name of SOURCE_FILES) fs.copyFileSync(path.join(REAL_SEED, name), path.join(seed, name));
  return seed;
}

function mutateJson(file, mutate) {
  const value = JSON.parse(fs.readFileSync(file, 'utf8'));
  mutate(value);
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n', 'utf8');
}

test('seed import renders the real Gray Harbor dossier without changing story state or Gates', t => {
  const root = tempProject(t);
  const before = Object.fromEntries(STATE_FILES.map(file => [file, fs.readFileSync(path.join(root, file))]));

  const result = runImport(root);
  success(result);
  assert.match(result.stdout, /Created STORY_SEED\.md/);
  const dossier = read('STORY_SEED.md', root);

  assert.match(dossier, /^# STORY SEED — 灰港/m);
  assert.match(dossier, /不是 StoryEngine Canon/);
  assert.match(dossier, /不表示 PROJECT、世界、人物、结构或任何 Review Gate 已获批准/);
  for (const id of ['gray_harbor_world', 'gray_harbor', 'council_hall', 'old_port', 'mine_district', 'deep_mine', 'clinic']) {
    assert.match(dossier, new RegExp('`' + id + '`'));
  }
  assert.equal((dossier.match(/^- `route_/gm) || []).length, 5);
  for (const id of ['town_council', 'miners_guild', 'tide_sanctuary', 'night_tide_network']) {
    assert.match(dossier, new RegExp('`' + id + '`'));
  }
  for (const id of ['mayor_zhou', 'engineer_lin', 'smuggler_chen', 'doctor_xu']) {
    assert.match(dossier, new RegExp('^### .+（`' + id + '`）$', 'm'));
  }
  assert.equal((dossier.match(/^#### (?:mine_exhaustion|relief_funds_diverted)$/gm) || []).length, 2);
  assert.match(dossier, /coal=amount=410/);
  assert.match(dossier, /food=amount=257/);
  assert.match(dossier, /medicine=amount=48/);
  assert.match(dossier, /contaminated_batch_real=true/);
  assert.match(dossier, /winter_onset_world_time_seconds=1819667/);
  assert.match(dossier, /1819667 秒（21天1小时27分47秒）/);

  const mayor = dossier.slice(dossier.indexOf('### 周砺'), dossier.indexOf('### 林栖'));
  const engineer = dossier.slice(dossier.indexOf('### 林栖'), dossier.indexOf('### 陈默潮'));
  const smuggler = dossier.slice(dossier.indexOf('### 陈默潮'), dossier.indexOf('### 徐澄'));
  const doctor = dossier.slice(dossier.indexOf('### 徐澄'), dossier.indexOf('## Phase 4'));
  assert.match(mayor, /secret `relief_funds_diverted`/);
  assert.doesNotMatch(mayor, /secret `mine_exhaustion`/);
  assert.match(engineer, /secret `mine_exhaustion`/);
  assert.doesNotMatch(engineer, /secret `relief_funds_diverted`/);
  assert.match(smuggler, /secret `relief_funds_diverted`/);
  assert.doesNotMatch(doctor, /secret `(?:mine_exhaustion|relief_funds_diverted)`/);

  assert.ok(!dossier.includes(path.resolve(REAL_SEED)), 'dossier must not leak the local source path');
  assert.doesNotMatch(dossier, /snapshot\.tick-0\.json — SHA-256/);
  for (const [file, bytes] of Object.entries(before)) {
    assert.deepEqual(fs.readFileSync(path.join(root, file)), bytes, file);
  }
  assert.doesNotMatch(read('PROJECT.md', root), /- \[x\]/i);
});

test('seed import needs only the five selected files and supports Unicode paths with spaces', t => {
  const root = tempProject(t);
  const seed = selectedSeedCopy(t);
  assert.deepEqual(fs.readdirSync(seed).sort(), [...SOURCE_FILES].sort());
  success(runImport(root, seed));
  assert.match(read('STORY_SEED.md', root), /# STORY SEED — 灰港/);
});

test('an identical seed rerun is a no-op and preserves the dossier file', t => {
  const root = tempProject(t);
  success(runImport(root));
  const target = path.join(root, 'STORY_SEED.md');
  const content = fs.readFileSync(target);
  const fixed = new Date('2020-01-02T03:04:05Z');
  fs.utimesSync(target, fixed, fixed);
  const result = runImport(root);
  success(result);
  assert.match(result.stdout, /already matches this seed; no changes made/);
  assert.deepEqual(fs.readFileSync(target), content);
  assert.equal(fs.statSync(target).mtimeMs, fixed.getTime());
});

test('a different existing dossier is never overwritten', t => {
  const root = tempProject(t);
  write(root, 'STORY_SEED.md', 'USER DOSSIER — PRESERVE\n');
  const result = runImport(root);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /refusing to overwrite/);
  assert.equal(read('STORY_SEED.md', root), 'USER DOSSIER — PRESERVE\n');
});

for (const fixture of [
  {
    name: 'missing selected file',
    mutate(seed) { fs.unlinkSync(path.join(seed, 'manifest.json')); },
    message: /missing required seed file: manifest\.json/,
  },
  {
    name: 'malformed JSON',
    mutate(seed) { fs.writeFileSync(path.join(seed, 'compiled_blueprint.json'), '{not-json', 'utf8'); },
    message: /invalid JSON in compiled_blueprint\.json/,
  },
  {
    name: 'blueprint hash mismatch',
    mutate(seed) {
      mutateJson(path.join(seed, 'manifest.json'), value => { value.manifest.blueprint_ref.hash = 'different-hash'; });
    },
    message: /blueprint hash mismatch/,
  },
  {
    name: 'failed validation report',
    mutate(seed) {
      mutateJson(path.join(seed, 'validation_report.json'), value => {
        value.ok = false;
        value.errors.push('fixture failure');
      });
    },
    message: /did not pass validation/,
  },
  {
    name: 'failed world fabric report',
    mutate(seed) {
      mutateJson(path.join(seed, 'world_fabric_report.json'), value => { value.fabric_ok = false; });
    },
    message: /world_fabric_report\.json did not pass validation/,
  },
]) {
  test(`seed import rejects ${fixture.name} without leaving partial output`, t => {
    const root = tempProject(t);
    const seed = selectedSeedCopy(t, fixture.name);
    fixture.mutate(seed);
    const result = runImport(root, seed);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, fixture.message);
    assert.ok(!fs.existsSync(path.join(root, 'STORY_SEED.md')));
  });
}

test('seed importer refuses an unrelated directory and is not hard-coded to this fixture', t => {
  const root = tempProject(t, false);
  fs.mkdirSync(path.join(root, 'scripts'), { recursive: true });
  fs.copyFileSync(path.join(ROOT, 'scripts', 'init-from-seed.cjs'), path.join(root, 'scripts', 'init-from-seed.cjs'));
  const result = runImport(root);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /PROJECT\.md is required/);
  assert.ok(!fs.existsSync(path.join(root, 'STORY_SEED.md')));
  assert.doesNotMatch(read('scripts/init-from-seed.cjs'), /seed-20260901/);
});
