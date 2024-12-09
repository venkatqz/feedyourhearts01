import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Spinner } from "react-bootstrap";

const ItemCards = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/api/items")
  //     .then((response) => {
  //       setItems(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching items:", error);
  //       setLoading(false);
  //     });
  // }, []);

  
  setItems([
    {
      id: 1,
      name: "Rice",
      description: "50kg bag of rice",
      quantity: 10,
    },
    {
      id: 2,
      name: "Milk",
      description: "Carton of 12 packs",
      quantity: 25,
    },
    {
      id: 3,
      name: "Bread",
      description: "25 loaves of bread",
      quantity: 30,
    },
    {
      id: 4,
      name: "Flour",
      description: "10kg bag of wheat flour",
      quantity: 15,
    },
    {
      id: 5,
      name: "Oil",
      description: "5L can of sunflower oil",
      quantity: 20,
    },
    {
      id: 6,
      name: "Sugar",
      description: "1kg packets of sugar (10x)",
      quantity: 50,
    },
  ]);

  return (
    <Container>
      <h1 className="my-4">Available Items</h1>
      {loading ? (
        <Spinner animation="border" />
      ) : items.length > 0 ? (
        <Row>
          {items.map((item) => (
            <Col md={4} className="mb-4" key={item._id}>
              <Card>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Text>
                    <strong>Quantity:</strong> {item.quantity}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>No items available.</p>
      )}
    </Container>
  );
};

export default ItemCards;
