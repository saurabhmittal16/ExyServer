const adminRoutes = require('./admin');
const subAdminRoutes = require('./subAdmin');
const userRoutes = require('./user');

module.exports = adminRoutes.concat(subAdminRoutes, userRoutes);