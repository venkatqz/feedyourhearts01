import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
navigate=useNavigate();
function Signup1() {
  const [formType, setFormType] = useState('donor'); // Default form type
  const [formData, setFormData] = useState({});
  const [errorMessages, setErrorMessages] = useState({});

  // Handle form type switch
  const handleFormTypeChange = (e) => {
    setFormType(e.target.value);
    setFormData({});
    setErrorMessages({});
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // JavaScript-based validation
  const validateForm = () => {
    let errors = {};
    if (formType === 'donor') {
      if (!formData.name || formData.name.trim() === '') {
        errors.name = 'Name is required.';
      }
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'A valid email is required.';
      }
      if (!formData.contact || !/^\d{10}$/.test(formData.contact)) {
        errors.contact = 'A valid 10-digit contact number is required.';
      }
    } else if (formType === 'orphanage') {
      if (!formData.orphanageName || formData.orphanageName.trim() === '') {
        errors.orphanageName = 'Orphanage Name is required.';

        
      }
      if (!formData.registrationNumber || formData.registrationNumber.trim() === '') {
        errors.registrationNumber = 'Registration Number is required.';
      }
      if (!formData.authorizedPerson || formData.authorizedPerson.trim() === '') {
        errors.authorizedPerson = 'Authorized Person is required.';
      }
      if (!formData.contact || !/^\d{10}$/.test(formData.contact)) {
        errors.contact = 'A valid 10-digit contact number is required.';
      }
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'A valid email is required.';
      }
      if (!formData.address || formData.address.trim() === '') {
        errors.address = 'Address is required.';
      }
    }
    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch(`/signup-${formType}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (response.ok) {
          alert(result.message); // Show success message
          setFormData({});
          navigate('/login'); // Redirect to login page
        } else {
          alert(result.error || 'Signup failed');
        }   
      } catch (error) {
        alert('An error occurred during signup');
        console.error(error);
      }
    }
  };


  return (
    <Container className="mt-4">
      <h1>Sign Up</h1>
      <Form.Group as={Row} controlId="formTypeSelect">
        <Form.Label column sm="3">
          Select Sign-Up Type
        </Form.Label>
        <Col sm="9">
          <Form.Control
            as="select"
            value={formType}
            onChange={handleFormTypeChange}
          >
            <option value="donor">Donor</option>
            <option value="orphanage">Orphanage</option>
          </Form.Control>
        </Col>
      </Form.Group>

      <Form onSubmit={handleSubmit}>
        {formType === 'donor' && (
          <>
            <h3>Donor Sign-Up</h3>
            <Form.Group controlId="donorName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
              />
              {errorMessages.name && (
                <p className="text-danger">{errorMessages.name}</p>
              )}
            </Form.Group>

            <Form.Group controlId="donorEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email || ''}
                onChange={handleInputChange}
              />
              {errorMessages.email && (
                <p className="text-danger">{errorMessages.email}</p>
              )}
            </Form.Group>

            <Form.Group controlId="donorContact">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your contact number"
                name="contact"
                value={formData.contact || ''}
                onChange={handleInputChange}
              />
              {errorMessages.contact && (
                <p className="text-danger">{errorMessages.contact}</p>
              )}
            </Form.Group>
          </>
        )}

        {formType === 'orphanage' && (
          <>
            <h3>Orphanage Sign-Up</h3>
            <Form.Group controlId="orphanageName">
              <Form.Label>Orphanage Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter orphanage name"
                name="orphanageName"
                value={formData.orphanageName || ''}
                onChange={handleInputChange}
              />
              {errorMessages.orphanageName && (
                <p className="text-danger">{errorMessages.orphanageName}</p>
              )}
            </Form.Group>

            <Form.Group controlId="registrationNumber">
              <Form.Label>Registration Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter registration number"
                name="registrationNumber"
                value={formData.registrationNumber || ''}
                onChange={handleInputChange}
              />
              {errorMessages.registrationNumber && (
                <p className="text-danger">{errorMessages.registrationNumber}</p>
              )}
            </Form.Group>

            <Form.Group controlId="authorizedPerson">
              <Form.Label>Authorized Person</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter authorized person name"
                name="authorizedPerson"
                value={formData.authorizedPerson || ''}
                onChange={handleInputChange}
              />
              {errorMessages.authorizedPerson && (
                <p className="text-danger">{errorMessages.authorizedPerson}</p>
              )}
            </Form.Group>

            <Form.Group controlId="orphanageContact">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter contact number"
                name="contact"
                value={formData.contact || ''}
                onChange={handleInputChange}
              />
              {errorMessages.contact && (
                <p className="text-danger">{errorMessages.contact}</p>
              )}
            </Form.Group>

            <Form.Group controlId="orphanageEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email || ''}
                onChange={handleInputChange}
              />
              {errorMessages.email && (
                <p className="text-danger">{errorMessages.email}</p>
              )}
            </Form.Group>

            <Form.Group controlId="orphanageAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter address"
                name="address"
                value={formData.address || ''}
                onChange={handleInputChange}
              />
              {errorMessages.address && (
                <p className="text-danger">{errorMessages.address}</p>
              )}
            </Form.Group>
          </>
        )}

        <Button className="mt-3" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Signup1;
