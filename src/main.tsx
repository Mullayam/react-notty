import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {ToastContainer} from './components/ToastContainer.tsx'
import { ToastProvider } from './context/ToastContext.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>

      <App/>
    </ToastProvider>
  </StrictMode>,
)
