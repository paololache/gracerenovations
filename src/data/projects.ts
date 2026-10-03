import type { PhotoRef } from '../components/Photo'
import type { Service } from './services'

/**
 * Finished work, shown with Grace's own photos. Only what the photos and the
 * current site's project notes support: no invented clients, prices or dates.
 */
export interface Project {
  id: string
  serviceId: Service['id']
  title: string
  summary: string
  scope: string[]
  photos: PhotoRef[]
  /** Optional walkthrough of how the job went, step by step. */
  steps?: { title: string; text: string }[]
}

export const projects: Project[] = [
  {
    id: 'full-kitchen',
    serviceId: 'kitchen',
    title: 'Full kitchen remodel, design to finish',
    summary:
      'A dated kitchen rebuilt from a 3D design — down to the joists and original brick, then new shaker cabinets, quartz counters, tile backsplash, and new flooring.',
    scope: [
      'White shaker uppers and bases, set and leveled',
      'Apron-front farmhouse sink',
      'Quartz counters and marble-look tile backsplash',
      'Stainless chimney hood and appliances',
      'New flooring, recessed lighting, matte black fixtures',
    ],
    photos: [
      { local: 'kitchen', alt: 'White shaker kitchen with a fluted farmhouse sink, stone-look backsplash and a gas range' },
      { local: 'hero-kitchen', alt: 'The same kitchen from the refrigerator wall, with a stainless French-door fridge' },
    ],
    steps: [
      { title: '3D design & layout', text: 'Cabinet placement, the farmhouse sink wall, and appliance runs planned before anything is ordered.' },
      { title: 'Demo & structure', text: 'Old walls, ceiling, and finishes out to the joists and original brick; new framing and drywall.' },
      { title: 'Cabinets & sink', text: 'Shaker cabinets set and leveled, the farmhouse sink dry-fit ahead of the countertop template.' },
      { title: 'Counters & finish', text: 'Quartz counters, tile run to the ceiling behind the range, hood, flooring, and lighting.' },
    ],
  },
  {
    id: 'wallpaper-bath',
    serviceId: 'bathroom',
    title: 'Bathroom refresh with botanical wallpaper',
    summary: 'A bathroom brought back to life with a statement wallpaper wall, warm brass fixtures, and new lighting.',
    scope: ['Botanical wallpaper feature wall', 'Gold arched mirror and globe sconces', 'Brushed brass faucet', 'Dark vanity with brass pulls'],
    photos: [{ local: 'bathroom', alt: 'Bathroom with botanical wallpaper, a gold arched mirror, globe sconces and a dark vanity' }],
  },
  {
    id: 'green-sunroom',
    serviceId: 'sunroom',
    title: 'Sunroom made for everyday use',
    summary: 'A bright sunroom finished with a shiplap ceiling, a deep green feature wall, and wood-look flooring.',
    scope: ['White shiplap vaulted ceiling', 'Wood-framed clerestory windows', 'Green feature wall and white trim', 'Wood-look flooring', 'Ceiling fan with light'],
    photos: [{ local: 'sunroom', alt: 'Sunroom with a green feature wall, white shiplap ceiling and a row of windows onto the garden' }],
  },
  {
    id: 'slate-living-room',
    serviceId: 'painting',
    title: 'Living room repaint',
    summary: 'Walls in a deep slate blue, crisp white trim and crown moulding, and an arched doorway picked out in white.',
    scope: ['Slate-blue walls', 'White crown moulding, chair rail, and baseboards', 'Arched doorway trim', 'Clean lines against original oak floors'],
    photos: [{ local: 'painting', alt: 'Living room with slate-blue walls, white crown moulding, an arched doorway and oak floors' }],
  },
  {
    id: 'screened-room',
    serviceId: 'remodeling',
    title: 'Screened garden room',
    summary: 'A backyard room with screened openings, a screen door, and a pet door, finished in cream siding with grey trim.',
    scope: ['Framed screened openings', 'Screen door and pet door', 'Cream panel siding with grey trim', 'Covered roof and lighting'],
    photos: [{ local: 'exterior', alt: 'Screened garden room with grey-trimmed openings and a screen door' }],
  },
  {
    id: 'backyard-deck',
    serviceId: 'exterior',
    title: 'Raised backyard deck',
    summary: 'A new pressure-treated deck off the back of the home, with a full staircase down to the yard.',
    scope: ['Pressure-treated framing and decking', 'Full-height staircase to the yard', 'Railings and balusters all around'],
    photos: [{ local: 'deck', alt: 'New pressure-treated deck with a staircase and railings off the back of a home' }],
  },
]

export const featuredProject = projects[0]
export const secondaryProjects = projects.slice(1, 3)
export const projectById = (id: string) => projects.find((p) => p.id === id)
