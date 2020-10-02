const { User } = require('../../../models/user');
const auth = require('../../../middleware/auth');
const mongoose = require('mongoose');

describe('test for authorisation ', () => {
    it('user Should be defined ', () => {
        const token = new User().generateAuthToken();
        const req = {
            header: jest.fn().mockReturnValue(token)
        };

        const res = {};
        const next = jest.fn();

        auth(req, res, next);
        expect(req.user).toBeDefined();
    })

    it('user Should be defined with attribues ', () => {
        const user = { _id: mongoose.Types.ObjectId().toHexString(), isAdmin: true };

        const token = new User(user).generateAuthToken();
        const req = {
            header: jest.fn().mockReturnValue(token)
        };

        const res = {};
        const next = jest.fn();

        auth(req, res, next);
        expect(req.user).toMatchObject(user);
    })

    it('should call req.header with x-auth-code ', () => {
        const user = { _id: mongoose.Types.ObjectId().toHexString(), isAdmin: true };

        const token = new User(user).generateAuthToken();
        const req = {
            header: jest.fn().mockReturnValue(token)
        };

        const res = {};
        const next = jest.fn();

        auth(req, res, next);
        expect(req.header).toHaveBeenCalledWith('x-auth-code');
    })

});