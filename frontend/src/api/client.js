// In local dev, Vite proxies '/api' to localhost:5000 (see vite.config.js),
// so no env var is needed. In production (deployed separately from the
// backend), set VITE_API_URL to your backend's real URL, e.g.
// https://your-backend.onrender.com/api
const BASE_URL = import.meta.env.VITE_API_URL || '/api'

// --- Auth token storage ---
export function getToken() {
  return localStorage.getItem('potion_token')
}
export function getStoredUsername() {
  return localStorage.getItem('potion_username')
}
export function setSession(token, username) {
  localStorage.setItem('potion_token', token)
  localStorage.setItem('potion_username', username)
}
export function clearSession() {
  localStorage.removeItem('potion_token')
  localStorage.removeItem('potion_username')
}

function authHeaders() {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// --- Auth ---
export async function register(username, email, password) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Registration failed')
  setSession(data.token, data.username)
  return data
}

export async function login(username, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Login failed')
  setSession(data.token, data.username)
  return data
}

export async function forgotPassword(email) {
  const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Something went wrong')
  return data
}

export async function resetPassword(token, password) {
  const res = await fetch(`${BASE_URL}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, password }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Something went wrong')
  return data
}

// --- Quotes ---
export async function fetchQuote({ mood, lang, excludeId }) {
  const params = new URLSearchParams({ mood, lang })
  if (excludeId) params.set('excludeId', excludeId)
  const res = await fetch(`${BASE_URL}/quotes/random?${params}`)
  if (!res.ok) throw new Error('Failed to fetch quote')
  return res.json()
}

// --- Favorites (require login) ---
export async function fetchFavorites() {
  const res = await fetch(`${BASE_URL}/favorites`, { headers: authHeaders() })
  if (!res.ok) throw new Error('Failed to fetch favorites')
  return res.json()
}

export async function addFavorite(quoteId) {
  const res = await fetch(`${BASE_URL}/favorites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ quoteId }),
  })
  if (!res.ok) throw new Error('Failed to save favorite')
  return res.json()
}

export async function removeFavorite(quoteId) {
  const res = await fetch(`${BASE_URL}/favorites/${quoteId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  if (!res.ok) throw new Error('Failed to remove favorite')
  return res.json()
}

// --- Suggestions (require login) ---
export async function submitSuggestion(text) {
  const res = await fetch(`${BASE_URL}/suggestions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ text }),
  })
  if (!res.ok) throw new Error('Failed to submit suggestion')
  return res.json()
}

export async function fetchMySuggestions() {
  const res = await fetch(`${BASE_URL}/suggestions/mine`, { headers: authHeaders() })
  if (!res.ok) throw new Error('Failed to fetch your archives')
  return res.json()
}

// --- Visits / streak (anonymous, device-based — unrelated to login) ---
function getDeviceId() {
  let id = localStorage.getItem('potion_device_id')
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem('potion_device_id', id)
  }
  return id
}

export async function recordVisit() {
  const res = await fetch(`${BASE_URL}/visits`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ deviceId: getDeviceId() }),
  })
  if (!res.ok) throw new Error('Failed to record visit')
  return res.json()
}

export async function fetchStreak() {
  const res = await fetch(`${BASE_URL}/visits/streak?deviceId=${getDeviceId()}`)
  if (!res.ok) throw new Error('Failed to fetch streak')
  return res.json()
}
