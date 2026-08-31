<script setup lang="ts">
const { t, tm, rt } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('workflow.meta.title'),
  description: () => t('workflow.meta.description'),
  ogTitle: () => t('workflow.meta.title'),
  ogDescription: () => t('workflow.meta.description'),
})

// Generischer Resolver für verschachtelte i18n-Strukturen (Objekte/Arrays aus
// tm()), die an jedem String-Blatt rt() brauchen. Erspart eine eigene
// toX()-Hilfsfunktion pro Verschachtelungstiefe. String-Blätter kommen aus
// tm() nicht als reine Strings, sondern als vue-i18n-Resource-Nodes
// ({ type, loc, source, … }) – die MÜSSEN zuerst geprüft werden, sonst
// zerlegt der generische Objekt-Zweig sie fälschlich in ihre internen Felder.
const isMessageNode = (val: unknown): boolean =>
  !!val && typeof val === 'object' && 'type' in (val as object) && 'loc' in (val as object)

const resolveDeep = (val: unknown): unknown => {
  if (isMessageNode(val) || typeof val === 'function') return rt(val as never)
  if (Array.isArray(val)) return val.map(resolveDeep)
  if (val && typeof val === 'object') {
    return Object.fromEntries(
      Object.entries(val as Record<string, unknown>).map(([k, v]) => [k, resolveDeep(v)]),
    )
  }
  return val
}

interface Pillar {
  key: string
  title: string
  desc: string
  items: string[]
}
interface FlowStep {
  tag: string
  title: string
  desc: string
}

const pillars = computed(() => resolveDeep(tm('workflow.pillars.items')) as Pillar[])
const flowSteps = computed(() => resolveDeep(tm('workflow.flow.steps')) as FlowStep[])

const pillarIcons: Record<string, 'rules' | 'skills' | 'agents' | 'hooks'> = {
  rules: 'rules',
  skills: 'skills',
  agents: 'agents',
  hooks: 'hooks',
}

// Live-Dashboard-Link kommt aus derselben Projektliste wie die Projektkarte
// unten auf der Startseite — eine Quelle statt einer zweiten hartkodierten URL.
const dashboardUrl = profile.projects.find((p) => p.slug === 'aiinfra')?.liveUrl
</script>

<template>
  <section class="section workflow-hero">
    <div v-reveal class="wrap reveal">
      <a class="back-link" :href="localePath('index')">← {{ t('workflow.back') }}</a>
      <p class="section__label">{{ t('workflow.hero.label') }}</p>
      <h1 class="workflow-hero__tagline">{{ t('workflow.hero.tagline') }}</h1>
      <p class="lead">{{ t('workflow.hero.intro') }}</p>
      <div v-if="dashboardUrl" class="hero__cta">
        <a :href="dashboardUrl" target="_blank" rel="noopener noreferrer" class="btn btn--solid">
          {{ t('workflow.hero.dashboardCta') }} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  </section>

  <!-- Vier Bausteine -->
  <section class="section">
    <div v-reveal class="wrap reveal">
      <p class="section__label">{{ t('workflow.pillars.title') }}</p>
      <p class="muted">{{ t('workflow.pillars.lead') }}</p>

      <div class="pillars">
        <article v-for="p in pillars" :key="p.key" class="pillar">
          <span class="pillar__icon"><LineArt :name="pillarIcons[p.key]" /></span>
          <h2 class="pillar__title">{{ p.title }}</h2>
          <p class="pillar__desc">{{ p.desc }}</p>
          <ul class="pillar__items">
            <li v-for="(it, i) in p.items" :key="i">{{ it }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>

  <!-- Ablauf -->
  <section class="section">
    <div v-reveal class="wrap reveal">
      <p class="section__label">{{ t('workflow.flow.title') }}</p>
      <p class="muted">{{ t('workflow.flow.lead') }}</p>

      <ol class="flow">
        <li v-for="(step, i) in flowSteps" :key="i" class="flow__step">
          <span class="flow__num">{{ String(i + 1).padStart(2, '0') }}</span>
          <div class="flow__body">
            <span class="flow__tag">{{ step.tag }}</span>
            <h3 class="flow__title">{{ step.title }}</h3>
            <p class="flow__desc">{{ step.desc }}</p>
          </div>
        </li>
      </ol>

      <p class="muted flow__note">{{ t('workflow.flow.note') }}</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.workflow-hero {
  padding-block-start: clamp(2.5rem, 8vw, 4rem);
}

@media (min-width: 1024px) {
  .workflow-hero {
    padding-block-start: 2.5rem;
  }
}

.back-link {
  display: inline-block;
  margin-bottom: 1.75rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-soft);
  text-decoration: none;
}

.back-link:hover {
  color: var(--accent);
}

.workflow-hero__tagline {
  font-size: clamp(2rem, 6vw, 2.9rem);
  margin-bottom: 1.1rem;
  max-width: 20ch;
}

.lead {
  font-size: 1.14rem;
  max-width: 60ch;
}

.muted {
  color: var(--text-soft);
  max-width: 60ch;
}

@media (min-width: 1024px) {
  .lead,
  .muted {
    max-width: 78ch;
  }
}

.hero__cta {
  margin-top: 2.25rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
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
}

/* ── Vier Bausteine ─────────────────────────────────────── */
.pillars {
  display: grid;
  gap: 1.25rem;
  margin-top: 1.75rem;
  grid-template-columns: 1fr;
}

@media (min-width: 700px) {
  .pillars {
    grid-template-columns: repeat(2, 1fr);
  }
}

.pillar {
  padding: 1.6rem 1.75rem;
  background: var(--surface);
  border: 1px solid var(--line);
  border-top: 2px solid var(--accent);
  border-radius: 14px;
}

.pillar__icon {
  display: block;
  width: 26px;
  height: 26px;
  margin-bottom: 0.9rem;
}

.pillar__title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.pillar__desc {
  color: var(--text-soft);
  font-size: 0.95rem;
  margin-bottom: 1.1rem;
}

.pillar__items {
  display: grid;
  gap: 0.5rem;

  li {
    position: relative;
    padding-left: 1.3rem;
    font-size: 0.88rem;
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    color: var(--text);
    line-height: 1.5;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0.6em;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent);
    }
  }
}

/* ── Ablauf ─────────────────────────────────────────────── */
.flow {
  display: grid;
  gap: 0;
  margin-top: 2rem;
  max-width: 62rem;
}

.flow__step {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.25rem;
  padding-bottom: 2rem;
  padding-left: 0.1rem;
}

.flow__step:not(:last-child)::before {
  content: "";
  position: absolute;
  left: 1.05rem;
  top: 2.4rem;
  bottom: 0;
  width: 1px;
  background: var(--line);
}

.flow__num {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 50%;
  border: 1px solid var(--accent);
  color: var(--accent);
  font-family: var(--serif);
  font-size: 0.85rem;
  font-weight: 600;
  background: var(--bg);
}

.flow__tag {
  display: inline-block;
  font-size: 0.74rem;
  letter-spacing: 0.03em;
  font-weight: 600;
  color: var(--accent);
  background: var(--bg-soft);
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 0.2rem 0.7rem;
  margin-bottom: 0.55rem;
}

.flow__title {
  font-size: 1.1rem;
  margin-bottom: 0.4rem;
}

.flow__desc {
  color: var(--text-soft);
  font-size: 0.95rem;
  max-width: 56ch;
}

.flow__note {
  margin-top: 0.5rem;
  font-style: italic;
  font-family: var(--serif);
}
</style>
