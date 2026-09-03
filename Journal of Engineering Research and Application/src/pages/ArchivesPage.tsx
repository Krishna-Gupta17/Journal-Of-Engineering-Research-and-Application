import type { Metadata } from 'next'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { BookOpen, FileText, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'

export const metadata: Metadata = {
  title: 'Archives',
  description: 'Browse all issues of JERA — Journal of Engineering Research Application.',
}

export default function ArchivesPage() {
  return (
    <PageWrapper
      title="Archives"
      subtitle="All published volumes and issues"
      breadcrumbs={[{ label: 'Issues' }, { label: 'Archives' }]}
    >
      <div className="max-w-4xl space-y-8">
        <section>
          <p className="section-label">Volume 1 · 2026</p>
          <h2 className="font-serif text-xl font-bold text-navy-700 dark:text-white mb-4">Volume 1 (2026)</h2>
          <div className="space-y-3">
            <div className="card p-5 flex items-center justify-between border-l-4 border-l-ocean-500">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-ocean-50 dark:bg-ocean-900/30 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-ocean-500" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Issue 1 — March 2026</h3>
                    <span className="tag bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400">Current</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-3">
                    <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> 4 Articles</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Published March 2026</span>
                  </p>
                </div>
              </div>
              <Link to="/current-issue" className="btn-secondary text-xs">Browse Issue</Link>
            </div>

            {[2, 3, 4].map(n => (
              <div key={n} className="card p-5 flex items-center justify-between opacity-60">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-navy-800 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-300">Issue {n} — {['—', '—', 'June', 'September', 'December'][n]} 2026</h3>
                    <p className="text-xs text-gray-400 mt-1">Not yet published</p>
                  </div>
                </div>
                <span className="tag">Upcoming</span>
              </div>
            ))}
          </div>
        </section>

        <div className="card p-6 text-center bg-navy-50 dark:bg-navy-800/30">
          <BookOpen className="w-10 h-10 text-navy-300 mx-auto mb-3" />
          <p className="font-semibold text-sm text-navy-700 dark:text-white mb-2">JERA is in its inaugural year</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Previous issues will appear here as they are published throughout 2026.</p>
          <Link to="/call-for-papers" className="btn-primary text-sm">Submit to Volume 1, Issue 2</Link>
        </div>
      </div>
    </PageWrapper>
  )
}
