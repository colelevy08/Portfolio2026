import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../data/content'
import RailRunner from './RailRunner'

// Canonical résumé URL is centralized on the profile object.
const Resume = profile.resumeUrl

const links = [
  { label: 'Work', to: '#featured' },
  { label: 'Skills', to: '#skills' },
  { label: 'About', to: '#about' },
  { label: 'Path', to: '#path' },
  { label: 'Contact', to: '#contact' },
]

// Which nav link lights up for each observed section id — several sections
// share a link (the grid belongs to Work, the AI method rides with Skills).
const SECTION_TO_LINK: Record<string, string> = {
  featured: '#featured',
  work: '#featured',
  skills: '#skills',
  ai: '#skills',
  about: '#about',
  path: '#path',
  contact: '#contact',
}

// The awning valance above scrolls away with the page; this quiet clapboard
// bar — nav over the running rail — is what stays stuck to the top.
export default function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)

  // Scrollspy: the section crossing mid-viewport claims its nav link,
  // program-tab style.
  useEffect(() => {
    const sections = Object.keys(SECTION_TO_LINK)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(SECTION_TO_LINK[entry.target.id] ?? null)
          }
        }
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="sticky inset-x-0 top-0 z-50 border-b border-line bg-bg-2/95 backdrop-blur-md">
      <nav className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-3.5">
        {/* No aria-label: the visible text ("Cole Levy Saratoga Springs") IS
            the accessible name — an abbreviated label mismatches it (WCAG 2.5.3). */}
        <a
          href="#top"
          className="group inline-flex items-baseline gap-3 transition-colors hover:text-awning"
        >
          <span className="font-display text-lg leading-none">
            {profile.name}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
            {profile.location.split(',')[0]}
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.to}
              href={l.to}
              className={`border-b-2 pb-0.5 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors ${
                active === l.to
                  ? 'border-awning text-ink'
                  : 'border-transparent text-ink-2 hover:text-awning'
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href={Resume}
            download
            className="border-b-2 border-transparent pb-0.5 font-mono text-[11px] uppercase tracking-[0.22em] text-accent hover:text-awning transition-colors"
          >
            Résumé ↓
          </a>
        </div>

        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden -m-2.5 p-2.5 text-ink"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-line bg-bg-2/98 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-5">
              {links.map((l) => (
                <a
                  key={l.to}
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className="font-mono text-xs uppercase tracking-[0.22em] py-2 text-ink-2 hover:text-awning transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={Resume}
                download
                onClick={() => setOpen(false)}
                className="font-mono text-xs uppercase tracking-[0.22em] py-2 text-accent hover:text-awning transition-colors"
              >
                Résumé ↓
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The stretch run — scroll progress as a race to the wire. */}
      <RailRunner />
    </header>
  )
}
