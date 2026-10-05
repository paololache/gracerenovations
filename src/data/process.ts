export interface ProcessStep {
  number: string
  title: string
  text: string
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Tell us about your project',
    text: 'Call or submit the form with details about your kitchen, bathroom, sunroom & interior, painting, or renovation project.',
  },
  {
    number: '02',
    title: 'Schedule a free consultation',
    text: 'We review your goals, timeline, budget, and the work needed to bring the project together.',
  },
  {
    number: '03',
    title: 'Get a clear plan',
    text: 'We walk through the next steps so you know what to expect before work begins.',
  },
  {
    number: '04',
    title: 'Transform your space',
    text: 'Your renovation is handled with clear communication, practical workmanship, and respect for your home.',
  },
]
