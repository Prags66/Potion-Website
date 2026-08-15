import { Router } from 'express'
import Favorite from '../models/Favorite.js'
import requireAuth from '../middleware/requireAuth.js'

const router = Router()

// GET /api/favorites — this user's saved quotes (requires login)
router.get('/', requireAuth, async (req, res) => {
  const favorites = await Favorite.find({ user: req.userId }).populate('quote')
  // A favorite can end up pointing at a deleted quote (e.g. after re-seeding
  // the database) — filter those out instead of sending null entries.
  res.json(favorites.filter((f) => f.quote).map((f) => f.quote))
})

// POST /api/favorites  { quoteId }
router.post('/', requireAuth, async (req, res) => {
  const { quoteId } = req.body
  if (!quoteId) return res.status(400).json({ error: 'quoteId is required' })

  try {
    const favorite = await Favorite.create({ quote: quoteId, user: req.userId })
    res.status(201).json(favorite)
  } catch (err) {
    if (err.code === 11000) {
      return res.status(200).json({ message: 'Already favorited' })
    }
    res.status(500).json({ error: 'Could not save favorite' })
  }
})

// DELETE /api/favorites/:quoteId
router.delete('/:quoteId', requireAuth, async (req, res) => {
  await Favorite.deleteOne({ user: req.userId, quote: req.params.quoteId })
  res.json({ removed: true })
})

export default router
