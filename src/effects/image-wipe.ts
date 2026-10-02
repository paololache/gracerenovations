export interface ImageWipe {
  /** Wipes to the item at `index`. Does nothing if it's already showing. */
  show(index: number): void
  /** Index of the item showing now. */
  readonly current: number
  destroy(): void
}

const durationMs = (el: HTMLElement) => {
  const value = getComputedStyle(el).getPropertyValue('--fx-wipe-duration').trim()
  if (value.endsWith('ms')) return parseFloat(value)
  if (value.endsWith('s')) return parseFloat(value) * 1000
  return 1500
}

/** Controls a `.fx-wipe` frame (see image-wipe.css). */
export function createImageWipe(container: HTMLElement, startIndex = 0): ImageWipe {
  const items = () => Array.from(container.querySelectorAll<HTMLElement>(':scope > .fx-wipe__item'))
  // Pending "finish leaving" timers, per item, so an item can be brought back mid-exit
  const timers = new Map<HTMLElement, number>()
  let current = startIndex

  // Show the first item with no animation
  items().forEach((item, i) => {
    item.classList.toggle('is-active', i === startIndex)
    item.classList.remove('is-leaving')
  })
  const first = items()[startIndex]
  if (first) {
    first.classList.add('is-instant')
    requestAnimationFrame(() => requestAnimationFrame(() => first.classList.remove('is-instant')))
  }

  return {
    get current() {
      return current
    },
    show(index) {
      const list = items()
      const next = list[index]
      const prev = list[current]
      if (!next || index === current) return

      if (prev) {
        prev.classList.add('is-leaving')
        clearTimeout(timers.get(prev))
        timers.set(
          prev,
          window.setTimeout(() => {
            prev.classList.remove('is-active', 'is-leaving')
            timers.delete(prev)
          }, durationMs(container)),
        )
      }
      clearTimeout(timers.get(next))
      timers.delete(next)
      next.classList.remove('is-leaving')
      next.classList.add('is-active')
      current = index
    },
    destroy() {
      timers.forEach((timer) => clearTimeout(timer))
      timers.clear()
    },
  }
}
