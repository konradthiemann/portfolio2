<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const nav = [
  { key: 'about', hash: '#about' },
  { key: 'experience', hash: '#experience' },
  { key: 'tech', hash: '#tech' },
  { key: 'projects', hash: '#projects' },
  { key: 'contact', hash: '#contact' },
]

const home = computed(() => localePath('/'))
</script>

<template>
  <header class="hdr">
    <div class="wrap hdr__inner">
      <NuxtLink :to="home" class="hdr__brand">KT</NuxtLink>

      <nav class="hdr__nav" aria-label="Sections">
        <a v-for="item in nav" :key="item.key" :href="item.hash">
          {{ t(`nav.${item.key}`) }}
        </a>
      </nav>

      <LangSwitch />
    </div>
  </header>
</template>

<style scoped lang="scss">
.hdr {
  position: sticky;
  top: 0;
  z-index: 20;
  background: color-mix(in srgb, var(--bg) 88%, transparent);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--line);
}

.hdr__inner {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  min-height: 60px;
}

.hdr__brand {
  font-family: var(--serif);
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: 0.02em;
  text-decoration: none;
}

.hdr__nav {
  display: none;
  gap: 1.4rem;
  margin-left: auto;
  font-size: 0.92rem;

  a {
    text-decoration: none;
    color: var(--text-soft);
  }
}

@media (min-width: 620px) {
  .hdr__nav {
    display: flex;
  }
}

@media (max-width: 619px) {
  .hdr__brand {
    margin-right: auto;
  }
}
</style>
