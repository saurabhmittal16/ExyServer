const fastify = require('fastify');
const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken');
const app = fastify();

const mongo_url = "mongodb://localhost:27017/exxy";

const config = require('./config');
const routes = require('./routes/index');

app.register(require('fastify-url-data'), (err) => {
    if (err) throw err
});

app.addHook('preHandler', (request, reply, next) => {
    const urlData = request.urlData();
    
    if (urlData.path === '/api/auth/admin/signup' || urlData.path === '/api/auth/admin/login') {
        // No checking for token if auth routes
        next();
    } else {
        let token = request.headers['authorization'];

        if (token) {
            token = token.split(" ")[1];
            jsonwebtoken.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    reply.code(401)
                    next(new Error("Authentication failed"));
                } else {
                    request.decoded = decoded;
                    next();
                }
            });
        } else {
            reply.code(401)
            next(new Error("Authentication failed"));
        }
    }
})

routes.forEach(route => app.route(route));

app.get('/', async (request, res) => {
    return {
        message: 'Welcome to Exxy'
    }
});

mongoose.connect(mongo_url, {useNewUrlParser: true})
    .then(
        () => {
            console.log("Connected to DB")
            app.listen(3000, function(err, address) {
                if (err) {
                    fastify.log.error(err);
                    process.exit(1);
                }
                console.log(`Server listening on ${address}`);
            });
        }
    )
    .catch(err => console.log(err.message));