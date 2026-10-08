/**
 * Live reviews from the company's Google Business Profile, served by the
 * Vercel Function in `api/google-reviews.js`, which keeps the Places API key
 * on the server. Google returns up to five reviews, in its "most relevant" order.
 */

const ENDPOINT = '/api/google-reviews'

export interface GoogleReview {
  author: string
  authorUrl: string | null
  authorPhoto: string | null
  rating: number
  text: string
  when: string
  url: string | null
}

export interface GoogleReviewsData {
  name: string
  rating: number
  total: number
  placeUrl: string | null
  writeReviewUrl: string
  reviews: GoogleReview[]
}

/** Throws when the function is not configured yet (503), Google fails (502), or there is no function (local dev). */
export async function fetchGoogleReviews(): Promise<GoogleReviewsData> {
  const res = await fetch(ENDPOINT, { headers: { Accept: 'application/json' } })
  if (!res.ok || !res.headers.get('content-type')?.includes('application/json')) {
    throw new Error(`Reviews endpoint returned ${res.status}`)
  }
  return (await res.json()) as GoogleReviewsData
}

export function ratingLabel(rating: number): string {
  if (rating >= 4.5) return 'Excellent'
  if (rating >= 4) return 'Very good'
  if (rating >= 3) return 'Good'
  return 'Rated'
}
