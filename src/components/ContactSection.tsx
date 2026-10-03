import { useState } from 'react'
import type { FormEvent } from 'react'
import { submitLead } from '../lib/leads'
import { Photo } from './Photo'
import './ContactSection.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ZIP_RE = /^\d{5}$/

type Status = 'idle' | 'sending' | 'sent' | 'error'

/**
 * "Your project starts here": photo band with a slanted terracotta form card.
 * As it scrolls in, the photo settles, the copy rises and the card slides up
 * with its fields one after another (scroll reveals from src/effects).
 */
export function ContactSection({ className = '' }: { className?: string }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [zip, setZip] = useState('')
  const [notes, setNotes] = useState('')
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState<Status>('idle')

  const errors = {
    name: name.trim().length < 2,
    phone: phone.replace(/\D/g, '').length < 10,
    email: !EMAIL_RE.test(email),
    zip: !ZIP_RE.test(zip),
  }
  const isValid = !Object.values(errors).some(Boolean)
  const invalid = (field: keyof typeof errors) => (touched && errors[field] ? 'is-invalid' : '')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!isValid || status === 'sending') return
    setStatus('sending')
    try {
      await submitLead({
        service: 'Not specified',
        timeline: '',
        name: name.trim(),
        phone,
        email,
        zip,
        notes: notes.trim(),
        source: 'Home contact form',
      })
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className={`contact-section ${className}`} aria-labelledby="contact-title">
      {/* Fades in while the photo settles from a slight zoom (see .contact-bg.is-revealed) */}
      <div className="contact-bg" aria-hidden="true" data-fx-reveal="fade" data-fx-reveal-duration="1400" data-fx-reveal-offset="0">
        <Photo id="1600210492486-724fe5c67fb0" alt="" sizes="100vw" />
      </div>

      <div className="contact-layout">
        <div className="contact-copy" data-fx-reveal="fade-up" data-fx-reveal-duration="1000" data-fx-reveal-stagger="140">
          <h2 id="contact-title" className="contact-title">
            Your project starts here.
          </h2>
          <p className="contact-lede">
            Make the first move. Tell us what you want built and get a free estimate from the crew who will build it.
          </p>
          <p className="contact-direct">
            <a href="tel:+15552104488">(555) 210-4488</a>
            <span className="contact-direct-sep" aria-hidden="true">
              {' | '}
            </span>
            <a href="mailto:hello@gracebuildingco.com">hello@gracebuildingco.com</a>
          </p>
        </div>

        <div className="contact-card-wrap" data-fx-reveal="fade-up" data-fx-reveal-duration="1200" data-fx-reveal-delay="150">
          <div className="contact-card">
            <div className="contact-card-inner">
              {status === 'sent' ? (
                <div className="contact-done fx-pop-in" role="status">
                  <p className="contact-done-title">Thank you, {name.trim().split(' ')[0]}.</p>
                  <p>Your project lead will reply within one business day.</p>
                </div>
              ) : (
                <form
                  className="contact-form"
                  onSubmit={onSubmit}
                  noValidate
                  data-fx-reveal="fade-up"
                  data-fx-reveal-duration="700"
                  data-fx-reveal-delay="500"
                  data-fx-reveal-stagger="90"
                >
                  <label className={`contact-field ${invalid('name')}`}>
                    <span className="visually-hidden">Full name</span>
                    <input autoComplete="name" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
                  </label>
                  <label className={`contact-field ${invalid('phone')}`}>
                    <span className="visually-hidden">Phone number</span>
                    <input type="tel" autoComplete="tel" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </label>
                  <label className={`contact-field ${invalid('email')}`}>
                    <span className="visually-hidden">Email</span>
                    <input type="email" autoComplete="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </label>
                  <label className={`contact-field ${invalid('zip')}`}>
                    <span className="visually-hidden">Zip code</span>
                    <input
                      inputMode="numeric"
                      autoComplete="postal-code"
                      maxLength={5}
                      placeholder="Zip code"
                      value={zip}
                      onChange={(e) => setZip(e.target.value.replace(/\D/g, ''))}
                    />
                  </label>
                  <label className="contact-field contact-field-wide">
                    <span className="visually-hidden">Tell us about your project</span>
                    <textarea rows={3} placeholder="Tell us about your project" value={notes} onChange={(e) => setNotes(e.target.value)} />
                  </label>
                  <div className="contact-actions contact-field-wide">
                    <button type="submit" className="btn contact-submit" disabled={status === 'sending'}>
                      {status === 'sending' ? 'Sending…' : 'Submit'}
                    </button>
                    {touched && !isValid && <p className="contact-error">Check the highlighted fields.</p>}
                    {status === 'error' && <p className="contact-error">That didn&rsquo;t go through. Call us at (555) 210-4488.</p>}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
