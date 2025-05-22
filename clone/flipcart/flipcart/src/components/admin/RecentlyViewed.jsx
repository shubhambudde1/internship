import React, { useEffect, useState } from 'react';

const RecentlyViewed = ({ userId }) => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5001/api/rview/recently-viewed/${userId}`)
      .then(res => res.json())
      .then(setRecentlyViewed);
  }, [userId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Recently Viewed</h2>
      <div className="flex space-x-4 overflow-x-auto">
        {recentlyViewed.map(product => (
          <div key={product.id} className="min-w-[200px] border rounded-lg overflow-hidden">
            <img src="./uploads/image_path-1743948550216.jpg" alt={product.name} className="h-40 w-full object-cover" />
            <div className="p-2">
              <h4 className="font-semibold">{product.name}</h4>
              <p className="text-green-600 font-medium">₹{product.price}</p>
              <a href={`/product/${product.id}`} className="text-blue-500 text-sm">View Product</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
