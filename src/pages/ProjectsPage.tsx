import { useState } from 'react'
import { GoogleReviews } from '../components/GoogleReviews'
import { PageHero } from '../components/PageHero'
import { ProjectCard } from '../components/ProjectCard'
import { QuoteBanner } from '../components/QuoteBanner'
import { SuccessStoriesGrid } from '../components/SuccessStories'
import { projects } from '../data/projects'
import { services, type Service } from '../data/services'
import { stories } from '../data/stories'
import type { PageProps } from '../lib/router'
import './ProjectsPage.css'

type Filter = Service['id'] | 'all'

const FEATURED_STORY_IDS = ['brimfield', 'oak-street', 'cedar-lane', 'delmar']
const featuredStories = stories.filter((s) => FEATURED_STORY_IDS.includes(s.projectId))

const summary = [
  { value: '47', label: 'Projects published' },
  { value: '$9k–$214k', label: 'Range of final invoices' },
  { value: '41 of 47', label: 'Landed inside the online range' },
]

export function ProjectsPage({ onOpenStory, onRequestEstimate }: PageProps) {
  const [filter, setFilter] = useState<Filter>('all')
  const visible = filter === 'all' ? projects : projects.filter((p) => p.serviceId === filter)

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: projects.length },
    ...services.map((s) => ({
      id: s.id,
      label: s.name,
      count: projects.filter((p) => p.serviceId === s.id).length,
    })),
  ]

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Every job we finish, with what it cost."
        sub="Photos, scope, time on site and the final invoice. These are the most recent twelve; the rest of the archive is in the folder we bring to every visit."
        photo={{ id: '1617806118233-18e1de247200', alt: 'Renovated dining room with green velvet chairs and a round pendant light' }}
      />

      <section className="projects-summary">
        <div className="section projects-summary-grid">
          {summary.map((item) => (
            <div key={item.label}>
              <div className="projects-summary-value">{item.value}</div>
              <div className="projects-summary-label">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="projects-stories" data-lead-trigger>
        <div className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow section-eyebrow">Success stories</p>
              <h2 className="section-title">How we found it, and how we left it.</h2>
            </div>
            <p className="lede projects-stories-lede">
              The house as it was on our first visit, what we found once the walls were open, and the proposal next to
              the final invoice.
            </p>
          </div>
          <SuccessStoriesGrid stories={featuredStories} onOpenStory={onOpenStory} />
        </div>
      </section>

      <section className="projects-archive">
        <div className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow section-eyebrow">Archive</p>
              <h2 className="section-title">Every project has its story.</h2>
            </div>
            <p className="lede projects-stories-lede">Open any job to see the before, the after and what it cost.</p>
          </div>

          <div className="projects-filters" role="group" aria-label="Filter projects by type">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`projects-filter ${filter === f.id ? 'is-active' : ''}`}
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
              >
                {f.label} <span>{f.count}</span>
              </button>
            ))}
          </div>

          <div className="projects-archive-grid">
            {visible.map((project) => (
              <ProjectCard key={project.id} project={project} onOpenStory={onOpenStory} />
            ))}
          </div>

          <p className="projects-archive-note">
            Showing {visible.length} of 47 published projects. Photos are shown with each owner&rsquo;s permission.
          </p>
        </div>
      </section>

      <GoogleReviews />
      <QuoteBanner onStartEstimate={onRequestEstimate} />
    </>
  )
}
