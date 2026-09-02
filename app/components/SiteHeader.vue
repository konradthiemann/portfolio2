<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const nav = [
  { key: 'home', id: 'top' },
  { key: 'approach', id: 'approach' },
  { key: 'experience', id: 'experience' },
  { key: 'projects', id: 'projects' },
  { key: 'voices', id: 'voices' },
  { key: 'contact', id: 'contact' },
  { key: 'aiWorkflow', to: 'ki-workflow' },
]

// Anker-Items funktionieren nur auf der Startseite; auf anderen Seiten führen
// sie zurück zur Startseite samt Hash. Reine Seiten-Items (`to`) verlinken
// direkt auf ihre lokalisierte Route.
const isHome = computed(() => route.path === localePath('index'))
function hrefFor(item: { id?: string; to?: string }) {
  if (item.to) return localePath(item.to)
  return isHome.value ? `#${item.id}` : `${localePath('index')}#${item.id}`
}
function isActiveItem(item: { id?: string; to?: string }) {
  if (item.to) return route.path === localePath(item.to)
  return isHome.value && activeId.value === item.id
}

// Anker-Klick auf der Startseite selbst übernehmen (nicht dem nativen
// Hash-Sprung überlassen – siehe app.vue für den Hintergrund/Safari-Bug).
// Seiten-Links und Anker-Links auf anderen Seiten navigieren normal; dort
// übernimmt app.vue das Scrollen nach der Landung.
function onNavClick(e: MouseEvent, item: { id?: string; to?: string }) {
  closeMenu()
  if (item.to || !isHome.value || !item.id) return
  e.preventDefault()
  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  history.pushState(null, '', `#${item.id}`)
}

// Burger-Menü (nur mobil): Sichtbarkeit der Navigation + Spracheinstellung.
const menuOpen = ref(false)
function closeMenu() {
  menuOpen.value = false
}

// Scroll-Spy: hebt im Menü die Section hervor, die gerade im Blick ist.
const activeId = ref('')
let observer: IntersectionObserver | null = null

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeMenu()
}

onMounted(() => {
  const ids = nav.filter((n): n is typeof n & { id: string } => !!n.id).map((n) => n.id)
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
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <header class="hdr">
    <div class="wrap hdr__inner">
      <!-- Burger nur mobil, wenn der Platz für Menüpunkte + Sprache knapp wird. -->
      <button
        class="hdr__burger"
        type="button"
        :aria-expanded="menuOpen"
        :aria-label="t('a11y.menu')"
        @click="menuOpen = !menuOpen"
      >
        <span class="hdr__burger-box" :class="{ 'is-open': menuOpen }">
          <span></span><span></span><span></span>
        </span>
      </button>

      <div class="hdr__menu" :class="{ 'is-open': menuOpen }">
        <nav class="hdr__nav" aria-label="Sections">
          <a
            v-for="item in nav"
            :key="item.key"
            :href="hrefFor(item)"
            :class="{ 'is-active': isActiveItem(item), 'is-page-link': item.to }"
            :aria-current="isActiveItem(item) ? 'true' : undefined"
            @click="onNavClick($event, item)"
          >
            {{ t(`nav.${item.key}`) }}
          </a>
        </nav>

        <div class="hdr__actions">
          <LangSwitch />
          <ThemeToggle v-if="features.darkMode" />
        </div>
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

/* ── Mobil: Burger-Toggle + ausklappbares Menü ─────────────── */
.hdr__burger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  width: 44px;
  height: 44px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--text);
  cursor: pointer;
}

.hdr__burger-box {
  position: relative;
  width: 22px;
  height: 14px;

  span {
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    border-radius: 2px;
    background: currentColor;
    transition: transform 0.3s ease, opacity 0.2s ease, top 0.3s ease;
  }

  span:nth-child(1) {
    top: 0;
  }
  span:nth-child(2) {
    top: 6px;
  }
  span:nth-child(3) {
    top: 12px;
  }

  &.is-open span:nth-child(1) {
    top: 6px;
    transform: rotate(45deg);
  }
  &.is-open span:nth-child(2) {
    opacity: 0;
  }
  &.is-open span:nth-child(3) {
    top: 6px;
    transform: rotate(-45deg);
  }
}

/* Ausklapp-Panel unter der Leiste. */
.hdr__menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.25rem clamp(1.5rem, 3vw, 2.25rem) 1.5rem;
  background: var(--bg);
  border-bottom: 1px solid var(--line);
}

.hdr__menu.is-open {
  display: flex;
}

.hdr__nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 1rem;

  a {
    text-decoration: none;
    color: var(--text-soft);
  }

  a.is-active {
    color: var(--text);
  }
}

/* Seiten-Link (KI-System) optisch von den Anker-Punkten der Startseite
   absetzen – anderer Navigations-Typ (echte Route statt Scroll-Ziel). */
.hdr__nav a.is-page-link {
  margin-top: 0.85rem;
  padding-top: 0.85rem;
  border-top: 1px dashed var(--line);
}

/* Tablet: genug Platz → Burger weg, Menü inline in der Leiste. */
@media (min-width: 620px) {
  .hdr__burger {
    display: none;
  }

  /* display:contents → nav + actions liegen wieder direkt im .hdr__inner-Flex.
     Auch bei is-open (mobil offen gelassen), daher beide Selektoren. */
  .hdr__menu,
  .hdr__menu.is-open {
    display: contents;
  }

  .hdr__nav {
    flex-direction: row;
    gap: 1.4rem;
    margin-left: auto;
    font-size: 0.92rem;
  }

  .hdr__nav a.is-page-link {
    margin-top: 0;
    padding-top: 0;
    border-top: none;
    padding-left: 1.4rem;
    border-left: 1px dashed var(--line);
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

    a.is-page-link {
      margin-top: 0.4rem;
      padding-top: 0.9rem;
      padding-left: 0;
      border-top: 1px dashed var(--line);
      border-left: none;
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
