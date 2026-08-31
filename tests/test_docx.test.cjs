const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const JSZip = require('jszip');
const { read, write, tempProject, runExporter, success, projectTitle } = require('./helpers.cjs');

async function documentXml(root, filename) {
  const bytes = fs.readFileSync(path.join(root, filename));
  assert.equal(bytes.subarray(0, 2).toString(), 'PK', 'actual DOCX ZIP output');
  const zip = await JSZip.loadAsync(bytes);
  assert.ok(zip.file('[Content_Types].xml'));
  assert.ok(zip.file('_rels/.rels'));
  return {
    xml: await zip.file('word/document.xml').async('string'),
    styles: await zip.file('word/styles.xml').async('string'),
  };
}
function paragraphContaining(xml, token) {
  const paragraph = [...xml.matchAll(/<w:p\b[^>]*>[\s\S]*?<\/w:p>/g)].find(match => match[0].includes(token));
  assert.ok(paragraph, 'paragraph containing ' + token);
  return paragraph[0];
}
test('real DOCX preserves original geometry, typography, scene breaks, italics and chapter order', async t => {
  const root = tempProject(t);
  projectTitle(root, 'The Last Letter');
  write(root, 'drafts/chapter-01.md', '# Chapter One\r\n\r\nOpening line\r\ncontinued here.\r\n\r\nSecond paragraph with *quiet* emphasis.\r\n\r\n---\r\n\r\nAfter the scene break.\r\n\r\nFinal body paragraph.\r\n');
  write(root, 'drafts/chapter-02.md', '# Chapter Two\n\nAnother chapter.\n');
  write(root, 'drafts/chapter-10.md', '# Chapter Ten\n\nLast chapter.\n');
  write(root, 'drafts/reader-report.md', 'READER_REPORT_MUST_NOT_EXPORT');
  write(root, 'drafts/chapter-notes.md', 'NONNUMERIC_NOTES_MUST_NOT_EXPORT');
  write(root, 'second-draft/chapter-01.md', '# WRONG_INPUT_DIRECTORY\nWrong content.\n');
  success(runExporter(root));
  const { xml, styles } = await documentXml(root, 'the-last-letter.docx');
  for (const token of ['The Last Letter', 'w:w="8640"', 'w:h="12960"', 'w:top="1260"',
    'w:right="1080"', 'w:bottom="1260"', 'w:left="1080"', 'Georgia',
    'w:sz w:val="22"', 'Opening line continued here.', 'w:type="page"']) {
    assert.ok(xml.includes(token), token);
  }
  assert.doesNotMatch(xml, /PROJECT —|READER_REPORT|NONNUMERIC_NOTES|WRONG_INPUT_DIRECTORY/);
  assert.ok(xml.indexOf('Chapter One') < xml.indexOf('Chapter Two'));
  assert.ok(xml.indexOf('Chapter Two') < xml.indexOf('Chapter Ten'));
  assert.match(styles, /w:styleId="Heading1"/);
  assert.match(paragraphContaining(xml, 'Second paragraph'), /w:firstLine="720"/);
  assert.match(paragraphContaining(xml, 'Second paragraph'), /<w:i\/>/);
  assert.doesNotMatch(paragraphContaining(xml, 'Opening line'), /w:firstLine=/);
  assert.doesNotMatch(paragraphContaining(xml, 'After the scene break'), /w:firstLine=/);
  assert.match(paragraphContaining(xml, 'Final body paragraph'), /w:firstLine="720"/);
  assert.match(paragraphContaining(xml, '* * *'), /w:jc w:val="center"/);
  assert.match(paragraphContaining(xml, '* * *'), /w:before="240"/);
  assert.match(paragraphContaining(xml, '* * *'), /w:after="240"/);
});
test('DOCX keeps a Chinese title and uses manuscript.docx when its ASCII slug is empty', async t => {
  const root = tempProject(t);
  projectTitle(root, '闭馆前的信');
  write(root, 'drafts/chapter-01.md', '# 第一章\n\n登记簿仍然打开。\n');
  success(runExporter(root));
  const { xml } = await documentXml(root, 'manuscript.docx');
  assert.ok(xml.includes('闭馆前的信'));
  assert.ok(xml.includes('登记簿仍然打开。'));
  assert.ok(!fs.existsSync(path.join(root, '.docx')));
});
test('DOCX prefers Working Title and resolves its own story root regardless of caller cwd', async t => {
  const root = tempProject(t);
  const elsewhere = tempProject(t);
  projectTitle(root, 'Actual & Chosen Title');
  write(root, 'PROJECT.md', read('PROJECT.md', root).replace('# PROJECT — Actual & Chosen Title', '# PROJECT — Stale Header'));
  projectTitle(elsewhere, 'Wrong Story');
  write(root, 'drafts/chapter-01.md', '# One\n\nCorrect source.\n');
  success(runExporter(root, elsewhere));
  const { xml } = await documentXml(root, 'actual-chosen-title.docx');
  assert.ok(xml.includes('Actual &amp; Chosen Title'));
  assert.doesNotMatch(xml, /Stale Header|Wrong Story/);
  assert.ok(!fs.existsSync(path.join(elsewhere, 'actual-chosen-title.docx')));
});
test('DOCX falls back to the project heading when Working Title is absent', async t => {
  const root = tempProject(t);
  write(root, 'PROJECT.md', '# PROJECT — Heading Only\n');
  success(runExporter(root));
  const { xml } = await documentXml(root, 'heading-only.docx');
  assert.ok(xml.includes('Heading Only'));
  assert.doesNotMatch(xml, /PROJECT —/);
});
test('empty template export retains title-page behavior without exporting placeholders as the title', async t => {
  const root = tempProject(t);
  success(runExporter(root));
  const { xml } = await documentXml(root, 'manuscript.docx');
  assert.ok(xml.includes('Manuscript'));
  assert.doesNotMatch(xml, /\[Your Story Title\]|\[Title\]|w:type="page"/);
});
