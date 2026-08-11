import { Fragment, useSyncExternalStore } from 'react'
import type { CSSProperties } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from 'framer-motion'
import { footerCard, motto, profile, projects, stack } from '../data/content'
import { silkFor, silkShadow } from '../lib/silks'
import { clearMarks, getMarks, subscribe } from '../lib/program'

// Each pennant answers the gust a little differently — same wind, different
// cloth — so the row ripples instead of swinging as one rigid unit.
const PENNANT_CLOTH = [1, 0.78, 1.18, 0.88, 1.06]

// One pennant, hinged at its hoist (the pole side). `gust` is the shared
// wind signal; `cloth` scales how much this flag answers it.
function Pennant({
  u,
  gust,
  cloth,
}: {
  u: number
  gust: MotionValue<number>
  cloth: number
}) {
  const rotate = useTransform(gust, (deg) => deg * cloth)
  return (
    <motion.path
      d={`M${u + 120} 10 L${u + 139} 13.5 L${u + 120} 17 Z`}
      fill="var(--color-amber)"
      opacity="0.55"
      style={{ rotate, transformBox: 'fill-box', transformOrigin: '0% 50%' }}
    />
  )
}

// The grandstand roofline in chalk — gabled peaks, gold finials, and amber
// pennants against the dark island, the one architectural Saratoga signifier
// on the page.
//
// The pennants feel the wind of your scroll: scroll velocity maps to a gust
// angle and runs through a deliberately underdamped spring, so a fast flick
// of the page deflects the flags, overshoots, flutters, and settles. Springs
// sleep once settled — at rest this costs nothing per frame.
function Roofline() {
  const gables = [0, 240, 480, 720, 960]
  const reduce = useReducedMotion()

  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  // px/s of page movement → degrees of gust. Scrolling down lifts the flags
  // into the wind; scrolling back up drops them the other way. The spring is
  // underdamped on purpose (damping 7): that overshoot IS the flutter.
  const windTarget = useTransform(velocity, [-2400, 0, 2400], [13, 0, -13], {
    clamp: true,
  })
  const gust = useSpring(windTarget, { stiffness: 130, damping: 7, mass: 0.45 })

  return (
    <svg
      viewBox="0 0 1200 64"
      className="aspect-[1200/64] w-full"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
    >
      <g
        stroke="var(--color-chalk)"
        strokeWidth="1.5"
        fill="none"
        strokeLinejoin="round"
        opacity="0.3"
      >
        <path d="M0 58 H1200" />
        {gables.map((u) => (
          <g key={u}>
            <path d={`M${u + 40} 58 L${u + 120} 22 L${u + 200} 58`} />
            <path d={`M${u + 120} 22 V10`} />
          </g>
        ))}
      </g>
      {gables.map((u, i) => (
        <g key={u}>
          <circle
            cx={u + 120}
            cy={9}
            r={1.8}
            fill="var(--color-brass)"
            opacity="0.8"
          />
          {reduce ? (
            <path
              d={`M${u + 120} 10 L${u + 139} 13.5 L${u + 120} 17 Z`}
              fill="var(--color-amber)"
              opacity="0.55"
            />
          ) : (
            <Pennant u={u} gust={gust} cloth={PENNANT_CLOTH[i]} />
          )}
        </g>
      ))}
    </svg>
  )
}

// The top three finishers, straight off the featured order — what the block
// prints when the reader hasn't marked anything.
const finishers = projects.filter((p) => p.featured)

// One line of the block: saddle cloth, title, price, linking to the entry.
function Runner({ post, to }: { post: number; to: string }) {
  const p = projects[post - 1]
  const silk = silkFor(post)
  return (
    <li>
      <a href={to} className="group inline-flex items-center gap-3">
        <span
          className="silk"
          style={{
            '--silk-size': '1.5rem',
            '--silk-fs': '0.75rem',
            background: silk.bg,
            color: silk.fg,
            boxShadow: silkShadow(silk),
          } as CSSProperties}
        >
          {post}
        </span>
        {/* normal case — "handAIcapper" must keep its mid-word AI */}
        <span className="font-mono text-[12px] tracking-[0.08em] text-ink-2 transition-colors group-hover:text-accent">
          {p.title}
        </span>
        <span className="font-mono text-[11px] text-ink-2">{p.odds}</span>
      </a>
    </li>
  )
}

// The program card. With no pencil marks it prints the order of finish, the
// way the footer always has, plus the standing invitation to mark one. Once
// the reader circles anything it becomes THEIR card, in the order they called
// them — the only thing on this site that is different because of something
// they did.
function YourCard() {
  const marks = useSyncExternalStore(subscribe, getMarks, getMarks)
  const has = marks.length > 0

  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
        {has ? footerCard.yourCard : footerCard.orderOfFinish}
        {has && (
          // The live region is this two-word count and nothing else —
          // politely announcing a re-ordered list on every press would be
          // noise, not information.
          <span aria-live="polite" className="text-amber">
            {' '}
            · {marks.length} {footerCard.marked}
          </span>
        )}
      </p>

      <ol className="mt-3 space-y-2">
        {has
          ? marks.map((post) => (
              <Runner key={post} post={post} to={`#post-${post}`} />
            ))
          : finishers.map((p) => (
              <Runner
                key={p.slug}
                post={projects.indexOf(p) + 1}
                to={`#post-${projects.indexOf(p) + 1}`}
              />
            ))}
      </ol>

      {has ? (
        <button
          type="button"
          onClick={clearMarks}
          className="mt-4 inline-block py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-2 transition-colors hover:text-accent"
        >
          {footerCard.freshProgram}
        </button>
      ) : (
        <p className="mt-4 max-w-[42ch] font-mono text-[10px] leading-relaxed text-ink-2">
          {footerCard.pencil}
        </p>
      )}
    </div>
  )
}

// The footer flips dark — the old Morning Line palette living on as the
// page's closing dark island, under a strip of awning-canvas piping. It
// closes the program: a winner's-circle sign-off, the order of finish, then
// the index columns and the print line.
export default function Footer() {
  return (
    <footer className="island bg-bg">
      <div className="piping" aria-hidden="true" />
      <Roofline />
      <div className="px-4 pb-10 pt-4 sm:px-6">
        {/* Winner's circle — the sign-off and the order of finish. */}
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-8 border-b border-line pb-10 pt-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
              The winner's circle
            </p>
            <p className="font-display mt-3 text-3xl text-ink sm:text-4xl">
              See you at the wire.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-4 inline-block font-mono text-[12px] uppercase tracking-[0.2em] text-accent transition-colors hover:text-accent-2"
            >
              {profile.email} ↗
            </a>
          </div>

          <YourCard />
        </div>

        {/* Index columns */}
        <div className="grid grid-cols-12 gap-y-8 gap-x-6 pt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          <div className="col-span-12 sm:col-span-4">
            © {new Date().getFullYear()}{' '}
            <span className="text-ink">{profile.name}</span>
            <br />
            {profile.location}
            <p className="mt-4 text-[10px] tracking-[0.3em]">
              {/* The footer prints only the three words; the rubric in About
                  is where each one glosses itself. */}
              {motto.words.map((m, i) => (
                <Fragment key={m.word}>
                  {i > 0 && (
                    <span aria-hidden="true" className="mx-2 text-amber">
                      ·
                    </span>
                  )}
                  {m.word}
                </Fragment>
              ))}
            </p>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <p className="text-amber">Social</p>
            {/* py-1.5 per link + no list gap ≈ 29px row pitch — clears the
                WCAG 24px touch-target floor without changing the visual. */}
            <ul className="mt-1.5">
              <li>
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block py-1.5 hover:text-accent transition-colors"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block py-1.5 hover:text-accent transition-colors"
                >
                  GitHub ↗
                </a>
              </li>
              <li>
                <a
                  href={profile.socials.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block py-1.5 hover:text-accent transition-colors"
                >
                  Telegram ↗
                </a>
              </li>
              <li>
                <a
                  href={profile.socials.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block py-1.5 hover:text-accent transition-colors"
                >
                  WhatsApp ↗
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <p className="text-amber">Index</p>
            {/* py-1.5 per link + no list gap ≈ 29px row pitch — clears the
                WCAG 24px touch-target floor without changing the visual. */}
            <ul className="mt-1.5">
              <li>
                <a
                  href="#featured"
                  className="inline-block py-1.5 hover:text-accent transition-colors"
                >
                  Work ↘
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="inline-block py-1.5 hover:text-accent transition-colors"
                >
                  Skills ↘
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="inline-block py-1.5 hover:text-accent transition-colors"
                >
                  About ↘
                </a>
              </li>
              <li>
                <a
                  href="#path"
                  className="inline-block py-1.5 hover:text-accent transition-colors"
                >
                  Path ↘
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="inline-block py-1.5 hover:text-accent transition-colors"
                >
                  Contact ↘
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-12 sm:col-span-2">
            <p className="text-amber">Colophon</p>
            <p className="mt-3 text-[10px] leading-[1.5] normal-case tracking-normal">
              {stack.build}
            </p>
            <a
              href={`https://${stack.source}`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-[10px] normal-case tracking-normal hover:text-accent transition-colors"
            >
              {stack.source} ↗
            </a>
          </div>
        </div>

        {/* Print line — the program's last page. Right padding keeps the
            back-to-top link clear of the fixed Portmint launcher bubble. */}
        <div className="mt-10 border-t border-line pt-5 pr-20 sm:pr-24">
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
            <p>Official program · Vol. 2026 · Printed in Saratoga Springs, NY</p>
            <a href="#top" className="hover:text-accent transition-colors">
              Back to the paddock ↑
            </a>
          </div>
          {/* The last line on the last page — the only invitation the site's
              two best-hidden things get, at the depth where only a reader who
              earned it will find them. */}
          <p className="mt-3 max-w-[70ch] font-mono text-[10px] leading-relaxed text-ink-2">
            {footerCard.invitation}
          </p>
        </div>
      </div>
    </footer>
  )
}
