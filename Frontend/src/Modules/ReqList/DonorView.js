import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterBar from "./FilterBar";
import OrphanageCard from "./OrphanageCard";
import DonorInfo from "./DonorInfo";
import "./List.css";

function OrphanageList() {
  const [orphanages, setOrphanages] = useState([]);
  const [filteredOrphanages, setFilteredOrphanages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/");
        console.log(response.data);
        
        setOrphanages(response.data);
        setFilteredOrphanages(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Refresh data every minute
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const applyFilters = (search, type) => {
    const filtered = orphanages.filter((orphanage) => {
      const matchesSearch = orphanage.orphanageName.toLowerCase().includes(search.toLowerCase());
      const matchesType = type ? orphanage.foodType === type : true;
      return matchesSearch && matchesType;
    });
    setFilteredOrphanages(filtered);
  };

  return (
    <div className="maincontainer">
      <div className="containere">
        <FilterBar
          searchQuery={searchQuery}
          filterType={filterType}
          setSearchQuery={setSearchQuery}
          setFilterType={setFilterType}
          applyFilters={applyFilters}
        />
        <div className="donation-list">
          {filteredOrphanages.length > 0 ? (
            filteredOrphanages.map((orphanage) => (
              <OrphanageCard key={orphanage._id} orphanage={orphanage} />
            ))
          ) : (
            <p>No orphanages found.</p>
          )}
        </div>
      </div>
      <DonorInfo orphanages={filteredOrphanages} />
    </div>
  );
}

export default OrphanageList;
