const express = require("express");
const router = express.Router();
const FoodRequest = require("../models/FoodRequest");
const authenticate = require("./auth"); // Fixed import here

// Route: Submit food request
router.post("/food-requests",authenticate , async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const {
      registrationNumber,
      orphanageName,
      contact,
      address,
      foodType,
      foodRequired,
      district,
      dateTill,
    } = req.body;

    // Validate required fields
    if (!registrationNumber || !orphanageName || !contact || !address || !foodType || !dateTill || !district) {
      return res.status(400).json({ error: "All fields are required except foodRequired." });
    }

    // Create a new FoodRequest
    const newRequest = new FoodRequest({
      registrationNumber,
      orphanageName,
      contact,
      address,
      foodType,
      district,
      foodRequired: foodType === "food" ? foodRequired : undefined,
      dateTill,
    });

    // Save the request to the database
    await newRequest.save();

    res.status(201).json({ message: "Food request submitted successfully." });
  } catch (error) {
    console.error("Error submitting food request:", error.message);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

module.exports = router;
