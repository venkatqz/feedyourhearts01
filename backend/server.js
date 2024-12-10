const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Middleware for parsing cookies
const authRoutes = require('./routes/auth');


const app = express();

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
app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
  res.send('Server is running!');
});






// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));