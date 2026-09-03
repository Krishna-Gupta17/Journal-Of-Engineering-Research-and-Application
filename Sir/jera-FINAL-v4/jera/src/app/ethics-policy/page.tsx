import type { Metadata } from 'next'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Shield, AlertTriangle, CheckCircle, Scale, Eye, RefreshCw } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Ethics & Publication Policy | JERA',
  description: 'Publication ethics policy of JERA — covering authorship, plagiarism, data integrity, conflict of interest, and COPE compliance.',
}

export default function EthicsPolicyPage() {
  return (
    <PageWrapper
      title="Ethics & Publication Policy"
      subtitle="JERA is committed to the highest standards of research integrity and publication ethics"
      breadcrumbs={[{ label: 'Ethics & Publication Policy' }]}
    >
      <div className="max-w-4xl space-y-8">

        {/* COPE badge */}
        <div className="card p-5 flex items-start gap-4 bg-gradient-to-r from-navy-50 to-blue-50 dark:from-navy-800/30 dark:to-navy-900/20 border-navy-200 dark:border-navy-700">
          <div className="w-12 h-12 rounded-lg bg-navy-700 flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-semibold text-sm text-navy-700 dark:text-white">COPE — Committee on Publication Ethics</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
              JERA follows the guidelines of the <strong>Committee on Publication Ethics (COPE)</strong> in all its editorial decisions. All editors, reviewers, and authors are expected to adhere to the COPE Code of Conduct, Core Practices, and Best Practice Guidelines available at <a href="https://publicationethics.org" target="_blank" rel="noopener noreferrer" className="text-ocean-500 hover:underline">publicationethics.org</a>.
            </p>
          </div>
        </div>

        {/* Author duties */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-5 h-5 text-ocean-500" />
            <h2 className="font-serif text-xl font-bold text-navy-700 dark:text-white">Duties of Authors</h2>
          </div>
          <div className="space-y-3">
            {[
              {
                title: 'Originality and Plagiarism',
                text: 'Authors must submit only entirely original work. All sources, data, and ideas derived from other works must be appropriately cited and credited. Plagiarism in any form — including verbatim copying, paraphrasing without attribution, or idea theft — constitutes unethical behaviour and is grounds for immediate rejection or retraction. JERA screens all submissions using iThenticate. A similarity index above 15% (excluding reference list) will result in desk rejection.',
              },
              {
                title: 'Authorship Criteria',
                text: 'All listed authors must have made substantial contributions to: (1) conception or design, or acquisition, analysis, or interpretation of data; AND (2) drafting or critically revising the manuscript for important intellectual content; AND (3) approving the final version for submission; AND (4) agreeing to be accountable for all aspects of the work. Guest authorship, gift authorship, and ghost authorship are all forms of misconduct and are strictly prohibited.',
              },
              {
                title: 'Data Accuracy, Integrity & Availability',
                text: 'Authors must represent their data and findings accurately and honestly. Fabrication, falsification, selective omission, and manipulative image processing (beyond standard adjustments) are serious violations. Raw data supporting published findings should be retained for a minimum of five years and made available to editors or readers upon reasonable request. JERA encourages deposition of data in recognised public repositories.',
              },
              {
                title: 'Simultaneous Submission & Duplicate Publication',
                text: 'Submitting the same manuscript (or substantially similar versions) simultaneously to more than one journal is prohibited and constitutes a serious ethical breach. Similarly, publishing findings already reported in another peer-reviewed publication — whether in the same or a different language — without proper disclosure is redundant or duplicate publication and is unacceptable.',
              },
              {
                title: 'Acknowledgement of Sources',
                text: 'Authors must properly acknowledge the work of others. This includes citing prior publications that influenced the work, acknowledging funding sources, institutional support, and any technical or editorial assistance received. The acknowledgements section must not include names of peer reviewers.',
              },
              {
                title: 'Conflict of Interest Disclosure',
                text: 'All authors are required to disclose any financial, professional, institutional, or personal relationships that could be perceived as influencing the research or its interpretation. Disclosures include but are not limited to: employment, consultancies, stock ownership, honoraria, grants, patents held or pending, and personal relationships with parties connected to the research. If no conflicts exist, this must be explicitly stated.',
              },
              {
                title: 'Research on Human Subjects & Animals',
                text: 'Research involving human participants must have received approval from an appropriate Institutional Ethics Committee (IEC) or Institutional Review Board (IRB) and must have been conducted in accordance with the Declaration of Helsinki (2013 revision). Informed consent must have been obtained where required. Research involving animals must comply with institutional and national guidelines (e.g., CPCSEA in India). Approval numbers must be reported in the Methods section.',
              },
              {
                title: 'Errors in Published Work',
                text: 'If an author discovers a significant error, inaccuracy, or misleading statement in their published work, they have an obligation to notify the Editor-in-Chief promptly and to cooperate in issuing a Correction notice or, if warranted, a Retraction. Failure to report known errors in published work constitutes continued misconduct.',
              },
            ].map(({ title, text }) => (
              <div key={title} className="card p-5 flex gap-4">
                <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm text-navy-700 dark:text-white mb-1.5">{title}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Editor duties */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-5 h-5 text-ocean-500" />
            <h2 className="font-serif text-xl font-bold text-navy-700 dark:text-white">Duties of Editors</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Fair & impartial evaluation', text: 'Editors must evaluate manuscripts solely on their scientific merit, without regard to the authors\' nationality, institutional affiliation, gender, race, ethnicity, religion, or political belief.' },
              { title: 'Confidentiality', text: 'Editors must not disclose information about a submitted manuscript to anyone beyond those involved in the evaluation process, until a final decision has been reached and the work is published.' },
              { title: 'Conflict of interest', text: 'Editors must recuse themselves from handling manuscripts in which they have a conflict of interest (e.g., collaboration, institutional connection, or personal relationship with an author). Such manuscripts must be reassigned.' },
              { title: 'Prompt editorial process', text: 'Editors are responsible for ensuring a timely, efficient review process. Prolonged delays without cause are detrimental to authors and the integrity of the publishing process.' },
              { title: 'Acting on misconduct', text: 'Editors who receive credible evidence of research misconduct (fabrication, plagiarism, undisclosed conflicts) are obligated to investigate, following COPE flowcharts, and take appropriate action up to and including retraction.' },
              { title: 'Editorial independence', text: 'Editors make decisions independently of the publisher, advertisers, and institutional interests. Commercial considerations have no bearing on editorial decisions.' },
            ].map(({ title, text }) => (
              <div key={title} className="card p-4">
                <h3 className="font-semibold text-xs text-navy-700 dark:text-white mb-1">{title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reviewer duties */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-ocean-500" />
            <h2 className="font-serif text-xl font-bold text-navy-700 dark:text-white">Duties of Reviewers</h2>
          </div>
          <div className="card p-5 space-y-3">
            {[
              'Declare any potential conflict of interest immediately upon receiving an invitation to review, before accepting the assignment.',
              'Maintain strict confidentiality of the manuscript and its content. Reviewers must not share, discuss, or use submitted manuscripts for any purpose without the explicit permission of the Editor-in-Chief.',
              'Provide objective, specific, and constructive reviews. Personal criticism of authors is inappropriate; focus must remain on the scientific content.',
              'Evaluate manuscripts solely on scientific merit and not on the basis of the authors\' perceived identity, institutional prestige, or geographic origin.',
              'Inform the editor if they discover the author\'s identity in a double-blind submission, so an alternative reviewer may be assigned.',
              'Notify the editor promptly if they are unable to complete the review within the requested timeframe, to avoid unnecessary delays for authors.',
              'Alert the editor to any substantial similarity between the reviewed manuscript and any published paper or submitted manuscript they are aware of.',
              'Never contact authors directly about a manuscript under review without the editor\'s knowledge and permission.',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-gray-600 dark:text-gray-400">
                <CheckCircle className="w-3.5 h-3.5 text-ocean-500 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Post-publication */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <RefreshCw className="w-5 h-5 text-ocean-500" />
            <h2 className="font-serif text-xl font-bold text-navy-700 dark:text-white">Post-Publication Actions</h2>
          </div>
          <div className="space-y-3">
            {[
              { type: 'Erratum (Publisher\'s Correction)', icon: '📝', desc: 'Issued by JERA when an error introduced during production (typesetting, editing) significantly affects the accuracy or comprehensibility of the published article.' },
              { type: 'Corrigendum (Author\'s Correction)', icon: '✏️', desc: 'Issued when an author identifies an error in their published article that does not affect conclusions. For errors that do affect conclusions, a more extensive correction or expression of concern may be required.' },
              { type: 'Retraction', icon: '🔴', desc: 'A retraction notice is published when an article is found to contain fabricated data, plagiarised material, duplicate publication, or errors so significant that the conclusions are unreliable and cannot be corrected. The retracted article remains on the JERA website but is permanently and prominently marked as RETRACTED. Reasons for retraction are disclosed transparently.' },
              { type: 'Expression of Concern', icon: '⚠️', desc: 'Issued by the Editor-in-Chief when an investigation into possible misconduct is underway and the editor wishes to alert readers about the potential reliability of the published findings, while the investigation is being resolved.' },
              { type: 'Removal of Article', icon: '🚫', desc: 'In rare and extreme cases (e.g., the article poses a serious public health or safety risk, or contains illegal content), JERA reserves the right to remove an article from the online platform entirely. The DOI and bibliographic details are retained with an explanatory notice.' },
            ].map(({ type, icon, desc }) => (
              <div key={type} className="card p-4 flex gap-4">
                <span className="text-xl flex-shrink-0">{icon}</span>
                <div>
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">{type}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Report misconduct */}
        <section className="card p-6 border-l-4 border-l-amber-400 bg-amber-50 dark:bg-amber-900/10">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-sm text-amber-800 dark:text-amber-400 mb-2">Report Suspected Misconduct</h3>
              <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed mb-3">
                JERA takes all allegations of research and publication misconduct seriously. If you have evidence of, or concerns about, any potential misconduct related to a submitted or published JERA article — whether involving authors, reviewers, or editors — please contact the Editor-in-Chief in confidence at <a href="mailto:ethics@jera-journal.org" className="font-semibold underline">ethics@jera-journal.org</a>. All reports will be handled in accordance with COPE flowcharts and treated with strict confidentiality throughout the investigation process.
              </p>
              <p className="text-xs text-amber-600 dark:text-amber-400">
                <strong>Note:</strong> False or malicious allegations of misconduct are themselves a breach of publication ethics and will be treated accordingly.
              </p>
            </div>
          </div>
        </section>

        <p className="text-xs text-gray-400 dark:text-gray-500">Last reviewed and updated: January 2026. This policy is reviewed annually and updated in accordance with COPE, ICMJE, WAME, and DOAJ best practice guidelines.</p>

      </div>
    </PageWrapper>
  )
}
