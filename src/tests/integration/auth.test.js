const request = require('supertest');
const { Product } = require('../../models/product');
const { User } = require('../../models/user');
let server;

describe('Auth testing', () => {
    let token;
    beforeEach(() => {
        token = new User().generateAuthToken();
        server = require('../../index');
    });
    afterEach(async () => {
        await Product.remove({});
        await server.close();
    });
    const exec = () => {
        const product = {
            imagePath: 'rice.jpg',
            name: 'Rice Bag',
            price: 35.95,
            subCategoryName: 'Rice Products',
            categoryName: 'Food Grains',
            weight: '10kg'
        };
        return request(server)
            .post('/api/products')
            .set('x-auth-code', token)
            .send(product);
    }
    it('should return 401 if no token is provided', async () => {
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);
    });

    it('should return 400 for invalid token ', async () => {
        token = 'wrong token';
        const res = await exec();
        expect(res.status).toBe(400);
    })

    it('should return 200 if token is valid ', async () => {
        const res = await exec();
        expect(res.status).toBe(200);
    })

});