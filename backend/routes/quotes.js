import { Router } from 'express'
import Quote from '../models/Quote.js'

const router = Router()

// GET /api/quotes/random?mood=calm&lang=en&excludeId=<previous quote's id>
router.get('/random', async (req, res) => {
  const { mood, lang = 'en', excludeId } = req.query
  const filter = { lang }
  if (mood) filter.mood = mood

  // Try excluding the last quote shown, so brewing again doesn't repeat it —
  // but only if there's at least one other quote available for this
  // mood/language, otherwise fall back to allowing a repeat (better than
  // showing nothing).
  let effectiveFilter = filter
  if (excludeId) {
    const filterExcluding = { ...filter, _id: { $ne: excludeId } }
    const countExcluding = await Quote.countDocuments(filterExcluding)
    if (countExcluding > 0) {
      effectiveFilter = filterExcluding
    }
  }

  const count = await Quote.countDocuments(effectiveFilter)
  if (count === 0) {
    return res.status(404).json({ error: 'No quotes found for that mood/language yet' })
  }

  const randomIndex = Math.floor(Math.random() * count)
  const quote = await Quote.findOne(effectiveFilter).skip(randomIndex)
  res.json(quote)
})

// GET /api/quotes — list all (useful for admin/debugging)
router.get('/', async (req, res) => {
  const quotes = await Quote.find().sort({ createdAt: -1 })
  res.json(quotes)
})

// POST /api/quotes — add a new quote (e.g. from your Python bot's dataset)
router.post('/', async (req, res) => {
  const { text, mood, lang } = req.body
  if (!text || !mood) {
    return res.status(400).json({ error: 'text and mood are required' })
  }
  const quote = await Quote.create({ text, mood, lang })
  res.status(201).json(quote)
})

export default router
