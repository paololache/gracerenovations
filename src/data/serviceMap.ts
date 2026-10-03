import { serviceArea } from './company'

/**
 * Where each service-area town sits on the illustrated map (viewBox 600 × 500).
 * Relative positions follow the real geography around Indianapolis; not to scale.
 * `labelLeft` puts a label on the dot's left, away from a neighbour.
 */
const TOWN_POSITIONS: Record<string, { x: number; y: number; labelLeft?: boolean }> = {
  Indianapolis: { x: 330, y: 300 },
  Speedway: { x: 236, y: 292, labelLeft: true },
  Brownsburg: { x: 108, y: 238 },
  Carmel: { x: 318, y: 112 },
  Fishers: { x: 462, y: 138 },
}

export const MAP_WIDTH = 600
export const MAP_HEIGHT = 500

/** The town our office is in. */
export const OFFICE_TOWN = 'Indianapolis'

export interface MapTown {
  name: string
  x: number
  y: number
  labelLeft?: boolean
}

export const mapTowns: MapTown[] = serviceArea
  .filter((name) => TOWN_POSITIONS[name])
  .map((name) => ({ name, ...TOWN_POSITIONS[name] }))
