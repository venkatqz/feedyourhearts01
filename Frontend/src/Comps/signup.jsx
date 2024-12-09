import React, { useState } from "react";
import "./SignupPage.css"; // Import the CSS file

const SignupPage = () => {
  const [userType, setUserType] = useState("");
  const [formData, setFormData] = useState({});

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
    setFormData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form submitted successfully! Check the console for details.");
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Signup Page</h2>
        <label className="user-type-label">
          Select User Type:
          <select
            value={userType}
            onChange={handleUserTypeChange}
            className="user-type-select"
          >
            <option value="">--Select--</option>
            <option value="Donor">Donor</option>
            <option value="Orphanage">Orphanage</option>
          </select>
        </label>

        {userType && (
          <form onSubmit={handleSubmit} className="signup-form">
            {userType === "Donor" && (
              <>
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Email ID:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Mobile No:</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile || ""}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Address:</label>
                  <textarea
                    name="address"
                    value={formData.address || ""}
                    onChange={handleInputChange}
                    required
                    className="form-textarea"
                  />
                </div>
              </>
            )}

            {userType === "Orphanage" && (
              <>
                <div className="form-group">
                  <label>Orphanage ID:</label>
                  <input
                    type="text"
                    name="orphanageId"
                    value={formData.orphanageId || ""}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Email ID:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Orphanage Name:</label>
                  <input
                    type="text"
                    name="orphanageName"
                    value={formData.orphanageName || ""}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Mobile No:</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile || ""}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Address:</label>
                  <textarea
                    name="address"
                    value={formData.address || ""}
                    onChange={handleInputChange}
                    required
                    className="form-textarea"
                  />
                </div>
              </>
            )}

            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
