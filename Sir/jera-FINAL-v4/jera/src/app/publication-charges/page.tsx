import type { Metadata } from 'next'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { CheckCircle, Info } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Publication Charges | JERA',
  description: 'JERA Article Processing Charges (APC) — full waiver for 2025–2026. Free to publish, free to read.',
}

export default function PublicationChargesPage() {
  return (
    <PageWrapper
      title="Publication Charges"
      subtitle="Transparent, equitable open access publishing"
      breadcrumbs={[{ label: 'For Authors' }, { label: 'Publication Charges' }]}
    >
      <div className="max-w-4xl space-y-8">

        {/* Big waiver banner */}
        <div className="card p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-teal-900/20 border-green-300 dark:border-green-700 text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h2 className="font-serif text-2xl font-bold text-green-800 dark:text-green-300 mb-3">
            Article Processing Charge: <span className="text-3xl">USD 0</span>
          </h2>
          <p className="text-sm text-green-700 dark:text-green-400 leading-relaxed max-w-2xl mx-auto mb-3">
            During JERA's inaugural publication period, <strong>all Article Processing Charges are fully waived</strong> for manuscripts submitted and accepted before <strong>December 31, 2026</strong>. Authors from every country and institution may publish in JERA at absolutely no cost.
          </p>
          <p className="text-xs text-green-600 dark:text-green-500">
            This waiver applies to all article types — research articles, reviews, case studies, short communications, and technical notes.
          </p>
        </div>

        {/* APC table */}
        <section>
          <p className="section-label">Fee Structure</p>
          <h2 className="font-serif text-xl font-bold text-navy-700 dark:text-white mb-4">Article Processing Charges</h2>
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-navy-700">
                  <th className="text-left px-5 py-3 text-white font-semibold text-xs">Article Type</th>
                  <th className="text-left px-5 py-3 text-white font-semibold text-xs">Standard APC (from 2027)</th>
                  <th className="text-left px-5 py-3 text-white font-semibold text-xs">2025–2026 APC</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Original Research Article', 'USD 250', 'Free (Fully Waived)'],
                  ['Review Article', 'USD 300', 'Free (Fully Waived)'],
                  ['Case Study', 'USD 200', 'Free (Fully Waived)'],
                  ['Short Communication', 'USD 150', 'Free (Fully Waived)'],
                  ['Technical Note', 'USD 150', 'Free (Fully Waived)'],
                  ['Discussion & Reply', 'By invitation only', 'N/A'],
                ].map(([type, standard, current], i) => (
                  <tr key={type} className={`border-b border-gray-100 dark:border-navy-800 last:border-0 ${i % 2 ? 'bg-gray-50/50 dark:bg-navy-800/20' : ''}`}>
                    <td className="px-5 py-3 font-medium text-xs text-gray-700 dark:text-gray-300">{type}</td>
                    <td className="px-5 py-3 text-xs text-gray-500 dark:text-gray-400">{standard}</td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold text-xs">
                        <CheckCircle className="w-3 h-3" />{current}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2">* Standard APC rates from 2027 are indicative and subject to revision. Authors will be informed of applicable charges at the time of submission.</p>
        </section>

        {/* What APC covers */}
        <section className="card p-6">
          <h2 className="font-semibold text-sm text-navy-700 dark:text-white mb-4 flex items-center gap-2">
            <Info className="w-4 h-4 text-ocean-500" /> What the APC Covers
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Professional copyediting and proofreading',
              'XML/HTML and PDF typesetting and production',
              'Digital Object Identifier (DOI) registration via Crossref',
              'Permanent open access hosting on the JERA platform',
              'Metadata submission to Google Scholar and indexing databases',
              'Digital archiving for long-term preservation',
              'Unlimited free PDF downloads for all readers globally',
              'Author dashboard with real-time download and view metrics',
              'Promotion through JERA social media, newsletter, and announcements',
              'ORCID integration and author profile linkage',
            ].map(item => (
              <div key={item} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                <CheckCircle className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 mt-0.5" />{item}
              </div>
            ))}
          </div>
        </section>

        {/* No hidden charges */}
        <section className="card p-6 border-l-4 border-l-ocean-500">
          <h2 className="font-semibold text-sm text-navy-700 dark:text-white mb-3">No Hidden Charges — Ever</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              ['Submission fee', 'None'],
              ['Manuscript handling fee', 'None'],
              ['Peer review fee', 'None'],
              ['Colour figure charge', 'None'],
              ['Supplementary material hosting', 'None'],
              ['Page charges', 'None'],
              ['Resubmission fee', 'None'],
              ['Revision fee', 'None'],
            ].map(([charge, status]) => (
              <div key={charge} className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-navy-800 last:border-0 text-xs">
                <span className="text-gray-600 dark:text-gray-400">{charge}</span>
                <span className="text-green-600 dark:text-green-400 font-semibold">{status}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Waiver policy from 2027 */}
        <section className="card p-6">
          <h2 className="font-semibold text-sm text-navy-700 dark:text-white mb-3">Waiver Policy (Applicable from 2027)</h2>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            From 2027, JERA will introduce equitable APC support based on the corresponding author's country of residence:
          </p>
          <div className="space-y-2.5">
            {[
              { group: 'Low-Income Economies', policy: 'Full waiver (100%) — automatic, no application needed', color: 'green' },
              { group: 'Lower-Middle-Income Economies', policy: 'Partial waiver (50%) — automatic upon request', color: 'blue' },
              { group: 'Upper-Middle-Income Economies', policy: 'Discretionary waiver available — apply with justification', color: 'amber' },
              { group: 'High-Income Economies', policy: 'Standard APC applies — institutional/grant funding expected', color: 'gray' },
            ].map(({ group, policy, color }) => (
              <div key={group} className={`flex gap-3 p-3 rounded-lg text-xs border ${
                color === 'green' ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' :
                color === 'blue' ? 'bg-ocean-50 border-ocean-200 dark:bg-ocean-900/20 dark:border-ocean-800' :
                color === 'amber' ? 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800' :
                'bg-gray-50 border-gray-200 dark:bg-navy-800/40 dark:border-navy-700'
              }`}>
                <div>
                  <span className="font-semibold text-gray-800 dark:text-gray-200 block mb-0.5">{group}</span>
                  <span className="text-gray-600 dark:text-gray-400">{policy}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">Country classifications follow World Bank income group designations. Authors seeking a discretionary waiver should contact the editorial office <strong>before submission</strong>. Waiver requests cannot be honoured after acceptance.</p>
        </section>

        <div className="card p-4 flex items-start gap-3 border-ocean-200 dark:border-ocean-800 bg-ocean-50 dark:bg-ocean-900/10">
          <Info className="w-4 h-4 text-ocean-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-ocean-700 dark:text-ocean-300 leading-relaxed">
            JERA does not charge any fee prior to formal acceptance. If your manuscript is not accepted, you will not be charged anything. The APC is payable only after you receive a formal acceptance letter — and only from 2027 onward.
          </p>
        </div>

      </div>
    </PageWrapper>
  )
}
