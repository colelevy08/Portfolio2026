import { motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'

// The rail under the nav: a horse-and-jockey runs the stretch as you scroll,
// past six furlong ticks, toward the checkered wire at the far end. Scroll
// position IS the race position — the page's furlong dividers (6F → 1F → the
// wire) count the same trip. Purely scroll-driven: no idle animation.
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

  return (
    <div
      aria-hidden="true"
      className="relative h-[20px] overflow-hidden border-t border-line bg-bg-2"
    >
      {/* the running rail */}
      <div className="hairline absolute inset-x-0 bottom-[4px]" />

      {/* furlong ticks, matching the six section dividers */}
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <span
          key={i}
          className="absolute bottom-[4px] h-[5px] w-px bg-line-2"
          style={{ left: `${(i * 100) / 7}%` }}
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

      {/* horse track stops short of the wire by the horse's own width */}
      <div className="absolute inset-y-0 left-0 right-[36px]">
        <motion.div
          className="absolute bottom-[2px]"
          style={{ left, rotate: lean, transformOrigin: '50% 80%' }}
        >
          <HorseAndJockey />
        </motion.div>
      </div>
    </div>
  )
}

// Extended-gallop silhouette, right-facing, jockey up. Drawn for legibility
// at rail size — the gestalt (horizontal mass, flung legs, rider bump) is
// what reads, not the details.
function HorseAndJockey() {
  return (
    <svg width="27" height="17" viewBox="0 0 64 40" fill="none">
      <g fill="#1f2a24">
        <path d="M14 22 C 16 18.5, 22 17, 28 17.5 C 34 18, 40 18.5, 44 17.5 C 47 16.8, 50 17.5, 51.5 19 C 53 20.5, 52.5 22.5, 50.5 23.5 C 46 25.5, 36 25.5, 30 25 C 24 24.5, 18 25, 14 22 Z" />
        <path d="M46.5 19.5 C 49 17, 52 14, 55 12.2 L 55.6 10.2 L 57 11.4 C 59 10.8, 61 11.2, 62.4 12.4 C 63.2 13.1, 63 14.2, 61.8 14.4 L 57.6 15 C 55 17, 52.5 19.5, 50.5 21.8 Z" />
        <path d="M47 22 L 56 27 L 60 26 L 61.5 27.5 L 55 29.5 L 45.5 24.5 Z" />
        <path d="M44 23.5 L 48 29 L 46 30 L 41.5 24.8 Z" />
        <path d="M17 23 L 8 29 L 3.5 28.5 L 2 30 L 9 31.5 L 19.5 25.5 Z" />
        <path d="M21 24.5 L 16 30.5 L 18 31.5 L 24 26 Z" />
        <path d="M15 21.5 C 11 19, 6.5 18.8, 2.5 20.5 C 6 21, 9 21.8, 12 23.5 C 13 24, 14.5 23.5, 15 22.5 Z" />
        <path d="M35 17.6 C 35.8 14.6, 38 12, 40.5 11 C 42.2 10.3, 43.8 10.9, 44.4 12.2 C 45 13.4, 44.3 14.7, 42.8 15.6 C 40.8 16.9, 38 17.6, 35 17.6 Z" />
        <circle cx="44.9" cy="10.9" r="2" />
        <path d="M45.2 9 L 48.8 9.6 L 48 10.9 Z" />
        <path d="M43.5 13.2 L 49.5 16.2 L 48.9 17.7 L 42.6 14.9 Z" />
      </g>
    </svg>
  )
}
