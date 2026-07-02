import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { hero, profile } from '../data/content'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto max-w-[1200px] px-6 pt-16 pb-16 sm:pt-24 sm:pb-24 lg:pt-28 lg:pb-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <p className="eyebrow">{hero.eyebrow}</p>

        {/* The name runs as the program-cover masthead. */}
        <h1 className="font-display mt-5 text-[clamp(3.4rem,11vw,8.5rem)] font-black leading-[0.98]">
          Cole Levy
        </h1>

        {/* Victorian thick-thin rules bracket the subline, program style.
            They draw in once on load; reduced-motion renders them static. */}
        <div className="mt-10 max-w-2xl">
          <div
            className="scotch scotch-draw"
            style={{ '--d': '0.35s' } as CSSProperties}
          />
          <p className="py-4 font-serif text-lg leading-relaxed text-ink-2 sm:text-xl">
            {hero.subline}
          </p>
          <div
            className="scotch scotch-draw"
            style={{ '--d': '0.5s' } as CSSProperties}
          />
        </div>

        {/* The tote board — the one dark island on the bright page: the
            infield board seen across a sunlit track. */}
        <div className="board island mt-12 sm:mt-14">
          <div className="flex items-center justify-between border-b border-line px-5 py-3">
            <span className="board-title">The morning line</span>
            <span className="board-title hidden sm:inline">{profile.location}</span>
          </div>
          {/* dt precedes dd in the DOM (valid HTML, label-first for screen
              readers); flex-col-reverse keeps the bulb value on top visually. */}
          <dl className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
            {hero.board.map((cell, i) => (
              <div
                key={cell.label}
                className="flex flex-col-reverse gap-2.5 bg-bg-2/70 px-5 py-5 sm:py-6"
              >
                <dt className="board-title">{cell.label}</dt>
                <dd
                  className="board-value tote-in text-3xl sm:text-4xl"
                  style={{ '--d': `${0.15 + i * 0.12}s` } as CSSProperties}
                >
                  {cell.value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="border-t border-line px-5 py-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-2">
              <span className="text-accent">▸</span> {hero.status}
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
          <a
            href={hero.ctaPrimary.to}
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink transition-colors hover:text-awning"
          >
            <span className="hairline w-10 bg-line-2 transition-all group-hover:w-14 group-hover:bg-awning" />
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
      </motion.div>
    </section>
  )
}
