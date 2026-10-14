import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../auth'

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!username.trim() || !password) {
      setError('Enter both username and password.')
      return
    }
    if (login(username.trim(), password)) {
      navigate('/tickets', { replace: true })
    } else {
      setError('Incorrect username or password.')
    }
  }

  return (
    <div className="login-wrap">
      <form className="card login-card" onSubmit={handleSubmit} noValidate>
        <h1>Sign in to IT Helpdesk</h1>
        <p className="muted">For IT support technicians and system administrators.</p>

        <label>
          Username
          <input value={username} onChange={(e) => setUsername(e.target.value)} autoFocus />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        {error && <p className="error" role="alert">{error}</p>}

        <button className="btn" type="submit">Sign in</button>
      </form>
    </div>
  )
}
