import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";

function DonationLogs({ logType }) {
  const {conuser} =UserContext;
  const { id } = useParams();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const url = logType === 'orphanage' 
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
  console.log("log",logs);


  

  

  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading logs: {error.message}</p>;

  return (
    <div>
      <h2>Donation Logs for {logType === 'orphanage' ? 'Orphanage' : 'Donor'}</h2>
      {logs.length === 0 ? (
        <p>No donation logs found.</p>
      ) : (
        <ul>
          {logs.map((log) => (
            <li key={log._id}>
              <p><strong>Donor:</strong> {conuser.name}</p>
              <p><strong>Email:</strong> {log.donorId.email}</p>
              <p><strong>Contact:</strong> {log.donorId.contact}</p>
              <p><strong>Donation Details:</strong> {log.donationDetails}</p>
              <p><strong>Food Type:</strong> {log.foodRequest.foodType}</p>
              <p><strong>Food Required:</strong> {log.foodRequest.foodRequired}</p>
              <p><strong>Address:</strong> {log.foodRequest.address}</p>
              <p><strong>Date Till:</strong> {new Date(log.foodRequest.dateTill).toLocaleDateString()}</p>
              <p><strong>Received By:</strong> {log.receiver.orphanageName}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DonationLogs;
