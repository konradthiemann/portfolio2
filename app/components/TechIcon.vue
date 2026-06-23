<script setup lang="ts">
// Dezente Outline-Icons für den Tech-Stack (kein gefülltes Logo-Wirrwarr).
// Einfarbig in der Akzentfarbe, im Monoline-Stil des Portfolios.
const props = defineProps<{ name: string }>()

// Tech-Name → stabiler Key (klein, ohne Sonderzeichen).
const key = computed(() =>
  props.name.toLowerCase().replace(/[^a-z0-9]/g, ''),
)
</script>

<template>
  <svg
    class="tech-ico"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <!-- Nuxt: Dreieck -->
    <template v-if="key === 'nuxt'">
      <path d="M12 4 21 20 H3 Z" />
    </template>

    <!-- Vue: Doppel-Chevron -->
    <template v-else-if="key === 'vue'">
      <path d="M3 5 12 19 21 5" />
      <path d="M8 5 12 12 16 5" />
    </template>

    <!-- Vite: Blitz -->
    <template v-else-if="key === 'vite'">
      <path d="M13 3 5 13 H10 L9 21 19 9 H13 Z" />
    </template>

    <!-- TypeScript: Badge -->
    <template v-else-if="key === 'typescript'">
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <text class="tech-ico__t" x="12" y="15.5">TS</text>
    </template>

    <!-- JavaScript: Badge -->
    <template v-else-if="key === 'javascript'">
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <text class="tech-ico__t" x="12" y="15.5">JS</text>
    </template>

    <!-- HTML: </> -->
    <template v-else-if="key === 'html'">
      <path d="M9.5 8 6 12 9.5 16" />
      <path d="M14.5 8 18 12 14.5 16" />
      <path d="M13 6 11 18" />
    </template>

    <!-- SCSS: { } -->
    <template v-else-if="key === 'scss'">
      <path d="M10 5 C7 5 8 11 4.5 12 C8 13 7 19 10 19" />
      <path d="M14 5 C17 5 16 11 19.5 12 C16 13 17 19 14 19" />
    </template>

    <!-- SQL: Badge -->
    <template v-else-if="key === 'sql'">
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <text class="tech-ico__t tech-ico__t--sm" x="12" y="15">SQL</text>
    </template>

    <!-- PostgreSQL: Datenbank-Zylinder -->
    <template v-else-if="key === 'postgresql'">
      <path d="M5 6 C5 4 19 4 19 6 V18 C19 20 5 20 5 18 Z" />
      <path d="M5 6 C5 8 19 8 19 6" />
    </template>

    <!-- Strapi: Ebenen / Würfel (CMS) -->
    <template v-else-if="key === 'strapi'">
      <path d="M12 4 20 8 12 12 4 8 Z" />
      <path d="M4 8 V12 L12 16 20 12 V8" />
      <path d="M12 12 V16" />
    </template>

    <!-- GitLab: Branch-Fork -->
    <template v-else-if="key === 'gitlab'">
      <circle cx="6" cy="5.5" r="2.2" />
      <circle cx="6" cy="18.5" r="2.2" />
      <circle cx="17" cy="9" r="2.2" />
      <path d="M6 7.7 V16.3" />
      <path d="M14.9 9.8 A8 8 0 0 1 8.1 12.6" />
    </template>

    <!-- GitHub: Branch-Merge -->
    <template v-else-if="key === 'github'">
      <circle cx="7" cy="6" r="2.2" />
      <circle cx="7" cy="18" r="2.2" />
      <circle cx="16" cy="6" r="2.2" />
      <path d="M7 8.2 V15.8" />
      <path d="M16 8.2 V11 a3 3 0 0 1 -3 3 H7" />
    </template>

    <!-- GitHub Copilot: 4-Punkt-Funke (KI) -->
    <template v-else-if="key === 'githubcopilot'">
      <path d="M12 4 C12 8 12 8 16 12 C12 16 12 16 12 20 C12 16 12 16 8 12 C12 8 12 8 12 4 Z" />
    </template>

    <!-- Claude Code: 8-Strahlen-Stern (KI) -->
    <template v-else-if="key === 'claudecode'">
      <path d="M12 3 V21 M3 12 H21 M5.5 5.5 18.5 18.5 M18.5 5.5 5.5 18.5" />
    </template>

    <!-- Railway: Gleise -->
    <template v-else-if="key === 'railway'">
      <path d="M8 3 V21 M16 3 V21 M6 7 H18 M6 12 H18 M6 17 H18" />
    </template>

    <!-- CI/CD: Pipeline-Schleife -->
    <template v-else-if="key === 'cicd'">
      <path d="M5 12 A7 7 0 0 1 17 7" />
      <path d="M19 12 A7 7 0 0 1 7 17" />
      <path d="M17 3 V7 H13" />
      <path d="M7 21 V17 H11" />
    </template>

    <!-- VS Code: Editor-Fenster -->
    <template v-else-if="key === 'vscode'">
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path d="M3.5 9 H20.5" />
      <path d="M8 13 6 15 8 17" />
      <path d="M11.5 17 H16" />
    </template>

    <!-- Jira: Kanban-Board -->
    <template v-else-if="key === 'jira'">
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path d="M9 4.5 V19.5" />
      <path d="M12 8.5 H17" />
      <path d="M12 12.5 H15" />
    </template>

    <!-- Miro: Vier Balken (m) -->
    <template v-else-if="key === 'miro'">
      <path d="M6 18 V8" />
      <path d="M10 18 V6" />
      <path d="M14 18 V7" />
      <path d="M18 18 V10" />
    </template>

    <!-- Java: Kaffeetasse mit Dampf -->
    <template v-else-if="key === 'java'">
      <path d="M5 9 H16 V13 a4 4 0 0 1 -4 4 H9 a4 4 0 0 1 -4 -4 Z" />
      <path d="M16 10 H17.5 a2.5 2.5 0 0 1 0 5 H16" />
      <path d="M8 6 C7 5 8 4 8 3 M11.5 6 C10.5 5 11.5 4 11.5 3" />
      <path d="M6 20 H15" />
    </template>

    <!-- Python: zwei verschränkte Hälften -->
    <template v-else-if="key === 'python'">
      <path d="M14 4 H9 a3 3 0 0 0 -3 3 V10 H15" />
      <path d="M10 20 H15 a3 3 0 0 0 3 -3 V14 H9" />
      <circle cx="10.5" cy="7" r="0.6" />
      <circle cx="13.5" cy="17" r="0.6" />
    </template>

    <!-- Fallback: Sechseck -->
    <template v-else>
      <path d="M12 3 19 7.5 V16.5 L12 21 5 16.5 V7.5 Z" />
    </template>
  </svg>
</template>

<style scoped lang="scss">
.tech-ico {
  display: block;
  width: 100%;
  height: 100%;
  color: var(--accent);

  &__t {
    fill: currentColor;
    stroke: none;
    font-family: var(--sans);
    font-weight: 700;
    font-size: 8px;
    text-anchor: middle;

    &--sm {
      font-size: 6px;
    }
  }
}
</style>
