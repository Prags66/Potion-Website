import nodemailer from 'nodemailer'

let cachedTransporter = null

// Uses a real SMTP provider if configured (SMTP_HOST/SMTP_USER/SMTP_PASS in
// .env — e.g. Gmail with an app password). Otherwise, auto-creates a free
// Ethereal test inbox on first use so password-reset emails still work
// during local development without any setup.
//
// NOTE: this SMTP path only works on hosts that allow outbound SMTP traffic.
// Render's free tier (and several other free hosts) BLOCK outbound SMTP
// ports (25/465/587) entirely, so this path will hang/timeout in
// production there. See sendViaBrevo below for the production path, which
// uses HTTPS instead of SMTP and isn't blocked.
async function getTransporter() {
  if (cachedTransporter) return cachedTransporter

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    cachedTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
    console.log(`Mailer: using configured SMTP (${process.env.SMTP_HOST})`)
  } else {
    const testAccount = await nodemailer.createTestAccount()
    cachedTransporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: { user: testAccount.user, pass: testAccount.pass },
    })
    console.log('Mailer: no SMTP configured — using a free Ethereal test inbox for this session.')
  }

  return cachedTransporter
}

function buildResetEmailHtml(resetUrl) {
  return `
    <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; padding: 24px; background: #fff9ed; color: #1f1c0b;">
      <h2 style="font-style: italic; color: #655670;">Life's Potion Apothecary</h2>
      <p>A password reset was requested for your account.</p>
      <p><a href="${resetUrl}" style="display:inline-block; padding: 12px 24px; background: #655670; color: #fff; text-decoration: none; border-radius: 4px;">Reset your password</a></p>
      <p style="font-size: 13px; color: #4a454c;">This link expires in 1 hour. If you didn't request this, you can safely ignore this email.</p>
    </div>
  `
}

// Sends via Brevo's HTTPS API instead of SMTP, so it works on hosts (like
// Render's free tier) that block outbound SMTP ports. Used automatically
// whenever BREVO_API_KEY is set.
async function sendViaBrevo(toEmail, resetUrl) {
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'api-key': process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { email: process.env.BREVO_SENDER_EMAIL, name: "Life's Potion Apothecary" },
      to: [{ email: toEmail }],
      subject: "Reset your Life's Potion password",
      htmlContent: buildResetEmailHtml(resetUrl),
      textContent: `A password reset was requested for your account. Visit this link to choose a new password (valid for 1 hour): ${resetUrl}`,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Brevo send failed (${res.status}): ${body}`)
  }
  console.log(`Password reset email sent via Brevo to ${toEmail}`)
}

export async function sendPasswordResetEmail(toEmail, resetUrl) {
  // Production (Render free tier etc.) → use Brevo's HTTPS API.
  // Local dev (no BREVO_API_KEY set) → fall back to SMTP/Ethereal, since
  // your own machine doesn't have Render's port restriction.
  if (process.env.BREVO_API_KEY) {
    return sendViaBrevo(toEmail, resetUrl)
  }

  const transporter = await getTransporter()
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || '"Life\'s Potion Apothecary" <no-reply@lifespotion.local>',
    to: toEmail,
    subject: "Reset your Life's Potion password",
    text: `A password reset was requested for your account. Visit this link to choose a new password (valid for 1 hour): ${resetUrl}\n\nIf you didn't request this, you can ignore this email.`,
    html: buildResetEmailHtml(resetUrl),
  })

  const previewUrl = nodemailer.getTestMessageUrl(info)
  if (previewUrl) {
    console.log(`Password reset email preview (Ethereal test inbox): ${previewUrl}`)
  }
}
