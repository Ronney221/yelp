function getTimeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now - past;
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) return `${days} day${days === 1 ? "" : "s"} ago`;
    if (hours > 0) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    if (minutes > 0) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    return `${seconds} second${seconds === 1 ? "" : "s"} ago`;
  }
  
  export default function ReviewDisplay({ yelpData }) {
    return (
      <div className="card bg-base-100 shadow-xl p-6 mb-6">
        <h1 className="text-4xl font-bold text-center mb-4">{yelpData.business_name}</h1>
        <h2 className="text-2xl text-primary mb-4">Three Recent Customer Experiences</h2>
        {yelpData.reviews.map((review, i) => (
          <div key={i} className="mb-4">
            <p className="text-sm text-gray-500">{getTimeAgo(review.time_created)}</p>
            <div className="chat chat-start">
              <div className="chat-bubble">{review.name}.. {review.text}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }