import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

import { mediaManifest } from '../src/content/media.js';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('keeps one H1 and valid local anchors', () => {
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.equal(/href="#"/.test(html), false);
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
  const anchors = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(anchors.filter((anchor) => !ids.has(anchor)), []);
});

test('all approved media paths exist', () => {
  const missing = [];
  for (const media of Object.values(mediaManifest)) {
    if (media.status !== 'approved') continue;
    const paths = [media.src, ...(media.srcSet || '').split(',').filter(Boolean).map((entry) => entry.trim().split(' ')[0])];
    for (const path of paths) {
      const url = new URL(`../${path.replace(/^\.\//, '')}`, import.meta.url);
      if (!fs.existsSync(url)) missing.push(path);
    }
  }
  assert.deepEqual(missing, []);
});

test('temporary product claims remain visibly marked', () => {
  assert.match(html, /Авторепосты · В разработке\*/);
  assert.match(html, /Это иллюстративный расчёт, а не статистика клиента/);
  assert.match(html, /Точное назначение и ссылка уточняются\.\*/);
});
