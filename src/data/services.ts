import type { PhotoRef } from '../components/Photo'

export interface Service {
  id: 'kitchen' | 'bathroom' | 'sunroom' | 'painting' | 'exterior' | 'remodeling' | 'roofing'
  number: string
  name: string
  /** Singular label used as a project tag, e.g. "Kitchen". */
  tag: string
  /** One line for the service cards. */
  description: string
  /** The heading on the services page; `accent` is set in the italic serif. */
  heading: { text: string; accent: string }
  longDescription: string
  benefits: string[]
  included: string[]
  whoFor: string[]
  cta: string
  photo: PhotoRef
}

export const services: Service[] = [
  {
    id: 'kitchen',
    number: '01',
    name: 'Kitchen Renovations',
    tag: 'Kitchen',
    description: 'Layout improvements, cabinets, counters, flooring, and finish work.',
    heading: { text: 'Kitchen renovations that make your home', accent: 'work better.' },
    longDescription:
      'Your kitchen should be functional, clean, and built around the way you use your home. We help homeowners improve outdated kitchens with renovation work focused on better layouts, cleaner finishes, and long-term usability.',
    benefits: [
      'Improve everyday function and flow',
      'Modernize finishes without losing character',
      'One contractor coordinating the project',
      'Clean, careful workmanship',
    ],
    included: [
      'Cabinet updates and replacements',
      'Countertop and surface improvements',
      'Flooring support',
      'Painting and finish work',
      'Fixtures, hardware, and detail work',
      'Practical layout improvements',
    ],
    whoFor: ['Homeowners updating a single kitchen', 'Owners preparing to sell', 'Homeowners refreshing a dated space'],
    cta: 'Start Your Kitchen Renovation',
    photo: { local: 'kitchen', alt: 'White shaker kitchen with a fluted farmhouse sink, stone-look backsplash and a gas range' },
  },
  {
    id: 'bathroom',
    number: '02',
    name: 'Bathroom Renovations',
    tag: 'Bathroom',
    description: 'Vanities, tile, flooring, fixtures, and clean finish work.',
    heading: { text: 'Bathroom renovations with', accent: 'clean finish work.' },
    longDescription:
      'Whether your bathroom needs a full refresh or targeted upgrades, Grace Renovations can help improve the look, comfort, and function of the space. From flooring and fixtures to finishes and detail work, the goal is a cleaner bathroom that fits your home.',
    benefits: [
      'Improve daily function and feel',
      'Clean, careful tile and finish work',
      'Updated fixtures and storage',
      'Practical solutions for tight spaces',
    ],
    included: [
      'Vanities',
      'Flooring',
      'Tile',
      'Fixtures',
      'Painting',
      'Drywall and finish repairs',
      'Shower and tub area updates',
    ],
    whoFor: ['Homeowners updating a primary bath', 'Guest or hall bath refreshes', 'Owners preparing to sell'],
    cta: 'Request a Bathroom Consultation',
    photo: { local: 'bathroom', alt: 'Bathroom with botanical wallpaper, a gold arched mirror, globe sconces and a dark vanity' },
  },
  {
    id: 'sunroom',
    number: '03',
    name: 'Sunrooms & Interiors',
    tag: 'Sunrooms & Interiors',
    description: 'Refresh and improve sunrooms and interiors for everyday comfort and use.',
    heading: { text: 'Sunrooms & interiors built for', accent: 'everyday use.' },
    longDescription:
      'Grace Renovations helps homeowners turn underused or outdated rooms into cleaner, more comfortable spaces. Whether it is a sunroom, living area, bedroom, or interior improvement project, we focus on practical updates and quality results.',
    benefits: [
      'Make an underused room actually usable',
      'Refresh finishes, flooring, and trim',
      'Improve comfort and visual appeal',
      'Practical improvements without overbuilding',
    ],
    included: [
      'Interior refresh and finishes',
      'Flooring updates',
      'Trim, paint, and drywall repair',
      'Fixture and hardware updates',
      'Cosmetic and functional improvements',
    ],
    whoFor: ['Homeowners with a dated sunroom or interior', 'Homeowners reclaiming an underused space'],
    cta: 'Talk About Your Sunroom or Interior',
    photo: { local: 'sunroom', alt: 'Sunroom with a green feature wall, white shiplap ceiling and a row of windows onto the garden' },
  },
  {
    id: 'painting',
    number: '04',
    name: 'Interior Painting',
    tag: 'Painting',
    description: 'Walls, trim, ceilings, and clean interior paint refreshes.',
    heading: { text: 'Interior painting that', accent: 'refreshes your home.' },
    longDescription:
      'Fresh paint can completely change how a room feels. Grace Renovations provides interior painting and finish work for homeowners who want clean walls, updated rooms, and a more polished final result.',
    benefits: [
      'Clean lines and careful prep',
      'Drop cloths, masking, and respect for your home',
      'Walls, trim, ceilings, and doors',
      'Color help when you want it',
    ],
    included: [
      'Wall painting',
      'Trim, doors, and baseboards',
      'Ceiling painting',
      'Drywall patch and prep',
      'Touch-ups around renovation work',
    ],
    whoFor: [
      'Homeowners refreshing a room',
      'Whole-home repaints before moving in',
      'Painting paired with other renovation work',
    ],
    cta: 'Request a Painting Estimate',
    photo: { local: 'painting', alt: 'Living room with slate-blue walls, white crown moulding, an arched doorway and oak floors' },
  },
  {
    id: 'exterior',
    number: '05',
    name: 'Interior & Exterior Renovations',
    tag: 'Interior & Exterior',
    description: 'Home improvement work inside and outside the home.',
    heading: { text: 'Interior & exterior renovations', accent: 'in Indianapolis.' },
    longDescription:
      'Get support with home improvement work inside and outside the home, from repairs and updates to larger renovation projects. We help homeowners across Central Indiana keep their property in great shape.',
    benefits: [
      'One contractor for inside and outside work',
      'Clear communication throughout',
      'Practical solutions for older homes',
      'Clean finish work and detail',
    ],
    included: [
      'Interior renovation and finish work',
      'Exterior repair and refresh',
      'Trim, doors, and detail carpentry',
      'Painting inside and out as part of projects',
      'Drywall, fixtures, and hardware',
    ],
    whoFor: ['Homeowners with mixed inside/outside projects', 'Owners updating a home in stages'],
    cta: 'Plan Your Project',
    photo: { local: 'deck', alt: 'New pressure-treated deck with a staircase and railings off the back of a home' },
  },
  {
    id: 'remodeling',
    number: '06',
    name: 'Remodeling & Home Improvements',
    tag: 'Remodeling',
    description: 'Bring outdated spaces back to life with practical upgrades.',
    heading: { text: 'Remodeling & home improvements', accent: 'that last.' },
    longDescription:
      'Bring outdated spaces back to life with remodeling support, finish work, repairs, and practical upgrades. Grace Renovations focuses on making your home feel finished, functional, and worth coming home to.',
    benefits: [
      'Update the spaces that matter most',
      'Combine repairs and improvements',
      'Clear scope and pricing direction',
      'Long-term improvement, not just patchwork',
    ],
    included: [
      'Room remodels and refreshes',
      'Finish carpentry and trim',
      'Flooring updates',
      'Paint and drywall',
      'Fixture and hardware upgrades',
    ],
    whoFor: ['Homeowners ready to refresh dated spaces', 'Owners combining multiple smaller projects'],
    cta: 'Start Your Remodel',
    photo: { local: 'exterior', alt: 'Screened garden room with grey-trimmed openings and a screen door' },
  },
  {
    id: 'roofing',
    number: '07',
    name: 'Roofing',
    tag: 'Roofing',
    description: 'Roof repairs and replacements that keep the rest of your home protected.',
    heading: { text: 'Roofing that protects', accent: 'everything below it.' },
    longDescription:
      'A sound roof protects every other improvement in your home. Grace Renovations handles roof repairs and replacements for homeowners across Central Indiana, with a clear plan before work starts, careful installation, and a clean site when the job is done.',
    benefits: [
      'Repair or replacement, explained plainly',
      'Clear scope and timeline before work starts',
      'Attention to flashing, vents, and edges',
      'One contractor for roof and renovation work',
    ],
    included: [
      'Roof inspections and assessments',
      'Shingle roof replacement',
      'Leak repairs',
      'Flashing, vents, and drip edge',
      'Gutters and downspouts',
      'Cleanup and debris removal',
    ],
    whoFor: [
      'Homeowners with an aging or leaking roof',
      'Owners preparing to sell',
      'Homeowners pairing a roof with other exterior work',
    ],
    cta: 'Request a Roofing Estimate',
    photo: { local: 'roofing-2', alt: 'Two-storey home with a new dark shingle roof, tan siding and black shutters' },
  },
]

/** Order of the services on the home page: the hero carousel and the services row follow it. */
export const homeServiceOrder: Service['id'][] = [
  'sunroom',
  'roofing',
  'remodeling',
  'exterior',
  'bathroom',
  'kitchen',
  'painting',
]

export const serviceName = (id: Service['id']) => services.find((s) => s.id === id)?.name ?? ''
