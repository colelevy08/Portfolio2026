// Eagerly resolve every project screenshot to a hashed URL at build time.
// Vite's import.meta.glob turns the assets folder into a path → url map.
const screenshots = import.meta.glob('../assets/screenshots/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

// Look up a screenshot by project slug. Returns undefined when there's no
// matching `<slug>.webp`, so callers can fall back to a styled placeholder.
export const shotFor = (slug: string): string | undefined => {
  const match = Object.entries(screenshots).find(([path]) =>
    path.endsWith(`/${slug}.webp`),
  )
  return match?.[1]
}
