module.exports = {
    login: {
        body: {
            type: 'object',
            properties: {
                email: {type: 'string'},
                password: {type: 'string'},
            },
            required: ['email', 'password']
        }
    },

    signup: {
        body: {
            type: 'object',
            properties: {
                name: {type: 'string'},
                email: {type: 'string'},
                password: {type: 'string'},
                mobile: {type: 'string'}
            },
            required: ['email', 'password', 'name', 'mobile']
        }
    }
}