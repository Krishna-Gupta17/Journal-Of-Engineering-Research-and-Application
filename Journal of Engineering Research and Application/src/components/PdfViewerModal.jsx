export default function PdfViewerModal({ paper, onClose }) {
  const sourceUrl = paper?.pdfPreviewUrl || paper?.pdfUrl || ''
  const viewerUrl = sourceUrl && !sourceUrl.includes('#') ? `${sourceUrl}#view=FitH&toolbar=1&navpanes=0` : sourceUrl

  if (!paper) {
    return null
  }

  return (
    <div className="pdf-modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className="pdf-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pdf-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="pdf-modal-header">
          <div>
            <p className="eyebrow">Paper Preview</p>
            <h3 id="pdf-modal-title">{paper.title}</h3>
            <p className="pdf-meta">{paper.authorName}</p>
          </div>
          <button type="button" className="btn btn-outline pdf-close-button" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="pdf-modal-body">
          <iframe
            title={paper.title}
            src={viewerUrl}
            className="pdf-frame"
            loading="lazy"
            allow="fullscreen"
          />

          <p className="pdf-fallback-note">
            If the preview does not appear in your browser,
            {' '}
            <a href={paper.pdfPreviewUrl || paper.pdfUrl} target="_blank" rel="noreferrer noopener">
              open the PDF in a new tab
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  )
}
