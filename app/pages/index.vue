<script setup lang="ts">
const { t, tm, rt } = useI18n()

// Array-Messages sicher als String-Liste auslesen.
const toList = (key: string) => (tm(key) as unknown[]).map((m) => rt(m as never))

// Mit *…* markierte Stellen in Textmarker-HTML umwandeln. vue-i18n verbietet HTML
// in Messages, daher der Umweg über den Marker + v-html an der Ausgabestelle.
const mark = (key: string) => t(key).replace(/\*(.+?)\*/g, '<mark>$1</mark>')

// Objekt-Listen ({ title, desc }) sicher auslesen.
const toItems = (key: string) =>
  (tm(key) as Record<string, unknown>[]).map((m) => ({
    title: rt(m.title as never),
    desc: rt(m.desc as never),
  }))

const approachItems = computed(() => toItems('approach.items'))
const experienceItems = computed(() => toList('experience.items'))

// Kennzahlen-Block ({ value, label }) sicher auslesen.
const experienceStats = computed(() =>
  (tm('experience.stats') as Record<string, unknown>[]).map((m) => ({
    value: rt(m.value as never),
    label: rt(m.label as never),
  })),
)
// Zitate ({ text, source }) sicher auslesen — je Stimme eine eigene Quelle.
const voices = computed(() =>
  (tm('voices.items') as Record<string, unknown>[]).map((m) => ({
    text: rt(m.text as never),
    source: rt(m.source as never),
  })),
)

// Zitat-Carousel: zeigt mehrere Zitate gleichzeitig (responsive 1/2/3),
// robust gegen beliebig viele Zitate. voiceIndex = Index der linken Karte.
const voiceIndex = ref(0)
// Sichtbare Karten via matchMedia (Breakpoints identisch zu den CSS-Regeln).
const perView = ref(1)
// Letzter gültiger Index, damit am Ende keine Lücke entsteht.
const maxVoiceIndex = computed(() => Math.max(0, voices.value.length - perView.value))
// Anzahl der Navigations-Positionen (Punkte) hängt von sichtbaren Karten ab.
const voicePages = computed(() => maxVoiceIndex.value + 1)
// Schrittweite je Karte: (100% + Gap) / sichtbare Karten — Gap muss zur CSS-gap passen.
const voiceTrackStyle = computed(() => ({
  transform: `translateX(calc(${-voiceIndex.value} * (100% + 1rem) / ${perView.value}))`,
}))
const updatePerView = () => {
  perView.value = window.matchMedia('(min-width: 1024px)').matches
    ? 3
    : window.matchMedia('(min-width: 640px)').matches
      ? 2
      : 1
  // Index nachziehen, falls am Ende nun zu wenig Karten folgen.
  if (voiceIndex.value > maxVoiceIndex.value) voiceIndex.value = maxVoiceIndex.value
}
const goToVoice = (i: number) => {
  voiceIndex.value = Math.min(Math.max(i, 0), maxVoiceIndex.value)
}
const nextVoice = () =>
  (voiceIndex.value = voiceIndex.value >= maxVoiceIndex.value ? 0 : voiceIndex.value + 1)
const prevVoice = () =>
  (voiceIndex.value = voiceIndex.value <= 0 ? maxVoiceIndex.value : voiceIndex.value - 1)

onMounted(() => {
  updatePerView()
  window.addEventListener('resize', updatePerView)
})
onBeforeUnmount(() => window.removeEventListener('resize', updatePerView))
const aiTags = computed(() => toList('ai.tags'))
const teachingItems = computed(() => toList('teaching.items'))
const aboutValues = computed(() => toList('about.values'))
const personalItems = computed(() => toList('personal.items'))

// Monoline-Icon je Hobby (Reihenfolge = personal.items).
const hobbyIcons = ['pokeball', 'skateboard', 'pizza'] as const

// Sanft zum Kontaktformular springen und das erste Feld fokussieren.
const focusContact = useContactFocus()

// Projekt-Akkordeon: nur EINE Kachel offen (zwei 2x2-Blöcke passen nicht in die
// 2-zeilige, höhenkonstante Raster-Anordnung auf dem Desktop).
const openProject = ref<string | null>(null)

// Beim vollständigen Schließen kurz aktiv: hält die zurückwachsenden Nachbar-
// Kacheln kompakt (Tagline/Button/Padding zurück), bis ihre Breite wieder voll
// ist (~0.7s = 0.3s flex-grow-Delay + 0.4s Dauer). Sonst würden Tagline/Button
// erscheinen, während die Kachel noch schmal ist, dem Titel Platz stehlen und ihn
// auf viele Zeilen treiben → Höhe schießt kurz hoch (Überschwingen). CSS allein
// reicht nicht: der display:none→block-Wechsel ignoriert transition-delay.
const collapsing = ref(false)
let collapseTimer: ReturnType<typeof setTimeout> | undefined

// Klick auf eine Kachel: auf-/zuklappen (Einzel-Akkordeon). Auf breiten
// Viewports weitet sich die aktive Kachel horizontal aus, die übrigen schrumpfen
// zur Seite – rein über CSS-Transitions (flex-grow), kein FLIP/Positionssprung.
const toggleProject = (slug: string) => {
  const isClosing = openProject.value === slug
  openProject.value = isClosing ? null : slug
  clearTimeout(collapseTimer)
  if (isClosing) {
    collapsing.value = true
    collapseTimer = setTimeout(() => (collapsing.value = false), 700)
  } else {
    collapsing.value = false
  }
}

onBeforeUnmount(() => clearTimeout(collapseTimer))

const contacts = computed(() => {
  const list = [
    { label: t('contact.linkedin'), href: profile.links.linkedin },
    { label: t('contact.github'), href: profile.links.github },
  ]
  if (profile.email) {
    list.unshift({ label: t('contact.email'), href: `mailto:${profile.email}` })
  }
  return list
})
</script>

<template>
  <!-- Hero -->
  <section id="top" class="hero">
    <div v-reveal class="hero__accent draw" aria-hidden="true">
      <LineArt name="code" />
    </div>
    <div class="wrap hero__inner">
      <figure class="hero__photo">
        <picture>
          <source :srcset="profile.image.webp" type="image/webp" />
          <img
            :src="profile.image.png"
            :alt="profile.name"
            width="640"
            height="640"
            fetchpriority="high"
          />
        </picture>
      </figure>

      <div class="hero__text">
      <h1 class="hero__name">{{ profile.name }}</h1>
      <p class="hero__tagline">{{ t('hero.tagline') }}</p>
      <p class="hero__intro">{{ t('hero.intro') }}</p>

      <div class="hero__cta">
        <a href="#contact" class="btn btn--solid" @click.prevent="focusContact">{{ t('hero.ctaPrimary') }}</a>
        <a href="#projects" class="btn btn--ghost">{{ t('hero.ctaSecondary') }}</a>
      </div>

      <div class="hero__links">
        <a
          v-for="c in contacts"
          :key="c.href"
          :href="c.href"
          class="pill"
          v-bind="
            c.href.startsWith('http')
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {}
          "
        >
          {{ c.label }}
        </a>
      </div>
      </div>
    </div>
  </section>

  <!-- Über mich / Kurzbio -->
  <section id="about" class="section">
    <SectionArt motif="about" side="right" />
    <div v-reveal class="wrap reveal">
      <p class="section__label">{{ t('about.title') }}</p>
      <p v-mark-view class="lead" v-html="mark('about.body')"></p>

      <h2 class="sub">{{ t('about.valuesTitle') }}</h2>
      <ul class="values">
        <li v-for="(v, i) in aboutValues" :key="i">{{ v }}</li>
      </ul>
    </div>
  </section>

  <!-- Wie ich arbeite -->
  <section id="approach" class="section">
    <SectionArt motif="approach" side="left" />
    <div v-reveal class="wrap reveal">
      <p class="section__label">{{ t('approach.title') }}</p>
      <p v-mark-view class="lead" v-html="mark('approach.lead')"></p>

      <div class="grid grid--cards">
        <article v-for="(c, i) in approachItems" :key="i" class="feature">
          <span class="feature__num">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="feature__title">{{ c.title }}</h3>
          <p class="feature__desc">{{ c.desc }}</p>
        </article>
      </div>

      <div class="cta-inline">
        <span class="cta-inline__note">{{ t('approach.ctaNote') }}</span>
        <a href="#contact" class="btn btn--solid" @click.prevent="focusContact">{{ t('approach.ctaButton') }}</a>
      </div>
    </div>
  </section>

  <!-- Tech -->
  <section id="tech" class="section">
    <SectionArt motif="tech" side="right" />
    <div v-reveal class="wrap reveal">
      <p class="section__label">{{ t('tech.title') }}</p>
      <p class="muted">{{ t('tech.note') }}</p>
      <ul class="tags tags--tech">
        <li v-for="tech in profile.tech" :key="tech">
          <span class="tag-ico"><TechIcon :name="tech" /></span>
          {{ tech }}
        </li>
      </ul>
    </div>
  </section>

  <!-- KI – bewusst gebaut -->
  <section id="ai" class="section">
    <SectionArt motif="ai" side="left" />
    <div v-reveal class="wrap reveal">
      <p class="section__label">{{ t('ai.title') }}</p>
      <p class="lead">{{ t('ai.body') }}</p>
      <ul class="tags">
        <li v-for="tag in aiTags" :key="tag">{{ tag }}</li>
      </ul>
      <p v-mark-view class="ai-note" v-html="mark('ai.note')"></p>
    </div>
  </section>

  <!-- Was ich verantworte -->
  <section id="experience" class="section">
    <SectionArt motif="experience" side="right" />
    <div v-reveal class="wrap reveal">
      <p class="section__label">{{ t('experience.title') }}</p>
      <p v-mark-view class="lead" v-html="mark('experience.lead')"></p>

      <ul class="stats">
        <li v-for="(s, i) in experienceStats" :key="i" class="stat">
          <span class="stat__value">{{ s.value }}</span>
          <span class="stat__label">{{ s.label }}</span>
        </li>
      </ul>

      <ul class="bullets">
        <li v-for="(item, i) in experienceItems" :key="i">{{ item }}</li>
      </ul>

      <h2 class="sub">{{ t('experience.educationTitle') }}</h2>
      <p class="muted">
        <strong>{{ t('experience.educationSchool') }}</strong> —
        {{ t('experience.educationDesc') }}
      </p>
    </div>
  </section>

  <!-- Projects -->
  <section id="projects" class="section">
    <SectionArt motif="projects" side="left" />
    <div v-reveal class="wrap reveal">
      <p class="section__label">{{ t('projects.title') }}</p>
      <p class="muted">{{ t('projects.note') }}</p>
      <div
        class="grid grid--projects"
        :class="{ 'has-open': openProject, 'is-collapsing': collapsing }"
      >
        <ProjectCard
          v-for="p in profile.projects"
          :key="p.slug"
          :project="p"
          :name="t(`projects.items.${p.slug}.name`)"
          :tagline="t(`projects.items.${p.slug}.tagline`)"
          :detail="t(`projects.items.${p.slug}.detail`)"
          :cta="t('projects.viewRepo')"
          :live-cta="t('projects.viewLive')"
          :expand-label="t('a11y.expand')"
          :open="openProject === p.slug"
          @toggle="toggleProject(p.slug)"
        />
      </div>
    </div>
  </section>

  <!-- Wissen weitergeben -->
  <section id="teaching" class="section">
    <SectionArt motif="teaching" side="right" />
    <div v-reveal class="wrap reveal">
      <p class="section__label">{{ t('teaching.title') }}</p>
      <p v-mark-view class="lead" v-html="mark('teaching.lead')"></p>
      <ul class="bullets">
        <li v-for="(item, i) in teachingItems" :key="i">{{ item }}</li>
      </ul>
      <div class="hero__cta">
        <a
          :href="profile.links.podcast"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn--ghost"
        >
          {{ t('teaching.podcast') }} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  </section>

  <!-- Was andere sagen -->
  <section id="voices" class="section">
    <SectionArt motif="voices" side="left" />
    <div v-reveal class="wrap reveal">
      <p class="section__label">{{ t('voices.title') }}</p>
      <div
        class="carousel"
        role="group"
        aria-roledescription="Karussell"
        :aria-label="t('voices.title')"
        @keydown.left="prevVoice"
        @keydown.right="nextVoice"
      >
        <div class="carousel__viewport">
          <div class="carousel__track" :style="voiceTrackStyle">
            <blockquote
              v-for="(q, i) in voices"
              :key="i"
              class="quote"
              :aria-hidden="i < voiceIndex || i >= voiceIndex + perView"
            >
              <span class="quote__mark" aria-hidden="true">“</span>
              <p class="quote__text">{{ q.text }}</p>
              <footer class="quote__source">— {{ q.source }}</footer>
            </blockquote>
          </div>
        </div>

        <div v-if="voicePages > 1" class="carousel__nav">
          <button
            type="button"
            class="carousel__arrow"
            :aria-label="t('voices.prev')"
            @click="prevVoice"
          >
            <svg
              class="carousel__icon"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path d="M15 5 8 12l7 7" />
            </svg>
          </button>
          <div class="carousel__dots" role="tablist">
            <button
              v-for="p in voicePages"
              :key="p"
              type="button"
              class="carousel__dot"
              :class="{ 'is-active': p - 1 === voiceIndex }"
              :aria-label="t('voices.goTo', { n: p })"
              :aria-selected="p - 1 === voiceIndex"
              @click="goToVoice(p - 1)"
            />
          </div>
          <button
            type="button"
            class="carousel__arrow"
            :aria-label="t('voices.next')"
            @click="nextVoice"
          >
            <svg
              class="carousel__icon"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path d="M9 5 16 12l-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact -->
  <section id="contact" class="section">
    <!-- Motiv bewusst tiefer, etwa auf Höhe des Formulars (Papierflieger schimmert
         hinter den Eingabefeldern durch). -->
    <SectionArt motif="contact" side="right" :style="{ '--art-y': 'clamp(26rem, 55vh, 42rem)' }" />
    <div v-reveal class="wrap reveal">
      <p class="section__label">{{ t('contact.title') }}</p>
      <p class="lead">{{ t('contact.body') }}</p>

      <ContactForm />

      <p class="contact__secondary">
        {{ t('contact.secondary') }}
        <a
          :href="profile.links.linkedin"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ t('contact.linkedin') }} <span aria-hidden="true">↗</span>
        </a>
      </p>

      <p class="section__label personal__label">{{ t('personal.title') }}</p>
      <ul class="hobbies">
        <li
          v-for="(item, i) in personalItems"
          :key="i"
          v-reveal
          class="hobby reveal draw"
        >
          <span class="hobby__art"><LineArt :name="hobbyIcons[i]" /></span>
          <span class="hobby__label">{{ item }}</span>
        </li>
      </ul>
    </div>
  </section>

  <footer class="footer">
    <div v-reveal class="wrap reveal">
      <span>© {{ profile.name }}</span>
      <span>{{ t('footer.built') }}</span>
    </div>
  </footer>

  <ContactFab />
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  overflow: hidden;
  padding-block: clamp(2.5rem, 8vw, 4rem) var(--gap);
}

/* Desktop: Hero oben bündig zur Sidebar-Überschrift, kompakt genug,
   dass CTAs und Links auf den ersten Blick sichtbar sind. */
@media (min-width: 1024px) {
  .hero {
    padding-block: 2.5rem clamp(3rem, 6vw, 4.5rem);
  }
}

/* Dezenter Code-Glyph als Hintergrund-Akzent */
.hero__accent {
  position: absolute;
  top: clamp(2rem, 8vw, 5rem);
  right: clamp(-2rem, -2vw, 1.5rem);
  width: clamp(120px, 22vw, 240px);
  aspect-ratio: 1;
  opacity: 0.07;
  pointer-events: none;

  :deep(.lineart) {
    stroke-width: 1;
  }
}

.hero__inner {
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  gap: clamp(1.75rem, 5vw, 3rem);
}

.hero__photo {
  margin: 0;
  flex-shrink: 0;
  width: clamp(180px, 46vw, 240px);
  aspect-ratio: 1;

  picture {
    display: block;
    width: 100%;
    height: 100%;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}


/* Das Porträt deckt sich beim Laden sanft von oben auf – Annäherung an die
   Line-Art-„Draw"-Animation. Ein Rasterbild kann nicht per stroke gezeichnet
   werden, daher eine weiche Masken-Enthüllung. Respektiert reduced-motion. */
@property --portrait-reveal {
  syntax: "<percentage>";
  initial-value: 100%;
  inherits: false;
}

@keyframes portrait-draw {
  from {
    --portrait-reveal: -18%;
  }
  to {
    --portrait-reveal: 100%;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .hero__photo img {
    -webkit-mask-image: linear-gradient(
      to bottom,
      #000 var(--portrait-reveal),
      transparent calc(var(--portrait-reveal) + 18%)
    );
    mask-image: linear-gradient(
      to bottom,
      #000 var(--portrait-reveal),
      transparent calc(var(--portrait-reveal) + 18%)
    );
    animation: portrait-draw 1.8s cubic-bezier(0.66, 0, 0.34, 1) var(--reveal-delay) both;
  }
}

.hero__text {
  min-width: 0;
}

@media (min-width: 620px) {
  .hero__inner {
    flex-direction: row;
    align-items: center;
  }

  .hero__photo {
    order: 2;
    width: clamp(220px, 26vw, 300px);
  }

  .hero__text {
    order: 1;
  }
}

.hero__name {
  font-size: clamp(2.6rem, 9vw, 4.2rem);
  margin-bottom: 0.6rem;
}

.hero__tagline {
  font-family: var(--serif);
  font-size: clamp(1.3rem, 4vw, 1.7rem);
  color: var(--text-soft);
  font-style: italic;
  margin-bottom: 1.5rem;
}

.hero__intro {
  max-width: 38ch;
  font-size: 1.08rem;
}

.hero__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 2rem;
}

.pill {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-size: 0.92rem;
  font-weight: 600;
  padding: 0.55rem 1.15rem;
  border-radius: 999px;
  border: 1px solid var(--accent);
  color: var(--accent);
  transition: background 0.15s ease, color 0.15s ease;
}

.pill:hover {
  background: var(--accent);
  color: var(--accent-ink);
}

/* Primärer / sekundärer Call-to-Action */
.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 2.25rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.98rem;
  padding: 0.7rem 1.4rem;
  border-radius: 10px;
  border: 1px solid var(--accent);
  transition: background 0.15s ease, color 0.15s ease, transform 0.15s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &--solid {
    background: var(--accent);
    color: var(--accent-ink);
    box-shadow: 0 10px 24px -16px var(--accent);
  }

  &--solid:hover {
    color: var(--accent-ink);
    background: color-mix(in srgb, var(--accent) 88%, #000);
  }

  &--ghost {
    color: var(--accent);
    background: transparent;
  }

  &--ghost:hover {
    color: var(--accent);
    background: var(--bg-soft);
  }
}

/* USP- / Soft-Skill-Karten. Doppelte Klasse (.grid.grid--cards), damit diese
   Spaltenangabe die generische .grid-Regel sicher übersteuert. */
.grid.grid--cards {
  /* Nie 3 + 1: nur 1 (4×1), 2 (2×2) oder 4 (1×4) Spalten. */
  grid-template-columns: 1fr;
  margin-top: 1.75rem;
}

/* Tablet: 2×2. */
@media (min-width: 560px) {
  .grid.grid--cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: die vier Arbeitsweise-Karten bewusst in einer Reihe. */
@media (min-width: 1024px) {
  .grid.grid--cards {
    grid-template-columns: repeat(4, 1fr);
  }
}

.feature {
  padding: 1.5rem 0 0;
  border-top: 2px solid var(--accent);
  /* Bewusst kein Hover/keine Klick-Anmutung – das sind Infos, kein CTA. */
}

.feature__num {
  display: block;
  font-family: var(--serif);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--accent);
  margin-bottom: 0.6rem;
}

.feature__title {
  font-size: 1.12rem;
  margin-bottom: 0.45rem;
}

.feature__desc {
  color: var(--text-soft);
  font-size: 0.95rem;
}

/* Zurückhaltender Zwischen-CTA */
.cta-inline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  margin-top: 2.25rem;
  padding: 1.4rem 1.6rem;
  background: var(--bg-soft);
  border: 1px solid var(--line);
  border-radius: 12px;
}

.cta-inline__note {
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.1rem;
  margin-right: auto;
}

/* Was andere sagen — Zitat-Carousel */
.carousel {
  margin-bottom: 1.25rem;
}

.carousel__viewport {
  overflow: hidden;
}

.carousel__track {
  /* Sichtbare Karten je Breakpoint (von JS via getComputedStyle gelesen). */
  --per-view: 1;
  display: flex;
  gap: 1rem; /* muss zur Schrittweite in voiceTrackStyle passen */
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

@media (min-width: 640px) {
  .carousel__track {
    --per-view: 2;
  }
}

@media (min-width: 1024px) {
  .carousel__track {
    --per-view: 3;
  }
}

.quote {
  position: relative;
  display: flex;
  flex-direction: column;
  /* Breite passend zu --per-view inkl. Gap-Abzug. */
  flex: 0 0 calc((100% - (var(--per-view) - 1) * 1rem) / var(--per-view));
  margin: 0;
  padding: 1.75rem 1.75rem 1.75rem 1.85rem;
  /* Leicht durchscheinend, damit das zentrierte Hintergrund-Motiv dezent
     hindurchschimmert, ohne vom Zitat abzulenken. */
  background: color-mix(in srgb, var(--surface) 68%, transparent);
  border: 1px solid var(--line);
  border-left: 2px solid var(--accent);
  border-radius: 12px;
}

/* Steuerleiste: Pfeile flankieren die Punkte. */
.carousel__nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  margin-top: 1.1rem;
}

.carousel__arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.1rem;
  height: 2.1rem;
  padding: 0;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: transparent;
  color: var(--text-soft);
  cursor: pointer;
  transition:
    color 0.2s ease,
    border-color 0.2s ease;
}

.carousel__arrow:hover {
  color: var(--accent);
  border-color: var(--accent);
}

.carousel__icon {
  width: 1.05rem;
  height: 1.05rem;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.carousel__dots {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.carousel__dot {
  width: 7px;
  height: 7px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: var(--line);
  cursor: pointer;
  transition:
    background 0.25s ease,
    transform 0.25s ease;
}

.carousel__dot:hover {
  background: var(--accent-soft);
}

.carousel__dot.is-active {
  background: var(--accent);
  transform: scale(1.35);
}

@media (prefers-reduced-motion: reduce) {
  .carousel__track {
    transition: none;
  }
}

.quote__mark {
  position: absolute;
  top: 0.1rem;
  left: 0.7rem;
  font-family: var(--serif);
  font-size: 2.4rem;
  line-height: 1;
  color: var(--accent);
  opacity: 0.4;
}

.quote__text {
  font-family: var(--serif);
  font-style: italic;
  font-size: 1rem;
  line-height: 1.55;
}

.quote__source {
  margin-top: auto;
  padding-top: 0.85rem;
  color: var(--text-soft);
  font-size: 0.85rem;
  letter-spacing: 0.02em;
}

.ai-note {
  margin-top: 1.25rem;
  font-family: var(--serif);
  font-style: italic;
  color: var(--text);
}

.lead {
  font-size: 1.14rem;
  max-width: 60ch;
}

.muted {
  color: var(--text-soft);
  max-width: 60ch;
}

/* Desktop: Auf der breiten, in der Viewport-Mitte zentrierten Spalte würde der
   auf 60ch begrenzte Fließtext linksbündig „verloren" wirken (großer Leerraum
   rechts). Hier füllt die Prosa die vorgegebene Spaltenbreite stärker aus, damit
   sie zu den ebenso breiten Karten-/Kennzahlen-Reihen passt. */
@media (min-width: 1024px) {
  .lead,
  .muted,
  .ai-note {
    max-width: 78ch;
  }
}

.sub {
  font-size: 1.15rem;
  margin-top: 2.4rem;
  margin-bottom: 0.9rem;

  &--lead {
    margin-top: 0;
  }
}

.values,
.bullets {
  display: grid;
  gap: 0.55rem;
}

.values li,
.bullets li {
  position: relative;
  padding-left: 1.4rem;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.62em;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
  }
}

.bullets {
  margin-top: 1rem;
}

/* Kennzahlen-Block */
.stats {
  display: grid;
  gap: 1rem;
  margin-top: 1.75rem;
  /* Nie 3 + 1: nur 1 (4×1), 2 (2×2) oder 4 (1×4) Spalten. */
  grid-template-columns: 1fr;
}

@media (min-width: 560px) {
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .stats {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stat {
  padding: 1.3rem 1.35rem;
  /* Durchscheinend, damit das zentrierte Hintergrund-Motiv dezent sichtbar ist. */
  background: color-mix(in srgb, var(--surface) 70%, transparent);
  border: 1px solid var(--line);
  border-top: 2px solid var(--accent);
  border-radius: 12px;
}

.stat__value {
  display: block;
  font-family: var(--serif);
  font-size: clamp(1.9rem, 5vw, 2.5rem);
  font-weight: 700;
  line-height: 1;
  color: var(--accent);
  margin-bottom: 0.5rem;
}

.stat__label {
  display: block;
  font-size: 0.9rem;
  line-height: 1.4;
  color: var(--text-soft);
  overflow-wrap: break-word;
  hyphens: auto;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.5rem;

  li {
    font-size: 0.85rem;
    padding: 0.35rem 0.85rem;
    border: 1px solid var(--line);
    border-radius: 8px;
    background: var(--surface);
  }

  &--tech li {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding-left: 0.6rem;
  }

  &--soft li {
    background: var(--bg-soft);
    border-radius: 999px;
  }
}

.tag-ico {
  display: block;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.grid {
  display: grid;
  gap: 1rem;
  margin-top: 1.75rem;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}

/* Projekte: nie 2 + 1. Unterhalb des Akkordeons (≥1350px) immer 1 Spalte (3×1),
   ab 1350px wird daraus das horizontale 1×3-Akkordeon (siehe unten). */
.grid--projects {
  grid-template-columns: 1fr;
}

/* Projekt-Raster auf breiten Viewports (ab ~1350px): horizontales Akkordeon in
   EINER Reihe. Die aktive Kachel weitet sich in der Breite aus (flex-grow), die
   übrigen schrumpfen zur Seite – kein Zeilensprung, kein reservierter Leerraum.
   Die Breitenänderung animiert rein über die flex-grow-Transition der .card
   (siehe ProjectCard), daher kein FLIP/Gewackel. align-items:flex-start →
   die geschlossenen Kacheln bleiben KLEIN (nur Kopfzeile); ausschließlich die
   geöffnete Kachel wächst vertikal. Die Höhe der offenen Kachel wächst monoton
   (erst Breite, dann Höhe via ProjectCard), daher kein „erst kleiner, dann
   größer". */
@media (min-width: 1350px) {
  .grid--projects {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }
}

.contact__secondary {
  margin-top: 1.5rem;
  color: var(--text-soft);
  font-size: 0.95rem;

  a {
    color: var(--accent);
    font-weight: 600;
    text-decoration: none;
  }
}

.personal__label {
  margin-top: 3rem;
}

.hobbies {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.hobby {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.85rem 1.2rem 0.85rem 0.95rem;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--surface);
}

.hobby__art {
  display: block;
  flex-shrink: 0;
  width: 34px;
  height: 34px;
}

.hobby__label {
  font-size: 0.95rem;
  font-weight: 500;
}

.footer {
  border-top: 1px solid var(--line);
  padding-block: 2.5rem;
  color: var(--text-soft);
  font-size: 0.85rem;

  .wrap {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}
</style>

<!-- Nicht-scoped: der globale [data-theme]-Vorfahre (am <html>) muss greifen.
     In scoped CSS verschluckt Vue den :global()-Kombinator. -->
<style lang="scss">
[data-theme='dark'] .hero__photo img {
  filter: invert(1);
}
</style>
