import { describe, expect, it } from 'vitest';
import { createT, dictionaries, isLocale, localePath } from '../src/i18n';

describe('i18n', () => {
  it('has the same keys in English and Turkish', () => {
    expect(Object.keys(dictionaries.tr).sort()).toEqual(Object.keys(dictionaries.en).sort());
  });

  it('has no empty strings', () => {
    for (const dict of Object.values(dictionaries)) {
      for (const [key, value] of Object.entries(dict)) {
        expect(value.trim(), key).not.toBe('');
      }
    }
  });

  it('translates per locale', () => {
    expect(createT('en')('profile.role')).toBe('Frontend Developer');
    expect(createT('tr')('profile.role')).toBe('Frontend Geliştirici');
  });

  it('recognises only supported locales', () => {
    expect(isLocale('tr')).toBe(true);
    expect(isLocale('de')).toBe(false);
    expect(isLocale(undefined)).toBe(false);
  });

  it('maps locales to page paths', () => {
    expect(localePath('en')).toBe('/');
    expect(localePath('tr')).toBe('/tr/');
  });
});
