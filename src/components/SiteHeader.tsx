import { useRef, useState } from 'react'
import { company } from '../data/company'
import { useHeaderWatch } from '../effects'
import { NAV_ITEMS, routeHref, type Route } from '../lib/router'
import { Logo } from './Logo'
import './SiteHeader.css'

interface SiteHeaderProps {
  route: Route
  onConsult: () => void
}

/** Small house-and-roof mark for the roofing button. */
function RoofIcon() {
  return (
    <svg className="roof-icon" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
      <path
        d="M2.5 11.5 12 4l9.5 7.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5.5 10v9.5h13V10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}

export function SiteHeader({ route, onConsult }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  // Transparent over the hero; the cream bar slides in once the page scrolls
  useHeaderWatch(headerRef, { offset: 80 })

  const links = NAV_ITEMS.map((item) => (
    <a
      key={item.route}
      href={routeHref(item.route)}
      className={[route === item.route && 'is-active', item.route === 'roofing' && 'site-mobile-roofing']
        .filter(Boolean)
        .join(' ')}
      aria-current={route === item.route ? 'page' : undefined}
      onClick={() => setMenuOpen(false)}
    >
      {item.route === 'roofing' ? (
        <>
          <RoofIcon /> {item.label}
          <small>Our roofing line</small>
        </>
      ) : (
        item.label
      )}
    </a>
  ))

  const startEstimate = () => {
    setMenuOpen(false)
    onConsult()
  }

  return (
    <header className="site-header fx-header" ref={headerRef}>
      <div className="site-header-inner">
        <a href={routeHref('home')} className="site-header-home" aria-label="Grace Renovations, home" data-fx-step="1">
          <Logo />
        </a>

        <nav className="site-nav" aria-label="Primary" data-fx-step="2">
          {NAV_ITEMS.map((item) =>
            // Roofing is its own line of business: an outlined orange pill, not a plain link
            item.route === 'roofing' ? (
              <a
                key={item.route}
                href={routeHref(item.route)}
                className="site-nav-roofing"
                aria-current={route === item.route ? 'page' : undefined}
              >
                <RoofIcon />
                {item.label}
              </a>
            ) : (
              <a
                key={item.route}
                href={routeHref(item.route)}
                className="fx-underline fx-underline--draw"
                aria-current={route === item.route ? 'page' : undefined}
              >
                {item.label}
              </a>
            ),
          )}
          <a className="site-header-phone" href={company.phoneHref}>
            {company.phone}
          </a>
          <button type="button" className="btn btn-primary site-header-cta" onClick={startEstimate}>
            Get a Quote
          </button>
        </nav>

        <div className="site-header-compact" data-fx-step="3">
          {/* Tablets: the nav is folded away, so the roofing pill stays out beside the menu button */}
          <a
            href={routeHref('roofing')}
            className="site-nav-roofing site-header-compact-roofing"
            aria-current={route === 'roofing' ? 'page' : undefined}
          >
            <RoofIcon />
            Roofing
          </a>
          <button
            type="button"
            className="site-menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="site-mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>

        {menuOpen && (
          <nav id="site-mobile-menu" className="site-mobile-menu" aria-label="Mobile">
            {links}
            <a href={company.phoneHref}>Call {company.phone}</a>
            <a href={company.emailHref}>{company.email}</a>
            <button type="button" className="btn btn-primary" onClick={startEstimate}>
              Get a Quote
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}
