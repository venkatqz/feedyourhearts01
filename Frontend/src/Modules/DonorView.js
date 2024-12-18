import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterBar from "./FilterBar";
import OrphanageCard from "./OrphanageCard";
import DonorInfo from "./DonorInfo";
import "./List.css";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from '../App';
function OrphanageList() {
  const navigate=useNavigate();
  const { conuser, setUser } = useContext(UserContext);

  const { msg } = useParams(); // Extract 'msg' from route params
  const [displayMessage, setDisplayMessage] = useState("");
  console.log(msg);
  
  const [orphanages, setOrphanages] = useState([]);
  const [filteredOrphanages, setFilteredOrphanages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    // Set the message in the state
    if (msg) {
      setDisplayMessage(msg);

      // Clear the message after 2 seconds
      const timer = setTimeout(() => {
        setDisplayMessage(""); // Clear the message
      }, 2000);

      // Clean up the timer when the component unmounts
      return () => clearTimeout(timer);
    }
  }, [msg]);

    useEffect(() => {
      
      
      const fetchDonorDetails = async () => {
        try {
          const response = await axios.get("http://localhost:5000/user/user-info", {
            withCredentials: true,
          });
          console.log("reesponse of user user-info",response);

          
        //   if(response.data.user=='donor'){
        //   // const { registrationNumber, orphanageName, contact, address,district } = response.data.user;
        //   const { _id,name,
        //   email,
        //   password,
        //   contact,
        //   aadharNumber, 
        //   address,
        //   district,
        //   type:userType}=response.data.user;
        //   console.log("fetched user info gonna save in conuser");

        //   setUser({_id,name,
        //     email,
        //     password,
        //     contact,
        //     aadharNumber, 
        //     address,
        //     district,
        //     userType});
        
        
        // }
        // else{
        //   const {address,
        //     authorizedPerson,
        //     contact,
        //     district,
        //     email,
        //     orphanageName,
        //     registrationNumber,
        //     userType
        // }=response.data.user;
          
        // setUser({address,
        //   authorizedPerson,
        //   contact,
        //   district,
        //   email, 
        //   orphanageName,
        //   registrationNumber,
        //   userType});
          
          
          
        //   console.log(response.data);
         

        //   console.log("Conuser after saving",conuser);
        // }
          
          setUser(response.data.user);
      

        } catch (error) {
          console.error("Error fetching orphanage details:", error);
          alert("Failed to load orphanage details. Please log in again.");
          navigate("/login");
        }
      };
      // if (conuser) { fetchDonorDetails();}
      fetchDonorDetails()
    },[]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetchDonorDetails();
        const response = await axios.get("http://localhost:5000/request-list", {
          withCredentials: true,
        });
        console.log(response.data);
        
        setOrphanages(response.data);
        setFilteredOrphanages(response.data);
        console.log("req-list",response.data);
        
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
      <div className="containerea">
        <FilterBar
          searchQuery={searchQuery}
          filterType={filterType}
          setSearchQuery={setSearchQuery}
          setFilterType={setFilterType}
          applyFilters={applyFilters}
        />
        {displayMessage && (
        <div style={{ padding: "5px", backgroundColor: "#e0f7fa" }}>
          <h3>{displayMessage}</h3>
        </div>
      )}
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
