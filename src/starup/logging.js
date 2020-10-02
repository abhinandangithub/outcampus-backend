// require('winston-mongodb');
const Logger = require('./logger');
const logger = new Logger('Exception');

module.exports = function () {
    process.on('uncaughtException', (ex) => {
        logger.error(ex.message, ex);
        process.exit(1);
    });
    // throw new Error('Something failed during startup!');

    process.on('unhandledRejection', (ex) => {
        logger.error(ex.message, ex);
        process.exit(1);
    });
    // const p = Promise.reject(new Error('Something failed during startup!'));
    // p.then(() => console.log('Done'));

//    winston.add(new winston.transports.File({ filename: 'logfile.log' }));
 //   winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/vidly', level: 'info' }));

}