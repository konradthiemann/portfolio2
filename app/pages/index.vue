<script setup lang="ts">
const { t, tm, rt } = useI18n()

// Array-Messages sicher als String-Liste auslesen.
const toList = (key: string) => (tm(key) as unknown[]).map((m) => rt(m as never))

const values = computed(() => toList('about.values'))
const experienceItems = computed(() => toList('experience.items'))
const personalItems = computed(() => toList('personal.items'))

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
  <section class="hero">
    <div class="wrap">
      <p class="hero__role">{{ t('hero.role') }}</p>
      <h1 class="hero__name">{{ profile.name }}</h1>
      <p class="hero__tagline">{{ t('hero.tagline') }}</p>
      <p class="hero__intro">{{ t('hero.intro') }}</p>

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
  </section>

  <!-- About -->
  <section id="about" class="section">
    <div class="wrap">
      <p class="section__label">{{ t('about.title') }}</p>
      <p class="lead">{{ t('about.body') }}</p>

      <h2 class="sub">{{ t('about.valuesTitle') }}</h2>
      <ul class="values">
        <li v-for="(v, i) in values" :key="i">{{ v }}</li>
      </ul>
    </div>
  </section>

  <!-- Experience -->
  <section id="experience" class="section">
    <div class="wrap">
      <p class="section__label">{{ t('experience.title') }}</p>
      <h2 class="sub sub--lead">{{ t('experience.roleTitle') }}</h2>
      <p class="muted">{{ t('experience.roleSummary') }}</p>
      <ul class="bullets">
        <li v-for="(item, i) in experienceItems" :key="i">{{ item }}</li>
      </ul>

      <h2 class="sub">{{ t('education.title') }}</h2>
      <p class="muted">
        <strong>{{ t('education.school') }}</strong> — {{ t('education.desc') }}
      </p>
    </div>
  </section>

  <!-- Tech -->
  <section id="tech" class="section">
    <div class="wrap">
      <p class="section__label">{{ t('tech.title') }}</p>
      <p class="muted">{{ t('tech.note') }}</p>
      <ul class="tags">
        <li v-for="tech in profile.tech" :key="tech">{{ tech }}</li>
      </ul>
    </div>
  </section>

  <!-- Projects -->
  <section id="projects" class="section">
    <div class="wrap">
      <p class="section__label">{{ t('projects.title') }}</p>
      <p class="muted">{{ t('projects.note') }}</p>
      <div class="grid">
        <ProjectCard
          v-for="p in profile.projects"
          :key="p.slug"
          :project="p"
          :name="t(`projects.items.${p.slug}.name`)"
          :desc="t(`projects.items.${p.slug}.desc`)"
          :cta="t('projects.viewRepo')"
        />
      </div>
    </div>
  </section>

  <!-- Contact -->
  <section id="contact" class="section">
    <div class="wrap">
      <p class="section__label">{{ t('contact.title') }}</p>
      <p class="lead">{{ t('contact.body') }}</p>
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

      <p class="section__label personal__label">{{ t('personal.title') }}</p>
      <ul class="tags tags--soft">
        <li v-for="(item, i) in personalItems" :key="i">{{ item }}</li>
      </ul>
    </div>
  </section>

  <footer class="footer">
    <div class="wrap">
      <span>© {{ profile.name }}</span>
      <span>{{ t('footer.built') }}</span>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.hero {
  padding-block: clamp(4rem, 14vw, 8rem) var(--gap);
}

.hero__role {
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.75rem;
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

.lead {
  font-size: 1.14rem;
  max-width: 60ch;
}

.muted {
  color: var(--text-soft);
  max-width: 60ch;
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

  &--soft li {
    background: var(--bg-soft);
    border-radius: 999px;
  }
}

.grid {
  display: grid;
  gap: 1rem;
  margin-top: 1.75rem;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}

.personal__label {
  margin-top: 3rem;
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
