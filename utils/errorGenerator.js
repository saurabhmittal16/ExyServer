const boom = require('boom');

const errorGenerator = (code) => {
    let error;
    let error_message;

    switch(code) {
        case 401: {
            error_message = 'Authentication Failed'
            break;
        }
        case 403: {
            error_message = 'Access Denied';
            break;
        }
        case 404: {
            error_message = 'Not found';
            break;
        }
        default: {
            error_message = 'Internal server error'
        }
    }

    error = new boom(error_message, {statusCode: code});
    return error.output.payload;
}

module.exports = errorGenerator;