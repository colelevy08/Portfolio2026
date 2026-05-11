import { profile, stack } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-10">
      <div className="mx-auto grid max-w-[1240px] grid-cols-12 gap-y-6 gap-x-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        <div className="col-span-12 sm:col-span-4">
          © {new Date().getFullYear()}{' '}
          <span className="text-ink">{profile.name}</span>
          <br />
          {profile.location}
        </div>

        <div className="col-span-6 sm:col-span-3">
          <p className="text-muted/70">Social</p>
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
          <p className="text-muted/70">Anchors</p>
          <ul className="mt-2 space-y-1.5">
            <li>
              <a href="#work" className="hover:text-accent transition-colors">
                Work ↘
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
          <p className="text-muted/70">Colophon</p>
          <p className="mt-2 text-[10px] leading-[1.5] normal-case tracking-normal">
            {stack.build}
          </p>
        </div>
      </div>
    </footer>
  )
}
