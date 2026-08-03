# Sicherheitsrichtlinie

## Sicherheitslücken melden

Bitte melde Sicherheitslücken **nicht über öffentliche Issues**, sondern über
**GitHub Private Vulnerability Reporting**:

1. Öffne den Tab **Security** dieses Repositories.
2. Wähle **Report a vulnerability**.
3. Beschreibe das Problem samt Reproduktionsschritten.

Private Vulnerability Reporting ist für dieses Repo aktiviert; die Meldung ist
nur für Maintainer sichtbar. Ich versuche, innerhalb weniger Tage zu reagieren.

## Umgang mit Secrets

- Es gehören **keine** echten Zugangsdaten ins Repository. Die Zugangsdaten für
  das Kontaktformular (Resend) werden ausschließlich über Umgebungsvariablen
  gesetzt (`NUXT_RESEND_API_KEY`, `NUXT_RESEND_FROM`, `NUXT_CONTACT_TO`) – lokal
  via `.env` (durch `.gitignore` ausgeschlossen), in Produktion via Railway-Variablen.
- Vorlage für die benötigten Variablen: [`.env.example`](../.env.example).
- Gelangt doch einmal ein Secret in die Git-History, gilt: **zuerst das
  betroffene Credential rotieren** (das ist der eigentliche Fix), danach optional
  die History bereinigen.
