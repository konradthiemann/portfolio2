// Statische, sprachunabhängige Profildaten (URLs, Tech-Namen).
// Übersetzbare Texte liegen in i18n/locales/*.json.

export interface Project {
  /** i18n-Key unter `projects.items.<slug>` */
  slug: string
  /** Repository (GitHub). */
  url: string
  /** Optionaler Link zur deployten App. Fehlt das Feld, zeigt die Karte nur den Repo-Link. */
  liveUrl?: string
  stack: string[]
  /** Optionales Vorschaubild (in /public/projects). WebP + JPG-Fallback;
     nur `webp` angeben, der JPG-Pfad wird daraus abgeleitet. Fehlt das Feld,
     zeigt die Karte kein Bild. */
  image?: { webp: string; jpg: string }
}

// Feature-Flags. Dark Mode ist vorerst deaktiviert – auf `true` setzen,
// um den Umschalter wieder einzublenden (siehe ThemeToggle + nuxt.config-Script).
export const features = {
  darkMode: false,
} as const

export const profile = {
  name: 'Konrad Thiemann',

  // TODO: Kontakt-E-Mail eintragen. Bleibt das Feld leer, wird der
  // E-Mail-Button ausgeblendet und nur LinkedIn/GitHub angezeigt.
  email: '',

  // Profilbild im Hero (in /public). Transparente Strichzeichnung: WebP mit PNG-Fallback.
  image: {
    webp: '/profile.webp',
    png: '/profile.png',
  },

  links: {
    linkedin: 'https://www.linkedin.com/in/konrad-thiemann/',
    github: 'https://github.com/konradthiemann',
    podcast: 'https://www.youtube.com/watch?v=Zf0ADx3NcbQ',
  },

  // Reihenfolge bestimmt die Anzeige. Outline-Icons dazu in TechIcon.vue.
  // Java & Python sind in TechIcon bereits vorbereitet – fürs Backend einfach
  // 'Java' bzw. 'Python' hier ergänzen, dann erscheinen sie inkl. Icon.
  tech: [
    'Nuxt',
    'Vue',
    'Vite',
    'TypeScript',
    'JavaScript',
    'SCSS',
    'HTML',
    'SQL',
    'PostgreSQL',
    'Strapi',
    'GitLab',
    'GitHub',
    'GitHub Copilot',
    'Claude Code',
    'Railway',
    'CI/CD',
    'VS Code',
    'Jira',
    'Miro',
  ],

  projects: <Project[]>[
    {
      slug: 'doewe',
      url: 'https://github.com/konradthiemann/Doewe',
      liveUrl: 'https://doewe.konradthiemann.de',
      stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
      image: { webp: '/projects/doewe.webp', jpg: '/projects/doewe.jpg' },
    },
    {
      slug: 'pokemeta',
      url: 'https://github.com/konradthiemann/Pokekon',
      liveUrl: 'https://pokekon.konradthiemann.de',
      stack: ['Vue', 'TypeScript'],
      image: { webp: '/projects/pokemeta.webp', jpg: '/projects/pokemeta.jpg' },
    },
    {
      slug: 'waldbingo',
      url: 'https://github.com/konradthiemann/Waldbingo',
      liveUrl: 'https://waldbingo.konradthiemann.de',
      stack: ['Nuxt', 'KI'],
      image: { webp: '/projects/waldbingo.webp', jpg: '/projects/waldbingo.jpg' },
    },
  ],
}
