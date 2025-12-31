import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, authMode, setAuthMode, login, register } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (authMode === 'login') {
      await login(formData.email, formData.password)
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match')
        setLoading(false)
        return
      }
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      })
    }
    setLoading(false)
  }

  const toggleMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login')
    setFormData({ firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '' })
  }

  return (
    <div className={`modal-overlay ${isAuthModalOpen ? 'open' : ''}`}>
      <div className="modal">
        <div className="modal-header">
          <h2>{authMode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{authMode === 'login' ? 'Sign in to your account' : 'Join the Evayo family'}</p>
          <button className="close-modal" onClick={closeAuthModal}><FaTimes /></button>
        </div>

        <form className="modal-body" onSubmit={handleSubmit}>
          {authMode === 'register' && (
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" name="firstName" placeholder="" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" name="lastName" placeholder="" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" placeholder="" value={formData.email} onChange={handleChange} required />
          </div>

          {authMode === 'register' && (
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" name="phone" placeholder="" value={formData.phone} onChange={handleChange} required />
            </div>
          )}

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required minLength={8} />
          </div>

          {authMode === 'register' && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" name="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} required />
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? <div className="spinner"></div> : authMode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="modal-footer">
          <span>{authMode === 'login' ? "Don't have an account?" : 'Already have an account?'}</span>{' '}
          <a onClick={toggleMode}>{authMode === 'login' ? 'Create one' : 'Sign in'}</a>
        </div>
      </div>
    </div>
  )
}

export default AuthModal
