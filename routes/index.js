const adminRoutes = require('./admin');
const subAdminRoutes = require('./subAdmin');
const userRoutes = require('./user');
const surveyRoutes = require('./survey');
const responseRoutes = require('./response');
const albumRoutes = require('./album');
const searchRoutes = require('./search');

module.exports = adminRoutes.concat(
    subAdminRoutes, 
    userRoutes, 
    surveyRoutes, 
    responseRoutes,
    albumRoutes,
    searchRoutes
);