import { Router } from 'express'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator'
import User from '../models/User.js'
import { sendPasswordResetEmail } from '../utils/mailer.js'

const router = Router()

function makeToken(user) {
  return jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

const usernameRule = body('username')
  .trim()
  .isLength({ min: 3, max: 30 })
  .withMessage('Moniker must be 3–30 characters')
  .matches(/^[a-zA-Z0-9 _-]+$/)
  .withMessage('Moniker can only contain letters, numbers, spaces, - and _')

const emailRule = body('email').trim().isEmail().withMessage('A valid email is required').normalizeEmail()

const passwordRule = body('password')
  .isLength({ min: 6 })
  .withMessage('Password must be at least 6 characters')

function handleValidation(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg })
  }
  next()
}

// POST /api/auth/register  { username, email, password }
router.post('/register', usernameRule, emailRule, passwordRule, handleValidation, async (req, res) => {
  try {
    const { username, email, password } = req.body

    const existingUsername = await User.findOne({ username })
    if (existingUsername) {
      return res.status(409).json({ error: 'That username is already taken' })
    }
    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
      return res.status(409).json({ error: 'An account with that email already exists' })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({ username, email, passwordHash })

    res.status(201).json({ token: makeToken(user), username: user.username })
  } catch (err) {
    console.error('Register error:', err.message)
    res.status(500).json({ error: 'Something went wrong creating your account. Check the backend terminal for details.' })
  }
})

// POST /api/auth/login  { username, password }
router.post(
  '/login',
  body('username').trim().notEmpty().withMessage('username is required'),
  body('password').notEmpty().withMessage('password is required'),
  handleValidation,
  async (req, res) => {
    try {
      const { username, password } = req.body

      const user = await User.findOne({ username })
      if (!user) {
        return res.status(401).json({ error: 'Incorrect username or password' })
      }

      const valid = await bcrypt.compare(password, user.passwordHash)
      if (!valid) {
        return res.status(401).json({ error: 'Incorrect username or password' })
      }

      res.json({ token: makeToken(user), username: user.username })
    } catch (err) {
      console.error('Login error:', err.message)
      res.status(500).json({ error: 'Something went wrong logging in. Check the backend terminal for details.' })
    }
  }
)

// POST /api/auth/forgot-password  { email }
// Always responds with the same generic message whether or not the email
// exists, so this endpoint can't be used to check which emails are registered.
router.post('/forgot-password', emailRule, handleValidation, async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })

    if (user) {
      const rawToken = crypto.randomBytes(32).toString('hex')
      user.resetTokenHash = crypto.createHash('sha256').update(rawToken).digest('hex')
      user.resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
      await user.save()

      const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173'
      const resetUrl = `${clientOrigin}/reset-password?token=${rawToken}`
      await sendPasswordResetEmail(user.email, resetUrl)
    }

    res.json({ message: 'If an account with that email exists, a reset link has been sent.' })
  } catch (err) {
    console.error('Forgot-password error:', err.message)
    res.status(500).json({ error: 'Something went wrong. Check the backend terminal for details.' })
  }
})

// POST /api/auth/reset-password  { token, password }
router.post('/reset-password', passwordRule, handleValidation, async (req, res) => {
  try {
    const { token, password } = req.body
    if (!token) return res.status(400).json({ error: 'Reset token is required' })

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({ resetTokenHash: tokenHash, resetTokenExpires: { $gt: new Date() } })

    if (!user) {
      return res.status(400).json({ error: 'That reset link is invalid or has expired — request a new one.' })
    }

    user.passwordHash = await bcrypt.hash(password, 10)
    user.resetTokenHash = null
    user.resetTokenExpires = null
    await user.save()

    res.json({ message: 'Password updated — you can now log in with your new password.' })
  } catch (err) {
    console.error('Reset-password error:', err.message)
    res.status(500).json({ error: 'Something went wrong. Check the backend terminal for details.' })
  }
})

export default router
