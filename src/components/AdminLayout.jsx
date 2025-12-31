import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  FaStore, FaTachometerAlt, FaChartLine, FaShoppingBag, 
  FaUsers, FaWallet, FaBox, FaArrowLeft, FaBars, FaCalendar
} from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import '../assets/css/admin.css'

const AdminLayout = ({ children, title }) => {
  const { user, exitAdminMode } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems = [
    { path: '/admin', icon: <FaTachometerAlt />, label: 'Dashboard' },
    { path: '/admin/sales', icon: <FaChartLine />, label: 'Sales' },
    { path: '/admin/orders', icon: <FaShoppingBag />, label: 'Orders' },
    { path: '/admin/employees', icon: <FaUsers />, label: 'Employees' },
    { path: '/admin/expenses', icon: <FaWallet />, label: 'Expenses' },
  ]

  const handleNavClick = (path) => {
    navigate(path)
    setSidebarOpen(false)
  }

  const handleExit = () => {
    exitAdminMode()
    navigate('/')
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="admin-panel">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-logo">
          <FaStore />
          <span>Evayo Admin</span>
        </div>
        
        <nav className="admin-nav">
          {navItems.map(item => (
            <a
              key={item.path}
              className={`admin-nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => handleNavClick(item.path)}
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        
        <div className="admin-sidebar-footer">
          <button className="exit-admin-btn" onClick={handleExit}>
            <FaArrowLeft />
            <span>Back to Store</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="admin-content">
        {/* Header */}
        <header className="admin-header">
          <div className="admin-header-left">
            <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <FaBars />
            </button>
            <h2>{title}</h2>
          </div>
          <div className="admin-header-right">
            <div className="admin-date">
              <FaCalendar />
              <span>{currentDate}</span>
            </div>
            <div className="admin-user">
              <img 
                src={`https://ui-avatars.com/api/?name=${user?.firstName || 'Admin'}&background=D2691E&color=fff`} 
                alt="Admin" 
              />
              <span>{user?.firstName || 'Admin'}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="admin-main">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}

export default AdminLayout
