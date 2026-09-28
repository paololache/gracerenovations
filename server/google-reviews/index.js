import { http } from '@google-cloud/functions-framework'

/**
 * GET → the business's Google rating, review count and up to five reviews,
 * in the shape the site's GoogleReviews component expects.
 *
 * Env (set at deploy time):
 *   PLACES_API_KEY   — mounted from Secret Manager, never sent to the browser
 *   PLACE_ID         — the Google Business Profile's Place ID
 *   ALLOWED_ORIGINS  — comma-separated site origins allowed to call this, e.g.
 *                      https://gracebuildingco.com,http://localhost:5173
 */

const FIELDS = ['displayName', 'rating', 'userRatingCount', 'googleMapsUri', 'reviews'].join(',')
const CACHE_SECONDS = 300

const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)

// Short in-memory cache per instance, so a traffic spike doesn't turn into a
// Places API bill. Keep it short: Google's terms limit how long Places content is kept.
let cached = null

async function fetchPlace() {
  if (cached && Date.now() - cached.at < CACHE_SECONDS * 1000) return cached.data

  const { PLACES_API_KEY, PLACE_ID } = process.env
  const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(PLACE_ID)}`, {
    headers: { 'X-Goog-Api-Key': PLACES_API_KEY, 'X-Goog-FieldMask': FIELDS },
  })
  if (!res.ok) throw new Error(`Places API ${res.status}: ${await res.text()}`)
  const place = await res.json()

  const data = {
    name: place.displayName?.text ?? '',
    rating: place.rating ?? 0,
    total: place.userRatingCount ?? 0,
    placeUrl: place.googleMapsUri ?? null,
    writeReviewUrl: `https://search.google.com/local/writereview?placeid=${encodeURIComponent(PLACE_ID)}`,
    reviews: (place.reviews ?? [])
      .filter((r) => r.text?.text)
      .map((r) => ({
        author: r.authorAttribution?.displayName ?? 'Google user',
        authorUrl: r.authorAttribution?.uri ?? null,
        authorPhoto: r.authorAttribution?.photoUri ?? null,
        rating: r.rating ?? 0,
        text: r.text.text,
        when: r.relativePublishTimeDescription ?? '',
        url: r.googleMapsUri ?? r.authorAttribution?.uri ?? place.googleMapsUri ?? null,
      })),
  }
  cached = { at: Date.now(), data }
  return data
}

http('googleReviews', async (req, res) => {
  const origin = req.get('Origin')
  if (origin && allowedOrigins.includes(origin)) {
    res.set('Access-Control-Allow-Origin', origin)
    res.set('Vary', 'Origin')
  }
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET')
    res.status(204).send('')
    return
  }
  if (req.method !== 'GET') {
    res.status(405).send('Method not allowed')
    return
  }
  if (!process.env.PLACES_API_KEY || !process.env.PLACE_ID) {
    console.error('PLACES_API_KEY or PLACE_ID is not set')
    res.status(500).json({ error: 'Not configured' })
    return
  }

  try {
    const data = await fetchPlace()
    res.set('Cache-Control', `public, max-age=${CACHE_SECONDS}`)
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(502).json({ error: 'Could not load reviews from Google' })
  }
})
