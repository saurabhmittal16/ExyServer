const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
    question: String,
    image: String,
    type: String,
    options: [{
        option_text: String,
        option_image: String
    }],
    approved: {
        type: Boolean,
        default: false
    },
    published: {
        type: Boolean,
        default: false
    },
    discarded: {
        type: Boolean,
        default: false
    },
    album: String,
    resultPolicy: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    // To-Do: Is it required to fetch surveys
    // createdParent: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Admin'
    // },
    start: 'Date',
    end: 'Date',
    responses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Response'
    }]
}, {
    versionKey: false
});

module.exports = mongoose.model('Survey', surveySchema);