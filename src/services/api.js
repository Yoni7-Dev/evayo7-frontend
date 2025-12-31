// import axios from 'axios'

// const API_URL = import.meta.env.VITE_API_URL || '/api'

// // Create axios instance
// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })

// // Add auth token to requests
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token')
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })

// // Handle response errors
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('token')
//       localStorage.removeItem('user')
//       window.location.href = '/'
//     }
//     return Promise.reject(error)
//   }
// )

// // ==================== Auth API ====================
// export const authAPI = {
//   login: (data) => api.post('/auth/login', data),
//   register: (data) => api.post('/auth/register', data),
//   adminLogin: (data) => api.post('/auth/admin-login', data),
//   getProfile: () => api.get('/auth/me'),
// }



// // ==================== Products API ====================
// export const productsAPI = {
//   getAll: (params) => api.get('/products', { params }),
//   getById: (id) => api.get(`/products/${id}`),
//   create: (data) => api.post('/products', data),
//   update: (id, data) => api.put(`/products/${id}`, data),
//   delete: (id) => api.delete(`/products/${id}`)
// }

// // ==================== Orders API ====================
// export const ordersAPI = {
//   getAll: (params) => api.get('/orders', { params }),
//   getById: (id) => api.get(`/orders/${id}`),
//   create: (data) => api.post('/orders', data),
//   updateStatus: (id, data) => api.put(`/orders/${id}/status`, data),
//   cancel: (id) => api.put(`/orders/${id}/cancel`)
// }

// // ==================== Employees API ====================
// export const employeesAPI = {
//   getAll: (params) => api.get('/employees', { params }),
//   getById: (id) => api.get(`/employees/${id}`),
//   create: (data) => api.post('/employees', data),
//   update: (id, data) => api.put(`/employees/${id}`, data),
//   delete: (id) => api.delete(`/employees/${id}`)
// }

// // ==================== Expenses API ====================
// export const expensesAPI = {
//   getAll: (params) => api.get('/expenses', { params }),
//   getSummary: () => api.get('/expenses/summary'),
//   getById: (id) => api.get(`/expenses/${id}`),
//   create: (data) => api.post('/expenses', data),
//   update: (id, data) => api.put(`/expenses/${id}`, data),
//   delete: (id) => api.delete(`/expenses/${id}`)
// }

// // ==================== Dashboard API ====================
// export const dashboardAPI = {
//   getStats: () => api.get('/dashboard/stats'),
//   getSalesChart: (period) => api.get('/dashboard/sales-chart', { params: { period } }),
//   getRecentOrders: () => api.get('/dashboard/recent-orders'),
//   getTopProducts: () => api.get('/dashboard/top-products'),
//   getCategorySales: () => api.get('/dashboard/category-sales')
// }

// export default api


import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/api'

// Create axios instance
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

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

// ==================== Auth API ====================
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getProfile: () => api.get('/auth/me'),
  
  // Admin endpoints
  adminLogin: (data) => api.post('/auth/admin-login', data),
  createAdmin: (data) => api.post('/auth/admin-create', data),
  checkAdminExists: () => api.get('/auth/admin-exists'),
}

// ==================== Products API ====================
export const productsAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`)
}

// ==================== Orders API ====================
export const ordersAPI = {
  getAll: (params) => api.get('/orders', { params }),
  getById: (id) => api.get(`/orders/${id}`),
  create: (data) => api.post('/orders', data),
  updateStatus: (id, data) => api.put(`/orders/${id}/status`, data),
  cancel: (id) => api.put(`/orders/${id}/cancel`)
}

// ==================== Employees API ====================
export const employeesAPI = {
  getAll: (params) => api.get('/employees', { params }),
  getById: (id) => api.get(`/employees/${id}`),
  create: (data) => api.post('/employees', data),
  update: (id, data) => api.put(`/employees/${id}`, data),
  delete: (id) => api.delete(`/employees/${id}`)
}

// ==================== Expenses API ====================
export const expensesAPI = {
  getAll: (params) => api.get('/expenses', { params }),
  getSummary: () => api.get('/expenses/summary'),
  getById: (id) => api.get(`/expenses/${id}`),
  create: (data) => api.post('/expenses', data),
  update: (id, data) => api.put(`/expenses/${id}`, data),
  delete: (id) => api.delete(`/expenses/${id}`)
}

// ==================== Dashboard API ====================
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getSalesChart: (period) => api.get('/dashboard/sales-chart', { params: { period } }),
  getRecentOrders: () => api.get('/dashboard/recent-orders'),
  getTopProducts: () => api.get('/dashboard/top-products'),
  getCategorySales: () => api.get('/dashboard/category-sales')
}

export default api