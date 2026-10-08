/**
 * GET /api/google-reviews (Vercel Function)
 *
 * Returns the business's Google rating, review count and up to five reviews,
 * in the shape the site's GoogleReviews section expects. The Places API key
 * stays on the server; the browser only ever sees the reviews.
 *
 * Vercel environment variables (Project → Settings → Environment Variables):
 *   GOOGLE_PLACES_API_KEY  a key allowed to call "Places API (New)"
 *   GOOGLE_PLACE_ID        the Google Business Profile's Place ID
 */

const FIELDS = ['displayName', 'rating', 'userRatingCount', 'googleMapsUri', 'reviews'].join(',')

// Vercel's CDN keeps each answer for 30 minutes (and serves it while refreshing),
// so a traffic spike never turns into a Places API bill. Kept short: Google's
// terms limit how long Places content may be stored.
const CACHE = 'public, s-maxage=1800, stale-while-revalidate=3600'

const json = (body, status = 200, cache = 'no-store') =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': cache },
  })

export async function GET() {
  const key = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID
  if (!key || !placeId) return json({ error: 'Google reviews are not configured' }, 503)

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      headers: { 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': FIELDS },
    })
    if (!res.ok) {
      console.error(`Places API ${res.status}: ${await res.text()}`)
      return json({ error: 'Could not load reviews from Google' }, 502)
    }
    const place = await res.json()

    return json(
      {
        name: place.displayName?.text ?? '',
        rating: place.rating ?? 0,
        total: place.userRatingCount ?? 0,
        placeUrl: place.googleMapsUri ?? null,
        writeReviewUrl: `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`,
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
      },
      200,
      CACHE,
    )
  } catch (err) {
    console.error(err)
    return json({ error: 'Could not load reviews from Google' }, 502)
  }
}
