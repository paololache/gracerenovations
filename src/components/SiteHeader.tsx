import { useState } from 'react'
import { NAV_ITEMS, routeHref, type Route } from '../lib/router'
import { Logo } from './Logo'
import './SiteHeader.css'

interface SiteHeaderProps {
  route: Route
  onStartEstimate: () => void
}

export function SiteHeader({ route, onStartEstimate }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

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
    onStartEstimate()
  }

  return (
    <div className="site-header">
      <a href={routeHref('home')} className="site-header-home" aria-label="Grace Building Co., home">
        <Logo />
      </a>

      <nav className="site-nav" aria-label="Primary">
        {links}
        <button type="button" className="btn btn-primary site-header-cta" onClick={startEstimate}>
          Get a cost range
        </button>
      </nav>

      <button
        type="button"
        className="site-menu-toggle"
        aria-expanded={menuOpen}
        aria-controls="site-mobile-menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? 'Close' : 'Menu'}
      </button>

      {menuOpen && (
        <nav id="site-mobile-menu" className="site-mobile-menu" aria-label="Mobile">
          {links}
          <button type="button" className="btn btn-primary" onClick={startEstimate}>
            Get a cost range
          </button>
        </nav>
      )}
    </div>
  )
}
