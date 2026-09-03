import type { Metadata } from 'next'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { SAMPLE_ARTICLES } from '@/lib/data'
import { notFound } from 'next/navigation'
import {
  Download, Eye, ExternalLink, Calendar, BookOpen,
  Quote, Share2, Printer, Tag, User, Link as LinkIcon, BarChart2
} from 'lucide-react'
import Link from 'next/link'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return SAMPLE_ARTICLES.map(a => ({ id: a.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const article = SAMPLE_ARTICLES.find(a => a.id === resolvedParams.id)
  if (!article) return { title: 'Article Not Found' }
  return {
    title: article.title,
    description: article.abstract.slice(0, 160),
    openGraph: {
      title: article.title,
      description: article.abstract.slice(0, 160),
      type: 'article',
    },
  }
}

const typeLabels: Record<string, string> = {
  'research-article': 'Research Article',
  'review-article': 'Review Article',
  'case-study': 'Case Study',
  'short-communication': 'Short Communication',
  'technical-note': 'Technical Note',
}

export default async function ArticlePage({ params }: Props) {
  const resolvedParams = await params
  const article = SAMPLE_ARTICLES.find(a => a.id === resolvedParams.id)
  if (!article) notFound()

  const citation = `${article.authors.map(a => a.name).join(', ')} (${article.year}). ${article.title}. Journal of Engineering Research Application, ${article.volume}(${article.issue}), ${article.pages}. https://doi.org/${article.doi}`

  return (
    <>
      {/* Google Scholar / Highwire Press meta tags */}
      <head>
        <meta name="citation_title" content={article.title} />
        {article.authors.map(a => (
          <meta key={a.id} name="citation_author" content={a.name} />
        ))}
        <meta name="citation_journal_title" content="Journal of Engineering Research Application" />
        <meta name="citation_volume" content={`${article.volume}`} />
        <meta name="citation_issue" content={`${article.issue}`} />
        <meta name="citation_firstpage" content={article.pages.split('–')[0]} />
        <meta name="citation_lastpage" content={article.pages.split('–')[1]} />
        <meta name="citation_doi" content={article.doi} />
        <meta name="citation_publication_date" content={article.publicationDate} />
        <meta name="citation_abstract_html_url" content={`https://jera-journal.org/articles/${article.id}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ScholarlyArticle',
          headline: article.title,
          author: article.authors.map(a => ({ '@type': 'Person', name: a.name, affiliation: a.affiliation })),
          datePublished: article.publicationDate,
          description: article.abstract,
          keywords: article.keywords.join(', '),
          identifier: { '@type': 'PropertyValue', propertyID: 'DOI', value: article.doi },
          isPartOf: {
            '@type': 'Periodical',
            name: 'Journal of Engineering Research Application',
            issn: '0000-0000',
          },
        }) }} />
      </head>

      <div className="bg-[var(--color-bg)] min-h-screen">
        {/* Article header */}
        <div className="bg-navy-700 dark:bg-navy-900 border-b border-navy-600 dark:border-navy-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <nav className="breadcrumb mb-4 text-navy-300">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>›</span>
              <Link href="/current-issue" className="hover:text-white">Current Issue</Link>
              <span>›</span>
              <span className="text-white">Article</span>
            </nav>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="tag bg-ocean-500/20 text-ocean-200 border border-ocean-500/40">
                {typeLabels[article.articleType] || article.articleType}
              </span>
              <span className="tag bg-white/10 text-navy-200 border border-white/20">{article.discipline}</span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight mb-5 max-w-4xl">
              {article.title}
            </h1>

            {/* Authors */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 mb-5">
              {article.authors.map((author, i) => (
                <div key={author.id} className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-navy-300" />
                  <div>
                    <span className="text-sm font-medium text-white">{author.name}</span>
                    <sup className="text-ocean-300 text-xs ml-0.5">{i + 1}</sup>
                  </div>
                </div>
              ))}
            </div>

            {/* Affiliations */}
            <div className="flex flex-col gap-1 mb-5">
              {article.authors.map((author, i) => (
                <p key={author.id} className="text-xs text-navy-300">
                  <sup>{i + 1}</sup> {author.affiliation}, {author.country}
                  {(author as any).orcid && (
                    <a href={`https://orcid.org/${(author as any).orcid}`} target="_blank" rel="noopener noreferrer"
                      className="ml-2 text-ocean-300 hover:text-white">
                      ORCID: {(author as any).orcid}
                    </a>
                  )}
                </p>
              ))}
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-navy-300 pt-4 border-t border-navy-600">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Published: {new Date(article.publicationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Vol. {article.volume}, No. {article.issue}, pp. {article.pages}
              </span>
              <a href={`https://doi.org/${article.doi}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-ocean-300 hover:text-white font-mono">
                <LinkIcon className="w-3.5 h-3.5" />
                {article.doi}
              </a>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8 lg:gap-10">
            {/* Article body */}
            <article className="flex-1 min-w-0">
              {/* Action bar */}
              <div className="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-gray-200 dark:border-navy-800">
                <a href={(article as any).pdfUrl || '#'} className="btn-primary text-xs flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </a>
                <button className="btn-secondary text-xs flex items-center gap-1.5">
                  <Quote className="w-3.5 h-3.5" /> Cite
                </button>
                <button className="btn-secondary text-xs flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5" /> Share
                </button>
                <button className="btn-secondary text-xs flex items-center gap-1.5">
                  <Printer className="w-3.5 h-3.5" /> Print
                </button>
              </div>

              {/* Abstract */}
              <section className="mb-8">
                <h2 className="font-serif text-lg font-bold text-navy-700 dark:text-white mb-3 flex items-center gap-2">
                  Abstract
                </h2>
                <div className="card p-5 bg-navy-50 dark:bg-navy-800/30 border-l-4 border-l-ocean-500">
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{article.abstract}</p>
                </div>
              </section>

              {/* Keywords */}
              <section className="mb-8">
                <h2 className="font-serif text-lg font-bold text-navy-700 dark:text-white mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-ocean-500" /> Keywords
                </h2>
                <div className="flex flex-wrap gap-2">
                  {article.keywords.map(kw => (
                    <span key={kw} className="tag text-sm px-3 py-1">{kw}</span>
                  ))}
                </div>
              </section>

              {/* Citation */}
              <section className="mb-8">
                <h2 className="font-serif text-lg font-bold text-navy-700 dark:text-white mb-3 flex items-center gap-2">
                  <Quote className="w-4 h-4 text-ocean-500" /> How to Cite
                </h2>
                <div className="card p-4">
                  <p className="font-mono text-xs text-gray-600 dark:text-gray-400 leading-relaxed bg-gray-50 dark:bg-navy-800 rounded p-3">
                    {citation}
                  </p>
                  <button className="mt-3 text-xs text-ocean-500 hover:text-ocean-600 font-medium">
                    Copy citation
                  </button>
                </div>
              </section>

              {/* Full text placeholder */}
              <section className="mb-8">
                <h2 className="font-serif text-lg font-bold text-navy-700 dark:text-white mb-3">Full Text</h2>
                <div className="card p-8 text-center bg-gray-50 dark:bg-navy-800/20">
                  <Download className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">
                    Full text available as PDF
                  </p>
                  <p className="text-xs text-gray-400 mb-5">
                    The complete article including all figures, tables, and references is available for free download.
                  </p>
                  <a href={(article as any).pdfUrl || '#'} className="btn-primary text-sm">
                    <Download className="w-4 h-4" /> Download Full Article (PDF)
                  </a>
                </div>
              </section>
            </article>

            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 hidden lg:flex flex-col gap-5">
              {/* Metrics */}
              <div className="card p-5">
                <h3 className="font-semibold text-sm text-navy-700 dark:text-white mb-4 flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-ocean-500" /> Article Metrics
                </h3>
                <div className="space-y-3">
                  {[
                    { label: 'Views', value: article.views.toLocaleString(), icon: Eye },
                    { label: 'Downloads', value: article.downloads.toLocaleString(), icon: Download },
                    { label: 'Citations', value: article.citations.toString(), icon: Quote },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                        <Icon className="w-3.5 h-3.5" /> {label}
                      </span>
                      <span className="font-semibold text-sm text-gray-800 dark:text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Article details */}
              <div className="card p-5">
                <h3 className="font-semibold text-sm text-navy-700 dark:text-white mb-3">Article Details</h3>
                <dl className="space-y-2 text-xs">
                  {[
                    ['Type', typeLabels[article.articleType]],
                    ['Discipline', article.discipline],
                    ['Volume', `${article.volume}`],
                    ['Issue', `${article.issue}`],
                    ['Pages', article.pages],
                    ['Year', `${article.year}`],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-2">
                      <dt className="text-gray-500 dark:text-gray-400 flex-shrink-0">{k}</dt>
                      <dd className="font-medium text-gray-700 dark:text-gray-300 text-right">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* DOI */}
              <div className="card p-5">
                <h3 className="font-semibold text-sm text-navy-700 dark:text-white mb-2">DOI</h3>
                <a
                  href={`https://doi.org/${article.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-ocean-500 hover:text-ocean-600 font-mono break-all"
                >
                  <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                  {article.doi}
                </a>
              </div>

              {/* License */}
              <div className="card p-4 bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800">
                <p className="text-xs font-semibold text-green-800 dark:text-green-400 mb-1">Open Access</p>
                <p className="text-xs text-green-700 dark:text-green-300">
                  Published under CC BY 4.0. Free to read, share, and adapt with attribution.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
