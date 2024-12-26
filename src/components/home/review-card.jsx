import { formatDistanceToNow } from 'date-fns'

function ReviewCard({ review }) {
  const timeAgo = review.date ? formatDistanceToNow(new Date(review.date), { addSuffix: true }) : ''

  return (
    <div className="review-card">
      {/* ... other review content ... */}
      <span className="review-date">{timeAgo}</span>
    </div>
  )
}

export default ReviewCard 