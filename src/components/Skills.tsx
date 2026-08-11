import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { sections, skills } from '../data/content'
import { silkFor, silkShadow } from '../lib/silks'
import SectionHead from './SectionHead'

// The tack room: each discipline gets a stall card — saddle-cloth number,
// silk-colored top rule, and the tools racked as chips. Same number language
// as the project field, so the whole page counts in posts.
export default function Skills() {
  return (
    <section id="skills" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <div>
        <SectionHead h={sections.skills} />
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => {
            const silk = silkFor(i + 1)
            return (
              <motion.li
                key={group.group}
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
                {/* silk-colored rule along the stall door's top edge */}
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
                  <p className="font-display text-xl text-ink">{group.group}</p>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="chip">
                      {item}
                    </li>
                  ))}
                </ul>
                {/* The receipt: where this discipline is shipping right now,
                    and a link a skeptic can click. The link sits on its own
                    line rather than inside the sentence — a link buried in a
                    text block has to carry a non-color distinguisher to pass
                    audit, and this reads better anyway. */}
                <p className="mt-4 font-serif text-[13px] italic leading-snug text-muted">
                  {group.proof.text}
                </p>
                <a
                  href={group.proof.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group/proof mt-2 inline-flex items-center gap-2 py-1 font-mono text-[10.5px] uppercase tracking-[0.2em] text-accent transition-colors hover:text-awning"
                >
                  <span className="hairline w-6 bg-line-2 transition-all group-hover/proof:w-9 group-hover/proof:bg-awning" />
                  {group.proof.label}
                  <ArrowUpRight size={12} />
                </a>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
