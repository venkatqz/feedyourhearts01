// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const cron = require("node-cron");
// //const Orphanage = require("./models/Orphanage"); 




// // Initialize Express app
// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // MongoDB Connection
// const mongoURI = "mongodb://localhost:27017/orphanageDB"; // Replace with your MongoDB URI if needed
// mongoose
//   .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Schedule a cleanup job to run every minute
// // Schedule a cron job to run every minute
// cron.schedule("* * * * *", async () => {
//   try {
//     console.log("Running cleanup job...");

//     // Get the current date and time
//     const now = new Date();

//     // Delete records where datetimeTill is earlier than the current time
//     const result = await Orphanage.deleteMany({
//       datetimeTill: { $lt: now },
//     });

//     console.log(
//       `Cleanup job completed. Deleted ${result.deletedCount} expired records.`
//     );
//   } catch (error) {
//     console.error("Error during cleanup job:", error);
//   }
// });

// // Define Mongoose Schema and Model
// const orphanageSchema = new mongoose.Schema({
//   orphanageName: { type: String, required: true },
//   phoneNumber: { type: String, required: true },
//   detailedAddress: { type: String, required: true },
//    district: { type: String, required: true },
//   foodType: { type: String, required: true },
//   foodRequired: { type: Number, required: false },
//   datetimeTill: { type: Date, required: true },
// });

// const Orphanage = mongoose.model("Orphanage", orphanageSchema);

// // API Endpoint for Submitting Form Data
// app.post("/api/orphanages", async (req, res) => {
//   try {
//     const orphanageData = req.body;
//     const orphanage = new Orphanage(orphanageData);
//     await orphanage.save();
//     res.status(201).json({ message: "Form data saved successfully!" });
//   } catch (error) {
//     console.error("Error saving data:", error);
//     res.status(500).json({ message: "Error saving data", error });
//   }
// });

// // API Endpoint to Fetch All Orphanages
// app.get("/api/orphanages", async (req, res) => {
//   try {
//     const orphanages = await Orphanage.find();
//     res.status(200).json(orphanages);
//   } catch (error) {
//     console.error("Error fetching orphanages:", error);
//     res.status(500).json({ message: "Error fetching data", error });
//   }
// });



// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
