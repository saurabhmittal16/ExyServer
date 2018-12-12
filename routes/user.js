const schema = require('../schema/user');
const controller = require('../controller/user');

const routes = [
    {
        method: 'POST',
        url: '/api/auth/user/signup',
        schema: schema.signup,
        handler: controller.signup
    },
    {
        method: 'POST',
        url: '/api/auth/user/login',
        schema: schema.login,
        handler: controller.login
    }
];

module.exports = routes;