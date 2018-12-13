const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    survey: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Survey'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    response: {
        type: Number,
        default: null
    },
    response: [{
        type: Number,
        default: null
    }],
    response: {
        type: String,
        default: null
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Response', responseSchema);