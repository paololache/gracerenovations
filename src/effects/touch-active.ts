/**
 * Touch screens have no hover, so hover effects never play there. This adds
 * `.is-touch-active` to each matching element while it sits in the middle
 * band of the screen, so cards zoom, recolour and nudge their arrow as you
 * scroll past them. Only runs on devices without hover. Returns a cleanup.
 */
export function initTouchActive(selector = '.fx-card', root: ParentNode = document): () => void {
  if (typeof window === 'undefined' || !window.matchMedia('(hover: none)').matches) return () => {}
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) entry.target.classList.toggle('is-touch-active', entry.isIntersecting)
    },
    // A band from 35% to 65% of the screen height
    { rootMargin: '-35% 0px -35% 0px' },
  )
  const targets = root.querySelectorAll(selector)
  targets.forEach((el) => observer.observe(el))

  return () => {
    observer.disconnect()
    targets.forEach((el) => el.classList.remove('is-touch-active'))
  }
}
