import { Fragment } from 'react'
import type { CSSProperties } from 'react'
import { motto, profile, projects, stack } from '../data/content'
import { silkFor, silkShadow } from '../lib/silks'

// The grandstand roofline in chalk — gabled peaks, gold finials, and amber
// pennants against the dark island, the one architectural Saratoga signifier
// on the page.
function Roofline() {
  const gables = [0, 240, 480, 720, 960]
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
      {gables.map((u) => (
        <g key={u}>
          <circle
            cx={u + 120}
            cy={9}
            r={1.8}
            fill="var(--color-brass)"
            opacity="0.8"
          />
          <path
            d={`M${u + 120} 10 L${u + 139} 13.5 L${u + 120} 17 Z`}
            fill="var(--color-amber)"
            opacity="0.55"
          />
        </g>
      ))}
    </svg>
  )
}

// The top three finishers, straight off the featured order — rendered as
// saddle cloths in the footer's "order of finish" block.
const finishers = projects.filter((p) => p.featured)

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

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
              Order of finish
            </p>
            <ol className="mt-3 space-y-2">
              {finishers.map((p, i) => {
                const silk = silkFor(i + 1)
                return (
                  <li key={p.slug}>
                    <a
                      href="#featured"
                      className="group inline-flex items-center gap-3"
                    >
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
                        {i + 1}
                      </span>
                      {/* normal case — "handAIcapper" must keep its mid-word AI */}
                      <span className="font-mono text-[12px] tracking-[0.08em] text-ink-2 transition-colors group-hover:text-accent">
                        {p.title}
                      </span>
                    </a>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>

        {/* Index columns */}
        <div className="grid grid-cols-12 gap-y-8 gap-x-6 pt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          <div className="col-span-12 sm:col-span-4">
            © {new Date().getFullYear()}{' '}
            <span className="text-ink">{profile.name}</span>
            <br />
            {profile.location}
            <p className="mt-4 text-[10px] tracking-[0.3em]">
              {motto.map((word, i) => (
                <Fragment key={word}>
                  {i > 0 && (
                    <span aria-hidden="true" className="mx-2 text-amber">
                      ·
                    </span>
                  )}
                  {word}
                </Fragment>
              ))}
            </p>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <p className="text-amber">Social</p>
            {/* py-1.5 per link + no list gap ≈ 29px row pitch — clears the
                WCAG 24px touch-target floor without changing the visual. */}
            <ul className="mt-1.5 -space-y-0.5">
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
            <ul className="mt-1.5 -space-y-0.5">
              <li>
                <a href="#featured" className="hover:text-accent transition-colors">
                  Work ↘
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-accent transition-colors">
                  Skills ↘
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-accent transition-colors">
                  About ↘
                </a>
              </li>
              <li>
                <a href="#path" className="hover:text-accent transition-colors">
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
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5 pr-20 font-mono text-[10px] uppercase tracking-[0.22em] text-muted sm:pr-24">
          <p>Official program · Vol. 2026 · Printed in Saratoga Springs, NY</p>
          <a href="#top" className="hover:text-accent transition-colors">
            Back to the paddock ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
