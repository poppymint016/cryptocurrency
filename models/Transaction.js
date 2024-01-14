const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiverID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  cryptoID: { type: mongoose.Schema.Types.ObjectId, ref: 'Cryptocurrency' },
  transactionType: String,
  amount: Number,
  timestamp: { type: Date, default: Date.now },
});


const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
