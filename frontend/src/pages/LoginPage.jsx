import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../context/useAuth.js'

function validateEmail(value) {
  return /\S+@\S+\.\S+/.test(value)
}

export function LoginPage() {
  const { login, error: authError, setError } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldError, setFieldError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setFieldError(null)
    setError(null)

    if (!validateEmail(email)) {
      setFieldError('Please enter a valid email address.')
      return
    }
    if (!password) {
      setFieldError('Password is required.')
      return
    }

    try {
      setSubmitting(true)
      await login(email, password)
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please check your credentials.'
      setFieldError(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-md fade-up">
      <div className="glass-card space-y-4 p-6 sm:p-7">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>
          <p className="mt-1 text-sm text-slate-600">Sign in to continue your execution workflow.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-xs font-semibold text-slate-600">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-soft"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-xs font-semibold text-slate-600">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-soft"
              placeholder="••••••••"
            />
          </div>

          {(fieldError || authError) && <p className="text-sm font-medium text-rose-600">{fieldError || authError}</p>}

          <button type="submit" disabled={submitting} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70">
            {submitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>

      <p className="mt-4 text-sm text-slate-600">
        Do not have an account?{' '}
        <Link to="/register" className="font-semibold text-sky-700 hover:text-sky-800">Create one now</Link>.
      </p>
    </div>
  )
}
