import { useEffect, useState } from 'react'
import { company } from '../data/company'
import { serviceHref } from '../lib/router'
import { Photo } from './Photo'
import './Hero.css'

const WORDS = ['Transform.', 'Renew.', 'Refresh.', 'Restore.']

const TABS = [
  { id: 'kitchen', label: 'Kitchens', text: 'Kitchen renovations' },
  { id: 'bathroom', label: 'Bathrooms', text: 'Bathroom renovations' },
  { id: 'sunroom', label: 'Sunrooms', text: 'Sunroom updates' },
  { id: 'painting', label: 'Painting', text: 'Interior painting' },
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
    <header className="hero">
      <div className="hero-media">
        <Photo
          id="1600585154084-4e5fe7c39198"
          alt="Open-plan living room with oak floors, a timber feature wall and glass doors onto a deck"
          sizes="100vw"
          priority
        />
      </div>
      <div className="hero-scrim" aria-hidden="true" />

      <div className="hero-copy" data-fx-reveal="fade-up" data-fx-reveal-duration="1000" data-fx-reveal-stagger="140" data-fx-reveal-offset="0">
        <p className="eyebrow hero-eyebrow">Kitchens · Bathrooms · Sunrooms · Painting</p>
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
  )
}
