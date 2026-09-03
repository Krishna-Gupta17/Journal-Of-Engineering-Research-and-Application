import Link from 'next/link'
import { FileText, Download, Eye, ExternalLink, Calendar, BookOpen } from 'lucide-react'
import type { Article } from '@/types'

const typeLabels: Record<string, string> = {
  'research-article': 'Research Article',
  'review-article': 'Review Article',
  'case-study': 'Case Study',
  'short-communication': 'Short Communication',
  'technical-note': 'Technical Note',
  'editorial': 'Editorial',
}

interface ArticleCardProps {
  article: Article
  variant?: 'full' | 'compact'
}

export function ArticleCard({ article, variant = 'full' }: ArticleCardProps) {
  return (
    <article className="article-card border-l-4 border-l-ocean-500">
      {/* Type + Discipline tags */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="tag bg-ocean-50 text-ocean-600 dark:bg-ocean-900/30 dark:text-ocean-300">
          {typeLabels[article.articleType] || article.articleType}
        </span>
        <span className="tag">{article.discipline}</span>
      </div>

      {/* Title */}
      <h3 className="font-serif text-base font-bold text-gray-900 dark:text-white leading-snug group-hover:text-navy-700 dark:group-hover:text-navy-200 transition-colors">
        <Link href={`/articles/${article.id}`} className="hover:underline">
          {article.title}
        </Link>
      </h3>

      {/* Authors */}
      <p className="text-xs text-gray-600 dark:text-gray-400">
        {article.authors.map((a, i) => (
          <span key={a.id}>
            <span className="font-medium">{a.name}</span>
            {a.affiliation && <span className="text-gray-400"> ({a.country})</span>}
            {i < article.authors.length - 1 && <span className="mx-1">·</span>}
          </span>
        ))}
      </p>

      {/* Abstract (full variant only) */}
      {variant === 'full' && (
        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
          {article.abstract}
        </p>
      )}

      {/* Keywords */}
      {variant === 'full' && (
        <div className="flex flex-wrap gap-1.5">
          {article.keywords.slice(0, 5).map(kw => (
            <span key={kw} className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-navy-800/60 text-gray-600 dark:text-gray-400 rounded-full">
              {kw}
            </span>
          ))}
        </div>
      )}

      {/* Meta row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-gray-100 dark:border-navy-800/60">
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(article.publicationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            pp. {article.pages}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {article.views.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Download className="w-3 h-3" />
            {article.downloads.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`https://doi.org/${article.doi}`}
            className="doi-link text-xs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="flex items-center gap-1">
              <ExternalLink className="w-3 h-3" />
              DOI
            </span>
          </a>
          <Link href={`/articles/${article.id}`} className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1">
            <FileText className="w-3 h-3" />
            Full Text
          </Link>
        </div>
      </div>
    </article>
  )
}
