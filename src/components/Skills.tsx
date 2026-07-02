import { motion } from 'framer-motion'
import { sections, skills } from '../data/content'
import SectionHead from './SectionHead'

export default function Skills() {
  return (
    <section id="skills" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <div>
        <SectionHead h={sections.skills} />
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
              <p className="font-display text-xl text-accent">
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
