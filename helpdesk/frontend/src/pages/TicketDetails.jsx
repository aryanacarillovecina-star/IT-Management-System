import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api } from '../api'
import { PriorityBadge, StatusBadge, formatDate } from '../components/Badges'

export default function TicketDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [ticket, setTicket] = useState(null)
  const [error, setError] = useState('')
  const [confirming, setConfirming] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  useEffect(() => {
    api.get(id).then(setTicket).catch((e) => setError(e.message || 'Could not load ticket.'))
  }, [id])

  async function handleDelete() {
    try {
      await api.remove(id)
      navigate('/tickets')
    } catch (e) {
      setDeleteError(e.message)
    }
  }

  if (error) return <p className="error" role="alert">Could not load ticket: {error}</p>
  if (!ticket) return <p className="muted">Loading ticket…</p>

  return (
    <>
      <button className="btn btn-ghost back" onClick={() => navigate('/tickets')}>Back</button>

      <div className="card details">
        <div className="details-head">
          <div>
            <p className="muted">{ticket.ticket_number}</p>
            <h1>{ticket.subject}</h1>
          </div>
          <div className="badges">
            <PriorityBadge value={ticket.priority} />
            <StatusBadge value={ticket.status} />
          </div>
        </div>

        <dl>
          <dt>Requester</dt><dd>{ticket.requester_name}</dd>
          <dt>Email</dt><dd>{ticket.requester_email}</dd>
          <dt>Category</dt><dd>{ticket.issue_category}</dd>
          <dt>Created</dt><dd>{formatDate(ticket.created_at)}</dd>
          <dt>Last updated</dt><dd>{formatDate(ticket.updated_at)}</dd>
        </dl>

        <h2>Description</h2>
        <p className="description">{ticket.description}</p>

        <div className="actions">
          {!confirming ? (
            <>
              <button className="btn btn-danger" onClick={() => setConfirming(true)}>Delete</button>
              <Link className="btn" to={`/tickets/${ticket.id}/edit`}>Edit ticket</Link>
            </>
          ) : (
            <>
              <span>Delete this ticket permanently?</span>
              <button className="btn btn-ghost" onClick={() => setConfirming(false)}>Keep ticket</button>
              <button className="btn btn-danger" onClick={handleDelete}>Yes, delete</button>
            </>
          )}
        </div>
        {deleteError && <p className="error" role="alert">{deleteError}</p>}
      </div>
    </>
  )
}
