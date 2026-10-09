// Writes dist/index.html (English) and dist/tr/index.html (Turkish) from the client
// template and the SSR bundle. Runs as the last step of `npm run build`.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const SITE = 'https://psymore.github.io';
const root = resolve(fileURLToPath(import.meta.url), '../..');
const dist = join(root, 'dist');
const template = await readFile(join(dist, 'index.html'), 'utf8');
const { renderPage } = await import(pathToFileURL(join(root, 'dist-ssr/entry-server.js')).href);

const escapeAttr = (value) =>
  value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

const pages = { en: '/', tr: '/tr/' };

function replaceOnce(html, search, replacement) {
  const matched = typeof search === 'string' ? html.includes(search) : search.test(html);
  if (!matched) throw new Error(`Template is missing ${search}`);
  return html.replace(search, () => replacement);
}

for (const [locale, path] of Object.entries(pages)) {
  const { html, title, description } = renderPage(locale);
  const head = [
    `<link rel="canonical" href="${SITE}${path}" />`,
    ...Object.entries(pages).map(([code, href]) => `<link rel="alternate" hreflang="${code}" href="${SITE}${href}" />`),
    `<link rel="alternate" hreflang="x-default" href="${SITE}/" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${SITE}${path}" />`,
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
  ].join('\n    ');

  let page = template;
  page = replaceOnce(page, '<html lang="en">', `<html lang="${locale}">`);
  page = replaceOnce(page, /<title>[^<]*<\/title>/, `<title>${escapeAttr(title)}</title>`);
  page = replaceOnce(
    page,
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escapeAttr(description)}" />`,
  );
  page = replaceOnce(page, '<!--head-->', head);
  page = replaceOnce(page, '<!--app-->', html);

  const dir = join(dist, path);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), page);
  console.log(`prerendered ${locale} → ${join('dist', path, 'index.html')}`);
}

await rm(join(root, 'dist-ssr'), { recursive: true, force: true });
