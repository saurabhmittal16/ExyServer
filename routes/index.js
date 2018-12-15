const adminRoutes = require('./admin');
const subAdminRoutes = require('./subAdmin');
const userRoutes = require('./user');
const surveyRoutes = require('./survey');
const responseRoutes = require('./response');

module.exports = adminRoutes.concat(
    subAdminRoutes, 
    userRoutes, 
    surveyRoutes, 
    responseRoutes
);