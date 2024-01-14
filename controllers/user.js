require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/auth');
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, password } = req.body;

        if (!(username && email && password)) {
            return res.status(400).send("All input is required.");
        }

        const oldUser = await User.findOne({ username, email });

        if (oldUser) {
            return res.status(409).send("User already exists.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign(
            { user_id: newUser._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        );

        newUser.token = token;

        res.status(201).json(newUser);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;

        if (!(email && password)) {
            return res.status(400).send("All input is required");
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send("Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).send("Invalid credentials");
        }

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        );

        user.token = token;
        res.status(200).json({ user: user, token });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

//สำหรับเทส transfer
exports.getUserAll = async (req, res) => {
    try {
        const users = await User.find(); 
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};
