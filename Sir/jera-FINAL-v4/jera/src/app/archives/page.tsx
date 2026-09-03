'use client'

import { PageWrapper } from '@/components/layout/PageWrapper'
import { BookOpen, FileText, Calendar } from 'lucide-react'
import Link from 'next/link'
import { useJournal } from '@/context/JournalContext'

export default function ArchivesPage() {
  const { catalog, loading, error } = useJournal()

  return (
    <PageWrapper
      title="Archives"
      subtitle="All published volumes and issues"
      breadcrumbs={[{ label: 'Issues' }, { label: 'Archives' }]}
    >
      <div className="max-w-4xl space-y-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-500"></div>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg">
            Error loading catalog: {error}
          </div>
        ) : catalog.length === 0 ? (
          <div className="card p-6 text-center bg-navy-50 dark:bg-navy-800/30">
            <BookOpen className="w-10 h-10 text-navy-300 mx-auto mb-3" />
            <p className="font-semibold text-sm text-navy-700 dark:text-white mb-2">JERA is in its inaugural year</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Previous issues will appear here as they are published throughout 2026.</p>
            <Link href="/call-for-papers" className="btn-primary text-sm">Submit to Volume 1, Issue 2</Link>
          </div>
        ) : (
          catalog.map((volume) => (
            <section key={volume.id} className="mb-10">
              <p className="section-label">{volume.name}</p>
              <h2 className="font-serif text-xl font-bold text-navy-700 dark:text-white mb-4">{volume.name}</h2>
              <div className="space-y-3">
                {volume.issues.length === 0 ? (
                  <p className="text-sm text-gray-500">No issues published in this volume yet.</p>
                ) : (
                  volume.issues.map((issue) => (
                    <div key={issue.id} className="card p-5 flex items-center justify-between border-l-4 border-l-ocean-500">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-ocean-50 dark:bg-ocean-900/30 flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-ocean-500" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-sm text-gray-900 dark:text-white">{issue.name}</h3>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-3">
                            <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {issue.papers.length} Articles</span>
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(issue.createdAt).toLocaleDateString()}</span>
                          </p>
                        </div>
                      </div>
                      {/* For now we link to current-issue, or we can build dynamic issue pages later */}
                      <Link href="/current-issue" className="btn-secondary text-xs">Browse Issue</Link>
                    </div>
                  ))
                )}
              </div>
            </section>
          ))
        )}
      </div>
    </PageWrapper>
  )
}
