import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext,useState } from 'react';
import { UserContext } from '../App';
import logo from './logout_24dp_000000_FILL0_wght400_GRAD0_opsz24.png'
import Cookies from 'js-cookie';
function Footer() {

    const {conuser,setUser
}=useContext(UserContext);

    const navigate=useNavigate();


    const logoutfn=async()=>{
        try{
        const response=await axios.post('http://localhost:5000/api/auth/logout',
            { withCredentials: true }
        );
        if (response.status === 200) { setUser(null); navigate('/'); } // Redirect to home page  
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
            <button id="log-out" onClick={logoutfn}> <img src={logo} alt="dropdown-logo" style={{ width: '20px', height: '20px', padding:'0' }} /></button> :null
}
        </div>
    </footer>
    </>
  )
}

export default Footer