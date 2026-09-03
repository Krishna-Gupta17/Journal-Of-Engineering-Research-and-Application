'use client'

import { useEffect } from 'react'
import { X, ExternalLink, Download } from 'lucide-react'

interface PdfViewerModalProps {
  isOpen: boolean
  onClose: () => void
  pdfUrl: string | null
  title?: string
}

export function PdfViewerModal({ isOpen, onClose, pdfUrl, title = 'PDF Viewer' }: PdfViewerModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen || !pdfUrl) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-navy-900/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white dark:bg-navy-900 w-full max-w-6xl h-full max-h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-navy-700 bg-gray-50 dark:bg-navy-800">
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate max-w-2xl">
              {title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-2xl">
              {pdfUrl}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <a 
              href={pdfUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5 bg-white dark:bg-navy-700"
              title="Open in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Open in new tab</span>
            </a>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-200 dark:hover:bg-navy-700 dark:hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Viewer Body */}
        <div className="flex-1 bg-gray-100 dark:bg-navy-950 w-full h-full relative">
          <iframe 
            src={pdfUrl} 
            className="w-full h-full border-none"
            title={title}
            // Add #toolbar=0 to hide default pdf viewer toolbar if preferred, but usually keeping it is better for download/print
          />
        </div>
      </div>
    </div>
  )
}
