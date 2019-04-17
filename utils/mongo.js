// Util script to manipulate mongo data

const mongoose = require('mongoose');
const mongo_url = "mongodb://localhost:27017/exxy";

const Survey = require('../models/survey');

mongoose.connect(mongo_url, {useNewUrlParser: true})
    .then(
        async () => {
            console.log("Connected to DB");
            const data = await Survey.find({});
            data.forEach(
                async survey => {
                    survey.end = new Date('12 Dec 2019');
                    survey.published = true;
                    survey.discarded = false;
                    await survey.save();
                }
            )
        }
    )
    .catch(err => console.log(err.message));