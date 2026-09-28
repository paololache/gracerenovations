import { useEffect, useState } from 'react'

export type Route = 'home' | 'services' | 'projects' | 'about' | 'how-we-work'

export const NAV_ITEMS: { route: Route; label: string }[] = [
  { route: 'home', label: 'Home' },
  { route: 'services', label: 'Services' },
  { route: 'projects', label: 'Projects' },
  { route: 'about', label: 'About us' },
  { route: 'how-we-work', label: 'How we work' },
]

export const PAGE_TITLES: Record<Route, string> = {
  home: 'Grace Building Co.',
  services: 'Services — Grace Building Co.',
  projects: 'Projects — Grace Building Co.',
  about: 'About us — Grace Building Co.',
  'how-we-work': 'How we work — Grace Building Co.',
}

/** Props every page receives from the app shell. */
export interface PageProps {
  onStartEstimate: () => void
  onOpenStory: (projectId: string) => void
  /** Opens the free-estimate lead form. */
  onRequestEstimate: () => void
}

const ROUTES = NAV_ITEMS.map((item) => item.route)

function parse(hash: string): Route {
  const path = hash.replace(/^#\/?/, '')
  return ROUTES.find((r) => r === path) ?? 'home'
}

export const routeHref = (route: Route) => (route === 'home' ? '#/' : `#/${route}`)

/** Minimal hash router — the site is static, so no router dependency. */
export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parse(window.location.hash))

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parse(window.location.hash))
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return route
}
