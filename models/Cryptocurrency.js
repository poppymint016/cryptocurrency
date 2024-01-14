const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
  name: String,
  currentPrice: Number,
});

const Cryptocurrency = mongoose.model('Cryptocurrency', cryptoSchema);

module.exports = Cryptocurrency;
