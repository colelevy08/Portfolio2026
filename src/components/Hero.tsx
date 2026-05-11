import { motion } from 'framer-motion'
import { ArrowDownRight } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto max-w-[1240px] px-6 pt-36 pb-20 sm:pt-44 sm:pb-32 lg:pt-56 lg:pb-44"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        className="grid grid-cols-12 gap-y-10 gap-x-6"
      >
        <aside className="col-span-12 sm:col-span-3 lg:col-span-3">
          <p className="eyebrow mb-3">Cole Levy · 2026</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-2">
            Full-stack
            <br />
            Saratoga Springs, NY
            <br />
            <span className="text-accent">● Available</span>
          </p>
        </aside>

        <div className="col-span-12 sm:col-span-9 lg:col-span-9">
          <h1 className="font-serif text-[2.4rem] leading-[1.04] tracking-tight balance sm:text-[3.6rem] lg:text-[5.4rem] xl:text-[6.2rem]">
            Full-stack developer
            <br />
            shipping for{' '}
            <span className="italic text-accent">real businesses</span>,
            <br />
            in two languages.
          </h1>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 sm:mt-14">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink hover:text-accent transition-colors"
            >
              <span className="hairline w-10 transition-all group-hover:w-14 group-hover:bg-accent" />
              See the work
              <ArrowDownRight size={14} className="-mb-0.5" />
            </a>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              Est. 2023 · three client retainers
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
