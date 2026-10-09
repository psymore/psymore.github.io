import type { Project } from '../types';

/** Featured projects render in this order; `placement: 'more'` goes to the compact list. */
export const projects: Project[] = [
  {
    id: 'woodcraft',
    title: 'Woodcraft 3D Workshop',
    placement: 'featured',
    device: 'desktop',
    accent: '#D9A066',
    status: 'prototype',
    summary: {
      en: 'A browser-based woodworking modeler: build furniture from typed wood parts that snap together at connection points.',
      tr: 'Tarayıcıda çalışan ahşap modelleme aracı: türleri belli ahşap parçalar bağlantı noktalarından birbirine oturarak mobilyaya dönüşür.',
    },
    myPart: {
      en: 'Solo project: engine choice, data model, snapping logic, the React Three Fiber scene and the UI.',
      tr: 'Tek kişilik proje: motor seçimi, veri modeli, yakalama mantığı, React Three Fiber sahnesi ve arayüz.',
    },
    notes: {
      challenge: {
        en: 'Making parts snap predictably in 3D with mouse and touch, without turning the editor into a generic 3D tool.',
        tr: 'Parçaların fare ve dokunmayla 3B’de öngörülebilir biçimde birbirine oturması; editörü sıradan bir 3B araca çevirmeden.',
      },
      approach: {
        en: 'The engine core is plain TypeScript with unit tests: connection points, snapping, exploded view and structural checks. A registry adds part types, a Zustand store holds the session, and React Three Fiber only renders. Three.js won over Godot in a benchmark because type checks and tests run in seconds.',
        tr: 'Motor çekirdeği birim testli saf TypeScript: bağlantı noktaları, yakalama, patlatılmış görünüm ve yapısal kontroller. Parça türleri bir kayıt (registry) ile eklenir, oturumu Zustand tutar, React Three Fiber yalnızca çizer. Karşılaştırmada Three.js, tip kontrolü ve testler saniyeler içinde çalıştığı için Godot’nun önüne geçti.',
      },
    },
    tags: ['React', 'TypeScript', 'Three.js', 'React Three Fiber', 'Zustand', 'Vitest'],
    poster: {
      base: '/media/woodcraft',
      alt: {
        en: 'Woodcraft scene with wooden boards and a dowel on a grid, green connection points marked on one board.',
        tr: 'Izgara üzerinde ahşap tahtalar ve bir çubuk; bir tahtada yeşil bağlantı noktaları işaretli Woodcraft sahnesi.',
      },
    },
    links: [
      { kind: 'demo', href: 'https://psymore.github.io/woodcraft-prototype/' },
      { kind: 'code', href: 'https://github.com/psymore/woodcraft-prototype' },
    ],
  },
  {
    id: 'metronome',
    title: 'Metronome',
    placement: 'featured',
    device: 'desktop',
    accent: '#69D8CC',
    status: 'live',
    summary: {
      en: 'A practice metronome with subdivisions and polyrhythms that runs as a web app, an offline PWA and a Windows desktop app.',
      tr: 'Alt bölümler ve poliritimlerle çalışan bir pratik metronomu; web uygulaması, çevrimdışı PWA ve Windows masaüstü uygulaması olarak çalışır.',
    },
    myPart: {
      en: 'Solo project: audio scheduling, canvas visualisers, sound management and the UI.',
      tr: 'Tek kişilik proje: ses zamanlaması, canvas görselleştiricileri, ses yönetimi ve arayüz.',
    },
    notes: {
      challenge: {
        en: 'Browser timers drift. A metronome cannot.',
        tr: 'Tarayıcı zamanlayıcıları kayar; metronom kayamaz.',
      },
      approach: {
        en: 'Clicks are scheduled ahead on the AudioContext clock from a worker tick, and beat times are accumulated instead of re-measured. After a stall it skips missed beats rather than playing a burst. Visuals are a pure function of the heard time, drawn on canvas from cached sprites. One TypeScript codebase without a UI framework ships to web, PWA and Tauri.',
        tr: 'Vuruşlar bir worker tick’inden AudioContext saatine önceden planlanır; vuruş zamanları yeniden ölçülmez, toplanarak ilerler. Takılmadan sonra kaçan vuruşlar topluca çalınmaz, atlanır. Görseller duyulan zamanın saf fonksiyonudur ve önbelleğe alınmış sprite’larla canvas’a çizilir. UI framework’ü olmayan tek bir TypeScript kod tabanı web, PWA ve Tauri’ye çıkar.',
      },
      status: {
        en: 'Live on the web; the Android release is in progress.',
        tr: 'Web’de yayında; Android sürümü hazırlanıyor.',
      },
    },
    tags: ['TypeScript', 'Web Audio API', 'Canvas', 'Vite', 'PWA', 'Tauri 2'],
    poster: {
      base: '/media/metronome',
      alt: {
        en: 'Metronome in 4/4 at 120 BPM: a circular beat visualiser above the tempo dial.',
        tr: '4/4 ve 120 BPM’de metronom: tempo kadranının üstünde dairesel vuruş görselleştiricisi.',
      },
    },
    links: [
      { kind: 'demo', href: 'https://psymore.github.io/metronome/' },
      { kind: 'code', href: 'https://github.com/psymore/metronome' },
    ],
  },
  {
    id: 'wsm',
    title: 'Workspace Agent Session Manager',
    placement: 'featured',
    device: 'desktop',
    accent: '#A992FF',
    status: 'live',
    summary: {
      en: 'A VS Code extension that lists Claude Code and Codex sessions for every folder of a workspace, with context and usage limits in the status bar.',
      tr: 'Claude Code ve Codex oturumlarını çalışma alanındaki her klasör için listeleyen, bağlam ve kullanım sınırlarını durum çubuğunda gösteren VS Code eklentisi.',
    },
    myPart: {
      en: 'Solo project, published on the VS Code Marketplace.',
      tr: 'Tek kişilik proje; VS Code Marketplace’te yayında.',
    },
    notes: {
      challenge: {
        en: 'Matching each terminal to the right agent session across multi-root workspaces, without any network access.',
        tr: 'Çok köklü çalışma alanlarında her terminali doğru ajan oturumuyla eşleştirmek; hiç ağ erişimi olmadan.',
      },
      approach: {
        en: 'It reads only the files the agents already keep on disk and runs their own CLIs. Terminals are matched by resumed session id, by process id for Claude, or by start time for Codex; otherwise the newest session in that folder is shown, never one from another repo.',
        tr: 'Yalnızca ajanların diskte zaten tuttuğu dosyaları okur ve onların kendi CLI’larını çalıştırır. Terminaller devam ettirilen oturum kimliğiyle, Claude için süreç kimliğiyle ya da Codex için başlangıç zamanıyla eşleşir; eşleşme yoksa o klasördeki en yeni oturum gösterilir, asla başka bir deponunki değil.',
      },
    },
    tags: ['TypeScript', 'VS Code Extension API', 'Node.js'],
    poster: {
      base: '/media/wsm',
      alt: {
        en: 'VS Code side bar with the extension’s usage bars for Claude and Codex and its sessions grouped by repo.',
        tr: 'Eklentinin Claude ve Codex kullanım çubuklarını ve depoya göre gruplanmış oturumlarını gösteren VS Code kenar çubuğu.',
      },
    },
    links: [
      {
        kind: 'marketplace',
        href: 'https://marketplace.visualstudio.com/items?itemName=egeozel.workspace-agent-session-manager',
      },
      { kind: 'code', href: 'https://github.com/psymore/workspace-agent-session-manager' },
    ],
  },
  {
    id: 'world-of-cards',
    title: 'World of Cards',
    placement: 'featured',
    device: 'mobile',
    accent: '#E07A7A',
    status: 'inDevelopment',
    summary: {
      en: 'A mobile collection of traditional card games on one shared engine. Pişti, Batak and Pis Yedili are playable offline against AI opponents.',
      tr: 'Ortak bir motor üzerinde geleneksel kart oyunları koleksiyonu. Pişti, Batak ve Pis Yedili yapay zekâ rakiplere karşı çevrimdışı oynanabiliyor.',
    },
    myPart: {
      en: 'Solo project: game engine, rules, AI opponents and the mobile UI.',
      tr: 'Tek kişilik proje: oyun motoru, kurallar, yapay zekâ rakipler ve mobil arayüz.',
    },
    notes: {
      challenge: {
        en: 'Adding a new game should mean writing its rules, not building a new app.',
        tr: 'Yeni bir oyun eklemek yeni bir uygulama yazmak değil, yalnızca kurallarını yazmak olmalı.',
      },
      approach: {
        en: 'An npm-workspaces monorepo with a shared engine package (cards, rules, AI interface, statistics, persistence) and a shared UI package. Each game registers its own rules and plugs into the same screens. Jest covers the engine and the mobile app.',
        tr: 'Ortak motor paketi (kartlar, kurallar, yapay zekâ arayüzü, istatistik, kalıcılık) ve ortak UI paketi olan bir npm workspaces monoreposu. Her oyun kendi kurallarını kaydeder ve aynı ekranlara bağlanır. Motor ve mobil uygulama Jest ile test edilir.',
      },
    },
    tags: ['TypeScript', 'React Native', 'Expo', 'Zustand', 'Reanimated', 'Jest'],
    poster: null,
    links: [{ kind: 'code', href: 'https://github.com/psymore/world-of-cards' }],
  },
  {
    id: 'grocery',
    title: 'Grocery',
    placement: 'featured',
    device: 'desktop',
    accent: '#9BCB6B',
    summary: {
      en: 'A shopping list and meal-planning app for households, synced across devices, with nutrition guidance.',
      tr: 'Haneler için cihazlar arasında eşitlenen alışveriş listesi ve yemek planlama uygulaması; beslenme rehberliğiyle.',
    },
    myPart: {
      en: 'Built the whole app: client, API functions and data model.',
      tr: 'Uygulamanın tamamını geliştirdim: istemci, API fonksiyonları ve veri modeli.',
    },
    notes: {
      challenge: {
        en: 'Keeping one household’s lists in sync across devices and members, with clear ownership.',
        tr: 'Bir hanenin listelerini cihazlar ve üyeler arasında, sahipliği net tutarak eşitlemek.',
      },
      approach: {
        en: 'Preact with shadcn/ui running through preact/compat, Supabase for data and auth, one Vercel function per API route. Google sign-in, sessions, account deletion, household sharing by email and owner/member permissions.',
        tr: 'shadcn/ui’ın preact/compat üzerinden çalıştığı Preact, veri ve kimlik doğrulama için Supabase, her API rotası için bir Vercel fonksiyonu. Google ile giriş, oturumlar, hesap silme, e-postayla hane paylaşımı ve sahip/üye yetkileri.',
      },
    },
    tags: ['Preact', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Vercel Functions'],
    poster: null,
    links: [],
  },
  {
    id: 'interval-timer',
    title: 'Interval Timer',
    placement: 'more',
    device: 'desktop',
    accent: '#69D8CC',
    status: 'live',
    summary: {
      en: 'A Windows work/break timer with presets, an always-on-top mini window and alarms from local files, YouTube or Spotify.',
      tr: 'Hazır ayarlar, her zaman üstte duran mini pencere ve yerel dosya, YouTube ya da Spotify alarmlarıyla Windows çalışma/mola zamanlayıcısı.',
    },
    myPart: { en: 'Solo project.', tr: 'Tek kişilik proje.' },
    tags: ['JavaScript', 'Electron', 'PWA'],
    poster: null,
    links: [
      { kind: 'site', href: 'https://psymore.github.io/interval-timer/' },
      { kind: 'release', href: 'https://github.com/psymore/interval-timer/releases/latest' },
      { kind: 'code', href: 'https://github.com/psymore/interval-timer' },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.placement === 'featured');
export const moreProjects = projects.filter((p) => p.placement === 'more');
