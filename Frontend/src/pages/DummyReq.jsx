import React from 'react';
const DummyDataDisplay = () => {
  // Dummy data array
  const items = [
    { id: 1, name: "Rice", description: "50kg bag of rice", quantity: 10 },
    { id: 2, name: "Milk", description: "Carton of 12 packs", quantity: 25 },
    { id: 3, name: "Bread", description: "25 loaves of bread", quantity: 30 },
    { id: 4, name: "Flour", description: "10kg bag of wheat flour", quantity: 15 },
    { id: 5, name: "Oil", description: "5L can of sunflower oil", quantity: 20 },
    { id: 6, name: "Sugar", description: "1kg packets of sugar (10x)", quantity: 50 },
  ];

  return (
    <div>
      <h2>Items List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong>: {item.description} (Quantity: {item.quantity})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DummyDataDisplay;
