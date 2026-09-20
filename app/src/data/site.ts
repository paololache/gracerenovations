/**
 * Central place for business facts the page depends on. Everything here is
 * PLACEHOLDER pending the real gracerenovationsgroup.com / Facebook content
 * (blocked by this environment's network policy — see conversation).
 * Replace this whole file once that data is available; nothing downstream
 * should need to change beyond this file.
 */
export const site = {
  businessName: 'Grace Renovations',
  phone: '(555) 210-4488',
  phoneHref: 'tel:+15552104488',
  email: 'hello@gracerenovations.com',
  address: {
    line1: '418 Mill Road, Suite 2',
    hours: 'Mon–Fri, 7am–5pm',
  },
  /** A contractor license number is a regulatory claim — never fabricate
   *  one. Leave null (hidden in the footer) until the real number is known. */
  license: null as string | null,
  hero: {
    eyebrow: 'Kitchens · Bathrooms · Sunrooms · Painting · Roofing',
    headline: 'Renovations done right, without the surprises.',
    subhead:
      'Home improvement pros for kitchens, bathrooms, sunrooms, painting and roofing. Get a free, no-obligation estimate before any work starts.',
  },
  /** Shown in the About section. Not sourced from the real business yet. */
  stats: [
    { value: '—', label: 'Founded' },
    { value: '—', label: 'Projects completed' },
    { value: '—', label: 'On the crew' },
  ],
}
