import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import AboutPage from './pages/AboutPage'
import AimScopePage from './pages/AimScopePage'
import APCPage from './pages/APCPage'
import AdminPage from './pages/AdminPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AuthorGuidelinesPage from './pages/AuthorGuidelinesPage'
import EditorialBoardPage from './pages/EditorialBoardPage'
import AboutPage2 from './pages/AboutPage2'
import IndexingPage from './pages/IndexingPage'
import IssuesPage from './pages/IssuesPage'
import NotFoundPage from './pages/NotFoundPage'
import SubmissionPage from './pages/SubmissionPage'
import { useEffect } from 'react'
import { JournalProvider } from './context/JournalContext'
import ProtectedAdminRoute from './components/ProtectedAdminRoute'

function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return (
    <JournalProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<AboutPage />} />
          <Route path="/home" element={<AboutPage />} />
          <Route path="/about" element={<AboutPage2 />} />
          <Route path="/aim-scope" element={<AimScopePage />} />
          <Route path="/editorial-board" element={<EditorialBoardPage />} />
          <Route path="/author-guidelines" element={<AuthorGuidelinesPage />} />
          <Route path="/submission" element={<SubmissionPage />} />
          <Route path="/indexing" element={<IndexingPage />} />
          <Route path="/apc" element={<APCPage />} />
          <Route path="/issues" element={<IssuesPage />} />
          <Route path="/adminj/login" element={<AdminLoginPage />} />
          <Route
            path="/adminj"
            element={(
              <ProtectedAdminRoute>
                <AdminPage />
              </ProtectedAdminRoute>
            )}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </JournalProvider>
  )
}

export default App
