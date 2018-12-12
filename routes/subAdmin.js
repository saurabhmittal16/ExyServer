const controller = require('../controller/subAdmin');
const schema = require('../schema/admin');

const routes = [
    {
        method: 'POST',
        url: '/api/sub-admin/',
        handler: controller.newSubAdmin,
        schema: schema.signup
    },
    {
        method: 'GET',
        url: '/api/sub-admin/',
        handler: controller.getAllSubAdmin
    },
    {
        method: 'GET',
        url: '/api/sub-admin/:id',
        handler: controller.getSubAdmin
    },
    {
        method: 'PUT',
        url: '/api/sub-admin/:id',
        handler: controller.updateSubAdmin
    },
    {
        method: 'DELETE',
        url: '/api/sub-admin/:id',
        handler: controller.deleteSubAdmin
    }
];

module.exports = routes;