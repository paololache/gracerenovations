export interface Service {
  id: 'kitchen' | 'bathroom' | 'sunroom' | 'painting' | 'roofing'
  number: string
  name: string
  description: string
  imageCaption: string
  /**
   * PLACEHOLDER internal estimation range in dollars, used only by the quote
   * calculator's ballpark math — never shown as a public price on the page.
   * Replace with real figures from the business before this ships; these
   * are not sourced from gracerenovationsgroup.com.
   */
  priceRange: [number, number]
}

export const services: Service[] = [
  {
    id: 'kitchen',
    number: '01',
    name: 'Kitchens',
    description: 'Cabinetry, counters, plumbing moves and lighting, planned around how the space is actually used.',
    imageCaption: 'Finished kitchen renovation',
    priceRange: [18000, 55000],
  },
  {
    id: 'bathroom',
    number: '02',
    name: 'Bathrooms',
    description: 'Full gut to tile, waterproofing and fixtures — from a guest bath refresh to a primary suite.',
    imageCaption: 'Finished bathroom renovation',
    priceRange: [9000, 28000],
  },
  {
    id: 'sunroom',
    number: '03',
    name: 'Sunrooms',
    description: 'Three- and four-season additions that bring in light without losing the house’s lines.',
    imageCaption: 'Sunroom addition',
    priceRange: [25000, 90000],
  },
  {
    id: 'painting',
    number: '04',
    name: 'Painting',
    description: 'Interior and exterior painting with prep work that holds up — patching, priming, trim.',
    imageCaption: 'Interior or exterior painting',
    priceRange: [2500, 12000],
  },
  {
    id: 'roofing',
    number: '05',
    name: 'Roofing',
    description: 'Repairs and full replacements, with attention to flashing and ventilation, not just shingles.',
    imageCaption: 'Roofing project',
    priceRange: [7000, 22000],
  },
]
