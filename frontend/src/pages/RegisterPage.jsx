import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../context/useAuth.js'

function validateEmail(value) {
  return /\S+@\S+\.\S+/.test(value)
}

export function RegisterPage() {
  const { register, setError, error: authError } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fieldError, setFieldError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setFieldError(null)
    setError(null)

    if (!name.trim() || name.trim().length < 2) {
      setFieldError('Please enter your full name (at least 2 characters).')
      return
    }
    if (!validateEmail(email)) {
      setFieldError('Please enter a valid email address.')
      return
    }
    if (password.length < 8) {
      setFieldError('Password must be at least 8 characters long.')
      return
    }
    if (password !== confirmPassword) {
      setFieldError('Passwords do not match.')
      return
    }

    try {
      setSubmitting(true)
      await register(name.trim(), email, password)
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed. Please try again.'
      setFieldError(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-md fade-up">
      <div className="glass-card space-y-4 p-6 sm:p-7">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Create account</h1>
          <p className="mt-1 text-sm text-slate-600">Start with a fresh workspace for your tasks.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-xs font-semibold text-slate-600">Full name</label>
            <input id="name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className="input-soft" placeholder="Satoshi Nakamoto" />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-xs font-semibold text-slate-600">Email</label>
            <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-soft" placeholder="you@example.com" />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-xs font-semibold text-slate-600">Password</label>
            <input id="password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-soft" placeholder="At least 8 characters" />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-1 block text-xs font-semibold text-slate-600">Confirm password</label>
            <input id="confirmPassword" type="password" autoComplete="new-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input-soft" placeholder="Repeat your password" />
          </div>

          {(fieldError || authError) && <p className="text-sm font-medium text-rose-600">{fieldError || authError}</p>}

          <button type="submit" disabled={submitting} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70">
            {submitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>
      </div>

      <p className="mt-4 text-sm text-slate-600">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-sky-700 hover:text-sky-800">Sign in</Link>.
      </p>
    </div>
  )
}
