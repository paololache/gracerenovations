import type { PhotoRef } from '../components/Photo'

export interface ProcessStep {
  number: string
  title: string
  timing: string
  summary: string
  detail: string
  deliverable: string
  photo: PhotoRef
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Online range',
    timing: '2 minutes',
    summary: 'Six questions give you a cost range drawn from our published invoices.',
    detail:
      'Tell us what you want built, how big it is and when you want to start. The range comes from 47 real invoices, not a sales script, and nobody calls you unless you ask.',
    deliverable: 'A written cost range by email',
    photo: { id: '1581092160562-40aa08e78837', alt: 'Floor plans spread on a table with a tape measure and toolbox' },
  },
  {
    number: '02',
    title: 'Site visit',
    timing: 'Within a week',
    summary: 'The project lead who will run your job measures, photographs and listens.',
    detail:
      'A free, one-hour visit. We open the panel, look in the basement and the attic, and tell you on the spot if something will push the price outside your range.',
    deliverable: 'Visit notes and photos',
    photo: { id: '1530124566582-a618bc2615dc', alt: 'Rows of hand tools hanging in a work van' },
  },
  {
    number: '03',
    title: 'Fixed proposal',
    timing: '7 days after visit',
    summary: 'A line-item, fixed-price proposal with every allowance spelled out.',
    detail:
      'Labour, materials, permits and a contingency line, each priced separately. Allowances for tile, fixtures and appliances are listed with the exact products they assume.',
    deliverable: 'Signed proposal and payment schedule',
    photo: { id: '1504307651254-35680f356dfd', alt: 'Aerial view of a crew working on a construction site' },
  },
  {
    number: '04',
    title: 'Design & permits',
    timing: '2–6 weeks',
    summary: 'Drawings, selections and permits filed in our name before demolition.',
    detail:
      'We draw it, you pick finishes in one showroom visit, and we file with the town. You get a day-by-day schedule before anything comes out of the house.',
    deliverable: 'Permit set and written schedule',
    photo: { id: '1517581177682-a085bb7ffb15', alt: 'Interior stripped back to brick and framing during demolition' },
  },
  {
    number: '05',
    title: 'Build',
    timing: 'As scheduled',
    summary: 'The same crew every day, with a written update every Friday.',
    detail:
      'Dust walls and floor protection go up on day one. Every Friday you get photos, what was done, what is next, and a budget tracker showing any change orders you approved.',
    deliverable: 'Weekly report with photos and budget',
    photo: { id: '1621905251189-08b45d6a269e', alt: 'Electrician in a hard hat wiring a panel' },
  },
  {
    number: '06',
    title: 'Walkthrough & warranty',
    timing: 'Final week',
    summary: 'Punch list, final invoice matched to the proposal, two-year warranty.',
    detail:
      'We walk every room with you and fix the list before the last payment. With your permission, the photos and final invoice join our published projects.',
    deliverable: 'Final invoice and 2-year workmanship warranty',
    photo: { id: '1574359411659-15573a27fd0c', alt: 'Painters on ladders finishing the exterior of a house' },
  },
]

export const paymentSchedule: { share: string; milestone: string }[] = [
  { share: '10%', milestone: 'At signing, to order long-lead materials' },
  { share: '30%', milestone: 'On the first day of work' },
  { share: '30%', milestone: 'After rough-in inspections pass' },
  { share: '25%', milestone: 'At substantial completion' },
  { share: '5%', milestone: 'After the punch list is closed' },
]

export const commitments: { title: string; description: string }[] = [
  { title: 'Fixed price', description: 'The number on the proposal is the number you pay, unless you change the scope.' },
  { title: 'Written schedule', description: 'Start date, milestones and finish date on paper before demolition.' },
  { title: 'Change orders first', description: 'No extra work begins until you have signed a priced change order.' },
  { title: 'One project lead', description: 'The person who priced your job runs it and answers your calls.' },
  { title: 'Clean site daily', description: 'Swept floors, covered openings and tools stored every evening.' },
  { title: 'Two-year warranty', description: 'Workmanship covered for two years, waterproofing for ten.' },
]
