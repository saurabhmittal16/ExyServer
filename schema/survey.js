module.exports = {
    newSurvey: {
        body: {
            type: 'object',
            properties: {
                question: {type: 'string'},
                image: {type: 'string'},
                type: {type: 'string'},
                start: {
                    type: 'string',
                    format: 'date-time'
                },
                end: {
                    type: 'string',
                    format: 'date-time'
                },
                approved: {
                    type: 'boolean',
                },
                album: {
                    type: 'string'
                },
                resultPolicy: {
                    type: 'string'
                },
                options: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            option_text: {type: 'string'},
                            options_image: {type: 'string'}
                        }
                    }
                }
            },
            required: ['question', 'image', 'type', 'start', 'end', 'approved']
        }
    }
}