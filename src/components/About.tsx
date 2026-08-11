import { Fragment, useState } from 'react'
import { motion } from 'framer-motion'
import { aboutParagraphs, motto, profile, sections } from '../data/content'
import colePicture from '../assets/colelevypicture.png'
import { useTilt } from '../lib/useTilt'
import SectionHead from './SectionHead'

export default function About() {
  const tilt = useTilt()
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
            <div className="plate aspect-[4/5] w-full max-w-[280px]" {...tilt}>
              <img
                src={colePicture}
                alt="Cole Levy"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>

            <dl className="mt-6 space-y-4 font-mono text-[11px] uppercase tracking-[0.16em]">
              {/* "Full-stack & AI engineer" already appears in the page
                  title, the hero subline, and the meta description — a fourth
                  printing here was the only fact on the card that proved
                  nothing. Four facts is enough; don't backfill it. */}
              <Fact label="Based" value={profile.location} />
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
            <Rubric />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// The town motto, set as a program rubric — and each word is pressable. Press
// one and it glosses itself twice over: what it means to Saratoga Springs, and
// what it means here. Nothing is gated behind the press: with nothing selected
// the line underneath prints the motto's provenance, which is the fact the
// rubric was decoration without.
function Rubric() {
  const [active, setActive] = useState<number | null>(null)
  const current = active === null ? null : motto.words[active]

  return (
    <div className="mt-10">
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.22em] text-muted sm:tracking-[0.3em]">
        {motto.words.map((m, i) => (
          <Fragment key={m.word}>
            {i > 0 && (
              <span aria-hidden="true" className="mx-2 text-brass sm:mx-3">
                ·
              </span>
            )}
            <button
              type="button"
              // Press the active word again to clear it and get the
              // provenance line back.
              onClick={() => setActive(active === i ? null : i)}
              aria-pressed={active === i}
              className={`px-2 py-1.5 border-b transition-colors ${
                active === i
                  ? 'border-awning text-awning'
                  : 'border-transparent hover:text-ink'
              }`}
            >
              {m.word}
            </button>
          </Fragment>
        ))}
      </p>
      {/* One slot, reserved at the height of the longest gloss so pressing a
          word never shifts the page under the reader. */}
      <p
        aria-live="polite"
        className="mx-auto mt-3 min-h-[5.5em] max-w-[54ch] text-center font-serif text-[14px] italic leading-relaxed text-muted sm:min-h-[4.5em]"
      >
        {current ? `${current.word} — ${current.gloss}` : motto.provenance}
      </p>
    </div>
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
