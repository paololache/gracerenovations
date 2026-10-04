/** A consultation request, with the fields of the current site's form. */
export interface Lead {
  name: string
  phone: string
  email: string
  city: string
  projectType: string
  timeline: string
  budget: string
  details: string
  source: string
}

export const PROJECT_TYPES = [
  'Kitchen Renovation',
  'Bathroom Renovation',
  'Sunroom Renovation',
  'Interior Painting',
  'Exterior Renovation',
  'Interior Renovation',
  'Remodeling',
  'Roofing',
  'General Home Improvement',
  'Not Sure Yet',
]

export const TIMELINES = ['ASAP', 'Within 1 Month', '1–3 Months', '3–6 Months', 'Planning / Researching']

export const BUDGETS = ['Under $5,000', '$5,000 – $15,000', '$15,000 – $30,000', '$30,000 – $60,000', '$60,000+', 'Not sure yet']

/**
 * Where lead forms post to, e.g. a Formspree or CRM webhook URL, set as
 * VITE_LEAD_ENDPOINT in `.env.local`. Grace has no public email address on
 * the current site, so without an endpoint the form cannot send: it throws,
 * and the form asks the visitor to call instead.
 */
const LEAD_ENDPOINT = import.meta.env.VITE_LEAD_ENDPOINT as string | undefined

export const leadsConfigured = Boolean(LEAD_ENDPOINT)

export async function submitLead(lead: Lead): Promise<void> {
  if (!LEAD_ENDPOINT) throw new Error('Lead endpoint is not configured (VITE_LEAD_ENDPOINT)')
  const res = await fetch(LEAD_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(lead),
  })
  if (!res.ok) throw new Error(`Lead endpoint returned ${res.status}`)
}
