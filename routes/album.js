const schema = require('../schema/album');
const controller = require('../controller/album');

const routes = [
    {
        method: 'POST',
        url: '/api/admin/albums',
        schema: schema,
        handler: controller.addNewAlbum
    }
]

module.exports = routes;