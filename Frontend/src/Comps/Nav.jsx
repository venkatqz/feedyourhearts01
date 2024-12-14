import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './login.css';
import {Link} from 'react-router-dom';
import img from './person_24dp_000000_FILL0_wght400_GRAD0_opsz24.png'
import { useContext,useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../App';
import Cookies from 'js-cookie';

function MyNav() {
  { const { conuser, setUser } = useContext(UserContext);
useEffect(() => {
   const authToken = Cookies.get('token');
   if (authToken) { // Make a request to verify the token and get user info 
    axios.get('http://localhost:5000/api/auth/user-info', { withCredentials: true }) 
      .then(response => { 
        setUser(response.data.user); // Set user info in context 
        }).catch(error => { console.error('Error verifying auth token:', error); }); 
      } },[setUser]);

  return (
    <Navbar expand="lg" className="custom-navbar" id="navbar">
      <Container>
        <Navbar.Brand href="#home">Feed your Heart</Navbar.Brand>
        <div className="flex">
        
          {/* <div id="donate-left" className="donate-left"  as={Link} to="/donation-form">Donate Now</div> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link bg="dark" as={Link} to="/">Home</Nav.Link>
              <Nav.Link href="#link">About</Nav.Link>
              <NavDropdown title={<img src={img} alt="dropdown-logo" style={{ width: '20px', height: '20px', padding:'0' }} />} id="basic-nav-dropdown">
                {!conuser?(
                  <>
                <NavDropdown.Item as={Link} to="/signup">SignUp</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
                </>
                ) : (
                  <>
                <NavDropdown.Item as={Link} to="/req-list" >Donate Now </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/req-list" >Profile Page</NavDropdown.Item>

                </>
                )}
      <NavDropdown.Divider />
               
              </NavDropdown>
             
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}
}

export default MyNav;
