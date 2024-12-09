import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = sessionStorage.getItem('token'); // Get token from sessionStorage
      if (!token) {
        navigate('/login'); // Redirect to login if no token
        return;
      }

      try {
        // Use an existing protected route for token validation
        await axios.get('http://localhost:5000/api/protected-resource', {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        sessionStorage.clear(); // Clear session storage if token is invalid
        navigate('/login'); // Redirect to login
      }
    };

    checkAuth();
  }, [navigate]);

  return children; // Render the protected component
}

export default ProtectedRoute;
