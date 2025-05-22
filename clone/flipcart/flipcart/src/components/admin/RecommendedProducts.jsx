import React, { useEffect, useState } from "react";
import axios from "axios";

const RecommendedProducts = ({ userId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // axios.get(`http://localhost:5001/api/recomended/${userId}`)
    axios.get(`http://localhost:5001/api/recomended`)
      .then(res => {
        setRecommendations(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [userId]);

  if (loading) return <div className="text-center p-5">Loading recommendations...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
      <div className="flex overflow-x-auto gap-4">
        {recommendations.map(item => (
          <div key={item.id} className="min-w-[200px] bg-white rounded-xl shadow p-2">
            <img src={`path_to_images/${item.recommended_product_id}.jpg`} alt="" className="rounded" />
            <p className="text-sm mt-2">{item.reason}</p>
            <button className="text-blue-500 text-sm mt-1">View More</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
