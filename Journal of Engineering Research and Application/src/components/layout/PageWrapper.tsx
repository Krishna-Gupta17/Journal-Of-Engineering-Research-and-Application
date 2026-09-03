import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageWrapperProps {
  title: string
  subtitle?: string
  breadcrumbs?: BreadcrumbItem[]
  children: React.ReactNode
  sidebar?: React.ReactNode
  headerBg?: boolean
}

export function PageWrapper({ title, subtitle, breadcrumbs, children, sidebar, headerBg = true }: PageWrapperProps) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Page header */}
      {headerBg && (
        <div className="bg-navy-700 dark:bg-navy-900 border-b border-navy-600 dark:border-navy-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {breadcrumbs && (
              <nav className="breadcrumb mb-3" aria-label="Breadcrumb">
                <Link to="/" className="hover:text-white transition-colors text-navy-200">Home</Link>
                {breadcrumbs.map((crumb, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <ChevronRight className="w-3 h-3 text-navy-400" />
                    {crumb.href && i < breadcrumbs.length - 1 ? (
                      <Link to={crumb.href} className="hover:text-white text-navy-200 transition-colors">{crumb.label}</Link>
                    ) : (
                      <span className="text-white font-medium">{crumb.label}</span>
                    )}
                  </span>
                ))}
              </nav>
            )}
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">{title}</h1>
            {subtitle && <p className="mt-2 text-navy-200 text-sm max-w-2xl">{subtitle}</p>}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {sidebar ? (
          <div className="flex gap-8 lg:gap-10">
            {/* Main content */}
            <div className="flex-1 min-w-0">{children}</div>
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 hidden lg:block">
              {sidebar}
            </aside>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  )
}
