<script setup lang="ts">
// Kompakte, IMMER gleich große Kachel im Projekt-Raster. Ändert nie ihre
// Größe/Position – Auswahl schaltet nur den Akzent-Rahmen um. Der Inhalt zum
// ausgewählten Projekt lebt in einem gemeinsamen Detail-Bereich unterhalb des
// Rasters (siehe ProjectDetail.vue + #projects in index.vue). Das vermeidet
// den Grid-Reflow-Sprung, den ein pro-Kachel-Aufklappen bei 6 statt 3 Kacheln
// verursachen würde (Positionswechsel, wenn eine Kachel auf volle Breite
// springt), und hält die Animation auf einen einzigen, vorhersehbaren
// Höhen-Übergang beschränkt.
defineProps<{
  name: string
  tagline: string
  expandLabel: string
  active: boolean
}>()

defineEmits<{ select: [] }>()
</script>

<template>
  <button
    type="button"
    class="tile"
    :class="{ 'is-active': active }"
    :aria-expanded="active"
    :aria-controls="active ? 'project-detail' : undefined"
    :aria-label="expandLabel"
    @click="$emit('select')"
  >
    <span class="tile__heading">
      <span class="tile__title">{{ name }}</span>
      <span class="tile__tagline">{{ tagline }}</span>
    </span>
    <span class="tile__toggle" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
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
</template>

<style scoped lang="scss">
.tile {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1.4rem 1.5rem;
  background: color-mix(in srgb, var(--surface) 70%, transparent);
  border: 1px solid var(--line);
  border-radius: 14px;
  text-align: left;
  cursor: pointer;
  color: inherit;
  font: inherit;
  transition: border-color 0.15s ease, background 0.15s ease;

  &:hover {
    border-color: var(--accent-soft);
  }

  &.is-active {
    border-color: var(--accent);
    background: color-mix(in srgb, var(--accent) 6%, var(--surface));
  }
}

.tile__heading {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.tile__title {
  font-size: 1.1rem;
  font-family: var(--serif);
  font-weight: 600;
  overflow-wrap: break-word;
}

.tile__tagline {
  color: var(--text-soft);
  font-size: 0.88rem;
}

.tile__toggle {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 999px;
  border: 1px solid var(--line);
  color: var(--accent);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.15s ease;

  .tile.is-active & {
    transform: rotate(180deg);
    border-color: var(--accent);
  }
}

@media (prefers-reduced-motion: reduce) {
  .tile,
  .tile__toggle {
    transition: none;
  }
}
</style>
