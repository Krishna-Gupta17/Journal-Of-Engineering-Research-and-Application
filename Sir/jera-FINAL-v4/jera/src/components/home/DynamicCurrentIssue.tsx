'use client'

import { useJournal } from '@/context/JournalContext'
import Link from 'next/link'
import { ChevronRight, Download } from 'lucide-react'
import { useState } from 'react'
import { PdfViewerModal } from '@/components/ui/PdfViewerModal'

export function DynamicCurrentIssue() {
  const { catalog, loading, error } = useJournal()
  const [selectedPdf, setSelectedPdf] = useState<{ url: string; title: string } | null>(null)

  if (loading) {
    return (
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="section-label">Current Issue</p>
            <h2 className="font-serif text-2xl font-bold text-navy-700 dark:text-white">Loading...</h2>
          </div>
        </div>
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-500"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="section-label">Current Issue</p>
            <h2 className="font-serif text-2xl font-bold text-navy-700 dark:text-white">Error loading issue</h2>
          </div>
        </div>
        <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg">
          Error: {error}
        </div>
      </div>
    )
  }

  const latestVolume = catalog.length > 0 ? catalog[catalog.length - 1] : null
  const latestIssue = latestVolume && latestVolume.issues.length > 0 
    ? latestVolume.issues[latestVolume.issues.length - 1] 
    : null

  if (!latestVolume || !latestIssue) {
    return (
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="section-label">Current Issue</p>
            <h2 className="font-serif text-2xl font-bold text-navy-700 dark:text-white">No Issues Available</h2>
          </div>
        </div>
        <p className="text-gray-500 text-sm">Please check back later for new issues.</p>
      </div>
    )
  }

  const dateStr = new Date(latestIssue.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })

  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="section-label">Current Issue</p>
          <h2 className="font-serif text-2xl font-bold text-navy-700 dark:text-white">
            {latestVolume.name}, {latestIssue.name} — {dateStr}
          </h2>
        </div>
        <Link href="/current-issue" className="btn-secondary text-xs hidden sm:inline-flex items-center gap-1">
          View All <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
      
      <div className="space-y-4">
        {latestIssue.papers.length === 0 ? (
          <p className="text-gray-500 text-sm">No articles in this issue yet.</p>
        ) : (
          latestIssue.papers.map(paper => (
            <div key={paper.id} className="card p-5 bg-white dark:bg-navy-900 hover:border-ocean-300 dark:hover:border-ocean-700 transition-colors border-l-4 border-l-ocean-500">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-serif font-bold text-lg text-gray-900 dark:text-white leading-snug mb-2 group-hover:text-navy-700 dark:group-hover:text-navy-200 transition-colors">
                    {paper.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <span className="font-medium">{paper.authorName}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 mt-1 border-t border-gray-100 dark:border-navy-800/60">
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    Uploaded {new Date(paper.uploadedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setSelectedPdf({ 
                      url: paper.pdfPreviewUrl || paper.pdfUrl || '', 
                      title: paper.title 
                    })}
                    className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" /> View PDF
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <PdfViewerModal 
        isOpen={!!selectedPdf}
        onClose={() => setSelectedPdf(null)}
        pdfUrl={selectedPdf?.url || null}
        title={selectedPdf?.title}
      />
    </div>
  )
}
