const express = require('express');
const router = express.Router();
const { User, Orphanage } = require('../models/User'); // Import your models
const authenticateToken = require('./auth'); // Import the middleware

// Get user info
router.get('/user-info', authenticateToken, async (req, res) => {
  try {
    const { id, userType } = req.user;

    // Find the user based on their type
    let user;
    if (userType === 'donor') {
      user = await User.findById(id).select('-password'); // Exclude password from the response
    } else if (userType === 'orphanage') {
      user = await Orphanage.findById(id).select('-password'); // Exclude password from the response
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;