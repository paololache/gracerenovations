import { useEffect, useRef } from 'react'
import { company } from '../data/company'
import { TIMELINES } from '../lib/leads'
import { useConsultForm } from '../lib/useConsultForm'
import { Photo } from './Photo'
import './LeadPopup.css'

interface LeadPopupProps {
  open: boolean
  /** Which trigger opened the form, sent along with the lead. */
  source: string
  onClose: () => void
}

/** Project chips: the main services, mapped to the current site's project types. */
const PROJECTS = [
  { label: 'Kitchen', value: 'Kitchen Renovation' },
  { label: 'Bathroom', value: 'Bathroom Renovation' },
  { label: 'Sunrooms & Interiors', value: 'Sunrooms & Interiors' },
  { label: 'Painting', value: 'Interior Painting' },
  { label: 'Exterior', value: 'Exterior Renovation' },
  { label: 'Remodeling', value: 'Remodeling' },
  { label: 'Roofing', value: 'Roofing' },
  { label: 'Other', value: 'General Home Improvement' },
  { label: 'Not sure yet', value: 'Not Sure Yet' },
]

const PROOF = [
  { value: '2018', label: 'renovating homes in Central Indiana' },
  { value: 'Free', label: 'no-pressure consultation' },
  { value: 'Local', label: 'a contractor you can call directly' },
]

const PROMISES = [
  'Free, no-pressure consultation',
  'Clear scope, timeline, and plan',
  'Clean finish work and communication',
]

export function LeadPopup({ open, source, onClose }: LeadPopupProps) {
  const form = useConsultForm(source)
  const { fields, set, invalid } = form
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // preventScroll: iOS Safari otherwise scrolls the page behind the fixed overlay to the focused element
    cardRef.current?.focus({ preventScroll: true })
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  if (!open) return null

  const inputClass = (key: Parameters<typeof invalid>[0]) => `lead-input ${invalid(key) ? 'is-invalid' : ''}`

  return (
    <div className="lead-overlay" role="dialog" aria-modal="true" aria-labelledby="lead-title">
      <button type="button" className="lead-backdrop" aria-label="Close" tabIndex={-1} onClick={onClose} />

      <div className="lead-card" ref={cardRef} tabIndex={-1}>
        <button type="button" className="lead-close" aria-label="Close dialog" onClick={onClose}>
          ×
        </button>
        <span className="lead-handle" aria-hidden="true" />

        <aside className="lead-aside">
          <Photo
            local="kitchen"
            alt="White shaker kitchen finished by our crew"
            sizes="(max-width: 900px) 100vw, 400px"
            className="lead-aside-photo"
          />
          <div className="lead-aside-content">
            <span className="badge badge-solid">Free consultation</span>
            <p className="lead-aside-title">Ready to fall in love with your home again?</p>
            <dl className="lead-proof">
              {PROOF.map((p) => (
                <div key={p.label}>
                  <dt>{p.value}</dt>
                  <dd>{p.label}</dd>
                </div>
              ))}
            </dl>
            <ul className="lead-promises">
              {PROMISES.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="lead-main">
          {form.status === 'sent' ? (
            <div className="lead-done">
              <p className="eyebrow lead-eyebrow">Request received</p>
              <h2 id="lead-title" className="lead-title">
                Thank you, {form.firstName}.
              </h2>
              <p className="lead-sub">We&rsquo;ll review your project and walk you through the next steps.</p>
              <button type="button" className="btn btn-primary" onClick={onClose}>
                Keep browsing
              </button>
            </div>
          ) : (
            <form className="lead-form" onSubmit={form.onSubmit} noValidate>
              <p className="eyebrow lead-eyebrow">Free consultation</p>
              <h2 id="lead-title" className="lead-title">
                Tell us about your renovation
              </h2>
              <p className="lead-sub">Share a few details and we&rsquo;ll walk you through next steps.</p>
              <p className="lead-trust">Since 2018 · Serving Indianapolis &amp; Central Indiana</p>

              <fieldset className="lead-fieldset">
                <legend className="lead-label">Type of project</legend>
                <div className="lead-chips">
                  {PROJECTS.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      className={`lead-chip ${fields.projectType === p.value ? 'is-selected' : ''}`}
                      aria-pressed={fields.projectType === p.value}
                      onClick={() => set('projectType')(p.value)}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
                {invalid('projectType') && <p className="lead-error">Pick the type of project.</p>}
              </fieldset>

              <fieldset className="lead-fieldset">
                <legend className="lead-label">When do you want to start?</legend>
                <div className="lead-chips lead-chips-small">
                  {TIMELINES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={`lead-chip ${fields.timeline === t ? 'is-selected' : ''}`}
                      aria-pressed={fields.timeline === t}
                      onClick={() => set('timeline')(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {invalid('timeline') && <p className="lead-error">Pick a timeline.</p>}
              </fieldset>

              <div className="lead-fields">
                <label className="lead-field lead-field-wide">
                  <span className="lead-label">Full name</span>
                  <input
                    className={inputClass('name')}
                    autoComplete="name"
                    value={fields.name}
                    onChange={(e) => set('name')(e.target.value)}
                  />
                </label>
                <label className="lead-field">
                  <span className="lead-label">
                    Phone <span>Call or text is fine</span>
                  </span>
                  <input
                    className={inputClass('phone')}
                    type="tel"
                    autoComplete="tel"
                    value={fields.phone}
                    onChange={(e) => set('phone')(e.target.value)}
                  />
                </label>
                <label className="lead-field">
                  <span className="lead-label">
                    Email <span>Optional</span>
                  </span>
                  <input
                    className={inputClass('email')}
                    type="email"
                    autoComplete="email"
                    value={fields.email}
                    onChange={(e) => set('email')(e.target.value)}
                  />
                </label>
                <label className="lead-field lead-field-wide">
                  <span className="lead-label">Project address / city</span>
                  <input
                    className={inputClass('city')}
                    autoComplete="address-level2"
                    value={fields.city}
                    onChange={(e) => set('city')(e.target.value)}
                  />
                </label>
              </div>

              {form.touched && !form.isValid && (
                <p className="lead-error">Please add {form.missing.join(', ')}.</p>
              )}
              {form.status === 'error' && (
                <p className="lead-error">
                  That didn&rsquo;t go through. Call us at <a href={company.phoneHref}>{company.phone}</a> or email{' '}
                  <a href={company.emailHref}>{company.email}</a>.
                </p>
              )}

              <button type="submit" className="btn btn-primary lead-submit" disabled={form.status === 'sending'}>
                {form.status === 'sending' ? 'Sending…' : 'Schedule My Free Consultation'}
              </button>
              <p className="lead-fineprint">
                Free consultation · No obligation · Serving Indianapolis &amp; Central Indiana
              </p>
              <button type="button" className="lead-dismiss" onClick={onClose}>
                No thanks, I&rsquo;m still looking
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
