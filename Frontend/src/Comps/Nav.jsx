import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './login.css';
import {Link} from 'react-router-dom';
function MyNav() {
  return (
    <Navbar expand="lg" className="custom-navbar" id="navbar">
      <Container>
        <Navbar.Brand href="#home">Feed your Heart</Navbar.Brand>
        <div className="flex">
        <Nav.Link id="donate-left" className="donate-left"  as={Link} to="/donation-form">Doante Now </Nav.Link>
          {/* <div id="donate-left" className="donate-left"  as={Link} to="/donation-form">Donate Now</div> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link bg="dark" as={Link} to="/">Home</Nav.Link>
              <Nav.Link href="#link">About</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/signup">SignUp</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/food-reqform" >Requsts Form </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/donation-form">Donate now</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}

export default MyNav;
