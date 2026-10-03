import { useEffect, useState } from 'react'

export type Route = 'home' | 'services' | 'gallery' | 'about' | 'contact'

export const NAV_ITEMS: { route: Route; label: string }[] = [
  { route: 'home', label: 'Home' },
  { route: 'services', label: 'Services' },
  { route: 'gallery', label: 'Gallery' },
  { route: 'about', label: 'About' },
  { route: 'contact', label: 'Contact' },
]

export const PAGE_TITLES: Record<Route, string> = {
  home: 'Grace Renovations LLC - Indiana | Kitchen, Bathroom & Home Renovations',
  services: 'Renovation Services | Grace Renovations Indianapolis',
  gallery: 'Gallery | Grace Renovations Indianapolis',
  about: 'About Grace Renovations LLC - Indiana | Indianapolis Renovation Contractor',
  contact: 'Schedule a Free Consultation | Grace Renovations Indianapolis',
}

/** Props every page receives from the app shell. */
export interface PageProps {
  /** Opens the free consultation form. */
  onConsult: () => void
  onOpenProject: (projectId: string) => void
}

const ROUTES = NAV_ITEMS.map((item) => item.route)

function parse(hash: string): Route {
  const path = hash.replace(/^#\/?/, '').split('/')[0]
  return ROUTES.find((r) => r === path) ?? 'home'
}

export const routeHref = (route: Route) => (route === 'home' ? '#/' : `#/${route}`)

/** Link to one service's section on the services page. */
export const serviceHref = (serviceId: string) => `#/services/${serviceId}`

/** Minimal hash router — the site is static, so no router dependency. */
export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parse(window.location.hash))

  useEffect(() => {
    const onHashChange = () => {
      const next = parse(window.location.hash)
      setRoute(next)
      // #/services/<id> scrolls to that service once the page has rendered
      const anchor = window.location.hash.split('/')[2]
      if (anchor) requestAnimationFrame(() => document.getElementById(`service-${anchor}`)?.scrollIntoView())
      else window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return route
}
