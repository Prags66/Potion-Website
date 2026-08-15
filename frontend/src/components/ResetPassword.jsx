// The page a user lands on after clicking the reset link in their email.
// Reads ?token=... from the URL and lets them set a new password.

import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { resetPassword } from '../api/client.js'

export default function ResetPassword({ onDone }) {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (password !== confirm) {
      setError("Passwords don't match")
      return
    }
    setLoading(true)
    try {
      await resetPassword(token, password)
      setDone(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="parchment-bg text-on-background font-body-lg min-h-screen flex flex-col items-center justify-center px-margin-mobile">
        <div className="journal-card p-10 max-w-md w-full text-center">
          <h1 className="font-display-lg-mobile text-[#4a2e1b] italic mb-4">Missing Reset Link</h1>
          <p className="font-body-sm text-on-surface-variant mb-6">
            This page needs a reset token from your email link. Request a new one from the login screen.
          </p>
          <button type="button" onClick={onDone} className="font-label-caps text-label-caps text-tertiary underline bg-transparent">
            ← Back to login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="parchment-bg text-on-background font-body-lg min-h-screen flex flex-col items-center justify-center px-margin-mobile">
      <div className="journal-card p-10 max-w-md w-full">
        <h1 className="font-display-lg-mobile text-[#4a2e1b] italic mb-2">Choose a New Password</h1>

        {done ? (
          <>
            <p className="font-body-sm text-on-surface-variant mb-6">
              Your password has been updated. You can log in with it now.
            </p>
            <button
              type="button"
              onClick={onDone}
              className="px-8 py-3 bg-primary text-on-primary font-label-caps text-label-caps rounded uppercase tracking-widest hover:bg-primary-container transition-colors"
            >
              Go to Login
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6">
            <div className="flex flex-col gap-1">
              <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="password">New Password</label>
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
            <div className="flex flex-col gap-1">
              <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="confirm">Confirm Password</label>
              <input
                id="confirm"
                className="input-line font-body-lg py-1"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                minLength={6}
              />
            </div>

            {error && <p className="text-error font-body-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-primary text-on-primary font-label-caps text-label-caps rounded uppercase tracking-widest hover:bg-primary-container transition-colors disabled:opacity-60"
            >
              {loading ? 'Please wait…' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
