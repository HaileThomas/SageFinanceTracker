import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthenticationProvider } from './context/AuthenticationContext'
import { AppRouter } from './routes/AppRouter'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthenticationProvider>
      <AppRouter />
    </AuthenticationProvider>
  </React.StrictMode>
)
