import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initBotId } from 'botid/client/core'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.tsx'

initBotId({
  protect: [
    {
      path: '/api/contact',
      method: 'POST',
      advancedOptions: {
        checkLevel: 'basic',
      },
    },
  ],
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>,
)
