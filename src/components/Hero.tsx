import { useEffect, useState, type CSSProperties, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { hero, profile } from '../data/content'

// Track time is always America/New_York — Saratoga runs on Eastern.
const trackTime = () =>
  new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'America/New_York',
  }).format(new Date())

// A live clock in the board header — the one datum on the page that is
// genuinely live, ticking like the infield board. Isolated in its own
// component so the once-a-second tick re-renders nothing else.
function TrackClock() {
  const [now, setNow] = useState(trackTime)
  useEffect(() => {
    const id = setInterval(() => setNow(trackTime()), 1000)
    return () => clearInterval(id)
  }, [])
  // Amber marks it as live board data, visually distinct from the muted
  // title beside it — on mobile the two would otherwise read as one string.
  return <span className="tabular-nums text-amber/75">{now} ET</span>
}

// Deterministic anchor jump: land the proof card just below the sticky
// header (scroll-margin proved unreliable on transformed reveal targets).
// The href stays on the link, so middle-click/no-JS still work.
function jumpToProof(e: MouseEvent<HTMLAnchorElement>, to: string) {
  const el = document.querySelector(to)
  if (!el) return
  e.preventDefault()
  const top = el.getBoundingClientRect().top + window.scrollY - 100
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
  history.replaceState(null, '', to)
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative px-4 pt-16 pb-16 sm:px-6 sm:pt-24 sm:pb-24 lg:pt-28 lg:pb-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <p className="eyebrow">{hero.eyebrow}</p>

        {/* The name runs as the program-cover masthead. */}
        <h1 className="font-display mt-5 text-[clamp(3.4rem,11vw,8.5rem)] font-black leading-[0.98]">
          Cole Levy
        </h1>

        {/* Victorian thick-thin rules bracket the subline, program style.
            They draw in once on load; reduced-motion renders them static. */}
        <div className="mt-10 max-w-2xl">
          <div
            className="scotch scotch-draw"
            style={{ '--d': '0.35s' } as CSSProperties}
          />
          <p className="py-4 font-serif text-lg leading-relaxed text-ink-2 sm:text-xl">
            {hero.subline}
          </p>
          <div
            className="scotch scotch-draw"
            style={{ '--d': '0.5s' } as CSSProperties}
          />
        </div>

        {/* The tote board — the one dark island on the bright page: the
            infield board seen across a sunlit track. */}
        <div className="board island mt-12 sm:mt-14">
          <div className="flex items-center justify-between border-b border-line px-5 py-3">
            <span className="board-title">The morning line</span>
            <span className="board-title">
              <span className="hidden sm:inline">{profile.location} · </span>
              <TrackClock />
            </span>
          </div>
          {/* Each cell is the claim AND the receipt: cells with a `to` anchor
              jump to the spot on the page that backs the number up. */}
          <ul className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
            {hero.board.map((cell, i) => {
              const inner = (
                <>
                  <span
                    className="board-value tote-in text-3xl sm:text-4xl"
                    style={{ '--d': `${0.15 + i * 0.12}s` } as CSSProperties}
                  >
                    {cell.value}
                  </span>
                  <span className="board-title">{cell.label}</span>
                </>
              )
              return (
                <li key={cell.label} className="contents">
                  {cell.to ? (
                    <a
                      href={cell.to}
                      onClick={(e) => jumpToProof(e, cell.to)}
                      title="Checkable — jump to the proof on this page"
                      className="board-cell flex flex-col gap-2.5 bg-bg-2/70 px-5 py-5 transition-colors hover:bg-bg-3/60 sm:py-6"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="board-cell flex flex-col gap-2.5 bg-bg-2/70 px-5 py-5 sm:py-6">
                      {inner}
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
          <div className="border-t border-line px-5 py-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-2">
              <span className="text-accent">▸</span> {hero.status}
            </p>
            {/* the stewards' sign: the board's numbers are all verifiable */}
            <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              <span className="text-brass">▸</span> {hero.official}
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
          <a
            href={hero.ctaPrimary.to}
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink transition-colors hover:text-awning"
          >
            <span className="hairline w-10 bg-line-2 transition-all group-hover:w-14 group-hover:bg-awning" />
            {hero.ctaPrimary.label}
            <ArrowDownRight size={14} className="-mb-0.5" />
          </a>
          <a
            href={hero.ctaResume.to}
            download
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-ink"
          >
            {hero.ctaResume.label}
            <ArrowUpRight size={13} />
          </a>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            {profile.available}
          </p>
        </div>
      </motion.div>
    </section>
  )
}
