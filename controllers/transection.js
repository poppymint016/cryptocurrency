const User = require('../models/User');
const Wallet = require('../models/Wallet');
const Crypto = require('../models/Cryptocurrency');
const Transaction = require('../models/Transaction');

exports.buyCrypto = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const cryptoID = req.body.cryptoID;
        const amount = parseFloat(req.body.amount);
        console.log(amount)

        if (!cryptoID || isNaN(amount) || amount <= 0) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        const userWallet = await Wallet.findOne({ userID: userId });

        if (!userWallet) {
            return res.status(404).json({ error: 'User wallet not found' });
        }

        const cryptocurrency = await Crypto.findOne({ _id: cryptoID });
        console.log(cryptocurrency)

        if (!cryptocurrency) {
            return res.status(404).json({ error: 'Cryptocurrency not found' });
        }

        const price = parseFloat(cryptocurrency.currentPrice);
        console.log(price)

        if (isNaN(price) || price <= 0) {
            return res.status(400).json({ error: 'Invalid cryptocurrency price' });
        }

        // Calculate transaction amount
        const transactionAmount = price * amount;

        if (isNaN(transactionAmount) || transactionAmount <= 0) {
            return res.status(400).json({ error: 'Invalid transaction amount' });
        }

        if (userWallet.balance < transactionAmount) {
            return res.status(400).json({ error: 'Insufficient balance' });
        }

        const newTransaction = new Transaction({
            userID: userId,
            cryptoID: cryptoID,
            transactionType: 'Buy',
            amount: transactionAmount, 
        });

        await newTransaction.save();

        userWallet.balance -= transactionAmount;
        await userWallet.save();

        return res.status(200).json({ message: 'Cryptocurrency bought successfully', transaction: newTransaction });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.sellCrypto = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const cryptoID = req.body.cryptoID;
        const amount = parseFloat(req.body.amount);

        if (!cryptoID || isNaN(amount) || amount <= 0) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        const userWallet = await Wallet.findOne({ userID: userId });

        if (!userWallet) {
            return res.status(404).json({ error: 'User wallet not found' });
        }

        const cryptocurrency = await Crypto.findOne({ _id: cryptoID });

        if (!cryptocurrency) {
            return res.status(404).json({ error: 'Cryptocurrency not found' });
        }

        const price = parseFloat(cryptocurrency.currentPrice);

        if (isNaN(price) || price <= 0) {
            return res.status(400).json({ error: 'Invalid cryptocurrency price' });
        }

        if (userWallet[cryptocurrency.currentPrice] < amount) {
            return res.status(400).json({ error: 'Insufficient cryptocurrency balance' });
        }

        // Calculate transaction amount
        const transactionAmount = price * amount;

        if (isNaN(transactionAmount) || transactionAmount <= 0) {
            return res.status(400).json({ error: 'Invalid transaction amount' });
        }

        const newTransaction = new Transaction({
            userID: userId,
            cryptoID: cryptoID,
            transactionType: 'Sell',
            amount: transactionAmount,
        });

        await newTransaction.save();

        userWallet.balance += transactionAmount;
        userWallet[cryptocurrency.currentPrice] -= amount;

        await userWallet.save();

        return res.status(200).json({ message: 'Cryptocurrency sold successfully', transaction: newTransaction });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.transferCrypto = async (req, res) => {
    try {
        const senderId = req.user.user_id;
        const receiverId = req.body.receiverId;
        const cryptoID = req.body.cryptoID;
        const amount = parseFloat(req.body.amount);

        if (!receiverId || !cryptoID || isNaN(amount) || amount <= 0) {
            return res.status(400).json({ error: 'Invalid input data' });
        }
        
        if (senderId === receiverId) {
            return res.status(400).json({ error: 'Sender and receiver cannot be the same' });
        }

        const senderWallet = await Wallet.findOne({ userID: senderId });
        const receiverWallet = await Wallet.findOne({ userID: receiverId });

        if (!senderWallet || !receiverWallet) {
            return res.status(404).json({ error: 'Sender or receiver wallet not found' });
        }

        if (senderWallet[Crypto.currentPrice] < amount) {
            return res.status(400).json({ error: 'Insufficient cryptocurrency balance for transfer' });
        }

        senderWallet[Crypto.currentPrice] -= amount;
        receiverWallet[Crypto.currentPrice] += amount;

        await senderWallet.save();
        await receiverWallet.save();
        
        const transferTransaction = new Transaction({
            userID: senderId,
            cryptoID: cryptoID,
            transactionType: 'Transfer',
            amount: amount,
        });

        await transferTransaction.save();

        return res.status(200).json({ message: 'Cryptocurrency transfer successful', transaction: transferTransaction });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.getUserTransaction = async (req, res) => {
    try {
        const userId = req.user.user_id;

        const transactionHistory = await Transaction.find({ userID: userId });

        return res.status(200).json({ transactionHistory });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};
