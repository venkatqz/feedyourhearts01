import { useContext,useState } from "react";
import { UserContext } from "../App";

import axios from "axios";
const FetchUser=async()=> {

const {conuser,setUser}=useContext(UserContext);

    try {
        const response = await axios.get("http://localhost:5000/user/user-info", {
          withCredentials: true,
        });
        setUser(response.data.user);
        console.log("reesponse of user user-info",response);
        console.log("after set in context ",conuser);
        
    }
        catch(error){
            console.log("error at fetch user fn ",error);
            
        }
        

  
}

export default FetchUser