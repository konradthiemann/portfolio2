// Springt sanft zum Kontaktformular und setzt den Fokus auf das erste Feld.
// preventScroll verhindert den harten Sprung des Fokus – das smooth-Scrolling
// übernimmt die Bewegung.
export function useContactFocus() {
  return () => {
    if (!import.meta.client) return
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    const field = document.getElementById('contact-name') as HTMLInputElement | null
    field?.focus({ preventScroll: true })
  }
}
