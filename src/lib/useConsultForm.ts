import { useState } from 'react'
import type { FormEvent } from 'react'
import { submitLead, type Lead } from './leads'

type Fields = Omit<Lead, 'source'>
type Status = 'idle' | 'sending' | 'sent' | 'error'

const EMPTY: Fields = { name: '', phone: '', email: '', city: '', projectType: '', timeline: '', details: '' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const FIELD_NAMES = {
  name: 'your full name',
  phone: 'a 10-digit phone number',
  email: 'a valid email (or leave it empty)',
  city: 'the project address or city',
  projectType: 'the type of project',
  timeline: 'when you want to start',
}

/** State, validation and sending for the free consultation form. Required fields follow the current site. */
export function useConsultForm(source: string) {
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState<Status>('idle')

  const errors = {
    name: fields.name.trim().length < 2,
    phone: fields.phone.replace(/\D/g, '').length < 10,
    email: fields.email.trim() !== '' && !EMAIL_RE.test(fields.email),
    city: fields.city.trim().length < 2,
    projectType: !fields.projectType,
    timeline: !fields.timeline,
  }
  const isValid = !Object.values(errors).some(Boolean)
  /** What still needs fixing, in plain words, for the message under the form. */
  const missing = (Object.keys(errors) as (keyof typeof errors)[]).filter((k) => errors[k]).map((k) => FIELD_NAMES[k])

  const set =
    <K extends keyof Fields>(key: K) =>
    (value: Fields[K]) => {
      setFields((f) => ({ ...f, [key]: value }))
      // A failed send is stale once the visitor edits the form
      setStatus((s) => (s === 'error' ? 'idle' : s))
    }
  const invalid = (key: keyof typeof errors) => touched && errors[key]

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!isValid || status === 'sending') return
    setStatus('sending')
    try {
      await submitLead({ ...fields, name: fields.name.trim(), details: fields.details.trim(), source })
      setStatus('sent')
    } catch (err) {
      console.warn('Consultation request not sent:', err)
      setStatus('error')
    }
  }

  return {
    fields,
    set,
    invalid,
    isValid,
    missing,
    touched,
    status,
    onSubmit,
    firstName: fields.name.trim().split(' ')[0],
  }
}
