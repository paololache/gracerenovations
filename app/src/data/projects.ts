/**
 * PLACEHOLDER sample project cards — demonstrates the "Recent projects"
 * layout only. Not real completed jobs, addresses, or costs. Replace with
 * real projects/photos before this ships.
 */
export interface Project {
  id: string
  tag: string
  title: string
  description: string
  caption: string
}

export const featuredProject: Project = {
  id: 'sample-feature',
  tag: 'Kitchen',
  title: 'Sample project title',
  description: 'Short description of the scope, timeline and outcome goes here.',
  caption: 'Feature project photo',
}

export const secondaryProjects: Project[] = [
  {
    id: 'sample-1',
    tag: 'Bathroom',
    title: 'Sample project title',
    description: 'Short description of the scope, timeline and outcome goes here.',
    caption: 'Project photo',
  },
  {
    id: 'sample-2',
    tag: 'Roofing',
    title: 'Sample project title',
    description: 'Short description of the scope, timeline and outcome goes here.',
    caption: 'Project photo',
  },
]
