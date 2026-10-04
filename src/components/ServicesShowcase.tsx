import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'
import { services, type Service } from '../data/services'
import { serviceHref } from '../lib/router'
import { Accented } from './Heading'
import { Photo } from './Photo'
import './ServicesShowcase.css'

/**
 * Services as a pinned, sideways-scrolling showcase: the section holds the
 * screen while vertical scrolling slides the service cards across, with a
 * counter and progress line. The movement follows the visitor's own scroll, so
 * it stays on with reduced motion too. Without room to slide it is a swipeable row.
 */
export function ServicesShowcase({ onConsult }: { onConsult: () => void }) {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  // How far the track has to travel sideways, measured from the layout
  const [shift, setShift] = useState(0)

  useLayoutEffect(() => {
    const el = track.current
    if (!el) return
    const measure = () => setShift(Math.max(0, el.scrollWidth - el.clientWidth))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, (p) => -p * shift)
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1])
  const count = services.length
  const current = useTransform(scrollYProgress, (p) =>
    String(Math.min(count, Math.floor(p * count) + 1)).padStart(2, '0'),
  )

  const pinned = shift > 0

  return (
    <section
      ref={section}
      className={`showcase ${pinned ? 'is-pinned' : ''}`}
      // The pinned section is as tall as the sideways distance, so one pixel of scroll moves the track one pixel
      style={pinned ? { height: `calc(100svh + ${shift}px)` } : undefined}
      aria-labelledby="showcase-title"
      id="work"
    >
      <div className="showcase-sticky">
        <header className="showcase-head">
          <div>
            <p className="eyebrow eyebrow-rule showcase-eyebrow">Our services</p>
            <h2 id="showcase-title" className="showcase-title">
              <Accented text="Renovation services built around" accent="your home." />
            </h2>
          </div>
          <div className="showcase-meta">
            <p className="showcase-counter" aria-hidden="true">
              <motion.span>{current}</motion.span>{' '}
              <span className="showcase-counter-total">/ {String(count).padStart(2, '0')}</span>
            </p>
            <div className="showcase-progress" aria-hidden="true">
              <motion.span style={{ scaleX: progress }} />
            </div>
            <button type="button" className="btn btn-primary showcase-cta" onClick={onConsult}>
              Schedule a Free Consultation
            </button>
          </div>
        </header>

        <div className="showcase-viewport">
          <motion.div ref={track} className="showcase-track" style={pinned ? { x } : undefined}>
            {services.map((service, i) => (
              <ShowcaseCard
                key={service.id}
                service={service}
                index={i}
                count={count}
                progress={scrollYProgress}
                animate={pinned}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

interface CardProps {
  service: Service
  index: number
  count: number
  progress: MotionValue<number>
  animate: boolean
}

/** One service. Its photo drifts against the scroll for a little depth. */
function ShowcaseCard({ service, index, count, progress, animate }: CardProps) {
  const centre = count > 1 ? index / (count - 1) : 0
  const drift = useTransform(progress, [centre - 0.5, centre + 0.5], ['-8%', '8%'])

  return (
    <a className="showcase-card fx-card" href={serviceHref(service.id)}>
      <div className="showcase-card-media">
        <motion.div className="showcase-card-photo" style={animate ? { x: drift } : undefined}>
          <Photo {...service.photo} sizes="(max-width: 700px) 80vw, 460px" />
        </motion.div>
        <span className="showcase-card-number">{service.number}</span>
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
