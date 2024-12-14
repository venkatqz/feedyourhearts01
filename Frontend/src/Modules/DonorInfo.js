import React from "react";

function DonorInfo({ orphanages }) {
  const donor = { name: "John Doe", contact: "1234567890" };
  const totalFulfilled = orphanages.reduce((acc, curr) => acc + (curr.fulfilled || 0), 0);

  return (
    <div className="donor-info">
      <div className="greeting">
        <h1>Hi!</h1>
      </div>
      <div className="donor-details">
        <h3>{donor.name}</h3>
        <p>{donor.contact}</p>
        <p>
          Fulfilled:{" "}
          <span className="fulfilled">{totalFulfilled}</span>
        </p>
        <p className="thank-you">Thanks for supporting us!!!</p>
      </div>
    </div>
  );
}

export default DonorInfo;
