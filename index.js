const express = require('express');

const bodyParser = require('body-parser');
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
const Transaction = require('./models/Transaction')

// Middleware to parse JSON bodies
app.use(express.json());

app.post('/register', async (req, res) => {
  try {
    const { username, email, photoUrl, lastUpdate, totalDebitAmount, totalCreditAmount } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ 
      username, 
      email, 
      photoUrl,
      lastUpdate, // You can include this if it's provided in the request
      totalDebitAmount, // You can include this if it's provided in the request
      totalCreditAmount // You can include this if it's provided in the request
    });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Getting users
app.get('/users/:email', async (req, res) => {
  try {
    const userEmail = req.params.email;

    // Find the user by email
    const user = await User.findOne({ email: userEmail });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user
    res.status(200).json(user);
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



// Update lastUpdate
app.put('/users/:userId/update-last-update', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { lastUpdate } = req.body;

    await User.findByIdAndUpdate(userId, { lastUpdate });

    res.status(200).json({ message: 'Last update updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update totalDebitAmount
app.put('/users/:userId/update-total-debit', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { totalDebitAmount } = req.body;

    await User.findByIdAndUpdate(userId, { totalDebitAmount });

    res.status(200).json({ message: 'Total debit amount updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update totalCreditAmount
app.put('/users/:userId/update-total-credit', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { totalCreditAmount } = req.body;

    await User.findByIdAndUpdate(userId, { totalCreditAmount });

    res.status(200).json({ message: 'Total credit amount updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/updateUser/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const fieldsToUpdate = req.body;

    const user = await User.findByIdAndUpdate(userId, fieldsToUpdate, { new: true });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'There was a problem updating the user: ' + error.message });
  }
});







// Transactions


// Assuming you've already defined the Message model and imported it

app.post('/createTransactions', async (req, res) => {
  try {
    // Extract the fields from the request body
    const { userId, amount, category, date, mode, payeeName, payerName, provider, refNo, smsBody, type, note} = req.body;

    // Create a new transaction object
    const newTransaction = new Transaction({
      user: userId,
      amount,
      category,
      date,
      mode,
      payeeName,
      payerName,
      provider,
      refNo,
      smsBody,
      type,
      note
    });

    // Save the new transaction to the database
    await newTransaction.save();

    // Return success response
    res.status(201).json({ message: 'Transaction created successfully', transaction: newTransaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.get('/getTransactions/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all transactions for the user
    const transactions = await Transaction.find({ user: userId });

    // Return the transactions
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

