const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { blankStoryFiles } = require('./fixtures.cjs');

const ROOT = path.resolve(__dirname, '..');
const ignored = new Set(['.git', 'node_modules', '.tmp', 'StoryEngine-Codex-Prompts-v1']);
const read = (file, root = ROOT) => fs.readFileSync(path.join(root, file), 'utf8').replace(/\r\n/g, '\n');
const write = (root, file, text) => {
  const target = path.join(root, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, text, 'utf8');
};
function listFiles(root = ROOT) {
  const files = [];
  function visit(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (ignored.has(entry.name)) continue;
      const full = path.join(dir, entry.name);
      const relative = path.relative(root, full).split(path.sep).join('/');
      if (entry.isSymbolicLink()) throw new Error('Project must not depend on symlink: ' + relative);
      if (entry.isDirectory()) visit(full);
      else if (!/\.(?:docx|zip)$/.test(entry.name) && relative !== 'manuscript.md') files.push(relative);
    }
  }
  visit(root);
  return files.sort();
}
function tempProject(t, seed = true, sourceRoot = ROOT) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'storyengine-codex-test-'));
  t.after(() => {
    const resolved = path.resolve(dir);
    assert.equal(path.dirname(resolved), path.resolve(os.tmpdir()), 'cleanup stays in temp root');
    assert.ok(path.basename(resolved).startsWith('storyengine-codex-test-'), 'cleanup targets our fixture');
    fs.rmSync(resolved, { recursive: true, force: true, maxRetries: 3 });
  });
  if (seed) {
    // Exercise the current tools/templates without importing mutable story Canon.
    for (const name of ['build-docx.js', 'scripts', 'characters/_TEMPLATE.md', 'outline/scenes/_TEMPLATE.md']) {
      fs.mkdirSync(path.dirname(path.join(dir, name)), { recursive: true });
      fs.cpSync(path.join(sourceRoot, name), path.join(dir, name), { recursive: true });
    }
    for (const [file, content] of Object.entries(blankStoryFiles())) write(dir, file, content);
    fs.mkdirSync(path.join(dir, 'drafts'), { recursive: true });
  }
  return dir;
}
function copyRepository(target) {
  for (const file of listFiles()) {
    const output = path.join(target, file);
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.copyFileSync(path.join(ROOT, file), output);
  }
}
let bash;
function findBash() {
  if (bash) return bash;
  const candidates = [process.env.STORYENGINE_BASH];
  if (process.platform === 'win32') {
    candidates.push(path.join(process.env.ProgramFiles || 'C:\\Program Files', 'Git', 'bin', 'bash.exe'));
    const git = spawnSync('where.exe', ['git'], { encoding: 'utf8', timeout: 5000 });
    if (git.status === 0) {
      for (const line of git.stdout.trim().split(/\r?\n/)) {
        candidates.push(path.resolve(path.dirname(line), '..', 'bin', 'bash.exe'));
      }
    }
  } else candidates.push('bash');
  for (const candidate of candidates.filter(Boolean)) {
    const result = spawnSync(candidate, ['--version'], { encoding: 'utf8', timeout: 5000 });
    if (result.status === 0 && /GNU bash/.test(result.stdout)) return (bash = candidate);
  }
  throw new Error('Bash is required for script tests. Install Git Bash or set STORYENGINE_BASH.');
}
function bashPath(value) {
  return value.replace(/\\/g, '/').replace(/^([a-zA-Z]):/, (_, drive) => '/' + drive.toLowerCase());
}
function runBash(root, script, args = [], options = {}) {
  const relative = 'scripts/' + script;
  // Git Bash can lose a non-ASCII Windows working directory during process startup
  // on otherwise-English runners. Start from the ASCII checkout, then enter the
  // fixture explicitly inside Bash so MSYS performs the path conversion itself.
  const shellRoot = bashPath(root);
  const argv = options.pathPrefix
    ? ['-c', 'cd -- "$1" || exit; PATH="$2:$PATH"; shift 2; exec bash "$@"',
      'storyengine-test', shellRoot, bashPath(options.pathPrefix), relative, ...args]
    : ['-c', 'cd -- "$1" || exit; shift; exec bash "$@"', 'storyengine-test', shellRoot, relative, ...args];
  return spawnSync(findBash(), argv, {
    cwd: ROOT, encoding: 'utf8', timeout: 20000,
    env: {
      ...process.env,
      ...(process.platform === 'win32' ? { LANG: 'en_US.UTF-8', LC_ALL: 'en_US.UTF-8' } : {}),
      ...options.env,
    },
  });
}
function runExporter(root, cwd = root) {
  return spawnSync(process.execPath, [path.join(root, 'build-docx.js')], {
    cwd, encoding: 'utf8', timeout: 20000,
    env: { ...process.env, NODE_PATH: path.join(ROOT, 'node_modules') },
  });
}
function success(result) {
  assert.equal(result.status, 0, [String(result.error || ''), result.stdout, result.stderr].join('\n'));
}
function projectTitle(root, title = 'Fixture Story', target = '10 words') {
  write(root, 'PROJECT.md', '# PROJECT — ' + title + '\n\n## Working Title\n' + title +
    '\n\n## Target Length\n' + target + '\n\n## Current Phase\nPhase 1: Conception\n');
}
function fixedDate(root) {
  const bin = path.join(root, 'test-bin');
  write(root, 'test-bin/date', '#!/bin/bash\nprintf "%s\\n" "2026-09-01_1200"\n');
  fs.chmodSync(path.join(bin, 'date'), 0o755);
  return bin;
}
module.exports = { ROOT, read, write, listFiles, tempProject, copyRepository, findBash, runBash, runExporter, success, projectTitle, fixedDate };
