'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useJournal } from '@/context/JournalContext'

export function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const { authLoading, isAdminAuthenticated } = useJournal()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!authLoading && !isAdminAuthenticated) {
      router.replace(`/adminj/login?from=${encodeURIComponent(pathname)}`)
    }
  }, [authLoading, isAdminAuthenticated, router, pathname])

  if (authLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-8">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-ocean-500 mb-4"></div>
        <h2 className="text-xl font-serif text-navy-700 dark:text-white mb-2">Checking Admin Session</h2>
        <p className="text-gray-500 dark:text-gray-400">Please wait while we verify admin access...</p>
      </div>
    )
  }

  if (!isAdminAuthenticated) {
    return null // Will redirect in useEffect
  }

  return <>{children}</>
}
