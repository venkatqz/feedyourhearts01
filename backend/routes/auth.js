const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Orphanage } = require('../models/User');
const {FoodRequest,AuditLog}=require('../models/FoodRequest');



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
      aadharNumber,
      orphanageName,
      registrationNumber,
      authorizedPerson,
      district,
      address,
    } = req.body;

    if (type === 'donor' && (!aadharNumber || !/^\d{12}$/.test(aadharNumber))) {
      return res.status(400).json({ error: 'Invalid Aadhar number. Must be 12 digits.' });
    }

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
        aadharNumber,
        address,
        district,
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
        district,
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

router.post('/logout', (req, res) => { res.clearCookie('token'); // Clear the authentication token cookie 
  res.status(200).json({ message: 'Logout successful' });
}
);


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



//req




// Route to handle food request submission
router.post("food-requests", async (req, res) => {
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


// REQ list

app.get("/request-list",authenticateToken,async (req, res) => {
  try {
    const orphanages = await FoodRequest.find();
    
    res.status(200).json(orphanages);
  } catch (error) {
    console.error("Error fetching orphanages:", error);
    res.status(500).json({ message: "Error fetching data", error });
  }
});



// Endpoint to accept a donation




module.exports=router;