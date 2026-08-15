import { Router } from 'express'
import Visit from '../models/Visit.js'

const router = Router()

function todayString() {
  return new Date().toISOString().slice(0, 10) // 'YYYY-MM-DD'
}

// POST /api/visits  { deviceId } — records today's visit (no-op if already recorded)
router.post('/', async (req, res) => {
  const { deviceId } = req.body
  if (!deviceId) return res.status(400).json({ error: 'deviceId is required' })

  try {
    await Visit.create({ deviceId, date: todayString() })
  } catch (err) {
    // duplicate key = already visited today, which is fine
    if (err.code !== 11000) {
      return res.status(500).json({ error: 'Could not record visit' })
    }
  }
  res.status(201).json({ recorded: true })
})

// GET /api/visits/streak?deviceId=xxx — current consecutive-day streak + total visits
router.get('/streak', async (req, res) => {
  const { deviceId } = req.query
  if (!deviceId) return res.status(400).json({ error: 'deviceId is required' })

  const visits = await Visit.find({ deviceId })
  const dateSet = new Set(visits.map((v) => v.date))

  // Count backward day by day from today. If today hasn't been visited yet,
  // start from yesterday instead so an in-progress streak isn't shown as 0
  // right before the user clicks the potion today.
  const cursor = new Date()
  if (!dateSet.has(cursor.toISOString().slice(0, 10))) {
    cursor.setDate(cursor.getDate() - 1)
  }

  let streak = 0
  while (dateSet.has(cursor.toISOString().slice(0, 10))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }

  res.json({ streak, totalVisits: dateSet.size })
})

export default router
