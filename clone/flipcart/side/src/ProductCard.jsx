import React from 'react';

function ProductCard({ product, handleCompare, isSelected }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Price: {product.price}</p>
      <input
        type="checkbox"
        id={`compare-${product.id}`}
        checked={isSelected}
        onChange={() => handleCompare(product)}
      />
      <label htmlFor={`compare-${product.id}`}>Add to Compare</label>
    </div>
  );
}

export default ProductCard;
