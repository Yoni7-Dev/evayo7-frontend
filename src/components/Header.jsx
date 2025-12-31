import { FaUser, FaShoppingCart, FaCog, FaReceipt } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useState } from 'react'
import AdminLoginModal from './AdminLoginModal'

const Header = () => {
  const { user, openAuthModal, logout } = useAuth()
  const { cartCount, activeOrdersCount, openCart, openOrders } = useCart()
  const [showAdminLogin, setShowAdminLogin] = useState(false)

  const handleAuthClick = () => {
    if (user) {
      if (confirm('Are you sure you want to sign out?')) {
        logout()
      }
    } else {
      openAuthModal('login')
    }
  }

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <div>
              <h1>Evayo ኢቫዮ ዳቦ ቤት</h1>
              <span>Fresh Baked Daily</span>
            </div>
          </div>
          
          <div className="header-actions">
            <button 
              className="header-btn admin" 
              onClick={() => setShowAdminLogin(true)}
              title="Admin Panel"
            >
              <FaCog />
            </button>
            
            <button 
              className={`header-btn ${user ? 'logged-in' : ''}`}
              onClick={handleAuthClick}
            >
              <FaUser />
              <span>{user ? user.firstName : 'Sign In'}</span>
            </button>
            
            {user && (
              <button className="header-btn" onClick={openOrders}>
                <FaReceipt />
                <span>My Orders</span>
                {activeOrdersCount > 0 && (
                  <span className="badge info">{activeOrdersCount}</span>
                )}
              </button>
            )}
            
            <button className="header-btn cart" onClick={openCart}>
              <FaShoppingCart />
              <span>Cart</span>
              <span className="badge">{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      <AdminLoginModal 
        isOpen={showAdminLogin} 
        onClose={() => setShowAdminLogin(false)} 
      />
    </>
  )
}

export default Header
