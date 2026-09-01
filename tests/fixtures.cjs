// Deterministic utility-test inputs, not another story template or Canon source.
// A real clone's PROJECT and act files change during normal writing; tests must
// not require them to remain blank. Only fields consumed by the utilities belong here.
const blankProject = '# PROJECT — [Your Story Title]\n\n## Working Title\n[Title]\n\n' +
  '## Target Length\n[e.g., ~50,000 words / Novella / ~18 chapters]\n\n' +
  '## Current Phase\nPhase 1: Conception\n\n## Status\n- [ ] PROJECT.md approved\n';

const blankAct = act => `# Act ${act} — [Title]

## Chapters

### Chapter [N] — [Title]
- **Scene Card:** outline/scenes/ch[N]-s1.md
- **POV:** [Character]
- **Purpose:** [Why this chapter exists]
- **Word Target:** [N]

---

## Act ${act} Notes
[Thematic concerns, pacing notes, key moments to nail]
`;

function blankStoryFiles() {
  const files = { 'PROJECT.md': blankProject };
  for (const [file, heading] of Object.entries({
    'world/setting.md': 'Setting',
    'world/rules.md': 'World Rules',
    'world/timeline.md': 'Timeline',
    'world/locations.md': 'Locations',
    'characters/cast.md': 'Cast List',
    'outline/structure.md': 'Story Structure',
    'continuity/tracker.md': 'Continuity Tracker',
    'continuity/threads.md': 'Thread Tracker',
    'continuity/changelog.md': 'Continuity Changelog',
    'style/voice-guide.md': 'Voice Guide',
    'style/motifs.md': 'Motifs',
    'style/samples.md': 'Prose Samples',
  })) files[file] = '# ' + heading + '\n\nUtility test fixture only.\n';
  for (const act of [1, 2, 3]) files['outline/act-' + act + '.md'] = blankAct(act);
  return files;
}

module.exports = { blankProject, blankAct, blankStoryFiles };
