import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { path, sections, type PathEvent } from '../data/content'

type Filter = 'all' | 'work' | 'education'

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
    <section id="path" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px]">
        <header className="mb-12 grid grid-cols-12 gap-6 sm:mb-16">
          <div className="col-span-12 sm:col-span-3">
            <p className="eyebrow">{sections.path.eyebrow}</p>
          </div>
          <div className="col-span-12 sm:col-span-9">
            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl balance">
              {sections.path.headline}{' '}
              <span className="text-muted">{sections.path.subhead}</span>
            </h2>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {(['all', 'work', 'education'] as Filter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`font-mono text-[11px] uppercase tracking-[0.22em] transition-colors ${
                    filter === f
                      ? 'text-accent'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  {filter === f && <span className="mr-2">●</span>}
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
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-3" aria-hidden />
          <ol className="col-span-12 sm:col-span-9 lg:col-span-8">
            {filtered.map((e, i) => (
              <Row key={`${e.title}-${e.date}`} e={e} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Row({ e, index }: { e: PathEvent; index: number }) {
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
      className="group relative grid grid-cols-[80px_1fr] gap-x-6 border-t border-line py-6 sm:grid-cols-[120px_1fr] sm:gap-x-10 sm:py-8"
    >
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        {e.date}
        <div className="mt-1.5 text-accent">
          {e.kind === 'Work' ? '↗ WORK' : '✦ EDU'}
        </div>
      </div>

      <div>
        <h3 className="font-serif text-xl leading-[1.2] tracking-tight sm:text-2xl">
          {e.title}
        </h3>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          {e.location}
        </p>
        <p className="mt-3 max-w-[58ch] text-[15px] leading-[1.6] text-ink-2">
          {e.description}
        </p>
      </div>
    </motion.li>
  )
}
