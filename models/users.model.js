const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true, maxLength: 20},
    password: {type: String, required: true},
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;