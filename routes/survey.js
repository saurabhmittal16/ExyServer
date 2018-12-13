const schema = require('../schema/survey');
const controller = require('../controller/survey');

const routes = [
    {
        method: 'POST',
        url: '/api/survey',
        schema: schema.newSurvey,
        handler: controller.newSurvey
    },
    {
        method: 'GET',
        url: '/api/survey/:id',
        handler: controller.getSurveyDetails
    },
];

module.exports = routes;