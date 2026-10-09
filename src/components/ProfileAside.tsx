import { profile } from '../data/profile';
import { createT, localePath } from '../i18n';
import { cssVars } from '../css';
import { locales, type Locale } from '../types';
import { ExternalLink } from './ExternalLink';

export function ProfileAside({ locale }: { locale: Locale }) {
  const t = createT(locale);
  const newTab = ` (${t('link.newTab')})`;
  const cvHref = `mailto:${profile.email}?subject=${encodeURIComponent(t('link.cvSubject'))}`;

  return (
    <aside className="profile" aria-label={t('profile.label')}>
      <div className="profile__inner">
        {profile.portrait ? (
          <img className="portrait" src={profile.portrait} alt="" width={144} height={144} />
        ) : (
          <div className="portrait portrait--empty" aria-hidden="true">
            {profile.initials}
          </div>
        )}
        <h1 className="profile__name">{profile.name}</h1>
        <p className="profile__role">{t('profile.role')}</p>
        <p className="profile__tagline">{profile.tagline[locale]}</p>
        <p className="profile__intro">{profile.intro[locale]}</p>

        <ul className="strengths enter" style={cssVars({ '--i': 0 })} aria-label={t('profile.strengths')}>
          {profile.strengths.primary.map((name) => (
            <li key={name} className="strength">
              {name}
            </li>
          ))}
          {profile.strengths.secondary.map((name) => (
            <li key={name} className="strength strength--secondary">
              {name}
            </li>
          ))}
        </ul>

        <p className="profile__location enter" style={cssVars({ '--i': 1 })}>
          <span className="dot" aria-hidden="true" />
          {t('profile.location')}
        </p>

        <ul className="actions enter" style={cssVars({ '--i': 2 })}>
          <li>
            <a className="btn btn--primary" href={cvHref}>
              {t('link.cv')}
            </a>
          </li>
          <li>
            <a className="btn" href={`mailto:${profile.email}`}>
              {t('link.email')}
            </a>
          </li>
          <li>
            <ExternalLink className="btn" href={profile.github} hint={newTab}>
              {t('link.github')}
            </ExternalLink>
          </li>
          <li>
            <ExternalLink className="btn" href={profile.linkedin} hint={newTab}>
              {t('link.linkedin')}
            </ExternalLink>
          </li>
        </ul>

        <nav className="lang enter" style={cssVars({ '--i': 3 })} aria-label={t('lang.label')}>
          {locales.map((code) => (
            <a
              key={code}
              href={localePath(code)}
              hrefLang={code}
              lang={code}
              aria-current={code === locale ? 'page' : undefined}
            >
              {code.toUpperCase()}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
