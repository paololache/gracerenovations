import { useState } from 'react'
import { PageHero } from '../components/PageHero'
import { ProjectCard } from '../components/ProjectCard'
import { QuoteBanner } from '../components/QuoteBanner'
import { projects } from '../data/projects'
import { services, type Service } from '../data/services'
import { reveal, revealStagger } from '../lib/motion'
import type { PageProps } from '../lib/router'
import './GalleryPage.css'

type Filter = Service['id'] | 'all'

export function GalleryPage({ onConsult, onOpenProject }: PageProps) {
  const [filter, setFilter] = useState<Filter>('all')
  const visible = filter === 'all' ? projects : projects.filter((p) => p.serviceId === filter)

  // Only offer filters for services that have work to show
  const filters: { id: Filter; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: projects.length },
    ...services
      .map((s) => ({ id: s.id as Filter, label: s.tag, count: projects.filter((p) => p.serviceId === s.id).length }))
      .filter((f) => f.count > 0),
  ]

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Finished spaces, from kitchens to backyards."
        sub="Real projects by our crew across Central Indiana. Open any one to see what we did."
        photo={{ local: 'kitchen', alt: 'White shaker kitchen with a farmhouse sink, finished by our crew' }}
      />

      <section className="projects-archive">
        <div className="section">
          <div className="projects-filters" role="group" aria-label="Filter projects by service" {...reveal}>
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

          <div className="projects-archive-grid" data-lead-trigger key={filter} {...revealStagger}>
            {visible.map((project) => (
              <ProjectCard key={project.id} project={project} onOpenProject={onOpenProject} />
            ))}
          </div>

          <p className="projects-archive-note">
            Project photos are shared with each homeowner&rsquo;s permission. More projects are added as they finish.
          </p>
        </div>
      </section>

      <QuoteBanner onConsult={onConsult} />
    </>
  )
}
