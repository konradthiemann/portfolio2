<script setup lang="ts">
const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const options = computed(() =>
  (locales.value as { code: string; name?: string }[]).map((l) => ({
    code: l.code,
    name: l.name ?? l.code.toUpperCase(),
  })),
)

// switchLocalePath übernimmt clientseitig auch den aktuellen URL-Hash
// (z. B. #projects nach Klick auf einen Sektions-Link) – serverseitig ist der
// Hash beim SSR grundsätzlich nie bekannt (Browser senden Fragments nicht
// mit). Dieser Unterschied erzeugt einen Hydration-Mismatch. Den Hash hier
// bewusst kappen: Server und Client rendern dann identisch, und der
// Sprachwechsel bleibt auf derselben Seite statt an einen Anker gebunden.
function hrefFor(code: string) {
  return switchLocalePath(code).split('#')[0]
}
</script>

<template>
  <nav class="lang" :aria-label="t('a11y.switchLang')">
    <template v-for="(opt, i) in options" :key="opt.code">
      <span v-if="i > 0" class="lang__sep" aria-hidden="true">/</span>
      <NuxtLink
        :to="hrefFor(opt.code)"
        class="lang__link"
        :class="{ 'is-active': opt.code === locale }"
        :aria-current="opt.code === locale ? 'true' : undefined"
        :hreflang="opt.code"
      >
        {{ opt.code.toUpperCase() }}
      </NuxtLink>
    </template>
  </nav>
</template>

<style scoped lang="scss">
.lang {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.lang__sep {
  color: var(--line);
}

.lang__link {
  text-decoration: none;
  color: var(--text-soft);

  &.is-active {
    color: var(--text);
    text-decoration: underline;
    text-decoration-color: var(--accent);
    text-underline-offset: 4px;
  }
}
</style>
