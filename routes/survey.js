const schema = require('../schema/survey');
const controller = require('../controller/survey');

const routes = [
    // Admin routes
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
        url: '/api/survey/published',
        handler: controller.getPublishedSurveys
    },
    {
        method: 'GET',
        url: '/api/survey/:id',
        handler: controller.getSurveyDetails
    },
    // User routes
    {
        method: 'GET',
        url: '/api/user/survey-live',
        handler: controller.getLiveSurveys
    },
    {
        method: 'GET',
        url: '/api/user/survey/:id',
        handler: controller.getSurveyDetailsUser
    }
];

module.exports = routes;