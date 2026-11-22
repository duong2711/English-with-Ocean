const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const cleaner = fs.readFileSync(path.join(root, 'ldd-news-content.js'), 'utf8');
const main = fs.readFileSync(path.join(root, 'scriptphonetics.js'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const ui = fs.readFileSync(path.join(root, 'ldd-ui-upgrade.js'), 'utf8');

test('news cleaner loads before any news article handlers', () => {
  const moduleIndex = html.indexOf('src="ldd-news-content.js?');
  const appIndex = html.indexOf('src="scriptphonetics.js?');
  assert(moduleIndex > 0 && appIndex > moduleIndex);
  assert.match(cleaner, /window\.LDDNewsContent=\{clean,toPlainText,listWords\}/);
});
test('news articles are sanitized on load, editor save, render and sentence extraction', () => {
  assert.match(main, /content: window\.LDDNewsContent \? window\.LDDNewsContent\.clean\(row\.content\) : row\.content/);
  assert.match(main, /content: window\.LDDNewsContent\.clean\(fields\.content\)/);
  assert.match(main, /window\.LDDNewsContent\.toPlainText\(html\)/);
  assert.match(main, /readingHtml = window\.LDDNewsContent \? window\.LDDNewsContent\.clean\(article\.content\) : article\.content/);
  assert.match(main, /sentenceList = splitIntoSentences\(plainText\)/);
});
test('news glossary and photo credits are separated from student practice', () => {
  assert.match(cleaner, /const FOOTER=/);
  assert.match(cleaner, /const GLOSSARY=/);
  assert.match(cleaner, /const CLUTTER=/);
  assert.match(cleaner, /meta\.difficultWords=listWords\(value\)/);
  assert.match(cleaner, /meta\.imageCredit=/);
  assert.match(cleaner, /querySelectorAll\('\.ldd-news-meta-anchor,\[aria-hidden="true"\]/);
  assert.match(ui, /ldd-news-nontranslate-meta/);
  assert.match(ui, /Array\.isArray\(meta\.difficultWords\)/);
});

// Real DOM regression when Chromium is available (skips in lightweight CI).
test('browser: metadata is removed, article sentences survive, glossary preserved', {
  skip: !fs.existsSync('/usr/bin/chromium')
}, () => {
  const { spawnSync } = require('node:child_process');
  const os = require('node:os');
  const { pathToFileURL } = require('node:url');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ldd-news-clean-'));
  const fixture = '<p>The image source is important to the story.</p>' +
    '<p><strong>Difficult words:</strong> source (the origin of something); research (careful study).</p>' +
    '<p>Sources: News in Levels.</p>' +
    '<p><small>Ảnh minh họa: Artist / Wikimedia Commons · CC BY 4.0.</small></p>';
  const cases = [
    "const c=window.LDDNewsContent.clean(fixture);",
    "const plain=window.LDDNewsContent.toPlainText(fixture);",
    "const again=window.LDDNewsContent.clean(c);",
    "const tmp=document.createElement('div');tmp.innerHTML=c;",
    "const anchor=tmp.querySelector('.ldd-news-meta-anchor');",
    "const meta=JSON.parse(decodeURIComponent(anchor.dataset.meta));",
    "const ok=plain==='The image source is important to the story.'",
    " && c===again && !c.includes('Sources: News in Levels')",
    " && !c.includes('Ảnh minh họa:') && !c.includes('<p><strong>Difficult words:')",
    " && meta.difficultWords.length===2 && !!meta.imageCredit;",
    "document.getElementById('result').textContent=ok?'PASS':'FAIL: '+plain;"
  ].join('\n');
  const documentHtml = '<!doctype html><meta charset="utf-8"><pre id="result">NOT RUN</pre>' +
    '<script src="' + pathToFileURL(path.join(root, 'ldd-news-content.js')).href + '"></script>' +
    '<script>const fixture=' + JSON.stringify(fixture).replace(/</g, '\\u003c') + ';\n' + cases + '</script>';
  const tempPath = path.join(dir, 'fixture.html');
  fs.writeFileSync(tempPath, documentHtml);
  try {
    const run = spawnSync('/usr/bin/chromium', [
      '--headless', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage',
      '--disable-web-security', '--dump-dom', pathToFileURL(tempPath).href
    ], { encoding: 'utf8', timeout: 20000 });
    assert.equal(run.status, 0, run.stderr?.slice(-400));
    assert.match(run.stdout, /<pre id="result">PASS<\/pre>/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
