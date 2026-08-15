import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import Suggestion from '../models/Suggestion.js'
import requireAuth from '../middleware/requireAuth.js'

const router = Router()

// POST /api/suggestions  { text } — requires login, username comes from the token
router.post(
  '/',
  requireAuth,
  body('text').trim().isLength({ min: 1, max: 1000 }).withMessage('A message between 1 and 1000 characters is required'),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg })
    }

    const { text } = req.body
    const suggestion = await Suggestion.create({ text, user: req.userId, username: req.username })
    res.status(201).json(suggestion)
  }
)

// GET /api/suggestions/mine — only the logged-in user's own submitted suggestions
router.get('/mine', requireAuth, async (req, res) => {
  const suggestions = await Suggestion.find({ user: req.userId }).sort({ createdAt: -1 })
  res.json(suggestions)
})

// GET /api/suggestions — for your own review (all suggestions, any logged-in user can currently see this — consider restricting later)
router.get('/', requireAuth, async (req, res) => {
  const suggestions = await Suggestion.find().sort({ createdAt: -1 })
  res.json(suggestions)
})

export default router
