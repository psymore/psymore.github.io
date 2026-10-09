import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { degrees, jobs, profile } from '../src/data/profile';
import { featuredProjects, projects } from '../src/data/projects';

const isText = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && Object.keys(value).sort().join() === 'en,tr';

/** Every {en, tr} pair anywhere inside a value. */
function texts(value: unknown, path = ''): Array<[string, Record<string, unknown>]> {
  if (isText(value)) return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((item, i) => texts(item, `${path}[${i}]`));
  if (typeof value === 'object' && value !== null) {
    return Object.entries(value).flatMap(([key, item]) => texts(item, `${path}.${key}`));
  }
  return [];
}

describe('project data', () => {
  it('has unique ids', () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('features five projects in the agreed order', () => {
    expect(featuredProjects.map((p) => p.id)).toEqual(['woodcraft', 'metronome', 'wsm', 'world-of-cards', 'grocery']);
  });

  it('fills every English and Turkish string', () => {
    const all = texts({ profile, jobs, degrees, projects });
    expect(all.length).toBeGreaterThan(40);
    for (const [path, text] of all) {
      expect(String(text.en).trim(), `${path}.en`).not.toBe('');
      expect(String(text.tr).trim(), `${path}.tr`).not.toBe('');
    }
  });

  it('links only to https addresses', () => {
    for (const project of projects) {
      for (const link of project.links) expect(link.href, project.id).toMatch(/^https:\/\//);
    }
  });

  it('has every poster file the markup asks for', () => {
    for (const project of projects) {
      if (!project.poster) continue;
      const widths = project.device === 'desktop' ? [800, 1600] : [400, 800];
      for (const width of widths) {
        for (const ext of ['avif', 'webp']) {
          const file = join('public', `${project.poster.base}-${width}.${ext}`);
          expect(existsSync(file), file).toBe(true);
        }
      }
    }
  });

  it('keeps the agreed empty slots empty', () => {
    expect(profile.portrait).toBeNull();
    const byId = Object.fromEntries(projects.map((p) => [p.id, p]));
    expect(byId['world-of-cards'].poster).toBeNull();
    expect(byId.grocery.poster).toBeNull();
    expect(byId.grocery.links).toEqual([]);
  });

  it('has preview videos only for the approved projects, each with a poster and a file', () => {
    const withVideo = projects.filter((p) => p.video).map((p) => p.id);
    expect(withVideo).toEqual(['metronome', 'wsm']);
    for (const project of projects) {
      if (!project.video) continue;
      expect(project.poster, project.id).not.toBeNull();
      expect(existsSync(join('public', project.video)), project.video).toBe(true);
    }
  });
});
