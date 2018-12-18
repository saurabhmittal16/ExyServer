const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
    name: String,
    image: String,
    email: String,
    password: String,
    mobile: String,

    canApprove: {
        type: Boolean,
        default: true
    },

    // NULL in case of super-admin
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },

    // NULL for sub-admin
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }],

    albums: [{
        image: String,
        title: String
    }]
}, {
    versionKey: false
});

adminSchema.pre('save', function(next) {
    let admin = this;
    if (!admin.isModified('password')) {
        return next();
    }
    let hash = bcrypt.hashSync(admin.password);
    admin.password = hash;
    next();
})

adminSchema.methods.comparePassword = function (password) {
    var user = this;
    return bcrypt.compareSync(password, user.password);
}

module.exports = mongoose.model('Admin', adminSchema);
