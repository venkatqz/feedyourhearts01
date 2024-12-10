import React from "react";
import { useNavigate } from "react-router-dom";

function OrphanageCard({ orphanage }) {
  const navigate = useNavigate();

  return (
    <div
      className="orphanage"
      onClick={() => navigate(`/details/${orphanage._id}`)}>
      <div className="orphanage-header">
        <h3>{orphanage.orphanageName}</h3>
        <div className="top-right-info">
          <p>{orphanage.district}</p>
          <p>{orphanage.foodType}</p>
        </div>
      </div>
      <div className="details-row">
        <p>
          <span className="label">Required:</span>{" "}
          <span className="required">{orphanage.foodRequired || "N/A"}</span>
        </p>
        <p>
          <span className="label">Fulfilled:</span>{" "}
          <span className="fulfilled">0</span>
        </p>
      </div>
    </div>
  );
}

export default OrphanageCard;
