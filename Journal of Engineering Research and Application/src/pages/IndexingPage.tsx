import type { Metadata } from 'next'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { CheckCircle, Clock, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Indexing & Abstracting | JERA',
  description: 'Current and planned indexing of JERA in Crossref, Google Scholar, DOAJ, Scopus, and other academic databases.',
}

export default function IndexingPage() {
  return (
    <PageWrapper
      title="Indexing & Abstracting"
      subtitle="Database coverage and global discoverability of JERA publications"
      breadcrumbs={[{ label: 'Indexing & Abstracting' }]}
    >
      <div className="max-w-4xl space-y-8">

        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          JERA is committed to maximising the discoverability, citability, and global impact of every published article. We actively pursue indexing in all major academic databases and work continuously to improve metadata quality and search engine visibility.
        </p>

        {/* Status grid */}
        <section>
          <p className="section-label">Database Coverage</p>
          <h2 className="font-serif text-xl font-bold text-navy-700 dark:text-white mb-5">Indexing Status</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { name: 'Crossref', status: 'active', icon: '🔗', desc: 'JERA is a Crossref member. Every published article receives a registered Digital Object Identifier (DOI). DOIs are activated within 24–48 hours of online publication and ensure permanent, resolvable links to all articles.' },
              { name: 'Google Scholar', status: 'active', icon: '🎓', desc: 'JERA articles are indexed in Google Scholar. Published articles typically appear in Google Scholar search results within 2–4 weeks of publication. Highwire Press citation metadata tags are embedded in all article pages to facilitate accurate indexing.' },
              { name: 'BASE — Bielefeld Academic Search Engine', status: 'active', icon: '🔍', desc: 'One of the world\'s largest academic search engines. JERA\'s open access content is harvestable via OAI-PMH protocol and discoverable through BASE.' },
              { name: 'ROAD — ISSN Directory', status: 'pending', icon: '📋', desc: 'JERA has submitted an application to ROAD (Directory of Open Access scholarly Resources maintained by the ISSN International Centre). Listing is expected following ISSN registration.' },
              { name: 'DOAJ — Directory of Open Access Journals', status: 'pending', icon: '🌐', desc: 'JERA has submitted an application to the DOAJ, the world\'s leading whitelist of legitimate open access journals. DOAJ listing is a key quality indicator for open access journals globally. Expected timeline: 3–6 months from application.' },
              { name: 'Dimensions (Digital Science)', status: 'pending', icon: '📐', desc: 'Application to Dimensions, Digital Science\'s comprehensive research database, is in progress. Dimensions indexes publications, grants, patents, and clinical trials in a single platform.' },
              { name: 'Scopus (Elsevier)', status: 'future', icon: '📊', desc: 'JERA plans to apply for Scopus indexing after completing 2 full volumes of consistently high-quality publications (target application: 2027). Scopus requires evidence of rigorous peer review, citation impact, and editorial quality over time.' },
              { name: 'Web of Science (Clarivate)', status: 'future', icon: '⚗️', desc: 'Application to Web of Science (Science Citation Index Expanded) is planned for 2028, after meeting the journal impact factor eligibility criteria through demonstrated citation metrics.' },
            ].map(({ name, status, icon, desc }) => (
              <div key={name} className="card p-5 flex gap-4">
                <span className="text-2xl flex-shrink-0">{icon}</span>
                <div>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white">{name}</h3>
                    {status === 'active' && <span className="text-xs px-2 py-0.5 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full font-medium flex items-center gap-1"><CheckCircle className="w-2.5 h-2.5" />Active</span>}
                    {status === 'pending' && <span className="text-xs px-2 py-0.5 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-full font-medium flex items-center gap-1"><Clock className="w-2.5 h-2.5" />Pending</span>}
                    {status === 'future' && <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 dark:bg-navy-800 dark:text-gray-400 rounded-full font-medium flex items-center gap-1"><Globe className="w-2.5 h-2.5" />Planned 2027+</span>}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DOI Section */}
        <section className="card p-6">
          <h2 className="font-semibold text-sm text-navy-700 dark:text-white mb-3 flex items-center gap-2">
            🔗 Digital Object Identifiers (DOI)
          </h2>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            Every article published in JERA is assigned a unique, permanent DOI registered with Crossref. The JERA DOI format is:
          </p>
          <code className="block font-mono text-xs bg-gray-50 dark:bg-navy-800 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 mb-3">
            10.56789/jera.[year].v[volume]i[issue].[article-number]
          </code>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Example: <code className="font-mono text-xs bg-gray-100 dark:bg-navy-800 px-1.5 py-0.5 rounded">10.56789/jera.2026.v1i1.001</code> — resolves to the full article at <code className="font-mono text-xs bg-gray-100 dark:bg-navy-800 px-1.5 py-0.5 rounded">https://doi.org/10.56789/jera.2026.v1i1.001</code>
          </p>
        </section>

        {/* Google Scholar optimisation */}
        <section className="card p-6">
          <h2 className="font-semibold text-sm text-navy-700 dark:text-white mb-3 flex items-center gap-2">
            🎓 Google Scholar & Metadata Optimisation
          </h2>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            JERA implements structured Highwire Press and Dublin Core citation metadata on all article pages, enabling accurate and complete Google Scholar indexing. The following metadata tags are embedded for every article:
          </p>
          <div className="grid sm:grid-cols-2 gap-1.5">
            {['citation_title', 'citation_author', 'citation_author_institution', 'citation_journal_title', 'citation_volume', 'citation_issue', 'citation_firstpage / citation_lastpage', 'citation_doi', 'citation_publication_date', 'citation_abstract_html_url', 'citation_pdf_url', 'citation_issn'].map(tag => (
              <code key={tag} className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-navy-800 px-2 py-1 rounded">
                {tag}
              </code>
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            Authors are encouraged to link their JERA publications to their Google Scholar profiles, ResearchGate pages, ORCID records, and institutional repositories to maximise citation discoverability.
          </p>
        </section>

        {/* Schema.org */}
        <section className="card p-6">
          <h2 className="font-semibold text-sm text-navy-700 dark:text-white mb-3 flex items-center gap-2">
            🧬 Schema.org Structured Data
          </h2>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            Every JERA article page includes Schema.org <code className="font-mono text-xs bg-gray-100 dark:bg-navy-800 px-1 rounded">ScholarlyArticle</code> JSON-LD structured data, enabling rich results in Google Search and compatibility with next-generation semantic web applications. This structured data includes the full author list, affiliations, publication date, abstract, keywords, journal title, ISSN, DOI, and volume/issue information.
          </p>
        </section>

        {/* Timeline */}
        <section className="card p-6 bg-navy-50 dark:bg-navy-800/30 border-navy-200 dark:border-navy-700">
          <h2 className="font-semibold text-sm text-navy-700 dark:text-white mb-4">Indexing Roadmap</h2>
          <div className="space-y-3">
            {[
              { year: '2026 (Active)', items: ['Crossref DOI registration ✓', 'Google Scholar indexing ✓', 'BASE indexing ✓'] },
              { year: '2026 (Pending)', items: ['DOAJ application submitted', 'ROAD / ISSN application submitted', 'Dimensions application in progress'] },
              { year: '2027 (Target)', items: ['DOAJ listing (upon completing 2 volumes)', 'Scopus application submission', 'Emerging Sources Citation Index (ESCI) application'] },
              { year: '2028+ (Aspirational)', items: ['Web of Science — Science Citation Index Expanded', 'PubMed/MEDLINE (if scope expands to biomedical engineering)', 'Journal Impact Factor eligibility'] },
            ].map(({ year, items }) => (
              <div key={year} className="flex gap-4">
                <span className="text-xs font-semibold text-ocean-600 dark:text-ocean-400 w-36 flex-shrink-0 pt-0.5">{year}</span>
                <div className="flex flex-wrap gap-2">
                  {items.map(item => (
                    <span key={item} className="text-xs px-2.5 py-1 bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 text-gray-600 dark:text-gray-400 rounded-full">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </PageWrapper>
  )
}
