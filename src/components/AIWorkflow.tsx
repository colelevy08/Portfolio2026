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

          {/* Points, set like a board panel */}
          <ul className="col-span-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line-2 bg-line sm:grid-cols-3 lg:col-span-7">
            {aiWorkflow.points.map((point) => (
              <li key={point.title} className="bg-bg-2 p-6">
                <p className="font-display text-lg font-bold text-accent">
                  {point.title}
                </p>
                <p className="mt-3 font-serif text-[14px] leading-[1.65] text-ink-2">
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
