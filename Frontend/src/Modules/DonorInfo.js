import React from "react";
import { UserContext} from "../App";
import { useContext } from "react";

import { useNavigate } from "react-router-dom";



function DonorInfo({ orphanages }) {
  const { conuser, setUser } = useContext(UserContext);
  const navigate=useNavigate();
console.log(conuser);

const handlelogbutton=()=>{
  console.log(conuser);
  if(conuser?.type=='orphanage'){
    navigate(`/orphanage-logs/${conuser._id}`);
    
  }
  else{
    navigate(`/donor-logs/${conuser._id}`);

  }
}

  // const donor = { name: "John Doe", contact: "1234567890" };
  // const totalFulfilled = orphanages.reduce((acc, curr) => acc + (curr.fulfilled || 0), 0);


  return (
    
    <div className="donor-info">
      <div className="greeting">
        <h1>Hi!</h1>
      </div>
      
      
      <div className="donor-details">
      {conuser?<>
        <h3>{conuser.name || conuser.orphanageName}</h3>
        <p><span>address </span> : {conuser.address}</p>
        <p>District : {conuser.district}</p>
        <p>Contact : {conuser.contact}</p>
        </>
        :null}
        {/* <p>
          Fulfilled:{" "}
          <span className="fulfilled">{totalFulfilled}</span>
        </p> */}

      <button className="logs" onClick={handlelogbutton}>Logs</button>


        <p className="thank-you">Thanks for supporting us!!!</p>
      </div>
    </div>
  );
}

export default DonorInfo;
