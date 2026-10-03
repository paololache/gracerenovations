import type { PhotoRef } from '../components/Photo'
import type { Service } from './services'

export interface Project {
  id: string
  serviceId: Service['id']
  title: string
  location: string
  year: number
  duration: string
  cost: number
  description: string
  photo: PhotoRef
}

export const projects: Project[] = [
  {
    id: 'brimfield',
    serviceId: 'whole-home',
    title: 'Brimfield Street, 1948 colonial',
    location: 'Westbrook',
    year: 2025,
    duration: 'Five months',
    cost: 214000,
    description: 'Rear wall opened, kitchen relocated, all systems replaced.',
    photo: { local: 'painting', alt: 'Living room with slate-blue walls, white crown moulding, an arched doorway and refinished oak floors' },
  },
  {
    id: 'oak-street',
    serviceId: 'kitchen',
    title: 'Oak Street',
    location: 'Millbrook',
    year: 2025,
    duration: 'Six weeks',
    cost: 34200,
    description: 'Wall removed, island added, wiring replaced.',
    photo: { local: 'kitchen', alt: 'White shaker kitchen with a fluted farmhouse sink, stone-look backsplash and a gas range' },
  },
  {
    id: 'delmar',
    serviceId: 'bathroom',
    title: 'Delmar guest bath',
    location: 'Ashford',
    year: 2025,
    duration: 'Three weeks',
    cost: 11800,
    description: 'Tub to walk-in shower, new vent and tile.',
    photo: { local: 'bathroom-2', alt: 'Bathroom with a frameless glass shower, black fixtures and a floating oak vanity' },
  },
  {
    id: 'maple-ridge',
    serviceId: 'addition',
    title: 'Maple Ridge rear addition',
    location: 'Westbrook',
    year: 2025,
    duration: 'Four and a half months',
    cost: 148000,
    description: 'Two-storey rear addition with a family room below and a primary suite above.',
    photo: { local: 'sunroom', alt: 'Sunroom addition with a green feature wall, white shiplap ceiling and a row of windows onto the garden' },
  },
  {
    id: 'hawthorne',
    serviceId: 'kitchen',
    title: 'Hawthorne Avenue kitchen',
    location: 'Ashford',
    year: 2024,
    duration: 'Seven weeks',
    cost: 41600,
    description: 'Galley opened to the dining room, painted cabinetry and open shelving.',
    photo: { local: 'hero-kitchen', alt: 'Kitchen with white shaker cabinets, a stainless French-door fridge and wood-look floors' },
  },
  {
    id: 'linden',
    serviceId: 'bathroom',
    title: 'Linden Court primary bath',
    location: 'Millbrook',
    year: 2024,
    duration: 'Four weeks',
    cost: 24900,
    description: 'Closet borrowed for a freestanding tub, heated floor and double vanity.',
    photo: { local: 'bathroom', alt: 'Bathroom with botanical wallpaper, a gold arched mirror, globe sconces and a dark vanity' },
  },
  {
    id: 'willow',
    serviceId: 'whole-home',
    title: 'Willow Street craftsman',
    location: 'Harlow',
    year: 2024,
    duration: 'Four months',
    cost: 127000,
    description: 'Knob-and-tube wiring removed, floors refinished, new kitchen and two baths.',
    photo: { id: '1600121848594-d8644e57abab', alt: 'Living room with grey sofas, built-in shelving and a pendant light' },
  },
  {
    id: 'cedar-lane',
    serviceId: 'addition',
    title: 'Cedar Lane second floor',
    location: 'Harlow',
    year: 2024,
    duration: 'Six months',
    cost: 186500,
    description: 'Ranch house lifted to two storeys, three bedrooms and a bath added.',
    photo: { local: 'roofing-2', alt: 'Two-storey home with tan siding, black shutters and a two-car garage' },
  },
  {
    id: 'birch-hollow',
    serviceId: 'kitchen',
    title: 'Birch Hollow kitchen',
    location: 'Westbrook',
    year: 2023,
    duration: 'Seven weeks',
    cost: 52300,
    description: 'Range wall rebuilt around a new hood, eight-foot island, butler pantry.',
    photo: { id: '1507089947368-19c1da9775ae', alt: 'White kitchen with a long island, glass pendants and a range hood' },
  },
  {
    id: 'garfield',
    serviceId: 'bathroom',
    title: 'Garfield hall bath',
    location: 'Ashford',
    year: 2023,
    duration: 'Two and a half weeks',
    cost: 16400,
    description: 'Wall-hung toilet and vanity, large-format porcelain, slatted oak niche.',
    photo: { id: '1631889993959-41b4e9c6e3c5', alt: 'Contemporary bathroom with large grey tiles and slatted wood panel' },
  },
  {
    id: 'elm-terrace',
    serviceId: 'whole-home',
    title: 'Elm Terrace timber cottage',
    location: 'Millbrook',
    year: 2023,
    duration: 'Three months',
    cost: 96800,
    description: 'Original beams exposed, loft stair rebuilt, kitchen and insulation replaced.',
    photo: { id: '1590725140246-20acdee442be', alt: 'Cottage interior with exposed timber beams and an open kitchen' },
  },
  {
    id: 'pinecrest',
    serviceId: 'addition',
    title: 'Pinecrest garden room',
    location: 'Harlow',
    year: 2023,
    duration: 'Four months',
    cost: 72400,
    description: 'Glass-walled family room on a new slab, opening onto the back garden.',
    photo: { local: 'exterior', alt: 'Screened garden room with grey-trimmed openings and a screen door, built on a new slab' },
  },
]

export const featuredProject = projects[0]
export const secondaryProjects = projects.slice(1, 3)

export const formatCost = (n: number) => `$${n.toLocaleString('en-US')}`
