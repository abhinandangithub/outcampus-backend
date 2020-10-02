
const express = require('express');
const router = express.Router();
const { SubCategory } = require('../models/subCategory');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleware = require('../middleware/async');
const validateObjectId = require('../middleware/validateObjectId');
const Logger = require('../starup/logger');
const logger = new Logger('Categorys');

router.get('/', asyncMiddleware(async (req, res, next) => {
    const subCategories = await SubCategory.find().sort('name');
    res.send(subCategories);
}));

router.post('/', asyncMiddleware(async (req, res) => {
    logger.setLogData(req.body);
    logger.info("Request recieved at /subCategory", req.body);
    let subCategory = new SubCategory({ subCategoryName: req.body.subCategoryName }, { categoryName: req.body.categoryName });
    subCategory = await subCategory.save();
    res.send(subCategory);
}));

router.put('/:id', async (req, res) => {
   
    const subCategory = await SubCategory.findByIdAndUpdate(req.params.id, { name: req.body.name, new: true });
    if (!subCategory) return res.status(404).send('The subCategory with given ID not found');
    res.send(subCategory);
})

router.delete('/:id', [auth, admin], async (req, res) => {
    const subCategory = await SubCategory.findByIdAndRemove(req.params.id);
    if (!subCategory) return res.status(404).send('The subCategory with given ID not found');
    res.send(subCategory);
})

router.get('/:id', validateObjectId, asyncMiddleware(async (req, res) => {
    const subCategory = await SubCategory.findById(req.params.id);
    res.send(subCategory);
}));

module.exports = router;