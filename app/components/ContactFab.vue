<script setup lang="ts">
// Floating Action Button: springt direkt zum Kontaktformular und fokussiert
// das erste Feld. Wird ausgeblendet, sobald die Kontakt-Sektion sichtbar ist.
const { t } = useI18n()
const focusContact = useContactFocus()
const hidden = ref(false)

let io: IntersectionObserver | null = null

onMounted(() => {
  const target = document.getElementById('contact')
  if (!target || typeof IntersectionObserver === 'undefined') return
  io = new IntersectionObserver(
    ([entry]) => {
      hidden.value = entry?.isIntersecting ?? false
    },
    { threshold: 0, rootMargin: '0px 0px -15% 0px' },
  )
  io.observe(target)
})

onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <button
    type="button"
    class="fab"
    :class="{ 'fab--hidden': hidden }"
    :aria-label="t('a11y.toContact')"
    @click="focusContact"
  >
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M3 11 21 4l-7 16-3.6-6.4L3 11Z" />
      <path d="M10.4 13.6 21 4" />
    </svg>
  </button>
</template>

<style scoped lang="scss">
.fab {
  position: fixed;
  right: clamp(1rem, 4vw, 2rem);
  bottom: clamp(1rem, 4vw, 2rem);
  z-index: 50;
  width: 56px;
  height: 56px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: var(--accent);
  color: var(--accent-ink);
  cursor: pointer;
  box-shadow: 0 14px 30px -12px var(--accent), 0 4px 12px -6px rgba(0, 0, 0, 0.35);
  transition: transform 0.18s ease, opacity 0.25s ease, visibility 0.25s ease,
    background 0.15s ease;

  svg {
    transform: translateX(-1px);
  }
}

.fab:hover {
  transform: translateY(-2px);
  background: color-mix(in srgb, var(--accent) 88%, #000);
}

.fab--hidden {
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px) scale(0.9);
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .fab {
    transition: opacity 0.25s ease, visibility 0.25s ease;
  }

  .fab:hover {
    transform: none;
  }
}
</style>
