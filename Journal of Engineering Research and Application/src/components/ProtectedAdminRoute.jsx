import { Navigate, useLocation } from 'react-router-dom'
import { useJournal } from '../context/JournalContext'

export default function ProtectedAdminRoute({ children }) {
  const { authLoading, isAdminAuthenticated } = useJournal()
  const location = useLocation()

  if (authLoading) {
    return (
      <section className="section">
        <div className="container narrow">
          <div className="auth-card">
            <h2>Checking Admin Session</h2>
            <p>Please wait while we verify admin access.</p>
          </div>
        </div>
      </section>
    )
  }

  if (!isAdminAuthenticated) {
    return <Navigate to="/adminj/login" state={{ from: location.pathname }} replace />
  }

  return children
}
