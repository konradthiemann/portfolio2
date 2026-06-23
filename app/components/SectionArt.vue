<script setup lang="ts">
// Dezentes, scroll-getriebenes Sektions-Motiv im Seiten-Gutter.
// Rein dekorativ (aria-hidden); auf schmalen Viewports ausgeblendet (CSS).
withDefaults(
  defineProps<{
    motif: string
    side?: 'left' | 'right'
  }>(),
  { side: 'right' },
)
</script>

<template>
  <div
    v-draw-view
    class="section-art draw-view"
    :class="`section-art--${side}`"
    aria-hidden="true"
  >
    <LineArt :name="motif as never" />
  </div>
</template>

<style scoped lang="scss">
/* Großes Hintergrund-Motiv, das sich mit dem Inhalt überschneidet (sehr dezent).
   Vertikal an einem FESTEN Abstand zur Sektions-Oberkante verankert (nicht an
   top:50%), damit die Position NICHT von der Sektionshöhe abhängt – so wackelt
   das Motiv nicht, wenn sich eine Sektion in der Höhe ändert (z. B. beim
   Aufklappen einer Projekt-Kachel). Horizontal weiter mittig, leicht versetzt. */
.section-art {
  --art-w: clamp(340px, 56vw, 700px);
  --art-y: clamp(11rem, 24vh, 18rem);
  position: absolute;
  top: var(--art-y);
  left: 50%;
  transform: translate(-50%, -50%);
  width: var(--art-w);
  aspect-ratio: 1;
  opacity: 0.07;
  pointer-events: none;
  z-index: 0;

  :deep(.lineart) {
    stroke-width: 0.9;
  }
}

/* Desktop: deutlich in den seitlichen Whitespace versetzt (überlappt weiterhin). */
.section-art--left {
  transform: translate(calc(-50% - clamp(150px, 28vw, 460px)), -50%);
}

.section-art--right {
  transform: translate(calc(-50% + clamp(150px, 28vw, 460px)), -50%);
}

/* Auf schmalen Viewports zentriert hinter dem Text. */
@media (max-width: 767px) {
  .section-art {
    --art-w: clamp(280px, 88vw, 460px);
    opacity: 0.06;
  }

  .section-art--left,
  .section-art--right {
    transform: translate(-50%, -50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .section-art {
    opacity: 0.06;
  }
}
</style>
