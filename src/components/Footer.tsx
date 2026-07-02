import { Fragment } from 'react'
import { motto, profile, stack } from '../data/content'

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

// The footer flips dark — the old Morning Line palette living on as the
// page's closing dark island, under a strip of awning-canvas piping.
export default function Footer() {
  return (
    <footer className="island bg-bg">
      <div className="piping" aria-hidden="true" />
      <Roofline />
      <div className="px-4 pb-12 pt-6 sm:px-6">
        <div className="grid grid-cols-12 gap-y-6 gap-x-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
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
            <p className="text-muted">Social</p>
            <ul className="mt-2 space-y-1.5">
              <li>
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  GitHub ↗
                </a>
              </li>
              <li>
                <a
                  href={profile.socials.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  Telegram ↗
                </a>
              </li>
              <li>
                <a
                  href={profile.socials.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  WhatsApp ↗
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <p className="text-muted">Index</p>
            <ul className="mt-2 space-y-1.5">
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
                  className="hover:text-accent transition-colors"
                >
                  Contact ↘
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-12 sm:col-span-2">
            <p className="text-muted">Colophon</p>
            <p className="mt-2 text-[10px] leading-[1.5] normal-case tracking-normal">
              {stack.build}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
