import { motion } from 'framer-motion'
import { aboutParagraphs, skills } from '../data/content'
import illustration from '../assets/illustration.png'

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-5">
        <div className="md:col-span-3">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="flex items-baseline gap-3 text-3xl font-bold sm:text-4xl"
          >
            <span className="font-mono text-accent-2">01.</span> About me
          </motion.h2>

          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-300">
            {aboutParagraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="mt-10 text-lg font-semibold text-slate-200"
          >
            Tech I work with
          </motion.h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-slate-300"
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="md:col-span-2"
        >
          <div className="relative mx-auto max-w-sm">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-accent/20 via-transparent to-accent-2/20 blur-2xl" />
            <img
              src={illustration}
              alt="Illustration"
              className="relative w-full drop-shadow-2xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
