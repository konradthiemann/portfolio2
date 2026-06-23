// v-reveal: blendet Elemente beim Scrollen sanft ein und löst die
// Selbstzeichnung der Monoline-Grafiken aus (.is-visible).
// Universell registriert (getSSRProps) – die Beobachtung läuft nur im Client.
// Bei prefers-reduced-motion sofort sichtbar, keine Animation.
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
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            obs.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12 },
    )
  }
  return observer
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    getSSRProps() {
      return {}
    },
    mounted(el: HTMLElement) {
      const io = getObserver()
      if (!io) {
        el.classList.add('is-visible')
        return
      }
      // Schon (teilweise) im Viewport? Sofort zeigen – kein Warten auf IO.
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('is-visible')
        return
      }
      io.observe(el)
      // Sicherheitsnetz: falls IO ausnahmsweise nie auslöst, nie dauerhaft
      // unsichtbar bleiben (Inhalt schlägt Animation).
      window.setTimeout(() => el.classList.add('is-visible'), 2500)
    },
    unmounted(el: HTMLElement) {
      observer?.unobserve(el)
    },
  })
})
