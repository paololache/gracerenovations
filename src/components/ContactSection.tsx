import { company } from '../data/company'
import { PROJECT_TYPES, TIMELINES } from '../lib/leads'
import { useConsultForm } from '../lib/useConsultForm'
import { Accented } from './Heading'
import { Photo } from './Photo'
import './ContactSection.css'

const BENEFITS = [
  'Free, no-pressure consultation',
  'Clear scope, timeline, and plan',
  'Clean finish work and communication',
]

/**
 * "Tell us about your renovation": photo band with a slanted terracotta form
 * card. As it scrolls in, the photo settles, the copy rises and the card
 * slides up with its fields one after another.
 */
export function ContactSection({
  className = '',
  source = 'Home consultation form',
}: {
  className?: string
  source?: string
}) {
  const form = useConsultForm(source)
  const { fields, set, invalid } = form
  const cls = (key: Parameters<typeof invalid>[0], extra = '') =>
    `contact-field ${extra} ${invalid(key) ? 'is-invalid' : ''}`

  return (
    <section className={`contact-section ${className}`} aria-labelledby="contact-title" id="consultation">
      {/* Fades in while the photo settles from a slight zoom (see .contact-bg.is-revealed) */}
      <div
        className="contact-bg"
        aria-hidden="true"
        data-fx-reveal="fade"
        data-fx-reveal-duration="1400"
        data-fx-reveal-offset="0"
      >
        <Photo local="hero-kitchen" alt="" sizes="100vw" />
      </div>

      <div className="contact-layout">
        <div
          className="contact-copy"
          data-fx-reveal="fade-up"
          data-fx-reveal-duration="1000"
          data-fx-reveal-stagger="140"
        >
          <p className="eyebrow eyebrow-rule contact-eyebrow">Free consultation</p>
          <h2 id="contact-title" className="contact-title">
            <Accented text="Tell us about" accent="your renovation." />
          </h2>
          <p className="contact-lede">
            Share a few details about your kitchen, bathroom, sunroom, painting, or remodeling project — we&rsquo;ll
            review and walk you through next steps.
          </p>
          <ul className="check-list contact-benefits">
            {BENEFITS.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <p className="contact-direct">
            <a href={company.phoneHref}>Call {company.phone}</a>
          </p>
        </div>

        <div
          className="contact-card-wrap"
          data-fx-reveal="fade-up"
          data-fx-reveal-duration="1200"
          data-fx-reveal-delay="150"
        >
          <div className="contact-card">
            <div className="contact-card-inner">
              {form.status === 'sent' ? (
                <div className="contact-done fx-pop-in" role="status">
                  <p className="contact-done-title">Thank you, {form.firstName}.</p>
                  <p>We&rsquo;ll review your project and get back to you with next steps.</p>
                </div>
              ) : (
                <form
                  className="contact-form"
                  onSubmit={form.onSubmit}
                  noValidate
                  data-fx-reveal="fade-up"
                  data-fx-reveal-duration="700"
                  data-fx-reveal-delay="500"
                  data-fx-reveal-stagger="70"
                >
                  <label className={cls('name')}>
                    <span className="visually-hidden">Full name (required)</span>
                    <input
                      autoComplete="name"
                      placeholder="Full name *"
                      value={fields.name}
                      onChange={(e) => set('name')(e.target.value)}
                    />
                  </label>
                  <label className={cls('phone')}>
                    <span className="visually-hidden">Phone number (required, call or text is fine)</span>
                    <input
                      type="tel"
                      autoComplete="tel"
                      placeholder="Phone number *"
                      value={fields.phone}
                      onChange={(e) => set('phone')(e.target.value)}
                    />
                  </label>
                  <label className={cls('email')}>
                    <span className="visually-hidden">Email</span>
                    <input
                      type="email"
                      autoComplete="email"
                      placeholder="Email"
                      value={fields.email}
                      onChange={(e) => set('email')(e.target.value)}
                    />
                  </label>
                  <label className={cls('city')}>
                    <span className="visually-hidden">Project address or city (required)</span>
                    <input
                      autoComplete="address-level2"
                      placeholder="Project address / city *"
                      value={fields.city}
                      onChange={(e) => set('city')(e.target.value)}
                    />
                  </label>
                  <label className={cls('projectType', 'contact-field-wide')}>
                    <span className="visually-hidden">Type of project (required)</span>
                    <select value={fields.projectType} onChange={(e) => set('projectType')(e.target.value)}>
                      <option value="">Type of project *</option>
                      {PROJECT_TYPES.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </label>
                  <label className={cls('timeline', 'contact-field-wide')}>
                    <span className="visually-hidden">Timeline (required)</span>
                    <select value={fields.timeline} onChange={(e) => set('timeline')(e.target.value)}>
                      <option value="">When do you want to start? *</option>
                      {TIMELINES.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </label>
                  <label className="contact-field contact-field-wide">
                    <span className="visually-hidden">Project details</span>
                    <textarea
                      rows={3}
                      placeholder="Project details"
                      value={fields.details}
                      onChange={(e) => set('details')(e.target.value)}
                    />
                  </label>
                  <div className="contact-actions contact-field-wide">
                    <button type="submit" className="btn contact-submit" disabled={form.status === 'sending'}>
                      {form.status === 'sending' ? 'Sending…' : 'Schedule My Free Consultation'}
                    </button>
                    {form.touched && !form.isValid && <p className="contact-error">Check the highlighted fields.</p>}
                    {form.status === 'error' && (
                      <p className="contact-error">
                        That didn&rsquo;t go through. Call us at <a href={company.phoneHref}>{company.phone}</a>.
                      </p>
                    )}
                  </div>
                  <p className="contact-fineprint contact-field-wide">
                    Free consultation · No obligation · Serving Indianapolis &amp; Central Indiana
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
