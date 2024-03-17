const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  mode: {
    type: String
  },
  payeeName: {
    type: String
  },
  payerName: {
    type: String
  },
  provider: {
    type: String
  },
  refNo: {
    type: String
  },
  smsBody: {
    type: String
  },
  type: {
    type: String
  },
  note:{
    type: String
  }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
