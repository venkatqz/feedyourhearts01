const mongoose = require('mongoose');

// General User Schema (For Donors)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact: { type: String, required: true, unique: true },
  aadharNumber: { type: String, required: true, match: /^\d{12}$/, unique: true }, // New Aadhar field
  address: { type : String, required:true },
  type: { type: String, required: true, enum: ['donor', 'orphanage'] },
});

// Orphanage Schema
const orphanageSchema = new mongoose.Schema({
  orphanageName: { type: String, required: true },
  registrationNumber: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^TN\/DSD\/\d{4}\/[A-Z0-9]{4,6}$/, 'Invalid registration number format. Expected: TN/DSD/YYYY/XXXXXX'],
  },
  authorizedPerson: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, default: 'orphanage' },
});

// Export Models
const User = mongoose.model('User', userSchema);
const Orphanage = mongoose.model('Orphanage', orphanageSchema);

module.exports = { User, Orphanage };
