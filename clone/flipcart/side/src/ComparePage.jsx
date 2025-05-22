import React from 'react';

function ComparePage({ products }) {
  return (
    <div className="compare-page">
      <h2>Compare Products</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ComparePage;
