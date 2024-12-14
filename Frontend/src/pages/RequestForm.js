import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./form.css";

  import { UserContext } from '../App';
function RequestForm() {
  const navigate = useNavigate();
  const { conuser, setUser } = useContext(UserContext);

  
  const districts = [
    'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri',
    'Dindigul', 'Erode', 'Kallakurichi', 'Kancheepuram', 'Karur', 'Krishnagiri',
    'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur',
    'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi',
    'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur',
    'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram',
    'Virudhunagar'
  ];
  const [formData, setFormData] = useState({
    registrationNumber: "",
    orphanageName: "",
    contact: "",
    address: "",
    foodType: "",
    foodRequired: "",
    district:"",
    dateTill: "",
  });

  const [errors, setErrors] = useState({
    contact: "",
    foodRequired: "",
    districtRequired:""
  });

  const [isLoading, setIsLoading] = useState(true); // Loading state for API call

  // Fetch orphanage details on mount
  useEffect(() => {
    const fetchOrphanageDetails = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/user-info", {
          withCredentials: true,
        });
        
        
        // const { registrationNumber, orphanageName, contact, address,district } = response.data.user;
        const {address,
          authorizedPerson,
          contact,
          district,
          email,
          orphanageName,
          registrationNumber,
          type:userType}=response.data.user;

        console.log("id",registrationNumber);
        console.log("destructured data", authorizedPerson,
          contact,
          district,
          email,
          orphanageName,
          registrationNumber,
          userType);
        
        console.log(response.data);
       
        setUser({address,
          authorizedPerson,
          contact,
          district,
          email,
          orphanageName,
          registrationNumber,
          userType});
        console.log(conuser);
        
        
        setFormData((prevState) => ({
          ...prevState,
          registrationNumber,
          orphanageName,
          contact,
          district,
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
    console.log("Submitting data:", formData);


    // Final Validation for Phone Number
    if (formData.contact.length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }
    if (!formData.district || formData.district === '') {
      setErrors((prevErrors)=>({...prevErrors,districtRequired:"Select the district"}));
    }

    try {
      await axios.post("http://localhost:5000/food-requests", formData, {
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

          <label>District:</label>
          <select
            name="district"
            value={formData.district || ''}
            onChange={handleChange}
            
          >
            <option value="">Select your district</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
          {errors.districtRequired && <span className="error">{errors.districtRequired}</span>}


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
