import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./form.css";

function RequestForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    registrationNumber: "",
    orphanageName: "",
    contact: "",
    address: "",
    foodType: "",
    foodRequired: "",
    dateTill: "",
  });

  const [errors, setErrors] = useState({
    contact: "",
    foodRequired: "",
  });

  const [isLoading, setIsLoading] = useState(true); // Loading state for API call

  // Fetch orphanage details on mount
  useEffect(() => {
    const fetchOrphanageDetails = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/user-info", {
          withCredentials: true,
        });

        const { registrationNumber, orphanageName, contact, address } = response.data.user;
        console.log(response.data);
        
        setFormData((prevState) => ({
          ...prevState,
          registrationNumber,
          orphanageName,
          contact,
          address,
        }));
        setIsLoading(false); // Data fetched successfully
      } catch (error) {
        console.error("Error fetching orphanage details:", error);
        alert("Failed to load orphanage details. Please log in again.");
        navigate("/login");
      }
    };

    fetchOrphanageDetails();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation for Phone Number
    if (name === "contact" && !/^\d{0,10}$/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        contact: "Phone number must be 10 digits",
      }));
      return;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, contact: "" }));
    }

    // Validation for Food Required (Numeric Input)
    if (name === "foodRequired" && !/^\d*$/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        foodRequired: "Only digits are allowed",
      }));
      return;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, foodRequired: "" }));
    }

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final Validation for Phone Number
    if (formData.contact.length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/req/food-requests", formData, {
        withCredentials: true,
      });
      alert("Form Submitted Successfully!");
      navigate("/orphanage-list");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit the form. Please try again.");
    }
  };

  if (isLoading) {
    return <p>Loading orphanage details...</p>; // Show loading state
  }

  return (
    <div className="form-container">
      <h2>Orphanage Food Request Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Orphanage ID:
          <input type="text" name="registrationNumber" value={formData.registrationNumber || ""} readOnly />
        </label>
        <label>
          Orphanage Name:
          <input type="text" name="orphanageName" value={formData.orphanageName || ""} readOnly />
        </label>
        <label>
          Phone Number:
          <input
            type="tel"
            name="contact"
            value={formData.contact || ""}
            onChange={handleChange}
            required
            maxLength="10"
          />
          {errors.contact && <span className="error">{errors.contact}</span>}
        </label>
        <label>
          Address:
          <textarea name="address" value={formData.address || ""} readOnly required />
        </label>
        <label>
          Food Type:
          <select name="foodType" value={formData.foodType || ""} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="food">Food</option>
            <option value="grocery">Grocery</option>
            <option value="freshGrocery">Fresh Grocery</option>
          </select>
        </label>
        {formData.foodType === "food" && (
          <label>
            No. of Food Required:
            <input
              type="number"
              name="foodRequired"
              value={formData.foodRequired || ""}
              onChange={handleChange}
              required
            />
            {errors.foodRequired && <span className="error">{errors.foodRequired}</span>}
          </label>
        )}
        <label>
          Date and Time Till:
          <input
            type="datetime-local"
            name="dateTill"
            value={formData.dateTill || ""}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RequestForm;
