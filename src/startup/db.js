import config from './config';
import mongoose from 'mongoose';
const Logger = require('../starup/logger');
const logger = new Logger('DB');

module.exports = function () {
    const { db } = config();
    mongoose.connect(db)
        .then(() => logger.info(`Connected to ${db}...`))
}