const schema = require('../schema/response');
const controller = require('../controller/response');

const routes = [
    {
        method: 'POST',
        url: '/api/survey/:id/response',
        handler: controller.newResponse
    }
]

module.exports = routes;