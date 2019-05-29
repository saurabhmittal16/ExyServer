// Util script to manipulate mongo data

const mongoose = require('mongoose');
const mongo_url = "mongodb://localhost:27017/exxy";

const Survey = require('../models/survey');
const Admin = require('../models/admin');

mongoose.connect(mongo_url, {useNewUrlParser: true})
    .then(
        async () => {
            console.log("Connected to DB");
            const data = await Survey.find({});
            data.forEach(
                async survey => {
                    // const foundAdmin = await Admin.findOne({_id: survey.createdBy});
                    // survey.createdParent = foundAdmin.parent ? foundAdmin.parent : foundAdmin._id;
                    // survey.end = new Date('12 Dec 2019');
                    // survey.published = false;
                    // survey.discarded = false;
                    // survey.state = Math.random() > 0.5 ? 2 : 0;
                    await survey.save();
                }
            )
        }
    )
    .catch(err => console.log(err.message));