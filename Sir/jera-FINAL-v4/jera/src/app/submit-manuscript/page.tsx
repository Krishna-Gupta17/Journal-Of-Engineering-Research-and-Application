'use client'

import { useState } from 'react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { ExternalLink, CheckCircle, FileText, BookOpen, Users, Shield, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const OJS_BASE = 'https://www.jera.co.in'
const OJS_SUBMIT = 'https://www.jera.co.in/index.php/jera/submission/wizard'
const OJS_LOGIN = 'https://www.jera.co.in/index.php/jera/login'
const OJS_REGISTER = 'https://www.jera.co.in/index.php/jera/user/register'

export default function SubmitManuscriptPage() {
  const [agreed, setAgreed] = useState(false)

  return (
    <PageWrapper
      title="Submit Manuscript"
      subtitle="JERA uses the Open Journal Systems (OJS) platform for all manuscript submissions"
      breadcrumbs={[{ label: 'For Authors' }, { label: 'Submit Manuscript' }]}
    >
      <div className="max-w-4xl space-y-8">

        {/* OJS Hero Card */}
        <div className="card p-8 bg-gradient-to-br from-navy-700 to-navy-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-ocean-500 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-ocean-300 text-xs font-semibold uppercase tracking-widest">Manuscript Submission Portal</p>
                <h2 className="font-serif text-xl font-bold text-white">JERA — Open Journal Systems (OJS)</h2>
              </div>
            </div>
            <p className="text-navy-200 text-sm mb-2 leading-relaxed">
              JERA uses <strong className="text-white">Open Journal Systems (OJS)</strong> — the world's leading open-source journal management and publishing platform, developed by the Public Knowledge Project (PKP). All submissions, peer review, editorial decisions, and author correspondence are handled through the OJS portal at <strong className="text-white">www.jera.co.in</strong>.
            </p>
            <p className="text-navy-300 text-xs mb-6">
              E-ISSN: 2583-3987 &nbsp;·&nbsp; Volume 1, Issue 2 Deadline: <strong className="text-white">June 30, 2026</strong> &nbsp;·&nbsp; <strong className="text-green-400">Free to Publish (No APC)</strong>
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={OJS_SUBMIT} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ocean-500 hover:bg-ocean-600 text-white font-bold text-sm px-6 py-3 rounded-lg transition-colors shadow-lg">
                <ExternalLink className="w-4 h-4" /> Submit New Manuscript
              </a>
              <a href={OJS_LOGIN} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-sm px-5 py-3 rounded-lg transition-colors">
                Log in to OJS Portal
              </a>
              <a href={OJS_REGISTER} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-sm px-5 py-3 rounded-lg transition-colors">
                Register / Create Account
              </a>
            </div>
          </div>
        </div>

        {/* Step-by-step OJS submission guide */}
        <section>
          <p className="section-label">How to Submit</p>
          <h2 className="font-serif text-xl font-bold text-navy-700 dark:text-white mb-5">
            Step-by-Step OJS Submission Guide
          </h2>
          <div className="space-y-0">
            {[
              {
                n: 1, title: 'Create an Account / Log In',
                desc: <>Visit <a href={OJS_REGISTER} target="_blank" rel="noopener noreferrer" className="text-ocean-500 hover:underline font-semibold">www.jera.co.in → Register</a>. Create a free OJS account with your institutional email address. If you already have an account, click <a href={OJS_LOGIN} target="_blank" rel="noopener noreferrer" className="text-ocean-500 hover:underline">Log In</a>. Make sure you register with the <strong>Author</strong> role.</>,
              },
              {
                n: 2, title: 'Start a New Submission',
                desc: <>After logging in, go to <strong>Submissions → New Submission</strong>, or click <a href={OJS_SUBMIT} target="_blank" rel="noopener noreferrer" className="text-ocean-500 hover:underline font-semibold">this direct link</a>. Select the correct <strong>Section</strong> (e.g., Research Article, Review Article) and confirm submission requirements.</>,
              },
              {
                n: 3, title: 'Upload Your Manuscript File',
                desc: 'Upload your anonymised manuscript file (remove all author names from the file — the Title Page is a separate upload). Accepted formats: .DOCX (preferred) or .PDF. Also upload high-resolution figure files separately. Maximum file size: 20 MB per file.',
              },
              {
                n: 4, title: 'Enter Metadata',
                desc: 'Fill in the article title, abstract (200–300 words), and keywords (4–8 terms). Add all co-authors with their names, institutional email addresses, affiliations, countries, and ORCID iDs. Designate the corresponding author.',
              },
              {
                n: 5, title: 'Upload the Title Page & Cover Letter',
                desc: 'Upload your Title Page (containing all author names, affiliations, ORCID iDs, and conflict of interest statement) as a separate supplementary file. Upload your Cover Letter addressed to the Editor-in-Chief.',
              },
              {
                n: 6, title: 'Complete Author Declarations',
                desc: 'Confirm all submission requirements in OJS: originality, no simultaneous submission, ethics approval (if applicable), and co-author agreement. Read and accept the Copyright Notice (CC BY 4.0).',
              },
              {
                n: 7, title: 'Submit & Track',
                desc: 'Click "Finish Submission". You will receive an automated confirmation email with your manuscript tracking number (e.g., JERA-2026-001). Log in to your OJS dashboard at any time to check the real-time status of your submission.',
              },
            ].map((step, i, arr) => (
              <div key={step.n} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-navy-700 dark:bg-navy-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {step.n}
                  </div>
                  {i < arr.length - 1 && <div className="w-0.5 flex-1 bg-navy-200 dark:bg-navy-700 my-1 min-h-[20px]" />}
                </div>
                <div className="flex-1 pb-5">
                  <div className="card p-5">
                    <h3 className="font-semibold text-sm text-navy-700 dark:text-white mb-2">{step.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Checklist */}
        <section className="card p-6 border-l-4 border-l-amber-400 bg-amber-50 dark:bg-amber-900/10">
          <h3 className="font-semibold text-sm text-amber-800 dark:text-amber-400 mb-3">
            ⚠ Pre-Submission Checklist — Complete Before Uploading
          </h3>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Manuscript written in English (British or American, consistent)',
              'Formatted per JERA guidelines (TNR 12pt, double-spaced, A4)',
              'Author names and affiliations REMOVED from main manuscript file',
              'Abstract is 200–300 words with structured sections',
              '4–8 keywords provided (lowercase, comma-separated)',
              'All figures minimum 300 DPI (TIFF/PNG/EPS)',
              'References in Vancouver numbered format with DOIs',
              'Title Page prepared as a SEPARATE file',
              'Cover Letter addressed to Editor-in-Chief',
              'Plagiarism check done (similarity ≤ 15% expected)',
              'All co-authors have reviewed and approved submission',
              'Conflict of Interest statement included',
            ].map(item => (
              <div key={item} className="flex items-start gap-2 text-xs text-amber-700 dark:text-amber-300">
                <CheckCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />{item}
              </div>
            ))}
          </div>
        </section>

        {/* About OJS */}
        <section>
          <p className="section-label">About the Platform</p>
          <h2 className="font-serif text-xl font-bold text-navy-700 dark:text-white mb-5">
            Why JERA Uses OJS (Open Journal Systems)
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Shield, title: 'Trusted by 10,000+ Journals', text: 'OJS is the world\'s most widely used open-source journal platform, used by leading universities and publishers across 100+ countries including journals indexed in Scopus and Web of Science.' },
              { icon: CheckCircle, title: 'Complete Editorial Workflow', text: 'OJS manages the full manuscript lifecycle: submission, plagiarism check, editor assignment, double-blind reviewer invitation, revision rounds, acceptance, and publication — all in one transparent system.' },
              { icon: Clock, title: 'Real-Time Status Tracking', text: 'Authors can log in to their OJS dashboard at any time to see the exact status of their manuscript — whether it\'s under editorial review, with reviewers, awaiting revision, or accepted.' },
              { icon: Users, title: 'Reviewer Management', text: 'OJS enables our editors to invite, track, and communicate with reviewers efficiently while maintaining double-blind confidentiality automatically.' },
              { icon: BookOpen, title: 'Google Scholar & DOI Ready', text: 'OJS-published articles are automatically structured for Google Scholar indexing. DOI registration via Crossref integrates directly into the OJS publishing workflow.' },
              { icon: FileText, title: 'Author & Reviewer Portals', text: 'Separate dashboards for authors (submission + revision tracking), reviewers (review form + deadline reminders), and editors (assignment + decision workflow) — all through one login.' },
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

        {/* OJS Setup note */}
        <section className="card p-6 bg-gradient-to-br from-ocean-50 to-blue-50 dark:from-ocean-900/20 dark:to-navy-900/20 border-ocean-200 dark:border-ocean-800">
          <h3 className="font-semibold text-sm text-ocean-800 dark:text-ocean-300 mb-3 flex items-center gap-2">
            <ExternalLink className="w-4 h-4" /> OJS Setup for JERA — Technical Notes
          </h3>
          <div className="space-y-2 text-xs text-ocean-700 dark:text-ocean-300 leading-relaxed">
            <p>JERA's OJS instance is hosted at <strong>www.jera.co.in</strong> and is pre-configured with:</p>
            <ul className="space-y-1.5 ml-4">
              {[
                'JERA journal sections (Research Article, Review Article, Case Study, Short Communication, Technical Note)',
                'Double-blind review workflow with automated reviewer invitation emails',
                'Custom submission checklist and author declaration forms',
                'Crossref DOI registration plugin (configure with your Crossref credentials)',
                'Google Scholar indexing metadata (Highwire Press tags auto-generated)',
                'iThenticate/Turnitin plagiarism screening integration (requires separate subscription)',
                'ORCID plugin for author verification',
                'Automated email notifications at every stage of the review process',
              ].map(item => (
                <li key={item} className="flex items-start gap-2"><CheckCircle className="w-3 h-3 text-ocean-500 flex-shrink-0 mt-0.5" />{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Quick links */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'Submit New Manuscript', href: OJS_SUBMIT, external: true, primary: true },
            { label: 'Author Guidelines', href: '/author-guidelines', external: false, primary: false },
            { label: 'Download Template', href: '/downloads', external: false, primary: false },
          ].map(({ label, href, external, primary }) => (
            external
              ? <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={primary ? 'btn-primary justify-center' : 'btn-secondary justify-center'}>
                  <ExternalLink className="w-4 h-4" />{label}
                </a>
              : <Link key={label} href={href} className="btn-secondary justify-center">
                  <ArrowRight className="w-4 h-4" />{label}
                </Link>
          ))}
        </div>

        {/* Help */}
        <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
          Having trouble with OJS? Contact us at{' '}
          <a href="mailto:editor@jera-journal.org" className="text-ocean-500 hover:underline font-semibold">editor@jera-journal.org</a>
          {' '}or visit{' '}
          <a href="https://www.jera.co.in" target="_blank" rel="noopener noreferrer" className="text-ocean-500 hover:underline">www.jera.co.in</a>
        </div>

      </div>
    </PageWrapper>
  )
}
