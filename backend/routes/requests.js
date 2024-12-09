const express = require("express");
const mongoose = require("mongoose");

const router = express.Router(); // Create a router for the new route

// Define the schema for the new collection
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  quantity: Number,
});

// Create a Mongoose model for the collection
const Item = mongoose.model("Item", itemSchema);

// Dummy data (optional: for initial insertion)
const dummyData = [
  { name: "Rice", description: "50kg bag of rice", quantity: 10 },
  { name: "Milk", description: "Carton of 12 packs", quantity: 25 },
  {name:"Bread",description:"25 breads ",quantity:25}
];


router.post("/api/items", async (req, res) => {
    try {
      const { name, description, quantity } = req.body; // Get data from the request body
      const newItem = new Item({ name, description, quantity }); // Create a new item
      await newItem.save(); // Save it to the database
      res.status(201).json(newItem); // Send the saved item back as a response
    } catch (error) {
      res.status(500).json({ error: "Failed to add item" });
    }
  });


// Uncomment to populate data only once
Item.insertMany(dummyData).then(() => console.log("Dummy data inserted"));




// API endpoint to fetch data
router.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find(); // Fetch all items
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// Export router and mount it in server.js
module.exports = router;

// In server.js
const itemRoutes = require("./routes/itemRoutes");

app.use(itemRoutes);
