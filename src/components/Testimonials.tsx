import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { projects, sections, testimonials } from '../data/content'
import { silkFor } from '../lib/silks'
import SectionHead from './SectionHead'

// Client quotes, set like clippings from the local paper. Renders NOTHING
// while the testimonials array is empty — the section (and its divider)
// appears only once real quotes exist. Never ship an invented quote.
export default function Testimonials() {
  if (testimonials.length === 0) return null

  return (
    <>
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="hairline" />
      </div>
      <section id="testimonials" className="relative px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-[1200px]">
          <SectionHead h={sections.testimonials} />
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => {
              const post = projects.findIndex((p) => p.slug === t.project) + 1
              const silk = post > 0 ? silkFor(post) : undefined
              return (
                <motion.li
                  key={t.name}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: 0.5,
                    delay: Math.min(i * 0.06, 0.2),
                    ease: [0.2, 0.8, 0.2, 1],
                  }}
                  className="flex flex-col rounded-lg border border-line bg-bg-2 p-7"
                >
                  <blockquote className="flex-1 font-serif text-[1.05rem] leading-[1.6] text-ink">
                    “{t.quote}”
                  </blockquote>
                  <footer className="mt-6 flex items-center gap-3">
                    {silk && (
                      <span
                        className="silk"
                        style={{
                          '--silk-size': '1.6rem',
                          '--silk-fs': '0.8rem',
                          background: silk.bg,
                          color: silk.fg,
                          boxShadow: silk.edge
                            ? `inset 0 0 0 1px ${silk.edge}`
                            : undefined,
                        } as CSSProperties}
                        aria-hidden="true"
                      >
                        {post}
                      </span>
                    )}
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-2">
                        {t.name}
                      </p>
                      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                        {t.role}
                      </p>
                    </div>
                  </footer>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </section>
    </>
  )
}
