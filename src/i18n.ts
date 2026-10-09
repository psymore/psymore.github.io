import type { Locale, Status } from './types';

const en = {
  'meta.title': 'Ege Özel, Frontend Developer',
  'meta.description':
    'Frontend developer in Ankara. React and TypeScript interfaces, from a security platform to a browser-based 3D workshop.',
  skip: 'Skip to projects',
  'profile.label': 'Profile',
  'profile.role': 'Frontend Developer',
  'profile.strengths': 'Main technologies',
  'profile.location': 'Ankara, Türkiye',
  'lang.label': 'Language',
  'link.github': 'GitHub',
  'link.linkedin': 'LinkedIn',
  'link.email': 'Email',
  'link.cv': 'Request CV',
  'link.cvSubject': 'CV request',
  'link.demo': 'Live demo',
  'link.code': 'Code',
  'link.marketplace': 'Marketplace',
  'link.release': 'Download',
  'link.site': 'Website',
  'link.newTab': 'opens in a new tab',
  'work.title': 'Selected work',
  'more.title': 'More work',
  'experience.title': 'Experience',
  'education.title': 'Education',
  'contact.title': 'Contact',
  'contact.text': 'Open to frontend roles. Email is the fastest way to reach me.',
  'card.tags': 'Technologies',
  'card.myPart': 'My part',
  'card.links': 'Links',
  'card.notes': 'Technical notes',
  'card.challenge': 'Challenge',
  'card.approach': 'Approach',
  'card.status': 'Status',
  'status.live': 'Live',
  'status.prototype': 'Prototype',
  'status.inDevelopment': 'In development',
  'media.empty': 'Screenshots coming soon',
  'media.play': 'Play preview',
  'media.pause': 'Pause preview',
  'footer.note': '© 2026 Ege Özel. Built with React, TypeScript and Vite.',
} as const;

export type UiKey = keyof typeof en;

const tr: Record<UiKey, string> = {
  'meta.title': 'Ege Özel, Frontend Geliştirici',
  'meta.description':
    'Ankara’da frontend geliştirici. Bir güvenlik platformundan tarayıcıda çalışan bir 3B atölyeye kadar React ve TypeScript arayüzleri.',
  skip: 'Projelere geç',
  'profile.label': 'Profil',
  'profile.role': 'Frontend Geliştirici',
  'profile.strengths': 'Ana teknolojiler',
  'profile.location': 'Ankara, Türkiye',
  'lang.label': 'Dil',
  'link.github': 'GitHub',
  'link.linkedin': 'LinkedIn',
  'link.email': 'E-posta',
  'link.cv': 'CV iste',
  'link.cvSubject': 'CV talebi',
  'link.demo': 'Canlı demo',
  'link.code': 'Kod',
  'link.marketplace': 'Marketplace',
  'link.release': 'İndir',
  'link.site': 'Web sitesi',
  'link.newTab': 'yeni sekmede açılır',
  'work.title': 'Seçili projeler',
  'more.title': 'Diğer projeler',
  'experience.title': 'Deneyim',
  'education.title': 'Eğitim',
  'contact.title': 'İletişim',
  'contact.text': 'Frontend rollerine açığım. Bana en hızlı e-postayla ulaşabilirsiniz.',
  'card.tags': 'Teknolojiler',
  'card.myPart': 'Katkım',
  'card.links': 'Bağlantılar',
  'card.notes': 'Teknik notlar',
  'card.challenge': 'Zorluk',
  'card.approach': 'Yaklaşım',
  'card.status': 'Durum',
  'status.live': 'Yayında',
  'status.prototype': 'Prototip',
  'status.inDevelopment': 'Geliştiriliyor',
  'media.empty': 'Ekran görüntüleri yakında',
  'media.play': 'Önizlemeyi oynat',
  'media.pause': 'Önizlemeyi durdur',
  'footer.note': '© 2026 Ege Özel. React, TypeScript ve Vite ile geliştirildi.',
};

export const dictionaries: Record<Locale, Record<UiKey, string>> = { en, tr };

export const statusKey: Record<Status, UiKey> = {
  live: 'status.live',
  prototype: 'status.prototype',
  inDevelopment: 'status.inDevelopment',
};

export function isLocale(value: unknown): value is Locale {
  return value === 'en' || value === 'tr';
}

export type Translate = (key: UiKey) => string;

export function createT(locale: Locale): Translate {
  const dict = dictionaries[locale];
  return (key) => dict[key];
}

/** Path of the prerendered page for a locale. */
export function localePath(locale: Locale): string {
  return locale === 'en' ? '/' : '/tr/';
}
