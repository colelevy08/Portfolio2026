import { useEffect, useState } from 'react'
import { Menu, X, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Resume from '../assets/ColeLevyResume.pdf'

const links = [
  { label: 'About', to: '#about' },
  { label: 'Work', to: '#work' },
  { label: 'Contact', to: '#contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ink/70 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <a href="#home" className="font-mono text-base font-bold tracking-tight">
          <span className="text-accent">&lt;Cole</span>
          <span className="text-slate-100"> Levy</span>
          <span className="text-accent-2">/&gt;</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.to}
              href={l.to}
              className="text-sm text-slate-300 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href={Resume}
            download
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-4 py-1.5 text-sm font-semibold text-ink shadow-lg shadow-accent/20 transition-transform hover:scale-105"
          >
            <Download size={14} /> Resume
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-slate-200 md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/5 bg-ink/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <a
                  key={l.to}
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-slate-300 hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={Resume}
                download
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-4 py-2 text-sm font-semibold text-ink"
              >
                <Download size={14} /> Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
