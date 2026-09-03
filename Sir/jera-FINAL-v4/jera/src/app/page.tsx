import Link from 'next/link'
import { ArrowRight, Download, BookOpen, FileText, Users, Globe, Award, Clock, CheckCircle, ChevronRight, Bell, Layers } from 'lucide-react'
import { ArticleCard } from '@/components/article/ArticleCard'
import { SAMPLE_ARTICLES, ANNOUNCEMENTS, JOURNAL_METRICS, DISCIPLINES, EDITORIAL_BOARD_PREVIEW } from '@/lib/homeData'
import { DynamicCurrentIssue } from '@/components/home/DynamicCurrentIssue'
export default function HomePage() {
  return (
    <div className="bg-[var(--color-bg)]">

      {/* HERO */}
      <section className="hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-blue-200 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              Open Access · Peer-Reviewed · International
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl font-bold leading-none tracking-tight mb-2">JERA</h1>
            <p className="text-lg sm:text-xl font-light text-blue-200 mb-6 leading-snug">Journal of Engineering Research Application</p>
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-blue-100">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-teal-400" /> Peer-reviewed</span>
              <span className="text-navy-400">·</span>
              <span className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-teal-400" /> Open Access</span>
              <span className="text-navy-400">·</span>
              <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-teal-400" /> Free to Publish (2026)</span>
            </div>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-sm text-blue-200 mb-4">
              <BookOpen className="w-4 h-4" />
              <span>Current Focus: <strong className="text-white">Civil Engineering</strong></span>
              <span className="text-navy-400">·</span>
              <span>Volume 1 | Issue 1 | 2026</span>
            </div>
            <p className="text-xs text-navy-300 mb-8">Founded by academics from Delhi Technological University & MMMUT Gorakhpur, India</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/submit-manuscript" className="inline-flex items-center gap-2 px-6 py-3 bg-ocean-500 hover:bg-ocean-600 text-white font-semibold text-sm rounded-lg transition-colors shadow-lg">
                <FileText className="w-4 h-4" /> Submit Manuscript
              </Link>
              <Link href="/current-issue" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-sm rounded-lg transition-colors">
                <BookOpen className="w-4 h-4" /> View Current Issue
              </Link>
              <Link href="/downloads" className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600/90 hover:bg-teal-600 text-white font-semibold text-sm rounded-lg transition-colors">
                <Download className="w-4 h-4" /> Download Template
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-[var(--color-bg)]" style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }} />
      </section>

      {/* METRICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {JOURNAL_METRICS.map((m) => (
            <div key={m.label} className="stat-box">
              <span className="font-serif text-2xl font-bold text-navy-700 dark:text-white">{m.value}</span>
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-1">{m.label}</span>
              {m.description && <span className="text-xs text-gray-400 mt-0.5">{m.description}</span>}
            </div>
          ))}
        </div>
      </section>

      {/* ARTICLES + SIDEBAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-12">
        <div className="flex gap-8 lg:gap-10">
          <DynamicCurrentIssue />

          {/* Sidebar */}
          <aside className="w-72 flex-shrink-0 hidden lg:flex flex-col gap-5">
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="w-4 h-4 text-ocean-500" />
                <h3 className="font-semibold text-sm text-navy-700 dark:text-white">Announcements</h3>
              </div>
              <div className="space-y-4">
                {ANNOUNCEMENTS.map(ann => (
                  <div key={ann.id} className="border-b border-gray-100 dark:border-navy-800 pb-3 last:border-0 last:pb-0">
                    {ann.important && <span className="inline-block text-xs px-1.5 py-0.5 bg-red-50 text-red-600 rounded font-medium mb-1">Important</span>}
                    <Link href="/announcements" className="block text-xs font-medium text-gray-800 dark:text-gray-200 hover:text-navy-700 dark:hover:text-white leading-snug mb-1">{ann.title}</Link>
                    <time className="text-xs text-gray-400">{new Date(ann.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })}</time>
                  </div>
                ))}
              </div>
              <Link href="/announcements" className="mt-3 text-xs text-ocean-500 hover:text-ocean-600 flex items-center gap-1 font-medium">All announcements <ArrowRight className="w-3 h-3" /></Link>
            </div>

            <div className="card p-5 bg-gradient-to-br from-teal-50 to-teal-100/50 dark:from-teal-900/20 dark:to-teal-900/10 border-teal-200 dark:border-teal-800">
              <span className="section-label text-teal-700 dark:text-teal-400">Call for Papers</span>
              <h3 className="font-serif font-bold text-navy-700 dark:text-white mb-1">Volume 1, Issue 2</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Deadline: <strong className="text-gray-800 dark:text-white">June 30, 2026</strong></p>
              <p className="text-xs text-green-700 dark:text-green-400 font-semibold mb-3">🎉 Free to publish — No APC</p>
              <Link href="/call-for-papers" className="btn-accent text-xs w-full justify-center">Learn More & Submit</Link>
            </div>

            <div className="card p-5">
              <span className="section-label">Editors-in-Chief</span>
              <div className="space-y-3 mt-2">
                {[
                  { name: 'Prof. S. Anbukumar', area: 'Hydraulic & Fluid Eng.', inst: 'DTU, Delhi' },
                  { name: 'Dr. Ritu Raj', area: 'Structural & Wind Eng.', inst: 'DTU, Delhi' },
                ].map(ed => (
                  <div key={ed.name} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-navy-100 dark:bg-navy-800 flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-navy-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-xs text-gray-900 dark:text-white">{ed.name}</p>
                      <p className="text-xs text-gray-400">{ed.area}</p>
                      <p className="text-xs text-gray-400">{ed.inst}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/editorial-board" className="mt-3 text-xs text-ocean-500 hover:text-ocean-600 flex items-center gap-1 font-medium">Full editorial board <ArrowRight className="w-3 h-3" /></Link>
            </div>

            <div className="card p-5">
              <h3 className="font-semibold text-sm text-navy-700 dark:text-white mb-3">Quick Links</h3>
              <div className="space-y-1">
                {[
                  ['/author-guidelines', 'Author Guidelines'],
                  ['/peer-review', 'Peer Review Process'],
                  ['/publication-charges', 'Publication Charges (Free)'],
                  ['/indexing', 'Indexing & Abstracting'],
                  ['/ethics-policy', 'Ethics & Publication Policy'],
                  ['/faqs', 'Frequently Asked Questions'],
                ].map(([href, label]) => (
                  <Link key={href} href={href} className="block px-2 py-1.5 text-xs text-gray-600 dark:text-gray-400 hover:text-navy-700 hover:bg-navy-50 dark:hover:text-white dark:hover:bg-navy-800/40 rounded transition-colors">{label}</Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* DISCIPLINES */}
      <section className="bg-navy-700 dark:bg-navy-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="section-label text-blue-300">Coverage</p>
            <h2 className="font-serif text-2xl font-bold text-white">Engineering Disciplines</h2>
            <p className="text-navy-200 text-sm mt-2 max-w-lg mx-auto">Civil Engineering and allied disciplines — anchored in expertise from DTU, MMMUT, NIT Delhi, VNIT Nagpur, WRI USA & more</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {DISCIPLINES.map((d, i) => (
              <div key={d} className={`px-3 py-3 rounded-lg text-center text-xs font-medium transition-colors ${i === 0 ? 'bg-ocean-500 text-white shadow-lg' : 'bg-navy-600/60 text-navy-200 border border-navy-500/50 hover:bg-navy-600'}`}>
                <Layers className="w-4 h-4 mx-auto mb-1.5 opacity-70" />
                {d}
                {i === 0 && <div className="text-ocean-200 text-xs mt-0.5 font-normal">Active</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <p className="section-label">Process</p>
          <h2 className="font-serif text-2xl font-bold text-navy-700 dark:text-white">Manuscript Workflow</h2>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-navy-200 via-ocean-300 to-teal-400 dark:from-navy-700 dark:via-ocean-800 dark:to-teal-800" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 relative">
            {[
              { step: 'Submission', icon: FileText },
              { step: 'Assignment', icon: Users },
              { step: 'Peer Review', icon: CheckCircle },
              { step: 'Revision', icon: Clock },
              { step: 'Publication', icon: Globe },
            ].map(({ step, icon: Icon }) => (
              <div key={step} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white dark:bg-navy-800 border-2 border-ocean-500 flex items-center justify-center mb-3 shadow-md">
                  <Icon className="w-6 h-6 text-ocean-500" />
                </div>
                <span className="font-semibold text-sm text-navy-700 dark:text-white">{step}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 text-center">
          <Link href="/peer-review" className="btn-primary">Learn About Our Review Process <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>

      {/* WHY JERA */}
      <section className="bg-white dark:bg-navy-900/50 border-y border-gray-200 dark:border-navy-800 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="section-label">Why JERA</p>
              <h2 className="font-serif text-2xl font-bold text-navy-700 dark:text-white mb-4">Rigorous Science. Open Access. Global Reach.</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">Founded by faculty from Delhi Technological University and MMMUT Gorakhpur, JERA provides a dedicated platform for civil engineers and researchers worldwide to share high-impact findings in a trusted, fully open-access environment.</p>
              <ul className="space-y-3">
                {['Double-blind peer review by domain experts', 'DOI assignment via Crossref for every article', 'Google Scholar indexed with Highwire Press metadata', 'CC BY 4.0 — free to read, share, adapt', 'Average first decision within 28 days', 'Zero publication charges in 2025–2026'].map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Globe, label: '8+ Countries', sub: 'Represented on editorial board' },
                { icon: Users, label: '15+ Editors', sub: 'From DTU, MMMUT, NIT, VNIT, WRI & more' },
                { icon: Clock, label: '28 Days', sub: 'Average time to first decision' },
                { icon: Award, label: 'Free (2026)', sub: 'Zero article processing charges' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="stat-box dark:bg-navy-800/50">
                  <Icon className="w-6 h-6 text-ocean-500 mb-2" />
                  <span className="font-serif text-xl font-bold text-navy-700 dark:text-white">{label}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">{sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
