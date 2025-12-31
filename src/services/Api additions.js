// Add these methods to your existing authAPI object in services/api.js

// Example structure - adjust based on your existing API setup:

import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authAPI = {
  // Existing methods
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  adminLogin: (credentials) => api.post('/auth/admin/login', credentials),
  
  // NEW: Check if admin account exists
  checkAdminExists: () => api.get('/auth/admin/exists'),
  
  // NEW: Create admin account
  createAdmin: (adminData) => api.post('/auth/admin/create', adminData),
}

export default api