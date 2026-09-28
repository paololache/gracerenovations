import { routeHref } from '../lib/router'
import { Photo } from './Photo'
import './Hero.css'

interface HeroProps {
  onStartEstimate: () => void
}

export function Hero({ onStartEstimate }: HeroProps) {
  return (
    <header className="hero">
      <div className="hero-media">
        <Photo
          id="1600566753086-00f18fb6b3ea"
          alt="Open-plan living room with tall windows after a whole-home renovation"
          priority
        />
      </div>
      <div className="hero-scrim" aria-hidden="true" />

      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow">47 projects published with their invoices</p>
        <h1 className="hero-title">Nobody should sign a building contract on a promise.</h1>
        <p className="hero-sub">
          So we publish what every job cost, and give you a range for yours before we ever set foot in the house.
        </p>
        <div className="hero-actions">
          <button type="button" className="btn btn-primary" onClick={onStartEstimate}>
            Get a cost range
          </button>
          <a className="btn btn-outline-light" href={routeHref('projects')}>
            See the projects
          </a>
        </div>
      </div>
    </header>
  )
}
