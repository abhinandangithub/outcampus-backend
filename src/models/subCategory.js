const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    subCategoryName: {
        type: Array,
    },
    categoryName: {
        type: String
    }
});

const SubCategory = new mongoose.model('SubCategories', subCategorySchema);


exports.SubCategory = SubCategory;
exports.SubCategorySchema = subCategorySchema;