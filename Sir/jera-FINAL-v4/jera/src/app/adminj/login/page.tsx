'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { useJournal } from '@/context/JournalContext'

export default function AdminLoginPage() {
  const { isAdminAuthenticated, authLoading, loginAdmin } = useJournal()
  const router = useRouter()
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [feedback, setFeedback] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!authLoading && isAdminAuthenticated) {
      router.replace('/adminj')
    }
  }, [authLoading, isAdminAuthenticated, router])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitting(true)
    setFeedback('')

    const result = await loginAdmin({ username, password })

    setSubmitting(false)

    if (result.ok) {
      router.replace('/adminj')
      return
    }

    setFeedback(result.message || 'Login failed')
  }

  // Avoid flashing the login form if already authenticated
  if (authLoading || isAdminAuthenticated) {
    return (
      <PageWrapper title="Admin Login" subtitle="Checking session...">
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-500"></div>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper
      title="Admin Login"
      subtitle="Sign in with admin credentials to manage journal volumes, archives, and papers."
    >
      <div className="max-w-md mx-auto">
        <div className="card p-6 bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-700">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-500 dark:bg-navy-800 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-500 dark:bg-navy-800 dark:text-white"
                required
              />
            </div>

            {feedback && (
              <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-md border border-red-200 dark:border-red-800">
                {feedback}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || authLoading}
              className="w-full btn-primary justify-center mt-2"
            >
              {submitting ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </PageWrapper>
  )
}
