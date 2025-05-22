function ComparePage({ compareList }) {
    return (
      <div className="p-4">
        <h2 className="text-xl mb-4">Compare Products</h2>
        <table className="table-auto border w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Brand</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {compareList.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>₹{product.price}</td>
                <td>{product.brand}</td>
                <td>{product.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default ComparePage;
  