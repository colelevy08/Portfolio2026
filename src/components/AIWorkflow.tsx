import { useState, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { aiWorkflow, sections } from '../data/content'
import SectionHead from './SectionHead'

export default function AIWorkflow() {
  // One observer for the whole conditions block — it just flips a flag, and
  // CSS staggers the three panels off an inline --d delay. Same idiom as the
  // tote board's bulbs, and no more observers than the section had before.
  const [seen, setSeen] = useState(false)

  return (
    <section id="ai" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <div>
        <SectionHead h={sections.ai} />
        <div className="grid grid-cols-12 gap-y-12 gap-x-6">
          {/* Lead statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px 0px' }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="col-span-12 lg:col-span-5"
          >
            <p className="max-w-[52ch] font-serif text-[1.35rem] leading-[1.55] text-ink sm:text-[1.55rem]">
              {aiWorkflow.lead}
            </p>
          </motion.div>

          {/* Points, set like the conditions block of a race card: one ruled
              clapboard panel, each condition numbered in program mono. They
              post one at a time as the block comes into view. */}
          <motion.ol
            onViewportEnter={() => setSeen(true)}
            viewport={{ once: true, margin: '-100px 0px' }}
            data-inview={seen || undefined}
            className="col-span-12 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-3 lg:col-span-7"
          >
            {aiWorkflow.points.map((point, i) => (
              <li
                key={point.title}
                className="condition bg-bg-2 p-6"
                style={{ '--d': `${i * 0.09}s` } as CSSProperties}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Condition {i + 1}
                </p>
                {/* balance avoids one-word orphan wraps; the reserved
                    two-line slot keeps body copy level across the row */}
                <p className="font-display mt-2.5 text-lg leading-snug text-balance text-accent sm:min-h-[2.75em]">
                  {point.title}
                </p>
                <p className="mt-3 font-serif text-[14px] leading-[1.65] text-ink-2">
                  {point.body}
                </p>
              </li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  )
}
