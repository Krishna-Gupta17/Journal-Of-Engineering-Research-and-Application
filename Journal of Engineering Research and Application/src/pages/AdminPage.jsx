import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import { useJournal } from '../context/JournalContext'

const MAX_PAPER_TITLE_LENGTH = 250
const MAX_PDF_SIZE = 5 * 1024 * 1024

const emptyVolumeForm = { volumeName: '' }
const emptyIssueForm = { volumeId: '', issueName: '' }
const emptyPaperForm = {
  volumeId: '',
  issueId: '',
  title: '',
  authorName: '',
  pdfFile: null,
}

function formatFileSize(size) {
  if (!size) {
    return '0 KB'
  }

  return `${Math.round((size / 1024) * 10) / 10} KB`
}

export default function AdminPage() {
  const { catalog, loading, error, addVolume, addIssue, addPaper, logoutAdmin } = useJournal()
  const [volumeForm, setVolumeForm] = useState(emptyVolumeForm)
  const [issueForm, setIssueForm] = useState(() => ({
    ...emptyIssueForm,
    volumeId: '',
  }))
  const [paperForm, setPaperForm] = useState(() => ({
    ...emptyPaperForm,
  }))
  const [feedback, setFeedback] = useState('')

  const defaultIssueVolumeId = catalog[0]?.id ?? ''
  const paperVolumeId = paperForm.volumeId || defaultIssueVolumeId
  const paperVolume = useMemo(
    () => catalog.find((volume) => volume.id === paperVolumeId),
    [catalog, paperVolumeId],
  )
  const defaultPaperIssueId = paperVolume?.issues[0]?.id ?? ''
  const issueVolumeId = issueForm.volumeId || defaultIssueVolumeId

  const paperIssue = useMemo(
    () => paperVolume?.issues.find((issue) => issue.id === (paperForm.issueId || defaultPaperIssueId)),
    [defaultPaperIssueId, paperForm.issueId, paperVolume],
  )

  const handleCreateVolume = async (event) => {
    event.preventDefault()
    const result = await addVolume(volumeForm.volumeName)

    if (result.ok) {
      setFeedback(`Created volume “${volumeForm.volumeName.trim()}”.`)
      setVolumeForm(emptyVolumeForm)
      return
    }

    if (result.message === 'Admin authentication required.' || result.message === 'Invalid or expired admin session.') {
      logoutAdmin()
    }

    setFeedback(result.message)
  }

  const handleCreateIssue = async (event) => {
    event.preventDefault()
    const result = await addIssue(issueForm.volumeId || issueVolumeId, issueForm.issueName)

    if (result.ok) {
      setFeedback(`Created issue “${issueForm.issueName.trim()}”.`)
      setIssueForm((currentForm) => ({
        ...currentForm,
        issueName: '',
      }))
      return
    }

    if (result.message === 'Admin authentication required.' || result.message === 'Invalid or expired admin session.') {
      logoutAdmin()
    }

    setFeedback(result.message)
  }

  const handleCreatePaper = async (event) => {
    event.preventDefault()
    const file = paperForm.pdfFile

    if (file && file.size > MAX_PDF_SIZE) {
      setFeedback('PDF must be 5 MB or smaller.')
      return
    }

    const result = await addPaper({
      volumeId: paperForm.volumeId || paperVolumeId,
      issueId: paperForm.issueId || defaultPaperIssueId,
      title: paperForm.title,
      authorName: paperForm.authorName,
      pdfFile: file,
    })

    if (result.ok) {
      setFeedback(`Uploaded paper “${paperForm.title.trim()}”.`)
      setPaperForm((currentForm) => ({
        ...currentForm,
        title: '',
        authorName: '',
        pdfFile: null,
      }))
      event.target.reset()
      return
    }

    if (result.message === 'Admin authentication required.' || result.message === 'Invalid or expired admin session.') {
      logoutAdmin()
    }

    setFeedback(result.message)
  }

  return (
    <>
      <PageHeader
        title="Admin Dashboard"
        subtitle="Create volumes, issues, and paper records from one place."
      />

      <section className="section admin-section">
        <div className="container admin-grid">
          <div className="admin-topbar">
            <button type="button" className="btn btn-outline" onClick={logoutAdmin}>
              Logout Admin
            </button>
          </div>

          {error ? (
            <div className="container admin-status-row">
              <p className="status-banner">Backend connection issue: {error}</p>
            </div>
          ) : null}

          <div className="admin-stack">
            <article className="auth-card">
              <p className="eyebrow">Create Volume</p>
              <h2>Volume Details</h2>
              <form className="form-grid" onSubmit={handleCreateVolume}>
                <label>
                  Volume Name
                  <input
                    type="text"
                    value={volumeForm.volumeName}
                    onChange={(event) => setVolumeForm({ volumeName: event.target.value })}
                    placeholder="Volume 3"
                  />
                </label>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    Save Volume
                  </button>
                </div>
              </form>
            </article>

            <article className="auth-card">
              <p className="eyebrow">Create Issue</p>
              <h2>Issue Details</h2>
              <form className="form-grid" onSubmit={handleCreateIssue}>
                <label>
                  Volume
                  <select
                    value={issueForm.volumeId || issueVolumeId}
                    onChange={(event) =>
                      setIssueForm((currentForm) => ({ ...currentForm, volumeId: event.target.value }))
                    }
                  >
                    {catalog.map((volume) => (
                      <option key={volume.id} value={volume.id}>
                        {volume.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Issue Name
                  <input
                    type="text"
                    value={issueForm.issueName}
                    onChange={(event) => setIssueForm({ ...issueForm, issueName: event.target.value })}
                    placeholder="Issue 4"
                  />
                </label>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    Save Issue
                  </button>
                </div>
              </form>
            </article>
          </div>

          <article className="auth-card admin-paper-card">
            <p className="eyebrow">Upload Paper</p>
            <h2>Paper Details</h2>
            <form className="form-grid" onSubmit={handleCreatePaper}>
              <label>
                Volume
                <select
                    value={paperForm.volumeId || paperVolumeId}
                    onChange={(event) =>
                      setPaperForm((currentForm) => ({
                        ...currentForm,
                        volumeId: event.target.value,
                        issueId: '',
                      }))
                    }
                >
                  {catalog.map((volume) => (
                    <option key={volume.id} value={volume.id}>
                      {volume.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Issue
                <select
                    value={paperForm.issueId || defaultPaperIssueId}
                    onChange={(event) =>
                      setPaperForm((currentForm) => ({ ...currentForm, issueId: event.target.value }))
                    }
                >
                  <option value="">Select an issue</option>
                    {paperVolume?.issues.map((issue) => (
                      <option key={issue.id} value={issue.id}>
                        {issue.name}
                      </option>
                    ))}
                </select>
              </label>

              <label>
                Paper Title
                <input
                  type="text"
                  value={paperForm.title}
                  onChange={(event) =>
                    setPaperForm((currentForm) => ({ ...currentForm, title: event.target.value }))
                  }
                  maxLength={MAX_PAPER_TITLE_LENGTH}
                  placeholder="Paper title"
                />
              </label>

              <label>
                Author&apos;s Name
                <input
                  type="text"
                  value={paperForm.authorName}
                  onChange={(event) =>
                    setPaperForm((currentForm) => ({ ...currentForm, authorName: event.target.value }))
                  }
                  placeholder="Author name"
                />
              </label>

              <label>
                Upload PDF
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(event) =>
                    setPaperForm((currentForm) => ({
                      ...currentForm,
                      pdfFile: event.target.files?.[0] ?? null,
                    }))
                  }
                />
              </label>

              <p className="input-help">
                PDF only. Maximum file size is 5 MB. Title limit is {MAX_PAPER_TITLE_LENGTH} characters.
              </p>

              {paperForm.pdfFile ? (
                <div className="upload-summary">
                  <strong>{paperForm.pdfFile.name}</strong>
                  <span>{formatFileSize(paperForm.pdfFile.size)}</span>
                </div>
              ) : null}

              {paperIssue ? (
                <p className="input-help">
                  Target issue: {paperVolume?.name} / {paperIssue.name}
                </p>
              ) : null}

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  Upload Paper
                </button>
              </div>
            </form>
          </article>
        </div>

        <div className="container admin-footer-note">
          <p className="status-banner">{feedback || 'Use this dashboard to maintain the journal catalog.'}</p>
        </div>
      </section>
    </>
  )
}
