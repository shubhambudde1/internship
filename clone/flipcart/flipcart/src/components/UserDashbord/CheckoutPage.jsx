import React, { useState } from "react";

function CheckoutPage() {
  const [usePoints, setUsePoints] = useState(false);
  const [finalAmount, setFinalAmount] = useState(500); // example total

  const handleRedeem = () => {
    if (usePoints) {
      setFinalAmount(finalAmount - 50); // ₹50 off
    } else {
      setFinalAmount(500);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Checkout</h2>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={usePoints}
          onChange={() => {
            setUsePoints(!usePoints);
            handleRedeem();
          }}
        />
        Redeem Points (₹1 = 1 point)
      </label>
      <h3 className="mt-4 text-lg">Final Amount: ₹{finalAmount}</h3>
    </div>
  );
}

export default CheckoutPage;
