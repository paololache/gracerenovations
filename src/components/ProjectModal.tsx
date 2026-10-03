import { useEffect, useRef } from 'react'
import type { Project } from '../data/projects'
import { services } from '../data/services'
import { Photo } from './Photo'
import './ProjectModal.css'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
  onConsult: () => void
}

export function ProjectModal({ project, onClose, onConsult }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!project) return
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
  }, [project, onClose])

  if (!project) return null
  const service = services.find((s) => s.id === project.serviceId)

  return (
    <div className="story-overlay" role="dialog" aria-modal="true" aria-labelledby="story-title">
      <button type="button" className="story-backdrop" aria-label="Close project" onClick={onClose} tabIndex={-1} />

      <article className="story-panel">
        <button ref={closeRef} type="button" className="story-close" aria-label="Close project" onClick={onClose}>
          ×
        </button>

        <header className="story-header">
          <div className="story-header-meta">
            <span className="badge badge-solid">{service?.tag}</span>
            <span className="story-location">{service?.name}</span>
          </div>
          <h2 id="story-title" className="story-title">
            {project.title}
          </h2>
          <p className="story-summary">{project.summary}</p>
        </header>

        <div className={`story-photos ${project.photos.length > 1 ? 'is-pair' : ''}`}>
          {project.photos.map((photo) => (
            <div key={photo.alt} className="story-photo">
              <Photo {...photo} radius={16} sizes="(max-width: 900px) 100vw, 520px" />
            </div>
          ))}
        </div>

        <section className="story-done">
          <h3>What we did</h3>
          <ul className="check-list">
            {project.scope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {project.steps && (
          <section className="story-process">
            <p className="eyebrow section-eyebrow">Design to finish</p>
            <ol className="story-steps">
              {project.steps.map((step, i) => (
                <li key={step.title}>
                  <span className="story-step-number">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        <footer className="story-footer">
          <p>Planning something similar? Tell us about your project.</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              onClose()
              onConsult()
            }}
          >
            Schedule a Free Consultation
          </button>
        </footer>
      </article>
    </div>
  )
}
