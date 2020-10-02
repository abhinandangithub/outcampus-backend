const request = require('supertest');
const { Product } = require('../../models/product');
const { User } = require('../../models/user');
let server;


describe('/api.products', () => {
    let product = {};
    let product1 = {};
    beforeEach(() => {
        server = require('../../index');
        product = {
            imagePath: 'Tomato.jpg',
            name: 'Tomato Bag',
            price: 35.95,
            subCategoryName: 'Vegetables',
            categoryName: 'Food Grains',
            weight: '10kg'
        };
        product1 = {
            imagePath: 'Rice.jpg',
            name: 'rice',
            price: 35.95,
            subCategoryName: 'Rice Products',
            categoryName: 'Vegetables & Fruits',
            weight: '1kg'
        };
    });
    afterEach(async () => {
        await Product.remove({});
        await server.close();
    });

    describe('GET /', () => {
        it('should load all products', async () => {
            await Product.collection.insertMany([
                product,
                product1
            ]);
            const res = await request(server).get('/api/products');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(p => p.name = "Rice-1")).toBeTruthy();
        })
    })

    describe('GET /:id', () => {
        it('should return single product', async () => {
            const p = new Product(product);
            await p.save();
            const res = await request(server).get(`/api/products/${p._id}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', p.name);
        })
        it('should return 404 invalid id', async () => {
            const res = await request(server).get(`/api/products/1`);
            expect(res.status).toBe(404);
        })
    })

    describe('POST /product', () => {
        let token;

        beforeEach(() => {
            token = new User().generateAuthToken();
        });

        const exec = async () => {
            return await request(server)
                .post('/api/products')
                .set('x-auth-code', token)
                .send(product);
        }

        it('Should save product ', async () => {
            //   product.name = 'Tomato';
            const res = await exec();
            expect(res.body).toHaveProperty('_id');
            const p = await Product.find({ name: 'Tomato' });
            expect(p).not.toBeNull();
        });

        it('Should return 401 if client is not logged in  ', async () => {
            token = ''
            const res = await exec();
            expect(res.status).toBe(401);
        })

        it('Should return 400 if product name less than 4 characters ', async () => {
            product.name = 'aa'
            const res = await exec();
            expect(res.status).toBe(400);
        })

        it('Should return 400 if product name more than 20 characters ', async () => {
            product.name = new Array(25).join('a');
            const res = await exec();
            expect(res.status).toBe(400);
        })


    })
})