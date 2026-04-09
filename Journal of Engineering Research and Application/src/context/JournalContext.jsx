/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState, useContext } from 'react'
import { initialCatalog } from '../data/journalSeed'
import {
  adminLogin,
  createIssue as apiCreateIssue,
  createPaper as apiCreatePaper,
  createVolume as apiCreateVolume,
  fetchCatalog,
  verifyAdminSession,
} from '../lib/journalApi'

const JournalContext = createContext(null)
const ADMIN_TOKEN_KEY = 'jera_admin_token'

export function JournalProvider({ children }) {
  const [catalog, setCatalog] = useState(() => initialCatalog)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem(ADMIN_TOKEN_KEY) || '')
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
      } catch (fetchError) {
        if (isMounted) {
          setCatalog(initialCatalog)
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

  const addVolume = async (volumeName) => {
    const trimmedName = volumeName.trim()

    if (!trimmedName) {
      return { ok: false, message: 'Volume name is required.' }
    }

    try {
      await apiCreateVolume(trimmedName, adminToken)
      await refreshCatalog()
      return { ok: true }
    } catch (apiError) {
      return { ok: false, message: apiError.message || 'Failed to create volume.' }
    }
  }

  const addIssue = async (volumeId, issueName) => {
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
    } catch (apiError) {
      return { ok: false, message: apiError.message || 'Failed to create issue.' }
    }
  }

  const addPaper = async ({ volumeId, issueId, title, authorName, pdfFile }) => {
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
    } catch (apiError) {
      return { ok: false, message: apiError.message || 'Failed to upload paper.' }
    }
  }

  const loginAdmin = async ({ username, password }) => {
    if (!username.trim() || !password) {
      return { ok: false, message: 'Username and password are required.' }
    }

    try {
      const { token } = await adminLogin(username.trim(), password)
      localStorage.setItem(ADMIN_TOKEN_KEY, token)
      setAdminToken(token)
      return { ok: true }
    } catch (apiError) {
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
