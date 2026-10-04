import { useEffect, useRef } from 'react'
import type { Project } from '../data/projects'
import { services } from '../data/services'
import { Photo } from './Photo'
import './StoryModal.css'

interface StoryModalProps {
  project: Project | null
  onClose: () => void
  onConsult: () => void
}

/** A project's success story: the before, the after, and how the crew got there. */
export function StoryModal({ project, onClose, onConsult }: StoryModalProps) {
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
  const [afterPhoto, otherPhoto] = project.photos
  const before = project.before

  const facts = [
    { label: 'Service', value: service?.tag },
    { label: 'Area', value: 'Central Indiana' },
    { label: 'Scope', value: `${project.scope.length} items` },
    { label: 'Photos', value: 'By our crew' },
    { label: 'Consultation', value: 'Free' },
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
            <span className="story-location">{service?.name} · Central Indiana</span>
          </div>
          <h2 id="story-title" className="story-title">
            {project.title}
          </h2>
          <p className="story-summary">{project.summary}</p>
        </header>

        <dl className="story-facts">
          {facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>

        {/* Side by side once there is a before photo; until then the notes sit next to the after photo */}
        <div className={`story-compare ${before?.photo ? '' : 'is-single'}`}>
          {before?.photo && (
            <section className="story-side">
              <div className="story-side-image">
                <Photo {...before.photo} radius={16} sizes="(max-width: 900px) 100vw, 520px" />
                <span className="story-side-label">{before.example ? 'Before · Example' : 'Before'}</span>
              </div>
              {before.example && (
                <p className="story-side-note">Example photo of a typical starting point, not this home.</p>
              )}
              <h3>How we found it</h3>
              <p>{before.text}</p>
            </section>
          )}

          <section className="story-side">
            <div className="story-side-image">
              <Photo {...afterPhoto} radius={16} sizes="(max-width: 900px) 100vw, 520px" />
              <span className="story-side-label story-side-label-after">After</span>
            </div>
            <div>
              {before && !before.photo && (
                <>
                  <h3>How we found it</h3>
                  <p className="story-found">{before.text}</p>
                </>
              )}
              <h3>How we left it</h3>
              <ul className="story-list story-list-after">
                {project.scope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {project.steps && (
          <section className="story-process">
            <div className="story-process-image">
              <Photo {...(otherPhoto ?? afterPhoto)} radius={16} sizes="(max-width: 900px) 100vw, 380px" />
            </div>
            <div>
              <p className="eyebrow section-eyebrow">How we did it</p>
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
            </div>
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
