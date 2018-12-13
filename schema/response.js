// To-Do : Figure out the valid schema

module.exports = {
    newResponse: {
        body: {
            type: 'object',
            properties: {
                response: {
                    type: {
                        "anyOf": [
                            {type: 'string'},
                            {type: 'number'}
                        ]
                    }
                }
            },
            required: ['surveyID']
        }
    }
}