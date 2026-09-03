// ============================================================
// JERA — Core Type Definitions
// ============================================================

export interface Author {
  id: string
  name: string
  affiliation: string
  country: string
  email?: string
  orcid?: string
}

export interface Article {
  id: string
  title: string
  authors: Author[]
  abstract: string
  keywords: string[]
  doi: string
  volume: number
  issue: number
  year: number
  pages: string
  publicationDate: string
  discipline: string
  articleType: ArticleType
  status: ArticleStatus
  downloads: number
  citations: number
  views: number
  pdfUrl?: string
  figures?: Figure[]
  references?: Reference[]
}

export type ArticleType = 
  | 'research-article'
  | 'review-article'
  | 'case-study'
  | 'short-communication'
  | 'technical-note'
  | 'editorial'

export type ArticleStatus =
  | 'submitted'
  | 'under-review'
  | 'revision-requested'
  | 'accepted'
  | 'published'
  | 'rejected'

export interface Figure {
  id: string
  caption: string
  url: string
  alt: string
}

export interface Reference {
  id: string
  text: string
  doi?: string
  url?: string
}

export interface Issue {
  volume: number
  issue: number
  year: number
  month: string
  coverImage?: string
  articleCount: number
  articles: Article[]
  isCurrent: boolean
}

export interface EditorProfile {
  id: string
  name: string
  title: string
  affiliation: string
  country: string
  specialization: string[]
  email?: string
  photo?: string
  role: EditorRole
  orcid?: string
  bio?: string
}

export type EditorRole =
  | 'editor-in-chief'
  | 'associate-editor'
  | 'managing-editor'
  | 'section-editor'
  | 'advisory-board'
  | 'reviewer'

export interface Announcement {
  id: string
  title: string
  content: string
  date: string
  type: 'general' | 'call-for-papers' | 'deadline' | 'update'
  important: boolean
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export interface MetricCard {
  label: string
  value: string | number
  description?: string
  icon?: string
}
