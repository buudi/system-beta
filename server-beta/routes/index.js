const general = require('./general');
const tenant = require('./tenant')

module.exports = (app) => {
    app.use('/general', general);
    app.use('/tenant', tenant);
}