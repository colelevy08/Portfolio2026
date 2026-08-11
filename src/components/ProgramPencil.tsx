import { useSyncExternalStore } from 'react'
import { getMarks, subscribe, toggleMark } from '../lib/program'
import { ui } from '../data/content'

// The pencil that sits on every entry's plate. Pressing it draws a hand-drawn
// ink loop around the entry's saddle cloth and drops that entry into "your
// card" down in the footer. Pressing again rubs it out.
//
// Deliberately NOT a star, a heart, or a "save" — the affordance is a program
// pencil and the state is ink on paper, which is why nothing here is stored.
export default function ProgramPencil({
  post,
  title,
}: {
  post: number
  title: string
}) {
  // Subscribing to the whole marks array (rather than a per-post boolean)
  // keeps the snapshot reference-stable — see the note in lib/program.ts.
  const marks = useSyncExternalStore(subscribe, getMarks, getMarks)
  const marked = marks.includes(post)

  const label = (marked ? ui.eraseEntry : ui.markEntry).replace('{title}', title)

  return (
    <button
      type="button"
      onClick={() => toggleMark(post)}
      aria-pressed={marked}
      aria-label={label}
      title={label}
      // 28px hit box clears the 24px WCAG target floor with room to spare;
      // seated on the plate's top-right so the card header keeps its slack at
      // 375px. It carries its own clapboard fill and keyline for the same
      // reason the saddle cloth does — a bare stroke icon laid over a
      // screenshot reads as a scratch on the print, not as a control, and its
      // contrast would depend on whatever pixels happened to be underneath.
      className={`absolute -top-2 right-3 z-10 inline-flex h-7 w-7 items-center justify-center rounded border bg-bg-2 transition-colors ${
        marked
          ? 'border-awning/60 text-awning'
          : 'border-line text-muted hover:border-line-2 hover:text-ink'
      }`}
    >
      <PencilTick />
    </button>
  )
}

// A short drawn stroke, not an icon — the mark a pencil makes, at 16px. Kept
// hand-rolled rather than imported from lucide so it reads as drawn.
function PencilTick() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* the pencil, held at a writer's angle */}
      <path d="M11.2 2.4 L13.6 4.8 L6.2 12.2 L3.2 13 L4 10 Z" />
      {/* the sharpened tip */}
      <path d="M4 10 L6.2 12.2" />
    </svg>
  )
}

// The ink itself: an open loop drawn around the saddle cloth, start and end
// deliberately not meeting and one overshoot past the close, the way a real
// circle drawn in a hurry looks. Rendered only while the entry is marked;
// un-marking removes it outright, because an eraser doesn't rewind.
export function InkLoop({ marked }: { marked: boolean }) {
  if (!marked) return null
  return (
    <svg
      // Centred on the saddle cloth rather than offset from its corner, so the
      // same loop sits correctly around the featured card's 32px chip and the
      // field card's 28px one.
      className="ink-mark pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
      width="52"
      height="46"
      viewBox="0 0 52 46"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M33 7.5 C 20 3.5, 8 7, 6.5 17 C 5 27.5, 14 37.5, 27 38 C 39 38.5, 47 31, 46 21 C 45.2 13, 38.5 8, 30 6.5"
        stroke="var(--color-awning)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
