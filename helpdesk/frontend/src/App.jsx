import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { isAuthed, logout } from './auth'
import Login from './pages/Login'
import TicketList from './pages/TicketList'
import AddTicket from './pages/AddTicket'
import TicketDetails from './pages/TicketDetails'
import EditTicket from './pages/EditTicket'

function ProtectedLayout() {
  const navigate = useNavigate()
  if (!isAuthed()) return <Navigate to="/login" replace />

  return (
    <>
      <header className="topbar">
        <strong>IT Helpdesk</strong>
        <button
          className="btn btn-ghost"
          onClick={() => {
            logout()
            navigate('/login')
          }}
        >
          Sign out
        </button>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={isAuthed() ? <Navigate to="/tickets" replace /> : <Login />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/tickets" element={<TicketList />} />
        <Route path="/tickets/new" element={<AddTicket />} />
        <Route path="/tickets/:id" element={<TicketDetails />} />
        <Route path="/tickets/:id/edit" element={<EditTicket />} />
      </Route>
      <Route path="*" element={<Navigate to="/tickets" replace />} />
    </Routes>
  )
}
