module.exports = {
    login: {
        body: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    pattern: '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$',
                },
                password: {type: 'string'}
            },
            required: ['email', 'password']
        }
    },

    signup: {
        body: {
            type: 'object',
            properties: {
                name: {type: 'string'},
                email: {
                    type: 'string',
                    pattern: '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$',
                },
                password: {type: 'string'},
                gender: {type: 'string'},
                age: {type: 'number'},
                mobile: {
                    type: 'string',
                    minLength: 10,
                    maxLength: 10
                }
            },
            required: ['name', 'email', 'password', 'gender', 'age', 'mobile']
        }
    }
}