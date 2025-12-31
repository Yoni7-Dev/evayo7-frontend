import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import AdminDashboard from './pages/admin/Dashboard'
import AdminOrders from './pages/admin/Orders'
import AdminEmployees from './pages/admin/Employees'
import AdminExpenses from './pages/admin/Expenses'
import AdminSales from './pages/admin/Sales'
import Cart from './components/Cart'
import AuthModal from './components/AuthModal'
import CheckoutModal from './components/CheckoutModal'
import OrdersModal from './components/OrdersModal'
import { useAuth } from './context/AuthContext'

function App() {
  const { isAdminMode } = useAuth()

  if (isAdminMode) {
    return (
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/employees" element={<AdminEmployees />} />
        <Route path="/admin/expenses" element={<AdminExpenses />} />
        <Route path="/admin/sales" element={<AdminSales />} />
      </Routes>
    )
  }

  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      
      {/* Modals */}
      <Cart />
      <AuthModal />
      <CheckoutModal />
      <OrdersModal />
    </div>
  )
}

export default App
