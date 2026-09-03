import type { Metadata } from 'next'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Clock, CheckCircle, Shield, Users } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Peer Review Process | JERA',
  description: "JERA's double-blind peer review process — step-by-step workflow, timelines, and reviewer guidelines.",
}

export default function PeerReviewPage() {
  return (
    <PageWrapper
      title="Peer Review Process"
      subtitle="Rigorous, transparent, double-blind evaluation for every submission"
      breadcrumbs={[{ label: 'For Authors' }, { label: 'Peer Review Process' }]}
    >
      <div className="max-w-4xl space-y-10">

        {/* Overview stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Shield, label: 'Double-Blind', desc: 'Identities of authors and reviewers kept confidential throughout' },
            { icon: Clock, label: '28 Days', desc: 'Target time from submission to first editorial decision' },
            { icon: Users, label: 'Min. 2 Reviewers', desc: 'Independent domain experts per manuscript' },
            { icon: CheckCircle, label: 'COPE Compliant', desc: 'All decisions follow COPE guidelines and flowcharts' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="stat-box">
              <Icon className="w-6 h-6 text-ocean-500 mb-2" />
              <span className="font-serif text-base font-bold text-navy-700 dark:text-white">{label}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center leading-snug">{desc}</span>
            </div>
          ))}
        </div>

        {/* Policy statement */}
        <section className="card p-6 bg-gradient-to-br from-navy-50 to-blue-50 dark:from-navy-800/30 dark:to-navy-900/20 border-navy-200 dark:border-navy-700">
          <p className="section-label">Review Philosophy</p>
          <h2 className="font-serif text-xl font-bold text-navy-700 dark:text-white mb-3">Our Commitment to Fair, Rigorous Review</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            JERA employs a <strong>double-blind peer review</strong> process for all research submissions. The identities of authors are concealed from reviewers, and reviewer identities are concealed from authors, throughout the entire evaluation process. This model minimises unconscious bias arising from author reputation, institutional prestige, nationality, or gender, and ensures that manuscripts are judged solely on scientific merit. JERA's review process follows the COPE Core Practices and all editorial decisions are handled with complete transparency.
          </p>
        </section>

        {/* Step-by-step */}
        <section>
          <p className="section-label">Workflow</p>
          <h2 className="font-serif text-xl font-bold text-navy-700 dark:text-white mb-6">Step-by-Step Review Process</h2>
          <div className="space-y-0">
            {[
              {
                num: 1, title: 'Manuscript Submission', duration: 'Day 0',
                desc: 'Author submits the manuscript (anonymised, no author details) along with the Title Page (separate file), cover letter, and any supplementary files via the JERA online submission portal. The system generates a unique tracking number (e.g., JERA-2026-001) and sends a confirmation email to the corresponding author.',
              },
              {
                num: 2, title: 'Initial Editorial Check', duration: '1–5 working days',
                desc: 'The Managing Editor conducts a preliminary technical check covering: (i) alignment with JERA\'s aims and scope; (ii) basic formatting compliance with Author Guidelines; (iii) plagiarism screening via iThenticate (threshold: ≤15% similarity excluding references); (iv) completeness of submission (all required files present). Manuscripts failing any check are returned to authors with specific reasons.',
              },
              {
                num: 3, title: 'Assignment to Handling Editor', duration: '3–7 working days',
                desc: 'The Editor-in-Chief assigns the manuscript to a Handling Editor (Associate Editor or Section Editor) with relevant expertise in the sub-discipline. The Handling Editor conducts an independent preliminary assessment of the manuscript\'s scientific merit, novelty, and significance before deciding whether to send it for external review or recommend desk rejection.',
              },
              {
                num: 4, title: 'Reviewer Identification & Invitation', duration: '5–14 days',
                desc: 'The Handling Editor identifies a minimum of two independent, qualified reviewers who are experts in the manuscript\'s specific topic area. Reviewers must not have any conflict of interest with the authors (no co-authorship in the past 3 years, no institutional affiliation, no personal relationship). Reviewers are invited via email with a 7-day response window to accept or decline.',
              },
              {
                num: 5, title: 'Double-Blind Peer Review', duration: '21–35 days',
                desc: 'Accepted reviewers evaluate the manuscript against JERA\'s structured review form, assessing: originality and novelty; adequacy and rigor of methodology; accuracy and clarity of results; quality of discussion and interpretation; engineering significance and contribution to knowledge; language clarity; adequacy of citations and references. Reviewers provide a recommendation (Accept / Minor Revision / Major Revision / Reject) along with specific comments for the editor (confidential) and comments for the author.',
              },
              {
                num: 6, title: 'Handling Editor Decision', duration: 'Within 5 days of receiving reviews',
                desc: 'The Handling Editor reviews all reviewer reports and makes one of four editorial decisions: (1) Accept As Is; (2) Minor Revision Required; (3) Major Revision Required; (4) Reject. The decision letter — including all reviewer comments — is sent to the corresponding author via email. Rejection decisions include substantive reasons.',
              },
              {
                num: 7, title: 'Author Revision', duration: '14 days (minor) / 30 days (major)',
                desc: 'Authors must submit a revised manuscript together with a detailed point-by-point response letter addressing every comment raised by the reviewers. Each reviewer comment must be answered specifically; general statements that "changes have been made" are not acceptable. Authors must highlight all changes in the revised manuscript (using track changes or highlighted text).',
              },
              {
                num: 8, title: 'Re-Review (if Major Revision)', duration: 'Up to 21 days',
                desc: 'Major revisions are returned to the original reviewers who assess whether their concerns have been adequately addressed. If the revision is satisfactory, the reviewer recommends acceptance. If concerns remain, a further round of revision may be requested. Minor revisions may be assessed by the Handling Editor alone, without returning to reviewers.',
              },
              {
                num: 9, title: 'Final Acceptance & Production', duration: '5–10 working days after acceptance',
                desc: 'Upon final acceptance, the corresponding author receives a formal Acceptance Letter. The manuscript enters production: professional typesetting, proofreading, and XML/PDF generation. Typeset proofs are sent to the corresponding author for checking (48-hour turnaround requested). Following proof approval, the article is published online with a Crossref-registered DOI.',
              },
            ].map((step, i, arr) => (
              <div key={step.num} className="flex gap-5">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-navy-700 dark:bg-navy-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 z-10">
                    {step.num}
                  </div>
                  {i < arr.length - 1 && <div className="w-0.5 flex-1 bg-navy-200 dark:bg-navy-700 my-1 min-h-[24px]" />}
                </div>
                {/* Content */}
                <div className={`flex-1 pb-6 ${i === arr.length - 1 ? '' : ''}`}>
                  <div className="card p-5">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-semibold text-sm text-navy-700 dark:text-white">{step.title}</h3>
                      <span className="text-xs px-2 py-0.5 bg-ocean-50 text-ocean-600 dark:bg-ocean-900/30 dark:text-ocean-300 rounded-full font-medium flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />{step.duration}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Decision types */}
        <section>
          <p className="section-label">Outcomes</p>
          <h2 className="font-serif text-xl font-bold text-navy-700 dark:text-white mb-4">Editorial Decision Types</h2>
          <div className="space-y-3">
            {[
              { decision: 'Accept', color: 'green', freq: 'Rare on first submission (~5%)', desc: 'The manuscript is accepted for publication with only minor copyediting. This outcome is uncommon on first submission; most accepted manuscripts undergo at least one round of revision.' },
              { decision: 'Minor Revision', color: 'blue', freq: 'Common (~30%)', desc: 'The manuscript is likely acceptable but requires specific, limited corrections to text, data presentation, figures, or references. Authors should complete revisions within 14 days. Re-review by the original reviewers is typically not required for minor revisions.' },
              { decision: 'Major Revision', color: 'amber', freq: 'Most common (~40%)', desc: 'Significant scientific, methodological, or presentation concerns must be fully addressed before the manuscript can be accepted. Revised manuscripts are returned to the original reviewers. Authors should complete major revisions within 30 days and provide a comprehensive response letter.' },
              { decision: 'Reject', color: 'red', freq: '~25% after review', desc: 'The manuscript does not meet JERA\'s standards for originality, methodological rigor, or significance, or the concerns raised by reviewers cannot be adequately addressed through revision. Rejection decisions include specific reasons. Authors may not resubmit the same manuscript unless it has been substantially reconceived.' },
            ].map(({ decision, color, freq, desc }) => (
              <div key={decision} className={`card p-5 border-l-4 ${color === 'green' ? 'border-l-green-500' : color === 'blue' ? 'border-l-ocean-500' : color === 'amber' ? 'border-l-amber-500' : 'border-l-red-500'}`}>
                <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white">{decision}</h3>
                  <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">{freq}</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* For reviewers */}
        <section className="card p-6 bg-navy-50 dark:bg-navy-800/30 border-navy-200 dark:border-navy-700">
          <h3 className="font-serif font-bold text-navy-700 dark:text-white mb-3">Become a Reviewer for JERA</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            JERA values the essential contribution of our reviewer community and is always seeking qualified experts to join our reviewer database. If you hold a doctoral degree and have published peer-reviewed research in civil engineering or allied disciplines, we welcome your application. Reviewers who complete timely, high-quality reviews are acknowledged in JERA's annual reviewer recognition list.
          </p>
          <a href="mailto:editor@jera-journal.org?subject=Reviewer Application — JERA" className="btn-primary text-sm">
            Apply as a Reviewer
          </a>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link href="/submit-manuscript" className="btn-primary">Submit a Manuscript</Link>
          <Link href="/author-guidelines" className="btn-secondary">Author Guidelines</Link>
          <Link href="/ethics-policy" className="btn-secondary">Publication Ethics</Link>
        </div>

      </div>
    </PageWrapper>
  )
}
