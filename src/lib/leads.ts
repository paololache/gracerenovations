export interface Lead {
  service: string
  timeline: string
  name: string
  phone: string
  email: string
  zip: string
  notes: string
  source: string
}

const LEAD_EMAIL = 'hello@gracebuildingco.com'

/**
 * Where lead forms post to, e.g. a Formspree or CRM webhook URL, set as
 * VITE_LEAD_ENDPOINT in `.env`. Without it, the lead opens as a pre-filled email.
 */
const LEAD_ENDPOINT = import.meta.env.VITE_LEAD_ENDPOINT as string | undefined

export async function submitLead(lead: Lead): Promise<void> {
  if (LEAD_ENDPOINT) {
    const res = await fetch(LEAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(lead),
    })
    if (!res.ok) throw new Error(`Lead endpoint returned ${res.status}`)
    return
  }

  const body = [
    `Project: ${lead.service}`,
    `Start: ${lead.timeline || 'Not sure yet'}`,
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email}`,
    `Zip: ${lead.zip}`,
    lead.notes && `Notes: ${lead.notes}`,
    `Source: ${lead.source}`,
  ]
    .filter(Boolean)
    .join('\n')
  window.location.href = `mailto:${LEAD_EMAIL}?subject=${encodeURIComponent(
    `Free estimate request — ${lead.service}`,
  )}&body=${encodeURIComponent(body)}`
}
