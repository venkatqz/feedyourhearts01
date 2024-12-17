import React, { useEffect, useState,useContext } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import "./Orphanagedetail.css";
import axios from "axios";
import { UserContext } from '../App';

const OrphanageDetails = () => {
const [user,setuser]=useState('');
  const[Donated,setDonated]=useState("");
  const { id } = useParams(); // Extract the ID from the route
  const [data, setData] = useState(null);
  const { conuser } = useContext(UserContext); // Get the logged-in user data from context

  // console.log("Conuser in donation pprocess",conuser);
  
  useEffect(()=>{
    try{
      console.log("gonna fetch");
      
      const fetching=async()=>{
      const response = await axios.get("http://localhost:5000/user/user-info", {
        withCredentials: true,
      });
console.log("on donation apge",response);
setuser(response.data.user  );
// console.log("user",user);
    }

      fetching();

    }
    catch(e){
      console.log("error while calling fetch ",e);
      
    }
    
  },[]);

  useEffect(() => {
    // Fetch data for the specific orphanage using the ID
    fetch(`http://localhost:5000/orphanages/${id}`) // Use the ID in the API URL
      .then((response) => response.json())
      .then((json) => {setData(json);console.log(json);
      })// The backend should return the orphanage with the given ID
      .catch((error) => console.error("Error fetching data:", error));
      console.log("orphanage request id",id);
      

      
  }, [id]);

  const handleDonate = async () => { try { 
    console.log("user",user);

    const donorId = user._id; 
     const donorModel = user.type === 'orphanage' ? 'Orphanage' : 'donor'; // Determine donor model 
     const recipientOrphanageId = data.registerationNumber; // ID of the orphanage being donated to 
     const foodRequestId = id; // Optional: ID of the food request being fulfilled 
     const donationDetails = `Donation made by ${user.name || user.orphanageName}`; // Example donation details 
     console.log("THe donate data donor id ",donorId, donorModel,"orph id ", recipientOrphanageId, "req id",foodRequestId, donationDetails );
     
     const response = await axios.post("http://localhost:5000/donate",
       { donorId, donorModel, recipientOrphanageId, foodRequestId, donationDetails },
        { withCredentials: true }); 
        if (response.status === 201) {
           setDonated("Thank you for your generosity!"); } 
      } catch (error) {
         console.error("Error making donation:", error);
          alert("Failed to process the donation. Please try again."); 
        }
      }
 
 
 
  //   const send=async()=>{
  //   var auditLog={ 
  //     donor: { type: mongoose.Schema.Types.ObjectId, refPath: 'donorModel', required: true, },
  //      donorModel: { type: String,
  //        required: true, 
  //        enum: ['User', 'Orphanage'],
  //       },
  //     receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'Orphanage', required: true, },
  //      foodRequest: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodRequest', required: false, },
  //       donationDetails: { type: String, required: true, },
  //        date: { type: Date, default: Date.now,}};


  //        try{
  //        const response=await axios("http://localhost:5000/api/auth/donate",{withCredentials: true,});
  //       //  console.log("donated",auditLog);
  //         console.log(response);
          
  //     } catch (error){
  //         console.error("Error Donating",error);
  //        }
         


  // }

  return (
    <div className="containere">
      <h1>Orphanage Details</h1>
      {data ? (
        <div>
          <ul className="details-list">
            <li>
              <strong>Orphanage Name:</strong> {data.orphanageName}
            </li>
            <li>
              <strong>Phone Number:</strong> {data.contact}
            </li>
            <li>
              <strong>Address:</strong> {data.address}
            </li>
            <li>
              <strong>District:</strong> {data.district}
            </li>
            <li>
              <strong>Food Type:</strong> {data.foodType}
            </li>
            {data.foodRequired && (
              <li>
                <strong>Food Required:</strong> {data.foodRequired}
              </li>
            )}
            <li>
              <strong>Valid Until:</strong> {new Date(data.dateTill).toLocaleString()}
            </li>
          </ul>
          <button className="donate-button" onClick={handleDonate}>
            Donate
          </button>
          {Donated}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default OrphanageDetails;
