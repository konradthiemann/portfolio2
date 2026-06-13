# Portfolio — Konrad Thiemann

Minimalistisches Portfolio (warm/editorial), gebaut mit **Nuxt 4**, **Vue**, **TypeScript** und **SCSS**. Zweisprachig (Deutsch / Englisch) über `@nuxtjs/i18n` mit URL-Präfix (`/de`, `/en`).

## Stack

- [Nuxt 4](https://nuxt.com) · Vue 3 · TypeScript
- [@nuxtjs/i18n](https://i18n.nuxtjs.org) — Strategie `prefix`, Standard `de`
- SCSS + CSS-Custom-Properties (inkl. automatischem Dark-Mode via `prefers-color-scheme`)

## Setup

```bash
npm install
npm run dev      # Entwicklung → http://localhost:3000
npm run build    # Produktions-Build
npm run preview  # Build lokal ansehen
```

## Inhalte pflegen

- **Texte (DE/EN):** [`i18n/locales/de.json`](i18n/locales/de.json) · [`i18n/locales/en.json`](i18n/locales/en.json)
- **Profil, Links, Tech-Liste, Projekte (URLs):** [`app/utils/profile.ts`](app/utils/profile.ts)
- **Theme / Farben:** `:root`-Variablen in [`app/assets/scss/main.scss`](app/assets/scss/main.scss)

### Noch anzupassen

- **Kontakt-E-Mail:** `profile.email` in [`app/utils/profile.ts`](app/utils/profile.ts) ist leer — solange es leer ist, wird der E-Mail-Button ausgeblendet (nur LinkedIn/GitHub).
- **Projektbeschreibungen** *Pokekon* (privates Repo) und *Waldbingo* (noch leer) sind vorläufig und in den Locale-Dateien als „anpassen" markiert.
- **`baseUrl`** in [`nuxt.config.ts`](nuxt.config.ts) auf die echte Domain setzen (für korrekte SEO-/hreflang-Tags).

## Struktur

```
app/
  app.vue              # Root + i18n-/SEO-Head
  pages/index.vue      # Single-Page-Portfolio (alle Sektionen)
  components/          # SiteHeader, LangSwitch, ProjectCard
  assets/scss/         # Theme
  utils/profile.ts     # Statische Profildaten
i18n/locales/          # de.json, en.json
```
