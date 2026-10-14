import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../api'
import TicketForm from '../components/TicketForm'

export default function EditTicket() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [ticket, setTicket] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get(id).then(setTicket).catch((e) => setError(e.message))
  }, [id])

  async function handleUpdate(values) {
    await api.update(id, values)
    navigate(`/tickets/${id}`)
  }

  if (error) return <p className="error" role="alert">Could not load ticket: {error}</p>
  if (!ticket) return <p className="muted">Loading ticket…</p>

  return (
    <>
      <h1>Edit {ticket.ticket_number}</h1>
      <TicketForm
        initial={ticket}
        showStatus
        submitLabel="Save changes"
        onSubmit={handleUpdate}
        onCancel={() => navigate(`/tickets/${id}`)}
      />
    </>
  )
}
