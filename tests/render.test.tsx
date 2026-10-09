import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ProjectCard } from '../src/components/ProjectCard';
import { featuredProjects } from '../src/data/projects';
import { renderPage } from '../src/entry-server';

const en = renderPage('en');
const tr = renderPage('tr');

const anchors = (html: string) => [...html.matchAll(/<a\b[^>]*>/g)].map((m) => m[0]);

describe('prerendered page', () => {
  it('leads with the name and role', () => {
    expect(en.html).toMatch(/<h1 class="profile__name">Ege Özel<\/h1>/);
    expect(en.html).toContain('Frontend Developer');
    expect(tr.html).toContain('Frontend Geliştirici');
    expect(en.title).toBe('Ege Özel, Frontend Developer');
  });

  it('never publishes a phone number, a CV file or broken values', () => {
    for (const html of [en.html, tr.html]) {
      for (const banned of ['5544321601', '554 432', '+90', 'tel:', '.pdf', 'undefined', '[object Object]']) {
        expect(html, banned).not.toContain(banned);
      }
    }
  });

  it('opens external links safely in a new tab', () => {
    const external = anchors(en.html).filter((a) => /href="https?:/.test(a));
    expect(external.length).toBeGreaterThanOrEqual(12);
    for (const a of external) {
      expect(a).toContain('target="_blank"');
      expect(a).toContain('rel="noopener noreferrer"');
    }
  });

  it('offers a CV request by email, never a file', () => {
    expect(en.html).toContain('href="mailto:egeozeldev@gmail.com?subject=CV%20request"');
    expect(tr.html).toContain('href="mailto:egeozeldev@gmail.com?subject=CV%20talebi"');
  });

  it('links to the verified profiles', () => {
    expect(en.html).toContain('href="https://github.com/psymore"');
    expect(en.html).toContain('href="https://www.linkedin.com/in/ege-%C3%B6zel-a721231bb"');
  });

  it('loads only the first poster eagerly', () => {
    const images = [...en.html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
    expect(images.length).toBe(3);
    expect(images[0]).toContain('loading="eager"');
    expect(images[0]).toMatch(/fetchPriority="high"|fetchpriority="high"/);
    for (const img of images.slice(1)) expect(img).toContain('loading="lazy"');
  });

  it('marks the current language and links to the other', () => {
    expect(en.html).toMatch(/<a href="\/" hrefLang="en" lang="en" aria-current="page">EN<\/a>/);
    expect(en.html).toMatch(/<a href="\/tr\/" hrefLang="tr" lang="tr">TR<\/a>/);
    expect(tr.html).toMatch(/<a href="\/tr\/" hrefLang="tr" lang="tr" aria-current="page">TR<\/a>/);
  });

  it('shows placeholders for projects without screenshots', () => {
    expect(en.html.match(/class="media__empty"/g)?.length).toBe(2);
    expect(tr.html).toContain('Ekran görüntüleri yakında');
  });

  it('ships no React to the browser while no project has a video', () => {
    expect(en.html).not.toContain('data-hydrate');
  });

  it('marks a card with a video for hydration and never preloads it', () => {
    const withVideo = { ...featuredProjects[0], video: '/media/woodcraft.mp4' };
    const html = renderToString(<ProjectCard project={withVideo} locale="en" eager={false} />);
    expect(html).toContain('data-hydrate');
    expect(html).toContain('preload="none"');
    expect(html).not.toContain('woodcraft.mp4');
  });

  it('has a skip link to the projects', () => {
    expect(en.html.indexOf('class="skip" href="#work"')).toBeLessThan(en.html.indexOf('<aside'));
    expect(en.html).toContain('<section id="work"');
  });
});
