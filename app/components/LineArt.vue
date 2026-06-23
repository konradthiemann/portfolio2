<script setup lang="ts">
// Dezente Monoline-Illustrationen ("1-line art").
// Zeichnen sich via .draw.is-visible ODER beim Erreichen der Sektion über
// .draw-view.is-drawn (pathLength="1", siehe main.scss / plugins/drawView.ts).
defineProps<{
  name:
    | 'pokeball'
    | 'skateboard'
    | 'pizza'
    | 'code'
    | 'guitar'
    // Sektions-Motive (viewBox 140, pathLength normiert)
    | 'approach'
    | 'experience'
    | 'voices'
    | 'ai'
    | 'tech'
    | 'projects'
    | 'teaching'
    | 'about'
    | 'contact'
}>()

// Sektions-Motive nutzen ein größeres Koordinatensystem für mehr Detail.
const sectionMotifs = new Set([
  'approach',
  'experience',
  'voices',
  'ai',
  'tech',
  'projects',
  'teaching',
  'about',
  'contact',
])
</script>

<template>
  <svg
    class="lineart"
    :viewBox="sectionMotifs.has(name) ? '0 0 140 140' : '0 0 24 24'"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <!-- Pokéball (Competitive Pokémon TCG) -->
    <template v-if="name === 'pokeball'">
      <circle cx="12" cy="12" r="9.5" />
      <path d="M2.5 12h6" />
      <path d="M15.5 12h6" />
      <circle cx="12" cy="12" r="3" />
    </template>

    <!-- Skateboard (Seitenansicht: Deck mit Nose/Tail, Trucks, Rollen) -->
    <template v-else-if="name === 'skateboard'">
      <path d="M2.8 11c1-1.7 2.7-1.7 3.7-.2h11c1-1.5 2.7-1.5 3.7.2" />
      <path d="M7 11.5v1.7" />
      <path d="M17 11.5v1.7" />
      <circle cx="7" cy="14.7" r="1.5" />
      <circle cx="17" cy="14.7" r="1.5" />
    </template>

    <!-- Pizzastück -->
    <template v-else-if="name === 'pizza'">
      <path d="M4 5.5 20 5.5 12 21Z" />
      <path d="M4 5.5c5-2 11-2 16 0" />
      <circle cx="10" cy="9.5" r="1" />
      <circle cx="14.5" cy="10.5" r="1" />
      <circle cx="12" cy="14.5" r="1" />
    </template>

    <!-- Guitar (Foto-Hommage) -->
    <template v-else-if="name === 'guitar'">
      <path d="M19.5 3.5 16 7" />
      <circle cx="9" cy="15" r="5.5" />
      <path d="M12.9 11.1 16 8c1-1 3-1 3.5-.5S20 9.5 19 10.5L16 13" />
      <circle cx="9" cy="15" r="1.6" />
    </template>

    <!-- ── Sektions-Motive (viewBox 140, pathLength normiert, reduziert) ── -->

    <!-- About: Kaffeetasse mit Dampf (klar reduziert) -->
    <template v-else-if="name === 'about'">
      <path
        pathLength="1"
        d="M38 60 H92 V82 a16 16 0 0 1 -16 16 H54 a16 16 0 0 1 -16 -16 Z"
      />
      <path pathLength="1" d="M92 66 a13 13 0 0 1 0 24" />
      <path pathLength="1" d="M58 48 q-7 -8 0 -16" />
      <path pathLength="1" d="M74 48 q-7 -8 0 -16" />
    </template>

    <!-- Approach: gewundener Pfad mit Pfeilspitze (Methode / Weg) -->
    <template v-else-if="name === 'approach'">
      <path
        pathLength="1"
        d="M24 104 C48 72 56 100 78 72 C96 50 104 64 118 44"
      />
      <path pathLength="1" d="M118 44 L105 45 M118 44 L116 58" />
    </template>

    <!-- Tech: Code-Glyph </> (Tech-Stack) -->
    <template v-else-if="name === 'tech'">
      <path pathLength="1" d="M52 44 L28 70 L52 96" />
      <path pathLength="1" d="M88 44 L112 70 L88 96" />
      <path pathLength="1" d="M78 34 L62 106" />
    </template>

    <!-- AI: vernetzte Knoten (Agenten-System) -->
    <template v-else-if="name === 'ai'">
      <path pathLength="1" d="M26 104 L58 54 L90 102 L116 52" />
      <circle pathLength="1" cx="58" cy="54" r="4" />
      <circle pathLength="1" cx="116" cy="52" r="4" />
      <circle pathLength="1" cx="26" cy="104" r="4" />
      <circle pathLength="1" cx="90" cy="102" r="4" />
    </template>

    <!-- Experience: geschichtetes System / Zylinder (Verantwortung) -->
    <template v-else-if="name === 'experience'">
      <path
        pathLength="1"
        d="M42 50 C42 40 98 40 98 50 V94 C98 104 42 104 42 94 Z"
      />
      <path pathLength="1" d="M42 50 C42 60 98 60 98 50" />
      <path pathLength="1" d="M42 72 C42 82 98 82 98 72" />
    </template>

    <!-- Projects: Fenster (was ich baue) -->
    <template v-else-if="name === 'projects'">
      <path
        pathLength="1"
        d="M34 48 H100 a8 8 0 0 1 8 8 V96 a8 8 0 0 1 -8 8 H34 a8 8 0 0 1 -8 -8 V56 a8 8 0 0 1 8 -8 Z"
      />
      <path pathLength="1" d="M26 66 H108" />
      <circle pathLength="1" cx="38" cy="57" r="2.5" />
      <circle pathLength="1" cx="48" cy="57" r="2.5" />
      <circle pathLength="1" cx="58" cy="57" r="2.5" />
    </template>

    <!-- Teaching: aufgeschlagenes Buch (Wissen weitergeben) -->
    <template v-else-if="name === 'teaching'">
      <path
        pathLength="1"
        d="M70 50 C50 38 30 40 22 44 V98 C30 94 50 92 70 102 C90 92 110 94 118 98 V44 C110 40 90 38 70 50 Z"
      />
      <path pathLength="1" d="M70 50 V102" />
    </template>

    <!-- Voices: Sprechblase mit Textzeilen (was andere sagen) -->
    <template v-else-if="name === 'voices'">
      <path
        pathLength="1"
        d="M30 46 H106 a10 10 0 0 1 10 10 V88 a10 10 0 0 1 -10 10 H58 L42 114 V98 H40 a10 10 0 0 1 -10 -10 V56 a10 10 0 0 1 10 -10 Z"
      />
      <path pathLength="1" d="M46 64 H96" />
      <path pathLength="1" d="M46 78 H82" />
    </template>

    <!-- Contact: Papierflieger (Nachricht senden) -->
    <template v-else-if="name === 'contact'">
      <path pathLength="1" d="M34 58 L120 30 L82 118 L66 82 Z" />
      <path pathLength="1" d="M66 82 L120 30" />
    </template>

    <!-- Code-Glyph </> -->
    <template v-else>
      <path d="M9 7 4 12l5 5" />
      <path d="M15 7l5 5-5 5" />
      <path d="M13.5 4.5 10.5 19.5" />
    </template>
  </svg>
</template>
