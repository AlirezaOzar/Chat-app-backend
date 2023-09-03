const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User.js');

const router = express.Router();


// Register
router.post('/register', async (req, res) => {

    try {
        // generate hashed password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // create new User
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
        });

        // save user and return response
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
});

// Login User
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json('User not found')

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(404).json('Wrong Password')

        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

module.exports = router;

// 24