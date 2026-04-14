import { motion } from 'framer-motion'
import { Github, Linkedin, ArrowRight, MapPin } from 'lucide-react'
import { profile } from '../data/content'
import colePicture from '../assets/colelevypicture.png'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.2, 0.8, 0.2, 1] },
  }),
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[92vh] items-center overflow-hidden px-6 pt-20"
    >
      <div className="aurora" />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-[1.3fr_1fr]">
        <div>
          <motion.div
            initial="hidden"
            animate="show"
            custom={0}
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for new opportunities
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            custom={1}
            variants={fadeUp}
            className="mt-5 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Cole Levy
            </span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            custom={2}
            variants={fadeUp}
            className="mt-3 max-w-xl text-lg text-slate-300 sm:text-xl"
          >
            Full stack developer crafting clean, fast web apps — with a
            communication degree that makes me translate between engineering and
            everyone else.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            custom={3}
            variants={fadeUp}
            className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-400"
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} className="text-accent-2" /> {profile.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-slate-600" />
              Flatiron School · SUNY Geneseo
            </span>
            <a
              href={profile.credlyBadge}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-accent-2 hover:underline"
            >
              CompTIA A+
            </a>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            custom={4}
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3 text-sm font-semibold text-ink shadow-lg shadow-accent/30 transition-transform hover:scale-105"
            >
              Say hello
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="#work"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-accent-2/60 hover:text-white"
            >
              View work
            </a>
            <div className="flex items-center gap-2 pl-1">
              <SocialIcon href={profile.socials.github} label="GitHub">
                <Github size={16} />
              </SocialIcon>
              <SocialIcon href={profile.socials.linkedin} label="LinkedIn">
                <Linkedin size={16} />
              </SocialIcon>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="relative mx-auto w-full max-w-xs md:max-w-sm"
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
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-all hover:-translate-y-0.5 hover:border-accent-2/60 hover:bg-white/10 hover:text-white"
    >
      {children}
    </a>
  )
}
