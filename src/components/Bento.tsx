import { motion } from 'framer-motion'
import { Sparkles, Coffee, GraduationCap, Wrench } from 'lucide-react'
import { skills } from '../data/content'

const card =
  'card-gradient-border rounded-2xl p-6 transition-all hover:-translate-y-0.5'

export default function Bento() {
  return (
    <section id="about" className="relative px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-baseline justify-between gap-4"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="font-mono text-accent-2">01.</span> About
          </h2>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
            the short version
          </span>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className={`${card} lg:col-span-2 lg:row-span-2`}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent/30 to-accent-2/30">
                <Sparkles size={16} />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-accent-2">
                  Who I am
                </p>
                <h3 className="mt-1 text-xl font-semibold text-slate-100">
                  Engineer with a communication brain.
                </h3>
              </div>
            </div>
            <p className="mt-5 text-base leading-relaxed text-slate-300">
              I'm a full stack developer trained at Flatiron School, with a BA in
              Communication from SUNY Geneseo. I like building products that feel
              fast, honest, and human — and I'm just as comfortable running a
              restaurant floor as I am shipping a React app.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Currently: Assistant Manager at Standard Fare in Saratoga Springs,
              where I helped launch the new location. On the side I'm always
              building — sports analytics, ecommerce, internal tools.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className={card}
          >
            <div className="flex items-center gap-2">
              <Wrench size={14} className="text-accent-2" />
              <p className="font-mono text-xs uppercase tracking-wider text-accent-2">
                Tech stack
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-slate-300"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className={card}
          >
            <div className="flex items-center gap-2">
              <GraduationCap size={14} className="text-accent-2" />
              <p className="font-mono text-xs uppercase tracking-wider text-accent-2">
                Education
              </p>
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <div className="font-medium text-slate-100">Flatiron School</div>
                <div className="text-xs text-slate-400">
                  Full Stack Development · 2023
                </div>
              </li>
              <li>
                <div className="font-medium text-slate-100">SUNY Geneseo</div>
                <div className="text-xs text-slate-400">BA Communication · 2022</div>
              </li>
              <li>
                <div className="font-medium text-slate-100">La Sorbonne</div>
                <div className="text-xs text-slate-400">Study abroad · Paris</div>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className={`${card} sm:col-span-2 lg:col-span-1`}
          >
            <div className="flex items-center gap-2">
              <Coffee size={14} className="text-accent-2" />
              <p className="font-mono text-xs uppercase tracking-wider text-accent-2">
                Right now
              </p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Open to full stack & frontend roles — remote, hybrid, or around
              Saratoga Springs.
            </p>
            <a
              href="#contact"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-2 hover:underline"
            >
              Let's talk →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
