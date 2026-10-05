import type { PhotoRef } from '../components/Photo'

/**
 * Content for the roofing page. Only what the current site already says about
 * the service: no invented warranties, certifications, brands or prices.
 */

export interface MethodStep {
  title: string
  text: string
  photo: PhotoRef
  /** Stock photo standing in for the step, labelled as such on the page. */
  illustrative?: boolean
}

export const roofingMethod: MethodStep[] = [
  {
    title: 'Free roof consultation',
    text: 'We look at the shingles, flashing, vents, and gutters, and listen to what you have noticed: leaks, missing shingles, stains, or simply an older roof.',
    photo: { id: '1635424709961-f3a150459ad4', alt: 'Roofer in a safety harness checking shingles up close' },
    illustrative: true,
  },
  {
    title: 'A clear plan before work starts',
    text: 'Repair or replacement, explained plainly. You get the scope, what is included, and the timeline before anything is torn off.',
    photo: { id: '1635424709845-3a85ad5e1f5e', alt: 'Two roofers measuring a shingle roof with a tape' },
    illustrative: true,
  },
  {
    title: 'Protect the home, remove the old roof',
    text: 'The area around the house is protected, then the old shingles come off down to the roof deck, so nothing new goes on top of a problem.',
    photo: { id: '1633759593085-1eaeb724fc88', alt: 'Roofer tearing off old shingles from a house' },
    illustrative: true,
  },
  {
    title: 'Materials on the roof, deck checked',
    text: 'New materials go up and the deck is checked as the roof opens, so any damaged areas are pointed out and handled before installation.',
    photo: { id: '1643225523483-e2c434191bba', alt: 'Roofer carrying a bundle of shingles across a roof' },
    illustrative: true,
  },
  {
    title: 'Careful installation',
    text: 'Underlayment, flashing, vents, drip edge, and new shingles, with attention to every ridge, valley, and edge where leaks usually start.',
    photo: { id: '1635424825057-7fb6dcd651ef', alt: 'Roofer fastening new shingles with a nail gun' },
    illustrative: true,
  },
  {
    title: 'Clean site and final walkthrough',
    text: 'Debris is cleared from the roof, gutters, and yard, and we walk the finished roof with you before the job is closed out.',
    photo: { local: 'roofing-2', alt: 'Finished two-storey home with a dark shingle roof by our crew' },
  },
]

export const roofingReasons: { title: string; text: string }[] = [
  { title: 'Local since 2018', text: 'Based in Indianapolis and working on homes across Central Indiana.' },
  { title: 'Free consultation', text: 'A no-pressure look at your roof and an honest answer: repair or replace.' },
  { title: 'A plan you can read', text: 'Clear scope and timeline before work starts, so there are no surprises.' },
  { title: 'Details that stop leaks', text: 'Attention to flashing, vents, and edges, the places most roofs fail first.' },
  { title: 'A clean site', text: 'Cleanup and debris removal are part of the job, not an extra.' },
  { title: 'One contractor', text: 'Roofing, exteriors, and renovations with the same crew you can call directly.' },
]

export const roofingFacts = [
  { value: 'Since 2018', label: 'Serving Central Indiana' },
  { value: 'Free', label: 'Roof consultation' },
  { value: 'Repair', label: 'Or full replacement' },
]
