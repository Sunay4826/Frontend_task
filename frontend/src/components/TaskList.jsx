export function TaskList({ tasks, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return <p className="text-sm text-slate-500">No tasks found.</p>
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task, index) => (
        <li
          key={task._id}
          className="glass-card fade-up p-4"
          style={{ animationDelay: `${index * 45}ms` }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-base font-bold text-slate-900">{task.title}</p>
              {task.description && <p className="mt-1 text-sm text-slate-600">{task.description}</p>}
            </div>
            <span
              className={[
                'inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide',
                task.status === 'done'
                  ? 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200'
                  : task.status === 'in_progress'
                    ? 'bg-amber-100 text-amber-700 ring-1 ring-amber-200'
                    : 'bg-slate-100 text-slate-700 ring-1 ring-slate-200',
              ].join(' ')}
            >
              {task.status === 'in_progress' ? 'In progress' : task.status}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex gap-3">
              {task.dueDate && (
                <span>
                  Due{' '}
                  {new Date(task.dueDate).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              )}
              {task.updatedAt && (
                <span>
                  Updated{' '}
                  {new Date(task.updatedAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              )}
            </div>

            <div className="flex gap-2">
              <button type="button" onClick={() => onEdit(task)} className="btn-secondary !px-3 !py-1.5 !text-xs">
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(task)}
                className="inline-flex items-center justify-center rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
