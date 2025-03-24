import React from "react";
import { useLocation } from "react-router-dom";

function Searchpage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q"); // Get query parameter

  return (
    <div>
      <p>Search Query: {searchQuery}</p>
    </div>
  );
}

export default Searchpage;
