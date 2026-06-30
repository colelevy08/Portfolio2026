import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { hero, profile } from '../data/content'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto max-w-[1240px] overflow-hidden px-6 pt-36 pb-20 sm:pt-44 sm:pb-32 lg:pt-56 lg:pb-44"
    >
      {/* Soft animated gradient field behind the headline (decorative). */}
      <div className="aurora" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative z-10 grid grid-cols-12 gap-y-10 gap-x-6"
      >
        <aside className="col-span-12 sm:col-span-3 lg:col-span-3">
          <p className="eyebrow mb-3">{hero.eyebrow}</p>
          <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.22em] text-ink-2">
            {hero.metaLines.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
            <span className="text-accent">● Available</span>
          </p>
        </aside>

        <div className="col-span-12 sm:col-span-9 lg:col-span-9">
          <h1 className="font-serif text-[2.4rem] leading-[1.04] tracking-tight balance sm:text-[3.6rem] lg:text-[5.4rem] xl:text-[6.2rem]">
            {hero.headlineLead}
            <br />
            <span className="italic text-accent">{hero.headlineAccent}</span>
            <br />
            {hero.headlineTail}
          </h1>

          {/* "Now building" status line */}
          <p className="mt-8 max-w-xl font-mono text-[12px] leading-relaxed tracking-[0.04em] text-ink-2">
            <span className="text-accent">▍</span> {hero.status}
          </p>

          {/* Stat proof points */}
          <ul className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink">
            {hero.stats.map((stat, i) => (
              <li key={stat} className="flex items-center gap-3">
                {i > 0 && <span className="text-line-2">·</span>}
                {stat}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 sm:mt-12">
            <a
              href={hero.ctaPrimary.to}
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink transition-colors hover:text-accent"
            >
              <span className="hairline w-10 transition-all group-hover:w-14 group-hover:bg-accent" />
              {hero.ctaPrimary.label}
              <ArrowDownRight size={14} className="-mb-0.5" />
            </a>
            <a
              href={hero.ctaResume.to}
              download
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-ink"
            >
              {hero.ctaResume.label}
              <ArrowUpRight size={13} />
            </a>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              {profile.available}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
