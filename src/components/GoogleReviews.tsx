import { useEffect, useRef, useState } from 'react'
import { fetchGoogleReviews, ratingLabel, type GoogleReviewsData } from '../lib/googleReviews'
import './GoogleReviews.css'

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="greviews-stars" role="img" aria-label={`${rating.toFixed(1)} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i))
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
            <defs>
              <clipPath id={`star-${size}-${i}-${Math.round(fill * 100)}`}>
                <rect x="0" y="0" width={24 * fill} height="24" />
              </clipPath>
            </defs>
            <path className="greviews-star-empty" d={STAR} />
            <path
              className="greviews-star-full"
              d={STAR}
              clipPath={`url(#star-${size}-${i}-${Math.round(fill * 100)})`}
            />
          </svg>
        )
      })}
    </span>
  )
}

const STAR = 'M12 2.5l2.94 6.1 6.56.9-4.78 4.6 1.17 6.6L12 17.6l-5.89 3.1 1.17-6.6L2.5 9.5l6.56-.9z'

function GoogleWordmark() {
  return (
    <span className="greviews-google" aria-label="Google">
      <span style={{ color: '#4285F4' }}>G</span>
      <span style={{ color: '#EA4335' }}>o</span>
      <span style={{ color: '#FBBC04' }}>o</span>
      <span style={{ color: '#4285F4' }}>g</span>
      <span style={{ color: '#34A853' }}>l</span>
      <span style={{ color: '#EA4335' }}>e</span>
    </span>
  )
}

type State = { status: 'idle' | 'loading' | 'error' } | { status: 'ready'; data: GoogleReviewsData }

/**
 * Real reviews from the Google Business Profile. Loads only when the section
 * nears the screen, and renders nothing until real reviews arrive: if the
 * function is not configured yet or Google fails, the section simply isn't
 * there, so the page never shows placeholder reviews.
 */
export function GoogleReviews() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<State>({ status: 'idle' })
  const [expanded, setExpanded] = useState<Set<number>>(new Set())

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    let cancelled = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        setState({ status: 'loading' })
        fetchGoogleReviews()
          .then((data) => !cancelled && setState({ status: 'ready', data }))
          .catch((err) => {
            console.warn('Google reviews unavailable:', err)
            if (!cancelled) setState({ status: 'error' })
          })
      },
      { rootMargin: '400px 0px' },
    )
    observer.observe(el)
    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [])

  if (state.status === 'error') return null
  if (state.status === 'ready' && state.data.reviews.length === 0) return null
  // Until real reviews arrive, only an invisible marker that tells the observer when to load them
  if (state.status !== 'ready') return <section className="greviews-pending" ref={sectionRef} aria-hidden="true" />

  const scroll = (dir: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>('.greviews-card')
    track.scrollBy({ left: dir * ((card?.offsetWidth ?? 300) + 20), behavior: 'smooth' })
  }

  const toggle = (i: number) =>
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  return (
    <section className="greviews" ref={sectionRef} aria-labelledby="greviews-title">
      <div className="section">
        <>
          <header className="greviews-summary">
            <h2 id="greviews-title" className="greviews-label">
              {ratingLabel(state.data.rating)}
            </h2>
            <div className="greviews-score">
              <span className="greviews-rating">{state.data.rating.toFixed(1)}</span>
              <Stars rating={state.data.rating} size={26} />
            </div>
            <p className="greviews-count">
              Based on <strong>{state.data.total} reviews</strong> on <GoogleWordmark />
            </p>
          </header>

          <div className="greviews-carousel">
            <button
              type="button"
              className="greviews-arrow greviews-arrow-prev"
              aria-label="Previous reviews"
              onClick={() => scroll(-1)}
            >
              ‹
            </button>
            <div className="greviews-track" ref={trackRef}>
              {state.data.reviews.map((r, i) => {
                const long = r.text.length > 180
                const open = expanded.has(i)
                return (
                  <article key={`${r.author}-${i}`} className="greviews-card">
                    <header className="greviews-card-head">
                      {r.authorPhoto ? (
                        <img
                          className="greviews-avatar"
                          src={r.authorPhoto}
                          alt=""
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                      ) : (
                        <span className="greviews-avatar greviews-avatar-initial" aria-hidden="true">
                          {r.author.charAt(0)}
                        </span>
                      )}
                      <div className="greviews-author">
                        {r.authorUrl ? (
                          <a href={r.authorUrl} target="_blank" rel="noopener noreferrer">
                            {r.author}
                          </a>
                        ) : (
                          <span>{r.author}</span>
                        )}
                        <span className="greviews-when">{r.when}</span>
                      </div>
                      <span className="greviews-g" aria-hidden="true">
                        G
                      </span>
                    </header>
                    <Stars rating={r.rating} />
                    <p className={`greviews-text ${long && !open ? 'is-clamped' : ''}`}>{r.text}</p>
                    {long && (
                      <button type="button" className="greviews-more" aria-expanded={open} onClick={() => toggle(i)}>
                        {open ? 'Show less' : 'Read more'}
                      </button>
                    )}
                  </article>
                )
              })}
            </div>
            <button
              type="button"
              className="greviews-arrow greviews-arrow-next"
              aria-label="Next reviews"
              onClick={() => scroll(1)}
            >
              ›
            </button>
          </div>

          <div className="greviews-actions">
            {state.data.placeUrl && (
              <a className="btn greviews-all" href={state.data.placeUrl} target="_blank" rel="noopener noreferrer">
                See all reviews on Google
              </a>
            )}
            <a className="greviews-write" href={state.data.writeReviewUrl} target="_blank" rel="noopener noreferrer">
              Worked with us? Leave a review
            </a>
          </div>
        </>
      </div>
    </section>
  )
}
