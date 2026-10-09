import type { Degree, Job, Text } from '../types';

export const profile = {
  name: 'Ege Özel',
  initials: 'EÖ',
  /** Path under public/ once a portrait exists; null shows the initials. */
  portrait: null as string | null,
  tagline: {
    en: 'Building interactive interfaces and thoughtful web experiences.',
    tr: 'Etkileşimli arayüzler ve özenli web deneyimleri geliştiriyorum.',
  } satisfies Text,
  intro: {
    en: 'Two years of professional React and Angular work, from the complete frontend of a released security platform to a browser-based 3D workshop and a Web Audio metronome.',
    tr: 'React ve Angular ile iki yıllık profesyonel deneyim: yayına alınan bir güvenlik platformunun frontend’inin tamamından tarayıcıda çalışan bir 3B atölyeye ve Web Audio metronoma kadar.',
  } satisfies Text,
  strengths: {
    primary: ['React', 'TypeScript', 'JavaScript', 'CSS'],
    secondary: ['Angular', 'Node.js', 'NestJS'],
  },
  email: 'egeozeldev@gmail.com',
  github: 'https://github.com/psymore',
  linkedin: 'https://www.linkedin.com/in/ege-%C3%B6zel-a721231bb',
};

export const jobs: Job[] = [
  {
    company: 'Patika Global Technology',
    role: { en: 'Full Stack Software Developer', tr: 'Full Stack Yazılım Geliştirici' },
    period: { en: 'March 2024 – January 2025, remote', tr: 'Mart 2024 – Ocak 2025, uzaktan' },
    bullets: [
      {
        en: 'Built the entire frontend of Traced Security, a released SaaS security posture product, on my own with React, TypeScript, Redux Toolkit and MUI.',
        tr: 'Yayına alınan Traced Security SSPM ürününün frontend’inin tamamını React, TypeScript, Redux Toolkit ve MUI ile tek başıma geliştirdim.',
      },
      {
        en: 'Overview, app inventory with SecurityScorecard ratings, data exposure, threat center, compliance (SOC 2, ISO 27001), integrations, audit trail and admin screens; user filters, Jira tickets from incidents and user emails.',
        tr: 'Genel bakış, SecurityScorecard puanlı uygulama envanteri, veri ifşası, tehdit merkezi, uyumluluk (SOC 2, ISO 27001), entegrasyon, denetim kaydı ve yönetici ekranları; kullanıcı filtreleri, olaylardan Jira kaydı ve e-posta akışları.',
      },
      {
        en: 'Added services to the NestJS backend and took part in deployments.',
        tr: 'NestJS backend’ine servisler ekledim ve yayına alma süreçlerine katıldım.',
      },
      {
        en: 'Analyzed PQM for a TÜBİTAK project (QMS) report, then built the Angular UI of PQM’s non-conformance (NCR) photo gallery.',
        tr: 'TÜBİTAK projesi (QMS) için PQM’yi analiz edip raporlamasını hazırladım; ardından PQM’de uygunsuzluk (NCR) fotoğraf galerisinin Angular arayüzünü geliştirdim.',
      },
    ],
  },
  {
    company: 'Traderlands',
    role: { en: 'Frontend Developer', tr: 'Frontend Geliştirici' },
    period: { en: 'October 2022 – September 2023, hybrid', tr: 'Ekim 2022 – Eylül 2023, hibrit' },
    bullets: [
      {
        en: 'Built the page structure of a blockchain-based algorithmic trading platform in React as one of a two-person frontend team, and handled most of the interface work.',
        tr: 'Blockchain tabanlı algoritmik alım satım platformunda iki kişilik frontend ekibinde React ile sayfa yapılarını oluşturdum; arayüz geliştirmelerinin büyük bölümünü üstlendim.',
      },
      {
        en: 'Landing page, login, registration, password recovery, marketplace, wallet and algorithm builder screens.',
        tr: 'Tanıtım sayfası, giriş, kayıt, şifre kurtarma, pazaryeri, cüzdan ve algoritma oluşturma ekranları.',
      },
    ],
  },
];

export const degrees: Degree[] = [
  {
    title: { en: 'MSc in Software Engineering', tr: 'Yazılım Mühendisliği yüksek lisans' },
    school: { en: 'Atılım University', tr: 'Atılım Üniversitesi' },
    year: '2024',
  },
  {
    title: { en: 'BSc in Environmental Engineering', tr: 'Çevre Mühendisliği lisans' },
    school: { en: 'Middle East Technical University', tr: 'Orta Doğu Teknik Üniversitesi' },
    year: '2020',
  },
];
