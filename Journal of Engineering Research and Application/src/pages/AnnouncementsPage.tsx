import type { Metadata } from 'next'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { ANNOUNCEMENTS } from '@/lib/data'
import { Bell, Calendar, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Announcements',
  description: 'Latest announcements, news, and updates from JERA editorial office.',
}

const typeConfig = {
  'call-for-papers': { label: 'Call for Papers', color: 'bg-ocean-50 text-ocean-600 dark:bg-ocean-900/30 dark:text-ocean-300' },
  'deadline': { label: 'Deadline', color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' },
  'update': { label: 'Update', color: 'bg-gray-100 text-gray-600 dark:bg-navy-800 dark:text-gray-400' },
  'general': { label: 'General', color: 'bg-gray-100 text-gray-600 dark:bg-navy-800 dark:text-gray-400' },
}

export default function AnnouncementsPage() {
  return (
    <PageWrapper
      title="Announcements"
      subtitle="News, deadlines, and updates from JERA"
      breadcrumbs={[{ label: 'Announcements' }]}
    >
      <div className="max-w-4xl space-y-5">
        {ANNOUNCEMENTS.map(ann => {
          const config = typeConfig[ann.type]
          return (
            <article key={ann.id} className="card p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {ann.important
                    ? <AlertCircle className="w-5 h-5 text-amber-500" />
                    : <Bell className="w-5 h-5 text-gray-400" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.color}`}>
                      {config.label}
                    </span>
                    {ann.important && (
                      <span className="text-xs font-semibold text-red-600 dark:text-red-400">⚑ Important</span>
                    )}
                  </div>
                  <h2 className="font-serif font-bold text-base text-gray-900 dark:text-white mb-2 leading-snug">
                    {ann.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                    {ann.content}
                  </p>
                  <time className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(ann.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                </div>
              </div>
            </article>
          )
        })}

        <p className="text-xs text-gray-400 text-center py-4">
          Showing all {ANNOUNCEMENTS.length} announcements. Older announcements are archived after 12 months.
        </p>
      </div>
    </PageWrapper>
  )
}
