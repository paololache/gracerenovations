/** A consultation request, with the fields of the current site's form. */
export interface Lead {
  name: string
  phone: string
  email: string
  city: string
  projectType: string
  timeline: string
  details: string
  source: string
}

export const PROJECT_TYPES = [
  'Kitchen Renovation',
  'Bathroom Renovation',
  'Sunrooms & Interiors',
  'Interior Painting',
  'Exterior Renovation',
  'Remodeling',
  'Roofing',
  'General Home Improvement',
  'Not Sure Yet',
]

export const TIMELINES = ['ASAP', 'Within 1 Month', '1–3 Months', '3–6 Months']

import { company } from '../data/company'

/**
 * Where lead forms post to. By default each request is emailed to Grace's
 * inbox through FormSubmit (formsubmit.co), which needs no account: the very
 * first submission sends an activation link to that inbox, and requests are
 * delivered once it has been clicked. Set VITE_LEAD_ENDPOINT in `.env.local`
 * to post the same JSON to a CRM or webhook instead. If sending fails, the
 * form asks the visitor to call or email.
 */
const CUSTOM_ENDPOINT = import.meta.env.VITE_LEAD_ENDPOINT as string | undefined
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${company.email}`

export async function submitLead(lead: Lead): Promise<void> {
  const endpoint = CUSTOM_ENDPOINT || FORMSUBMIT_ENDPOINT
  // FormSubmit options: subject line, a table layout, and replies going to the homeowner
  const body = CUSTOM_ENDPOINT
    ? lead
    : {
        _subject: `New consultation request: ${lead.projectType} — ${lead.name}`,
        _template: 'table',
        ...(lead.email ? { _replyto: lead.email } : {}),
        ...lead,
      }
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Lead endpoint returned ${res.status}`)
  if (!CUSTOM_ENDPOINT) {
    // FormSubmit answers 200 with success "false" when, e.g., the inbox has not been activated yet
    const data = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string }
    if (String(data.success) !== 'true') throw new Error(`FormSubmit: ${data.message ?? 'not sent'}`)
  }
}
