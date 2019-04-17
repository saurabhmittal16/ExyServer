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
    }
    // To-Do : Add following broadcasters
    // To-Do : Add responses
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