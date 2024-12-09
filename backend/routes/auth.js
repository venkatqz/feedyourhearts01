const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Orphanage } = require('../models/User');

const router = express.Router();
const app = express();
app.use(express.json());

const Secret_key = 'venanpraveenragul';

// Middleware for Token Validation
const authenticateToken = async (req, res, next) => {
  const token = req.cookies.token; // Read JWT from cookies

  if (!token) return res.status(403).json({ message: 'Token is required' });

  try {
    const decoded = jwt.verify(token, Secret_key);

    req.user = decoded;

    // Validate user based on userType
    const user =
      decoded.userType === 'donor'
        ? await User.findById(decoded.id)
        : await Orphanage.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};


// Consolidated Signup Logic
const handleSignup = async (req, res, type) => {
  console.log('Request Body:', req.body);

  try {
    const {
      name,
      email,
      password,
      contact,
      orphanageName,
      registrationNumber,
      authorizedPerson,
      address,
    } = req.body;

    const existingUser = await User.findOne({ email });
    const existingOrphanage = await Orphanage.findOne({ email });

    if(existingUser){return res
      .status(400)
      .json({error:"Donor Already Exist"})}
      else if(existingOrphanage)
        {return res
          .status(400)
          .json({error:"Orphange Already Exist"})}
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    if (type === 'donor') {
      const user = new User({
        name,
        email,
        password: hashedPassword,
        contact,
        address,
        type,
      });
      console.log(user);
      await user.save();
      return res
        .status(201)
        .json({ message: 'Donor registered successfully!' });
    }

    if (type === 'orphanage') {
      const orphanage = new Orphanage({
        orphanageName,
        registrationNumber,
        authorizedPerson,
        email,
        contact,
        address,
        password: hashedPassword,
      });
      await orphanage.save();
      return res
        .status(201)
        .json({ message: 'Orphanage registered successfully!' });
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({ error: messages.join(', ') });
    } else if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: 'Duplicate value for a unique field.' });
    }
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

// Donor Signup Route
router.post('/signup-donor', (req, res) => handleSignup(req, res, 'donor'));

// Orphanage Signup Route
router.post('/signup-orphanage', (req, res) => handleSignup(req, res, 'orphanage'));

// Login Route (Doesn't require authentication)
// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    let userType = 'donor';
    if (!user) {
      user = await Orphanage.findOne({ email });
      userType = 'orphanage';
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const payload = {
      id: user._id,
      email: user.email,
      userType,
    };

    const token = jwt.sign(payload, Secret_key, { expiresIn: '1h' });

    // Set token as an HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict', // Prevent CSRF attacks
      maxAge: 3600000, // 1 hour in milliseconds
    });

    res.status(200).json({
      message: 'Login successful',
      userType,
      user: {
        id: user._id,
        email: user.email,
        name: user.name || user.orphanageName,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Logout Route
router.post('/logout', (req, res) => {
  res.clearCookie('token'); // Clear the JWT cookie
  res.status(200).json({ message: 'Logout successful' });
});

// Protected Route Example
router.get('/protected-resource', authenticateToken, (req, res) => {
  res.status(200).json({
    message: 'You have access to this protected resource',
    user: req.user,
  });
});

module.exports = router;