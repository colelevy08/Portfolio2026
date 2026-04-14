import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Briefcase,
  Code2,
  GraduationCap,
  ExternalLink,
  ArrowUpRight,
} from 'lucide-react'
import {
  projects,
  workEvents,
  educationEvents,
  profile,
} from '../data/content'

const featured = projects.slice(0, 4)
const topWork = workEvents.slice(0, 4)
const topEdu = educationEvents.slice(0, 3)

const tabs = [
  { id: 'projects', label: 'Projects', icon: Code2 },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
] as const

type TabId = (typeof tabs)[number]['id']

export default function Work() {
  const [active, setActive] = useState<TabId>('projects')

  return (
    <section id="work" className="relative px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-wrap items-end justify-between gap-4"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="font-mono text-accent-2">02.</span> Work
          </h2>

          <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition-all sm:text-sm ${
                  active === t.id
                    ? 'bg-gradient-to-r from-accent to-accent-2 text-ink shadow-lg shadow-accent/20'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <t.icon size={13} />
                {t.label}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="relative min-h-[420px]">
          <AnimatePresence mode="wait">
            {active === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              >
                {featured.map((p) => (
                  <a
                    key={p.title}
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="card-gradient-border group flex flex-col gap-3 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/10"
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="text-base font-semibold text-slate-100 transition-colors group-hover:text-accent-2">
                        {p.title}
                      </h3>
                      <ArrowUpRight
                        size={16}
                        className="text-slate-500 transition-colors group-hover:text-accent-2"
                      />
                    </div>
                    <p className="text-sm leading-relaxed text-slate-400">
                      {p.description}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[10px] text-slate-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </a>
                ))}

                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 p-5 text-sm text-slate-400 transition-colors hover:border-accent-2/60 hover:text-white sm:col-span-2"
                >
                  See the rest on GitHub
                  <ExternalLink
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </a>
              </motion.div>
            )}

            {active === 'experience' && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                {topWork.map((e) => (
                  <div
                    key={e.title + e.date}
                    className="card-gradient-border grid grid-cols-[1fr_auto] items-start gap-3 rounded-xl p-5"
                  >
                    <div>
                      <h3 className="text-base font-semibold text-slate-100">
                        {e.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-slate-400">
                        {e.location}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">
                        {e.description}
                      </p>
                    </div>
                    <span className="whitespace-nowrap font-mono text-xs text-accent-2">
                      {e.date}
                    </span>
                  </div>
                ))}
                <p className="pt-2 text-center font-mono text-xs text-slate-500">
                  Full history available on LinkedIn or by request
                </p>
              </motion.div>
            )}

            {active === 'education' && (
              <motion.div
                key="education"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                {topEdu.map((e) => (
                  <div
                    key={e.title + e.date}
                    className="card-gradient-border grid grid-cols-[1fr_auto] items-start gap-3 rounded-xl p-5"
                  >
                    <div>
                      <h3 className="text-base font-semibold text-slate-100">
                        {e.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-slate-400">
                        {e.location}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">
                        {e.description}
                      </p>
                    </div>
                    <span className="whitespace-nowrap font-mono text-xs text-accent-2">
                      {e.date}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
