const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    ...options,
  })
  if (res.status === 204) return null
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(data.message || `Request failed (${res.status})`)
    err.errors = data.errors || {}
    throw err
  }
  return data
}

export const api = {
  list: () => request('/tickets'),
  get: (id) => request(`/tickets/${id}`),
  create: (body) => request('/tickets', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) => request(`/tickets/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  remove: (id) => request(`/tickets/${id}`, { method: 'DELETE' }),
}
