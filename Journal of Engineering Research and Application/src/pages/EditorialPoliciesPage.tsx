import type { Metadata } from 'next'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Editorial Policies | JERA',
  description: 'Editorial policies of JERA covering open access, copyright, licensing, preprints, self-archiving, digital preservation, and more.',
}

const policies = [
  {
    title: 'Open Access Policy',
    icon: '🌐',
    text: `JERA is a fully open access journal. All published articles are immediately and permanently free to read, download, copy, redistribute, transmit, adapt, and build upon by any reader, anywhere in the world, at no cost. JERA does not operate any embargo period, tiered access model, or subscription-based reading restriction. Open access publication is funded by Article Processing Charges (APC); during the 2025–2026 inaugural period, all APCs are fully waived.`,
  },
  {
    title: 'Copyright Policy',
    icon: '©',
    text: `Authors retain full copyright of their published articles. JERA does not require transfer of copyright as a condition of publication. By submitting to JERA, authors grant the journal a non-exclusive, perpetual, worldwide licence to publish, reproduce, distribute, transmit, and communicate the work in all existing and future formats (digital, print, multimedia), subject to proper attribution to the original publication in JERA.`,
  },
  {
    title: 'Creative Commons Licensing — CC BY 4.0',
    icon: '📋',
    text: `All articles published in JERA are licensed under the Creative Commons Attribution 4.0 International (CC BY 4.0) licence. Under this licence, readers are free to Share (copy and redistribute the material in any medium or format) and Adapt (remix, transform, and build upon the material for any purpose, even commercially), provided that appropriate credit is given to the original authors and JERA, a link to the licence is provided, and any changes made are clearly indicated. Full licence terms: creativecommons.org/licenses/by/4.0`,
  },
  {
    title: 'Preprint Policy',
    icon: '📄',
    text: `JERA welcomes submissions of manuscripts that have been previously posted as preprints on recognised preprint servers including SSRN, ResearchGate, Academia.edu, arXiv, bioRxiv, EarthArXiv, engrXiv, or institutional repositories. Posting a preprint does not constitute prior publication and will not affect the editorial assessment. Authors must disclose the existence of any preprint version during submission, providing the preprint DOI or URL. Upon publication in JERA, authors are encouraged to update their preprint record with a link to the final published version.`,
  },
  {
    title: 'Self-Archiving & Green Open Access',
    icon: '📦',
    text: `JERA supports self-archiving (Green Open Access). Authors may deposit the final published PDF (Version of Record) in any open access repository — including institutional repositories, subject repositories (e.g., ZENODO, RCAAP, IndianScholar), government portals, or personal academic websites — immediately upon publication, with full attribution to the original JERA publication. There is no embargo period. Authors should always cite the JERA DOI and journal reference when self-archiving.`,
  },
  {
    title: 'Digital Preservation & Archiving',
    icon: '🗄️',
    text: `JERA is committed to the long-term digital preservation of all published content. Published articles are archived in compliance with established preservation protocols (CLOCKSS and LOCKSS). All DOIs are registered with Crossref, ensuring permanent URL resolution regardless of any future changes to the JERA website infrastructure. Authors may also deposit their work in ZENODO and similar repositories as a personal archiving measure.`,
  },
  {
    title: 'Peer Review Policy',
    icon: '🔍',
    text: `JERA employs a rigorous double-blind peer review process for all research submissions. Author identities are concealed from reviewers, and reviewer identities are concealed from authors, throughout the entire evaluation process. All manuscripts undergo an initial editorial assessment for scope, quality, and completeness before being sent for external review. A minimum of two independent reviewers is required for every manuscript. The final accept/reject decision rests with the Handling Editor, with oversight from the Editor-in-Chief. JERA does not guarantee review timelines but targets a first decision within 28 days.`,
  },
  {
    title: 'Corrections, Retractions & Expressions of Concern',
    icon: '🔄',
    text: `JERA maintains a transparent and robust system for post-publication corrections. Errata and corrigenda are published when significant factual, methodological, or production errors are identified. Retractions are published in cases of confirmed misconduct (fabrication, falsification, plagiarism) or where errors render the main conclusions invalid. Expressions of Concern are issued when an investigation is ongoing. All corrections are prominently linked to the original article and the original article is clearly marked. JERA follows COPE guidelines for all post-publication actions.`,
  },
  {
    title: 'Conflicts of Interest — Editorial Staff',
    icon: '⚖️',
    text: `Members of JERA's editorial board must disclose any financial, personal, or professional relationships that could be perceived as creating a conflict of interest with respect to submitted manuscripts. Editors with a conflict of interest in a manuscript must recuse themselves from the editorial process for that manuscript, which is then handled by another editor or the Editor-in-Chief. Editorial decisions are never influenced by advertising revenue, institutional relationships, or commercial interests.`,
  },
  {
    title: 'Language & Accessibility',
    icon: '🌍',
    text: `JERA publishes exclusively in English. Manuscripts with significant language deficiencies that impair scientific clarity may be returned to authors for revision before peer review. Non-native English speakers are encouraged to seek professional language editing services prior to submission; disclosure is not required. JERA's digital platform is designed to meet WCAG 2.1 Level AA accessibility standards, including keyboard navigation, screen reader compatibility, alt-text for figures, and structured PDF accessibility.`,
  },
  {
    title: 'Advertising & Sponsorship',
    icon: '📣',
    text: `JERA does not accept paid advertising within its published articles, issues, or journal website. Commercial sponsorships, if accepted for events or special sections, are fully disclosed and have no bearing on editorial decisions. The journal does not allow commercial interests to influence article selection, reviewer choice, or any aspect of the peer review or publication process.`,
  },
  {
    title: 'Data Availability & Research Transparency',
    icon: '📊',
    text: `JERA encourages authors to share the underlying research data supporting their findings. Authors may deposit datasets in publicly accessible repositories (e.g., Figshare, Zenodo, Mendeley Data, PANGAEA, or discipline-specific archives) and cite them in the article's Data Availability Statement. Data sharing is strongly encouraged and positively regarded during peer review; however, JERA recognises that data sharing may not be possible in all cases (e.g., confidential industrial data, sensitive personal information, national security constraints).`,
  },
  {
    title: 'Article Versioning',
    icon: '🔖',
    text: `JERA publishes a single definitive Version of Record (VoR) for each article. There are no "accepted manuscript" or "early online" versions published prior to final typesetting (unless designated by the editorial office for expedited publication). Once published, the VoR supersedes all preprint versions. Substantive corrections to the VoR are handled through formal Erratum/Corrigendum notices, not by silent replacement.`,
  },
]

export default function EditorialPoliciesPage() {
  return (
    <PageWrapper
      title="Editorial Policies"
      subtitle="Governance, transparency, and operational principles of JERA"
      breadcrumbs={[{ label: 'Editorial Policies' }]}
    >
      <div className="max-w-4xl space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
          The following policies govern all aspects of JERA's editorial and publishing operations. These policies are informed by international best practices as defined by COPE, the Directory of Open Access Journals (DOAJ), ICMJE, and Crossref, and are reviewed annually.
        </p>

        {policies.map(({ title, icon, text }) => (
          <section key={title} className="card p-6 flex gap-4">
            <span className="text-2xl flex-shrink-0 mt-0.5">{icon}</span>
            <div>
              <h2 className="font-semibold text-sm text-navy-700 dark:text-white mb-2">{title}</h2>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{text}</p>
            </div>
          </section>
        ))}

        <p className="text-xs text-gray-400 pt-4">
          These policies were established in January 2026 and are subject to annual review. For policy enquiries, contact <a href="mailto:editor@jera-journal.org" className="text-ocean-500 hover:underline">editor@jera-journal.org</a>.
        </p>
      </div>
    </PageWrapper>
  )
}
