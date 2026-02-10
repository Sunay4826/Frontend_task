import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../context/useAuth.js'
import { listTasks } from '../api/tasks.js'

export function DashboardPage() {
  const { user } = useAuth()

  const [totalTasks, setTotalTasks] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function refreshSummary() {
    setLoading(true)
    setError(null)
    try {
      const tasks = await listTasks()
      setTotalTasks(tasks.length)
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to load dashboard summary.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshSummary()
  }, [])

  return (
    <div className="space-y-6 fade-up">
      <section className="glass-card p-6 sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="mt-2 text-sm text-slate-600">
              Welcome back, <span className="font-semibold text-slate-800">{user?.name || 'trader'}</span>. Plan your next move using focused task routes.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link to="/tasks/new" className="btn-primary">+ New task</Link>
            <Link to="/tasks/search" className="btn-secondary">Search</Link>
            <Link to="/tasks" className="btn-secondary">All tasks</Link>
            <button type="button" onClick={refreshSummary} className="btn-secondary">Refresh</button>
          </div>
        </div>
      </section>

      <section className="glass-card p-5 fade-up stagger-1">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Total tasks</p>
        <p className="mt-2 text-4xl font-bold text-slate-900">{loading ? '...' : totalTasks}</p>
        {error && <p className="mt-3 text-sm font-medium text-rose-600">{error}</p>}
      </section>
    </div>
  )
}
