import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../api'
import { PriorityBadge, StatusBadge, formatDate } from '../components/Badges'

export default function TicketList() {
  const navigate = useNavigate()
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.list()
      .then(setTickets)
      .catch((e) => setError(e.message || 'Could not load tickets.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <h1>Tickets</h1>

      {loading && <p className="muted">Loading tickets…</p>}
      {error && <p className="error" role="alert">Could not load tickets: {error}</p>}
      {!loading && !error && tickets.length === 0 && (
        <p className="muted">No tickets yet. Use the + button to add the first one.</p>
      )}

      {tickets.length > 0 && (
        <div className="card table-wrap">
          <table>
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Requester</th>
                <th>Subject</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id} className="row-link" onClick={() => navigate(`/tickets/${t.id}`)}>
                  <td><Link to={`/tickets/${t.id}`} onClick={(e) => e.stopPropagation()}>{t.ticket_number}</Link></td>
                  <td>{t.requester_name}</td>
                  <td>{t.subject}</td>
                  <td><PriorityBadge value={t.priority} /></td>
                  <td><StatusBadge value={t.status} /></td>
                  <td>{formatDate(t.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Link to="/tickets/new" className="fab" aria-label="Add ticket">+</Link>
    </>
  )
}
