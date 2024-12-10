import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [formType, setFormType] = useState('donor'); // Default form type
  const [formData, setFormData] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [successMessage, setSuccessMessage] = useState(''); // For success messages
  const navigate = useNavigate();

  // Handle form type switch
  const handleFormTypeChange = (e) => {
    setFormType(e.target.value);
    setFormData({});
    setErrorMessages({});
    setSuccessMessage('');
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
    
  };

  // JavaScript-based validation
  const validateForm = () => {
    let errors = {};

    // Shared validations for both donor and orphanage
    if (!formData.password || formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

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

      if (!formData.aadharNumber || !/^\d{12}$/.test(formData.aadharNumber)) {
        errors.aadharNumber = 'Aadhar Number must be exactly 12 digits.';
      }
    } else if (formType === 'orphanage') {
      if (!formData.orphanageName || formData.orphanageName.trim() === '') {
        errors.orphanageName = 'Orphanage Name is required.';
      }
      if (
        !formData.registrationNumber ||
        !/^TN\/DSD\/\d{4}\/[A-Z0-9]{4,6}$/.test(formData.registrationNumber)
      ) {
        errors.registrationNumber =
          'Registration Number must follow the format TN/DSD/YYYY/XXXX.';
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
        const endpoint =
          formType === 'donor'
            ? 'http://localhost:5000/api/auth/signup-donor'
            : 'http://localhost:5000/api/auth/signup-orphanage';

        const response = await axios.post(endpoint, formData); // Send data to backend
        setSuccessMessage(response.data.message || 'Sign-up successful!');
        setErrorMessages({});
        setFormData({});
        navigate('/Login');
      } catch (error) {
        setErrorMessages({
          server: error.response?.data?.error || 'An error occurred during sign-up.',
        });
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
          <Form.Control as="select" value={formType} onChange={handleFormTypeChange}>
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
              {errorMessages.name && <p className="text-danger">{errorMessages.name}</p>}
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
              {errorMessages.email && <p className="text-danger">{errorMessages.email}</p>}
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
              {errorMessages.contact && <p className="text-danger">{errorMessages.contact}</p>}
            </Form.Group>

            <Form.Group controlId="aadharNumber">
              <Form.Label>Aadhar Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your 12-digit Aadhar number"
                name="aadharNumber"
                value={formData.aadharNumber || ''}
                onChange={handleInputChange}
              />
              {errorMessages.aadharNumber && (
                <p className="text-danger">{errorMessages.aadharNumber}</p>
              )}
            </Form.Group>

            <Form.Group controlId="donorAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your address"
                name="address"
                value={formData.address || ''}
                onChange={handleInputChange}
              />
              {errorMessages.address && <p className="text-danger">{errorMessages.address}</p>}
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
              {errorMessages.contact && <p className="text-danger">{errorMessages.contact}</p>}
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
              {errorMessages.email && <p className="text-danger">{errorMessages.email}</p>}
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
              {errorMessages.address && <p className="text-danger">{errorMessages.address}</p>}
            </Form.Group>
          </>
        )}

        {/* Shared password fields */}
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password || ''}
            onChange={handleInputChange}
          />
          {errorMessages.password && <p className="text-danger">{errorMessages.password}</p>}
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"

            placeholder="Confirm your password"
            name="confirmPassword"
            value={formData.confirmPassword || ''}
            onChange={handleInputChange}
          />
          {errorMessages.confirmPassword && (
            <p className="text-danger">{errorMessages.confirmPassword}</p>
          )}
        </Form.Group>

        {/* Success and error messages */}
        {errorMessages.server && <p className="text-danger">{errorMessages.server}</p>}
        {successMessage && <p className="text-success">{successMessage}</p>}

        <Button className="mt-3" color='#104525' type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default SignUp;