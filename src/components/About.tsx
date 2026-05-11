import { motion } from 'framer-motion'
import { aboutParagraphs, profile } from '../data/content'
import colePicture from '../assets/colelevypicture.png'

export default function About() {
  return (
    <section id="about" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px]">
        <header className="mb-12 grid grid-cols-12 gap-6 sm:mb-16">
          <div className="col-span-12 sm:col-span-3">
            <p className="eyebrow">§ 02 / About</p>
          </div>
          <h2 className="col-span-12 font-serif text-3xl leading-[1.1] tracking-tight sm:col-span-9 sm:text-5xl lg:text-6xl balance">
            From hospitality to engineering —{' '}
            <span className="text-muted">three retainers, two languages, one Saratoga.</span>
          </h2>
        </header>

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
              <Fact label="Title" value="Full-stack developer" />
              <Fact label="Currently" value="Assistant Manager · Standard Fare" />
              <Fact
                label="Cert"
                value="CompTIA A+"
                href={profile.credlyBadge}
              />
              <Fact label="Languages" value="EN · FR · 中文" />
            </dl>
          </aside>

          {/* Prose column */}
          <div className="col-span-12 sm:col-span-8 lg:col-span-8 lg:col-start-5">
            <div className="space-y-6 font-serif text-[1.35rem] leading-[1.5] tracking-[-0.005em] text-ink-2 sm:text-[1.55rem] sm:leading-[1.45] lg:text-[1.75rem]">
              {aboutParagraphs.map((p, i) => (
                <p key={i} className={i === 0 ? 'text-ink' : ''}>
                  {p}
                </p>
              ))}
            </div>
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
