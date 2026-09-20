import { ImagePlaceholder } from './ImagePlaceholder'
import { reviews, reviewsSummary } from '../data/reviews'
import './ClientStories.css'

function Stars({ rating }: { rating: number }) {
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" className={i < rating ? 'star-filled' : 'star-empty'}>
          <path d="M12 2.5l2.9 6.6 7.1.7-5.4 4.8 1.6 7-6.2-3.7L5.8 21.6l1.6-7-5.4-4.8 7.1-.7z" fill="currentColor" />
        </svg>
      ))}
    </span>
  )
}

export function ClientStories() {
  return (
    <section className="client-stories" id="reviews">
      <div className="section">
        <div className="client-stories-heading">
          <div>
            <p className="eyebrow client-stories-eyebrow">Client stories</p>
            <div className="client-stories-rating">
              <Stars rating={Math.round(reviewsSummary.averageRating)} />
              <span className="client-stories-rating-value">{reviewsSummary.averageRating}</span>
              <a href={reviewsSummary.profileUrl} className="client-stories-count">
                {reviewsSummary.totalReviews} Google reviews
              </a>
            </div>
          </div>
          <a href={reviewsSummary.profileUrl} className="client-stories-cta">
            See all reviews
          </a>
        </div>

        <div className="client-stories-grid">
          {reviews.map((review) => (
            <div className="review-card" key={review.id}>
              <div className="review-card-header">
                <div className="review-avatar">
                  <ImagePlaceholder shape="circle" caption="Reviewer photo" />
                </div>
                <div>
                  <div className="review-author">{review.authorName}</div>
                  <div className="review-meta">
                    <Stars rating={review.rating} />
                    <span>{review.relativeTime}</span>
                  </div>
                </div>
              </div>
              <p className="review-text">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
