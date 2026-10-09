import { createT, statusKey, type UiKey } from '../i18n';
import { cssVars } from '../css';
import type { LinkKind, Locale, Project } from '../types';
import { ExternalLink } from './ExternalLink';
import { ProjectMedia } from './ProjectMedia';

export const linkLabel: Record<LinkKind, UiKey> = {
  demo: 'link.demo',
  code: 'link.code',
  marketplace: 'link.marketplace',
  release: 'link.release',
  site: 'link.site',
};

interface Props {
  project: Project;
  locale: Locale;
  /** Only the first card's poster loads eagerly with high priority. */
  eager: boolean;
}

export function ProjectCard({ project, locale, eager }: Props) {
  const t = createT(locale);
  const titleId = `${project.id}-title`;
  const hint = `: ${project.title} (${t('link.newTab')})`;

  return (
    <article className="card" aria-labelledby={titleId} style={cssVars({ '--accent-project': project.accent })}>
      <ProjectMedia project={project} locale={locale} eager={eager} />
      <div className="card__body">
        <div className="card__head">
          <h3 id={titleId} className="card__title">
            {project.title}
          </h3>
          {project.status && (
            <span className={`status status--${project.status}`}>{t(statusKey[project.status])}</span>
          )}
        </div>
        <p className="card__summary">{project.summary[locale]}</p>
        <ul className="tags" aria-label={t('card.tags')}>
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <p className="card__part">
          <span className="card__label">{t('card.myPart')}:</span> {project.myPart[locale]}
        </p>
        {project.links.length > 0 && (
          <ul className="links" aria-label={t('card.links')}>
            {project.links.map((link) => (
              <li key={link.href}>
                <ExternalLink className="btn btn--small" href={link.href} hint={hint}>
                  {t(linkLabel[link.kind])}
                </ExternalLink>
              </li>
            ))}
          </ul>
        )}
        {project.notes && (
          <details className="notes">
            <summary>{t('card.notes')}</summary>
            <dl>
              <div>
                <dt>{t('card.challenge')}</dt>
                <dd>{project.notes.challenge[locale]}</dd>
              </div>
              <div>
                <dt>{t('card.approach')}</dt>
                <dd>{project.notes.approach[locale]}</dd>
              </div>
              {project.notes.status && (
                <div>
                  <dt>{t('card.status')}</dt>
                  <dd>{project.notes.status[locale]}</dd>
                </div>
              )}
            </dl>
          </details>
        )}
      </div>
    </article>
  );
}
