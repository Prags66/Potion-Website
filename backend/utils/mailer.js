import nodemailer from 'nodemailer'

let cachedTransporter = null

// Uses a real SMTP provider if configured (SMTP_HOST/SMTP_USER/SMTP_PASS in
// .env — e.g. Gmail with an app password). Otherwise, auto-creates a free
// Ethereal test inbox on first use so password-reset emails still work
// during local development without any setup — each email logs a preview
// URL to the backend terminal instead of landing in a real inbox.
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
    console.log('  (Set SMTP_HOST/SMTP_USER/SMTP_PASS in .env to send real emails instead.)')
  }

  return cachedTransporter
}

export async function sendPasswordResetEmail(toEmail, resetUrl) {
  const transporter = await getTransporter()

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || '"Life\'s Potion Apothecary" <no-reply@lifespotion.local>',
    to: toEmail,
    subject: "Reset your Life's Potion password",
    text: `A password reset was requested for your account. Visit this link to choose a new password (valid for 1 hour): ${resetUrl}\n\nIf you didn't request this, you can ignore this email.`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; padding: 24px; background: #fff9ed; color: #1f1c0b;">
        <h2 style="font-style: italic; color: #655670;">Life's Potion Apothecary</h2>
        <p>A password reset was requested for your account.</p>
        <p><a href="${resetUrl}" style="display:inline-block; padding: 12px 24px; background: #655670; color: #fff; text-decoration: none; border-radius: 4px;">Reset your password</a></p>
        <p style="font-size: 13px; color: #4a454c;">This link expires in 1 hour. If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  })

  const previewUrl = nodemailer.getTestMessageUrl(info)
  if (previewUrl) {
    console.log(`Password reset email preview (Ethereal test inbox): ${previewUrl}`)
  }
}
