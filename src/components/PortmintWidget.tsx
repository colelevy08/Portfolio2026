import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

// The live Portmint assistant — Cole's flagship product, running on this site
// as its own proof. The `cole-portfolio` bot is registered in the Portmint
// platform, origin-locked to this site, and themed to the Morning Line palette.
//
// LAZY LOAD (2026-07-02): embed.js is NOT injected on page load. Loading it
// eagerly meant every visitor AND every crawler fired the bot's `/start`
// greeting — an LLM call per pageview — which flooded the Portmint backend.
// Now the script is injected only on a real click, so `/start` runs for people
// who actually want to chat and never for idle loads or bots. Backend-side,
// `/start` should still cache its greeting and rate-limit per origin.
const EMBED_SRC = 'https://www.portmint.com/embed.js'
const BOT_KEY = 'cole-portfolio'
const NUDGE = 'Ask me anything about Cole’s work — I’m a live Portmint build.'

// Inject the Portmint embed with this site's config. Guarded so it can only
// ever run once, no matter how many times the launcher is clicked.
function loadPortmint() {
  if (document.querySelector(`script[src="${EMBED_SRC}"]`)) return
  const s = document.createElement('script')
  s.src = EMBED_SRC
  s.async = true
  s.dataset.portmintKey = BOT_KEY
  s.dataset.name = "Cole's Assistant"
  s.dataset.color = '#c03428'
  s.dataset.position = 'right'
  s.dataset.theme = 'dark'
  s.dataset.label = 'Ask about my work'
  s.dataset.nudge = NUDGE
  s.dataset.autoOpen = 'true' // hint: open the panel on load (ignored if unsupported)
  document.body.appendChild(s)
}

// Session flag so the nudge bubble shows once per visit, not on every render.
const NUDGE_KEY = 'portmint-nudge-dismissed'

export default function PortmintWidget() {
  // 'idle' → our launcher is showing; 'loading' → real widget is taking over.
  const [state, setState] = useState<'idle' | 'loading'>('idle')
  // The nudge steps aside on its own — first scroll or 8 seconds — so it
  // never sits on top of page copy while someone is actually reading.
  const [nudgeOpen, setNudgeOpen] = useState(
    () => sessionStorage.getItem(NUDGE_KEY) !== '1',
  )
  const dismissNudge = () => {
    setNudgeOpen(false)
    sessionStorage.setItem(NUDGE_KEY, '1')
  }
  useEffect(() => {
    if (!nudgeOpen) return
    const timer = window.setTimeout(dismissNudge, 8000)
    window.addEventListener('scroll', dismissNudge, { once: true, passive: true })
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('scroll', dismissNudge)
    }
    // dismissNudge is stable in behavior; re-arming only when nudgeOpen flips.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nudgeOpen])

  const open = () => {
    loadPortmint()
    setState('loading')
  }

  // Once the real Portmint widget owns the corner, our placeholder steps aside.
  if (state === 'loading') return null

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      {nudgeOpen && (
        <div className="relative max-w-[240px] rounded-xl border border-line bg-bg-2 px-4 py-3 pr-8 shadow-lg">
          <button
            onClick={open}
            className="text-left font-serif text-[13px] leading-snug text-ink-2 hover:text-ink"
          >
            {NUDGE}
          </button>
          <button
            onClick={dismissNudge}
            aria-label="Dismiss"
            className="absolute right-1.5 top-1.5 rounded p-1 text-muted hover:text-ink"
          >
            <X size={13} />
          </button>
        </div>
      )}

      <button
        onClick={open}
        aria-label="Open chat — ask about Cole’s work"
        className="grid h-14 w-14 place-items-center rounded-full bg-[#07182c] shadow-lg ring-2 ring-awning transition-transform hover:scale-105"
      >
        <SaratogaPorthole />
      </button>
    </div>
  )
}

// The Portmint porthole in the site's red-and-white awning theme — matches
// the real widget's launcher so the handoff on click is seamless.
function SaratogaPorthole() {
  const dots = [
    [48, 32],
    [43.3, 43.3],
    [32, 48],
    [20.7, 43.3],
    [16, 32],
    [20.7, 20.7],
    [32, 16],
    [43.3, 20.7],
  ]
  return (
    <svg width="34" height="34" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="23.5" fill="#07182c" />
      <circle cx="32" cy="32" r="23.5" fill="none" stroke="#c03428" strokeWidth="5" />
      <g fill="#fffdf6">
        {dots.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2" />
        ))}
      </g>
    </svg>
  )
}
