<script setup lang="ts">
import type { Project } from '~/utils/profile'

defineProps<{
  project: Project
  name: string
  tagline: string
  detail: string
  cta: string
  liveCta: string
}>()
</script>

<template>
  <div class="detail">
    <div v-if="project.image" class="detail__cover">
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

    <div class="detail__text">
      <h3 class="detail__title">{{ name }}</h3>
      <p class="detail__tagline">{{ tagline }}</p>
      <p class="detail__body">{{ detail }}</p>

      <ul class="detail__stack">
        <li v-for="tech in project.stack" :key="tech">{{ tech }}</li>
      </ul>

      <div class="detail__links">
        <a
          v-if="project.liveUrl"
          class="detail__link"
          :href="project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ liveCta }}
          <span aria-hidden="true">↗</span>
        </a>
        <a
          class="detail__link detail__link--repo"
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
</template>

<style scoped lang="scss">
.detail {
  display: grid;
  gap: 1.75rem;
}

.detail__cover {
  max-width: 210px;
  overflow: hidden;
  background: var(--bg-soft);
  border: 1px solid var(--line);
  border-radius: 12px;

  picture,
  img {
    display: block;
    width: 100%;
  }

  img {
    height: auto;
  }
}

@media (min-width: 560px) {
  .detail:has(.detail__cover) {
    grid-template-columns: auto minmax(0, 1fr);
    align-items: start;
  }
}

.detail__title {
  font-size: 1.4rem;
  margin-bottom: 0.35rem;
}

.detail__tagline {
  color: var(--text-soft);
  font-size: 1rem;
  margin-bottom: 1rem;
}

.detail__body {
  color: var(--text-soft);
  font-size: 0.97rem;
  max-width: 62ch;
  margin-bottom: 1.1rem;
}

.detail__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.25rem;

  li {
    font-size: 0.76rem;
    letter-spacing: 0.03em;
    color: var(--text-soft);
    background: var(--bg-soft);
    border: 1px solid var(--line);
    border-radius: 999px;
    padding: 0.18rem 0.65rem;
  }
}

.detail__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
}

.detail__link {
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  color: var(--accent);
  display: inline-flex;
  gap: 0.3rem;
}

.detail__link--repo {
  font-weight: 500;
  color: var(--text-soft);
}
</style>
