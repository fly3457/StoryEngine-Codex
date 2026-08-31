const path = require('node:path');
const { builtinModules } = require('node:module');

const PHASES = ['Conception', 'World Building', 'Character Architecture', 'Structural Outlining',
  'Style Calibration', 'Iterative Drafting', 'Review Cycles', 'Revision'];
const PROMPTS = ['conception', 'world-building', 'character-architecture', 'structural-outlining',
  'style-calibration', 'draft-chapter', 'continuity-check', 'voice-check', 'reader-review', 'revision-pass'];
const COMMANDS = ['status', 'review [file]', 'revise [chapter]', 'continuity', 'threads',
  'wordcount', 'compile', 'audit', 'voice-check', 'reader-sim', 'next'];
const DRAFT_READS = ['PROJECT.md', 'drafts/chapter-[N-1].md', 'drafts/chapter-[N-2].md',
  'outline/scenes/[scene-id].md', 'continuity/tracker.md', 'continuity/threads.md',
  'style/voice-guide.md', 'style/samples.md', 'characters/[pov-character].md'];

function validateDraft(text) {
  const issues = [];
  const readBlock = text.slice(text.indexOf('### Step 1:'), text.indexOf('### Step 2:'));
  for (const file of DRAFT_READS) if (!readBlock.includes('READ: ' + file)) issues.push('missing read ' + file);
  const steps = ['### Step 1:', '### Step 2:', '### Step 3:', '### Step 4:', '### Step 5:'];
  let prior = -1;
  for (const step of steps) {
    const index = text.indexOf(step);
    if (index <= prior) issues.push('missing or reordered ' + step);
    prior = index;
  }
  const update = text.slice(text.indexOf('### Step 4:'), text.indexOf('### Step 5:'));
  for (const file of ['tracker', 'threads', 'changelog']) {
    if (!update.includes('UPDATE: continuity/' + file + '.md')) issues.push('missing update ' + file);
  }
  if (!/missing[\s\S]*changelog|changelog[\s\S]*missing/i.test(readBlock)) issues.push('missing read-gap record');
  if (!/Step 5:.*Verify/.test(text) || !/No continuity violations/.test(text)) issues.push('missing verification');
  return issues;
}

function scanIndependence(files) {
  const issues = [];
  const forbidden = /\b(?:TIDARC|AgentSoul|PerceptionProjection|World Fabric Plane|Simulation Plane|Subtick)\b/i;
  const builtins = new Set(builtinModules.flatMap(name => [name, 'node:' + name]));
  const runtimePackages = new Set(['docx']);
  if (files['package.json']) {
    try {
      const manifest = JSON.parse(files['package.json']);
      for (const [group, allowed] of [
        ['dependencies', runtimePackages], ['optionalDependencies', runtimePackages],
        ['devDependencies', new Set(['jszip'])], ['peerDependencies', new Set()],
      ]) {
        for (const [name, spec] of Object.entries(manifest[group] || {})) {
          if (!allowed.has(name)) issues.push('unexpected dependency ' + name);
          if (/^(?:file:|link:|workspace:|git\+|[A-Za-z]:[\\/])/.test(spec)) issues.push('external dependency path ' + name);
        }
      }
      if (manifest.workspaces) issues.push('workspace dependency graph');
    } catch { issues.push('invalid package manifest'); }
  }
  for (const [file, text] of Object.entries(files)) {
    if (file.startsWith('tests/')) continue; // Negative fixtures are not runtime dependencies.
    if (file === '.gitmodules') issues.push('external Git submodule');
    if (file === 'package-lock.json') {
      try {
        for (const entry of Object.values(JSON.parse(text).packages || {})) {
          if (entry.link || (entry.resolved && !/^https:\/\//.test(entry.resolved))) issues.push('nonportable locked dependency');
        }
      } catch { issues.push('invalid package lock'); }
      continue;
    }
    if (/\.(?:js|cjs|mjs|ts|tsx|py|sh|json)$/.test(file)) {
      if (forbidden.test(text)) issues.push('forbidden runtime coupling in ' + file);
      if (/\b(?:createServer|listen)\s*\(/.test(text)) issues.push('server implementation in ' + file);
      const imports = /\b(?:require|import)\s*\(\s*['"]([^'"]+)['"]|\bfrom\s+['"]([^'"]+)['"]/g;
      for (const match of text.matchAll(imports)) {
        const spec = match[1] || match[2];
        if (spec.startsWith('.')) {
          const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(file), spec));
          if (resolved === '..' || resolved.startsWith('../')) issues.push('outside-project import in ' + file);
        } else if (/^(?:[A-Za-z]:[\\/]|\/|file:)/.test(spec)) issues.push('absolute import in ' + file);
        else if (!builtins.has(spec) && !runtimePackages.has(spec)) issues.push('unexpected import ' + spec);
      }
    }
    // Operational path references are different from descriptive exclusions in docs.
    if (/\.md$/.test(file)) {
      for (const line of text.split('\n')) {
        if (/^\s*(?:READ|UPDATE|IMPORT|SOURCE)\s*:/i.test(line) && forbidden.test(line)) {
          issues.push('private operational state reference in ' + file);
        }
      }
    }
  }
  return issues;
}
module.exports = { PHASES, PROMPTS, COMMANDS, DRAFT_READS, validateDraft, scanIndependence };
