// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
// import { Toaster } from 'react-hot-toast'
// import App from './App'
// import { AuthProvider } from './context/AuthContext'
// import { CartProvider } from './context/CartContext'
// import './assets/css/index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
//       <AuthProvider>
//         <CartProvider>
//           <App />
//           <Toaster 
//             position="bottom-center"
//             toastOptions={{
//               duration: 3000,
//               style: {
//                 background: '#333',
//                 color: '#fff',
//                 borderRadius: '10px',
//               },
//             }}
//           />
//         </CartProvider>
//       </AuthProvider>
//     </BrowserRouter>
//   </React.StrictMode>,
// )

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import './assets/css/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter 
      basename="/evayo7-frontend"
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <AuthProvider>
        <CartProvider>
          <App />
          <Toaster 
            position="bottom-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#333',
                color: '#fff',
                borderRadius: '10px',
              },
            }}
          />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)