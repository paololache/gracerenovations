export interface FaqItem {
  question: string
  answer: string
}

export const serviceFaqs: FaqItem[] = [
  {
    question: 'Do you take on small repairs?',
    answer:
      'Not usually. Our crew is scheduled in blocks of two weeks or more, so our smallest jobs are single bathrooms. We are happy to recommend a handyman we trust.',
  },
  {
    question: 'Can I supply my own fixtures or tile?',
    answer:
      'Yes. We credit the allowance back on the proposal. We only ask that materials are on site before the week they are scheduled for installation.',
  },
  {
    question: 'Do you work on older houses?',
    answer:
      'Most of our work is in homes built before 1960. We are EPA Lead-Safe Certified and price for plaster, knob-and-tube wiring and out-of-square framing up front.',
  },
  {
    question: 'Which towns do you cover?',
    answer: 'Millbrook, Westbrook, Ashford, Harlow and the surrounding county, roughly 30 minutes from our office on Mill Road.',
  },
]

export const processFaqs: FaqItem[] = [
  {
    question: 'How accurate is the online range?',
    answer:
      'Across the last 47 projects, the final invoice landed inside the online range 41 times. When it did not, it was because the visit uncovered something the questions could not, and we told you before signing.',
  },
  {
    question: 'What happens if you find something behind the walls?',
    answer:
      'Work on that area stops, we send photos and a priced change order the same day, and nothing continues until you sign it. Your proposal already includes a contingency line for this.',
  },
  {
    question: 'Can we live in the house during the work?',
    answer:
      'For kitchens and bathrooms, almost always. For whole-home work we plan phases so one bathroom and the bedrooms stay usable, or help you compare the cost of moving out.',
  },
  {
    question: 'Who pulls the permits?',
    answer: 'We do, in our name, and we are on site for every inspection. Permit fees are a separate line on your proposal.',
  },
  {
    question: 'Do we have to pay for the site visit?',
    answer: 'No. The visit and the proposal are free, and there is no obligation to sign.',
  },
]
