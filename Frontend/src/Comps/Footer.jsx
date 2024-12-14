import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext,useState } from 'react';
import { UserContext } from '../App';

function Footer() {

    const {conuser,setUser
}=useContext(UserContext);

    const navigate=useNavigate();


    const logoutfn=async()=>{
        try{
        const response=await axios.post('http://localhost:5000/api/auth/logout',
            { withCredentials: true }
        );
        if (response.status === 200) { setUser(" "); navigate('/'); } // Redirect to home page  
        } catch (error) { 
            console.error("Error logging out:", error); 
            alert("Failed to log out. Please try again.");
        }

    }


  return (
    <>
    <footer>
        <div>
            {conuser?
            <p id="log-out" onClick={logoutfn}> Log - Out</p> :null
}
        </div>
    </footer>
    </>
  )
}

export default Footer