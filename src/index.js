
import express from 'express';
const app = express();
import Logger from './starup/logger';
const logger = new Logger('app');

require('./starup/logging')();
require('./starup/config')();
require('./starup/route')(app);
require('./starup/db')();
require('./starup/validation')();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => logger.info(`Listening on port ${port}...`));

module.exports = server;
