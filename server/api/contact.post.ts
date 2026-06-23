import nodemailer from 'nodemailer'

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

  if (!config.smtpUser || !config.smtpPass) {
    console.error('[contact] SMTP-Zugangsdaten fehlen (NUXT_SMTP_USER / NUXT_SMTP_PASS).')
    throw createError({ statusCode: 500, statusMessage: 'mail_not_configured' })
  }

  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: Number(config.smtpPort),
    secure: Number(config.smtpPort) === 465,
    auth: { user: config.smtpUser, pass: config.smtpPass },
  })

  try {
    await transporter.sendMail({
      // Gmail verlangt, dass "from" der authentifizierte Account ist.
      from: `"Portfolio Kontakt" <${config.smtpUser}>`,
      to: config.contactTo,
      replyTo: `"${name}" <${email}>`,
      subject: `Portfolio-Kontakt von ${name}`,
      text: `Name: ${name}\nE-Mail: ${email}\n\n${message}`,
    })
  } catch (err) {
    console.error('[contact] Versand fehlgeschlagen:', err)
    throw createError({ statusCode: 502, statusMessage: 'mail_failed' })
  }

  return { ok: true }
})
