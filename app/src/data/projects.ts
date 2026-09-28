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
    photo: { id: '1600607687939-ce8a6c25118c', alt: 'Open-plan living area with wood feature wall and large windows' },
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
    photo: { id: '1600585152220-90363fe7e115', alt: 'White kitchen island with oak stools and black pendant lights' },
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
    photo: { id: '1584622650111-993a426fbf0a', alt: 'Glass walk-in shower with white tile and a wood vanity' },
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
    photo: { id: '1600566753190-17f0baa2a6c3', alt: 'Modern rear addition with timber cladding and black framed glass' },
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
    photo: { id: '1600489000022-c2086d79f9d4', alt: 'Kitchen with charcoal lower cabinets, white tile and open shelves' },
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
    photo: { id: '1620626011761-996317b8d101', alt: 'Freestanding white tub beside a window with plants' },
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
    photo: { id: '1628744448840-55bdb2497bd4', alt: 'Single-storey home exterior with cedar cladding and a flat roof' },
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
    photo: { id: '1600585154340-be6161a56a0c', alt: 'Modern house at dusk with a glass-walled ground floor facing the lawn' },
  },
]

export const featuredProject = projects[0]
export const secondaryProjects = projects.slice(1, 3)

export const formatCost = (n: number) => `$${n.toLocaleString('en-US')}`
