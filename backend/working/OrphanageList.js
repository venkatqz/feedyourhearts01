import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";

function OrphanageList() {
  const navigate = useNavigate();

  const [orphanages, setOrphanages] = useState([]);
  const [filteredOrphanages, setFilteredOrphanages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState(""); // Dropdown filter
  const [donor, setDonor] = useState({ name: "John Doe", phone: "1234567890" });

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orphanages");
        setOrphanages(response.data);
        setFilteredOrphanages(response.data); // Update the filtered list
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  
    // Optionally, refresh data every minute
    const interval = setInterval(fetchData, 60000); // 60 seconds
  
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);
  

  // Handle search input
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    applyFilters(query, filterType);
  };

  // Handle dropdown filter
  const handleDropdownChange = (event) => {
    const selectedType = event.target.value;
    setFilterType(selectedType);
    applyFilters(searchQuery, selectedType);
  };

  

  // Apply filters for search and dropdown
  const applyFilters = (search, type) => {
    const filtered = orphanages.filter((orphanage) => {
      const matchesSearch = orphanage.orphanageName.toLowerCase().includes(search);
      const matchesType = type ? orphanage.foodType === type : true;
      return matchesSearch && matchesType;
    });
    setFilteredOrphanages(filtered);
  };

  return (
    <div className="maincontainer">
      <div className="containere">
        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search orphanages..."
            className="search-bar"
            value={searchQuery}
            onChange={handleSearch}
          />
          <select className="dropdown" value={filterType} onChange={handleDropdownChange}>
            <option value="">All</option>
            <option value="food">Food</option>
            <option value="grocery">Grocery</option>
            <option value="freshGrocery">Fresh Grocery</option>
          </select>
        </div>
        <div className="donation-list">
          {filteredOrphanages.length > 0 ? (
            filteredOrphanages.map((orphanage) => (
              <div
                className="orphanage"
                key={orphanage._id} // MongoDB document ID
                onClick={() => navigate(`/details/${orphanage._id}`)}
              >
                <div className="orphanage-header">
                  <h3>{orphanage.orphanageName}</h3>
                  <div className="top-right-info">
                    <p>{orphanage.district}</p>
                    <p>{orphanage.foodType}</p>
                  </div>
                </div>
                <div className="details-row">
                  <p>
                    <span className="label">Required:</span>{" "}
                    <span className="required">{orphanage.foodRequired || "N/A"}</span>
                  </p>
                  <p>
                    <span className="label">Fulfilled:</span>{" "}
                    <span className="fulfilled">0</span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No orphanages found.</p>
          )}
        </div>
      </div>
      <div className="donor-info">
        <div className="greeting">
          <h1>Hi!</h1>
        </div>
        <div className="donor-details">
          <h3>{donor.name}</h3>
          <p>{donor.phone}</p>
          <p>
            Fulfilled:{" "}
            <span className="fulfilled">
              {filteredOrphanages.reduce((acc, curr) => acc + (curr.fulfilled || 0), 0)}
            </span>
          </p>
          <p className="thank-you">Thanks for supporting us!!!</p>
        </div>
      </div>
    </div>
  );
}

export default OrphanageList;
