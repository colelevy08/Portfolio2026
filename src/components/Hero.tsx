import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { hero, profile, ui } from '../data/content'
import { playCallToThePost } from '../lib/bugle'

// Track time is always America/New_York — Saratoga runs on Eastern.
const trackTime = (withSeconds: boolean) =>
  new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    ...(withSeconds && { second: '2-digit' }),
    hour12: true,
    timeZone: 'America/New_York',
  }).format(new Date())

// A live clock in the board header — the one datum on the page that is
// genuinely live, ticking like the infield board. Isolated in its own
// component so the once-a-second tick re-renders nothing else.
function TrackClock() {
  const [now, setNow] = useState(() => trackTime(true))
  useEffect(() => {
    const id = setInterval(() => setNow(trackTime(true)), 1000)
    return () => clearInterval(id)
  }, [])
  // Amber marks it as live board data, visually distinct from the muted
  // title beside it — on mobile the two would otherwise read as one string.
  // Below sm the seconds go: the bugle button spent the header's slack, and
  // minutes + ET fit where seconds + ET no longer do.
  return (
    <span className="tabular-nums text-amber/75">
      <span className="sm:hidden">{trackTime(false)} ET</span>
      <span className="hidden sm:inline">{now} ET</span>
    </span>
  )
}

// A bugler's instrument in 24px — drawn to read at board-header size:
// mouthpiece, coiled tube, flared bell. Decorative; the button carries the name.
function BugleGlyph() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* mouthpiece + leadpipe */}
      <path d="M2.5 9.4 L5 9.9" />
      {/* the tube running to the bell */}
      <path d="M5 9.9 C 9 10.7, 13 10.5, 16.5 8.6" />
      {/* flared bell */}
      <path d="M16.5 8.6 L21.5 5.4 L21.5 13.8 L16 12.2" />
      {/* the coil under the tube */}
      <path d="M16 12.2 C 12.5 14.6, 7.5 14.8, 7.2 12.3 C 7 10.6, 9.5 10.3, 10 11.8 C 10.4 13.2, 8.6 13.9, 7.6 13.2" />
    </svg>
  )
}

// The bugle button: click → the synthesized First Call (src/lib/bugle.ts)
// plays and the board flickers to post time for exactly the call's length.
// Sound is strictly opt-in — nothing plays without this click.
function usePostTime() {
  const [postTime, setPostTime] = useState(false)
  const timer = useRef<number | null>(null)
  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current)
    },
    [],
  )
  const soundTheCall = () => {
    if (postTime) return // one call at a time — buglers don't overlap
    const ms = playCallToThePost()
    if (ms === 0) return // no Web Audio on this browser: stay quiet
    setPostTime(true)
    timer.current = window.setTimeout(() => setPostTime(false), ms)
  }
  return { postTime, soundTheCall }
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
  const { postTime, soundTheCall } = usePostTime()
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
        <div className={`board island mt-12 sm:mt-14 ${postTime ? 'post-time' : ''}`}>
          {/* px-4 below sm: the bugle button costs 32px and the row has none
              to spare at 375px — the tighter gutter keeps both labels on one
              line. Cells and footer rows keep the px-5 gutter. */}
          <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-5">
            <span className="flex items-center gap-1.5 sm:gap-2">
              {/* h-6 w-6 = 24px — exactly the WCAG target-size floor; anything
                  bigger wraps the board header to two lines at 375px. */}
              <button
                type="button"
                onClick={soundTheCall}
                aria-label={ui.callToPost}
                title={ui.callToPost}
                className={`-my-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded transition-colors ${
                  postTime ? 'text-amber' : 'text-brass hover:text-amber'
                }`}
              >
                <BugleGlyph />
              </button>
              <span className="board-title">The morning line</span>
              {postTime && (
                // Mobile gets no room for this — there the amber bugle and
                // the board flicker are the feedback.
                <motion.span
                  className="board-title !text-amber hidden sm:inline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  · {ui.postTime}
                </motion.span>
              )}
            </span>
            <span className="board-title">
              <span className="hidden sm:inline">{profile.location} · </span>
              <TrackClock />
            </span>
          </div>
          {/* Each cell is the claim AND the receipt: cells with a `to` anchor
              jump to the spot on the page that backs the number up. */}
          <ul className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
            {hero.board.map((cell, i) => {
              // --d sits on the CELL and inherits down: the value's tote-in
              // rise and the post-time flicker share one stagger clock.
              const stagger = { '--d': `${0.15 + i * 0.12}s` } as CSSProperties
              const inner = (
                <>
                  <span className="board-value tote-in text-3xl sm:text-4xl">
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
                      style={stagger}
                      className="board-cell flex flex-col gap-2.5 bg-bg-2/70 px-5 py-5 transition-colors hover:bg-bg-3/60 sm:py-6"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div
                      style={stagger}
                      className="board-cell flex flex-col gap-2.5 bg-bg-2/70 px-5 py-5 sm:py-6"
                    >
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
