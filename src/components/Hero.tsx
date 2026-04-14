import { motion } from 'framer-motion'
import { Github, Linkedin, Send, MessageCircle, ArrowRight } from 'lucide-react'
import { profile } from '../data/content'
import colePicture from '../assets/colelevypicture.png'
import Hello from '../assets/Hello.gif'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' },
  }),
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen items-center overflow-hidden px-6 pt-28 sm:pt-24"
    >
      <div className="aurora" />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div>
          <motion.p
            initial="hidden"
            animate="show"
            custom={0}
            variants={fadeUp}
            className="flex items-center gap-2 font-mono text-sm uppercase tracking-[0.2em] text-accent-2"
          >
            <img src={Hello} alt="" width={22} className="inline-block" />
            Hello, my name is
          </motion.p>
          <motion.h1
            initial="hidden"
            animate="show"
            custom={1}
            variants={fadeUp}
            className="mt-4 text-5xl font-extrabold leading-tight sm:text-6xl md:text-7xl"
          >
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Cole Levy
            </span>
          </motion.h1>
          <motion.h2
            initial="hidden"
            animate="show"
            custom={2}
            variants={fadeUp}
            className="mt-3 text-xl font-medium text-slate-300 sm:text-2xl"
          >
            Full Stack Developer{' '}
            <span className="text-slate-500">— {profile.location}</span>
          </motion.h2>

          <motion.ul
            initial="hidden"
            animate="show"
            custom={3}
            variants={fadeUp}
            className="mt-6 space-y-1.5 text-sm text-slate-400"
          >
            <li>Bachelor of Arts — Communication &amp; Media, SUNY Geneseo</li>
            <li>Full Stack Development, Flatiron School (15-week)</li>
            <li className="flex flex-wrap items-center gap-3">
              CompTIA A+ Certified
              <a
                href={profile.credlyBadge}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-accent/40 px-2.5 py-0.5 text-xs text-accent hover:bg-accent/10"
              >
                View Credly <ArrowRight size={12} />
              </a>
            </li>
          </motion.ul>

          <motion.div
            initial="hidden"
            animate="show"
            custom={4}
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3 font-semibold text-ink shadow-lg shadow-accent/30 transition-transform hover:scale-105"
            >
              Let's talk
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="#projects"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-accent-2/60 hover:text-white"
            >
              View work
            </a>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            custom={5}
            variants={fadeUp}
            className="mt-10 flex items-center gap-4"
          >
            <SocialIcon href={profile.socials.linkedin} label="LinkedIn">
              <Linkedin size={18} />
            </SocialIcon>
            <SocialIcon href={profile.socials.github} label="GitHub">
              <Github size={18} />
            </SocialIcon>
            <SocialIcon href={profile.socials.whatsapp} label="WhatsApp">
              <MessageCircle size={18} />
            </SocialIcon>
            <SocialIcon href={profile.socials.telegram} label="Telegram">
              <Send size={18} />
            </SocialIcon>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="relative mx-auto w-full max-w-sm md:max-w-md"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/30 via-transparent to-accent-2/30 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-soft">
            <img
              src={colePicture}
              alt="Cole Levy"
              className="h-auto w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function SocialIcon({
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
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-all hover:-translate-y-0.5 hover:border-accent-2/60 hover:bg-white/10 hover:text-white"
    >
      {children}
    </a>
  )
}
