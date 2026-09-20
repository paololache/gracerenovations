import { ImagePlaceholder } from './ImagePlaceholder'
import { Logo } from './Logo'
import { site } from '../data/site'
import './Hero.css'

interface HeroProps {
  onStartEstimate: () => void
}

export function Hero({ onStartEstimate }: HeroProps) {
  return (
    <header className="hero">
      <div className="hero-media">
        <ImagePlaceholder shape="rect" caption="Wide finished interior, darker exposure" priority />
      </div>
      <div className="hero-scrim" aria-hidden="true" />

      <div className="hero-nav">
        <Logo />
        <nav className="hero-links" aria-label="Primary">
          <a href="#services">Services</a>
          <a href="#projects">Work</a>
          <a href="#reviews">Reviews</a>
          <a href="#about">About</a>
          <button type="button" className="btn btn-primary hero-cta" onClick={onStartEstimate}>
            Get a cost range
          </button>
        </nav>
      </div>

      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow">{site.hero.eyebrow}</p>
        <h1 className="hero-title">{site.hero.headline}</h1>
        <p className="hero-sub">{site.hero.subhead}</p>
      </div>
    </header>
  )
}
