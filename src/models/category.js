const Joi = require('joi');
const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    categoryName: {
        type: String,
        minlength: 5,
        maxlength: 20,
        required: true
    }
});

const Category = new mongoose.model('Categories', categorySchema);

function validateCategory(category) {
    const schema = {
        categoryName: Joi.string().min(5).max(20).required()
    };

    return Joi.validate(category, schema);
}

exports.Category = Category;
exports.validateCategory = validateCategory;
exports.CategorySchema = categorySchema;