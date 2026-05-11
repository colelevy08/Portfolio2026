import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Resume from '../assets/ColeLevyResume.pdf'
import { profile } from '../data/content'

const links = [
  { label: 'Work', to: '#work' },
  { label: 'About', to: '#about' },
  { label: 'Path', to: '#path' },
  { label: 'Contact', to: '#contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-bg/80 backdrop-blur-md border-b border-line'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-4 sm:py-5">
        <a
          href="#top"
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink hover:text-accent transition-colors"
          aria-label={`${profile.name} — home`}
        >
          {profile.name} <span className="text-muted">·</span>{' '}
          <span className="text-muted">{profile.location.split(',')[0]}</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.to}
              href={l.to}
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-2 hover:text-accent transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href={Resume}
            download
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent hover:text-accent-2 transition-colors"
          >
            Résumé ↓
          </a>
        </div>

        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-ink"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-line bg-bg/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-5">
              {links.map((l) => (
                <a
                  key={l.to}
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className="font-mono text-xs uppercase tracking-[0.22em] py-2 text-ink-2 hover:text-accent transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={Resume}
                download
                onClick={() => setOpen(false)}
                className="font-mono text-xs uppercase tracking-[0.22em] py-2 text-accent hover:text-accent-2 transition-colors"
              >
                Résumé ↓
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
