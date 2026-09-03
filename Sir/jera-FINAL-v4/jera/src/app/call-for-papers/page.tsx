import type { Metadata } from 'next'
import { PageWrapper } from '@/components/layout/PageWrapper'
import Link from 'next/link'
import { Calendar, CheckCircle, ArrowRight, Download } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Call for Papers | JERA — Volume 1, Issue 2 (2026)',
  description: 'JERA invites original research manuscripts in civil engineering for Volume 1, Issue 2 (July 2026). Submission deadline: June 30, 2026. No publication charges.',
}

export default function CallForPapersPage() {
  return (
    <PageWrapper
      title="Call for Papers"
      subtitle="Volume 1, Issue 2 — July 2026"
      breadcrumbs={[{ label: 'For Authors' }, { label: 'Call for Papers' }]}
    >
      <div className="max-w-4xl">

        {/* Hero card */}
        <div className="card p-8 bg-gradient-to-br from-navy-700 to-navy-900 text-white mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <p className="text-ocean-300 text-xs font-semibold uppercase tracking-widest mb-3">Open Call — Submissions Invited</p>
            <h2 className="font-serif text-2xl font-bold mb-1">Journal of Engineering Research Application</h2>
            <p className="text-navy-200 text-base mb-6">Volume 1, Issue 2 · July 2026</p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-3">
                <Calendar className="w-4 h-4 text-ocean-300" />
                <div>
                  <p className="text-xs text-navy-300">Submission Deadline</p>
                  <p className="text-sm font-bold text-white">June 30, 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-3">
                <Calendar className="w-4 h-4 text-ocean-300" />
                <div>
                  <p className="text-xs text-navy-300">Target Publication</p>
                  <p className="text-sm font-bold text-white">July 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-lg px-4 py-3">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <div>
                  <p className="text-xs text-green-300">Publication Fee</p>
                  <p className="text-sm font-bold text-green-300">FREE (Full Waiver)</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/submit-manuscript" className="inline-flex items-center gap-2 bg-ocean-500 hover:bg-ocean-600 text-white font-bold text-sm px-6 py-3 rounded-lg transition-colors">
                Submit Manuscript <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/downloads" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-sm px-5 py-3 rounded-lg transition-colors">
                <Download className="w-4 h-4" /> Download Template
              </Link>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">

            {/* Welcome message */}
            <section className="card p-6">
              <p className="section-label">From the Editors</p>
              <h2 className="font-serif text-lg font-bold text-navy-700 dark:text-white mb-3">Invitation to Submit</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                On behalf of the Editorial Board of the <strong>Journal of Engineering Research Application (JERA)</strong>, we cordially invite researchers, academics, engineers, and practitioners worldwide to submit original manuscripts for consideration in <strong>Volume 1, Issue 2 (July 2026)</strong>.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                JERA is a newly established, peer-reviewed, fully open-access international journal. We are committed to rapid, rigorous, and fair review — with a target first decision of 28 days. All manuscripts undergo double-blind peer review by at least two independent subject-matter experts.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                During our inaugural period (2025–2026), there are <strong>absolutely no publication charges</strong> for authors. JERA is free to publish and free to read.
              </p>
            </section>

            {/* Topics */}
            <section className="card p-6">
              <p className="section-label">Scope</p>
              <h2 className="font-serif text-lg font-bold text-navy-700 dark:text-white mb-4">Topics of Interest</h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  'Structural analysis, design, and performance',
                  'Wind engineering and aerodynamics of structures',
                  'Geotechnical engineering and ground improvement',
                  'Landslide monitoring and disaster risk reduction',
                  'Rock engineering and tunnelling',
                  'Transportation engineering and traffic systems',
                  'Environmental engineering and sustainability',
                  'Water resources and hydraulic engineering',
                  'Construction management and project delivery',
                  'Earthquake engineering and seismic resilience',
                  'Smart infrastructure and structural health monitoring',
                  'Building materials and construction technology',
                  'Computational fluid dynamics in civil engineering',
                  'Machine learning applications in infrastructure',
                  'Remote sensing, GIS, and geospatial engineering',
                  'Climate adaptation and resilient infrastructure',
                ].map(topic => (
                  <div key={topic} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400 py-1">
                    <CheckCircle className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 mt-0.5" />{topic}
                  </div>
                ))}
              </div>
            </section>

            {/* Dates */}
            <section className="card p-6">
              <p className="section-label">Timeline</p>
              <h2 className="font-serif text-lg font-bold text-navy-700 dark:text-white mb-4">Important Dates — Issue 2</h2>
              <div className="space-y-0">
                {[
                  { date: '01 March 2026', event: 'Call for Papers opened for Issue 2' },
                  { date: '30 June 2026', event: 'Manuscript submission deadline', highlight: true },
                  { date: 'July – August 2026', event: 'Peer review period' },
                  { date: 'August – September 2026', event: 'Author notification of editorial decision' },
                  { date: 'September 2026', event: 'Revision submission deadline' },
                  { date: 'October 2026', event: 'Final acceptance & production' },
                  { date: 'November 2026', event: 'Target online publication — Issue 2' },
                ].map(({ date, event, highlight }) => (
                  <div key={date} className={`flex items-center gap-4 py-3 border-b border-gray-100 dark:border-navy-800 last:border-0 ${highlight ? 'bg-amber-50 dark:bg-amber-900/10 -mx-5 px-5 rounded-lg' : ''}`}>
                    <span className="font-mono text-xs text-ocean-500 w-40 flex-shrink-0">{date}</span>
                    <span className={`text-sm ${highlight ? 'font-bold text-amber-800 dark:text-amber-300' : 'text-gray-600 dark:text-gray-400'}`}>{event}</span>
                    {highlight && <span className="text-xs bg-amber-200 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full font-semibold ml-auto flex-shrink-0">Deadline</span>}
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="card p-5 bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800">
              <p className="text-xs font-bold text-green-800 dark:text-green-400 mb-2">🎉 Zero Publication Fee</p>
              <p className="text-xs text-green-700 dark:text-green-300 leading-relaxed">
                Manuscripts submitted and accepted before December 31, 2026 are published at <strong>no charge</strong> to authors.
              </p>
            </div>

            <div className="card p-5">
              <h3 className="font-semibold text-sm text-navy-700 dark:text-white mb-3">Manuscript Types</h3>
              {[
                ['Research Article', '4,000–8,000 words'],
                ['Review Article', '6,000–12,000 words'],
                ['Case Study', '2,000–5,000 words'],
                ['Short Communication', '1,500–3,000 words'],
                ['Technical Note', '1,000–2,500 words'],
              ].map(([type, len]) => (
                <div key={type} className="flex justify-between py-1.5 border-b border-gray-100 dark:border-navy-800 last:border-0 text-xs">
                  <span className="text-gray-700 dark:text-gray-300">{type}</span>
                  <span className="text-gray-400 font-mono">{len}</span>
                </div>
              ))}
            </div>

            <div className="card p-5">
              <h3 className="font-semibold text-sm text-navy-700 dark:text-white mb-3">Editorial Board Specialisations</h3>
              <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
                {['Hydraulic & Fluid Engineering', 'Structural & Wind Engineering', 'Geotechnical Engineering', 'Landslide & Disaster Risk Reduction', 'CFD & Computational Mechanics', 'Environmental Engineering', 'Transportation Engineering', 'Construction Management'].map(s => (
                  <div key={s} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ocean-400 flex-shrink-0" />{s}
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h3 className="font-semibold text-sm text-navy-700 dark:text-white mb-3">Quick Links</h3>
              <div className="space-y-2">
                {[
                  { label: 'Author Guidelines', href: '/author-guidelines' },
                  { label: 'Download Template', href: '/downloads' },
                  { label: 'Peer Review Process', href: '/peer-review' },
                  { label: 'Ethics & Publication Policy', href: '/ethics-policy' },
                  { label: 'Contact Editorial Office', href: '/contact' },
                ].map(({ label, href }) => (
                  <Link key={href} href={href} className="flex items-center gap-1.5 text-xs text-ocean-500 hover:text-ocean-600 hover:underline">
                    <ArrowRight className="w-3 h-3" />{label}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </PageWrapper>
  )
}
