import type { Metadata } from 'next'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Download, FileText, File, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Downloads',
  description: 'Download manuscript templates, forms, and guidelines for JERA.',
}

const downloads = [
  {
    category: 'Manuscript Templates',
    files: [
      { name: 'JERA Manuscript Template (Word)', size: '154 KB', format: 'DOCX', desc: 'Complete manuscript template with all required sections, formatting, and style guide embedded as comments.', file: 'JERA-Manuscript-Template.docx' },
      { name: 'JERA Manuscript Template (LaTeX)', size: '28 KB', format: 'ZIP', desc: 'LaTeX/Overleaf template package for authors preferring typesetting in LaTeX. Includes bibliography style file.', file: 'JERA-LaTeX-Template.zip' },
    ],
  },
  {
    category: 'Cover Letter & Forms',
    files: [
      { name: 'Author Cover Letter Template', size: '42 KB', format: 'DOCX', desc: 'Suggested cover letter structure with all required declarations and disclosure statements.', file: 'JERA-Cover-Letter.docx' },
      { name: 'Copyright Transfer Agreement', size: '38 KB', format: 'PDF', desc: 'CC BY 4.0 author license agreement (executed upon acceptance; not required at submission).', file: 'JERA-Copyright-Agreement.pdf' },
    ],
  },
  {
    category: 'Guidelines & Policies',
    files: [
      { name: 'Author Guidelines (PDF)', size: '1.2 MB', format: 'PDF', desc: 'Complete JERA author guidelines including formatting requirements, reference style, and ethical policies.', file: 'JERA-Author-Guidelines.pdf' },
      { name: 'Reviewer Evaluation Form', size: '56 KB', format: 'DOCX', desc: 'Standard peer review evaluation form used by JERA reviewers. Useful reference for authors.', file: 'JERA-Reviewer-Form.docx' },
      { name: 'Figure Preparation Guide', size: '890 KB', format: 'PDF', desc: 'Technical requirements for figure resolution, file formats, labeling, and color specifications.', file: 'JERA-Figure-Guide.pdf' },
    ],
  },
]

const formatIcon = (format: string) => {
  if (format === 'PDF') return '📄'
  if (format === 'DOCX') return '📝'
  if (format === 'ZIP') return '🗜️'
  return '📁'
}

export default function DownloadsPage() {
  return (
    <PageWrapper
      title="Downloads"
      subtitle="Templates, guidelines, and forms for JERA authors"
      breadcrumbs={[{ label: 'Downloads' }]}
    >
      <div className="max-w-4xl space-y-8">
        <div className="card p-4 flex items-start gap-3 border-ocean-200 dark:border-ocean-800 bg-ocean-50 dark:bg-ocean-900/10">
          <CheckCircle className="w-4 h-4 text-ocean-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-ocean-700 dark:text-ocean-300">
            All templates are provided free of charge. Using the official template ensures your manuscript meets JERA's formatting requirements and reduces the likelihood of a desk rejection for formatting issues.
          </p>
        </div>

        {downloads.map(({ category, files }) => (
          <section key={category}>
            <p className="section-label">{category}</p>
            <div className="space-y-3">
              {files.map(({ name, size, format, desc, file }) => (
                <div key={name} className="card p-5 flex items-start gap-4">
                  <div className="text-2xl flex-shrink-0">{formatIcon(format)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-sm text-gray-900 dark:text-white">{name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{format} · {size}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">{desc}</p>
                      </div>
                      <a
                        href={`/templates/${file}`}
                        download
                        className="btn-primary text-xs flex-shrink-0 flex items-center gap-1.5"
                        title={`Download ${name}`}
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className="card p-5 bg-navy-50 dark:bg-navy-800/30 border-navy-200 dark:border-navy-700">
          <h3 className="font-semibold text-sm text-navy-700 dark:text-white mb-2">Need Additional Support?</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
            If you require a template format not listed here (e.g., Overleaf link, specific accessibility format), or if you have questions about manuscript preparation, please contact the editorial office.
          </p>
          <a href="mailto:editor@jera-journal.org" className="btn-secondary text-xs">Contact Editorial Office</a>
        </div>
      </div>
    </PageWrapper>
  )
}
