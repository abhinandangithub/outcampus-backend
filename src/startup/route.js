const express = require('express');
const products = require('../routes/products');
const category = require('../routes/category');
const subCategory = require('../routes/subCategory');
const customers = require('../routes/customers');
const users = require('../routes/users');
const auth = require('../routes/auth');
const errorMidleware = require('../middleware/error');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/products', products);
    app.use('/api/categories', category);
    app.use('/api/subCategories', subCategory);
    app.use('/api/customers', customers);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use(errorMidleware);
}