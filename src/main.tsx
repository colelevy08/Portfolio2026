import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { installRailbird } from './lib/railbird.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// The console easter egg — a program masthead for whoever opens DevTools,
// and race() left on the window. Costs nothing until someone looks.
installRailbird()
