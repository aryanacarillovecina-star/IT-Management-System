const KEY = 'helpdesk_auth'

export const isAuthed = () => localStorage.getItem(KEY) === '1'
export const logout = () => localStorage.removeItem(KEY)

// Hardcoded client-side credentials, as required by the brief
export function login(username, password) {
  if (username === 'itadmin' && password === 'helpdesk123') {
    localStorage.setItem(KEY, '1')
    return true
  }
  return false
}
