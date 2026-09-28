import { useEffect, useRef } from 'react'
import { formatCost, projects } from '../data/projects'
import { services } from '../data/services'
import type { SuccessStory } from '../data/stories'
import { Photo } from './Photo'
import './StoryModal.css'

interface StoryModalProps {
  story: SuccessStory | null
  onClose: () => void
  onStartEstimate: () => void
}

const formatVariance = (proposal: number, final: number) => {
  const pct = ((final - proposal) / proposal) * 100
  if (Math.abs(pct) < 0.05) return 'Exact'
  return `${pct > 0 ? '+' : '−'}${Math.abs(pct).toFixed(1)}%`
}

export function StoryModal({ story, onClose, onStartEstimate }: StoryModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!story) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [story, onClose])

  if (!story) return null

  const project = projects.find((p) => p.id === story.projectId)
  if (!project) return null
  const service = services.find((s) => s.id === project.serviceId)

  const facts = [
    { label: 'Time on site', value: project.duration },
    { label: 'Proposal', value: formatCost(story.proposal) },
    { label: 'Final invoice', value: formatCost(project.cost) },
    { label: 'Difference', value: formatVariance(story.proposal, project.cost) },
    { label: 'Schedule', value: story.schedule },
  ]

  return (
    <div className="story-overlay" role="dialog" aria-modal="true" aria-labelledby="story-title">
      <button type="button" className="story-backdrop" aria-label="Close story" onClick={onClose} tabIndex={-1} />

      <article className="story-panel">
        <button ref={closeRef} type="button" className="story-close" aria-label="Close story" onClick={onClose}>
          ×
        </button>

        <header className="story-header">
          <div className="story-header-meta">
            <span className="badge badge-solid">{service?.tag}</span>
            <span className="story-location">
              {project.title} · {project.location}, {project.year}
            </span>
          </div>
          <h2 id="story-title" className="story-title">
            {story.headline}
          </h2>
          <p className="story-summary">{story.summary}</p>
        </header>

        <dl className="story-facts">
          {facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>

        <div className="story-compare">
          <section className="story-side">
            <div className="story-side-image">
              <Photo {...story.before.photo} radius={16} sizes="(max-width: 900px) 100vw, 520px" />
              <span className="story-side-label">Before</span>
            </div>
            <h3>How we found it</h3>
            <p>{story.before.text}</p>
            <ul className="story-list story-list-before">
              {story.before.issues.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="story-side">
            <div className="story-side-image">
              <Photo {...story.after.photo} radius={16} sizes="(max-width: 900px) 100vw, 520px" />
              <span className="story-side-label story-side-label-after">After</span>
            </div>
            <h3>How we left it</h3>
            <p>{story.after.text}</p>
            <ul className="story-list story-list-after">
              {story.after.results.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="story-process">
          <div className="story-process-image">
            <Photo {...story.process.photo} radius={16} sizes="(max-width: 900px) 100vw, 380px" />
          </div>
          <div>
            <p className="eyebrow section-eyebrow">How we did it</p>
            <ol className="story-steps">
              {story.process.steps.map((step, i) => (
                <li key={step.title}>
                  <span className="story-step-number">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <figure className="story-quote">
          <blockquote>{story.quote.text}</blockquote>
          <figcaption>
            {story.quote.name} · {service?.tag}, {project.year}
          </figcaption>
        </figure>

        <footer className="story-footer">
          <p>Planning something similar? Get a range based on jobs like this one.</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              onClose()
              onStartEstimate()
            }}
          >
            Get a cost range
          </button>
        </footer>
      </article>
    </div>
  )
}
