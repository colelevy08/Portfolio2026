import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { projects } from '../data/content'

export default function Projects() {
  return (
    <section id="projects" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="flex items-baseline gap-3 text-3xl font-bold sm:text-4xl"
        >
          <span className="font-mono text-accent-2">02.</span> Projects
        </motion.h2>
        <p className="mt-3 max-w-2xl text-slate-400">
          A selection of things I've built — click any card to view it on GitHub.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.repo}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -4 }}
              className="card-gradient-border group flex flex-col gap-4 rounded-2xl p-6 transition-all hover:shadow-xl hover:shadow-accent/10"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-accent/30 to-accent-2/30 text-slate-100">
                  <Github size={18} />
                </div>
                <ExternalLink
                  size={16}
                  className="text-slate-500 transition-colors group-hover:text-accent-2"
                />
              </div>
              <h3 className="text-lg font-semibold text-slate-100 transition-colors group-hover:text-accent-2">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-400">
                {p.description}
              </p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[11px] text-slate-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
