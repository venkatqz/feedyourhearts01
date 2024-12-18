const express = require("express");
const app=express();
const router = express.Router();
const { FoodRequest, AuditLog,DonatedRequest} = require("../models/FoodRequest");
const authenticate = require("./auth");

app.use(express.json());


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
    try {
      const { donorId } = req.params;
  
      const logs = await AuditLog.find({ donorId })
        // .populate('donorId', 'name email contact')
        // .populate('foodRequest', 'foodType foodRequired address dateTill') 
        // .populate('receiver', 'orphanageName registrationNumber'); 
        console.log(logs.donorId);
        
  
      // res.status(200).json(logs);
      // console.log(logs);
      

    } catch (error) {
      console.error("Error retrieving donor donation logs:", error);
      res.status(500).json({ message: "An error occurred while retrieving donation logs. Please try again." });
    }
  });
  















module.exports=router;