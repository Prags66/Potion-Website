import jwt from 'jsonwebtoken'

// Reads the "Authorization: Bearer <token>" header, verifies it, and
// attaches req.userId + req.username for downstream routes to use.
export default function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null

  if (!token) {
    return res.status(401).json({ error: 'Not logged in' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = payload.userId
    req.username = payload.username
    next()
  } catch {
    res.status(401).json({ error: 'Invalid or expired session — please log in again' })
  }
}
