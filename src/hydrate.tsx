import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import { isLocale } from './i18n';
import type { Locale } from './types';

export function start(container: HTMLElement, prerendered: boolean): void {
  // Built pages carry their locale in <html lang>; the dev server serves only
  // English, so there ?lang=tr picks Turkish.
  const requested = prerendered ? document.documentElement.lang : new URLSearchParams(location.search).get('lang');
  const locale: Locale = isLocale(requested) ? requested : 'en';
  const app = (
    <StrictMode>
      <App locale={locale} />
    </StrictMode>
  );
  if (prerendered) hydrateRoot(container, app);
  else createRoot(container).render(app);
}
