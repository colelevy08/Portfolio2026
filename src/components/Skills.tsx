import { motion } from 'framer-motion'
import { sections, skills } from '../data/content'

export default function Skills() {
  return (
    <section id="skills" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px]">
        <header className="mb-14 grid grid-cols-12 gap-6 sm:mb-16">
          <div className="col-span-12 sm:col-span-3">
            <p className="eyebrow">{sections.skills.eyebrow}</p>
          </div>
          <h2 className="col-span-12 font-serif text-3xl leading-[1.1] tracking-tight balance sm:col-span-9 sm:text-5xl lg:text-6xl">
            {sections.skills.headline}{' '}
            <span className="text-muted">{sections.skills.subhead}</span>
          </h2>
        </header>

        <ul className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
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
              className="border-t border-line pt-5"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                {group.group}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
