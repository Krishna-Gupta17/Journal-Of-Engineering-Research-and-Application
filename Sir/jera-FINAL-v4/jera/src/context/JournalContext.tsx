'use client'

import { createContext, useEffect, useState, useContext, ReactNode } from 'react'
import {
  adminLogin as apiAdminLogin,
  createIssue as apiCreateIssue,
  createPaper as apiCreatePaper,
  createVolume as apiCreateVolume,
  deleteIssue as apiDeleteIssue,
  deletePaper as apiDeletePaper,
  deleteVolume as apiDeleteVolume,
  fetchCatalog,
  verifyAdminSession,
} from '@/lib/api'

export interface Paper {
  id: string
  title: string
  authorName: string
  pdfUrl: string
  pdfPreviewUrl: string
  fileName: string
  uploadedAt: string
}

export interface Issue {
  id: string
  name: string
  createdAt: string
  papers: Paper[]
}

export interface Volume {
  id: string
  name: string
  createdAt: string
  issues: Issue[]
}

interface CreatePaperPayload {
  volumeId: string
  issueId: string
  title: string
  authorName: string
  pdfFile: File
}

interface ActionResult {
  ok: boolean
  message?: string
}

interface JournalContextType {
  catalog: Volume[]
  loading: boolean
  error: string
  authLoading: boolean
  isAdminAuthenticated: boolean
  addVolume: (volumeName: string) => Promise<ActionResult>
  addIssue: (volumeId: string, issueName: string) => Promise<ActionResult>
  addPaper: (payload: CreatePaperPayload) => Promise<ActionResult>
  removeVolume: (volumeId: string) => Promise<ActionResult>
  removeIssue: (issueId: string) => Promise<ActionResult>
  removePaper: (paperId: string) => Promise<ActionResult>
  loginAdmin: (credentials: { username: string; password: string }) => Promise<ActionResult>
  logoutAdmin: () => void
}

const JournalContext = createContext<JournalContextType | null>(null)
const ADMIN_TOKEN_KEY = 'jera_admin_token'

export function JournalProvider({ children }: { children: ReactNode }) {
  const [catalog, setCatalog] = useState<Volume[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [adminToken, setAdminToken] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(ADMIN_TOKEN_KEY) || ''
    }
    return ''
  })
  const [authLoading, setAuthLoading] = useState(true)

  const isAdminAuthenticated = Boolean(adminToken)

  useEffect(() => {
    let isMounted = true

    async function validateSession() {
      if (!adminToken) {
        if (isMounted) {
          setAuthLoading(false)
        }
        return
      }

      try {
        await verifyAdminSession(adminToken)
      } catch {
        if (isMounted) {
          localStorage.removeItem(ADMIN_TOKEN_KEY)
          setAdminToken('')
        }
      } finally {
        if (isMounted) {
          setAuthLoading(false)
        }
      }
    }

    validateSession()

    return () => {
      isMounted = false
    }
  }, [adminToken])

  useEffect(() => {
    let isMounted = true

    async function loadCatalog() {
      try {
        const remoteCatalog = await fetchCatalog()

        if (isMounted) {
          setCatalog(remoteCatalog)
          setError('')
        }
      } catch (fetchError: any) {
        if (isMounted) {
          setCatalog([])
          setError(fetchError.message || 'Unable to load journal catalog from the backend.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadCatalog()

    return () => {
      isMounted = false
    }
  }, [])

  const refreshCatalog = async () => {
    const remoteCatalog = await fetchCatalog()
    setCatalog(remoteCatalog)
    setError('')
    return remoteCatalog
  }

  const addVolume = async (volumeName: string) => {
    const trimmedName = volumeName.trim()

    if (!trimmedName) {
      return { ok: false, message: 'Volume name is required.' }
    }

    try {
      await apiCreateVolume(trimmedName, adminToken)
      await refreshCatalog()
      return { ok: true }
    } catch (apiError: any) {
      return { ok: false, message: apiError.message || 'Failed to create volume.' }
    }
  }

  const addIssue = async (volumeId: string, issueName: string) => {
    const trimmedName = issueName.trim()

    if (!volumeId) {
      return { ok: false, message: 'Select a volume first.' }
    }

    if (!trimmedName) {
      return { ok: false, message: 'Issue name is required.' }
    }

    try {
      await apiCreateIssue(volumeId, trimmedName, adminToken)
      await refreshCatalog()
      return { ok: true }
    } catch (apiError: any) {
      return { ok: false, message: apiError.message || 'Failed to create issue.' }
    }
  }

  const addPaper = async ({ volumeId, issueId, title, authorName, pdfFile }: CreatePaperPayload) => {
    const trimmedTitle = title.trim()
    const trimmedAuthorName = authorName.trim()

    if (!volumeId || !issueId) {
      return { ok: false, message: 'Select both a volume and an issue.' }
    }

    if (!trimmedTitle) {
      return { ok: false, message: 'Paper title is required.' }
    }

    if (trimmedTitle.length > 250) {
      return { ok: false, message: 'Paper title must be 250 characters or less.' }
    }

    if (!trimmedAuthorName) {
      return { ok: false, message: 'Author name is required.' }
    }

    if (!pdfFile) {
      return { ok: false, message: 'Attach a PDF file.' }
    }

    try {
      await apiCreatePaper({
        volumeId,
        issueId,
        title: trimmedTitle,
        authorName: trimmedAuthorName,
        pdfFile,
        token: adminToken,
      })
      await refreshCatalog()
      return { ok: true }
    } catch (apiError: any) {
      return { ok: false, message: apiError.message || 'Failed to upload paper.' }
    }
  }

  const removeVolume = async (volumeId: string) => {
    if (!volumeId) {
      return { ok: false, message: 'Volume id is required.' }
    }

    try {
      await apiDeleteVolume(volumeId, adminToken)
      await refreshCatalog()
      return { ok: true }
    } catch (apiError: any) {
      return { ok: false, message: apiError.message || 'Failed to delete volume.' }
    }
  }

  const removeIssue = async (issueId: string) => {
    if (!issueId) {
      return { ok: false, message: 'Issue id is required.' }
    }

    try {
      await apiDeleteIssue(issueId, adminToken)
      await refreshCatalog()
      return { ok: true }
    } catch (apiError: any) {
      return { ok: false, message: apiError.message || 'Failed to delete issue.' }
    }
  }

  const removePaper = async (paperId: string) => {
    if (!paperId) {
      return { ok: false, message: 'Paper id is required.' }
    }

    try {
      await apiDeletePaper(paperId, adminToken)
      await refreshCatalog()
      return { ok: true }
    } catch (apiError: any) {
      return { ok: false, message: apiError.message || 'Failed to delete paper.' }
    }
  }

  const loginAdmin = async ({ username, password }: any) => {
    if (!username.trim() || !password) {
      return { ok: false, message: 'Username and password are required.' }
    }

    try {
      const { token } = await apiAdminLogin(username.trim(), password)
      localStorage.setItem(ADMIN_TOKEN_KEY, token)
      setAdminToken(token)
      return { ok: true }
    } catch (apiError: any) {
      return { ok: false, message: apiError.message || 'Admin login failed.' }
    }
  }

  const logoutAdmin = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY)
    setAdminToken('')
  }

  return (
    <JournalContext.Provider
      value={{
        catalog,
        loading,
        error,
        authLoading,
        isAdminAuthenticated,
        addVolume,
        addIssue,
        addPaper,
        removeVolume,
        removeIssue,
        removePaper,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </JournalContext.Provider>
  )
}

export function useJournal() {
  const context = useContext(JournalContext)

  if (!context) {
    throw new Error('useJournal must be used within a JournalProvider.')
  }

  return context
}
