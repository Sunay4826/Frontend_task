import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { getTask, updateTask } from '../api/tasks.js'
import { TaskForm } from '../components/TaskForm.jsx'
import { EMPTY_TASK } from '../constants/tasks.js'

export function TaskEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [draft, setDraft] = useState(EMPTY_TASK)
  const [loading, setLoading] = useState(true)
  const [loadFailed, setLoadFailed] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadTask() {
      setLoading(true)
      setLoadFailed(false)
      setError(null)
      try {
        const task = await getTask(id)
        setDraft({
          title: task.title ?? '',
          description: task.description ?? '',
          status: task.status ?? 'todo',
          dueDate: task.dueDate ? task.dueDate.slice(0, 10) : '',
        })
      } catch (err) {
        const message = err.response?.data?.message || 'Unable to load task.'
        setLoadFailed(true)
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    loadTask()
  }, [id])

  function handleDraftChange(event) {
    const { name, value } = event.target
    setDraft((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)

    if (!draft.title.trim()) {
      setError('Title is required.')
      return
    }

    const payload = {
      title: draft.title.trim(),
      description: draft.description.trim() || undefined,
      status: draft.status,
      dueDate: draft.dueDate || undefined,
    }

    try {
      setSaving(true)
      await updateTask(id, payload)
      navigate('/tasks', { replace: true })
    } catch (err) {
      const message = err.response?.data?.message || 'Unable to save changes. Please try again.'
      setError(message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="glass-card fade-up mx-auto max-w-2xl space-y-4 p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-900">Edit Task</h1>
        <Link to="/tasks" className="btn-secondary">Back</Link>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Loading task...</p>
      ) : loadFailed ? (
        <p className="text-sm text-rose-600">{error}</p>
      ) : (
        <TaskForm
          draft={draft}
          onChange={handleDraftChange}
          onSubmit={handleSubmit}
          saving={saving}
          error={error}
          submitLabel="Save changes"
          onCancel={() => navigate('/tasks')}
        />
      )}
    </section>
  )
}
