const mongoose = require("mongoose");

const foodRequestSchema = new mongoose.Schema(
  {
    registerationNumber: {
      type: String,
      ref: "Orphanage",
      required: true,
    },
    orphanageName: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v); // Ensures it's exactly 10 digits
        },
        message: "Invalid phone number.",
      },
    },
    address: {
      type: String,
      required: true,
    },
    foodType: {
      type: String,
      enum: ["food", "grocery", "freshGrocery"],
      required: true,
    },
    foodRequired: {
      type: Number,
      required: function () {
        return this.foodType === "food";
      },
    },
    district:{type:String, required:true},
    dateTill: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const auditLogSchema = new mongoose.Schema(
  { 
    donor: { type: mongoose.Schema.Types.ObjectId, refPath: 'donorModel', required: true, },
     donorModel: { type: String,
       required: true, 
       enum: ['User', 'Orphanage'],
      },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'Orphanage', required: true, },
     foodRequest: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodRequest', required: false, },
      donationDetails: { type: String, required: true, },
       date: { type: Date, default: Date.now,}});
const FoodRequest = mongoose.model('FoodRequest',foodRequestSchema);

const AuditLog = mongoose.model('AuditLog',auditLogSchema);
 module.exports = { FoodRequest, AuditLog};