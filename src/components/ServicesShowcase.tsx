import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from 'react'
import { homeServiceOrder, services, type Service } from '../data/services'
import { serviceHref } from '../lib/router'
import { Accented } from './Heading'
import { Photo } from './Photo'
import './ServicesShowcase.css'

/** Same order as the hero carousel */
const ORDERED = homeServiceOrder.map((id) => services.find((s) => s.id === id)!)

/** Time on each card while autoplaying, and the pause after the visitor touches the row. */
const AUTOPLAY_MS = 4500
const IDLE_MS = 5000
/** Mouse movement before a press counts as a drag rather than a click. */
const DRAG_START = 6

/**
 * Services as a sideways carousel: a row of service cards that you swipe with a
 * finger or drag with the mouse, either way, and that moves on by itself, card
 * by card, while left alone. A counter and progress line show the position.
 */
export function ServicesShowcase({ onConsult }: { onConsult: () => void }) {
  const section = useRef<HTMLElement>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [progress, setProgress] = useState(0)
  const [dragging, setDragging] = useState(false)
  const busyUntil = useRef(0)
  const count = ORDERED.length

  /** The visitor is using the row: hold the autoplay for a moment. */
  const hold = () => {
    busyUntil.current = Date.now() + IDLE_MS
  }

  // Counter and progress line follow the row's own scroll position
  useEffect(() => {
    const el = viewport.current
    if (!el) return
    const update = () => {
      const max = el.scrollWidth - el.clientWidth
      const lefts = cardLefts(el)
      const nearest = lefts.reduce(
        (best, left, i) => (Math.abs(left - el.scrollLeft) < Math.abs(lefts[best] - el.scrollLeft) ? i : best),
        0,
      )
      setCurrent(max > 0 && el.scrollLeft >= max - 2 ? count - 1 : nearest)
      setProgress(max > 0 ? el.scrollLeft / max : 0)
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [count])

  // Autoplay: one card at a time, back to the first after the last, only while on screen and idle
  useEffect(() => {
    const el = viewport.current
    const host = section.current
    if (!el || !host) return
    let onScreen = false
    const io = new IntersectionObserver(([entry]) => (onScreen = entry.isIntersecting), { threshold: 0.35 })
    io.observe(host)
    const id = window.setInterval(() => {
      if (!onScreen || document.hidden || Date.now() < busyUntil.current) return
      const max = el.scrollWidth - el.clientWidth
      if (max <= 0) return
      const next = el.scrollLeft >= max - 2 ? 0 : (cardLefts(el).find((left) => left > el.scrollLeft + 4) ?? 0)
      el.scrollTo({ left: Math.min(next, max), behavior: 'smooth' })
    }, AUTOPLAY_MS)
    return () => {
      io.disconnect()
      window.clearInterval(id)
    }
  }, [])

  // Mouse drag scrolls the row (fingers already scroll it natively)
  const drag = useRef<{ x0: number; left0: number; moved: boolean } | null>(null)
  const justDragged = useRef(false)
  const dragHandlers = {
    onPointerDown: (e: PointerEvent<HTMLDivElement>) => {
      hold()
      if (e.pointerType !== 'mouse' || e.button !== 0) return
      drag.current = { x0: e.clientX, left0: e.currentTarget.scrollLeft, moved: false }
    },
    onPointerMove: (e: PointerEvent<HTMLDivElement>) => {
      const d = drag.current
      if (!d) return
      const dx = e.clientX - d.x0
      if (!d.moved) {
        if (Math.abs(dx) < DRAG_START) return
        d.moved = true
        e.currentTarget.setPointerCapture(e.pointerId)
        setDragging(true)
      }
      hold()
      e.currentTarget.scrollLeft = d.left0 - dx
    },
    onPointerUp: (e: PointerEvent<HTMLDivElement>) => {
      const d = drag.current
      drag.current = null
      if (!d?.moved) return
      setDragging(false)
      // A drag is not a click on the card under the pointer
      justDragged.current = true
      window.setTimeout(() => (justDragged.current = false), 0)
      // Settle on the nearest card
      const el = e.currentTarget
      const nearest = cardLefts(el).reduce(
        (a, b) => (Math.abs(b - el.scrollLeft) < Math.abs(a - el.scrollLeft) ? b : a),
        0,
      )
      el.scrollTo({ left: nearest, behavior: 'smooth' })
    },
    onClickCapture: (e: MouseEvent) => {
      if (!justDragged.current) return
      e.preventDefault()
      e.stopPropagation()
    },
  }

  return (
    <section ref={section} className="showcase" aria-labelledby="showcase-title" id="work" onMouseMove={hold}>
      <header className="showcase-head">
        <div>
          <p className="eyebrow eyebrow-rule showcase-eyebrow">Our services</p>
          <h2 id="showcase-title" className="showcase-title">
            <Accented text="Renovation services built around" accent="your home." />
          </h2>
        </div>
        <div className="showcase-meta">
          <p className="showcase-counter" aria-hidden="true">
            <span>{String(current + 1).padStart(2, '0')}</span>{' '}
            <span className="showcase-counter-total">/ {String(count).padStart(2, '0')}</span>
          </p>
          <div className="showcase-progress" aria-hidden="true">
            <span style={{ transform: `scaleX(${progress})` }} />
          </div>
          <button type="button" className="btn btn-primary showcase-cta" onClick={onConsult}>
            Schedule a Free Consultation
          </button>
        </div>
      </header>

      <div
        ref={viewport}
        className={`showcase-viewport ${dragging ? 'is-dragging' : ''}`}
        onWheel={hold}
        onTouchStart={hold}
        onFocus={hold}
        // The browser's own image and link dragging would steal the mouse drag
        onDragStart={(e) => e.preventDefault()}
        {...dragHandlers}
      >
        <div className="showcase-track">
          {ORDERED.map((service, i) => (
            <ShowcaseCard key={service.id} service={service} number={String(i + 1).padStart(2, '0')} />
          ))}
        </div>
      </div>
      <p className="showcase-hint" aria-hidden="true">
        <span>←</span> Swipe to see every service <span>→</span>
      </p>
    </section>
  )
}

/** Each card's scroll position inside the row, measured from the first card. */
function cardLefts(row: HTMLElement) {
  const cards = Array.from(row.querySelectorAll<HTMLElement>('.showcase-card'))
  const first = cards[0]?.offsetLeft ?? 0
  return cards.map((card) => card.offsetLeft - first)
}

/** One service card, linking to its section on the services page. */
function ShowcaseCard({ service, number }: { service: Service; number: string }) {
  return (
    <a className="showcase-card fx-card" href={serviceHref(service.id)} draggable={false}>
      <div className="showcase-card-media">
        <div className="showcase-card-photo">
          <Photo {...service.photo} sizes="(max-width: 700px) 80vw, 460px" />
        </div>
        <span className="showcase-card-number">{number}</span>
      </div>
      <div className="showcase-card-body">
        <h3 className="fx-card__title">{service.name}</h3>
        <p>{service.description}</p>
        <span className="showcase-card-link">
          View service{' '}
          <span className="fx-arrow" aria-hidden="true">
            →
          </span>
        </span>
      </div>
    </a>
  )
}
