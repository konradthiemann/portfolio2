// Statische, sprachunabhängige Profildaten (URLs, Tech-Namen).
// Übersetzbare Texte liegen in i18n/locales/*.json.

export interface Project {
  /** i18n-Key unter `projects.items.<slug>` */
  slug: string
  url: string
  stack: string[]
}

export const profile = {
  name: 'Konrad Thiemann',

  // TODO: Kontakt-E-Mail eintragen. Bleibt das Feld leer, wird der
  // E-Mail-Button ausgeblendet und nur LinkedIn/GitHub angezeigt.
  email: '',

  links: {
    linkedin: 'https://www.linkedin.com/in/konrad-thiemann/',
    github: 'https://github.com/konradthiemann',
  },

  // Reihenfolge bestimmt die Anzeige.
  tech: [
    'Nuxt',
    'Vue',
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
  ],

  projects: <Project[]>[
    {
      slug: 'pokekon',
      url: 'https://github.com/konradthiemann/Pokekon',
      stack: ['Vue', 'TypeScript'],
    },
    {
      slug: 'doewe',
      url: 'https://github.com/konradthiemann/Doewe',
      stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    },
    {
      slug: 'noorc',
      url: 'https://github.com/konradthiemann/No-orc',
      stack: ['JavaScript', 'HTML5 Canvas'],
    },
    {
      slug: 'waldbingo',
      url: 'https://github.com/konradthiemann/Waldbingo',
      stack: ['Web'],
    },
  ],
}
