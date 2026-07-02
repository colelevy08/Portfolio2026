import { motion } from 'framer-motion'
import { aiWorkflow, sections } from '../data/content'
import SectionHead from './SectionHead'

export default function AIWorkflow() {
  return (
    <section id="ai" className="relative px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px]">
        <SectionHead h={sections.ai} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="grid grid-cols-12 gap-y-12 gap-x-6"
        >
          {/* Lead statement */}
          <div className="col-span-12 lg:col-span-5">
            <p className="font-serif text-[1.35rem] leading-[1.55] text-ink sm:text-[1.55rem]">
              {aiWorkflow.lead}
            </p>
          </div>

          {/* Points, set like the conditions block of a race card: one ruled
              clapboard panel, each condition numbered in program mono. */}
          <ol className="col-span-12 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-3 lg:col-span-7">
            {aiWorkflow.points.map((point, i) => (
              <li key={point.title} className="bg-bg-2 p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Condition {i + 1}
                </p>
                <p className="font-display mt-2.5 text-lg leading-snug text-accent">
                  {point.title}
                </p>
                <p className="mt-3 font-serif text-[14px] leading-[1.65] text-ink-2">
                  {point.body}
                </p>
              </li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  )
}
