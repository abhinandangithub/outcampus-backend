const _ = require('lodash');

const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (validPassword) {
        const token = user.generateAuthToken();
        res.send(token);
    }
    else {
        res.status(400).send("Invalid email or password");
    }
});

function validate(user) {
    const schema = {
        email: Joi.string().min(6).max(1024).required().email(),
        password: Joi.string().min(3).max(255).required()
    };
    return Joi.validate(user, schema);
}

module.exports = router;


