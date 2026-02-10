import { Link } from 'react-router-dom'

import { useAuth } from '../context/useAuth.js'

export function HomePage() {
  const { isAuthenticated } = useAuth()

  return (
    <section className="glass-card fade-up p-8 sm:p-10">
      <div className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-sky-700">
        AI Task Studio
      </div>

      <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
        Build your trading workflow with a smarter, cleaner dashboard.
      </h1>

      <p className="mt-4 max-w-2xl text-base text-slate-600">
        Create tasks, filter them by intent, and track your execution rhythm with focused pages and fast interactions.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        {isAuthenticated ? (
          <Link to="/dashboard" className="btn-primary">
            Open dashboard
          </Link>
        ) : (
          <>
            <Link to="/login" className="btn-primary">
              Login
            </Link>
            <Link to="/register" className="btn-secondary">
              Create account
            </Link>
          </>
        )}
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
          <p className="text-xs font-semibold text-slate-500">Dedicated routes</p>
          <p className="mt-1 text-sm font-semibold text-slate-800">Create, search, list, and edit</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
          <p className="text-xs font-semibold text-slate-500">Fast interactions</p>
          <p className="mt-1 text-sm font-semibold text-slate-800">Animated cards and responsive controls</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
          <p className="text-xs font-semibold text-slate-500">Clear overview</p>
          <p className="mt-1 text-sm font-semibold text-slate-800">Dashboard summary with action shortcuts</p>
        </div>
      </div>
    </section>
  )
}
