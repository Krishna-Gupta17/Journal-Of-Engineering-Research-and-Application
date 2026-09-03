

import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Search, Sun, Moon, Menu, X, ChevronDown, ExternalLink } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { NAV_ITEMS } from '@/lib/data'

export function Header() {
  const { theme, toggle } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#0e1f33] shadow-sm">
      {/* Top strip — ISSN + website */}
      <div className="bg-navy-700 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-semibold">E-ISSN: 2583-3987</span>
            <span className="text-navy-300">|</span>
            <a href="https://www.jera.co.in/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-navy-200 hover:text-white transition-colors">
              <ExternalLink className="w-2.5 h-2.5" /> www.jera.co.in
            </a>
          </div>
          <div className="flex items-center gap-4 flex-wrap text-navy-200">
            <span>📢 Volume 1, Issue 1 (2026) now available —</span>
            <Link to="/current-issue" className="text-white underline hover:no-underline font-medium">View Issue</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b border-gray-200 dark:border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">

            {/* Logo + Name */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
              <div className="relative w-12 h-12 flex-shrink-0">
                <img
                  src="/jera-logo.png"
                  alt="JERA — Journal of Engineering Research Application"
                  width={48}
                  height={48}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <div className="font-serif font-bold text-navy-700 dark:text-white text-xl leading-tight group-hover:text-ocean-600 transition-colors">
                  JERA
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                  Journal of Engineering Research Application
                </div>
                <div className="text-xs text-red-600 dark:text-red-400 font-semibold leading-tight">
                  E-ISSN: 2583-3987
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5" ref={dropdownRef}>
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="relative">
                  {item.children ? (
                    <button
                      className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-navy-700 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-navy-800/50 rounded-md transition-colors"
                      onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                      aria-expanded={activeDropdown === item.label}
                    >
                      {item.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <Link to={item.href}
                      className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-navy-700 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-navy-800/50 rounded-md transition-colors block"
                    >
                      {item.label}
                    </Link>
                  )}

                  {item.children && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-[#0e1f33] border border-gray-200 dark:border-navy-700 rounded-lg shadow-xl py-1 z-50">
                      {item.children.map(child => (
                        <Link key={child.href} to={child.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-navy-50 hover:text-navy-700 dark:hover:bg-navy-800/60 dark:hover:text-white transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              {searchOpen ? (
                <div className="flex items-center gap-2">
                  <input type="search" placeholder="Search articles..."
                    value={query} onChange={e => setQuery(e.target.value)}
                    className="w-44 px-3 py-1.5 text-sm border border-gray-300 dark:border-navy-600 rounded-md bg-white dark:bg-navy-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ocean-500"
                    autoFocus
                  />
                  <button onClick={() => setSearchOpen(false)} aria-label="Close search">
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              ) : (
                <button onClick={() => setSearchOpen(true)}
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-navy-800/60 transition-colors"
                  aria-label="Search">
                  <Search className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
              )}

              <button onClick={toggle}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-navy-800/60 transition-colors"
                aria-label={theme === 'dark' ? 'Light mode' : 'Dark mode'}>
                {theme === 'dark'
                  ? <Sun className="w-4 h-4 text-yellow-400" />
                  : <Moon className="w-4 h-4 text-gray-600" />}
              </button>

              {/* OJS Submit button */}
              <a href="https://www.jera.co.in/index.php/jera/submission/wizard"
                target="_blank" rel="noopener noreferrer"
                className="hidden sm:inline-flex btn-primary text-xs px-3 py-2 items-center gap-1.5">
                <ExternalLink className="w-3 h-3" /> Submit via OJS
              </a>

              <button className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-navy-800/60"
                onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-navy-800 bg-white dark:bg-[#0e1f33] max-h-[80vh] overflow-y-auto">
          <nav className="px-4 py-3 space-y-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <button
                      className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-800 dark:text-white"
                      onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}>
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === item.label && (
                      <div className="ml-4 space-y-1">
                        {item.children.map(child => (
                          <Link key={child.href} to={child.href}
                            className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-navy-700 hover:bg-gray-50 dark:hover:bg-navy-800/40 rounded-md"
                            onClick={() => setMobileOpen(false)}>
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link to={item.href}
                    className="block px-3 py-2 text-sm font-semibold text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-800/40 rounded-md"
                    onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-2 border-t border-gray-200 dark:border-navy-800">
              <a href="https://www.jera.co.in/index.php/jera/submission/wizard"
                target="_blank" rel="noopener noreferrer"
                className="btn-primary w-full justify-center text-sm flex items-center gap-2"
                onClick={() => setMobileOpen(false)}>
                <ExternalLink className="w-4 h-4" /> Submit via OJS
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
