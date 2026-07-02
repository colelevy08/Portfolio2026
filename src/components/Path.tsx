import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { path, sections, type PathEvent } from '../data/content'
import SectionHead from './SectionHead'

type Filter = 'all' | 'work' | 'education'

// Work/education history set like a form guide's past-performance lines:
// dense rows, mono dates, a colored discipline mark per line.
export default function Path() {
  const [filter, setFilter] = useState<Filter>('all')

  const sorted = useMemo(
    () => [...path].sort((a, b) => b.sortYear - a.sortYear),
    [],
  )

  const filtered = useMemo(() => {
    if (filter === 'all') return sorted
    if (filter === 'work') return sorted.filter((e) => e.kind === 'Work')
    return sorted.filter((e) => e.kind === 'Education')
  }, [filter, sorted])

  return (
    <section id="path" className="relative px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px]">
        <SectionHead h={sections.path} />

        {/* Program tabs — the active tab carries an awning-red underline. */}
        <div className="mb-8 flex flex-wrap gap-x-7 gap-y-2">
          {(['all', 'work', 'education'] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`border-b-2 pb-1.5 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors ${
                filter === f
                  ? 'border-awning text-awning'
                  : 'border-transparent text-muted hover:text-ink'
              }`}
            >
              {f}
              <span className="ml-1.5 text-muted">
                [
                {f === 'all'
                  ? path.length
                  : f === 'work'
                    ? path.filter((p) => p.kind === 'Work').length
                    : path.filter((p) => p.kind === 'Education').length}
                ]
              </span>
            </button>
          ))}
        </div>

        <ol className="max-w-[860px]">
          {filtered.map((e, i) => (
            <Row key={`${e.title}-${e.date}`} e={e} index={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}

// Each row reads like a past-performance line: mono date, a striped
// furlong-pole tick encoding the discipline — red/white quarter pole for
// work, green/white eighth pole for study — then the entry itself.
function Row({ e, index }: { e: PathEvent; index: number }) {
  const isWork = e.kind === 'Work'
  return (
    <motion.li
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.04, 0.4),
        ease: [0.2, 0.8, 0.2, 1],
      }}
      className="group -mx-4 grid grid-cols-1 gap-y-2 border-t border-line px-4 py-5 odd:bg-bg-2/70 sm:grid-cols-[150px_1fr] sm:gap-x-9 sm:py-7"
    >
      <div className="flex items-center gap-x-3 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-muted sm:block">
        {e.date}
        <span className="flex items-center gap-1.5 sm:mt-2">
          <span
            aria-hidden="true"
            className={`fpole fpole-tick ${isWork ? 'fpole-q' : 'fpole-e'}`}
          />
          <span className={isWork ? 'text-awning' : 'text-accent'}>
            {isWork ? 'Work' : 'Study'}
          </span>
        </span>
      </div>

      <div>
        <h3 className="font-display text-xl leading-tight sm:text-2xl">
          {e.title}
        </h3>
        <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          {e.location}
        </p>
        <p className="mt-3 max-w-[58ch] font-serif text-[15px] leading-[1.6] text-ink-2">
          {e.description}
        </p>
      </div>
    </motion.li>
  )
}
