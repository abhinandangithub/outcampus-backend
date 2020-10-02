const Joi = require('joi');
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 20,
        required: true
    },
    imagePath: {
        type: String
    },
    categoryName: {
        type: String,
        require: true
    },
    subCategoryName: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    weight: {
        type: String,
        require: true
    }
});

const Product = new mongoose.model('Product', productSchema);

function validateProduct(product) {
    const schema = {
        name: Joi.string().min(3).max(20).required(),
        categoryName: Joi.string().required(),
        subCategoryName: Joi.string().required(),
        price: Joi.number().required(),
        weight: Joi.string().required(),
        imagePath: Joi.string()

    };
    return Joi.validate(product, schema);
}

exports.Product = Product;
exports.validateProduct = validateProduct;
exports.ProductSchema = productSchema;