import Link from 'next/link'
import { Mail, Globe, ExternalLink } from 'lucide-react'
import Image from 'next/image'

const footerLinks = {
  Journal: [
    { label: 'About JERA', href: '/about' },
    { label: 'Aims & Scope', href: '/aims-scope' },
    { label: 'Editorial Board', href: '/editorial-board' },
    { label: 'Editorial Policies', href: '/editorial-policies' },
    { label: 'Ethics & Publication Policy', href: '/ethics-policy' },
    { label: 'Indexing & Abstracting', href: '/indexing' },
  ],
  'For Authors': [
    { label: 'Call for Papers', href: '/call-for-papers' },
    { label: 'Author Guidelines', href: '/author-guidelines' },
    { label: 'Submit via OJS Portal', href: '/submit-manuscript' },
    { label: 'Peer Review Process', href: '/peer-review' },
    { label: 'Publication Charges', href: '/publication-charges' },
    { label: 'Downloads', href: '/downloads' },
  ],
  More: [
    { label: 'Current Issue', href: '/current-issue' },
    { label: 'Archives', href: '/archives' },
    { label: 'Announcements', href: '/announcements' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'Contact Us', href: '/contact' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-navy-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white rounded-lg p-1.5 flex-shrink-0">
                <Image src="/jera-logo.png" alt="JERA" width={36} height={36} className="object-contain" />
              </div>
              <div>
                <div className="font-serif font-bold text-white text-lg leading-tight">JERA</div>
                <div className="text-xs text-gray-400 leading-tight">Journal of Engineering Research Application</div>
                <div className="text-xs text-red-400 font-semibold leading-tight">E-ISSN: 2583-3987</div>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed mb-4 max-w-xs">
              A peer-reviewed, open-access international journal in Civil Engineering, founded by academics from Delhi Technological University and MMMUT Gorakhpur, India.
            </p>

            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 flex-shrink-0 text-ocean-400" />
                <a href="https://www.jera.co.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  www.jera.co.in <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 flex-shrink-0 text-ocean-400" />
                <a href="mailto:editor@jera-journal.org" className="hover:text-white transition-colors">editor@jera-journal.org</a>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 bg-navy-800 rounded text-gray-400">DTU Delhi</span>
              <span className="text-xs px-2 py-1 bg-navy-800 rounded text-gray-400">MMMUT Gorakhpur</span>
              <a href="https://www.jera.co.in/index.php/jera/submission/wizard" target="_blank" rel="noopener noreferrer"
                className="text-xs px-2 py-1 bg-ocean-600 hover:bg-ocean-500 rounded text-white transition-colors flex items-center gap-1">
                <ExternalLink className="w-2.5 h-2.5" /> Submit via OJS
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="font-semibold text-white text-sm mb-4">{section}</h3>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-xs text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-teal-500 inline-block" />Open Access</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-ocean-500 inline-block" />Double-Blind Review</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-500 inline-block" />CC BY 4.0</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" />Free to Publish 2026</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-400 inline-block" />E-ISSN 2583-3987</span>
            </div>
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} JERA Publications · <a href="https://www.jera.co.in" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">jera.co.in</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
