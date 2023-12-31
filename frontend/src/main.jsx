import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './axios.Config.js'
import './Interceptors/authInterceptors.js'
import { AuthProvider } from './Hooks/useAuth.jsx'

import './index.css'
import { LoadingProvider } from './Hooks/useLoading.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
