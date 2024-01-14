const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./models/User'); 
const Cryptocurrency = require('./models/Cryptocurrency'); 
const Transaction = require('./models/Transaction'); 
const Wallet = require('./models/Wallet');

const userData = [
  { username: 'Test00', email: 'test00@test.com', password: '12345' },
  { username: 'Test01', email: 'test01@test.com', password: '12345' },
  { username: 'Test02', email: 'test02@test.com', password: '12345' },
  { username: 'Test03', email: 'test03@test.com', password: '12345' },
];

const cryptoData = [
  { name: 'BTC', currentPrice: 100 },
  { name: 'ETH', currentPrice: 99 },
  { name: 'BNB', currentPrice: 98 },
  { name: 'EPR', currentPrice: 97 },
  { name: 'SHIP', currentPrice: 96 },
];

async function seed() {
  try {
    await mongoose.connect('mongodb+srv://phannita016:12345@cluster0.jiea6bo.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Promise.all([
      User.deleteMany({}),
      Cryptocurrency.deleteMany({}),
      Transaction.deleteMany({}),
      Wallet.deleteMany({}),
    ]);

    const saltRounds = 10;

    const users = await Promise.all(userData.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      return User.create({ ...user, password: hashedPassword });
    }));

    const cryptocurrencies = await Cryptocurrency.insertMany(cryptoData);

    const transactionData = [
      { userID: users[0]._id, receiverID: users[1]._id, cryptoID: cryptocurrencies[0]._id, transactionType: 'Transfer', amount: 20, timestamp: new Date() },
      { userID: users[0]._id, cryptoID: cryptocurrencies[0]._id, transactionType: 'Buy', amount: 20, timestamp: new Date() },
      { userID: users[0]._id, cryptoID: cryptocurrencies[0]._id, transactionType: 'Sell', amount: 20, timestamp: new Date() },
      { userID: users[0]._id, cryptoID: cryptocurrencies[1]._id, transactionType: 'Buy', amount: 20, timestamp: new Date() },
      { userID: users[0]._id, cryptoID: cryptocurrencies[2]._id, transactionType: 'Buy', amount: 20, timestamp: new Date() },
      { userID: users[2]._id, cryptoID: cryptocurrencies[0]._id, transactionType: 'Sell', amount: 20, timestamp: new Date() },
    ];

    const walletData = [
      { userID: users[0]._id, balance: 50000 },
      { userID: users[1]._id, balance: 100000 },
      { userID: users[2]._id, balance: 40000 },
      { userID: users[3]._id, balance: 70000},
    ];

    await Promise.all([
      Transaction.insertMany(transactionData),
      Wallet.insertMany(walletData),
    ]);

    await mongoose.connection.close();

    console.log('Seed completed successfully.');
  } catch (error) {
    console.error('Error during seed:', error);
  }
}

seed();
