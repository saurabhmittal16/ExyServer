const adminRoutes = require('./admin');
const subAdminRoutes = require('./subAdmin');

module.exports = adminRoutes.concat(subAdminRoutes);