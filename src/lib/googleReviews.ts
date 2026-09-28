/**
 * Live reviews from the company's Google Business Profile.
 *
 * Preferred: VITE_GOOGLE_REVIEWS_ENDPOINT — the Cloud Run function in
 * `server/google-reviews`, which keeps the API key in Secret Manager
 * (setup: docs/google-reviews-gcp.md).
 *
 * Fallback, browser-only: VITE_GOOGLE_MAPS_API_KEY + VITE_GOOGLE_PLACE_ID, using
 * the Maps JavaScript API. The key is then visible in the page, so restrict it
 * to the site's domain.
 *
 * Google returns up to five reviews, in its own "most relevant" order.
 */

const ENDPOINT = import.meta.env.VITE_GOOGLE_REVIEWS_ENDPOINT as string | undefined
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined
const PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID as string | undefined

export const googleReviewsConfigured = Boolean(ENDPOINT || (API_KEY && PLACE_ID))

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

/* Minimal shapes of the Maps JS API objects we read — avoids a types dependency. */
interface AuthorAttribution {
  displayName: string | null
  photoURI: string | null
  uri: string | null
}

interface PlaceReview {
  rating: number | null
  text: string | null
  relativePublishTimeDescription: string | null
  authorAttribution: AuthorAttribution | null
  googleMapsURI?: string | null
}

interface PlaceResult {
  displayName: string | null
  rating: number | null
  userRatingCount: number | null
  googleMapsURI: string | null
  reviews: PlaceReview[] | null
  fetchFields(req: { fields: string[] }): Promise<unknown>
}

interface MapsGlobal {
  maps: {
    importLibrary(name: 'places'): Promise<{ Place: new (opts: { id: string }) => PlaceResult }>
  }
}

declare global {
  interface Window {
    google?: MapsGlobal
    __graceMapsReady?: () => void
  }
}

let loader: Promise<void> | null = null

function loadMapsApi(): Promise<void> {
  if (window.google?.maps?.importLibrary) return Promise.resolve()
  loader ??= new Promise<void>((resolve, reject) => {
    window.__graceMapsReady = () => resolve()
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      API_KEY ?? '',
    )}&v=weekly&loading=async&callback=__graceMapsReady`
    script.async = true
    script.onerror = () => {
      loader = null
      reject(new Error('Google Maps script failed to load'))
    }
    document.head.append(script)
  })
  return loader
}

export async function fetchGoogleReviews(): Promise<GoogleReviewsData> {
  if (ENDPOINT) {
    const res = await fetch(ENDPOINT)
    if (!res.ok) throw new Error(`Reviews endpoint returned ${res.status}`)
    return (await res.json()) as GoogleReviewsData
  }
  if (!API_KEY || !PLACE_ID) throw new Error('Google reviews are not configured')
  await loadMapsApi()
  const { Place } = await window.google!.maps.importLibrary('places')
  const place = new Place({ id: PLACE_ID })
  await place.fetchFields({ fields: ['displayName', 'rating', 'userRatingCount', 'googleMapsURI', 'reviews'] })

  return {
    name: place.displayName ?? '',
    rating: place.rating ?? 0,
    total: place.userRatingCount ?? 0,
    placeUrl: place.googleMapsURI,
    writeReviewUrl: `https://search.google.com/local/writereview?placeid=${encodeURIComponent(PLACE_ID)}`,
    reviews: (place.reviews ?? [])
      .filter((r) => r.text)
      .map((r) => ({
        author: r.authorAttribution?.displayName ?? 'Google user',
        authorUrl: r.authorAttribution?.uri ?? null,
        authorPhoto: r.authorAttribution?.photoURI ?? null,
        rating: r.rating ?? 0,
        text: r.text ?? '',
        when: r.relativePublishTimeDescription ?? '',
        url: r.googleMapsURI ?? r.authorAttribution?.uri ?? place.googleMapsURI,
      })),
  }
}

export function ratingLabel(rating: number): string {
  if (rating >= 4.5) return 'Excellent'
  if (rating >= 4) return 'Very good'
  if (rating >= 3) return 'Good'
  return 'Rated'
}
