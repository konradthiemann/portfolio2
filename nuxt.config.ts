// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  modules: ['@nuxtjs/i18n'],

  css: ['~/assets/scss/main.scss'],

  // Serverseitige Secrets – via Umgebungsvariablen überschreiben:
  // NUXT_SMTP_USER, NUXT_SMTP_PASS, NUXT_CONTACT_TO
  runtimeConfig: {
    smtpHost: 'smtp.gmail.com',
    smtpPort: '465',
    smtpUser: '',
    smtpPass: '',
    contactTo: 'konrad.thiemann@gmail.com',
  },

  i18n: {
    strategy: 'prefix',
    defaultLocale: 'de',
    locales: [
      { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    baseUrl: 'https://konradthiemann.dev',
  },

  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#faf7f1' },
      ],
      link: [{ rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    },
  },
})
