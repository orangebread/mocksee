import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MockMarkProvider } from 'mockmark'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MockMarkProvider
      enabled={true}
      defaultVariant="border"
      theme={{ borderColor: '#8b5cf6' }}
    >
      <App />
    </MockMarkProvider>
  </StrictMode>,
)
