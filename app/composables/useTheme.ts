// Heller/dunkler Modus. Standard ist hell; die Wahl wird in localStorage
// gemerkt. Das Pre-Paint-Script in nuxt.config setzt data-theme vor dem
// ersten Render, damit nichts flackert.
export type Theme = 'light' | 'dark'

export function useTheme() {
  const theme = useState<Theme>('theme', () => 'light')

  const apply = (value: Theme) => {
    const root = document.documentElement
    if (value === 'dark') root.setAttribute('data-theme', 'dark')
    else root.removeAttribute('data-theme')
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', value === 'dark' ? '#1a1714' : '#faf7f1')
  }

  onMounted(() => {
    const saved = localStorage.getItem('theme')
    theme.value = saved === 'dark' ? 'dark' : 'light'
  })

  watch(theme, (value) => {
    if (!import.meta.client) return
    apply(value)
    localStorage.setItem('theme', value)
  })

  const toggle = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return { theme, toggle }
}
