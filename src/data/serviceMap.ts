import { serviceArea } from './company'
import { projects, type Project } from './projects'

/**
 * Where each service-area town sits on the illustrated map (viewBox 600 × 500).
 * `labelLeft` puts a dot's label on its left, away from a neighbouring pin.
 */
const TOWN_POSITIONS: Record<string, { x: number; y: number; labelLeft?: boolean }> = {
  Millbrook: { x: 282, y: 262 },
  Westbrook: { x: 150, y: 190 },
  Ashford: { x: 438, y: 372 },
  Harlow: { x: 470, y: 128 },
  Kingsley: { x: 236, y: 414 },
  Brookfield: { x: 112, y: 382 },
  Fairview: { x: 330, y: 92, labelLeft: true },
  Stonebridge: { x: 540, y: 262 },
}

export const MAP_WIDTH = 600
export const MAP_HEIGHT = 500

/** The town our shop is in. */
export const OFFICE_TOWN = 'Millbrook'

export interface MapTown {
  name: string
  x: number
  y: number
  labelLeft?: boolean
  projects: Project[]
}

export const mapTowns: MapTown[] = serviceArea.map((name) => ({
  name,
  ...TOWN_POSITIONS[name],
  projects: projects.filter((p) => p.location === name),
}))
