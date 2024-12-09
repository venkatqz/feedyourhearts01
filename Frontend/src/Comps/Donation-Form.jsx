import React, { useEffect, useState } from 'react';
import './Form.css';

function Donation_Form() {
  const [foodType, setFoodType] = useState('');
  const [servings, setServings] = useState('');

  useEffect((e)=>{if(servings<0){setServings(0)}},[servings]);
11
  const handleFoodTypeChange = (e) => {
    setFoodType(e.target.value);
    if (e.target.value !== 'preparedFood') {
      setServings(0); // Clear servings if not "Prepared Food"
    }
  };

  return (
    <div className="container">
      <h2>Food Donation Form</h2>
      <form action="/donate" method="POST">
        <label htmlFor="donor-name">Name:</label>
        <input type="text" id="donor-name" name="donor-name" required />

        <label htmlFor="food-type">Food Type:</label>
        <select
          id="food-type"
          name="food-type"
          value={foodType}
          onChange={handleFoodTypeChange}
          required
        >
          <option value="">Select Food Type</option>
          <option value="groceries">Groceries</option>
          <option value="freshGroceries">Fresh Groceries</option>
          <option value="preparedFood">Prepared Food</option>
        </select>

        {foodType === 'preparedFood' && (
          <div>
            <label htmlFor="servings">Number of Servings:</label>
            <input
              type="number"
              id="servings"
              name="servings"
              value={servings}
              onChange={(e) => setServings(e.target.value)}
              required
            />
          </div>
        )}

        <label htmlFor="quantity">Quantity (in kg):</label>
        <input type="number" id="quantity" name="quantity" required />

        <label htmlFor="pickup-address">Pickup Address:</label>
        <textarea id="pickup-address" name="pickup-address" required></textarea>

        <button type="submit">Donate Food</button>
      </form>
    </div>
  );
}

export default Donation_Form;
