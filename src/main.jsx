import { StrictMode } from 'react'
import './index.css'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import router from './routes/Routes.jsx'
import AuthProvider from './context/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  </StrictMode>,
)
