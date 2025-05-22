const products = [
    { id: 1, name: "iPhone 14", price: 70000, brand: "Apple", rating: 4.5 },
    { id: 2, name: "Galaxy S23", price: 65000, brand: "Samsung", rating: 4.6 },
    { id: 3, name: "Pixel 8", price: 60000, brand: "Google", rating: 4.4 },
  ];
  
  function ProductCard({ compareList, setCompareList }) {
    const toggleCompare = (product) => {
      if (compareList.find(p => p.id === product.id)) {
        setCompareList(compareList.filter(p => p.id !== product.id));
      } else {
        if (compareList.length >= 4) return alert("Limit 4 products.");
        setCompareList([...compareList, product]);
      }
    };
  
    return (
      <div className="grid grid-cols-3 gap-4 p-4">
        {products.map(product => (
          <div key={product.id} className="border p-4">
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <button onClick={() => toggleCompare(product)} className="mt-2 bg-blue-500 text-white p-2 rounded">
              {compareList.find(p => p.id === product.id) ? "Remove" : "Add to Compare"}
            </button>
          </div>
        ))}
      </div>
    );
  }
  
  export default ProductCard;
  