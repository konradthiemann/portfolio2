<script setup lang="ts">
// Aufklappbare Kachel im selben visuellen Stil wie ProjectCard.vue, aber ohne
// Repo-/Live-Links: für die zwei Hobbys, die inhaltlich mit der Arbeitsweise
// verknüpft sind (siehe personal.hobbies in den i18n-Locales).
defineProps<{
  icon: 'skateboard' | 'pokeball'
  title: string
  tagline: string
  detail: string
  expandLabel: string
  open: boolean
  photo?: { webp: string; jpg: string }
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
      <span class="card__icon"><LineArt :name="icon" /></span>
      <span class="card__heading">
        <h3 class="card__title">{{ title }}</h3>
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
          <figure v-if="photo" class="card__photo">
            <picture>
              <source :srcset="photo.webp" type="image/webp" />
              <img :src="photo.jpg" alt="" loading="lazy" decoding="async" />
            </picture>
          </figure>
          <p class="card__detail">{{ detail }}</p>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.card {
  background: color-mix(in srgb, var(--surface) 70%, transparent);
  border: 1px solid var(--line);
  border-radius: 14px;
  overflow: hidden;
  transition: border-color 0.15s ease;

  &.is-open {
    border-color: var(--accent);
    grid-column: 1 / -1;
  }
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

.card__icon {
  display: block;
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  color: var(--accent);

  :deep(.lineart) {
    stroke: currentColor;
  }
}

.card__heading {
  flex: 1;
  min-width: 0;
}

.card__title {
  font-size: 1.2rem;
  margin-bottom: 0.2rem;
  overflow-wrap: break-word;
}

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

.card__reveal {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card.is-open .card__reveal {
  grid-template-rows: 1fr;
}

.card__body {
  overflow: hidden;
}

.card__inner {
  padding: 0 1.5rem 1.5rem;
}

.card__photo {
  margin: 0 0 1.1rem;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--bg-soft);
  border: 1px solid var(--line);
  border-radius: 12px;

  picture,
  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  img {
    object-fit: cover;
  }
}

.card__detail {
  color: var(--text-soft);
  font-size: 0.95rem;
  max-width: 62ch;
}

@media (prefers-reduced-motion: reduce) {
  .card,
  .card__reveal,
  .card__toggle {
    transition: none !important;
  }
}
</style>
