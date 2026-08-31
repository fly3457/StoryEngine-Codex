# Prompt: Voice Consistency Check

## Instructions for Codex

### Step 1: Load Voice Reference
```
READ: style/voice-guide.md
READ: style/samples.md
```

Internalize the target voice completely — rhythm, vocabulary, metaphor density, POV depth, everything.

Read relevant character profiles for their Voice DNA when assessing dialogue.
Record missing guide/sample/profile references rather than inventing an approved voice.

### Step 2: Chapter-by-Chapter Analysis
Read numeric chapter files in filename order, excluding reader-report.md and notes.
For long manuscripts, review batches of 3–5 chapters and retain coverage/findings in
the report. Do not skip chapters or silently revise their prose. For each chapter, evaluate:

1. **Sentence Rhythm:** Does the cadence match the voice guide?
2. **Vocabulary:** Any words that feel out of register?
3. **Metaphor Quality:** Right density? Right domains? Any clichés?
4. **Dialogue Voice:** Do characters sound distinct from each other AND consistent with their voice DNA?
5. **POV Depth:** Is psychic distance consistent with the guide?
6. **Paragraph Structure:** Matching the established patterns?
7. **Tone:** Any drift toward too formal, too casual, too purple, too flat?

### Step 3: Generate Report
Create `style/consistency-report.md`:

```markdown
# Voice Consistency Report — [Date]

## Overall Assessment
[1-2 paragraphs: How consistent is the voice across the manuscript?]

## Voice Drift Instances
### Chapter [N] — [Severity: Minor/Moderate/Major]
- **Location:** Paragraph [N]
- **Issue:** [What drifted — e.g., "shifts to overly academic register"]
- **Example:** "[Brief quote of the drifted passage]"
- **Should Sound Like:** "[Brief example of how it should read]"

## Character Voice Distinctiveness
| Character | Distinctiveness Score (1-10) | Notes |
|-----------|------------------------------|-------|
| | | |

## Strongest Chapters (Voice)
[List chapters where voice is most on-target]

## Chapters Needing Voice Revision
[List chapters with significant drift]
```

Present the report and wait for the user's revision direction. For voice drift during
actual drafting, use the original re-read → temporary 100-word calibration → delete →
resume protocol in docs/workflow.md; do not add an automated prose evaluator.
