// Usage: npm run build && npm run check
// Serves dist/ locally and checks the built pages in Chrome through Playwright.
// PLAYWRIGHT_MODULE: path to a playwright package (default: "playwright").
// CHROME_PATH: Chrome executable (default: Playwright's bundled Chromium).
import { createReadStream, existsSync, statSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(import.meta.url), '../..');
const dist = join(root, 'dist');
const shots = join(root, 'tmp/qa');
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE ?? 'playwright');

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
};

const server = createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = join(dist, path);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!file.startsWith(dist) || !existsSync(file)) {
    res.writeHead(404).end('not found');
    return;
  }
  res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
  createReadStream(file).pipe(res);
});
await new Promise((done) => server.listen(0, '127.0.0.1', done));
const base = `http://127.0.0.1:${server.address().port}`;

await mkdir(shots, { recursive: true });
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const failures = [];
const fail = (where, message) => failures.push(`${where}: ${message}`);

async function open(path, viewport, options = {}) {
  const context = await browser.newContext({ viewport, ...options });
  const page = await context.newPage();
  const errors = [];
  page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));
  page.on('pageerror', (err) => errors.push(err.message));
  await page.goto(base + path, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  return { context, page, errors };
}

const viewports = { phone: { width: 360, height: 780 }, tablet: { width: 768, height: 1024 }, desktop: { width: 1280, height: 800 } };
const pages = { en: '/', tr: '/tr/' };

for (const [locale, path] of Object.entries(pages)) {
  for (const [name, viewport] of Object.entries(viewports)) {
    const where = `${locale} ${name}`;
    const { context, page, errors } = await open(path, viewport);
    if ((await page.getAttribute('html', 'lang')) !== locale) fail(where, 'wrong html lang');
    if ((await page.textContent('h1'))?.trim() !== 'Ege Özel') fail(where, 'h1 is not "Ege Özel"');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (overflow > 0) fail(where, `horizontal overflow ${overflow}px`);
    const firstPoster = await page.evaluate(() => {
      const img = document.querySelector('.card img');
      return img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0;
    });
    if (!firstPoster) fail(where, 'first poster did not load');
    const smallTargets = await page.evaluate(() =>
      [...document.querySelectorAll('a.btn, .lang a, .notes summary')]
        .filter((el) => el.getBoundingClientRect().height < 40)
        .map((el) => el.textContent.trim()),
    );
    if (smallTargets.length) fail(where, `touch targets under 40px: ${smallTargets.join(', ')}`);
    await page.screenshot({ path: join(shots, `${locale}-${name}-fold.png`) });
    // Scroll-driven reveals must finish once a card is in view.
    const hidden = [];
    for (const card of await page.locator('.card').all()) {
      await card.evaluate((el) => el.scrollIntoView({ block: 'center' }));
      await page.waitForTimeout(150);
      const opacity = await card.evaluate((el) => Number(getComputedStyle(el).opacity));
      if (opacity < 0.99) hidden.push(await card.locator('h3').textContent());
    }
    if (hidden.length) fail(where, `cards not revealed in view: ${hidden.join(', ')}`);
    // A full-page capture never scrolls, so freeze reveals for that picture only.
    await page.addStyleTag({ content: '.card { animation: none !important; }' });
    await page.screenshot({ path: join(shots, `${locale}-${name}.png`), fullPage: true });
    if (errors.length) fail(where, `console errors: ${errors.join(' | ')}`);
    await context.close();
  }
}

// Desktop: sticky profile, hover lift, details, language switch, keyboard, JS weight
{
  const where = 'en desktop';
  const { context, page, errors } = await open('/', viewports.desktop);
  await page.keyboard.press('Tab');
  if ((await page.evaluate(() => document.activeElement?.className)) !== 'skip') fail(where, 'first Tab is not the skip link');
  await page.keyboard.press('Enter');
  if ((await page.evaluate(() => document.activeElement?.id)) !== 'work') fail(where, 'skip link does not focus #work');
  await page.evaluate(() => window.scrollTo(0, 0));

  const js = await page.evaluate(() =>
    performance
      .getEntriesByType('resource')
      .filter((r) => r.name.endsWith('.js'))
      .reduce((sum, r) => sum + r.encodedBodySize, 0),
  );
  // Two preview-video cards hydrate React: ~250 KB raw (this server does not gzip), ~80 KB on Pages.
  if (js > 300_000) fail(where, `${js} bytes of JS loaded`);
  const videosLoaded = await page.evaluate(
    () => performance.getEntriesByType('resource').filter((r) => r.name.endsWith('.mp4')).length,
  );
  if (videosLoaded) fail(where, `${videosLoaded} preview video(s) requested before any interaction`);

  const lastAction = await page.evaluate(() => document.querySelector('.profile .lang').getBoundingClientRect().bottom);
  if (lastAction > viewports.desktop.height) fail(where, `profile does not fit: ends at ${Math.round(lastAction)}px`);
  await page.mouse.wheel(0, 2500);
  await page.waitForTimeout(400);
  const asideTop = await page.evaluate(() => document.querySelector('.profile').getBoundingClientRect().top);
  if (Math.abs(asideTop) > 1) fail(where, `profile not sticky (top ${asideTop})`);
  await page.evaluate(() => window.scrollTo(0, 0));

  const card = page.locator('.card').first();
  await card.hover();
  await page.waitForTimeout(450);
  const lift = await card.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m42);
  if (Math.round(lift) !== -4) fail(where, `hover lift ${lift}, expected -4`);

  await page.locator('.notes summary').first().click();
  if (!(await page.locator('.notes').first().evaluate((el) => el.open))) fail(where, 'technical notes did not open');


  await page.click('.lang a[hreflang="tr"]');
  await page.waitForLoadState('networkidle');
  if (new URL(page.url()).pathname !== '/tr/') fail(where, `language link went to ${page.url()}`);
  if ((await page.getAttribute('html', 'lang')) !== 'tr') fail(where, 'Turkish page lang is not tr');
  if (errors.length) fail(where, `console errors: ${errors.join(' | ')}`);
  await context.close();
}

// Smallest sticky screen: the whole profile must fit
{
  const { context, page } = await open('/tr/', { width: 1280, height: 720 });
  const bottom = await page.evaluate(() => document.querySelector('.profile .lang').getBoundingClientRect().bottom);
  if (bottom > 720) fail('tr 1280x720', `sticky profile is cut off at ${Math.round(bottom)}px`);
  await context.close();
}

// JavaScript off: the prerendered page is complete
{
  const { context, page } = await open('/', viewports.phone, { javaScriptEnabled: false });
  const ok = await page.evaluate(
    () => document.querySelectorAll('.card').length === 5 && document.querySelector('h1')?.textContent === 'Ege Özel',
  );
  if (!ok) fail('en no-JS', 'content missing without JavaScript');
  await context.close();
}

// Short laptop screen: profile scrolls away instead of being cut off
{
  const { context, page } = await open('/', { width: 1366, height: 680 });
  if ((await page.evaluate(() => getComputedStyle(document.querySelector('.profile')).position)) !== 'static') {
    fail('en 1366x680', 'profile should not be sticky on short screens');
  }
  await context.close();
}

// Reduced motion: no lift, no entrance or reveal animations
{
  const where = 'en reduced motion';
  const { context, page } = await open('/', viewports.desktop, { reducedMotion: 'reduce' });
  const card = page.locator('.card').first();
  await card.hover();
  await page.waitForTimeout(450);
  const lift = await card.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m42);
  if (lift !== 0) fail(where, `card still lifts (${lift})`);
  const animated = await page.evaluate(() =>
    [...document.querySelectorAll('.enter, .card')].filter((el) => getComputedStyle(el).animationName !== 'none').length,
  );
  if (animated) fail(where, `${animated} elements still animate`);
  await context.close();
}

await browser.close();
server.close();
console.log(JSON.stringify({ screenshots: shots, failures }, null, 2));
if (failures.length) process.exit(1);
