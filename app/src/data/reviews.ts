/**
 * PLACEHOLDER Google review data. Not pulled from a real Google Business
 * Profile — this environment has no network access to the Places API right
 * now. Shape matches what the Places API "reviews" field returns, so this
 * can be swapped for a real fetch (or a static export from one) without
 * changing the component: rating, relativeTime, authorName, text.
 */
export interface Review {
  id: string
  authorName: string
  rating: 1 | 2 | 3 | 4 | 5
  relativeTime: string
  text: string
}

export const reviewsSummary = {
  averageRating: 4.9,
  totalReviews: 128,
  /** Wire to the real Google Business Profile "write a review" / listing URL. */
  profileUrl: '#',
}

export const reviews: Review[] = [
  {
    id: 'r1',
    authorName: 'Marta E.',
    rating: 5,
    relativeTime: '2 weeks ago',
    text: 'The estimate they sent online was within a few hundred dollars of the final invoice. Crew showed up on time every day.',
  },
  {
    id: 'r2',
    authorName: 'Daniel O.',
    rating: 5,
    relativeTime: '1 month ago',
    text: 'Grace was the only crew who showed us a finished bathroom our size before we signed anything. Clean work, clear communication.',
  },
  {
    id: 'r3',
    authorName: 'Priya R.',
    rating: 5,
    relativeTime: '2 months ago',
    text: 'Months of work in our house and it stayed liveable the whole time. Would hire again without hesitation.',
  },
]
