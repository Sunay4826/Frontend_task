import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { deleteTask, listTasks } from '../api/tasks.js'
import { TaskList } from '../components/TaskList.jsx'
import { STATUS_OPTIONS } from '../constants/tasks.js'

export function TaskSearchPage() {
  const navigate = useNavigate()

  const [filters, setFilters] = useState({ search: '', status: '' })
  const [tasks, setTasks] = useState([])
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleFilterChange(event) {
    const { name, value } = event.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  async function applyFilters(event) {
    event.preventDefault()
    setError(null)
    try {
      setLoading(true)
      const nextTasks = await listTasks(filters)
      setTasks(nextTasks)
      setSearched(true)
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to search tasks.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(task) {
    if (!window.confirm('Delete this task permanently?')) return

    try {
      await deleteTask(task._id)
      setTasks((prev) => prev.filter((t) => t._id !== task._id))
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete task.'
      setError(message)
    }
  }

  return (
    <section className="glass-card fade-up space-y-4 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-900">Search & Filter</h1>
        <div className="flex gap-2">
          <Link to="/tasks/new" className="btn-primary">+ New task</Link>
          <Link to="/tasks" className="btn-secondary">All tasks</Link>
        </div>
      </div>

      <form onSubmit={applyFilters} className="grid gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 sm:grid-cols-[1fr,180px,auto] sm:items-end">
        <div>
          <label htmlFor="search" className="mb-1 block text-xs font-semibold text-slate-600">Search</label>
          <input
            id="search"
            name="search"
            type="text"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Title or description"
            className="input-soft"
          />
        </div>

        <div>
          <label htmlFor="status" className="mb-1 block text-xs font-semibold text-slate-600">Status</label>
          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="input-soft"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button type="submit" className="btn-primary">Apply</button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              setFilters({ search: '', status: '' })
              setTasks([])
              setSearched(false)
              setError(null)
            }}
          >
            Clear
          </button>
        </div>
      </form>

      {loading && <p className="text-sm text-slate-500">Searching...</p>}
      {error && <p className="text-sm text-rose-600">{error}</p>}

      {!loading && searched && (
        <TaskList
          tasks={tasks}
          onEdit={(task) => navigate(`/tasks/${task._id}/edit`)}
          onDelete={handleDelete}
        />
      )}
    </section>
  )
}
