import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="section">
      <div className="container narrow not-found">
        <h1>Page Not Found</h1>
        <p>The page you requested is unavailable or moved.</p>
        <Link className="btn btn-primary" to="/">
          Back to Home
        </Link>
      </div>
    </section>
  )
}
