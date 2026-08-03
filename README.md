# Portfolio — Konrad Thiemann

Minimalistisches Portfolio (warm/editorial), gebaut mit **Nuxt 4**, **Vue**, **TypeScript** und **SCSS**. Zweisprachig (Deutsch / Englisch) über `@nuxtjs/i18n` mit URL-Präfix (`/de`, `/en`).

## Stack

- [Nuxt 4](https://nuxt.com) · Vue 3 · TypeScript
- [@nuxtjs/i18n](https://i18n.nuxtjs.org) — Strategie `prefix`, Standard `de`
- SCSS + CSS-Custom-Properties (Dark-Mode ist vorbereitet, aktuell aber per Feature-Flag `features.darkMode` in [`app/utils/profile.ts`](app/utils/profile.ts) deaktiviert)

## Setup

> **Voraussetzung:** Node ≥ 20 (getestet mit Node 22) — Nuxt 4 läuft nicht mehr unter Node 16/18.

```bash
npm install
npm run dev      # Entwicklung → http://localhost:3000
npm run build    # Produktions-Build
npm run preview  # Build lokal ansehen
```

Für das Kontaktformular werden Umgebungsvariablen benötigt — Vorlage in [`.env.example`](.env.example) (lokal nach `.env` kopieren, Details unter [Kontaktformular](#kontaktformular)).

## Inhalte pflegen

- **Texte (DE/EN):** [`i18n/locales/de.json`](i18n/locales/de.json) · [`i18n/locales/en.json`](i18n/locales/en.json)
- **Profil, Links, Tech-Liste, Projekte (URLs):** [`app/utils/profile.ts`](app/utils/profile.ts)
- **Theme / Farben:** `:root`-Variablen in [`app/assets/scss/main.scss`](app/assets/scss/main.scss)

### Noch anzupassen

- **Kontakt-E-Mail:** `profile.email` in [`app/utils/profile.ts`](app/utils/profile.ts) ist leer — solange es leer ist, wird der E-Mail-Button ausgeblendet (nur LinkedIn/GitHub).
- **Projektbeschreibungen** *Pokekon* (privates Repo) und *Waldbingo* (noch leer) sind vorläufig und in den Locale-Dateien als „anpassen" markiert.
- **`baseUrl`** in [`nuxt.config.ts`](nuxt.config.ts) auf die echte Domain setzen (für korrekte SEO-/hreflang-Tags).

## Kontaktformular

Der Versand läuft über [Resend](https://resend.com) (HTTPS-API). SMTP ist bewusst **nicht** im Einsatz, da [Railway ausgehendes SMTP](https://docs.railway.com/networking/outbound-networking) auf Nicht-Pro-Plänen blockiert. Server-Handler: [`server/api/contact.post.ts`](server/api/contact.post.ts).

Benötigte Variablen (lokal in `.env`, in Produktion als Railway-Variablen):

| Variable | Zweck |
| --- | --- |
| `NUXT_RESEND_API_KEY` | API-Key aus [resend.com/api-keys](https://resend.com/api-keys) |
| `NUXT_RESEND_FROM` | Absender, z.B. `Portfolio Kontakt <kontakt@konradthiemann.de>` |
| `NUXT_CONTACT_TO` | Empfänger der Anfragen |

Der Absender muss eine in Resend **verifizierte Domain** verwenden.

## Struktur

```
app/
  app.vue              # Root + i18n-/SEO-Head
  pages/index.vue      # Single-Page-Portfolio (alle Sektionen)
  components/          # SiteHeader, LangSwitch, ProjectCard
  assets/scss/         # Theme
  utils/profile.ts     # Statische Profildaten
server/
  api/contact.post.ts  # Kontaktformular-Versand (Resend)
i18n/locales/          # de.json, en.json
```

## Lizenz

[MIT](LICENSE) © 2026 Konrad Thiemann

