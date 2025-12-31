import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../services/api'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [authMode, setAuthMode] = useState('login') // 'login' or 'register'

  // Check for existing session on mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser))
      
      // Check if admin mode was active
      const adminMode = localStorage.getItem('adminMode') === 'true'
      setIsAdminMode(adminMode)
    }
    setLoading(false)
  }, [])

  // Login function
  const login = async (email, password) => {
    try {
      const { data } = await authAPI.login({ email, password })
      
      if (data.success) {
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('user', JSON.stringify(data.data))
        setUser(data.data)
        setIsAuthModalOpen(false)
        toast.success(`Welcome back, ${data.data.firstName}!`)
        return { success: true }
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      toast.error(message)
      return { success: false, message }
    }
  }

  // Register function
  const register = async (userData) => {
    try {
      const { data } = await authAPI.register(userData)
      
      if (data.success) {
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('user', JSON.stringify(data.data))
        setUser(data.data)
        setIsAuthModalOpen(false)
        toast.success(`Welcome to Evayo, ${data.data.firstName}!`)
        return { success: true }
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      toast.error(message)
      return { success: false, message }
    }
  }

  // Admin login function
  const adminLogin = async (email, password) => {
    try {
      const { data } = await authAPI.adminLogin({ email, password })
      
      if (data.success) {
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('user', JSON.stringify(data.data))
        localStorage.setItem('adminMode', 'true')
        setUser(data.data)
        setIsAdminMode(true)
        toast.success('Welcome to Admin Panel!')
        return { success: true }
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Admin login failed'
      toast.error(message)
      return { success: false, message }
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('adminMode')
    setUser(null)
    setIsAdminMode(false)
    toast.success('Logged out successfully')
  }

  // Exit admin mode
  const exitAdminMode = () => {
    localStorage.removeItem('adminMode')
    setIsAdminMode(false)
  }

  // Open auth modal
  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode)
    setIsAuthModalOpen(true)
  }

  // Close auth modal
  const closeAuthModal = () => {
    setIsAuthModalOpen(false)
  }

  const value = {
    user,
    loading,
    isAuthModalOpen,
    authMode,
    isAdminMode,
    login,
    register,
    adminLogin,
    logout,
    exitAdminMode,
    openAuthModal,
    closeAuthModal,
    setAuthMode
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
