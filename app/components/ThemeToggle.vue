<script setup lang="ts">
const { t } = useI18n()
const { theme, toggle } = useTheme()
</script>

<template>
  <button
    type="button"
    class="theme"
    :aria-label="t('a11y.toggleTheme')"
    :aria-pressed="theme === 'dark'"
    @click="toggle"
  >
    <!-- Sonne (hell aktiv) / Mond (dunkel aktiv) -->
    <svg
      v-if="theme === 'dark'"
      class="theme__icon"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
      />
    </svg>
    <svg
      v-else
      class="theme__icon"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
    >
      <g
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path
          d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"
        />
      </g>
    </svg>
  </button>
</template>

<style scoped lang="scss">
.theme {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: transparent;
  color: var(--text-soft);
  cursor: pointer;
  transition: color 0.15s ease, border-color 0.15s ease;

  &:hover {
    color: var(--accent);
    border-color: var(--accent);
  }
}

.theme__icon {
  display: block;
}
</style>
