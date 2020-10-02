const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Product, validateProduct } = require('../models/product');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleware = require('../middleware/async');
const validateObjectId = require('../middleware/validateObjectId');
const Logger = require('../starup/logger');
const logger = new Logger('Products');

router.get('/', asyncMiddleware(async (req, res, next) => {
    const products = await Product.find().sort('name');
    res.send(products);
}));

router.post('/', auth, asyncMiddleware(async (req, res) => {
    logger.setLogData(req.body);
    logger.info("Request recieved at /product", req.body);
    const { error } = validateProduct(req.body);
    if (error) {
        logger.error('Error: ' + error.details[0].message);
        return res.status(400).send('Error: ' + error.details[0].message);
    }
    const obj = {
        name: req.body.name,
        imagePath: req.body.name,
        categoryName: req.body.categoryName,
        subCategoryName: req.body.subCategoryName,
        price: req.body.price,
        weight: req.body.weight
    }
    let product = new Product(obj);
    product = await product.save();
    res.send(product);
}));

router.put('/:id', async (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const product = await Product.findByIdAndUpdate(req.params.id, { name: req.body.name, new: true });
    if (!product) return res.status(404).send('The product with given ID not found');
    res.send(product);
})

router.delete('/:id', [auth, admin], async (req, res) => {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) return res.status(404).send('The product with given ID not found');
    res.send(product);
})

router.get('/:id', validateObjectId, asyncMiddleware(async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.send(product);
}));

module.exports = router;