import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { deleteTask, listTasks } from '../api/tasks.js'
import { TaskList } from '../components/TaskList.jsx'

export function TasksPage() {
  const navigate = useNavigate()

  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function loadAllTasks() {
    setLoading(true)
    setError(null)
    try {
      const nextTasks = await listTasks()
      setTasks(nextTasks)
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to load tasks.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAllTasks()
  }, [])

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
        <h1 className="text-2xl font-bold text-slate-900">Task Board</h1>
        <div className="flex gap-2">
          <Link to="/tasks/new" className="btn-primary">+ New task</Link>
          <Link to="/tasks/search" className="btn-secondary">Search & filter</Link>
        </div>
      </div>

      {loading && <p className="text-sm text-slate-500">Loading tasks...</p>}
      {error && <p className="text-sm text-rose-600">{error}</p>}

      {!loading && (
        <TaskList
          tasks={tasks}
          onEdit={(task) => navigate(`/tasks/${task._id}/edit`)}
          onDelete={handleDelete}
        />
      )}
    </section>
  )
}
