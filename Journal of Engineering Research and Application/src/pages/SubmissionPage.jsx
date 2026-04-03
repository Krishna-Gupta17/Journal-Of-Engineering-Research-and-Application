import PageHeader from '../components/PageHeader'
import WorkflowTracker from '../components/WorkflowTracker'

export default function SubmissionPage() {
  return (
    <>
      <PageHeader
        title="Submission"
        subtitle="Create an account, upload your manuscript, and track every stage of review."
      />

      <section className="section">
        <div className="container submission-grid">
          <article className="auth-card" aria-labelledby="account-title">
            <h2 id="account-title">Login / Register</h2>
            <form className="form-grid" aria-label="Author account form">
              <label>
                Full Name
                <input type="text" name="name" autoComplete="name" placeholder="Enter full name" />
              </label>
              <label>
                Email
                <input type="email" name="email" autoComplete="email" placeholder="Enter email" />
              </label>
              <label>
                Password
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="Enter password"
                />
              </label>
              <label>
                Confirm Password
                <input
                  type="password"
                  name="confirmPassword"
                  autoComplete="new-password"
                  placeholder="Confirm password"
                />
              </label>

              <label>
                Upload Manuscript (Word/PDF)
                <input
                  type="file"
                  name="manuscript"
                  accept=".doc,.docx,.pdf"
                  aria-describedby="upload-note"
                />
              </label>
              <p id="upload-note" className="input-help">
                Frontend demo only. File is not uploaded to a backend server.
              </p>

              <div className="form-actions">
                <button type="button" className="btn btn-primary">
                  Register
                </button>
                <button type="button" className="btn btn-outline">
                  Login
                </button>
              </div>
            </form>
          </article>

          <article className="auth-card">
            <WorkflowTracker />
          </article>
        </div>
      </section>
    </>
  )
}
