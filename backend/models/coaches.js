const mongoose = require('mongoose');
const schema = mongoose.Schema;

const coachSchema = new schema({
    nameCoach: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    img: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: true
    },
    specialite: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: false
    },
    salleDeSport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SalleDeSport',
        required: true
    }
});

module.exports = mongoose.model('Coach', coachSchema);
