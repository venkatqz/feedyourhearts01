import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./form.css";

function ReqeustForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    orphanageId: "",
    orphanageName: "",
    phoneNumber: "",
    address: "",
    foodType: "",
    foodRequired: "",
    dateTill: "",
  });

  const [errors, setErrors] = useState({
    phoneNumber: "",
    foodRequired: "",
  });

  useEffect(() => {
    // Fetch the orphanage details from localStorage (assuming they are saved after login)
    const orphanageId = localStorage.getItem("orphanageId");
    const orphanageName = localStorage.getItem("orphanageName");

    // Auto-fill orphanage details
    setFormData((prevState) => ({
      ...prevState,
      orphanageId: orphanageId || "",
      orphanageName: orphanageName || "",
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation for Phone Number
    if (name === "phoneNumber") {
      if (!/^\d{0,10}$/.test(value)) {
        setErrors({ ...errors, phoneNumber: "Phone number must be 10 digits" });
        return;
      } else {
        setErrors({ ...errors, phoneNumber: "" });
      }
    }

    // Validation for Food Required (Numeric Input)
    if (name === "foodRequired") {
      if (!/^\d*$/.test(value)) {
        setErrors({ ...errors, foodRequired: "Only digits are allowed" });
        return;
      } else {
        setErrors({ ...errors, foodRequired: "" });
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final Validation for Phone Number
    if (formData.phoneNumber.length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    // Final Validation for Food Required
    if (formData.foodType === "food" && (!formData.foodRequired || isNaN(formData.foodRequired))) {
      alert("Please enter a valid number for food required.");
      return;
    }

    try {
      // Send the data to the backend
      await axios.post("http://localhost:5000/api/orphanages", formData);
      alert("Form Submitted Successfully!");

      // Redirect to the orphanage list page
      navigate("/orphanage-list");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit the form. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Orphanage Food Request Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Orphanage ID:
          <input
            type="text"
            name="orphanageId"
            value={formData.orphanageId}
            readOnly
          />
        </label>

        <label>
          Orphanage Name:
          <input
            type="text"
            name="orphanageName"
            value={formData.orphanageName}
            readOnly
          />
        </label>

        <label>
          Phone Number:
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            maxLength="10"
          />
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
        </label>

        <label>
          Address:
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>
        </label>

        <label>
          Food Type:
          <select
            name="foodType"
            value={formData.foodType}
            onChange={handleChange}
            required
          >
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
              value={formData.foodRequired}
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
            value={formData.dateTill}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ReqeustForm;
