import type { Metadata } from 'next'
import '../styles/globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { JournalProvider } from '@/context/JournalContext'
export const metadata: Metadata = {
  metadataBase: new URL('https://jera-journal.org'),
  title: {
    default: 'JERA — Journal of Engineering Research Application',
    template: '%s | JERA',
  },
  description: 'JERA is a peer-reviewed, open-access international journal publishing high-quality research in Civil Engineering and allied disciplines. Volume 1, Issue 1, 2026.',
  keywords: ['civil engineering journal', 'open access', 'peer reviewed', 'structural engineering', 'transportation engineering', 'geotechnical engineering', 'JERA'],
  authors: [{ name: 'JERA Editorial Office' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jera-journal.org',
    siteName: 'JERA — Journal of Engineering Research Application',
    title: 'JERA — Journal of Engineering Research Application',
    description: 'Peer-reviewed | Open Access | International Journal — Civil Engineering',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'JERA Journal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JERA — Journal of Engineering Research Application',
    description: 'Peer-reviewed • Open Access • International Journal',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: 'your-google-verification-token',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Periodical',
              name: 'Journal of Engineering Research Application',
              alternateName: 'JERA',
              description: 'Peer-reviewed open access journal in Civil Engineering',
              url: 'https://jera-journal.org',
              issn: '0000-0000',
              publisher: {
                '@type': 'Organization',
                name: 'JERA Publications',
              },
              about: {
                '@type': 'Thing',
                name: 'Civil Engineering',
              },
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <JournalProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </JournalProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
