const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const walletSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    balance: Number,
});

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet; 