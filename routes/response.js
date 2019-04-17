const schema = require('../schema/response');
const controller = require('../controller/response');

const routes = [
    {
        method: 'POST',
        url: '/api/survey/response',
        schema: schema.newResponse,
        handler: controller.newResponse
    }
]

module.exports = routes;