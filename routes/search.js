const controller = require('../controller/search');

const routes = [
    {
        method: 'GET',
        url: '/api/search/v1',
        handler: controller.search
    }
];

module.exports = routes;