// v-draw-view: zeichnet eine Monoline-Grafik, sobald die Sektion in den Viewport
// kommt – zeitbasiert, unabhängig vom Scroll-Tempo. Verlässt die Sektion den
// Viewport wieder, wird die Animation zurückgesetzt und beim nächsten Eintritt
// erneut abgespielt.
// Universell registriert (getSSRProps); Beobachtung nur im Client.
// Bei prefers-reduced-motion sofort fertig gezeichnet, keine Animation.
let observer: IntersectionObserver | null = null

function getObserver(): IntersectionObserver | null {
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
    return null
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null
  }
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Im Viewport → zeichnen; verlassen → zurücksetzen (Re-Animation).
          entry.target.classList.toggle('is-drawn', entry.isIntersecting)
        }
      },
      // Etwas Vorlauf von unten, damit die Zeichnung beginnt, sobald die
      // Sektion erreicht ist – nicht erst, wenn sie mittig steht.
      { threshold: 0, rootMargin: '0px 0px -20% 0px' },
    )
  }
  return observer
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('draw-view', {
    getSSRProps() {
      return {}
    },
    mounted(el: HTMLElement) {
      const io = getObserver()
      if (!io) {
        el.classList.add('is-drawn')
        return
      }
      io.observe(el)
    },
    unmounted(el: HTMLElement) {
      observer?.unobserve(el)
    },
  })
})
