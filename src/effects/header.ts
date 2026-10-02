export interface WatchHeaderOptions {
  /**
   * Element the header scrolls past, e.g. the hero. The header turns active
   * once this element's bottom edge goes above the header's bottom edge.
   * Without it, `offset` is used.
   */
  trigger?: Element | null
  /** Scroll distance in px before the header turns active. Default 0. */
  offset?: number
  /** Class toggled on the header. Default `is-active`. */
  activeClass?: string
}

/** Toggles `.is-active` on a `.fx-header` while the page is scrolled. Returns a cleanup function. */
export function watchHeader(header: HTMLElement, options: WatchHeaderOptions = {}): () => void {
  const { trigger, offset = 0, activeClass = 'is-active' } = options
  let frame = 0

  const update = () => {
    frame = 0
    const active = trigger
      ? trigger.getBoundingClientRect().bottom <= header.getBoundingClientRect().bottom
      : window.scrollY > offset
    header.classList.toggle(activeClass, active)
  }

  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(update)
  }

  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)

  return () => {
    cancelAnimationFrame(frame)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
    header.classList.remove(activeClass)
  }
}
