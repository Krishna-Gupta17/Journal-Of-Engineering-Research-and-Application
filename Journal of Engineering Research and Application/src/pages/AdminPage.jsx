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
  const {
    catalog,
    loading,
    error,
    addVolume,
    addIssue,
    addPaper,
    removeVolume,
    removeIssue,
    removePaper,
    logoutAdmin,
  } = useJournal()
  const [volumeForm, setVolumeForm] = useState(emptyVolumeForm)
  const [issueForm, setIssueForm] = useState(() => ({
    ...emptyIssueForm,
    volumeId: '',
  }))
  const [paperForm, setPaperForm] = useState(() => ({
    ...emptyPaperForm,
  }))
  const [managerVolumeId, setManagerVolumeId] = useState('')
  const [managerIssueId, setManagerIssueId] = useState('')
  const [feedback, setFeedback] = useState('')
  const [busyDeleteKey, setBusyDeleteKey] = useState('')
  const [deleteDialog, setDeleteDialog] = useState(null)

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
  const managerVolume = useMemo(
    () => catalog.find((volume) => volume.id === managerVolumeId) ?? null,
    [catalog, managerVolumeId],
  )
  const managerIssue = useMemo(
    () => managerVolume?.issues.find((issue) => issue.id === managerIssueId) ?? null,
    [managerVolume, managerIssueId],
  )
  const showManagerVolumeBoxes = !managerVolume
  const showManagerIssueBoxes = Boolean(managerVolume) && !managerIssue
  const showManagerPapers = Boolean(managerIssue)
  const dialogDeleteKey = deleteDialog ? `${deleteDialog.type}:${deleteDialog.id}` : ''
  const isDialogBusy = dialogDeleteKey && busyDeleteKey === dialogDeleteKey

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

  const requestDelete = ({ type, id, name, volumeName }) => {
    if (!type || !id || !name) {
      return
    }

    const messageByType = {
      volume: `Delete ${name}? This will remove all associated issues and papers.`,
      issue: `Delete ${name} from ${volumeName}? All papers in this issue will be removed.`,
      paper: `Delete paper ${name}? This action cannot be undone.`,
    }

    const labelByType = {
      volume: 'Volume',
      issue: 'Issue',
      paper: 'Paper',
    }

    setDeleteDialog({
      type,
      id,
      name,
      entityLabel: labelByType[type],
      message: messageByType[type],
    })
  }

  const handleConfirmDelete = async () => {
    if (!deleteDialog) {
      return
    }

    const { type, id, name, entityLabel } = deleteDialog
    const deleteKey = `${type}:${id}`
    setBusyDeleteKey(deleteKey)

    let result
    if (type === 'volume') {
      result = await removeVolume(id)
    } else if (type === 'issue') {
      result = await removeIssue(id)
    } else {
      result = await removePaper(id)
    }

    setBusyDeleteKey('')

    if (result.ok) {
      setDeleteDialog(null)
      setFeedback(`Deleted ${entityLabel.toLowerCase()} “${name}”.`)
      return
    }

    if (result.message === 'Admin authentication required.' || result.message === 'Invalid or expired admin session.') {
      logoutAdmin()
      return
    }

    setDeleteDialog(null)
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

        <div className="container admin-catalog-manager-wrap">
          <article className="auth-card admin-catalog-manager">
            <p className="eyebrow">Catalog Manager</p>
            <h2>Volumes, Issues, and Papers</h2>

            {catalog.length ? (
              <div className="issues-flow-panel admin-showcase-flow">
                {showManagerVolumeBoxes ? (
                  <>
                    <div className="issues-grid compact-box-grid" role="list" aria-label="Catalog volumes">
                      {catalog.map((volume) => (
                        <button
                          key={volume.id}
                          type="button"
                          className="journal-card journal-card-button compact-choice-box"
                          onClick={() => {
                            setManagerVolumeId(volume.id)
                            setManagerIssueId('')
                          }}
                        >
                          <strong>{volume.name}</strong>
                        </button>
                      ))}
                    </div>
                  </>
                ) : null}

                {managerVolume ? (
                  <>
                    <button
                      type="button"
                      className="fake-dropdown-trigger"
                      onClick={() => {
                        setManagerVolumeId('')
                        setManagerIssueId('')
                      }}
                      aria-label="Change selected volume"
                    >
                      <span className="fake-dropdown-label">Volume</span>
                      <span className="fake-dropdown-value">{managerVolume.name}</span>
                      <span className="fake-dropdown-caret">▾</span>
                    </button>

                    <div className="admin-showcase-actions">
                      <button
                        type="button"
                        className="btn btn-danger btn-small"
                        onClick={() => requestDelete({ type: 'volume', id: managerVolume.id, name: managerVolume.name })}
                        disabled={busyDeleteKey === `volume:${managerVolume.id}`}
                      >
                        {busyDeleteKey === `volume:${managerVolume.id}` ? 'Deleting...' : 'Delete Volume'}
                      </button>
                    </div>
                  </>
                ) : null}

                {showManagerIssueBoxes ? (
                  managerVolume.issues.length ? (
                    <div className="issues-grid compact-box-grid" role="list" aria-label="Issues in selected volume">
                      {managerVolume.issues.map((issue) => (
                        <button
                          key={issue.id}
                          type="button"
                          className="journal-card journal-card-button compact-choice-box"
                          onClick={() => setManagerIssueId(issue.id)}
                        >
                          <strong>{issue.name}</strong>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <h3>No issues yet</h3>
                      <p>Create an issue from the form above to add papers.</p>
                    </div>
                  )
                ) : null}

                {showManagerPapers ? (
                  <>
                    <button
                      type="button"
                      className="fake-dropdown-trigger"
                      onClick={() => setManagerIssueId('')}
                      aria-label="Change selected issue"
                    >
                      <span className="fake-dropdown-label">Issue</span>
                      <span className="fake-dropdown-value">{managerIssue.name}</span>
                      <span className="fake-dropdown-caret">▾</span>
                    </button>

                    <div className="admin-showcase-actions">
                      <button
                        type="button"
                        className="btn btn-danger btn-small"
                        onClick={() =>
                          requestDelete({
                            type: 'issue',
                            id: managerIssue.id,
                            name: managerIssue.name,
                            volumeName: managerVolume.name,
                          })
                        }
                        disabled={busyDeleteKey === `issue:${managerIssue.id}`}
                      >
                        {busyDeleteKey === `issue:${managerIssue.id}` ? 'Deleting...' : 'Delete Issue'}
                      </button>
                    </div>

                    {managerIssue.papers.length ? (
                      <div className="paper-list compact-paper-list">
                        {managerIssue.papers.map((paper) => (
                          <article key={paper.id} className="paper-card compact-paper-card">
                            <div className="paper-content">
                              <h3>{paper.title}</h3>
                              <p className="paper-author">Author: {paper.authorName}</p>
                            </div>

                            <div className="admin-paper-actions">
                              <a
                                className="btn btn-outline btn-small"
                                href={paper.pdfPreviewUrl || paper.pdfUrl}
                                target="_blank"
                                rel="noreferrer noopener"
                              >
                                View PDF
                              </a>
                              <button
                                type="button"
                                className="btn btn-danger btn-small"
                                onClick={() =>
                                  requestDelete({
                                    type: 'paper',
                                    id: paper.id,
                                    name: paper.title,
                                  })
                                }
                                disabled={busyDeleteKey === `paper:${paper.id}`}
                              >
                                {busyDeleteKey === `paper:${paper.id}` ? 'Deleting...' : 'Delete Paper'}
                              </button>
                            </div>
                          </article>
                        ))}
                      </div>
                    ) : (
                      <div className="empty-state">
                        <h3>No papers in this issue</h3>
                        <p>Upload a paper from the form above to display it here.</p>
                      </div>
                    )}
                  </>
                ) : null}
              </div>
            ) : (
              <div className="empty-state">
                <h3>No volumes yet</h3>
                <p>Create a volume from the form above to start managing the catalog.</p>
              </div>
            )}
          </article>
        </div>

        {deleteDialog ? (
          <div className="delete-modal-backdrop" role="presentation" onClick={() => setDeleteDialog(null)}>
            <section
              className="delete-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="delete-modal-title"
              onClick={(event) => event.stopPropagation()}
            >
              <p className="eyebrow">Confirm Deletion</p>
              <h3 id="delete-modal-title">Delete {deleteDialog.entityLabel}?</h3>
              <p className="delete-modal-message">{deleteDialog.message}</p>

              <div className="form-actions">
                <button type="button" className="btn btn-outline" onClick={() => setDeleteDialog(null)} disabled={isDialogBusy}>
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete} disabled={isDialogBusy}>
                  {isDialogBusy ? 'Deleting...' : `Delete ${deleteDialog.entityLabel}`}
                </button>
              </div>
            </section>
          </div>
        ) : null}
      </section>
    </>
  )
}
