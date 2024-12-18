const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Middleware for parsing cookies
const authRoutes = require('./routes/auth');
const freq=require('./routes/FoodRequest');
const cron = require('node-cron');
const user =require('./routes/user-info');
const authenticateToken=require('./routes/auth');
const logs=require('./routes/logs');
const app = express();
const {FoodRequest,AuditLog,DonatedRequest}=require('./models/FoodRequest');
const {donor,User,Orphanage}=require('./models/User');
// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Update origin for frontend URL
app.use(bodyParser.json());
app.use(cookieParser());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/feedyourhearts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes


app.get('/request-list', authenticateToken,async (req, res) => { try { const foodRequests = await FoodRequest.find(); res.status(200).json(foodRequests); } catch (error) { console.error("Error retrieving food requests:", error); res.status(500).json({ message: "An error occurred while retrieving food requests. Please try again." }); } });


app.post("/food-requests", async (req, res) => {
  try {
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
    console.log("req received as ",req.body);
    // Validate required fields
    if (!registrationNumber || !orphanageName || !contact || !address || !foodType || !dateTill || !district) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    // Validate phone number
    if (!/^\d{10}$/.test(contact)) {
      return res.status(400).json({ message: "Invalid phone number. It must be 10 digits." });
    }

    // Validate `foodRequired` if `foodType` is "food"
    if (foodType === "food" && (!foodRequired || isNaN(foodRequired))) {
      return res.status(400).json({ message: "Food required must be a valid number." });
    }

    // Create a new food request
    const newFoodRequest = new FoodRequest({
      registerationNumber: registrationNumber,
      orphanageName,
      contact,
      address,
      foodType,
      district,
      foodRequired: foodType === "food" ? foodRequired : undefined, // Only include if `foodType` is "food"
      dateTill,
    });

    // Save the request to the database
    await newFoodRequest.save();

    res.status(201).json({ message: "Food request submitted successfully!" });
  } catch (error) {
    console.error("Error handling food request submission:", error);
    res.status(500).json({ message: "An error occurred while submitting the request. Please try again." });
  }
});


app.get("/orphanages/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from the URL
    const orphanage = await FoodRequest.findById(id); // Find the orphanage by ID
    if (!orphanage) {
      return res.status(404).json({ message: "Orphanage not found" });
    }
    res.status(200).json(orphanage);
  } catch (error) {
    console.error("Error fetching orphanage:", error);
    res.status(500).json({ message: "Error fetching data", error });
  }
});



// app.post('/donate', async (req, res) => { 
//   try { 
//     const { donorId, donorModel, recipientOrphanageId, foodRequestId, donationDetails } = req.body; 
//     console.log("Received payload:", req.body); // Validate required fields 
//     if (!donorId || !donorModel || !recipientOrphanageId || !donationDetails) {
//        console.log("Validation error: Missing required fields"); 
//        return res.status(400).json({ message: "All fields are required." }); } // Validate donorModel 
//        if (!['user', 'orphanage'].includes(donorModel)) { 
//         console.log("Validation error: Invalid donor model");
//          return res.status(400).json({ message: "Invalid donor model. Must be 'User' or 'Orphanage'." }); } // Lookup orphanage by registrationNumber 
//          const orphanage = await Orphanage.findOne({ registrationNumber: recipientOrphanageId }); 
//          if (!orphanage) { console.log("Orphanage not found."); 
//           return res.status(404).json({ message: "Orphanage not found." }); } // Lookup food request 
//           const foodRequest = await FoodRequest.findById(foodRequestId); if (!foodRequest) { console.log("Food request not found."); return res.status(404).json({ message: "Food request not found." }); } // Create a new audit log entry 
//           const newAuditLog = new AuditLog({ donorId: donorId, // Ensure this matches schema
//              donorModel, receiver: orphanage._id, foodRequest: foodRequestId, donationDetails, }); console.log("Audit log to be saved:", newAuditLog); // Save the audit log entry to the database 
//              await newAuditLog.save(); // Move the food request to the DonatedRequest collection 
//              const donatedRequest = new DonatedRequest({ ...foodRequest.toObject(), donationDetails, }); console.log("Donated request to be saved:", donatedRequest); await donatedRequest.save(); // Remove the food request from the FoodRequest collection 
//              await FoodRequest.findByIdAndRemove(foodRequestId); res.status(201).json({ message: "Donation recorded successfully!" }); } catch (error) { console.error("Error recording donation:", error); res.status(500).json({ message: "An error occurred while recording the donation. Please try again." }); } }); 


app.post('/donate', async (req, res) => {
  try {
     console.log("req",req.body);
    
    const { donorId, donorModel, recipientOrphanageId, foodRequestId, donationDetails } = req.body;

    // Validate required fields
    if (!donorId || !donorModel || !recipientOrphanageId || !donationDetails) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate donorModel
    if (!['donor', 'orphanage'].includes(donorModel)) {
      return res.status(400).json({ message: "Invalid donor model. Must be 'User' or 'Orphanage'." });
    }
    const orphanage = await Orphanage.findOne({ registrationNumber:recipientOrphanageId });
     if (!orphanage) { console.log("not found orphanage ");
     return res.status(404).json({ message: "Orphanage not found."});}
 
      console.log(orphanage);

      const foodRequest = await FoodRequest.findById(foodRequestId); if (!foodRequest) { console.log("Food request not found."); return res.status(404).json({ message: "Food request not found." });}  
      console.log("food req  found in bg",foodRequest.toObject());
      

      
    // Create a new audit log entry
    const newAuditLog = new AuditLog({
     donorId,
      donorModel,
      receiver: orphanage._id,
      foodRequest: foodRequestId,
      donationDetails,
      
    });
    console.log("scema ",newAuditLog);
    
    // Save the audit log entry to the database
    await newAuditLog.save();
    var receiver=orphanage._id;
    var district=orphanage.district;
    console.log("receiver",receiver);
    
    const donatedRequest = new DonatedRequest({ ...foodRequest.toObject(),receiver, district,donationDetails, });
    console.log("donated food ",donatedRequest);
    
    await donatedRequest.save();
    await FoodRequest.findByIdAndDelete(foodRequestId);
    

    res.status(201).json({ message: "Donation recorded successfully!" });
  } catch (error) {
    console.error("Error recording donation:", error);
    res.status(500).json({ message: "An error occurred while recording the donation. Please try again." });
  }
});

app.get('/orphanage-donation-logs/:orphanageId', async (req, res) => {
  try {
    const { orphanageId } = req.params;

    const logs = await AuditLog.find({ receiver: orphanageId })
      .populate('donorId', 'name email contact') // Populate donor information
      .populate('foodRequest', 'foodType foodRequired address dateTill') // Populate food request information
      .populate('receiver', 'orphanageName registrationNumber'); // Populate orphanage information

    res.status(200).json(logs);
  } catch (error) {
    console.error("Error retrieving orphanage donation logs:", error);
    res.status(500).json({ message: "An error occurred while retrieving donation logs. Please try again." });
  }
});


app.get('/donor-donation-logs/:donorId', async (req, res) => {
  console.log("fetching logs ");
  
  try {
    const { donorId } = req.params;

    const logs = await AuditLog.find({ donorId })
      // .populate('donorId', 'name email contact') // Populate donor information
      // .populate('foodRequest', 'foodType foodRequired address dateTill') // Populate food request information
      // .populate('receiver', 'orphanageName registrationNumber'); // Populate orphanage information

      console.log("logs ",logs);
    res.status(200).json(logs);
    
    
    
  } catch (error) {
    console.error("Error retrieving donor donation logs:", error);
    res.status(500).json({ message: "An error occurred while retrieving donation logs. Please try again." });
  }
});




cron.schedule('* * * * *', async () => {
  try {
    console.log("Running cleanup job...");

    // Get the current date and time
    const now = new Date();

    // Delete records where dateTill is earlier than the current time
    const result = await FoodRequest.deleteMany({
      dateTill: { $lt: now },
    });

    console.log(`Cleanup job completed. Deleted ${result.deletedCount} expired records.`);
  } catch (error) {
    console.error("Error during cleanup job:", error);
  }
});



app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.use('/api/auth', authRoutes);
app.use('/req',freq);
app.use('/user',user);
app.use('/logs',logs);





// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));