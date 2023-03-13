const general = require('./general');

module.exports = (app) => {
    app.use('/general', general);
}