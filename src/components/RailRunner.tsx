import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { ui } from '../data/content'

// The rail under the nav: a horse-and-jockey runs the stretch as you scroll,
// past seven furlong ticks, toward the checkered wire at the far end. Scroll
// position IS the race position — the page's furlong dividers (7F → 1F → the
// wire) count the same trip. While the page is moving the horse strides
// through a two-frame gallop cycle and kicks up dust; at rest it stands.
export default function RailRunner() {
  const { scrollYProgress } = useScroll()
  const reduce = useReducedMotion()

  // A soft spring gives the horse gallop-like surge on scroll bursts;
  // reduced-motion riders get the raw position with no overshoot.
  const sprung = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 16,
    mass: 0.35,
  })
  const progress = reduce ? scrollYProgress : sprung

  const left = useTransform(progress, (v) => `${Math.min(Math.max(v, 0), 1) * 100}%`)

  // Lean into the run: nose dips slightly while covering ground.
  const velocity = useVelocity(sprung)
  const rawLean = useTransform(velocity, [-1.2, 0, 1.2], [5, 0, -5], {
    clamp: true,
  })
  const lean = reduce ? 0 : rawLean

  // Gallop only while the page is actually moving: velocity above a small
  // threshold flips `running` on, and a short timer lets the stride settle
  // a beat after the scroll stops.
  const [running, setRunning] = useState(false)
  const stopTimer = useRef<number | null>(null)
  useMotionValueEvent(velocity, 'change', (v) => {
    if (reduce) return
    if (Math.abs(v) > 0.01) {
      setRunning(true)
      if (stopTimer.current !== null) window.clearTimeout(stopTimer.current)
      stopTimer.current = window.setTimeout(() => setRunning(false), 240)
    }
  })

  // The finish: the first time the horse reaches the wire (the reader hit the
  // bottom of the page), the photo-finish camera fires — once per visit.
  const [finished, setFinished] = useState(false)
  useMotionValueEvent(progress, 'change', (v) => {
    if (!reduce && v >= 0.985) setFinished(true)
  })
  useEffect(
    () => () => {
      if (stopTimer.current !== null) window.clearTimeout(stopTimer.current)
    },
    [],
  )

  return (
    <div
      aria-hidden="true"
      className="relative h-[28px] overflow-hidden border-t border-line bg-bg-2"
    >
      {/* the running rail */}
      <div className="hairline absolute inset-x-0 bottom-[4px]" />

      {/* furlong ticks, matching the seven section dividers */}
      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
        <span
          key={i}
          className="absolute bottom-[4px] h-[5px] w-px bg-line-2"
          style={{ left: `${(i * 100) / 8}%` }}
        />
      ))}

      {/* the wire: a checkered marker at the finish */}
      <span
        className="absolute right-0 bottom-[4px] h-[9px] w-[10px]"
        style={{
          background:
            'conic-gradient(#1f2a24 25%, #fffdf6 0 50%, #1f2a24 0 75%, #fffdf6 0) 0 0 / 5px 4.5px',
          boxShadow: 'inset 0 0 0 1px #1f2a24',
        }}
      />

      {/* the photo-finish camera fires once, when the horse hits the wire */}
      {finished && (
        <>
          <motion.span
            className="pointer-events-none absolute bottom-[3px] right-[3px] h-3 w-3 rounded-full bg-[#fffdf6]"
            style={{ boxShadow: '0 0 16px 7px rgba(255, 253, 246, 0.85)' }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: [0, 1, 0], scale: [0.4, 1.5, 1.9] }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          />
          <motion.span
            className="pointer-events-none absolute bottom-[5px] right-[96px] font-mono text-[8px] uppercase tracking-[0.24em] text-ink"
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: [0, 1, 1, 0], x: 0 }}
            transition={{ duration: 2, times: [0, 0.12, 0.7, 1] }}
          >
            {ui.photoFinish}
          </motion.span>
        </>
      )}

      {/* horse track stops short of the wire by the horse's own width */}
      <div className="absolute inset-y-0 left-0 right-[48px]">
        <motion.div
          className={`absolute bottom-[1px] ${running ? 'running' : ''}`}
          style={{ left, rotate: lean, transformOrigin: '50% 80%' }}
        >
          <HorseAndJockey />
        </motion.div>
      </div>
    </div>
  )
}

// Galloping thoroughbred, right-facing, jockey up in awning-red silks. The
// body/neck/head/tail are shared; only the legs swap between the two stride
// frames (flight vs. gathered), so the swap can't misalign the silhouette.
// Far-side legs render lighter to read as depth at rail size.
function HorseAndJockey() {
  return (
    <svg width="40" height="25" viewBox="0 0 72 44" fill="none">
      {/* ground shadow */}
      <ellipse cx="34" cy="41.5" rx="22" ry="2" fill="#1f2a24" opacity="0.14" />

      {/* dust kicked up behind — visible only while running */}
      <g fill="#c9bda0">
        <circle className="dust dust-1" cx="10" cy="36" r="2.2" />
        <circle className="dust dust-2" cx="6" cy="39" r="1.6" />
        <circle className="dust dust-3" cx="13" cy="39.5" r="1.3" />
      </g>

      {/* frame A: flight — forelegs reaching, hinds trailing */}
      <g className="horse-frame-a" fill="#1f2a24">
        <path fillOpacity="0.7" d="M43 22 L 50 28 L 55.5 33.5 L 53.6 35 L 47.5 29.5 L 41 24.8 Z" />
        <path fillOpacity="0.7" d="M25 23.5 L 19 30 L 13.5 37 L 15.5 38 L 21.5 31.5 L 28 26 Z" />
        <path d="M45 20 L 55 25 L 62 28.5 L 61 30.5 L 53 27.5 L 44 23.5 Z" />
        <path d="M22 22 L 13 28 L 5 32 L 6 34 L 14.5 30.5 L 24.5 25 Z" />
      </g>

      {/* frame B: gathered — legs collected under the barrel */}
      <g className="horse-frame-b" fill="#1f2a24">
        <path fillOpacity="0.7" d="M42.5 22.5 L 45.5 27 L 43.5 32.5 L 41.5 31.8 L 42.8 27.5 L 39.8 24.8 Z" />
        <path fillOpacity="0.7" d="M25.5 24 L 22 30.5 L 28.5 36 L 30 34.4 L 25.4 30.5 L 28.4 26.4 Z" />
        <path d="M45 21 L 50 25.5 L 48.5 31 L 46.4 30.4 L 47 26.5 L 42.5 23.8 Z" />
        <path d="M22 22.5 L 17.5 28.5 L 23.5 34.5 L 25.2 33 L 20.8 29 L 25 25.2 Z" />
      </g>

      {/* horse body, neck, head, tail — shared between gallop frames */}
      <g fill="#1f2a24">
        {/* barrel */}
        <path d="M20 15 C 26 12.5, 36 12.5, 43 14.5 C 47 15.7, 49 18.5, 48.5 21.5 C 48 24.5, 45 26.5, 40 26.8 C 33 27.3, 26 26.6, 22.5 24.5 C 18.5 22.2, 17.5 17.8, 20 15 Z" />
        {/* haunch */}
        <path d="M20 14.8 C 16.5 15.8, 14.8 18.5, 15.4 21.6 C 15.9 24.3, 18.2 26, 21.5 26 L 25 25.5 L 23 17 Z" />
        {/* neck + head, ears pricked — straight nose line, tapered muzzle */}
        <path d="M40 15.5 C 43 12, 48 8, 53 6.2 L 54 3.4 L 55.8 5.1 C 59 5.3, 62.5 6.3, 64.4 7.9 C 65.2 8.6, 65 9.6, 64 9.7 L 58.5 9.9 C 55.5 12.4, 50.5 16.5, 47.5 19.5 Z" />
        <path d="M52.5 5.5 L 51 1.8 L 54 3.6 Z" />
        {/* tail streaming */}
        <path d="M16.5 16 C 12 13.5, 7 13.8, 3.5 16.5 C 6.5 16.8, 9 18, 11.5 20.2 C 13 21.4, 15.5 20.8, 16.2 19 Z" />
      </g>

      {/* jockey: flat racing crouch in awning-red silks, boot in sable */}
      <g>
        <path
          d="M30.5 12 C 32.5 8.4, 36.5 6, 40.5 5.8 L 42.3 9.4 C 40 10.7, 36.5 12.8, 34 13.8 Z"
          fill="#c03428"
        />
        <circle cx="41.5" cy="5.4" r="2.3" fill="#c03428" />
        <path d="M40.5 7.5 L 49 10.6 L 48.3 12.4 L 39.5 9.6 Z" fill="#c03428" />
        <path d="M33 13.2 L 36.5 17.5 L 34.3 18.8 L 31 14.7 Z" fill="#1f2a24" />
      </g>
    </svg>
  )
}
