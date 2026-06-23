<script setup lang="ts">
import type { Project } from '~/utils/profile'

defineProps<{
  project: Project
  name: string
  tagline: string
  detail: string
  cta: string
  expandLabel: string
  open: boolean
}>()

defineEmits<{ toggle: [] }>()
</script>

<template>
  <article class="card" :class="{ 'is-open': open }">
    <button
      type="button"
      class="card__head"
      :aria-expanded="open"
      :aria-label="expandLabel"
      @click="$emit('toggle')"
    >
      <span class="card__heading">
        <h3 class="card__title">{{ name }}</h3>
        <span class="card__taglineWrap">
          <p class="card__tagline">{{ tagline }}</p>
        </span>
      </span>
      <span class="card__toggle" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
          <path
            d="M6 9.5 12 15l6-5.5"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </button>

    <div class="card__reveal">
      <div class="card__body">
        <div class="card__inner">
          <div v-if="project.image" class="card__cover" aria-hidden="true">
            <picture>
              <source :srcset="project.image.webp" type="image/webp" />
              <img
                :src="project.image.jpg"
                alt=""
                width="900"
                height="1947"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>

          <div class="card__text">
            <p class="card__detail">{{ detail }}</p>

            <ul class="card__stack">
              <li v-for="tech in project.stack" :key="tech">{{ tech }}</li>
            </ul>

            <a
              class="card__link"
              :href="project.url"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ cta }}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.card {
  /* Leicht durchscheinend, damit das zentrierte Hintergrund-Motiv dezent
     hinter der Kachel sichtbar bleibt. */
  background: color-mix(in srgb, var(--surface) 70%, transparent);
  border: 1px solid var(--line);
  border-radius: 14px;
  overflow: hidden;
  transition: border-color 0.15s ease;

  /* Aufklappen ausschließlich per Klick. Unter 1024px (gestapeltes Verhalten)
     spannt die offene Kachel über die volle Zeilenbreite. */
  &.is-open {
    border-color: var(--accent);
    grid-column: 1 / -1;
  }
}

/* Breite Viewports (ab ~1350px): horizontales Akkordeon (Flex-Reihe, siehe
   #projects .grid--projects in index.vue). Alle Kacheln teilen sich die Breite
   (flex:1); die aktive weitet sich aus (flex-grow), die anderen schrumpfen, wenn
   irgendeine offen ist. Die flex-grow-Transition animiert die Breite weich. */
@media (min-width: 1350px) {
  /* Zweistufige Animation, damit WÄHREND der Animation kein Layoutshift im
     Karteninneren passiert: erst horizontal (Breite), dann vertikal (Inhalt).
     Beim Öffnen weitet sich die Breite sofort (0s), die Höhe erst danach (0.4s
     Delay). Beim Schließen umgekehrt: Höhe sofort, Breite verzögert. Die
     Transition-Definition des ZIEL-Zustands gilt – darum stehen die Delays auf
     den jeweils passenden Regeln. */
  .card {
    flex: 1 1 0;
    min-width: 0;
    /* Schließen-Zustand: Breite schrumpft verzögert (nachdem die Höhe weg ist).
       Delay 0.3s < Höhen-Dauer 0.4s → kleine Überlappung = weicherer Übergang
       statt hartem Stopp-und-Start zwischen den beiden Stufen. */
    transition: flex-grow 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.3s,
      border-color 0.15s ease;
  }

  .grid--projects.has-open .card {
    /* etwas breitere Spines (1 statt 0.7), damit lange Titel wie
       „Pokémon-Meta-Tracker" auf 2 statt 3 Zeilen umbrechen = weniger gequetscht */
    flex-grow: 1;
    /* Öffnen-Zustand: Breite ändert sich sofort (Stufe 1) */
    transition: flex-grow 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0s,
      border-color 0.15s ease;
  }

  /* höhere Spezifität als die .has-open-Regel oben, damit die aktive Kachel
     wirklich wächst statt mitzuschrumpfen */
  .grid--projects.has-open .card.is-open {
    flex-grow: 3;
  }

  /* Öffnen: Höhe (Inhalt) startet kurz vor Ende der Breiten-Animation (Delay
     0.3s, leichte Überlappung) – noch immer effektiv „erst breit, dann hoch",
     aber ohne harten Stopp dazwischen. Gleiche Kurve wie die Breite für einen
     durchgehenden Bewegungseindruck. Beim Schließen gilt die Basis-Regel von
     .card__reveal (Delay 0) → Höhe kollabiert zuerst. */
  .card.is-open .card__reveal {
    transition: grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
  }

  /* Inaktive Nachbar-Kacheln schrumpfen zu kompakten Spines (nur Titel) mit so
     wenig Whitespace wie möglich. Damit der Titel im schmalen Spine SAUBER
     umbricht (statt am Karten-Rand abgeschnitten zu werden), wird der Kopf NICHT
     auf eine feste Breite eingefroren – er folgt der schrumpfenden Karte, der
     Titel bricht natürlich um. Engerer vertikaler Innenabstand im Spine = weniger
     Leerraum.

     WICHTIG (Überschwingen beim Schließen): Tagline + Button werden beim
     Schrumpfen AUS DEM LAYOUT genommen (display:none → kompakt, kein Leerraum).
     Beim Schließen dürfen sie aber erst WIEDER ERSCHEINEN, wenn die Kachel ihre
     volle Breite zurück hat – sonst stehlen sie dem schmalen Titel Platz und
     treiben ihn auf viele Zeilen → Höhe schießt kurz hoch. CSS kann das nicht:
     der display:none→block-Wechsel ignoriert transition-delay (erscheint sofort).
     Darum hält index.vue beim vollständigen Schließen für ~0.7s die Klasse
     `is-collapsing` auf dem Grid → Nachbarn bleiben so lange kompakt/ohne Inhalt,
     bis ihre Breite (flex-grow: 0.3s Delay + 0.4s Dauer) wieder voll ist; danach
     wachsen sie sauber auf Default-Größe. */
  .card__head {
    transition: padding 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .grid--projects.has-open .card:not(.is-open) .card__head,
  .grid--projects.is-collapsing .card:not(.is-open) .card__head {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  /* Tagline: weicher 0fr/1fr-Kollaps (statt display:none). So wächst sie beim
     Schließen flüssig auf Default-Höhe zurück, statt hart aufzupoppen (der frühere
     display:block-Wechsel ignorierte die Animationsdauer → sichtbarer Höhensprung). */
  .grid--projects .card:not(.is-open) .card__taglineWrap {
    transition: grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .grid--projects .card:not(.is-open) .card__tagline {
    transition: opacity 0.4s ease;
  }

  /* Button verschwindet weiterhin per display:none (er ist flex-shrink:0 und würde
     dem schmalen Titel sonst horizontal Platz stehlen). @starting-style faded ihn
     beim Wiedererscheinen weich ein, statt bei opacity:1 aufzupoppen. */
  .grid--projects .card:not(.is-open) .card__toggle {
    transition: opacity 0.4s ease, display 0.4s allow-discrete,
      transform 0.25s ease, border-color 0.15s ease;

    @starting-style {
      opacity: 0;
    }
  }

  /* Beim Öffnen (has-open) sofort einklappen; beim Schließen hält is-collapsing
     sie verborgen, bis die Breite zurück ist – dann unfolden sie auf Default. */
  .grid--projects.has-open .card:not(.is-open) .card__taglineWrap,
  .grid--projects.is-collapsing .card:not(.is-open) .card__taglineWrap {
    grid-template-rows: 0fr;
  }

  .grid--projects.has-open .card:not(.is-open) .card__tagline,
  .grid--projects.is-collapsing .card:not(.is-open) .card__tagline {
    opacity: 0;
  }

  .grid--projects.has-open .card:not(.is-open) .card__toggle,
  .grid--projects.is-collapsing .card:not(.is-open) .card__toggle {
    /* SOFORT aus dem Flex-Flow (position:absolute greift verzögerungsfrei, anders
       als display, das wegen allow-discrete erst am Ende der 0.4s auf none springt
       und bis dahin seine 32px+gap reserviert). So bekommt der Titel augenblicklich
       die volle (schmale) Kachelbreite → kein momentanes Quetschen + kurzes
       Höher-Werden der Kachel. Opacity faded weiterhin weich aus. */
    position: absolute;
    top: 1rem;
    right: 1.5rem;
    opacity: 0;
    display: none;
  }
}

/* Projekt-Vorschau: Screenshot der deployten App, erst im aufgeklappten
   Zustand sichtbar. Die Hochkant-Screenshots werden landschaftlich
   beschnitten (object-fit), die Position zeigt den App-Kopf und blendet
   Status-/Browserleiste aus. */
.card__cover {
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--bg-soft);
  border: 1px solid var(--line);
  border-radius: 10px;
  margin-bottom: 1rem;

  picture,
  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  img {
    object-fit: cover;
    object-position: center 7%;
    transition: transform 0.4s ease;
  }
}

.card.is-open .card__cover img {
  transform: scale(1.03);
}

.card__head {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1.4rem 1.5rem;
  background: transparent;
  border: 0;
  text-align: left;
  cursor: pointer;
  color: inherit;
  font: inherit;
}

.card__heading {
  flex: 1;
  min-width: 0;
}

.card__title {
  font-size: 1.2rem;
  margin-bottom: 0.2rem;
  /* Saubere Umbrüche im schmalen Spine: lange Wörter brechen um, statt am
     Karten-Rand abgeschnitten zu werden. */
  overflow-wrap: break-word;
}

/* Wrapper für den grid-template-rows 0fr→1fr-Kollaps der Tagline (siehe ≥1350px-
   Block): beim Schließen wächst die Tagline weich auf Default-Höhe zurück, statt
   per display:block hart aufzupoppen. */
.card__taglineWrap {
  display: grid;
  grid-template-rows: 1fr;
}

.card__tagline {
  overflow: hidden;
  min-height: 0;
  color: var(--text-soft);
  font-size: 0.92rem;
}

.card__toggle {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  border: 1px solid var(--line);
  color: var(--accent);
  transition: transform 0.25s ease, border-color 0.15s ease;

  .card.is-open & {
    transform: rotate(180deg);
    border-color: var(--accent);
  }
}

/* Sanftes Aufklappen per Klick über den grid-template-rows 0fr→1fr-Trick:
   animiert auf die EXAKTE Inhaltshöhe jeder Kachel. Kein „Totlauf" wie bei
   max-height (das beim Schließen kurz auf voller Höhe hängt, bis der zu groß
   gewählte max-height-Wert die Inhaltshöhe unterschreitet) – der Übergang ist
   so für jede Kachel gleich weich. Funktioniert, weil die Kachel dank
   align-items:flex-start KEINE feste Höhe hat. */
.card__reveal {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card.is-open .card__reveal {
  grid-template-rows: 1fr;
}

.card__body {
  /* Direktes Grid-Kind der 0fr/1fr-Spur: overflow:hidden + KEIN eigenes Padding,
     damit es beim Schließen wirklich auf 0 kollabiert. (Padding hier würde die
     Spur auf die Padding-Höhe „aufbocken" → Kachel bliebe im geschlossenen
     Zustand zu hoch.) Das Padding trägt daher .card__inner. */
  overflow: hidden;
}

.card__inner {
  padding: 0 1.5rem 1.5rem;
}

/* Zweispaltiges Body-Layout (Bild | Text) ab 700px – BEWUSST NICHT an .is-open
   gekoppelt: würde es nur im offenen Zustand greifen, wechselte das Layout beim
   Einklappen schlagartig auf gestapelt (Bild ÜBER Text) → die Inhaltshöhe
   springt nach oben (~302→~560px), und die grid-template-rows-Animation
   kollabiert dann von diesem größeren Wert → sichtbares „kurzes Aufklappen beim
   Schließen". Da das Layout immer 2-spaltig ist, bleibt die Inhaltshöhe konstant;
   im geschlossenen Zustand ist es ohnehin via 0fr-Spur auf 0 geclippt. */
@media (min-width: 700px) {
  .card__inner:has(.card__cover) {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 1.5rem;
    align-items: start;
  }

  .card__cover {
    margin-bottom: 0;
  }
}

.card__detail {
  color: var(--text-soft);
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.card__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;

  li {
    font-size: 0.74rem;
    letter-spacing: 0.03em;
    color: var(--text-soft);
    background: var(--bg-soft);
    border: 1px solid var(--line);
    border-radius: 999px;
    padding: 0.15rem 0.6rem;
  }
}

.card__link {
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  color: var(--accent);
  display: inline-flex;
  gap: 0.3rem;
}

@media (prefers-reduced-motion: reduce) {
  /* !important, da die Akkordeon-Regeln (z. B. .grid--projects.has-open .card)
     höhere Spezifität haben und einfache Selektoren hier sonst nicht greifen. */
  .card,
  .card__reveal,
  .card__toggle,
  .card__tagline,
  .card__taglineWrap,
  .card__cover img {
    transition: none !important;
  }
}
</style>
