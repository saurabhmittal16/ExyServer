module.exports = {
    newAlbum: {
        body: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                },                
                image: {
                    type: 'string'
                },
            },
            required: ['name', 'image']
        }
    }
}