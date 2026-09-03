import type { Metadata } from 'next'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { ArticleCard } from '@/components/article/ArticleCard'
import { CURRENT_ISSUE } from '@/lib/data'
import { BookOpen, Download, FileText, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export const metadata: Metadata = {
  title: 'Current Issue — Volume 1, Issue 1 (2026)',
  description: 'Browse the current issue of JERA: Volume 1, Issue 1, March 2026.',
}

export default function CurrentIssuePage() {
  const { articles, volume, issue, year, month, articleCount } = CURRENT_ISSUE

  return (
    <PageWrapper
      title={`Volume ${volume}, Issue ${issue} — ${month} ${year}`}
      subtitle={`${articleCount} articles in this issue`}
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
                  Vol. {volume}, No. {issue} ({month} {year}) · ISSN 0000-0000 (Online)
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <span className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                    <FileText className="w-3.5 h-3.5" /> {articleCount} Articles
                  </span>
                </div>
              </div>
              <div className="hidden sm:flex flex-col gap-2">
                <a href="#" className="btn-secondary text-xs flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5" /> Full Issue PDF
                </a>
                <Link to="/archives" className="text-xs text-ocean-500 hover:text-ocean-600 flex items-center gap-1 justify-end">
                  Archives <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Articles grouped by discipline */}
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <BookOpen className="w-4 h-4 text-ocean-500" /> Published Articles
            </h3>
            {articles.map(article => (
              <ArticleCard key={article.id} article={article} variant="full" />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 hidden lg:flex flex-col gap-5">
          <div className="card p-4">
            <h3 className="font-semibold text-sm text-navy-700 dark:text-white mb-3">Issue Details</h3>
            <dl className="space-y-2 text-xs">
              {[
                ['Volume', `${volume}`],
                ['Issue', `${issue}`],
                ['Month', month],
                ['Year', `${year}`],
                ['Articles', `${articleCount}`],
                ['Open Access', 'Yes (CC BY 4.0)'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <dt className="text-gray-500 dark:text-gray-400">{k}</dt>
                  <dd className="font-medium text-gray-700 dark:text-gray-300">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="card p-4">
            <h3 className="font-semibold text-sm text-navy-700 dark:text-white mb-3">Browse Archives</h3>
            <Link to="/archives" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-navy-700 dark:hover:text-white py-1.5 border-b border-gray-100 dark:border-navy-800">
              Vol. 1, Issue 1 (Mar 2026) <span className="text-xs text-green-600 font-medium ml-1">Current</span>
            </Link>
            <p className="text-xs text-gray-400 mt-3">Future issues will appear here.</p>
          </div>

          <div className="card p-4 bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800">
            <p className="font-semibold text-sm text-teal-800 dark:text-teal-300 mb-2">Submit to Issue 2</p>
            <p className="text-xs text-teal-700 dark:text-teal-400 mb-3">Deadline: June 30, 2026</p>
            <Link to="/submit-manuscript" className="btn-accent text-xs w-full justify-center">
              Submit Now
            </Link>
          </div>
        </aside>
      </div>
    </PageWrapper>
  )
}
