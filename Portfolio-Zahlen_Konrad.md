# Portfolio-Zahlen – Konrad Thiemann

> Datenbasis: Git-Historie aller Repos im `/projects`-Workspace, Stand 19.06.2026.
> Ausgewertet wurden alle Commit-Identitäten von Konrad (`Konrad Thiemann`, `Thiemann, Konrad`, `Thiemann` / `konrad.thiemann@mdm.de`).
> Zweck: Kennzahlen für die Bewerbung bei IServ.

## Auf einen Blick

| Kennzahl | Wert |
|---|---|
| Aktive Repositories (mitgewirkt) | **8** |
| Commits gesamt (gemergte Hauptlinie / HEAD) | **999** |
| davon echte Arbeits-Commits (ohne Merges) | **757** |
| Zeitraum der Beiträge | **Nov 2023 – Jun 2026** (~2,5 Jahre) |
| Aktive Monate (mit mind. 1 Commit) | **29** |
| Code-Zeilen hinzugefügt / entfernt | **+76.819 / −72.032** |
| Eindeutige Dateien bearbeitet | **1.363** |
| Hauptsprachen | **Vue 3 + TypeScript** |
| Team-Größe (firmeninterne Entwickler) | **~23** |

## Commit-Statistik pro Projekt

| Projekt | Commits (HEAD) | Rang im Team | Zeilen + | Zeilen − | Dateien | Erster | Letzter |
|---|---|---|---|---|---|---|---|
| **v3shop** (Haupt-Shop, Multi-Company) | 369 | **#3** von 40 | 15.672 | 22.043 | 267 | 2023-11 | 2026-06 |
| **drop-in-library** (@drop-in Module) | 188 | **#3** von 30 | 16.618 | 7.715 | 105 | 2024-01 | 2026-06 |
| **ui-library** (@ui-library Components) | 170 | #7 von 42 | 20.905 | 28.126 | 510 | 2023-11 | 2026-06 |
| **dop** (Product Detail Page) | 144 | **#3** von 31 | 4.517 | 2.211 | 78 | 2023-11 | 2026-06 |
| **library** (@jaf Package-Monorepo) | 96 | #7 von 30 | 9.592 | 11.177 | 346 | 2024-02 | 2026-06 |
| **cms** (Types-Generator) | 15 | #4 von 16 | 604 | 390 | 23 | 2024-04 | 2026-06 |
| **vuesf-api** (Backend, Express) | 13 | #24 von 102 | 1.026 | 232 | 15 | 2026-02 | 2026-06 |
| **Waldbingo** (Eigenprojekt) | 4 | **#1** von 1 | 7.885 | 138 | 19 | 2026-06 | 2026-06 |
| **GESAMT** | **999** | – | **76.819** | **72.032** | **1.363** | 2023-11 | 2026-06 |

> Hinweis v3shop: Auf der gemergten Hauptlinie (HEAD) Rang 3 mit 369 Commits. Über **alle Branches** hinweg (inkl. Feature-Branches) ist Konrad mit **617 Commits der aktivste Contributor (#1)** im Haupt-Shop.

## Technische Breite

| Kennzahl | Wert |
|---|---|
| Vue-Komponenten/-Dateien (`.vue`) bearbeitet | 657 |
| TypeScript-Dateien (`.ts`) bearbeitet | 650 |
| Markdown/Doku-Dateien (`.md`) bearbeitet | 518 |
| Config-/JSON-Dateien (`.json`/`.json5`/`.yml`) | ~895 |
| Packages im `@jaf`-Monorepo (`library/`) berührt | 38 |
| Packages im `@drop-in`-Monorepo berührt | 4 |
| Tech-Stack | Nuxt 3 (SSR/SSG), Vue 3 Composition API, TypeScript, Express |
| Architektur-Erfahrung | Monorepos (Lerna), interne Package-Ökosysteme, Multi-Company-Shop |

## Schwerpunkt: Vuetify-Migration & eigene Komponenten-Bibliothek

> **Wichtige Einordnung:** Die Git-Daten zeigen keinen *Ausbau* von Vuetify, sondern die **Ablösung von Vuetify** durch eine selbst entwickelte Komponenten-Bibliothek (`@ui-library`, „AZ"-Komponenten). Konrads betreffende Commits lauten u. a. „replace vuetify icon", „replace vuetify components", „replace dialog vuetify component", „replace vuetify AZPaymentMethodSelection". Für ein Portfolio ist das die stärkere Erzählung: Aufbau eines eigenen Design-Systems statt reiner Nutzung eines Fremd-Frameworks.

| Kennzahl | Wert |
|---|---|
| Eigene AZ-Komponenten in `@ui-library` (gesamt) | **107** |
| davon von Konrad mitgestaltet/erweitert | **102** |
| Verbleibende Dateien mit Vuetify-Referenz (ui-library) | nur noch 34 (überwiegend Theme-/Breakpoint-Reste) |
| Konrads Commits rund um Vuetify-Ersatz (alle Repos) | ~20 |
| Eindeutige UILIB-Tickets (Komponenten-Arbeit) | 9 |
| Migrations-Tickets (Beispiele) | UILIB-339 (Icon), UILIB-314 (Input/Select), UILIB-353 (Dialog), UILIB-360 (Payment-Method) |
| Zeitraum der Migration | Nov 2023 – Aug 2024 (laufend) |

**Portfolio-Aussagen (belegbar):**

- *"Maßgeblich am Aufbau einer firmeneigenen Vue-3-Komponenten-Bibliothek (`@ui-library`) beteiligt, die Vuetify als UI-Framework ablöst – Mitarbeit an 102 von 107 Custom-Komponenten."*
- *"Schrittweise Migration produktiver Anwendungen (Shop, PDP) von Vuetify-Komponenten auf das eigene Design-System, ticketbasiert (UILIB-314/339/353/360)."*

## Schwerpunkt: SEO

> Erhoben aus SEO-bezogenen Commits (Keywords: seo, sitemap, robots, meta/Open Graph, breadcrumb, max-image-preview, Google Discover) und den dabei berührten Dateien.

| Kennzahl | Wert |
|---|---|
| Eindeutige SEO-Commits (ohne Merges, dedupliziert) | **22** |
| Eindeutige SEO-Tickets | **9** |
| SEO-relevante Dateien bearbeitet | **25** |
| Commits am `@jaf/sitemap`-Package | **8** (Top-Contributor, gleichauf #1) |
| Dedizierte SEO-Test-Dateien | **3** |
| Zeitraum der SEO-Arbeit | **März 2024 – Juni 2026** (laufend, sehr aktuell) |

**Konkrete SEO-Maßnahmen (aus Commits belegt):**

- **Sitemap-Generierung:** Mitentwicklung des `@jaf/sitemap`-Packages – Generatoren für Kategorie- und Content-Seiten (`categorySitemapGenerator.ts`, `contentSitemapGenerator.ts`) inkl. Unit-Tests; Sitemap-Anbindung an `robots.txt` (VUE3SHOP-1462, STRAPI-33/47).
- **robots-Konfiguration:** `nuxt.robots.config.ts` & `robots.txt` für SEO-Compliance, inkl. `max-image-preview:large` für Google Discover (VUE3SHOP-2082).
- **Open Graph & Twitter Cards:** Meta-Tags und OG-Images für Kategorie- und Content-Seiten (VUE3SHOP-1917, VUE3SHOP-2077).
- **Breadcrumbs:** `AZBreadcrumbs` (ui-library) und `V3Breadcrumbs` (Shop) für Navigation & strukturierte Seitenhierarchie (VUE3SHOP-1812).
- **Performance/SEO:** Anpassung des Lazy-Loadings von Bildern, SEO-konformes Middleware-Handling.

**Portfolio-Aussagen (belegbar):**

- *"Verantwortlich für zentrale technische SEO-Bausteine eines produktiven Shops: Sitemap-Generierung (eigenes `@jaf/sitemap`-Package, Top-Contributor), robots-Konfiguration, Open-Graph/Twitter-Meta-Tags und Breadcrumbs."*
- *"SEO-Arbeit über 9 Tickets von 2024 bis 2026 – u. a. Optimierung für Google Discover (max-image-preview), getestet mit Unit-Tests."*

## Schwerpunkt: Performance

> Erhoben aus performance-bezogenen Commits (Keywords: performance, lazy loading, hydration, chunking, cache, preload/prefetch, LQIP, optimize) und den dabei berührten Dateien.

| Kennzahl | Wert |
|---|---|
| Eindeutige Performance-Commits (ohne Merges, dedupliziert) | **32** |
| Lazy-Hydration-/Chunking-Commits (v3shop, Cluster 03/2026) | **10** |
| Commits am `@jaf/amplience`-Package (LQIP-Bilder) | **5** (#3-Contributor) |
| Performance-Test-Dateien | **1** (`buildLqipUrl.spec.ts`) |
| Zeitraum der Performance-Arbeit | **Juni 2024 – Mai 2026** (laufend, sehr aktuell) |

**Konkrete Performance-Maßnahmen (aus Commits belegt):**

- **LQIP (Low-Quality Image Placeholders):** Implementierung der LQIP-URL-Generierung im `@jaf/amplience`-Package (`buildLqipUrl.ts` inkl. Unit-Test) und `lqipSrc`-Mapping in `AZImage` – verbessert wahrgenommene Ladezeit & Core Web Vitals (LCP/CLS), 03/2026.
- **Lazy Hydration:** `hydrate-on-idle`, `LazyHydrationWrapper` und `ClientOnly` für Footer & Newsletter-Komponenten – reduziert initiales JavaScript beim Server-Rendering (10 Commits, 03/2026).
- **Chunking / Code-Splitting:** Optimierte Vite-`extendConfig`-Hook-Strategie für besseres Bundle-Chunking inkl. Client-Check.
- **Lazy Loading:** Bild-Lazy-Loading im `AZSwiper` (PDP, VUE3SHOP-1968) und eigene `lazy-src`-Direktive in der ui-library.
- **Caching:** Integration/Austausch des Cache-Packages im PDP (DOP-425) und `nuxt.cache.config.ts`-Konfiguration.
- **Weiteres:** Favicon-Optimierung (VUE3SHOP-1851), Preload des AB-Test-Service im Default-Layout.

**Portfolio-Aussagen (belegbar):**

- *"Frontend-Performance-Optimierung eines produktiven Nuxt-3-Shops: LQIP-Bildplatzhalter (Core Web Vitals), Lazy-Hydration ganzer Layout-Bereiche und Bundle-Chunking-Strategie."*
- *"32 performance-bezogene Commits (2024–2026); zuletzt Schwerpunkt auf Hydration- und Image-Loading-Optimierung mit messbarem Bezug zu LCP/CLS."*

## Code-Qualität & Arbeitsweise

| Kategorie (aus Commit-Messages) | Anzahl |
|---|---|
| Features (`feat`) | 129 |
| Bugfixes (`fix`) | 162 |
| Refactorings (`refactor`) | 29 |
| Dokumentation (`docs`) | 10 |
| Wartung/Build (`chore`) | 184 |
| Test-Dateien (`.spec`/`.test`) bearbeitet | 67 |
| Commits mit Ticket-Referenz (z. B. `ABC-123`) | 264 |

> Lesart: Eine ausgewogene Mischung aus Feature-Entwicklung (129) und Stabilisierung/Bugfixing (162) über 2,5 Jahre, dokumentiert über ein Ticket-System (264 referenzierte Commits) – Hinweis auf strukturierte, nachvollziehbare Arbeitsweise.

## Zusammenarbeit

| Kennzahl | Wert |
|---|---|
| Firmeninterne Entwickler im Team (mdm.de) | ~23 |
| Gesamt-Mitwirkende inkl. extern/Open-Source | bis zu 110 |
| Repos mit aktiver Mitarbeit | 8 |
| Commits mit Co-Author-Trailer (Pair/Co-Work) | 30 |
| Rolle | Kern-Contributor (Top 3) in 4 von 8 Repos |

## Portfolio-Relevanz – Einschätzung

**Stärkste Aussagen für die Bewerbung (klar belegbar):**

- *"Maßgeblich am Aufbau einer firmeneigenen Vue-3-Komponenten-Bibliothek beteiligt, die Vuetify ablöst (102 von 107 Komponenten)."* ← stärkstes Highlight
- *"Über 2,5 Jahre Kern-Entwickler eines produktiven E-Commerce-Shops (Nuxt 3 / Vue 3 / TypeScript) mit ~999 Commits auf der Hauptlinie."*
- *"Top-3-Contributor in 4 von 8 Repositories; aktivster Contributor im Haupt-Shop über alle Branches (617 Commits)."*
- *"Verantwortung für technisches SEO: eigenes Sitemap-Package, robots-Konfiguration, Open-Graph-Meta-Tags, Breadcrumbs (9 SEO-Tickets, 2024–2026)."*
- *"Frontend-Performance: LQIP-Bildplatzhalter, Lazy-Hydration und Bundle-Chunking (32 Performance-Commits, Fokus Core Web Vitals)."*
- *"Beiträge in 657 Vue-Komponenten und 650 TypeScript-Dateien; Erfahrung mit Monorepo-Architektur und internen Package-Ökosystemen."*
- *"Ausgewogenes Verhältnis aus Feature-Entwicklung und Qualitätssicherung (129 Features, 162 Bugfixes, 67 bearbeitete Test-Dateien)."*

**Mit Vorsicht zu verwenden / einzuordnen:**

- *Zeilen-Zahlen (+76k / −72k):* beinhalten generierte Dateien (Lockfiles, JSON, Source-Maps) und sind als grobe Größenordnung, nicht als reine „Handarbeit" zu lesen.
- *Mitwirkende (110):* stark durch das Open-Source-Projekt `vuesf-api` (Vue-Storefront-Basis) getrieben; die realistische Team-Größe sind die **~23 internen Entwickler**.
- *Ranking:* HEAD-Rang (gemergte Hauptlinie) ist die belastbarste Größe; die „#1 über alle Branches"-Zahl bitte immer mit Kontext nennen.
- *Vuetify-Formulierung:* Es war eine **Migration weg von Vuetify**, kein Ausbau – die Formulierung im Portfolio entsprechend wählen.

**Empfehlung für die nächste Runde:** Aus diesen Roh-Kennzahlen 3–4 prägnante Highlights für das Portfolio auswählen (allen voran die Komponenten-Bibliothek/Vuetify-Ablösung) und mit 1–2 konkreten Feature-Beispielen aus den Commits untermauern.

---
*Methodik: `git log HEAD` je Repo, Autor-Filter case-insensitive auf „thiemann", Zeilen/Dateien via `--numstat`, Kategorien aus Commit-Message-Präfixen, AZ-Komponenten via Verzeichnis-Scan in `ui-library/lib`. Zahlen reproduzierbar.*
