var { User } = require('../models/User');
var { Category } = require('../models/category');
var { Product } = require('../models/product');
var { SubCategory } = require('../models/subCategory');

var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var { db } = require('../starup/config')();

mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, });

async function createProducts() {
    var products =
        [
            new Product({
                imagePath: 'rice.jpg',
                name: 'Rice Bag',
                price: 35.95,
                subCategoryName: 'Rice Products',
                categoryName: 'Food Grains',
                weight: '10kg'
            }),
            new Product({
                imagePath: 'poha.jpg',
                name: 'Poha Bag',
                price: 45.95,
                subCategoryName: 'Rice Products',
                categoryName: 'Food Grains',
                weight: '1kg'
            }),
            new Product({
                imagePath: 'boliedRice.jpg',
                name: 'Boiled Rice Bag',
                price: 10,
                subCategoryName: 'Rice Products',
                categoryName: 'Food Grains',
                weight: '10kg'
            }),
            new Product({
                imagePath: 'cerels.jpg',
                name: 'Cerels',
                price: 10,
                subCategoryName: 'Dals & Pulses',
                categoryName: 'Food Grains',
                weight: '10kg'
            }),
            new Product({
                imagePath: 'toordal.jpg',
                name: 'Toor Dal',
                price: 100,
                subCategoryName: 'Dals & Pulses',
                categoryName: 'Food Grains',
                weight: '10kg'
            }),
            new Product({
                imagePath: 'sunflower.jpg',
                name: 'Sunflower Oil',
                price: 200,
                subCategoryName: 'Dals & Pulses',
                categoryName: 'Oil & Ghee',
                weight: '1kg'
            }),
        ];

    for (let i = 0; i < products.length; i++) {
        await products[i].save();
        console.log(products[i]);
    }
}

async function createSubCategory() {
    var subCategories =
        [
            new SubCategory({
                categoryName: 'Fruits & Vegetables',
                subCategoryName: ['Vegetables', 'Fruits', 'Cuts & Sprouts']
            }),
            new SubCategory({
                categoryName: 'Food Grains',
                subCategoryName: ['Atta', 'Rice Products', 'Dals & Pulses', 'Oil & Ghee', 'Masala & Spices', 'Dry Fruits']
            }),
            new SubCategory({
                categoryName: 'Snacks & Branded Foods',
                subCategoryName: ['Biscuits and Cookies', 'Ready To Cook & Eat', 'Pickles & Chutnys']
            }),
            new SubCategory({
                categoryName: 'Beauty & Hygine',
                subCategoryName: ['Bath & Hand Wash', 'Skin Care', 'Hair Care']
            }),
            new SubCategory({
                categoryName: 'Bakery & Dairy',
                subCategoryName: ['Cakes & Pastry', 'Ice Cream', 'Desserts']
            })
        ]

    for (let i = 0; i < subCategories.length; i++) {
        subCategories[i].save().then(() => {
            console.log(subCategories[i]);
        }).catch((err) => {
            console.log(err);
        })
    }
}


async function createCategory() {
    var categories =
        [
            new Category({
                categoryName: 'fruits & vegetables'
            }),
            new Category({
                categoryName: 'food grains'
            }),
            new Category({
                categoryName: 'snacks'
            }),
            new Category({
                categoryName: 'beauty & hygine'
            }),
            new Category({
                categoryName: 'bakery & dairy'
            }),
            new Category({
                categoryName: 'a'
            })
        ]

    for (let i = 0; i < categories.length; i++) {
        categories[i].save().then(() => {
            console.log(categories[i]);
        }).catch((err) => {
            console.log(err);
        })
    }
}

async function createUser() {

    let user1 = new User({
        name: "abhigp",
        email: "abhigp@gmail.com",
        password: "abhigp",
        isAdmin: true
    });
    let user2 = new User({
        name: "akshatha",
        email: "akshatha@gmail.com",
        password: "akshatha",
        isAdmin: false
    });
    let users = [user1, user2];

    for (let i = 0; i < users.length; i++) {
        const salt = await bcrypt.genSalt(10);
        users[i].password = await bcrypt.hash(users[i].password, salt);

        users[i].save(function (err, r) {
            if (err) throw err;
            console.log(users[i]);
        });
    }

}

async function init() {
    await createUser();
    // await createCategory();
    // await createSubCategory();
    // await createProducts();
    mongoose.disconnect();
}

init();