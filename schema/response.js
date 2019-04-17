module.exports = {
    newResponse: {
        body: {
            type: 'object',
            properties: {
                response: {
                    type: ['string', 'number']
                },
                survey: {
                    type: 'string'
                }
            },
            required: ['response', 'survey']
        }
    }
}