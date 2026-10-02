export interface MarqueeOptions {
  /** Speed in px per second. Sets --fx-marquee-duration from the row's width. */
  speed?: number
}

/**
 * Prepares a `.fx-marquee`: repeats the items until one copy is wider than
 * the frame, then adds a second identical copy so the CSS loop is seamless.
 * Clones are hidden from screen readers. Returns a cleanup function.
 */
export function initMarquee(marquee: HTMLElement, options: MarqueeOptions = {}): () => void {
  const track = marquee.querySelector<HTMLElement>('.fx-marquee__track')
  if (!track) return () => {}

  const originals = Array.from(track.children) as HTMLElement[]
  const gap = () => parseFloat(getComputedStyle(track).columnGap) || 0

  const clear = () => track.querySelectorAll('[data-fx-clone]').forEach((c) => c.remove())

  const cloneSet = (items: HTMLElement[]) =>
    items.map((item) => {
      const copy = item.cloneNode(true) as HTMLElement
      copy.setAttribute('data-fx-clone', '')
      copy.setAttribute('aria-hidden', 'true')
      copy.querySelectorAll('a, button, input, select, textarea, [tabindex]').forEach((el) => el.setAttribute('tabindex', '-1'))
      return copy
    })

  const build = () => {
    clear()
    if (!originals.length) return

    // One "half" = the originals, repeated until it is at least as wide as the frame
    const half: HTMLElement[] = [...originals]
    const setWidth = () => half.reduce((w, el) => w + el.getBoundingClientRect().width, 0) + gap() * (half.length - 1)
    let guard = 0
    while (setWidth() < marquee.clientWidth && guard++ < 20) {
      const extra = cloneSet(originals)
      track.append(...extra)
      half.push(...extra)
    }
    // Second half: an exact copy of the first, so translating by 50% loops
    track.append(...cloneSet(half))

    if (options.speed) {
      const distance = setWidth() + gap()
      marquee.style.setProperty('--fx-marquee-duration', `${(distance / options.speed).toFixed(2)}s`)
    }
  }

  let lastWidth = -1
  const resize = new ResizeObserver(() => {
    const width = marquee.clientWidth
    if (width === lastWidth) return
    lastWidth = width
    build()
  })
  resize.observe(marquee)

  return () => {
    resize.disconnect()
    clear()
    marquee.style.removeProperty('--fx-marquee-duration')
  }
}
