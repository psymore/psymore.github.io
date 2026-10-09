import { createT } from '../i18n';
import type { Device, Locale, Poster as PosterData, Project } from '../types';
import { PreviewVideo } from './PreviewVideo';

const POSTER = {
  desktop: { widths: [800, 1600], width: 1600, height: 1000, sizes: '(min-width: 960px) 760px, 100vw' },
  mobile: { widths: [400, 800], width: 800, height: 1733, sizes: '(min-width: 960px) 240px, 45vw' },
} as const;

/** "https://psymore.github.io/metronome/" → "psymore.github.io/metronome" */
export function displayUrl(href: string): string {
  const url = new URL(href);
  return `${url.host}${url.pathname}`.replace(/\/$/, '');
}

function Poster({ poster, device, alt, eager }: { poster: PosterData; device: Device; alt: string; eager: boolean }) {
  const spec = POSTER[device];
  const srcSet = (ext: string) => spec.widths.map((w) => `${poster.base}-${w}.${ext} ${w}w`).join(', ');
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={spec.sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={spec.sizes} />
      <img
        src={`${poster.base}-${spec.widths[1]}.webp`}
        width={spec.width}
        height={spec.height}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding="async"
      />
    </picture>
  );
}

interface Props {
  project: Project;
  locale: Locale;
  eager: boolean;
}

export function ProjectMedia({ project, locale, eager }: Props) {
  const t = createT(locale);
  const demo = project.links.find((link) => link.kind === 'demo');
  return (
    <div className={`media media--${project.device}`}>
      <div className="media__frame">
        {demo && project.device === 'desktop' && (
          <div className="media__bar" aria-hidden="true">
            <span>{displayUrl(demo.href)}</span>
          </div>
        )}
        <div className="media__screen">
          {project.poster ? (
            <Poster poster={project.poster} device={project.device} alt={project.poster.alt[locale]} eager={eager} />
          ) : (
            <p className="media__empty">{t('media.empty')}</p>
          )}
          {project.poster && project.video && (
            <PreviewVideo src={project.video} labels={{ play: t('media.play'), pause: t('media.pause') }} />
          )}
        </div>
      </div>
    </div>
  );
}
