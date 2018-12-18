const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
    question: String,
    image: String,
    type: String,
    options: [{
        option_text: String,
        option_image: String
    }],
    approved: Boolean,
    album: String,
    resultPolicy: String,
    createdBy: {
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

module.exports = mongoose.model('Survey', surveySchema);