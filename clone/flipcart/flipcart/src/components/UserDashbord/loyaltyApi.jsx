export const getLoyaltyDetails = async (userId) => {
    // Example mock response
    return {
      points: 120,
      history: [
        { id: 1, detail: "+10 for review" },
        { id: 2, detail: "-50 for ₹50 off" },
      ],
      tier: "Silver",
    };
  };
  