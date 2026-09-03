'use client'

import { PageWrapper } from '@/components/layout/PageWrapper'
import { BookOpen, Download, FileText, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useJournal } from '@/context/JournalContext'

export default function CurrentIssuePage() {
  const { catalog, loading, error } = useJournal()

  if (loading) {
    return (
      <PageWrapper title="Current Issue" breadcrumbs={[{ label: 'Issues' }, { label: 'Current Issue' }]}>
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-500"></div>
        </div>
      </PageWrapper>
    )
  }

  if (error) {
    return (
      <PageWrapper title="Current Issue" breadcrumbs={[{ label: 'Issues' }, { label: 'Current Issue' }]}>
        <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg">
          Error loading current issue: {error}
        </div>
      </PageWrapper>
    )
  }

  // Find the latest volume and issue
  const latestVolume = catalog.length > 0 ? catalog[catalog.length - 1] : null
  const latestIssue = latestVolume && latestVolume.issues.length > 0 
    ? latestVolume.issues[latestVolume.issues.length - 1] 
    : null

  if (!latestVolume || !latestIssue) {
    return (
      <PageWrapper title="Current Issue" breadcrumbs={[{ label: 'Issues' }, { label: 'Current Issue' }]}>
        <div className="card p-6 text-center bg-navy-50 dark:bg-navy-800/30">
          <BookOpen className="w-10 h-10 text-navy-300 mx-auto mb-3" />
          <p className="font-semibold text-sm text-navy-700 dark:text-white mb-2">No issues published yet</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Please check back later.</p>
          <Link href="/call-for-papers" className="btn-primary text-sm">Submit Manuscript</Link>
        </div>
      </PageWrapper>
    )
  }

  const dateStr = new Date(latestIssue.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })
  const year = new Date(latestIssue.createdAt).getFullYear()

  return (
    <PageWrapper
      title={`${latestVolume.name}, ${latestIssue.name}`}
      subtitle={`${latestIssue.papers.length} articles in this issue`}
      breadcrumbs={[{ label: 'Issues' }, { label: 'Current Issue' }]}
    >
      <div className="flex gap-8 lg:gap-10">
        {/* Articles */}
        <div className="flex-1 min-w-0">
          {/* Issue header card */}
          <div className="card p-6 mb-6 bg-gradient-to-r from-navy-50 to-blue-50 dark:from-navy-800/30 dark:to-navy-900/30 border-navy-200 dark:border-navy-700">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="section-label">Current Issue</span>
                <h2 className="font-serif text-xl font-bold text-navy-700 dark:text-white">
                  Journal of Engineering Research Application
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {latestVolume.name}, {latestIssue.name} ({dateStr}) · E-ISSN 2583-3987
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <span className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                    <FileText className="w-3.5 h-3.5" /> {latestIssue.papers.length} Articles
                  </span>
                </div>
              </div>
              <div className="hidden sm:flex flex-col gap-2">
                <Link href="/archives" className="text-xs text-ocean-500 hover:text-ocean-600 flex items-center gap-1 justify-end mt-2">
                  Archives <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Articles list */}
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
              <BookOpen className="w-4 h-4 text-ocean-500" /> Published Articles
            </h3>
            
            {latestIssue.papers.length === 0 ? (
              <p className="text-gray-500">No articles in this issue yet.</p>
            ) : (
              latestIssue.papers.map(paper => (
                <div key={paper.id} className="card p-5 bg-white dark:bg-navy-900 hover:border-ocean-300 dark:hover:border-ocean-700 transition-colors">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-serif font-bold text-lg text-gray-900 dark:text-white leading-tight mb-2">
                        {paper.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {paper.authorName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 border-t border-gray-100 dark:border-navy-800 pt-3 mt-1">
                    <a 
                      href={paper.pdfPreviewUrl || paper.pdfUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="btn-secondary text-xs flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" /> View PDF
                    </a>
                    <span className="text-xs text-gray-400">
                      Uploaded {new Date(paper.uploadedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 hidden lg:flex flex-col gap-5">
          <div className="card p-4">
            <h3 className="font-semibold text-sm text-navy-700 dark:text-white mb-3">Issue Details</h3>
            <dl className="space-y-2 text-xs">
              <div className="flex justify-between">
                <dt className="text-gray-500 dark:text-gray-400">Volume</dt>
                <dd className="font-medium text-gray-700 dark:text-gray-300">{latestVolume.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500 dark:text-gray-400">Issue</dt>
                <dd className="font-medium text-gray-700 dark:text-gray-300">{latestIssue.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500 dark:text-gray-400">Date</dt>
                <dd className="font-medium text-gray-700 dark:text-gray-300">{dateStr}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500 dark:text-gray-400">Articles</dt>
                <dd className="font-medium text-gray-700 dark:text-gray-300">{latestIssue.papers.length}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500 dark:text-gray-400">Open Access</dt>
                <dd className="font-medium text-gray-700 dark:text-gray-300">Yes (CC BY 4.0)</dd>
              </div>
            </dl>
          </div>

          <div className="card p-4 bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800">
            <p className="font-semibold text-sm text-teal-800 dark:text-teal-300 mb-2">Submit Manuscript</p>
            <Link href="/submit-manuscript" className="btn-accent text-xs w-full justify-center">
              Submit Now
            </Link>
          </div>
        </aside>
      </div>
    </PageWrapper>
  )
}
