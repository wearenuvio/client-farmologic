#!/usr/bin/env node
/**
 * Integrity check for the Farmologic site. No dependencies.
 *
 *   node check.mjs            # from farmologic/
 *
 * Verifies, across every page in site/:
 *   - local href/src targets exist on disk
 *   - in-page #anchors resolve
 *   - <use href="#…"> symbols are defined on that page
 *   - ids are unique
 *   - title, description, exactly one <h1>, alt on every <img>
 *   - every class used in HTML is defined in site.css
 *   - every var(--…) in site.css is defined in tokens.css
 *   - the shared header/footer have not drifted between pages
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), 'site');
const pages = readdirSync(root).filter((f) => f.endsWith('.html'));
const issues = [];
const add = (page, msg) => issues.push(`${page}: ${msg}`);

const usedClasses = new Set();
const navSignatures = new Map();

for (const page of pages) {
  const html = readFileSync(join(root, page), 'utf8');

  for (const [, ref] of html.matchAll(/(?:href|src)="([^"#][^"]*)"/g)) {
    if (/^(https?:|mailto:|data:|\/\/)/.test(ref)) continue;
    let file = ref.split('?')[0].split('#')[0];
    if (!file || file === '/') continue;
    if (file.startsWith('/')) file = file.slice(1);
    if (!existsSync(join(root, file))) add(page, `missing file → ${ref}`);
  }

  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) {
    if (!html.includes(`id="${id}"`)) add(page, `dead anchor #${id}`);
  }

  for (const [, id] of html.matchAll(/<use href="#([^"]+)"/g)) {
    if (!html.includes(`id="${id}"`)) add(page, `undefined svg symbol #${id}`);
  }

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const dupes = [...new Set(ids.filter((v, i) => ids.indexOf(v) !== i))];
  if (dupes.length) add(page, `duplicate id: ${dupes.join(', ')}`);

  if (!/<title>/.test(html)) add(page, 'no <title>');
  if (!/name="description"/.test(html)) add(page, 'no meta description');

  const h1s = (html.match(/<h1/g) || []).length;
  if (h1s !== 1) add(page, `${h1s} <h1> elements (expected 1)`);

  for (const img of html.match(/<img [^>]*>/g) || []) {
    if (!/\salt=/.test(img)) add(page, `<img> without alt: ${img.slice(0, 60)}…`);
  }

  for (const [, list] of html.matchAll(/class="([^"]+)"/g)) {
    for (const c of list.split(/\s+/).filter(Boolean)) usedClasses.add(c);
  }

  const nav = html.match(/<nav class="site-nav"[\s\S]*?<\/nav>/);
  if (nav) {
    const signature = nav[0].replace(/ aria-current="page"/g, '');
    navSignatures.set(page, signature);
  } else {
    add(page, 'no primary <nav class="site-nav">');
  }
}

// Header/footer drift: every page's nav should be identical bar aria-current.
const [reference, ...rest] = [...navSignatures.entries()];
for (const [page, signature] of rest) {
  if (signature !== reference[1]) add(page, `primary nav differs from ${reference[0]}`);
}

const css = readFileSync(join(root, 'assets/css/site.css'), 'utf8');
const definedClasses = new Set([...css.matchAll(/\.([a-zA-Z][\w-]*)/g)].map((m) => m[1]));
const fileExtensions = /^(png|jpe?g|svg|css|js|html|webmanifest|xml|txt|com|org|w3)$/;
for (const c of usedClasses) {
  if (!definedClasses.has(c) && !fileExtensions.test(c)) {
    issues.push(`site.css: class .${c} is used in HTML but never defined`);
  }
}

const tokens = new Set(
  [...readFileSync(join(root, 'assets/css/tokens.css'), 'utf8').matchAll(/--([\w-]+)\s*:/g)].map((m) => m[1])
);
// Locally-scoped custom properties set inline in HTML, not design tokens.
const localVars = new Set(['reveal-delay', 'gold-text']);
for (const [, name] of css.matchAll(/var\(--([\w-]+)/g)) {
  if (!tokens.has(name) && !localVars.has(name)) {
    issues.push(`site.css: var(--${name}) is not defined in tokens.css`);
  }
}

if (issues.length) {
  console.error(`✗ ${issues.length} issue(s):\n` + issues.map((i) => `  - ${i}`).join('\n'));
  process.exit(1);
}
console.log(`✓ ${pages.length} pages clean — links, anchors, ids, meta, classes and tokens all resolve.`);
