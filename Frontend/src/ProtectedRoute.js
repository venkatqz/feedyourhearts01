import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Use an existing protected route for session validation
        await axios.get("http://localhost:5000/api/protected-resource", {
          withCredentials: true, // Send cookies with the request
        });
      } catch (error) {
        console.error("Authentication error:", error.message);
        navigate("/login"); // Redirect to login if authentication fails
      }
    };

    checkAuth();
  }, [navigate]);

  return children; // Render the protected component
}

export default ProtectedRoute;
