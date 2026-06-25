const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    fullname: { type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: { type: String, required: true },
    phone: { type: String, required: false },
    role: { type: String, enum: ['user', 'admin', 'coach'], default: 'user' },
    age: { type: Number, required: false, min: 1 },
    weight: { type: Number, required: false, min: 1 },
    gender: { type: String, enum: ['male', 'female'] }

}, { timestamps: true })

module.exports = mongoose.models.User || mongoose.model('User', userSchema);