import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
import "./DonationLogs.css"; // Assuming you're using a CSS file

function DonationLogs({ logType }) {
  const { conuser } = useContext(UserContext);
  const { id } = useParams();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const url =
          logType === "orphanage"
            ? `http://localhost:5000/orphanage-donation-logs/${id}`
            : `http://localhost:5000/donor-donation-logs/${id}`;

        const response = await axios.get(url);
        setLogs(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchLogs();
  }, [logType, id]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error loading logs: {error.message}</p>;

  return (
    <div className="donation-logs">
      <h2 className="title">
        Donation Logs for {logType === "orphanage" ? "Orphanage" : "Donor"}
      </h2>
      {logs.length === 0 ? (
        <p className="no-logs">No donation logs found.</p>
      ) : (
        <ul className="logs-list">
          {logs.map((log) => (
            <li className="log-item" key={log._id}>
              <p>
                <strong>Donor:</strong> {conuser?.name}
              </p>
              <p>
                <strong>Email:</strong> {conuser?.email}
              </p>
              <p>
                <strong>Contact:</strong> {conuser?.contact}
              </p>
              <p>
                <strong>Donation Details:</strong> {log.donationDetails}
              </p>
              <p>
                <strong>Date:</strong> {log.date}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DonationLogs;
