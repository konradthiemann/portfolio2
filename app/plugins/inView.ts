// In-View-Trigger: löst Animationen erst aus, wenn das Element SELBST in den
// Viewport kommt – nicht schon beim Sektionsanfang. Der kleine Delay sitzt in
// der CSS-transition (var(--reveal-delay)).
// - v-mark-view: am Container; beobachtet jedes <mark> einzeln (Textmarker aus
//   v-html, daher kein Direktiv direkt am Element möglich).
// - v-in-view: am Element selbst (z. B. Bild-Cover).
// Bei prefers-reduced-motion oder bereits sichtbaren Elementen sofort, ohne IO.
let observer: IntersectionObserver | null = null

function reducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function getObserver(): IntersectionObserver | null {
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
    return null
  }
  if (!observer) {
    observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.classList.add(el.dataset.inviewClass || 'is-inview')
            obs.unobserve(el)
          }
        }
      },
      { threshold: 0.25 },
    )
  }
  return observer
}

// Element beobachten und beim Eintritt die Klasse setzen. Schon sichtbar oder
// reduced-motion → sofort.
function observe(el: HTMLElement, cls: string): void {
  if (el.dataset.inviewClass) return // bereits beobachtet/gesetzt
  el.dataset.inviewClass = cls
  const io = getObserver()
  if (!io || reducedMotion()) {
    el.classList.add(cls)
    return
  }
  const rect = el.getBoundingClientRect()
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    el.classList.add(cls)
    return
  }
  io.observe(el)
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('mark-view', {
    getSSRProps() {
      return {}
    },
    mounted(el: HTMLElement) {
      el.querySelectorAll<HTMLElement>('mark').forEach((m) => observe(m, 'is-marked'))
    },
    // Sprachwechsel ersetzt den v-html-Inhalt – neue <mark>-Knoten beobachten.
    updated(el: HTMLElement) {
      el.querySelectorAll<HTMLElement>('mark').forEach((m) => observe(m, 'is-marked'))
    },
    unmounted(el: HTMLElement) {
      el.querySelectorAll<HTMLElement>('mark').forEach((m) => observer?.unobserve(m))
    },
  })

  nuxtApp.vueApp.directive('in-view', {
    getSSRProps() {
      return {}
    },
    mounted(el: HTMLElement) {
      observe(el, 'is-inview')
    },
    unmounted(el: HTMLElement) {
      observer?.unobserve(el)
    },
  })
})
