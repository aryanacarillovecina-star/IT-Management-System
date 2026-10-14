import { useState } from 'react'

export const CATEGORIES = ['Hardware', 'Software', 'Network', 'Account & Access', 'Email', 'Other']
export const PRIORITIES = ['Low', 'Medium', 'High', 'Critical']
export const STATUSES = ['Open', 'In Progress', 'Resolved', 'Closed']

const EMPTY = {
  requester_name: '',
  requester_email: '',
  issue_category: '',
  priority: '',
  subject: '',
  description: '',
  status: 'Open',
}

const LABELS = {
  requester_name: 'Requester name',
  requester_email: 'Requester email',
  issue_category: 'Issue category',
  priority: 'Priority',
  subject: 'Subject',
  description: 'Description',
}

function validate(values) {
  const errors = {}
  for (const key of Object.keys(LABELS)) {
    if (!String(values[key] ?? '').trim()) errors[key] = `${LABELS[key]} is required.`
  }
  if (values.requester_email && !/^\S+@\S+\.\S+$/.test(values.requester_email)) {
    errors.requester_email = 'Enter a valid email address.'
  }
  return errors
}

export default function TicketForm({ initial, onSubmit, submitLabel, onCancel, showStatus }) {
  const [values, setValues] = useState({ ...EMPTY, ...initial })
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [serverError, setServerError] = useState('')

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    setErrors((er) => ({ ...er, [key]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) return

    setSaving(true)
    setServerError('')
    try {
      await onSubmit(values)
    } catch (err) {
      const apiErrors = {}
      for (const [k, msgs] of Object.entries(err.errors || {})) apiErrors[k] = msgs[0]
      setErrors(apiErrors)
      setServerError(err.message)
      setSaving(false)
    }
  }

  // Plain render helper (not a component) so inputs keep focus while typing
  const field = (name, label, control) => (
    <label>
      {label}
      {control}
      {errors[name] && <span className="error">{errors[name]}</span>}
    </label>
  )

  return (
    <form className="card form" onSubmit={handleSubmit} noValidate>
      <div className="grid-2">
        {field('requester_name', LABELS.requester_name,
          <input value={values.requester_name} onChange={set('requester_name')} />)}
        {field('requester_email', LABELS.requester_email,
          <input type="email" value={values.requester_email} onChange={set('requester_email')} />)}
        {field('issue_category', LABELS.issue_category,
          <select value={values.issue_category} onChange={set('issue_category')}>
            <option value="">Select a category</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>)}
        {field('priority', LABELS.priority,
          <select value={values.priority} onChange={set('priority')}>
            <option value="">Select a priority</option>
            {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
          </select>)}
      </div>

      {field('subject', LABELS.subject,
        <input value={values.subject} onChange={set('subject')} />)}
      {field('description', LABELS.description,
        <textarea rows={6} value={values.description} onChange={set('description')} />)}

      {showStatus && field('status', 'Status',
        <select value={values.status} onChange={set('status')}>
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>)}

      {serverError && <p className="error" role="alert">{serverError}</p>}

      <div className="actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
        <button className="btn" disabled={saving}>{saving ? 'Saving…' : submitLabel}</button>
      </div>
    </form>
  )
}
