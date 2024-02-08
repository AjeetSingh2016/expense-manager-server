const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8000;

const url = "mongodb+srv://ajeetchauhanplus2016:frZpbL92fBVYt0TU@cluster0.2dddhdg.mongodb.net/?retryWrites=true&w=majority"
// Connect to MongoDB
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));


  // Import user model
const User = require('./models/User');

// Middleware to parse JSON bodies
app.use(express.json());



  app.post('/register', async (req, res) => {
    try {
      const { username, email} = req.body;
      
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Create a new user
      const newUser = new User({ username, email});
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to Expense Tracker API');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
