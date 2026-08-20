# portfolio2 — Claude Code Projektanweisungen

## Zweck
Persönliches Portfolio von Konrad Thiemann — minimalistisch (warm/editorial), zweisprachig (DE/EN). Domain laut Config: `konradthiemann.dev`.

## Tech-Stack
- **Framework:** Nuxt 4 · Vue 3 · TypeScript
- **Styling:** SCSS + CSS Custom Properties (`app/assets/scss/main.scss`); Dark-Mode ist vorbereitet, aber per Feature-Flag `features.darkMode` in `app/utils/profile.ts` deaktiviert
- **i18n:** `@nuxtjs/i18n` — Strategie `prefix` (`/de`, `/en`), Standard `de`, Locales in `i18n/locales/{de,en}.json`
- **Kontaktformular:** Server-Route unter `server/api/`, Versand via **Resend** (HTTPS-API), konfiguriert über `runtimeConfig` in `nuxt.config.ts`
- **Node:** ≥ 20 (getestet mit 22, in `.nvmrc` gepinnt)

## Befehle
```bash
npm install        # inkl. postinstall: nuxt prepare
npm run dev        # Dev-Server → http://localhost:3000
npm run build      # Produktions-Build (Nitro-Server-Output)
npm run generate   # Statischer Build
npm run preview    # Build lokal ansehen
```
**Quality-Gate:** `npm run build` muss durchlaufen. (Kein Lint/Typecheck/Test-Setup — siehe „Verbesserungsideen".)

## Verzeichnisstruktur
```
app/
  app.vue          # Root-Komponente
  pages/           # Routen (Nuxt file-based routing)
  components/      # Vue-Komponenten
  composables/     # geteilte Logik
  plugins/         # Nuxt-Plugins
  utils/           # profile.ts (Profil, Links, Tech, Projekte, Feature-Flags)
  assets/scss/     # main.scss (Theme, :root-Variablen)
i18n/locales/      # de.json, en.json (alle UI-Texte)
server/api/        # Server-Routen (Kontaktformular via Resend)
public/            # statische Assets (favicon, Bilder, projects/)
nuxt.config.ts     # Nuxt-Konfiguration (i18n, runtimeConfig, head)
```

## Inhalte pflegen
- **Texte (DE/EN):** `i18n/locales/de.json` · `i18n/locales/en.json` — Strings immer in **beiden** Sprachen pflegen
- **Profil, Links, Tech-Liste, Projekte:** `app/utils/profile.ts`
- **Theme/Farben:** `:root`-Variablen in `app/assets/scss/main.scss`

## Umgebungsvariablen (Kontaktformular)
Vorlage in `.env.example` (lokal nach `.env` kopieren):
- `NUXT_RESEND_API_KEY` — Resend-API-Key (Secret)
- `NUXT_RESEND_FROM` — Absender
- `NUXT_CONTACT_TO` — Empfänger
Secrets nie committen; in Produktion als Umgebungsvariablen setzen.

## Konventionen
- Code/Bezeichner Englisch; Prosa-Kommentare Deutsch erlaubt
- Vue SFC mit `<script setup>` + TypeScript, Props typisiert
- Keine hardcoded Farben — CSS Custom Properties nutzen
- Neue UI-Texte immer DE + EN gleichzeitig hinzufügen

## Verbesserungsideen (offen)
- Kein Lint/Typecheck/Test-Setup — für mehr Sicherheit ESLint + `nuxi typecheck` ergänzen
- Dependencies stehen auf `latest` (per `package-lock.json` reproduzierbar, aber `npm install` kann Major-Versionen ziehen) — Pinnen erwägen
