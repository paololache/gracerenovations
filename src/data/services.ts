import type { PhotoRef } from '../components/Photo'

export interface Service {
  id: 'kitchen' | 'bathroom' | 'whole-home' | 'addition'
  number: string
  name: string
  /** Singular label used as a project tag, e.g. "Kitchen". */
  tag: string
  description: string
  longDescription: string
  priceLabel: string
  timeline: string
  included: string[]
  photo: PhotoRef
  /** Internal estimation range in dollars, used by the quote calculator.
   *  Whole-home's public price label is open-ended ("$85k+"); the upper
   *  bound here is only for sizing the calculator's output. */
  priceRange: [number, number]
}

export const services: Service[] = [
  {
    id: 'kitchen',
    number: '01',
    name: 'Kitchens',
    tag: 'Kitchen',
    description: 'Cabinetry, counters, plumbing moves and lighting. Four to seven weeks on site.',
    longDescription:
      'Most of our kitchens start with a wall that should not be there. We move plumbing and gas, rewire to current code, and install cabinetry our own carpenters level and scribe. A temporary kitchen goes in on day one so you can still cook.',
    priceLabel: '$18k–$55k',
    timeline: '4–7 weeks on site',
    included: [
      'Layout design and 3D walkthrough',
      'Wall removal with engineered beams',
      'Plumbing, gas and electrical relocation',
      'Custom or semi-custom cabinetry install',
      'Stone, quartz or butcher-block counters',
      'Recessed, pendant and under-cabinet lighting',
    ],
    photo: {
      local: 'hero-kitchen',
      alt: 'Kitchen with white shaker cabinets and a farmhouse sink under twin windows',
    },
    priceRange: [18000, 55000],
  },
  {
    id: 'bathroom',
    number: '02',
    name: 'Bathrooms',
    tag: 'Bathroom',
    description: 'Full gut to tile, waterproofing and fixtures. Two to four weeks on site.',
    longDescription:
      'Bathrooms fail behind the tile, so that is where we spend the money. Every shower gets a bonded waterproofing membrane and a flood test before tile goes on. We replace venting to the outside, not into the attic.',
    priceLabel: '$9k–$28k',
    timeline: '2–4 weeks on site',
    included: [
      'Demolition down to studs and subfloor',
      'Waterproofing membrane with 24-hour flood test',
      'Tub-to-shower conversions and curbless entries',
      'Tile, vanity, fixtures and glass',
      'Exhaust fans ducted outside',
      'Heated floors on request',
    ],
    photo: {
      local: 'bathroom',
      alt: 'Bathroom with botanical wallpaper, a gold arched mirror and a dark vanity',
    },
    priceRange: [9000, 28000],
  },
  {
    id: 'whole-home',
    number: '03',
    name: 'Whole homes',
    tag: 'Whole home',
    description: 'Layout changes, structure, systems and finishes under one contract.',
    longDescription:
      'One contract, one schedule, one project lead from demolition to the final walkthrough. We phase whole-home work so at least one bathroom and a place to sleep stay usable, or plan the move-out with you if that is cheaper.',
    priceLabel: '$85k+',
    timeline: '3–7 months on site',
    included: [
      'Architectural and structural drawings',
      'Open-plan conversions and load-bearing changes',
      'Full electrical, plumbing and HVAC replacement',
      'Insulation and air sealing to current code',
      'Flooring, trim, doors and paint throughout',
      'Phased schedule so the house stays liveable',
    ],
    photo: {
      local: 'painting',
      alt: 'Living room with slate-blue walls, an arched doorway and refinished oak floors',
    },
    priceRange: [85000, 260000],
  },
  {
    id: 'addition',
    number: '04',
    name: 'Additions',
    tag: 'Addition',
    description: 'Permits, foundation and framing for extra rooms or a second floor.',
    longDescription:
      'We handle the zoning board, the surveyor and the engineer so you do not have to. Foundations, framing, roofing and tie-in to the existing house are all done by our crew, and the new rooms are finished to match the old ones.',
    priceLabel: '$60k–$190k',
    timeline: '4–8 months incl. permits',
    included: [
      'Zoning review, survey and permit filings',
      'Foundation, framing and roofing',
      'Second-story and rear additions',
      'Seamless tie-in of siding and rooflines',
      'Heating and cooling for the new space',
      'Interior finishes matched to the house',
    ],
    photo: {
      local: 'sunroom-2',
      alt: 'Sunroom with vaulted ceiling and walls of windows facing the trees',
    },
    priceRange: [60000, 190000],
  },
]

export const otherTrades: { name: string; description: string }[] = [
  { name: 'Electrical', description: 'Panel upgrades, rewiring and EV chargers by our licensed electrician.' },
  { name: 'Plumbing', description: 'Repiping, water heaters and fixture moves, inspected before walls close.' },
  { name: 'Flooring', description: 'Hardwood install and refinishing, tile and luxury vinyl plank.' },
  { name: 'Painting', description: 'Interior and exterior, with lead-safe practices on pre-1978 homes.' },
  { name: 'Windows & doors', description: 'Replacement windows, exterior doors and new openings in bearing walls.' },
  { name: 'Drawings & permits', description: 'Measured drawings, engineering and every permit filed in our name.' },
]
