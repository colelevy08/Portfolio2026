import type { SectionHeading } from '../data/content'

// Shared section header: program-rubric eyebrow, board-lettering headline,
// serif subhead. Every top-level section opens with one of these.
export default function SectionHead({ h }: { h: SectionHeading }) {
  return (
    <header className="mb-12 sm:mb-16">
      <p className="eyebrow">{h.eyebrow}</p>
      <h2 className="font-display mt-4 text-4xl font-bold leading-[0.95] sm:text-6xl lg:text-7xl">
        {h.headline}
      </h2>
      <p className="mt-4 max-w-2xl font-serif text-base leading-relaxed text-muted sm:text-lg">
        {h.subhead}
      </p>
    </header>
  )
}
