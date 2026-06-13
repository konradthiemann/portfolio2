<script setup lang="ts">
import type { Project } from '~/utils/profile'

defineProps<{
  project: Project
  name: string
  desc: string
  cta: string
}>()
</script>

<template>
  <article class="card">
    <h3 class="card__title">{{ name }}</h3>
    <p class="card__desc">{{ desc }}</p>

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
  </article>
</template>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding: 1.6rem;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 12px;
  height: 100%;
  transition: border-color 0.15s ease, transform 0.15s ease;

  &:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
  }
}

.card__title {
  font-size: 1.25rem;
}

.card__desc {
  color: var(--text-soft);
  font-size: 0.96rem;
  flex: 1;
}

.card__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;

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
  margin-top: 0.2rem;
}
</style>
