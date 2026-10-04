import { useEffect, useState } from 'react'
import { localPhotos, type LocalPhoto } from '../assets/photos'
import { company } from '../data/company'
import { routeHref, serviceHref } from '../lib/router'
import { ZoomParallax } from './ui/zoom-parallax'
import './Hero.css'

const unsplash = (id: string, alt: string) => ({
  src: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=70`,
  srcSet: [800, 1600, 2400]
    .map((w) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70 ${w}w`)
    .join(', '),
  alt,
})
const local = (name: LocalPhoto, alt: string) => ({
  src: localPhotos[name].large,
  srcSet: `${localPhotos[name].small} 640w, ${localPhotos[name].large} 1280w`,
  alt,
})

/** Collage under the hero. The first image is the one the zoom ends on, full screen. */
const COLLAGE = [
  unsplash('1600585154084-4e5fe7c39198', 'Open-plan living room with oak floors and glass doors onto a deck'),
  local('kitchen', 'White shaker kitchen with a farmhouse sink, by our crew'),
  local('sunroom', 'Sunroom with a green feature wall and shiplap ceiling, by our crew'),
  local('bathroom', 'Bathroom with botanical wallpaper and a gold arched mirror, by our crew'),
  local('painting', 'Living room repainted in slate blue with white trim, by our crew'),
  unsplash('1556912173-3bb406ef7e77', 'Bright kitchen with hexagon tile and white cabinets'),
  local('exterior', 'Screened garden room, by our crew'),
]

const WORDS = ['Transform.', 'Renew.', 'Refresh.', 'Restore.']

const TABS = [
  { id: 'kitchen', label: 'Kitchens', text: 'Kitchen renovations' },
  { id: 'bathroom', label: 'Bathrooms', text: 'Bathroom renovations' },
  { id: 'sunroom', label: 'Sunrooms', text: 'Sunroom updates' },
  { id: 'painting', label: 'Painting', text: 'Interior painting' },
  { id: 'roofing', label: 'Roofing', text: 'Roof repairs & replacement' },
]

export function Hero({ onConsult }: { onConsult: () => void }) {
  const [word, setWord] = useState(0)

  // The accent word cycles, as on the current site; it stays put with reduced motion
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => setWord((w) => (w + 1) % WORDS.length), 2800)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <>
      <header className="hero">
        <div className="hero-spotlight" aria-hidden="true" />

        <div
          className="hero-copy"
          data-fx-reveal="fade-up"
          data-fx-reveal-duration="1000"
          data-fx-reveal-stagger="140"
          data-fx-reveal-offset="0"
        >
          <p className="eyebrow hero-eyebrow">Kitchens · Bathrooms · Sunrooms · Painting · Roofing</p>
          <h1 className="hero-title">
            Built to{' '}
            <span className="hero-word" aria-live="polite">
              <span key={word} className="accent hero-word-inner">
                {WORDS[word]}
              </span>
            </span>
          </h1>
          <p className="hero-tagline">Renovation &amp; remodeling in Indianapolis, Indiana.</p>
          <p className="hero-sub">
            {company.legalName} helps homeowners across Indianapolis and Central Indiana bring their ideas to life with
            kitchen renovations, bathroom renovations, sunroom updates, interior painting, and home improvement services
            backed by experience since {company.since}.
          </p>
          <div className="hero-actions">
            <button type="button" className="btn btn-primary" onClick={onConsult}>
              Schedule a Free Consultation
            </button>
            <a className="btn btn-outline-light" href={company.phoneHref}>
              Call {company.phone}
            </a>
          </div>
        </div>

        <nav className="hero-tabs" aria-label="Main services">
          {TABS.map((tab) => (
            <a key={tab.id} className="hero-tab" href={serviceHref(tab.id)}>
              <span className="hero-tab-label">{tab.label}</span>
              <span className="hero-tab-text">{tab.text}</span>
            </a>
          ))}
        </nav>
      </header>

      <ZoomParallax images={COLLAGE}>
        <p className="eyebrow hero-zoom-eyebrow">Kitchens · Bathrooms · Sunrooms · Painting · Roofing</p>
        <p className="hero-zoom-title">
          Spaces that work better, <span className="accent">finished with care.</span>
        </p>
        <a className="btn btn-outline-light" href={routeHref('gallery')}>
          View Project Gallery
        </a>
      </ZoomParallax>
    </>
  )
}
