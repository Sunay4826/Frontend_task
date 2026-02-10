import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { createTask } from '../api/tasks.js'
import { TaskForm } from '../components/TaskForm.jsx'
import { EMPTY_TASK } from '../constants/tasks.js'

export function TaskCreatePage() {
  const navigate = useNavigate()

  const [draft, setDraft] = useState(EMPTY_TASK)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

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
      await createTask(payload)
      navigate('/tasks', { replace: true })
    } catch (err) {
      const message = err.response?.data?.message || 'Unable to create task. Please try again.'
      setError(message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="glass-card fade-up mx-auto max-w-2xl space-y-4 p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-900">Create Task</h1>
        <Link to="/dashboard" className="btn-secondary">Back</Link>
      </div>

      <TaskForm
        draft={draft}
        onChange={handleDraftChange}
        onSubmit={handleSubmit}
        saving={saving}
        error={error}
        submitLabel="Create task"
        onCancel={() => navigate('/tasks')}
      />
    </section>
  )
}
