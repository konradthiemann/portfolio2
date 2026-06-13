<script setup lang="ts">
const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const options = computed(() =>
  (locales.value as { code: string; name?: string }[]).map((l) => ({
    code: l.code,
    name: l.name ?? l.code.toUpperCase(),
  })),
)
</script>

<template>
  <nav class="lang" :aria-label="t('a11y.switchLang')">
    <template v-for="(opt, i) in options" :key="opt.code">
      <span v-if="i > 0" class="lang__sep" aria-hidden="true">/</span>
      <NuxtLink
        :to="switchLocalePath(opt.code)"
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
