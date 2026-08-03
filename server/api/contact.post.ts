// Kontaktformular-Versand via Resend (HTTPS-API).
// Railway blockiert ausgehendes SMTP auf Nicht-Pro-Plänen – die HTTPS-API
// funktioniert dagegen auf jedem Plan. Konfiguration in nuxt.config.ts /
// .env: NUXT_RESEND_API_KEY, NUXT_RESEND_FROM, NUXT_CONTACT_TO.

interface ContactBody {
  name?: string
  email?: string
  message?: string
  company?: string // Honeypot – muss leer bleiben
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactBody>(event)

  // Honeypot: füllt nur ein Bot aus → still als Erfolg quittieren.
  if (body.company) {
    return { ok: true }
  }

  const name = (body.name ?? '').trim()
  const email = (body.email ?? '').trim()
  const message = (body.message ?? '').trim()

  if (!name || name.length > 100) {
    throw createError({ statusCode: 422, statusMessage: 'invalid_name' })
  }
  if (!EMAIL_RE.test(email) || email.length > 200) {
    throw createError({ statusCode: 422, statusMessage: 'invalid_email' })
  }
  if (!message || message.length > 5000) {
    throw createError({ statusCode: 422, statusMessage: 'invalid_message' })
  }

  const config = useRuntimeConfig()

  if (!config.resendApiKey) {
    console.error('[contact] Resend-API-Key fehlt (NUXT_RESEND_API_KEY).')
    throw createError({ statusCode: 500, statusMessage: 'mail_not_configured' })
  }

  try {
    await $fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${config.resendApiKey}` },
      // Kurzer Timeout: bei Problemen schnell scheitern statt die Anfrage hängen zu lassen.
      timeout: 10000,
      body: {
        from: config.resendFrom,
        to: config.contactTo,
        reply_to: email,
        subject: `Portfolio-Kontakt von ${name}`,
        text: `Name: ${name}\nE-Mail: ${email}\n\n${message}`,
      },
    })
  } catch (err) {
    console.error('[contact] Versand via Resend fehlgeschlagen:', err)
    throw createError({ statusCode: 502, statusMessage: 'mail_failed' })
  }

  return { ok: true }
})
