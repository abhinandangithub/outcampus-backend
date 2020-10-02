module.exports = function () {
    const env = process.env.NODE_ENV || 'development';
    return require(`../../config/${env}.json`);
};