<script setup lang="ts">
const { t } = useI18n()

const form = reactive({ name: '', email: '', message: '', company: '' })
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')

async function submit() {
  if (status.value === 'sending') return
  status.value = 'sending'
  try {
    await $fetch('/api/contact', { method: 'POST', body: { ...form } })
    status.value = 'success'
    form.name = ''
    form.email = ''
    form.message = ''
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <form class="cform" novalidate @submit.prevent="submit">
    <div class="cform__row">
      <label class="cform__field">
        <span class="cform__label">{{ t('contact.name') }}</span>
        <input
          id="contact-name"
          v-model="form.name"
          type="text"
          name="name"
          autocomplete="name"
          required
          maxlength="100"
        />
      </label>

      <label class="cform__field">
        <span class="cform__label">{{ t('contact.emailField') }}</span>
        <input
          v-model="form.email"
          type="email"
          name="email"
          autocomplete="email"
          required
          maxlength="200"
        />
      </label>
    </div>

    <label class="cform__field">
      <span class="cform__label">{{ t('contact.message') }}</span>
      <textarea
        v-model="form.message"
        name="message"
        rows="5"
        required
        maxlength="5000"
      />
    </label>

    <!-- Honeypot: für Menschen unsichtbar, hält Bots ab -->
    <div class="cform__hp" aria-hidden="true">
      <label>
        Company
        <input v-model="form.company" type="text" tabindex="-1" autocomplete="off" />
      </label>
    </div>

    <div class="cform__actions">
      <button
        type="submit"
        class="btn btn--solid"
        :disabled="status === 'sending'"
      >
        {{ status === 'sending' ? t('contact.sending') : t('contact.send') }}
      </button>
    </div>

    <p
      v-if="status === 'success' || status === 'error'"
      class="cform__status"
      :class="`cform__status--${status}`"
      role="status"
      aria-live="polite"
    >
      {{ status === 'success' ? t('contact.success') : t('contact.error') }}
    </p>
  </form>
</template>

<style scoped lang="scss">
.cform {
  margin-top: 1.5rem;
  max-width: 38rem;
  display: grid;
  gap: 1rem;
}

/* Desktop: Das Formular folgt der breiteren, zentrierten Spalte, statt schmal
   am linken Rand zu kleben. */
@media (min-width: 1024px) {
  .cform {
    max-width: 52rem;
  }
}

.cform__row {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;

  @media (min-width: 560px) {
    grid-template-columns: 1fr 1fr;
  }
}

.cform__field {
  display: grid;
  gap: 0.4rem;
}

.cform__label {
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--text-soft);
}

.cform input,
.cform textarea {
  width: 100%;
  font: inherit;
  font-size: 0.98rem;
  color: var(--text);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 0.7rem 0.9rem;
  transition: border-color 0.15s ease;

  &:focus {
    outline: none;
    border-color: var(--accent);
  }
}

.cform textarea {
  resize: vertical;
  min-height: 7rem;
}

.cform__hp {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.cform__actions {
  display: flex;
  margin-top: 0.25rem;
}

/* Senden-Button – eigenständig gestylt (globale .btn-Regeln sind scoped). */
.cform .btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font: inherit;
  font-weight: 600;
  font-size: 0.98rem;
  line-height: 1;
  padding: 0.8rem 1.6rem;
  border-radius: 10px;
  border: 1px solid var(--accent);
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, transform 0.15s ease,
    box-shadow 0.15s ease;
}

.cform .btn--solid {
  background: var(--accent);
  color: var(--accent-ink);
  box-shadow: 0 10px 24px -16px var(--accent);
}

.cform .btn--solid:hover:not([disabled]) {
  transform: translateY(-1px);
  background: color-mix(in srgb, var(--accent) 88%, #000);
}

.cform .btn[disabled] {
  opacity: 0.65;
  cursor: progress;
}

.cform__status {
  font-size: 0.95rem;

  &--success {
    color: var(--accent);
  }

  &--error {
    color: #c0392b;
  }
}
</style>
