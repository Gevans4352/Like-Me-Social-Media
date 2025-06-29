import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DarkModeContextProvider } from './Context/DarkModeContext.tsx'
import { AuthContextProvider } from './Context/Autheciator.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
      <App />
      </AuthContextProvider>
    </DarkModeContextProvider>
  </StrictMode>,
)
