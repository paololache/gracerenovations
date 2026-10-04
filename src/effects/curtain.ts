const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

export interface CurtainOptions {
  /** Viewport width below which the curtain is off. Default 900. */
  minWidth?: number
  /**
   * The curtain is off when the under section is taller than this many
   * screens, since most of it would be covered before it was seen. Default 1.25.
   */
  maxHeight?: number
}

/**
 * Drives a `.fx-curtain` (see curtain.css): keeps the under section pinned
 * and sets --fx-cover from 0 to 1 as the over section slides across the
 * screen. Turns itself off on narrow screens and for very tall sections. It
 * stays on with reduced motion: it only moves as the visitor scrolls, and the
 * under section just fades and settles back. Returns a cleanup function.
 */
export function initCurtain(wrapper: HTMLElement, options: CurtainOptions = {}): () => void {
  const { minWidth = 900, maxHeight = 1.25 } = options
  const under = wrapper.querySelector<HTMLElement>(':scope > .fx-curtain__under')
  const over = wrapper.querySelector<HTMLElement>(':scope > .fx-curtain__over')
  if (!under || !over) return () => {}
  let frame = 0

  const off = () => {
    wrapper.classList.remove('is-on')
    wrapper.style.removeProperty('--fx-cover')
    under.style.removeProperty('--fx-stick-top')
  }

  const update = () => {
    frame = 0
    const vh = window.innerHeight
    if (window.innerWidth < minWidth || under.offsetHeight > vh * maxHeight) {
      off()
      return
    }
    wrapper.classList.add('is-on')
    // Sticky offset: 0 for a section that fits the screen; negative for a taller
    // one, so it pins only once its bottom edge reaches the bottom of the screen.
    under.style.setProperty('--fx-stick-top', `${Math.min(0, vh - under.offsetHeight)}px`)
    const cover = clamp01((vh - over.getBoundingClientRect().top) / vh)
    wrapper.style.setProperty('--fx-cover', cover.toFixed(4))
  }

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update)
  }

  const resize = new ResizeObserver(schedule)
  resize.observe(under)
  update()
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)

  return () => {
    cancelAnimationFrame(frame)
    resize.disconnect()
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
    off()
  }
}
