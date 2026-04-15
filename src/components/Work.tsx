import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Briefcase,
  Code2,
  GraduationCap,
  User,
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
  { id: 'about', label: 'About', icon: User },
  { id: 'projects', label: 'Projects', icon: Code2 },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
] as const

type TabId = (typeof tabs)[number]['id']

export default function Work() {
  const [active, setActive] = useState<TabId>('about')

  return (
    <section id="work" className="relative px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/5 p-1 sm:w-fit sm:mx-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all sm:text-sm ${
                active === t.id
                  ? 'bg-gradient-to-r from-accent to-accent-2 text-ink shadow-md shadow-accent/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <t.icon size={13} />
              {t.label}
            </button>
          ))}
        </div>

        <div className="relative min-h-[360px]">
          <AnimatePresence mode="wait">
            {active === 'about' && (
              <motion.div key="about" {...panelMotion}>
                <div className="card-gradient-border rounded-2xl p-6 sm:p-8">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div className="sm:col-span-2">
                      <h3 className="text-xl font-semibold text-slate-100">
                        Engineer with a communication brain.
                      </h3>
                      <p className="mt-4 text-sm leading-relaxed text-slate-300">
                        Full stack developer trained at Flatiron School, with a BA
                        in Communication from SUNY Geneseo. I like building
                        products that feel fast, honest, and human — and I'm just
                        as comfortable running a restaurant floor as I am shipping
                        a React app.
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-slate-400">
                        Currently Assistant Manager at Standard Fare in Saratoga
                        Springs, where I helped launch the new location. On the
                        side I build sports analytics, ecommerce, and internal
                        tools.
                      </p>
                    </div>
                    <ul className="space-y-3 text-sm">
                      <Fact label="Based in" value={profile.location} />
                      <Fact label="Currently" value="Assistant Manager · Standard Fare" />
                      <Fact label="Cert" value="CompTIA A+" href={profile.credlyBadge} />
                      <Fact label="Open to" value="FE / Full stack roles" />
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {active === 'projects' && (
              <motion.div key="projects" {...panelMotion}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                </div>
              </motion.div>
            )}

            {active === 'experience' && (
              <motion.div key="experience" {...panelMotion} className="space-y-3">
                {topWork.map((e) => (
                  <TimelineCard key={e.title + e.date} {...e} />
                ))}
                <p className="pt-2 text-center font-mono text-xs text-slate-500">
                  Full history on LinkedIn or by request
                </p>
              </motion.div>
            )}

            {active === 'education' && (
              <motion.div key="education" {...panelMotion} className="space-y-3">
                {topEdu.map((e) => (
                  <TimelineCard key={e.title + e.date} {...e} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

const panelMotion = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.25 },
}

function Fact({
  label,
  value,
  href,
}: {
  label: string
  value: string
  href?: string
}) {
  const content = href ? (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-accent-2 hover:underline"
    >
      {value}
    </a>
  ) : (
    <span className="text-slate-200">{value}</span>
  )
  return (
    <li>
      <div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
        {label}
      </div>
      <div className="mt-0.5 text-sm">{content}</div>
    </li>
  )
}

function TimelineCard({
  title,
  location,
  date,
  description,
}: {
  title: string
  location: string
  date: string
  description: string
}) {
  return (
    <div className="card-gradient-border grid grid-cols-[1fr_auto] items-start gap-3 rounded-xl p-5">
      <div>
        <h3 className="text-base font-semibold text-slate-100">{title}</h3>
        <p className="mt-0.5 text-sm text-slate-400">{location}</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          {description}
        </p>
      </div>
      <span className="whitespace-nowrap font-mono text-xs text-accent-2">
        {date}
      </span>
    </div>
  )
}
