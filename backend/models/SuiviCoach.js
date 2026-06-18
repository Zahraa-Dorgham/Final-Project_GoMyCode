const mongoose = require('mongoose');
const schema = mongoose.Schema;

const suiviCoachSchema = new schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    coach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coach',
        required: true
    },
    phoneUser: {
        type: String,
        required: true
    },
    objectif: {
        type: String,
        required: false
    },
    preferenceHoraire: {
        type: String,
        required: false
    },
    message: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('SuiviCoach', suiviCoachSchema);
