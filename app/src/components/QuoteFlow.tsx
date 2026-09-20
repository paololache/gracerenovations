import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { services } from '../data/services'
import { site } from '../data/site'
import { estimateRange, formatCurrency, type ProjectScope, type ProjectSize } from '../lib/estimate'
import './QuoteFlow.css'

interface QuoteFlowProps {
  open: boolean
  onClose: () => void
}

interface Answers {
  service: (typeof services)[number]['id'] | null
  size: ProjectSize | null
  scope: ProjectScope | null
  timeline: string | null
  zip: string
  name: string
  email: string
  phone: string
}

const EMPTY_ANSWERS: Answers = {
  service: null,
  size: null,
  scope: null,
  timeline: null,
  zip: '',
  name: '',
  email: '',
  phone: '',
}

const SIZE_OPTIONS: { id: ProjectSize; label: string; hint: string }[] = [
  { id: 'small', label: 'Small', hint: 'A single room or a focused update' },
  { id: 'medium', label: 'Medium', hint: 'A full room, top to bottom' },
  { id: 'large', label: 'Large', hint: 'Multiple rooms or the whole layout' },
]

const SCOPE_OPTIONS: { id: ProjectScope; label: string; hint: string }[] = [
  { id: 'cosmetic', label: 'Cosmetic refresh', hint: 'Paint, fixtures, surfaces — layout stays' },
  { id: 'full-gut', label: 'Full gut and rebuild', hint: 'Down to the studs, new everything' },
  { id: 'structural', label: 'Structural or layout change', hint: 'Walls move, footprint changes' },
]

const TIMELINE_OPTIONS = ['ASAP', '1–3 months', '3–6 months', 'Just exploring']

const TOTAL_QUESTIONS = 6

const ZIP_RE = /^\d{5}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function QuoteFlow({ open, onClose }: QuoteFlowProps) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS)

  useEffect(() => {
    if (open) {
      setStep(0)
      setAnswers(EMPTY_ANSWERS)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  const isResult = step === TOTAL_QUESTIONS
  const canAdvance =
    (step === 0 && !!answers.service) ||
    (step === 1 && !!answers.size) ||
    (step === 2 && !!answers.scope) ||
    (step === 3 && !!answers.timeline) ||
    (step === 4 && ZIP_RE.test(answers.zip)) ||
    (step === 5 && answers.name.trim().length > 1 && EMAIL_RE.test(answers.email))

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_QUESTIONS))
  const back = () => setStep((s) => Math.max(s - 1, 0))

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (canAdvance) next()
  }

  const service = services.find((s) => s.id === answers.service)
  const [rangeMin, rangeMax] =
    answers.service && answers.size && answers.scope ? estimateRange(answers.service, answers.size, answers.scope) : [0, 0]

  const scheduleHref = service
    ? `mailto:${site.email}?subject=${encodeURIComponent(
        `Cost range follow-up — ${service.name}`,
      )}&body=${encodeURIComponent(
        `Hi Grace Renovations,\n\nI got an estimated range of ${formatCurrency(rangeMin)}–${formatCurrency(
          rangeMax,
        )} for a ${answers.size} ${service.name.toLowerCase()} project (${answers.scope?.replace('-', ' ')} scope, ${answers.timeline} timeline).\n\nZip: ${answers.zip}\nName: ${answers.name}\nPhone: ${answers.phone}\n\nI'd like to schedule a visit.`,
      )}`
    : undefined

  return (
    <div className="quote-overlay" role="dialog" aria-modal="true" aria-label="Get a cost range">
      <button type="button" className="quote-backdrop" aria-label="Close" onClick={onClose} />

      <div className="quote-card">
        <button type="button" className="quote-close" aria-label="Close dialog" onClick={onClose}>
          ×
        </button>

        {!isResult ? (
          <>
            <div className="quote-progress">
              <p className="eyebrow quote-step-label">
                Question {step + 1} of {TOTAL_QUESTIONS}
              </p>
              <div className="quote-progress-track">
                <div className="quote-progress-fill" style={{ width: `${((step + 1) / TOTAL_QUESTIONS) * 100}%` }} />
              </div>
            </div>

            <form onSubmit={onSubmit} className="quote-form">
              {step === 0 && (
                <fieldset className="quote-fieldset">
                  <legend className="quote-question">What are you renovating?</legend>
                  <div className="quote-options">
                    {services.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        className={`quote-option ${answers.service === s.id ? 'quote-option-selected' : ''}`}
                        aria-pressed={answers.service === s.id}
                        onClick={() => setAnswers((a) => ({ ...a, service: s.id }))}
                      >
                        <span className="quote-option-label">{s.name}</span>
                        <span className="quote-option-hint">{s.description}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              {step === 1 && (
                <fieldset className="quote-fieldset">
                  <legend className="quote-question">About how big is the project?</legend>
                  <div className="quote-options">
                    {SIZE_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        className={`quote-option ${answers.size === opt.id ? 'quote-option-selected' : ''}`}
                        aria-pressed={answers.size === opt.id}
                        onClick={() => setAnswers((a) => ({ ...a, size: opt.id }))}
                      >
                        <span className="quote-option-label">{opt.label}</span>
                        <span className="quote-option-hint">{opt.hint}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              {step === 2 && (
                <fieldset className="quote-fieldset">
                  <legend className="quote-question">What&rsquo;s the scope of the work?</legend>
                  <div className="quote-options">
                    {SCOPE_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        className={`quote-option ${answers.scope === opt.id ? 'quote-option-selected' : ''}`}
                        aria-pressed={answers.scope === opt.id}
                        onClick={() => setAnswers((a) => ({ ...a, scope: opt.id }))}
                      >
                        <span className="quote-option-label">{opt.label}</span>
                        <span className="quote-option-hint">{opt.hint}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              {step === 3 && (
                <fieldset className="quote-fieldset">
                  <legend className="quote-question">When do you want to start?</legend>
                  <div className="quote-options">
                    {TIMELINE_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        className={`quote-option ${answers.timeline === opt ? 'quote-option-selected' : ''}`}
                        aria-pressed={answers.timeline === opt}
                        onClick={() => setAnswers((a) => ({ ...a, timeline: opt }))}
                      >
                        <span className="quote-option-label">{opt}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              {step === 4 && (
                <fieldset className="quote-fieldset">
                  <legend className="quote-question">What&rsquo;s your zip code?</legend>
                  <p className="quote-field-hint">So we can confirm we work in your area.</p>
                  <input
                    className="quote-input"
                    inputMode="numeric"
                    pattern="\d{5}"
                    maxLength={5}
                    placeholder="e.g. 02139"
                    value={answers.zip}
                    onChange={(e) => setAnswers((a) => ({ ...a, zip: e.target.value.replace(/\D/g, '') }))}
                    autoFocus
                  />
                </fieldset>
              )}

              {step === 5 && (
                <fieldset className="quote-fieldset">
                  <legend className="quote-question">Where should we send the range?</legend>
                  <div className="quote-contact-fields">
                    <input
                      className="quote-input"
                      placeholder="Full name"
                      value={answers.name}
                      onChange={(e) => setAnswers((a) => ({ ...a, name: e.target.value }))}
                      autoFocus
                    />
                    <input
                      className="quote-input"
                      type="email"
                      placeholder="Email address"
                      value={answers.email}
                      onChange={(e) => setAnswers((a) => ({ ...a, email: e.target.value }))}
                    />
                    <input
                      className="quote-input"
                      type="tel"
                      placeholder="Phone (optional)"
                      value={answers.phone}
                      onChange={(e) => setAnswers((a) => ({ ...a, phone: e.target.value }))}
                    />
                  </div>
                </fieldset>
              )}

              <div className="quote-actions">
                {step > 0 ? (
                  <button type="button" className="quote-back" onClick={back}>
                    Back
                  </button>
                ) : (
                  <span />
                )}
                <button type="submit" className="btn btn-primary" disabled={!canAdvance}>
                  {step === TOTAL_QUESTIONS - 1 ? 'See my range' : 'Next'}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="quote-result">
            <p className="eyebrow quote-result-eyebrow">Your estimated range</p>
            <p className="quote-result-figure">
              {formatCurrency(rangeMin)}–{formatCurrency(rangeMax)}
            </p>
            <p className="quote-result-copy">
              Based on {answers.size} {service?.name.toLowerCase()} projects with a {answers.scope?.replace('-', ' ')}{' '}
              scope. A final number comes after we see the space.
            </p>
            <div className="quote-result-actions">
              <a className="btn btn-primary" href={scheduleHref}>
                Schedule a free visit
              </a>
              <button
                type="button"
                className="quote-back"
                onClick={() => {
                  setStep(0)
                  setAnswers(EMPTY_ANSWERS)
                }}
              >
                Start over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
