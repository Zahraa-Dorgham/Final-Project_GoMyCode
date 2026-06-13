const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'coach'],
        default: 'user'
    }
})

module.exports = mongoose.models.User || mongoose.model('User', userSchema);