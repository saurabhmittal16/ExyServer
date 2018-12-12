module.exports = {
    login: {
        body: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    pattern: '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$',
                },                
                password: {
                    type: 'string'
                },
            },
            required: ['email', 'password']
        }
    },

    signup: {
        body: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                },
                email: {
                    type: 'string',
                    pattern: '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$',
                },
                password: {type: 'string'},
                mobile: {
                    type: 'string',
                    minLength: 10,
                    maxLength: 10
                }
            },
            required: ['email', 'password', 'name', 'mobile']
        }
    }
}