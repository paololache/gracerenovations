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

export function SiteHeader({ route, onConsult }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  // Transparent over the hero; the cream bar slides in once the page scrolls
  useHeaderWatch(headerRef, { offset: 80 })

  const links = NAV_ITEMS.map((item) => (
    <a
      key={item.route}
      href={routeHref(item.route)}
      className={route === item.route ? 'is-active' : undefined}
      aria-current={route === item.route ? 'page' : undefined}
      onClick={() => setMenuOpen(false)}
    >
      {item.label}
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
          {NAV_ITEMS.map((item) => (
            <a
              key={item.route}
              href={routeHref(item.route)}
              className="fx-underline fx-underline--draw"
              aria-current={route === item.route ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
          <a className="site-header-phone" href={company.phoneHref}>
            {company.phone}
          </a>
          <button type="button" className="btn btn-primary site-header-cta" onClick={startEstimate}>
            Get a Quote
          </button>
        </nav>

        <button
          type="button"
          className="site-menu-toggle"
          data-fx-step="3"
          aria-expanded={menuOpen}
          aria-controls="site-mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>

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
