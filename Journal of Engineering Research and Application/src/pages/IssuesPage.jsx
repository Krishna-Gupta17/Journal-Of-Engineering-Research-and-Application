import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import PdfViewerModal from '../components/PdfViewerModal'
import { useJournal } from '../context/JournalContext'

export default function IssuesPage() {
  const { catalog, loading, error } = useJournal()
  const [selectedVolumeId, setSelectedVolumeId] = useState('')
  const [selectedIssueId, setSelectedIssueId] = useState('')
  const [previewPaper, setPreviewPaper] = useState(null)

  const catalogStats = useMemo(() => {
    const volumes = catalog.length
    const issues = catalog.reduce((sum, volume) => sum + volume.issues.length, 0)
    const papers = catalog.reduce(
      (sum, volume) => sum + volume.issues.reduce((issueSum, issue) => issueSum + issue.papers.length, 0),
      0,
    )

    return { volumes, issues, papers }
  }, [catalog])

  const selectedVolume = useMemo(
    () => catalog.find((volume) => volume.id === selectedVolumeId) ?? catalog[0],
    [catalog, selectedVolumeId],
  )

  const selectedIssue =
    selectedVolume?.issues.find((issue) => issue.id === selectedIssueId) ?? selectedVolume?.issues[0]

  return (
    <>
      <PageHeader
        title="Issues"
        subtitle="Browse volumes, drill into issues, and open attached papers in a PDF preview."
      />

      <section className="section issues-section">
        <div className="container">
          {error ? <p className="status-banner issues-status">Backend connection issue: {error}</p> : null}

          <section className="issues-summary" aria-label="Journal catalog summary">
            <article className="summary-card">
              <p className="summary-label">Volumes</p>
              <strong>{catalogStats.volumes}</strong>
            </article>
            <article className="summary-card">
              <p className="summary-label">Issues</p>
              <strong>{catalogStats.issues}</strong>
            </article>
            <article className="summary-card">
              <p className="summary-label">Papers</p>
              <strong>{catalogStats.papers}</strong>
            </article>
          </section>

          <div className="journal-browser">
            <aside className="browser-panel">
              <div className="panel-heading">
                <p className="eyebrow">Volumes</p>
                <h2>Available Volumes</h2>
              </div>

              <div className="volume-list" role="list" aria-label="Journal volumes">
                {loading && !catalog.length ? (
                  <div className="empty-state">
                    <h3>Loading catalog</h3>
                    <p>Fetching volumes from the backend.</p>
                  </div>
                ) : (
                  catalog.map((volume) => {
                    const paperCount = volume.issues.reduce((total, issue) => total + issue.papers.length, 0)
                    const isActive = volume.id === selectedVolume?.id

                    return (
                      <button
                        key={volume.id}
                        type="button"
                        className={`journal-card journal-card-button ${isActive ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedVolumeId(volume.id)
                          setSelectedIssueId(volume.issues[0]?.id ?? '')
                          setPreviewPaper(null)
                        }}
                      >
                        <strong>{volume.name}</strong>
                        <span>{volume.issues.length} issues</span>
                        <span>{paperCount} papers</span>
                      </button>
                    )
                  })
                )}
              </div>
            </aside>

            <section className="browser-panel browser-detail">
              <div className="panel-heading">
                <p className="eyebrow">Issues</p>
                <h2>{selectedVolume ? selectedVolume.name : 'No volume selected'}</h2>
              </div>

              {selectedVolume?.issues.length ? (
                <div className="issue-list" role="list" aria-label="Issues in the selected volume">
                  {selectedVolume.issues.map((issue) => {
                    const isActive = issue.id === selectedIssue?.id

                    return (
                      <button
                        key={issue.id}
                        type="button"
                        className={`journal-card journal-card-button issue-card ${isActive ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedIssueId(issue.id)
                          setPreviewPaper(null)
                        }}
                      >
                        <strong>{issue.name}</strong>
                        <span>{issue.papers.length} papers</span>
                      </button>
                    )
                  })}
                </div>
              ) : (
                <div className="empty-state">
                  <h3>No issues yet</h3>
                  <p>Create an issue from the admin page to make it visible here.</p>
                </div>
              )}

              <div className="papers-panel">
                <div className="panel-heading">
                  <p className="eyebrow">Papers</p>
                  <h2>{selectedIssue ? selectedIssue.name : 'Select an issue'}</h2>
                </div>

                {selectedIssue?.papers.length ? (
                  <div className="paper-list">
                    {selectedIssue.papers.map((paper) => (
                      <article key={paper.id} className="paper-card">
                        <div className="paper-content">
                          <h3>{paper.title}</h3>
                          <p className="paper-author">{paper.authorName}</p>
                          <p className="paper-meta">{paper.fileName}</p>
                        </div>

                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => setPreviewPaper(paper)}
                        >
                          Open Preview
                        </button>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <h3>No papers in this issue</h3>
                    <p>Upload a paper from the admin dashboard to see it listed here.</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </section>

      <PdfViewerModal paper={previewPaper} onClose={() => setPreviewPaper(null)} />
    </>
  )
}
