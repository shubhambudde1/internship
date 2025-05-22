import React from "react";

function TransactionHistory({ history }) {
  return (
    <div className="mt-4">
      <h3 className="font-semibold">Transaction History:</h3>
      <ul className="list-disc ml-6">
        {history.map((item) => (
          <li key={item.id}>{item.detail}</li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionHistory;
