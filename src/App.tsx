import { Contact, EducationList, ExperienceList, MoreWork } from './components/Lists';
import { ProfileAside } from './components/ProfileAside';
import { ProjectCard } from './components/ProjectCard';
import { Section } from './components/Section';
import { featuredProjects } from './data/projects';
import { createT } from './i18n';
import type { Locale } from './types';

export function App({ locale }: { locale: Locale }) {
  const t = createT(locale);
  return (
    <>
      <a className="skip" href="#work">
        {t('skip')}
      </a>
      <div className="shell">
        <ProfileAside locale={locale} />
        <main className="content">
          <Section id="work" title={t('work.title')}>
            <div className="cards">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} locale={locale} eager={index === 0} />
              ))}
            </div>
          </Section>
          <Section id="more" title={t('more.title')}>
            <MoreWork locale={locale} />
          </Section>
          <Section id="experience" title={t('experience.title')}>
            <ExperienceList locale={locale} />
          </Section>
          <Section id="education" title={t('education.title')}>
            <EducationList locale={locale} />
          </Section>
          <Section id="contact" title={t('contact.title')}>
            <Contact locale={locale} />
          </Section>
          <footer className="footer">{t('footer.note')}</footer>
        </main>
      </div>
    </>
  );
}
