import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { sections, certifications } from '../data/content'
import { silkFor, silkShadow } from '../lib/silks'
import SectionHead from './SectionHead'

// The papers: one stall card per issuer, same silk-numbered treatment as
// Skills.tsx so the two "evidence" sections read as one family.
export default function Certifications() {
  return (
    <section id="certifications" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <div>
        <SectionHead h={sections.certifications} />
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((group, i) => {
            const silk = silkFor(i + 1)
            return (
              <motion.li
                key={group.issuer}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(i * 0.06, 0.3),
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                className="lift-brand relative overflow-hidden rounded-lg border border-line bg-bg-2 p-6"
                style={{ '--card-accent': silk.edge ?? silk.bg } as CSSProperties}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[3px]"
                  style={{ background: silk.edge ?? silk.bg }}
                />
                <div className="flex items-center gap-3">
                  <span
                    className="silk"
                    style={{
                      '--silk-size': '1.7rem',
                      '--silk-fs': '0.85rem',
                      background: silk.bg,
                      color: silk.fg,
                      boxShadow: silkShadow(silk),
                    } as CSSProperties}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display text-xl text-ink">{group.issuer}</p>
                    <p className="mt-0.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">
                      {group.meta}
                    </p>
                  </div>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="chip">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
