import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import MaintenanceModal from './MaintenanceModal'

export default function Layout() {
  return (
    <div className="site-wrapper">
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <MaintenanceModal />
    </div>
  )
}
