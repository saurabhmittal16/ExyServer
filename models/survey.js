const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
    question: String,
    image: String,
    type: String,
    options: [{
        option_text: String,
        option_image: String
    }],
    state: {
        type: Number,
        default: 0
    },
    album: String,
    resultPolicy: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    createdParent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    start: 'Date',
    end: 'Date',
    responses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Response'
    }]
}, {
    versionKey: false
});

// state ->
//  0 : unapproved
//  1 : approved
//  2 : published
// -1 : discarded

module.exports = mongoose.model('Survey', surveySchema);