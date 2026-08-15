import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'

import quotesRouter from './routes/quotes.js'
import favoritesRouter from './routes/favorites.js'
import suggestionsRouter from './routes/suggestions.js'
import visitsRouter from './routes/visits.js'
import authRouter from './routes/auth.js'

const app = express()

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json())

// Limits brute-force login/register attempts: 20 requests per 15 minutes per IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: 'Too many attempts — please wait a few minutes and try again.' },
  standardHeaders: true,
  legacyHeaders: false,
})

app.use('/api/quotes', quotesRouter)
app.use('/api/favorites', favoritesRouter)
app.use('/api/suggestions', suggestionsRouter)
app.use('/api/visits', visitsRouter)
app.use('/api/auth', authLimiter, authRouter)

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

// Safety net: catches any unhandled error from a route and returns real
// JSON instead of letting the connection die (which is what caused the
// "Unexpected end of JSON input" error on the frontend).
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Something went wrong on the server. Check this terminal for details.' })
})

export default app
