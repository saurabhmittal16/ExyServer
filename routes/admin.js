const schema = require('../schema/admin');
const controller = require('../controller/admin');

const routes = [
    // Admin routes
    {
        method: 'POST',
        url: '/api/auth/admin/signup',
        schema: schema.signup,
        handler: controller.signup
    },
    {
        method: 'POST',
        url: '/api/auth/admin/login',
        schema: schema.login,
        handler: controller.login
    },
    {
        method: 'GET',
        url: '/api/admin/details',
        handler: controller.details
    },
    // User routes
    {
        method: 'GET',
        url: '/api/admin/follow',
        handler: controller.getAdminsToFollow
    },
    {
        method: 'GET',
        url: '/api/admin/following',
        handler: controller.getFollowingAdmins
    },
    {
        method: 'POST',
        url: '/api/admin/follow',
        schema: schema.followAdmin,
        handler: controller.followAdmin
    }
];

module.exports = routes;

// Return Codes -
// 1: Successful signup,
// 2: Successful login,
// 3: Email already registered,
// 4: Invalid password
// 5; Email not registered