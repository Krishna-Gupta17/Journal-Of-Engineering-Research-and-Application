'use client'

import { useState } from 'react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'

const faqs = [
  {
    category: 'Submission',
    items: [
      { q: 'How do I submit a manuscript to JERA?', a: 'Submit online via the Submit Manuscript page. You will need to provide the manuscript file (anonymized for blind review), title page, abstract, keywords, and author details. A step-by-step submission portal guides you through the process.' },
      { q: 'Is there a submission fee?', a: 'No. JERA charges no submission fees, handling fees, or review fees. During our waiver period (2025–2026), there are also no Article Processing Charges (APC). Publication is completely free for authors.' },
      { q: 'Can I submit a manuscript that has been posted as a preprint?', a: 'Yes. JERA accepts manuscripts that have been posted on preprint servers such as SSRN, ResearchGate, or arXiv. You must disclose the preprint during submission, including the preprint DOI or URL.' },
      { q: 'What file formats are accepted?', a: 'JERA accepts manuscripts in .DOCX or .PDF format. The preferred format is .DOCX using the JERA manuscript template. Figure files should be submitted separately in TIFF, PNG, or EPS format at minimum 300 DPI.' },
      { q: 'Can I submit in a language other than English?', a: 'No. JERA publishes exclusively in English. If English is not your first language, we recommend having your manuscript reviewed by a professional English language editor before submission. Poor language quality is grounds for desk rejection.' },
    ],
  },
  {
    category: 'Review Process',
    items: [
      { q: 'How long does peer review take?', a: 'JERA targets a first editorial decision within 28 days from submission. This includes initial editorial screening (5–7 days) and peer review (21 days). Complex manuscripts or reviewer unavailability may extend this timeline.' },
      { q: 'How many reviewers evaluate each manuscript?', a: 'A minimum of two independent external reviewers with expertise in the relevant sub-discipline evaluate each manuscript. The Handling Editor may solicit a third review if the first two opinions diverge significantly.' },
      { q: 'What does "double-blind" review mean?', a: 'In double-blind peer review, the identities of both the authors and the reviewers are kept confidential from each other throughout the entire review process. Authors must remove all identifying information from the manuscript file before submission.' },
      { q: 'What happens after I submit a revision?', a: 'Minor revisions are typically assessed by the Handling Editor alone. Major revisions are usually returned to the original reviewers, who have 14 days to provide their updated assessment. You will receive a final decision within 10 business days of the re-review.' },
    ],
  },
  {
    category: 'Publication & Access',
    items: [
      { q: 'Is JERA truly open access?', a: 'Yes. All articles published in JERA are immediately and permanently open access under the Creative Commons Attribution 4.0 (CC BY 4.0) license. There are no paywalls, embargoes, or registration requirements for readers.' },
      { q: 'Does JERA assign DOIs?', a: 'Yes. Every published article receives a Digital Object Identifier (DOI) registered with Crossref within 24–48 hours of publication. The DOI format is: 10.56789/jera.[year].v[vol]i[iss].[num].' },
      { q: 'Is JERA indexed in Scopus or Web of Science?', a: 'JERA is a new journal (launched 2026) and is not yet indexed in Scopus or Web of Science. We are currently indexed in Google Scholar and Crossref, and have submitted indexing applications to DOAJ and ROAD. We plan to apply for Scopus after completing 2 full volumes (2027).' },
      { q: 'Can I share or reuse my published article?', a: 'Yes. Under CC BY 4.0, you can share, adapt, and redistribute your published article for any purpose, including commercially, as long as you provide appropriate credit and a link to the license. Authors retain full copyright.' },
    ],
  },
  {
    category: 'Article Requirements',
    items: [
      { q: 'What is the maximum word count?', a: 'Research articles: 4,000–8,000 words (excluding references and abstract). Review articles: up to 12,000 words. Short communications: 1,500–3,000 words. Technical notes: 1,000–2,500 words. Please contact the editorial office if your manuscript genuinely requires more space.' },
      { q: 'How should references be formatted?', a: 'JERA uses the Vancouver/numbered citation system. References are numbered in order of first appearance in the text, cited as [1] or [1,3,5]. Full reference details including DOIs are required. See the Author Guidelines for detailed examples.' },
      { q: 'Do figures need to meet a specific resolution?', a: 'Yes. All figures must be a minimum of 300 DPI (dots per inch) for halftones/photographs and 600 DPI for line art. Accepted formats are TIFF, PNG, or EPS. Figures embedded in Word documents alone are not sufficient — separate high-resolution files must be uploaded.' },
    ],
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-100 dark:border-navy-800 last:border-0">
      <button
        className="w-full flex items-start justify-between gap-4 py-4 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-medium text-sm text-gray-900 dark:text-white leading-snug">{q}</span>
        {open
          ? <ChevronUp className="w-4 h-4 text-ocean-500 flex-shrink-0 mt-0.5" />
          : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
        }
      </button>
      {open && (
        <div className="pb-4 pr-8">
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQsPage() {
  return (
    <PageWrapper
      title="Frequently Asked Questions"
      subtitle="Answers to common questions from authors, reviewers, and readers"
      breadcrumbs={[{ label: 'FAQs' }]}
    >
      <div className="max-w-3xl space-y-8">
        {faqs.map(({ category, items }) => (
          <section key={category} className="card p-6">
            <h2 className="font-serif text-lg font-bold text-navy-700 dark:text-white mb-1">{category}</h2>
            <div className="h-px bg-ocean-500 w-12 mb-4" />
            <div>
              {items.map(item => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </section>
        ))}

        <div className="card p-6 bg-navy-50 dark:bg-navy-800/30 text-center">
          <p className="font-semibold text-sm text-navy-700 dark:text-white mb-2">Still have questions?</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Our editorial office is happy to help with any query not covered above.
          </p>
          <Link href="/contact" className="btn-primary text-sm">Contact Us</Link>
        </div>
      </div>
    </PageWrapper>
  )
}
