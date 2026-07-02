import type { SectionHeading } from '../data/content'

// Shared section header, set like a race-program rubric: mono eyebrow with a
// brass finial tick, Besley headline, a Victorian thick-thin Scotch rule,
// and the subhead in italic — the program's "conditions line" voice.
export default function SectionHead({ h }: { h: SectionHeading }) {
  return (
    <header className="mb-12 sm:mb-16">
      <p className="eyebrow">{h.eyebrow}</p>
      <h2 className="font-display mt-4 text-4xl leading-[1.02] sm:text-5xl lg:text-6xl">
        {h.headline}
      </h2>
      <div className="scotch mt-5 w-16" />
      <p className="mt-4 max-w-2xl font-serif italic text-base leading-relaxed text-muted sm:text-lg">
        {h.subhead}
      </p>
    </header>
  )
}
