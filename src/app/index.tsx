import { createRoot } from 'react-dom/client'

import Providers from './providers.tsx'
import { Router } from './router'

import './global.css'

createRoot(document.getElementById('root')!).render(
  <Providers>
    <div className="app-wrapper">
      <Router />
    </div>
  </Providers>,
)
