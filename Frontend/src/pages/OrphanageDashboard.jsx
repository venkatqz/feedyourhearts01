import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



function OrphanageDashboard() {
  const [orphanageName, setOrphanageName] = useState('');
  const navigate = useNavigate();

  // Check if the user is authenticated and is an orphanage
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const role = localStorage.getItem('role');

    if (isAuthenticated !== 'true' || role !== 'orphanage') {
      navigate('/Login'); // Redirect to login page if not authenticated or not an orphanage
    } else {
      const name = localStorage.getItem('orphanageName') || 'Your Orphanage';
      setOrphanageName(name);
      console.log(name);
    }
  }, [navigate]);

  const handleRequestClick = () => {
    navigate('/RequestForm'); // Redirect to request form
  };

  return (
    <div className="container mt-5">
      <h1>Welcome to {orphanageName} Dashboard</h1>
      <p className="lead">Manage your requests and view updates here.</p>
      <button className="btn btn-primary" onClick={handleRequestClick}>
        Request Now
      </button>
    </div>
  );
}

export default OrphanageDashboard;
