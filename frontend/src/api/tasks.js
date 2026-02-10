import { api } from './client.js'

export async function listTasks(params = {}) {
  const res = await api.get('/tasks', {
    params: {
      search: params.search || undefined,
      status: params.status || undefined,
    },
  })
  return res.data.tasks ?? []
}

export async function getTask(taskId) {
  const res = await api.get(`/tasks/${taskId}`)
  return res.data.task
}

export async function createTask(payload) {
  const res = await api.post('/tasks', payload)
  return res.data.task
}

export async function updateTask(taskId, payload) {
  const res = await api.put(`/tasks/${taskId}`, payload)
  return res.data.task
}

export async function deleteTask(taskId) {
  await api.delete(`/tasks/${taskId}`)
}
