const User = require('../models/User');
const Wallet = require('../models/Wallet');

exports.createWallet = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const amount = parseFloat(req.body.amount);

        if (isNaN(amount)) {
            return res.status(400).json({ error: 'Invalid amount' });
        }

        let userWallet = await Wallet.findOne({ userID: userId });

        if (userWallet) {
            const previousBalance = userWallet.balance || 0;
            userWallet.balance = previousBalance + amount;
            await userWallet.save();
        } else {
            
            const newWallet = new Wallet({
                userID: userId,
                balance: amount,
            });

            await newWallet.save();
            userWallet = newWallet; 
        }

        const updatedWallet = await Wallet.findOne({ userID: userId });

        return res.status(200).json({ message: 'Wallet updated successfully', wallet: updatedWallet });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getUserWallet = async (req, res) => {
    try {
        const userId = req.user.user_id; 

        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userWallet = await Wallet.findOne({ userID: userId });

        if (!userWallet) {
            return res.status(404).json({ error: 'Wallet not found for the user' });
        }

        return res.status(200).json({ username: user.username, balance: userWallet.balance });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};



