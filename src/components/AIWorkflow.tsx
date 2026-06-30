import { motion } from 'framer-motion'
import { aiWorkflow, sections } from '../data/content'

export default function AIWorkflow() {
  return (
    <section id="ai" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px]">
        <header className="mb-14 grid grid-cols-12 gap-6 sm:mb-16">
          <div className="col-span-12 sm:col-span-3">
            <p className="eyebrow">{sections.ai.eyebrow}</p>
          </div>
          <h2 className="col-span-12 font-serif text-3xl leading-[1.1] tracking-tight balance sm:col-span-9 sm:text-5xl lg:text-6xl">
            {sections.ai.headline}{' '}
            <span className="text-muted">{sections.ai.subhead}</span>
          </h2>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="grid grid-cols-12 gap-y-12 gap-x-6"
        >
          {/* Lead statement */}
          <div className="col-span-12 lg:col-span-5">
            <p className="font-serif text-[1.5rem] leading-[1.45] tracking-[-0.005em] text-ink sm:text-[1.75rem]">
              {aiWorkflow.lead}
            </p>
          </div>

          {/* Points */}
          <ul className="col-span-12 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-3 lg:col-span-7">
            {aiWorkflow.points.map((point) => (
              <li key={point.title} className="bg-bg-2 p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                  {point.title}
                </p>
                <p className="mt-3 text-[14px] leading-[1.65] text-ink-2">
                  {point.body}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
