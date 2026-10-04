import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState, type MouseEvent, type PointerEvent, type ReactNode } from 'react'
import './hero-carousel.css'

export interface HeroCarouselItem {
  /** Stable key. */
  id: string
  /** Headline for the active slide. Newlines become separate reveal lines. */
  title: string
  /** Last headline line, set in the italic accent serif. */
  accent?: string
  /** Shown both in the strip card and as the backdrop (graded to `tint`, if set). */
  /** `position` is the backdrop's object-position, to keep the best part of the photo in view. */
  image: { src: string; srcSet?: string; alt: string; position?: string }
  /** Small label beside the headline, e.g. "Service 01". */
  credit?: string
  /** Facts on the right of the headline. */
  meta?: string[]
  /** Link under the facts, e.g. to the service page. */
  link?: { href: string; label: string }
  /** Optional colour the backdrop is graded to: the photo keeps its light and takes this hue. Without it the photo keeps its own colours. */
  tint?: string
}

interface HeroCarouselProps {
  items: HeroCarouselItem[]
  defaultIndex?: number
  /**
   * Advance on a timer while the visitor leaves it alone, also with reduced
   * motion (it then only fades). Waits while the pointer moves over the hero,
   * during a swipe, with keyboard focus and while off screen.
   */
  autoplay?: boolean
  autoplayDelay?: number
  /**
   * Tapping or clicking a card calls this instead of just focusing it, e.g. to
   * open that card's project; the headline also gets a matching button.
   */
  onSelect?: (index: number) => void
  /** Label for that action. @default "View" */
  selectLabel?: string
  /** Above the headline, e.g. the page's h1. */
  eyebrow?: ReactNode
  /** Bottom right on wide screens, bottom row on phones, e.g. call-to-action buttons. */
  children?: ReactNode
  className?: string
}

/* Ratios from the reference layout, relative to the stage box */
const CARD_H = 0.264 // focused card height ÷ stage height
const CARD_AR = 0.75 // focused card is 3:4
const GAP = 0.038 // gap ÷ card width
const STRIP_TOP = 0.5 // the strip's shared top edge, down the stage
const RAIL = 0.2 // progress rail width ÷ stage width

/** How long the carousel waits after the visitor touches or moves over it before playing again. */
const IDLE_MS = 4000
/** Movement before a press counts as a swipe, and the swipe distance that always changes card. */
const SWIPE_START = 8
const SWIPE_COMMIT = 40

/** Horizontal trackpad distance that commits to a step, and the lockout after one. */
const WHEEL_THRESHOLD = 60
const WHEEL_COOLDOWN = 420

/* Film grain as an inline SVG, so the component carries no assets */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))

/**
 * Full-bleed hero driven by a filmstrip (adapted from the 21st.dev
 * HeroCarousel, with plain CSS instead of Tailwind). Every card shares one top
 * edge; the focused card unfurls to full height while its neighbours stay
 * clipped to half, and the whole backdrop re-grades to the focused photo.
 * Swipe or drag the strip either way, tap a card, use the arrow keys or a
 * sideways trackpad swipe; left alone it plays on its own. Vertical gestures
 * always scroll the page, even when they start on the strip.
 */
export function HeroCarousel({
  items,
  defaultIndex = 0,
  autoplay = false,
  autoplayDelay = 5000,
  onSelect,
  selectLabel = 'View',
  eyebrow,
  children,
  className,
}: HeroCarouselProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const [box, setBox] = useState({ w: 0, h: 0 })
  const [index, setIndex] = useState(defaultIndex)
  const [dragging, setDragging] = useState(false)
  const [paused, setPaused] = useState(false)
  const [onScreen, setOnScreen] = useState(true)
  // Bumped to re-arm the autoplay timer after it found the visitor busy
  const [tick, setTick] = useState(0)
  const busyUntil = useRef(0)
  const reduced = useReducedMotion()

  const last = items.length - 1
  const go = useCallback((next: number) => setIndex(clamp(next, 0, Math.max(0, last))), [last])
  /** The visitor is using the carousel: hold the autoplay for a moment. */
  const hold = () => {
    busyUntil.current = Date.now() + IDLE_MS
  }

  // One observer feeds every measurement below
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const read = () => setBox({ w: stage.clientWidth, h: stage.clientHeight })
    read()
    const ro = new ResizeObserver(read)
    ro.observe(stage)
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting))
    io.observe(stage)
    return () => {
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  const fullH = clamp(box.h * CARD_H, 96, 360)
  const halfH = fullH / 2
  const cardW = fullH * CARD_AR
  const gap = Math.max(4, Math.round(cardW * GAP))
  const step = cardW + gap

  // Centre the focused card: the track slides, the cards never move themselves
  const xFor = useCallback((i: number) => box.w / 2 - (i * step + cardW / 2), [box.w, step, cardW])
  const x = useMotionValue(0)
  const target = xFor(index)
  // Reduced motion keeps the carousel moving, but with short glides and fades instead of springs, zooms and wipes
  const spring = reduced
    ? { duration: 0.45, ease: 'easeOut' as const }
    : { type: 'spring' as const, stiffness: 260, damping: 34, mass: 0.9 }

  // A motion value rather than an `animate` prop, so a drag that starts mid-spring reads the real position
  useEffect(() => {
    if (dragging) return
    const run = animate(x, target, spring)
    return () => run.stop()
    // `spring` only derives from `reduced`
  }, [target, dragging, reduced, x, box.w]) // eslint-disable-line react-hooks/exhaustive-deps

  // Sideways trackpad swipes step the strip; vertical wheel scrolling is left to the page
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    let acc = 0
    let until = 0
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
      const stuck = (e.deltaX > 0 && index === last) || (e.deltaX < 0 && index === 0)
      if (stuck) return
      e.preventDefault()
      hold()
      if (e.timeStamp < until) return
      acc += e.deltaX
      if (Math.abs(acc) < WHEEL_THRESHOLD) return
      go(index + Math.sign(acc))
      acc = 0
      until = e.timeStamp + WHEEL_COOLDOWN
    }
    stage.addEventListener('wheel', onWheel, { passive: false })
    return () => stage.removeEventListener('wheel', onWheel)
  }, [go, index, last])

  useEffect(() => {
    if (!autoplay || paused || dragging || !onScreen || items.length < 2) return
    const id = window.setTimeout(() => {
      // Still being used: look again shortly instead of moving under the visitor's hand
      if (Date.now() < busyUntil.current) return setTick((t) => t + 1)
      go(index === last ? 0 : index + 1)
    }, autoplayDelay)
    return () => window.clearTimeout(id)
  }, [autoplay, autoplayDelay, paused, dragging, onScreen, go, index, items.length, last, tick])

  // Swipe / drag on the strip. Only a sideways gesture is taken: a vertical one is left to the
  // browser (touch-action: pan-y), which scrolls the page and cancels the pointer.
  const swipe = useRef<{ id: number; x0: number; y0: number; base: number; sideways: boolean | null } | null>(null)
  const justSwiped = useRef(false)
  const endSwipe = (dx: number) => {
    swipe.current = null
    setDragging(false)
    hold()
    // The card nearest the release; a clear swipe always moves at least one card
    let next = Math.round((box.w / 2 - x.get() - cardW / 2) / step)
    if (next === index && Math.abs(dx) > SWIPE_COMMIT) next = index - Math.sign(dx)
    go(next)
  }
  const swipeHandlers = {
    onPointerDown: (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return
      hold()
      swipe.current = { id: e.pointerId, x0: e.clientX, y0: e.clientY, base: x.get(), sideways: null }
    },
    onPointerMove: (e: PointerEvent<HTMLDivElement>) => {
      const s = swipe.current
      if (!s || s.id !== e.pointerId) return
      const dx = e.clientX - s.x0
      const dy = e.clientY - s.y0
      if (s.sideways === null) {
        if (Math.abs(dx) < SWIPE_START && Math.abs(dy) < SWIPE_START) return
        s.sideways = Math.abs(dx) > Math.abs(dy)
        if (!s.sideways) return void (swipe.current = null)
        e.currentTarget.setPointerCapture(e.pointerId)
        setDragging(true)
      }
      // Follow the finger, with some resistance past the first and last card
      const raw = s.base + dx
      const min = xFor(last)
      const max = xFor(0)
      x.set(raw > max ? max + (raw - max) * 0.3 : raw < min ? min + (raw - min) * 0.3 : raw)
    },
    onPointerUp: (e: PointerEvent) => {
      const s = swipe.current
      if (!s || s.id !== e.pointerId) return
      if (!s.sideways) return void (swipe.current = null)
      // A swipe is not a tap: keep it from opening the card underneath
      justSwiped.current = true
      window.setTimeout(() => (justSwiped.current = false), 0)
      endSwipe(e.clientX - s.x0)
    },
    onPointerCancel: (e: PointerEvent) => {
      const s = swipe.current
      if (!s || s.id !== e.pointerId) return
      if (s.sideways) endSwipe(e.clientX - s.x0)
      else swipe.current = null
    },
    onClickCapture: (e: MouseEvent) => {
      if (justSwiped.current) {
        e.preventDefault()
        e.stopPropagation()
      }
    },
  }

  const active = items[index]
  if (!active) return null
  const lines = [...active.title.split('\n'), ...(active.accent ? [active.accent] : [])]
  const tint = active.tint
  const fade = { duration: 0.7, ease: 'easeOut' as const }

  return (
    <div
      ref={stageRef}
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      aria-label="Our work"
      onKeyDown={(e) => {
        const keys: Record<string, number> = { ArrowLeft: index - 1, ArrowRight: index + 1, Home: 0, End: last }
        if (!(e.key in keys)) return
        e.preventDefault()
        go(keys[e.key])
      }}
      // A moving mouse means someone is looking: wait until it rests
      onPointerMove={(e) => e.pointerType === 'mouse' && hold()}
      onFocus={(e) => e.target.matches(':focus-visible') && setPaused(true)}
      onBlur={() => setPaused(false)}
      className={['hc', className].filter(Boolean).join(' ')}
    >
      {/* Backdrop: the focused photo, blown up (and re-hued to its tint, if it has one) */}
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="hc-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={fade}
        >
          <motion.img
            src={active.image.src}
            srcSet={active.image.srcSet}
            sizes="100vw"
            alt=""
            aria-hidden="true"
            draggable={false}
            style={{ objectPosition: active.image.position }}
            // A gentle push-in that settles close to the photo's own framing, so rooms read wide
            initial={{ scale: reduced ? 1.02 : 1.14 }}
            animate={{ scale: 1.02 }}
            transition={reduced ? { duration: 0 } : { duration: 6, ease: 'linear' }}
          />
          {tint && (
            <>
              <div className="hc-grade hc-grade-color" style={{ backgroundColor: tint }} />
              <div className="hc-grade hc-grade-multiply" style={{ backgroundColor: tint }} />
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Legibility wash and grain, above the swap so they never flicker */}
      <div className="hc-wash" aria-hidden="true" />
      <div className="hc-grain" aria-hidden="true" style={{ backgroundImage: GRAIN }} />

      {/* Headline block, sitting just above the strip's top edge */}
      <div className="hc-head" style={{ height: `${STRIP_TOP * 100}%` }}>
        {eyebrow}
        <div className="hc-head-row">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.p
              key={index}
              className="hc-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.18 } }}
            >
              {lines.map((line, i) => (
                // Each line wipes up from behind its own edge
                <span key={i} className="hc-line">
                  <motion.span
                    className={active.accent && i === lines.length - 1 ? 'hc-line-inner accent' : 'hc-line-inner'}
                    initial={reduced ? { opacity: 0 } : { y: '110%' }}
                    animate={reduced ? { opacity: 1 } : { y: 0 }}
                    transition={{ duration: reduced ? 0.5 : 0.62, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.p>
          </AnimatePresence>

          {active.credit && (
            <motion.p
              key={`credit-${index}`}
              className="hc-label hc-credit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {active.credit}
            </motion.p>
          )}

          <div className="hc-meta">
            {active.meta?.map((fact, i) => (
              <motion.span
                key={`${index}-${fact}`}
                className="hc-label"
                initial={{ opacity: 0, y: reduced ? 0 : 6 }}
                animate={{ opacity: 0.8, y: 0 }}
                transition={{ duration: 0.45, delay: 0.12 + i * 0.06 }}
              >
                {fact}
              </motion.span>
            ))}
            {onSelect && (
              <motion.button
                key={`select-${index}`}
                type="button"
                className="hc-label hc-link"
                onClick={() => onSelect(index)}
                initial={{ opacity: 0, y: reduced ? 0 : 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.3 }}
              >
                {selectLabel}{' '}
                <span className="fx-arrow" aria-hidden="true">
                  →
                </span>
              </motion.button>
            )}
            {active.link && !onSelect && (
              <motion.a
                key={`link-${index}`}
                className="hc-label hc-link"
                href={active.link.href}
                initial={{ opacity: 0, y: reduced ? 0 : 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.3 }}
              >
                {active.link.label}{' '}
                <span className="fx-arrow" aria-hidden="true">
                  →
                </span>
              </motion.a>
            )}
          </div>
        </div>
      </div>

      {/* The strip: one shared top edge, the focused card twice as tall */}
      <div className="hc-strip" style={{ top: `${STRIP_TOP * 100}%`, height: fullH }}>
        <motion.div className={`hc-track ${dragging ? 'is-dragging' : ''}`} style={{ gap, x }} {...swipeHandlers}>
          {items.map((item, i) => (
            <motion.button
              key={item.id}
              type="button"
              aria-label={[onSelect && `${selectLabel}:`, item.title.replace(/\n/g, ' '), item.accent]
                .filter(Boolean)
                .join(' ')}
              aria-current={i === index}
              onClick={() => (onSelect ? onSelect(i) : go(i))}
              className="hc-card"
              style={{ width: cardW }}
              initial={false}
              animate={{ height: i === index ? fullH : halfH }}
              transition={spring}
            >
              <img
                src={item.image.src}
                srcSet={item.image.srcSet}
                sizes={`${Math.round(cardW)}px`}
                alt=""
                draggable={false}
              />
              <motion.span
                aria-hidden="true"
                className="hc-card-dim"
                initial={false}
                animate={{ opacity: i === index ? 0 : 0.28 }}
                transition={spring}
              />
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Position rail, and the page's own controls */}
      <div className="hc-foot">
        <div className="hc-rail" style={{ width: Math.max(140, box.w * RAIL) }} aria-hidden="true">
          <div className="hc-rail-numbers">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <span>{String(items.length).padStart(2, '0')}</span>
          </div>
          <div className="hc-rail-track">
            <motion.div
              className="hc-rail-thumb"
              style={{ width: `${100 / items.length}%` }}
              initial={false}
              animate={{ left: `${(index / items.length) * 100}%` }}
              transition={spring}
            />
          </div>
        </div>
        <p className="hc-hint" aria-hidden="true">
          <span>←</span> Swipe to see our work <span>→</span>
        </p>
        {children && <div className="hc-actions">{children}</div>}
      </div>
    </div>
  )
}
