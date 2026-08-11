// The program pencil.
//
// At a track you get a paper program and a stubby pencil, and you circle the
// horses you like. This is that: a visitor can mark any entry on the page, and
// the footer prints the marks back as their own card — in the order they were
// circled, because that order is the whole point of marking a program.
//
// The marks live in a plain module-level variable for exactly one visit. No
// localStorage, no cookie, no server: closing the tab throws the program away,
// which is what keeps this feature clear of anything that would need a consent
// banner. It is a pencil, not an account.

// Post positions the visitor has circled, oldest first.
let marks: number[] = []

// Everyone who wants to re-render when the marks change.
const subscribers = new Set<() => void>()

// React's useSyncExternalStore hands us an unsubscribe function to call on
// unmount, so subscribe returns one.
export function subscribe(onChange: () => void): () => void {
  subscribers.add(onChange)
  return () => {
    subscribers.delete(onChange)
  }
}

// IMPORTANT: this must return the SAME array reference until the marks
// actually change, or useSyncExternalStore sees a new snapshot on every render
// and loops forever. Every mutation below replaces `marks` exactly once.
export const getMarks = (): number[] => marks

export const isMarked = (post: number): boolean => marks.includes(post)

// Circle an entry, or rub the circle out if it's already there.
export function toggleMark(post: number): void {
  marks = marks.includes(post)
    ? marks.filter((p) => p !== post)
    : [...marks, post]
  subscribers.forEach((fn) => fn())
}

// A fresh program — hand back a clean one.
export function clearMarks(): void {
  if (marks.length === 0) return
  marks = []
  subscribers.forEach((fn) => fn())
}
