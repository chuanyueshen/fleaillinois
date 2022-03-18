/*
 * Connect all of your endpoints together here.
 */
module.exports = function (app, router) {
    app.use('/api', require('./home.js')(router));
    app.use('/api/users', require('../api/userAPI'));
    app.use('/api/products', require('../api/productAPI'));
};
