import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import AboutPage from './pages/AboutPage'
import AimScopePage from './pages/AimScopePage'
import APCPage from './pages/APCPage'
import AuthorGuidelinesPage from './pages/AuthorGuidelinesPage'
import EditorialBoardPage from './pages/EditorialBoardPage'
// import HomePage from './pages/HomePage'
import IndexingPage from './pages/IndexingPage'
import IssuesPage from './pages/IssuesPage'
import NotFoundPage from './pages/NotFoundPage'
import SubmissionPage from './pages/SubmissionPage'
import { useEffect } from 'react'

function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<AboutPage />} />
        <Route path="/home" element={<AboutPage />} />
        <Route path="/about" element={<Navigate to="/" replace />} />
        <Route path="/aim-scope" element={<AimScopePage />} />
        <Route path="/editorial-board" element={<EditorialBoardPage />} />
        <Route path="/author-guidelines" element={<AuthorGuidelinesPage />} />
        <Route path="/submission" element={<SubmissionPage />} />
        <Route path="/indexing" element={<IndexingPage />} />
        <Route path="/apc" element={<APCPage />} />
        <Route path="/issues" element={<IssuesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
