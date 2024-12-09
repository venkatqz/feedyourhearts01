import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function OrphanageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="details-container">
      <h2>Orphanage Details</h2>
      <p>Orphanage ID: {id}</p>
      <button onClick={() => navigate("/")}>Back to List</button>
    </div>
  );
}

export default OrphanageDetails;
