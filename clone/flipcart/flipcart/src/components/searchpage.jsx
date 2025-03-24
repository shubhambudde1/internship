import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import dummyProducts from "./Catagery/dummyProducts";

function Searchpage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q")?.toLowerCase() || ""; // Get query parameter and convert to lowercase

  const [searchResults, setSearchResults] = useState([]);
  const handleCategoryClick = (category) => {
    localStorage.setItem('category', category);
  };


  useEffect(() => {
    if (searchQuery) {
      const results = dummyProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]); // Clear results if no search query
    }
  }, [searchQuery]);

  return (
    <div className="container mx-auto ">

         <nav className="bg-white   flex gap-x-5">
                {/* Category Items */}
                {[
                  { label: 'Kilos', icon: '🧼' },
                  { label: 'Mobiles', icon: '📱' },
                  { label: 'Fashion', icon: '👗' },
                  { label: 'Electronics', icon: '💻' },
                  { label: 'Home & Furniture', icon: '🛋️' },
                  { label: 'Appliances', icon: '🍳' },
                  { label: 'Flight Bookings', icon: '✈️' },
                  { label: 'Beauty, Toys & More', icon: '🧸' },
                  { label: 'Two Wheelers', icon: '🏍️' },
                ].map((category, index) => (
                  <Link
                    key={index}
                    to={`/category/${category.label.toLowerCase()}`}
                    onClick={() => handleCategoryClick(category.label.toLowerCase())}
                  > 

                    <div className="flex flex-col items-center mt-[-30px] p-2  shadow-[0_20px_20px_0_rgba(0,0,0,0.75)]">
                     
                      <span className="text-[#212121] font-sans font-medium text-[15px] flex items-center">
                        {category.label} 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </nav>
        

      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {searchResults.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="block">
              <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-2 rounded-md"
                />
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No products found matching your search.</p>
      )}
    </div>
  );
}

export default Searchpage;
