
const express = require('express');
const router = express.Router();
const { Category, validateCategory } = require('../models/category');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleware = require('../middleware/async');
const validateObjectId = require('../middleware/validateObjectId');
const Logger = require('../starup/logger');
const logger = new Logger('Categorys');

router.get('/', asyncMiddleware(async (req, res, next) => {
    const categories = await Category.find().sort('name');
    res.send(categories);
}));

router.post('/', asyncMiddleware(async (req, res) => {
    logger.setLogData(req.body);
    logger.info("Request recieved at /category", req.body);

    const { error } = validateCategory(req.body);
    if (error) {
        logger.error('Error: ' + error.details[0].message);
        return res.status(400).send('Error: ' + error.details[0].message);
    }
    let category = new Category({ categoryName: req.body.categoryName });
    category = await category.save();
    res.send(category);
}));

router.put('/:id', async (req, res) => {
    const { error } = validateCategory(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const category = await Category.findByIdAndUpdate(req.params.id, { name: req.body.name, new: true });
    if (!category) return res.status(404).send('The category with given ID not found');
    res.send(category);
})

router.delete('/:id', [auth, admin], async (req, res) => {
    const category = await Category.findByIdAndRemove(req.params.id);
    if (!category) return res.status(404).send('The category with given ID not found');
    res.send(category);
})

router.get('/:id', validateObjectId, asyncMiddleware(async (req, res) => {
    const category = await Category.findById(req.params.id);
    res.send(category);
}));

module.exports = router;