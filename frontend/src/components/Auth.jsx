// Login / Register / Forgot-password screen. Not from a Stitch export —
// styled to match the same parchment/vintage aesthetic by hand.

import { useState } from 'react'
import { forgotPassword } from '../api/client.js'

export default function Auth({ onLogin, onRegister, onBack }) {
  const [mode, setMode] = useState('login') // 'login' | 'register' | 'forgot'
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  function switchMode(next) {
    setMode(next)
    setError('')
    setMessage('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)
    try {
      if (mode === 'login') {
        await onLogin(username.trim(), password)
      } else if (mode === 'register') {
        await onRegister(username.trim(), email.trim(), password)
      } else if (mode === 'forgot') {
        const data = await forgotPassword(email.trim())
        setMessage(data.message)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const titles = {
    login: 'Welcome Back, Alchemist',
    register: 'Join the Apothecary',
    forgot: 'Recover Your Potion',
  }
  const subtitles = {
    login: 'Sign in to see your saved quotes and leave suggestions.',
    register: 'Create an account to save quotes to your grimoire and leave notes for the apothecary.',
    forgot: "Enter the email tied to your account, and we'll send a link to reset your password.",
  }

  return (
    <div className="parchment-bg text-on-background font-body-lg min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-margin-mobile">
      <div className="absolute inset-0 z-0 burnt-edges"></div>
      <div className="absolute inset-0 z-0 paper-grain"></div>

      <div className="relative z-10 w-full max-w-md journal-card p-10">
        <button
          type="button"
          onClick={onBack}
          className="font-label-caps text-label-caps text-[#4a2e1b] opacity-70 hover:opacity-100 mb-6 bg-transparent"
        >
          ← back to the potion
        </button>

        <h1 className="font-display-lg-mobile text-[#4a2e1b] italic mb-2">{titles[mode]}</h1>
        <p className="font-body-sm text-on-surface-variant mb-8">{subtitles[mode]}</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {mode !== 'forgot' && (
            <div className="flex flex-col gap-1">
              <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="username">Your Moniker</label>
              <input
                id="username"
                className="input-line font-body-lg py-1"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={3}
                placeholder="e.g., A Wandering Alchemist"
              />
            </div>
          )}

          {(mode === 'register' || mode === 'forgot') && (
            <div className="flex flex-col gap-1">
              <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="email">Email</label>
              <input
                id="email"
                className="input-line font-body-lg py-1"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
              />
            </div>
          )}

          {mode !== 'forgot' && (
            <div className="flex flex-col gap-1">
              <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="password">Password</label>
              <input
                id="password"
                className="input-line font-body-lg py-1"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
          )}

          {error && <p className="text-error font-body-sm">{error}</p>}
          {message && <p className="text-tertiary font-body-sm">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 px-8 py-3 bg-primary text-on-primary font-label-caps text-label-caps rounded uppercase tracking-widest hover:bg-primary-container transition-colors disabled:opacity-60"
          >
            {loading ? 'Please wait…' : mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-6 flex flex-col gap-2">
          {mode === 'login' && (
            <>
              <button type="button" onClick={() => switchMode('register')} className="font-body-sm text-tertiary underline bg-transparent text-left">
                Don't have an account? Register
              </button>
              <button type="button" onClick={() => switchMode('forgot')} className="font-body-sm text-tertiary underline bg-transparent text-left">
                Forgot your password?
              </button>
            </>
          )}
          {mode === 'register' && (
            <button type="button" onClick={() => switchMode('login')} className="font-body-sm text-tertiary underline bg-transparent text-left">
              Already have an account? Sign in
            </button>
          )}
          {mode === 'forgot' && (
            <button type="button" onClick={() => switchMode('login')} className="font-body-sm text-tertiary underline bg-transparent text-left">
              ← Back to sign in
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
