import { TASK_STATUSES } from '../constants/tasks.js'

export function TaskForm({
  draft,
  onChange,
  onSubmit,
  saving,
  error,
  submitLabel,
  onCancel,
  cancelLabel = 'Cancel',
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="mb-1 block text-xs font-semibold text-slate-600">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={draft.title}
          onChange={onChange}
          className="input-soft"
          placeholder="e.g. Review on-chain metrics for BTC"
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block text-xs font-semibold text-slate-600">Description</label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={draft.description}
          onChange={onChange}
          className="input-soft resize-none"
          placeholder="Optional details, links, or notes."
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="status" className="mb-1 block text-xs font-semibold text-slate-600">Status</label>
          <select id="status" name="status" value={draft.status} onChange={onChange} className="input-soft">
            {TASK_STATUSES.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="dueDate" className="mb-1 block text-xs font-semibold text-slate-600">Due date</label>
          <input id="dueDate" name="dueDate" type="date" value={draft.dueDate} onChange={onChange} className="input-soft" />
        </div>
      </div>

      {error && <p className="text-sm font-medium text-rose-600">{error}</p>}

      <div className="flex gap-2">
        <button type="submit" disabled={saving} className="btn-primary disabled:cursor-not-allowed disabled:opacity-70">
          {saving ? 'Saving...' : submitLabel}
        </button>

        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-secondary">
            {cancelLabel}
          </button>
        )}
      </div>
    </form>
  )
}
