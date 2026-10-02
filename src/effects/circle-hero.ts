export interface CircleHeroOptions {
  /** Below this viewport width the effect is off (matches circle-hero.css). Default 768. */
  minWidth?: number
  /** Share of the scroll used to close the mask in. Default 0.8. */
  closeShare?: number
  /** Progress at which `.is-stuck` turns on. Default 0.2. */
  stuckAt?: number
  /** Progress at which `.is-scaled` turns on. Default 0.825. */
  scaledAt?: number
  /** Called on every frame with progress 0–1, e.g. to update the header. */
  onProgress?: (progress: number) => void
}

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3
const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

/**
 * Scroll-drives a `.fx-circle-hero`: sets --fx-circle-progress and
 * --fx-circle-scale, and toggles .is-stuck / .is-scaled. Does nothing on
 * narrow screens or with reduced motion. Returns a cleanup function.
 */
export function initCircleHero(section: HTMLElement, options: CircleHeroOptions = {}): () => void {
  const { minWidth = 768, closeShare = 0.8, stuckAt = 0.2, scaledAt = 0.825, onProgress } = options
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const wide = window.matchMedia(`(min-width: ${minWidth}px)`)
  const from = () => Number(getComputedStyle(section).getPropertyValue('--fx-circle-scale-from')) || 4
  let frame = 0

  const reset = () => {
    section.style.removeProperty('--fx-circle-progress')
    section.style.removeProperty('--fx-circle-scale')
    section.classList.remove('is-stuck', 'is-scaled')
  }

  const update = () => {
    frame = 0
    if (!wide.matches || motion.matches) {
      reset()
      return
    }
    const rect = section.getBoundingClientRect()
    const scrollable = rect.height - window.innerHeight
    const progress = scrollable > 0 ? clamp01(-rect.top / scrollable) : 0
    const start = from()
    const scale = start + (1 - start) * easeOutCubic(clamp01(progress / closeShare))

    section.style.setProperty('--fx-circle-progress', progress.toFixed(4))
    section.style.setProperty('--fx-circle-scale', scale.toFixed(4))
    section.classList.toggle('is-stuck', progress >= stuckAt && progress < scaledAt)
    section.classList.toggle('is-scaled', progress >= scaledAt)
    onProgress?.(progress)
  }

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update)
  }

  update()
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
  wide.addEventListener('change', schedule)
  motion.addEventListener('change', schedule)

  return () => {
    cancelAnimationFrame(frame)
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
    wide.removeEventListener('change', schedule)
    motion.removeEventListener('change', schedule)
    reset()
  }
}
