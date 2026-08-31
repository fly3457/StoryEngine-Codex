const {
  Document, Packer, Paragraph, TextRun,
  AlignmentType, HeadingLevel, PageBreak
} = require('docx');
const fs = require('fs');
const path = require('path');

const DRAFTS_DIR = path.join(__dirname, 'drafts');

// Derive output filename from PROJECT.md title, or fall back to 'manuscript.docx'
function getOutputPath() {
  const slug = getTitle().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return path.join(__dirname, `${slug || 'manuscript'}.docx`);
}

const OUTPUT = getOutputPath();

// ── Inline parser: handles *italic* spans ──────────────────────────────────
function parseInline(text, extraRunProps = {}) {
  const runs = [];
  // split on *…* groups, preserving the delimiters as capture groups
  const parts = text.split(/(\*[^*]+\*)/);
  for (const part of parts) {
    if (!part) continue;
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      runs.push(new TextRun({
        text: part.slice(1, -1),
        italics: true,
        font: 'Georgia',
        size: 22,
        ...extraRunProps
      }));
    } else {
      runs.push(new TextRun({
        text: part,
        font: 'Georgia',
        size: 22,
        ...extraRunProps
      }));
    }
  }
  return runs;
}

// ── Body paragraph factory ─────────────────────────────────────────────────
function bodyPara(text, firstAfterBreak = false) {
  return new Paragraph({
    children: parseInline(text),
    // no first-line indent on the opening paragraph of each section
    indent: firstAfterBreak ? undefined : { firstLine: 720 },
    spacing: { before: 0, after: 0, line: 264, lineRule: 'auto' },
  });
}

// ── Scene-break paragraph ("* * *") ───────────────────────────────────────
function scenePara() {
  return new Paragraph({
    children: [new TextRun({ text: '* * *', font: 'Georgia', size: 22 })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 240, after: 240 },
  });
}

// ── Parse one chapter .md file ─────────────────────────────────────────────
function parseChapter(filePath) {
  const raw   = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
  const lines = raw.split('\n');

  let title = '';
  const bodyLines = [];

  for (const line of lines) {
    if (line.startsWith('# ')) {
      title = line.slice(2).trim();
    } else {
      bodyLines.push(line);
    }
  }

  const paras = [];
  let pending = '';
  let firstAfterBreak = true; // first para of chapter gets no indent

  const flush = () => {
    const text = pending.trim();
    if (text) {
      paras.push(bodyPara(text, firstAfterBreak));
      firstAfterBreak = false;
    }
    pending = '';
  };

  for (const line of bodyLines) {
    const trimmed = line.trim();
    if (trimmed === '---') {
      flush();
      paras.push(scenePara());
      firstAfterBreak = true; // first para after a scene break gets no indent
    } else if (trimmed === '') {
      flush();
    } else {
      // join continuation lines with a space (shouldn't be needed but safe)
      pending = pending ? pending + ' ' + trimmed : trimmed;
    }
  }
  flush();

  return { title, paras };
}

// ── Build document ─────────────────────────────────────────────────────────
const children = [];

// Read title for title page
function getTitle() {
  try {
    const lines = fs.readFileSync(path.join(__dirname, 'PROJECT.md'), 'utf8')
      .replace(/\r\n/g, '\n').split('\n');
    const valid = value => value &&
      !/^\[(?:Title|Working Title|Your Story Title)\]$/.test(value);
    const heading = lines.findIndex(line => /^## Working Title\s*$/.test(line));
    if (heading >= 0) {
      for (const line of lines.slice(heading + 1)) {
        if (/^## /.test(line)) break;
        const title = line.trim();
        if (valid(title)) return title;
      }
    }
    const titleLine = lines.find(line => /^#\s+/.test(line));
    if (titleLine) {
      const title = titleLine.replace(/^#\s+/, '').replace(/^PROJECT\s*[—-]\s*/, '').trim();
      if (valid(title)) return title;
    }
  } catch (_) { /* PROJECT.md not found or unreadable */ }
  return 'Manuscript';
}

const TITLE = getTitle();

// Title page
children.push(
  new Paragraph({ spacing: { before: 3600 } }), // push title down ~2.5"
  new Paragraph({
    children: [new TextRun({
      text: TITLE,
      font: 'Georgia',
      size: 48,
      bold: true,
    })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 480 },
  }),
  new Paragraph({
    children: [new TextRun({ text: '' })], // spacer
  }),
);

// Auto-detect chapters from the canonical drafts directory
const chapterFiles = fs.readdirSync(DRAFTS_DIR)
  .filter(f => /^chapter-\d+\.md$/.test(f))
  .sort();

// Chapters
for (const filename of chapterFiles) {
  const file    = path.join(DRAFTS_DIR, filename);
  const chapter = parseChapter(file);

  // Page break before every chapter
  children.push(new Paragraph({ children: [new PageBreak()] }));

  // Chapter heading
  children.push(new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({
      text: chapter.title,
      font: 'Georgia',
      size: 28,
      bold: true,
      color: '000000',
    })],
    spacing: { before: 720, after: 480 },
  }));

  // Body paragraphs
  children.push(...chapter.paras);
}

// ── Assemble and write ─────────────────────────────────────────────────────
const doc = new Document({
  styles: {
    default: {
      document: { run: { font: 'Georgia', size: 22 } },
    },
    paragraphStyles: [
      {
        id: 'Heading1',
        name: 'Heading 1',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run:       { size: 28, bold: true, font: 'Georgia', color: '000000' },
        paragraph: { spacing: { before: 720, after: 480 }, outlineLevel: 0 },
      },
    ],
  },
  sections: [{
    properties: {
      page: {
        // 6 × 9 inches — standard trade paperback trim
        size: { width: 8640, height: 12960 },
        margin: { top: 1260, right: 1080, bottom: 1260, left: 1080 }, // 0.875" / 0.75"
      },
    },
    children,
  }],
});

Packer.toBuffer(doc)
  .then(buf => {
    fs.writeFileSync(OUTPUT, buf);
    console.log(`✓ Written to: ${OUTPUT}`);
  })
  .catch(err => {
    console.error('Build failed:', err);
    process.exit(1);
  });
