import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import PdfViewerModal from '../components/PdfViewerModal'
import { useJournal } from '../context/JournalContext'

export default function IssuesPage() {
  const { catalog, loading, error } = useJournal()
  const [selectedVolumeId, setSelectedVolumeId] = useState('')
  const [selectedIssueId, setSelectedIssueId] = useState('')
  const [previewPaper, setPreviewPaper] = useState(null)

  const selectedVolume = useMemo(
    () => catalog.find((volume) => volume.id === selectedVolumeId) ?? null,
    [catalog, selectedVolumeId],
  )

  const selectedIssue = useMemo(
    () => selectedVolume?.issues.find((issue) => issue.id === selectedIssueId) ?? null,
    [selectedVolume, selectedIssueId],
  )

  const showVolumeBoxes = !selectedVolume
  const showIssueBoxes = Boolean(selectedVolume) && !selectedIssue
  const showPapers = Boolean(selectedIssue)

  return (
    <>
      <PageHeader
        title="Archives"
        subtitle="Browse volumes, drill into archives, and open attached papers in a PDF preview."
      />

      <section className="section issues-section">
        <div className="container">
          {error ? <p className="status-banner issues-status">Backend connection problem: {error}</p> : null}

          <section className="browser-panel issues-flow-panel">
            <div className="panel-heading">
              <p className="eyebrow">Browse Catalog</p>
              <h2>Volumes and Archives</h2>
            </div>

            {loading && !catalog.length ? (
              <div className="empty-state">
                <h3>Loading catalog</h3>
                <p>Fetching volumes from the backend.</p>
              </div>
            ) : null}

            {showVolumeBoxes ? (
              <>
                <div className="issues-grid compact-box-grid" role="list" aria-label="Journal volumes">
                  {catalog.map((volume) => (
                    <button
                      key={volume.id}
                      type="button"
                      className="journal-card journal-card-button compact-choice-box"
                      onClick={() => {
                        setSelectedVolumeId(volume.id)
                        setSelectedIssueId('')
                        setPreviewPaper(null)
                      }}
                    >
                      <strong>{volume.name}</strong>
                    </button>
                  ))}
                </div>

                {!catalog.length && !loading ? (
                  <div className="empty-state">
                    <h3>No volumes yet</h3>
                    <p>Create a volume from the admin dashboard to make it visible here.</p>
                  </div>
                ) : null}
              </>
            ) : null}

            {selectedVolume ? (
              <button
                type="button"
                className="fake-dropdown-trigger"
                onClick={() => {
                  setSelectedVolumeId('')
                  setSelectedIssueId('')
                  setPreviewPaper(null)
                }}
                aria-label="Change selected volume"
              >
                <span className="fake-dropdown-label">Volume</span>
                <span className="fake-dropdown-value">{selectedVolume.name}</span>
                <span className="fake-dropdown-caret">▾</span>
              </button>
            ) : null}

            {showIssueBoxes ? (
              selectedVolume.issues.length ? (
                <div className="issues-grid compact-box-grid" role="list" aria-label="Archives in selected volume">
                  {selectedVolume.issues.map((issue) => (
                    <button
                      key={issue.id}
                      type="button"
                      className="journal-card journal-card-button compact-choice-box"
                      onClick={() => {
                        setSelectedIssueId(issue.id)
                        setPreviewPaper(null)
                      }}
                    >
                      <strong>{issue.name}</strong>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <h3>No archives yet</h3>
                  <p>Create an archive from the admin page to make it visible here.</p>
                </div>
              )
            ) : null}

            {showPapers ? (
              <>
                <button
                  type="button"
                  className="fake-dropdown-trigger"
                  onClick={() => {
                    setSelectedIssueId('')
                    setPreviewPaper(null)
                  }}
                  aria-label="Change selected archive"
                >
                  <span className="fake-dropdown-label">Archive</span>
                  <span className="fake-dropdown-value">{selectedIssue.name}</span>
                  <span className="fake-dropdown-caret">▾</span>
                </button>

                {selectedIssue.papers.length ? (
                  <div className="paper-list compact-paper-list">
                    {selectedIssue.papers.map((paper) => (
                      <article key={paper.id} className="paper-card compact-paper-card">
                        <div className="paper-content">
                          <h3>{paper.title}</h3>
                          <p className="paper-author">Author: {paper.authorName}</p>
                        </div>

                        <button type="button" className="btn btn-primary btn-small" onClick={() => setPreviewPaper(paper)}>
                          View PDF
                        </button>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <h3>No papers in this archive</h3>
                    <p>Upload a paper from the admin dashboard to see it listed here.</p>
                  </div>
                )}
              </>
            ) : null}
          </section>
        </div>
      </section>

      <PdfViewerModal paper={previewPaper} onClose={() => setPreviewPaper(null)} />
    </>
  )
}
