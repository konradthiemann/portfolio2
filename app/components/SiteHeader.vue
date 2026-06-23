<script setup lang="ts">
const { t } = useI18n()

const nav = [
  { key: 'home', id: 'top' },
  { key: 'approach', id: 'approach' },
  { key: 'experience', id: 'experience' },
  { key: 'projects', id: 'projects' },
  { key: 'voices', id: 'voices' },
  { key: 'contact', id: 'contact' },
]

// Scroll-Spy: hebt im Menü die Section hervor, die gerade im Blick ist.
const activeId = ref('')
let observer: IntersectionObserver | null = null

onMounted(() => {
  const ids = nav.map((n) => n.id)
  const visible = new Set<string>()
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target.id)
        else visible.delete(e.target.id)
      }
      // Oberste sichtbare Menü-Section (DOM-Reihenfolge) gewinnt.
      const first = ids.find((id) => visible.has(id))
      if (first) activeId.value = first
    },
    // Aktives „Band" im oberen Viewport-Drittel.
    { rootMargin: '-25% 0px -65% 0px' },
  )
  for (const id of ids) {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  }
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <header class="hdr">
    <div class="wrap hdr__inner">
      <nav class="hdr__nav" aria-label="Sections">
        <a
          v-for="item in nav"
          :key="item.key"
          :href="`#${item.id}`"
          :class="{ 'is-active': activeId === item.id }"
          :aria-current="activeId === item.id ? 'true' : undefined"
        >
          {{ t(`nav.${item.key}`) }}
        </a>
      </nav>

      <div class="hdr__actions">
        <LangSwitch />
        <ThemeToggle v-if="features.darkMode" />
      </div>
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

.hdr__actions {
  display: flex;
  align-items: center;
  gap: 1rem;
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

  a.is-active {
    color: var(--text);
  }
}

/* Tablet: horizontales Menü oben einblenden */
@media (min-width: 620px) {
  .hdr__nav {
    display: flex;
  }
}

/* ── Desktop: fixierte vertikale Sidebar ──────────────────── */
@media (min-width: 1024px) {
  .hdr {
    position: fixed;
    inset: 0 auto 0 0;
    width: var(--sidebar-w);
    border-bottom: none;
    background: var(--bg);
    backdrop-filter: none;
  }

  .hdr__inner {
    position: relative;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2.5rem;
    height: 100%;
    min-height: 0;
    max-width: none;
    padding: clamp(2rem, 5vh, 3rem) 2.6rem;
  }

  .hdr__nav {
    flex-direction: column;
    gap: 1.15rem;
    margin-left: 0;
    font-size: 1rem;

    a {
      opacity: 0.4;
      transition: opacity 0.3s ease, color 0.3s ease;
    }

    a.is-active {
      opacity: 1;
      color: var(--text);
      font-weight: 600;
    }

    a:hover {
      opacity: 1;
    }
  }

  /* Nav vertikal zentriert; Aktionen bleiben am unteren Rand. */
  .hdr__actions {
    position: absolute;
    left: 2.6rem;
    bottom: clamp(2rem, 5vh, 3rem);
  }
}
</style>
