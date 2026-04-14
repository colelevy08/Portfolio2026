import { Github, Linkedin, MessageCircle, Send } from 'lucide-react'
import { profile } from '../data/content'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()}{' '}
          <span className="font-mono text-accent-2">{profile.name}</span> — built
          with React &amp; Tailwind.
        </p>
        <div className="flex items-center gap-3">
          <SocialLink href={profile.socials.linkedin} label="LinkedIn">
            <Linkedin size={16} />
          </SocialLink>
          <SocialLink href={profile.socials.github} label="GitHub">
            <Github size={16} />
          </SocialLink>
          <SocialLink href={profile.socials.whatsapp} label="WhatsApp">
            <MessageCircle size={16} />
          </SocialLink>
          <SocialLink href={profile.socials.telegram} label="Telegram">
            <Send size={16} />
          </SocialLink>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-accent-2/60 hover:text-white"
    >
      {children}
    </a>
  )
}
