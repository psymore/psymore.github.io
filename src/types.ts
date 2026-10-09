export type Locale = 'en' | 'tr';
export const locales: readonly Locale[] = ['en', 'tr'];

/** A string in every supported language. */
export type Text = Record<Locale, string>;

export type Status = 'live' | 'prototype' | 'inDevelopment';
export type Device = 'desktop' | 'mobile';
export type LinkKind = 'demo' | 'code' | 'marketplace' | 'release' | 'site';

export interface ProjectLink {
  kind: LinkKind;
  href: string;
}

/** Files live at `${base}-${width}.{avif,webp}`; see scripts/build-media.mjs. */
export interface Poster {
  base: string;
  alt: Text;
}

export interface Project {
  id: string;
  title: string;
  placement: 'featured' | 'more';
  device: Device;
  accent: string;
  status?: Status;
  summary: Text;
  myPart: Text;
  notes?: { challenge: Text; approach: Text; status?: Text };
  tags: string[];
  poster: Poster | null;
  /** Silent preview clip, MP4. Optional; none are published yet. */
  video?: string;
  links: ProjectLink[];
}

export interface Job {
  company: string;
  role: Text;
  period: Text;
  bullets: Text[];
}

export interface Degree {
  title: Text;
  school: Text;
  year: string;
}
