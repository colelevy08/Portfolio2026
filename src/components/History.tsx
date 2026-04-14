import { useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, GraduationCap } from 'lucide-react'
import { workEvents, educationEvents, type HistoryEvent } from '../data/content'

const tabs = ['Work', 'Education'] as const
type Tab = (typeof tabs)[number]

export default function History() {
  const [tab, setTab] = useState<Tab>('Work')
  const events: HistoryEvent[] = tab === 'Work' ? workEvents : educationEvents

  return (
    <section id="history" className="relative px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="flex items-baseline gap-3 text-3xl font-bold sm:text-4xl"
        >
          <span className="font-mono text-accent-2">03.</span> History
        </motion.h2>

        <div className="mt-8 inline-flex rounded-full border border-white/10 bg-white/5 p-1">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all ${
                tab === t
                  ? 'bg-gradient-to-r from-accent to-accent-2 text-ink shadow-lg shadow-accent/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {t === 'Work' ? <Briefcase size={14} /> : <GraduationCap size={14} />}
              {t}
            </button>
          ))}
        </div>

        <ol className="relative mt-12 space-y-6 border-l border-white/10 pl-8">
          {events.map((e, i) => (
            <motion.li
              key={`${tab}-${i}`}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="relative"
            >
              <span className="absolute -left-[37px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 ring-4 ring-ink" />
              <div className="card-gradient-border rounded-xl p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-semibold text-slate-100">
                    {e.title}
                  </h3>
                  <span className="font-mono text-xs text-accent-2">
                    {e.date}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-400">{e.location}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {e.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
