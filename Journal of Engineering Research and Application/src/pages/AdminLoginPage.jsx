import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { useJournal } from '../context/JournalContext'

export default function AdminLoginPage() {
  const { isAdminAuthenticated, authLoading, loginAdmin } = useJournal()
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [feedback, setFeedback] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const redirectTo = location.state?.from || '/adminj'

  if (!authLoading && isAdminAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setFeedback('')

    const result = await loginAdmin({ username, password })

    setSubmitting(false)

    if (result.ok) {
      navigate('/admin', { replace: true })
      return
    }

    setFeedback(result.message)
  }

  return (
    <>
      <PageHeader
        title="Admin Login"
        subtitle="Sign in with admin credentials to manage journal volumes, issues, and papers."
      />

      <section className="section">
        <div className="container narrow">
          <article className="auth-card">
            <form className="form-grid" onSubmit={handleSubmit}>
              <label>
                Username
                <input
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  autoComplete="username"
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                />
              </label>

              {feedback ? <p className="status-banner">{feedback}</p> : null}

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={submitting || authLoading}>
                  {submitting ? 'Signing In...' : 'Sign In'}
                </button>
              </div>
            </form>
          </article>
        </div>
      </section>
    </>
  )
}
