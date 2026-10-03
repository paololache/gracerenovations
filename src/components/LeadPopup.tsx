import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { services } from '../data/services'
import { submitLead } from '../lib/leads'
import { Photo } from './Photo'
import './LeadPopup.css'

interface LeadPopupProps {
  open: boolean
  /** Which trigger opened the form, sent along with the lead. */
  source: string
  onClose: () => void
}

const TIMELINE_OPTIONS = ['ASAP', '1–3 months', '3–6 months', 'Not sure']

const PROOF = [
  { value: '41 of 47', label: 'jobs landed inside our estimate' },
  { value: '2 yr', label: 'warranty on every job' },
  { value: '1 day', label: 'to hear back from us' },
]

const PROMISES = ['Free, no-obligation estimate', 'Licensed, bonded and insured', 'No calls unless you ask for one']

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ZIP_RE = /^\d{5}$/

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function LeadPopup({ open, source, onClose }: LeadPopupProps) {
  const [service, setService] = useState('')
  const [timeline, setTimeline] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [zip, setZip] = useState('')
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    cardRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  if (!open) return null

  const errors = {
    service: !service,
    name: name.trim().length < 2,
    phone: phone.replace(/\D/g, '').length < 10,
    email: !EMAIL_RE.test(email),
    zip: !ZIP_RE.test(zip),
  }
  const isValid = !Object.values(errors).some(Boolean)
  const showError = (field: keyof typeof errors) => touched && errors[field]

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!isValid || status === 'sending') return
    setStatus('sending')
    try {
      await submitLead({
        service: services.find((s) => s.id === service)?.name ?? service,
        timeline,
        name: name.trim(),
        phone,
        email,
        zip,
        notes: '',
        source,
      })
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

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
            <span className="badge badge-solid">Free estimate</span>
            <p className="lead-aside-title">Your project could be the next story.</p>
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
            <figure className="lead-quote">
              <blockquote>
                The estimate they sent online was within nine hundred dollars of the final invoice.
              </blockquote>
              <figcaption>Marta Ellis · Kitchen, 2025</figcaption>
            </figure>
          </div>
        </aside>

        <div className="lead-main">
          {status === 'sent' ? (
            <div className="lead-done">
              <p className="eyebrow lead-eyebrow">Request received</p>
              <h2 id="lead-title" className="lead-title">
                Thank you, {name.trim().split(' ')[0]}.
              </h2>
              <p className="lead-sub">
                Your project lead will reply within one business day with a first range and a time for a free visit,
                if you want one.
              </p>
              <button type="button" className="btn btn-primary" onClick={onClose}>
                Keep reading stories
              </button>
            </div>
          ) : (
            <form className="lead-form" onSubmit={onSubmit} noValidate>
              <p className="eyebrow lead-eyebrow">Takes 30 seconds</p>
              <h2 id="lead-title" className="lead-title">
                Get a free estimate for your project
              </h2>
              <p className="lead-sub">
                Tell us what you want built. We&rsquo;ll price it against 47 published jobs, not a sales script.
              </p>
              <p className="lead-trust">41 of 47 jobs landed inside our estimate · 2-year warranty</p>

              <fieldset className="lead-fieldset">
                <legend className="lead-label">What are we building?</legend>
                <div className="lead-chips">
                  {services.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      className={`lead-chip ${service === s.id ? 'is-selected' : ''}`}
                      aria-pressed={service === s.id}
                      onClick={() => setService(s.id)}
                    >
                      {s.name}
                      <small>{s.priceLabel}</small>
                    </button>
                  ))}
                </div>
                {showError('service') && <p className="lead-error">Pick the type of project.</p>}
              </fieldset>

              <fieldset className="lead-fieldset">
                <legend className="lead-label">
                  When do you want to start? <span>Optional</span>
                </legend>
                <div className="lead-chips lead-chips-small">
                  {TIMELINE_OPTIONS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={`lead-chip ${timeline === t ? 'is-selected' : ''}`}
                      aria-pressed={timeline === t}
                      onClick={() => setTimeline(timeline === t ? '' : t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="lead-fields">
                <label className="lead-field lead-field-wide">
                  <span className="lead-label">Full name</span>
                  <input
                    className={`lead-input ${showError('name') ? 'is-invalid' : ''}`}
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <label className="lead-field lead-field-wide">
                  <span className="lead-label">Email</span>
                  <input
                    className={`lead-input ${showError('email') ? 'is-invalid' : ''}`}
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label className="lead-field">
                  <span className="lead-label">Phone</span>
                  <input
                    className={`lead-input ${showError('phone') ? 'is-invalid' : ''}`}
                    type="tel"
                    autoComplete="tel"
                    placeholder="(555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </label>
                <label className="lead-field">
                  <span className="lead-label">Zip code</span>
                  <input
                    className={`lead-input ${showError('zip') ? 'is-invalid' : ''}`}
                    inputMode="numeric"
                    autoComplete="postal-code"
                    maxLength={5}
                    value={zip}
                    onChange={(e) => setZip(e.target.value.replace(/\D/g, ''))}
                  />
                </label>
              </div>

              {touched && !isValid && (
                <p className="lead-error">Check the highlighted fields so we can reach you.</p>
              )}
              {status === 'error' && (
                <p className="lead-error">That didn&rsquo;t go through. Try again or call (555) 210-4488.</p>
              )}

              <button type="submit" className="btn btn-primary lead-submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Get my free estimate'}
              </button>
              <p className="lead-fineprint">
                No obligation and no spam. We only use your details to reply about this project.
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
