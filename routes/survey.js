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
        url: '/api/survey/unapproved',
        handler: controller.getUnapprovedSurveys
    },
    {
        method: 'GET',
        url: '/api/survey/approved',
        handler: controller.getApprovedSurveys
    },
    {
        method: 'GET',
        url: '/api/survey/:id',
        handler: controller.getSurveyDetails
    },
    {
        method: 'GET',
        url: '/api/survey/live',
        handler: controller.getLiveSurveys
    }
];

module.exports = routes;