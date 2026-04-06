import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navItems } from '../data/siteContent'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navRef = useRef()

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  // Scroll effect (shadow + blur)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close on outside click + ESC key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }

    const handleEsc = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEsc)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEsc)
    }
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-shell">
        
        {/* Logo */}
        <Link className="brand" to="/">
          <span className="brand-mark">JERA</span>
          <span className="brand-text">
            Journal of Engineering Research and Application
          </span>
          <span className="brand-issn">E-ISSN: 2583-3987</span>
        </Link>

        {/* Toggle Button */}
        <button
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen(prev => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation */}
        <nav
          id="primary-navigation"
          ref={navRef}
          className={`main-nav ${menuOpen ? 'open' : ''}`}
        >
          <ul>
            {navItems.map(item => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                >
                  {item.label}
                  <span className="underline"></span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

      </div>
    </header>
  )
}