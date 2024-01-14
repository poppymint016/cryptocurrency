const Crypto = require('../models/Cryptocurrency');

exports.createCrypto = async (req, res) => {
    try{
        const { cryptoName, currentPrice } = req.body;

        if(!(cryptoName && currentPrice)){
            return res.status(400).send("All input is required.");
        }

        const oldCrypto = await Crypto.findOne({  name: cryptoName });

        if (oldCrypto) {
            return res.status(409).send("Crypto already exists.");
        }

        const newCrypto = await Crypto.create({
            name: cryptoName,
            currentPrice
        });

        res.status(201).json(newCrypto);

    }catch(err){
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.getCrypto = async (req, res) => {
    try {
        const allCryptos = await Crypto.find();

            if (!allCryptos || allCryptos.length === 0) {
                return res.status(404).send("No cryptocurrencies found.");
            }

            res.status(200).json(allCryptos);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.updateCrypto = async (req, res) => {
    try {
        const { cryptoId, newcryptoName, newPrice } = req.body;

        if (!cryptoId) {
            return res.status(400).send("cryptoId is required for update.");
        }

        const existingCrypto = await Crypto.findById(cryptoId);

        if (!existingCrypto) {
            return res.status(404).send("Crypto not found.");
        }

        if (newcryptoName) {
            const existingCryptoWithSameName = await Crypto.findOne({ name: newcryptoName });

            if (existingCryptoWithSameName && existingCryptoWithSameName._id.toString() !== cryptoId) {
                return res.status(400).send("Crypto with the same name already exists.");
            }

            existingCrypto.name = newcryptoName;
        }

        if (newPrice) {
            existingCrypto.currentPrice = newPrice;
        }

        await existingCrypto.save();

        res.status(200).json(existingCrypto);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.deleteCrypto = async (req, res) => {
    try {
        const cryptoId = req.params.cryptoId;

        if (!cryptoId) {
            return res.status(400).send("cryptoId is required for delete.");
        }

        const result = await Crypto.deleteOne({ _id: cryptoId });

        if (result.deletedCount === 0) {
            return res.status(404).send("Crypto not found.");
        }

        res.status(200).send("Crypto deleted successfully.");
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};
