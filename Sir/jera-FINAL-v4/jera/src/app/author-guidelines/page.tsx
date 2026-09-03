import type { Metadata } from 'next'
import { PageWrapper } from '@/components/layout/PageWrapper'
import Link from 'next/link'
import { Download, AlertCircle, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Author Guidelines | JERA',
  description: 'Manuscript preparation, formatting, structure, reference style, and submission guidelines for JERA authors.',
}

export default function AuthorGuidelinesPage() {
  return (
    <PageWrapper
      title="Author Guidelines"
      subtitle="Everything you need to prepare and submit a manuscript to JERA"
      breadcrumbs={[{ label: 'For Authors' }, { label: 'Author Guidelines' }]}
    >
      <div className="max-w-4xl space-y-10">

        {/* Template download */}
        <div className="card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-navy-50 to-blue-50 dark:from-navy-800/30 dark:to-navy-900/20 border-navy-200 dark:border-navy-700">
          <div>
            <p className="font-semibold text-sm text-navy-700 dark:text-white">Download the Official JERA Manuscript Template</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Pre-formatted Word document with all required sections, styles, and instructions embedded</p>
          </div>
          <Link href="/downloads" className="btn-primary flex-shrink-0 text-sm">
            <Download className="w-4 h-4" /> Download Template
          </Link>
        </div>

        {/* General */}
        <section>
          <p className="section-label">General Requirements</p>
          <h2 className="font-serif text-xl font-bold text-navy-700 dark:text-white mb-4">Before You Submit</h2>
          <div className="card p-5 space-y-2 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>All manuscripts submitted to JERA must be: (1) written in English (either British or American spelling, used consistently throughout); (2) original work not published elsewhere in any form, and not currently under review at any other journal; (3) prepared using the official JERA Microsoft Word template; and (4) free from identifying author information in the main manuscript file (double-blind review).</p>
            <p>Submissions that do not meet these basic requirements will be desk-rejected at the initial editorial check without peer review.</p>
          </div>
        </section>

        {/* Formatting */}
        <section>
          <p className="section-label">Formatting</p>
          <h2 className="font-serif text-xl font-bold text-navy-700 dark:text-white mb-4">Manuscript Formatting Requirements</h2>
          <div className="card overflow-hidden">
            <table className="w-full text-xs">
              <thead><tr className="bg-navy-700"><th className="text-left px-4 py-3 text-white font-semibold">Element</th><th className="text-left px-4 py-3 text-white font-semibold">Specification</th></tr></thead>
              <tbody>
                {[
                  ['Body text font', 'Times New Roman, 12 pt'],
                  ['Heading 1 (Section)', 'Times New Roman Bold, 14 pt, numbered (e.g., 1. Introduction)'],
                  ['Heading 2 (Subsection)', 'Times New Roman Bold Italic, 12 pt, numbered (e.g., 1.1)'],
                  ['Heading 3', 'Times New Roman Italic, 12 pt, numbered (e.g., 1.1.1)'],
                  ['Line spacing', 'Double-spaced throughout (including abstract, references, captions)'],
                  ['Margins', '2.54 cm (1 inch) on all four sides'],
                  ['Page size', 'A4 (210 × 297 mm)'],
                  ['Page numbers', 'Bottom centre, beginning from Title Page'],
                  ['Column format', 'Single column for submission; JERA handles final typesetting'],
                  ['File format (submission)', '.DOCX (preferred) or .PDF for initial submission'],
                  ['Maximum file size', '20 MB for manuscript; figures may be submitted separately'],
                  ['Line numbers', 'Continuous line numbers throughout the manuscript (aids review)'],
                ].map(([el, spec], i) => (
                  <tr key={el} className={`border-b border-gray-100 dark:border-navy-800 ${i % 2 ? 'bg-gray-50/50 dark:bg-navy-800/20' : ''}`}>
                    <td className="px-4 py-2.5 font-medium text-gray-700 dark:text-gray-300">{el}</td>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">{spec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Manuscript structure */}
        <section>
          <p className="section-label">Structure</p>
          <h2 className="font-serif text-xl font-bold text-navy-700 dark:text-white mb-4">Required Manuscript Structure</h2>
          <div className="space-y-2.5">
            {[
              { section: 'Title Page', req: 'Separate file', desc: 'Full article title; full names of all authors (in order); affiliations (department, institution, city, country); corresponding author\'s email; ORCID iDs where available; total word count (excluding abstract and references); number of figures; number of tables; and conflict of interest statement. The Title Page is NEVER included in the main manuscript file (to preserve blind review).' },
              { section: 'Abstract', req: '200–300 words', desc: 'Structured abstract with four labelled sub-sections: Background/Objectives — Methods — Results — Conclusions. The abstract must be self-contained with no citations, abbreviations (unless defined), or references to figures/tables. It must clearly convey the engineering significance of the work.' },
              { section: 'Keywords', req: '4–8 terms', desc: 'Lowercase, comma-separated. Avoid repeating exact words from the title (search engines already index titles). Choose standard discipline terminology used in your field\'s indexing systems. Do not use abbreviations as keywords.' },
              { section: 'Introduction', req: 'No word limit', desc: 'Establish background and context; critically review existing literature (cited); clearly identify the research gap or problem being addressed; explicitly state the research objectives and, where applicable, the hypotheses. The introduction should not contain results or conclusions.' },
              { section: 'Materials & Methods', req: 'No word limit', desc: 'Provide sufficient detail for an independent researcher to reproduce all experimental, computational, or field procedures. Include materials specifications, equipment (manufacturer, model, country), software (name, version, vendor), statistical methods and significance thresholds, and ethical approvals where applicable. For established methods, a citation is sufficient with any modifications described.' },
              { section: 'Results', req: 'No word limit', desc: 'Present findings in a logical, objective sequence. All figures and tables must be numbered consecutively in the order they first appear in text. Do not repeat in text what is fully evident from figures or tables. Highlight the most significant findings.' },
              { section: 'Discussion', req: 'No word limit', desc: 'Interpret results in the context of the existing literature. Compare your findings with related published work. Discuss theoretical and practical implications. Address limitations of the study honestly. Results and Discussion may be combined if this improves clarity.' },
              { section: 'Conclusions', req: 'No word limit', desc: 'Concise, numbered summary of the main findings directly answering the stated objectives. Do not introduce new data or citations. Optionally include recommendations for future research.' },
              { section: 'Acknowledgements', req: 'Optional', desc: 'Funding sources (grant numbers required), technical assistance, material donations, and institutional support. Do not acknowledge reviewers by name. Authors with no acknowledgements should omit this section entirely.' },
              { section: 'Conflict of Interest Statement', req: 'Mandatory', desc: 'Must be included in both the Title Page and at the end of the manuscript (before references). If no conflicts exist, state: "The authors declare that they have no known competing financial interests or personal relationships that could have appeared to influence the work reported in this paper."' },
              { section: 'References', req: 'Mandatory', desc: 'Vancouver/numbered citation format (see Reference Style section below). Minimum 20 references for full research articles. All DOIs must be included where available. References must be complete and accurate.' },
            ].map(({ section, req, desc }) => (
              <div key={section} className="card p-4 flex gap-4">
                <div className="w-36 flex-shrink-0">
                  <span className="font-semibold text-xs text-navy-700 dark:text-white block">{section}</span>
                  <span className="tag mt-1.5 text-xs">{req}</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed flex-1">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Figures & Tables */}
        <section>
          <p className="section-label">Visual Elements</p>
          <h2 className="font-serif text-xl font-bold text-navy-700 dark:text-white mb-4">Figures & Tables</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="card p-5">
              <h3 className="font-semibold text-sm text-navy-700 dark:text-white mb-3">Figures</h3>
              <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                {['Minimum resolution: 300 DPI for photographs/halftones; 600 DPI for line art and graphs', 'Accepted formats: TIFF, PNG, EPS (preferred); JPEG at maximum quality is acceptable', 'Figures must also be embedded in-text at appropriate locations', 'Separate high-resolution figure files must be uploaded as supplementary files', 'All axes, labels, and legends must be clearly legible at published size (minimum 8 pt)', 'Colour figures are published at no extra charge; ensure figures are interpretable in greyscale', 'Figure captions placed BELOW the figure, numbered consecutively (Figure 1, Figure 2…)', 'Scale bars must be included for micrographs and cross-sections'].map(item => (
                  <li key={item} className="flex items-start gap-1.5"><CheckCircle className="w-3 h-3 text-teal-600 flex-shrink-0 mt-0.5" />{item}</li>
                ))}
              </ul>
            </div>
            <div className="card p-5">
              <h3 className="font-semibold text-sm text-navy-700 dark:text-white mb-3">Tables</h3>
              <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                {['Tables must be editable (Word format); do not submit tables as images', 'Table titles placed ABOVE the table, numbered consecutively (Table 1, Table 2…)', 'Each table must be self-explanatory with a descriptive title', 'Use footnotes (a, b, c…) for explanations within a table', 'Avoid excessive use of ruling (horizontal); use only top, header, and bottom borders', 'Large tables may be published as supplementary material', 'Statistical significance should be clearly indicated (e.g., p < 0.05*)', 'Units must be stated in column headers'].map(item => (
                  <li key={item} className="flex items-start gap-1.5"><CheckCircle className="w-3 h-3 text-teal-600 flex-shrink-0 mt-0.5" />{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Reference style */}
        <section>
          <p className="section-label">Citations</p>
          <h2 className="font-serif text-xl font-bold text-navy-700 dark:text-white mb-4">Reference Style — Vancouver (Numbered)</h2>
          <div className="card p-5 space-y-4">
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              JERA uses the <strong>Vancouver numbered reference system</strong>. References are cited in-text as superscript numbers [1] or [1,3,5] or [1–4], numbered in the order of first appearance. The reference list at the end of the manuscript presents all sources in the order they are cited.
            </p>
            <div>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Format Examples:</p>
              <div className="space-y-2.5 text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-navy-800 p-4 rounded-lg leading-relaxed">
                <p><strong className="text-gray-700 dark:text-gray-300 not-italic">[Journal Article]</strong><br />
                Sharma AK, Al-Rashid M, Vasquez-Torres E. Structural performance of HSC beams reinforced with hybrid GFRP-steel bars. J Eng Res Appl. 2026;1(1):1–18. https://doi.org/10.56789/jera.2026.v1i1.001</p>
                <p><strong className="text-gray-700 dark:text-gray-300 not-italic">[Book]</strong><br />
                Das BM. Principles of Geotechnical Engineering. 9th ed. Cengage Learning; 2019.</p>
                <p><strong className="text-gray-700 dark:text-gray-300 not-italic">[Conference Paper]</strong><br />
                Raj R, Paswan AP. Wind pressure distribution on low-rise buildings. In: Proceedings of the 15th ICWE; 2019 Sep 1–6; Beijing, China. p. 234–241.</p>
                <p><strong className="text-gray-700 dark:text-gray-300 not-italic">[Standard / Code]</strong><br />
                Bureau of Indian Standards. IS 456:2000 — Plain and Reinforced Concrete — Code of Practice. 4th rev. BIS; 2000.</p>
                <p><strong className="text-gray-700 dark:text-gray-300 not-italic">[Thesis]</strong><br />
                Paswan AP. Rainfall-induced landslide monitoring using advanced sensor systems [PhD thesis]. Delhi Technological University; 2023.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Plagiarism */}
        <div className="card p-5 border-l-4 border-l-red-400 bg-red-50 dark:bg-red-900/10">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm text-red-700 dark:text-red-400 mb-1">Plagiarism Screening Policy</p>
              <p className="text-xs text-red-600 dark:text-red-300 leading-relaxed">
                All manuscripts are screened using <strong>iThenticate</strong> upon submission. Manuscripts with a similarity index exceeding <strong>15%</strong> (excluding the reference list) will be desk-rejected without peer review. Self-plagiarism from the authors' own prior publications exceeding <strong>20%</strong> is also grounds for rejection. Authors are encouraged to check their manuscripts using Turnitin or similar tools before submission.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/submit-manuscript" className="btn-primary">Submit Your Manuscript</Link>
          <Link href="/downloads" className="btn-secondary">Download Template</Link>
          <Link href="/peer-review" className="btn-secondary">Peer Review Process</Link>
        </div>
      </div>
    </PageWrapper>
  )
}
