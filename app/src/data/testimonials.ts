export interface Testimonial {
  id: string
  quote: string
  name: string
  meta: string
}

export const testimonials: Testimonial[] = [
  {
    id: 'marta',
    quote: 'The estimate they sent online was within nine hundred dollars of the final invoice.',
    name: 'Marta Ellis',
    meta: 'Kitchen, 2025',
  },
  {
    id: 'daniel',
    quote: 'Grace was the only one of four who showed us a finished bathroom our size with the price on it.',
    name: 'Daniel Okonkwo',
    meta: 'Bathroom, 2024',
  },
  {
    id: 'priya',
    quote: 'Five months in our house and it stayed liveable the whole time.',
    name: 'Priya Raman',
    meta: 'Addition, 2024',
  },
]

export const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
