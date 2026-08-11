import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { path, sections, type PathEvent } from '../data/content'
import SectionHead from './SectionHead'

type Filter = 'all' | 'work' | 'education'

// The rows already print "Work" / "Study" per line, so the tabs use the
// program's own words for the same three views.
const FILTER_LABEL: Record<Filter, string> = {
  all: 'Full card',
  work: 'Work',
  education: 'Study',
}

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
    <section id="path" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <div>
        <SectionHead h={sections.path} />

        {/* Program tabs — the active tab carries an awning-red underline.
            The strip sticks flush under the header so the filter is still in
            reach 3,000px into the form guide, which is where a reader actually
            decides they want one kind of line only. The offsets are the
            header's MEASURED height (nav + running rail): 73px at 375px and
            78px from sm up, where the nav's padding grows. z-20 sits under the
            header and well under the Portmint launcher. */}
        <div className="sticky top-[73px] z-20 -mx-4 mb-8 border-b border-line bg-bg px-4 py-3 sm:top-[78px] sm:-mx-6 sm:px-6">
          {/* Tighter gap and tracking below sm: at 375px the three tabs wrap
              to two lines otherwise, and a two-line sticky strip under a 73px
              header eats a fifth of a phone screen for the whole section. */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 sm:gap-x-7">
            {(['all', 'work', 'education'] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                // Toggle state, not navigation — aria-pressed, not aria-current.
                aria-pressed={filter === f}
                className={`border-b-2 pb-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors sm:tracking-[0.22em] ${
                  filter === f
                    ? 'border-awning text-awning'
                    : 'border-transparent text-muted hover:text-ink'
                }`}
              >
                {FILTER_LABEL[f]}
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

        {/* Keying the list on the filter re-mounts it, which re-runs the row
            entrance stagger — the field visibly re-forms instead of snapping. */}
        <ol key={filter}>
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
      // Vertical-only inset: these rows animate in from x:-12, and an
      // all-sides margin can exclude a left-shifted element entirely so the
      // observer never fires — with once:true that freezes it at opacity 0.
      // Same trap documented at FeaturedWork.tsx's saddle-cloth chip.
      viewport={{ once: true, margin: '-40px 0px' }}
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
        {/* The chart comment — printed only where there's something true to
            say about the trip. */}
        {e.comment && (
          <p className="mt-2 max-w-[58ch] font-mono text-[11px] leading-relaxed text-muted">
            <span aria-hidden="true">▸ </span>
            {e.comment}
          </p>
        )}
      </div>
    </motion.li>
  )
}
