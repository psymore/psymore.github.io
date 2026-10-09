import { renderToString } from 'react-dom/server';
import { App } from './App';
import { createT } from './i18n';
import type { Locale } from './types';

export interface RenderedPage {
  html: string;
  title: string;
  description: string;
}

export function renderPage(locale: Locale): RenderedPage {
  const t = createT(locale);
  return {
    html: renderToString(<App locale={locale} />),
    title: t('meta.title'),
    description: t('meta.description'),
  };
}
