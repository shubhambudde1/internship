import React from 'react';
import { Star } from 'lucide-react';

// Reviews Component
function Reviews({ reviews }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
      {reviews.map((review, index) => (
        <div key={index} className="mb-4 p-4 border rounded shadow-sm">
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                className={
                  i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'
                }
              />
            ))}
          </div>
          <p className="text-gray-600">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default Reviews;
