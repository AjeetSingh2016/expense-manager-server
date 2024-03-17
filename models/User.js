const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  photoUrl:{
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastUpdate: {
    type: Date,
    default: new Date(1554636310165)
  },
  totalDebitAmount: {
    type: Number,
    default: 0,
  },
  totalCreditAmount: {
    type: Number,
    default: 0,
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
