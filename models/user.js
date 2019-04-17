const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    gender: String,
    age: Number,
    mobile: {
        type: String,
        unique: true
    },
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }],
    responses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Response'
    }]
}, {
    versionKey: false
});

userSchema.pre('save', function(next) {
    let user = this;
    if (!user.isModified('password')) {
        return next();
    }
    let hash = bcrypt.hashSync(user.password);
    user.password = hash;
    next();
});

userSchema.methods.comparePassword = function (password) {
    var user = this;
    return bcrypt.compareSync(password, user.password);
}

module.exports = mongoose.model('User', userSchema);