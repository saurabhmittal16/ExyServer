const fastify = require('fastify');
const mongoose = require('mongoose');
const app = fastify();

const mongo_url = "mongodb://localhost:27017/exxy";

const routes = require('./routes/index');

app.register(require('fastify-url-data'), (err) => {
    if (err) throw err
});

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