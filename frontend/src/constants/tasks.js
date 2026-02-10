export const STATUS_OPTIONS = [
  { value: '', label: 'All statuses' },
  { value: 'todo', label: 'To do' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'done', label: 'Done' },
]

export const TASK_STATUSES = STATUS_OPTIONS.filter((opt) => opt.value)

export const EMPTY_TASK = {
  title: '',
  description: '',
  status: 'todo',
  dueDate: '',
}
