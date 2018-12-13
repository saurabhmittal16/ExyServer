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
    single: {
        type: Number,
        default: null
    },
    mutliple: [{
        type: Number,
        default: null
    }],
    rating: {
        type: Number,
        default: null
    },
    feedback: {
        type: String,
        default: null
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Response', responseSchema);