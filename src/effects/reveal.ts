const READY_CLASS = 'fx-reveal-ready'
const GENTLE_CLASS = 'fx-reveal-gentle'
const DEFAULT_OFFSET = 150

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Wires every `[data-fx-reveal]` inside `root` (see reveal.css for the
 * attributes). Each element reveals once, when it scrolls into view.
 * Returns a cleanup function; elements already revealed stay revealed.
 */
export function initReveal(root: ParentNode = document): () => void {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return () => {}

  document.documentElement.classList.add(READY_CLASS)
  // Reduced motion: elements still fade in, but without moving
  document.documentElement.classList.toggle(GENTLE_CLASS, prefersReducedMotion())
  const observers = new Map<number, IntersectionObserver>()
  const cleanups: (() => void)[] = []

  const observerFor = (offset: number) => {
    let observer = observers.get(offset)
    if (!observer) {
      observer = new IntersectionObserver(
        (entries, obs) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            entry.target.classList.add('is-revealed')
            obs.unobserve(entry.target)
          }
        },
        { rootMargin: `0px 0px -${offset}px 0px` },
      )
      observers.set(offset, observer)
    }
    return observer
  }

  root.querySelectorAll<HTMLElement>('[data-fx-reveal]').forEach((el) => {
    if (el.classList.contains('is-revealed') || el.dataset.fxRevealBound) return
    el.dataset.fxRevealBound = ''
    applyTiming(el)

    if (el.hasAttribute('data-fx-reveal-lines')) {
      cleanups.push(splitLines(el))
    } else {
      const items = el.querySelectorAll<HTMLElement>('[data-fx-reveal-item]')
      const targets = !el.hasAttribute('data-fx-reveal-stagger')
        ? [el]
        : items.length
          ? Array.from(items)
          : (Array.from(el.children) as HTMLElement[])
      markTargets(targets)
    }

    observerFor(Number(el.dataset.fxRevealOffset ?? DEFAULT_OFFSET)).observe(el)
    cleanups.push(() => delete el.dataset.fxRevealBound)
  })

  return () => {
    observers.forEach((o) => o.disconnect())
    cleanups.forEach((fn) => fn())
  }
}

function applyTiming(el: HTMLElement) {
  const { fxRevealDuration, fxRevealDelay, fxRevealStagger, fxRevealEase } = el.dataset
  if (fxRevealDuration) el.style.setProperty('--fx-reveal-duration', `${fxRevealDuration}ms`)
  if (fxRevealDelay) el.style.setProperty('--fx-reveal-delay', `${fxRevealDelay}ms`)
  if (fxRevealStagger) el.style.setProperty('--fx-reveal-stagger', `${fxRevealStagger}ms`)
  if (fxRevealEase) el.style.setProperty('--fx-reveal-ease', fxRevealEase)
}

function markTargets(targets: HTMLElement[]) {
  targets.forEach((t, i) => {
    t.classList.add('fx-reveal-target')
    t.style.setProperty('--fx-i', String(i))
  })
}

/**
 * Splits an element's plain text into visual lines, each wrapped in a
 * clipping `.fx-line` so it can rise out of a mask. Re-splits when the
 * element's width changes. Inline markup inside the element is flattened to
 * text. Returns a function that restores the original markup.
 */
export function splitLines(el: HTMLElement): () => void {
  const original = el.innerHTML
  const text = (el.textContent ?? '').replace(/\s+/g, ' ').trim()
  let lastWidth = -1

  const build = () => {
    const words = text.split(' ')
    el.textContent = ''
    const spans = words.map((word, i) => {
      const span = document.createElement('span')
      span.textContent = i < words.length - 1 ? `${word} ` : word
      el.append(span)
      return span
    })

    const lines: string[] = []
    let top = Number.NaN
    for (const span of spans) {
      if (span.offsetTop !== top) {
        lines.push('')
        top = span.offsetTop
      }
      lines[lines.length - 1] += span.textContent
    }

    el.textContent = ''
    const inners = lines.map((line) => {
      const outer = document.createElement('span')
      outer.className = 'fx-line'
      const inner = document.createElement('span')
      inner.className = 'fx-line__inner'
      inner.textContent = line
      outer.append(inner)
      el.append(outer)
      return inner
    })
    markTargets(inners)
  }

  // Split right away so the text is hidden before the first paint, then
  // again whenever the width changes the line breaks.
  build()
  const resize = new ResizeObserver(([entry]) => {
    const width = Math.round(entry.contentRect.width)
    if (width === lastWidth) return
    lastWidth = width
    build()
  })
  resize.observe(el)

  return () => {
    resize.disconnect()
    el.innerHTML = original
  }
}
