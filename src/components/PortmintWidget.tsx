import { useEffect } from 'react'

// The live Portmint assistant — Cole's flagship product, running on this site
// as its own proof. One-script install, Portmint's standard embed; the
// `cole-portfolio` bot is registered in the Portmint platform, origin-locked
// to this site, and themed to the Morning Line palette — a business's
// assistant wearing the business's brand is exactly what Portmint sells.
const EMBED_SRC = 'https://www.portmint.com/embed.js'
const BOT_KEY = 'cole-portfolio'

export default function PortmintWidget() {
  useEffect(() => {
    // Guard against double-injection (React 18 StrictMode re-runs effects).
    if (document.querySelector(`script[src="${EMBED_SRC}"]`)) return
    const s = document.createElement('script')
    s.src = EMBED_SRC
    s.async = true
    s.dataset.portmintKey = BOT_KEY
    s.dataset.name = "Cole's Assistant"
    s.dataset.color = '#f0a63d'
    s.dataset.position = 'right'
    s.dataset.theme = 'dark'
    s.dataset.label = 'Ask about my work'
    s.dataset.nudge = 'Ask me anything about Cole’s work — I’m a live Portmint build.'
    document.body.appendChild(s)
  }, [])

  return null
}
