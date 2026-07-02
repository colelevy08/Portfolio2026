import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { aboutParagraphs, motto, profile, sections } from '../data/content'
import colePicture from '../assets/colelevypicture.png'
import SectionHead from './SectionHead'

export default function About() {
  return (
    <section id="about" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <div>
        <SectionHead h={sections.about} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="grid grid-cols-12 gap-y-10 gap-x-6"
        >
          {/* Portrait + facts column */}
          <aside className="col-span-12 sm:col-span-4 lg:col-span-3">
            <div className="plate aspect-[4/5] w-full max-w-[280px]">
              <img
                src={colePicture}
                alt="Cole Levy"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>

            <dl className="mt-6 space-y-4 font-mono text-[11px] uppercase tracking-[0.16em]">
              <Fact label="Based" value={profile.location} />
              <Fact label="Title" value={profile.title} />
              <Fact label="Currently" value="Assistant Manager · Standard Fare" />
              <Fact
                label="Cert"
                value="CompTIA A+"
                href={profile.credlyBadge}
              />
              <Fact label="Languages" value="EN · FR · 中文" />
            </dl>
          </aside>

          {/* Prose column — program paper: one drop cap, then the town motto
              set as a centered rubric. */}
          <div className="col-span-12 sm:col-span-8 lg:col-span-8 lg:col-start-5">
            <div className="max-w-[72ch] space-y-6 font-serif text-[1.25rem] font-light leading-[1.55] text-ink-2 sm:text-[1.4rem] lg:text-[1.55rem]">
              {aboutParagraphs.map((p, i) => (
                <p key={i} className={i === 0 ? 'dropcap text-ink' : ''}>
                  {p}
                </p>
              ))}
            </div>
            <p className="mt-10 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
              {motto.map((word, i) => (
                <Fragment key={word}>
                  {i > 0 && (
                    <span aria-hidden="true" className="mx-3 text-brass">
                      ·
                    </span>
                  )}
                  {word}
                </Fragment>
              ))}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Fact({
  label,
  value,
  href,
}: {
  label: string
  value: string
  href?: string
}) {
  return (
    <div>
      <dt className="text-muted">{label}</dt>
      <dd className="mt-1 text-ink-2">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  )
}
