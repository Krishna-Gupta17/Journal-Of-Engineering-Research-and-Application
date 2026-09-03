import type { Metadata } from 'next'
import { PageWrapper } from '@/components/layout/PageWrapper'
import Link from 'next/link'
import { CheckCircle, Globe, BookOpen, Award, ArrowRight, Building2, Users, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About JERA | Journal of Engineering Research Application',
  description: 'JERA is a peer-reviewed, open-access international journal publishing high-quality research in Civil Engineering, anchored at Delhi Technological University and MMMUT Gorakhpur.',
}

export default function AboutPage() {
  return (
    <PageWrapper
      title="About the Journal"
      subtitle="JERA — Journal of Engineering Research Application"
      breadcrumbs={[{ label: 'About JERA' }]}
    >
      <div className="max-w-4xl space-y-10">

        {/* Mission statement */}
        <section className="card p-7 bg-gradient-to-br from-navy-50 to-blue-50 dark:from-navy-800/30 dark:to-navy-900/30 border-navy-200 dark:border-navy-700">
          <p className="section-label">Our Mission</p>
          <h2 className="font-serif text-2xl font-bold text-navy-700 dark:text-white mb-4 leading-snug">
            Advancing Engineering Knowledge<br />for a Better Built World
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
            The <strong>Journal of Engineering Research Application (JERA)</strong> is an international, open-access, double-blind peer-reviewed scientific journal dedicated to publishing original, impactful research in Civil Engineering and its allied disciplines. JERA bridges fundamental research and engineering practice — publishing work that advances both scientific understanding and real-world infrastructure solutions.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Founded by academics from <strong>Delhi Technological University (DTU)</strong> and <strong>Madan Mohan Malaviya University of Technology (MMMUT), Gorakhpur</strong>, JERA reflects a commitment to rigorous scholarship, editorial transparency, and equitable global access to engineering knowledge.
          </p>
        </section>

        {/* Key features */}
        <section>
          <p className="section-label">Why JERA</p>
          <h2 className="font-serif text-xl font-bold text-navy-700 dark:text-white mb-5">Journal Highlights</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Globe, title: 'Fully Open Access', text: 'Every published article is immediately and permanently free to read, download, and share worldwide under the Creative Commons CC BY 4.0 license — no paywalls, no embargoes.' },
              { icon: BookOpen, title: 'Double-Blind Peer Review', text: 'Author and reviewer identities remain mutually confidential throughout evaluation, ensuring unbiased, merit-based editorial decisions.' },
              { icon: Award, title: 'DOI via Crossref', text: 'Each article receives a permanent Digital Object Identifier registered with Crossref, ensuring long-term discoverability and citability in all major databases.' },
              { icon: Zap, title: 'Rapid First Decision', text: 'Our editorial team targets a first decision within 28 days of submission, with accepted manuscripts published online within 10 business days.' },
              { icon: Users, title: 'International Editorial Board', text: 'Our board includes faculty from DTU, MMMUT, NIT Delhi, VNIT Nagpur, GLA University, WRI Washington D.C., Beijing Forestry University, and University of Peradeniya.' },
              { icon: Building2, title: 'Zero Publication Fee', text: 'JERA has waived all Article Processing Charges (APC) for its inaugural period (2025–2026). Authors from all countries may publish at no cost.' },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="card p-5 flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-ocean-50 dark:bg-ocean-900/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-ocean-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">{title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Journal info table */}
        <section>
          <p className="section-label">Publication Details</p>
          <h2 className="font-serif text-xl font-bold text-navy-700 dark:text-white mb-4">Journal Information</h2>
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {[
                  ['Journal Title', 'Journal of Engineering Research Application'],
                  ['Abbreviation / Short Title', 'JERA'],
                  ['Publisher', 'JERA Publications'],
                  ['Founding Institutions', 'Delhi Technological University (DTU) & MMMUT Gorakhpur, India'],
                  ['ISSN (Online)', 'Applied / To be assigned'],
                  ['Frequency', 'Quarterly — 4 issues per year'],
                  ['Launch Year', '2026'],
                  ['Language of Publication', 'English'],
                  ['License', 'Creative Commons Attribution 4.0 International (CC BY 4.0)'],
                  ['Primary Scope', 'Civil Engineering & Allied Disciplines'],
                  ['Review Process', 'Double-blind peer review (minimum 2 independent reviewers)'],
                  ['Article Processing Charge', 'USD 0 — Full waiver during 2025–2026'],
                  ['DOI Registration', 'Crossref (upon acceptance)'],
                  ['Plagiarism Screening', 'iThenticate — threshold ≤ 15%'],
                ].map(([k, v], i) => (
                  <tr key={k} className={`border-b border-gray-100 dark:border-navy-800 last:border-0 ${i % 2 === 0 ? 'bg-white dark:bg-transparent' : 'bg-gray-50 dark:bg-navy-800/20'}`}>
                    <td className="px-5 py-3 font-semibold text-xs text-gray-700 dark:text-gray-300 w-52">{k}</td>
                    <td className="px-5 py-3 text-xs text-gray-600 dark:text-gray-400">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Scope preview */}
        <section className="card p-6">
          <p className="section-label">Coverage</p>
          <h2 className="font-serif text-lg font-bold text-navy-700 dark:text-white mb-3">Disciplines Covered</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
            {['Civil Engineering', 'Structural Engineering', 'Geotechnical Engineering', 'Transportation Engineering', 'Environmental Engineering', 'Water Resources Engineering', 'Construction Management', 'Earthquake Engineering', 'Smart Infrastructure', 'Wind Engineering', 'Building Materials', 'Disaster Risk Reduction'].map(d => (
              <div key={d} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <CheckCircle className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />{d}
              </div>
            ))}
          </div>
          <Link href="/aims-scope" className="text-xs text-ocean-500 hover:text-ocean-600 font-semibold flex items-center gap-1">
            View full Aims & Scope <ArrowRight className="w-3 h-3" />
          </Link>
        </section>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          <Link href="/aims-scope" className="btn-primary">View Aims & Scope <ArrowRight className="w-4 h-4" /></Link>
          <Link href="/editorial-board" className="btn-secondary">Editorial Board</Link>
          <Link href="/submit-manuscript" className="btn-accent">Submit a Manuscript</Link>
        </div>

      </div>
    </PageWrapper>
  )
}
