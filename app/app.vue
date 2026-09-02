<script setup lang="ts">
const { t } = useI18n()
const head = useLocaleHead()
const route = useRoute()

// Manuelles Scrollen zu #hash statt auf den nativen Browser-Sprung zu
// vertrauen: Safari springt beim initialen Laden NICHT zum Hash, sobald
// `scroll-behavior: smooth` auf <html> steht (bekannter WebKit-Bug) – genau
// der Fall, wenn man von einer anderen Seite (z. B. /ki-workflow) über einen
// Anker-Link zurück zur Startseite navigiert. Deckt sowohl den initialen
// Seitenaufruf mit Hash als auch spätere Hash-Wechsel ab.
function scrollToHash() {
  if (!route.hash) return
  nextTick(() => {
    document.querySelector(route.hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}
onMounted(scrollToHash)
watch(() => route.hash, scrollToHash)

useHead({
  htmlAttrs: { lang: head.value.htmlAttrs?.lang, dir: head.value.htmlAttrs?.dir },
  link: head.value.link,
  meta: head.value.meta,
})

useSeoMeta({
  title: () => t('meta.title'),
  description: () => t('meta.description'),
  ogTitle: () => t('meta.title'),
  ogDescription: () => t('meta.description'),
  ogType: 'website',
})
</script>

<template>
  <a class="skip-link" href="#main">{{ t('a11y.skip') }}</a>
  <SiteHeader />
  <main id="main">
    <NuxtPage />
  </main>
</template>
