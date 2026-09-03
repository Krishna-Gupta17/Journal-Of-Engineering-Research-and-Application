'use client'

import Link from 'next/link'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { FileQuestion, ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <PageWrapper title="Page Not Found" headerBg={false}>
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-20 h-20 bg-ocean-50 dark:bg-navy-800 rounded-full flex items-center justify-center mb-6">
          <FileQuestion className="w-10 h-10 text-ocean-500" />
        </div>
        
        <h1 className="font-serif text-4xl font-bold text-navy-700 dark:text-white mb-4">
          404 - Page Not Found
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/" className="btn-primary flex items-center justify-center gap-2">
            <Home className="w-4 h-4" /> Go to Homepage
          </Link>
          <button 
            onClick={() => {
              if (typeof window !== 'undefined') window.history.back()
            }}
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </div>
      </div>
    </PageWrapper>
  )
}
