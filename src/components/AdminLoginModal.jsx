// import { useState } from 'react'
// import { FaTimes, FaLock } from 'react-icons/fa'
// import { useAuth } from '../context/AuthContext'

// const AdminLoginModal = ({ isOpen, onClose }) => {
//   const { adminLogin } = useAuth()
//   const [loading, setLoading] = useState(false)
//   const [email, setEmail] = useState('admin@evayobakery.com')
//   const [password, setPassword] = useState('')

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     const result = await adminLogin(email, password)
//     if (result.success) {
//       onClose()
//     }
//     setLoading(false)
//   }

//   return (
//     <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
//       <div className="modal">
//         <div className="modal-header">
//           <h2><FaLock style={{ marginRight: 10 }} /> Admin Login</h2>
//           <p>Enter your admin credentials</p>
//           <button className="close-modal" onClick={onClose}><FaTimes /></button>
//         </div>

//         <form className="modal-body" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="email"
//               placeholder="admin@evayobakery.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Password</label>
//             <input
//               type="password"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="submit-btn" disabled={loading}>
//             {loading ? <div className="spinner"></div> : 'Login to Admin'}
//           </button>
//           <p style={{ textAlign: 'center', marginTop: 15, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
//             Default: admin@evayobakery.com / admin123
//           </p>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default AdminLoginModal


// import { useState, useEffect } from 'react'
// import { FaTimes, FaLock, FaUserPlus, FaSignInAlt } from 'react-icons/fa'
// import { useAuth } from '../context/AuthContext'
// import { authAPI } from '../services/api'
// import toast from 'react-hot-toast'

// const AdminLoginModal = ({ isOpen, onClose }) => {
//   const { adminLogin } = useAuth()
//   const [loading, setLoading] = useState(false)
//   const [checkingAdmin, setCheckingAdmin] = useState(true)
//   const [adminExists, setAdminExists] = useState(true)
//   const [mode, setMode] = useState('login') // 'login' or 'create'
  
//   // Form fields
//   const [email, setEmail] = useState('admin@evayobakery.com')
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [firstName, setFirstName] = useState('')
//   const [lastName, setLastName] = useState('')

//   // Check if admin account exists when modal opens
//   useEffect(() => {
//     if (isOpen) {
//       checkAdminExists()
//     }
//   }, [isOpen])

//   const checkAdminExists = async () => {
//     setCheckingAdmin(true)
//     try {
//       // Call API to check if admin exists
//       const { data } = await authAPI.checkAdminExists()
//       setAdminExists(data.exists)
//       setMode(data.exists ? 'login' : 'create')
//     } catch (error) {
//       // If endpoint doesn't exist or fails, assume admin exists and show login
//       console.log('Admin check failed, defaulting to login mode')
//       setAdminExists(true)
//       setMode('login')
//     } finally {
//       setCheckingAdmin(false)
//     }
//   }

//   const resetForm = () => {
//     setEmail('admin@evayobakery.com')
//     setPassword('')
//     setConfirmPassword('')
//     setFirstName('')
//     setLastName('')
//   }

//   const handleLogin = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     const result = await adminLogin(email, password)
//     if (result.success) {
//       resetForm()
//       onClose()
//     }
//     setLoading(false)
//   }

//   const handleCreateAdmin = async (e) => {
//     e.preventDefault()
    
//     // Validation
//     if (password !== confirmPassword) {
//       toast.error('Passwords do not match')
//       return
//     }
    
//     if (password.length < 6) {
//       toast.error('Password must be at least 6 characters')
//       return
//     }

//     setLoading(true)
//     try {
//       const { data } = await authAPI.createAdmin({
//         email,
//         password,
//         firstName,
//         lastName
//       })
      
//       if (data.success) {
//         toast.success('Admin account created successfully!')
//         setAdminExists(true)
//         setMode('login')
//         resetForm()
//         // Optionally auto-login after creation
//         // await adminLogin(email, password)
//         // onClose()
//       }
//     } catch (error) {
//       const message = error.response?.data?.message || 'Failed to create admin account'
//       toast.error(message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleSubmit = mode === 'login' ? handleLogin : handleCreateAdmin

//   if (!isOpen) return null

//   return (
//     <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
//       <div className="modal">
//         <div className="modal-header">
//           <h2>
//             {mode === 'login' ? (
//               <><FaLock style={{ marginRight: 10 }} /> Admin Login</>
//             ) : (
//               <><FaUserPlus style={{ marginRight: 10 }} /> Create Admin Account</>
//             )}
//           </h2>
//           <p>
//             {mode === 'login' 
//               ? 'Enter your admin credentials' 
//               : 'Set up your admin account to get started'}
//           </p>
//           <button className="close-modal" onClick={onClose}><FaTimes /></button>
//         </div>

//         {checkingAdmin ? (
//           <div className="modal-body" style={{ textAlign: 'center', padding: '40px' }}>
//             <div className="spinner"></div>
//             <p style={{ marginTop: 15, color: 'var(--text-muted)' }}>Checking admin status...</p>
//           </div>
//         ) : (
//           <form className="modal-body" onSubmit={handleSubmit}>
//             {mode === 'create' && (
//               <>
//                 <div className="form-row" style={{ display: 'flex', gap: '15px' }}>
//                   <div className="form-group" style={{ flex: 1 }}>
//                     <label>First Name</label>
//                     <input
//                       type="text"
//                       placeholder="First name"
//                       value={firstName}
//                       onChange={(e) => setFirstName(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="form-group" style={{ flex: 1 }}>
//                     <label>Last Name</label>
//                     <input
//                       type="text"
//                       placeholder="Last name"
//                       value={lastName}
//                       onChange={(e) => setLastName(e.target.value)}
//                       required
//                     />
//                   </div>
//                 </div>
//               </>
//             )}
            
//             <div className="form-group">
//               <label>Email</label>
//               <input
//                 type="email"
//                 placeholder="admin@evayobakery.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
            
//             <div className="form-group">
//               <label>Password</label>
//               <input
//                 type="password"
//                 placeholder={mode === 'create' ? 'Create a strong password' : 'Enter password'}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 minLength={mode === 'create' ? 6 : undefined}
//               />
//             </div>

//             {mode === 'create' && (
//               <div className="form-group">
//                 <label>Confirm Password</label>
//                 <input
//                   type="password"
//                   placeholder="Confirm your password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   required
//                 />
//               </div>
//             )}

//             <button type="submit" className="submit-btn" disabled={loading}>
//               {loading ? (
//                 <div className="spinner"></div>
//               ) : mode === 'login' ? (
//                 <><FaSignInAlt style={{ marginRight: 8 }} /> Login to Admin</>
//               ) : (
//                 <><FaUserPlus style={{ marginRight: 8 }} /> Create Admin Account</>
//               )}
//             </button>

//             {/* Toggle between modes if admin exists */}
//             {adminExists && (
//               <p 
//                 style={{ 
//                   textAlign: 'center', 
//                   marginTop: 15, 
//                   color: 'var(--text-muted)', 
//                   fontSize: '0.85rem' 
//                 }}
//               >
//                 {mode === 'login' ? (
//                   <>
//                     Need to create a new admin?{' '}
//                     <button
//                       type="button"
//                       onClick={() => setMode('create')}
//                       style={{
//                         background: 'none',
//                         border: 'none',
//                         color: 'var(--primary)',
//                         cursor: 'pointer',
//                         textDecoration: 'underline'
//                       }}
//                     >
//                       Create Account
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     Already have an account?{' '}
//                     <button
//                       type="button"
//                       onClick={() => setMode('login')}
//                       style={{
//                         background: 'none',
//                         border: 'none',
//                         color: 'var(--primary)',
//                         cursor: 'pointer',
//                         textDecoration: 'underline'
//                       }}
//                     >
//                       Login
//                     </button>
//                   </>
//                 )}
//               </p>
//             )}

//             {!adminExists && (
//               <p 
//                 style={{ 
//                   textAlign: 'center', 
//                   marginTop: 15, 
//                   color: 'var(--warning, #f59e0b)', 
//                   fontSize: '0.85rem',
//                   background: 'var(--warning-bg, #fef3c7)',
//                   padding: '10px',
//                   borderRadius: '8px'
//                 }}
//               >
//                 ⚠️ No admin account found. Please create one to continue.
//               </p>
//             )}
//           </form>
//         )}
//       </div>
//     </div>
//   )
// }

// export default AdminLoginModal



// import { useState } from 'react'
// import { FaTimes, FaLock, FaUserPlus, FaSignInAlt } from 'react-icons/fa'
// import { useAuth } from '../context/AuthContext'
// import { authAPI } from '../services/api'
// import toast from 'react-hot-toast'

// const AdminLoginModal = ({ isOpen, onClose }) => {
//   const { adminLogin } = useAuth()
//   const [loading, setLoading] = useState(false)
//   const [mode, setMode] = useState('login') // 'login' or 'create'
  
//   // Form fields
//   const [email, setEmail] = useState('admin@evayobakery.com')
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [firstName, setFirstName] = useState('')
//   const [lastName, setLastName] = useState('')

//   const resetForm = () => {
//     setEmail('admin@evayobakery.com')
//     setPassword('')
//     setConfirmPassword('')
//     setFirstName('')
//     setLastName('')
//   }

//   const handleLogin = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     const result = await adminLogin(email, password)
//     if (result.success) {
//       resetForm()
//       onClose()
//     }
//     setLoading(false)
//   }

//   const handleCreateAdmin = async (e) => {
//     e.preventDefault()
    
//     if (password !== confirmPassword) {
//       toast.error('Passwords do not match')
//       return
//     }
    
//     if (password.length < 6) {
//       toast.error('Password must be at least 6 characters')
//       return
//     }

//     setLoading(true)
//     try {
//       const { data } = await authAPI.createAdmin({
//         email,
//         password,
//         firstName,
//         lastName
//       })
      
//       if (data.success) {
//         toast.success('Admin account created! Logging you in...')
//         // Auto-login after creation
//         const loginResult = await adminLogin(email, password)
//         if (loginResult.success) {
//           resetForm()
//           onClose()
//         }
//       }
//     } catch (error) {
//       const message = error.response?.data?.message || 'Failed to create admin account'
//       toast.error(message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleSubmit = mode === 'login' ? handleLogin : handleCreateAdmin

//   if (!isOpen) return null

//   return (
//     <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
//       <div className="modal">
//         <div className="modal-header">
//           <h2>
//             {mode === 'login' ? (
//               <><FaLock style={{ marginRight: 10 }} /> Admin Login</>
//             ) : (
//               <><FaUserPlus style={{ marginRight: 10 }} /> Create Admin Account</>
//             )}
//           </h2>
//           <p>
//             {mode === 'login' 
//               ? 'Enter your admin credentials' 
//               : 'Set up your admin account to get started'}
//           </p>
//           <button className="close-modal" onClick={onClose}><FaTimes /></button>
//         </div>

//         <form className="modal-body" onSubmit={handleSubmit}>
//           {mode === 'create' && (
//             <div className="form-row" style={{ display: 'flex', gap: '15px' }}>
//               <div className="form-group" style={{ flex: 1 }}>
//                 <label>First Name</label>
//                 <input
//                   type="text"
//                   placeholder="First name"
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="form-group" style={{ flex: 1 }}>
//                 <label>Last Name</label>
//                 <input
//                   type="text"
//                   placeholder="Last name"
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                   required
//                 />
//               </div>
//             </div>
//           )}
          
//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="email"
//               placeholder="admin@evayobakery.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
          
//           <div className="form-group">
//             <label>Password</label>
//             <input
//               type="password"
//               placeholder={mode === 'create' ? 'Create a strong password' : 'Enter password'}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               minLength={mode === 'create' ? 6 : undefined}
//             />
//           </div>

//           {mode === 'create' && (
//             <div className="form-group">
//               <label>Confirm Password</label>
//               <input
//                 type="password"
//                 placeholder="Confirm your password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//               />
//             </div>
//           )}

//           <button type="submit" className="submit-btn" disabled={loading}>
//             {loading ? (
//               <div className="spinner"></div>
//             ) : mode === 'login' ? (
//               <><FaSignInAlt style={{ marginRight: 8 }} /> Login to Admin</>
//             ) : (
//               <><FaUserPlus style={{ marginRight: 8 }} /> Create Admin Account</>
//             )}
//           </button>

//           <p style={{ 
//             textAlign: 'center', 
//             marginTop: 15, 
//             color: 'var(--text-muted)', 
//             fontSize: '0.85rem' 
//           }}>
//             {mode === 'login' ? (
//               <>
//                 No admin account?{' '}
//                 <button
//                   type="button"
//                   onClick={() => { setMode('create'); resetForm(); }}
//                   style={{
//                     background: 'none',
//                     border: 'none',
//                     color: 'var(--primary)',
//                     cursor: 'pointer',
//                     textDecoration: 'underline',
//                     padding: 0,
//                     font: 'inherit'
//                   }}
//                 >
//                   Create one
//                 </button>
//               </>
//             ) : (
//               <>
//                 Already have an account?{' '}
//                 <button
//                   type="button"
//                   onClick={() => { setMode('login'); resetForm(); }}
//                   style={{
//                     background: 'none',
//                     border: 'none',
//                     color: 'var(--primary)',
//                     cursor: 'pointer',
//                     textDecoration: 'underline',
//                     padding: 0,
//                     font: 'inherit'
//                   }}
//                 >
//                   Login
//                 </button>
//               </>
//             )}
//           </p>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default AdminLoginModal



import { useState } from 'react'
import { FaTimes, FaLock, FaUserPlus, FaSignInAlt } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { authAPI } from '../services/api'
import toast from 'react-hot-toast'

const AdminLoginModal = ({ isOpen, onClose }) => {
  const { adminLogin } = useAuth()
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState('login') // 'login' or 'create'
  
  // Form fields
  const [email, setEmail] = useState('admin@evayobakery.com')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const resetForm = () => {
    setEmail('admin@evayobakery.com')
    setPassword('')
    setConfirmPassword('')
    setFirstName('')
    setLastName('')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const result = await adminLogin(email, password)
    if (result.success) {
      resetForm()
      onClose()
    }
    setLoading(false)
  }

  const handleCreateAdmin = async (e) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    try {
      const { data } = await authAPI.createAdmin({
        email,
        password,
        firstName,
        lastName
      })
      
      if (data.success) {
        toast.success('Admin account created! Logging you in...')
        // Auto-login after creation
        const loginResult = await adminLogin(email, password)
        if (loginResult.success) {
          resetForm()
          onClose()
        }
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create admin account'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = mode === 'login' ? handleLogin : handleCreateAdmin

  if (!isOpen) return null

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className="modal">
        <div className="modal-header">
          <h2>
            {mode === 'login' ? (
              <><FaLock style={{ marginRight: 10 }} /> Admin Login</>
            ) : (
              <><FaUserPlus style={{ marginRight: 10 }} /> Create Admin Account</>
            )}
          </h2>
          <p>
            {mode === 'login' 
              ? 'Enter your admin credentials' 
              : 'Set up your admin account to get started'}
          </p>
          <button className="close-modal" onClick={onClose}><FaTimes /></button>
        </div>

        <form className="modal-body" onSubmit={handleSubmit}>
          {mode === 'create' && (
            <div className="form-row" style={{ display: 'flex', gap: '15px' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="admin@evayobakery.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder={mode === 'create' ? 'Create a strong password' : 'Enter password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={mode === 'create' ? 6 : undefined}
            />
          </div>

          {mode === 'create' && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <div className="spinner"></div>
            ) : mode === 'login' ? (
              <><FaSignInAlt style={{ marginRight: 8 }} /> Login to Admin</>
            ) : (
              <><FaUserPlus style={{ marginRight: 8 }} /> Create Admin Account</>
            )}
          </button>

          <p style={{ 
            textAlign: 'center', 
            marginTop: 15, 
            color: 'var(--text-muted)', 
            fontSize: '0.85rem' 
          }}>
            {mode === 'login' ? (
              <>
                No admin account?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('create'); resetForm(); }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary)',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    padding: 0,
                    font: 'inherit'
                  }}
                >
                  Create one
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('login'); resetForm(); }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary)',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    padding: 0,
                    font: 'inherit'
                  }}
                >
                  Login
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  )
}

export default AdminLoginModal